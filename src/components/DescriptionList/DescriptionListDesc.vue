<template lang="pug">
dd(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/DescriptionList.json';

@Component
export default class DescriptionListDesc extends Vue {
  public className = classNames(styles.Description);
}
</script>
