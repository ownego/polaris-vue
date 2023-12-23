<template>
<Page fullWidth>
  <Layout>
    <LayoutSection>
      <Card roundedAbove="sm">
        <Text as="h2" variant="headingSm">
          Order details
        </Text>
        <Box paddingBlockStart="200">
          <Text as="p" variant="bodyMd">
            Use to follow a normal section with a secondary section to create
            a 2/3 + 1/3 layout on detail pages (such as individual product or
            order pages). Can also be used on any page that needs to structure
            a lot of content. This layout stacks the columns on small screens.
          </Text>
        </Box>
      </Card>
    </LayoutSection>

    <LayoutSection variant="oneThird">
      <Card roundedAbove="sm">
        <Text as="h2" variant="headingSm">Tags</Text>
        <Box paddingBlockStart="200">
          <Text as="p" variant="bodyMd">Add tags to your order.</Text>
        </Box>
      </Card>
    </LayoutSection>
  </Layout>
</Page>
</template>
