module.exports = {
  productionSourceMap: false,
  // 配置代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
}
