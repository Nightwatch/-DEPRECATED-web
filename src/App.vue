<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-if="authenticated"
      v-model="drawer"
      fixed
      clipped
      app
    >

    </v-navigation-drawer>
    <v-toolbar
      color="deep-purple"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon v-if="authenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Natsuki</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px;"></v-layout>
      <v-icon v-if="user">fal fa-user</v-icon>
      <v-avatar size="150" v-if="user">Hello, {{ user.username }}</v-avatar>
      <v-btn outline href="https://natsuki.tk/invite" target="_blank">
        Invite
      </v-btn>
      <v-btn outline v-if="!authenticated" v-on:click="login">
        Login
      </v-btn>
      <v-btn outline v-if="authenticated" v-on:click="logout">
        Logout
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'

const config = require('../settings.json')

const CLIENT_ID = config.CLIENT_ID
const redirect = encodeURIComponent('https://natsuki.tk')

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    authenticated: false,
    code: null,
    accessToken: null,
    user: null
  }),
  created () {
    const token = window.localStorage.getItem('token')
    const user = window.localStorage.getItem('user')
    if (token && user) {
      this.accessToken = token
      this.user = JSON.parse(user)
      this.authenticated = true
    } else if (token) {
      this.fetchUser()
    } else if (!this.accessToken && !this.user && this.$route.query.code) {
      this.code = this.$route.query.code

      this.fetchToken()
    }
  },
  methods: {
    login () {
      window.location = `https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
    },
    logout () {
      window.localStorage.clear()
      this.authenticated = false
      this.user = null
      this.accessToken = null
      this.code = null
    },
    async fetchToken () {
      const response = await axios.get(`https://natsuki.tk/api/auth/token/discord?code=${this.code}&redirect=${redirect}`)

      const json = response.data

      this.accessToken = json.access_token
      this.authenticated = true

      window.localStorage.setItem('token', this.accessToken)

      this.fetchUser()
    },
    async fetchUser () {
      const response = await axios.get('https://discordapp.com/api/users/@me', {headers: {Authorization: `Bearer ${this.accessToken}`}})
      const json = response.data
      this.user = json
      window.localStorage.setItem('user', JSON.stringify(this.user))
      window.location = 'https://natsuki.tk'
    }
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
