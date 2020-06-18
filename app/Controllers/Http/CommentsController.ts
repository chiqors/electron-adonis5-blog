import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CommentValidator from 'App/Validators/CommentValidator'

export default class CommentsController {
  public async store({ params, request, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.post_id)
    const data = await request.validate(CommentValidator)
    await post.related('comments').create(data)
    return response.redirect('back')
  }
}
