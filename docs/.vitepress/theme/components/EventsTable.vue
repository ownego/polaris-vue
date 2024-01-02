<template lang="pug">
.docs-props-table
  .docs-props-table__wrapper(v-if="metaEvents")
    .docs-props-table__table
      .docs-props-table__th {{ component }} events
      .docs-props-table__row(
        v-for="p in metaEvents",
        :key="p.name",
      )
        dt
          span.dpt__name
            span.dpt__name--colorize @
            | {{ p.name }}
          span.dpt__types
            | (
            template(
              v-for="t, index in serializeParams(p.params)",
              :key="t",
            )
              span.dpt__type.dpt-type-separator(v-if="index") ,&nbsp;
              span.dpt__type.dpt-type-name {{ t.name }}:&nbsp;
              span.dpt__type(
                :data-props-type="defineTypeFormat(t.type)",
              ) {{ t.type }}
            | ) &equals;&gt;&nbsp;
            span.dpt__type void

        dd(v-if="p.description || (p.tags && p.tags.length > 0)")
          p.dpt__description(v-html="p.description")

  .docs-props-table--non-prop(v-else)
    div(v-html="noMetaContent")
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import { useMeta } from '../use/useMeta';

type EventParams = {
  [key: string]: string;
};

type ComponentEventMeta = {
  name: string;
  description?: string;
  params?: EventParams;
};

type EventTypeProps = {
  typeFile?: string;
};

const props = defineProps<EventTypeProps>();

const {
  cEvents,
  component,
  defineTypeFormat,
} = useMeta();

const md = new MarkdownIt();

const metaEvents = ref<ComponentEventMeta[]>([]);

const noMetaContent = computed(() => {
  return md.render(`
    No slots found for this component, run \`yarn gen:docs\` to generate component meta first.
  `);
});

onMounted(async () => {
  if (!props.typeFile) {
    metaEvents.value = cEvents.value;
    return;
  }

  const events = await fetchTypes(props.typeFile);

  metaEvents.value = events.members.map((e) => {
    console.log(convertStringToObject(e.value));
    return {
      name: e.name.replace(/["']/g, ''),
      description: e.description,
      params: convertStringToObject(e.value),
    }
  });
});

const serializeParams = (params: Record<string, any>) => {
  return Object.keys(params).map((key) => {
    return {
      name: key,
      type: params[key],
    };
  });
};

function fetchTypes(file: string): Promise<Record<string, any> | undefined> {
  const url = `/assets/components-types/${file}.json`;

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

/**
 * Convert a string to object
 * '[name: string, collections: string[], products: Record<string, any>]'
 * to { name: 'string', collections: 'string[]', products: 'Record<string, any>' }
 */
 function convertStringToObject(str: string): Record<string, string> {
  const obj: Record<string, string> = {};

  if (str === '[]') {
    return obj;
  }

  // Convert string to array
  const regex = /,?\s*(\w*?|\.\.\.\w*?):/g;

  const parsedStr = str.replace(/^\[|\]$/g, '').replace(regex, '|||$1:').replace(/^\|\|\|/, '');
  const arr = parsedStr.split('|||');

  // Convert array to object
  arr.forEach(item => {
    const [key, value] = item.split(':').map(i => i.trim());

    obj[key] = value;
  });

  return obj;
}
</script>

<style lang="scss">
@import '../scss/meta-tables.scss';
</style>
