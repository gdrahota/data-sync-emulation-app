<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="width: 90%">
      <div class="row q-col-gutter-none">
        <div class="col-1">
          <customers/>
        </div>
        <div class="col-4">
          <CustomerEvents/>
        </div>
        <div class="col-1">
          <CustomerSinkSwitch/>
        </div>
        <div class="col-4">
          <CustomerSinkEvents/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Customers from '../components/customers/source/customers'
import CustomerEvents from '../components/customers/source/customer-events'
import CustomerSinkSwitch from '../components/customers/sink/switch'
import CustomerSinkEvents from '../components/customers/sink/customer-events'

export default {
  components: {
    Customers,
    CustomerEvents,
    CustomerSinkSwitch,
    CustomerSinkEvents,
  },
}
</script>

<style lang="sass" scoped>
.container
  height: 700px
  overflow-y: auto
</style>
