import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }

    async deleteTicket(request, response, next) {
        try {
            const userId = request.userInfo.id
            const ticketId =  request.params.ticketId
            const message = await ticketsService.deleteTicket(userId, ticketId)
            response.send(message)
        } catch (error) {
            next(error)
        }
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