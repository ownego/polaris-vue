<template>
<Modal
  sectioned
  size="large"
  :open="active"
  :primary-action="primaryAction"
  :secondary-actions="secondaryActions"
  @close="active = false"
>
  <template #activator>
    <Button
      @click="active = true"
    >
      Open
    </Button>
  </template>

  <template #title>
    Import customers by CSV
  </template>

  <FormLayout>
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

    <Checkbox>
      <template #label>
        Overwrite existing customers that have the same email or phone
      </template>
    </Checkbox>
  </FormLayout>
</Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NoteIcon from '@icons/NoteIcon.svg';

const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

const active = ref(false);
const files = ref<File[]>([]);

const primaryAction = {
  content: 'Import customers',
  onAction: () => {
    // Do something
  },
};

const secondaryActions = [
  {
    content: 'Cancel',
    onAction: () => {
      // Do something
    },
  },
];

const handleDrop = (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
  files.value = [...files.value, ...acceptedFiles];
};

const getSource = (file: File) => {
  return window.URL.createObjectURL(file);
}
</script>
