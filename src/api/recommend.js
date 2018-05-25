import jsonp from 'common/js/jsonp'
import {commondata, options} from './config'
function getRecommend() {
  let dat = JSON.stringify({
    focus: { module: 'QQMusic.MusichallServer', method: 'GetFocus', param: {} }
  })
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  let date = Object.assign(commondata, {data: `${dat}`})
  return jsonp(url, date, options)
}

export default getRecommend