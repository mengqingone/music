<template>
  <audio class='audio-page'
    ref="audio"
    @canplay="ready"
    @error="error"
    @timeupdate="timeUpdate"
    @seeked ="seeked"
    @ended="ended"
    >
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
      name: 'audio-player',
      changed: false,
      onPlaying: false,
      active: false
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
        this.play()
      } else {
        this.pause()
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
    load(url) {
      this.pause()
      this.$refs.audio.src = url
      this.$refs.audio.load()
    },
    ready(e) {
      if (!this.currentSong || !this.active) {
        return
      }
      this.$emit('makeReady')
      this.$emit('clearOvertimer')
      // 控制播放
      if (this.playingState) {
        this.play()
        if (this.currentSong) {
          this.savePlayHistory(this.currentSong)
        }
      }
      this.$refs.audio.volume = 0.5 // 控制音量
      // 校准歌词
      this.$bus.$emit('jumpLyric', e.target.currentTime)
    },
    error(e) {
      if (!this.currentSong) {
        return
      }
      console.log(e)
      console.log(e.target.src)
      this.$emit('makeReady')
      console.log(e.target.error)
    },
    timeUpdate(e) {
      if (!this.currentSong) {
        return
      }
      let time = e.target.currentTime
      if (this.currentSong && this.currentSong.duration > 0 && !this.$refs.audio.paused) {
        this.$emit('setPercent', time / this.currentSong.duration)
      }
    },
    seeked() {
      if (!this.currentSong) {
        return
      }
      this.play()
      this.setPlayingState(true)
    },
    ended() {
      if (!this.currentSong) {
        return
      }
      if (this.mode === playMode.loop) {
        this.$refs.audio.currentTime = 0
        this.$bus.$emit('jumpLyric', 0)
      } else {
        this.$emit('toNext')
      }
    },
    handleJumpTo(percent) {
      if (!this.currentSong) {
        return
      }
      let time = this.currentSong.duration * percent
      this.$refs.audio.currentTime = time
      // 校准歌词
      this.$bus.$emit('jumpLyric', time)
    },
    pause() {
      let $audio = this.$refs.audio
      if ($audio && !$audio.paused && $audio.readyState > 2 && !$audio.ended && $audio.currentTime > 0) {
        this.$refs.audio.pause()
      }
    },
    play() {
      if (this.$refs.audio && this.$refs.audio.readyState > 0) {
        this.$refs.audio.play().catch((err) => {
          console.log(err)
        })
      }
    },
    // activePlay() {
    //   return new Promise((resolve, reject) => {
    //     if (!this.active) {
    //       this.$refs.audio.src = require('@/base/player/temp.mp3')
    //       this.$refs.audio.play().then(() => {
    //         this.pause()
    //         this.$refs.audio.src = ''
    //         this.$refs.audio.currentTime = 0
    //         this.active = true
    //         resolve()
    //       }).catch((err) => {
    //         console.log(err)
    //       })
    //     } else {
    //       resolve()
    //     }
    //   })
    // }
    activePlay() {
      if (!this.active) {
        this.$refs.audio.src = require('@/base/player/temp.mp3')
        this.$refs.audio.play().then(() => {
          this.pause()
          this.$refs.audio.src = ''
          this.$refs.audio.currentTime = 0
          this.active = true
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>
