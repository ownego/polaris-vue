<template>
<MediaCard
  title="Turn your side-project into a business"
  description="In this course, you'll learn how the Kular family turned their mom's recipe book into a global business."
  :primaryAction="{ content: 'Learn about getting started', onAction: () => {} }"
  :popoverActions="[{ content: 'Dismiss', onAction: () => {} }]"
>
  <VideoThumbnail
    thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
    :videoLength="80"
    @click="() => console.log('clicked')"
  />
</MediaCard>
</template>
