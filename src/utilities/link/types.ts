import { VueElementConstructor } from 'vue';
import type { Target } from '../types';

export interface LinkLikeComponentProps extends Omit<HTMLAnchorElement, 'target' | 'download'> {
  /** The url to link to */
  url: string;
  /** Makes the link open in a new tab */
  external?: boolean;
  /** Where to display the url */
  target?: Target;
  /** Makes the browser download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value. */
  download?: string | boolean;
  [key: string]: any;
}

export type LinkLikeComponent = VueElementConstructor<LinkLikeComponentProps>;
