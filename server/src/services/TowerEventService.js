import { dbContext } from "../db/DbContext.js"

class TowerEventService {
    async getTowerEventById(eventId) {
        const event = await dbContext.TowerEvents.findById(eventId).populate('creator')
        return (event)
    }

    async getAllTowerEvents() {
        const events = await dbContext.TowerEvents.find()
        return (events)
    }

    async createTowerEvent(body) {
        const towerEvent = await dbContext.TowerEvents.create(body)
        await towerEvent.populate('creator')
        return (towerEvent)
    }

}
export const towerEventService = new TowerEventService()