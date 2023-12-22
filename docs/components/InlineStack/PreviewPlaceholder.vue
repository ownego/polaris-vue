<template>
<div
  :style="style"
>
  <InlineStack align="center">
    <div
      style="color: var(--p-color-text-info-on-bg-fill)"
    >
      <Text
        as="h2"
        variant="bodyMd"
        fontWeight="medium"
        tone="text-inverse"
      >
        {{ label }}
      </Text>
    </div>
  </InlineStack>
</div>
</template>

<script setup lang="ts">
interface PlaceholderProps {
  height?: string;
  width?: string;
  label?: string;
  showBorder?: boolean;
  showBorderTop?: boolean;
  padding?: string;
}

const props = withDefaults(defineProps<PlaceholderProps>(), {
  height: 'auto',
  width: 'auto',
  label: '',
  showBorder: false,
  showBorderTop: false,
  padding: '6px 0px',
});

const style = {
  background: 'var(--p-color-text-info)',
  height: props.height,
  width: props.width,
  borderInlineStart: props.showBorder
    ? '1px dashed var(--p-color-bg-surface-success)'
    : 'none',
  borderBlockStart: props.showBorderTop
    ? '1px dashed var(--p-color-bg-surface-success)'
    : 'none',
  padding: props.padding,
};
</script>
