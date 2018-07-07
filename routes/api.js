var express = require("express")
var router = express.Router()
var User = require("../models/users")

//统一返回格式用 router.use
var responseData
router.use( function(req, res, next){
	responseData = {
		code: 0,
		message: ""
	}
	next()
})
/* register */
router.post("/user/register", function(req, res, next) {
	var username = req.body.username
	var password = req.body.password
	var repassword = req.body.repassword

	// 用户名不能为空
	if( username == ""){
		responseData.code = 1
		responseData.message = "login can't be blank"
		res.json(responseData)
		return
	}
	// 密码不能为空
	if( password == ""){
		responseData.code = 2
		responseData.message = "password can't be blank"
		res.json(responseData)
		return
	}
	// 两次输入密码一致
	if( repassword != password){
		responseData.code = 3
		responseData.message = "password is different"
		res.json(responseData)
		return
	}
	// 在数据库中判断用户是否存在 findOne返回的是Promise,可以使用then
	User.findOne({
		username: username //查询条件
	}).then(function(userInfo){
		// 表示数据库中有该记录
		if( userInfo ){
			responseData.code = 4
  		responseData.message = "username is already taken"
  		res.json(responseData)
			return
		}
		//保存注册信息到数据库中
		var user = new User({
			username: username,
			password: password
		})
		return user.save() //也是返回promise,可以接着用then
	}).then(function( newUserInfo ){
		console.log(newUserInfo)
		//注册成功
  	responseData.message = "sign up success"
  	res.json(responseData)

	})


})

/* login */
router.post("/user/login", function(req, res, next) {
	var username = req.body.username
	var password = req.body.password
	//判断数据库中是否有此用户
	User.findOne({
		username: username,
		password: password
	}).then(function(userinfo){
		if(!userinfo){
			responseData.code = 1
			responseData.message = "user does not exist"
			res.json(responseData)
			return
		}
		responseData.message = "sign in success"
		responseData.userinfo = {
			username: userinfo.username
		}
		req.cookies.set("userinfo", JSON.stringify({
			username: userinfo.username
		}))
		res.json(responseData)
		return
	})

})

module.exports = router
