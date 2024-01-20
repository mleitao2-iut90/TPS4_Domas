import Vue from 'vue'
import Vuex from 'vuex'
import herosStore from "@/store/herosStore";
import orgaStore from "@/store/OrgaStore";
import teamStore from "@/store/teamStore";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    herosStore,
    orgaStore,
    teamStore,
  }
})
