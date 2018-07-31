<template>
  <div class="lyric-page" >
    <scroll :listLength="lyricLength" v-if="lyricLength" class='wrapper' ref="scroll">
        <ul class='lyric-frame'>
          <li v-for="(line, index) in lyric.lines" :key="index"  class='lyric-line'
            :class="[{'lyric-playing':lyric.curLine  === index}]"
            ref="lines">
          {{line.txt}}
          </li>
       </ul>
    </scroll>
  </div>
</template>

<script>
import {getSongLyric} from '@/api/song'
import {mapMutations, mapGetters} from 'vuex'
import { Base64 } from 'js-base64'
import Lyric from 'lyric-parser'
import scroll from '@/base/scroll'
export default {
  props: {
    percent: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      name: 'lyric',
      lyric: '',
      playingLine: 0,
      currentTime: 0
    }
  },
  components: {
    scroll
  },
  created() {
    this.$bus.$on('jumpLyric', this.handleJumpLyric)
  },
  beforeDestroy() {
    this.$bus.$off('jumpLyric', this.handleJumpLyric)
  },
  computed: {
    ...mapGetters({
      song: 'getCurrentSong',
      playingState: 'getPlaying'
    }),
    lyricLength() {
      return this.lyric && this.lyric.lines.length ? this.lyric.lines.length : 0
    }
  },
  watch: {
    percent(val) {
      this.currentTime = this.song.duration * this.percent
    },
    song(val) {
      this.getLyric()
    },
    playingState(val) {
      if (val && this.lyric) {
        this.lyric.seek(this.currentTime * 1000)
      } else if (this.lyric) {
        this.lyric.togglePlay()
      }
    },
    lyric(curObj, oldObj) {
      if (oldObj) {
        oldObj.stop()
      }
      if (this.playingState) {
        // 1秒后校准一下
        setTimeout(() => {
          this.lyric.seek(this.currentTime * 1000)
        }, 1000)
      }
    }
  },

  mounted() {
    this.getLyric()
  },
  methods: {
    ...mapMutations({
      setCurrentLyric: 'SET_CURRENTLYRIC',
      setFullScreen: 'SET_FULLSCREEN'
    }),
    setLyric() {
      let _this = this
      getSongLyric(this.song.songmid).then(function(res) {
        _this.setCurrentLyric(res.lyric)
        _this.lyric = _this.createLyricObject(res.lyric, _this.handle)
      }, function(err) {
        console.log(err)
      })
    },
    getLyric() {
      if (this.song.lyric === '') {
        this.setLyric()
      } else {
        this.lyric = this.createLyricObject(this.song.lyric, this.handle)
      }
    },
    createLyricObject(lyricstr, handle) {
      return new Lyric(Base64.decode(lyricstr), handle)
    },
    handle({lineNum, txt}) {
      let middleLine = 6
      this.lyric.curLine = lineNum
      if (lineNum < middleLine) {
        this.$refs.scroll.scrollToElement(this.$refs.lines[0])
      } else if (lineNum > middleLine && ((lineNum + middleLine - 1) < this.lyricLength)) {
        this.$refs.scroll.scrollToElement(this.$refs.lines[lineNum - middleLine])
      }
    },
    handleJumpLyric(time) {
      this.lyric.seek(time * 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.lyric-page
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  .wrapper
    height: 100%
    overflow hidden
    .lyric-frame
      text-align center
      color: hsla(0,0%,100%,.5)
      .lyric-line
        line-height: 32px
        font-size: 14px
      .lyric-playing
        color: #fff
</style>
