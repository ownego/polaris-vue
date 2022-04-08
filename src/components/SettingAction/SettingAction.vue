<template lang="pug">
div(:class="styles.SettingAction")
  div(:class="styles.Setting")
    slot(name="setting")
  div(:class="styles.Action")
    slot(name="action")
</template>

<script setup lang="ts">
import styles from '@/classes/SettingAction.json';
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/SettingAction/SettingAction.scss';
</style>
