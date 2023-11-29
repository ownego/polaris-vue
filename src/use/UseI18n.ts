import { inject } from 'vue';
import type { I18n } from '@polaris/utilities/i18n/I18n';

export default function useI18n() {
  const context = inject('i18n') as I18n;
  return context;
}
