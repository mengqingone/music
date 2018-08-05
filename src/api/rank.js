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