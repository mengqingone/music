const getters = {
  getSinger: state => {
    return state.singer
  },
  getPlaying: state => {
    return state.playing
  },
  getFullScreen: state => {
    return state.fullScreen
  },
  getPlayList: state => {
    return state.playList
  },
  getSequenceList: state => {
    return state.sequenceList
  },
  getMode: state => {
    return state.mode
  },
  getCurrentSong: state => {
    return state.playList[state.currentIndex] || null
  },
  getCurrentIndex: state => {
    return state.currentIndex
  }
}

export default getters