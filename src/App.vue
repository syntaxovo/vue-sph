<template>
  <div id="app">

     <my-header></my-header>
    <router-view></router-view>
    <my-footer v-show="$route.meta.show"></my-footer>
    <!-- 在登录、注册时不显示footer组件 -->
  </div>
</template>
<script>
import header from '@/components/Header'
import footer from '@/components/Footer'
import { reqgetsearchAPI } from '../API/index'
console.log(reqgetsearchAPI({}))
export default {
  name: 'APP',
  components: {
    'my-header': header,
    'my-footer': footer
  },
  mounted () {
    // 派发一个action获得商品分类的二级列表数据
    this.$store.dispatch('categoryList')
  }

}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
