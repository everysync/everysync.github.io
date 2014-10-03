//配置页面加载模块参数
require.config({
	paths: {
		"hammerjs"          :["http://hammerjs.github.io/dist/hammer.min","hammer.min"],
		"jqhammerjs"        :"jquery.hammer",
		"onepageScroll"		:"jquery.onepage-scroll.min",
		//如果jQuery 的CDN没加载成功，就切换到本地的jq库
		"jquery"			:['http://cdn.bootcss.com/jquery/2.1.1/jquery.min','jquery-2.1.1.min'],
		"jay"				:"jay"
	},
	shim: {//模块依赖关系 demo
		'onepageScroll'	: {deps: ['jquery','hammerjs']},
		'jay'  			: {deps: ['jquery','utf','onepageScroll']}
	}
});
require(
	[
		'hammerjs',
		'jqhammerjs',
		'onepageScroll',
		'utf',
		'jquery',
		'jay'		
	], 
	function (jquery,hammerjs,jqhammerjs,onepageScroll,utf,jay){
		$(function() {
			jayfunction();
		});
	}
);