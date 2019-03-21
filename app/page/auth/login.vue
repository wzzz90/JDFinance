<template>
  <Panel :class="$style.panel" title="登录">
    <Header></Header>
    <section :class="$style.login">
      <!-- <h4>登录</h4> -->
      <article :class="$style.loginWrapper">
        <form :class="$style.userLogin" data-attrName="form">
          <div :class="$style.inputContainer">
            <input v-model="userInfo.username" :required="true" :class="$style.username" type="tel" name="" placeholder="已验证手机" autocomplete="off">
          </div>
          <div :class="$style.inputContainer">
            <input v-model="userInfo.password" :class="$style.password" :type="!showEye?'password':'text'" name="" placeholder="请输入密码" autocomplete="off">
            <label :class="{'eye': showEye}" @click="showEye=!showEye"></label>
            <button>忘记密码</button>
          </div>
        </form>
        <a href="" id="loginBtn" :class="$style.btn" @click.prevent="login">登录</a>
        <div :class="$style.quickNav">
          <span>短信验证码登录</span>
          <span @click="$router.push('/register')">注册</span>
        </div>
        <div :class="$style.loginType"></div>
      </article>
    </section>
  </Panel>
</template>

<script>
import { Toast } from 'mint-ui';
import Panel from '../../components/core/panel';
import Header from '../../components/public/header';

export default {
  data () {
    return {
      showEye: false,
      userInfo: {
        username: '11111',
        password: ''
      },
      accRule: [
        {required: true, message: '您的手机号码未输入'},
        {pattern: /^1[34578]\d{9}$/, message: '您的手机号码输入错误'}
      ]
    };
  },

  components: {
    Panel,
    Header
  },

  computed: {},

  mounted() {
      this.title = '注册'
  },

  methods: {
    async login() {
      try {
        const data = await this.$http.post('/api/login', this.userInfo);

        localStorage.setItem('token', data.token)
        this.$store.dispatch('changeLoginAction', true)
        
        Toast({
          message: data.msg,
          iconClass: 'icon icon-success'
        });
        setTimeout(() => {
          this.$router.push('/')
        }, 2000);
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>
<style lang="scss">
.eye {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB5UlEQVR4Ae1YJXQsQRD8zOYzmTD52Hgdjg2zDvp3571J3HkXZloKg40KM1NXOPMyO8fY9V4f7HZX1zC8YDAYDAaDEQ2YmJj4q+t6iaZp7WS9ZItku7Db3714Bx/4hoXopaWl9ySmikwjXND3pTt266shFhxBFz4zM/OOarKOhCxDkC8GDnCBMyjiKWE6mYnk/jRwgjvQ4iso2YFExCn6OX03Uo1m0e8kqtUvMPzGM7y79TmVcBwgR6DEN0tqbpfMOTU19dtdLvgiBrESzmZ/zzCtkkRtVMPfvOVFLDgkrdHqF/HU9DnPkG/T80K891OOInCKeZDbJ2LTNP8T0bpQ65uGYWTKYi4vL1+STxn5jtytA7e/y/BOFgdOcAuFWIcGX7qOSyA8RCK7xYxEdNrMNJ3wsSsEcghxLq/EW5YVTwnPBbJqu5qXihcKYdcSyCH4n0OLN7OOUyAaV/iXeTDnlym4xgV/pzfdp18gyVf4j7hbAPgqCpAv+Pd7U4DVxySqeV42p8vWDtU6IcSsRlIBsD78EQsQBV0oCgZxFEyjEbCQkc+RuJBF/lYiAjZzhbLNHG+nFQca2A69c3hxoHGoDjR8pJT014xAHerBHcz7oHp/XauAC9cq0X+xxVeLDAaDwWAw/IsraH8effh8nP4AAAAASUVORK5CYII=) !important;
}
</style>

<style lang='scss' module>
@import '../../css/element.scss';
.panel {
  @include panel;
  height: 100%;
  margin: 0 !important;
  >h4 {
    //display: none;
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
      .quickNav {
        margin-top: 40px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        >span {
          color: #999;
          font-size: 28px;
          text-align: center;
        }
      }
      .loginType {
        margin-top: 176px;
      }
    }
  }
}
</style>