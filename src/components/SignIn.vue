<template>
  <div class="signin">
    <ul>
      <li v-for="(user, id) in users" :key="id">
        <button @click="signInUser(id)">{{ user.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'signin',
  methods: mapMutations(['signInUser']),
  computed: mapState(['users'])
}
</script>
