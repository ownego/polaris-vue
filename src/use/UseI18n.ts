import { inject } from 'vue';
import { MissingAppProviderError } from '@/utilities/errors';
import type { I18n } from '@/utilities/i18n';

export default function UseI18n() {
  const lang = inject('lang') as Record<string, any>;
  const i18n = inject('i18n') as I18n;

  const translate = (
    id: string,
    replacements?: {[key: string]: string | number},
  ) => {
    if (!lang) {
      throw new MissingAppProviderError('I18n');
    }

    return i18n.translate(id, replacements);
  };

  return { translate };
}

