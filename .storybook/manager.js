import {addons} from '@storybook/addons';
import {create} from '@storybook/theming';
import {colorGreenDark, colorSkyLight, colorInk} from '@shopify/polaris-tokens';

addons.setConfig({
  previewTabs: {
    'canvas': {title: 'Preview'}
  },
  panelPosition: 'right',
  sidebar: {
    // showRoots: false,
  },
  theme: create({
    base: 'light',
    brandTitle: 'Qikify Polaris Storybook',
    brandUrl: '/',
    brandImage: null,
    appBorderRadius: 0,
    colorPrimary: colorGreenDark,
    colorSecondary: colorGreenDark,
    appBg: colorSkyLight,
    contentBg: colorSkyLight,
    textColor: colorInk,
  }),
});
