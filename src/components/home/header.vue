<template>
  <div class="header">
    <div class='header-left'>
      <div>
        <span class='logo'></span>
        Chicken Music
      </div>
    </div>
    <div class='user-icon'></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'homeHeader'
    }
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.header
  position relative
  height 44px
  line-height 44px
  .header-left
    text-align center;
    font-size: $font-size-large;
    color: $color-theme
    .logo
      display inline-block
      width: 30px
      height: 32px
      vertical-align middle
      background-size 30px 32px
      bg-image("~common/image/logo")
  .user-icon
    position absolute
    top: 0
    right: 0
    bottom 0
    width: 44px
    height: 44px
    z-index 1
    border:1px solid red
</style>
