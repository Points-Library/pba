require.config({
	baseUrl:"/",
	paths:{
		"header":"module/header",
		"footer":"module/footer",
		"jquery":"libs/jquery/jquery-1.11.3",
      	"bootstrap":"libs/bootstrap/js/bootstrap",
      	"tools":"libs/tools",
      	"lunbo":"module/lunbo",
      	"template":"libs/template-web",
      	"migrate":"libs/jquery-migrate-1.2.1.min",
      	"cookie":"/libs/jquery.cookie",
      	"fdj":"module/fdj"
      	
      	
	},
	
	shim:{
	    "bootstrap":{
	    	deps:["jquery"]
	    }
	}
})
