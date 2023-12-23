<template>
<Page fullWidth>
  <Layout>
    <LayoutSection variant="oneThird">
      <div :style="{ marginTop: 'var(--p-space-500)' }">
        <TextContainer>
          <Text id="storeDetails" variant="headingMd" as="h2">
            Store details
          </Text>
          <Text tone="subdued" as="p">
            Shopify and your customers will use this information to contact
            you.
          </Text>
        </TextContainer>
      </div>
    </LayoutSection>
    <LayoutSection>
      <LegacyCard sectioned>
        <FormLayout>
          <TextField
            label="Store name"
            autoComplete="off"
            @change="() => {}"
          />
          <TextField
            type="email"
            label="Account email"
            @change="() => {}"
            autoComplete="email"
          />
        </FormLayout>
      </LegacyCard>
    </LayoutSection>
  </Layout>
</Page>
</template>
