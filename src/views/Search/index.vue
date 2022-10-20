<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <!-- 面包屑的展示 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑 -->
            <!-- category参数 -->
            <li class="with-x" v-if="searchparams.categoryName">{{searchparams.categoryName}}<i @click="delcategoryname"> ×</i></li>
            <!-- params 参数 -->
            <li class="with-x" v-if="this.$route.params.keyword">{{ this.$route.params.keyword}} <i @click="clearkeyword"> ×</i></li>
            <!-- trandemark参数 -->
            <li class="with-x" v-if="searchparams.trademark">{{ searchparams.trademark.split(':')[1]}} <i @click="removetrademark"> ×</i></li>
            <!-- 平台信息参数 -->
            <li class="with-x" v-for="(attrval,index) in  delfir() "   :key="index">{{attrval.split(':')[1]}} <i @click="removeinfo(index)"> ×</i></li>
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件 -->
        <SearchSelector @trademarkinfo="trademarkinfo" @attrinfo='attrinfo' />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 定义排序 -->
              <li :class="{active:isone}" @click="changeactive('1')">
                  <a href="#">综合 <span  v-if="isone"  class="iconfont" :class="{'icon-arrowup':isasc,'icon-todown':isdesc}"></span></a>
                </li>
                <li :class="{active:istwo}" @click="changeactive('2')">
                  <a href="#" v>价格 <span  v-if="istwo" class="iconfont" :class="{'icon-arrowup':isasc,'icon-todown':isdesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 点击进行跳转到搜索页面 -->
                    <router-link :to="`/detail/${goods.id}`"> <img  v-lazy="goods.defaultImg " /></router-link>

                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
                </li>

            </ul>
          </div>
          <!-- 分页器 -->
            <pagination :pageNO='searchparams.pageNo' :pageSize='searchparams.pageSize' :total='total' :continues='5' @getpageinfo="getpageinfo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
import Pagination from '@/components/Pagination/index.vue'
export default {
  name: 'My-Search',
  data () {
    return {
      // 带给服务器的初始数据，实现响应式
      searchparams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        // 分类的名字
        categoryName: '',
        // 关键字
        keyword: '',
        // 排序，按价格升降来展示数据
        order: '1:asc', // 默认为综合降序
        // 分页器
        pageNo: 1, // 初始展示为第一页的数据
        pageSize: 5, // 每一页展示数据的条数
        props: [''], // 平台需要属性操作带来的参数
        trademark: '' // 品牌
      }
    }
  },
  components: {
    SearchSelector,
    Pagination
  },

  beforeMount () {
    // 在组件挂载完毕之前执行一次，获取搜素的数据
    // 复杂写法
    // this.searchparams.category1Id = this.$route.query.category1Id
    // this.searchparams.category2Id = this.$route.query.category2Id
    // this.searchparams.category3Id = this.$route.query.category3Id
    // this.searchparams.categoryName = this.$route.query.categoryName
    // this.searchparams.keyword = this.$route.params.keyword
    // Object.assign() ES6 合并对象
    // 在发请求之前，接口需要传递参数，进行整理(再给服务器发请求之前，把参数整理好，服务器就会返回查询的数据)
    Object.assign(this.searchparams, this.$route.params, this.$route.query)
  },
  /*
  组件挂载完毕执行一次[仅执行一次]
  搜索页需要多次获取搜索的信息所以要多次执行，
  可写入函数中
  */
  mounted () {
    // 在发请求之前带给服务器参数[searchparams 参数发生变化有数值带给服务器]
    this.getData()
  },
  watch: {
    // 监听路由信息是否变换，如果发生变换，再次发起请求
    $route (newvalue, oldvalue) {
      // 再次发起请求之前整理带给服务器参数
      Object.assign(this.searchparams, this.$route.params, this.$route.query)
      console.log(this.searchparams)
      // 整理完后再次发起ajax请求
      this.getData()
      // 请求完毕之后，需要清空1id 2id 3id 来接受下次的变量
      /*
        分类名字与关键字不需要清空，因为每一次路由发生变换时，都会给其赋予新的数据
      */
      this.searchparams.category1Id = undefined
      this.searchparams.category2Id = undefined
      this.searchparams.category3Id = undefined
    }
  },
  methods: {
    // 去除props第一项
    delfir () {
      return this.searchparams.props.slice(1)
    },
    getData () {
      // 向服务器发送请求获取search模块数据(根据参数不同返回的不同数据进行展示)
      // 派发search 获取数据
      // 把这次请求封装为一个函数每当你需要调用的时候就调用
      this.$store.dispatch('getsearchlist', this.searchparams)
    },
    delcategoryname () {
      // 点击删除后清除数据，在发请求
      // 带给服务器的参数是可有可无的，如果属性值为空的字符串会把相应的字段传递给服务器
      // 但如果设置为undefined,当前字段不会传给服务器
      this.searchparams.categoryName = undefined
      this.searchparams.category1Id = undefined
      this.searchparams.category2Id = undefined
      this.searchparams.category3Id = undefined
      this.getData()
      // 对应的地址栏也要进行更改
      // 如果是params查询需要留下params参数
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 清除关键字
    clearkeyword () {
      // 需要设置全局总线$bus来实现清空关键字
      /*
    // 触发事件,事件名不能重复
          触发事件方法名(){
    this.$bus.$emit('自定义事件名', 传递参数);
  }
      */
      this.$route.params.keyword = undefined
      this.getData()
      // 通知兄弟组件header清除关键字
      this.$bus.$emit('clear')
      // 路由信息的保存，存在query参数时要保留下来
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: 'this.$route.query' })
      }
    },
    // 删除品牌面包屑
    removetrademark () {
      this.searchparams.trademark = undefined
      this.getData()
    },
    // 自定义事件(品牌)的回调
    trademarkinfo (trademark) {
      /*
        点击了品牌，需要整理参数，向服务器发请求获取相应的数据进行展示
        需要在父组件中发送请求 */
      // console.log('父组件', trademark)
      // 整理参数形式 id：valuename
      this.searchparams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 再次发送请求
      this.getData()
    },
    // 自定义事件(平台信息)的回调
    attrinfo (names, attrval) {
      // ['属性ID'：属性值：属性名]
      // console.log(names, attrval)
      // 整理参数
      const props = `${names.attrId}:${attrval}:${names.attrName}`
      if (this.searchparams.props.indexOf(props) === -1) { this.searchparams.props.push(props) }

      // // 再次发请求
      this.getData()
    },
    // 清除平台信息
    removeinfo (index) {
      console.log(index)
      // 清除props
      this.searchparams.props = ''
      this.getData()
    },
    // 点击更改排序
    changeactive (flag) {
      // flag记录点击的是按那种方式去进行排序 '1'(综合排序) '2'(价格排序)
      //  console.log(flag)
      // 记录初始的order状态 id ：value
      const originOrder = this.searchparams.order
      const originflag = this.searchparams.order.split(':')[0]
      const originsort = this.searchparams.order.split(':')[1]
      // console.log(originflag, originsort)
      // 准备一个新的order值
      let neworder = ''
      // 点击的是综合
      // 点击的是同一个li
      if (flag === originflag) {
        neworder = `${originflag}:${originsort === 'desc' ? 'asc' : 'desc'}`
        console.log(neworder)
      } else {
        // 点击的是价格
        // 点击的不是一个li
        console.log(flag)
        neworder = `${flag}:${'desc'}`
      }
      // 将新的order赋予给searchParams
      this.searchparams.order = neworder
      // 重新渲染数据
      this.getData()
    },
    // 自定义事件(分页器)的回调
    getpageinfo (pageNO) {
      console.log(pageNO)
      this.searchparams.pageNo = pageNO
      // 重新渲染数据
      this.getData()
    }
  },
  computed: {
    ...mapGetters(['attrsList', 'goodsList', 'trademarkList']),
    isone () {
      return this.searchparams.order.indexOf('1') !== -1
    },
    istwo () {
      return this.searchparams.order.indexOf('2') !== -1
    },
    // 是否升序
    isasc () {
      return this.searchparams.order.indexOf('asc') !== -1
    },
    // 是否降序
    isdesc () {
      return this.searchparams.order.indexOf('desc') !== -1
    },
    // 获取search商品总数据模块
    ...mapState({
      total: state => state.search.searchlist.total
    }

    )
  }
}
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>
