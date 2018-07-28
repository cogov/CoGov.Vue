import Vue from 'vue'
import Router from 'vue-router'
import ProposalForm from '@/views/ProposalForm.vue'
import Collective from '@/views/Collective.vue'
import Council from '@/views/Council.vue'

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
      path: '/collective',
      name: 'collective',
      component: Collective
    },
    {
      path: '/council',
      name: 'council',
      component: Council
    }
  ]
})
