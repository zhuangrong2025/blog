$(function(){
	var $registerBox = $("#registerBox");
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
				$(".tips").text(result.message);
				// console.log(result);
			}
		});
	});
});
