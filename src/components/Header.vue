<template>
  <v-toolbar
    color="deep-purple"
    dense
    fixed
    clipped-left
    app>
    <v-toolbar-side-icon v-if="auth.authenticated" @click="toggleSideMenu"></v-toolbar-side-icon>
    <v-toolbar-title class="mr-5 align-center">
      <span class="title">Natsuki</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-layout row align-center style="max-width: 650px;"></v-layout>
    <v-icon v-if="auth.user">fal fa-user</v-icon>
    <v-avatar size="150" v-if="auth.user">Hello, {{ auth.user.username }}</v-avatar>
    <v-btn outline href="https://natsuki.tk/invite" target="_blank">
      Invite
    </v-btn>
    <v-btn outline v-if="!auth.authenticated" @click="login">
      Login
    </v-btn>
    <v-btn outline v-if="auth.authenticated" @click="logout">
      Logout
    </v-btn>
  </v-toolbar>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

const { CLIENT_ID, REDIRECT } = require('../../settings.json')
const redirectEncoded = encodeURIComponent(REDIRECT)
export default {
  name: 'Header',
  data: () => ({
    drawer: false,
    code: null
  }),
  created () {
    if (!this.authenticated && this.$route.query.code) {
      const code = this.$route.query.code

      this.fetchToken(code)
      this.$router.push({
        path: '/'
      })
    }
  },
  computed: {
    ...mapState(['auth', 'site'])
  },
  methods: {
    login () {
      window.location = `https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirectEncoded}`
    },
    logout () {
      this.$store.commit('setAuth', {
        user: null,
        authenticated: false,
        accessToken: null
      })
      this.code = null
    },
    async fetchToken (code) {
      const response = await axios.get(`https://natsuki.tk/api/auth/token/discord?code=${code}&redirect=${redirectEncoded}`)
      const json = response.data
      const accessToken = json.access_token
      const user = await this.fetchUser(accessToken)

      this.$store.commit('setAuth', {
        user,
        authenticated: true,
        accessToken
      })
    },
    async fetchUser (accessToken) {
      const response = await axios.get('https://discordapp.com/api/users/@me', {headers: {Authorization: `Bearer ${accessToken}`}})
      return response.data
    },
    toggleSideMenu () {
      this.$store.commit('setSite', {
        sideMenuActive: !this.site.sideMenuActive
      })
    }
  }
}
</script>
