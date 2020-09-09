export const state = () => ({
   mainPosts: [],
});

export const mutations = {
    addMainPost(state, payload){
        state.mainPosts.unshift(payload);
    },
    removeMainPost(state, payload){
      const index = state.mainPosts.findIndex(v => v.id === payload.id);
      state.mainPosts.splice(index, 1);
    },
    addComment(state, payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.postId);      // 해당 게시글 찾기
        state.mainPosts[index].Comments.unshift(payload);           // 그 게시글에 댓글을 추가
    }
};

export const actions = {
    add({commit}, payload){
        //서버에 게시글 등록 요청 보냄
        commit('addMainPost', payload);
    },
    remove({commit}, payload){
        commit('removeMainPost', payload);
    },
    addComment({ commit }, payload){
        commit('addComment', payload);
    },
};