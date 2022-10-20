<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container"  >
      <!-- 需要实现鼠标移除时在h2标题时也能显示背景色
        利用事件委托来实现，将 h2 和item项放入一个div中
      -->
      <div @mouseleave="delindex();hidelist()" @mouseenter="showlist">
       <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
        <div class="sort" v-show="show"  >
        <div class="all-sort-list2" @click="gosearch">
          <!-- 一级标题 -->
          <div class="item " v-for="(c1,index) in categoryList " :key="c1.categoryId" :class="{cor:currentindex===index}">
            <!-- 当currentindex等于index时添加cor属性 -->
            <h3 @mouseenter="getindex(index)" >
              <a  :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <!-- 二级、三级标题容器 -->
            <div class="item-list clearfix"  :style="{display:currentindex===index?'block':'none'}">
              <!-- 通过获取的一级标题index
                  当鼠标悬停的currentindex === item项的索引时，来控制display的显示与隐藏
             -->
              <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
         </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// 按需引入方式加载
import throttle from 'lodash/throttle'
export default {
  data () {
    return {
      // 设置三级联动的一级标题的初始值为-1
      currentindex: -1,
      show: true
    }
  },
  name: 'TypeNav',

  // 组件挂载完毕，向服务器发送数据
  mounted () {
    // 通过vuex发请求，获取数据，存储在仓库中
    // this.$store.dispatch('categoryList')
    // 写入APP组件中让其只执行一次
    // 在search页面使得三级联动标题隐藏
    if (this.$route.path === '/search') {
      this.show = false
    }
  },
  computed: {
    /*
      函数写法：右侧是一个函数，当使用这个计算属性的时候右侧函数会立即执行一次
          注入一个state参数，其实内部为大仓库的数据
    */
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    // 三级联动设置背景色，先鼠标进入获得index,并对该item添加cor属性
    // getindex (index) {
    //   this.currentindex = index
    //   console.log(index)
    // }
    getindex: throttle(function (index) {
      this.currentindex = index
    }, 50),
    delindex () {
      // 鼠标移除，取消背景色
      this.currentindex = -1
    },
    gosearch (event) {
      /*
      编程式导航+事件委托
      利用事件委托存在一些问题 ，1 点击的一定式a标签
      2如何获取参数[1，2，3 级分类的产品名称、id]
      3存在另外问题，即使你能确定点击的是a标签，如何区分一级、二级、三级分类的标签
      */
      // this.$router.push('/search')
      // 第一：把子节点当中的a标签加上自定义属性data-categoryname,其余子节点是没有的
      const element = event.target
      // 第二：节点有一个属性dataset属性可以获取自定义属性与属性值
      console.log(element.dataset)
      const { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        // 有一级、二级、三级标签 a
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 整理参数
        console.log(location, query)
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    },
    // 在search页面 鼠标移入显示三级联动详情
    showlist () {
      this.show = true
    },
    hidelist () {
      // 只有在search页面才有鼠标移除隐藏功能
      if (this.$route.path !== '/home') {
        this.currentindex = -1
        this.show = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cor{
          background-color: skyblue;
        }
      }
    }
    //过度动画样式
    //过度动画开始状态(进入)
    .sort-enter{
      height:0px;
    }
    //过度动画结束状态
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}

</style>
