import fs from 'fs';
import { globby } from 'globby';

export async function getCategoryContent(category: string) {
  const path = `./polaris/polaris.shopify.com/content/components/${category}/index.mdx`;

  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path, 'utf8');

    const titleMatch = content.match(/title:\s(.*?)(\n|$)/s);
    const title = titleMatch ? titleMatch[1] : '';

    const shortDescriptionMatch = content.match(/shortDescription:\s(.*?)(\n|$)/s);
    const shortDescription = shortDescriptionMatch ? shortDescriptionMatch[1] : '';

    const descriptionMatch = content.match(/<Lede>\n\n(.*?)\n\n<\/Lede>/s);
    const description = descriptionMatch ? descriptionMatch[1] : '';

    return {
      title,
      shortDescription,
      description,
    };
  }
}

export async function getComponentContent(component: string) {
  const componentMdFile = convertToKebabCase(component);

  const paths = await globby([
    './polaris/polaris.shopify.com/content/components/**/*.mdx',
  ]);

  const path = paths.find(p => p.endsWith(`${componentMdFile}.mdx`));

  if (path) {
    const content = fs.readFileSync(path, 'utf8');

    // Find the description of component in <Lede> tag
    const descriptionMatch = content.match(/<Lede>\n\n(.*?)\n\n<\/Lede>/s);
    const description = descriptionMatch ? descriptionMatch[1] : '';

    // Find the previewImg of component
    const previewImgMatch = content.match(/previewImg:\s(.*?)(\n|$)/s);
    const previewImg = previewImgMatch ? previewImgMatch[1] : '';

    // Find keywords in frontmatter
    const keywordsMatch = content.match(/keywords:(.*?)(<?\n)\w/s);
    const keywords = keywordsMatch
      ? keywordsMatch[1].trim().split('-').filter(k => k.trim())
      : [];

    return {
      description,
      keywords,
      previewImg,
    };
  }
}

/**
 * Convert PascalCase to kebab-case
 */
function convertToKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, '-$&').toLowerCase().replace(/^-/, '');
}
