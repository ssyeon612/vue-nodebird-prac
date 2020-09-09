export const state = () => ({
    me: null,
    followerList: [{
        id: 1,
        nickname: '제로초',
    }, {
        id: 2,
        nickname: '네로',
    }, {
        id: 3,
        nickname: '히어로',
    }],
    followingList: [{
        id: 1,
        nickname: '제로초',
    }, {
        id: 2,
        nickname: '네로',
    }, {
        id: 3,
        nickname: '히어로',
    }],
});

export const mutations = {
  setMe(state, payload){
      state.me = payload;
  },
    changNickname(state, payload){
      state.me.nickname = payload.nickname;
    },
    addFollower(state, payload){
        state.followerList.push(payload);
    },
    addFollowing(state, payload){
        state.followingList.push (payload);             // 팔로워 목록 추가
    },
    removeFollower(state, payload){
        const index = state.followerList.findIndex( v => v.id === payload.id);
        state.followerList.splice(index, 1);
    },
    removeFollowing(state, payload){
      const index = state.followingList.findIndex( v => v.id === payload.id);
        state.followingList.splice(index, 1);
    },

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
    },
    addFollower({ commit }, payload){
        commit('addFollower', payload);
    },
    addFollowing({ commit }, payload){
        commit('addFollowing', payload);
    },
    removeFollower({ commit }, payload){
        commit('removeFollower', payload);
    },
    removeFollowing({ commit }, payload){
        // 비동기 요청
        commit('removeFollowing', payload);
    },
};