<template lang="html">
    <div>
      <hSlider :sliderData="sliderData"></hSlider>
      <vNovice></vNovice>
      <vBorrow></vBorrow>
      <vMoney :moneyData="moneyData"></vMoney>
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
      productData: [],
      moneyData: []
    }
  },
  async mounted() {
    try {
      const res = await this.$http.get('/api/home');

      this.sliderData = res.res.slideData.slice(0,3);
      this.productData = res.res.slideData.slice(-3);
      this.moneyData = res.res.moneyList
      
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style lang="scss" module>
</style>
