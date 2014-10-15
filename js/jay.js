//var window=window,$=$,console=window.console,alert=window.alert;
var $win,$doc,$body,$html;
//TO: AJAX_DATA
function ajaxLoadData(URL,DATA) {
	$.ajax({
		type: "get",
		url: URL,
		dataType: "jsonp",
		jsonpCallback:DATA
	}).done(function(data){
		//do something
		//listdata = [];
		//listdata = data;
		
	}).error(function(){
		return window.console?console.log("Fail to load data!"):'';
		//do something
	}).always(function() {
		//do something
	});	
}
//Building_layouts 
function buildLayout() {
	
	var $win =  $win || $(window);
	var $obj_1 = $(".app_header"),$obj_2 = $(".mapSideTop");
	function initlayout() {
		var scalcNum = [
			["wraps",80],
			["firstp", (function() {
				return $obj_1.height() + $obj_2.outerHeight();
			})()]
		];
		$.fn.winCssHeight($win,scalcNum);
	}
	initlayout();
	$win.on("resize", function() {
		initlayout();
	});
}


//TO:PAGESCROLL
function pagescroll(obj,content,options) {
	var $obj = $(obj);
	var opts = options || {
		sectionContainer   : "div",
		easing             : "cubic-bezier(0.86, 0, 0.07, 1)",
		loop               : true,
		animationTime      : 800,
		keyboard           : true,
		responsiveFallback : false,
		afterCreate:function(a) {
			//Add_touch_control
			/*$obj.on("flick", function(e) {
				if ("vertical" == e.orientation && 1 == e.direction ) {
					$obj.data("onepage_scroll").moveUp();
				} else if ("vertical" == e.orientation && -1 == e.direction) {
					$obj.data("onepage_scroll").moveDown();
				}
			});*/
		},
		beforeMove:function(a) {
			$doc.trigger("pageout_"+a);
			//$obj.addClass("hardware-acceleration");
		},
    	afterMove: function(a) {
			//$obj.removeClass("hardware-acceleration");
			$doc.trigger("pagein_"+a);
		}
	};
	$.extend(opts,{sectionContainer: content});
	function initps() {
		$obj.onepage_scroll(opts);
	}
	$obj.length?initps():'';
}

//TO:SIDEBAR_ACTION
function sidebaract(obj,options) {
	var opts = $.extend({
		itemsw:".sideItems",
		items:".silinks",
		itemsSeclinks:".silinksSec",
		callback:"",
		speed:0.1,
	},options);
	var $obj = $(obj);
	var $items = $obj.find(opts.items);
	var ghostElem = $("<div>").attr("id", "jay-side-css").css('display', 'none');
	var styles = $("<style>");
	var duration = function(n) {
		return "\n"+"transition-duration:"+ n +"s;"+"\n" + "-webkit-transition-duration:"+ n +"s;"+"\n" + "-moz-transition-duration:"+ n +"s;"+"\n"+ "-ms-transition-duration:"+ n +"s;"+"\n";
	};
	var delays = function(n) {
		return "\n"+"transition-delay:"+ n +"s;"+"\n" + "-webkit-transition-delay:"+ n +"s;"+"\n" + "-moz-transition-delay:"+ n +"s;"+"\n"+ "-ms-transition-delay:"+ n +"s;"+"\n";
	};
	
	$items.each(function(i,el) {
		var $isec = $(el).find(opts.itemsSeclinks);
		var itemsindex = $(el).parent().index();
		var isecLength = $isec.length;
		for (var i =0; i< isecLength; i++ ) {
			var k = i*opts.speed;
			styles.append( opts.itemsw+":nth-of-type("+ (itemsindex+1) +"):hover "+ opts.items +" "+opts.itemsSeclinks+":nth-of-type("+(i+1)+")"+" {" + delays(k) + duration(opts.speed)+"}");
			styles.append( opts.itemsw+":nth-of-type("+ (itemsindex+1) +"):hover "+ opts.items +" "+opts.itemsSeclinks+":nth-of-type("+(i+1)+"):after"+" {" + delays(k) + duration(opts.speed)+"}");
		}
		
		for (var i =0; i< isecLength; i++ ) {
			var k = i*opts.speed;
			styles.append( opts.itemsw+":nth-of-type("+ (itemsindex+1) +") "+ opts.items +" "+opts.itemsSeclinks+":nth-of-type("+(isecLength-i)+")"+" {" + delays(k) + "}");
		}
	});
	
	
	var $objparent = $obj.parent();
	var $sideBtnWrap = $(".sideBtn");
	$sideBtnWrap.on("tap", ".side_show_btn",function(e) {
		$sideBtnWrap.addClass("hide").removeClass("show");
		/*$(this).one("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function() {
			$sideBtnWrap.addClass("hided");
			$sideBtnWrap.removeClass("show hide");
		});*/
		$objparent.addClass("show").removeClass("hide");
	}).on("tap", ".side_hide_btn",function(e) {
		$sideBtnWrap.addClass("show").removeClass("hide");
		$objparent.addClass("hide").removeClass("show");
	});
	
	ghostElem.append(styles);
	var ghostTemp = document.getElementById("jay-side-css");
	if (ghostTemp) {
		$(ghostTemp).html(styles);
	} else {
		$('body').prepend(ghostElem);
	}
	
}




//TO:SWITCH
function eachblock_Switcher(obj,options) {
	var opts = $.extend({
		switchClass:["switch_1","switch_2"],
		switchWrapper:".page_swicher_wrap",
		switchBtn:".mapswipebtn",
		switchBtnCurMark:"cur"
	},options);
	var $objs = $(obj);
	if ($objs.length) {
		$objs.each(function(i,el) {
			var $el          = $(el);
			var $switchBtn   = $el.find(opts.switchBtn);
			var $switchWrap  = $el.find(opts.switchWrapper);
			var cacheIndex   = "";
			$el.on("tap", opts.switchBtn, function() {
				var $this = $(this);
				cacheIndex = $this.index();
				//console.log(cacheIndex)
				$this.addClass("cur").siblings().removeClass("cur");
				$el.trigger("Switch_" + cacheIndex );
			}).on({
				'Switch_0':function() {
					var class_1 = opts.switchClass[cacheIndex];
					var class_2 = opts.switchClass[(cacheIndex+1)];
					$el.addClass(class_1).removeClass(class_2);
					$switchWrap.one("transitionend.switch webkitTransitionEnd.switch oTransitionEnd.switch", function(e) {
						e.stopPropagation();
						$el.trigger("Switch_"+cacheIndex+"_ani_end");
						$switchWrap.off(".switch");
					});
				},
				'Switch_1':function() {
					var class_1 = opts.switchClass[cacheIndex];
					var class_2 = opts.switchClass[(cacheIndex-1)];
					$el.addClass(class_1).removeClass(class_2);
					$switchWrap.one("transitionend.switch webkitTransitionEnd.switch oTransitionEnd.switch", function(e) {
						e.stopPropagation();
						$el.trigger("Switch_"+cacheIndex+"_ani_end");
						$switchWrap.off(".switch");
					});
				}
			});
		});	
	}
}


//TO:INIT_WORLD_MAP
function initworldmap(target) {
	$(target).load("worldmap.html #worldmapsvg", function() {
		function tap_act($tar,obj) {
			$tar.on("tap",obj,function(e) {
				e.stopPropagation();
				var newClassName = $(obj).attr("id");
				$tar.attr("class",newClassName).trigger(newClassName);
			});
		}
		
		var $maptar = $("#worldmapsvg");
		tap_act($maptar, "#AG");
		tap_act($maptar, "#EMEA");
		tap_act($maptar, "#PRC");
		tap_act($maptar, "#EAP");
		tap_act($maptar, "#MAP");
		//世界地图触发的事件:
		// $maptar.on({
		// 	"AG":function() { console.log(1)},
		// 	"EMEA":function() {console.log(2)},
		// 	"PRC":function() {console.log(3)},
		// 	"EAP":function() {console.log(4)},
		// 	"MAP":function() {console.log(5)}
		// });
	});
}
//HOME_AUDIT
function home_aduit(target) {
	var jsonpURL = "jsonpcallback/jsonpcallback_audit.js";
	var jsonpCallback = "homeaudit";
	var jsonpCache;
	var renderLayoutCache;
	var $targey = $(target);
	function getJsonp(jsonpURL) {
		$.ajax({
			type: "get",
			url: jsonpURL,
			dataType: "jsonp",
			jsonpCallback:jsonpCallback
		}).done(function(data) {
			jsonpCache = data;
			splitjson();
		});
	}
	function splitjson() {
		var json_blue = new Array(),
			json_yellow = new Array(),
			json_red = new Array();
		$.each(jsonpCache, function(i,d) {
			d['score'] >= 95 ? json_blue= json_blue.concat(d):"";
			d['score'] < 95 && d["score"] >= 85 ? json_yellow = json_yellow.concat(d):"";
			d['score'] < 85 ? json_red = json_red.concat(d):"";
		});
		//console.log(json_blue);
		//console.log(json_yellow);
		//console.log(json_red);
		renderLayout(json_blue,json_yellow,json_red);
	}
	function renderLayout(b,y,r) {
		renderLayoutCache = $("<div>");
		var template = 
			'<div class="eb_audit_items">'+
			'	<div class="vam">'+
			'		<div class="eai_logo" style="background-image: url()"></div>'+
			'		<div class="eai_score">99</div>'+
			'		<div class="eai_comname">name</div>'+
			'		<div class="eai_state"></div>'+
			'	</div>'+
			'</div>';
		function render(k,d,c) {
			for (var i = 0; i< k; i ++) {
				var $tp = $(template);
				$tp.addClass(c+"_"+i);
				$tp.find(".eai_logo").css("background-image","url('"+ d[i]["logoURL"]  +"')");
				$tp.find(".eai_score").html(d[i]["score"]);
				$tp.find(".eai_comname").html(d[i]["name"]);
				$tp.find(".eai_state").addClass(d[i]["state"]);
				renderLayoutCache.append($tp);
				$tp = null;
			}
		}
		if (b.length) {render(b.length,b,"blue");}
		if (y.length) {render(y.length,y,"yellow");}
		if (r.length) {render(r.length,r,"red");}
		$targey.html( renderLayoutCache.html());
		json_blue = null;
		json_yellow = null;
		json_red = null;
		jsonpCache = null;
		renderLayoutCache = null;
	}
	$doc.on({
		"pagein_3.getAudit":function(){
			getJsonp(jsonpURL);
			$doc.one("pagein_1 pagein_2 pagein_4", function() {
				$targey.html("");
			});
		}
	});
}

//Load_Modules TO:PAGE_LOAD
var page_modules = {
	$siderEl:"",
	$page_show_content:"",
	$page_show_wrap:"",
	showpage:function(_this) {
		var $psc = page_modules.$page_show_content;
		var contantState = $psc.data("hasShowed");
		var linkURL = _this.data("url");

		if (contantState!==true && linkURL) {
			//showing
			$psc.addClass(_this.data("wrapclass"));
			$psc.addClass("page_showing");
			$psc.data({
				"hasShowed":true,
				"prevClass":_this.data("wrapclass")
			});
			$psc.on("transitionend.pshow webkitTransitionEnd.pshow oTransitionEnd.pshow", function(e) {
				$psc.addClass("page_showed").removeClass("page_showing");
				$psc.triggerHandler("page_showed");
				$psc.off(".pshow");
			});
		} else if (contantState === true && linkURL) {
			//showed
			$psc
				.removeClass( $psc.data("prevClass") )
				.addClass(_this.data("wrapclass"))
				.data("prevClass",_this.data("wrapclass"))
				.triggerHandler("page_showed");
		}

	},
	hidepage:function(_this) {
		var $psc = page_modules.$page_show_content;
		$psc.addClass("page_hidding");
		$psc.on("transitionend.phide webkitTransitionEnd.phide oTransitionEnd.phide", function(e) {
			$psc.removeClass($psc.data("prevClass"));
			$psc.removeClass("page_hidding page_showed");
			$psc.triggerHandler("page_hided");
			$psc.data("hasShowed",false);
			page_modules.$page_show_wrap.children().remove();
			$psc.off(".phide");
		});
	},


	init_modules_action:function(time) {
		page_modules.applyTolinks();
		page_modules.$siderEl = $("#sidebar");
		page_modules.$page_show_content = $(".app-init-page");
		page_modules.$page_show_wrap = page_modules.$page_show_content.children(".app-init-page-pd");
		var $psc = page_modules.$page_show_content;
		var _time = time || 600;
		var setTranTime = 
			"-webkit-transition-duration:"+_time+"ms;" +
			"-moz-transition-duration:"+_time+"ms;" +
			"-ms-transition-duration:"+_time+"ms;" +
			"-o-transition-duration:"+_time+"ms;" +
			"transition-duration:"+_time+"ms;";
		$psc.attr("style", setTranTime);
		
		
		page_modules.$siderEl.on("tap", ".fslinks", function(e) {
			e.stopPropagation();
			var _this = $(this);
			if (!_this.data("url")){return ;};
			$psc.on("page_showed.loadpage", function() {
				var loads = _this.data("url") + " " + _this.data("selector");
				page_modules.$page_show_wrap.load(loads,function() {
					require( [_this.data("requirejs")],function(page){
						page&&page.init();
					});
					console.log("pageLoaded");
				});
				$psc.off(".loadpage");
			});
			page_modules.showpage(_this);
		});
		
		$("#app-load-back").on("tap", function(e) {
			e.stopPropagation();
			var _this = $(this);
			page_modules.hidepage(_this);
		});
	},
	initListLinks: function(target,url,selector,wrapclass,requirejs) {
		$(target).data({
			"url":url,
			"selector":selector,
			"wrapclass":wrapclass,
			"requirejs":requirejs
		});
	},
	applyTolinks:function() {
		page_modules.initListLinks("#qstop","worldmap.html","svg","demopagec-3");
		//page_modules.initListLinks("#qstop2","formPage.html",".formContent","demopagec-2");
		page_modules.initListLinks("#qstop2","moduleHtml/Audit_Odm.html",".AuditBlck","demopagec-2","audit_odm_control");
	}
	/*loadmodules: function($cont,loadsurl) {
		//监听事件
		var $loadcontent = $cont;
		var $loadcontInner = $(".app-init-page-pd");
		var animateTime = 600;

		var time = 
				"-webkit-transition-duration:"+animateTime+"ms;" +
				"-moz-transition-duration:"+animateTime+"ms;" +
				"-ms-transition-duration:"+animateTime+"ms;" +
				"-o-transition-duration:"+animateTime+"ms;" +
				"transition-duration:"+animateTime+"ms;";
		//console.log(time);
		$cont.attr("style", time);
		
		$loadcontent.on("page_animateEnd", function() {
			$loadcontInner.load(loadsurl);
			$(".container").data("onepage_scroll").unbindEvents();
			$loadcontent.off("page_animateEnd");
		});
		
		if ($loadcontent.data("hasShowed") !== true ) {
			if (triggerEvent) {clearTimeout(triggerEvent)};
			$loadcontent.addClass("page_showing");
			var triggerEvent = setTimeout(function() {
				$loadcontent.triggerHandler("page_animateEnd");
				$loadcontent.data("hasShowed",true);
				$loadcontent.addClass("page_showed").removeClass("page_showing");
			}, animateTime);
		} else  if ($loadcontent.data("hasShowed") === true ) {
			$loadcontent.triggerHandler("page_animateEnd");
		}	
	},
	elementEvent:function() {
		$("#sidebar").on("tap",".fslinks", function(e) {
			e.stopPropagation();
			var _this = $(this);
			if (_this.data("url")) {
				var loads = _this.data("url") + " " + _this.data("selector");
				page_modules.loadmodules($(".app-init-page"),loads);
			}
		})
	}*/
};



//INIT FUNCTIONS
function jayfunction() {
	$win =$(window);
	$doc =$(document);
	$body=$("body");
	$html=$("html");
	//Building_layouts
	buildLayout();
	//SWITCH
	eachblock_Switcher(".eachBlck");
	//AJAX_DATA
	//ajaxLoadData("http://127.0.0.1/jsonpcallback/jsonpcallback.js", "mydata");
	//PAGESCROLL
	var pageIndex = $('.app_container').data("page");
	if(pageIndex == "index"){
		pagescroll(".container",".eachBlck");
		//PAGE_1FN
		require(['home_chart_control']);
		//INIT_WORLD_MAP
		initworldmap("#svgwrap");
		//HOME_AUDIT
		home_aduit(".eb_audit_inner");
	}else if(pageIndex == "audit_odm"){
		require(['audit_odm_control']);
	}else if(pageIndex == "fai_odm"){
		require(['fai_odm_control']);
	}
	//SIDEBAR_ACTION
	sidebaract("#sidebar");
	
	//PAGE_LOAD
	page_modules.init_modules_action();
}