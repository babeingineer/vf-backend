import {Schema, model} from "mongoose"

const schema = new Schema({
    name :{
        type: String,
    },
    status: {
        type: String,
    },
    type: {
        type: String,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    detail: {
        type: Object,
    },
    target: {
        type: Object,
    }
})

export default model("coupon", schema);