import Vue from 'vue'
import Vuex from 'vuex'
import herosStore from "@/store/herosStore";
import orgaStore from "@/store/OrgaStore";
import teamStore from "@/store/teamStore";
import authStore from "@/store/authStore";
import errors from "@/store/errors";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    herosStore,
    orgaStore,
    teamStore,
    authStore,
    errors,
  }
})
