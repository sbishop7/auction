const mongoose = require("mongoose");

const BidSchema = mongoose.Schema ({
    username: {type: String, required: true},
    amount: {type: Number, required: true}
}, {timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}})

mongoose.model("Bid", BidSchema)