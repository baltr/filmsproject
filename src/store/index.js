import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchQuery: null,
    lastVisitedPage: null,
    lastSelectedCategory: null,
    filmsList: null
  },
  getters: {
    getSearchQuery: state => {
      return state.searchQuery
    },
    getLastVisitedPage: state => {
      return state.lastVisitedPage
    },
    getLastSelectedCategory: state => {
      return state.lastSelectedCategory
    },
    getFilmsList: state => {
      return state.filmsList
    }
  },
  mutations: {
    setSearchQuery(state, payload){
      state.searchQuery = payload
    },
    setLastVisitedPage(state, payload){
      state.lastVisitedPage = payload
    },
    setLastSelectedCategory(state, payload){
      state.lastSelectedCategory = payload
    },
    setFilmsList(state, payload){
      state.filmsList = payload
    },
  },
  actions: {
    fetchBySearchQuery: ({commit}, payload) => {
      commit('setSearchQuery', payload)
      axios.get('https://www.omdbapi.com/?apikey=70a4c343&s=' + payload)
      .then(response => {
        console.log(response)
        commit('setFilmsList', response.data)
      }).catch(response => console.log(response))
    },
    fetchBySelectedCategory: (context, payload) => {
      context.commit('setLastSelectedCategory', payload)
      if (payload === 'All') context.dispatch('fetchBySearchQuery', context.getters.getSearchQuery)
      else{
        axios.get('https://www.omdbapi.com/?apikey=70a4c343&s=' + context.getters.getSearchQuery + '&type=' + payload)
        .then(response => {
          console.log(response)
          context.commit('setFilmsList', response.data)
        }).catch(response => console.log(response))
    }},
    fetchByLastVisitedPage: (context, payload) => {
      context.commit('setLastVisitedPage')
      axios.get('https://www.omdbapi.com/?apikey=70a4c343&s=' + context.getters.getSearchQuery + '&type=' + context.getters.getLastSelectedCategory + '&page=' + payload)
      .then(response => {
        console.log(response)
        context.commit('setFilmsList', response.data)
      }).catch(response => console.log(response))
    },
  }
})
