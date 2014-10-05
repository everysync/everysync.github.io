//配置页面加载模块参数
require.config({
	paths: {
		//国内CDN镜像，GoogleCDN镜像，都失败的话再调用本地文件
		"jquery"			:['http://cdn.bootcss.com/jquery/2.1.1/jquery.min','http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min','jquery-2.1.1.min'],
		"scalcheight"		:"jay.plugins.scalcHeight",
		"onepageScroll"		:"jquery.onepage-scroll.min",
		"finger"			:"jquery.finger",
		"jay"				:"jay"
	},
	shim: {//模块依赖关系
		jquery			: {exports: '$'},
		'finger'		: {deps: ['jquery']},
		'onepageScroll'	: {deps: ['jquery',"finger"]},
		'jay'  			: {deps: ['jquery','utf','onepageScroll','scalcheight']}
	}
});
require(['jquery','onepageScroll','finger','jay'], function($) {
	$(function() {
		jayfunction();
	});
});