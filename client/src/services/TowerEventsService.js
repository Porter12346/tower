import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

    async getEventsForUser() {
        const response = await api.get(`account/events`)
        const events = response.data.map((eventData) => new TowerEvent(eventData))
        AppState.towerEvents = events
        logger.log(events)
    }

    async editEvent(value, id) {
        const response = await api.put(`api/events/${id}`, value)
        logger.log(response.data)
        const event = new TowerEvent(response.data)
        AppState.activeEvent = event
    }

    async cancelEvent(id) {
        const response = await api.delete(`api/events/${id}`)
        logger.log(response)
        AppState.activeEvent.isCanceled = true
    }

    async getEventById(id) {
        const response = await api.get(`api/events/${id}`)
        const towerEvent = new TowerEvent(response.data)
        logger.log(towerEvent)
        AppState.activeEvent = towerEvent
    }

    async createEvent(data) {
        const response = await api.post('api/events', data)
        const newEvent = new TowerEvent(response.data)
        AppState.towerEvents.unshift(newEvent)
        logger.log(newEvent)
        return(newEvent)
    }

    async getEvents() {
        const response = await api.get('api/events')
        const events = response.data.map((eventData) => new TowerEvent(eventData))
        AppState.towerEvents = events.reverse()
        logger.log(events)
    }

}
export const towerEventsService = new TowerEventsService()