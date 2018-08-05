<template>
  <div class="listView-page">
    <scroll ref='scroll'
            class='wrapper'
            :listLength="singerList.length"
            :probeType="probeType"
            :listenScroll= "listenScroll"
            @scroll = "scroll">
      <div class='content'>
        <ul class='singer-group'
          v-for="(item, index) in singerList"
          :key="index"
          ref='singerGroup'
          :data-keyword="item.title">
          <li class='prefix'>{{item.title === 'hot' ? '热门': item.title}}</li>
          <li class='singer-detail'
              v-for="value in item.items"
              :key="value.id"
              @click="detail(value)">
            <div class='singer-url'>
              <img :src="value.imgUrl">
            </div>
            <div class='singer-name'>{{value.singerName}}</div>
          </li>
        </ul>
      </div>
    </scroll>
    <div class='fixed-title' v-show="fixedTitle" ref='fixed'>
      <p>{{fixedTitle}}</p>
    </div>
    <div class='prefix-list'>
      <ul @click.stop.prevent="moveToElement"
        @touchstart.stop.prevent="moveToElement"
        @touchmove.stop.prevent="touchScroll"
        class='prefix-container'>
        <li v-for="(item, index) in singerList" :key="index"
          :class="[{current:currentIndex == index}, 'prefix-keyWord']"
          :data-index="index">
           {{item.title === HOTDESC? '热':item.title}}
        </li>
      </ul>
    </div>
    <div class='loading' v-show="this.singerList.length === 0">
      <image-loading></image-loading>
    </div>
  </div>
</template>

<script>
import scroll from '@/base/scroll'
import {getData} from '@/common/js/dom.js'
import imageLoading from '@/base/loading/imageloading'
export default {
  data() {
    return {
      name: 'listView',
      HOTLENGTH: 10,
      HOTDESC: 'hot',
      currentIndex: 0,
      probeType: 3,
      scrollY: 0,
      translateY: 0
    }
  },
  props: {
    singerList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {
    scroll,
    imageLoading
  },
  created() {
    this.prefixRanges = []
    this.listenScroll = true
    this.singerRanges = []
  },
  computed: {
    fixedTitle() {
      if (this.scrollY > 0) {
        return
      }
      if (this.singerList.length) {
        let Title = this.singerList[this.currentIndex].title
        return Title === 'hot' ? '热门' : Title
      }
    }
  },
  watch: {
    singerList () {
      setTimeout(() => {
        this.initPrefixRanges()
        if (!this.singerRanges.length) {
          this.initSingerRanges()
        }
      }, 20)
    },
    scrollY(val) {
      let LEN = this.singerRanges.length
      if (this.currentIndex < (LEN - 1) && val < 0) {
        let translateY = 0
        let diff = this.singerRanges[parseInt(this.currentIndex) + 1] + val
        if (diff <= 30) {
          translateY = 30 - diff
        } else {
          translateY = 0
        }
        if (this.translateY !== translateY) {
          this.translateY = translateY
          this.$refs.fixed.style = `transform: translate3d(0, ${-1 * translateY + 'px'}, 0)`
        }
      }
    }
  },
  methods: {
    scroll(e) {
      this.scrollY = e.y
      if (scrollY > 0) {
        this.currentIndex = 0
      } else {
        this.currentIndex = this.getCurrentIndex(this.singerRanges, this.scrollY * -1)
      }
    },
    // prefixRanges
    getCurrentIndex(ranger, offsetY) {
      let LEN = ranger.length
      let idx = 0
      for (let i = 0; i < LEN; i++) {
        let top = ranger[i]
        if (i === (LEN - 1)) {
          idx = i
          break
        } else {
          let bottom = ranger[i + 1]
          if (offsetY >= top && offsetY <= bottom) {
            idx = i
            break
          }
        }
      }
      return idx
    },
    touchScroll(e) {
      let eClientY = e.touches[0].clientY
      this.currentIndex = this.getCurrentIndex(this.prefixRanges, eClientY)
      this.scrollToCurrentIdx(this.currentIndex)
    },
    moveToElement(e) {
      let index = getData(e.target, 'index')
      if (index != null) {
        this.currentIndex = index
        this.scrollToCurrentIdx(index)
      }
    },
    getOffsetY(className) {
      if (document.getElementsByClassName(className)) {
        return document.getElementsByClassName(className)[0].offsetTop
      }
    },

    initPrefixRanges() {
      let OffsetY = this.getOffsetY('singer-page')
      let prefixKeyWord = document.getElementsByClassName('prefix-keyWord')
      for (let i = 0, Len = prefixKeyWord.length; i < Len; i++) {
        this.prefixRanges[i] = prefixKeyWord[i].offsetTop + OffsetY
      }
    },
    initSingerRanges() {
      let _this = this
      let singerGroup = this.$refs.singerGroup
      singerGroup.forEach(function(cValue) {
        _this.singerRanges.push(cValue.offsetTop)
      })
    },
    scrollToCurrentIdx(val) {
      let result = this.$refs.singerGroup[val]
      if (result) {
        this.$refs.scroll.scrollToElement(result, 0)
      }
    },
    detail(item) {
      this.$emit('detail', item)
    },
    refresh() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.listView-page
  position fixed
  width: 100%
  top: 88px;
  bottom: 0
  overflow hidden
  .wrapper
    height 100%
    .singer-group
      padding-bottom: 30px;
      color: $color-text-d
      .prefix
        height: 30px
        line-height 30px
        font-size: $font-size-small-s
        background-color: $color-highlight-background
        padding-left: 20px;
      .singer-detail
        box-sizing border-box
        height: 70px
        padding: 20px 0 0 30px;
        display flex
        align-items: center;
        .singer-name
          flex:1
          margin-left: 20px
          font-size: $font-size-medium
        .singer-url
          width: 50px
          height: 50px
          border-radius 50px
          overflow hiddenl
          img
            width: 100%
            height: 100%
  .fixed-title
    position absolute
    top 0
    left 0
    right 0
    width 100%
    height 30px
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color: hsla(0,0%,100%,.5);
    background: #333;
  .prefix-list
    display: flex
    flex-direction column
    justify-content center
    align-items center
    position: absolute
    z-index: 2
    top: 0
    bottom: 0
    right: 0
    width: 20px
    .prefix-container
      background $color-background-d
      padding 20px 5px
      border-radius 20px
      color: $color-text-l
      .prefix-keyWord
        text-align: center
        font-size: $font-size-small
        height 20px
        line-height 20px
      .current
        color: #ffcd32
  .loading
    position: absolute
    display: flex
    top:0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    justify-content center
    align-items center
</style>
