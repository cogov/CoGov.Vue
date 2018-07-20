

<template>

<div class="signin">
    <div class="column-group">
        <div class="all-20">
            <h2>Sign In</h2></div>
        <div class="all-60">
            <ul>
                <li v-for="(user, id) in users" :key="id">
                    <button @click="signInUser(id)">{{ user.name }}</button>
                </li>
            </ul>
        </div>
    </div>
    <hr />
    <div class="column-group">
        <div class="all-20">
            <h2>Register</h2>
        </div>
        <div class="all-60">
            <form class="ink-form" @submit.prevent="registerUser(newUserName)">
                <input type="text" v-model="newUserName">
                <input type="submit" value="Register">
            </form>
        </div>
    </div>
</div>

</template>

<script>

import {
    mapState, mapMutations
}
from 'vuex'

export default {
    name: 'signin',
    data() {
        return {
            newUserName: ""
        }
    },
    methods: {
        ...mapMutations(['signInUser', 'registerUser'])
    },
    computed: mapState(['users'])
}

</script>
