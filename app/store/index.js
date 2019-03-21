import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  logined: false
}

const getters = {
  isLogin(state) {
    return state.logined;
  }
}
const actions = {
  changeLoginAction(context, status) {
    context.commit('changeLogin', status)
  },
}
const mutations = {
  changeLogin(state, status) {
    state.logined = status
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

export default store;