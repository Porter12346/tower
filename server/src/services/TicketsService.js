import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TicketsService {
    async deleteTicket(userId, ticketId) {
        const ticketToDelete = await this.getTicketById(ticketId)
        if(ticketToDelete?.accountId != userId){
            throw new Forbidden
        } 
        await ticketToDelete.deleteOne()
        return `ticket deleted`
    }

    async getTicketById(id) {
        const ticket = await dbContext.Tickets.findOne({ _id: id }).populate('profile event')
        return(ticket)
    }

    async getTicketsByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile event')
        return (tickets)
    }

    async getTicketsByUserId(id) {
        const tickets = await dbContext.Tickets.find({ accountId: id }).populate('profile event')
        return (tickets)
    }

    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile event')
        return (ticket)
    }

}
export const ticketsService = new TicketsService()