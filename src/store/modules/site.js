export default {
  state: {
    name: 'Natsuki Dashboard',
    url: '',
    description: 'Web interface for the Natsuki Discord bot.',
    sideMenuActive: false
  },
  mutations: {
    setSite(state, data) {
      const { name, description, sideMenuActive } = data
      for (let k in data) {
        const value = data[k]
        if(typeof value === 'undefined') {
          continue
        }
        state[k] = value
      }
    }
  },
  actions: {
    fetchSite({ commit }) {
      commit('setSite', {
        name: 'Natsuki Dashboard',
        url: 'https://natsuki.tk'
      })
    }
  }
}