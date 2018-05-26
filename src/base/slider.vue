<template>
  <div ref='wrapper' class='wrapper-frame'>
    <ul ref='wrapper_inner' class='inner-frame'
      v-on:mouseenter="onEnter"
      v-on:touchstart="onEnter"
      v-on:mouseleave="_play">
      <slot></slot>
    </ul>
    <div v-if="this.showDots" class='dots'>
      <span v-for="(item, index) in imageList"
       :key="index"
       :class="[{current:index == pageNum},  'dot']">
      </span>
    </div>
    <!-- you can put some other DOMs here, it won't affect the scrolling -->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    imageList: Array,
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3500
    },
    speed: {
      type: Number,
      default: 400
    },
    showDots: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    }
  },
  data() {
    return {
      name: 'slider',
      scroll: null,
      timer: null,
      pageNum: 0
    }
  },
  methods: {
    initSliderSize() {
      let clientwidth = document.body.clientWidth// this.$refs['wrapper'].clientWidth
      if (this.$refs['wrapper_inner'] !== undefined &&
          this.$refs['wrapper_inner'] !== null) {
        this.$refs['wrapper_inner'].style.width = clientwidth * (this.imageList.length + 2) + 'px'
        let lis = this.$refs.wrapper_inner.children
        for (var i = 0; i < lis.length; i++) {
          lis[i].style.width = clientwidth + 'px'
        }
      }
    },
    onEnter() {
      if (this.timer !== null) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    initBScroll() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: false,
          click: true,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: this.threshold,
            speed: this.speed
          }
        })
        this.scroll.on('scrollEnd', this._play)
        this.scroll.on('touchEnd', this._play)
      })
    },
    _play() {
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }
      if (this.scroll) {
        this.pageNum = this.scroll.getCurrentPage().pageX
      }
      this.timer = setTimeout(() => {
        this.scroll.next()
      }, this.interval)
    },
    resizeFrame() {
      setTimeout(() => {
        this.initSliderSize()
        if (this.scroll) {
          this.scroll.refresh()
        }
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
    }
  },
  created() {
    this.$nextTick(() => {
      this.initSliderSize()
      this.initBScroll()
      if (this.autoPlay) {
        this._play()
      }
    })
  },

  mounted() {
    let _this = this
    window.addEventListener('resize', _this.resizeFrame, false)
  },
  destroyed() {
    window.removeEventListener('resize', function() {
      console.log('remove resize event')
    })
  },
  beforeDestroy() {
    this.scroll.disable()
    clearTimeout(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
.wrapper-frame
  position relative
.inner-frame
  height:100%
  overflow hidden
  &:after
    content:''
    display block
    clear both
  li
    float left
    img
      width: 100%
      height: 100%
.dots
  position absolute
  display flex
  justify-content center
  left:0
  right:0
  bottom: 20px
  width:100%
  height: 10px
  z-index 2
  .dot
    width: 10px
    height: 10px
    margin-left: 2px
    margin-right: 2px
    border-radius 10px
    background-color rgba(255,255,255,0.5)
  .current
    width: 30px !important
    background-color rgba(255,255,255,0.8) !important
</style>
