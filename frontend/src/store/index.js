import { createStore } from "vuex";
import user from "./modules/user";
import question from "./modules/question";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    question,
  },
});
