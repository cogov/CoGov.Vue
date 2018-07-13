<template>
  <div class="user">
    <div v-if="currentUser">
      {{ currentUser.name }}
      <button @click="signOutUser">Sign Out</button>
    </div>
    <div v-else>
      <SignIn />
    </div>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { SignIn },
  methods: mapMutations(['signOutUser']),
  computed: mapGetters(['currentUser'])
}
</script>
