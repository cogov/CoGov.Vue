<style scoped>
</style>

<template>

<div class="revisions">
    <h1>Proposal Revisions</h1>
    <table class="ink-table alternating hover bordered">
        <thead>
            <tr>
                <th>Show Actions</th>
                <th>Date</th>
                <th>Name</th>
            </tr>
        </thead>
        <RevisionRow v-for="(revision, index) in revisions" :revision="revision" :key="index" />
    </table>
</div>

</template>

<script>

import RevisionRow from '@/components/RevisionRow.vue'


export default {
    name: 'Revisions',
    props: ['revisions'],
    components: { RevisionRow }
}

</script>
