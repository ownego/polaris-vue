<template>
<Page
  :back-action="{content: 'Products', url: '/products'}"
  title="Jar With Lock-Lid"
  :primary-action="{content: 'Save', disabled: true}"
  :secondary-actions="[
    {content: 'Duplicate'},
    {content: 'View on your store'},
  ]"
  :pagination="{
    hasPrevious: true,
    hasNext: true,
  }"
>
  <DropZone drop-on-page @drop="handleDropZoneDrop">
    <LegacyStack v-if="files.length" vertical>
        <LegacyStack
          v-for="file, index in files"
          alignment="center"
          :key="index"
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
    <DropZoneFileUpload v-else />
  </DropZone>
</Page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import NoteIcon from '@shopify/polaris-icons/dist/svg/NoteIcon.svg';
import NoteIcon from '@icons/NoteIcon.svg';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const files = ref<File[]>([]);

const handleDropZoneDrop = (_dropFiles: File[]) => {
  files.value = [...files.value, ..._dropFiles];
};

const getSource = (file: File) => {
  return window.URL.createObjectURL(file);
}
</script>
