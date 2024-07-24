<script setup>
import { ref } from 'vue';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { Modal } from 'bootstrap';

const editableEventData = ref({
    name: '',
    coverImg: '',
    description: '',
    startDate: null,
    capacity: 0,
    location: '',
    type: ''
})

async function createEvent() {
    try {
        await towerEventsService.createEvent(editableEventData.value)
        Pop.success('event created')
        clearForm()
        Modal.getOrCreateInstance('#EventFormModal').hide()
        logger.log('event posted 😎')
    }
    catch (error) {
        Pop.error(error);
    }


}


function clearForm() {
    editableEventData.value = {
        name: '',
        coverImg: '',
        description: '',
        startDate: null,
        capacity: 0,
        location: '',
        type: ''
    }
}

</script>


<template>
    <div class="modal" tabindex="-1" id="EventFormModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create event</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createEvent()">
                        <div class="mb-3">
                            <label for="name" class="form-label">name</label>
                            <input v-model="editableEventData.name" type="string" class="form-control" name="name"
                                id="name" minlength="3" maxlength="50" required=true>
                        </div>
                        <div class="mb-3">
                            <label for="coverImg" class="form-label">Cover Image URL</label>
                            <input v-model="editableEventData.coverImg" type="url" class="form-control" name="coverImg"
                                id="coverImg" required="true">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="editableEventData.description" type="String" class="form-control"
                                id="description" name="description" minlength="15" maxlength="1000" rows="3"
                                required="true"></textarea>
                        </div>
                        <div class="d-flex">
                            <div class="mb-3 flex-grow-1">
                                <label for="date" class="form-label">Date</label>
                                <input v-model="editableEventData.startDate" type="Date" class="form-control" id="date"
                                    name="date" required="true">
                            </div>
                            <div class="mb-3 ms-5 flex-grow-1">
                                <label for="capacity" class="form-label">capacity</label>
                                <input v-model="editableEventData.capacity" type="number" class="form-control"
                                    id="capacity" name="capacity" min="1" max="5000" required="true">
                            </div>
                        </div>
                        <div>
                            <div class="mb-3">
                                <label for="location" class="form-label">location</label>
                                <input v-model="editableEventData.location" type="String" class="form-control"
                                    id="location" name="location" minlength="1" maxlength="500" required="true">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="type" class="form-label">type menu</label>
                            <select v-model="editableEventData.type" id="type" class="form-select" required="true">
                                <option value="" disabled>Select an event type</option>
                                <option value="concert">Concert</option>
                                <option value="convention">Convention</option>
                                <option value="sport">Sports</option>
                                <option value="digital">Digital</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            <button class="btn btn-secondary">Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>