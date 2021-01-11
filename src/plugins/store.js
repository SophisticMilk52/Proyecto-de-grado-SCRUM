import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: "",
      name: "",
      tsscGroup: ""
    }
  },
  mutations: {
    login(state, payload) {
      state.currentUser.id = payload.id;
      state.currentUser.name = payload.name;
      state.currentUser.tsscGroup = payload.tsscGroup.id;
      localStorage.setItem('userId', payload.id);
      localStorage.setItem('username', payload.name);
      localStorage.setItem('userGroup', payload.tsscGroup.id);
    },
    logout(state){
      state.currentUser.id = "";
      state.currentUser.name = "";
      state.currentUser.tsscGroup = "";
      localStorage.clear();
    },
    initializeStore(state){
      if(localStorage.getItem('userId') != undefined && localStorage.getItem('userId') != null){
        console.log("LoSto activated")
        state.currentUser.id = localStorage.getItem('userId')
        state.currentUser.name = localStorage.getItem('username')
        state.currentUser.tsscGroup = localStorage.getItem('userGroup')
        console.log("user:",state.currentUser.name)
      }
    }
  },
  actions: {

  },
  getters: {
    currentParticipant(state){
      console.log("The state has user: " + state.currentUser.name + " with id " + state.currentUser.id);
    },
    isLoggedIn: state => !!state.currentUser.id
  }

})
