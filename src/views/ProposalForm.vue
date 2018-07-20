

<template>

<div class="proposal">
    <Revisions v-if="proposal.revisions.length" :revisions="proposal.revisions" />
    <h2 v-if="proposal.revisions.length">Edit Proposal</h2>
    <h2 v-else>New Proposal</h2>
    <form class="ink-form" @submit.prevent="submitProposal(proposal)">
        <label for="proposal-name">Proposal Name</label>
        <input type="text" v-model="proposal.name">

        <Action v-for="(action, id) in proposal.actionGroup" :key="id" :action="action" />
        <br />
        <button @click.prevent="proposal.actionGroup.push({})">Add Action</button>
        <button @click.prevent="proposal.actionGroup = []">Clear Actions</button>
        <input type="submit" value="SUBMIT!">
    </form>
</div>

</template>

<script>

import Action from '@/components/Action.vue'
import Revisions from '@/components/Revisions.vue'

import {
    mapMutations
}
from 'vuex'

export default {
    name: 'ProposalForm',
    props: {
        proposal: {
            type: Object,
            default: function() {
              console.log("Inserted Default")
                return {
                    actionGroup: [],
                    revisions: [],
                    name: ''
                }
            }
        }
    },
    components: {
        Action, Revisions
    },
    methods: mapMutations(['submitProposal'])
}

</script>
