import jsonp from 'common/js/jsonp'
import {commondata} from './config'
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
    platform: 'yqq',
    callback: 'getListData'
  })
  let options = {
    param: 'jsonpCallback',
    name: 'getListData'
  }
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