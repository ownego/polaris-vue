import { VueConstructor } from 'vue';

export type IconSource =
  | VueConstructor<Vue>
  | 'placeholder'
  | string;

export type Error =
  | string
  | VueConstructor<Vue>
  | (string | VueConstructor<Vue>)[];
