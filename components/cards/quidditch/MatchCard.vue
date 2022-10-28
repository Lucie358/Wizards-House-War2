<template>
    <v-card dark max-width="360">
        <v-card-title class="text-h5">
            {{ match.team1 }} VS {{ match.team2 }}
        </v-card-title>

        <v-card-subtitle>{{ match.description }}
        </v-card-subtitle>

        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" alt=""
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light">
                    </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ match.team1Points }} à {{ match.team2Points }} pts</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                    <v-icon class="mr-1">
                        mdi-pencil
                    </v-icon>

                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>

</template>
<script lang="ts">
import Vue, { computed } from 'vue'
import { PropType } from 'vue/types/v3-component-props'
import { Match } from '~/interfaces/Game';
export default Vue.extend({
    name: "MatchCard",
    props: {
        match: Object as PropType<Match>, default: {}
    },
    computed: {
        winner(): string {
            if (this.match.team1Points === this.match.team2Points) return "Equality"
            return this.match.team1Points > this.match.team2Points ? this.match.team1 : this.match.team2
        }
    }

})
</script>