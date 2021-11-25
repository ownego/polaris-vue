<template lang="pug">
component(
  :is="element",
  :class="className",
)
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Styles extends Vue {}
</script>

<style lang="scss">
@import './List.scss';
</style>
