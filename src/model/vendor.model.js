import { Schema, model } from "mongoose"

const vendorSchema = new Schema({
    name: {
        type: String,
    },
    withoutCommunity: {
        type: Boolean,
    },
    communityId: {
        type: String,
    },
    shopOwner: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    subscription: {
        type: Object,
    },
    revenue: {
        type: Number,
    },
    status: {
        type: String,
    },
    signup_at: {
        type: Date,
    }
});

export default model("Vendor", vendorSchema);