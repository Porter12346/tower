import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
    async getTicketsByEventId(id) {
        const response = await api.get(`api/events/${id}/tickets`)
        const tickets = response.data.map((ticketData)=>new Ticket(ticketData))
        AppState.activeTickets = tickets
        logger.log(tickets)

    }

    async createTicket(eventId, userId) {
        const ticketData = { userId, eventId }
        logger.log('im about to make a ticket')
        const response = await api.post(`api/tickets`, ticketData)
        logger.log(response.data)
        const ticket = new Ticket(response.data)
        AppState.activeTickets.unshift(ticket)
        AppState.activeEvent.ticketCount++
        AppState.activeEvent.remainingTickets--
    }

}
export const ticketsService = new TicketsService()