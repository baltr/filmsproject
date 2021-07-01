import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchQuery: '',
    activePage: 1,
    activeCategory: 'All',
    itemList: null,
    cachedLists: null,
  },
  getters: {
    getSearchQuery: state => {
      return state.searchQuery
    },
    getItemList: state => {
      return state.itemList
    },
    getActiveCategory: state => {
      return state.activeCategory
    },
    getActivePage: state => {
      return state.activePage
    },
    getCachedLists: state => {
      return state.cachedLists
    }
  },
  mutations: {
    setSearchQuery(state, payload){
      state.searchQuery = payload
      state.cachedLists = null
    },
    setActivePage(state, payload){
      state.activePage = payload
    },
    setActiveCategory(state, payload){
      state.activeCategory = payload
      state.cachedLists = null
      state.activePage = 1
    },
    setItemList(state, payload){
      state.itemList = payload
    },
    setCachedLists(state, payload){
      state.cachedLists = payload
    },
    pushToCachedLists(state, payload){
      state.cachedLists.push({list: payload, page: state.activePage})
    }
  },
  actions: {
    fetchSearchResults(context){
      const cachedLists = context.getters.getCachedLists
      const activePage = context.getters.getActivePage
      const activeCategory = context.getters.getActiveCategory
      const categoryToSearch = activeCategory === 'All' ? '' : activeCategory
      if (cachedLists && cachedLists.find(cachedLists => {
        return cachedLists.page === activePage
      })) context.commit('setItemList', cachedLists.find(cachedLists => {
        return cachedLists.page === activePage
      }).list)
      else {
        axios.get(`https://www.omdbapi.com/?apikey=70a4c343&s=${context.getters.getSearchQuery}&type=${categoryToSearch}&page=${activePage}`)
        .then(response => {
          if (!cachedLists) context.commit('setCachedLists', [{list: response.data, page: activePage}])
          else context.commit('pushToCachedLists', response.data)
          context.commit('setItemList', response.data)
        }).catch(response => context.commit('setItemList', response))
      }
    }
  }
})
