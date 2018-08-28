import playMode from '@/common/js/config.js'
import {getLocalSearch} from '@/api/localstore.js'
import { getPlayHistory } from '../api/localstore'
let state = {
  singer: {},
  playing: false,
  fullScreen: true,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  currentDisc: {},
  rank: {},
  searchHistory: getLocalSearch(),
  playHistory: getPlayHistory()
}

export default state