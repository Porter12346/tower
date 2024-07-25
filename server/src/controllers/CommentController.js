import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";

export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postComment)
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