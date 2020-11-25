const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
  ],
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@atom': path.resolve(__dirname, '../src/component/atom'),
      '@molecule': path.resolve(__dirname, '../src/component/molecule'),
      '@organism': path.resolve(__dirname, '../src/component/organism'),
      '@constant': path.resolve(__dirname, '../src/constant'),
      '@page': path.resolve(__dirname, '../src/page'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@util': path.resolve(__dirname, '../src/util'),
    }
    return config
  },
}
