<template>
<DropZone @drop="handleDropZoneDrop" variable-height>
  <LegacyStack v-if="files.length" vertical>
    <LegacyStack
      v-for="file, index in files"
      :key="index"
      alignment="center"
    >
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
  </LegacyStack>
  <DropZoneFileUpload v-else action-hint="Accepts .gif, .jpg, and .png" />
</DropZone>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import NoteIcon from '@shopify/polaris-icons/dist/svg/NoteIcon.svg';
import NoteIcon from '@icons/NoteIcon.svg';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const files = ref<File[]>([]);

const handleDropZoneDrop = (_dropFiles: File[], acceptedFiles: File[]) => {
  files.value = [...files.value, ...acceptedFiles];
};

const getSource = (file: File) => {
  return window.URL.createObjectURL(file);
};
</script>
