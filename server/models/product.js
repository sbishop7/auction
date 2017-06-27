const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema ({
    product_name: {type: String, required: true, unique: true},
    bids: {type: Array, required: false}
}, {timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}})

{mongoose.model("Product", ProductSchema)}
