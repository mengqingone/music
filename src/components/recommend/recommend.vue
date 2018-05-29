<template>
  <div class='recommend-page'>
    <scroll :listLength="hotSongList.length" ref='scroll' class='wrapper'>
      <div class='content'>
        <div class='music-frame'>
          <slider v-if="this.imageList.length > 0" :imageList="imageList">
            <li v-for="(item, index) in imageList" :key="index" class='list-item'>
              <img :src="item.pic_info.url" class='slider-img' @load="imageLoad">
            </li>
          </slider>
        </div>
        <div class='hot-song'>
          <div class='hot-title'>热门歌曲推荐</div>
          <div class='hot-detail' v-for='(item, index) in hotSongList' :key='index'>
            <div class='hot-list'>
              <div class='hot-image'>
                <img :src="item.imgurl">
              </div>
              <div class='list-detail'>
                <div class='hotlist-title'>{{item.creator.name}}</div>
                <div class='hotlist-info'>{{item.dissname}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>

</template>

<script>
import {getRecommend, getRecommendList} from '@/api/recommend.js'
import { ERROR_OK } from '@/api/config.js'
import slider from '@/base/slider'
import scroll from '@/base/scroll'
export default {
  data() {
    return {
      name: 'recommend',
      imageList: [],
      hotSongList: [],
      loadOK: false
    }
  },
  watch: {
    loadOK(val, old) {
      if (val) {
        this.$refs.scroll.refresh()
      }
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
          _this.imageList = res.focus.data.content
        }
      }, function(err) {
        console.log(err)
      })
    }
  },
  components: {
    slider,
    scroll
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

</style>
