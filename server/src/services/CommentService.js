import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js";

class CommentService {

    async deleteComment(userId, commentId) {
        const comment = await this.getCommentById(commentId)
        if(comment.creatorId != userId){
            throw new Forbidden('Cant delete another users comment')
        }
        await comment.deleteOne()
        return('deleted comment')
    }

    async getEventsComments(eventId) {
        const response = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
        return response
    }

    async getCommentById(id){
        const response = await dbContext.Comments.findById(id)
        return response
    }

    async postComment(commentInfo) {
        const response = await dbContext.Comments.create(commentInfo)
        await response.populate('creator')
        return response
    }
}
export const commentService = new CommentService()