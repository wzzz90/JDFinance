<template>
  <Panel :class="$style.panel" title="登录">
    <section :class="$style.login">
      <h4>登录</h4>
      <article :class="$style.loginWrapper">
        <div :class="$style.userLogin">
          <div :class="$style.inputContainer">
            <input v-validate value="ddd" :require="true" @focus="focusAcc" @blur="blurAcc" :class="$style.username" type="text" name="" id="" placeholder="用户名/邮箱/已验证手机" autocomplete="off">
            <i :class="$style.iconClear" v-show="showAccClear"></i>
          </div>
          <div :class="$style.inputContainer">
            <input @focus="focusPsw" @blur="blurPsw" :class="$style.password" type="text" name="" id="" placeholder="请输入密码" autocomplete="off">
            <i :class="[$style.iconClear, $style.iconPassword]" v-show="showPswClear"></i>
            <label></label>
            <button>忘记密码</button>
          </div>
        </div>
        <a href="" id="loginBtn" :class="$style.btn">登录</a>
        <a href="" id="loginOneStep" :class="$style.btnOnestep">一键登录</a>
      </article>
    </section>
  </Panel>
</template>

<script>
import Panel from '../../components/core/panel';
export default {
  data () {
    return {
      showAccClear: false,
      showPswClear: false
    };
  },

  components: {
    Panel
  },

  computed: {},

  // mounted: {},

  methods: {
    focusAcc() {
      this.showAccClear = true;
    },
    blurAcc() {
      this.showAccClear = false;
    },
    focusPsw() {
      this.showPswClear = true;
    },
    blurPsw() {
      this.showPswClear = false;
    }
  }
}

</script>
<style lang='scss' module>
@import '../../css/element.scss';
.panel {
  @include panel;
  margin: 0 !important;
  >h4 {
    display: none;
  }
  .login {
    padding: 0 50px;
    h4 {
      width: 100%;
      height: 100px0;
      text-align: center;
      line-height: 100px;
    }
    .loginWrapper {
      >a {
        width: 100%;
        height: 100px;
        line-height: 100px;
        display: block;
        background-color: #efefef;
        border-radius: 50px;
        font-size: 32px;
        color: #fff;
        background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
        box-shadow: 0 20px 40px 0 rgba(255,62,62,.2);
        text-align: center;
        font-family: PingFangSC-Semibold;
      } 
      .btn {
        margin-top: 60px;
      }
      .btn-onestep {
        box-sizing: border-box;
        border: 1px solid #ff2000;
        color: #f10000;
        background: #fff;
        margin-top: 20px;
      }
      .input-container {
        height: 100px;
        padding-top: 20px;
        padding-bottom: 20px;
        position: relative;
        overflow: hidden;
        margin-top: 40px;
        background: #fff;
        border-bottom: 2px solid #efefef;
        box-sizing: border-box;
        &>input {
          width: 100%;
          height: 100%;
          color: #222;
          box-sizing: border-box;
          font-family: PingFangSC-Semibold;
          border: none;
          font-size: 32px;
          &::placeholder {
            // color: #d6d6d6;
          }
        }
        .username {
          width: 100%;
          padding: 0 60px 0 0;
        }
        .password {
          padding: 0 300px 0 0;
        }
        .iconClear {
          width: 48px;
          height: 48px;
          overflow: hidden;
          position: absolute;
          background-repeat: no-repeat;
          background-size: 100% auto;
          top: 26px;
          right: 0;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAjBJREFUaAXtVztSwzAQjUl6zkFHPj09FFAARbgAcAVoc4acABigCQX0UOcDDfdIH8e8BWtmk2gTaa1UrGY0ku3V03vPK1mu1ayYA+aAOWAOmAPmgDnwfx3IYqWPRqM9jOkXRbGL9rbT6bzGYvD4yWRymOd5L8uyKep1q9X65s839Xc2BXieE/kD3N9HHUDQuScm6NZwODwD+RfCIkzUftBAFhQtAJOQ8640cH2nETEej08Bco/acGBoOTa7LXejBdTr9RvAzRhktAhyfj6fPwCDk89hBmFHlWgBzWbzDTN0UVUiBOdz5P+FZj1FL2JnD7mI/nIKzIhIu91+cnG8Fcb8kseYRx4b2lcLoAkEQl4RQmwl8sShkoBQEdsin0TAJhFYmAVillOtsvM0L5XKb+APRk6n8vnCblOuE1XOu/lcm0wAAQqp4uaiNpnzDjSpAAJdIyI5eZov+jtAg5SF1gLVpCXpG1jjviPt3WLdQ02b7A0I5HOQUn2xQ8UkESCRx25DRw71sSNERGUBAnlKlS4dKXC+ed6miEoCymP08kdqJc+3KUK9iIk8/QvAXf6RWiHP02DN2xIPgHy8r68SoCHvJk8tIloACByBzAB1wXlcd8tUcVzFVhKBASex/wTRawCLs4eJ1ORJlbQmSmwKCS7RAoA8Zei0xwc7z8ZJIjg2Dxf7GgGXcOodiJ/4Pz4OTRsfAxpLGMD7Qv1AvfLF2T1zwBwwB8wBc8AcMAfMAb8DP94/FJqk3I9tAAAAAElFTkSuQmCC);
        }
        .iconPassword {
          right: 250px;
        }
        label {
          position: absolute;
          right: 180px;
          top: 26px;
          width: 48px;
          height: 48px;
          overflow: hidden;
          z-index: 99;
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAAl5JREFUaAXtlE1rE2EQx/PSQIkphQihHhcUklNIcilUihYEDx76FXwBBSt4LkIpiF/ACAq+XPwAPXhoEdoiBHrIC7mYgIUclYIBMYbSuIm/wa5s1s2TtY2IMA/MzjPPzPxn5r/PbiikSxlQBpQBZUAZUAaUAWVAGVAGlAFlQBlQBpSBf8FAeFzRSqUyT8zVSCTyNpfLlcbFT8Jfq9UW+v3+FbA2C4XCngnTOADNFwaDgQBMIXY4HF4G8I0J8LQ+al6j5gY4UeQ7NeepWRmFGxnlOD5fREvzsqIAv4adCz/NyT8FW2pIrWN0qS09jFzGAZh+CzlyZc/atr31N4YQTMGm1qxTT2pLD47tp40D5PP59zBy35NocT9L5XL5ouf8xKZgCSYAlhtEaksP7jPv3vgNOMHcyxeA3XBs0TDT56wYi8VWs9nsN7cv6L5er5/p9XqPwFoBa4hMzl5y92+Owwo0AODRarX6BH3bB/ATxYrxePxpJpP57OP/7ajRaJztdrt3wFvBOecNAO8ZzN9F216f1w40gJPEm1hjv0Zhv7xDCu7i3+aXW0I+sj9AZKW4IueQBfZL5F9CTyNDi/wBB+swvz7kMBh+jRjCQyHexCINPEcm+jei+Q/ILZh/Z2zA4/zjASS/1WpNt9vtBwwhV+DXX8ODHdT8QuPFZDL50LKsw6BJTtyJBnCSm83mTKfTuU4D9xjmvHMeRJOzT87jRCLxKp1Ofw2S4xdzqgHcgHwfMsAScpnGLHSKJlMSgy3fwgF2C72DbHPP99G6lAFlQBlQBpQBZUAZUAaUgf+YgR8RmtPGSJ6MGgAAAABJRU5ErkJggg==);
          background-repeat: no-repeat;
          background-size: 100% auto;
        }
        button {
          position: absolute;
          height: 46px;
          line-height: 46px;
          right: 0;
          top: 25px;
          background-color: #fff;
          color: #222;
          font-size: 28px;
          border: 0;
          outline: 0;
          border-radius: 2px;
          text-align: center;
          padding-left: 32px;
          border-left: 2px solid #ccc;
          box-shadow: none;
        }
      }
    }
  }
}
</style>