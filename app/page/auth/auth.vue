<template>
 <v-form :model="formData" :rules="rules" ref="form">
   
  <form-item label="姓名" prop="name">
   <input type="text" maxlength="20" v-model.trim="formData.name"/>
  </form-item>
  <form-item label="手机号" prop="tel">
   <input type="tel" maxlength="11" v-model.trim="formData.tel"/>
  </form-item>
  <button @click="handleSubmit">保存</button>
 </v-form>
</template>
<script>
 import { VForm, FormItem } from '../../components/public/form/index'
 export default {
  data () {
   return {
    formData: {
     tel: '',
     name: ''
    },
    rules: {
     name: [
       {required: true, message: '请输入您的姓名'}
     ],
     tel: [
      {required: true, message: '您的手机号码未输入'},
      {pattern: /^1[34578]\d{9}$/, message: '您的手机号码输入错误'}
     ],
    }
   }
  },
  
  components: {
   VForm,
   FormItem
  },
  methods: {
   handleSubmit () {
    this.$refs.form.validate(errs => {
     console.log(errs)
    })
   }
  }
 }
</script>