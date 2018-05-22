import memberManage from './memberManage'
import homepage from './homepage/homepage'
const memberList = () => import('./memberList/memberList')
import greyList from './greyList/greyList'
import blackList from './blackList/blackList'
const createMemberGrade = () => import('./createMemberGrade/createMemberGrade')
export default {
  path: '/memberManage',
  component: memberManage,
  children: [
    {
      path: '/memberManage/home',
      component: homepage
    },
    {
      path: '/memberManage/memberList',
      component: memberList
    },
    {
      path: '/memberManage/greyList',
      component: greyList
    },
    {
      path: '/memberManage/blackList',
      component: blackList
    },
    {
      path: '/memberManage/createMemberGrade',
      component: createMemberGrade
    }
  ]
}
