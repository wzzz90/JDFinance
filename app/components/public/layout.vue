<template>
  <div>
    <vHeader></vHeader>
    <router-view/>
    <vFooter></vFooter>
    <vNavbar></vNavbar>
  </div>
</template>

<script>
import vHeader from "./header";
import vFooter from "./footer";
import vNavbar from "./navbar";
export default {
  name: 'app',
  components: {
    vHeader,
    vFooter,
    vNavbar
  }
}
</script>
<style lang="scss" scoped>
  
  .hideAd {
    margin-top: 0 !important;
    >ul {
      >li:nth-child(1) {
        display: none;
      }
    }
  }
</style>

