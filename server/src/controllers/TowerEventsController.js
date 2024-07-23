import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllTowerEvents)
            .get('/:eventId', this.getTowerEventById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
            .put('/:eventId', this.editTowerEvent)

    }

    editTowerEvent(request, response, next) {
        try {
            
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