<template>
  <div class="result-page" ref="resultPage">
    <scroll class='swapper'
            ref="scroll"
            :listLength="querylist.length"
            :loadmore="loadmore"
            :hasdata="hasdata"
            @scrollToEnd="loadingmore">
      <ul>
        <li class='item' v-for="(item, index) in querylist" :key="index" @click="clickItem(item)">
          <span :class="showIcon(item)"></span>
          <div v-html="showinfo(item)"></div>
        </li>
        <li class='loading' v-show="hasdata">
          <loading></loading>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import scroll from '@/base/scroll'
import loading from '@/base/loading/imageloading'
import {search} from '@/api/search.js'
import {createSong, setUrl} from '@/common/js/song.js'
import {createSinger} from '@/common/js/singer.js'
import { mapMutations, mapActions } from 'vuex'
import mixin from '@/api/mixin'
export default {
  mixins: [mixin],
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: 'result',
      querylist: [],
      hasdata: false,
      page: 1,
      perpage: 20,
      SINGERTYPE: 2,
      loadmore: true
    }
  },
  components: {
    scroll,
    loading
  },
  watch: {
    query(val) {
      this.querylist = []
      this.searchQuery()
    },
    hasdata(val) {
      if (!val && this.querylist.length) {
        this.$refs.scroll.refresh()
      }
    }
  },
  methods: {
    ...mapActions([
      'playSong'
    ]),
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    showIcon(item) {
      return (item.type) && (item.type === 2)
        ? 'icon icon-mine' : 'icon icon-music'
    },
    showinfo(item) {
      return (item.type) && (item.type === 2)
        ? `<span class='info'>${item.singername}<span>`
        : `<span class='info'>${item.songname + '.' + item.singer}<span>`
    },
    searchQuery() {
      search(this.query, this.perpage, this.page).then((res) => {
        if (res.code === 0) {
          this.querylist = this.querylist.concat(this.normalize(res.data))
          this.computedHasData(res.data)
        }
      }, (err) => {
        console.log(err)
      })
    },
    normalize(data) {
      let list = []
      if (data.zhida.singerid && this.page === 1) {
        list.push({...data.zhida, ...{type: this.SINGERTYPE}})
      }
      if (data.song && data.song.list.length) {
        data.song.list.forEach(element => {
          list.push(createSong(element))
        })
      }
      return list
    },
    computedHasData(data) {
      let songs = data.song
      if (!songs.list.length) {
        this.hasdata = false
        return
      }
      let totalnum = songs.totalnum
      let rest = totalnum - songs.curnum - (songs.curpage - 1) * this.perpage
      this.hasdata = rest > 0
    },
    loadingmore() {
      if (this.hasdata) {
        this.page++
        this.searchQuery()
      }
    },
    clickItem(item) {
      if (item.type === this.SINGERTYPE) {
        let singer = createSinger(item.singerid, item.singername, item.singermid, '')
        this.setSinger(singer)
        this.$router.push({path: `/singer/${singer.id}`})
      } else {
        this.play(item)
      }
      this.$emit('saveQuery')
    },
    handlePlayList(list) {
      if (list.length > 0) {
        this.$refs.resultPage.style.bottom = '60px'
        this.$refs.scroll.refresh()
      }
    },
    play(song) {
      setUrl(song).then(() => {
        this.playSong(song)
      })
    },
    refresh() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
.result-page
  position: fixed
  top: 168px
  left 20px
  right 20px
  bottom 0
  overflow hidden
.swapper
  height: 100%
.item
  display flex
  box-sizing border-box
  height 36px
  justify-content flex-start
  align-items center
  padding-bottom: 20px;
  color: hsla(0,0%,100%,.5);
  .icon
    flex: 0 0 30px;
    width: 30px;
    text-align center
  .info
    font-size 14px
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
.loading
  height: 50px
</style>
