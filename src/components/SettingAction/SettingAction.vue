<template lang="pug">
div(:class="className")
  div(:class="settingClass")
    slot(name="setting")
  div(:class="actionClass")
    slot(name="action")
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/SettingAction.json';

@Component
export default class SettingAction extends Vue {
  public className = styles.SettingAction;

  public settingClass = styles.Setting;

  public actionClass = styles.Action;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/SettingAction/SettingAction.scss';
</style>
