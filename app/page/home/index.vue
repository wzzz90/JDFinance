<template lang="html">
    <div>
      <hSlider :sliderData="sliderData"></hSlider>
      <vNovice></vNovice>
      <vBorrow></vBorrow>
      <vMoney></vMoney>
      <vProduct :productData="productData"></vProduct>
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
  },
  data() {
    return {
      sliderData:[],
      productData: []
    }
  },
  async mounted() {
    try {
      const res = await this.$http.get('/api/home');

      this.sliderData = res.res.slice(0,3);
      this.productData = res.res.slice(-3);
      
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="scss" module>
</style>
