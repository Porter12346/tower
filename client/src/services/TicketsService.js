import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {

    async createTicket(eventId, userId) {
        const ticketData = { userId, eventId }
        logger.log('im about to make a ticket')
        const response = await api.post(`api/tickets`, ticketData)
        logger.log(response.data)
        const ticket = new Ticket(response.data)
    }

}
export const ticketsService = new TicketsService()