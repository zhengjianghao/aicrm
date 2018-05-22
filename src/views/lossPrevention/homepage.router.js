import index from './index.vue'
import homepage from './homepage.vue'
import badAttitude from './badAttitude/badAttitude.router.js'
import delayDelivering from './delayDelivering/delayDelivering.router.js'
import refund from './refund/refund.router.js'
import fakeSuspect from './fakeSuspect/fakeSuspect.router.js'
import disquality from './disquality/disquality.router.js'
import cheatBehavior from './cheatBehavior/cheatBehavior.router.js'
import disprice from './disprice/disprice.router.js'
import promiseNocash from './promiseNocash/promiseNocash.router.js'
import expectedgap from './expectedgap/expectedgap.router.js'
import logisticsProblem from './logisticsProblem/logisticsProblem.router.js'
import expresSout from './expresSout/expresSout.router.js'
import noSendRefund from './noSendRefund/noSendRefund.router.js'
import returnRefund from './returnRefund/returnRefund.router.js'
import notransferRecord from './notransferRecord/notransferRecord.router.js'
import transferReeor from './transferReeor/transferReeor.router.js'

export default {
  path: '/lossPrevention',
  component: index,
  meta: {
    keepAlive: true
  },
  children: [
    {
      path: '',
      component: homepage
    },
    refund,
    delayDelivering,
    badAttitude,
    fakeSuspect,
    disquality,
    cheatBehavior,
    disprice,
    promiseNocash,
    expectedgap,
    logisticsProblem,
    expresSout,
    noSendRefund,
    returnRefund,
    notransferRecord,
    transferReeor
  ]
}
