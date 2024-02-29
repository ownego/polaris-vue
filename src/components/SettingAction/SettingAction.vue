<template lang="pug">
div(:class="styles.SettingAction")
  div(:class="styles.Setting")
    slot
  div(:class="styles.Action")
    slot(name="action")
</template>

<script setup lang="ts">
import styles from '@polaris/components/SettingAction/SettingAction.module.scss';
</script>
