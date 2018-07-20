<template>
  <tbody>
      <tr>
          <td>
            <button v-if="showActions" @click="showActions=false">-</button>
            <button v-else @click="showActions=true">+</button>
          </td>
          <td>{{ revision.date }}</td>
          <td>{{ revision.name }}</td>
      </tr>
      <tr v-show="showActions" v-for="action in revision.actionGroup" :key="action.id">
        <td>{{ action.id || "=>" }}</td>
        <td>{{ action.selectedType }}</td>
        <td>{{ action.paramsInput }}</td>
      </tr>
  </tbody>
</template>

<script>

import { mapMutations } from 'vuex'
export default {
  props: ['revision'],
  data() {
    return { showActions: false, count: 0 }
  }
}
</script>
