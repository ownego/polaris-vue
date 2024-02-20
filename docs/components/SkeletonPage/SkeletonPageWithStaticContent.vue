<template>
<SkeletonPage title="Products" primaryAction>
  <Layout>
    <LayoutSection>
      <LegacyCard sectioned>
        <SkeletonBodyText />
      </LegacyCard>
      <LegacyCard sectioned title="Images">
        <SkeletonBodyText />
      </LegacyCard>
      <LegacyCard sectioned title="Variants">
        <SkeletonBodyText />
      </LegacyCard>
    </LayoutSection>
    <LayoutSection variant="oneThird">
      <LegacyCard title="Sales channels">
        <LegacyCardSection>
          <SkeletonBodyText :lines="2" />
        </LegacyCardSection>
        <LegacyCardSection>
          <SkeletonBodyText :lines="1" />
        </LegacyCardSection>
      </LegacyCard>
      <LegacyCard title="Organization" subdued>
        <LegacyCardSection>
          <SkeletonBodyText :lines="2" />
        </LegacyCardSection>
        <LegacyCardSection>
          <SkeletonBodyText :lines="2" />
        </LegacyCardSection>
      </LegacyCard>
    </LayoutSection>
  </Layout>
</SkeletonPage>
</template>
