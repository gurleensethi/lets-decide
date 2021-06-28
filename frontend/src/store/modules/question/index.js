import httpClient from "../../../utils/http-client";

const state = {};

const mutations = {};

const actions = {
  async createQuestion(context, payload) {
    const { data } = await httpClient.post("/questions", payload, {
      headers: {
        Authorization: context.getters.userId,
      },
    });
    return data;
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
