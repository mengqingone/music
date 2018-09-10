<template>
  <div class="search-page">
    <div class='search-input'>
      <search-box @setQuery="setQuery" :parentName="name" ref="searchBox"></search-box>
    </div>
    <div class='search-hot' v-show="this.query === ''">
      <search-hot ref="searchHot"></search-hot>
    </div>
    <div class='search-result' v-show="this.query !== ''">
      <result :query="query" ref="result" @clickItem="playItem"  @scroll="scroll"></result>
    </div>
  </div>
</template>

<script>
import searchBox from '@/base/search-box/search-box'
import searchHot from '@/base/search-hot/search-Hot'
import result from '@/base/result/result'
import {mapActions, mapMutations} from 'vuex'
import {createSinger} from '@/common/js/singer.js'
import {setUrl} from '@/common/js/song.js'
import {searchMixin} from '@/api/mixin.js'
export default {
  mixins: [searchMixin],
  data() {
    return {
      name: 'search',
      SINGERTYPE: 2
    }
  },
  components: {
    searchBox,
    searchHot,
    result
  },
  methods: {
    ...mapActions([
      'playSong'
    ]),
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    playItem(item) {
      if (item.type === this.SINGERTYPE) {
        let singer = createSinger(item.singerid, item.singername, item.singermid, '')
        this.setSinger(singer)
        this.$router.push({path: `/singer/${singer.id}`})
      } else {
        this.play(item)
      }
      this.saveQuery()
    },
    play(song) {
      setUrl(song).then(() => {
        this.playSong(song)
      })
    }
  },
  watch: {
    query(val) {
      if (val === '') {
        setTimeout(() => { this.$refs.searchHot.refresh() }, 400)
      } else if (val !== '') {
        setTimeout(() => { this.$refs.result.refresh() }, 400)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-page
  position fixed
  left 0
  right 0
  top 88px
  bottom 0
  .search-input
    margin: 20px
  .search-result
    position: fixed;
    top: 168px;
    left: 20px;
    right: 20px;
    bottom: 0;
    overflow: hidden;
</style>
