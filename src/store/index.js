import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig.js')

Vue.use(Vuex)

// handle page reload (reoading the page is going to empty our store. This resets the data in this instance!
fb.auth.onAuthStateChanged(user => {
  if (user) {
      store.commit('setCurrentUser', user)
      store.dispatch('fetchUserProfile')
      store.dispatch('fetchFriendRequests', user.uid )
      // REALTIME //keep an eye on database for changes in your name
      const dbObjectRef = fb.db.ref().child(`/users/${user.uid}`)
      dbObjectRef.on('value', snap => store.commit('setUserProfile', snap.val()))
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    friendRequests: {}
  },
  mutations: {
      setCurrentUser(state, val) {
      state.currentUser = val
    },
      setUserProfile(state, val) {
      state.userProfile = val
    },
    setFriendRequests(state, val) {
      state.friendRequests = val
    },
  },

  actions: {
    // clear data on logout
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})

  },
    // we use 'once' to fetch simple data thats not going to change
    fetchUserProfile({ commit, state }) {
      fb.db.ref(`/users/${state.currentUser.uid}`).once('value').then(res => {
          commit('setUserProfile', res.val())
      }).catch(err => {
        console.log(err)
      })
    },

    updateProfile({ state }, data) {
      let name = data.name
      let email = data.email
      fb.db.ref(`/users/${state.currentUser.uid}`).update({ name, email }).then(user => {
        console.log('user:', user)
      }).catch(err => {
          console.log(err)
      })
    },


    fetchFriendRequests({ commit }, data) {
      // REALTIME // get friend requests where the ID beongs to the current user
      let requestsRef = fb.db.ref('requests');
        requestsRef.orderByChild('recieverUID').equalTo(data).on('value', snap => {
          commit('setFriendRequests', snap.val())
        })
    }
  },

  // const dbObjectRef = fb.db.ref().child(`/users/${user.uid}`)
  //     dbObjectRef.on('value', snap => store.commit('setUserProfile', snap.val()))

  modules: {
  }
})


