import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.ObjectId, required: true },
    eventId: { type: Schema.ObjectId, required: true },
    body: { type: String, maxLength: 2000, minLength: 1, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual('creator', {
    foreignField: '_id',
    ref: 'Account',
    localField: 'creatorId',
    justOne: true
})