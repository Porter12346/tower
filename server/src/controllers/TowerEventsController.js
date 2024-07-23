import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";

export class TowerEventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
    }

    async createTowerEvent(request, response, next) {
        try {
            await towerEventService.createTowerEvent(request.body)
        }
        catch (error){
            next(error)
        }
    }
}