<template>
  <div class="search-box">
    <input type="text" class="input-box" v-model="query" placeholder="搜索歌曲、歌手">
    <div class='icon-left'>
      <span class='icon icon-search'></span>
    </div>
    <div class='icon-right'>
      <span class='icon icon-dismiss' v-show="query" @click="clear"></span>
    </div>
  </div>
</template>

<script>
import {delayFunction} from '@/api/delayFunction.js'
export default {
  data() {
    return {
      name: 'search-box',
      query: ''
    }
  },
  created() {
    this.$bus.$on('setQuery', (query) => {
      this.query = query
    })
  },
  destroyed() {
    this.$bus.$off('setQuery')
  },
  mounted() {
    // 函数 柯里化
    this.$watch('query', delayFunction((val, old) => {
      this.$emit('setQuery', val)
    }, 400))
  },
  methods: {
    clear() {
      this.query = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-box
  position relative
  width: 100%
  height: 40px
  padding: 0 30px
  box-sizing border-box
  border-radius 6px
  background-color #333
  .input-box
    width 100%
    line-height 40px
    font-size: 14px
    color: #FFF
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    background-color #333
  .icon-left
    position absolute
    top 0
    left 0
    bottom 0
    width 30px
    height 40px
    text-align center
    .icon-search
      font-size 25px
  .icon-right
    position absolute
    top 0
    right 0
    bottom 0
    width 30px
    height 40px
    text-align center
    .icon-search
      font-size 10px
  .icon
    line-height 40px
    color: #222;
</style>
