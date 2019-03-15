<template>
    <div>
      <iSlider></iSlider>
      <iWelfare></iWelfare>
      <iService></iService>
    </div>
</template>

<script>
import iSlider from "./islider";
import iWelfare from "./welfare";
import iService from "./service";
export default {
  components: {
    iSlider,
    iWelfare,
    iService
  }
}
</script>

<style lang="scss">
  @import '../../css/reset.scss';
</style>
