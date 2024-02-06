#!/usr/bin/env ts-node-esm

import { globby } from 'globby';
import { default as path } from 'path';
import { default as fs } from 'fs';
import { default as ts } from 'typescript';
import { Type } from '../polaris/polaris.shopify.com/src/types';

const typePath = './docs/assets/components-types';

const compilerOptions = {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
};

function getTypes(filePaths: string[]): void {
  const program = ts.createProgram(filePaths, compilerOptions);
  const checker = program.getTypeChecker();

  for(const s of program.getSourceFiles()) {
    if (!s.isDeclarationFile) {
      ts.forEachChild(s, (child) => {
        const ast = visit(child, normalizePath(s.fileName), checker);

        // Get component name from file name
        // src/components/Box/types.ts -> Box
        // src/components/Box/components/Text/types.ts -> Text
        const regex = /.*\/components\/(.*?)\/.*\.ts/;
        const componentName = s.fileName.match(regex)?.[1];

        if (ast && ast.name !== `${componentName}Props`) {
          fs.writeFileSync(
            path.join(typePath, `${ast.name}.json`),
            JSON.stringify(ast, undefined, 2),
          );

          fs.appendFileSync(
            path.join(typePath, 'index.js'),
            `export { default as ${ast.name} } from './${ast.name}.json';\n`,
          );
        }
      });
    }
  }
}

function visit(
  node: ts.Node | ts.Declaration,
  filePath: string,
  checker: ts.TypeChecker,
  level = 0,
) {
  // Escape hatch
  if (level > 10) {
    return undefined;
  }

  switch(node.kind) {
    case ts.SyntaxKind.EnumDeclaration:
      return parseEnumDeclaration(node, checker, filePath);
    case ts.SyntaxKind.InterfaceDeclaration:
      return parseInterfaceDeclaration(node, checker, filePath);
    case ts.SyntaxKind.TypeAliasDeclaration:
      return parseTypeAliasDeclaration(node, checker, filePath);
  }
}

const parseEnumDeclaration = (node: ts.Node | ts.Declaration, checker: ts.TypeChecker, filePath: string) => {
  const enumDeclation = node as ts.EnumDeclaration;
  const symbol = checker.getSymbolAtLocation(enumDeclation.name);

  if (!symbol) throw new Error('Expected enum to have a matching symbol');

  const syntaxKind = ts.SyntaxKind[enumDeclation.kind];
  const name = enumDeclation.name.getText();
  const value = enumDeclation.getText();
  const members: Type[] = enumDeclation.members.map((member) => {
    const type = checker.getTypeAtLocation(member.name);
    return {
      filePath,
      name: member.name.getText(),
      value: type.isLiteral() ? type.value.valueOf() : '',
    };
  });

  return {
    filePath,
    syntaxKind,
    name,
    value,
    members,
  };
};

const parseInterfaceDeclaration = (node: ts.Node | ts.Declaration, checker: ts.TypeChecker, filePath: string) => {
  const interfaceDeclaration = node as ts.InterfaceDeclaration;
  const type = checker.getTypeAtLocation(interfaceDeclaration.name);
  const symbol = checker.getSymbolAtLocation(interfaceDeclaration.name);

  if (!symbol) throw new Error('Expected interface declaration to have symbol');

  const members: Type[] = [];

  interfaceDeclaration.members.forEach((member) => {
    if (member.kind === ts.SyntaxKind.IndexSignature) {
      const indexSignature = member as ts.IndexSignatureDeclaration;
      const name = `[${indexSignature.parameters
        .map((param) => `${param.name.getText()}: ${param.type?.getText()}`)
        .join(', ')}]`;
      const value = indexSignature.type.getText();
      members.push({filePath, name, value});
    }
  });

  for (const prop of type.getProperties()) {
    const valueDeclaration = prop.valueDeclaration;
    if (valueDeclaration) {
      const name = prop.getName();
      const description = getSymbolComment(prop, checker);
      const syntaxKind = ts.SyntaxKind[valueDeclaration.kind];
      const type = checker.getTypeOfSymbolAtLocation(prop, valueDeclaration);
      const value = checker.typeToString(type);
      const {deprecationMessage, defaultValue} = parseJSDocTags(prop);

      let memberNode: Type = {
        filePath,
        syntaxKind,
        name,
        value,
        description,
      };

      if (
        valueDeclaration.kind === ts.SyntaxKind.PropertySignature ||
        valueDeclaration.kind === ts.SyntaxKind.MethodSignature
      ) {
        const signature = valueDeclaration as
          | ts.MethodSignature
          | ts.PropertySignature;
        if (signature.questionToken !== undefined) {
          memberNode.isOptional = true;
        }
      }

      if (deprecationMessage) {
        memberNode.deprecationMessage = deprecationMessage;
      }
      if (defaultValue) {
        memberNode.defaultValue = defaultValue;
      }

      members.push(memberNode);
    }
  }

  const name = interfaceDeclaration.name.escapedText.toString();
  const description = getSymbolComment(symbol, checker);
  const value = interfaceDeclaration.getText();

  return {
    filePath,
    name,
    description,
    value,
    members,
  }
};

const parseTypeAliasDeclaration = (node: ts.Node | ts.Declaration, checker: ts.TypeChecker, filePath: string) => {
  const typeAliasDeclaration = node as ts.TypeAliasDeclaration;
  const symbol = checker.getSymbolAtLocation(typeAliasDeclaration.name);
  const members: Type[] = [];

  if (!symbol) {
    throw new Error('Expected type alias declaration to have a symbol');
  }

  const description = getSymbolComment(symbol, checker);
  const name = symbol.escapedName.toString();
  const syntaxKind = ts.SyntaxKind[typeAliasDeclaration.kind];
  const typeRefNode = typeAliasDeclaration.type as ts.TypeReferenceNode;
  let value = typeAliasDeclaration.type.getText();

  typeAliasDeclaration.type.forEachChild((child) => {
    if (child.kind === ts.SyntaxKind.PropertySignature) {
      const propertySignature = child as ts.PropertySignature;
      const name = propertySignature.name.getText();
      const value = propertySignature.type?.getText();
      const isOptional = propertySignature.questionToken !== undefined;
      const description = getNodeComment(child);

      if (value) {
        members.push({
          filePath,
          name,
          value,
          isOptional: isOptional ? true : undefined,
          description,
        });
      }
    }
  });

  for (const typeArg of typeRefNode.typeArguments ?? []) {
    if (typeArg.kind === ts.SyntaxKind.UnionType) {
      value = checker.typeToString(checker.getTypeAtLocation(typeArg));
    }
  }

  if (typeAliasDeclaration.type.kind === ts.SyntaxKind.UnionType) {
    const unionType = typeAliasDeclaration.type as ts.UnionTypeNode;
    value = unionType.types.map((type) => type.getText()).join(' | ');
  } else if (
    typeAliasDeclaration.type.kind === ts.SyntaxKind.IntersectionType
  ) {
    const unionType = typeAliasDeclaration.type as ts.UnionTypeNode;
    value = unionType.types.map((type) => type.getText()).join(' & ');
  }

  return {
    filePath,
    kind: syntaxKind,
    name,
    value,
    description,
    members,
  };
};

function normalizePath(path: string): string {
  let normalizedPath = path;
  if (normalizedPath.startsWith('.')) {
    normalizedPath = normalizedPath.replace(/^\.{1,2}\//, '');
  } else if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.replace('/', '');
  }
  return normalizedPath;
}

function getSymbolComment(
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
): string | undefined {
  return symbol
    .getDocumentationComment(checker)
    .map((comment) => (comment.kind === 'text' ? comment.text : ''))
    .join('\n');
}

function getNodeComment(
  node: ts.Node,
): string | undefined {
  const fullText = node.getFullText();

  const commentRanges = ts.getLeadingCommentRanges(fullText, 0);

  if (!commentRanges) {
    return undefined;
  }

  // Remove /** */
  return commentRanges
      .map((commentRange) => fullText.substring(commentRange.pos, commentRange.end))
      .join('\n')
      .replace(/^\/\*\*/, '')
      .replace(/\*\/$/, '')
      .trim();
}

function parseJSDocTags(symbol: ts.Symbol): {
  deprecationMessage?: string;
  defaultValue?: string;
} {
  const tags = symbol.getJsDocTags();
  let deprecationMessage: string | undefined = undefined;
  let defaultValue: string | undefined = undefined;

  tags.forEach((tag) => {
    if (tag.name.toLowerCase() === 'default' && tag.text) {
      defaultValue = tag.text.map((t) => t.text).join('');
    }
    if (tag.name.toLowerCase() === 'deprecated') {
      deprecationMessage = tag.text
        ? tag.text.map((t) => t.text).join('')
        : 'Deprecated';
    }
  });

  return {deprecationMessage, defaultValue};
}

function generateDocsTypes() {
  globby([
    './src/components/**/*.vue',
    './src/components/**/*.ts',
    '!./src/components/**/index.ts',
    './src/utilities/**/*.ts',
    '!./src/utilities/**/index.ts',
  ]).then((f) => {
    const typeDir = path.join(typePath);

    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir);
    }

    fs.writeFileSync(
      path.join(typePath, 'index.js'),
      '',
    );

    getTypes(f);

    console.log('All types generated!');
  });
}

generateDocsTypes();
