<template>
    <v-card>
        <v-card-title>{{ game.name }}</v-card-title>
        <v-card-actions>
            <v-btn @click="$emit('selected', game.id)" class="mr-3"> Alohomora </v-btn>
            <v-speed-dial v-model="speedDial" direction="top" transition="slide-y-reverse-transition">
                <template v-slot:activator>
                    <v-btn small v-model="speedDial" dark fab >
                        <v-icon v-if="speedDial">
                            mdi-close
                        </v-icon>
                        <v-icon v-else>
                            mdi-tools
                        </v-icon>
                    </v-btn>
                </template>
                <v-btn fab dark small color="green">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn fab dark small color="red" @click.stop="dialog = true">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-speed-dial>
            <confirm-dialog  v-model="dialog"></confirm-dialog>
        </v-card-actions>
    </v-card>

</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { Game } from 'interfaces/Game'
import ConfirmDialog from '../confirm/ConfirmDialog.vue'



export default Vue.extend({
    name: 'GameCard',
    components: {
        ConfirmDialog
},
    props: {
        game: { type: Object as PropType<Game>, default: {} }
    },
    data: () => ({
        speedDial: false,
        dialog: false

    }),
    methods: {

    }

})
</script>