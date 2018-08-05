import Vue from 'vue'
import Router from 'vue-router'
import ProposalForm from '@/views/ProposalForm.vue'
import CreateCollective from '@/views/CreateCollective.vue'
import Collective from '@/views/Collective.vue'
import Council from '@/views/Council.vue'
import Member from '@/views/Member.vue'
import PrivilegeSet from '@/views/PrivilegeSet.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/proposal',
      name: 'proposal',
      component: ProposalForm,
      props: true
    },
    {
      path: '/create-collective',
      name: 'create-collective',
      component: CreateCollective
    },
    {
      path: '/collective',
      name: 'collective',
      component: Collective
    },
    {
      path: '/privilege-set',
      name: 'privilege-set',
      component: PrivilegeSet
    },
    {
      path: '/council',
      name: 'council',
      component: Council
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    }
  ]
})
