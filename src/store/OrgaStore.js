import {getAllOrgs, addOrg, getOrgById} from "@/service/org.service"

export default {
    namespaced: true,
    state: () => ({
        mdpOrganisation: '',
        listOrganisations: [],
        currentOrganisation: null,
        showDialogAdd: false,
    }),
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
        setShowDialogAddState(state, organisation) {
            state.showDialogAdd = organisation
        },
    },
    actions: {
        async setMdpOrganisation({ commit }, mdp) {
            try{
                commit('setMdpOrganisationState', mdp)
            }catch (e) {
                console.error(e, 'erreur')
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
                    commit('setCurrentOrganisationState', orga.data)
                    await this.getListOrgaFromApi()
                }
            }
            catch (err){
                console.log(err, 'erreur')
            }
        },
        async getOrgaByIdApi({commit, state}, id) {
            let orga;
            try{
                const body = {org_secret: state.mdpOrganisation, body: {_id: id}}
                orga = await getOrgById(body)
                if( orga.error === 0){
                    commit('setCurrentOrganisationState', orga.data)
                }
                return orga.data[0]
            }catch (e) {
                console.log(e, 'erreur')
                return orga.data
            }
        }
    }
}