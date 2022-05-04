<template>
  <div class="login_Container">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName" type="text"  autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
            <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="loginFn()">登录</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive,ref,toRefs } from 'vue';
import type { FormInstance } from 'element-plus'
import {UserService} from '../../api/api'

const ruleFormRef = ref<FormInstance>()
const validateUser = (rule: unknown, value: string | undefined, callback: (msg?:Error)=>void) => {
  if (!value) {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePwd = (rule: unknown, value: string | undefined, callback: (msg?:Error)=>void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  }else {
    callback()
  }
}
const state = reactive({
    ruleForm:{
        userName: '',
        pwd: '',
    }
})
const {ruleForm} = toRefs(state);


const rules = reactive({
  userName: [{ validator: validateUser, trigger: 'blur' }],
  pwd: [{ validator: validatePwd, trigger: 'blur' }],
})

const loginFn = () => {
  ruleFormRef.value?.validate().then(()=>{
    console.log("验证成功");
    UserService.adminLoginApi({
      username:ruleForm.value.userName,
      password:ruleForm.value.pwd
    }).then(res=>{
      console.log(res)
    })
  }).catch(()=>{
    console.log("验证失败");
    
  })
}

const resetForm = () => {
  if(!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
}
</script>

<style lang="less" scoped>
</style>
