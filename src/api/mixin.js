import {mapGetters, mapMutations, mapActions} from 'vuex'
import playMode from '@/common/js/config.js'
import {randomList} from '@/common/js/random.js'
export const mixin = {
  computed: {
    ...mapGetters({
      playList: 'getPlayList'
    })
  },
  mounted() {
    this.$nextTick(() => {
      if (this.playList.length > 0) {
        this.handlePlayList(this.playList)
      }
    })
  },
  activated() {
    this.$nextTick(() => {
      if (this.playList.length > 0) {
        this.handlePlayList(this.playList)
      }
    })
  },
  watch: {
    playList(val) {
      this.handlePlayList(val)
    }
  },
  methods: {
    handlePlayList(playList) {
      throw new Error('could not find the function of handlePlayList')
    }
  }
}

export const playMixin = {
  computed: {
    currentMode() {
      return this.mode === playMode.sequence ? 'icon-sequence'
        : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters({
      sequenceList: 'getSequenceList',
      currentSong: 'getCurrentSong',
      playList: 'getPlayList',
      mode: 'getMode'
    })
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX',
      setPlayingState: 'SET_PLAYINGSTATE',
      setCurrentMode: 'SET_MODE',
      setPlaylist: 'SET_PLAYLIST'
    }),
    changeMode() {
      let song = this.currentSong
      this.setCurrentMode((this.mode + 1) % 3)
      let list = this.mode === playMode.random
        ? this.randomPlayList() : this.sequenceList
      this.resetCurrentSong(list, song)
      this.setPlaylist(list)
    },
    resetCurrentSong(list, song) {
      let index = list.findIndex(function(ele) {
        return ele.songid === song.songid
      })
      if (index !== -1) {
        this.setCurrentIndex(index)
      }
    },
    randomPlayList() {
      let randomlist = randomList(this.playList)
      return randomlist
    }
  }
}

export const searchMixin = {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    ...mapActions([
      'storeHistory'
    ]),
    setQuery(query) {
      this.query = query
    },
    saveQuery() {
      this.storeHistory(this.query)
    },
    scroll() {
      this.$refs.searchBox.blur()
    }
  }
}