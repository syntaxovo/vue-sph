<template>
   <div class="order-right">
          <div class="order-content">
            <div class="title">
              <h3>我的订单</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="29%">商品</th>
                    <th width="31%">订单详情</th>
                    <th width="13%">收货人</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="orders">

              <table class="order-item" v-for="(item) in orderlist.records" :key="item.id">
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">{{item.createTime}} 订单编号: {{item.outTradeNo}} <span
                          class="pull-right delete"><img src="../images/delete.png"></span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for="(orders,index) in item.orderDetailList" :key="orders.id">
                    <td width="60%">
                      <div class="typographic">
                        <img :src="orders.imgUrl" style="width:100px;height:100px ">
                        <a href="#" class="block-text">{{orders.skuName}}</a>
                        <span>x{{orders.skuNum}}</span>
                        <a href="#" class="service">售后申请</a>
                      </div>
                    </td>
                    <td :rowspan="item.orderDetailList.length"  v-if="index===0" width="8%" class="center">小丽</td>
                    <td :rowspan="item.orderDetailList.length"  v-if="index===0" width="13%" class="center">
                      <ul class="unstyled">
                        <li>总金额¥{{orders.orderPrice}}</li>
                        <li>{{item.orderStatusName}}</li>
                      </ul>
                    </td>
                    <td :rowspan="item.orderDetailList.length"  v-if="index===0" width="8%" class="center">
                      <a href="#" class="btn">已完成 </a>
                    </td>
                    <td :rowspan="item.orderDetailList.length"  v-if="index===0" width="13%" class="center">
                      <ul class="unstyled">
                        <li>
                          <a href="mycomment.html" target="_blank">评价|晒单</a>
                        </li>

                      </ul>
                    </td>
                  </tr>

                </tbody>
              </table>

            </div>
            <!-- 分页器 -->
            <div class="choose-order">
              <Pagination
              :pageNO='this.page'
              :pageSize='this.limit'
              :total='this.orderlist.total'
               :continues='5'
              @getpageinfo="getpageinfo"
              />

          </div>
          <!--猜你喜欢-->
          <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike01.png" />
                </div>
                <div class="attr">
                  <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>3699.00</i>
                </div>
                <div class="commit">已有6人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike02.png" />
                </div>
                <div class="attr">
                  Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4388.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike03.png" />
                </div>
                <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike04.png" />
                </div>
                <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人评价
                </div>
              </li>
            </ul>
          </div>
   </div>
   </div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue'
export default {
  name: 'mine-order',
  data () {
    return {
      // 需要初识化传入的数据
      page: 1, // 页码
      limit: 3, // 每页显示的数量
      orderlist: {}// 存储返回的数据
    }
  },
  mounted () {
    // 获取我的订单列表
    this.getData()
  },
  methods: {
    async getData () {
      const res = await this.$API.getmineorderinfoAPI(this.page, this.limit)
      if (res.code === 200) {
        this.orderlist = res.data
        console.log(res.data)
      } else {
        return Promise.reject(new Error('false'))
      }
    },
    getpageinfo (page) {
      this.page = page
      this.getData()
    }
  },
  components: {
    Pagination
  }
}
</script>

<style >

</style>
