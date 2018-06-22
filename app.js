var express = require("express")
var path = require("path")
var favicon = require("serve-favicon")
var logger = require("morgan")
var Cookies = require("cookies")
var cookieParser = require("cookie-parser")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")



var app = express()

// view engine setup
app.engine(".html",require("ejs").__express)
app.set("view engine","html")

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
//cookies
app.use(function(req, res, next){
	req.cookies = new Cookies(req, res)
	req.userinfo = {}
	if(req.cookies.get("userInfo")){
		try {
			req.userinfo = JSON.parse(req.cookies.get("userInfo"))
			console.log(req.userinfo)
		} catch (e) {}
	}
	next()
})
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", require("./routes/admin"))
app.use("/api", require("./routes/api"))
app.use("/", require("./routes/main"))
app.use("/users", require("./routes/users"))


/* 数据库连接 */
mongoose.connect("mongodb://localhost:27017/blog", function(err){
	if(err){
		console.log("connect failed")
	}else {
		console.log("connect success")
	}
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found")
	err.status = 404
	next(err)
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

module.exports = app
