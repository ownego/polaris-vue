<template lang="pug">
div(:class="styles.FullscreenBar")
  button(
    :class="styles.BackAction",
    @click="$emit('action')",
    :aria-label="i18n.translate('Polaris.FullscreenBar.accessibilityLabel')",
  )
    Icon(:source="ExitMajor")
    | {{ i18n.translate('Polaris.FullscreenBar.back') }}
  slot
</template>
<script setup lang="ts">
import { UseI18n } from '@/use';
import { Icon } from '@/components';
import ExitMajor from '@icons/ExitMajor.svg';
import styles from '@/classes/FullscreenBar.json';

const i18n = UseI18n();
</script>
<style lang="scss">
@import 'polaris/polaris-react/src/components/FullscreenBar/FullscreenBar.scss';
</style>
