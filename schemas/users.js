var mongoose = require("mongoose");

// 定义表结构
module.exports = new mongoose.Schema({
	username: String,
	password: String
});
