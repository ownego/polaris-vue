<template>
<SkeletonPage primaryAction>
  <Layout>
    <LayoutSection>
      <LegacyCard sectioned>
        <SkeletonBodyText />
      </LegacyCard>
      <LegacyCard sectioned>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </TextContainer>
      </LegacyCard>
      <LegacyCard sectioned>
        <TextContainer>
          <SkeletonDisplayText size="small" />
          <SkeletonBodyText />
        </TextContainer>
      </LegacyCard>
    </LayoutSection>
    <LayoutSection variant="oneThird">
      <LegacyCard>
        <LegacyCardSection>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText :lines="2" />
          </TextContainer>
        </LegacyCardSection>
        <LegacyCardSection>
          <SkeletonBodyText :lines="1" />
        </LegacyCardSection>
      </LegacyCard>
      <LegacyCard subdued>
        <LegacyCardSection>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText :lines="2" />
          </TextContainer>
        </LegacyCardSection>
        <LegacyCardSection>
          <SkeletonBodyText :lines="2" />
        </LegacyCardSection>
      </LegacyCard>
    </LayoutSection>
  </Layout>
</SkeletonPage>
</template>
