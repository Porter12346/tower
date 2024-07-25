import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";
import { ticketsService } from "../services/TicketsService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .get('/:eventId', this.getTowerEventById)
            .get('/:eventId/tickets', this.getTicketsByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
            .put('/:eventId', this.editTowerEvent)
            .delete('/:eventId', this.cancelTowerEvent)
    }

    async getTicketsByEventId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketsService.getTicketsByEventId(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async cancelTowerEvent(request, response, next) {
        try {
            const userId = request.userInfo.id
            const eventId = request.params.eventId
            const result = await towerEventService.cancelEvent(userId, eventId)
            response.send(result)
        } catch (error) {
            next(error)
        }
    }

    async editTowerEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const eventData = request.body
            const userInfo = request.userInfo
            const result = await towerEventService.editTowerEvent(eventData, userInfo, eventId)
            response.send(result)
        } catch (error) {
            next(error)
        }
    }

    async getTowerEventById(request, response, next) {
        try {
            const id = request.params.eventId
            const event = await towerEventService.getTowerEventById(id)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getAllTowerEvents(request, response, next) {
        try {
            const events = await towerEventService.getAllTowerEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async createTowerEvent(request, response, next) {
        try {
            const towerEventData = request.body
            const userInfo = request.userInfo
            towerEventData.creatorId = userInfo.id
            const towerEvent = await towerEventService.createTowerEvent(towerEventData)
            response.send(towerEvent)
        }
        catch (error) {
            next(error)
        }
    }
}