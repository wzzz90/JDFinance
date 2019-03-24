<template>
  <Panel title="理财精选" :class="$style.panel">
    <section :class="$style.content">
      <dl :class="$style.item" v-for="item in items" :key="item.title">
        <dt>{{item.title}}<span :class="$style.red">{{item.sub}}</span></dt>
        <dd>{{item.rate}}</dd>
        <dd>{{item.text}}</dd>
      </dl>
      
      <hr :class="$style.rowLine" />
    </section>
  </Panel>
</template>

<script>
import Panel from '../../components/core/panel';

export default {
  name: '',
  props: {
    moneyData:{
      type:Array,
      default: []
    }
  },
  data () {
    return {
      items: [{
        title: '定期理财',
        sub: '理财首选',
        rate: '5.60%',
        text: '历史年化回报率'
      },
      {
        title: '小白理财',
        sub: '理财首选',
        rate: '4.22%',
        text: '7日年化回报率'
      },
      {
        title: '月月盈',
        sub: '养老保障',
        rate: '5%',
        text: '七日年化回报率'
      },
      {
        title: '小白基金',
        sub: '天天赚钱',
        rate: '4.27%',
        text: '7日年化回报率'
      }]
    };
  },

  components: {
    Panel
  },
  watch: {
    moneyData(val, oldval) {
      this.items = val
    }
  }
}

</script>
<style lang='scss' module>
@import "../../css/element";
.panel {
  @include panel;
  .content {
    @include flex(row);
    justify-content: space-around;
    box-sizing: border-box;
    .item {
      position: relative;
      width: 50%;
      padding: 34px 16px;
      box-sizing: border-box;
      &:after {
        content: '';
        display: block;
        width: 1px;
        height: 204px;
        position: absolute;
        right: 0;
        top: 0;
        background: #eee;
      }
      &:nth-child(1) {
        &:after {
          top: 34px;
        }
      }
      &:nth-child(2n) {
        &:after {
          display: none;
        }
      }
      dt {
        font-size: 25.6px;
        line-height: 42px;
        color: #333;
        font-weight: 700;
        span {
          font-size: 22px;
          color: #ff5155;
          border: 1px solid #f15155;
          padding: 0 8px;
          vertical-align: 1px;
          margin-left: 2px;
          font-weight: 100;
        }
      }
      dd {
        &:nth-child(2) {
          font-weight: 700;
          font-size: 44px;
          height: 58px;
          line-height: 58px;
          color: #ff5155;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &:nth-child(3) {
          font-size: 24px;
          height: 34px;
          line-height: 34px;
          color: #999;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    hr {
      width: 100%;
      height: 1px;
      background: #eee;
      position: relative;
      top: -208px;
    }
  }
}
</style>