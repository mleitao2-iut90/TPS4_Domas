import {getAllOrgs, addOrg, getOrgById, addTeamsInOrg, deleteTeamInOrg} from "@/service/org.service"

export default {
    namespaced: true,
    state: () => ({
        mdpOrganisation: '',
        listOrganisations: [],
        currentOrganisation: null,
        showDialogAdd: false,

        testAddDialod: false,
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
        setTestAddDialodState(state) {
            state.testAddDialod = !state.testAddDialod
        }
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
                    return orga;
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
                    commit('setCurrentOrganisationState', orga.data[0])
                }
            }catch (e) {
                console.log(e, 'erreur')
            }
        },
        async addTeamsInOrga({ commit, state}, body) {
            try{
                body = {org_secret: state.mdpOrganisation, body: body}
                const result = await addTeamsInOrg(body)
                if(result.error === 0){
                    commit('setCurrentOrganisationState', result.data)
                }
            }catch(e){
                console.log(e, 'erreur teamStore')
            }
        },
        async removeTeamInOrga({commit,state},body){
            try{
                body = {org_secret: state.mdpOrganisation, body: body}
                const result = await deleteTeamInOrg(body)
                if(result.error === 0){
                    commit('setCurrentOrganisationState', result.data)
                }
            }catch(e){
                console.log(e, 'erreur teamStore')
            }
        },
    }
}