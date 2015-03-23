//var window=window,$=$,console=window.console,alert=window.alert;
var $win,$doc,$body,$html;
//ventor transitionend event
var transEnd = function(namespace) {
	return "transitionend."+namespace+" webkitTransitionEnd."+namespace+" oTransitionEnd."+namespace;
};
//ventor animationend event
var animateEnd = function(namespace) {
	return "webkitAnimationEnd."+namespace+" animationend."+namespace;
};
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
		$("#sidebar").removeClass("sidebar_close");
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
		autoHeight:false,
		switchBtnCurMark:"cur"
	},options);
	var $objs = $(obj);
	var autoheight = function(wrapper,index) {
		if (opts.autoHeight === true) {
			var eachel = wrapper.children().eq(index);
			wrapper.height(eachel[0].scrollHeight)
			//console.log(eachel)
		}	
	};
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
					if (opts.autoHeight===true) {
						autoheight($switchWrap,cacheIndex);
					}
					$switchWrap.one(transEnd("switch"), function(e) {
						e.stopPropagation();
						$el.trigger("Switch_"+cacheIndex+"_ani_end");
						
						$switchWrap.off(".switch");
					});
				},
				'Switch_1':function() {
					var class_1 = opts.switchClass[cacheIndex];
					var class_2 = opts.switchClass[(cacheIndex-1)];
					$el.addClass(class_1).removeClass(class_2);
					if (opts.autoHeight===true) {
						autoheight($switchWrap,cacheIndex);
					}
					$switchWrap.one(transEnd("switch"), function(e) {
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
				//console.log()
				//console.log(newClassName)
				if ($tar.attr("class") == newClassName) {
					$tar.removeAttr("class");
					$tar.trigger(newClassName+"_off");
				} else {
					$tar.attr("class",newClassName).trigger(newClassName);
				}
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
			json_red = new Array(),
			json_na = new Array();
		$.each(jsonpCache, function(i,d) {
			d['score'] >= 95 ? json_blue= json_blue.concat(d):"";
			d['score'] < 95 && d["score"] >= 85 ? json_yellow = json_yellow.concat(d):"";
			d['score'] < 85 && d["score"] > 0 ? json_red = json_red.concat(d):"";
			d['score'] == 0 ? json_na = json_na.concat(d):"";
		});
		//console.log(json_blue);
		//console.log(json_yellow);
		//console.log(json_red);
		//console.log(json_na);
		renderLayout(json_blue,json_yellow,json_red,json_na);
	}
	function renderLayout(b,y,r,n) {
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
				if (d[i]["score"] == 0) {d[i]["score"] = "N/A"}
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
		if (n.length) {render(n.length,n,"na");}
		$targey.html( renderLayoutCache.html());
		$targey.on('click','.eb_audit_items',function(){
			page_modules.loadinto("moduleHtml/Audit_Odm.html", ".eachBlck","pagebgc-3","audit_odm");
		});
		json_blue = null;
		json_yellow = null;
		json_red = null;
		jsonpCache = null;
		json_na = null;
		renderLayoutCache = null;
	}
	$doc.on({
		"pagein_4.getAudit":function(){
			getJsonp(jsonpURL);
			$doc.one("pagein_1 pagein_2 pagein_3 pagein_5", function() {
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
	_lastPage:{},//上一页（以便返回）
	_curPage:{},//当前页
	showpage:function(_this,directRun) {
		page_modules._lastPage = page_modules._curPage;
		page_modules._curPage = _this.data();
		var $psc = page_modules.$page_show_content;
		var contantState = $psc.data("hasShowed");
		var linkURL = _this.data("url");
		var dr = directRun;
		var afterEvent = function() {
			$("#sidebar").addClass("sidebar_close");
			$(".side_hide_btn").trigger("tap");
			$psc.triggerHandler("page_showed");
		};
		if ((contantState!==true&&linkURL)||(contantState!==true&&dr===true)) {
			//showing
			$psc.addClass(_this.data("wrapclass"));
			$psc.addClass("page_showing");
			$psc.data({
				"hasShowed":true,
				"prevClass":_this.data("wrapclass")
			});
			
			$(".container").data("onepage_scroll").unbindEvents();
			$psc.on(transEnd("pshow"), function(e) {
				$psc.addClass("page_showed").removeClass("page_showing");
				afterEvent();
				$psc.off(".pshow");
				$(".app_container").addClass("hide");
			});
		} else if ((contantState===true&&linkURL)||(contantState===true&&dr===true)) {
			//showed
			$psc
				.removeClass( $psc.data("prevClass") )
				.addClass(_this.data("wrapclass"))
				.data("prevClass",_this.data("wrapclass"));
			afterEvent();
		}
	},
	hidepage:function(_this) {
		page_modules._lastPage = {};
		page_modules._curPage = {};
		var $psc = page_modules.$page_show_content;
		$(".app_container").removeClass("hide");
		$psc.addClass("page_hidding");
		$psc.on(transEnd("phide"), function(e) {
			$psc.removeClass($psc.data("prevClass"));
			$psc.removeClass("page_hidding page_showed");
			$psc.triggerHandler("page_hided");
			$psc.data("hasShowed",false);
			$(".container").data("onepage_scroll").bindEvents();
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
			if (!_this.data("url")){return ;}
			$psc.on("page_showed.loadpage", function() {
				var loads = _this.data("url") + " " + _this.data("selector");
				page_modules.$page_show_wrap.load(loads,function() {
					require( ['page_control'],function(page){
						page&&page.init(_this.data("requirejs"));
						page = null;
					});
					console.log("pageLoaded");
				});
				$psc.off(".loadpage");
			});
			page_modules.showpage(_this);
		});
		
		$("#app-load-back").on("tap", function(e) {
			//e.stopPropagation();
			if(page_modules._curPage.backFlag){
				page_modules._curPage = {};
				page_modules.loadinto(page_modules._lastPage.url, page_modules._lastPage.selector ,page_modules._lastPage.wrapclass,page_modules._lastPage.requirejs,page_modules._lastPage.backFlag);
			}else{
				var _this = $(this);
				page_modules.hidepage(_this);
			}
		});
	},
	initListLinks: function(target,url,selector,wrapclass,requirejs,backFlag) {
		$(target).data({
			"url":url,
			"selector":selector,
			"wrapclass":wrapclass,
			"requirejs":requirejs,
			"backFlag":arguments[5]||false
		});
	},
	applyTolinks:function() {
		//Qstop
		page_modules.initListLinks("#qstop_create","moduleHtml/Qstop_Create.html",".eachBlck","pagebgc-1","page_audit");
		page_modules.initListLinks("#qstop_managment","moduleHtml/Qstop_Managment.html",".eachBlck","pagebgc-1");

		//Fpyoob
		page_modules.initListLinks("#fpyoob_create","moduleHtml/FPY_OOB_Create.html",".eachBlck","pagebgc-2","page_audit");
		page_modules.initListLinks("#fpyoob_managment","moduleHtml/FPY_OOB_Managment.html",".eachBlck","pagebgc-2");

		//Audit
		page_modules.initListLinks("#audit_create","moduleHtml/Audit_Create.html",".eachBlck","pagebgc-3","page_audit");
		page_modules.initListLinks("#audit_managment","moduleHtml/Audit_Managment.html",".eachBlck","pagebgc-3");

		//fai
		page_modules.initListLinks("#fai_create","moduleHtml/FAI_CreateMQE2.html",".eachBlck","pagebgc-4","page_audit");
		page_modules.initListLinks("#fai_managment","moduleHtml/FAI_Managment.html",".eachBlck","pagebgc-4");

		//ec
		page_modules.initListLinks("#ec_create","moduleHtml/EC_Create.html",".eachBlck","pagebgc-5","page_audit");
		page_modules.initListLinks("#ec_managment","moduleHtml/EC_Managment.html",".eachBlck","pagebgc-5");
	},
	loadinto:function(url,selector,backgroundcss,requirejs,backFlag) {
		var $psc = page_modules.$page_show_content;
		var megerURL = url + " " + selector;
		var loadjs = requirejs;
		var tempData = $("<div>").data({
			"url":url,
			"selector":selector,
			"wrapclass":backgroundcss,
			"requirejs":loadjs,
			"backFlag":arguments[4]||false
		});
		$psc.on("page_showed.loadpage", function() {
			page_modules.$page_show_wrap.load(megerURL,function() {
				require( ['page_control'],function(page){
					page&&page.init(loadjs);
				});
			});
			$psc.off(".loadpage");
		});
		page_modules.showpage(tempData,true);
	},
	loadforsideCacheHTML:function(options) {
		var opts = $.extend({
			loadCacheHTML:"",
			loadCacheJS:""
		},options);
		var cachehtml = $("<div>");
		var cacheinner = "";
		cachehtml.load(opts.loadCacheHTML,function() {
			cacheinner  = $(cachehtml.html());
			opts.loadCacheJS?opts.loadCacheJS(cacheinner):"";
		});
	}
};

var popLayoutfns = {
	$selectors:{
		popmask				:$(".pop_mask"),
		pop_dir_right		:$(".pop_right_element"),
		pop_dir_top			:$(".pop_top_element"),
		pop_top_innerDOM	:$("#pt_inner"),
		pop_right_innerDOM	:$("#pr_inner")
	},
	popOptions:function(options) {
		var opts = $.extend({
			filterClassBlur		:".app_blur_filter",
			helpClass_showing	:"showing",
			helpClass_showed	:"showed",
			helpClass_hidding	:"hidding",
			helpClass_hidden	:"hidden",
			direction			:"right",	//"right" or "top"
			blur				:false,		//Add blur filter when showed
			hideAll				:false,
			hideMask			:true
		},options);
		return opts;
	},
	popshow:function(opt) {
		var default_opt = popLayoutfns.popOptions();
		var opts = $.extend({},default_opt,opt);
		var $mask = popLayoutfns.$selectors.popmask;
		var $target;
		var $otherTarget;
		var $targetInnerDOM;
		var $othertargetInnerDOM;
		var $blurTarget =$(".app_container").add( page_modules.$page_show_wrap );
		if (opts.direction == "right") {
			$target				=popLayoutfns.$selectors.pop_dir_right;
			$otherTarget		=popLayoutfns.$selectors.pop_dir_top;
			$othertargetInnerDOM=popLayoutfns.$selectors.pop_top_innerDOM;
			$targetInnerDOM		=popLayoutfns.$selectors.pop_right_innerDOM;
		} else if (opts.direction=="top") {
			$target				=popLayoutfns.$selectors.pop_dir_top;
			$otherTarget		=popLayoutfns.$selectors.pop_dir_right;
			$othertargetInnerDOM=popLayoutfns.$selectors.pop_right_innerDOM;
			$targetInnerDOM		=popLayoutfns.$selectors.pop_top_innerDOM;
		}
		
		if ($target.data("states") == "show") {
			//如果pop层是显示状态，那么触发已经显示的事件，然后不执行后面的动画动作。
			var ifhasChat = $targetInnerDOM.find("#chats");
			ifhasChat.appendTo("#chatTemplate");
			
			$target.trigger("side_showed",[opts.direction,$targetInnerDOM]);
			return ;
		}
		if ($otherTarget.data("states") == "show") {
			popLayoutfns.pophide({
				hideMask:false,
				direction:(function() {
					if (opts.direction=="right") {
						return "top";
					} else if (opts.direction == "top") {
						return "right";
					}
				})()
			})
		}
		
		page_modules.$page_show_content.on("page_showed.popEventListener", function(e) {
			popLayoutfns.pophide({hideAll:true,hideMask:true});
		});
		
		$target.addClass(opts.helpClass_showing).on(animateEnd("sidepop"),function(e) {
			//fn
			
			$(".container").data("onepage_scroll").unbindEvents();
			$target.trigger("side_showed",[opts.direction,$targetInnerDOM]).data("states","show");
			if(opts.blur===true) {$blurTarget.addClass(opts.filterClassBlur.replace(".",""));}
			
			if ($mask.data("states") != "show") {
				$mask.addClass(opts.helpClass_showing).on(animateEnd("popmask"), function() {
					$mask.data("states","show");
					$mask.removeClass(opts.helpClass_showing).addClass(opts.helpClass_showed).off(".popmask");
				});	
			}
			
			$target.removeClass(opts.helpClass_showing).addClass(opts.helpClass_showed).off(".sidepop");
		});
		
	},
	pophide:function(opt) {
		var default_opt = popLayoutfns.popOptions();
		var opts = $.extend({},default_opt,opt);
		var $mask = popLayoutfns.$selectors.popmask;
		var $target;
		var $otherTarget;
		var $targetInnerDOM;
		var $othertargetInnerDOM;
		var $blurTarget =$(".app_container").add( page_modules.$page_show_wrap );
		if (opts.direction == "right") {
			$target				=popLayoutfns.$selectors.pop_dir_right;
			$otherTarget		=popLayoutfns.$selectors.pop_dir_top;
			$othertargetInnerDOM=popLayoutfns.$selectors.pop_top_innerDOM;
			$targetInnerDOM		=popLayoutfns.$selectors.pop_right_innerDOM;
		} else if (opts.direction=="top") {
			$target				=popLayoutfns.$selectors.pop_dir_top;
			$otherTarget		=popLayoutfns.$selectors.pop_dir_right;
			$othertargetInnerDOM=popLayoutfns.$selectors.pop_right_innerDOM;
			$targetInnerDOM		=popLayoutfns.$selectors.pop_top_innerDOM;
		}
		//console.log(opts.direction)
		//console.log($target)
		//如果是已经隐藏了，还被执行了隐藏动作，那么直接返回，如果包含"hideAll=true"参数则放行。
		if ($target.data("states") == "hide" && opts.hideAll === false) {
			//如果pop层是隐藏状态，那么不执行任何动作
			return ;
		}
		//如果方法包含了"hideAll"参数
		if (opts.hideAll === true) {
			$target = $target.add($otherTarget).filter(function() {
				if ($(this).data("states")=="show") {
					return $(this)
				}
			})
			//console.log($target)
		}
		//执行隐藏动作
		$target.addClass(opts.helpClass_hidding).on(animateEnd("sidepophide"),function(e) {
			//fn
			//是否包含Chat组件
			var ifhasChat = $target.find("#chats");
			if (ifhasChat.length) {ifhasChat.appendTo("#chatTemplate");}
			
			$target.trigger("side_hide",[opts.direction,$targetInnerDOM]).data("states","hide");
			$targetInnerDOM.children().remove();
			if(opts.blur===true) {$blurTarget.removeClass(opts.filterClassBlur.replace(".",""))}
			
			if (opts.hideMask === true) {
				$mask.addClass(opts.helpClass_hidding).on(animateEnd("popmask"), function() {
					$mask.data("states","hide");
					$mask.removeClass(opts.helpClass_showed + " " +opts.helpClass_hidding).off(".popmask");
				});	
				page_modules.$page_show_content.off(".popEventListener");
			}
			$target.removeClass(opts.helpClass_showed + " " +opts.helpClass_hidding).off(".sidepophide");
		});
		
		//如果内容区域是显示的，那么重新绑定事件
		if ( !($(".app_container").hasClass("hide")) ) {
			$(".container").data("onepage_scroll").bindEvents();
		}
	},
	maskhide:function(opt) {
		var default_opt = popLayoutfns.popOptions();
		var opts = $.extend({},default_opt,opt);
		var $mask = popLayoutfns.$selectors.popmask;
		$mask.addClass(opts.helpClass_hidding).on(animateEnd("popmask"), function() {
			$mask.data("states","hide");
			$mask.removeClass(opts.helpClass_showed + " " +opts.helpClass_hidding).off(".popmask");
		});	
	},
	maskshow:function(opt) {
		var default_opt = popLayoutfns.popOptions();
		var opts = $.extend({},default_opt,opt);
		var $mask = popLayoutfns.$selectors.popmask;
		if ($mask.data("states") != "show") {
			$mask.addClass(opts.helpClass_showing).on(animateEnd("popmask"), function() {
				$mask.data("states","show");
				$mask.removeClass(opts.helpClass_showing).addClass(opts.helpClass_showed).off(".popmask");
			});	
		}
	},
	modalinit:function() {
		var modal_template = $("<div>").attr("id","MODAL_TEMPLATE").css("display","none");
		$body.append(modal_template);
		var $modaltemp = $("#MODAL_TEMPLATE")
		$modaltemp.load("moduleHtml/!!!popup_1.html .popMod-template", function() {
			//初始化
			$modaltemp.find(".popMod").removeClass("popMod-template");
			window.modalinit = {
				"init":true,
				"cacheModals":[],
				"modal_show_class":"modal-in",
				"modal_hide_class":"modal-out",
				"detal":{
					"modal":$modaltemp.find(".popMod")
				}
			};
		})
	},
	modalrefresh:function() {
		modalinit.cacheModals[0].css({
			"marginTop":"-" + modalinit.cacheModals[0].height()/2 +"px"
		});
	},
	modalhide:function(target,himask) {
		var _target = target || modalinit.cacheModals[0];
		var hidemask = himask || false;
		var oldmodal = _target;
		oldmodal.on(transEnd("modalend"),function(){
			oldmodal.remove();
		});
		oldmodal.addClass(modalinit.modal_hide_class);
		if (hidemask === true ) {
			popLayoutfns.maskhide();
		}
	},
	modalshow:function(title,content,buttons,callback) {
		var _title = title || false;
		var _content = content || false;
		var _buttons = buttons || false;
		var newModal = modalinit.detal.modal.clone();
		var $buttonArea = newModal.find(".popMod-button-wrap");
		//加载标题
		if (_title === false) {
			newModal.find(".popMod-title").hide();
		} else if (_title !== false && typeof _title != "function"){
			newModal.find(".popMod-title").html($.parseHTML(_title));
		} else if (_title !== false && typeof _title == "function") {
			newModal.find(".popMod-title").html(_title);
		}
		//加载按钮区域
		if (_buttons!==false) {
			$buttonArea.html(_buttons);
		}  else {
			$buttonArea.on("click.event_modal_button_click",".pm-button", function(e) {
				popLayoutfns.modalhide(0,true);
			});
		}
		//加载内容区域
		if (_content !== false && typeof _content != "function") {
			newModal.find(".pm-cont-inner").html( $.parseHTML(_content) );
			/*console.log("initHTML")*/
		} else if (_content !== false && typeof _content == "function"){
			newModal.find(".pm-cont-inner").html( _content( newModal.find(".pm-cont-inner") ) );
			/*console.log("initFunction")*/
		}
		
		//显示遮罩
		popLayoutfns.maskshow();
		//把新Modal添加到body
		newModal.appendTo($body);
		if (modalinit.cacheModals[0]) {
			popLayoutfns.modalhide();
		}
		modalinit.cacheModals[0] = newModal;
		//重新定位Modal高度，并居中它
		newModal.css({
			"marginTop":-newModal.height()/2
		});
		setTimeout(function() {newModal.addClass(modalinit.modal_show_class)},28);
//		console.log(modalinit.cacheModals)
		//callback
		if (callback) {
			callback(newModal);
		}
	}
}

function testload() {
	//这个是测试直接加载页面的demo
	page_modules.loadinto("moduleHtml/Audit_Odm.html", ".AuditBlck" ,"pagebgc-2","audit_odm")
}

function initChat() {
	var chattemplate =	'<div class="emaillist clearfix">'+
						'	<span class="commenticon" style="background-image:url(images/EcIcon/comment-icon.png)"></span>	'+
						'	<div class="emailcon commentcon">'+
						'		<div class="marB10 clearfix">'+
						'			<span class="emailcon-name">Jason_Zhao</span>'+
						'			<span class="emailcon-time">2014-09-04 00:51:21</span>'+
						'		</div>'+
						'		<div class="emailcon-text">Great job!Brothers! </div> '+
						'	</div>'+
						'</div>';
	
	
	$("#chats").load("moduleHtml/UserCenter-Comment.html .EcR-box",function() {
		$("#btnsend").on("click", function() {
			if ( $("#chatInput").val() != "" ) {
				var newtemplate = $(chattemplate).clone();
				var NewDate = new Date();
				var $appcont = w_popLayoutfns.$selectors.pop_right_innerDOM.find(".EcdialogCon");
				newtemplate.find(".emailcon-text").html( $("#chatInput").val() );
				newtemplate.find(".emailcon-time").html( NewDate.getFullYear() +"-"+NewDate.getMonth() + "-" + NewDate.getDay() + " " +  NewDate.getHours()+":"+ NewDate.getMinutes()+":"+NewDate.getSeconds() );
				$appcont.append(newtemplate);
				if ($appcont[0].scrollHeight - $appcont[0].clientHeight > 0 ) {
					$appcont.animate({
						scrollTop: $appcont[0].scrollHeight - $appcont[0].clientHeight
					});
				}
				$("#chatInput").val("");
			}
		});
	});
}

function initDateTimepicker() {
	define("loadpicker",["bootstrap-datepicker.min"]);
	require(["loadpicker"], function(e) {
		//console.log( $.fn.datetimepicker )
		$doc.on("tap", ".pickerinit", function(e) {
			var $this = $(this);
			$this.datepicker("show")
		}).on("tap", ".app-load-back", function(e) {
			$(".pickerinit").datepicker("remove");
			//$(".datetimepicker").remove();
		})
	})
}


//INIT FUNCTIONS
function jayfunction() {
	$win =$(window);
	$doc =$(document);
	$body=$("body");
	$html=$("html");
	//push to window
	window.w_popLayoutfns = popLayoutfns;
	//Building_layouts
	buildLayout();
	//SWITCH
	eachblock_Switcher(".eachBlck");
	//AJAX_DATA
	//ajaxLoadData("http://127.0.0.1/jsonpcallback/jsonpcallback.js", "mydata");
	//PAGESCROLL
	pagescroll(".container",".eachBlck");
	//PAGE_1FN
	require(['home_chart_control']);
	//INIT_WORLD_MAP
	initworldmap("#svgwrap");
	//HOME_AUDIT
	home_aduit(".eb_audit_inner");
	//SIDEBAR_ACTION
	sidebaract("#sidebar");
	//PAGE_LOAD
	page_modules.init_modules_action();
	//加载Chat
	initChat();
	//init pageside cache html
	popLayoutfns.modalinit();	
	//init datetimepicker
	initDateTimepicker();
	//各种返回首页
	$doc.on("tap", ".retutnToIndex", function(e) {
		$("#app-load-back,.pop_mask").trigger("tap");
		return false
	});
	
	$(".ctrBtns").on("tap",".ctr_3", function() {
		var $psc = page_modules.$page_show_content;
		page_modules.loadforsideCacheHTML({
			loadCacheHTML:"moduleHtml/UserCenter_basemerge.html .h_auto",
			loadCacheJS:function(cacheinner) {
				var tempData = $("<div>").data({"wrapclass":"pagebgc-1"});
				$psc.on("page_showed.loadpage", function() {
					page_modules.$page_show_wrap.children().remove();
					page_modules.$page_show_wrap.append(cacheinner);
					require(["icheck.min"],function() {
						require(["userPerCenter"], function(page) {
							page.init();
						});
					});
					$psc.off(".loadpage");
				});
				page_modules.showpage(tempData,true);
			}
		});			
	}).on("tap","#qstop_search", function() {
		page_modules.loadinto("moduleHtml/Qstop_Search.html",".eachBlck","pagebgc-1","page_search");
	});
	
	$(".ctrBtns").on("tap",".ctr_1", function() {
		popLayoutfns.popshow();
	}).on("tap", ".ctr_7",function() {
		//---
		/*var $this = $(this);
		if ($this.data("chat") == "true") {return;}*/
		$doc.on("side_showed.chat", function(e,k,tar) {
			tar.append($("#chats"));
			$doc.off(".chat");
		});
		popLayoutfns.popshow({
			direction:"right"
		});	
	}).on("tap", ".ctr_4",function() {
		popLayoutfns.popshow({
			direction:"top"
		});
		$doc.on("side_showed.peo_4_s", function(e,k,tar) {
			if (k == "top") {
				console.log(k,tar)
				tar.load("moduleHtml/UserCenter-1.html .userMsg", function() {
					require(["userPerCenter"], function(data) {
						data.userInfo();
					});
				});
			}
			$doc.off(".peo_4_s");
		}).on("side_hide.peo_4_h", function(e,k,tar) {
			popLayoutfns.$selectors.pop_top_innerDOM.children().remove();
			$doc.off(".peo_4_h");
		});
	});

	$(".pop_mask").on("tap", function() {
		popLayoutfns.pophide({
			hideAll:true
		});
	});
	$doc.on("tap",'.showBox', function() {
		//获取产品的id，用于请求后台的参数
		var pid = $(this).data('pid');
		//请求后台相应的产品的详情，按如下格式拼接起来
		var shtml = '<div class="EcR-box">'+
			'	<div class="dialogTit">LCFC_HF_NB</div>'+
			'	<div class="EcdialogCon clearfix">'+
			'		<p><em class="EcDiaTit">Status:</em><span class="EcDiaInfo">Monitor</span></p>'+
			'		<p><em class="EcDiaTit">Open Date:</em><span class="EcDiaInfo">2014-09-28  08：05：51</span></p>'+
			'		<p><em class="EcDiaTit">Recovery Date:</em><span class="EcDiaInfo">2014-10-06  08：05：51</span></p>'+
			'		<p><em class="EcDiaTit">IRCT:</em><span class="EcDiaInfo">14</span></p>'+
			'		<p><em class="EcDiaTit">ODM:</em><span class="EcDiaInfo">LCFC_HF_NB</span></p>'+
			'		<p><em class="EcDiaTit">Product:</em><span class="EcDiaInfo">Yoga3 Pro</span></p>'+
			'		<p><em class="EcDiaTit">OS:</em><span class="EcDiaInfo">Windows</span></p>'+
			'		<p><em class="EcDiaTit">Issue Type:</em><span class="EcDiaInfo">Alert</span></p>'+
			'	    <p><em class="EcDiaTit">Category:</em><span class="EcDiaInfo">Supplier</span></p>'+
			'	    <p><em class="EcDiaTit">GEO:</em><span class="EcDiaInfo">EMEA AG PRG EAP MAP</span></p>'+
			'	    <p><em class="EcDiaTit">ONS:</em><span class="EcDiaInfo">No</span></p>'+
			'	    <p><em class="EcDiaTit">Q-Hold:</em><span class="EcDiaInfo">EMEA;FGs 0 WIP 0<br/>'+
			'		AG:FGs 0 WIP 0<br/>'+
			'		PRC:FGs 0 WIP 0<br/>'+
			'		EAP:FGs 0 WIP 0</span></p>'+
			'	    <p><em class="EcDiaTit">Issue Description:</em><span class="EcDiaInfo">Yoga3 Bach found 19pcs LCD </span></p>'+
			'	    <p><em class="EcDiaTit">Mfg Impact:</em><span class="EcDiaInfo">flicker at OOB inspection station,'+
			'		FR is 19/2000=0.95%</span></p>'+
			'	    <p><em class="EcDiaTit">Field Impact:</em><span class="EcDiaInfo">Stop input Yoga3 8ach</span></p>'+
			'	    <p><em class="EcDiaTit">Root Cause:</em><span class="EcDiaInfo">TBD</span></p>'+
			'	    <p><em class="EcDiaTit">Recovery plan:</em><span class="EcDiaInfo">Sumsung LCD display FW issue'+
			'		Shut up the PSR function from'+
			'		BIOS as ST solution to resume '+
			'		production line,controlrun result'+
			'		is pass</span></p>'+
			'	    <p><em class="EcDiaTit">L&amp;L</em><span class="EcDiaInfo">TBD</span></p>'+
			'	</div>'+
			'</div>';
		$doc.on("side_showed.operating", function(e,k,tar) {
			tar.append(shtml);
			$doc.off(".operating");
		});
		popLayoutfns.popshow({
			direction:"right"
		});	
	});

	$doc.on("tap",'.pageMore', function() {
		//加载更多数据..这里只是模拟效果，正式需请求后台数据
		var tbodyp = $(this).prev().find('table').attr("id");
		var tbody = $(this).prev().find('table tbody');
		tbody.append(tbody.html());
	});
	
	$doc.on("DOMMouseScroll mousewheel touchmove", ".ecPageTab", function(e) {
		e.stopPropagation();
		//return false
	})
	
}