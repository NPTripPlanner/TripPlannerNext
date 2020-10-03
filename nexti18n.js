const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
  browserLanguageDetection:false,
  serverLanguageDetection:false,
  otherLanguages: ['zht'],
  defaultLanguage: 'en',
  localeSubpaths,
  ns: ['404', 'common', 'landing', 'navbar'],
  localePath: path.resolve('./public/static/locales')
})