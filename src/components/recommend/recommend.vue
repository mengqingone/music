<template>
  <div>
    <div class='music-frame'>
      <slider v-if="this.imageList.length > 0" :imageList="imageList">
        <li v-for="(item, index) in imageList" :key="index" class='list-item'>
          <img :src="item.pic_info.url" class='slider-img'>
        </li>
      </slider>
    </div>
    <div class='rest'>hello</div>
  </div>

</template>

<script>
import getRecommend from '@/api/recommend.js'
import { ERROR_OK } from '@/api/config.js'
import slider from '@/base/slider'
export default {
  data() {
    return {
      name: 'recommend',
      imageList: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
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
    slider
  }
}
</script>

<style lang="stylus" scoped>
  .music-frame
    width: 100%
    height: 0
    padding-bottom 40%
    overflow hidden
    .rest
      height: 1000px
      width: 100%
</style>
