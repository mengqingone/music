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
    }
  },
  components: {
  },
  methods: {
    initBScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        scrollX: false,
        click: true,
        momentum: true,
        scrollbar: {
          fade: true,
          interactive: false // 1.8.0 新增
        },
        freeScroll: true,
        bounce: true
      })
    },
    refresh() {
      this.scroll.refresh()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    }
  },
  created() {
    this.$nextTick(() => {
      this.initBScroll()
    })
  },
  watch: {
    listLength() {
      console.log('hello')
      this.refresh()
    }
  }

}
</script>

<style lang="stylus" scoped>

</style>
