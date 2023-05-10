import mongoose from "mongoose";
import { Schema , InferSchemaType} from "mongoose";

const userSchema = new Schema({
    name: String,
    sub: String,
    email: {type: String, required: true}

})

export type UserType = InferSchemaType<typeof userSchema>
export const User = mongoose.model('User', userSchema)