<template>
  <div class="history-page">
    <ul>
      <li class='item'>
        <span class='title'>搜索历史</span>
        <span class='icon-clear'></span>
      </li>
      <li class='item'>
        <span class='title'>周杰伦</span>
        <span class='icon-delete'></span>
      </li>
      <li class='item'>
        <span class='title'>空空如也</span>
        <span class='icon-delete'></span>
      </li>
      <li class='item'>
        <span class='title'>空空如也</span>
        <span class='icon-delete'></span>
      </li>
      <li class='item'>
        <span class='title'>空空如也</span>
        <span class='icon-delete'></span>
      </li>
      <li class='item'>
        <span class='title'>空空如也</span>
        <span class='icon-delete'></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'history'
    }
  }
}
</script>

<style lang="stylus" scoped>
.item
  height: 40px
  display flex
  justify-content space-between
  align-items center
  color: hsla(0,0%,100%,.5);
  .title
    font-size 16px
    text-align center
  .icon-delete
    width: 32px
    line-height: 40px
    font-size 12px
    text-align center
  .icon-clear
    width: 32px
    line-height: 40px
    text-align center
</style>
