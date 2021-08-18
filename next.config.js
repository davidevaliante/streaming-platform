const withLinaria = require('next-linaria')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withLinaria({
    reactStrictMode: true,
    images: {
        domains: ['spikewebsitemedia.b-cdn.net'],
    },
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat',
            })
        }
        return config
    },
    optimizeFonts: false,
    // assetPrefix: isProd ? 'https://wincasinoblog.b-cdn.net' : '',
})
