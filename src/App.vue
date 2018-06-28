<style>

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

</style>

<template>

<div id="app">
    <img src="./assets/logo.png">
    <Ledger />
    <ProposeAction />
</div>

</template>

<script>

import Ledger from './components/Ledger.vue'
import ProposeAction from './components/ProposeAction.vue'
import ActionInputs from './components/ActionInputs.vue'


export default {
    name: 'app',
    components: {
        Ledger,
        ProposeAction,
        ActionInputs
    },
    data() {
        return {
        }
    }
}

</script>
