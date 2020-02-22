<template>
  <div id="app">
    <div class="nav">hello world!</div>
    <HelloWorld msg="HelloWorld component"></HelloWorld>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav {
  color: blue;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  },
};
</script>