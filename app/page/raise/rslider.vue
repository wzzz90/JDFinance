<template>
  <Panel :class="$style.panel" title="金融头条">
    <section :class="$style.content">
      <swiper :options="options">
        <swiper-slide v-for="item in items" :key="item">
          {{item}}
          <em>></em>
          </swiper-slide>
      </swiper> 
    </section>
  </Panel>
</template>

<script>
import Panel from '../../components/core/panel';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  data () {
    return {
      items:[
        '百万白条券免费送，速来领取！！',
        '签到领流量，1元500M！'
      ],
      options: {
        autoplay: true,
        loop: true,
        direction: 'vertical'
      }
    };
  },

  components: {
    Panel,
    swiper,
    swiperSlide
  }
}

</script>

<style lang="scss" scoped>
.swiper-container-vertical {
  height: 72px;
  .swiper-slide {
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #333;
    em {
      color: #ddd;
      float: right;
      margin-right: 20px;
    }
  }
}
</style>

<style lang='scss' module>
@import "../../css/element.scss";
.panel {
  @include panel;
  margin-top: 120px !important;
  >h4 {
    display: none;
  }
  .content {
    height: 72px;
    line-height: 72px;
    overflow: hidden;
    padding-left: 178px;
    background: url(//m.jr.jd.com/spe/qyy/main/images/scroll_title_img.png) left top no-repeat;
  }
}
</style>