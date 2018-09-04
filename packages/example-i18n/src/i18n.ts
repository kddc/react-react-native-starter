import i18next from 'i18next'
import { reactI18nextModule } from 'react-i18next'
import common_de from './locale/de.json'
import common_en from './locale/en.json'

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lng: string) => void) => {
    const lang = await new Promise<string>(resolve => {
      resolve('en')
    })
    callback(lang)
    return lang
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

export const i18n = {
  init: () => {
    return i18next
      .use(languageDetector)
      .use(reactI18nextModule)
      .init({
        fallbackLng: 'en',
        defaultNS: 'common',
        resources: {
          en: {
            common: common_en,
          },
          de: {
            common: common_de,
          },
        },
        interpolation: {
          escapeValue: false,
        },
        debug: false,
      })
  },
  t: (key: string, options?: i18next.TranslationOptions<any>): string => i18next.t(key, options),
  locale: () => i18next.language,
  changeLanguage: (lang: 'en' | 'de', cb?: i18next.Callback) => i18next.changeLanguage(lang, cb),
  registerTranslations: (filename: string, json: { [key: string]: any }): { ns: string } => {
    const namespace = filename.split('/src/')[1]
    Object.keys(json).map(lang => i18next.addResourceBundle(lang, namespace, json[lang]))
    return {
      ns: namespace,
    }
  },
  ns: (filename: string) => filename.split('/src/')[1],
}

export const t = i18n.t
