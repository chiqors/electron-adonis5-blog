import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import PostValidator from 'App/Validators/PostValidator'

export default class PostsController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post.all()
    return view.render('posts.index', { posts })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('posts.form')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(PostValidator)
    await Post.create(data)

    return response.redirect('/')
  }

  public async show({ params, view }: HttpContextContract) {
    const post = await Post.query().preload('comments').where('id', params.id).firstOrFail()
    return view.render('posts.show', { post })
  }

  public async edit({ params, view }: HttpContextContract) {
    const post = await Post.find(params.id)
    return view.render('posts.form', { post })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = await request.validate(PostValidator)
    post.merge(data)
    await post.save()
    return response.redirect(`/posts/${post.id}`)
  }

  public async destroy({ params, response }) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return response.redirect('/')
  }
}
