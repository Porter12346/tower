import { Account } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"

export class Ticket {
    constructor(data) {
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.event = new TowerEvent(data.event)
        this.profile = new Account(data.profile)
    }
}