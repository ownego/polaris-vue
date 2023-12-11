#!/usr/bin/env ts-node-esm

import { globby } from 'globby';
import { default as path } from 'path';
import { default as fs } from 'fs';
import {
  type MetaCheckerOptions,
  type EventMeta,
  type SlotMeta,
  type PropertyMeta,
  type PropertyMetaSchema,
  type Declaration,
  createComponentMetaChecker,
} from 'vue-component-meta';

type PropsStructure = {
  [key: string]: ComponentApi;
}

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
  schema: { ignore: ['undefined'] },
}

const metaChecker = createComponentMetaChecker(
  './tsconfig.json',
  metaOptions,
);

function getMeta(filePaths: string[]): PropsStructure {
  const ast: PropsStructure = {};

  for (const filePath of filePaths) {
    const componentName = path.parse(filePath).name;
    const meta = metaChecker.getComponentMeta(filePath);

    const props = filterProps(meta.props);

    ast[componentName] = {
      props,
      events: meta.events,
      slots: meta.slots,
    };
  }

  return ast;
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
      schema: serializeSchema(prop.schema),
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

function serializeSchema(schema: PropertyMetaSchema): PropertyMetaSchema {
  if (typeof schema === 'string') {
    return schema;
  }

  if (schema.kind === 'object') {
    return {
      ...schema,
      schema: {},
    };
  }

  const tmpSchema = { ...schema };
  const { type } = schema;

  const newType = type.split('|').map(t => {
    if (t.includes('undefined')) return '';
    return t;
  }).filter(t => t);

  tmpSchema.type = newType.length > 1 ? newType.join('|') : newType[0];
  tmpSchema.schema = schema.schema ? serializeNestedSchema(schema.schema) : [];

  return tmpSchema;
}

function serializeNestedSchema(schema: PropertyMetaSchema[]): PropertyMetaSchema[] {
  const tmpSchema = [];
  for (const s of schema) {
    // Remove undefined string
    if (typeof s === 'string') {
      if (s === 'undefined') continue;
      tmpSchema.push(s);
    } else {
      if (s.kind === 'object') {
        tmpSchema.push({
          ...s,
          schema: {},
        });
      } else {
        tmpSchema.push({
          ...s,
          schema: s.schema ? serializeNestedSchema(s.schema) : [],
        });
      }
    }
  }

  return tmpSchema;
}

export function generateComponentMeta() {
  globby([
    './src/components/**/*.vue',
  ]).then((paths) => {
    const ast = getMeta(paths);

    const cacheDir = path.join('./.cache');
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, {recursive: true});
    }

    fs.writeFileSync(
      path.join(cacheDir, 'props.json'),
      JSON.stringify(ast, undefined, 2),
    );

    console.log('Component meta generated!');
  });
}

generateComponentMeta();
