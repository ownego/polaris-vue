<template lang="pug">
div {{ 'modal nà' }}
</template>

<script setup lang="ts">

export interface CreateViewModalProps {
  open: boolean;
  onClose: () => void;
  onClickPrimaryAction: (value: string) => Promise<boolean>;
  onClickSecondaryAction?: () => void;
  // activator: ModalProps['activator'];
  viewNames: string[];
}

// const MAX_VIEW_NAME_LENGTH = 40;
</script>
