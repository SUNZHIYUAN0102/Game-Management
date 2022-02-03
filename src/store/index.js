import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        gameList: []
    },
    mutations: {
        getGame(state, data) {
            state.gameList = data
        },

        addGame(state, data) {
            data.id = Symbol()
            state.gameList.push(data)
        },

        removeGame(state, id) {
            var item = state.gameList.find(item => item.id === id)
            var index = state.gameList.indexOf(item)
            state.gameList.splice(index, 1)
        }
    },
    actions: {},
    modules: {}
})