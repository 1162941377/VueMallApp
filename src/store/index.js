import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.prototype.$api = api;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideLists: [],
    showContent: false,
    goodsList: [],
    type: null,
    size: 5,
    counterMap: {},
  },
  mutations: {
    setSidesList(state, list) {
      state.sideLists = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((state.counterMap[id] === 1 && value === -1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, value + state.counterMap[id]);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    async getSideLists({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideBar(type);
      commit('setSidesList', value);
      commit('setShowContent', true);
    },
    async getGoodsList({ state, commit }, options) {
      const type = options.type || state.type;
      commit('setGoodsType', type);
      const { size } = state;
      const { page, sortType } = options;
      const { list, total } = await api.getGoodsList(type, page, size, sortType);
      commit('setGoodsList', list);
      if (total > state.goodsList.length) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
