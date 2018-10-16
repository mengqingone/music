<template>
  <transition name='prompt'>
    <div class="prompt-page">
      <div class='prompt-frame'>
        <div class='container'>
          <div class='prompt-info'>
            <p>{{prompt}}</p>
          </div>
          <div class='button-group'>
            <a href="#" class='btn' @click.prevent="makeSure">{{leftBtn}}</a>
            <a href="#" class='btn' @click.prevent="cancel">{{rightBtn}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    prompt: {
      default: '',
      type: String
    },
    leftBtn: {
      default: '确定',
      type: String
    },
    rightBtn: {
      default: '取消',
      type: String
    }
  },
  data() {
    return {
      name: 'prompt'
    }
  },
  methods: {
    makeSure() {
      this.$emit('makeSure')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="stylus" scoped>
.prompt-enter, .prompt-leave-to
  opacity: 0
  .container
    transform: translate3d(0, 100%,0)
.prompt-enter-active, .prompt-leave-active
  transition all 1s
  .container
    transition all 1s
.prompt-page
  position: fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 50
  overflow hidden
  background-color: rgba(0,0,0,.3);
  .prompt-frame
    position absolute
    left 50%
    top 50%
    width: 70%
    height: 0
    padding-bottom: 25%
    transform translate3d(-50%, -50%, 0)
    .container
      position absolute
      left 0
      right 0
      bottom 0
      top 0
      display flex
      flex-direction column
      background: #333
      border-radius: 13px
      .prompt-info
        flex 1
        display flex
        font-size: 18px
        justify-content: center
        align-items: center
        color: hsla(0, 0 ,100%,.8)
      .button-group
        flex 1
        display flex
        flex-direction row
        .btn
          flex 1
          display flex
          justify-content: center
          align-items: center
          color: hsla(0,0%,100%,.3);
          border-top: 1px solid rgba(0,0,0,.5);
          &:nth-child(1)
            border-right:1px solid rgba(0,0,0,.3);

</style>
