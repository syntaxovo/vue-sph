<template>
  <div class="pagination">
    <button :disabled="pageNO===1" @click="$emit('getpageinfo', pageNO-1)"  >上一页</button>
    <button v-if="startNumendNum.start >1"  @click="$emit('getpageinfo', 1)">1</button>
    <button v-if="startNumendNum.start>2">···</button>
    <button v-for="(page,index) in startNumendNum.end"
    :key="index"
    v-show="page >=startNumendNum.start"
    @click="$emit('getpageinfo', page)"
    :class="{active:pageNO===page}"
    >{{page}}</button>
    <button v-if="startNumendNum.end<pageall-1" >···</button>

    <button :disabled="pageNO===pageall"  @click="$emit('getpageinfo', pageNO+1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>

  </div>
</template>

<script>
export default {
  name: 'My-Pagination',
  props: {
    pageNO: { // 当前页数
      type: Number
    },
    pageSize: { // 每页的数据条数
      type: Number
    },
    total: { // 总数据条数
      type: Number
    },
    continues: { // 分页的连续数
      type: Number
    }
  },
  computed: { //
    // 计算出总页数
    pageall () {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续分页时的起始页数、结束页数
    startNumendNum () {
      const { continues, pageNO, pageall } = this
      // 定义变量来存储起始页数、结束页数
      let start = 0
      let end = 0
      // 分页器的连续分页至少要有五页
      // 存在数据少时，页数不够需要进行判断
      if (pageall < continues) {
        // 总页数<连续分页数
        start = 1
        end = pageall
      } else {
        start = pageNO - parseInt(continues / 2)
        end = pageNO + parseInt(continues / 2)
        // 异常情况
        // start异常 为 0或负数
        if (start < 1) {
          start = 1
          end = continues
        }
        // end 异常 大于总页数
        if (end > pageall) {
          end = pageall
          start = pageall - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background-color: skyblue;
  }
</style>
