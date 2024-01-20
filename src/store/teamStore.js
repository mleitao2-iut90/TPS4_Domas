export default {
    namespaced: true,
    state: () => ({
        listTeams: [],
        currentTeam: null,
    }),
    getters: {
        getListTeams(state) {
            return state.listTeams
        },
        getCurrentTeam(state) {
            return state.currentTeam
        },
    },
    mutations: {
        setListTeams(state, list) {
            state.listTeams = list
        },
        setCurrentTeam(state, team) {
            state.currentTeam = team
        },
    },
    actions: {

    },
}