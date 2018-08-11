import * as types from './types'
import {randomList} from '@/common/js/random.js'
import playMode from '@/common/js/config.js'
import {storeLocalSearch, deleteLocalHistory, removeLocalHistory} from '@/api/localstore.js'
function _playOneSong({ commit, state }, song) {
  let list = []
  list.push(song)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_MODE, playMode.loop)
  commit(types.SET_PLAYINGSTATE, true)
}
function _playNewSong({ commit, state }, song) {
  let list = state.playList.concat()
  let seqindex = findSong(state.sequenceList, list[state.currentIndex])
  let seqlist = state.sequenceList.concat()
  list.splice(state.currentIndex + 1, 0, song)
  seqlist.splice(seqindex + 1, 0, song)
  commit(types.SET_CURRENTINDEX, state.currentIndex + 1)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCELIST, seqlist)
  commit(types.SET_MODE, playMode.sequence)
  commit(types.SET_PLAYINGSTATE, true)
}

function _playOldSong({ commit, state }, song) {
  let list = state.playList.concat()
  let index = state.currentIndex
  let findidx = findSong(state.playList, song)
  if (findidx > index) {
    list.splice(state.currentIndex + 1, 0, song)
    list.splice(findidx, 1)
    commit(types.SET_CURRENTINDEX, state.currentIndex + 1)
  } else {
    list.splice(findidx, 1)
    list.splice(state.currentIndex, 0, song)
    commit(types.SET_CURRENTINDEX, state.currentIndex)
  }
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_PLAYINGSTATE, true)
}

function findSong(list, song) {
  list.forEach((element, index) => {
    if (element.songid === song.songid) {
      return index
    }
  })
  return -1
}

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
  },
  playSong({ commit, state }, song) {
    if (!state.playing) {
      _playOneSong({ commit, state }, song)
    } else if (findSong(state.playList, song) === -1) {
      _playNewSong({ commit, state }, song)
    } else {
      _playOldSong({ commit, state }, song)
    }
    commit(types.SET_FULLSCREEN, true)
  },
  storeHistory({commit}, query) {
    let history = storeLocalSearch(query)
    commit(types.SET_SEARCHHISTORY, history)
  },
  deleteHistory({ commit, state }, query) {
    let history = deleteLocalHistory(query)
    commit(types.SET_SEARCHHISTORY, history)
  },
  removeHistory({commit}) {
    removeLocalHistory()
    commit(types.SET_SEARCHHISTORY, [])
  }
}

export default actions
