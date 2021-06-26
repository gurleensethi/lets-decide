import httpClient from "../../../utils/http-client";

const state = {
  userId: null,
};

const mutations = {
  UPDATE_USER_ID: function (state, payload) {
    state.userId = payload;
  },
};

const actions = {
  async resolveUserId(context) {
    let userId = localStorage.getItem("userId");

    if (!userId) {
      // Fetch from network
      const res = await httpClient.get("/users");

      userId = res.data.id;

      localStorage.setItem("userId", userId);
    }

    context.commit("UPDATE_USER_ID", userId);
  },
};

const getters = {
  userId: (state) => state.userId,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
