// 向外暴露路由
export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/center',
    name: 'center',
    redirect: '/center/mineorder',
    component: () => import('@/views/Center/index.vue'),
    meta: {
      show: true
    },
    children: [
      {
        name: 'mineorder',
        path: 'mineorder',
        component: () => import('@/views/Center/MineOrder/index.vue')
      },
      {
        name: 'groundorder',
        path: 'groundorder',
        component: () => import('@/views/Center/GroupOrder/index.vue')
      }
    ]
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('@/views/PaySuccess/index.vue'),
    meta: {
      show: true
    },
    beforeEnter (to, from, next) {
      if (from.path === '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/Pay/index.vue'),
    meta: {
      show: true
    },
    beforeEnter (to, from, next) {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/trade',
    component: () => import('@/views/Trade/index.vue'),
    meta: {
      show: true
    },
    beforeEnter: (to, from, next) => {
      // 设置路由独享守卫
      if (from.path === '/shopCart') {
        next()
      } else {
        next(false)
      }
    }

  },
  {
    path: '/detail/:skuid?',
    component: () => import('@/views/Detail/index.vue'),
    meta: {
      show: true
    }
  },
  { // 购物车组件
    path: '/shopCart',
    component: () => import('@/views/ShopCart/index.vue'),
    meta: {
      show: true
    },
    name: 'shopCart'
  },
  { // 成功加入购物车组件
    path: '/addCartSuccess',
    component: () => import('@/views/AddCartSuccess/index.vue'),
    meta: {
      show: true
    },
    name: 'addCartSuccess'
  },
  {
    path: '/home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      show: true
      /*
      有时，你可能希望将任意信息附加到路由上，如过渡名称、谁可以访问路由等。
      这些事情可以通过接收属性对象的meta属性来实现，并且它可以在路由地址和导航守卫上都被访问到。
      v-show来绑定show来控制footer组件的显示隐藏
      */
    }
  }, {
    path: '/search/:keyword?',
    component: () => import('@/views/Search/index.vue'),
    meta: {
      show: true
    },
    name: 'search',
    /*
      路由组件能否传递props数据
      布尔值写法 :params
    */
    // props: true
    // props: { a: 1, b: 2 } // 对象写法
    // 函数写法 可以params参数、query参数，通过props传递给路由组件
    props: ($router) => {
      return { keyword: $router.params.keyword, K: $router.query.key }
    }
  }, {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      show: false
    }

  }, {
    path: '/register',
    component: () => import('@/views/Register/index.vue'),
    meta: {
      show: false
    }
  }

]
