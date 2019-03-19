<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
#app {
  height: 100%;
}
.mint-indicator-wrapper {
  padding: 30px !important;
  .mint-spinner-snake {
    width: 64px !important;
    height: 64px !important;
  }
}
.mint-toast {
  padding: 20px !important;
  .mint-toast-text {
    font-size: 39px !important;
  }
}
</style>

