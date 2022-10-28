<template>
    <div class="spell-card__shape">
        <div class="spell-card__trace"
            :style="{ 'background-image': 'url(' + require('~/assets/images/spells/accio.svg') + ')' }">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 73.89">
            <clipPath id="clip-accio">
                <path class="cls-1"
                    d="M125,89c43.91,0,80.83,27.11,91.58,63.89C210.25,111.13,171.66,79,125,79s-85.25,32.13-91.58,73.89C44.17,116.11,81.09,89,125,89Z" />
            </clipPath>
            <path clip-path="url(#clip-accio)" class="trace-motion cls-2" fill="none" stroke="#ddfffb"
                stroke-miterlimit="10" stroke-width="14" d="M33,150s20-64,92-64,92,64,92,64"
                transform="translate(-33 -79)" />
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ShapeAccio"
})
</script>