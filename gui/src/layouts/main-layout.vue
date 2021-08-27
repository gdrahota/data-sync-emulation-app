<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="info"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>Data Sync Emulation App</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="400"
      :breakpoint="500"
      bordered
      overlay
      class="bg-white"
      elevated
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable @click="toggleLeftDrawer" class="bg-grey-4">
            <q-item-section avatar>
              <q-icon name="fas fa-chevron-up" color="primary"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-primary text-body1">Schließen</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator/>

          <q-item>
            <q-item-section>
              This app simulates the synchronization of customer data from one system to two independent systems.
            </q-item-section>
          </q-item>

          <q-separator/>

          <q-item>
            <q-item-section>
              <q-list bordered>
                <q-item class="bg-blue-2">
                  <q-item-section>
                    <q-item-label>x) A-Za-z: 0-9</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-item-section>
            <q-item-section>Latest been changed</q-item-section>
          </q-item>

          <q-separator/>

          <q-item>
            <q-item-section>
              <q-list bordered>
                <q-item class="bg-red-3">
                  <q-item-section>
                    <q-item-label>x) A-Za-z: 0-9</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-item-section>
            <q-item-section>Entry out of sync</q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-list bordered>
                <q-item class="bg-green-3">
                  <q-item-section>
                    <q-item-label>x) A-Za-z: 0-9</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-item-section>
            <q-item-section>Entry in sync</q-item-section>
          </q-item>

          <q-separator/>

          <q-item>
            <q-item-section>Author:</q-item-section>
            <q-item-section>Guido Drahota</q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data: () => ({
    leftDrawerOpen: false,
  }),

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  },
}
</script>
