<template>
  <div class="player-page" v-if="playList.length > 0">
    <transition name='normal'
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave">
      <normal-player  class='normal-player'
                    ref="normalPlayer"
                    :percent="percent"
                    v-show="fullgreen"
                    >
      </normal-player>
    </transition>
    <transition name='mini'>
      <mini-player  class='mini-player' :percent="percent" v-show="!fullgreen" @showPlaylist="showPlaylist"></mini-player>
    </transition>
    <div class='music-list' v-if="!fullgreen && showList"></div>
    <audio-player :url="this.currentSong.url"
                  v-if="this.currentSong && this.currentSong.url"
                  @setPercent="setPercent">
    </audio-player>
    <play-list ref="playlist"></play-list>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import {setUrl} from '@/common/js/song.js'
import audioPlayer from '@/base/player/audio'
import normalPlayer from '@/base/player/normal-Player'
import miniPlayer from '@/base/player/mini-Player'
import playList from '@/components/play-list/play-list'
export default {
  data() {
    return {
      name: 'musicPlay',
      showList: false,
      percent: 0
    }
  },
  components: {
    audioPlayer,
    normalPlayer,
    miniPlayer,
    playList
  },
  computed: {
    ...mapGetters({
      currentSong: 'getCurrentSong',
      fullgreen: 'getFullScreen',
      playList: 'getPlayList'
    })
  },
  watch: {
    // 获取数据
    currentSong(val, old) {
      if (!val || (old && (val.songid === old.songid))) {
        return
      }
      // 获取数据之前工作
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
        this.$bus.$emit('makeToUnready')
      }
      // 超时的工作
      this.timer = setTimeout(() => {
        this.$bus.$emit('makeToReady')
      }, 1000)

      if (val.url === null || val.url === '') {
        this.getUrlAgain()
      }
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlayingState: 'SET_PLAYINGSTATE',
      setCurrentSong: 'SET_CURRENTSONG'
    }),
    getUrlAgain() {
      let _this = this
      let songCopy = Object.assign({}, this.currentSong)
      setUrl(songCopy).then(
        () => {
          this.setCurrentSong(songCopy.url)
          this.setPlayingState(true)
          // 付费歌曲,获取不到url
          if (!this.currentSong.url) {
            alert('付费歌曲')
            this.$bus.$emit('makeToReady')
            this.setPlayingState(false)
          }
        },
        error => {
          _this.$bus.$emit('makeToReady')
          console.log(error)
        }
      )
    },
    setPercent(percent) {
      this.percent = percent
    },
    enter(el, done) {
      this.$refs.normalPlayer.enterAnimation(done)
    },
    afterEnter() {
      this.$refs.normalPlayer.afterEnter()
    },
    leave(el, done) {
      this.$refs.normalPlayer.leaveAnimation(done)
    },
    afterLeave() {
      this.$refs.normalPlayer.afterLeave()
    },
    showPlaylist() {
      this.$refs.playlist.open()
    }
  }
}
</script>

<style lang="stylus">
.normal-enter, .normal-leave-to
  opacity: 0
  .top
    transform: translateY(-100px)
  .bottom
    transform: translateY(100px)
.normal-enter-active, .normal-leave-active
  transition all 4s ease-out
  .top, .bottom
    transition all 4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
.mini-enter, .mini-leave-to
  opacity 0
.mini-enter-active, .mini-leave-active
  transition all .4s
</style>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.normal-player
  position: fixed
  top 0
  left 0
  right 0
  bottom 0
  width 100%
  height 100%
  background-color $color-background
  z-index 10
.mini-player
  position: fixed
  display: flex
  flex-direction: row
  align-items center
  justify-content space-between
  left: 0
  right: 0
  bottom: 0
  height: 60px
  background: #333
  z-index: 10
</style>