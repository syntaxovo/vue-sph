<template>
  <div class="floor">
      <div class="py-container">
        <div class="title clearfix">
          <h3 class="fl">{{floorslist.name}}</h3>
          <div class="fr">
            <ul class="nav-tabs clearfix">
              <li class="active" v-for="(nav,index) in  floorslist.navList" :key="index">
                <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-content">
          <div class="tab-pane">
            <div class="floor-1">
              <div class="blockgary">
                <ul class="jd-list">
                  <li v-for="(list,index) in floorslist.keywords" :key="index">{{list}}</li>
                </ul>
                <img :src="floorslist.imgUrl" />
              </div>
              <!-- 轮播图 -->
              <div class="floorBanner">
               <carousel :list="floorslist.carouselList" />
            </div>
              <div class="split">
                <span class="floor-x-line"></span>
                <div class="floor-conver-pit">
                  <img :src="floorslist.recommendList[0]" />
                </div>
                <div class="floor-conver-pit">
                  <img :src="floorslist.recommendList[1]" />
                </div>
              </div>
              <div class="split center">
                <img :src="floorslist.bigImg" />
              </div>
              <div class="split">
                <span class="floor-x-line"></span>
                <div class="floor-conver-pit">
                  <img :src="floorslist.recommendList[2]" />
                </div>
                <div class="floor-conver-pit">
                  <img :src="floorslist.recommendList[3]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Carousel from '@/components/carousel/index.vue'
export default {
  name: 'My-Floor',
  props: ['floorslist'], /*
        第一次书写Swiper的时候，在mounted当中书写是不可以的
        但在此处是可以的，因为第一次书写轮播图的时候，是在当前组件内部请求，动态渲染解构
        [前台至少服务器的数需要回来]，因此第一次的写法不能直接写入mounted中
      */

  components: { Carousel }
}
</script>

<style  lang="less" scoped>
.floor {
      margin-top: 15px;

      .py-container {
        width: 1200px;
        margin: 0 auto;

        .title {
          .fl {
            float: left;
            color: #c81623;
            font-size: 20px;
            line-height: 30px;
            margin: 9px 0;
            font-weight: 700;
          }

          .fr {
            float: right;

            .nav-tabs {
              margin: 10px 0 0;
              display: inline-block;

              li {
                float: left;
                line-height: 18px;

                a {
                  padding-top: 1px;
                  font-weight: 400;
                  background-color: #fff;

                  &::after {
                    content: "|";
                    padding: 0 10px;
                  }
                }

                &:nth-child(7) {
                  a {
                    &::after {
                      content: "";
                    }
                  }
                }

                &.active {
                  a {
                    color: #e1251b;
                  }
                }
              }
            }
          }
        }

        .tab-content {
          border-top: 2px solid #c81623;
          border-bottom: 1px solid #e4e4e4;

          .tab-pane {
            .floor-1 {
              height: 360px;
              display: flex;

              .blockgary {
                width: 210px;
                height: 100%;
                background: #f7f7f7;

                .jd-list {
                  padding: 15px 0;
                  overflow: hidden;

                  li {
                    list-style-type: none;
                    float: left;
                    width: 40%;
                    margin: 0 10px;
                    border-bottom: 1px solid #e4e4e4;
                    text-align: center;
                    line-height: 26px;
                  }
                }

                img {
                  width: 100%;
                }
              }

              .floorBanner {
                width: 330px;
                height: 100%;
              }

              .split {
                width: 220px;
                height: 100%;
                position: relative;

                .floor-x-line {
                  position: absolute;
                  background: #e4e4e4;
                  width: 220px;
                  height: 1px;
                  top: 180px;
                }

                .floor-conver-pit {
                  width: 100%;
                  height: 50%;

                  img {
                    width: 100%;
                    height: 100%;
                    transition: all 400ms;

                    &:hover {
                      opacity: 0.8;
                    }
                  }
                }
              }

              .center {
                border: 1px solid #e4e4e4;
              }
            }
          }
        }
      }
    }
</style>
