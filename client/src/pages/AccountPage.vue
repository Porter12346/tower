<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';

const account = computed(() => AppState.account)

const events = computed(() => AppState.towerEvents)

const tickets = computed(() => AppState.activeTickets)

onMounted(() => {
  getEventsByUserId(),
    getTicketsByUserId()
})

async function getTicketsByUserId() {
  try {
    await ticketsService.getTicketForUser()
  }
  catch (error) {
    Pop.error(error);
  }
}

async function getEventsByUserId() {
  try {
    await towerEventsService.getEventsForUser()
  }
  catch (error) {
    Pop.error(error);
  }
}

</script>

<template>
  <div class="about text-center">
    <div class="container">
      <div class="row">
        <div class="col-12 mb-5">
          <div v-if="account" class="d-flex align-items-center mt-5">
            <img class="rounded" :src="account.picture" alt="" />
            <div>
              <h1 class="mx-5">{{ account.name }}</h1>
              <h6>{{ events.length }} events | {{ tickets.length }} tickets</h6>
            </div>
          </div>
          <div v-else>
            <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
          </div>

        </div>

      </div>
      <div class="row mt-5">
        <h4 class="mb-4">Your events</h4>
        <div v-for="event in events" :key="event.id" class="col-md-4 col-12 mb-2 d-flex justify-content-center">
          <EventCard :TowerEventProp="event" />
        </div>
      </div>
      <div class="row mt-5">
        <h4 class="mb-4">Your Tickets</h4>
        <div v-for="ticket in tickets" :key="ticket.id" class="col-md-6 col-12 mb-2 d-flex justify-content-center">
          <TicketCard :TicketProp="ticket" />
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
