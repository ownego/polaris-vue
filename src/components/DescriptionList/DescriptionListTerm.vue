<template lang="pug">
dt(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/DescriptionList.json';

@Component
export default class DescriptionListTerm extends Vue {
  public className = classNames(styles.Term);
}
</script>
