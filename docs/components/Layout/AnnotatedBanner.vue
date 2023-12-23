<template>
<Page fullWidth>
  <Layout>
    <LayoutSection>
      <Banner title="Order archived" @dismiss="() => {}">
        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
      </Banner>
    </LayoutSection>
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
