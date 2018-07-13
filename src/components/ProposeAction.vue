<style scoped>



</style>

<template>

<div class="propose-action">
    <form class="ink-form" @submit.prevent="onSubmit">
        <div class="column-group gutters">
            <div class="control-group">
                <label for="action-type" class="all-20">Type</label>
                <div class="control all-60">
                    <select name="action-type" v-model="selectedType" required>
                        <option v-for="(_, actionType) in actionTypes" :value="actionType">{{ readableVar(actionType) }}</option>
                    </select>
                </div>
            </div>

            <div class="action-input" v-if="selectedType">
                <div class="control-group" v-for="(ptype, param) in actionTypes[selectedType]">
                    <label for="param" class="all-20">{{ readableVar(param) }}</label>
                    <div class="control all-60">
                        <input v-if="ptype == 'string'" type="text" v-model="paramsInput[param]">
                        <input v-else-if="ptype == 'number'" type="number" v-model.number="paramsInput[param]">
                    </div>
                </div>
                <input type="submit" value="Submit">
            </div>
        </div>
    </form>
</div>

</template>

<script>

//import Vue from 'vue'

export default {
    name: 'ProposeAction',
    components: {},
    data() {
        return {
            selectedType: null,
            actionTypes: this.$store.state.actionTypes,
            paramsInput: {}
        }
    },
    methods: {
        readableVar(param) {
                return param
                    .replace(/([A-Z])/g, ' $1') // Space before all caps
                    .replace(/^./, function(str) {
                        return str.toUpperCase()
                    }) // Capitalize first char
            },
            onSubmit() {
              this.$store.commit({
                type: 'addAction',
                actionType: this.selectedType,
                actionParams: this.paramInput
              })
              this.selectedType = null
              this.paramsInput = {}
            }
    },
    computed: {}
}

</script>
