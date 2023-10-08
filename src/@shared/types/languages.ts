export const LanguagesTypes = {
  'pt-br': 'pt-br',
  'en-us': 'en-us',
  'es-es': 'es-es',
} as const

export type LanguagesTypesKeys =
  (typeof LanguagesTypes)[keyof typeof LanguagesTypes]
