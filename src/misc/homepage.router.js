import index from './index.vue'
import homepage from './homepage.vue'
import potentialDemandMarketing from './potentialDemandMarketing/pon.router.js'

export default {
  path: '/firstBuy',
  component: index,
  children: [
    // {
    //   path: '',
    //   // component: homepage
    // },
    potentialDemandMarketing
  ]
}
