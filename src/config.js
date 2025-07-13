import { available_languages, default_language } from "./languages/available_languages"

var locales = []

// Fetching all available languages to get the code of the languages 
for (let i = 0; i < Object.values(available_languages).length; i++) {
    const language = Object.values(available_languages)[i]
    locales.push(language.key)
}



const languageMatcher = locales.join('|')

// console.log(languageMatcher)


export { locales, languageMatcher } 