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
		"chart_home"	:"echart/chart_home",
		"chart_fpyoob"	:"echart/chart_fpyoob",
		"chart_audit"	:"echart/chart_audit",
		"chart_fai"	:"echart/chart_fai",
		"home_chart_control"	:"echart/home_chart_control",
		"page_chart_control"	:"echart/page_chart_control",
		"page_audit"	:"page_control",
		"page_fai"	:"page_control",
		"fai_odm_control"	:"echart/fai_odm_control",
		"jay"				: "jay"
	},
	waitSeconds:30,
	shim: {//模块依赖关系
		jquery			: {exports: '$'},
		'finger'		: {deps: ['jquery']},
		'swiper'		: {deps: ['jquery']},
		'tab_pick'		: {deps: ['jquery']},
		'page_control': {deps: ['jquery']},
		'onepageScroll'	: {deps: ['jquery',"finger"]},
		'chart_map'		: {deps: ['echartsConfig']},
		'chart_home'	: {deps: ['echartsConfig']},
		'chart_fpyoob'	: {deps: ['echartsConfig']},
		'chart_fpyoob_ramp'	: {deps: ['echartsConfig']},
		'chart_audit'	: {deps: ['echartsConfig']},
		'chart_fai'		: {deps: ['echartsConfig']},
		'jay'  			: {deps: ['jquery','utf','onepageScroll','scalcheight','swiper']}
	}
});
require(['jquery','onepageScroll','finger','tab_pick','jay'], function($) {
	$(function() {
		jayfunction();
	});
});
