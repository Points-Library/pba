require(["config"],function(){
	require(["jquery"],function($){
		var phonereg = /^[1][3,4,5,7,8][0-9]{9}$/;
		var pawreg = /^.{6,}$/;
		$("form").submit(function(e){
			var phone = $("#phone").val(),
				password = $("#pas").val(),
				repas = $("#repas").val();
				
			var arr = [false,false,false];
			if(!phonereg.test(phone)){
				alert("请输入有效手机号");
			}else{
				arr[0] = true;
			}
			if(!pawreg.test(password)){
				alert("密码必须六位以上");
			}else{
				arr[1] = true;
			}
			if(repas == password ){
				arr[2] = true;
			}
			else{
				alert("两次输入密码不一致");
			}
			
	     var isPass = arr.every(function(item){
	     	  return item;
	     });
	     
	     if(isPass){
	     	var data = {
				phone: phone,
         		password:password
			};            
             $.ajax({
             	method:"POST",
             	url:"http://localhost/server/api/register.php",
             	dataType:"json",
             	data:data,
             	success:function(res){
             		if(res.code === 1){
             			alert("注册成功");        			
             			window.location.href = "http://localhost:2333/html/login.html";
             		    
             		}
             		else{
             			alert("错误");
             		}
             	}
             });
             e.preventDefault();
	    }else{
	     		     	e.preventDefault();
	     			}
		
		})
	})
})