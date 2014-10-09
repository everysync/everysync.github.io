//配置页面加载模块参数
require.config({
	paths: {
		//国内CDN镜像，GoogleCDN镜像，都失败的话再调用本地文件
		"jquery"			:['jquery-2.1.1.min','http://cdn.bootcss.com/jquery/2.1.1/jquery.min','http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min','jquery-2.1.1.min'],
		"swiper"			:"swiper/idangerous.swiper.min",
		"scalcheight"		:"jay.plugins.scalcHeight",
		"onepageScroll"		:"jquery.onepage-scroll.min",
		"finger"			:"jquery.finger",
		"echarts"			:"echart/echarts-map",
		'echarts/chart/pie' : 'echart/echarts-map',
		'echarts/chart/line' : 'echart/echarts-map',
		'echarts/chart/bar' : 'echart/echarts-map',
		'echarts/chart/map' : 'echart/echarts-map',
		'echarts/chart/gauge' : 'echart/echarts-map',  
		"echartsConfig"	:"echart/echartsConfig",
		"chart_map"	:"echart/chart_map",
		"chart_timeLine"	:"echart/chart_timeLine",
		"chart_gauge"	:"echart/chart_gauge",
		"jay"				:"jay"
	},
	shim: {//模块依赖关系
		jquery			: {exports: '$'},
		'finger'		: {deps: ['jquery']},
		'swiper'		: {deps: ['jquery']},
		'onepageScroll'	: {deps: ['jquery',"finger"]},
		'chart_map'	: {deps: ['echartsConfig']},
		'chart_timeLine'	: {deps: ['echartsConfig']},
		'chart_gauge'	: {deps: ['echartsConfig']},
		'jay'  			: {deps: ['jquery','utf','onepageScroll','scalcheight','swiper']}
	}
});
require(['jquery','onepageScroll','finger','jay'], function($) {
	$(function() {
		jayfunction();
	});
});
