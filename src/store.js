import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    apiUrl: "https://api.edamam.com/search"
  },
  mutations: {
    setRecipes(state, payload) {
      state.recipes = payload;
    }
  },
  actions: {
    async getRecipes({ state, commit }, plan) {
      try {
        let response = await axios.get(`${state.apiUrl}`, {
          params: {
            q: plan,
            app_id: "e017118d",
            app_key: "741e87e8f3cc7f07b5f9565acebe29f4",
            from: 0,
            to: 9
          }
        });
        commit("setRecipes", response.data.hits);
      } catch (error) {
        commit("setRecipes", []);
      }
    }
  }
});
