<template>
  <div class='recommend-page' ref="recommendPage">
    <scroll :listLength="hotSongList.length" ref="scroll" class='wrapper'>
      <div :class="[{'content-height': isloading }, 'content']">
        <div class='music-frame'>
          <slider v-if="this.imageList.length > 0" :imageList="imageList">
            <li v-for="(item, index) in imageList" :key="index" class='list-item'>
              <img :src="item.pic_info.url"
                  class='slider-img needsclick'
                  @load="imageLoad">
            </li>
          </slider>
        </div>
        <div class='hot-song'>
          <div class='hot-title'>热门歌曲推荐</div>
          <div class='hot-detail'
            v-for="(item, index) in hotSongList"
            :key="index"
            @click.stop.prevent="getHotSong(item)">
            <div class='hot-list'>
              <div class='hot-image'>
                <img v-lazy="item.imgurl">
              </div>
              <div class='list-detail'>
                <div class='hotlist-title'>{{item.creator.name}}</div>
                <div class='hotlist-info'>{{item.dissname}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class='loading' v-show="hotSongList.length == 0">
          <loading class='loading-inner'></loading>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRecommend, getRecommendList} from '@/api/recommend.js'
import { ERROR_OK } from '@/api/config.js'
import slider from '@/base/slider'
import scroll from '@/base/scroll'
import loading from '@/base/loading/imageloading'
import mixin from '@/api/mixin'
import { mapMutations } from 'vuex'
export default {
  mixins: [mixin],
  data() {
    return {
      name: 'recommend',
      imageList: [],
      hotSongList: [],
      loadOK: false,
      isloading: true
    }
  },
  watch: {
    // $route(to, from) {
    //   // 对路由变化作出响应...
    // },
    loadOK(val, old) {
      if (val) {
        this.$refs.scroll.refresh()
      }
    },
    hotSongList(val, old) {
      this.isloading = !val.length
    }
  },
  computed: {
    hostSongListLength() {
      return this.hotSongList.length
    }
  },
  created() {
    this._getRecommend()
    this._getRecommendList()
  },
  methods: {
    ...mapMutations({
      setDisc: 'SET_CURRENTDISC'
    }),
    imageLoad() {
      this.loadOK = true
    },
    _getRecommendList() {
      getRecommendList().then((res) => {
        this.hotSongList = res.data.data.list
      }, function(err) {
        console.log(err)
      })
    },
    _getRecommend() {
      let _this = this
      getRecommend().then(function(res) {
        if (res.code === ERROR_OK) {
          if (res.focus) {
            _this.imageList = res.focus.data.content
          }
        }
      }, function(err) {
        console.log(err)
      })
    },
    handlePlayList(list) {
      if (list.length > 0) {
        this.$refs.recommendPage.style.bottom = '60px'
        this.$refs.scroll.refresh()
      }
    },
    getHotSong(item) {
      this.setDisc(item)
      this.$router.push({path: `/recommend/${item.dissid}`})
    }
  },
  components: {
    slider,
    scroll,
    loading
  }
}
</script>

<style lang="stylus" scoped>
.recommend-page
  position fixed
  width: 100%
  top: 88px;
  bottom: 0
  overflow hidden
  .wrapper
    height 100%
    overflow hidden
    .content-height
      height 100%
    .content
      display flex
      flex-direction column
      .music-frame
        width: 100%
        height: 0
        padding-bottom 40%
        overflow hidden
      .hot-song
        .hot-title
          text-align: center
          height: 65px
          line-height 65px
          width: 100%
          color: #ffcd32
        .hot-detail
          .hot-list
            display flex
            justify-content: flex-start
            .hot-image
              box-sizing border-box
              width: 80px;
              height: 80px;
              img
                display inline-block
                padding 10px
                width: 60px
                height: 60px
            .list-detail
              display: flex
              font-size: 14px
              flex-direction column
              justify-content center
              flex 1
              .hotlist-title
                padding: 10px
              .hotlist-info
                padding: 10px
      .loading
        position relative
        flex: 1
        .loading-inner
          position:absolute
          top: 50%
          left: 50%
          transform : translateY(-50%) translateX(-50%)
</style>
