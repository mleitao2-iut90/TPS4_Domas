export default {
    namespaced: true,
    state: () => ({
        listALiasHeros: [],
        currentHeros: null,
    }),
    getters: {
        getListAliasHeros(state) {
            return state.listALiasHeros
        },
        getCurrentHeros(state) {
            return state.currentHeros
        },
    },
    mutations: {
        setListAliasHeros(state, list) {
            state.listALiasHeros = list
        },
        setCurrentHeros(state, heros) {
            state.currentHeros = heros
        },
    },
    actions: {

    },
}