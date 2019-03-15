<template>
    <div>
      <mSlider></mSlider>
      <mAda></mAda>
      <mMoney></mMoney>
      <mAdb></mAdb>
      <mFinance></mFinance>
      <mAdc></mAdc>
    </div>
</template>

<script>
import mSlider from "./mslider";
import mAda from './ada';
import mMoney from "./money";
import mAdb from './adb';
import mAdc from './adc';
import mFinance from './finance';
export default {
  components: {
    mSlider,
    mMoney,
    mAda,
    mAdb,
    mFinance,
    mAdc
  }
}
</script>

<style lang="scss">
  @import '../../css/reset.scss';
  
  .hideAd {
    margin-top: 0 !important;
    >ul {
      >li:nth-child(1) {
        display: none;
      }
    }
  }
</style>
