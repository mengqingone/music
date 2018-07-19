import * as types from './types'
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
    commit(types.SET_MODE, true)
    // 设置播放下标
    commit(types.SET_CURRENTINDEX, index)
  }
}

export default actions
