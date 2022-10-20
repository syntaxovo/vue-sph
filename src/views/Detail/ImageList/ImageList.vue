<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(swiper,index) in skuImageList " :key="swiper.id" >
        <img :src="swiper.imgUrl" :class="{active:currentindex===index}" @click="getcurrentindex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: 'my-ImageList',
  data () {
    return {
      currentindex: 0
    }
  },
  props: ['skuImageList'],
  watch: {
    // 监听数据：确保数据能够渲染成功，但不保证v-for遍历是否完毕
    skuImageList (newvalue, oldvalue) {
      this.$nextTick(() => {
        // eslint-disable-next-line no-new
        new Swiper(this.$refs.cur, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          slidesPerView: 3 // 每页呈现三个
        })
      })
    }
  },
  methods: {
    getcurrentindex (index) {
      // 当点击的item项与index索引值相等时，对item项添加avtive样式
      this.currentindex = index
      // 并将该索引值，传给兄弟组件，让其更改展示的图片
      this.$bus.$emit('getindex', this.currentindex)
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
