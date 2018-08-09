<template>
  <div class='search-hot-page' ref="searchHotPage">
    <scroll :listLength="hotlist.length" class='swapper' ref="scroll">
      <div>
        <div class='search-words'>
          <div class='title'>
            <h1>热门搜索</h1>
          </div>
          <ul class='keyword'>
            <li class='wd' v-for="(item, index) in hotlist" :key="index" @click='clickHotItem(item)'>
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class='search-history'>
          <history></history>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '@/base/scroll'
import history from '@/base/history/history'
import {hotsearch} from '@/api/search.js'
import mixin from '@/api/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      name: 'searchHot',
      hotlist: []
    }
  },
  components: {
    history,
    scroll
  },
  created() {
    this.getHotList()
  },
  methods: {
    getHotList() {
      hotsearch().then((res) => {
        if (res.code === 0) {
          this.hotlist = res.data.hotkey
        }
      }, (err) => {
        console.log(err)
      })
    },
    clickHotItem(item) {
      this.$bus.$emit('setQuery', item.k)
    },
    handlePlayList(list) {
      if (list.length > 0) {
        this.$refs.searchHotPage.style.bottom = '60px'
        this.$refs.scroll.refresh()
      }
    },
    refresh() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-hot-page
  position: fixed
  top 168px
  left 20px
  right 20px
  bottom 0
  overflow hidden
.swapper
  height: 100%
.search-words
  .title
    margin-bottom: 20px
    font-size: 14px
    color: hsla(0,0%,100%,.5)
  .keyword
    &:after
      content:""
      display block
      clear both
    .wd
      float:left
      padding 0 10px
      margin: 0 20px 20px 0
      height: 20px
      border-radius 8px
      background: #333
      text-align center
      span
        line-height 20px
        font-size 14px
        color: hsla(0,0%,100%,.5)
</style>
