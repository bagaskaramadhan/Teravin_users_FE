import axios from 'axios'
import { URL } from '../../helpers/env'

const state = () => {
  return {
    users: []
  }
}

const getters = {
  getAllUser (state) {
    return state.users
  }
}

const mutations = {
  SET_ALL_USERS (state, payload) {
    state.users = payload
  }
}

const actions = {
  getUsers (context) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}getall`)
        .then((response) => {
          context.commit('SET_ALL_USERS', response.data.data)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
