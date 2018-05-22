import index from './index.vue'
import homepage from './homepage.vue'
import FMGGcare from './FMGGcare/FMGGcare.router.js'
import holidayCare from './holidayCare/holidayCare.router'
import solartermCare from './solartermCare/solartermCare.router'
import badWeather from './badWeather/badWeather.router.js'
import pon from './potentialDemandMarketing/potentialDemandMarketing.router.js'
import giftMaket from './giftMaket/giftMaket.router.js'
import noFMGGcare from './noFMGGcare/noFMGGcare.router.js'

export default {
  path: '/maintenance',
  meta: {
    keepAlive: true
  },
  component: index,
  children: [
    {
      path: '',
      component: homepage
    },
    FMGGcare,
    holidayCare,
    badWeather,
    pon,
    giftMaket,
    solartermCare,
    noFMGGcare
  ]
}
