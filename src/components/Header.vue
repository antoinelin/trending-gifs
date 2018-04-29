<template lang="pug">
  nav.c-header
    <router-link :to="{ name: 'home' }">
      h1.c-header__siteTitle(@click="removeSearchState") TrendingGIFs
    </router-link>
    svg.c-header__searchIcon(width="20px" height="21px" viewBox="0 0 20 21" @click="toggleSearchState")
      defs
      g(stroke="none" stroke-width="1" fill="none" fill-rule="evenodd")
        g(transform="translate(-1300.000000, -72.000000)" fill="#4C4C4C" fill-rule="nonzero")
          g(transform="translate(120.000000, 72.000000)")
            path(d="M1192.96641,14.8977824 C1191.62423,15.854165 1189.98198,16.4166974 1188.20835,16.4166974 C1183.675,16.4166974 1180,12.7416947 1180,8.20834869 C1180,3.67500266 1183.675,0 1188.20835,0 C1192.74169,0 1196.4167,3.67500266 1196.4167,8.20834869 C1196.4167,10.4750217 1195.49795,12.5271089 1194.01253,14.0125278 L1199.80411,19.8041125 C1200.06973,20.0697293 1200.06327,20.4956263 1199.79661,20.7622937 C1199.52808,21.0308203 1199.10095,21.032322 1198.83842,20.7698006 L1192.96641,14.8977824 Z M1188.20835,15.4510093 C1192.20836,15.4510093 1195.45101,12.2083599 1195.45101,8.20834869 C1195.45101,4.20833749 1192.20836,0.965688081 1188.20835,0.965688081 C1184.20834,0.965688081 1180.96569,4.20833749 1180.96569,8.20834869 C1180.96569,12.2083599 1184.20834,15.4510093 1188.20835,15.4510093 Z")
</template>

<script>
export default {
  name: 'Header',
  methods: {
    toggleSearchState: function() {
      this.$store.dispatch('search')
    },

    removeSearchState: function() {
      this.$store.dispatch('searchToFalse')
    },
  },
}
</script>

<style lang="scss" scoped>
.c-header {
  width: 80vw;

  margin-top: 80px;
  margin-bottom: 45px;
  padding-bottom: 30px;

  @include flex(row, space-between, center, nowrap);

  border-bottom: 1px solid $grey;
}

.c-header__siteTitle {
  font-family: 'Calibre';
  font-size: 25px;
  color: rgba(0, 0, 0, 0.7);
  letter-spacing: 0;
  font-weight: 900;
}

.c-header__searchIcon {
  cursor: pointer;
  transition: 200ms ease-out;
}

.c-header__searchIcon:hover {
  opacity: 0.5;
}
</style>
