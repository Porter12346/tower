<script setup>
import { TowerEvent } from '../models/TowerEvent.js';

    const props = defineProps({
        TowerEventProp: { type: TowerEvent, required: true }
    })
</script>


<template>
    <div class="card" style="width: 18rem;">
        <img :src="TowerEventProp.coverImg" class="card-img-top" :alt="TowerEventProp.name">
        <div class="card-body">
            <h5 class="card-title">{{ TowerEventProp.name }}</h5>
            <p class="card-text">{{ TowerEventProp.description }}</p>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>