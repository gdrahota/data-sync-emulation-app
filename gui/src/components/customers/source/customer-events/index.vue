<template>
  <div class="container">
    <q-list bordered>
      <q-item>
        Total events: {{ eventCounter }}, Event queue: {{ events.length }}
      </q-item>
      <q-separator/>

      <template v-for="event of events" :key="event.item.id">
        <q-item>
          <div class="text-caption">{{ event }}</div>
        </q-item>
        <q-separator/>
      </template>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters({
      eventCounter: 'customers/getEventCounter',
      events: 'customers/getEvents',
    }),
  },
})
</script>

<style lang="sass" scoped>
.container
  height: 700px
  overflow-y: auto
</style>
