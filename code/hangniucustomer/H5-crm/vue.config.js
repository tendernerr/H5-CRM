const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/manageSystem/',
  devServer: {
    port: 8080,
    proxy: 'https://www.hangyedaniu.com/'
  },
})
