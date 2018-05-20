export default {
  state: {
    authenticated: false,
    user: null,
    accessToken: null
  },
  mutations: {
    setAuth (state, data) {
      state.user = data.user
      state.accessToken = data.accessToken
      state.authenticated = data.authenticated
      localStorage.setItem('auth', JSON.stringify(data))
    }
  },
  actions: {
    getAuth({commit}) {
      let auth = {}
      try {
        auth = JSON.parse(localStorage.getItem('auth') || '{}')
      } catch (e) {
        auth = {
          authenticated: false,
          user: null,
          accessToken: null
        }
      }
      commit('setAuth', auth)
    }
  }
}
