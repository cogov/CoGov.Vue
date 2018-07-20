<style scoped>



</style>

<template>

<div class="action">
    <label for="action-type">Type</label>
    <select name="action-type" v-model="action.selectedType" required>
        <option v-for="(_, actionType) in actionTypes" :value="actionType">
            {{ readableVar(actionType) }}
        </option>
    </select>
    <div v-for="(ptype, param) in actionTypes[action.selectedType]">
        <label for="param">{{ readableVar (param) }}</label>
        <input v-if="ptype == 'string'" type="text" v-model="action.paramsInput[param]">
        <input v-else-if="ptype == 'number'" type="number" v-model.number="action.paramsInput[param]">
    </div>
</div>

</template>

<script>

import {
    mapGetters, mapState
}
from 'vuex'

export default {
    name: 'Action',
    props: ["action"],
    components: {},
    methods: {
        readableVar(param) {
            return param
                .replace(/([A-Z])/g, ' $1') // Space before all caps
                .replace(/^./, function(str) {
                    return str.toUpperCase()
                }) // Capitalize first char
        }
    },
    computed: mapState(['actionTypes']),
    created() {
      this.action.paramsInput = this.action.paramsInput || {}
    }
}

</script>
