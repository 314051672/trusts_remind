<template>
  <div class="login_container">
    <canvas id="canvas">canvas not support</canvas>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            @keypress.native.enter="login"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary"  @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="success" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 背景特效
import { login } from '@/api/app.js'
// window.onload = function () {
//   const canvas = document.querySelector('canvas')
//   if (typeof canvas.getContext === 'undefined') {
//     return
//   }
//   const ctx = canvas.getContext('2d')

//   function fitCanvasSize () {
//     canvas.width = document.documentElement.clientWidth
//     canvas.height = document.documentElement.clientHeight
//   }
//   fitCanvasSize()
//   window.onresize = fitCanvasSize

//   var balls = []

//   function rand (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min
//   }

//   var Ball = function () {
//     this.r = rand(10, 18)
//     this.x = rand(0 + this.r, canvas.width - this.r)
//     this.y = rand(0 + this.r, canvas.height - this.r)
//     this.vx = rand(-3, 3)
//     this.vy = rand(-3, 3)
//     this.opacity = Math.random()
//     this.draw = function () {
//       ctx.beginPath()
//       ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
//       var color = ctx.createRadialGradient(this.x, this.y, this.r * 0.7, this.x, this.y, this.r)
//       color.addColorStop(0.6, '#fffbff')
//       color.addColorStop(1, '#2e9dff')
//       ctx.shadowColor = '#2e9dff'
//       ctx.shadowBlur = this.r * 1.3
//       ctx.fillStyle = color
//       ctx.globalAlpha = this.opacity
//       ctx.closePath()
//       ctx.fill()
//     }
//     this.move = function () {
//       if (this.x + this.r > canvas.width || this.x - this.r < 0) {
//         this.vx *= -1
//       }
//       if (this.y + this.r > canvas.height || this.y - this.r < 0) {
//         this.vy *= -1
//       }
//       this.x += this.vx
//       this.y += this.vy
//     }
//   }

//   function density () {
//     var i
//     for (i = 0; i < 20; i++) {
//       balls.push(new Ball())
//     }
//   }
//   density()

//   function update () {
//     var i
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     for (i = 0; i < 20; i++) {
//       balls[i].draw()
//       balls[i].move()
//     }
//     setTimeout(function () {
//       update()
//     }, 10)
//   }
//   update()
// }
export default {
  data () {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[34578][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        const reg1 = /[0-9]+/
        const reg2 = /[a-z]+/
        const reg3 = /[A-Z]+/
        // console.log(reg.test(value))
        if (reg1.test(value) && reg2.test(value) && reg3.test(value)) {
          callback()
        } else {
          return callback(new Error('密码需含有大小写字母和数字'))
        }
      }
    }
    return {
      dialogVisible: false,
      // 这是登录表单的数据绑定对象
      loginForm: {
        account: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        account: [
          { required: true, message: '请输入登录名称', trigger: 'blur' }
          // { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          // { validator: checkPhone, trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          // { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        login(this.loginForm).then(({ data }) => {
          if (data.error) return this.$message.error('登录失败！')
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', data.uid)
          // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
          //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
          //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中

          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
          this.$router.push('/trusts')
        })
      })
    },
    register () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less">

</style>
<style lang="less" scoped>
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
