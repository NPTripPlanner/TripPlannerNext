const { nextI18NextRewrites } = require('next-i18next/rewrites')
const localeSubpaths = {
    'en':'en',
    'zht':'zh-t',
}

module.exports = {
    // rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
        localeSubpaths,
    },
    target: "serverless",
    webpack : (config, _options) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif)$/i,
            use:[
                {
                    loader: 'url-loader',
                }
            ]
        })

        return config
    }
}