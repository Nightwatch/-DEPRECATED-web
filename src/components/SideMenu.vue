<template>
  <v-navigation-drawer v-if="auth.authenticated"
      v-model="site.sideMenuActive"
      fixed
      clipped
      app>

  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SideMenu',
  computed: {
    ...mapState(['site', 'auth'])
  }
}
</script>