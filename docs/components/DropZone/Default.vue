<template>
<DropZone @drop="handleDrop">
  <div v-if="files.length" :style="{padding: '0'}">
    <LegacyStack vertical>
      <LegacyStack
        v-for="file, index in files"
        :key="index"
        alignment="center"
      >
        <Thumbnail
          size="small"
          :alt="file.name"
          :source="validImageTypes.includes(file.type) ? getSource(file) : NoteIcon"
        />
        <div>
          {{ file.name }}&nbsp;
          <Text variant="bodySm" as="p">{{ file.size }} bytes</Text>
        </div>
      </LegacyStack>
    </LegacyStack>
  </div>
  <DropZoneFileUpload v-else />
</DropZone>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import NoteIcon from '@shopify/polaris-icons/dist/svg/NoteIcon.svg';
import NoteIcon from '@icons/NoteIcon.svg';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const files = ref<File[]>([]);

const handleDrop = (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
  files.value = [...files.value, ...acceptedFiles];
};

const getSource = (file: File) => {
  return window.URL.createObjectURL(file);
}
</script>
