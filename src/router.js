import Vue from 'vue'
import Router from 'vue-router'
import Ledger from '@/components/Ledger.vue'
import ProposeAction from '@/components/ProposeAction.vue'
import Collective from '@/views/Collective.vue'
import User from '@/views/User.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ledger',
      component: Ledger
    },
    {
      path: '/new-action',
      name: 'new-action',
      component: ProposeAction
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
