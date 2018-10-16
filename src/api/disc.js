import {commondata} from './config'
import axios from 'axios'
export function getDiscList(disstid) {
  let date = Object.assign({}, commondata, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    hostUin: 0,
    disstid: `${disstid}`,
    g_tk: 1928093487,
    format: 'json'
  })
  return new Promise(function (resolve, reject) {
    axios.get('/apis/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', {
      params: date
    }).then(function (response) {
      resolve(response)
    }).catch(function (error) {
      reject(error)
    })
  })
}