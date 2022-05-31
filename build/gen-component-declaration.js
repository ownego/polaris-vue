// Based on Naive UI gen component declaration file.
// https://github.com/TuSimple/naive-ui

import path from 'path';
import fs from 'fs-extra';
import process from 'process';
// import * as globalComponents from '../src/components';

const TYPE_ROOT = process.cwd();

const packageName = '@ownego/polaris-vue';
const fileName = 'volar.d.ts';

const excludeComponents = [];

function exist (path) {
  return fs.existsSync(path);
}

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

async function generateComponentsType () {
  const mainImports = await fs.readFile(path.resolve(TYPE_ROOT, 'src/components/index.ts'), 'utf-8');

  const pattern = /\'\.\/(.*)\'/g;

  const components = {};

  // Get all component names
  const componentList = mainImports.match(pattern).map((i) => i.replace(/[^\w]/g, ''));

  componentList.forEach((key) => {
    const entry = `typeof import('${packageName}')['${key}']`
    if (!excludeComponents.includes(key)) {
      components[key] = entry;
    }
  });

  const originalContent = exist(path.resolve(TYPE_ROOT, fileName))
    ? await fs.readFile(path.resolve(TYPE_ROOT, fileName), 'utf-8')
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
    await fs.writeFile(path.resolve(TYPE_ROOT, fileName), code, 'utf-8');
  }
}
generateComponentsType()
