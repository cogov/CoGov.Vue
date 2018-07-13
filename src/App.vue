<style>

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

</style>

<template>

<div id="app">
    <NavBar />
    <img src="./assets/logo.png">
    <router-view></router-view>
</div>

</template>

<script>

import NavBar from './components/NavBar.vue'
import Ledger from './components/Ledger.vue'
import ProposeAction from './components/ProposeAction.vue'


export default {
    name: 'app',
    components: {
        NavBar,
        Ledger,
        ProposeAction,
    },
    data() {
        return {
        }
    }
}

</script>
