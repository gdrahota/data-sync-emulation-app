<template>
  <div style="padding: 10px; text-align:center;">
    <div>{{ label }}</div>
    <q-toggle v-model="value" color="green" style="padding-top: 20px"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getSwitchState: 'customers/getConnectedToSource',
      getSourceEvents: 'customers/getSourceEvents',
      lastReceivedEventId: 'customers/getLastReceivedEventId',
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
        ? 'Verbunden'
        : 'Unterbrochen'
    },
  },

  beforeUnmount() {
    clearInterval(this.interval)
    this.interval = null
  },

  created() {
    if ( !this.interval ) {
      this.interval = setInterval(this.processSinkEvent, 1500)
    }
  },

  data: () => ({
    interval: null,
  }),

  methods: {
    ...mapActions({
      processSinkEvent: 'customers/processSinkEvent',
    }),
    ...mapMutations({
      addSinkEvent: 'customers/ADD_SINK_EVENT',
      setSwitchState: 'customers/SET_CONNECTED_TO_SOURCE',
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
  },
}
</script>
