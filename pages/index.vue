<template>

    <div>
        <v-btn color="dark" @click="openDialog" class="mx-6">Créer une partie</v-btn>

        <v-row class="mt-8">
            <v-col v-for="game, index in games" :key="game.id" cols="12" sm="6" lg="4" xl="3">
                <spell-card-game :game="game" :spell="spells[index % spells.length]" @deleteGame="deleteGame(game.id)"
                    @click="selectGame(game.id)"></spell-card-game>
            </v-col>

        </v-row>
        <v-dialog v-model="display" max-width="390">
            <v-card>
                <v-card-title>
                    Créer une nouvelle partie
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <div class="field">
                            <div class="p-float-label">
                                <v-text-field :counter="20" label="Nom de la partie :" id="name"
                                    v-model="newGame.name" />
                            </div>
                        </div>
                        <div class="field">
                            <div class="p-float-label">
                                <v-text-field label="Description :" id="description" v-model="newGame.description" />
                            </div>
                        </div>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="closeDialog"> Annuler </v-btn>
                    <v-btn @click="setNewGame"> Créer</v-btn>
                </v-card-actions>

            </v-card>

        </v-dialog>
    </div>

</template>
  
<script lang="ts">
import Vue from 'vue'
import { Game, SpellsOrder } from '~/interfaces/Game'
import GameCard from '~/components/cards/Game.vue'
import SpellCardGame from '~/components/cards/spells/SpellCardGame.vue'

export default Vue.extend({
    name: 'IndexPage',
    middleware: ['auth'],
    components: {
        GameCard,
        SpellCardGame,

    },
    computed: {
        spells() {
            return SpellsOrder

        }
    },
    data() {

        return {
            games: [] as Game[],
            display: false,
            newGame: {
                name: '',
                description: '',
            }


        }
    },
    mounted() {
        this.getGames()

    },
    methods: {
        async setNewGame() {
            await this.$fire.firestore.collection('games').add({
                name: this.newGame.name,
                description: this.newGame.description,
                years: {
                    year1: {
                        name: 'Année 1',
                        gryffondor: 0,
                        serpentard: 0,
                        poufsouffle: 0,
                        serdaigle: 0,
                        nbMatchs: 0
                
                    },
                    year2: {
                        name: 'Année 2',
                        gryffondor: 0,
                        serpentard: 0,
                        poufsouffle: 0,
                        serdaigle: 0,
                        nbMatchs: 0,
                    },
                    year3: {
                        name: 'Année 3',
                        gryffondor: 0,
                        serpentard: 0,
                        poufsouffle: 0,
                        serdaigle: 0,
                        nbMatchs: 0,
                    },
                    year4: {
                        name: 'Année 4',
                        gryffondor: 0,
                        serpentard: 0,
                        poufsouffle: 0,
                        serdaigle: 0,
                        nbMatchs: 0,
                    },
                    year5: {
                        name: 'Année 5',
                        gryffondor: 0,
                        serpentard: 0,
                        poufsouffle: 0,
                        serdaigle: 0,
                        nbMatchs: 0
                    },
                    year6: {
                        name: 'Année 6',
                        gryffondor: 0,
                        serpentard: 0,
                        poufsouffle: 0,
                        serdaigle: 0,
                        nbMatchs: 0
                    },
                    year7: {
                        name: 'Année 7',
                        gryffondor: 0,
                        serpentard: 0,
                        poufsouffle: 0,
                        serdaigle: 0,
                        nbMatchs: 0
                    }
                }
            })
            this.display = false
            this.getGames()

        },

        async getGames() {
            const games = await this.$store.dispatch('getGames')
            this.games = games as Game[]
        },
        async selectGame(id: string) {
            await this.$store.dispatch('setGameSelected', id)
            this.$router.push({ path: 'game' })
        },
        openDialog() {
            this.display = true
        },
        closeDialog() {
            this.display = false

        },
        async deleteGame(id: string) {
            await this.$fire.firestore.collection('games').doc(id).delete()
            this.getGames()

        }


    }
})
</script>
  
<style lang="scss" scoped>

</style>