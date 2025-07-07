import mongoose, { Schema, Types } from "mongoose"

export interface UserDoc extends Document {
    _id: Types.ObjectId
    username: string
    name?: string
    email: string
    password: string
    bio?: string
    avatar?: string
    followers: mongoose.Types.ObjectId[]
    following: mongoose.Types.ObjectId[]
    isVerified: boolean
    posts: mongoose.Types.ObjectId[]
    createdAt: Date
    updatedAt: Date
}
const userSchema = new Schema<UserDoc>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 30
        },
        name: {
            type: String,
            trim: true,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be atleast 6 characters long"]
        },
        bio: {
            type: String,
            required: false,
            trim: true,
            maxlength: 240,
            default: ""
        },
        avatar: {
            type: String,
            required: false
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        isVerified: {
            type: Boolean,
            default: false
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model<UserDoc>("User", userSchema)
export default User
