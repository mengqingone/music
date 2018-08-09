import {commondata} from './config'
import axios from 'axios'

export function search(query, perpage, page) {
  let data = Object.assign({}, commondata, {
    uin: 0,
    needNewCode: 1,
    format: 'json',
    w: query,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all'
  })
  return new Promise(function (resolve, reject) {
    axios.get('/apis/soso/fcgi-bin/search_for_qq_cp', {
      params: data
    }).then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}

export function hotsearch(query, perpage, page) {
  let data = Object.assign({}, commondata, {
    g_tk: 91730814,
    uin: 2277430236,
    format: 'json',
    notice: 0,
    platform: 'h5',
    needNewCode: '1'
  })
  return new Promise(function (resolve, reject) {
    axios.get('/apis/splcloud/fcgi-bin/gethotkey.fcg', {
      params: data
    }).then(function (response) {
      resolve(response.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}