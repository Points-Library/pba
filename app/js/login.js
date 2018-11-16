require(["config"],function(){
	require(["jquery","cookie"],function($){

		$("form").submit(function(e){
				var phone =$("#mobile").val(),
					password = $("#password").val();
			if(phone==""){
				alert("请输入手机号");
			}
			else if(phone!=""&&password==""){
				alert("请填写密码");
				
			}else{
				var data = {
				phone:phone,
				password:password
			};
			//记住密码判断
			var expires;
			if($("#check").prop("checked")){
				expires = 3;
			}
			else{
				expires = "";
			}
			$.ajax({
				method:"POST",
				url:"http://localhost/server/api/login.php",
				dataType:"json",
				data:data,
				success:function(res){
					
					if(res.code === 1){
						alert("登陆成功");
						//登录成功后存到cookie里面
						$.cookie("phone",phone,{
							expires:expires,
							path:"/"
						});
						location.href="http://localhost:2333/index.html";
					
					}
					else{
						alert("用户名或者密码错误");
					}
				}
			});
			}
			
			e.preventDefault();
			
		})
	})
})
