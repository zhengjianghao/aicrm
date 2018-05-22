import index from './index.vue'
import homepage from './homepage.vue'
import payRemind from './payRemind/payRemind.router.js'
import arriveMyCityRemind from './arriveMyCityRemind/arriveMyCityRemind.router.js'
import firstComment from './firstComment/firstComment.router.js'
import onlyRefund from './onlyRefund/onlyRefund.router.js'
import applyReturnRefund from './applyReturnRefund/applyReturnRefund.router.js'
import refuseRefund from './refuseRefund/refuseRefund.router.js'
import refuseReturnRefund from './refuseReturnRefund/refuseReturnRefund.router.js'
import agreeReturnRefund from './agreeReturnRefund/agreeReturnRefund.router.js'
import refundSignRemind from './refundSignRemind/refundSignRemind.router.js'
import successRefund from './successRefund/successRefund.router.js'
import signRemind from './signRemind/signRemind.router.js'
import startSendRemind from './startSendRemind/startSendRemind.router.js'
import bigEventRemind from './bigEventRemind/bigEventRemind.router.js'
import payCare from './payCare/payCare.router.js'
import deliverRemind from './deliverRemind/deliverRemind.router.js'
import affirmCare from './affirmCare/affirmCare.router.js'
import clubCardRemind from './clubCardRemind/clubCardRemind.router.js'
import commentRemind from './commentRemind/commentRemind.router.js'
import additionalRemind from './additionalRemind/additionalRemind.router.js'
import additionalCare from './additionalCare/additionalCare.router.js'


export default {
  path: '/care',
  component: index,
  meta: {
    keepAlive: true
  },
  children: [
    {
      path: '',
      component: homepage
    },
    payRemind,
    arriveMyCityRemind,
    firstComment,
    onlyRefund,
    applyReturnRefund,
    refuseRefund,
    refuseReturnRefund,
    agreeReturnRefund,
    refundSignRemind,
    successRefund,
    signRemind,
    startSendRemind,
    bigEventRemind,
    payCare,
    deliverRemind,
    affirmCare,
    clubCardRemind,
    commentRemind,
    additionalRemind,
    additionalCare
  ]
}
