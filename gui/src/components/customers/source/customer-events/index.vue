<template>
  <div class="container">
    <q-list bordered>
      <q-item>
        {{ customerEvents.length }} Kunden-Events
      </q-item>
      <q-separator/>

      <template v-for="customerId of customerEvents" :key="customerId">
        <q-item>
          <q-item-label>{{ customerId }}</q-item-label>
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
      customerEvents: 'customers/getSourceEvents',
    }),
  },
})
</script>

<style lang="sass" scoped>
.container
  height: 700px
  overflow-y: auto
</style>
