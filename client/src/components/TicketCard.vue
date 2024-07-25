<script setup>
import { Ticket } from '../models/Ticket.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

const props = defineProps({
    TicketProp: { type: Ticket, required: true }
})

async function deleteTicket() {
    try {
        await ticketsService.deleteTicket(props.TicketProp.id)
        Pop.success('Ticket Returned')
    }
    catch (error) {
        Pop.error(error);
    }
}

</script>


<template>
    <div class="card mb-3 card-sizing" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-8" style="max-height: 200px;">
                <img :src="TicketProp.event.coverImg" class="img-fluid card-img rounded-start" alt="...">
            </div>
            <div class="col-md-4">
                <div class="card-body">
                    <h5 class="card-title mb-4">{{ TicketProp.event.name }}</h5>
                    <p class="card-text">{{ TicketProp.event.startDate.toDateString() }}</p>
                    <button @click="deleteTicket()" class="btn btn-warning">Return Ticket</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.card-img {
    object-fit: cover;
    height: 100%;
    object-position: center;
}

@media only screen and (min-width: 768px) {
    .card-sizing {
        max-height: 250px
    }
}
</style>