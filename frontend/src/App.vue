<template>
  <div id="app">
    <LoaderPages />
    <NavBar />
    <router-view/>
  </div>
</template>


<script>
// import bar de navigation
import NavBar from "./components/NavBar.vue"
import LoaderPages from "./components/LoaderPages.vue"

export default {
  components: {
    NavBar,
    LoaderPages
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
