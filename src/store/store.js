import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

import {
  GET_GIFS,
  LOADING,
  LOADED,
  LOADING_MORE,
  SET_OFFSET,
  ADD_GIFS,
  ERROR,
  TOGGLE_SEARCH_STATE,
  RESET_SEARCH_STATE,
  RESET,
  RESET_OFFSET,
  RESET_ERROR,
  SEARCH_RETURN_NULL,
  RESET_SEARCH_RETURN_TO_NULL,
} from './Types'

Vue.use(Vuex, VueAxios, axios)

const state = {
  gifs: [],
  limit: 24,
  offset: 0,
  loading: false,
  loaded: false,
  loading_failed: false,
  search: false,
  search_return_null: false,
}

const getters = {}

const mutations = {
  /* eslint-disable */

  /**
   * Get GIFs
   *
   * Get GIFs on container mount.
   *
   * @function
   *
   * @param {state} object
   *   States from store
   * @param {payload} object
   *   Data get by HTTP request
   */

  [GET_GIFS]: (state, payload) => {
    state.gifs = payload.data.data
  },

  /**
   * Add GIFs
   *
   * Add GIFs to component for load more functions.
   *
   * @function
   *
   * @param {state} object
   *   States from store
   * @param {payload} object
   *   Data get by HTTP request
   */

  [ADD_GIFS]: (state, payload) => {
    state.gifs = [...state.gifs, ...payload.data.data]
  },

  /**
   * Set Offset
   *
   * Set offset number use as params for HTTP request.
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [SET_OFFSET]: (state) => {
    state.offset += state.limit
  },

  /**
   * Loading
   *
   * Set loading state to manipulate DOM.
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [LOADING]: (state) => {
    state.loading = true
    state.loaded = false
  },

  /**
   * Loaded
   *
   * Set loaded state to manipulate DOM.
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [LOADED]: (state) => {
    state.loading = false
    state.loaded = true
  },

  /**
   * Loading more
   *
   * Set loading more state to manipulate DOM.
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [LOADING_MORE]: (state) => {
    state.loading = true
    state.loaded = true
  },

  /**
   * Reset
   *
   * Reset GIFs array
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [RESET]: (state) => {
    state.gifs = []
  },

  /**
   * Error
   *
   * Set error state
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [ERROR]: (state) => {
    state.loading = false
    state.loaded = false
    state.loading_failed = true
  },

  /**
   * Search return null
   *
   * Set search_return_null state when HTTP request return an empty array
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [SEARCH_RETURN_NULL]: (state) => {
    state.loading = false
    state.loaded = false
    state.loading_failed = true
    state.search_return_null = true
  },

  /**
   * Toggle search state
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [TOGGLE_SEARCH_STATE]: (state) => {
    state.search ? (state.search = false) : (state.search = true)
  },

  /**
   * Reset search state
   *
   * Set search state to false
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [RESET_SEARCH_STATE]: (state) => {
    state.search = false
  },

  /**
   * Reset offset
   *
   * Set offset state to false
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [RESET_OFFSET]: (state) => {
    state.offset = 0
  },

  /**
   * Reset error
   *
   * Set error state to false
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [RESET_ERROR]: (state) => {
    state.loading_failed = false
  },

  /**
   * Reset search return to null
   *
   * Set search_return_to_null state to false
   *
   * @function
   *
   * @param {state} object
   *   States from store
   */

  [RESET_SEARCH_RETURN_TO_NULL]: (state) => {
    state.search_return_null = false
  },
  /* eslint-enable */
}

const actions = {
  getGifs: (context, options) => {
    return new Promise((resolve) => {
      axios
        .get(options.endpoint, {
          responseType: 'json',
          params: {
            ...options.params,
          },
        })
        .then((payload) => {
          if (payload.data.data.length <= 0) {
            context.commit('SEARCH_RETURN_NULL')
          } else {
            context.commit('GET_GIFS', payload)
          }
          resolve()
        })
        .catch(() => {
          context.commit('ERROR')
        })
    })
  },

  addGifs: (context, options) => {
    return new Promise((resolve) => {
      axios
        .get(options.endpoint, {
          responseType: 'json',
          params: {
            ...options.params,
          },
        })
        .then((payload) => {
          if (payload.data.data.length <= 0) {
            context.commit('SEARCH_RETURN_NULL')
          } else {
            context.commit('ADD_GIFS', payload)
          }
          resolve()
        })
        .catch(() => {
          context.commit('ERROR')
        })
    })
  },

  loading: (context) => {
    context.commit('LOADING')
  },

  loadingMore: (context) => {
    context.commit('LOADING_MORE')
  },

  loaded: (context) => {
    context.commit('LOADED')
  },

  setOffset: (context) => {
    context.commit('SET_OFFSET')
  },

  search: (context) => {
    context.commit('TOGGLE_SEARCH_STATE')
  },

  resetSearchState: (context) => {
    context.commit('RESET_SEARCH_STATE')
  },

  resetGifs: (context) => {
    context.commit('RESET')
  },

  resetOffset: (context) => {
    context.commit('RESET_OFFSET')
  },

  resetError: (context) => {
    context.commit('RESET_ERROR')
  },

  resetSearchReturnNullState: (context) => {
    context.commit('RESET_SEARCH_RETURN_TO_NULL')
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
