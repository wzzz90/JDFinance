<template lang="html">
    <div>
      <hSlider></hSlider>
      <vNovice></vNovice>
      <vBorrow></vBorrow>
      <vMoney></vMoney>
      <vProduct></vProduct>
      <vLife></vLife>
    </div>
</template>

<script>
import hSlider from "./hslider";
import vNovice from "./novice";
import vBorrow from "./borrow";
import vMoney from "./money";
import vProduct from "./product";
import vLife from "./life";
export default {
  components: {
    hSlider,
    vNovice,
    vBorrow,
    vMoney,
    vProduct,
    vLife
  }
}
</script>

<style lang="scss" module>
</style>
