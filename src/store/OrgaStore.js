import {getAllOrgs} from "@/service/org.service"
import {addOrg} from "@/service/org.service";

export default {
    namespaced: true,
    state: () => ({
        mdpOrganisation: '',
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
        setMdpOrganisationState(state, mdp) {
            state.mdpOrganisation = mdp
        },
        setListOrganisationsState(state, list) {
            state.listOrganisations = list
        },
        setCurrentOrganisationState(state, organisation) {
            state.currentOrganisation = organisation
        },
    },
    actions: {
        async setMdpOrganisation({ commit }, mdp) {
            try{
                //todo: appel API pour verif si bon mdp
                commit('setMdpOrganisationState', mdp)
                return true;
            }catch (e) {
                console.error(e, 'erreur')
                return false;
            }
        },
        async getListOrgaFromApi({ commit }) {
            try{
                const orga = await getAllOrgs()
                if (orga.error === 0) {
                    commit('setListOrganisationsState', orga.data)
                }
            }catch (e) {
                console.log(e, 'erreur')
            }
        },
        async addOrgaFromApi({commit}, body) {
            try{
                const orga = await addOrg(body)
                if (orga.error === 0) {
                    commit('setCurrentOrganisation', orga.data)
                }
            }
            catch (err){
                console.log(err, 'erreur')
            }
        }
    }
}