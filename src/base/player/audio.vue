<template>
    <audio class='audio-page'
      :src="url"
      preload="auto"
      ref="audio"
      @playing="ready"
      @error="error"
      @timeupdate="timeUpdate"
      @seeked ="seeked"
      @ended="ended"
      autoplay>
      Your browser does not support the <code>audio</code> element.
    </audio>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import playMode from '@/common/js/config.js'
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: 'audio-player'
    }
  },
  computed: {
    ...mapGetters({
      playingState: 'getPlaying',
      mode: 'getMode',
      currentSong: 'getCurrentSong'
    })
  },
  watch: {
    playingState(val) {
      if (val) {
        if (this.$refs.audio && this.$refs.audio.src) {
          this.$refs.audio.play()
        }
      } else {
        if (this.$refs.audio) {
          this.$refs.audio.pause()
        }
      }
    }
  },
  created() {
    this.$bus.$on('jumpTo', this.handleJumpTo)
  },
  beforeDestroy() {
    this.$bus.$off('jumpTo', this.handleJumpTo)
  },
  methods: {
    ...mapActions([
      'savePlayHistory'
    ]),
    ...mapMutations({
      setPlayingState: 'SET_PLAYINGSTATE'
    }),
    ready(e) {
      this.$bus.$emit('makeToReady')
      // 控制播放
      if (this.playingState) {
        this.$refs.audio.play()
        this.savePlayHistory(this.currentSong)
      } else {
        this.$refs.audio.pause()
      }
      this.$refs.audio.volume = 0.5 // 控制音量
      // 校准歌词
      this.$bus.$emit('jumpLyric', e.target.currentTime)
    },
    error(e) {
      this.$bus.$emit('makeToReady')
      console.log(e.target.error)
    },
    timeUpdate(e) {
      let time = e.target.currentTime
      if (this.currentSong && this.currentSong.duration > 0) {
        this.$emit('setPercent', time / this.currentSong.duration)
      }
    },
    seeked() {
      this.$refs.audio.play()
      this.setPlayingState(true)
    },
    ended() {
      if (this.mode === playMode.loop) {
        this.$refs.audio.currentTime = 0
        this.$bus.$emit('jumpLyric', 0)
      } else {
        this.$bus.$emit('toNext')
      }
    },
    handleJumpTo(percent) {
      let time = this.currentSong.duration * percent
      this.$refs.audio.currentTime = time
      // 校准歌词
      this.$bus.$emit('jumpLyric', time)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
