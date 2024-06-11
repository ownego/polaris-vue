<template lang="pug">
div(:class="fileUploadClassName")
  BlockStack(
    v-if="size === 'large' || size === 'medium'",
    inline-align="center",
    gap="200",
  )
    Button(
      :diabled="disabled",
    ) {{ actionTitleValue }}
    Text(
      v-if="actionHint",
      variant="bodySm",
      as="p",
      tone="subdued",
    ) {{ actionHint }}

  div(
    v-else,
    :class="classNames(styles.UploadIcon, disabled && styles.disabled)",
  )
    Icon(:source="UploadIcon")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { capitalize } from '@polaris/utilities/capitalize';
import { classNames } from '@/utilities/css';
import useI18n from '@/use/useI18n';
import { BlockStack, Icon, Text, Button } from '@/components';
import { createAllowMultipleKey } from '../../utils';
import { useDropZoneContext } from '../../useDropZoneContext';
import styles from '@polaris/components/DropZone/components/FileUpload/FileUpload.module.css';
import UploadIcon from '@icons/UploadIcon.svg';

type FileUploadProps = {
  actionTitle?: string;
  actionHint?: string;
}

const i18n = useI18n();
const { size, measuring, type, disabled, allowMultiple } = useDropZoneContext();

const typeSuffix = capitalize(type.value);
const allowMultipleKey = createAllowMultipleKey(allowMultiple.value);

const props = defineProps<FileUploadProps>();

const actionTitleValue = computed(() => (
  props.actionTitle || i18n.translate(`Polaris.DropZone.${allowMultipleKey}.actionTitle${typeSuffix}`)
))

const fileUploadClassName = computed(() => classNames(
  styles.FileUpload,
  measuring.value && styles.measuring,
  size.value === 'large' && styles.large,
  size.value === 'small' && styles.small,
));
</script>
