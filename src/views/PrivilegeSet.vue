

<template>

<div class="privilege-set">
    <div v-if="selectedSet">
        <h1>
      {{ selectedSet.name }}
    </h1>
        <p>Privileges: {{ selectedSet.privileges }}</p>
        <button @click="viewSet(null)">View All Privilege Sets</button>
        <hr>
    </div>
    <div v-else>
        <h2 v-if="privilegeSets.length">Select Privilege Set</h2>
        <ul>
            <li v-for="privilegeSet in privilegeSets" :key="privilegeSet.id">
                <button @click="viewSet(privilegeSet)">{{ privilegeSet.name }}</button>
            </li>
        </ul>
    </div>

    <h2>
    <span v-if="selectedSet">Edit</span>
    <span v-else>New</span>
    Privilege Set
    <button v-if="showForm" @click="showForm=false">-</button>
    <button v-else @click="showForm=true">+</button>
  </h2>

    <form v-show="showForm" class="ink-form" @submit.prevent="onSubmit">
        <div class="ink-grid">
            <div class="control-group column-group gutters">
                <label for="pset-name" class="all-20">Name</label>
                <div class="control all-60">
                    <input type="text" v-model="psetName">
                </div>
            </div>
            <button @click.prevent="addPrivilege">Add Privilege</button>
            <div class="control-group column-group gutters" v-for="privilege in privileges">
              <label for="action-type" class="all-20">Type</label>
              <select class="all-60" name="action-type" v-model="privilege.selectedType" required>
                  <option v-for="(_, actionType) in actionTypes" :value="actionType">
                      {{ actionType }}
                  </option>
              </select>
            </div>
            <br />
            <input type="submit" value="submit">
        </div>
    </form>
</div>

</template>

<script>

import {
    mapMutations,
    mapGetters,
    mapState
}
from 'vuex'

export default {
    name: 'privilege-set',
    components: {},
    data() {
        return {
            psetName: "",
            selectedSet: null,
            showForm: false,
            privileges: [{ selectedType: null }]
        }
    },
    methods: {
        ...mapMutations(['setCollective', 'unsetCollective', 'submitCollective', 'submitPrivilegeSet']),
        addPrivilege() {
          this.privileges.push({selectedType: null})
        },
        viewSet(privilegeSet) {
            this.selectedSet = privilegeSet
        },
        onSubmit() {
          this.submitPrivilegeSet({name: this.psetName, privileges: this.privileges})
          this.showForm = false
        }
    },
    computed: {
        ...mapState({
            privilegeSets: state => state.system.privilegeSets,
            actionTypes: state => state.system.actionTypes
        })
    }
}

</script>
