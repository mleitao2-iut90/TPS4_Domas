import {getAllTeam} from "@/service/team.service";

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
        async getListTeamsFromAPi({commit}){
            try{
                const result = await getAllTeam()
                if(result.error === 0){
                    commit('setListTeams', result.data)
                }
            }catch (e) {
                console.log(e,'erreur')
            }
        }
    },
}