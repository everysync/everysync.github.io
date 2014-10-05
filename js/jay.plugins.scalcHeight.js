//处理window 最小高度。 这里不用 html ,body {height:100%} 而转用Javascript 是为了 在pad上的体验
//Author:Jay.Chen
(function (factory) {
  if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function(jQuery){
	var $ = jQuery;  // sandbox
	$.fn.winCssHeight = function(win,scalcNum,autoBody) {
		var minheightNum;
		var styles;
		var ghostElem;
		var isatbd = "";
		var atbd = autoBody || false;
		var snum = scalcNum || [0];
		minheightNum = win.height();
		if ( atbd === true ) {
			isatbd = "height:auto";
		}
		/* Example(定义高度例子):***************

		var scalcNum = [
			["wraps",100],
			["hello",40]
		];

		**************************************/	
		var snuml = snum.length;
		var snums = "";
		for (var i = 0; i < snuml; i++) {
			var _a = Number(minheightNum-snum[i][1]);
			snums = snums +"\n" + '.height_'+ snum[i][0] + '{height:'+_a+'px}'+"\n" + 
			'.height_min_'+ snum[i][0] + '{min-height:'+_a+'px}'+"\n" +
			'.height_max_'+ snum[i][0] + '{max-height:'+_a+'px; _height:'+_a+'px;}';
		}
		//console.log(snum[0])
		ghostElem = $("<div>").attr("id", "jay-layout-css").css('display', 'none');
		styles = 
			'<style type="text/css">\n' + 
				'.winminheight {\n' + 
				'min-height:' + minheightNum + 'px;\n' + 
				'_height:' + minheightNum + 'px;\n' + 
			'}\n' + 
				'.winheight {\n' + 
				'height:' + minheightNum + 'px;\n' + 
			'}\n' + 
			snums +
			'html,body {\n'+
				isatbd +'\n' +
			'}\n'+
			'</style>';
		ghostElem.html(styles);
		var ghostTemp = document.getElementById("jay-layout-css");
		if (ghostTemp) {
			$(ghostTemp).html(styles);
		} else {
			$('body').prepend(ghostElem);
		}
	};
}));
