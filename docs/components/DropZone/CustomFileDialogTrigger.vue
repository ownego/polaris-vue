<template>
<LegacyCard
  sectioned
  title="Product Images"
  :actions="[{ content: 'Upload Image', onAction: toggleOpenFileDialog }]"
>
  <DropZone
    :open-file-dialog="openFileDialog"
    @drop="handleDropZoneDrop"
    @file-dialog-close="toggleOpenFileDialog"
  >
    <LegacyStack vertical>
      <LegacyStack
        v-for="file, index in files"
        :key="index"
        alignment="center"
      >
        <Thumbnail
          size="small"
          :alt="file.name"
          :source="
            validImageTypes.indexOf(file.type) > -1
              ? getSource(file)
              : NoteMinor
          "
        />
        <div>
          {{ file.name }}{{ ' ' }}
          <Text variant="bodySm" as="p">{{ file.size }} bytes</Text>
        </div>
      </LegacyStack>
    </LegacyStack>
  </DropZone>
</LegacyCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import NoteMinor from '@shopify/polaris-icons/dist/svg/NoteMinor.svg';
import NoteMinor from '@icons/NoteMinor.svg';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const files = ref<File[]>([]);
const openFileDialog = ref(false);

const toggleOpenFileDialog = () => {
  openFileDialog.value = !openFileDialog.value;
};

const handleDropZoneDrop = (dropFiles: File[]) => {
  files.value = [...files.value, ...dropFiles];
};

const getSource = (file: File) => {
  return window.URL.createObjectURL(file);
};
</script>
