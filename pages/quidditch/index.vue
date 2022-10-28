<template>
    <div class="p-container">
        <h1>Quidditch</h1>
        <v-btn @click="display = true"> Créer un match </v-btn>

        <v-row>
            <v-col v-for="match in matchs" :key="match.id" cols="12" sm="6" lg="4" xl="3">
                <match-card :match="match"></match-card>


            </v-col>

        </v-row>


        <v-dialog v-model="display" max-width="490">
            <v-card>
                <v-card-title>
                    Nouveau match
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row align="center">
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select :items="matchSettings.teams" v-model="newMatch.team1" label="Equipe A">
                                </v-select>

                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-select :items="matchSettings.teams" v-model="newMatch.team2" label="Equipe B">
                                </v-select>
                            </v-col>
                        </v-row>
                        <div class="field">
                            <div class="p-float-label">
                                <v-text-field label="Description" id="description" v-model="newMatch.description" />
                            </div>
                        </div>
                        <v-switch v-model="matchSettings.random"
                            :label="matchSettings.random ? 'Je laisse le hasard décider' : 'Je créer le match moi-même'">
                        </v-switch>
                        <v-row v-if="!matchSettings.random" align="center">
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-text-field type="number" v-model="newMatch.team1Points"
                                    :label="newMatch.team1 ? `Points pour ${newMatch.team1}` : 'Selectionnez l\'équipe A'">
                                </v-text-field>

                            </v-col>
                            <v-col class="d-flex" cols="12" sm="6">
                                <v-text-field type="number" v-model="newMatch.team2Points"
                                    :label="newMatch.team2 ? `Points pour ${newMatch.team2}` : 'Selectionnez l\'équipe '">
                                </v-text-field>

                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="display = false"> Annuler </v-btn>
                    <v-btn @click="createMatch"> Créer</v-btn>
                </v-card-actions>

            </v-card>

        </v-dialog>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import MatchCard from '~/components/cards/quidditch/MatchCard.vue'


export default Vue.extend({
    name: 'QuidditchIndex',
    layout: 'app',
    components: {
        MatchCard

    },
    computed: {
        nbMatchs: {
            get() {
                return this.$store.getters.selectedGameYearsSorted[this.$store.state.selectedYear].nbMatchs
            },
        },
        matchs: {
            get() {
                return this.$store.getters.selectedGameYearsSorted[this.$store.state.selectedYear].matchs
            },
        },


    },

    data() {
        return {
            display: false,
            newMatch: {
                team1: undefined,
                team1Points: 0,
                team2: undefined,
                team2Points: 0,
                description: ''

            },
            matchSettings: {
                random: true,
                teams: [
                    'Gryffondor', 'Serdaigle', 'Serpentard', 'Poufsouffle'],

                maxPoints: 350,
                minPoints: 150
            }


        }
    },

    methods: {
        async createMatch() {
            const currentGame = this.$store.state.gameSelected.id
            const currentYear = this.$store.state.selectedYear
            if (this.matchSettings.random) {
                // On défini le vainqueur. 
                const winner = "team" + (Math.floor(Math.random() * 2) + 1);
                var team1pointsVanilla = winner === "team1" ? 150 : 0
                var team2pointsVanilla = winner === "team2" ? 150 : 0
                console.log(winner)

                // On rajoute les points liés aux buts
                this.newMatch.team1Points = team1pointsVanilla === 150 ? (team1pointsVanilla + (Math.floor(Math.random() * 20) * 10)) : (team1pointsVanilla + Math.floor(Math.random() * 35) * 10)
                this.newMatch.team2Points = team2pointsVanilla === 150 ? (team2pointsVanilla + (Math.floor(Math.random() * 20) * 10)) : (team2pointsVanilla + Math.floor(Math.random() * 35) * 10)


            }



            await this.$fire.firestore.collection('games').doc(currentGame).update({
                ['years.year' + (currentYear + 1) + '.matchs.match' + (this.nbMatchs + 1)]: { ...this.newMatch }
            })
            await this.$fire.firestore.collection('games').doc(currentGame).update({
                ['years.year' + (currentYear + 1) + '.nbMatchs']: this.nbMatchs + 1
            }).then(async () => {
                await this.$store.dispatch('setGameSelected', this.$store.state.gameSelected.id)
            })




            this.display = false
            this.newMatch = {
                team1: undefined,
                team1Points: 0,
                team2: undefined,
                team2Points: 0,
                description: ''
            }

        },


    }


})
</script>
<style lang="scss" scoped>

</style>
  