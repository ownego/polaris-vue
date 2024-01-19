<template lang="pug">
.docs-props-table
  .docs-props-table__wrapper(v-if="cProps")
    .docs-props-table__table
      .docs-props-table__th interface {{ component }}Props
      .docs-props-table__row(
        v-for="p, index in cProps",
        :key="p.name",
        :class="{'docs-props-table__row--expanded': extraType[p.name] && extraType[p.name].isExpanded}",
      )
        dt
          span.dpt__name
            | {{ p.name }}
            span.dpt__optional(v-if="!p.required") ?
          span.dpt__types
            template(
              v-for="t, idx in serializeSchema(p.schema)",
              :key="t",
            )
              span(v-if="idx") |
              span.dpt__type(
                :data-props-type="defineTypeFormat(t)",
                @click="expandType(t, p.name)",
              ) {{ doubleQuoteToSingleQuote(t) }}

        dd(v-if="p.description || p.tags.length > 0")
          p.dpt__description(v-html="p.description")
          p.dpt__tags(v-if="p.tags")
            template(
              v-for="tag in p.tags",
              :key="tag.name",
            )
              span.dpt__tag(
                v-if="tag.name === 'default'",
                :data-tag-type="tag.name",
              )
                | Default to
                span {{ tag.text }}
        .dpt__type-table(v-if="extraType[p.name] && extraType[p.name].isExpanded")
          template(v-if="extraType[p.name].types")
            .docs-props-table__th
              span {{ syntaxKindToDeveloperFriendlyString(extraType[p.name].syntaxKind) }} {{ extraType[p.name].types.name }}
              .docs-props-table__close(
                @click="extraType[p.name].isExpanded = false",
              ) &times;
            template(v-if="extraType[p.name].types.members.length")
              .docs-props-table__row(
                v-for="m in extraType[p.name].types.members",
                :key="m.name",
              )
                dt
                  span.dpt__name
                    | {{ m.name }}
                    span.dpt__optional(v-if="m.isOptional") ?
                  span.dpt__types
                    template(
                      v-for="s, sIndex in serializeSchema(m.value)",
                      :key="s",
                    )
                      span(v-if="sIndex") |
                      span.dpt__type(
                        :data-props-type="defineTypeFormat(s)",
                      ) {{ doubleQuoteToSingleQuote(s) }}
                dd(v-if="m.description")
                  p.dpt__description(v-html="p.description")

            .docs-props-table__row(v-else)
              dt
                span.dpt__types
                  template(
                    v-for="v, vIndex in serializeSchema(extraType[p.name].types.value)",
                    :key="v",
                  )
                    span(v-if="vIndex") |
                    span.dpt__type(
                      :data-props-type="defineTypeFormat(v)",
                    ) {{ doubleQuoteToSingleQuote(v) }}

          template(v-else)
            .docs-props-table__row No type found for this prop.

  .docs-props-table--non-prop(v-else)
    div(v-html="noMetaContent")
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import { useMeta } from '../use/useMeta';

const {
  cProps,
  component,
  serializeSchema,
  defineTypeFormat,
} = useMeta();
const md = new MarkdownIt();

const extraType = ref<{[key: string]: any}>({});

const noMetaContent = computed(() => {
  return md.render(`
    No props found for this component, run \`yarn gen:docs\` to generate component meta first.
  `);
});

const doubleQuoteToSingleQuote = (str: string) => str.replace(/"/g, "'");
/**
 * Some types include () in the type name, e.g. (a | b)[]
 * Remove the () to make it easier to search for the type
 */
const getTypeName = (str: string) => str.replace(/\(|\)/g, '');

const expandType = async (t: string, propName: string) => {
  const type = getTypeName(t);

  if (extraType.value[propName] && extraType.value[propName].isExpanded) {
    extraType.value[propName].isExpanded = !extraType.value[propName].isExpanded;
    return;
  }

  // Remove [] from type
  const typeName = type.replace(/\[\]/g, '');

  let types = null;

  try {
    types = await fetchType(typeName, true);
  } catch (error) {
  }

  if (!types) {
    console.log(`No extra type found for ${typeName}, trying to fetch from types collection...`);
    types = await fetchType(typeName);

    if (!types) {
      console.log(`No type found for ${typeName}`);
      return;
    }
  }

  console.log(`Found type for ${typeName}`);
  extraType.value[propName] = {
    isExpanded: true,
    types,
  }
}

function fetchType(type: string, isExtra?: boolean) {
  const url = isExtra
    ? `/assets/extra-types/${type}.json`
    : `/assets/components-types/${type}.json`;

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

const syntaxKindToDeveloperFriendlyString = (
  syntaxKind: string | undefined,
): string => {
  if (syntaxKind === 'EnumDeclaration') {
    return `enum`;
  } else if (syntaxKind === 'TypeAliasDeclaration') {
    return `type`;
  }
  return `interface`;
}
</script>

<style lang="scss">
@import '../scss/meta-tables.scss';
</style>
