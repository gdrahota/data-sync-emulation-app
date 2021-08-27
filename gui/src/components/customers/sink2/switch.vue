<template>
  <q-toggle
    v-model="value"
    color="green"
    :label="label"
    dense
  />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getSourceEvents: 'customers/getEvents',
      getSwitchState: 'customers/sink2/getConnectedToSource',
      lastReceivedEventId: 'customers/sink2/getLastReceivedEventId',
      intervalInMillis: 'customers/sink2/getIntervalInMillis',
    }),
    value: {
      get() {
        return this.getSwitchState
      },
      set( value ) {
        this.setSwitchState(value)
      },
    },
    label() {
      return this.getSwitchState
        ? 'connected'
        : 'disconnected'
    },
  },

  beforeUnmount() {
    clearInterval(this.interval)
    this.interval = null
  },

  created() {
    if ( !this.interval ) {
      this.interval = setInterval(this.processFirstEvent, this.intervalInMillis)
    }
  },

  data: () => ({
    interval: null,
  }),

  methods: {
    ...mapActions({
      processFirstEvent: 'customers/sink2/processFirstEvent',
    }),
    ...mapMutations({
      addSinkEvent: 'customers/sink2/ADD_EVENT',
      setSwitchState: 'customers/sink2/SET_CONNECTED_TO_SOURCE',
    }),
  },

  watch: {
    getSwitchState( value ) {
      if ( value === true ) {
        const t = this.getSourceEvents

        t.forEach(e => {
          if ( e.id > this.lastReceivedEventId ) {
            this.addSinkEvent(e)
          }
        })
      }
    },
    intervalInMillis() {
      clearInterval(this.interval)
      this.interval = setInterval(this.processFirstEvent, this.intervalInMillis)
    },
  },
}
</script>
