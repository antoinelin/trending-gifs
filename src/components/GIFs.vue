<template lang="pug">
  div.c-gifs
    GIF(
      class="c-gif"
      v-for="(gif, index) in $store.state.gifs"
      :gif="gif"
      :key="index"
    )
</template>

<script>
import GIF from '@/components/GIF'

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

  margin-top: -2px;

  @include flex(row, flex-start, flex-start, wrap);
}
</style>
