<template>
 <div>
  <!-- 三级联动---商品分类 -->
  <TypeNav></TypeNav>
  <!-- 轮播图即右侧边栏 -->
  <ListContainer></ListContainer>
  <!--  今日推荐-->
  <TodayComment></TodayComment>
  <!-- 热卖排行 -->
  <Rank></Rank>
  <!-- 猜你喜欢 -->
  <like/>
  <!-- 两个梯层 -->
  <!--  floor数据不是自己发请求来获取的，是父组件传的 -->
  <floor v-for="(floors) in floorlist" :key="floors.id"  :floorslist='floors'/>
  <!-- 品牌 -->
  <Brand/>
 </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'My-Home',
  components: {
    TypeNav: () => import('@/components/TypeNav/index.vue'),
    ListContainer: () => import('@/views/Home/ListContainer'),
    TodayComment: () => import('@/views/Home/TodayCommend'),
    Rank: () => import('@/views/Home/Rank'),
    Like: () => import('@/views/Home/Like'),
    Floor: () => import('@/views/Home/Floor'),
    Brand: () => import('@/views/Home/Brand')
  },
  mounted () {
    this.$store.dispatch('getfloorslist')
    // 获取用户登录时的信息
    this.$store.dispatch('getuserlogininfo')
  },
  computed: {
    ...mapState({
      floorlist: state => state.home.floorslist
    })
  }
}
</script>
<style lang="less" scoped>

</style>
