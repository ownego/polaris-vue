<template lang="pug">
.docs-dodont
  .docs-dodont__card.docs-dodont__do
    template(
      v-for="s, index in doContent",
      :key="index",
    )
      component(:is="s")
  .docs-dodont__card.docs-dodont__dont
    template(
      v-for="s, index in dontContent",
      :key="index",
    )
      component(:is="s")
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';

const slots = useSlots();

const slotContent = slots.default();

const doContent = ref([]);
const dontContent = ref([]);

let contentWall = 'do';

slotContent.map((s) => {
  if (s.type === 'h4') {
    if (s.props.id.startsWith('don-t')) {
      contentWall = 'dont';
    }

    s.props.class = 'docs-dodont__title';
    s.props['data-dodont-type'] = contentWall;
  }

  if (contentWall === 'do') {
    // Put image at beginning of doContent
    if (s.type === 'p' && s.children[0].type === 'img') {
      s.props = { class: 'docs-dodont__image' };

      doContent.value.unshift(s);
    } else {
      doContent.value.push(s);
    }
  } else {
    if (s.type === 'p' && s.children[0].type === 'img') {
      s.props = { class: 'docs-dodont__image' };

      dontContent.value.unshift(s);
    } else {
      dontContent.value.push(s);
    }
  }
})
</script>

<style lang="scss">
.docs-dodont {
  display: flex;
  gap: 1rem;
  height: max-content;
  margin-bottom: 1rem;

  p.docs-dodont__image {
    margin: -1rem -1rem 1rem -1rem;
    border-radius: 0.5rem 0.5rem 0 0;
    overflow: hidden;
  }
}

.docs-dodont__card {
  width: calc(50% - 1rem);
  flex: 1 0 calc(50% - 1rem);
  padding: 1rem;
  border-radius: var(--border-radius-700);
  background-color: var(--surface);
  border-radius: var(--p-border-radius-300, 12px);

  .dark & {
    box-shadow: var(--card-shadow);
  }

  p {
    margin: 0.5rem 0 0;
    line-height: 20px;
  }
}

h4.docs-dodont__title {
  display: flex;
  font-size: var(--font-size-100);
  letter-spacing: 0;
  width: -moz-fit-content;
  width: fit-content;
  margin-top: 0;
  font-weight: var(--font-weight-600);
  border-radius: var(--border-radius-500);
  padding-right: 0.5rem;
  color: #fff;
  fill: #fff;

  &::before {
    content: '';
    display: block;
    height: 1.25rem;
    width: 1.25rem;
    max-height: 100%;
    max-width: 100%;
    margin: auto;
    background: transparent no-repeat center center;
  }

  &[data-dodont-type="do"] {
    background: var(--background-bg-success-strong,#008656);

    &::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' class='Polaris-Icon__Svg' focusable='false' aria-hidden='true'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M14.03 7.22a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 3.97-3.97a.75.75 0 0 1 1.06 0Z'%3E%3C/path%3E%3C/svg%3E");
    }
  }

  &[data-dodont-type="dont"] {
    background: var(--background-bg-critical-strong,#fa0000);

    &::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' class='Polaris-Icon__Svg' focusable='false' aria-hidden='true'%3E%3Cpath fill='%23fff' d='M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z'%3E%3C/path%3E%3C/svg%3E");
    }
  }
}
</style>
