import type {
  ColorBackgroundAlias,
  ColorIconAlias,
  ColorTextAlias,
} from '@shopify/polaris-tokens';
import type {
  Action,
  DisableableAction,
  LoadableAction,
  IconSource,
} from '@/utilities/types';
import AlertDiamondIcon from '@icons/AlertDiamondIcon.svg';
import InfoIcon from '@icons/InfoIcon.svg';
import AlertTriangleIcon from '@icons/AlertTriangleIcon.svg';
import CheckIcon from '@icons/CheckIcon.svg';
import { BoxProps } from '../Box/types';

interface BannerColorAliases {
  background: ColorBackgroundAlias;
  text: ColorTextAlias;
  icon: ColorIconAlias | ColorTextAlias;
}

interface BannerAttributes {
  withinPage: BannerColorAliases;
  withinContentContainer: BannerColorAliases;
  icon: IconSource;
}

export type BannerTone = 'success' | 'info' | 'warning' | 'critical';

export interface BannerProps {
  /** Title content for the banner. */
  title?: string;
  /** Status icon to display in the banner. Use only major icons */
  icon?: IconSource;
  /** Renders the banner without a status icon. */
  hideIcon?: boolean;
  /** Sets the status of the banner. */
  tone?: BannerTone;
  /** Action for banner */
  action?: DisableableAction & LoadableAction;
  /** Action | Displays a secondary action */
  secondaryAction?: Action;
  /** Disables screen reader announcements when changing the content of the banner */
  stopAnnouncements?: boolean;
}

export interface BannerLayoutProps {
  backgroundColor: BoxProps['background'];
  textColor: ColorTextAlias;
}

export const bannerAttributes: {[key in BannerTone]: BannerAttributes} = {
  success: {
    withinPage: {
      background: 'bg-fill-success',
      text: 'text-success-on-bg-fill',
      icon: 'text-success-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-success',
      text: 'text-success',
      icon: 'text-success',
    },
    icon: CheckIcon,
  },
  warning: {
    withinPage: {
      background: 'bg-fill-warning',
      text: 'text-warning-on-bg-fill',
      icon: 'text-warning-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-warning',
      text: 'text-warning',
      icon: 'text-warning',
    },
    icon: AlertTriangleIcon,
  },
  critical: {
    withinPage: {
      background: 'bg-fill-critical',
      text: 'text-critical-on-bg-fill',
      icon: 'text-critical-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-critical',
      text: 'text-critical',
      icon: 'text-critical',
    },
    icon: AlertDiamondIcon,
  },
  info: {
    withinPage: {
      background: 'bg-fill-info',
      text: 'text-info-on-bg-fill',
      icon: 'text-info-on-bg-fill',
    },
    withinContentContainer: {
      background: 'bg-surface-info',
      text: 'text-info',
      icon: 'text-info',
    },
    icon: InfoIcon,
  },
};
