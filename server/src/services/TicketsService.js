import { dbContext } from "../db/DbContext.js"

class TicketsService {

    async getTicketsByUserId(id) {
        const tickets = await dbContext.Tickets.find({accountId: id}).populate('profile event')
        return(tickets)
    }

    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile event')
        return (ticket)
    }

}
export const ticketsService = new TicketsService()