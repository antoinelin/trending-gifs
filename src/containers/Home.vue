<template lang="pug">
  div.t-home
    <GIFs v-if="$store.state.gifs_loaded && !$store.state.gifs_loading_failed && !$store.state.search"/>
    <Search v-if="$store.state.search"/>
    <Loading v-if="$store.state.gifs_loading && !$store.state.gifs_loading_failed && !$store.state.search"/>
    <LoadingFailed v-if="$store.state.gifs_loading_failed && !$store.state.search"/>
</template>

<script>
import RAF from 'raf'
import GIFs from '@/components/GIFs'
import Search from '@/components/Search'
import Loading from '@/components/Loading'
import LoadingFailed from '@/components/LoadingFailed'

export default {
  name: 'Home',

  data: function() {
    return {
      busy: false,
    }
  },

  components: {
    GIFs,
    Loading,
    LoadingFailed,
    Search,
  },

  beforeMount: function() {
    this.$store.dispatch('setGifsLoading')
  },

  mounted: function() {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.$store.dispatch('searchToFalse')
      }
    })

    if (this.busy) return
    this.busy = true

    this.$store
      .dispatch('getGifs', {
        endpoint: 'http://api.giphy.com/v1/gifs/trending',
        params: {
          api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
          limit: this.$store.state.gifs_limit,
          offset: this.$store.state.gifs_offset,
        },
      })
      .then(() => {
        RAF.add(this.update)
        this.busy = false
        this.$store.dispatch('setGifsLoaded')
      })
  },

  beforeDestroy: function() {
    RAF.remove(this.update)

    this.$store.dispatch('emptyGifsArray')
    this.$store.dispatch('setOffsetToZero')
    this.$store.dispatch('removeError')

    document.removeEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.$store.dispatch('searchToFalse')
      }
    })
  },

  methods: {
    addTrendingGifs: function() {
      this.$store
        .dispatch('addGifs', {
          endpoint: 'http://api.giphy.com/v1/gifs/trending',
          params: {
            api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
            limit: this.$store.state.gifs_limit,
            offset: this.$store.state.gifs_offset + 1,
          },
        })
        .then(() => {
          this.$store.dispatch('setGifsLoaded')

          const timeout = setTimeout(() => {
            this.busy = false
            clearTimeout(timeout)
          }, 3000)
        })
    },

    update: function() {
      if (!this.$store.state.search) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
          this.$store.dispatch('setLoadingMoreGifs')

          if (this.busy || !this.$store.state.gifs_loaded) return
          this.busy = true

          this.loadMore()
        }
      }
    },

    loadMore: function() {
      this.$store.dispatch('setGifsOffset')
      this.addTrendingGifs()
    },
  },
}
</script>

<style lang="scss">
.t-home {
  width: 80vw;
  overflow: hidden;
}
</style>
