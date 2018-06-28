<style scoped>



</style>

<template>

<div class="propose-action">
    <form class="ink-form">
        <div class="control-group column-group gutters">
            <label for="action-type" class="all-20 align-right">Type</label>
            <div class="control all-80">
                <select name="action-type" v-model="selectedType">
                    <option v-for="(actionType, index) in actionTypes" :value="index">{{ actionType.type }}</option>
                </select>
                <ActionInputs :actionType="actionTypes[selectedType]" />
            </div>
        </div>
    </form>
</div>

</template>

<script>

//import Vue from 'vue'
import ActionInputs from './ActionInputs.vue'


const actionTypes = [{
    type: "Create User",
    params: {
        name: "string",
        voteCount: "number"
    }
}, {
    type: "Remove Permissions",
    params: {
        name: "string",
        permissions: "list"
    }
}, {
    type: "Assign Permissions",
    params: {
        name: "string",
        permissions: "list"
    }
}, {
    type: "Change Vote Threshold",
    params: {
        voteType: "string",
        newThreshold: "number"
    }
}];


export default {
    name: 'ProposeAction',
    components: { ActionInputs },
    data() {
        return {
          selectedType: 0,
          actionTypes: actionTypes
        }
    },
    methods: {
    }
}

</script>
