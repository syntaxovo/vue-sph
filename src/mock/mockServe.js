// 先引入mockjs模块
import Mock from 'mockjs'
/*
  把json数据格式引进来的JSON数据格式根本没有对外暴露，但是可以引入
  webpack 默认对外暴露的：图片、json数据格式
*/
import banner from './banner.json'
import floor from './floors.json'
import goodsinfo from './goodsinfo.json'
// mock数据：把第一个参数请求地址 第二个参数：请求数据
Mock.mock('/mock/banner', { status: 200, data: banner }) // 模拟首页大的轮播图的数据
Mock.mock('/mock/floor', { status: 200, data: floor }) // 模拟楼层数据
