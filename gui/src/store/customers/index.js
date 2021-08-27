import sink1 from './sink1'
import sink2 from './sink2'

const state = {
  items: {},

  eventCounter: 0,
  events: [],

  intervalInMillis: 2000,
}

const add = ( { commit }, customer ) => {
  commit('ADD_ITEM', customer)
  addEvent({ commit, state }, customer.id)
}

const setScore = ( { commit, state }, { id, score } ) => {
  commit('SET_SCORE', { id, score })
  addEvent({ commit, state }, id)
}

const setBgColor = ( { commit }, { id, bgColor } ) => {
  commit('SET_BG_COLOR', { id, bgColor })
}

const actions = {
  add,
  setScore,
  setBgColor,
}

const addEvent = ( { commit, state }, customerId ) => {
  const event = {
    id: state.eventCounter,
    item: { ...state.items[ customerId ], bgColor: undefined },
  }

  commit('ADD_EVENT', event)
  commit('sink1/ADD_EVENT', event)
  commit('sink2/ADD_EVENT', event)
  commit('RAISE_EVENT_COUNTER')
}

const RAISE_EVENT_COUNTER = state => {
  state.eventCounter++
}

const ADD_ITEM = ( state, customer ) => {
  state.items[ customer.id ] = customer
}

const SET_SCORE = ( state, { id, score } ) => {
  state.items[ id ].score = score
}

const SET_BG_COLOR = ( state, { id, bgColor } ) => {
  state.items[ id ] = { ...state.items[ id ], bgColor }
}

const ADD_EVENT = ( state, event ) => {
  const idx = state.events.findIndex(e => e.item.id === event.item.id)
  if ( idx !== -1 ) {
    state.events.splice(idx, 1)
  }

  state.events.push(event)
}

const SET_INTERVAL = ( state, interval ) => {
  state.intervalInMillis = interval
}

const mutations = {
  ADD_ITEM,
  SET_SCORE,
  SET_BG_COLOR,

  ADD_EVENT,
  RAISE_EVENT_COUNTER,

  SET_INTERVAL,
}

const getters = {
  getItem: state => id => state.items[ id ],
  getItems: state => state.items,
  getEvents: state => state.events,
  getEventCounter: state => state.eventCounter,
  getIntervalInMillis: state => state.intervalInMillis,
}

export default {
  namespaced: true,
  modules: {
    sink1,
    sink2,
  },
  state,
  actions,
  mutations,
  getters,
}
