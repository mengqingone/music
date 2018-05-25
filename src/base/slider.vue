<template>
<div ref='wrapper'>
  <slot></slot>
  <!-- you can put some other DOMs here, it won't affect the scrolling -->
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      name: 'slider',
      scroll: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        click: true
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
</style>
