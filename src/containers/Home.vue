<template lang="pug">
  div.t-home
    <GIFs v-if="$store.state.loaded && !$store.state.loading_failed && !$store.state.search"/>
    <Search v-if="$store.state.search"/>
    <Loading v-if="$store.state.loading && !$store.state.loading_failed && !$store.state.search"/>
    <LoadingFailed v-if="$store.state.loading_failed && !$store.state.search"/>
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
    this.$store.dispatch('loading')
  },

  mounted: function() {
    // Remove search bar on esc
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.$store.dispatch('resetSearchState')
      }
    })

    if (this.busy) return
    this.busy = true

    // HTTP request GIFs on page mounted
    this.$store
      .dispatch('getGifs', {
        endpoint: 'http://api.giphy.com/v1/gifs/trending',
        params: {
          api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
          limit: this.$store.state.limit,
          offset: this.$store.state.offset,
        },
      })
      .then(() => {
        RAF.add(this.update)
        this.busy = false
        this.$store.dispatch('loaded')
      })
  },

  beforeDestroy: function() {
    RAF.remove(this.update)

    this.$store.dispatch('resetGifs')
    this.$store.dispatch('resetOffset')
    this.$store.dispatch('resetError')
    this.$store.dispatch('resetSearchReturnNullState')

    document.removeEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.$store.dispatch('resetSearchState')
      }
    })
  },

  methods: {
    /**
     * addGifs
     *
     * HTTP request for add more GIFs to the container
     *
     * @function
     *
     */

    addGifs: function() {
      this.$store
        .dispatch('addGifs', {
          endpoint: 'http://api.giphy.com/v1/gifs/trending',
          params: {
            api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
            limit: this.$store.state.limit,
            offset: this.$store.state.offset + 1,
          },
        })
        .then(() => {
          this.$store.dispatch('loaded')
          this.busy = false
        })
    },

    /**
     * Update
     *
     * Check if viewport = bottom of the page on RAF
     *
     * @function
     *
     */

    update: function() {
      if (!this.$store.state.search) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
          this.$store.dispatch('loadingMore')

          if (this.busy || !this.$store.state.loaded) return
          this.busy = true

          this.loadMore()
        }
      }
    },

    /**
     * Load more
     *
     * Load more gifs with infinite scroll
     *
     * @function
     *
     */

    loadMore: function() {
      this.$store.dispatch('setOffset')
      this.addGifs()
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
