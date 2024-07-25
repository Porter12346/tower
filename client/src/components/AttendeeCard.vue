<script setup>
import { Ticket } from '../models/Ticket.js';

const props = defineProps({
    ticketProp: { type: Ticket, required: true }
})
</script>


<template>
    <div v-if="ticketProp" class="d-flex align-items-center mb-2">
                <img :src="ticketProp.profile.picture" :alt="ticketProp.profile.name" class="profile-picture px-3">
                <h5 class="m-0">{{ ticketProp.profile.name }}</h5>
    </div>
</template>


<style lang="scss" scoped>
.profile-picture{
    border-radius: 50%;
    height: 3.5em;
}

</style>