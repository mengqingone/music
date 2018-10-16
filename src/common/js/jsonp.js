import OriginJsonp from 'jsonp'

function queryString(obj) {
  let str = ''
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined) {
      str += '&' + key + '=' + ''
    } else {
      str += '&' + key + '=' + encodeURIComponent(obj[key])
    }
  })
  return str.slice(1)
}

function jsonpFun(url, _data, opt) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + queryString(_data)
  return new Promise((resolve, reject) => {
    OriginJsonp(url, opt, function (err, data) {
      if (err) {
        reject(err)
      } else {
        Object.assign(data, _data)
        resolve(data)
      }
    })
  })
}
export default jsonpFun