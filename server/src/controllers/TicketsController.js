import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
    }

    async createTicket(request, response, next) {
        try {
            const ticketData = request.body
            const userInfo = request.userInfo.id
            ticketData.accountId = userInfo
            const ticket = await ticketsService.createTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}