<template>
  <div class="page">
    <div><img src="./loading.gif" class='loading-img'></div>
    <p>正在加载...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'imageLoading'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl";
.page
  text-align center
  font-size: $font-size-small-s
  .loading-img
    width: 24px
    height: 24px
</style>
