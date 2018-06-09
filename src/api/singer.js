import jsonp from 'common/js/jsonp'
import {commondata, options} from './config'
import axios from 'axios'
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  let date = Object.assign({}, commondata, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, date, options)
}

export function getSongList(singerId) {
  let date = Object.assign({}, commondata, {
    from: 'h5',
    format: 'json',
    needNewCode: 1,
    num: 50,
    order: 'listen',
    begin: 0
  }, {singerid: `${singerId}`})
  return new Promise(function (resolve, reject) {
    axios.get('/apis/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
      params: date
    }).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  })
}

export function getSongUrl(songmid, filename) {
  let dat = new Date()
  let t = (dat).getUTCMilliseconds()
  let _guid = Math.round(2147483647 * Math.random()) * t % 10000000000
  let data = Object.assign({},
    commondata,
    {
      'hostUin': 0,
      'needNewCode': 1,
      'songmid': songmid,
      'filename': filename,
      'guid': _guid,
      'format': 'json',
      'cid': 205361747
    })
  let url = '/apis/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  return jsonp(url, data, options)
}