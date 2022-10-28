<template>
    <div class="spell-card">
        <div class="spell-card__inner">
            <div @click="$emit('click')">

                <component v-bind:is="shape"></component>
                <div class="spell-card__name">
                    <h5>{{ game.name }}</h5>
                    <p>{{ game.description }}</p>
                </div>
            </div>
            <div class="d-flex">

                <v-speed-dial class="speed-dial" v-model="speedDial" direction="right" transition="scale-transition">
                    <template v-slot:activator>
                        <v-btn small v-model="speedDial" dark fab>
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
            </div>
            <confirm-dialog v-model="dialog" @confirm="$emit('deleteGame')"></confirm-dialog>
        </div>
    </div>
</template>


<script lang="ts">


import Vue, { PropType } from 'vue'
import ConfirmDialog from '~/components/confirm/ConfirmDialog.vue'
import { Game, Spells } from '~/interfaces/Game'
import ShapeAccio from './shapes/ShapeAccio.vue'
import ShapeExpecto from './shapes/ShapeExpecto.vue'
import ShapeArresto from './shapes/ShapeArresto.vue'
import ShapeMeteo from './shapes/ShapeMeteo.vue'
import ShapeAguamenti from './shapes/ShapeAguamenti.vue'


export default Vue.extend({
    name: 'SpellCardGame',
    components: {
        ShapeAccio, ShapeExpecto,
        ConfirmDialog, ShapeArresto, ShapeMeteo, ShapeAguamenti

    },
    data: () => ({
        speedDial: false,
        dialog: false

    }),
    props: {
        game: { type: Object as PropType<Game>, default: {} },
        spell: { type: String as PropType<Spells>, default: Spells.accio }
    },

    computed: {
        shape(): string {
            return "shape-" + this.spell
        }

    }

})
</script>
<style lang="scss">
.speed-dial {
    right: -6px;
    top: -5px;
}



.trace-motion {
    stroke-dasharray: 650;
    stroke-dashoffset: 650;
    opacity: .8;
}

@keyframes in {
    to {
        stroke-dashoffset: 0;
    }

}

@keyframes out {
    from {
        stroke-dashoffset: 0;
    }

    to {
        stroke-dashoffset: 650;
    }
}


h3 {
    font: 24px 'Cinzel';
}



.spell-card {
    background: linear-gradient(315deg, #9d523c 0%, #f2a65a 74%);
    flex: 0 0 300px;
    padding: 5px;
    margin: 2em;
    border-radius: 20px;
    box-shadow: 0 0 0 14px #333;
    text-align: center;
    position: relative;
    max-width: 300px;

    &:before {
        content: 'Tu es un Sorcier';
        font-family: 'Cinzel';
        font-weight: 700;
        text-transform: uppercase;
        font-size: 13px;
        letter-spacing: .5px;
        border-radius: 20px;
        background: linear-gradient(to top, #9d523c 0%, #f2a65a 74%);
        position: absolute;
        max-width: 205px;
        top: -8px;
        padding: 3px;
        left: 0;
        right: 0;
        margin: auto;
    }

    &__inner {
        border-radius: 17px;
        overflow: hidden;
        background-image: url('~/assets/images/cardbg.jpg');
        background-size: cover;
    }

    h5 {
        font-family: 'Cinzel Decorative', 'Bahianita';
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 15px;
        min-height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    p {
        font-family: 'Cinzel', 'Alice';
        font-size: 16px;
        width: 90%;
        margin: 0 auto 20px;
        min-height: 45px;
    }

    &__shape {
        width: 55%;
        height: 220px;
        margin: auto;
        // background: #333;
        display: grid;
        place-items: center;
        position: relative;
        // margin-top: 20px;

        svg {
            width: 70%;
            max-width: 250px;
            filter: drop-shadow(0 0 12px #0ff) drop-shadow(-2px -2px 12px #00bcd4);
        }
    }

    &__trace {
        position: absolute;
        width: 100%;
        opacity: .4;
        height: 100%;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-size: 70%;
        background-position: center;
    }

    &:hover {
        cursor: pointer;

        .trace-motion {
            animation: in .7s linear forwards;
        }
    }

    .trace-motion {
        animation: out .4s linear backwards;
    }
}
</style>