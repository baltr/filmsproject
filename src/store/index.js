import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchQuery: null,
    lastVisitedPage: null,
    lastSelectedCategory: null,
    filmsList: null,
    url: 'https://www.omdbapi.com/?apikey=70a4c343&s='
  },
  getters: {
    getFilmsList: state => {
      return state.filmsList
    },
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
    setUrl(state, payload){
      state.url = payload
    }
  },
  actions: {
    changeSearchQuery({context}, payload){
      this.commit('setSearchQuery', payload)
      this.dispatch('changeUrl')
    },
    changeSelectedCategory({context}, payload){
      this.commit('setLastSelectedCategory', payload)
      this.dispatch('changeUrl')
    },
    changeLastVisitedPage({context}, payload){
      this.commit('setLastVisitedPage', payload)
      this.dispatch('changeUrl')
    },
    changeUrl({context}){
      this.state.url = 'https://www.omdbapi.com/?apikey=70a4c343&s='
      this.state.url += this.state.searchQuery
      if (this.state.lastSelectedCategory && this.state.lastSelectedCategory !== 'All') this.state.url += '&type=' + this.state.lastSelectedCategory
      if (this.state.lastVisitedPage) this.state.url += '&page=' + this.state.lastVisitedPage
      this.dispatch('fetchFilms')
    },
    fetchFilms({context}){
      axios.get(this.state.url)
      .then(response => {
        this.commit('setFilmsList', response.data)
      }).catch(response => console.log(response))
    }
  }
})
