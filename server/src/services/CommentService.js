import { dbContext } from "../db/DbContext.js"

class CommentService {

    async getEventsComments(eventId) {
        const response = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
        return response
    }

    async postComment(commentInfo) {
        const response = await dbContext.Comments.create(commentInfo)
        await response.populate('creator')
        return response
    }
}
export const commentService = new CommentService()