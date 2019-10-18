<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div class="page-login--content"  flex="dir:top main:justify cross:center box:justify">
        <div class="page-login--content-header">
        </div>
        <div   class="page-login--content-main"  flex="dir:top main:center cross:center">
          <!-- logo
          <img class="page-login--logo" src="./image/logo@2x.png"> -->
          <!-- 表单 -->
          <!-- 扫码登录 -->
          <div class="login_box">
            <router-link to="/login">
            <div class="qlogin_close"></div>
            </router-link>
            <div class="qrcode">
                <img class="img" :src="authData.imgURL" alt="登录码" v-show="authData.state === 1||authData.state === 3"/>
                <div class="empty" v-show="authData.state === 0"></div>
                <div class="refresh" v-show="authData.state === 3">
                    <i class="refresh_mask"></i>
                    <i class="refresh_icon" @click="getToken"></i>
                </div>
                <div class="result" v-show="authData.state === 2">
                    <img class="u_avatar" :src="authData.userAvatar" alt="用户头像"/>
                    <p class="u_name">{{authData.userName}}</p>
                </div>
                <div>
                    <p class="sub_title">{{authData.tip}}</p>
                    <p class="sub_desc">扫码登录，更易、更快、更安全</p>
                </div>
            </div>
        </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>
          <p class="page-login--content-footer-copyright">
            Copyright <d2-icon name="copyright"/> 2019 <a href="https://github.com/samuelway/hyway.git"></a>
            
            鄂ICP备19014310号
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import util from '@/libs/util.js'
import { mapActions } from 'vuex'
import { token,qrcode,authInfo,userInfo } from '@/api/sys/login/index'
export default {
  data () {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      activeName: 'userpass',
      // 快速选择用户
      dialogVisible: false,
      // 表单
      authData:{
            state: 0, // 场景：0无登录码，1有登陆码，2正在登录，3登录码过期
            count: 30, // 登录码有效倒计时（S）
            isScan:false,
            tip: '正在获取登录码，请稍等', // 提示
            imgURL: '', // 登录码路径
            authToken: '', // 验证口令
            uuid: '', // 扫码登录的用户ID
            userAvatar: '', // 扫码登录的用户头像
            userName: '', // 扫码登录的用户名
            tokenImgApi: '/auth/scan/qrcode' // 获取口令对应的登录码  
      },
      authInfoForm:{
          authToken:'',
          uuid:''
      },
      auth:{
          token:''
      },
      formLogin: {
        username: 'admin',
        password: '123456',
        code: 'v9am'
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getToken()
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    refreshTime () { 
      this.time = dayjs().format('HH:mm:ss')
    },
    getToken () {
      // 所有参数重置
      this.authData.state = 0 // 场景为无二维码
      this.authData.tip = '正在获取登录码，请稍等'
      this.authData.count = 30
      clearInterval(this.authData.timeCount)
      // 开始获取新的token
      token().then(response => {
        // 保存token，改变场景，显示登录码，开始轮询
        this.authData.authToken = response
        this.auth.token=response
        this.authData.state = 1 // 场景为有登录码
        this.authData.tip = '请使用手机口令扫码登录'
        this.authData.imgURL = process.env.VUE_APP_API+this.authData.tokenImgApi + '?token='+response // 拼装获得登录码链接
        this.authData.timeCount = setInterval(this.getTokenInfo, 5000) // 开启每隔1S的轮询，向服务器请求口令信息
      }).catch((error) => {
        console.log(error)
        this.getToken()
      })
    },
    userScanLogin(){
            let seconds =1800;
            let expires = new Date(new Date() * 1 + seconds * 1000)
            var cookieSetting = {expires:expires}
            var userVal=JSON.parse(res)
            util.cookies.set('uuid', userVal.uuid,cookieSetting)
            util.cookies.set('token', userVal.token,cookieSetting)
            util.cookies.set('refreshToken', userVal.refreshToken,cookieSetting)
            // 设置 vuex 用户信息
            //await dispatch('d2admin/user/set', {
             // name: userVal.name
            //}, { root: true })
            // 用户登录后从持久化数据加载一系列的设置
            //await dispatch('load')
            // 结束
           // resolve()


    },
    getTokenInfo () {
      // 登录码有效时间减少
      this.authData.count--
      // 登录码到期，改变场景
      if (this.authData.count === 0) {
        this.authData.state = 3 // 场景为登录码过期
        this.authData.tip = '二维码已过期，请刷新'
      }
      // 防止计数溢出
      if (this.authData.count < -1000) {
        this.authData.count = -1
      }
      // 轮询查询token状态
      authInfo(this.authData).then(response => {
        let auth = response
        // token状态为登录成功
        if (auth.authState === 1) {
          this.$message({
            message: '登录成功！',
            type: 'success'
          })
          clearInterval(this.authData.timeCount) // 关闭轮询，溜了
          userScanLogin()
          // token状态为正在登陆，改变场景，请求扫码用户信息
        } else if (auth.authState === 2) {
          this.authData.uuid = auth.uuid
          this.getUserInfo()
          this.authData.state = 2
          this.tip = '扫码成功，请在手机上确认'
          // token状态为过期（服务器），改变场景
        } else if (auth.authState === 3) {
          this.authData.state = 3
          this.authData.tip = '二维码已过期，请刷新'
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getUserInfo () {
        this.userInfo(this.loginForm).then(response => {
            // 获取用户信息，并进行显示
            this.authData.userName = response.userName
            this.authData.userAvatar = response.userAvatar
            console.log(response)
        }).catch((error) => {
                console.log(error)
        })
    },
    submit () {// 提交登录信息
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            vm: this,
            username: this.formLogin.username,
            password: this.formLogin.password
          })
            .then(() => {
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/')
            })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">
/*登录框*/
  .login_box {
    z-index: 0;
    position: absolute;
    width: 360px;
    height: 430px;
    top: 50%;
    left: 50%;
    margin-left: -190px;
    margin-top: -270px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 10px #999;
  }
  .qlogin_close {
    position: absolute;
    top: 0;
    right: 0;
    width: 64px;
    height: 64px;
    background: url(./image/pcinput.png) no-repeat right top;
    background-size: 100% 100%;
    border-top-right-radius: 5px;
    cursor: pointer;
    z-index: 99;
  }
  /*二维码*/
  .qrcode {
    position: relative;
    text-align: center;
  }
  /* 二维码获取 */
  .qrcode .img {
    display: block;
    width: 240px;
    height: 240px;
    margin: 70px auto 25px;
  }
  .qrcode .sub_title {
    text-align: center;
    font-size: 19px;
    color: #353535;
    margin-bottom: 23px;
  }
  .qrcode .sub_desc {
    text-align: center;
    color: #a3a3a3;
    font-size: 14px;
    padding: 0 40px;
    line-height: 1.8;
  }
  /* 二维码为空 */
  .qrcode .empty {
    display: block;
    width: 240px;
    height: 240px;
    margin: 70px auto 25px;
    background: #d7e8fc;
  }
  /* 二维码刷新 */
  .qrcode .refresh {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 240px;
  }
  .qrcode .refresh .refresh_mask {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -120px;
    margin-top: -120px;
    width: 240px;
    height: 240px;
    background: #ffffffe0;
  }
  .qrcode .refresh .refresh_icon {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -48px;
    margin-top: -48px;
    height: 96px;
    width: 96px;
    cursor: pointer;
    background: url(./image/refresh.png) no-repeat;
  }
  .qrcode .refresh .refresh_icon:hover {
    animation: refresh 1s linear infinite;
  }
  @keyframes refresh {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  /* 二维码结果 */
  .qrcode .result {
    display: block;
    width: 240px;
    height: 240px;
    margin: 70px auto 25px;
  }
  .qrcode .result .u_avatar {
    height: 150px;
    width: 150px;
    margin-top: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 10px #999;
    -moz-box-shadow: #999 0 2px 10px;
    -webkit-box-shadow: #999 0 2px 10px;
  }
  .qrcode .result .u_name {
    text-align: center;
    font-size: 19px;
    color: #353535;
    margin-top: 20px;
  }
.page-login {
  @extend %unable-select;
  $backgroundColor: #F0F2F5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
      span {
        color: $color-text-sub;
      }
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 14px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
  }
  .QZ-con a {
    margin: 0 22px;
    display: inline-block;
    width: 45px;
    height: 45px;
    background: url(./image/qtlgn.png) no-repeat;
  }
  #QZqqLogin {
    background-position: 0 -45px;
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #FFF;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0%{
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100%{
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>