<template lang="pug">
dt(:class="className")
  slot
</template>

<script setup lang="ts">
import { classNames } from 'polaris-react/src/utilities/css';
import styles from '@/classes/DescriptionList.json';

const className = classNames(styles.Term);
</script>
