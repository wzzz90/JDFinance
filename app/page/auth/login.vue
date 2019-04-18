<template>
 <Panel :class="$style.panel" title="登录">
    <Header></Header>
    <div :class="$style.formContainer">
      <v-form :model="userInfo" :rules="rules" ref="form">
        <div :class="$style.formItemCon">
          <form-item prop="username">
            <input  v-model="userInfo.username" @focus="userInfo.password=''" :class="$style.username" type="tel" name="" placeholder="已验证手机" autocomplete="off"/>
          </form-item>
        </div>
        <div :class="$style.formItemCon">
          <form-item prop="password">
            <input v-model="userInfo.password" :class="$style.password" :type="!showEye?'password':'text'" name="" placeholder="请输入密码" autocomplete="off"/>
          </form-item>
          <label :class="{'eye': showEye}" @click="showEye=!showEye"></label>
          <button>忘记密码</button>
        </div>
      </v-form>
      <a href="" id="loginBtn" :class="$style.btn" @click.prevent="login">登录</a>
      <div :class="$style.quickNav">
        <span>短信验证码登录</span>
        <span @click="$router.push('/register')">前往注册</span>
      </div>
      <div :class="$style.loginType"></div>
    </div>
 </Panel>
</template>
<script>
import { Toast } from 'mint-ui';
import Panel from '../../components/core/panel';
import Header from '../../components/public/header';
 import { VForm, FormItem } from '../../components/public/form/index';

 export default {
  data () {
   return {
    showEye: false,
    userInfo: {
      username: '',
      password: ''
    },
    rules: {
     password: [
       {required: true, message: '请输入您的密码' },
       { pattern: /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,16}$/ , message: '密码必须为字母加数字的6-16位' }
     ],
     username: [
      {required: true, message: '请输入您的手机号码'},
      {pattern: /^1[34578]\d{9}$/, message: '您的手机号码输入错误'}
     ],
    }
   }
  },
  
  components: {
   VForm,
   FormItem,
   Panel,
   Header
  },
  methods: {
   login () {
     this.$refs.form.validate(async (err) => {
      if (err.length) {
        console.log('error submit!!');
        return false;
      } else {
        try {
          const data = await this.$http.post('/api/login', this.userInfo);

          localStorage.setItem('token', data.token);
          this.$store.dispatch('changeLoginAction', true);
          
          Toast({
            message: data.msg,
            iconClass: 'icon icon-success'
          });
          if(data.status) {

            setTimeout(() => {
              this.$router.push('/')
            }, 2000);
          }
        } catch (error) {
          console.log(error)
        }
      }
    });
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
  .formContainer {
    padding: 0 50px;
    a {
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
        margin-top:60px;
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
  .formItemCon {
    position: relative;
    input{
      width: 100%;
      height: 100%;
      color: #222;
      box-sizing: border-box;
      font-family: PingFangSC-Semibold;
      border: none;
      font-size: 32px;
    } 
    .username {
      width: 100%;
    }
    .password {
      padding: 0 250px 0 0;
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
</style>