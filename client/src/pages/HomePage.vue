<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { all } from 'axios';
import { logger } from '../utils/Logger.js';

const filter = ref('all')
const account = computed(() => AppState.account)
const towerEvents = computed(() => {
  if (filter.value == 'all') {
    return AppState.towerEvents
  }
  return AppState.towerEvents.filter(towerEvent => towerEvent.type == filter.value)
})

const catagories = ['all', 'concert', 'convention', 'sport', 'digital']
const catagorieIcons = ['mdi mdi-all-inclusive', 'mdi mdi-music', 'mdi mdi-account-group', 'mdi mdi-soccer', 'mdi mdi-monitor']

onMounted(getTowerEvents)

async function getTowerEvents() {
  await towerEventsService.getEvents()
}
</script>

<template>
  <div class="container-fluid bg-img">
    <div class="row">
      <div class="col-md-6 d-flex flex-column justify-content-center align-items-center hero-section">
        <h2>Event management for People, by people</h2>
        <p>Whatever your interest, from hiking and reading to networking and skill sharing, there are thousands of
          people who share it on Tower. Events are happening every day—log in to join the fun.</p>
      </div>
    </div>
  </div>
  <div class="container catagories">
    <div class="row">
      <div class="col-12">
        <h3 class="m-3">How Tower works</h3>
      </div>
      <div class="col-md-6 p-md-3 p-5">
        <div class="bg-body">
          <div class="row p-3">
            <div class="col-2">
              <i class="mdi mdi-magnify fs-1"></i>
            </div>
            <div class="col-10">
              <h5>Discover events you’re interested in</h5>
              <p>Browse through community hosted events for all the things you love</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 p-md-3 p-5">
        <div class="bg-body">
          <div class="row p-3">
            <div class="col-2">
              <i class="mdi mdi-plus fs-1"></i>
            </div>
            <div class="col-10">
              <h5>Start an event to invite your friends</h5>
              <p>Create your own Tower event, and draw from a community of millions</p>
              <p v-if="account" data-bs-toggle="modal" data-bs-target="#EventFormModal" type="button"
                class="mb-0 text-primary">Create an event</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3 class="m-3">Explore top categories</h3>
      </div>
      <div class="col-md-12">
        <div class="d-flex justify-content-between">
          <button @click="filter = catagory" v-for="(catagory, index) in catagories" :key="catagory"
            class="bg-body w-100 p-md-3 p-1 text-center">
            <i :class=catagorieIcons[index]></i>
            <h6>{{ catagory }}</h6>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h3 class="my-3">Upcoming events</h3>
      </div>


    </div>
    <div class="row">
      <div v-for="event in towerEvents" :key="event.id" class="col-md-4 col-12 mb-2  d-flex justify-content-center">
        <EventCard :TowerEventProp="event" />
      </div>
    </div>
  </div>
  <EventForm />
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.bg-img {
  background-image: url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  height: 45vh;
  background-position: center;
  background-size: cover;
}

.hero-section {
  height: 45vh;
  text-shadow: 2px 2px 2px black;
}
</style>
