define(["jquery","cookie"],function(){
   function Header(){
   	
   }
   
   Header.prototype.nav = function (){
   	var mypba = $(".mypba");
   	 mypba.mouseenter(function(){
   	 	$("ul",this).css({"display":"block"});
   	 })
   	 
   	 mypba.mouseleave(function(){
   	 	$("ul",this).css({"display":"none"});
   	 })
   }
   //登录成功后显示用户名
   Header.prototype.cookie = function(){
   	      var phone = $.cookie("phone");
   	   if(phone){
   	   	 $("#login-name").css({"display":"block"});
   	   	 $(".username",$("#login-name")).html("欢迎用户  "+phone);
   	   	 $(".login-out",$("#login-name")).html("注销"+"&nbsp;&nbsp;&nbsp;");
   	   }
   }
   //切换到列表页面首页的显示变化
   Header.prototype.shouye = function(){
   	 $("#all").css({"display":"none"});
   	  $("#shouye").css({"display":"block"});
   	 
   }
   //注销函数
   Header.prototype.logout = function(){
   	  $(".login-out",$("#login-name")).click(function(){
   	  	$.cookie("phone",0,{
   	  		expires:-1,
   	  		path:"/"
   	  	});
   	  	$("#login-name").css({"display":"none"});
   	  })
   }
   //购物车右上角显示数量
   Header.prototype.shownum = function(){
   	     pro = $.cookie("product");
   	     
   	     if(pro){
   	     	pro = JSON.parse(pro);
   	     	$(".cart-num").text(pro.length);
   	     }else{
   	     	//否则cookie中没有商品，则显示0
   	     	$(".cart-num").text("0");
   	     	return;
   	     }
  
   }
   return new Header();
})