$(function(){
	var $registerBox = $("#registerBox");
	var $loginBox = $("#loginBox");
	var $successBox = $("#successBox");
	//点击注册按钮
	$registerBox.find("button").on("click",function(){
		$.ajax({
			type: "post",
			url: "api/user/register",
			data:{
				username : $registerBox.find("[name = 'username']").val(),
				password : $registerBox.find("[name = 'password']").val(),
				repassword : $registerBox.find("[name = 'repassword']").val()
			},
			dataType: "json",
			success: function(result){
				$registerBox.find(".tips").text(result.message);
				console.log(result.code);
				if( result.code == 0){
					setTimeout(function(){
						$registerBox.hide();
						$loginBox.show();
					}, 1000);
				}

			}
		});
	});
	//点击登录按钮
	$loginBox.find("button").on("click",function(){
		$.ajax({
			type: "post",
			url: "api/user/login",
			data:{
				username : $loginBox.find("[name = 'username']").val(),
				password : $loginBox.find("[name = 'password']").val()
			},
			dataType: "json",
			success: function(result){
				$loginBox.find(".tips").text(result.message);
				if( result.code == 0){
					setTimeout(function(){
					  $loginBox.hide()
						$successBox.show()
						$successBox.find("h3 span").text(result.message)
					}, 1000)
				}
			}
		});
	});
	//切换面板
	$loginBox.find(".exchange a").on("click",function(){
		$registerBox.show()
		$loginBox.hide()
	});
	$registerBox.find(".exchange a").on("click",function(){
		$registerBox.hide()
		$loginBox.show()
	});
});
