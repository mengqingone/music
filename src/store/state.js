import playMode from '@/common/js/config.js'

let state = {
  singer: {},
  playing: false,
  fullScreen: true,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  currentDisc: {},
  rank: {}
}

export default state