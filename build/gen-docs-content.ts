#!/usr/bin/env ts-node-esm

import { globby } from 'globby';
import { default as path } from 'path';
import { default as fs } from 'fs';

type ComponentContent = {
  name: string;
  description: string;
  bestPractices: string;
  keywords: string[];
}

const contentPath = './docs/assets/components-content';
const componentsPath = './docs/components';

function getContent(filePaths: string[]): void {
  for (const f of filePaths) {
    if (f.includes('index.mdx')) continue;

    const content = fs.readFileSync(f, 'utf8');

    const fileName = path.basename(f, '.mdx');
    // Convert from kebab to PascalCase
    const componentName = fileName.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replace(/^[a-z]/g, (g) => g.toUpperCase());

    // Find the description of component in <Lede> tag
    const descriptionMatch = content.match(/<Lede>\n\n(.*?)\n\n<\/Lede>/s);
    const description = descriptionMatch ? descriptionMatch[1] : '';

    // Find the Best Practices section under `## Best Practices` until `---`
    const bestPracticesMatch = content.match(/\#\# Best practices\n\n(.*?)\n\n---/s);
    const bestPractices = bestPracticesMatch ? bestPracticesMatch[1] : '';

    // Find keywords in frontmatter
    const keywordsMatch = content.match(/keywords:(.*?)(<?\n)\w/s);
    const keywords = keywordsMatch
      ? keywordsMatch[1].trim().split('-').filter(k => k.trim())
      : [];

    const ast: ComponentContent = {
      name: componentName,
      description,
      bestPractices,
      keywords,
    }

    fs.writeFileSync(
      path.join(contentPath, `${componentName}.json`),
      JSON.stringify(ast, undefined, 2),
    );

    // Update component docs
    updateComponentDocs(componentName, ast);
  }
}

/**
 * Update source component docs with content from Polaris docs
 *
 * @param componentName
 * @param ast
 */
function updateComponentDocs(componentName: string, ast: ComponentContent): void {
  // Find docs from src/components to add content to
  const componentDir = path.join(componentsPath, componentName);
  const componentDocPath = path.join(componentDir, 'README.md');

  if (fs.existsSync(componentDir) && fs.existsSync(componentDocPath)) {
    const componentDoc = fs.readFileSync(componentDocPath, 'utf8');

    // Get the frontmatter
    const componentDocMatch = componentDoc.match(/---\n(.*?)\n---/s);
    const componentDocFrontmatter = componentDocMatch ? componentDocMatch[1] : '';

    // Remove description, bestpractices, and keywords from frontmatter
    let componentDocNewFrontmatter = componentDocFrontmatter.replace(/\ndescription:.*?($|\n\w)/s, '$1');
    // componentDocNewFrontmatter = componentDocNewFrontmatter.replace(/bestpractices:.*?($|\n\w)/s, '$1');
    componentDocNewFrontmatter = componentDocNewFrontmatter.replace(/head:(.*?)($|\n\w)/s, '$2');
    componentDocNewFrontmatter = componentDocNewFrontmatter.trim();

    // Serialize keywords to
    // keywords:
    //   - foo
    //   - bar
    const keywords = ast.keywords.map((keyword) => `${keyword.trim().replace(/\s/g, '-')}`).join(' ');

    // // Append content to head frontmatter
    componentDocNewFrontmatter = componentDocNewFrontmatter + `
description: ${ast.description}
head:
  - - meta
    - name: keywords
      content: ${keywords}`;

    // Replace frontmatter
    const componentDocNew = componentDoc.replace(componentDocFrontmatter, componentDocNewFrontmatter);

    // Write to file
    fs.writeFileSync(
      componentDocPath,
      componentDocNew,
    );
  }
}

export function generateDocsContent() {
  globby([
    './polaris/polaris.shopify.com/content/components/**/*.mdx',
  ]).then((paths) => {
    const contentDir = path.join(contentPath);

    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    getContent(paths);

    console.log('All component content generated!');
  })
}

generateDocsContent();
