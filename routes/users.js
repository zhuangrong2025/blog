var express = require("express")
var router = express.Router()
//var User = require("../models/users")

/* users list */
// router.get("/", function(req, res, next) {
// 	User.find().then(function(users){
// 		res.render("users", { users: users })
// 	})
// })
router.get("/", function(req, res, next) {
	res.render("users", { users: ["a","b","c","d","e"] })
})
// del user
// router.post("/del", function(req, res, next) {
// 	var id = req.body.id
// 	User.findByIdAndRemove(id).then(function(user){
// 		res.send(user)
// 	})
// })

// get edit
// router.get("/edit", function(req, res, next) {
// 	var id = req.query.id
// 	var name = req.query.name
// 	res.render("edit", { name: name })
// })
module.exports = router
