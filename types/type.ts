import { VueConstructor } from 'vue';

export type IconSource =
  | VueConstructor<Vue>
  | 'placeholder'
  | string;

export type Error =
  | string
  | VueConstructor<Vue>
  | (string | VueConstructor<Vue>)[];

export type Action = {
  id?: string;
  content?: string;
  accessibilityLabel?: string;
  url?: string;
  external?: boolean;
  onAction?(): void;
  onMouseEnter?(): void;
  onTouchStart?(): void;
};
