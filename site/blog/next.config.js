/** @type {import('next').NextConfig} */
const nextConfig = {
    // 后期可能不再需要
    // issue: https://github.com/antfu/shikiji/issues/13
    webpack: function (config) {
        config.module.rules.push({
            test: /\.m?js$/,
            type: "javascript/auto",
            resolve: { fullySpecified: false, },
        });
        return config;
    },
}

module.exports = nextConfig
