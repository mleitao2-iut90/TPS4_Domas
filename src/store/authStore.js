import {authUser, getAuthUser} from "@/service/auth.service";
//import login from "@/views/Login.vue";

export default {
    namespaced: true,
    state: () => ({
        loggedIn: false,
        responseLogin: null,
        userLogged: null,
        xsrfToken: null,
    }),
    getters: {
        getLoggedIn(state) {
            return state.loggedIn
        },
        getResponseLogin(state) {
            return state.responseLogin
        },
        getUserLogged(state) {
            return state.userLogged
        },
        getXsrfToken(state) {
            return state.xsrfToken
        },
    },
    mutations: {
        setLoggedInState(state, toto) {
            state.loggedIn = toto
        },
        setResponseLoginState(state, toto) {
            state.responseLogin = toto
        },
        setUserLoggedState(state, toto) {
            state.userLogged = toto
        },
        setXsrfTokenState(state, toto) {
            state.xsrfToken = toto
        },
    },
    actions: {
        async setLoggedIn({ commit }, toto) {
            try{
                commit('setLoggedInState', toto)
            }catch (e) {
                console.error(e, 'erreur')
            }
        },
        async login({commit}, user) {
            let response = null;
            try{
                response = await authUser(user)
                console.log(response, 'response')
                if(response.error === 0){
                    commit('setResponseLoginState', response.data)
                    commit('setXsrfTokenState', response.data.xsrfToken)
                    commit('setLoggedInState', true)
                }
                return response
            }catch (e) {
                console.log(e,111)
                return response
            }
        },
        async getUser({commit, state}){
            let response = null;
            try {
                response = await getAuthUser(state.responseLogin.name);
                console.log(response, 51511151)
                if(response.error === 0){
                    commit('setUserLoggedState', response.data)
                }
                console.log(state.userLogged)
            }catch (e) {
                console.error(e, 'erreur')
            }
        }
    }
}