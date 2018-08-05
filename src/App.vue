<style>
@import './assets/css/foundation.css';

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


export default {
    name: 'app',
    components: {
        NavBar
    },
    data() {
        return {
        }
    }
}

</script>
