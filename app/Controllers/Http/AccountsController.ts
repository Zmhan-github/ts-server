import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'

export default class AccountsController {
  public async index() {
    const acconts = await Account.all()
    return acconts
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const account = await Account.findBy('id', id)
    if (!account) {
      return response.notFound('Account not found.')
    }
    return account
  }

  public async store({ request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const type = request.input('type')

    const account = new Account()
    account.email = email
    account.password = password
    account.type = type

    await account.save()

    return account
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params
    const email = request.input('email')
    const password = request.input('password')
    const type = request.input('type')
    const balance = request.input('balance')

    const dataToUpdate = {
      ...(email && { email }),
      ...(password && { password }),
      ...(type && { type }),
      ...(balance && { balance }),
    }

    const account = await Account.findBy('id', id)
    if (!account) {
      return response.notFound('Account not found.')
    }

    account?.merge(dataToUpdate)

    await account?.save()

    return account
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const account = await Account.findBy('id', id)
    if (!account) {
      return response.notFound('Account not found.')
    }
    await account?.delete()
    return response.noContent()
  }
}
