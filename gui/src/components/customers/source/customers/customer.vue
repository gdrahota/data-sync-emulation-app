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
      interval: 'customers/getIntervalInMillis',
    }),
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
      setTimeout(this.resetColor, this.interval)
    },
  },
}
</script>
