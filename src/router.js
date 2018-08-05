import Vue from 'vue'
import Router from 'vue-router'
import ProposalForm from '@/views/ProposalForm.vue'
import CreateCollective from '@/views/CreateCollective.vue'
import Collectives from '@/views/Collectives.vue'
import Council from '@/views/Council.vue'
import Members from '@/views/Members.vue'
import PrivilegeSet from '@/views/PrivilegeSet.vue'
import Person from '@/views/Person.vue'

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
      path: '/collectives',
      name: 'collectives',
      component: Collectives
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
      path: '/person',
      name: 'person',
      component: Person
    },
    {
      path: '/members',
      name: 'members',
      component: Members
    }
  ]
})
