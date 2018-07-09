var express = require("express")
var router = express.Router()
var User = require("../models/users")

/* 后台管理首页 */
router.get("/", function(req, res, next) {
	res.render("admin/admin_index", { title: "admin-index"})
})

// 用户列表
router.get("/user_index", function(req, res, next) {
	User.find().then(function(users){
		res.render("admin/user_index", { users: users})
	})

})

// 删除用户
router.post("/user_index/del", function(req, res, next) {
	var id = req.body.id
	User.findByIdAndRemove(id).then(function(user){
		res.send(user)
	})
})
module.exports = router

// 查看用户详情
router.get("/user_index/modify", function(req, res, next) {
	var id = req.query.id
	var name = req.query.name
	res.render("admin/user_modify", {id:id, name:name})
})

// 保存用户修改信息
router.post("/user_index/save", function(req, res, next) {
	var id = req.body.id
	var name = req.body.name
	User.findByIdAndUpdate(id, {$set: {username: name}}, function(err){
		if(err){
			console.error(err)
		}else{
			console.log("updated123")
		}
	})
})
