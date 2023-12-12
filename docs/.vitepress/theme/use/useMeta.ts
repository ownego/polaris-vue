import { computed } from 'vue';
import { useData } from 'vitepress';
import type { PropertyMetaSchema } from 'vue-component-meta';
import type { ComponentApi } from '../types';
import * as allMeta from '../../../components-meta';

export function useMeta() {
  const { page } = useData();

  const component = computed(() => {
    const componentName = page.value.filePath.match(/\/(\w*)\/README\.md/);

    if (componentName) {
      return componentName[1];
    }

    return page.value.title;
  });

  const meta = computed<ComponentApi>(() => {
    return allMeta[component.value];
  });

  const cProps = computed(() => {
    // Sort item name alphabetically
    return meta.value?.props.sort((a, b) => a.name.localeCompare(b.name));
  });

  const cSlots = computed(() => {
    return meta.value?.slots;
  });

  const cEvents = computed(() => {
    return meta.value?.events;
  });

  const serializeSchema = (schema: PropertyMetaSchema): string[] => {
    let tmpType: string[] = [];
    if (typeof schema === 'string') { // string
      tmpType = schema.split('|');
    } else { // object
      if (Array.isArray(schema.schema) && schema.schema.length < 8) {
        tmpType = schema.schema.map((s) => serializeSchema(s)).flat();
      } else {
        tmpType = schema.type.split('|');
      }
    }

    return tmpType.map((t) => t.trim()).filter((t) => t !== 'undefined');
  }

  const defineTypeFormat = (t: string) => {
    if (t.startsWith('"') && t.endsWith('"') || t === 'string') {
      return 'string';
    }

    if (t === 'boolean') {
      return 'boolean';
    }

    if (t === 'number') {
      return 'boolean';
    }

    return 'object';
  }

  return {
    component,
    cProps,
    cSlots,
    cEvents,
    serializeSchema,
    defineTypeFormat,
  };
}
