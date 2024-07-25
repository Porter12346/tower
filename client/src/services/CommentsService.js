import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{
    async deleteComment(id) {
        await api.delete(`api/comments/${id}`)
        const index = AppState.activeComments.findIndex((comment) =>  comment.id == id )
        AppState.activeComments.splice(index, 1)
    }

    async postComment(editableCommentData) {
        const response = await api.post(`api/comments`, editableCommentData.value)
        const comment = new Comment(response.data)
        AppState.activeComments.unshift(comment)
    }

    async getCommentsForEvent(eventId){
        const response =  await api.get(`api/events/${eventId}/comments`)
        const comments = response.data.map((commentData)=>new Comment(commentData))
        AppState.activeComments = comments.reverse()
        logger.log(comments)
    }
}
export const commentService = new CommentsService()