import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    status: [],
    allStatus: [],
    refreshStatus: ''
  },
  mutations: {
    changeLoginStatus (state) {
      state.isLogin = true
    },
    logout (state) {
      state.isLogin = false
    },
    pushAllStatus (state, payload) {
      state.status = []
      payload.forEach(status => {
        state.status.push(status)
        state.allStatus.push(status)
      })
    },
    search (state, payload) {
      state.status = []
      let data = state.allStatus
      let tempArr = []
      let filter = new RegExp(`${payload}`, 'i')
      for (let i = 0; i < data.length; i++) {
        if (filter.test(data[i].status)) {
          tempArr.push(data[i])
        }
      }
      state.status = tempArr
    },
    refreshData (state) {
      if (state.refreshStatus) {
        state.refreshStatus = false
      } else {
        state.refreshStatus = true
      }
    },
    showMyTweets (state, payload) {
      state.status = []
      state.status = payload
    }
  },
  actions: {
    changeLoginStatus (context) {
      context.commit('changeLoginStatus')
    },
    logout (context) {
      context.commit('logout')
    },
    sendAllStatus (context, payload) {
      context.commit('pushAllStatus', payload)
    },
    search (context, payload) {
      context.commit('search', payload)
    },
    refreshData (context) {
      context.commit('refreshData')
    },
    showMyTweets (context, payload) {
      context.commit('showMyTweets', payload)
    }
  }
})
