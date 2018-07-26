
import jsonp from 'common/js/jsonp'
import {commondata} from './config'

let guid = ''

function getGuid() {
  if (guid === '') {
    let dat = new Date()
    let t = (dat).getUTCMilliseconds()
    guid = Math.round(2147483647 * Math.random()) * t % 10000000000
  }
  return guid
}
export function getSongUrl(songmid, filename) {
  let data = Object.assign({},
    commondata,
    {
      'hostUin': 0,
      'needNewCode': 1,
      'songmid': songmid,
      'filename': filename,
      'guid': getGuid(),
      'format': 'json',
      'cid': 205361747,
      'callback': 'getSongUrl'
    })
  let options = {
    param: 'jsonpCallback',
    name: 'getSongUrl'
  }
  let url = '/apis/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  return jsonp(url, data, options)
}

export function getSongLyric(songmid) {
  let data = Object.assign({},
    commondata,
    {
      'hostUin': 0,
      'guid': getGuid(),
      'songmid': songmid,
      'format': 'jsonp',
      'pcachetime': +new Date(),
      'callback': 'getSongLyric'
    })
  let url = '/apis/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  let options = {
    param: 'jsonpCallback',
    name: 'getSongLyric'
  }
  return jsonp(url, data, options)
}