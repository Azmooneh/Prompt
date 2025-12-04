export type Locale = 'en' | 'fa' | 'de';

export const messages = {
    en: {
        meta: {
            label: 'English',
            direction: 'LTR' as const,
        },
        common: {
            dashboard: 'Dashboard',
            test: 'Test',
        },
        dashboard: {
            title: 'Dashboard',
        },
        test: {
            title: 'Test',
        },
        welcome: {
            title: 'Welcome',
            dashboard: 'Dashboard',
            login: 'Log in',
            register: 'Register',
            getStartedHeading: "Let's get started",
            introText:
                'Laravel has an incredibly rich ecosystem. We suggest starting with the following.',
            readDocs: 'Read the Documentation',
            watchLaracasts: 'Watch video tutorials at Laracasts',
            deployNow: 'Deploy now',
        },
    },
    fa: {
        meta: {
            label: 'فارسی',
            direction: 'RTL' as const,
        },
        common: {
            dashboard: 'داشبورد',
            test: 'تست',
        },
        dashboard: {
            title: 'داشبورد',
        },
        test: {
            title: 'تست',
        },
        welcome: {
            title: 'خوش آمدید',
            dashboard: 'داشبورد',
            login: 'ورود',
            register: 'ثبت‌نام',
            getStartedHeading: 'بیایید شروع کنیم',
            introText:
                'لاراول یک اکوسیستم بسیار غنی دارد. پیشنهاد می‌کنیم از موارد زیر شروع کنید.',
            readDocs: 'مطالعه مستندات',
            watchLaracasts: 'مشاهده ویدیوها در Laracasts',
            deployNow: 'دیپلوی هم‌اکنون',
        },
    },
    de: {
        meta: {
            label: 'Deutsch',
            direction: 'LTR' as const,
        },
        common: {
            dashboard: 'Dashboard',
            test: 'Test',
        },
        dashboard: {
            title: 'Dashboard',
        },
        test: {
            title: 'Test',
        },
        welcome: {
            title: 'Willkommen',
            dashboard: 'Dashboard',
            login: 'Anmelden',
            register: 'Registrieren',
            getStartedHeading: 'Lass uns anfangen',
            introText:
                'Laravel verfügt über ein unglaublich reiches Ökosystem. Wir empfehlen, mit Folgendem zu beginnen.',
            readDocs: 'Dokumentation lesen',
            watchLaracasts: 'Videos auf Laracasts ansehen',
            deployNow: 'Jetzt deployen',
        },
    },
} as const;

export type Messages = typeof messages;
export type Namespaces = keyof Messages['en'];

export const availableLocales = [
    { value: 'fa', label: messages.fa.meta.label, direction: messages.fa.meta.direction },
    { value: 'en', label: messages.en.meta.label, direction: messages.en.meta.direction },
    { value: 'de', label: messages.de.meta.label, direction: messages.de.meta.direction },
] as const;

export function isSupportedLocale(locale: string | null | undefined): locale is Locale {
    return locale === 'en' || locale === 'fa' || locale === 'de';
}

export function getLocaleDirection(locale: Locale): 'RTL' | 'LTR' {
    return messages[locale].meta.direction;
}


