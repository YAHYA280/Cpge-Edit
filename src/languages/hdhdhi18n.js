// import i18n, { dir } from 'i18next'
// import { initReactI18next } from 'react-i18next'
// import HttpApi from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector';

// // Customer pages 

// // // ENGLISH 
// // import en_globals from './translate/en/global.json'
// // import en_errors from './translate/en/customerPages/MainPage/errors.json'
// // import en_inputs from './translate/en/inputs.json'


// // // Main page 
// // import en_stepsArea from './translate/en/customerPages/MainPage/stepsArea.json'

// // // Details page 
// // import en_accountDetails from './translate/en/customerPages/accountPage/accountDetails.json'

// // // Invoices page 
// // import en_invoicesPage from './translate/en/customerPages/invoicesPage/page.json'



// // // ARABIC 
// // import ar_globals from './translate/ar/global.json'
// // import ar_inputs from './translate/ar/inputs.json'
// // import ar_errors from './translate/en/customerPages/MainPage/errors.json'

// // // Main page 
// // import ar_stepsArea from './translate/ar/customerPages/MainPage/stepsArea.json'

// // // Details page 
// // import ar_accountDetails from './translate/ar/customerPages/accountPage/accountDetails.json'

// // // Invoices page 
// // import ar_invoicesPage from './translate/ar/customerPages/invoicesPage/page.json'

// import en from './en'; // Import the structured translation file
// import ar from './ar'; // Similarly, import Arabic translations


// // import ar_globals from './translate/en/global.json'

// i18n.use(initReactI18next)
//     .use(LanguageDetector)
//     .use(HttpApi)
//     .init({

//         debug: true,
//         // supportedLngs: ['en', 'ar','fr'],
//         // backend: {
//         //     loadPath: '/{{lng}}.json',
//         // },
        
//         resources: {
//         en: {
//             translation: en, // Use the imported structured object
//         },
//         ar: {
//             translation: ar,
//         },
//         //     en: {
//         //         dir: 'ltr',
//         //         translation: {
//         //             global: { // Global texts
//         //                 ...en_globals,
//         //             },

//         //             steps_area: { // Steps area
//         //                 ...en_stepsArea,
//         //                 ...en_errors,
//         //             },

//         //             details_page: {
//         //                 ...en_accountDetails
//         //             },

//         //             invoices_page: {
//         //                 ...en_invoicesPage
//         //             },

//         //             inputs: { // Inputs names
//         //                 ...en_inputs
//         //             }

//         //         }
//         //     },

//         //     ar: {
//         //         dir: 'rtl',
//         //         translation: {
//         //             global: { // Global texts
//         //                 ...ar_globals,
//         //             },

//         //             steps_area: { // Steps area
//         //                 ...ar_stepsArea,
//         //                 ...ar_errors,
//         //             },

//         //             details_page: {
//         //                 ...ar_accountDetails
//         //             },

//         //             invoices_page: {
//         //                 ...ar_invoicesPage
//         //             },

//         //             inputs: { // Inputs names
//         //                 ...ar_inputs
//         //             }
//         //         }
//         //     }


//         },

//         detection: {
//             // Check if language is already set in cookies
//             order: ['cookie', 'localStorage'],
//             caches: ['cookie', 'localStorage'],
//             lookupCookie: 'i18nextLng',
//             // checkWhitelist: true,
//         },
//         fallbackLng: 'en',
//         // lng: 'en',
//         // whitelist: ['en', 'fr', 'ar'],
//         interpolation: {
//             escapeValue: false,
//         },
//         react: {
//             useSuspense: false
//         }
//     })
    

// export default i18n


