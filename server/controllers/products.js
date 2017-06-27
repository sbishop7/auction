const mongoose = require("mongoose");
const Product = mongoose.model("Product")

module.exports ={
    // one_product: (req, res) => {
    //     Product.findOne({})
    // },
    all_products: (req, res) => {
        Product.find({})
            .catch( err => res.status(500).json( err ))
            .then( data => res.json(data));
    },
    add_bid: (req, res) => {
        Product.findOne({product_name: req.body.product_name}, (err, product) => {
            if(err) {
                console.log("Found error while adding a bid")
                res.status(500).json(err)
            }else{
                product.bids = req.body.bids
                product.save()
                    .then(() => {
                        res.json(true)
                    })
                    .catch((err) => {
                        console.log("error while saving bid")
                        res.status(500)
                    })
            }
        })
        
    },
    add: (req, res) => {
		console.log("Adding Prodcut", req.body)
		if(req.body){
			Product.findOne({product_name: req.body.product_name})
				.then(data => {
					if(data){
                        console.log("product already exists")
						res.json(true)
					} else {
						let new_product = new Product(req.body)
						new_product.save()
							.then(() => {
								res.json(true)
							})
							.catch((err) => {
								console.log("Product creation error", err)
								res.status(500).json(err)
							})
					}
				})
		} else {
			console.log("No Product given")
			res.status(500).json("No name given")
		}
	},
    clear_bids: (req, res) => {
		Product.findOne({product_name: req.body.product_name}, (err, product) => {
            if(err) {
                console.log("Found error clearing bids")
                res.status(500).json(err)
            }else{
                console.log("bids are "+ req.body.bids)
                product.bids = req.body.bids
                product.save()
                    .then(() => {
                        res.json(true)
                    })
                    .catch((err) => {
                        console.log("error while clearing bids")
                        res.status(500)
                    })
            }
        })
	},
    delete_product: (req, res) =>{
        Product.remove({product_name: req.body.product_name}, (err) => {
            if(err) {
                console.log("Found error clearing bids")
                res.status(500).json(err)
            }
        })
    }
}