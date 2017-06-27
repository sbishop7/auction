const mongoose = require("mongoose");
const User = mongoose.model("User")

module.exports ={
    login: (req, res) => {
		console.log("login function", req.body)
		if(req.body.username){
			User.findOne({username: req.body.username})
				.then(user => {
					if(user){
                        req.session.username = user.username
						req.session.user_id = user._id
						res.json(true)
					} else {
						let new_user = new User(req.body)
						new_user.save()
								.then(() => {
									req.session.user_id = new_user._id
									req.session.username = new_user.username
									res.json(true)
								})
								.catch((err) => {
									console.log("User create error", err)
									res.status(500).json(err)
								})
					}
				})
		} else {
			console.log("No name given")
			res.status(500).json("No name given")
		}
	},
	check_status: (req, res) => {
		if(req.session.user_id){
            console.log("Req.session.user_id is " + req.session.user_id)
			res.json({username: req.session.username, _id: req.session.user_id})
		} else {
			res.status(500).json("Not logged in")
		}
	},
	logout: (req, res) => {
		req.session.destroy()
		res.redirect("/")
	},

    checkStatus: (req, res) => {
		if(req.session.user_id){
			res.json(req.session.user_id)
		} else {
			res.status(500).json("Not logged in")
		}
	}
}