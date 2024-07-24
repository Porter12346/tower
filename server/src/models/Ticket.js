import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    accountId: { type: Schema.ObjectId, required: true },
    eventId: { type: Schema.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

TicketSchema.virtual('profile',{
    foreignField: '_id',
    ref: 'Account',
    localField: 'accountId',
    justOne: true
})
TicketSchema.virtual('event',{
    foreignField: '_id',
    ref: 'TowerEvent',
    localField: 'eventId',
    justOne: true
})