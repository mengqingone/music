import jsonp from 'common/js/jsonp'
import {commondata} from './config'

export function getTopList() {
  const url = '/apis/v8/fcg-bin/fcg_v8_toplist_opt.fcg'
  let date = Object.assign({}, commondata, {
    page: 'index',
    format: 'html',
    tpl: 'macv4',
    v8debug: 1,
    jsonCallback: 'jsonCallback'
  })
  let options = {
    name: 'jsonCallback'
  }
  return jsonp(url, date, options)
}

export function getTopSongs(topid, date) {
  const url = '/apis/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  let data = Object.assign({}, commondata, {
    tpl: 3,
    page: 'detail',
    date: date,
    topid: topid,
    type: 'top',
    song_begin: 0,
    song_num: 30,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    notice: 0
  })
  let options = {
    param: 'jsonpCallback',
    name: 'MusicJsonCallbacktoplist'
  }
  return jsonp(url, data, options)
}
