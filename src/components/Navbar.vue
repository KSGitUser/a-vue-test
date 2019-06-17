<template>
  <div>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="(link, i) in links" :key="i" :to="link.url">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar app dark color="teal lighten-3">
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">
          Ajax-test-Vue
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout class="hidden-sm">
        <v-text-field v-model="search" label="Интерактивный поиск по имени, фамилии, департаменту" single-line
          hide-details @keyup="keyPressed">

        </v-text-field>
        <v-flex align-self-end>
          <v-icon @click="iconSearchClick">search</v-icon>
        </v-flex>
      </v-layout>


      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="(link, i) in links" :key="i" :to="link.url" flat>
          <v-icon left>{{ link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <router-view></router-view>

    </v-content>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sideNav: false,
        search: ''
      }
    },
    methods: {

      iconSearchClick() {
        if (this.search !== '') {
          if (this.$route !== '/') {
            this.$root.$emit('keyPressed', this.search)
            this.$router.push(`/?search=${this.search}`)
          }
        }

      },
      keyPressed(event) {
        this.$root.$emit('keyPressed', this.search)
        if (event.key == "Enter") {
          this.iconSearchClick()
        }
      }
    },

    computed: {
      links() {
        return [{
            title: 'Новый риэлтор',
            icon: 'person_add',
            url: '/new-agent'
          },
          {
            title: 'Список риэлторов',
            icon: 'list',
            url: '/'
          }
        ]
      }
    },
  }
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>