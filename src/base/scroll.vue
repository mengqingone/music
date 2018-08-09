<template>
  <div ref='wrapper'>
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      name: 'scroll'
    }
  },
  props: {
    listLength: Number,
    loop: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 400
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    probeType: {
      type: Number,
      default: 0
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    loadmore: {
      type: Boolean,
      default: false
    },
    hasdata: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    initBScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        preventDefault: true,
        scrollY: true,
        scrollX: false,
        click: true,
        momentum: true,
        freeScroll: false,
        bounce: true,
        probeType: this.probeType
      })
      if (this.listenScroll) {
        this.scroll.on('scroll', (e) => {
          this.$emit('scroll', e)
        })
      }
      if (this.loadmore) {
        this.scroll.on('scrollEnd', (e) => {
          if (e.y <= this.scroll.maxScrollY && this.hasdata) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    refresh() {
      this.scroll.refresh()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    scrollTo(y) {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    }
  },
  created() {
    this.$nextTick(() => {
      this.initBScroll()
    })
  },
  watch: {
    listLength() {
      this.refresh()
    }
  }

}
</script>

<style lang="stylus" scoped>

</style>
