import { type Component } from 'vue';
import type { Target } from '@/utilities/types';

/**
 * Explain about usage of React.Props<HTMLAnchorElement>
 * 
 * React.HTMLProps<HTMLAnchorElement> is a TypeScript type used in React to
 * specify that a component will accept all standard HTML attributes of an <a> tag (HTMLAnchorElement). 
 * This allows you to pass any HTML attribute that a regular <a> tag would accept
 * (like href, target, download, etc.) to your component, as well as React-specific attributes like key and ref.
 */

/**
 * In React version this interface extends React.HTMLProps<HTMLAnchorElement>
 * but in Vue version we don't need to extend any interface because we can use
 * useAttrs method
 */
export interface LinkLikeComponentProps {
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

export type LinkLikeComponent = Component<LinkLikeComponentProps>;
