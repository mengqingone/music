<template>
  <div class="page">
    <div class='tabs'>
      <router-link class='tab-item'
        tag="div"
        :to="{ path: '/recommend'}" >
        <span class='tab-title'>推荐</span>
      </router-link>
      <router-link class='tab-item'
        tag="div"
        :to="{ path: '/singer'}" >
        <span class='tab-title'>歌手</span>
      </router-link>
      <router-link class='tab-item'
        tag="div"
        :to="{ path: '/rank'}" >
        <span class='tab-title'>排行</span>
      </router-link>
      <router-link class='tab-item'
        tag="div"
        :to="{path: '/search'}" >
        <span class='tab-title'>搜索</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'tab'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.tabs
  width: 100%
  height: 44px
  display: flex
  .tab-item
    width: 25%
    line-height: 44px
    text-align: center
    color: hsla(0,0%,100%,.5)
    .tab-title
      padding: 1px 2px
      font-size $font-size-medium
  .router-link-active
    color: $color-theme!important
    .tab-title
      border-bottom 2px solid $color-theme
      font-weight bold
</style>
