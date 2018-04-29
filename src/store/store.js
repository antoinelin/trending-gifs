import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

import {
  GET_GIFS,
  SET_LOADING_GIFS,
  SET_LOADED_GIFS,
  SET_LOADING_MORE_GIFS,
  SET_GIFS_OFFSET,
  ADD_GIFS,
  SET_ERROR_ON_LOAD,
  TOGGLE_SEARCH_STATE,
  SEARCH_STATE_TO_FALSE,
  EMPTY_GIFS_ARRAY,
  OFFSET_TO_ZERO,
  REMOVE_ERROR,
} from './Types'

Vue.use(Vuex, VueAxios, axios)

const state = {
  gifs: [],
  gifs_limit: 25,
  gifs_offset: 0,
  gifs_loading: false,
  gifs_loaded: false,
  gifs_loading_failed: false,
  search: false,
}

const getters = {}

const mutations = {
  /* eslint-disable */
  [GET_GIFS]: (state, payload) => {
    state.gifs = payload.data.data
  },

  [ADD_GIFS]: (state, payload) => {
    state.gifs = [...state.gifs, ...payload.data.data]
  },

  [SET_GIFS_OFFSET]: (state) => {
    state.gifs_offset += state.gifs_limit
  },

  [SET_LOADING_GIFS]: (state) => {
    state.gifs_loading = true
    state.gifs_loaded = false
  },

  [SET_LOADING_MORE_GIFS]: (state) => {
    state.gifs_loading = true
    state.gifs_loaded = true
  },

  [SET_LOADED_GIFS]: (state) => {
    state.gifs_loading = false
    state.gifs_loaded = true
  },

  [EMPTY_GIFS_ARRAY]: (state) => {
    state.gifs = []
  },

  [SET_ERROR_ON_LOAD]: (state) => {
    state.gifs_loading = false
    state.gifs_loaded = false
    state.gifs_loading_failed = true
  },

  [TOGGLE_SEARCH_STATE]: (state) => {
    state.search ? state.search = false : state.search = true
  },

  [SEARCH_STATE_TO_FALSE]: (state) => {
    state.search = false
  },

  [OFFSET_TO_ZERO]: (state) => {
    state.gifs_offset = 0
  },

  [REMOVE_ERROR]: (state) => {
    state.gifs_loading_failed = false
  }
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
          context.commit('GET_GIFS', payload)
          resolve()
        })
        .catch(() => {
          context.commit('SET_ERROR_ON_LOAD')
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
          context.commit('ADD_GIFS', payload)
          resolve()
        })
        .catch(() => {
          context.commit('SET_ERROR_ON_LOAD')
        })
    })
  },

  setGifsLoading: (context) => {
    context.commit('SET_LOADING_GIFS')
  },

  setLoadingMoreGifs: (context) => {
    context.commit('SET_LOADING_MORE_GIFS')
  },

  setGifsLoaded: (context) => {
    context.commit('SET_LOADED_GIFS')
  },

  setGifsOffset: (context) => {
    context.commit('SET_GIFS_OFFSET')
  },

  search: (context) => {
    context.commit('TOGGLE_SEARCH_STATE')
  },

  searchToFalse: (context) => {
    context.commit('SEARCH_STATE_TO_FALSE')
  },

  emptyGifsArray: (context) => {
    context.commit('EMPTY_GIFS_ARRAY')
  },

  setOffsetToZero: (context) => {
    context.commit('OFFSET_TO_ZERO')
  },

  removeError: (context) => {
    context.commit('REMOVE_ERROR')
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
