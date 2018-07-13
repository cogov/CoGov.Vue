

<template>

<div class="create-collective">
    <form class="ink-form" @submit.prevent="onSubmit">
        <div class="ink-grid">
          <div class="control-group column-group gutters">
            <label for="collective-name" class="all-20">Name</label>
            <div class="control all-60">
                <input type="text" v-model="collectiveName">
            </div>
          </div>
          <div class="control-group column-group gutters">
            <label for="admin-name" class="all-20">Admin User</label>
            <div class="control all-60">
                <input type="text" v-model="adminName">
            </div>
          </div>
        </div>
        <input type="submit" value="submit">
    </form>
</div>

</template>

<script>

import { mapMutations } from 'vuex'

export default {
    name: 'create-collective',
    components: {},
    data() {
        return {
            collectiveName: "",
            adminName: ""
        }
    },
    methods: {
      ...mapMutations(['createCollective']),
      onSubmit() {
        this.createCollective({
          adminName: this.adminName,
          collectiveName: this.collectiveName
        })
        this.collectiveName = ""
        this.adminName = ""
      }
    }
}

</script>
