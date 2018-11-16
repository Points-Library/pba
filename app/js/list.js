require(["config"],function(){
	require(["jquery","header","footer","template"],function($,header,footer,template){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html",function(){
				resolve();
			})
			$("footer").load("/html/component/footer.html");			
		}).then(function(){
			header.nav();
			header.shouye();
			header.cookie();
			header.logout();
			header.shownum();
		}).then(function(){
			$.ajax({
				method:"GET",
				url:"http://rap2api.taobao.org/app/mock/116140/get",
				success:function(res){
					var str = template("list-template",{list:res.list});
					$("#l-u").html(str);
				}
			},function(){
				
			})
		})
	})
})
