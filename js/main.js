//配置页面加载模块参数
require.config({
	paths: {
		"onepageScroll"		:"jquery.onepage-scroll.min",
		"jquery"			:"jquery-2.1.1.min",
		"jay"				:"jay"
	},
	shim: {//模块依赖关系 demo
		'onepageScroll'	: {deps: ['jquery']},
		'jay'  			: {deps: ['utf','onepageScroll']}
	}
});
require(
	[
		'onepageScroll',
		'utf',
		'jquery-2.1.1.min',
		'jay'		
	], 
	function (jquery,onepageScroll,utf,jay){
		$(function() {
			jayfunction();
		});
	}
);