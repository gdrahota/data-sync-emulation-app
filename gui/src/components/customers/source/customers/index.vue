<template>
  <div class="container">
    <q-list bordered>
      <q-item>
        Kunden-Scores
      </q-item>
      <q-separator/>

      <template v-for="customer of customerList" :key="customer.id">
        <customer
          :customerId="customer.id"
          v-ripple
        />
        <q-separator/>
      </template>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

import Customer from '../customers/customer'

const names = [ 'Mike', 'Guido', 'Peter', 'Helmut', 'Rolf', 'Pascal', 'Robert', 'Susanne', 'Heike', 'Gerhard' ]

export default defineComponent({
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
      this.interval = setInterval(this.recalculateScore, 1000)
    }
  },

  computed: {
    ...mapGetters({
      customerList: 'customers/getItems',
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

      this.setBgColor({
        id,
        bgColor: 'bg-blue-2',
      })

      this.setScore({
        id,
        score: Math.ceil(Math.random() * 100),
      })
    },
  },
})
</script>

<style lang="sass" scoped>
.container
  height: 700px
  overflow-y: auto
</style>
