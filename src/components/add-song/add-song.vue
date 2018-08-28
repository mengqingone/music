<template>
  <div class="add-song-page" v-show="showPage">
    <div  class="header">
      <h1  class="title">添加歌曲到列表</h1>
      <div  class="close">
        <i class="icon icon-close" @click.stop="hide"></i>
      </div>
    </div>
    <div class="search-box-wrapper">
      <search-box placeholder="搜索歌曲" @setQuery="setQuery"></search-box>
    </div>
    <div  class="shortcut" v-show="this.query === ''">
      <switches :switchlist="switchlist" :currentIndex="switchIndex" @clickItem="switchItem"></switches>
      <div class="list-wrapper">
        <scroll :listLength="playHistory.length"
                class='list-scroll'
                ref="playHistoryScroll"
                v-show="playHistory.length > 0 && switchIndex === 0">
          <song-list :s-list="playHistory" @clickItem="saveSong"></song-list>
        </scroll>
        <scroll :listLength="searchHistory.length"
                class='list-scroll'
                ref="searchHistoryScroll"
                v-show="searchHistory.length > 0 && switchIndex === 1">
          <history title='搜索历史' :list="searchHistory" ref='history'  @clickItem="setQuery"></history><!--@openPrompt="openPrompt"-->
        </scroll>
      </div>
    </div>
    <div  class="search-result" v-show="this.query !== ''">
      <result :query="query" :onlySong="onlySong" @clickItem="saveSong"></result>
    </div>
    <top-tip ref="topTip"></top-tip>
  </div>
</template>

<script>
import searchBox from '@/base/search-box/search-box'
import songList from '@/base/song-list/song-list'
import result from '@/base/result/result'
import {searchMixin} from '@/api/mixin.js'
import switches from '@/base/switches/switches'
import scroll from '@/base/scroll'
import {mapGetters, mapActions} from 'vuex'
import history from '@/base/history/history'
import {setUrl} from '@/common/js/song.js'
import topTip from '@/base/top-tip/top-tip'
export default {
  mixins: [searchMixin],
  data() {
    return {
      showPage: false,
      showResult: false,
      addfinished: false,
      onlySong: true,
      switchlist: [{name: '最近播放', id: 1}, {name: '搜索历史', id: 2}],
      switchIndex: 0
    }
  },
  components: {
    searchBox,
    songList,
    result,
    switches,
    scroll,
    history,
    topTip
  },
  computed: {
    ...mapGetters({
      playHistory: 'getPlayHistory',
      searchHistory: 'getSearchHistory'
    })
  },
  watch: {
    query(val) {
      if (val === '') {
        this.refresh()
      }
    },
    switchIndex() {
      this.refresh()
    }
  },
  methods: {
    ...mapActions([
      'playSong'
    ]),
    show() {
      this.showPage = true
      this.query = ''
      this.refresh()
    },
    hide() {
      this.showPage = false
    },
    switchItem(index) {
      this.switchIndex = index
    },
    refresh() {
      setTimeout(() => {
        if (this.switchIndex === 0) {
          this.$refs.playHistoryScroll.refresh()
        } else {
          this.$refs.searchHistoryScroll.refresh()
        }
      }, 20)
    },
    saveSong(item, index) {
      if (index !== 0) {
        let song = Object.assign({}, item)
        setUrl(song).then(() => {
          this.playSong(song)
        })
        this.$refs.topTip.show()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.add-song-page
  position: fixed
  left 0
  right 0
  bottom 0
  top 0
  background-color: #222;
  .header
    position relative
    height: 44px;
    text-align: center;
    .title
      font-size: 18px
    .close
      position absolute
      top 0
      right 8px
      bottom 0
      .icon
        width: 44px
        height:44px
        line-height 44px
        font-size 20px
        color: #ffcd32;
        text-align: center
  .search-box-wrapper
    margin: 20px
  .list-wrapper
    position: absolute;
    top: 165px;
    bottom: 0;
    width: 100%;
    .list-scroll
      height: 100%
      overflow hidden
  .search-result
    position: fixed;
    top: 124px;
    bottom: 0;
    left: 20px
    right: 20px
    width: 100%;
    overflow: hidden
</style>
