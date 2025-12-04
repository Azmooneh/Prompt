import { onMounted, ref } from 'vue';
import {
    availableLocales,
    getLocaleDirection,
    isSupportedLocale,
    type Locale,
} from '@/composables/translationConfig';

const locale = ref<Locale>('en');

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredLocale = (): Locale | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    const stored = localStorage.getItem('locale');

    return isSupportedLocale(stored) ? stored : null;
};

const applyLocaleToDocument = (value: Locale) => {
    if (typeof document === 'undefined') {
        return;
    }

    const direction = getLocaleDirection(value);

    document.documentElement.lang = value;
    document.documentElement.dir = direction === 'RTL' ? 'rtl' : 'ltr';
};

export function initializeLocale(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const stored = getStoredLocale();
    const htmlLang = document.documentElement.lang;
    const fallback: Locale = 'en';

    const initial: Locale =
        stored ||
        (isSupportedLocale(htmlLang) ? htmlLang : null) ||
        fallback;

    locale.value = initial;
    applyLocaleToDocument(initial);
}

export function useLocale() {
    onMounted(() => {
        const stored = getStoredLocale();

        if (stored) {
            locale.value = stored;
            applyLocaleToDocument(stored);
        }
    });

    function updateLocale(value: Locale) {
        locale.value = value;

        // Store in localStorage for client-side persistence...
        localStorage.setItem('locale', value);

        // Store in cookie for SSR / Laravel...
        setCookie('locale', value);

        applyLocaleToDocument(value);
    }

    return {
        locale,
        updateLocale,
    };
}


