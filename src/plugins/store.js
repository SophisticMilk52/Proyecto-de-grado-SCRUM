import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: "",
      name: "",
      tsscGroup: null
    }
  },
  mutations: {
    login(state, payload) {
      state.currentUser.id = payload.id;
      state.currentUser.name = payload.name;
      state.currentUser.tsscGroup = payload.tsscGroup;
    },
    logout(state){
      state.currentUser.id = "";
      state.currentUser.name = "";
      state.currentUser.tsscGroup = null;
    }
  },
  actions: {

  },
  getters: {
    currentParticipant(state){
      console.log("The state has user: " + state.currentUser.name + " with id " + state.currentUser.id);
    }
  }

})
