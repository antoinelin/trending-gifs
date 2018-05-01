<template lang="pug">
  h2(v-if="$store.state.search_return_null").c-loadingFailed Oupsi ! We did not find any GIFs :(
  h2(v-else).c-loadingFailed Oupsi ! Something goes wrong :(
</template>

<script>
export default {
  name: 'LoadingFailed',
}
</script>

<style lang="scss" scoped>
.c-loadingFailed {
  text-align: center;
}
</style>
