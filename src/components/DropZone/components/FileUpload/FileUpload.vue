<template lang="pug">
div(:class="fileUploadClassName")
  Stack(
    v-if="size === 'large' || size === 'medium'",
    vertical,
    spacing="tight",
  )
    div(:class="actionClassNames") {{ title }}
    Caption(v-if="actionHint")
      TextStyle(variation="subdued") {{ actionHint }}
  uploadArrow(
    v-else,
    width="20",
  )
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, toRefs, watch } from 'vue';
import { classNames } from 'polaris-react/src/utilities/css';
import { capitalize } from 'polaris-react/src/utilities/capitalize';
import uploadArrow from 'polaris-react/src/components/DropZone/images/upload-arrow.svg';
import { Stack, Caption, TextStyle } from '@/components';
import styles from '@/classes/DropZone-FileUpload.json';
import { createAllowMultipleKey } from '../../utils';

interface FileUploadProps {
  actionTitle?: string;
  actionHint?: string;
}

const lang = inject('lang') as Record<string, any>;

const { size, measuring, type, disabled, allowMultiple } = toRefs(inject('dropZoneContext') as any);

const typeSuffix = capitalize(type.value);
const allowMultipleKey = createAllowMultipleKey(allowMultiple.value);

const props = defineProps<FileUploadProps>();

const title = computed(() => {
  return props.actionTitle || lang.Polaris.DropZone[allowMultipleKey][`actionTitle${typeSuffix}`]
});

const actionClassNames = classNames(
  styles.Action,
  disabled.value && styles.disabled,
);

const fileUploadClassName = computed(() => {
  return classNames(
    styles.FileUpload,
    // measuring && styles.measuring,
    size.value === 'large' && styles.large,
    size.value === 'small' && styles.small,
  );
});
</script>
<style lang="scss">
@import 'polaris-react/src/components/DropZone/components/FileUpload/FileUpload.scss';
</style>