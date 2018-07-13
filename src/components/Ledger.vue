<template>
  <div class="ledger">
    <h1>Action/Vote Ledger</h1>
    <table class="ink-table alternating hover bordered">
      <thead>
        <tr>
          <th>Action ID</th>
          <th>Date/User</th>
          <th>Action</th>
          <th>Params</th>
          <th>Threshold</th>
          <th>Votes</th>
          <th>Status</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="action in $store.state.ledger"
          :key="action.actionId">
          <td>{{ action.id }}</td>
          <td>{{ action.date }}</td>
          <td>{{ action.actionType }}</td>
          <td>{{ action.actionParams }}</td>
          <td>{{ action.threshold }}</td>
          <td>{{ action.votesMade }}</td>
          <td>{{ action.status }}</td>
          <td>{{ action.notes }}</td>
          <td>{{ action.voteActions }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Ledger',
  props: {
    msg: String
  },
  data() {
    return {
      ledger: [
        {
          actionId: 1003,
          date: new Date(),
          action: 'Hire Startbutton.com to build website',
          threshold: '33% of 100%',
          votesMade: [0, 1, 2, 3],
          status: 'Open',
          notes: 'MSG',
          voteActions: []
        },
        {
          actionId: 1002,
          date: new Date(),
          action: 'Change Vote Threshold',
          threshold: '100% of 100%',
          votesMade: [0, 1, 0, 1],
          status: 'Executed!',
          notes: '',
          voteActions: []
        },
        {
          actionId: 1001,
          date: new Date(),
          actions: 'Remove Permission',
          threshold: '',
          votesMade: [],
          status: 'Executed!',
          notes: 'PA',
          voteActions: []
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
