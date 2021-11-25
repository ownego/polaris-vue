<template lang="pug">
li(:class="className")
  slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Styles from '../../Styles.vue';

@Component({
  mixins: [Styles],
})
export default class Item extends Vue {
  public className = this.$style.Item;
}
</script>
