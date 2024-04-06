import {getAliases, getHerosById} from "@/service/hero.service";

export default {
    namespaced: true,
    state: () => ({
        listAliasHeros: [],
        currentHeros: null,
        showModifHero: false,
    }),
    getters: {
        getListAliasHeros(state) {
            return state.listAliasHeros
        },
        getCurrentHeros(state) {
            return state.currentHeros
        },
        getShowModifHero(state) {
            return state.showModifHero
        },
    },
    mutations: {
        setListAliasHeros(state, list) {
            state.listAliasHeros = list
        },
        setCurrentHeros(state, heros) {
            state.currentHeros = heros
        },
        setShowModifHero(state, heros) {
            state.showModifHero = heros
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
        async showModifHero({commit}, id_hero){
            try {
                await getHerosById({_id: id_hero})
                commit('setShowModifHero', true)
            }catch (e) {
                console.error(e, 'erreur')
            }
        }
    },
}