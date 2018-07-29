<template>
  <div class='normal-page'>
    <div class='back-ground'>
      <img :src="currentSong.image" alt="">
    </div>
    <div class='top'>
      <div class='back'>
        <div class='btn-back icon-back need-click' v-on:click.prevent="turnMiniPlayer"></div>
      </div>
      <div class='song-name'>
        {{currentSong.songname}}
      </div>
      <div class='singer'>{{currentSong.singer}}</div>
    </div>
    <div class='middle'>
      <div class='middle-lf'  v-show="!showLyric">
        <div class='middle-rotate' ref='middleRotate'>
          <div class='middle-Mask'>
            <img class='middle-image' :src="currentSong.image">
          </div>
        </div>
        <div class='middle-songlyric'>
          <div class='middle-lyric'>
            {{currentSong.songname +'---------'+ currentSong.singer}}
          </div>
        </div>
      </div>
      <div class='middle-rt' v-show="showLyric">
        <!-- <lyric :percent="percent"></lyric> -->
      </div>
    </div>
    <div class='bottom'>
      <div class='bottom-pagedot'>
        <div class='dot dot-large'></div>
        <div class='dot'></div>
      </div>
      <div class='bottom-process'>
        <span class='time time-l'>{{formatTime(currentTime)}}</span>
        <process-bar :percent="percent"></process-bar>
        <span class='time time-r'>{{formatTime(currentSong.duration)}}</span>
      </div>
      <div class='bottom-control' >
        <div class='icon icon-left'>
          <div :class="currentMode" @click="changeMode"></div>
        </div>
        <div class='icon icon-left-other'>
          <div class='icon-prev' :class="{'disable':!songReady}" @click="prev"></div>
        </div>
        <div class='icon icon-middle'>
          <div class='needsclick' :class="[playingState? 'icon-pause': 'icon-play', {'disable':!songReady}]" @click.stop="controlToggle"></div>
        </div>
        <div class='icon'>
          <div class='icon-next' :class="{'disable':!songReady}" @click="next"></div>
        </div>
        <div class='icon'>
          <div class='icon-not-favorite'></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import playMode from '@/common/js/config.js'
import {randomList} from '@/common/js/random.js'
import processBar from '@/base/process-bar'
import lyric from '@/base/lyric'
import ww from 'window-watcher'
import animations from 'create-keyframe-animation'

export default {
  props: ['percent'],
  data() {
    return {
      name: 'normal-player',
      showLyric: false,
      songReady: false,
      currentTime: 0
    }
  },
  components: {
    processBar,
    lyric
  },
  computed: {
    ...mapGetters({
      currentSong: 'getCurrentSong',
      playingState: 'getPlaying',
      playList: 'getPlayList',
      fullgreen: 'getFullScreen',
      currentIndex: 'getCurrentIndex',
      sequenceList: 'getSequenceList',
      mode: 'getMode'
    }),
    currentMode() {
      return this.mode === playMode.sequence ? 'icon-sequence'
        : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    }
  },
  created() {
    this.$bus.$on('timeUpdate', this.handleTimeUpdate)
    this.$bus.$on('makeToReady', this.handleMakeReady)
    this.$bus.$on('makeToUnready', this.handleMakeUnReady)
    this.$bus.$on('toNext', this.next)
  },
  destroyed() {
    this.$bus.$off('timeUpdate', this.handleTimeUpdate)
    this.$bus.$off('makeToReady', this.handleMakeReady)
    this.$bus.$off('makeToUnready', this.handleMakeUnReady)
    this.$bus.$off('toNext', this.next)
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setCurrentMode: 'SET_MODE',
      setPlaylist: 'SET_PLAYLIST',
      setPlayingState: 'SET_PLAYINGSTATE',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    turnMiniPlayer() {
      this.setFullScreen(false)
    },
    formatTime(times) {
      let minutes = parseInt(times / 60)
      let seconds = parseInt(times % 60)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return minutes + ':' + seconds
    },
    handleTimeUpdate(time) {
      this.currentTime = time
    },
    handleMakeReady() {
      this.songReady = true
    },
    handleMakeUnReady() {
      this.songReady = false
    },
    changeMode() {
      let song = this.currentSong
      let list = this.mode === playMode.random
        ? this.randomPlayList() : this.sequenceList
      this.setCurrentMode((this.mode + 1) % 3)
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
    },
    next() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index >= this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      this.$emit('setPercent', 0)
      if (!this.playingState) {
        this.controlToggle()
      }
    },
    prev() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      this.$emit('setPercent', 0)
      if (!this.playingState) {
        this.controlToggle()
      }
    },
    controlToggle() {
      this.setPlayingState(!this.playingState)
    },
    leaveAnimation(done) {
      let $middleRotate = this.$refs.middleRotate
      let {x, y, scale} = this.getMiniPosAndScale()
      $middleRotate.style.transition = 'all .4s'
      $middleRotate.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      $middleRotate.addEventListener('transitionend', done)
    },
    enterAnimation(done) {
      let {x, y, scale} = this.getMiniPosAndScale()
      let animates = {
        '0%': {
          translate: [x, y],
          scale: scale
        },
        '60%': {
          translate: [0, 0],
          scale: 1.1
        },
        '100%': {
          translate: [0, 0],
          scale: 1
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation: animates,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      let $middleRotate = this.$refs.middleRotate
      animations.runAnimation($middleRotate, 'move', done)
    },
    afterEnter() {
      if (animations.hasAnimation('move')) {
        animations.unregisterAnimation('move')
      }
      let $middleRotate = this.$refs.middleRotate
      $middleRotate.style = ''
    },
    getMiniPosAndScale() {
      let deviceWidth = ww.width
      let deviceHeight = ww.height
      const targetWidth = 40
      const paddingLeft = 20
      const marginTop = 80
      const marginBottom = 30
      const normalWidth = deviceWidth * 0.8
      let x = targetWidth / 2 + paddingLeft - (deviceWidth / 2)
      let y = deviceHeight - marginTop - normalWidth / 2 - marginBottom
      let scale = targetWidth / normalWidth
      return {x, y, scale}
    },
    afterLeave() {
      // animations.unregisterAnimation('move')
      let $middleRotate = this.$refs.middleRotate
      $middleRotate.style = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.back-ground
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  z-index -1
  filter blur(20px)
  opacity .6
  img
    width: 100%
    height: 100%
.top
  position relative
  margin-bottom 25px
  .back
    position absolute
    left 6px
    top 0
    z-index 50
    .btn-back
      display: block;
      padding: 9px;
      font-size: 22px;
      color: #ffcd32;
      transform: rotate(-90deg);
  .song-name
    text-align center
    line-height 40px
    font-size 18px
    color #fff
  .singer
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    color: #fff;
.middle
  position: fixed
  width: 100%;
  top: 80px;
  bottom: 170px;
  left: 0
  right: 0
  white-space: nowrap;
  z-index: 50
  .middle-lf
    .middle-rotate
      position: relative
      margin 0 auto
      width: 80%
      height: 0
      padding-bottom 80%
      transform: rotate(30deg)
      .middle-Mask
        position: absolute
        box-sizing border-box
        width 100%
        height 100%
        border-radius 50%
        border: 10px solid hsla(0,0%,100%,.1);
        overflow hidden
        .middle-image
          position: absolute
          z-index -10
          width: 100%
          height: 100%
    .middle-songlyric
      width: 80%
      margin 30px auto 0
      text-align: center
      overflow: hidden;
      .middle-lyric
        height 30px
        line-height 30px
        font-size: 14px
        color: hsla(0,0%,100%,.5)
  .middle-rt
    position: absolute
    top 0
    left 0
    right 0
    bottom 0
.bottom
  position: absolute;
  bottom: 50px;
  width: 100%;
  .bottom-pagedot
    display flex
    justify-content space-around
    align-items center
    margin 0 auto
    height 20px
    width  40px
    .dot
      width 8px
      height 8px
      border-radius 8px
      background-color white
      &.dot-large
        width: 20px
  .bottom-process
    display: flex;
    justify-content center
    align-items: center;
    width: 80%
    margin: 0 auto
    padding: 10px 0
    .time
      width: 30px
      height: 30px
      line-height: 30px
  .bottom-control
    display: flex
    justify-content center
    align-items center
    .icon
      flex 1
      font-size 30px
      line-height 40px
      color #ffcd32
      .disable
        color:rgba(255,205,49,.5)
    .icon-left
      text-align right
    .icon-left-other
      text-align right
    .icon-middle
      font-size: 40px
      padding: 0 20px
      text-align center
</style>
