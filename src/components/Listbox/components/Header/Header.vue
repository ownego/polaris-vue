<template lang="pug">
div(:id="sectionContext", aria-hidden)
  div(
    v-if="!isSlotContainHTMLTag",
    :class="className",
  )
    slot
  slot(v-else)
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';
import styles from '@/classes/Listbox-Header.json';

@Component
export default class Header extends Vue {
   @Inject({ default: '' }) sectionContext!: string;

   public className: string = styles.Header;

   get isSlotContainHTMLTag(): boolean {
     return Boolean(
       this.$slots.default
       && this.$slots.default.length < 2
       && this.$slots.default[0]?.tag,
     );
   }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Header/Header.scss';
</style>
