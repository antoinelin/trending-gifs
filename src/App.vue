<template lang="pug">
  div#app
    <Header/>
    router-view
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style lang="scss">
@import './assets/styles/normalize.css';

body {
  margin: 0;
  padding: 0;

  @include flex(column, flex-start, center, nowrap);
}

#app {
  width: 100vw;
  max-width: 1200px;

  overflow-x: hidden;

  margin: 0;
  padding: 0;

  @include flex(column, flex-start, center, nowrap);

  font-family: 'Calibre', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1,
h2 {
  margin: 0;
  font-weight: normal;
}

a {
  text-decoration: none;
}

@font-face {
  font-family: 'Calibre';
  src: url('./assets/fonts/Calibre/Calibre-Regular.eot');
  src: url('./assets/fonts/Calibre/Calibre-Regular.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre/Calibre-Regular.woff2') format('woff2'),
    url('./assets/fonts/Calibre/Calibre-Regular.woff') format('woff'),
    url('./assets/fonts/Calibre/Calibre-Regular.ttf') format('truetype'),
    url('./assets/fonts/Calibre/Calibre-Regular.svg#Calibre-Regular') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Calibre';
  src: url('./assets/fonts/Calibre/Calibre-Black.eot');
  src: url('./assets/fonts/Calibre/Calibre-Black.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Calibre/Calibre-Black.woff2') format('woff2'),
    url('./assets/fonts/Calibre/Calibre-Black.woff') format('woff'),
    url('./assets/fonts/Calibre/Calibre-Black.ttf') format('truetype'),
    url('./assets/fonts/Calibre/Calibre-Black.svg#Calibre-Black') format('svg');
  font-weight: 900;
  font-style: normal;
}
</style>
