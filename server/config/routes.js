const path = require("path")
const users = require("./../controllers/users.js")
const products = require("./../controllers/products.js")

module.exports = (app) => {
		app.post("/login", users.login)
		app.get("/check_status", users.check_status)
		app.get("/logout", users.logout)
		app.post("/add_bid", products.add_bid)
		app.get("/all_products", products.all_products)
		app.post("/add_product", products.add)
		app.post("/delete_product", products.delete_product)
		app.post("/clear_bids", products.clear_bids)

    app.get("*", (req, res) => {
		res.sendFile(path.resolve("./client/dist/index.html"))
	})
}