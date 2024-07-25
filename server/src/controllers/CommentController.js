import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";

export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postComment)
            .delete('/:commentId', this.deleteComment)
    }

    async deleteComment(request, response, next) {
        try {
            const userInfo = request.userInfo
            const commentId = request.params.commentId
            const message = await commentService.deleteComment(userInfo.id, commentId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async postComment(request, response, next) {
        try {
            const commentInfo = request.body
            const userInfo = request.userInfo
            commentInfo.creatorId = userInfo.id
            const comment = await commentService.postComment(commentInfo)
            response.send(comment)
        } catch (error) {
            next(error)
        }


    }
}