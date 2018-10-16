<template>
  <div class="switch-page">
    <ul  class="switches">
        <li class="switch-item" v-for="(item, index) in switchlist"
            :key="index"
            :class="[{'active': index === currentIndex}]"
            @click="clickItem(index)">
          <span >{{item.name}} </span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    switchlist: {
      type: Array,
      default: () => {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      name: 'switch'
    }
  },
  methods: {
    clickItem(index) {
      this.$emit('clickItem', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.switches
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid #333;
  border-radius: 5px
  .switch-item
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: 14px;
    color: hsla(0,0%,100%,.3);
    &.active
      background: #333;
      color: #fff;
</style>
