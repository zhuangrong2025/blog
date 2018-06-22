var express = require("express")
var router = express.Router()
var User = require("../models/users")

/* users list */
router.get("/", function(req, res, next) {
	User.find().then(function(users){
		res.render("users", { users: users })
	})
})

// del user
router.post("/del", function(req, res, next) {
	var id = req.body.id
	User.findByIdAndRemove(id).then(function(user){
		res.send(user)
	})

})

module.exports = router
