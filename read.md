1、 vue-cli 脚手架初始化项目
  node + webpack + 淘宝镜像
2、node_module文件夹：项目依赖文件夹
  public 文件夹：放置一些静态资源 ，注意:在public  文件夹中的静态资源,webpack进行
  打包的时候，会原封不懂得打包到 dist文件夹中
3 src 文件夹 程序源代码 文件夹
  asset:放置一些静态资源(一般放置多个组件共用)，在 webpack打包的时候，webpack会把一些静置资源当成一个模块，打包进js文件 里
  commponent:放置一些非路由组件(全局 组件)
  App.vue :唯一的 根组件
  main.js :程序入口文件，也是程序最先 执行的文件
4 babel.config.js:配置文件  babel相关 babel 本身不具有任何转化功能，它把转化的功能都分解到一个个 plugin 里面。因此当我们  不配置任何插件时，经过 babel 的代码和输入是相同的。babel 也可以转化为更低的规范
5 package.json :记录 项目 叫做什么，项目中有哪些 依赖，项目怎么运行 
6 package.lock.json :缓存性文件
7 README.md 

8 运行项目时自动打开
  "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }

9关闭eslink 校验工具
    在 vue.config.js 中设置
      lintonsave:false   /*
 
注册完组件不管是路由组件，还是非路由组件(components下的全局样式组件)
都具有$router 、$route 属性
route :一般获取路由信息 (路径 、query、params 等) 路由信息对象
router：一般进行编程式导航进行路由跳转 push |replace (一个路由实例)
      $router是"路由实例"对象包括了路由的跳转方法，钩子函数等

10 路由跳转
    有两种方式
    声明式导航 router-link 进行路由跳转
    编程式导航 $router.push | replace 可以进行路由跳转
编程式导航：声明式导航能做的，编程式导航都能做
除了路由跳转，还可做一些其他的业务逻辑


本业务 footer组件在登录注册式不显示,配置路由的时候可以设置路由元信息[meta]
路由需要配置对象，key不能胡写

路由传参：
params参数：属于路径当中的一部分，注意在配置路由时需要占位 /search/:keyword
       params不能结合path一起使用
如何控制params参数可传可不传
 {  path: '/search/:keyword?'}  
 比如配置路由的时候，占位了 (params参数)，但是路由在跳转的时候就不传递，路径出现问题

http://localhost:8080/search/awdwa%20?k=AWDWA%20  加上？
 
query参数：不属于路径的一部分，类似于queryString /home:k=v&kv=,不需要占位

编程式导航：路由跳转到路由(参数不变)，多次执行会抛出NavigationDuplicated 的警告错误
 路由跳转有两种：声明式导航 编程式导航
  声明式导航没警告，在vue-router底层已经处理好了
  为什么编程式导航进行路由跳转的时候就有警告？
    "vue-router": "^3.5.1", 最新的vue-router引入了promise
    function push(){
      return new promise((resolve,erject)=>{}) 捕获到错误的信息
    }
 this.$router.push({ name: 'search', params: { keyword: this.keyword }, query: { k: this.keyword.toUpperCase() } }, () => {}, () => {})··
    通过来解决，但治标不治本，在push|replace仍会警告
    重写push|replace 
    
// 重写push|replace 方法
VueRouter.prototype.push = function (location, reslove, reject) {
  if (reslove && reject) {
    originPush.call(this, location, reslove, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}



// home主页
  三级联动，在home \search\Detail 把三级联动设置为全局组件
  好处：这样只需要注册一次便可以在项目中任意地方使用

接口统一管理：
  项目很小，完全可以在组件的生命周期函数发送请求
  项目很大， axios.get('xxx')

跨域问题
  代理服务器
    devServer: {
    proxy: {
      '/api': {
        target: ' 服务器'
      }
    }
  }