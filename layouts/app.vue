<template>
    <v-app dark>
        <v-app-bar fixed app>
            <h1 class="ma-auto">Wizards House War </h1>
            <template v-slot:extension>
                <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                    <v-tab v-for="item in items" :key="item.id">
                        {{ item.label }}
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
        <v-main class="main">
            <v-container>
                <nuxt />
            </v-container>
        </v-main>
        <v-footer class="justify-space-between">
            <v-btn plain @click="$router.push('/quidditch')">Quidditch</v-btn>
            <v-btn plain @click="$router.push('/')">Retour aux parties</v-btn>

            <v-btn @click="logout()" color="red darken-2" plain>
                <v-icon>mdi-logout</v-icon>
            </v-btn>

        </v-footer>
    </v-app>
</template>
<script lang="ts">
import Vue from 'vue'




export default Vue.extend({
    name: 'AppLayout',
    components: {
    },
    data() {
        return {
            items: [
                { id: 'year1', label: 'Année 1' },
                { id: 'year2', label: 'Année 2' },
                { id: 'year3', label: 'Année 3' },
                { id: 'year4', label: 'Année 4' },
                { id: 'year5', label: 'Année 5' },
                { id: 'year6', label: 'Année 6' },
                { id: 'year7', label: 'Année 7' },
            ]
        }
    },
    computed: {
        tab: {
            get() {
                return this.$store.getters.getSelectedYear
            },
            set(v) {
                this.$store.commit('SELECT_YEAR', v)
            }
        },
        user() {
            return this.$store.getters.getUser
        },
        game() {
            return this.$store.getters.getGameSelected
        },
        selectedYear() {
            return this.$store.getters.getSelectedYear
        }
    },
    mounted() {

    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout')

        },
        selectYear(e: any) {
            console.log("CHANGGGGGE")
            console.log(e.index)
            this.$store.commit('SELECT_YEAR', e.index)
        }

    }
})
</script>
<style lang="scss" scoped>
.main {
    align-items: center;
}
</style>