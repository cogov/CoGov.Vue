<style scoped>
</style>

<template>

<div class="proposals">
    <table class="ink-table alternating hover bordered">
        <thead>
            <tr>
                <th>Proposal</th>
                <th>Name</th>
                <th>Date</th>
            </tr>
        </thead>
        <ProposalRow v-for="(proposal, index) in councilProposals" :proposal="proposal" :key="index" />
    </table>
</div>

</template>

<script>

import ProposalRow from '@/components/ProposalRow.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'Proposals',
    components: { ProposalRow },
    computed: mapGetters(['councilProposals'])
}

</script>
