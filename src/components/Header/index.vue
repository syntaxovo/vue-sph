<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有用户名：未登录 -->
          <p v-if="!userInfo" >
            <span>请</span>
            <!-- 声明式导航：router-link务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 登录了 -->
          <p v-else >
            <a>{{userInfo}}</a>
            <a   class="register" @click="quitLOGIN"> 退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- router-link组件本省就是一个a标签 -->
        <router-link to="/home" class="logo">
          <img src="@/assets/images/logo.png" alt="" title="尚品汇" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'My-Header',
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {
    /*
    mounted(){
  // 绑定自定义事件
  this.$bus.$on('自定义事件名', (接收参数)=>{
    console.log('我是TestB组件，收到了数据', 接收参数);
  })
}
    */
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  },
  methods: {
    // 搜索框的点击按钮，去搜索页面
    goSearch () {
      // 字符串形式
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      // 模板字符串
    //  this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 对象写法 需要给路由设置个name
    //  this.$router.push({ name: 'search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } })
      // params 参数可以传递也可以不传递，如果传递空串如何解决
      //   this.$router.push({ name: 'search', params: { keyword: '' || undefined }, query: { k: this.keyword.toUpperCase } })
      /*
        http://localhost:8080/?k=function%20toUpperCase%28%29%20%7B%20%5Bnative%20code%5D%20%7D 丢失了/search 路由
        使用 undefinded解决：params参数传递，不传递(空的字符串)
      \ */
      // 路由组件能不能传递props数据？ 可以
      // this.$router.push({ name: 'search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } }, () => {}, () => {})
      if (this.$route.query) {
        // 如果路径中包含query 参数，也进行传递
        const location = { name: 'search', params: { keyword: this.keyword || undefined } }
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
    async quitLOGIN () {
      try {
        // 并跳转到home主页
        await this.$store.dispatch('quitlogin')
        this.$router.push('/home')
      } catch (error) {
        alert('退出失败')
      }
    }
  },
  computed: {
    // 计算出用户信息
    userInfo () {
      return this.$store.state.login.userinfo.name
    }
  }
}

</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
