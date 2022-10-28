<template>
  <v-app dark>
    <v-app-bar fixed app>
      <h1 class="ma-auto">Wizards House War</h1>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <v-btn v-if="$store.state.user" plain @click="logout()">Déconnexion</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

    }
  },
  methods: {
    async logout() {
            await this.$store.dispatch('logout')

        },
  }
}
</script>
