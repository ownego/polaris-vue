import path from 'path';
import postcssShopify from '@shopify/postcss-plugin';
import postcssImport from 'postcss-import';
import pxtorem from 'postcss-pxtorem';
import postcssCustomMedia from 'postcss-custom-media';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssNesting from 'postcss-nesting';
import postcssMixins from 'postcss-mixins';
import postcssDiscardComments from 'postcss-discard-comments';

const mediaQueriesCssPath = path.resolve(
  './node_modules/@shopify/polaris-tokens/dist/css/media-queries.css',
);

const postcssPlugins = [
  postcssImport(),
  postcssMixins({
    mixinsDir: path.resolve('./polaris/polaris-react/postcss-mixins'),
  }),
  postcssNesting({
    // The way native CSS nesting & SASS nesting behave with complex selectors
    // differ; SASS expands out every selector into a comma separated list, but
    // native CSS wraps the complex selectors in an `:is()` which can result in
    // a different specificity. We favour the SASS convention here to ensure
    // compatibility with our ported-in SASS styles.
    // See: https://sass-lang.com/blog/sass-and-native-nesting/
    noIsPseudoSelector: true,
  }),
  postcssGlobalData({
    files: [mediaQueriesCssPath],
  }),
  postcssCustomMedia(),
  postcssShopify,
  pxtorem({
    rootValue: 16,
    replace: true,
    propList: ['*'],
  }),
  postcssDiscardComments(),
];

export default postcssPlugins;
