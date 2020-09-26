const { config } = require("process");

module.exports = {
    webpack : (config, options) => {
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