<template>
<DropZone :allow-multiple="false" @drop="handleDropZoneDrop">
  <LegacyStack v-if="file">
    <Thumbnail
      size="small"
      :alt="file.name"
      :source="
        validImageTypes.includes(file.type)
          ? getSource(file)
          : NoteIcon
      "
    />
    <div>
      {{ file.name }}{{ ' ' }}
      <Text variant="bodySm" as="p">{{ file.size }} bytes</Text>
    </div>
  </LegacyStack>
  <DropZoneFileUpload v-else />
</DropZone>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import NoteIcon from '@shopify/polaris-icons/dist/svg/NoteIcon.svg';
import NoteIcon from '@icons/NoteIcon.svg';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const file = ref<File | null>(null);

const handleDropZoneDrop = (_dropFiles: File[], acceptedFiles: File[]) => {
  file.value = acceptedFiles[0];
};

const getSource = (file: File) => {
  return window.URL.createObjectURL(file);
}
</script>
