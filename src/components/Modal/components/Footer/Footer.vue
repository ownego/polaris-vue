<template lang="pug">
div(:class="styles.Footer")
  div(:class="styles.FooterContent")
    Stack(alignment="center", no-item-wrap)
      StackItem(:fill="true")
        slot
      StackItem(v-if="primaryAction || secondaryActions")
        ButtonGroup
          template(
            v-if="secondaryActions",
            v-for="action, index in secondaryActions",
            :key="index"
          )
            ButtonFrom(:action="action")
          ButtonFrom(:action="primaryAction", :overrides="{ primary: true }")
</template>

<script setup lang="ts">
import type { ComplexAction } from '@/utilities/interface';
import styles from '@/classes/Modal-Footer.json';
import { Stack, StackItem } from '@/components/Stack';
import { ButtonGroup } from '@/components/ButtonGroup';
import { ButtonFrom } from '@/components/Button';

interface Props {
  primaryAction?: ComplexAction;
  secondaryActions?: ComplexAction[];
}

defineProps<Props>();
</script>

<style lang="scss">
@import 'polaris-react/src/components/Modal/components/Footer/Footer.scss';
</style>
