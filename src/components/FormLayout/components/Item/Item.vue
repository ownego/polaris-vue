<template lang="pug">
div(:class="className")
  slot
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/FormLayout.json';

@Component
export default class Item extends Vue {
  public className = classNames(styles.Item);
}
</script>
