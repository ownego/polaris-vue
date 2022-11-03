<template lang="pug">
dt(:class="className")
  slot
</template>

<script setup lang="ts">
import { classNames } from '@/utilities/css';
import styles from '@/classes/DescriptionList.json';

const className = classNames(styles.Term);
</script>
