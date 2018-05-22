import index from './index.vue'
import homepage from './homepage.vue'
import juHuaSuan from './juHuaSuan/juHuaSuan.router.js'
import sleepVIPactiv from './sleepVIPactiv/sleepVIPactiv.router.js'
import pptActivate from './pptActivate/pptActivate.router.js'
import tqgActivate from './tqgActivate/tqgActivate.router.js'
import xfsActivate from './xfsActivate/xfsActivate.router.js'
import doubleEleven from './doubleEleven/doubleEleven.router.js'
import doubleTwelve from './doubleTwelve/doubleTwelve.router.js'
import otherActivate from './otherActivate/otherActivate.router.js'

export default {
  path: '/activateCustomer',
  component: index,
  meta: {
    keepAlive: true
  },
  children: [
    {
      path: '',
      component: homepage
    },
    juHuaSuan,
    sleepVIPactiv,
    pptActivate,
    tqgActivate,
    xfsActivate,
    doubleEleven,
    doubleTwelve,
    otherActivate
  ]
}
