require(["config"],function(){require(["jquery"],function(n){var s=/^[1][3,4,5,7,8][0-9]{9}$/,i=/^.{6,}$/;n("form").submit(function(e){var t=n("#phone").val(),r=n("#pas").val(),a=n("#repas").val(),o=[!1,!1,!1];if(s.test(t)?o[0]=!0:alert("请输入有效手机号"),i.test(r)?o[1]=!0:alert("密码必须六位以上"),a==r?o[2]=!0:alert("两次输入密码不一致"),o.every(function(e){return e})){var l={phone:t,password:r};n.ajax({method:"POST",url:"http://localhost/server/api/register.php",dataType:"json",data:l,success:function(e){1===e.code?(alert("注册成功"),window.location.href="http://localhost:2333/html/login.html"):alert("错误")}}),e.preventDefault()}else e.preventDefault()})})});