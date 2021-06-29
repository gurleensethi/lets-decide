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
    const res = await httpClient
      .get(`/questions/${questionId}`, {
        headers: {
          Authorization: context.getters.userId,
        },
      })
      .catch((err) => err);

    if (!(res instanceof Error)) {
      context.commit("UPDATE_QUESTION", res.data);
      return { isError: false, data: res.data };
    } else {
      return { isError: true, message: res.response.data.message };
    }
  },
  async voteForQuestion(context, voteId) {
    const res = await httpClient.put(
      `/questions/${context.state.question.id}/vote/${voteId}`,
      null,
      {
        headers: {
          Authorization: context.getters.userId,
        },
      }
    );

    return res;
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
