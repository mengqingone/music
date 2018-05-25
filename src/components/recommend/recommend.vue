<template>
  <div class='music-frame'>
    <slider>
    <ul>
      <li v-for="(item, index) in imageList" :key="index">
        <img :src="item.pic_info.url" class='slider-img'>
      </li>
    </ul>
    </slider>
  </div>
</template>

<script>
import getRecommend from '@/api/recommend.js'
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
        _this.imageList = res.focus.data.content
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
    background-color red
    .slider-img
      width: 100%
      height: 100%
</style>
