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
	
	var $win = $(window);
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
			$obj.on("flick", function(e) {
				if ("vertical" == e.orientation && 1 == e.direction ) {
					$obj.data("onepage_scroll").moveUp();
				} else if ("vertical" == e.orientation && -1 == e.direction) {
					$obj.data("onepage_scroll").moveDown();
				}
			});
		},
		beforeMove:function(a) {
			$(document).trigger("pageout_"+a);
			$obj.addClass("hardware-acceleration");
		},
    	afterMove: function(a) {
			$obj.removeClass("hardware-acceleration");
			$(document).trigger("pagein_"+a);
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


//第一页的所有 Function TO: PAGE_1FN
function page_1fn() {
	$(".mapSideBot").on("flick.diswheel mousewheel.diswheel DOMMouseScroll.diswheel touchmove.diswheel", function(e) {
		e.stopPropagation();
		return false;
	});
	
	var $mslistwrap = $(".mslist");
	var liTempWrap = $("<div>").attr("id","wpt");
	var liTemplate = 
			'<div class="mapDataDetail">'+
			'	<h2 class="mdh2">'+
			'		<span class="mdh2_1">标题:</span>'+
			'		<span class="mdh2_2">标题名</span>'+
			'	</h2>'+
			'	<ul class="mdhlist">'+
			'		<li class="mdhli">'+
			'			<span class="mli_l">名字</span>'+
			'			<span class="mli_r">数据</span>'+
			'		</li>'+
			'	</ul>'+
			'</div>';
	$.ajax({
		type: "get",
		url: "jsonpcallback/jsonpcallback.js",
		dataType: "jsonp",
		jsonpCallback:"mapListData"
	}).done(function(data){
		var MapArry = data["mapListData"];
		var MapArrylength = MapArry.length;
		var $a = $(liTemplate);
		for (var i=0; i<MapArrylength; i++) {
			var $kt = $(liTemplate);
			var $ktlist = $kt.find(".mdhlist");
			$kt.find(".mdh2_1").html(MapArry[i]["listTitle"]+":");
			$kt.find(".mdh2_2").html(MapArry[i]["listName"]);
			$ktlist.html("");
			$.each(MapArry[i]["listdata"], function(i,d) {
				$ktlist.append(
					$("<li>").addClass("mdhli").html(
						'<span class="mli_l">'+ d[0] +'</span>'+' <span class="mli_r">'+ d[1] +'</span>'
					)
				);
			});
			liTempWrap.append( $('<li class="msEachlist swiper-slide"></li>').append($kt) )
		}
		$mslistwrap.html( liTempWrap.html() )
		
		//init swiper
		
		var page_1_swiper = $(".mapSideBot").swiper({
			mode:'vertical',
			initialSlide:1,
			slidesPerView:'auto',
			visibilityFullFit:true,
			mousewheelControl:true,
			calculateHeight:true,
			slidesPerViewFit:true,
			centeredSlides:true,
			onSlideClick:function(sw) {
				page_1_swiper.swipeTo(page_1_swiper.clickedSlideIndex);
				var $sides = $(page_1_swiper.clickedSlide);
				$sides
					.addClass("swiper-slide-click-active")
					.siblings()
					.removeClass("swiper-slide-click-active");
			}
		});
		
		//clean
		$mslistwrap ="";
		liTempWrap ="";
		liTemplate ="";
		MapArry ="";
		MapArrylength ="";
		$a ="";
		
	}).error(function(a){
		window.console?console.log("Fail to load data!"):'';
		//do something
	}).always(function(data) {
	});	
	$.when(
		$.Deferred(function( deferred ){
			$( deferred.resolve );
		})
	).done(function(){
		//place your code here, the scripts are all loaded
		require(["chart_map"]);
		require(["chart_timeLine"]);
	});
}






//INIT FUNCTIONS
function jayfunction() {
	$win=$(window);
	$doc=$(document);
	$body=$("body");
	$html=$("html");
	//Building_layouts
	buildLayout();
	//AJAX_DATA
	//ajaxLoadData("http://127.0.0.1/jsonpcallback/jsonpcallback.js", "mydata");
	//console.log(listdata)
	//PAGESCROLL
	pagescroll(".container",".eachBlck");
	//SIDEBAR_ACTION
	sidebaract("#sidebar");
	//PAGE_1FN
	page_1fn();
}