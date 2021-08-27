const state = {
  items: {},
  events: [],

  lastReceivedEventId: 0,

  connectedToSource: false,

  numberOfEventsReceived: 0,

  intervalInMillis: 2000,
}

const processFirstEvent = ( { commit, state } ) => {
  if ( state.events.length > 0 ) {
    const firstEvent = state.events[ 0 ]
    commit('UPSERT_ITEM', firstEvent.item)
    commit('REMOVE_EVENT', firstEvent)
  }
}

const actions = {
  processFirstEvent,
}

const ADD_EVENT = ( state, event ) => {
  if ( state.connectedToSource ) {
    const idx = state.events.findIndex(e => e.item.id === event.item.id)

    if ( idx !== -1 ) {
      state.events.splice(idx, 1)
    }

    state.events.push(event)
    state.lastReceivedEventId = event.id

    state.numberOfEventsReceived++
  }
}

const UPSERT_ITEM = ( state, customer ) => {
  state.items[ customer.id ] = customer
}

const REMOVE_EVENT = ( state, event ) => {
  const idx = state.events.findIndex(e => e.id === event.id)
  state.events.splice(idx, 1)
}

const SET_CONNECTED_TO_SOURCE = ( state, value ) => {
  state.connectedToSource = value
}

const SET_INTERVAL = ( state, interval ) => {
  state.intervalInMillis = interval
}

const mutations = {
  UPSERT_ITEM,

  SET_CONNECTED_TO_SOURCE,

  ADD_EVENT,
  REMOVE_EVENT,

  SET_INTERVAL,
}

const getters = {
  getItem: state => id => state.items[ id ] || null,
  getItems: state => state.items,
  getEvents: state => state.events,
  getConnectedToSource: state => state.connectedToSource,
  getLastReceivedEventId: state => state.lastReceivedEventId,
  getNumberOfEventsReceived: state => state.numberOfEventsReceived,
  getIntervalInMillis: state => state.intervalInMillis,
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
