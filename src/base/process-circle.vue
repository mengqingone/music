<template>
  <div class="page" @click.stop="controlToggle">
    <svg class='process-circle' :width="circleDiameter" :height="circleDiameter" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" class="lower-layer"/>
      <circle cx="50" cy="50" r="50" class="high-layer" ref='highLayer'/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    circleDiameter: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      name: 'processCirle'
    }
  },
  watch: {
    percent(val) {
      const perimeter = 314
      this.$refs.highLayer.style.strokeDasharray = `${perimeter * val} ${(1 - val) * perimeter}`
    }
  },

  methods: {
    controlToggle() {
      this.$emit('controlToggle')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page
    position relative
    .process-circle
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      width: 30px
      height: 30px
      .lower-layer
        stroke: rgba(255,205,49,.5);
        stroke-width: 10
        fill: transparent
        transform-origin: center;
        transform: scale(.9);
      .high-layer
        stroke: #ffcd32;
        stroke-width: 10
        fill: transparent;
        transform-origin: center;
        transform: scale(.9) rotate(-90deg);
        stroke-dasharray:0 314
</style>
