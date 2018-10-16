<template>
  <div class='normal-page'>
    <div class='back-ground'>
      <img v-lazy="currentSong.image" alt="">
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
    <div  class='middle'
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend.prevent="middleTouchEnd">
        <div class='middle-lf' ref="middleLf">
          <div class='middle-rotate'>
            <div class='middle-Mask' ref='middleRotate'>
              <img class='middle-image play' :class="[!playingState? 'pause': '']" v-lazy="currentSong.image">
            </div>
          </div>
          <div class='middle-songlyric'>
            <div class='middle-lyric'>
              {{currentLyric}}
            </div>
          </div>
        </div>
        <div class='middle-rt' ref="middleRt">
          <lyric :percent="percent" @setCurrentLyric="setCurrentLyric"></lyric>
        </div>
    </div>
    <div class='bottom'>
      <div class='bottom-pagedot'>
        <div class='dot' :class="middleShow === 'cd'? 'dot-large': ''"></div>
        <div class='dot' :class="middleShow === 'lyric'? 'dot-large': ''"></div>
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
import processBar from '@/base/player/process-bar'
import lyric from '@/base/player/lyric'
import ww from 'window-watcher'
import animations from 'create-keyframe-animation'
import {playMixin} from '@/api/mixin'
import playMode from '@/common/js/config.js'
export default {
  mixins: [playMixin],
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      name: 'normal-player',
      songReady: false,
      currentTime: 0,
      currentLyric: '',
      middleShow: 'cd',
      middleTouch: {}
    }
  },
  components: {
    processBar,
    lyric
  },
  computed: {
    ...mapGetters({
      playingState: 'getPlaying',
      fullgreen: 'getFullScreen',
      currentIndex: 'getCurrentIndex'
    })
  },
  watch: {
    percent(val) {
      if (val === 0) {
        this.currentTime = 0
      } else {
        this.currentTime = val * this.currentSong.duration
      }
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN'
    }),
    turnMiniPlayer() {
      this.setFullScreen(false)
    },
    turnNormalPlayer() {
      this.setFullScreen(true)
    },
    formatTime(times) {
      let minutes = parseInt(times / 60)
      let seconds = parseInt(times % 60)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return minutes + ':' + seconds
    },
    makeReady() {
      this.songReady = true
    },
    makeUnReady() {
      this.songReady = false
    },
    next() {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1 || this.mode === playMode.loop) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index >= this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
      }
    },
    prev() {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1 || this.mode === playMode.loop) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
      }
    },
    loop() {
      this.$bus.$emit('jumpTo', 0)
    },
    controlToggle() {
      this.setPlayingState(!this.playingState)
    },
    leaveAnimation(done) {
      if (this.middleShow === 'lyric') {
        setTimeout(() => { done() }, 400)
        return
      }
      let $middleRotate = this.$refs.middleRotate
      let {x, y, scale} = this.getMiniPosAndScale()
      $middleRotate.style.transition = 'all .4s'
      $middleRotate.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      $middleRotate.addEventListener('transitionend', done)
      // 方法2
      // let animates = {
      //   '0%': {
      //     translate: [0, 0],
      //     scale: 1
      //   },
      //   '100%': {
      //     translate: [x, y],
      //     scale: scale
      //   }
      // }
      // animations.registerAnimation({
      //   name: 'move',
      //   animation: animates,
      //   presets: {
      //     duration: 400,
      //     easing: 'linear'
      //   }
      // })
      // animations.runAnimation($middleRotate, 'move', done)
    },
    enterAnimation(done) {
      if (this.middleShow === 'lyric') {
        setTimeout(() => { done() }, 400)
        return
      }
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
      // 方法2
      // if (animations.hasAnimation('move')) {
      //   animations.unregisterAnimation('move')
      // }
      let $middleRotate = this.$refs.middleRotate
      $middleRotate.style = ''
    },
    setCurrentLyric(lyric) {
      this.currentLyric = lyric
    },
    middleTouchStart(e) {
      this.middleTouch.start = this.currentLyric ? 1 : 0
      this.middleTouch.moved = false
      let touches = e.touches[0]
      this.middleTouch.startX = touches.pageX
      this.middleTouch.startY = touches.pageY
    },
    middleTouchMove(e) {
      if (!this.middleTouch.start) {
        return
      }
      let touches = e.touches[0]
      let deltaX = touches.pageX - this.middleTouch.startX
      let deltaY = touches.pageY - this.middleTouch.startY
      let distance = 0
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.moved) {
        this.moved = true
      }
      if (deltaX < 0 && this.middleShow === 'cd') {
        distance = Math.max(deltaX, -1 * ww.width)
      } else if (deltaX > 0 && this.middleShow === 'lyric') {
        distance = Math.min(deltaX - ww.width, 0)
      } else {
        this.moved = false
        return
      }
      let percent = 1 - Math.abs(distance) / ww.width
      let $middleRt = this.$refs.middleRt
      let $middleLf = this.$refs.middleLf
      $middleRt.style.transform = `translate3d(${distance}px, 0, 0)`
      $middleLf.style.opacity = `${percent}`
      $middleLf.style.transition = $middleRt.style.transition = ''
    },

    _showLyric() {
      let $middleRt = this.$refs.middleRt
      let $middleLf = this.$refs.middleLf
      $middleLf.style.opacity = 0
      this.middleShow = 'lyric'
      $middleRt.style.transform = `translate3d(${ww.width * -1}px, 0, 0)`
      $middleRt.style.transition = $middleLf.style.transition = 'all 300ms linear'
    },
    _showCd() {
      let $middleRt = this.$refs.middleRt
      let $middleLf = this.$refs.middleLf
      $middleLf.style.opacity = 1
      this.middleShow = 'cd'
      $middleRt.style.transform = `translate3d(0, 0, 0)`
      $middleRt.style.transition = $middleLf.style.transition = 'all 300ms linear'
    },
    middleTouchEnd(e) {
      if (!this.moved) {
        return
      }
      let touches = e.changedTouches[0]
      let deltaX = touches.pageX - this.middleTouch.startX
      let percent = Math.abs(deltaX) / ww.width
      if (percent > 0.1) {
        if (this.middleShow === 'cd') {
          this._showLyric()
        } else {
          this._showCd()
        }
      } else {
        if (this.middleShow === 'cd') {
          this._showCd()
        } else {
          this._showLyric()
        }
      }
      this.middleTouch.start = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.normal-page
  position: fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color $color-background
  z-index 10
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
    width: 100%
    top: 80px
    bottom: 120px
    white-space: nowrap
    font-size: 0
    .middle-lf
      display inline-block
      width: 100%
      height: 100%
      vertical-align: top
      .middle-rotate
        position: relative
        margin 0 auto
        width: 80%
        height: 0
        padding-bottom 80%
        .middle-Mask
          position: absolute
          left 0
          right 0
          bottom 0
          top 0
          z-index 10
          overflow hidden
          .middle-image
            position: absolute
            box-sizing border-box
            width 100%
            height 100%
            left 0
            right 0
            bottom 0
            top 0
            border-radius 50%
            border: 10px solid hsla(0,0%,100%,.1);
            &.play
              animation: rotate 20s linear infinite
            &.pause
              animation-play-state: paused
      .middle-songlyric
        margin: 0 auto
        text-align: center
        .middle-lyric
          height 30px
          line-height 30px
          font-size: 14px
          color: hsla(0,0%,100%,.5)
    .middle-rt
      position relative
      display inline-block
      width: 100%
      height: 100%
      overflow: hidden
      vertical-align: top
  .bottom
    position: absolute;
    bottom: 70px;
    width: 100%;
    z-index: 20
    opacity: 0.6
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
@keyframes rotate
  0%
    transform: rotate(0)
  100%
    transform: rotate(360deg)
</style>
