<template lang="pug">
  div(width="gif.images.original.width" height="gif.images.original.height")
    img(v-bind:src="gif.images.original.url")
</template>

<script>
export default {
  name: 'GIF',
  props: ['gif'],
}
</script>

<style lang="scss" scoped>
.c-gif {
  width: 100%;

  margin: 5px 0;

  font-size: 0;
  background-color: #eeeeee;

  img {
    width: 100%;
  }
}
</style>
