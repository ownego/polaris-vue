<template>
<DatePicker
  allow-range
  :month="month"
  :year="year"
  v-model="selectedDates"
  @month-change="handleMonthChange"
/>
<p :style="{marginTop: '1rem'}">Selected Date: {{ selectedDates }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const month = ref(1);
const year = ref(2024);

const selectedDates = ref({
  start: new Date('Wed Feb 07 2024 00:00:00 GMT-0500 (EST)'),
  end: new Date('Wed Feb 10 2024 00:00:00 GMT-0500 (EST)'),
});

const handleMonthChange = (m: number, y: number) => {
  month.value = m;
  year.value = y;
};
</script>
