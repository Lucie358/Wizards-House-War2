<template>
    
    <v-dialog v-model="show" max-width="290">
        <v-card>
            <v-card-title class="text-h5">
                {{ title }}
            </v-card-title>

            <v-card-text>
                {{ description }}
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="red darken-1" text @click="show = false">
                    Annuler
                </v-btn>

                <v-btn color="green darken-1" text @click="confirm()">
                    Confirmer
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'ConfirmDialog',
    props: {
        value: { type: Boolean, default: false },
        title: { type: String, default: "" },
        description: { type: String, default: "" },

    },
    methods: {
        confirm() {
            this.$emit('confirm')
            this.show = false
        }

    },

    computed: {

        show: {
            get(): boolean {
                return this.value
            },
            set(value: boolean) {
                this.$emit('input', value)
            }
        }
    }

})
</script>
