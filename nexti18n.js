const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
  browserLanguageDetection:false,
  serverLanguageDetection:false,
  otherLanguages: ['zht'],
  defaultLanguage: 'en',
  // localeSubpaths,//with this "next export" is not support
  localePath: path.resolve('./public/static/locales')
})