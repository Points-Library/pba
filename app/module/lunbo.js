define(["jquery"],function($){
	
    $.fn.extend({
    	lunbo:function(obj){
    		
    		var goPrev = $("#"+obj.goPrev);
    		var goNext = $("#"+obj.goNext);
    		
    		var $ul = this.find("ul"),
    			$imgs = this.find("ul li"),
    			$ol = this.find("ol");
    			
			var index = 0; //当前播放的图片下标
			var flag = false; //默认没有开始播放
			var timer = null;
			
		$imgs.each(function(){
			$("<li>")
				.addClass($(this).index()==0?"ac":"")
				.appendTo($ol);

		});
    			
    	$ol.on("mouseenter","li",function(){
    		if(!flag){
				flag = true;
				$(this).addClass("ac").siblings().removeClass("ac");
				$imgs.eq(index).fadeOut();
				index = $(this).index();
				$imgs.eq(index).fadeIn(function(){
					flag = false;
				});
			}
    	})
		
		goPrev.click(function(){
			if(!flag){
				flag = true;
				$imgs.eq(index).fadeOut();
				if(--index < 0){
					index = $imgs.length-1;
				}
				$ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
				$imgs.eq(index).fadeIn(function(){
					flag = false;
				});
			}
			
		
		})
		
		goNext.click(function(){
			if(!flag){
				flag = true;
				$imgs.eq(index).fadeOut();
				if(++index >= $imgs.length){
					index = 0;
				}
				$ol.children().eq(index).addClass("ac").siblings().removeClass("ac");
				$imgs.eq(index).fadeIn(function(){
					flag = false;
				});
			}
		})
		
		/*var auto = (function autoPlay(){
			timer = setInterval(function(){
				$("#goNext").trigger("click");
			},2000);
			return autoPlay;
		})()*/
		
		this.hover(function(){
			clearInterval(timer);
		},(function autoPlay(){
			timer = setInterval(function(){
				goNext.trigger("click");
			},2000);
			return autoPlay;
		})());
	}
	})
})