require(["config"],function(){require(["jquery","template","tools","header","footer","lunbo","cookie"],function(a,e,o,t){new Promise(function(o,t){a("header").load("/html/component/header.html",function(){o()}),a("footer").load("/html/component/footer.html")}).then(function(){t.nav(),t.cookie(),t.logout(),t.shownum(),a("#lunbo").lunbo({goPrev:"left",goNext:"right"})}).then(function(){a.ajax({url:"http://rap2api.taobao.org/app/mock/116140/example/1541213454733",method:"GET",success:function(o){var t=e("star-template",{star:o.produce});a("#star-list").html(t)}}),a.ajax({method:"GET",url:"http://rap2api.taobao.org/app/mock/116140/caizhuang",success:function(o){var t=e("cai-template",{cai:o.produce});a("#cai-list").html(t)}}),a.ajax({method:"GET",url:"http://rap2api.taobao.org/app/mock/116140/hufu",success:function(o){var t=e("hufu-template",{hufu:o.produce});a("#hufu-list").html(t)}}),a.ajax({method:"GET",url:"http://rap2api.taobao.org/app/mock/116140/mianmo",success:function(o){var t=e("mianmo-template",{mianmo:o.produce});a("#mianmo-list").html(t)}}),a.ajax({method:"GET",url:"http://rap2api.taobao.org/app/mock/116140/xihu",success:function(o){var t=e("gongju-template",{gongju:o.produce});a("#gongju-list").html(t)}}),a.ajax({method:"GET",url:"http://rap2api.taobao.org/app/mock/116140/food",success:function(o){var t=e("food-template",{food:o.produce});a("#food-list").html(t)}})})})});