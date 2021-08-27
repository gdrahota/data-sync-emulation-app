<template>
  <div class="container">
    <q-list bordered>
      <q-item>
        Customers
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
import { mapGetters } from 'vuex'

import Customer from './customer'

export default {
  components: {
    Customer,
  },

  computed: {
    ...mapGetters({
      customerList: 'customers/sink1/getItems',
    }),
  },
}
</script>
