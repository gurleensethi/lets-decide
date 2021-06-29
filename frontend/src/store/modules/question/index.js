import httpClient from "../../../utils/http-client";

const state = {
  question: null,
};

const mutations = {
  UPDATE_QUESTION: function (state, question) {
    state.question = question;
  },
};

const actions = {
  async createQuestion(context, payload) {
    const { data } = await httpClient.post("/questions", payload, {
      headers: {
        Authorization: context.getters.userId,
      },
    });
    return data;
  },
  async loadQuestion(context, questionId) {
    const { data } = await httpClient.get(`/questions/${questionId}`, {
      headers: {
        Authorization: context.getters.userId,
      },
    });

    context.commit("UPDATE_QUESTION", data);
  },
};

const getters = {
  question: (state) => state.question,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
