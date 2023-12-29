<template>
<Page fullWidth>
  <Layout>
    <LayoutAnnotatedSection
      id="storeDetails"
      title="Store details"
      description="Shopify and your customers will use this information to contact you."
    >
      <LegacyCard sectioned>
        <FormLayout>
          <TextField
            label="Store name"
            @change="() => {}"
            autoComplete="off"
          />
          <TextField
            type="email"
            label="Account email"
            @change="() => {}"
            autoComplete="email"
          />
        </FormLayout>
      </LegacyCard>
    </LayoutAnnotatedSection>
  </Layout>
</Page>
</template>
