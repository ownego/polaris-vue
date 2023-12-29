#!/usr/bin/env ts-node-esm

import { globby } from 'globby';
import { default as path } from 'path';
import { default as fs } from 'fs';

type ComponentContent = {
  name: string;
  description: string;
  bestPractices: string;
  keywords: string[];
  previewImg: string;
}

const contentPath = './docs/assets/components-content';

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

    // Find the previewImg of component
    const previewImgMatch = content.match(/previewImg:\s(.*?)(\n|$)/s);
    const previewImgRootFile = previewImgMatch ? previewImgMatch[1] : '';
    const previewImg = previewImgRootFile ? path.basename(previewImgRootFile) : '';

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
      previewImg,
    }

    // Copy image from previewImage to /images folder
    if (previewImg) {
      const previewImgPath = path.join('./polaris/polaris.shopify.com', 'public', previewImgRootFile);
      const previewImgDest = path.join(contentPath, 'images', path.basename(previewImgPath));

      fs.copyFileSync(previewImgPath, previewImgDest);
    }

    fs.writeFileSync(
      path.join(contentPath, `${componentName}.json`),
      JSON.stringify(ast, undefined, 2),
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

    if (!fs.existsSync(`${contentDir}/images`)) {
      fs.mkdirSync(`${contentDir}/images`, { recursive: true });
    }

    getContent(paths);

    console.log('All component content generated!');
  })
}

generateDocsContent();
