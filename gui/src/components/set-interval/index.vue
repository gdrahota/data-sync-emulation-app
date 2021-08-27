<template>
  <q-slider
    v-model="sliderValue"
    :min="500"
    :max="5000"
    :step="500"
    color="primary"
    label-always
    :label-value="label"
    class="q-ma-lg"
  />
</template>

<script>
export default {
  computed: {
    sliderValue: {
      get() {
        return this.value
      },
      set( value ) {
        this.$emit('setValue', value)
      },
    },
    label() {
      return this.value + ' ms'
    },
  },

  props: {
    value: {
      type: Number,
      default: 1000,
    },
  },
}
</script>
