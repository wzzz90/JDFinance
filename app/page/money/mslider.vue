<template>
  <article>
    <Slider :items="items" :cName="$style.slider"></Slider>
  </article>
</template>

<script>
import Slider from '../../components/core/slider';
export default {
  name: '',
  data () {
    return {
      items: [{
        href: 'home',
        src: '//img12.360buyimg.com/jrpmobile/jfs/t9994/205/2575467053/189117/125e7b05/59f97c36N7599be57.png?width=750&height=400'
      },
      {
        href: 'home',
        src: '//img12.360buyimg.com/jrpmobile/jfs/t11149/181/856008463/68797/dc303e9/59f97baeN3cdae084.jpg?width=750&height=400'
      }]
    };
  },

  components: {
    Slider
  },
}

</script>
<style lang='scss' module>
@import "../../css/element.scss";
  .slider {
    margin-top: 120px;
    img {
      width: 100%;
    }
  }
</style>