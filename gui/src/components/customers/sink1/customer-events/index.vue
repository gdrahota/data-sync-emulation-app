<template>
  <div class="container">
    <q-list bordered>
      <q-item>
        Events received: {{ numberOfEventsReceived }}, Event queue: {{ eventList.length }}
      </q-item>
      <q-separator/>

      <template v-for="event of eventList" :key="event">
        <q-item>
          <q-item-label>
            {{ event }}
          </q-item-label>
        </q-item>
        <q-separator/>
      </template>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      eventList: 'customers/sink1/getEvents',
      numberOfEventsReceived: 'customers/sink1/getNumberOfEventsReceived',
    }),
  },
}
</script>
