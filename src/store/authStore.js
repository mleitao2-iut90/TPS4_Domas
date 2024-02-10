// Vuex Store for Authentication
export default {
    namespaced: true,
    state: () => ({
        loggedIn: false,
    }),
    getters: {
        getLoggedIn(state) {
            return state.loggedIn
        },
    },
    mutations: {
        setLoggedInState(state, toto) {
            state.loggedIn = toto
        },
    },
    actions: {
        async setLoggedIn({ commit }, toto) {
            try{
                commit('setLoggedInState', toto)
            }catch (e) {
                console.error(e, 'erreur')
            }
        },
    }
}