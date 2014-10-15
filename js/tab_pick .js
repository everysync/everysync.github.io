;(function($) {
	//user msg
	$.fn.usermsg = function(options) {
		var opt = $.extend({
			_showClass:"",
			_listItem:"",
			_containt:"",
			afclick:""
		},options);
		
		
		
		return this.each(function() {
			var $me;
			var item = opt._listItem;
			var meShow = function(me) {
				me.addClass(opt._showClass);
			};
			var meHide = function(me) {
				me.removeClass(opt._showClass);
			};
			$me = $(this);
			$me.on("click", function(e) {
				e.stopPropagation();
				if ($me.hasClass(opt._showClass)) {
					meHide($me);
					return;
				}
				
				meShow($me);
				opt._containt.on("click.meHide", function() {
					meHide($me);
					opt._containt.off("click.meHide");
				});
			}).on('click', item, function(e) {
				e.stopPropagation();
				if (opt.afclick) {
					opt.afclick($me,this);
				}
			});
		});
	};
	//map jquery Jay 2014-4-21
	$.fn.mapevent = function(options) {
		var opt = $.extend({
			childElem:"area",			//map标签子集的选择器
			linktoELem:".mapCurrert",	//滚动区域选择器
			linktoLight:".mapCurrentLight",//滚动区域光条
			//linktoName:".mapCurrentShowname span",//点击之后，焦名字点推送到的选择器
			fixindex:0,				//调整index增量
			img_width:500,				//图片区域宽度
			img_height:400,				//图片区域高度
			//currentIndex:"上海",			//默认显示的区域
			scrolldirection:"down",		//滚动区域图片滚动的方向（ down，right ）
			afclick:"",
			afload:""
		},options);
		var self = $(this),
			selfWrap = self.parent(),
			linkToElm = $(opt.linktoELem),
			linkToligh = $(opt.linktoLight),
			linkToname = $(opt.linktoName),
			child = self.find(opt.childElem),
			currentName = self.attr("current"),
			scrdir,
			mapCurrent;
		
		//判断图片滚动的方向，
		if (opt.scrolldirection == "down") {
			scrdir = function(num,index) {
				return "left " + -num*Number(index+opt.fixindex) + "px";
			};
		} else if (opt.scrolldirection == "right") {
			scrdir = function(num,index) {
				return -num*Number(index+opt.fixindex) + "px" + " top";
			};
		}
		
		//创建跳转省份焦点的方法
		var gotoIndex = function(elem, num, index) {
			elem.css("background-position", scrdir(num,index));
		};
		//创建显示焦点名字的方法
		var setName = function(elem,str) {
			elem.text(str);
		};
		//套用 and 调用
		
		//初始化
		if ( !self.attr("current") ) {
			mapCurrent = child.filter( "[href*='"+ opt.currentIndex +"']" ).index();
		} else if ( self.attr("current") && self.attr("current") !== "" ) {
			var tempcur = self.attr("current");
			var indexcur = child.filter( "[href*='"+ tempcur +"']" );
			mapCurrent = indexcur.index();
		}
		//初始化焦点名字
		setName(linkToname,currentName);
		//初始化焦点地图
		gotoIndex(linkToElm, opt.img_height, mapCurrent );
		//初始化焦点光，并定缓存起来以后调用
		var gotolight = function() {gotoIndex(linkToligh, opt.img_height, mapCurrent );};
		gotolight();
		//初始化加载之后，执行afload event 事件，获取当前名字，当前名字的index
		if(opt.afload) {opt.afload(currentName,mapCurrent);}
		//鼠标事件
		self.on("mouseover", opt.childElem, function(event) {
			event.stopPropagation();
			var _this = $(this);
			gotoIndex(linkToElm,opt.img_height, _this.index());
		}).on("click", opt.childElem, function(event) {
			event.stopPropagation();
			var _this = $(this);
			gotoIndex(linkToElm,opt.img_height, _this.index());
//            var _this = $(this);
//			mapCurrent = _this.index();
//			
//			//下面是点击事件之后获取到的数据的接口
//			if (opt.afclick) {opt.afclick(currentName,mapCurrent);}
//			event.preventDefault();
		});
		selfWrap.on("mouseleave", function(event) {
			event.stopPropagation();
			gotoIndex(linkToElm, opt.img_height, mapCurrent );
		});
		return this;
	};
	//侧栏
	$.fn.leftSide=function(options) {
		var opt = $.extend({
			//options
			arrow:".listArrow",
			animateSpeed: 0,				//动画速度
			startLinkIndex:"",				//二级菜单链接焦点状态，会覆盖页面cur识标
			startMainIndex:"",				//一级菜单链接焦点状态，会覆盖页面cur识标
			afslideDown:"",					//当二级菜单展开的时候事件接口
			helpCls:"show",					//协助样式，一般不用管它
			echWrap :".es_side_levelWrap",	//每个伸缩层级的最外层
			echTitle:".es_tLinks",			//每个伸缩层级的标题
			echArea:".es_tDataArea",		//每个伸缩层级的二级包裹
			echdLink:".es_dLinks"			//每个伸缩层级的二级链接
		},options);
		var $self		= $(this);
		var hepcls		= opt.helpCls;
		var $echWrap	= $self.find(opt.echWrap);
		var $echsubLink	= $self.find(opt.echdLink);
		var echTit		= opt.echTitle;
		var $echTit		= $(echTit);
		var echArea		= opt.echArea;
		
		var slidfn = function(elem,speed,callback) {
			var thisSpeed;
			var thisCallback;
			thisSpeed = Number(speed || opt.animateSpeed);
			if (callback) {
				thisCallback =  opt.afslideDown;
			}
			if ( elem.hasClass(hepcls)&& !opt.startMainIndex) {
				elem.children(echArea).stop(true).slideUp(thisSpeed);
				elem.removeClass(hepcls);
				return;
			}
			elem
				.addClass(hepcls)
				.children(echArea)
				.stop(true)
				.slideDown(thisSpeed, function(){if(thisCallback){thisCallback($self,elem,elem.children(echArea));}})
				.end()
				.siblings(opt.echWrap)
				.removeClass(hepcls)
				.children(echArea)
				.stop(true)
				.slideUp(thisSpeed);
		};

		if (!opt.startLinkIndex && !opt.startMainIndex) {
			slidfn($self.find(".cur").closest(opt.echWrap),"0", opt.afslideDown);
		} else if (opt.startMainIndex) {
			$echsubLink.removeClass("cur");
			$echTit.filter(document.getElementById(opt.startMainIndex)).closest(opt.echWrap).addClass(hepcls);
			window.onload=function() {
				setTimeout(function(){
					slidfn($echTit.filter(document.getElementById(opt.startMainIndex)).closest(opt.echWrap),"120", opt.afslideDown);
                    opt.startMainIndex = '';
				},0);
			};
		} else {
			$echsubLink.removeClass("cur");
			$echsubLink.filter(document.getElementById(opt.startLinkIndex)).addClass("cur");
			slidfn($self.find(".cur").closest(opt.echWrap),"0", opt.afslideDown);
		}
		
		$echWrap.each(function() {
			var $this_out = $(this);
			if ($this_out.find(opt.echdLink).length>0 ) {
				$this_out.find(opt.echTitle).prepend('<span class="listArrow"></span>')
			}
			
			$this_out.on("click", echTit, function(e) {
				slidfn($this_out,"",opt.afslideDown);
				if ( $(this).attr("href") == "#" ) {
					return false;
				}
				e.stopPropagation();
			}).on("click", opt.echdLink, function(e) {
				var $this = $(this);
				$echsubLink.removeClass("cur");
				$this.addClass("cur");
				e.stopPropagation();
			}).on('click', opt.arrow, function(e) {
				
				slidfn($this_out,"",opt.afslideDown);
				e.stopPropagation();
				e.preventDefault();
			});
		});
		
		return this;
	};
	//tabs fn
	$.fn.Tabs=function(options){
		// 处理参数
		options = $.extend({
			event : 'click',		//事件类型  
			timeout : 0,			//设置事件延迟
			auto : 0,				//多少秒自动切换一次  
			tabBoxLayout:"div",		//tabBox的子集
			findInSelf:false,		//用于元素都是处于同个HTML tag里面的时候调用方法
			callback : null			//回调函数
		}, options);
		return this.each(function() {
			if (options.findInSelf===true) {
				var self = $(this);
				var baseClass = self.attr("class").split(" ")[0];
				var tabClass = baseClass + "_tab";
				var conClass = baseClass + "_tabbox";
				//--
				var tabBox = self.find("."+conClass).children( options.tabBoxLayout );
				var menu = self.find("."+tabClass);
				var items = menu.find( '.iTab' );
				var timer;
			} else {
				var self = $(this),
					selfboxID = $(this).attr("class").split(" ")[0] + '_tabbox',
					tabBox = $( '#' + selfboxID ).children( options.tabBoxLayout ),
					menu = self,
					items = menu.find( '.iTab' ),
					timer;
			}
			
			tabBox.eq(items.filter(".cur").index()).removeClass("stopHide");

			var tabHandle = function( elem ){
					elem.siblings( '.iTab' )
						.removeClass( 'cur' )
						.end()
						.addClass( 'cur' );

					tabBox.siblings( options.tabBoxLayout )
						.addClass( 'stopHide' )
						.end()
						.eq( elem.index() )
						.removeClass( 'stopHide' );
				},

				delay = function( elem, time ){
					time ? setTimeout(function(){ tabHandle( elem ); }, time) : tabHandle( elem );
				},

				start = function(){
					if( !options.auto ) return;
					timer = setInterval( autoRun, options.auto );
				},

				autoRun = function(){
					var current = menu.find( '.cur' ),
						firstItem = items.eq(0),
						len = items.length,
						index = current.index() + 1,
						item = index === len ? firstItem : current.next( '.iTab' ),
						i = index === len ? 0 : index;

					current.removeClass( 'cur' );
					item.addClass( 'cur' );

					tabBox.siblings( options.tabBoxLayout )
						.addClass( 'stopHide' )
						.end()
						.eq(i)
						.removeClass( 'stopHide' );
				};

			items.bind( options.event, function(){
				delay( $(this), options.timeout );
				var _this = $(this);
				if( options.callback ){
					options.callback( self,_this );
				}
			});

			if( options.auto ){
				start();
				self.hover(function(){
					clearInterval( timer );
					timer = undefined;
				},function(){
					start();
				});
			}
		});
	};
	
	
	//map sider
	$.fn.mapSider=function(options) {
		var opt = $.extend({
			pse:"right",
			moveSize:390,
			con:".mapSideWrap",
			speed: 120
		},options);
	
		return this.each(function() {
			var $bar = $(this);
			var $con = $(opt.con);
			var movesize = opt.moveSize;
			var speed = opt.speed;
			
			$bar.on("click", function(e) {
				e.stopPropagation();
				if ($con.hasClass("isshow")) {
					$con.removeClass("isshow").stop(true).animate({
						right:-390
					},opt.speed);
					
				} else {
					$con.addClass("isshow").stop(true).animate({
						right:"0"
					},opt.speed);
				}
			});
		});
	};
	
	//slidUp AND Down
	$.fn.supdn=function(options) {
		var opt = $.extend({
			afterShow:"",		//动画结束的时候的回调函数接口
			bindToCon:"",		//绑定切换的元素
			togClassOne:"",		//切换样式1
			togClassTwo:"",		//切换样式2
			animateSpeed:120	//切换的动画时间， 0 就是没动画。
		},options);
		var $self = $(this);
		$self.each(function(i,el) {
			var $this = $(el);
			var $btc = $(opt.bindToCon);
			$this.on("click", function(e) {
				e.stopPropagation();
				if ($this.hasClass(opt.togClassOne)) {
					$this.removeClass(opt.togClassOne).addClass(opt.togClassTwo);
				} else {
					$this.removeClass(opt.togClassTwo).addClass(opt.togClassOne);
				}
				$btc.slideToggle(opt.animateSpeed, function() {
					if (opt.afterShow) {
						opt.afterShow();
					}
				});
			});
		});
		return this;
	};
	//auto complete position
	$.fn.autocom = function(options) {
		var opt = $.extend({
			clsTop:"showtop",
			clsBot:"showbot",
			clsTopRight:"showtopright",
			clsBotLeft:"showbotleft"
		},options);
		var self,
			offset;
		return this.each(function(i,el) {
			self = $(el);
			
			self.on("click", function(e) {
				e.stopPropagation();
				offset = self.offset();
				
			})
		});
	};
//--	
})(jQuery);

var setResize = function(obj,fn) {
	obj.each(function(i,d) {
		var _this = $(d);
		_this.removeAttr("style");
		//var oh;
		//var ow;
		_this.css({
			width:_this.css("width"),
			height:_this.css("height")
		});
	});
};

//建立图层自适应
var layoutBuilding = function(dom,bdy) {
	var domHeight; 
	var tempCss;
	var tempCssDom;
	var calcDomh;
	var calcDomhBot;
	domHeight = dom.height();
	if (!document.getElementById("tempCss") && window.top === window.self) {
		bdy.append( $("<div id='tempCss' />"));
		tempCssDom = $("#tempCss");
	} else {
		tempCssDom = $("#tempCss");
	}
	//if ( (domHeight/2-18) < 325) { calcDomh = 325; } else { calcDomh = (domHeight/2-18); }
	//if (domHeight - 4 - 325 - 30 < 325) { calcDomhBot = 325; } else { calcDomhBot = domHeight - 4 - 325 - 30; }
	calcDomh = (domHeight/2-24);
	if (domHeight - 4 - 325- 30 < 230) { calcDomhBot = 230; } else { calcDomhBot = domHeight - 4 - 325 - 30; }

	tempCss = 
		"<style>\n"+
			".halfHeight {height:"+ Math.floor(calcDomh) +"px}\n"+
			".botHeight {height:"+ Math.floor(calcDomhBot) +"px}\n"+
            ".height_40 {height:"+ Math.floor(calcDomh-30) +"px}\n"+
            ".height_60 {height:"+ Math.floor(calcDomh+30) +"px}\n";
	if(dom.width()<800){
		tempCss += ".height_40.stop_char1 {height:"+ Math.floor(calcDomh+30) +"px}\n";
	}
	tempCss += "</style>";
	if(domHeight>500){
		tempCssDom.html(tempCss);
	}
};
//DOM READY
$(function() {
	//消除移动设备(IOS)上面Click事件300ms延迟
	FastClick.attach(document.body);
	

	
	//缓存一些常用变量
	var win = $(window);
	var doc = $(document);
	var bdy = $("body");
	if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
		$('html').addClass('ipad ios7');
	}
	doc.on("touchmove", function(e) {
		//e.preventDefault();
	});
	//msg 点击显示
	$(".haslist").usermsg({
		_showClass:"msg-show",
		_listItem:".mhl-item",
		_containt:doc,
		afclick:function(a,b) {
			alert(
				'你点击的是这个东西的第'+ ($(b).index()+1)+'个' +'\n'+
				$(b).html()
			)
		}
	});

	//弹出框
	var diaMSK = $(".dialogMask");
	var diaDIO = $(".esdialogCls");
	
	if (diaMSK.length && diaDIO.length ) {
		diaDIO.click(function(e) {
			diaMSK.hide(0);	
		});
	}
	//地图侧拉marquee
	$(".ifout_marquee").each(function(index, element) {
		var _this = $(this);
		var _i = _this.find("i");
		if ( _i[0].clientWidth > _this.width ()) {
			_i.wrap("<marquee scrollamount='2'>")
		}
	});
	
	//FAI地图区域
	$(".mapEvent").mapevent({
			childElem:"tr",			//map标签子集的选择器
			linktoELem:".pixerMap",	//滚动区域选择器
			fixindex:1,
			//linktoLight:".mapCurrentLight",//滚动区域光条
			//linktoName:".mapCurrentShowname span",//点击之后，焦名字点推送到的选择器
			img_width:588,				//图片区域宽度
			img_height:289,				//图片区域高度
			//currentIndex:"上海",			//默认显示的区域
			scrolldirection:"down",		//滚动区域图片滚动的方向（ down，right ）
			afclick:"",
			afload:""	
	});
	
	//移动设备的菜单按钮
	$(".es_side_button").on("click", function(e) {
		//alert(0)
		e.stopPropagation();
		bdy.toggleClass("openSide");
	});
	
	//调用图层自适应
	layoutBuilding($(".scalcHeighWrap"),bdy);
	win.on("resize", function() {
		layoutBuilding($(".scalcHeighWrap"),bdy);
		setResize($(".setResize"));
	
	});
	
	//地图图层的收缩FN引用
	$(".sideBar").mapSider({});
	//收缩-1
	$(".slidckb_1").supdn({
		bindToCon:".slidckb_1_con",
		togClassOne:"fromSlideUp",
		togClassTwo:"fromSlideDown",
		afterShow:function() {
			$.each(myscrolls, function(i,v){
				//刷新已经缓存的滚动条
				myscrolls[i].refresh();
			});
		}
	});
	$(".slidckb_2").supdn({
		bindToCon:".slidckb_2_con",
		togClassOne:"fromSlideUp",
		togClassTwo:"fromSlideDown",
		afterShow:function() {
			$.each(myscrolls, function(i,v){
				//刷新已经缓存的滚动条
				myscrolls[i].refresh();
			});
		}
	});
	
	$("#getjson").click(function() {
		$.getJSON("js/search.json",function(data) {
			console.log(data);
			$.each(data, function(index,val) {
				//console.log(index,val);
			});
		});
		//.success(function() { alert("second success"); })
		//.error(function() { alert("error"); })
		//.complete(function() { alert("complete"); });
	});
	
	//用来控制显示侧栏图表
	var showChatTemp = function(a,b,c) {
		if (c.hasClass("showChart")){
			c.append('<div style="width:100%;height:150px;" id="demoCharts_left5">2222</div>');
			c.removeClass("showChart");
//            myecharts.resetOption();
			showChatTemp= function(){};
		}
	};

	//通过地址栏参数获取侧栏current值
	
	var GetQueryString = function(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!==null)return  unescape(r[2]); return null;
	};
	var getstr1 = GetQueryString('fircur'); //获取侧栏1级菜单的状态识标,比二级菜单权重大
	var getstr2 = GetQueryString('seccur'); //获取侧栏2级菜单的状态识标

	$(".es_side_elem").leftSide({
		afslideDown:function(a,b,c){ showChatTemp(a,b,c);},
		startMainIndex:getstr1,
		startLinkIndex:getstr2
	});
	
	
	//用来缓存页面scroll 的 object
	window.myscrolls=[];
	//排除iscroll阻止事件对象
	var exiScrollpreventDefaultException =/(^|\s)ipd|create|es_tLinks|es_dLinks(\s|$)/;
	
	if (navigator.userAgent.toLowerCase().match(/android/i) != "android") {
		//Scroll Containers
			;(function() {
			$(".iscroll").each(function(index,dom) {
				var myscroll = new IScroll(dom, {
					preventDefaultException:{
						className: new RegExp(exiScrollpreventDefaultException),
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL|EM|A|SPAN|STRONG|INS|DIV|TD|TR|TH|TABLE|LI)$/ 
					},
	//				disableMouse:true,
	//				preventDefault:false,
					keyBindings: true,
					scrollbars: true,
					mouseWheel: true,
					interactiveScrollbars: true,
					shrinkScrollbars: 'scale',
					fadeScrollbars: true,
					mouseWheelSpeed:30
				});
				myscrolls[index] =  myscroll;
			});
			$.each(myscrolls, function(i) {
				myscrolls[i].on("scrollStart", function() {
					myscrolls[i].refresh();
				})
			});
			//console.log(myscrolls);
			$(".iscrollinner").each(function(index,dom) {
				var myscrollx = new IScroll(dom, {
					preventDefaultException:{
						className: new RegExp(exiScrollpreventDefaultException),
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL|EM|A|SPAN|STRONG|INS)$/ 
					},
					//click:true,
					tap: true,
					
	//				preventDefault:false,
					bindToWrapper:true,
					//keyBindings: true,
					scrollbars: true,
					mouseWheel: true,
					interactiveScrollbars: true,
					shrinkScrollbars: 'scale',
					fadeScrollbars: true,
					mouseWheelSpeed:30
				});
				myscrollx.on("beforeScrollStart", function() {
					//alert(0);
					myscrollx.refresh();
					$.each(myscrolls,function(i) {
						myscrolls[i].disable();
					});
				});
				myscrollx.on("scrollStart", function() {
					//alert(0);
					myscrollx.refresh();
				});
				myscrollx.on("scrollEnd", function() {
					$.each(myscrolls,function(i) {
						myscrolls[i].enable();
					});
				});
			});
			
			if ($(".tab_scorll").length) {
				var width = 0;
				$('.tab_scorllinner').children().each(function() {
				  	width += $(this).outerWidth();
				});
				$('.tab_scorllinner').css('width',width);
				$('.tab_scorllinner').css('min-width','100%');
				var tabScroll = new IScroll(".tab_scorll", {
						scrollX: true,
						scrollY: false,
						tap:true
					});
				$(".tab_scorll").on("tap", ".iTab,span", function(e) {
						var _a = $(this);
						_a.trigger("click");
						e.stopPropagation();
				});
			}

			//caroulse
			if ($(".caroulesIscroll").length) {
				var scroll;
				var scrollItemWrap;
				var scrollItem;
				var caroulseScroll;
				var $scrollItem;
				scroll = $(".caroulesIscroll");
				scrollItem = "dl";
				scrollItemWrap = scroll.children(".caroulesWrapper");
				$scrollItem = scrollItemWrap.children(scrollItem);
				
				scrollItemWrap.css('width', $scrollItem.width()*$scrollItem.length);
				
				//console.log(
					//scroll.find(scrollItem).width(),
					//scroll.find(scrollItem).length
				//);
				caroulseScroll = new IScroll(".caroulesIscroll", {
					scrollX: true,
					scrollY: false,
					momentum: false,
					mouseWheel: true,
					mouseWheelSpeed:1,
					snap: 'dl',
					snapSpeed: 400,
					scrollbars: true,
					keyBindings: true
					//indicators: {
					//	el: document.getElementById('indicator'),
					//	resize: false
					//}
				});

				caroulseScroll.on("beforeScrollStart", function() {
					//alert(0);
					caroulseScroll.refresh();
					scroll.addClass("start");
					$.each(myscrolls,function(i) {
						myscrolls[i].disable();
					});
				});
				caroulseScroll.on("scrollEnd", function() {
					scroll.removeClass("start");
					$.each(myscrolls,function(i) {
						myscrolls[i].enable();
					});
				});
			}
			
		})(myscrolls,exiScrollpreventDefaultException);
	}else{
		$('.iscrollinner,.iscroll,.cim_dataMain').css({'overflow':'auto'});
		;(function() {
			if ($(".tab_scorll").length) {
				var width = 0;
				$('.tab_scorllinner').children().each(function() {
				  	width += $(this).outerWidth();
				});
				$('.tab_scorllinner').css('width',width);
				$('.tab_scorllinner').css('min-width','100%');
				var tabScroll = new IScroll(".tab_scorll", {
						scrollX: true,
						scrollY: false,
						tap:true
					});
				$(".tab_scorll").on("tap", ".iTab,span", function(e) {
						var _a = $(this);
						_a.trigger("click");
						e.stopPropagation();
				});
			}

			//caroulse
			if ($(".caroulesIscroll").length) {
				var scroll;
				var scrollItemWrap;
				var scrollItem;
				var caroulseScroll;
				var $scrollItem;
				scroll = $(".caroulesIscroll");
				scrollItem = "dl";
				scrollItemWrap = scroll.children(".caroulesWrapper");
				$scrollItem = scrollItemWrap.children(scrollItem);
				
				scrollItemWrap.css('width', $scrollItem.width()*$scrollItem.length);
				
				//console.log(
					//scroll.find(scrollItem).width(),
					//scroll.find(scrollItem).length
				//);
				caroulseScroll = new IScroll(".caroulesIscroll", {
					scrollX: true,
					scrollY: false,
					momentum: false,
					mouseWheel: true,
					mouseWheelSpeed:1,
					snap: 'dl',
					snapSpeed: 400,
					scrollbars: true,
					keyBindings: true
					//indicators: {
					//	el: document.getElementById('indicator'),
					//	resize: false
					//}
				});

				caroulseScroll.on("beforeScrollStart", function() {
					//alert(0);
					caroulseScroll.refresh();
					scroll.addClass("start");
					$.each(myscrolls,function(i) {
						myscrolls[i].disable();
					});
				});
				caroulseScroll.on("scrollEnd", function() {
					scroll.removeClass("start");
					$.each(myscrolls,function(i) {
						myscrolls[i].enable();
					});
				});
			}
			
		})(myscrolls,exiScrollpreventDefaultException);
	}
    
	function setDTime() {
        var t = new Date();
        var h = "" + t.getHours();
        var m = "" + t.getMinutes();
        if (h.length == 1) {
            h = "0" + h;
        }
        if (m.length == 1) {
            m = "0" + m;
        }
        $('.es_head_timer .date').html(h + ":" + m);
        $('.es_head_timer .month_day').html(parseInt(t.getMonth()+1)+'月'+parseInt(t.getDate())+'日  ');
    }
    setDTime();
    window.setInterval(setDTime, 60000);
	$.getScript('js/pinyin.js');
    $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
        $('.es_head_timer .address').html(pinyin.go(remote_ip_info['city']));
    });
});

window.onload=function(win,doc,bdy){
	
	setResize($(".setResize"));

	
	;(function() {
		$(".insertSHTAG").on("click", ".pst_close", function(e) {
			alert(0);
			e.stopPropagation();
		});
	})();	
	
//	$("#destoryScorll").click(function() {
//		$.each(myscrolls,function(i) {
//			myscrolls[i].destroy();
//			myscrolls[i].refresh(); 
//		})
//	})

};