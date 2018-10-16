let _header = {
  host: 'https://y.qq.com/',
  referer: 'https://y.qq.com/'
}

// CommonJS
const _proxy = {
  '/apis': {    //将www.exaple.com印射为/apis
    target: 'https://c.y.qq.com/',  // 接口域名
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/apis': '/'   //需要rewrite的,
    },
    headers: _header
  }
}

module.exports = _proxy