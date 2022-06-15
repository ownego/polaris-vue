// Based on Naive UI gen component declaration file.
// https://github.com/TuSimple/naive-ui

import path from 'path';
import fs from 'fs-extra';
import process from 'process';
// import * as globalComponents from '../src/components';

const TYPE_ROOT = process.cwd();

const packageName = '@ownego/polaris-vue';
const fileName = 'volar.d.ts';

function parseComponentsDeclaration (code) {
  if (!code) {
    return {};
  }
  return Object.fromEntries(
    Array.from(code.matchAll(/(?<!\/\/)\s+\s+['"]?(.+?)['"]?:\s(.+?)\n/g)).map(
      (i) => [i[1], i[2]]
    )
  );
}

function generateImportString(key) {
  return `typeof import('${packageName}')['${key}']`;
}

function generateComponentsType() {
  const mainImports = fs.readFileSync(path.resolve(TYPE_ROOT, 'src/components/index.ts'), 'utf-8');

  const pattern = /\'\.\/(.*)\'/g;

  const components = {};

  // Get all component names
  const componentList = mainImports.match(pattern).map((i) => i.replace(/[^\w]/g, ''));

  componentList.forEach((key) => {
    const isSubComponentsExist = fs.existsSync(`src/components/${key}/components`);
    const getSubComponentsPattern = /\s\w+\s}/g;
    
    if (isSubComponentsExist) {
      const subImports = fs.readFileSync(path.resolve(TYPE_ROOT, `src/components/${key}/index.ts`), 'utf-8');
      const subComponentList = subImports.match(getSubComponentsPattern).map((i) => i.replace(/}|\s/g, ''));

      subComponentList.forEach((subKey) => components[subKey] = generateImportString(subKey));
    } else {
      components[key] = generateImportString(key);
    }
  });

  const originalContent = fs.existsSync(path.resolve(TYPE_ROOT, fileName))
    ? fs.readFileSync(path.resolve(TYPE_ROOT, fileName), 'utf-8')
    : '';

  const originImports = parseComponentsDeclaration(originalContent);
  const lines = Object.entries({
    ...originImports,
    ...components
  })
    .filter(([name]) => {
      return components[name]
    })
    .map(([name, v]) => {
      if (!/^\w+$/.test(name)) {
        name = `'${name}'`
      }
      return `${name}: ${v}`
    });

  const code = `// Auto generated component declarations
declare module 'vue' {
  export interface GlobalComponents {
    ${lines.join('\n    ')}
    [key: string]: any
  }
}
export {}
`;

  if (code !== originalContent) {
    fs.writeFileSync(path.resolve(TYPE_ROOT, fileName), code, 'utf-8');
  }
}

generateComponentsType();
