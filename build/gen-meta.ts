#!/usr/bin/env ts-node-esm

import { globby } from 'globby';
import { default as path } from 'path';
import { default as fs } from 'fs';
import {
  type MetaCheckerOptions,
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

type ComponentEventParams = {
  [key: string]: string;
}

type ComponentEventMeta = {
  name: string;
  description?: string;
  params?: ComponentEventParams;
}

type ComponentApi = {
  props: ComponentPropsMeta[];
  events: ComponentEventMeta[];
  slots: SlotMeta[];
}

const metaPath = './docs/assets/components-meta';

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

const NESTED_COMPONENT_PATH_REGEX = /(.*)\/components\/(.*)\/components/;

function getMeta(filePaths: string[]): void {
  for (const filePath of filePaths) {
    const componentName = path.parse(filePath).name;
    const meta = metaChecker.getComponentMeta(filePath);

    const props = filterProps(meta.props);
    const events = getEventMeta(filePath);

    const ast: ComponentApi = {
      props,
      events,
      slots: meta.slots,
    };

    const nestedComponentMatch = NESTED_COMPONENT_PATH_REGEX.exec(filePath);
    let pathToWrite = metaPath;

    if (nestedComponentMatch) {
      // If the component is nested, we need to create a folder for it
      const nestedComponentPath = path.join(metaPath, nestedComponentMatch[2]);

      if (!fs.existsSync(nestedComponentPath)) {
        fs.mkdirSync(nestedComponentPath, {recursive: true});
      }

      pathToWrite = nestedComponentPath;
    }

    fs.writeFileSync(
      path.join(pathToWrite, `${componentName}.json`),
      JSON.stringify(ast, undefined, 2),
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

function getEventMeta(filePath: string): ComponentEventMeta[] {
  // Read file content
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Build regex to match defineEmits
  const eventRegex = /defineEmits\<(\{[\s\S]*?\}|[^>]*?)\>/s;
  const matches = fileContent.match(eventRegex);

  if (matches === null) return [];

  let definition = matches[1];

  if (!matches[1].startsWith('{')) { // If defineEmits is not an object
    // Find the event type definition
    const eventRegex = new RegExp(`(type|interface)\\s+${matches[1]}\\s*=?\\s*(\\{[\\s\\S]*?\\})`, 's');

    const defMatches = fileContent.match(eventRegex);

    definition = defMatches ? defMatches[2] : '';
  }

  // Remove start & end brackets
  definition = definition.replace(/^\{|\}$/g, '').trim();

  // Get the lines of each event from description
  const lines = definition.split('\n').map(line => line.trim());

  const events: ComponentEventMeta[] = [];

  // Define event and its description
  let i = 0;
  while (i < lines.length) {
    let description = '';

    // Detect description
    const descriptionRegex = /\/\*\*[\s\S]*?\*\//;
    if (descriptionRegex.test(lines[i])) {
      description = lines[i].replace(/\/\*\*|\*\//g, '').trim();
      i++;
    }

    // Detect event name & type
    const eventRegex = /['"]?([\w-]+)['"]?\s*\:\s*(.*?)[;,]*$/s;
    const eventMatches = lines[i].match(eventRegex);

    const name = eventMatches ? eventMatches[1] : '';
    const type = eventMatches ? eventMatches[2] : '';

    const typeObj = convertStringToObject(type);

    const event: ComponentEventMeta = {
      name,
      description,
      params: typeObj,
    };

    events.push(event);
    i++;
  }

  return events;
}

/**
 * Convert a string to object
 * '[name: string, collections: string[], products: Record<string, any>]'
 * to { name: 'string', collections: 'string[]', products: 'Record<string, any>' }
 */
function convertStringToObject(str: string): Record<string, string> {
  const obj: Record<string, string> = {};

  // Convert string to array
  const regex = /,?\s*(\w*?|\.\.\.\w*?):/g;

  const parsedStr = str.replace(/^\[|\]$/g, '').replace(regex, '|||$1:').replace(/^\|\|\|/, '');
  const arr = parsedStr.split('|||');

  // Convert array to object
  arr.forEach(item => {
    const [key, value] = item.split(':').map(i => i.trim());

    obj[key] = value;
  });

  return obj;
}

export function generateComponentMeta() {
  globby([
    './src/components/**/*.vue',
  ]).then((paths) => {
    const metaDir = path.join(metaPath);
    if (!fs.existsSync(metaDir)) {
      fs.mkdirSync(metaDir, {recursive: true});
    }

    getMeta(paths);

    console.log('All component meta generated!');
  });
}

generateComponentMeta();
