<template>
    <div>
        <div class="p-container">

            <v-row>
                <v-col cols="12" sm="6" lg="3" xl="3">
                    <Hourglass @managePoint="managePoint" house="gryffondor" :points="gryffondorPoints" color="#DF0101" />

                </v-col>
                <v-col cols="12" sm="6" lg="3" xl="3">
                    <Hourglass @managePoint="managePoint" house="serpentard" :points="serpentardPoints" color="#0D6317" />
                </v-col>
                <v-col cols="12" sm="6" lg="3" xl="3">
                    <Hourglass @managePoint="managePoint" house="serdaigle" :points="serdaiglePoints" color="#0101DF" />
                </v-col>
                <v-col cols="12" sm="6" lg="3" xl="3">
                    <Hourglass @managePoint="managePoint" house="poufsouffle" :points="poufsoufflePoints"
                        color="#FCE93E" />
                </v-col>
            </v-row>
        </div>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import Hourglass from '~/components/Hourglass.vue'


export default Vue.extend({
    name: 'GameIndex',
    layout: 'app',
    components: {
        Hourglass
    },
    computed: {
        gryffondorPoints: {
            get() {
                return this.$store.getters.selectedGameYearsSorted[this.$store.state.selectedYear].gryffondor
            },

        },
        serdaiglePoints: {
            get() {
                return this.$store.getters.selectedGameYearsSorted[this.$store.state.selectedYear].serdaigle
            },
        },
        poufsoufflePoints: {
            get() {
                return this.$store.getters.selectedGameYearsSorted[this.$store.state.selectedYear].poufsouffle
            },
        },
        serpentardPoints: {
            get() {
                return this.$store.getters.selectedGameYearsSorted[this.$store.state.selectedYear].serpentard
            },
        }

    },

    data() {
        return {

        }
    },

    methods: {
        // type = "add" or "remove"
        async managePoint(type: string, house: string, points: number) {
            console.log(type)
            console.log(house)
            console.log(points)

            const selectedYear = this.$store.getters.getSelectedYear
            // @ts-ignore
            const currentHousePoints = this[house + 'Points']
            const newTotal = type === "add" ? currentHousePoints + points : currentHousePoints - points
            await this.$fire.firestore.collection('games').doc(this.$store.state.gameSelected.id).update({
                ['years.year' + (selectedYear + 1) + '.' + [house]]: newTotal
            }).then(async () => {
                await this.$store.dispatch('setGameSelected', this.$store.state.gameSelected.id)
            })
        },

    }


})
</script>

  