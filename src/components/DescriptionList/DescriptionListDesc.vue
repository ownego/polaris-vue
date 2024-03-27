<template lang="pug">
dd(:class="styles.Description")
  slot
</template>

<script setup lang="ts">
import styles from '@polaris/components/DescriptionList/DescriptionList.module.css';
</script>
