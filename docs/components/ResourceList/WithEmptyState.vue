<template>
<Page title="File">
  <Layout>
    <LayoutSection>
      <LegacyCard>
        <ResourceList
          :resourceName="resourceName"
          :items="items"
        >
          <template v-if="!appliedFilters.length && !items.length" #emptyState>
            <EmptyState
              heading="Upload a file to get started"
              image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
              :action="{content: 'Upload files'}"
            >
              <p>
                You can use the Files section to upload images, videos, and other
                documents
              </p>
            </EmptyState>
          </template>
          <template #filterControl>
            <Filters
              disabled
              queryPlaceholder="Filter files"
              :query-value="queryValue"
              :filters="filters"
              :appliedFilters="appliedFilters"
              @query-change="setQueryValue"
              @query-clear="handleQueryValueRemove"
              @clear-all="handleClearAll"
            >

          </Filters>
          </template>
        </ResourceList>
      </LegacyCard>
    </LayoutSection>
  </Layout>
</Page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const taggedWith = ref('');
const queryValue = ref('');

const setTaggedWith = (value: any) => {
  taggedWith.value = value;
};

const setQueryValue = (value: any) => {
  queryValue.value = value;
};

const handleTaggedWithRemove = () => setTaggedWith(undefined);
const handleQueryValueRemove = () => setQueryValue(undefined);

const handleClearAll = () => {
  handleTaggedWithRemove();
  handleQueryValueRemove();
};

const filters: any[] = [];
const appliedFilters : any[] = [];
const items: any[] = [];

const resourceName = {
  singular: 'file',
  plural: 'files',
};
</script>
