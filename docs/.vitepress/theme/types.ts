import {
  type EventMeta,
  type SlotMeta,
  type PropertyMeta,
} from 'vue-component-meta';

export type ComponentPropsMeta =
  Pick<PropertyMeta,
    | 'name'
    | 'type'
    | 'required'
    | 'description'
    | 'default'
    | 'description'
    | 'tags'
    | 'schema'
    | 'declarations'
  > & {
    defaultValue?: string;
  };

export type ComponentApi = {
  props: ComponentPropsMeta[];
  events: EventMeta[];
  slots: SlotMeta[];
}
