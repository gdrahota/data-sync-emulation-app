<template>
  <div class="container">
    <q-list bordered>
      <q-item>
        {{ sinkEventList.length }} Ziel-Events
      </q-item>
      <q-separator/>

      <template v-for="event of sinkEventList" :key="event">
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
      sinkEventList: 'customers/getSinkEvents',
    }),
  },
}
</script>
