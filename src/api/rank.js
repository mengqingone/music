import jsonp from 'common/js/jsonp'
import {commondata, options} from './config'

export function getTopList() {
  const url = '/apis/v8/fcg-bin/fcg_v8_toplist_opt.fcg'
  let data = Object.assign({}, commondata, {
    page: 'index',
    format: 'html',
    tpl: 'macv4',
    v8debug: 1
  })
  let options = {
    name: 'jsonCallback'
  }
  return jsonp(url, data, options)
}

export function getTopSongs(topid) {
  const url = '/apis/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  let data = Object.assign({}, commondata, {
    tpl: 3,
    page: 'detail',
    topid: topid,
    type: 'top',
    platform: 'h5',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    needNewCode: 1,
    uin: 0,
    song_begin: 0,
    song_num: 100
  })
  return jsonp(url, data, options)
}
