require(["config"], function(){
	require(["jquery", "template","tools", "header", "footer","lunbo","cookie"], function($,template,tools,header){

		//promise
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
			});
			$("footer").load("/html/component/footer.html");
		})
		.then(function(){
			header.nav();
			header.cookie();
			header.logout();
			header.shownum();
			$("#lunbo").lunbo({
				goPrev:"left",
				goNext:"right"
			})
		}).then(function(){
			//明星产品请求假数据
			$.ajax({
				url:"http://rap2api.taobao.org/app/mock/116140/example/1541213454733",
				method:"GET",
				success:function(res){
					var str = template("star-template",{star:res.produce});
					$("#star-list").html(str);
				}
			});
			//彩妆香水请求假数据
			$.ajax({
				method:"GET",
				url:"http://rap2api.taobao.org/app/mock/116140/caizhuang",
				success:function(res){					
					var str1 = template("cai-template",{cai:res.produce});
					$("#cai-list").html(str1);
				}
			});
			//护肤养肤
			$.ajax({
				method:"GET",
				url:"http://rap2api.taobao.org/app/mock/116140/hufu",
				success:function(res){
					
					var str2 = template("hufu-template",{hufu:res.produce});
					$("#hufu-list").html(str2);
				}
			});
			//当红名膜请求假数据
			$.ajax({
				method:"GET",
				url:"http://rap2api.taobao.org/app/mock/116140/mianmo",
				success:function(res){
					var str3 = template("mianmo-template",{mianmo:res.produce});
					$("#mianmo-list").html(str3);
				}
			});
			//工具洗护请求假数据
			$.ajax({
				method:"GET",
				url:"http://rap2api.taobao.org/app/mock/116140/xihu",
				success:function(res){
					var str4 = template("gongju-template",{gongju:res.produce});
					$("#gongju-list").html(str4);
				}
			});
			//美容食品请求假数据
			$.ajax({
				method:"GET",
				url:"http://rap2api.taobao.org/app/mock/116140/food",
				success:function(res){
					var str5 = template("food-template",{food:res.produce});
					$("#food-list").html(str5);
				}
			});
			
		})


	})
})