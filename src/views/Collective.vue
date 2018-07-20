<template>
  <div class="collective">
    <div v-if="currentCollective">
      <h1>{{ currentCollective.name }}</h1>
      <h2>Creator: {{ userById(currentCollective.creatorId).name }}</h2>
      <button @click="unsetCollective">Unset Collective</button>
    </div>
    <div v-else>
      <CreateCollective />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CreateCollective from '@/components/CreateCollective.vue'

export default {
  name: "collective",
  components: { CreateCollective },
  methods: mapMutations(['unsetCollective']),
  computed: mapGetters(['currentCollective', 'currentUser', 'userById'])
}
</script>
