import mongoose, { Schema, Document, Types } from "mongoose"

export interface CommentDoc extends Document {
    _id: Types.ObjectId
    user: Types.ObjectId
    post: Types.ObjectId
    comment: string
    createdAt: Date
    updatedAt: Date
}

const commentSchema = new Schema<CommentDoc>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        comment: { type: String, required: true, trim: true }
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model<CommentDoc>("Comment", commentSchema)
export default Comment
