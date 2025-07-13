import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from './config';


export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale)) notFound()

    // Import all necessary translation files for the given locale
    const global = (await import(`./messages/${locale}/global.json`)).default
    const inputs = (await import(`./messages/${locale}/inputs.json`)).default


    const mainPage = (await import(`./messages/${locale}/mainPage.json`)).default;
    const accountDetailsPage = (await import(`./messages/${locale}/accountPage.json`)).default;
    const invoicesPage = (await import(`./messages/${locale}/invoicesPage.json`)).default;

    // Merge the imported messages
    const messages = {
        global: {
            ...global,
        },
        inputs: {
            ...inputs,
        },
        steps_area: {
            ...mainPage
        },
        accountDetailsPage: {
            ...accountDetailsPage
        },
        invoicesPage: {
            ...invoicesPage
        },
    }


    // Get the direction based on the locale
    const direction = locales[locale] || 'ltr'; // Default to LTR if not specified

    return {
        messages,
        direction
    };
});









