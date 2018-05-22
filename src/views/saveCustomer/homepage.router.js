import index from './index.vue'
import homepage from './homepage.vue'
import juhuasuanSave from './juhuasuanSave/juhuasuanSave.router.js'
import saveGradeActivity from './saveGradeActivity/saveGradeActivity.router.js'
import attitudeLoss from './attitudeLoss/attitudeLoss.router.js'
import apologyLetter from './apologyLetter/apologyLetter.router.js'
import sameNew from './sameNew/sameNew.router.js'
import phoneExcuse from './phoneExcuse/phoneExcuse.router.js'
import giftAndLetter from './giftAndLetter/giftAndLetter.router.js'
import emailExcuse from './emailExcuse/emailExcuse.router.js'
import seasonalNew from './seasonalNew/seasonalNew.router.js'
import updataNew from './updataNew/updataNew.router.js'
import partsNew from './partsNew/partsNew.router.js'
import expandNew from './expandNew/expandNew.router.js'
import pptRedeem from './pptRedeem/pptRedeem.router.js'
import tqgRedeem from './tqgRedeem/tqgRedeem.router.js'
import outherBigActiv from './outherBigActiv/outherBigActiv.router.js'

export default {
  path: '/saveCustomer',
  component: index,
  meta: {
    keepAlive: true
  },
  children: [
    {
      path: '',
      component: homepage
    },
    juhuasuanSave,
    saveGradeActivity,
    attitudeLoss,
    apologyLetter,
    sameNew,
    phoneExcuse,
    giftAndLetter,
    emailExcuse,
    seasonalNew,
    updataNew,
    partsNew,
    expandNew,
    pptRedeem,
    tqgRedeem,
    outherBigActiv
  ]
}
