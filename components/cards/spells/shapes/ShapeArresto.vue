<template>
    <div class="spell-card__shape">
        <div class="spell-card__trace"
            :style="{ 'background-image': 'url(' + require('~/assets/images/spells/arresto.svg') + ')' }">
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166.02 168.22">
            <clipPath id="clip-arresto">
                <path
                    d="M40,210S66,77,73,70l46,130s3,12,8,0L171,73s35,129,34,132c0,0-3.13-35.18-10-74-7.1-40.13-17.95-83.95-19-85,0,0-4-7-8,0L123,190,78,48s-6-14-10,0S52,123,47,148C47,148,37,207,40,210Z"
                    transform="translate(-39 -41.78)" />
            </clipPath>
            <polyline clip-path="url(#clip-arresto)" class="trace-motion" fill="none" stroke="#ddfffb"
                stroke-miterlimit="10" stroke-width="14"
                points="0 168.22 33 7.22 83 159.22 133 7.22 151 84.22 166 163.22" />
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "ShapeArresto"
})
</script>