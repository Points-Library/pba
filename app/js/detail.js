require(["config"],function(){
	require(["jquery","header","footer","template","cookie","fdj"],function($,header,footer,template){
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
			//从url上取出id参数，然后携带这个参数去请求当前数据(请求数据库用的方法)
			var str = location.search.slice(1);
			var arr = str.split("=");//["id","3"];
			var obj ={};
			obj[arr[0]] = arr[1];			
			$.ajax({
				method:"GET",
				url:"http://rap2api.taobao.org/app/mock/116140/details",
				success:function(res){
					var str = template("detail-template",{detail:res.pro_details});
					var str1 = template("hot-template",{hot:res.hot_pro});
					$("#detail-wrap").html(str);
					$("#hot-ul").html(str1);
					
					//数据渲染完后找到加入购物车这个按钮
					$("#add-btn").click(function(e){
//						点击加入购物车后弹出加入购物车成功
						$(".zhebi").show();
						$(".ok-add").show();
						//匹配自动在js值和json文本中的转换
						$.cookie.json = true;
						//获取当前选购的商品的信息
						
						var product = 
							{
								id:arr[1],
								title:$(".pro_title").text(),
								img:$(".detail-img img:first").attr("src"),
								price:$(".pro_price").text().slice(1),
								num:1
							};
						//判断是否已经选购过当前商品
						//首先从cookie读取已有的数据
						var pro;
						if($.cookie("product")){
							pro = $.cookie("product");
						}
						else{
							pro = [];
						}
						
						//判断是否已有选购
						var has = pro.some(function(now){
							
							if(now.id == product.id){
								//说明选购过
								now.num++;//数量自增
								return true;
							}
							return false;
						})
						//没有选购过
						if(!has){
							pro.push(product);
						}
						$(".cart-num").text(pro.length);
						//保存购物车，存cookie
						$.cookie("product",pro,{
							expires:3,
							path:"/"
						});
			
					})
					//点击继续购物后隐藏弹出的框
					$(".go-on").click(function(){
						     $(".zhebi").hide();
							$(".ok-add").hide();
					})
					//数量+
					$(".add").click(function(){
						var value = $(".in-num").val();
						value++;
						$(".in-num").val(value);
					})
					//数量-
					$(".sub").click(function(){
						var value = $(".in-num").val();
						if(value>1){
							value--;
							$(".in-num").val(value);
						}else{
							return ;
						}
						
					})
                    
				}
				
			});
			
		})
	})
})
