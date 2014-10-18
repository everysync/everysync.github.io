;(function($) {
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
//--	
})(jQuery);