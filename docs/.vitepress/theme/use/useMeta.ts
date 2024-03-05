import { computed, onMounted, ref } from 'vue';
import { useData } from 'vitepress';
import type { PropertyMetaSchema } from 'vue-component-meta';
import type { ComponentApi } from '../types';

export function useMeta(ignoreFetch = false) {
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
    if (ignoreFetch) {
      return;
    }

    meta.value = await fetchMeta();
  });

  const serializeSchema = (schema: PropertyMetaSchema): string[] => {
    if (typeof schema === 'string') { // string
      let tmpSchema = schema;

      if (tmpSchema === 'false') {
        tmpSchema = 'boolean';
      }

      if (tmpSchema === 'true') {
        tmpSchema = '';
      }

      if (tmpSchema.startsWith('ComponentOptions')) {
        tmpSchema = 'Component';
      }

      if (
        tmpSchema.startsWith('FunctionalComponent')
        || tmpSchema.startsWith('ComponentPublicInstanceConstructor')
      ) {
        tmpSchema = '';
      }

      return tmpSchema.split('|').map(s => s.trim()).filter((t) => t && t !== 'undefined');
    }

    if (schema.kind === 'event') {
      const eventPattern = /\((.*)\):\s*(.*)/;
      const match = eventPattern.exec(schema.type);

      if (match) {
        return ['(', match[1], ') ', '=> ', match[2]];
      }
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

      if (types[0] === 'ResponsiveProp<boolean>') {
        return ['ResponsiveProp'];
      }

      if (types[0] === 'AutoSelection') {
        return ['AutoSelection'];
      }
    }

    const combinedPattern = /(\w*)\s*\&\s*\{?(.*)/;
    if (combinedPattern.test(types[0])) {
      const match = combinedPattern.exec(types[0]);

      if (match) {
        let m1 = match[1].trim();
        let m2 = match[2].trim();

        if (m1.includes(':')) {
          m1 = `{ ${m1} }`;
        }

        if (m2.includes(':')) {
          m2 = `{ ${m2} }`;
        }

        if (m2.includes(')')) {
          m2 = m2.replace(')', '');
        }

        return [m1, '&', m2].map((s) => serializeSchema(s)).flat();
      }
    }

    const startGroupPattern = /\((\w*)/;
    const endGroupPattern = /(\w*)\)(\[\])?/;

    if (
      types.length > 1
      && startGroupPattern.test(types[0])
      && endGroupPattern.test(types[types.length - 1])
    ) {
      const group = ['('];
      types.map((t, idx) => {
        if (!idx) {
          const startMatch = startGroupPattern.exec(t);
          group.push(startMatch && startMatch.length > 1 ? startMatch[1] : t);
          return;
        }

        if (endGroupPattern.test(t)) {
          const endMatch = endGroupPattern.exec(t);

          if (endMatch && endMatch.length > 1) {
            group.push(endMatch[1]);
            group.push(')[]');
          }
          return;
        }

        return group.push(t);
      });

      return group.map((s) => serializeSchema(s)).flat();
    }

    if (schema.kind === 'enum' && Array.isArray(schema.schema) && schema.schema.length < 8) {
      return schema.schema.map((s) => serializeSchema(s)).flat();
    }

    return types;
  }

  const defineTypeFormat = (t?: string) => {
    if (!t) return 'object';

    if (
      (t.startsWith('"') && t.endsWith('"'))
      || (t.startsWith('\'') && t.endsWith('\''))
      || t.startsWith('string')
      || t.endsWith('string')
      || t.startsWith('=>')
    ) {
      return 'string';
    }

    if (t === '&' || t === '(' || t.startsWith(')')) {
      return 'none';
    }

    if (/\{.*\}/.test(t) || t === 'Component') {
      return 'collection';
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
