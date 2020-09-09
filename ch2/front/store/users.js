export const state = () => ({
    me: null,
    followList: [],
    followingList: [],
});

export const mutations = {
  setMe(state, payload){
      state.me = payload;
  },
    changNickname(state, payload){
      state.me.nickname = payload.nickname;
    }
};

export const actions = {
    signUp({ commit, dispatch, state, rootState, getters, rootGetters }, payload){
        // 서버에 회원가입 요청을 보내는 부분
        commit('setMe', payload);
    },
    logIn({ commit }, payload){
        commit('setMe', payload);
    },
    logOut({ commit }, payload){
        commit('setMe', null);
    },
    changeNickname({ commit, }, payload){
        commit('changNickname', payload);
    }
};