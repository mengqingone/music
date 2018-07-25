<template>
  <div>
    <div class='image-header'>
      <div class='background-image'
            ref='bgImg'
            :class="{'bg-reduce':reduceHeight}">
        <img :src='bgImage'>
        <div class='bg-blur'></div>
        <div class='play-btn'
            v-show="!reduceHeight && songs.length">
          <div class='play' @click="randomPlay">
            <i class='icon-play'></i>
            <span>随机播放全部</span>
          </div>
        </div>
      </div>
      <div class='list-body' ref='listBody' :class="{'low-zindex':reduceHeight}">
        <div class='layer' ref="layer"></div>
        <scroll :list-length="songs.length"
                class='wrapper'
                :listenScroll ="listenScroll"
                :probeType="probeType"
                @scroll="scroll"
                ref="songscroll">
          <song-list :s-list="songs" @play="playSong"></song-list>
        </scroll>
        <div class='songs-loading' v-show="!songs.length">
          <loading></loading>
        </div>
      </div>
    </div>
    <div class='header-title'>
      <div class='back icon-back' @click="back">
        <span></span>
      </div>
      <h1 class='title' v-html="title"></h1>
    </div>
  </div>
</template>

<script>
import songList from '@/base/song-list'
import scroll from '@/base/scroll'
import loading from '@/base/loading/imageloading'
import {mapActions} from 'vuex'
export default {
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: 'musicList',
      listenScroll: true,
      probeType: 3,
      scrollHeight: 0,
      TitleHeight: 40,
      reduceHeight: false,
      refreshed: false
    }
  },
  components: {
    songList,
    scroll,
    loading
  },
  methods: {
    ...mapActions([
      'playMusic',
      'randomPlayMusic'
    ]),
    scroll(e) {
      let layerDom = this.$refs.layer
      let bgImgDom = this.$refs.bgImg
      if ((e.y * -1) < (this.scrollHeight - this.TitleHeight)) {
        layerDom.style = `transform: translateY(${e.y + 'px'});`
        this.reduceHeight = false
      } else {
        this.reduceHeight = true
      }
      let scale = 1
      if (e.y > 0) {
        let percent = Math.abs(e.y / this.scrollHeight)
        scale = 1 + percent
      }
      bgImgDom.style.transform = `scale(${scale})`
    },
    back() {
      this.$router.back()
    },
    playSong(index) {
      this.playMusic({songlist: this.songs, index})
    },
    randomPlay() {
      this.randomPlayMusic({songlist: this.songs})
    }
  },
  mounted() {
    this.scrollHeight = parseFloat(window.getComputedStyle(this.$refs.bgImg, null).getPropertyValue('padding-bottom'))
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.low-zindex
  z-index: -10
.bg-reduce
  position: absolute!important
  height: 40px!important
  padding-bottom 0!important
  z-index: 10
.image-header
  position fixed
  left 0
  right 0
  bottom 0
  top 0
  width 100%
  height 100%
  .background-image
    position: relative
    width: 100%
    height: 0
    padding-bottom 70%
    overflow hidden
    img
      width: 100%
    .bg-blur
      position absolute
      z-index 2
      top 0
      bottom 0
      left 0
      right 0
      background-color rgba(7,17,27,0.3)
    .play-btn
      position: absolute
      bottom: 20px
      z-index: 50
      width: 100%
      font-size: 0
      .play
        box-sizing: border-box
        width: 135px
        margin: 0 auto
        text-align: center
        border: 1px solid #ffcd32
        color: #ffcd32
        border-radius: 100px
        line-height: 30px;
        .icon-play
          vertical-align: middle
          margin-right: 6px
          font-size: $font-size-medium-x
        span
          vertical-align: middle
          font-size: $font-size-small
  .list-body
    position: relative
    width: 100%
    height: 100%
    .layer
      height: 100%
      background-color: $color-background
    .wrapper
      position absolute
      z-index: 100
      top: 0
      bottom: 0
      left: 0
      right: 0
      width: 100%
      height: 100%
    .songs-loading
       position absolute
       display flex
       top: 0
       left: 0
       right: 0
       bottom: 0
       align-items center
       justify-content center
.header-title
  position absolute
  width: 100%
  height: 40px
  top: 0
  left: 0
  z-index 50
  .back
    position absolute
    width: 40px
    line-height 40px
    left: 6px
    top: 0
    bottom: 0
    text-align: center
    font-size: $font-size-large-x
    color: $color-theme
  .title
    text-align center
    line-height 40px
    font-size: $font-size-large
</style>
