<template>
  <div>
    <div class='search-words'>
      <div class='title'>
      <h1>热门搜索</h1>
      </div>
      <ul class='keyword'>
        <li class='wd'>
          <span>YOU CAN BE MY GIRLFRIEND</span>
        </li>
        <li class='wd'>
          <span>周杰伦</span>
        </li>
        <li class='wd'><span>98K</span></li>
        <li class='wd'><span>星球坠落</span></li>
        <li class='wd'><span>卡路里</span></li>
        <li class='wd'><span>PULL UP</span></li>
        <li class='wd'><span>星球坠落</span></li>
        <li class='wd'><span>卡路里</span></li>
        <li class='wd'><span>PULL UP</span></li>
      </ul>
    </div>
    <div class='search-history'>
      <history></history>
    </div>
  </div>
</template>

<script>
import history from '@/base/history/history'
export default {
  data() {
    return {
      name: 'searchHot'
    }
  },
  components: {
    history
  }
}
</script>

<style lang="stylus" scoped>
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
