<script setup>
import { TowerEvent } from '../models/TowerEvent.js';

    const props = defineProps({
        TowerEventProp: { type: TowerEvent, required: true }
    })
</script>


<template>
    <div class="card">
        <img :src="TowerEventProp.coverImg" class="card-img-top" :alt="TowerEventProp.name">
        <div class="card-body">
            <h5 class="card-title">{{ TowerEventProp.name }}</h5>
            <p class="card-text">Hosted by {{ TowerEventProp.creator.name }}</p>
            <p class="card-text">{{ TowerEventProp.startDate.toLocaleDateString() }} - {{ TowerEventProp.location }}</p>
            <p>10 attending (FIX ME)</p>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>