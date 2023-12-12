#!/usr/bin/env ts-node-esm

import { globby } from 'globby';
import { default as path } from 'path';
import { default as fs } from 'fs';
import {
  type MetaCheckerOptions,
  type EventMeta,
  type SlotMeta,
  type PropertyMeta,
  type Declaration,
  createComponentMetaChecker,
} from 'vue-component-meta';

type ComponentPropsMeta =
  Pick<PropertyMeta,
    | 'name'
    | 'type'
    | 'required'
    | 'description'
    | 'default'
    | 'description'
    | 'tags'
    | 'schema'
    | 'declarations'
  > & {
    defaultValue?: string;
  };

type ComponentApi = {
  props: ComponentPropsMeta[];
  events: EventMeta[];
  slots: SlotMeta[];
}

const metaPath = './docs/components-meta';

const ignorePropTypes = [
  'key',
  'ref',
  'ref_for',
  'ref_key',
  'class',
  'style',
];

const metaOptions: MetaCheckerOptions = {
  forceUseTs: true,
  printer: { newLine: 1 },
  noDeclarations: true,
  schema: {
    ignore: [
      'Element',
      (name) => {
        const definedType = name.replace(/\s\|\sundefined|undefined/g, '');

        if (
          definedType === 'VueNode'
          || definedType === 'LinkLikeComponent'
          || definedType === 'ColorBackgroundAlias'
          || definedType === 'ColorBorderAlias'
          || definedType === 'ColorTextAlias'
          || definedType.startsWith('ColorBorderAlias')
          || definedType.startsWith('ComponentOptions')
          || definedType.startsWith('FunctionalComponent')
          || definedType.startsWith('ComponentPublicInstanceConstructor')
        ) {
          return true; // ignore
        }
        return false;
      }
    ],
  },
}

const metaChecker = createComponentMetaChecker(
  './tsconfig.json',
  metaOptions,
);

function getMeta(filePaths: string[]): void {
  for (const filePath of filePaths) {
    const componentName = path.parse(filePath).name;
    const meta = metaChecker.getComponentMeta(filePath);

    const props = filterProps(meta.props);

    const ast: ComponentApi = {
      props,
      events: meta.events,
      slots: meta.slots,
    };

    fs.writeFileSync(
      path.join(metaPath, `${componentName}.json`),
      JSON.stringify(ast, undefined, 2),
    );

    // Append to index.js
    fs.appendFileSync(
      path.join(metaPath, 'index.js'),
      `export { default as ${componentName} } from './${componentName}.json';\n`,
    );

    console.log(`Component meta generated for ${componentName}`);
  }
}

function filterProps(metaProps: PropertyMeta[]): ComponentPropsMeta[] {
  const props: ComponentPropsMeta[] = [];

  metaProps.forEach(prop => {
    if (prop.global) return;

    if (ignorePropTypes.includes(prop.name)) return;

    const pureProp = {
      name: prop.name,
      type: prop.type,
      required: prop.required,
      description: prop.description,
      default: prop.default,
      tags: prop.tags,
      declarations: serializeDeclaration(prop.declarations),
      schema: prop.schema,
    };

    props.push(pureProp);
  });

  return props;
}

function serializeDeclaration(declarations: Declaration[]): Declaration[] {
  // TODO: currently, hard code to avoid duplicate declaration range if there are 2 declarations.
  if (declarations.length > 1) {
    return [declarations[0]];
  }

  return declarations;
}

export function generateComponentMeta() {
  globby([
    './src/components/**/*.vue',
  ]).then((paths) => {
    const metaDir = path.join(metaPath);
    if (!fs.existsSync(metaDir)) {
      fs.mkdirSync(metaDir, {recursive: true});
    }

    fs.writeFileSync(
      path.join(metaPath, 'index.js'),
      '',
    );


    getMeta(paths);

    console.log('All component meta generated!');
  });
}

generateComponentMeta();
