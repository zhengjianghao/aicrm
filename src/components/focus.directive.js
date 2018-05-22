export default {
  install(Vue, option) {
    // Register a global custom directive called v-focus
    Vue.directive('focus', {
      // When the bound element is inserted into the DOM...
      update: function (el, binding) {
        if (binding.value) {
          // Focus the element
          el.focus()
        }
      }
    })
  }
}
