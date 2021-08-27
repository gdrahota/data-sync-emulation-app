<template>
  <q-item clickable :class="[customer.bgColor, isInSync ? 'bg-green-3' : 'bg-red-3']">
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
      getSourceCustomer: 'customers/getItem',
    }),
    sourceCustomer() {
      return this.getSourceCustomer(this.customer.id)
    },
    isInSync() {
      return this.sourceCustomer.score === this.customer.score
    },
  },

  methods: {
    ...mapActions({
      setScore: 'customers/setScore',
      setBgColor: 'customers/setBgColor',
    }),
    resetColor() {
      this.setBgColor({
        id: this.customer.id,
        bgColor: null,
      })
    },
  },

  props: {
    customer: Object,
  },

  watch: {
    'customer.bgColor'() {
      setTimeout(this.resetColor, 1000)
    },
  },
}
</script>
