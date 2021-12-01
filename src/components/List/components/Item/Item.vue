<template lang="pug">
li(:class="className")
  slot
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import * as style from '@/classes/List.json';

export default class Item extends Vue {
  public className = style.Item;
}
</script>
