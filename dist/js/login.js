require(["config"],function(){require(["jquery","cookie"],function(i){i("form").submit(function(e){var o=i("#mobile").val(),t=i("#password").val();if(""==o)alert("请输入手机号");else if(""!=o&&""==t)alert("请填写密码");else{var a,r={phone:o,password:t};a=i("#check").prop("checked")?3:"",i.ajax({method:"POST",url:"http://localhost/server/api/login.php",dataType:"json",data:r,success:function(e){1===e.code?(alert("登陆成功"),i.cookie("phone",o,{expires:a,path:"/"}),location.href="http://localhost:2333/index.html"):alert("用户名或者密码错误")}})}e.preventDefault()})})});