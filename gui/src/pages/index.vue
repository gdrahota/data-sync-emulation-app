<template>
  <q-page class="flex">
    <div class="q-pa-md" style="width: 100%">
      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-list bordered>
            <q-item style="height: 50px">
              <q-item-section class="text-bold">
                Source
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-4">
          <q-list bordered>
            <q-item style="height: 50px">
              <q-item-section class="text-bold">
                Consumer 1
              </q-item-section>
              <q-item-section>
                <customer-sink1-switch/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-4">
          <q-list bordered>
            <q-item style="height: 50px">
              <q-item-section class="text-bold">
                Consumer 2
              </q-item-section>
              <q-item-section>
                <customer-sink2-switch/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <q-list bordered>
            <q-item style="height: 65px">
              <q-chip
                color="primary"
                outline
                square
                class="q-mt-md"
              >
                Change Interval:
                <q-icon name="info" size="20px" class="q-pl-sm">
                  <q-tooltip :delay="400" :offset="[0, -60]">
                    <div class="tooltip-format">
                      Data changes are simulated. Some random record will be changed every {{ sourceIntervalInMillis }} ms.
                    </div>
                  </q-tooltip>
                </q-icon>
              </q-chip>
              <set-interval
                :value="sourceIntervalInMillis"
                @setValue="setSourceInterval"
              />
            </q-item>
          </q-list>
        </div>
        <div class="col-4">
          <q-list bordered>
            <q-item style="height: 65px">
              <q-chip
                color="primary"
                outline
                square
                class="q-mt-md"
              >
                Processing time:
                <q-icon name="info" size="20px" class="q-pl-sm">
                  <q-tooltip :delay="400" :offset="[0, -60]">
                    <div class="tooltip-format">
                      Event processed is being simulated to consume {{ target1IntervalInMillis }} ms.
                    </div>
                  </q-tooltip>
                </q-icon>
              </q-chip>
              <set-interval
                :value="target1IntervalInMillis"
                @setValue="setTarget1Interval"
              />
            </q-item>
          </q-list>
        </div>
        <div class="col-4">
          <q-list bordered>
            <q-item style="height: 65px">
              <q-chip
                color="primary"
                outline
                square
                class="q-mt-md"
              >
                Processing time:
                <q-icon name="info" size="20px" class="q-pl-sm">
                  <q-tooltip :delay="400" :offset="[0, -60]">
                    <div class="tooltip-format">
                      Event processed is being simulated to consume {{ target2IntervalInMillis }} ms.
                    </div>
                  </q-tooltip>
                </q-icon>
              </q-chip>
              <set-interval
                :value="target2IntervalInMillis"
                @setValue="setTarget2Interval"
              />
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="row q-col-gutter-sm">
        <div class="col-4">
          <div class="row q-col-gutter-none">
            <div class="col-3">
              <customers/>
            </div>
            <div class="col-9">
              <CustomerEvents/>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row q-col-gutter-none">
            <div class="col-3">
              <CustomersSink1/>
            </div>
            <div class="col-9">
              <CustomerSink1Events/>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class="row q-col-gutter-none">
            <div class="col-3">
              <CustomersSink2/>
            </div>
            <div class="col-9">
              <CustomerSink2Events/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import SetInterval from '../components/set-interval'

import Customers from '../components/customers/source/customers'
import CustomerEvents from '../components/customers/source/customer-events'

import CustomerSink1Events from '../components/customers/sink1/customer-events'
import CustomersSink1 from '../components/customers/sink1/customers'
import CustomerSink1Switch from '../components/customers/sink1/switch'

import CustomerSink2Events from '../components/customers/sink2/customer-events'
import CustomersSink2 from '../components/customers/sink2/customers'
import CustomerSink2Switch from '../components/customers/sink2/switch'

export default {
  components: {
    SetInterval,

    Customers,
    CustomerEvents,

    CustomerSink1Switch,
    CustomerSink1Events,
    CustomersSink1,

    CustomerSink2Switch,
    CustomerSink2Events,
    CustomersSink2,
  },

  computed: {
    ...mapGetters({
      sourceIntervalInMillis: 'customers/getIntervalInMillis',
      target1IntervalInMillis: 'customers/sink1/getIntervalInMillis',
      target2IntervalInMillis: 'customers/sink2/getIntervalInMillis',
    }),
  },

  methods: {
    ...mapMutations({
      setSourceInterval: 'customers/SET_INTERVAL',
      setTarget1Interval: 'customers/sink1/SET_INTERVAL',
      setTarget2Interval: 'customers/sink2/SET_INTERVAL',
    }),
  },
}
</script>

<style lang="sass" scoped>
.tooltip-format
  font-size: 16px
</style>
