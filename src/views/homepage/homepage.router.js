import index from './index.vue'
import homepage from './homepage.vue'
import imm from './immediateMarketing/immediateMarketing.router.js'
import discount from './discount/discount.router.js'
import fullCut from './fullCut/fullCut.router.js'
import buyAandB from './buyAandB/buyAandB.router.js'
import buyAandOther from './buyAandother/buyAandOther.router.js'
import freeShipping from './freeShipping/freeShipping.router.js'
import payMent from './payMent/payMent.router.js'
import orderClosed from './orderClosed/orderClosed.router.js'
import allDouble11 from './allDouble11/allDouble11.router.js'
import addDouble11 from './addDouble11/addDouble11.router.js'
import allBeforeDouble11 from './allBeforeDouble11/allBeforeDouble11.router.js'
import addDouble11Preset from './addDouble11Preset/addDouble11Preset.router.js'
import effictiveDouble11 from './effictiveDouble11/effictiveDouble11.router.js'
import compromiseeDouble11 from './compromiseeDouble11/compromiseeDouble11.router.js'
import focusDouble11 from './focusDouble11/focusDouble11.router.js'
import customizedDouble11 from './customizedDouble11/customizedDouble11.router.js'
import allDouble12 from './allDouble12/allDouble12.router.js'
import addDouble12 from './addDouble12/addDouble12.router.js'
import allBeforeDouble12 from './allBeforeDouble12/allBeforeDouble12.router.js'
import addDouble12Preset from './addDouble12Preset/addDouble12Preset.router.js'
import effictiveDouble12 from './effictiveDouble12/effictiveDouble12.router.js'
import compromiseeDouble12 from './compromiseeDouble12/compromiseeDouble12.router.js'
import focusDouble12 from './focusDouble12/focusDouble12.router.js'
import customizedDouble12 from './customizedDouble12/customizedDouble12.router.js'
import pon from './potentialDemandMarketing/potentialDemandMarketing.router.js'
export default {
  path: '/homepage',
  component: index,
  children: [
    {
      path: '',
      component: homepage
    },
    imm,
    discount,
    fullCut,
    buyAandB,
    buyAandOther,
    freeShipping,
    payMent,
    orderClosed,
    allDouble11,
    addDouble11,
    allBeforeDouble11,
    addDouble11Preset,
    effictiveDouble11,
    compromiseeDouble11,
    focusDouble11,
    customizedDouble11,
    allDouble12,
    addDouble12,
    allBeforeDouble12,
    addDouble12Preset,
    effictiveDouble12,
    compromiseeDouble12,
    focusDouble12,
    customizedDouble12,
    pon,
  ]
}
