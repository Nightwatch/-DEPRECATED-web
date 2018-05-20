<template>
  <v-app id="inspire" dark>
    <v-side-menu></v-side-menu>
    <v-header></v-header>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import Header from './components/Header'
import SideMenu from './components/SideMenu'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    'v-header': Header,
    'v-side-menu': SideMenu
  },
  computed: {
    ...mapState(['auth', 'site'])
  },
  data: () => ({

  }),
  created () {
    this.$store.dispatch('fetchSite')
  }
}
</script>

<style>
#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
