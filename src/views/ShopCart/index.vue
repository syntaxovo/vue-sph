<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="changegoodsischeckedinfo(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.cartPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle('sub','-1',cart)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="cart.skuNum" @change="handle('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handle('add','1',cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{(cart.cartPrice*cart.skuNum).toFixed(2)}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="delgoodsinfo(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isChecked" @click="changeischecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a  @click="delallcartgoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{allnum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{total}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted () {
    // 获取购物车信息,需要次数过于频繁，写成方法便于调用
    this.getcartdata()
  },
  methods: {
    // 获取购物车信息
    getcartdata () {
      this.$store.dispatch('getcartdata')
    },
    // 商品数量改变
    handle: throttle(async function (type, disnum, cart) {
      /*
        type 为了区分是哪个元素
        disnum:形参，来确定变化量(1),(-1), input的最终个数(并不是变化量)
        cart:每一个产品 身上有id
        */
      switch (type) {
        case 'add':
          disnum = 1
          break
        case 'sub':
          disnum = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          // 如果输入的非法字符或小于0
          if (isNaN(disnum) || disnum < 1) {
            disnum = 0
          } else {
            // 输入的是小数,让其取整与原来的数相减,为-1 1在去执行加减
            disnum = parseInt(disnum) - cart.disnum
          }
      }
      // console.log('派发action:通知服务器修改数据', type, disnum, cart)
      // 重新调用接口，渲染数据
      try {
        await this.$store.dispatch('getcarsinfo', {
          skuId: cart.skuId,
          skuNum: disnum
        })
        // 在重新渲染数据
        this.getcartdata()
      } catch (error) {
      }
    }, 500),
    async delgoodsinfo (cart) {
      // console.log(cart)
      try {
        await this.$store.dispatch('delttecartinfoByid', cart.skuId)
        // 重新获取数据渲染页面
        this.getcartdata()
      } catch (error) {
        alert(error.message)
      }
    },
    // 商品状态的改变
    async   changegoodsischeckedinfo (cart, event) {
      const isChecked = event.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('changegoodsischeckedinfo', { skuId: cart.skuId, isChecked })
        this.getcartdata()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除全部的商品数据
    async delallcartgoods () {
      try {
        // 派发action请求循环删除多个数据
        await this.$store.dispatch('delcartgoodsall')
        // 并重新获取数据u渲染页面
        this.getcartdata()
      } catch (error) {
        alert(error.message)
      }
    },
    // 商品全选按钮的改变
    async  changeischecked (event) {
      const isChecked = event.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('ischangeall', isChecked)
        this.getcartdata()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    // 计算出来的购物车数据
    cartInfoList () {
      return this.cartList.cartInfoList || []
    },
    // 计算出商品的总价
    total () {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.cartPrice
      })
      return sum
    },
    // 计算出商品的总量
    allnum () {
      let num = 0
      this.cartInfoList.forEach(item => {
        num += item.skuNum
      })
      return num
    },
    isChecked () {
      // 判断全选按钮
      return this.cartInfoList.every(item => item.isChecked === 1)
    }
  }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 27%;
          }

          .cart-list-con2 {
            width: 22%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 16%;

          }

          .cart-list-con5 {
            width: 11%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 10%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
