<template>
  <div class='rank-page' ref="rankPage">
    <scroll class='wrapper' v-show="topList.length > 0" :listLength="topList.length" ref="scroll">
      <ul class='rank-list' >
        <li v-for="(item, index) in topList"
            :key="index"
            class='rank-item'
            @click.prevent="openDetail(item)">
        <div class='rank-left'>
          <img class='rank-image' v-lazy="item.picUrl">
        </div>
        <ul class='rank-right'>
          <li class='rank-right-item'
            v-for="(detail, idx) in item.songList"
            v-if="idx < 3"
            :key="idx">
            <span class='item-num'>{{idx}}</span>
            <span class='item-info'>{{detail.songname + "-"+ detail.singername}}</span>
          </li>
        </ul>
      </li>
      </ul>
    </scroll>
    <div class='loading' v-show="topList.length <= 0">
      <loading class='loading-inner'></loading>
    </div>
    <transition name="slider">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {getTopList} from '@/api/rank.js'
import scroll from '@/base/scroll'
import {mixin} from '@/api/mixin'
import loading from '@/base/loading/imageloading'
import { mapMutations } from 'vuex'
export default {
  mixins: [mixin],
  data() {
    return {
      name: 'rank',
      topList: []
    }
  },
  components: {
    scroll,
    loading
  },
  created() {
    this.getlist()
  },
  methods: {
    ...mapMutations({
      setRankItem: 'SET_RANK'
    }),
    getlist() {
      getTopList().then((res) => {
        if (res.code === 0 && res.data.topList && res.data.topList.length > 0) {
          this.topList = res.data.topList.concat()
        }
      }).catch(function(err) {
        console.log(err)
      })
    },
    handlePlayList(list) {
      if (list.length > 0 && this.$refs.rankPage) {
        this.$refs.rankPage.style.bottom = '60px'
        this.$refs.scroll.refresh()
      }
    },
    openDetail(item) {
      this.setRankItem(item)
      this.$router.push({path: `/rank/${item.id}`})
    }
  }
}
</script>

<style lang="stylus" scoped>
.rank-page
  position absolute
  top 88px
  left 0
  right 0
  bottom 0
  overflow hidden
  .wrapper
    height: 100%
    width: 100%
    .rank-item
      display flex
      flex-direction row
      justify-content flex-start
      padding 10px 20px
      height 100px
      line-height 100px
      overflow hidden
      .rank-left
        flex: 0 0 100px
        width: 100px
        height: 100px
        background green
        .rank-image
          width: 100%
          height: 100%
      .rank-right
        flex 1
        display flex
        flex-direction column
        justify-content center
        align-items left
        padding-left 20px
        font-size 12px
        background: #333
        color: hsla(0,0%,100%,.3)
        overflow hidden
        .rank-right-item
          text-align left
          line-height: 26px
          width: 100%
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
  .loading
    position absolute
    top: 0
    left 0
    right 0
    bottom 0
    .loading-inner
      position:absolute
      top: 50%
      left: 50%
      transform : translateY(-50%) translateX(-50%)
  .slider-enter,
  .slider-leave-to {
    transform translateX(100%)
  }
  .slider-enter-active,
  .slider-leave-active{
    transition all .4s
  }
</style>
