<template>
  <div class="page" v-if="playList.length > 0">
    <transition name='normal'>
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
          <div class='middle-rotate'>
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
            <span class='time time-l'>0:00</span>
            <div class='process-bar'>
              <div class='process-track'>
                <div class='process-btn'>
                  <div class='btn-center'></div>
                </div>
              </div>
            </div>
            <span class='time time-r'>5:00</span>
          </div>
          <div class='bottom-control'>
            <div class='icon icon-left'>
              <div class='icon-sequence'></div>
            </div>
            <div class='icon icon-left-other'>
              <div class='icon-prev'></div>
            </div>
            <div class='icon icon-middle'>
              <div class='needsclick icon-play'></div>
            </div>
            <div class='icon'>
              <div class='icon-next'></div>
            </div>
            <div class='icon'>
              <div class='icon-not-favorite'></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name='mini'>
      <div class='mini-player' v-show="!fullgreen" @click="turnFullScreen">
        <div class="mini-image"><img :src="currentSong.image" class='image'></div>
        <div class='mini-info'>
          <div class='mini-songname'>{{currentSong.songname}}</div>
          <div class='mini-singer'>{{currentSong.singer}}</div>
        </div>
        <div class='mini-control'>
          <div class='icon-play-mini'></div>
          <div class='icon-playlist'></div>
        </div>
      </div>
    </transition>
    <div class='music-list' v-show="!fullgreen && showList"></div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data() {
    return {
      name: 'musicPlay',
      showList: false
    }
  },
  computed: {
    ...mapGetters({
      playingState: 'getPlaying',
      playList: 'getPlayList',
      fullgreen: 'getFullScreen',
      currentSong: 'getCurrentSong'
    })
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN'
    }),
    turnMiniPlayer() {
      this.setFullScreen(false)
    },
    turnFullScreen() {
      this.setFullScreen(true)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.page
  &.normal-enter, .normal-leave-to
    opacity 0
    .top
      transform: translateY(-100px)
    .bottom
      transform: translateY(100px)
  &.normal-enter-active, .normal-leave-active
    transition all .4s
    .top, .bottom
      transition all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  &.mini-enter, .mini-leave-to
    opacity 0
  &.mini-enter-active, .mini-leave-active
    transition all 3s
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
