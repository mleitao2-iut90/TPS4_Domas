import {addHeroeInTeam, createTeam, deleteHeroesInTeam, getAllTeam} from "@/service/team.service";

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
        },
        async addTeamsFromApi({commit}, body) {
            try{
                const result = await createTeam(body)
                const list = await getAllTeam()
                if(result.error === 0){
                    commit('setCurrentTeam', result.data)
                    commit('setListTeams', list.data)
                }
            }catch(e){
                console.log(e, 'erreur teamStore')
            }
        },
        async addMemberInTeam({ commit}, body) {
            try{
                const result = await addHeroeInTeam(body)
                if(result.error === 0){
                    commit('setCurrentTeam', result.data)
                }
            }catch(e){
                console.log(e, 'erreur teamStore')
            }
        },
        async removeMemberInTeam({commit},body){
            try{
                const result = await deleteHeroesInTeam(body)
                if(result.error === 0){
                    commit('setCurrentTeam', result.data)
                }
            }catch(e){
                console.log(e, 'erreur teamStore')
            }
        },
    },
}