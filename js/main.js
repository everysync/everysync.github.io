//配置页面加载模块参数
require.config({
	//添加加载异步加载CSS的插件
	map:{
		'*':{
			'css':'css.min'
		}
	},
	paths: {
		//国内CDN镜像，GoogleCDN镜像，都失败的话再调用本地文件
		"jquery"			:['jquery-2.1.1.min','http://cdn.bootcss.com/jquery/2.1.1/jquery.min','http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min','jquery-2.1.1.min'],
		"swiper"			:"swiper/idangerous.swiper.min",
		'fastclick'			:'fastclick',
		"scalcheight"		:"jay.plugins.scalcHeight",
		"onepageScroll"		:"jquery.onepage-scroll.min",
		"finger"			:"jquery.finger",
		"echarts"			:"echart/echarts-map",
		'echarts/chart/pie' :'echart/echarts-map',
		'echarts/chart/line':'echart/echarts-map',
		'echarts/chart/bar' :'echart/echarts-map',
		'echarts/chart/map' :'echart/echarts-map',
		"echartsConfig"		:"echart/echartsConfig",
		"chart_map"			:"echart/chart_map",
		"chart_home"		:"echart/chart_home",
		"chart_fpyoob"		:"echart/chart_fpyoob",
		"chart_audit"		:"echart/chart_audit",
		"chart_fai"			:"echart/chart_fai",
		"chart_line"		:"echart/chart_line",
		"home_chart_control":"echart/home_chart_control",
		"page_chart_control":"echart/page_chart_control",
		"page_audit"		:"page_control",
		"page_fai"			:"page_control",
		"fai_odm_control"	:"echart/fai_odm_control",
		"slick"				:"slick/slick",
		'createjs'			:'easeljs.min',
		"jay"				: "jay"
	},
	waitSeconds:30,
	shim: {//模块依赖关系
		jquery			: {exports: '$'},
		'slick'			: {deps: ['jquery']},
		'finger'		: {deps: ['jquery']},
		'swiper'		: {deps: ['jquery']},
		'tab_pick'		: {deps: ['jquery']},
		'page_control'	: {deps: ['jquery']},
		'onepageScroll'	: {deps: ['jquery',"finger"]},
		'chart_map'		: {deps: ['echartsConfig']},
		'chart_home'	: {deps: ['echartsConfig']},
		'chart_fpyoob'	: {deps: ['echartsConfig']},
		'chart_fpyoob_ramp'	: {deps: ['echartsConfig']},
		'chart_audit'	: {deps: ['echartsConfig']},
		'chart_fai'		: {deps: ['echartsConfig']},
		'chart_line'		: {deps: ['createjs']},
		'jay'  			: {deps: ['jquery','utf','onepageScroll','fastclick','scalcheight','swiper','slick']}
	}
});
//加载CSS
require([
	"css!../css/flat",
	"css!../css/mobiscroll.scroller",
	"css!../css/Audit",
	"css!../css/Bina",
	"css!../css/EC",
	"css!../css/Fai",
	"css!../css/slick"
]);

//document.addEventListener('deviceready', function() {
//require(['jquery','onepageScroll','fastclick','finger','tab_pick','jay'], function($) {
//	$(function() {
//		jayfunction();
//	});
//});
//}, false);

require(['jquery','onepageScroll','fastclick','finger','tab_pick','jay'], function($) {
	$(function() {
		jayfunction();
	});
});

require(['fastclick'],function(fastclick) {
	var Fastclick = require('fastclick');
	Fastclick.attach(document.body);
});