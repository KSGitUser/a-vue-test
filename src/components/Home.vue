<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 v-if="!loading">
        <List-of-agents />
        <!-- <New-department /> -->
      </v-flex>
      <v-flex v-else>
        <v-progress-circular indeterminate color="primary" class="text-xs-center"></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ListOfAgents from '@/components/agents/ListOfAgents'
  //import NewDepartment from '@/components/departments/NewDepartment'

  export default {
    data() {
      return {}
    },
    components: {
      ListOfAgents,
      //  NewDepartment,
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      }
    }

  }
</script>