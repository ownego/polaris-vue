<template lang="pug">
div(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import styles from '@/classes/Popover.json';

@Component
export default class Section extends Vue {
  public className = styles.Section;
}
</script>
