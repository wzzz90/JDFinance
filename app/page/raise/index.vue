<template>
    <div>
      <rSlider></rSlider>
      <rDaily></rDaily>
      <rIn></rIn>
      <rMore></rMore>
    </div>
</template>

<script>
import rSlider from "./rslider";
import rDaily from "./daily";
import rIn from './in';
import rMore from './more';
export default {
  components: {
    rSlider,
    rDaily,
    rIn,
    rMore,
  }
}
</script>

<style lang="scss">
  @import '../../css/reset.scss';

</style>
