import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketsService } from '../services/TicketsService.js'
import { towerEventService } from '../services/TowerEventService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/tickets', this.getUsersTickets)
      .get('/events', this.getUserEvents)
  }

  async getUsersTickets(request, response, next) {
    try {
      const userInfo = request.userInfo
      const tickets = await ticketsService.getTicketsByUserId(userInfo.id)
      response.send(tickets)
    }
    catch (error) {
      next(error)
    }
  }

  async getUserEvents(request, response, next) {
    try {
      const userInfo = request.userInfo
      const events = await towerEventService.getEventsByUserId(userInfo.id)
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

}
