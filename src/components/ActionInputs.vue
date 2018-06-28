<style scoped>
</style>

<template>
<div class="action-inputs">
  <div class="column-group gutters">
    <div class="control-group" v-for="(ptype, param) in params">
      <label for="param" class="all-20 align-right">{{ param }}</label>
      <div class="control all-80">
        <input v-if="ptype == 'string'" type="text">
        <input v-else-if="ptype == 'number'" type="number">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ActionInputs',
  props: { actionType: Object },
  data() {
    return {
    }
  },
  computed: {
    params() {
      return this.actionType.params
    }
  }
}
</script>
