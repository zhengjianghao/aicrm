import index from './index.vue'
import confirm_order from './confirm_order.vue'

export default {
  path: '',
  component: index,
  meta: {
    keepAlive: true
  },
  children: [
    {
      path: '/confirm_order',
      component: confirm_order
    },
  ]
}
