import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {

    async createEvent(data) {
        const response = await api.post('api/events', data)
        const newEvent = new TowerEvent(response.data)
        AppState.towerEvents.unshift(newEvent)
        logger.log(newEvent)
    }

    async getEvents() {
        const response = await api.get('api/events')
        const events = response.data.map((eventData)=>new TowerEvent(eventData))
        AppState.towerEvents = events
        logger.log(events)
    }

}
export const towerEventsService = new TowerEventsService()