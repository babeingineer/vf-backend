import { Schema, model } from "mongoose"

const schema = new Schema({
    villageName: {
        type: String,
    },
    organizer: {
        type: String,
    },
    status: {
        type: String,
    },
    fulfillment: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    code: {
        type: String,
    },
    signup_at: {
        type: Date
    }
});

export default model("community", schema);