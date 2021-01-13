import axios from 'axios'
import { URL } from '../../helpers/env'

const state = () => {
  return {
    users: [],
    detail: []
  }
}

const getters = {
  getAllUser (state) {
    return state.users
  },
  getIdUser (state) {
    return state.detail
  }
}

const mutations = {
  SET_ALL_USERS (state, payload) {
    state.users = payload
  },
  SET_ID_USERS (state, payload) {
    state.detail = payload
  }
}

const actions = {
  getUsers (context) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/users/api/getall`)
        .then((response) => {
          context.commit('SET_ALL_USERS', response.data.data)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  insertUser (context, payload) {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('name', payload.name)
      fd.append('mobile', payload.mobile)
      fd.append('email', payload.email)
      fd.append('address', payload.address)
      axios.post(`${URL}/users/api/insert`, fd)
        .then((result) => {
          // console.log(result.data.message)
          resolve(result.data.message)
          // window.location = '/'
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  deleteUser (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${URL}/users/api/delete/${payload}`)
        .then((result) => {
          resolve(result)
          // console.log(result.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  searchData (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/users/api/getall?name=${payload}`)
        .then((response) => {
          resolve()
          context.commit('SET_ALL_USERS', response.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  },
  getDetail (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/users/api/getbyid/${payload}`)
        .then((result) => {
          context.commit('SET_ID_USERS', result.data.data)
          resolve(result.data.data)
          // console.log(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  updateUser (context, payload) {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('name', payload.name)
      fd.append('mobile', payload.mobile)
      fd.append('email', payload.email)
      fd.append('address', payload.address)
      axios.patch(`${URL}/users/api/update/${payload.id}`, fd)
        .then((result) => {
          // console.log(result)
          // alert(result)
          resolve(result.data)
          // resolve(result.data.message)
        }).catch((err) => {
          console.log(err)
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
