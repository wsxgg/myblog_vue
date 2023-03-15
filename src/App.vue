<template>
  <div>
    <router-view />

    <footer class='footer'> footer </footer>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* background-color: grey; */
  height: 100%;
  font-size: 14px;
  width: 1920px;
}
* {
  margin: 0;
}
a {
  outline: none;
  color: #2d2e2f;
  text-decoration: none;
}

.footer {
  height: 40px;
  line-height: 40px;
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  text-align: center;
  background-color: whitesmoke;
}
</style>

