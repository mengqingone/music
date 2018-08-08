<template>
  <div class="result-page">
    <ul>
      <li class='item'>
        <span class='icon icon-mine'></span>
        <span class='info'>周杰伦</span>
      </li>
      <li class='item'>
        <span class='icon icon-music'></span>
        <span class='info'>龙卷风-周杰伦</span>
      </li>
      <li class='item'>
        <span class='icon icon-music'></span>
        <span class='info'>等你下课-周杰伦</span>
      </li>
      <li class='item'>
        <span class='icon icon-music'></span>
        <span class='info'>龙卷风-周杰伦</span>
      </li>
      <li class='item'>
        <span class='icon icon-music'></span>
        <span class='info'>龙卷风-周杰伦</span>
      </li>
      <li class='item'>
        <span class='icon icon-music'></span>
        <span class='info'>龙卷风-周杰伦</span>
      </li>
      <li class='item'>
        <span class='icon icon-music'></span>
        <span class='info'>龙卷风-周杰伦</span>
      </li>
      <li class='item'>
        <span class='icon icon-music'></span>
        <span class='info'>龙卷风-周杰伦</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
.item
  display flex
  box-sizing border-box
  height 36px
  justify-content flex-start
  align-items center
  padding-bottom: 20px;
  color: hsla(0,0%,100%,.5);
  .icon
    flex: 0 0 30px;
    width: 30px;
    text-align center
  .info
    font-size 14px
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
</style>
