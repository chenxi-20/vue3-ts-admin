<template>
  <div class="container" v-loading>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
   margin: 0;
  padding: 0;
}
html, body, #app, .container {
  width: 100%;
  height: 100%;
}
</style>
