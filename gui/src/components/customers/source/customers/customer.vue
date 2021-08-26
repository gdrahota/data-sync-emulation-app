<template>
  <q-item clickable :class="customer.bgColor || 'GuiDo'">
    <q-item-section>
      <q-item-label>{{ customer.id }}) {{ customer.name }}: {{ customer.score }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getCustomer: 'customers/getItem',
    }),
    customer() {
      return this.getCustomer(this.customerId)
    },
  },

  methods: {
    ...mapActions({
      setScore: 'customers/setScore',
      setBgColor: 'customers/setBgColor',
    }),
    resetColor() {
      this.setBgColor({
        id: this.customerId,
        bgColor: null,
      })
    },
  },

  props: {
    customerId: Number,
  },

  watch: {
    'customer.bgColor'() {
      setTimeout(this.resetColor, 1000)
    },
  },
}
</script>
