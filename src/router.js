import Vue from 'vue'
import Router from 'vue-router'
import ProposalForm from '@/views/ProposalForm.vue'
import Collective from '@/views/Collective.vue'
import User from '@/views/User.vue'
import Revisions from '@/components/Revisions.vue'
import Proposals from '@/views/Proposals.vue'

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
      path: '/proposals',
      name: 'proposals',
      component: Proposals
    },
    {
      path: '/collective',
      name: 'collective',
      component: Collective
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
