<template>
  <div class="person">
    <div v-if="currentPerson">
      {{ currentPerson.name }}
      <button @click="signOut">Sign Out</button>
    </div>
    <div v-else>
      <div>
        <h2>Sign In</h2>
        <li v-for="person in people" :key="person.id">
          <button class="button" @click="signIn(person.id)">{{ person.name }}</button>
        </li>
      </div>
      <div>
        <h2>Register</h2>
        <form @submit.prevent="register(newPerson)">
          <input type="text" v-model="newPerson.name">
          <input type="submit" value="Register">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: { },
  data() {
    return {
      newPerson: {
        name: ""
      }
    }
  },
  methods: mapMutations(['signOut', 'signIn', 'register']),
  computed: {
    ...mapGetters(['currentPerson']),
    ...mapState({
      people: state => state.core.people
    })
  }
}
</script>
