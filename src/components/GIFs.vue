<template lang="pug">
  <masonry :cols="{default: 3, 980: 2, 640: 1}" :gutter="5">
    GIF(
      class="c-gif"
      v-for="(gif, index) in $store.state.gifs"
      :gif="gif"
      :key="index"
    )
  </masonry>
</template>

<script>
import Vue from 'vue'
import VueMasonry from 'vue-masonry-css'
import GIF from '@/components/GIF'

Vue.use(VueMasonry)

export default {
  name: 'GIFs',
  components: {
    GIF,
  },
}
</script>

<style lang="scss" scoped>
.c-gifs {
  width: 100%;
  max-width: 100%;
}
</style>
