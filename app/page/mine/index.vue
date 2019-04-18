<template>
  <Panel :class="$style.panel" title="我的">
    <section :class="$style.content">
      <div :class="$style.userinfo">
        <img :class="$style.avator" src="https://img12.360buyimg.com/jrpmobile/jfs/t2644/238/1420176553/1442/96e2885/573d96deN06201af5.png" alt="">
        <div :class="$style.info">
          <div :class="$style.name">{{userInfo.username}}</div>
          <span :class="$style.userPin">{{userInfo.id}}</span>
        </div>
        <div :class="$style.right">
          <span>会员福利 > </span>
        </div>
      </div>

      <div :class="$style.item" v-for="item in items" :key="item.title">
        <img :src="item.src" :alt="item.title" :class="$style.icon">
        <div :class="[$style.info, $style.common]">{{item.title}}</div>
        <div :class="[$style.benifite, $style.common]">{{!!item.action ? item.action : ''}}</div>
      </div>
      <div :class="[$style.item, $style.exit]" @click="exit">退出登录</div>
    </section>
  </Panel>
</template>

<script>
import Panel from '../../components/core/panel';

export default {
  data () {
    return {
      userInfo: {},
      items: [{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t8971/199/1863233880/2035/56d04776/59cb5fbdNa7c682c3.png?width=70&height=70',
        title: '我的资产',
        action: '查看全部资产'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t8836/18/2342020923/2120/a9b7a8ff/59cb6124N31cb2889.png?width=70&height=70',
        title: '我的优惠券',
        action: '查看全部'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t10264/48/2521964269/2177/cb479501/59f945edNc1197b64.png?width=90&height=90',
        title: '我的金币',
        action: '赚金币兑好物'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t12115/250/469950434/3906/ad97c994/5a0bdf3aN22efb724.png?width=90&height=90',
        title: '我的金条',
        action: '查看额度'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t9244/132/2364556535/1134/334cd5d9/59cb612dN5b974dc5.png?width=70&height=70',
        title: '我的借钱',
        action: '查看全部产品'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t9121/110/2300703915/1348/91af205c/59cb613bN1e749e58.png?width=70&height=70',
        title: '我的白条',
        action: '去提额'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t9649/171/293125950/1453/4cf0cc2/59cb6162N9c71da0f.png?width=70&height=70',
        title: '我的众筹',
        action: '查订单/物流'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t8014/149/2344686222/2102/341ff316/59cb616bN3e1bd87d.png?width=70&height=70',
        title: '我的保障',
        action: '全方位保障'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t1/3907/34/11652/2582/5bd04759Ea9acb837/f893bf98fd67c192.png?width=54&height=54',
        title: '我的爱车',
        action: '绑车享专属福利'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t10423/230/287832134/1427/af7e4c86/59cb61b2N53280a30.png?width=70&height=70',
        title: '实名认证'
      },{
        src: '//img12.360buyimg.com/jrpmobile/jfs/t9832/294/292213011/2420/30888b3d/59cb61c9Nc2bbc057.png?width=70&height=70',
        title: '帮助中心'
      }]
    };
  },

  components: {
    Panel
  },
  mounted() {
    document.querySelector('#footer').style.cssText="display:none";
    this.getUserInfo();
  },
  destroyed() {
    document.querySelector('#footer').style.cssText="display:block"
  },
  methods: {
    async getUserInfo() {
      try {
        const data = await this.$http.get('/api/userInfo');
        this.userInfo = data.res;
      } catch (error) {
        console.log(error);
      }
    },
    exit() {
      localStorage.removeItem('token');
      this.$router.push('/login')
      this.$store.dispatch('changeLoginAction', true);
    }
  }
}

</script>
<style lang='scss' module>
@import '../../css/element.scss';
.panel {
  @include panel;
  margin-top: 120px !important;
  background: #f5f5f5 !important;
  >h4 {
    display: none;
  }
  .content {
    @include flex;
    .userinfo {
        height: 140px;
        color: #fff;
        background-color: #fff;
        overflow: hidden;
        position: relative;
        margin-bottom: 20px;
        .avator {
          width: 100px;
          border-radius: 50%;
          margin: 20px 32px 0;
          float: left;
        }
        .info {
          width: 47%;
          float: left;
          .name {
            font-size: 34px;
            color: #333;
            width: 100%;
            height: 46px;
            line-height: 46px;
            margin-top: 28px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .userPin {
            display: inline-block;
            font-size: 26px;
            height: 40px;
            line-height: 40px;
            color: #999;
            margin-top: 8px;
            overflow: hidden;
          }
        }
        .right {
          height: 60px;
          line-height: 60px;
          margin-top: -30px;
          color: #999;
          overflow: hidden;
          position: absolute;
          right: 32px;
          top: 50%;
          span {
            font-size: 28px;
          }
        }       
    }
    .exit {
      line-height: 112px;
      text-align: center;
      font-size: 32px;
      color: #f04752;
    }
    .item {
      background-color: #fff;
      height: 112px;
      position: relative;
      overflow: hidden;
      &:before {
        content: '';
        position: absolute;
        left: 110px;
        width: 100%;
        height: 1px;
        display: block;
        background: #eee;
        transform: scaleY(.5);
        transform-origin: left bottom;
        bottom: 1px;
      }
      &:nth-last-child(3) {
        &>.benifite {
          color: #FF801A;
        }
      }
      &:nth-last-child(2) {
        margin-top: 20px;
      }&:nth-last-child(1) {
        margin-top: 20px;
        margin-bottom: 100px;
      }
      >img {
        display: block;
        width: 48px;
        height: auto;
        text-align: center;
        margin: 12px 32px 0;
        margin-top: 32px;
        float: left;
      }
      .info {
        max-width: 35%;
        text-align: left;
        float: left;
        font-size: 32px;
        color: #333;
        display: block;
      }
      .benifite {
        font-size: 28px;
        max-width: 39%;
        padding: 0 36px 0 20px;
        margin-right: 32px;
        background: url(//m.jr.jd.com/spe/qyy/main/images/icon_arrow1.png) center right no-repeat;
        background-size: 18px 30px;
        text-align: left;
        float: right;
        color: #999999;

      }
      .common {
        margin-top: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 88px;
        line-height: 88px;
        box-sizing: border-box;
        position: relative;
      }
    }
  }
}
</style>