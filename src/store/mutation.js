import * as types from './types'
const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYINGSTATE](state, playing) {
    state.playing = playing
  },
  [types.SET_FULLSCREEN](state, fullScreen) {
    state.fullScreen = fullScreen
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList.length = 0
    list.forEach(element => {
      state.playList.push(Object.assign({}, element))
    })
  },
  [types.SET_SEQUENCELIST](state, list) {
    state.sequenceList.length = 0
    list.forEach(element => {
      state.sequenceList.push(Object.assign({}, element))
    })
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENTINDEX](state, idx) {
    state.currentIndex = idx
  }
}

export default mutations