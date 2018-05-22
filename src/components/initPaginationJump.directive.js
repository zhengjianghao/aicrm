export default {
  install(Vue, option) {
    Vue.directive('initjump', {
      // When the bound element is update
      update: function (el, binding) {
        if (binding.value) {
          el.lastChild.children[0].value = binding.value
        }
      }
    })
  }
}
