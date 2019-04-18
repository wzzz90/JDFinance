<template>
  <section :class="cName">
    <swiper :options="swiperOptions" :not-next-tick="swiperOptions.notNextTick">
      <swiper-slide v-for="item in items" :key="item.src">
        <router-link :to="{name: item.href}" v-if="item.href.indexOf('http') == -1">
          <img :src="item.src" :alt="item.href">
        </router-link>
        <a :href="item.href" v-else>
          <img :src="item.src" :alt="item.href">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" v-if="swiperOptions.pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: '',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    cName: {
      type: String,
      default: ""
    },
    swiperOptions: {
      type: Object,
      default() {
        return {
          autoplay: true,
          loop:true,
          pagination: {
            el:".swiper-pagination"
          },
          notNextTick: true
        }
      }
    },
    items:{
      type:Array,
      default: []
    }

  },
  data () {
    return {
    };
  }
}

</script>
<style lang='scss'>
  @import '~swiper/dist/css/swiper.css'
</style>