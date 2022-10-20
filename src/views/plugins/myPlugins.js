// vue 插件一定是暴露一个对象
const myPlugins = {}
myPlugins.install = function (Vue, options) {
  // vue.prototype.$bus :任何组件都可以使用
  // vue.directive
  // vue.component
  // vue.filter
  Vue.directive(options.name, (element, params) => {
    element.innerHTML = params.value.toUpperCase()
  })
}
export default myPlugins
