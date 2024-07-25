<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { ticketsService } from '../services/TicketsService.js';
import AttendeeCard from '../components/AttendeeCard.vue';
import { commentService } from '../services/CommentsService.js';

const route = useRoute()

const towerEvent = computed(() => AppState.activeEvent)

const account = computed(() => AppState.account)

const tickets = computed(() => AppState.activeTickets)

const comments = computed(() => AppState.activeComments)

const hasATicket = computed(() => AppState.activeTickets.find(tick => tick?.accountId == AppState.account?.id))

onMounted(() => {
    getEvent()
    getEventTickets()
    getComments()
})

async function getComments() {
    try {
        const id = route.params.eventId
        await commentService.getCommentsForEvent(id)
    }
    catch (error) {
        Pop.error(error);
    }
}

const editableCommentData = ref({
    body: '',
    eventId: ''
})

async function getEvent() {
    try {
        const id = route.params.eventId
        await towerEventsService.getEventById(id)

    }
    catch (error) {
        Pop.error(error);
    }
}

async function cancelEvent() {
    try {
        const id = route.params.eventId
        await towerEventsService.cancelEvent(id)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function createTicket() {
    try {
        const id = route.params.eventId
        const userId = account.value.id
        await ticketsService.createTicket(id, userId)
    } catch (error) {
        Pop.error(error)
    }
}

async function getEventTickets() {
    try {
        const id = route.params.eventId
        await ticketsService.getTicketsByEventId(id)
    }
    catch (error) {
        Pop.error(error);
    }
}

async function postComment() {
    try {
        editableCommentData.value.eventId = towerEvent.value.id
        await commentService.postComment(editableCommentData)
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div v-if="towerEvent">
        <div class="container">
            <div class="row">
                <div v-if="!towerEvent.isCanceled" class="col-12 text-center bg-dark">
                    <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid cover-img">
                </div>
                <h1 v-else class="my-5 text-center text-danger">CANCELED</h1>
                <div class="col-md-8 mt-5 text-center text-md-start">
                    <div
                        class="align-items-center d-flex  mb-4 text-center text-md-start justify-content-center justify-content-md-between">
                        <div class="d-flex gap-md-3">
                            <h1 class="m-0">{{ towerEvent.name }}</h1>
                            <p class="bg-light-subtle px-1 rounded m-md-0 me-5 align-self-center">{{ towerEvent.type }}
                            </p>
                        </div>
                        <!-- <button v-if="(towerEvent.creatorId == account?.id) && (!towerEvent.isCanceled)" class="btn btn-info justify-self-md-end">
                            <i class="mdi mdi-menu"></i>
                        </button> -->
                        <div v-if="(towerEvent.creatorId == account?.id) && (!towerEvent.isCanceled)" class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="mdi mdi-pencil"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><button data-bs-toggle="modal" data-bs-target="#EventFormModal"
                                        class="dropdown-item">Edit event</button></li>
                                <li><button @click="cancelEvent()" class="dropdown-item">Cancel event</button></li>

                            </ul>
                        </div>
                    </div>

                    <p>{{ towerEvent.description }}</p>
                    <h6>Start Date</h6>
                    <p><i class="mdi mdi-calendar-clock text-info"></i> Starts on {{ towerEvent.startDate.toDateString()
                        }}</p>
                    <h6>Location</h6>
                    <p><i class="mdi mdi-map-marker text-info"></i> {{ towerEvent.location }}</p>
                </div>
                <div class="col-md-4 text-center mt-5">
                    <div v-if="!towerEvent.isCanceled" class="">
                        <div class="py-3 bg-dark">
                            <h5>inteseted in going?</h5>
                            <p>grab a ticket!</p>
                            <p v-if="hasATicket" class="text-info">You have a ticket</p>
                            <button v-if="towerEvent.remainingTickets > 0" @click="createTicket()"
                                class="btn btn-info px-5">Attend</button>
                            <button v-else disabled class="btn btn-info px-5">Sold Out</button>
                        </div>
                        <p class="text-end"> {{ towerEvent.remainingTickets }} Spots left</p>
                        <p class='text-start'>Attendees</p>
                        <div class="py-3 bg-dark">
                            <div class="row scrollable-box">
                                <div v-for="ticket in tickets" :key="ticket?.id" class="col-12">
                                    <AttendeeCard :ticket-prop="ticket" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">Comments</div>
                <div class="py-3 bg-dark">
                    <div class="rounded">
                        <form @submit.prevent="postComment()" class="mb-3">
                            <div class="mb-2">
                                <textarea v-model="editableCommentData.body" class="form-control" id="commentTextArea"
                                    placeholder="Tell the people" style="resize: none" rows="5"></textarea>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-secondary px-4">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div v-for="comment in comments" :key="comment.id">
                        <CommentCard :commentProp="comment" :accountProp="account"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <EventEditForm v-if="towerEvent" :eventProp="towerEvent" />
</template>


<style lang="scss" scoped>
.cover-img {
    width: 80%;
    height: 50vh;
    object-position: center;
    object-fit: cover;
}

.scrollable-box {
    height: 29vh;
    overflow-y: auto;
}
</style>