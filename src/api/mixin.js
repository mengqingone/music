import {mapGetters} from 'vuex'

const mixin = {
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
export default mixin