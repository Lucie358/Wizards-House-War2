<template>
    <div class="d-flex flex-column align-center">
        <div id="hourglass" :style="{ '--sandColor': color }" class="ready">
            <div class="glass">
                <div class="sand top" :style="{ height: (100 - getPercent) + '%' }" />
            </div>
            <div class="glass bottom">
                <div class="sand bottom" :style="{ height: getPercent + '%' }" />
            </div>
            <img class="hourglass-image" src="~/assets/images/hourglass.png" width="200" />

        </div>
        <div class="mt-9">
            <div v-if="inputActive == false">
                <v-btn x-small v-if="inputActive == false" color="blue-grey" fab @click="openInput('remove')">
                    <v-icon dark>
                        mdi-minus
                    </v-icon>
                </v-btn>
                <v-btn x-small v-if="inputActive == false" color="blue-grey" fab @click="openInput('add')">
                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </div>
            <v-text-field clearable v-else label="Nombre de points" v-model.number="pointsToManage">
                <v-icon v-if="pointsToManage != null && pointsToManage !== ''" dark slot="append" @click="save">
                    mdi-check
                </v-icon>
                <v-icon v-else dark slot="append" @click="inputActive = false">
                    mdi-close
                </v-icon>
            </v-text-field>
            <p class="text-center mt-2">{{points}} points</p>

        </div>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Hourglass',
    components: {
    },
    props: {
        color: { type: String, default: '' },
        points: { type: Number, default: 0 },
        house: { type: String, default: '' }
    },
    data: () => ({
        inputActive: false,
        addButton: true,
        maxPoints: 1000,
        managePoints: "",
        pointsToManage: null
    }),
    computed: {
        getPercent(): Number {
            return this.points / this.maxPoints * 100
        }
    },
    methods: {
        openInput(type: string) {
            this.inputActive = true
            this.managePoints = type
        },
        save() {
            this.inputActive = false
            if (this.pointsToManage !== 0 || this.pointsToManage !== null) {
                this.$emit('managePoint', this.managePoints, this.house, this.pointsToManage)
                this.pointsToManage = null
            }


        }

    }
})
</script>
<style scoped>

.hourglass-image {
    position: absolute;
    top: -7px;
    z-index: 1;
    width: 185px;
    right: 27px;
}


#hourglass {
    position: relative;
    --hourglassSize: 10rem;
    display: inline-block;
    transition-property: transform;
    transition-duration: 700ms;
    transition-timing-function: ease;
}

.glass {
    z-index: 1;
    position: relative;
    background-color: var(--glassColor);
    clip-path: polygon(17% 15%, 48% 14%, 82% 14%, 74% 57%, 67% 76%, 60% 89%, 50% 99%, 41% 90%, 33% 75%, 25% 53%);
    height: var(--hourglassSize);
    width: calc(var(--hourglassSize) * 1.5);
    bottom: -0.2em;
    overflow: hidden;
    border-top-left-radius: 20% 100%;
    border-top-right-radius: 20% 100%;
}

.top {
    z-index: 2;
}

.glass.bottom {
    z-index: 0;
    top: -0.2em;
    clip-path: polygon(46% -2%, 55% -2%, 69% 33%, 73% 44%, 79% 75%, 78% 96%, 74% 115%, 28% 105%, 18% 101%, 20% 78%, 24% 50%, 30% 33%);

    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 20% 100%;
    border-bottom-right-radius: 20% 100%;
}

.sand.top:after {
    position: absolute;
    content: "";
    width: 100%;
    top: -20px;
    height: 20px;
    border-bottom-left-radius: 50% 70%;
    border-bottom-right-radius: 50% 70%;
    background-color: transparent;
    box-shadow: 0 10px 0 var(--sandColor);
    animation: kfSandTop 2000ms ease-in-out infinite;
}

.sand {
    position: absolute;
    background-color: var(--sandColor);
    min-width: 100%;
    height: 100%;
    bottom: 0;
}

#hourglass.ready .sand {
    transition-property: height;
    transition-timing-function: ease-out;
    transition-duration: 200ms;
}

.glass.bottom .sand {
    height: 0;
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transition-timing-function: ease-in;
    animation: kfSandBottom 2000ms ease-in-out infinite;
}

.glass.bottom:before {
    position: absolute;
    content: "";
    background-color: var(--sandColor);
    height: 98%;
    width: 3px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
}

@keyframes kfSandStream {
    0% {
        height: 0;
        transform: rotate(10deg)
    }

    10% {
        height: 100%;
        top: 0;
        transform: rotate(-15deg)
    }

    95% {
        height: 100%;
        top: 0;
    }

    100% {
        height: 0;
        top: 100%;
    }
}

@keyframes kfSand {
    0% {
        border-top-left-radius: 20% 20%;
        border-top-right-radius: 20% 20%;
    }

    50% {
        border-top-left-radius: 50% 40%;
        border-top-right-radius: 50% 40%;
    }
}

@keyframes kfSandTop {
    0% {
        border-bottom-left-radius: 50% 50%;
        border-bottom-right-radius: 50% 50%;
    }

    50% {
        border-bottom-left-radius: 50% 80%;
        border-bottom-right-radius: 50% 80%;
    }

    100% {
        border-bottom-left-radius: 50% 50%;
        border-bottom-right-radius: 50% 50%;
    }
}

@keyframes kfSandBottom {
    0% {
        border-top-left-radius: 40% 100%;
        border-top-right-radius: 40% 100%;
    }

    50% {
        border-top-left-radius: 100% 150%;
        border-top-right-radius: 100% 150%;
    }

    100% {
        border-top-left-radius: 40% 100%;
        border-top-right-radius: 40% 100%;
    }
}
</style>