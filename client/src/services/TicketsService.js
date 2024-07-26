import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService {

    async deleteTicket(ticketId) {
        const confirm = await Pop.confirm('Are you sure you want to return this ticket?')
        if(!confirm){return('canceled')}
        await api.delete(`api/tickets/${ticketId}`)
        const index = AppState.activeTickets.findIndex((ticket) =>  ticket.id == ticketId )
        AppState.activeTickets.splice(index, 1)
    }

    async getTicketForUser() {
        const response = await api.get('account/tickets')
        const tickets = response.data.map((ticketData) => new Ticket(ticketData))
        AppState.activeTickets = tickets
        logger.log(tickets)
    }

    async getTicketsByEventId(id) {
        const response = await api.get(`api/events/${id}/tickets`)
        const tickets = response.data.map((ticketData) => new Ticket(ticketData))
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