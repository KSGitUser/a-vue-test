<template>
  <v-container v-if="!loading">
    <v-layout row>
      <v-flex xs12>
        <h1>Home</h1>
        <List-of-agents />
        <New-department />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ListOfAgents from '@/components/agents/ListOfAgents'
  import NewDepartment from '@/components/departments/NewDepartment'

  export default {
    data() {
      return {}
    },
    components: {
      ListOfAgents,
      NewDepartment
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    }

  }
</script>