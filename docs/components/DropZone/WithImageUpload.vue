<template>
<LegacyStack vertical>
  <Banner v-if="hasError" title="The following images couldn't be uploaded:" tone="critical">
    <List type="bullet">
      <ListItem v-for="file, index in rejectedFiles" :key="index">
        {{ `"${file.name}" is not supported. File type must be .gif, .jpg, .png or .svg.` }}
      </ListItem>
    </List>
  </Banner>
  <DropZone accept="image/*" type="image" @drop="handleDrop">
    <LegacyStack v-if="files.length" vertical>
      <LegacyStack v-for="file, index in files" :key="index">
          <Thumbnail
            size="small"
            :alt="file.name"
            :source="getSource(file)"
          />
          <div>
            {{ file.name }}{{ ' ' }}
            <Text variant="bodySm" as="p">
              {{ file.size }} bytes
            </Text>
          </div>
      </LegacyStack>
    </LegacyStack>
    <DropZoneFileUpload v-else />
  </DropZone>
</LegacyStack>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const files = ref<File[]>([]);
const rejectedFiles = ref<File[]>([]);

const hasError = computed(() => rejectedFiles.value.length > 0);

const handleDrop = (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
  files.value = [...files.value, ...acceptedFiles];
  rejectedFiles.value = [...rejectedFiles.value, ..._rejectedFiles];
};

const getSource = (file: File) => {
  return window.URL.createObjectURL(file);
}
</script>
