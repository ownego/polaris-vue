<template>
<DropZone @drop="handleDropZoneDrop">
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
          :source="validImageTypes.includes(file.type) ? getSource(file) : NoteMinor"
        />
        <div>
          | {{ file.name }}&nbsp;
          <Text variant="bodySm" as="p">
            | {{ file.size }} bytes
          </Text>
        </div>
      </LegacyStack>
    </LegacyStack>
  </div>
  <FileUpload v-else />
</DropZone>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import NoteMinor from '@shopify/polaris-icons/dist/svg/NoteMinor.svg';
import NoteMinor from '@icons/NoteMinor.svg';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const files = ref<File[]>([]);

const handleDropZoneDrop = (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
  console.log(_dropFiles, acceptedFiles, _rejectedFiles);
  files.value = [...files.value, ...acceptedFiles];
};

const getSource = (file: File) => {
  window.URL.createObjectURL(file);
}
</script>
