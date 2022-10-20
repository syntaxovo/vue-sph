vuex 状态管理库
  VUEX是官方提供的一个插件状态集中管理项目中组件公用的数据
  如果项目过大，组件过多，接口也多，数据越多，可以让vuex实现模块式开发

1 完成一级分类活动动态添加背景颜色
    第一中：样式来解决 对应item项：hover{} 来设置
    第二章： js 获取item的index，在给对应的item添加cor
2 控制二三级标题的显示隐藏
  最开始通过css样式display ：none || block来控制
  js：通过currentindex ===index 来设置display

//防抖节流
  lodash
//三级联动组件的路由跳转与参数传递
  三级联动用户可以点击： 一级分类、二级分类、三级分类
  Home 模块跳转到Search模块，一级会把用户选中的产品(产品的名称、产品的ID)在路由跳转的时候，进行传递
// 路由跳转： 
    声明式导航router-link
    编程式导航：Push | repplace
三级联动：如果使用声明式导航 router-link,可以实现路由的跳转与参数传递
但会出现卡顿现象
router-link :可以一个组件
服务器的数据返回之后，循环出很多的router-link 组件 [创建组件实例]1000+
创建组件实例的时候，一瞬间创建1000+很多内存，因此出现了卡顿
解决：编程式导航+事件委派
    自定义属性来确定是a标签
     以及是几级目录
//开发Search模块中的TypeNav的商品分类菜单(过度动画效果)
过度动画：前提组件|元素务必要有v-if|v-show指令才可以进行过度动画
    transition

// 对商品分类三级列表进行优化
      在APP根组件当中发请求(根组件mounted)执行一次
// 合并params与query参数？

// 开发首页 listContainer 与floor组件，
    服务器的数据只有商品分类数据，对于listContainer 与floor组件数据服务器没有提供
    mock数据(模拟)：如果想要moke数据，需要用到一个插件mockjs
    前端moke的数据不会和你的服务器进行任何通信
    使用：1 在项目src文件夹中创建mock文件夹
         2 准备json数据 需要格式化文档，不能留有空格
         3 把mock数据需要的图片放置到public文件夹中[Public 文件夹在打包的时候，会把相应的资源原封不动的打包到 dist文件夹中]
         4创建mockServe.js通过mockjs插件实现模拟数据
         5 mockServe.js 文件在入口文件中引入(至少需要执行一次，才能模拟数据)