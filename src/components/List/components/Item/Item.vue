<template lang="pug">
li(:class="className")
  slot
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as style from '@/classes/List.json';

@Component
export default class Item extends Vue {
  public className = style.Item;
}
</script>
