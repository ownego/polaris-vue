import { computed, onMounted, ref } from 'vue';
import { useData } from 'vitepress';
import type { PropertyMetaSchema } from 'vue-component-meta';
import type { ComponentApi } from '../types';

export function useMeta() {
  const { page } = useData();

  const meta = ref<ComponentApi>();

  const component = computed(() => {
    const componentName = page.value.filePath.match(/\/(\w*)\/README\.md/);

    if (componentName) {
      return componentName[1];
    }

    return page.value.title;
  });

  const cProps = computed(() => {
    // Sort item name alphabetically
    // return meta.value?.props.sort((a, b) => a.name.localeCompare(b.name));
    return meta.value?.props;
  });

  const cSlots = computed(() => {
    return meta.value?.slots;
  });

  const cEvents = computed(() => {
    return meta.value?.events;
  });

  onMounted(async () => {
    meta.value = await fetchMeta();
  });

  const serializeSchema = (schema: PropertyMetaSchema): string[] => {
    if (typeof schema === 'string') { // string
      return schema.split('|').map(s => s.trim()).filter((t) => t !== 'undefined');
    }
    const types = schema.type.split('|').map(s => s.trim()).filter((t) => t !== 'undefined');

    if (types.length === 1) {
      // Boolean
      if (types[0] === 'boolean') {
        return ['boolean'];
      }

      // String
      if (types[0].startsWith('string')) {
        return ['string'];
      }

      // Number
      if (types[0] === 'number') {
        return ['number'];
      }
    }

    if (schema.kind === 'enum' && Array.isArray(schema.schema) && schema.schema.length < 8) {
      return schema.schema.map((s) => serializeSchema(s)).flat();
    }

    return types;
  }

  const defineTypeFormat = (t: string) => {
    if (
      (t.startsWith('"') && t.endsWith('"'))
      || (t.startsWith('\'') && t.endsWith('\''))
      || t === 'string'
    ) {
      return 'string';
    }

    if (t === 'boolean') {
      return 'boolean';
    }

    if (t === 'number') {
      return 'boolean';
    }

    return 'object';
  };

  function fetchMeta(): Promise<ComponentApi | undefined> {
    const url = `/assets/components-meta/${component.value}.json`;

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  };

  return {
    component,
    cProps,
    cSlots,
    cEvents,
    serializeSchema,
    defineTypeFormat,
  };
}
