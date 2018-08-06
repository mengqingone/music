import jsonp from 'common/js/jsonp'
import {commondata, options} from './config'

export function getTopList() {
  const url = '/apis/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commondata, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getTopSongs(topid) {
  const url = '/apis/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  let data = Object.assign({}, commondata, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5',
    song_begin: 0,
    song_num: 100
  })
  return jsonp(url, data, options)
}
