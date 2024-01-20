import {getAllOrgs} from "@/service/org.service";

export default {
    namespaced: true,
    state: () => ({
        mdpOrganisation: null,
        listOrganisations: [],
        currentOrganisation: null,    }),
    getters: {
        getmdpOrganisation(state) {
            return state.mdpOrganisation
        },
        getListOrganisations(state) {
            return state.listOrganisations
        },
        getCurrentOrganisation(state) {
            return state.currentOrganisation
        },
    },
    mutations: {
        setMdpOrganisation(state, mdp) {
            state.mdpOrganisation = mdp
        },
        setListOrganisations(state, list) {
            state.listOrganisations = list
        },
        setCurrentOrganisation(state, organisation) {
            state.currentOrganisation = organisation
        },
    },
    actions: {
        async setMdpOrganisation({ commit }, mdp) {
            try{
                //todo: appel API pour verif si bon mdp
                commit('setMdpOrganisation', mdp)
                return true;
            }catch (e) {
                console.log(e, 'erreur')
                return false;
            }
        },
        async getListOrgaFromApi({ commit }) {
            try{
                const orga = await getAllOrgs()
                if (orga.error === 0) {
                    commit('setListOrganisations', orga.data)
                }
            }catch (e) {
                console.log(e, 'erreur')
            }
        }
    },
}