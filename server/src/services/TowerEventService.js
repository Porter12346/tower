import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TowerEventService {

    async cancelEvent(userId, eventId) {
        const eventToCancel = await this.getTowerEventById(eventId)
        if (eventToCancel.creatorId != userId) {
            throw new Forbidden('You do not have permission to cancel this event')
        }
        if (eventToCancel.isCanceled) {
            throw new Forbidden('Event already canceled')
        }
        eventToCancel.isCanceled = true
        eventToCancel.save()
        return (eventToCancel)
    }

    async editTowerEvent(newEventData, userInfo, eventId) {
        const eventToEdit = await this.getTowerEventById(eventId)
        if (eventToEdit.creatorId != userInfo.id) {
            throw new Forbidden('You cannot edit an event you do not own.')
        }
        if (eventToEdit.isCanceled) {
            throw new Forbidden('You cannot edit a closed event.')
        }
        eventToEdit.name = newEventData.name || eventToEdit.name
        eventToEdit.description = newEventData.description || eventToEdit.description
        eventToEdit.coverImg = newEventData.coverImg || eventToEdit.coverImg
        eventToEdit.location = newEventData.location || eventToEdit.location
        eventToEdit.capacity = newEventData.capacity || eventToEdit.capacity
        eventToEdit.startDate = newEventData.startDate || eventToEdit.startDate
        eventToEdit.type = newEventData.type || eventToEdit.type
        eventToEdit.save()
        return (eventToEdit)
    }

    async getTowerEventById(eventId) {
        const event = await dbContext.TowerEvents.findById(eventId).populate('creator ticketCount')
        return (event)
    }

    async getAllTowerEvents() {
        const events = await dbContext.TowerEvents.find().populate('creator ticketCount')
        return (events)
    }

    async createTowerEvent(body) {
        const towerEvent = await dbContext.TowerEvents.create(body)
        await towerEvent.populate('creator ticketCount')
        return (towerEvent)
    }

}
export const towerEventService = new TowerEventService()