require(["config"],function(){
	require(["jquery","header","footer","template","cookie"],function($,header,footer,template,cookie){
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
			//判断是不是有商品在购物车,有就显示商品,没有显示购物车空
			if($.cookie("product")){
				$("#no-pro").css({"display":"none"});
			}else{
				$("#no-pro").css({"display":"block"});
			}
			//如果存在cookie，拿出cookie
			var product = $.cookie("product");
			//			转成json格式
			product = JSON.parse(product);
			//渲染购物车页面
			var str = template("cart-template",{product:product});
			$("#product-tr").html(str);
				
			//事件监听到删除按钮
			$(".product-tr").on("click",".delete-btn",function(e){
				var product = $.cookie("product");
				product = JSON.parse(product);
				//找到这一行商品
				var tr = $(this).parent().parent();
				//	找到当前商品id
                var id = tr.next(".pro-id").text();
                //将当前id的商品从数组中过滤
				var pro = product.filter(function(now){
					return !(id == now.id)
				})
				//如果cookie的长度等于0，显示购物车没有东西的页面
				//并且将这个空数组在cookie中删除
				if(pro.length ==0){
					$("#no-pro").css({"display":"block"});
					pro = JSON.stringify(pro);
					$.cookie("product",pro,{
						path:"/",
						expires:-1
					});
				tr.remove();	
				total();
				pro_num();
				header.shownum();
				}
				//cookie长度不等于0，代表里面有商品
				else{
				pro = JSON.stringify(pro);
				//把新的数组存到cookie中
				$.cookie("product",pro,{
					path:"/",
					expires:10
				});
				tr.remove();	
				total();
				pro_num();
				header.shownum();
				}
				
			})
			
			
//			事件监听数量的加减按钮
			$(".product-tr").on("click",".add,.sub",function(e){
				var product = $.cookie("product");
				product = JSON.parse(product);
				var tr = $(this).parents(".product-info");
				var id = tr.next(".pro-id").text();
				var pro = product.filter(function(now){
					return (id == now.id)
				})[0];
//				数量增加或者减少
				if($(this).is(".sub")){
					if(pro.num<=1){
						return ;
					}else{
						pro.num--;
					}
					$(this).next().val(pro.num);
				}
				else{
					pro.num++;
					$(this).prev().val(pro.num);
				}
				//把新的数组重新存到cookie中
				product = JSON.stringify(product);
                   $.cookie("product",product,{
					path:"/",
					expires:10
				});
				$(this).parent().parent().next().text("￥"+pro.num*pro.price);
//				调用计算总金额的函数
				total();
				pro_num();
			})
			
			
			
			//直接输入数量的事件监听
			$(".product-tr").on("blur",".cart-input",function(e){
				var product = $.cookie("product");
				product = JSON.parse(product);
				var tr = $(this).parents(".product-info");
				var id = tr.next(".pro-id").text();
				var pro = product.filter(function(now){
					return (id == now.id)
				})[0];
				//文本框里面的正则，如果是数字就正确，否则还原原来的数量
				var numreg = /^[1-9]\d*$/
				var num = $(this).val();
				if(!numreg.test(num)){
					$(this).val(pro.num);
					return ;
				}
				pro.num = num;
				//将新的数组存到cookie中
				product = JSON.stringify(product);
                   $.cookie("product",product,{
					path:"/",
					expires:10
				});
//				计算小计里面的金额
				tr.find(".tr-count").text("￥"+pro.num*pro.price);
				total();
				pro_num();
			})
			
			
			//全选
			$(".all-check").click(function(e){
//				调用全选按钮函数,用call改变this的指向
				all.call(this);
				//调用计算金额的函数
				total();
				pro_num();
			}).trigger("click");
			
			
			//部分选中
			$(".single-check").click(function(e){
//				找到所有部分选中按钮
				var count =$(".single-check");
				var sum = 0;
//				遍历部分选中按钮的长度,选中了sum就++
				for(var i=0 ;i <count.length;i++ ){
					if($(count[i]).prop("checked")){
						sum++;
					}		
				}
				if(sum == count.length ){
//					如果部分选中按钮长度等于总长,全选按钮就选上
					$(".all-check").prop("checked",true);
				}
				else{
					$(".all-check").prop("checked",false);
				}
				//调用计算金额的函数
				total();
				pro_num();
			})
			
			//计算总金额的函数
			function total(){
				var count =$(".single-check");
				var allPrice = 0;
				for(var i=0 ;i <count.length;i++ ){
					if($(count[i]).prop("checked")){
//						找到小计金额相加得到总金额
						allPrice+= parseInt($(count[i]).parent().siblings(".tr-count").text().slice(1));
					}		
				}
				//  总金额计算
				$(".amount").text("￥"+allPrice);
			}
			
			
			//全选按钮函数
			function all(){
				var status = $(this).prop("checked");
				//将单选按钮与全选按钮的checked状态设为一致
				$(".single-check").prop("checked",status);
			}
			
			
			//计算所有的商品函数
			function pro_num(){
				var count =$(".single-check");
				var prosum = 0;
				for(var i=0 ;i <count.length;i++ ){
					if($(count[i]).prop("checked")){
					prosum +=parseInt($(count[i]).parents(".product-info").find(".cart-input").val());
					}		
				}
				$(".pro_sum").text(prosum);
				
			}
		})
	})
})
