<template>
  <div class="player-page">
    <div v-if="playList.length > 0">
      <transition name='normal'
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave">
        <normal-player ref="normalPlayer"
                      :percent="percent"
                      v-show="fullgreen"
                      >
        </normal-player>
      </transition>
      <transition name='mini'>
        <mini-player :percent="percent"
          @showPlaylist="showPlaylist"
          v-show="!fullgreen">
        </mini-player>
      </transition>
      <div class='music-list' v-if="!fullgreen && showList"></div>
      <play-list ref="playlist"></play-list>
    </div>
    <audio-player @setPercent="setPercent"
                  @toNext="toNext"
                  ref="audioPlayer"
                  @makeReady="makeReady"
                  :url="songUrl"
                  @clearOvertimer="clearOvertimer">
    </audio-player>
  </div>

</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import {setUrl} from '@/common/js/song.js'
import audioPlayer from '@/base/player/audio'
import normalPlayer from '@/base/player/normal-player'
import miniPlayer from '@/base/player/mini-player'
import playList from '@/components/play-list/play-list'
export default {
  data() {
    return {
      name: 'musicPlay',
      showList: false,
      percent: 0,
      songUrl: '',
      timer: null,
      overtimer: null
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
      playList: 'getPlayList',
      playingState: 'getPlaying'
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
        this.changeInit()
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.makeUnReady()
        this.overtimer = setTimeout(() => {
          this.makeReady()// 超时的工作
        }, 2000)
        if (val.url === null || val.url === '') {
          this.getUrlAgain()
        } else {
          this.songUrl = val.url
          this.setPlayingState(true)
          this.$refs.audioPlayer.load(this.songUrl)
        }
      }, 1000)
    }
    // currentSong(val, old) {
    //   if (!val || (old && (val.songid === old.songid))) {
    //     return
    //   }
    //   // 获取数据之前工作
    //   if (this.timer) {
    //     clearTimeout(this.timer)
    //     this.changeInit()
    //     this.timer = null
    //   }
    //   this.timer = setTimeout(() => {
    //     this.makeUnReady()
    //     this.overtimer = setTimeout(() => {
    //       this.makeReady()// 超时的工作
    //     }, 1000)
    //     // hack for global nextTick
    //     this.$refs.audioPlayer.activePlay().then(() => {
    //       if (val.url === null || val.url === '') {
    //         this.getUrlAgain()
    //       } else {
    //         this.songUrl = val.url
    //         this.setPlayingState(true)
    //         this.$refs.audioPlayer.load(this.songUrl)
    //       }
    //     })
    //   }, 100)
    // }
  },
  methods: {
    clearOvertimer() {
      if (this.overtimer) {
        clearTimeout(this.overtimer)
        this.overtimer = null
      }
    },
    changeInit() {
      this.$refs.audioPlayer.pause()
      this.setPercent(0)
      this.$bus.$emit('jumpLyric', 0)
      if (this.$refs.audio) {
        this.$refs.audio.currentTime = 0
      }
    },
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
          this.songUrl = songCopy.url
          this.$refs.audioPlayer.load(this.songUrl)
          this.setPlayingState(true)
        },
        error => {
          _this.makeReady()
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
    },
    toNext() {
      this.$refs.normalPlayer.next()
    },
    makeReady() {
      this.$refs.normalPlayer.makeReady()
      this.$refs.normalPlayer.turnNormalPlayer()
    },
    makeUnReady() {
      if (this.$refs.normalPlayer) {
        this.$refs.normalPlayer.makeUnReady()
      }
    },
    // hack方式 解决触发播放事件
    activePlay() {
      this.$refs.audioPlayer.activePlay()
      document.removeEventListener('touchend', this.activePlay)
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
  transition all .4s ease-out
  .top, .bottom
    transition all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
.mini-enter, .mini-leave-to
  opacity 0
.mini-enter-active, .mini-leave-active
  transition all .4s
</style>
