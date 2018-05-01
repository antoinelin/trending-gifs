<template lang="pug">
  div.c-search
    input.c-search__input(placeholder="Search" v-model="search_text" @keyup.enter="submit")
</template>

<script>
export default {
  name: 'Search',

  data() {
    return {
      search_text: '',
    }
  },

  beforeDestroy: function() {
    this.$store.dispatch('resetSearchState')
  },

  methods: {
    /**
     * Submit
     *
     * Submit form on enter
     *
     * @function
     *
     */
    submit: function() {
      if (this.search_text && this.search_text.length > 0) {
        this.$router.push({ path: `/search/${this.search_text.replace(' ', '-')}` })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.c-search {
  width: 100%;
  padding: 0 50px;

  input {
    width: 100%;
    border: none;
    @include font-size(60px);
    color: $grey;
  }

  input::placeholder {
    color: $grey;
  }

  input:focus {
    outline: none;
  }
}
</style>
