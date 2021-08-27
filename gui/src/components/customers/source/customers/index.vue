<template>
  <div class="container">
    <q-list bordered>
      <q-item>
        Kunden
      </q-item>
      <q-separator/>

      <template v-for="customer of customerList" :key="customer.id">
        <customer
          :customer="customer"
          v-ripple
        />
        <q-separator/>
      </template>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Customer from '../customers/customer'

const names = [ 'Mike', 'Guido', 'Peter', 'Helmut', 'Rolf', 'Pascal', 'Robert', 'Susanne', 'Heike', 'Gerhard' ]

export default {
  beforeUnmount() {
    clearInterval(this.interval)
    this.interval = null
  },

  components: {
    Customer,
  },

  created() {
    for ( let i = 1; i < 11; i++ ) {
      this.addCustomer({
        id: i,
        name: names[ i - 1 ],
        score: 1,
      })
    }

    if ( !this.interval ) {
      this.interval = setInterval(this.recalculateScore, this.intervalInMillis)
    }
  },

  computed: {
    ...mapGetters({
      customerList: 'customers/getItems',
      intervalInMillis: 'customers/getIntervalInMillis',
    }),
  },

  data: () => ({
    interval: null,
  }),

  methods: {
    ...mapActions({
      addCustomer: 'customers/add',
      setScore: 'customers/setScore',
      setBgColor: 'customers/setBgColor',
    }),
    recalculateScore() {
      const id = Math.ceil(Math.random() * 10)

      this.setScore({
        id,
        score: Math.ceil(Math.random() * 100),
      })

      this.setBgColor({
        id,
        bgColor: 'bg-blue-2',
      })
    },
  },

  watch: {
    intervalInMillis() {
      clearInterval(this.interval)
      this.interval = setInterval(this.recalculateScore, this.intervalInMillis)
    },
  },
}
</script>

<style lang="sass" scoped>
.container
  height: calc(100% - 100px)
  overflow-y: auto
</style>
