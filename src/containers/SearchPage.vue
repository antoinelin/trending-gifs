<template lang="pug">
  div.t-search
    <GIFs v-if="$store.state.gifs_loaded && !$store.state.gifs_loading_failed && !$store.state.search"/>
    <Search v-if="$store.state.search"/>
    <Loading v-if="$store.state.gifs_loading && !$store.state.gifs_loading_failed && !$store.state.search"/>
    <LoadingFailed v-if="$store.state.gifs_loading_failed && !$store.state.search"/>
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
    store.dispatch('setGifsLoading')
  },

  mounted: function() {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.$store.dispatch('searchToFalse')
      }
    })

    if (this.busy) return
    this.busy = true

    if (window.location.pathname.split('/')[2]) {
      store
        .dispatch('getGifs', {
          endpoint: 'http://api.giphy.com/v1/gifs/search',
          params: {
            api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
            q: window.location.pathname.split('/')[2],
            limit: this.$store.state.gifs_limit,
            offset: this.$store.state.gifs_offset,
          },
        })
        .then(() => {
          RAF.add(this.update)
          this.busy = false
          store.dispatch('setGifsLoaded')
        })
    }
  },

  beforeDestroy: function() {
    RAF.remove(this.update)

    store.dispatch('emptyGifsArray')
    store.dispatch('setOffsetToZero')
    store.dispatch('removeError')

    document.removeEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        store.dispatch('searchToFalse')
      }
    })
  },

  beforeRouteUpdate: (to, from, next) => {
    store.dispatch('searchToFalse')
    store.dispatch('emptyGifsArray')
    store.dispatch('setOffsetToZero')
    store.dispatch('removeError')

    if (to.path.split('/')[2]) {
      store
        .dispatch('getGifs', {
          endpoint: 'http://api.giphy.com/v1/gifs/search',
          params: {
            api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
            q: to.path.split('/')[2],
            limit: store.state.gifs_limit,
            offset: store.state.gifs_offset,
          },
        })
        .then(() => {
          store.dispatch('setGifsLoaded')
        })
    }

    next()
  },

  methods: {
    update: function() {
      if (!store.state.search) {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
          store.dispatch('setLoadingMoreGifs')

          if (this.busy || !store.state.gifs_loaded) return
          this.busy = true

          this.loadMore()
        }
      }
    },

    loadMore: function() {
      store.dispatch('setGifsOffset')
      this.addGifs()
    },

    addGifs: function() {
      if (window.location.pathname.split('/')[2]) {
        store
          .dispatch('addGifs', {
            endpoint: 'http://api.giphy.com/v1/gifs/search',
            params: {
              api_key: 'EWtgxX9ydYJ4qOS1nbO9SxaPJi38L8HM',
              q: window.location.pathname.split('/')[2],
              limit: store.state.gifs_limit,
              offset: store.state.gifs_offset,
            },
          })
          .then(() => {
            store.dispatch('setGifsLoaded')

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
