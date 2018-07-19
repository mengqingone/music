<template>
  <div class="page" v-if="playList.length > 0">
    <transition name='normal'
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
      >
      <div class='normal-player' v-show="fullgreen">
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
        <div class='bottom'>
          <div class='bottom-pagedot'>
            <div class='dot dot-large'></div>
            <div class='dot'></div>
          </div>
          <div class='bottom-process'>
            <span class='time time-l'>{{formatTime(currentTime)}}</span>
            <div class='process-bar'>
              <div class='process-track'>
                <div class='process-btn'>
                  <div class='btn-center'></div>
                </div>
              </div>
            </div>
            <span class='time time-r'>{{formatTime(this.totalTime)}}</span>
          </div>
          <div class='bottom-control' >
            <div class='icon icon-left'>
              <div class='icon-sequence'></div>
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
    </transition>
    <transition name='mini'>
      <div class='mini-player' v-show="!fullgreen" @click="turnFullScreen"><!---->
        <div class='mini-image' ref='miniImage'><img :src="currentSong.image" class='image'></div>
        <div class='mini-info'>
          <div class='mini-songname'>{{currentSong.songname}}</div>
          <div class='mini-singer'>{{currentSong.singer}}</div>
        </div>
        <div class='mini-control'>
          <div class='icon-play-mini' :class="playingState? 'icon-pause-mini': 'icon-play-mini'"  @click.stop="controlToggle"></div>
          <div class='icon-playlist'></div>
        </div>
      </div>
    </transition>
    <div class='music-list' v-show="!fullgreen && showList"></div>
    <audio :src="currentUrl"
            preload="auto"
            ref="audio"
            @playing="ready"
            @error="error"
            @timeupdate="getCurrentTime"
            @loadeddata="loadeddata"
            autoplay>
      Your browser does not support the <code>audio</code> element.
    </audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import ww from 'window-watcher'
import animations from 'create-keyframe-animation'
import {setUrl} from '@/common/js/song.js'
export default {
  data() {
    return {
      name: 'musicPlay',
      showList: false,
      songReady: false,
      timer: null,
      currentTime: '',
      totalTime: ''
    }
  },
  computed: {
    ...mapGetters({
      playingState: 'getPlaying',
      playList: 'getPlayList',
      fullgreen: 'getFullScreen',
      currentSong: 'getCurrentSong',
      currentIndex: 'getCurrentIndex'
    }),
    // 排除空的url
    currentUrl() {
      if (this.currentSong.url) {
        return this.currentSong.url
      }
    }
  },
  watch: {
    currentSong(val) {
      let _this = this
      this.songReady = false
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(function() {
        _this.songReady = true
      }, 1000)
      if (!val.url) {
        this.getUrlAgain()
      }
    },
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
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setCurrentSong: 'SET_CURRENTSONG',
      setPlayingState: 'SET_PLAYINGSTATE',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    getCurrentTime(e) {
      this.currentTime = e.target.currentTime
    },
    getUrlAgain() {
      this.setPlayingState(false)
      let songCopy = Object.assign({}, this.currentSong)
      setUrl(songCopy).then(
        () => {
          this.setCurrentSong(songCopy)
          this.setPlayingState(true)
          // 付费歌曲,获取不到url
          if (!this.currentSong.url) {
            alert('付费歌曲')
            this.songReady = true
            this.setPlayingState(false)
          }
        },
        function(error) {
          console.log(error)
        }
      )
    },
    loadeddata(e) {
      this.totalTime = e.target.duration
    },
    ready() {
      this.songReady = true
    },
    error(e) {
      this.songReady = true
      console.log(e.target.error)
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
      if (!this.playingState) {
        this.controlToggle()
      }
    },
    controlToggle() {
      this.setPlayingState(!this.playingState)
    },
    turnMiniPlayer() {
      this.setFullScreen(false)
    },
    turnFullScreen() {
      this.setFullScreen(true)
    },
    enter(el, done) {
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
      animations.runAnimation(this.$refs.middleRotate, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.middleRotate.style = ''
    },
    leave(el, done) {
      let {x, y, scale} = this.getMiniPosAndScale()
      this.$refs.middleRotate.style.transition = 'all .4s'
      this.$refs.middleRotate.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      this.$refs.middleRotate.addEventListener('transitionend', done)
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
      // animations.runAnimation(this.$refs.middleRotate, 'move', done)
    },
    afterLeave() {
      // animations.unregisterAnimation('move')
      this.$refs.middleRotate.style = ''
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
    formatTime(times, length = 2) {
      let minutes = parseInt(times / 60)
      let seconds = parseInt(times % 60)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return minutes + ':' + seconds
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.page
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
.normal-player
  position: absolute
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
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
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
      .process-bar
        position relative
        width: 80%
        height: 30px
        .process-track
          position absolute
          top: 50%
          left: 5%
          z-index 1
          margin-top: -2px
          width: 90%
          height: 4px
          background-color rgba(0,0,0,.3);
      .process-btn
        position: absolute
        z-index 10
        left: 0
        top: 50%
        margin-top: -8px
        width: 16px
        height: 16px
        border-radius 16px
        background-color white
        .btn-center
          position absolute
          width: 10px
          height: 10px
          top:50%
          left:50%
          margin-left: -5px
          margin-top: -5px
          border-radius 10px
          background-color yellow
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
  z-index: 20
  background: #333;
  .mini-image
    width: 40px
    height: 40px
    padding: 0 10px 0 20px
    .image
      width: 100%
      height: 100%
      border-radius: 50%
  .mini-info
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .mini-songname
      margin-bottom: 2px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      color: #fff;
    .mini-singer
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 12px;
      color: hsla(0,0%,100%,.3);
  .mini-control
    display flex
    width: 100px
    flex-direction row
    align-items center
    justify-content space-around
    font-size 30px
    color rgba(255,205,49,.5)
</style>
