import * as types from './types'
import {randomList} from '@/common/js/random.js'
import playMode from '@/common/js/config.js'
const actions = {
  playMusic({ commit, state }, {songlist, index}) {
    // 播放音乐
    commit(types.SET_PLAYINGSTATE, true)
    // 全屏播放
    commit(types.SET_FULLSCREEN, true)
    // 添加播放列表
    commit(types.SET_PLAYLIST, songlist)
    // 顺序列表
    commit(types.SET_SEQUENCELIST, songlist)
    // 播放模式 顺序播放  随机播放
    commit(types.SET_MODE, state.mode)
    // 设置播放下标
    commit(types.SET_CURRENTINDEX, index)
  },
  randomPlayMusic({ commit, state }, {songlist}) {
    let list = randomList(songlist)
    // 播放音乐
    commit(types.SET_PLAYINGSTATE, true)
    // 全屏播放
    commit(types.SET_FULLSCREEN, true)
    // 添加随机播放列表
    commit(types.SET_PLAYLIST, list)
    // 顺序列表
    commit(types.SET_SEQUENCELIST, songlist)
    // 播放模式 顺序播放  随机播放
    commit(types.SET_MODE, playMode.random)
    // 设置播放下标
    commit(types.SET_CURRENTINDEX, 0)
  }
}

export default actions
