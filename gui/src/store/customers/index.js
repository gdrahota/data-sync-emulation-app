let sourceEventCounter = 0

const state = {
  sourceItems: {},
  sourceEvents: [],

  sinkItems: {},
  sinkEvents: [],
  lastReceivedEventId: 0,

  connectedToSource: false,
}

const add = ( { commit }, customer ) => {
  commit('ADD_SOURCE_ITEM', customer)
}

const setScore = ( { commit }, { id, score } ) => {
  commit('SET_SCORE', { id, score })
  commit('ADD_SOURCE_EVENT', id)
}

const setBgColor = ( { commit }, { id, bgColor } ) => {
  commit('SET_BG_COLOR', { id, bgColor })
}

const processSinkEvent = ( { commit, state } ) => {
  if ( state.sinkEvents.length > 0 ) {
    const latestEvent = state.sinkEvents[ 0 ]
    commit('UPSERT_SINK_ITEM', latestEvent)
    commit('REMOVE_SINK_ITEM', latestEvent)
  }
}

const actions = {
  add,
  setScore,
  setBgColor,
  processSinkEvent,
}

const ADD_SOURCE_ITEM = ( state, customer ) => {
  state.sourceItems[ customer.id ] = customer
}

const SET_SCORE = ( state, { id, score } ) => {
  state.sourceItems[ id ].score = score
}

const SET_BG_COLOR = ( state, { id, bgColor } ) => {
  state.sourceItems[ id ] = { ...state.sourceItems[ id ], bgColor }
}

const ADD_SOURCE_EVENT = ( state, id ) => {
  const idx = state.sourceEvents.findIndex(e => e.item.id === id)
  if ( idx !== -1 ) {
    state.sourceEvents.splice(idx, 1)
  }

  const item = { ...state.sourceItems[ id ] }
  delete item.bgColor

  const event = { id: sourceEventCounter, item }

  state.sourceEvents.push(event)
  sourceEventCounter++

  ADD_SINK_EVENT(state, event)
}

const ADD_SINK_EVENT = ( state, event ) => {
  if ( state.connectedToSource ) {
    const idx = state.sinkEvents.findIndex(e => e.item.id === event.item.id)

    if ( idx !== -1 ) {
      state.sinkEvents.splice(idx, 1)
    }

    state.sinkEvents.push(event)
    state.lastReceivedEventId = event.id
  }
}

const UPSERT_SINK_ITEM = ( state, customer ) => {
  state.sinkItems[ customer.customerId ] = customer
}

const REMOVE_SINK_ITEM = ( state, event ) => {
  const idx = state.sinkEvents.findIndex(e => e.customerId === event.customerId)
  state.sinkEvents.splice(idx, 1)
}

const SET_CONNECTED_TO_SOURCE = ( state, value ) => {
  state.connectedToSource = value
}

const mutations = {
  ADD_SOURCE_ITEM,
  SET_SCORE,
  SET_BG_COLOR,
  ADD_SOURCE_EVENT,
  ADD_SINK_EVENT,
  SET_CONNECTED_TO_SOURCE,
  UPSERT_SINK_ITEM,
  REMOVE_SINK_ITEM,
}

const getters = {
  getItem: state => id => state.sourceItems[ id ],
  getItems: state => state.sourceItems,
  getSourceEvents: state => state.sourceEvents,
  getSinkEvents: state => state.sinkEvents,
  getConnectedToSource: state => state.connectedToSource,
  getLastReceivedEventId: state => state.lastReceivedEventId,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
