<template>
<DropZone :outline="false" @drop="handleDrop">
  <LegacyCard sectioned>
    <DropZone @click="handleDropZoneClick">
      <LegacyStack v-if="files.length" :vertical="true">
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
                : NoteMinor
            "
          />
          <div>
            {{ file.name }}{{ ' ' }}
            <Text variant="bodySm" as="p">{{file.size}} bytes</Text>
          </div>
        </LegacyStack>
      </LegacyStack>
      <DropZoneFileUpload v-else />
    </DropZone>
  </LegacyCard>
</DropZone>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import NoteMinor from '@shopify/polaris-icons/dist/svg/NoteMinor.svg';
import NoteMinor from '@icons/NoteMinor.svg';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const files = ref<File[]>([]);

const handleDrop = (_dropFiles: File[]) => {
  files.value = [...files.value, ..._dropFiles];
};

const handleDropZoneClick = () => {};

const getSource = (file: File) => {
  return window.URL.createObjectURL(file);
};
</script>
