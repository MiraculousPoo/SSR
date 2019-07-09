// 状态树
export const state = () => ({
  posts: []
})
export const mutations = {
  getPost(state, index) {
    return state.posts[index]
  },
  addPost(state, post) {
    state.posts.unshift(post)
    if (state.posts.length > 8) {
      state.posts.length = 8
    }

    if (process.browser) {
      localStorage.setItem('posts', JSON.stringify(state.posts))
    }
  },

  delPost(state, index) {
    state.posts.length = 0
    localStorage.removeItem('posts')
  }
}
export const actions = {
  // login({ commit }, data) {
  //   return this.$axios({
  //     url: '/accounts/login',
  //     method: 'POST',
  //     data
  //   }).then((res) => {
  //     commit('setUserInfo', res.data)
  //     Promise.resolve()
  //   })
  // },
  // register({ commit }, data) {
  //   return this.$axios({
  //     url: '/accounts/register',
  //     method: 'POST',
  //     data
  //   }).then((res) => {
  //     commit('setUserInfo', res.data)
  //     Promise.resolve()
  //   })
  // }
}
