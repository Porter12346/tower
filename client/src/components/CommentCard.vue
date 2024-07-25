<script setup>
import { Comment } from '../models/Comment.js';

const props = defineProps({
    commentProp: { type: Comment, required: true }
})
</script>


<template>
    <div class="d-flex gap-2 bg-text rounded p-2">
        <img :src="commentProp.creator.picture" :alt="commentProp.creator.name" class="profile-picture mt-2">
        <div>
            <p class="mb-1 fw-bold fs-4">{{ commentProp.creator.name }}</p>
            <p>{{ commentProp.body }}</p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.profile-picture {
    border-radius: 50%;
    height: 3.5em;
}
</style>