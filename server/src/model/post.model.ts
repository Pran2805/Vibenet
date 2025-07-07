import mongoose, { Document, Schema, Types } from "mongoose"

export interface PostDoc extends Document {
    _id: Types.ObjectId
    title: string
    description?: string
    files: string[]
    owner: mongoose.Types.ObjectId
    likes: mongoose.Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
}

const postSchema = new Schema<PostDoc>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        files: {
            type: [String]
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model<PostDoc>("Post", postSchema)

export default Post
