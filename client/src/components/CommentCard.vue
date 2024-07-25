<script setup>
import { Account } from '../models/Account.js';
import { Comment } from '../models/Comment.js';
import { commentService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

const props = defineProps({
    commentProp: { type: Comment, required: true },
    accountProp: { type: Account, required: true }
})

async function deleteComment() {
    try {
        const response = await commentService.deleteComment(props.commentProp.id)
        Pop.success('comment deleted')
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div class="d-flex gap-2 bg-text rounded p-2 mb-2">
        <img :src="commentProp.creator.picture" :alt="commentProp.creator.name" class="profile-picture mt-2">
        <div>
            <div class="d-flex justify-content-between">
                <p class="mb-1 fw-bold fs-4 ">{{ commentProp.creator.name }}</p>
                <button v-if="accountProp?.id == commentProp.creatorId" @click="deleteComment()" class="btn btn-secondary"><i class="mdi mdi-delete"></i></button>
            </div>
            <p class="fill">{{ commentProp.body }}</p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.profile-picture {
    border-radius: 50%;
    height: 3.5em;
}

.fill {
    width: 72vw;
}
</style>