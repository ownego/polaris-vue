<template lang="pug">
div(:id="sectionId || ''", aria-hidden)
  div(
    v-if="typeof children === 'string'",
    :class="className",
  ) {{ children }}
  component(v-else, :is="children")
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
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/Listbox/components/Header/Header.scss';
</style>
