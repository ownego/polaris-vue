import { type Ref, inject, ref } from 'vue';

export function useWithinContent() {
  const context = inject('within-content', ref(false)) as Ref<boolean>;

  return context;
}
