<template>
  <div class="search-page">
    <div class='search-input'>
      <search-box></search-box>
    </div>
    <div class='search-hot' v-show="!searching">
      <search-hot></search-hot>
      <!-- <history></history> -->
    </div>
    <div class='search-result' v-show="searching">
      <result></result>
    </div>
  </div>
</template>

<script>
import searchBox from '@/base/search-box/search-box'
import searchHot from '@/base/search-hot/search-Hot'
import result from '@/base/result/result'
export default {
  data() {
    return {
      name: 'search',
      searching: true
    }
  },
  components: {
    searchBox,
    searchHot,
    result
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
  .search-hot
    margin 0 20px 20px
  .search-result
    margin: 20px
</style>
