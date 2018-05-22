import index from './index.vue'
import homepage from './homepage.vue'
import globalData from './globalData/globalData.router.js'
import vipLevel from './vipLevel/vipLevel.router.js'
import distribution from './distribution/distribution.router.js'
import mergeOrder from './mergeOrder/mergeOrder.router.js'
import densityChart from './densityChart/densityChart.router.js'

export default {
  path: '/dataChart',
  component: index,
  children: [
    {
      path: '',
      component: homepage
    },
    globalData,
    vipLevel,
    distribution,
    mergeOrder,
    densityChart
  ]
}
