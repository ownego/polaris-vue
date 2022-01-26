<template lang="pug">
div(:id="sectionId || ''", aria-hidden)
  div(
    v-if="!isSlotContainHTMLTag",
    :class="className",
  )
    slot
  slot(v-else)
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { Component, Prop, Inject } from 'vue-property-decorator';
import styles from '@/classes/Header.json';

@Component
export default class Header extends Vue {
   @Inject({ default: '' }) sectionId!: string;

   @Prop({ type: [String, Object, Function] })
   public children!: string | object | VueConstructor<Vue>;

   public className: string = styles.Header;

   get isSlotContainHTMLTag(): boolean {
     return Boolean(this.$slots.default?.[0].tag);
   }
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Header/Header.scss';
</style>
