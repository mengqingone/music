<template>
  <div class="lyric-page" >
    <scroll :listLength="listLength" v-if="listLength" class='wrapper'>
        <ul class='lyric-frame'>
          <li v-for="(line, index) in lyric.lines" :key="index"  class='lyric-line'
            :class="[{'lyric-playing':playingLine === index}]">
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
      playingLine: 0
    }
  },
  components: {
    scroll
  },
  computed: {
    ...mapGetters({
      song: 'getCurrentSong',
      playingState: 'getPlaying'
    }),
    listLength() {
      return this.lyric && this.lyric.lines.length ? this.lyric.lines.length : 0
    },
    currentTime() {
      return this.song.duration * this.percent || 0
    }
  },
  watch: {
    song(val) {
      this.getLyric()
    },
    playingState(val) {
      if (val && this.lyric) {
        console.log('playingState' + this.currentTime)
        this.seek(this.currentTime)
      } else if (this.lyric) {
        this.lyric.togglePlay()
      }
    },
    lyric(obj) {
      if (this.playingState) {
        this.currentTime = 0
        this.seek(this.currentTime)
        console.log(obj)
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
    seek(times) {
      let minutes = parseInt(times / 60)
      let seconds = parseInt(times % 60)
      let restT = times - minutes * 60 - seconds
      this.lyric.seek(minutes * 1000 + seconds * 1000 + restT * 10)
    },
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
      console.log(lineNum)
      console.log(txt)
      this.playingLine = lineNum
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
