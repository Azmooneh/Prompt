import { useLocale } from '@/composables/useLocale';
import type { Locale, Namespaces } from '@/composables/translationConfig';
import { messages } from '@/composables/translationConfig';

export function useTranslations<N extends Namespaces>(namespace: N) {
    const { locale } = useLocale();

    function t<K extends keyof (typeof messages)['en'][N]>(key: K): string {
        const currentLocale = (locale.value || 'en') as Locale;

        return (
            messages[currentLocale][namespace][key] ??
            (messages.en[namespace][key] as string)
        );
    }

    return {
        t,
        locale,
    };
}


