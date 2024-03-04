<template>
<Page fullWidth>
  <Layout>
    <LayoutSection variant="oneHalf">
      <LegacyCard title="Florida" :actions="[{content: 'Manage'}]">
        <LegacyCardSection>
          <Text tone="subdued" as="span">
            455 units available
          </Text>
        </LegacyCardSection>
        <LegacyCardSection title="Items">
          <ResourceList :resourceName="{singular: 'product', plural: 'products'}" :items="resourceItems">
            <ResourceItem
              v-for="item in resourceItems"
              :key="item.id"
              :id="item.id"
              :url="item.url"
              :accessibilityLabel="`View details for ${item.name}`"
            >
              <template #media>
                <Thumbnail
                  :source="item.media.source"
                  :alt="item.media.alt"
                />
              </template>
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {{ item.name }}
              </Text>
              <div>SKU: {{ item.sku }}</div>
              <div>{{ item.quantity }} available</div>
            </ResourceItem>
          </ResourceList>
        </LegacyCardSection>
      </LegacyCard>
    </LayoutSection>

    <LayoutSection variant="oneHalf">
      <LegacyCard title="Nevada" :actions="[{content: 'Manage'}]">
        <LegacyCardSection>
          <Text tone="subdued" as="span">
            301 units available
          </Text>
        </LegacyCardSection>
        <LegacyCardSection title="Items">
          <ResourceList :resourceName="{singular: 'product', plural: 'products'}" :items="resourceItems">
            <ResourceItem
              v-for="item in resourceItemsSecond"
              :key="item.id"
              :id="item.id"
              :url="item.url"
              :accessibilityLabel="`View details for ${item.name}`"
            >
              <template #media>
                <Thumbnail
                  :source="item.media.source"
                  :alt="item.media.alt"
                />
              </template>
              <Text variant="bodyMd" fontWeight="bold" as="h3">
                {{ item.name }}
              </Text>
              <div>SKU: {{ item.sku }}</div>
              <div>{{ item.quantity }} available</div>
            </ResourceItem>
          </ResourceList>
        </LegacyCardSection>
      </LegacyCard>
    </LayoutSection>
  </Layout>
</Page>
</template>

<script setup lang="ts">
const resourceItems = [
  {
    id: '341',
    url: '#',
    name: 'Black & orange scarf',
    sku: '9234194023',
    quantity: '254',
    media: {
      source: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg',
      alt: 'Black orange scarf',
    },
  },
  {
    id: '256',
    url: '#',
    name: 'Tucan scarf',
    sku: '9234194010',
    quantity: '201',
    media: {
      source: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg',
      alt: 'Tucan scarf',
    },
  },
];

const resourceItemsSecond = [
  {
    id: '342',
    url: '#',
    name: 'Black & orange scarf',
    sku: '9234194023',
    quantity: '100',
    media: {
      source: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg',
      alt: 'Black orange scarf',
    },
  },
  {
    id: '257',
    url: '#',
    name: 'Tucan scarf',
    sku: '9234194010',
    quantity: '201',
    media: {
      source: 'https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg',
      alt: 'Tucan scarf',
    },
  },
];
</script>
