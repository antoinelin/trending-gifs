<template lang="pug">
  div
    img(v-bind:src="gif.images.original.url" v-bind:alt="gif.title")
    div(class="spinner gif-loader")
      div.bounce1
      div.bounce2
      div.bounce3
</template>

<script>
import { TweenLite, Power2 } from 'gsap'

export default {
  name: 'GIF',
  props: ['gif'],

  mounted: function() {
    TweenLite.to(this.$el, 0.35, {
      opacity: 1,
      y: 0,
      ease: Power2.easeInOut,
    })
  },

  beforeDestroy: function() {
    TweenLite.to(this.$el, 0.35, {
      opacity: 0,
      y: 10,
      ease: Power2.easeInOut,
    })
  },
}
</script>

<style lang="scss" scoped>
.c-gif {
  position: relative;

  width: 300px;
  height: 200px;

  margin: 2px;

  flex: 1 1 auto;
  @include flex(row, center, center, nowrap);

  font-size: 0;
  background-color: #eeeeee;

  opacity: 0;
  transform: translateY(10px);

  img {
    z-index: 23;

    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gif-loader {
    position: absolute;

    margin: 0;
    padding: 0;
  }
}
</style>
