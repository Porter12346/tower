<script setup>
import { TowerEvent } from '../models/TowerEvent.js';

const props = defineProps({
    TowerEventProp: { type: TowerEvent, required: true },
})
</script>


<template>
    <div class="card">
        <router-link :to="{ name: 'Event', params: { eventId: TowerEventProp.id } }">
            <h1 v-if="TowerEventProp.isCanceled" class="text-danger text-center w-100 negative-margin fw-bolder">CANCELED</h1>
            <img v-if="TowerEventProp.isCanceled" :src="TowerEventProp.coverImg" class="card-img-top greyscale" :alt="TowerEventProp.name">
            <img v-else :src="TowerEventProp.coverImg" class="card-img-top " :alt="TowerEventProp.name">

            <div class="card-body ">
                <h5 class="card-title">{{ TowerEventProp.name }}</h5>
                <p class="card-text">Hosted by {{ TowerEventProp.creator.name }}</p>
                <p class="card-text">{{ TowerEventProp.startDate.toLocaleDateString() }} - {{ TowerEventProp.location }}
                </p>
                <p v-if="TowerEventProp.remainingTickets > 0" class="card-text"> {{ TowerEventProp.remainingTickets }}
                    Spots left</p>
                <h5 v-else class="text-danger">SOLD OUT</h5>
            </div>
        </router-link>
    </div>
</template>


<style lang="scss" scoped>
.greyscale {
    filter: grayscale(1);
}

.negative-margin {
    position: absolute;
    top: 20%;
    z-index: 999;
}
</style>