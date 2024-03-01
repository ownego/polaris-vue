
<template>
<div style="height: 250px; width: 100%">
  <FullscreenBar v-if="isFullscreen" @action="handleActionClick">
    <div
      :style="style"
    >
      <Badge tone="info">Draft</Badge>
      <div style="marginLeft: 1rem; flexGrow: 1">
        <Text variant="headingLg" as="p">
          Page title
        </Text>
      </div>
      <ButtonGroup>
        <Button>Secondary Action</Button>
        <Button variant="primary">
          Primary Action
        </Button>
      </ButtonGroup>
    </div>
  </FullscreenBar>
  <div style="padding: 1rem">
    <Button v-if="!isFullscreen" @click="setFullscreen(true)">Go Fullscreen</Button>
    <Text variant="headingLg" as="p">
      Page content
    </Text>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const style = {
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '1rem',
  paddingRight: '1rem',
}

const isFullscreen = ref(true);

const setFullscreen = (value: boolean) => {
  isFullscreen.value = value;
};

const handleActionClick = () => {
  setFullscreen(false);
};
</script>
