import jsonp from 'common/js/jsonp'
import {commondata, options} from './config'
import axios from 'axios'
export function getRecommend() {
  let dat = JSON.stringify({
    focus: { module: 'QQMusic.MusichallServer', method: 'GetFocus', param: {} }
  })
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  let data = Object.assign({}, commondata, {data: `${dat}`, callback: 'getData'})
  return jsonp(url, data, options)
}

export function getRecommendList() {
  let data = Object.assign({}, commondata, {
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return new Promise(function (resolve, reject) {
    axios.get('/apis/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
      params: data
    }).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  })
}
