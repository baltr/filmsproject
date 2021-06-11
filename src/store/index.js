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
      state.activePage = 1
    },
    setItemList(state, payload){
      state.itemList = payload
    },
    pushToCachedLists(state, payload){
      state.cachedLists.push(payload)
    }
  },
  actions: {
    fetchSearchResults(context){
      const activeCategory = context.getters.getActiveCategory
      const categoryToSearch = activeCategory === 'All' ? '' : activeCategory
      axios.get(`https://www.omdbapi.com/?apikey=70a4c343&s=${context.getters.getSearchQuery}&type=${categoryToSearch}&page=${context.getters.getActivePage}`)
      .then(response => {
        context.commit('setItemList', response.data)
      }).catch(response => context.commit('setItemList', response))
    }
  }
})
