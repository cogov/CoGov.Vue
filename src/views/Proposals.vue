<style scoped>
</style>

<template>

<div class="proposals">
    <h1>Proposals</h1>
    <table class="ink-table alternating hover bordered">
        <thead>
            <tr>
                <th>Proposal</th>
                <th>Name</th>
                <th>Date</th>
            </tr>
        </thead>
        <ProposalRow v-for="(proposal, index) in proposals" :proposal="proposal" :key="index" />
    </table>
</div>

</template>

<script>

import ProposalRow from '@/components/ProposalRow.vue'
import { mapState } from 'vuex'

export default {
    name: 'Proposals',
    components: { ProposalRow },
    computed: mapState(['proposals'])
}

</script>
