import path from 'path';
import postcssShopify from '@shopify/postcss-plugin';
import pxtorem from 'postcss-pxtorem';
import postcssCustomMedia from 'postcss-custom-media';
import postcssGlobalData from '@csstools/postcss-global-data';

const mediaQueriesCssPath = path.resolve(
  './node_modules/@shopify/polaris-tokens/dist/css/media-queries.css',
);

const postcssPlugins = [
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
];

export default postcssPlugins;
