import {getAliases, getHerosById} from "@/service/hero.service";

export default {
    namespaced: true,
    state: () => ({
        listAliasHeros: [],
        currentHeros: null,
    }),
    getters: {
        getListAliasHeros(state) {
            return state.listAliasHeros
        },
        getCurrentHeros(state) {
            return state.currentHeros
        },
    },
    mutations: {
        setListAliasHeros(state, list) {
            state.listAliasHeros = list
        },
        setCurrentHeros(state, heros) {
            state.currentHeros = heros
        },
    },
    actions: {
        async getListAliasFromApi({ commit }) {
            try{
                const orga = await getAliases()
                if (orga.error === 0) {
                    commit('setListAliasHeros', orga.data)
                }
            }catch (e) {
                console.log(e, 'erreur')
            }
        },
        async getHeroByIdFromApi({commit},body) {
            try{
                const orga = await getHerosById(body)
                if (orga.error === 0) {
                    commit('setCurrentHeros', orga.data)
                    return orga.data
                }
            }catch (e) {
                console.log(e, 'erreur')
            }
        },
    },
}