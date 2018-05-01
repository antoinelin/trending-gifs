<template lang="pug">
  div.t-search
    <GIFs v-if="$store.state.loaded && !$store.state.loading_failed && !$store.state.search"/>
    <Search v-if="$store.state.search"/>
    <Loading v-if="$store.state.loading && !$store.state.loading_failed && !$store.state.search"/>
    <LoadingFailed v-if="$store.state.loading_failed && !$store.state.search"/>
</template>

<script>
import RAF from 'raf'
import store from '@/store/store'
import GIFs from '@/components/GIFs'
import Search from '@/components/Search'
import Loading from '@/components/Loading'
import LoadingFailed from '@/components/LoadingFailed'

export default {
  name: 'SearchPage',

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
    store.dispatch('loading')
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

    // Check if search params
    if (window.location.pathname.split('/')[2]) {
      // HTTP request GIFs on page mounted
      store
        .dispatch('getGifs', {
          endpoint: 'http://api.giphy.com/v1/gifs/search',
          params: {
            api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
            q: window.location.pathname.split('/')[2],
            limit: this.$store.state.limit,
            offset: this.$store.state.offset,
          },
        })
        .then(() => {
          RAF.add(this.update)
          this.busy = false
          store.dispatch('loaded')
        })
    }
  },

  beforeDestroy: function() {
    RAF.remove(this.update)

    store.dispatch('resetGifs')
    store.dispatch('resetOffset')
    store.dispatch('resetError')
    store.dispatch('resetSearchReturnNullState')

    document.removeEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        store.dispatch('resetSearchState')
      }
    })
  },

  beforeRouteUpdate: (to, from, next) => {
    store.dispatch('resetSearchState')
    store.dispatch('resetGifs')
    store.dispatch('resetOffset')
    store.dispatch('resetError')
    store.dispatch('resetSearchReturnNullState')

    if (to.path.split('/')[2]) {
      store
        .dispatch('getGifs', {
          endpoint: 'http://api.giphy.com/v1/gifs/search',
          params: {
            api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
            q: to.path.split('/')[2],
            limit: store.state.limit,
            offset: store.state.offset,
          },
        })
        .then(() => {
          store.dispatch('loaded')
        })
    }

    next()
  },

  methods: {
    /**
     * Update
     *
     * Check if viewport = bottom of the page on RAF
     *
     * @function
     *
     */

    update: function() {
      if (!store.state.search) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
          store.dispatch('loadingMore')

          if (this.busy || !store.state.loaded) return
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
      store.dispatch('setOffset')
      this.addGifs()
    },

    /**
     * addGifs
     *
     * HTTP request for add more GIFs to the container
     *
     * @function
     *
     */

    addGifs: function() {
      if (window.location.pathname.split('/')[2]) {
        store
          .dispatch('addGifs', {
            endpoint: 'http://api.giphy.com/v1/gifs/search',
            params: {
              api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
              q: window.location.pathname.split('/')[2],
              limit: store.state.limit,
              offset: store.state.offset,
            },
          })
          .then(() => {
            store.dispatch('loaded')

            const timeout = setTimeout(() => {
              this.busy = false
              clearTimeout(timeout)
            }, 3000)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.t-search {
  width: 80vw;
  overflow: hidden;
}
</style>
