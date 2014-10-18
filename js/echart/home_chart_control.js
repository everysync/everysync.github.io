define(function(){
	var chartObj = {
		p1:[],
		p2:[],
		p3:[],
		p4:[],
		home_map:[],
		home_bar:[],
		fpyOob_ramp:[],
		fpyOob_mass:[]
	};
	var currIdx = 1;
	require(["chart_map"],function(LvMap){//首页地图页
		var map = new LvMap('mapWrap');
		chartObj['home_map'].push(map);
		chartObj['p1'] = chartObj['home_map'];
	});
	require(["chart_home"],function(LvHome){//首页chart页
		var bar = new LvHome('chart_home_bar');
		chartObj['home_bar'].push(bar);
	});
	require(["chart_fpyoob"],function(LvFpyOob){//FPY/OOB Mass Production
		var line = new LvFpyOob('chart_fpy_timeLine','timeLine');
		chartObj['fpyOob_mass'].push(line);
	});
	require(["chart_fpyoob"],function(LvFpyOob){//FPY/OOB Ramp
		var line = new LvFpyOob('chart_fpy_Line','line');
		chartObj['fpyOob_ramp'].push(line);
		chartObj['p2'] = chartObj['fpyOob_ramp'];
	});
	require(["chart_audit"],function(LvAudit){ //AUDIT
		// var gauge = new LvAudit('chart_audit_gauge','gauge'),
		// 		bar = new LvAudit('chart_audit_bar','bar');
		// var gauge = new LvAudit('chart_audit_gauge','bar2'),
		// 		bar = new LvAudit('chart_audit_bar','timeLine');
		// chartObj['p3'].push(gauge, bar);
	});
	require(["chart_fai"],function(LvFai){//FAI
		var pie = new LvFai('chart_fai_pie','pie'),
				bar = new LvFai('chart_fai_bar','bar');
		chartObj['p4'].push(pie, bar);
		var $maptar = $("#worldmapsvg");
    function refreshData(areaName){//切换区域后执行刷新图表
    	if(pie.areaName == areaName){
    		return false;
    	}
      pie.areaName = areaName;
      pie.getChartData(1);
      bar.areaName = areaName;
      bar.getChartData(1);
    }
    $maptar.on({
      "AG":function() {refreshData("AG");},
      "EMEA":function() {refreshData("EMEA");},
      "PRC":function() {refreshData("PRC");},
      "EAP":function() {refreshData("EAP");},
      "MAP":function() {refreshData("MAP");}
    });
	});
	function disposeChart(index){//清除chart实例，减小内存使用
		$.each(chartObj['p'+index],function(k,v){
			// var img = new Image();
   //    img.src = v.chart.getDataURL();
   //    $("#"+v.dom_id).html(img);
			v.dispose();
		});
	}
	function resetOptionChart(index){//绘制chart
		currIdx = index;
		$.each(chartObj['p'+index],function(k,v){
			v.resetOption();
			//console.log('p'+index);
		});
	}
	$(window).off(".index");
	$(window).on('resize.index',function() {
		$.each(chartObj['p'+currIdx],function(k,v){
			v.chart.resize();
			v.bindEvents();
		});
	});

	$(document).on({
		"pagein_1":function(){
			resetOptionChart(1);
		},
		"pageout_1":function(){
			disposeChart(1);
		},
		"pagein_2":function(){
			resetOptionChart(2);
		},
		"pageout_2":function(){
			disposeChart(2);
		},
		"pagein_3":function(){
			resetOptionChart(3);
		},
		"pageout_3":function(){
			disposeChart(3);
		},
		"pagein_4":function(){
			resetOptionChart(4);
		},
		"pageout_4":function(){
			disposeChart(4);
		}
	});
	$(".demopagec-1").on({
		'Switch_0_ani_end':function() {
			disposeChart(1);
			chartObj['p1'] = chartObj['home_map'];
			//console.log("Switch_0_ani_end");
			resetOptionChart(1);
		},
		'Switch_1_ani_end':function() { 
			disposeChart(1);
			chartObj['p1'] = chartObj['home_bar'];
			resetOptionChart(1);
		}
	});
	$(".demopagec-2").on({
		'Switch_0_ani_end':function() {
			disposeChart(2);
			chartObj['p2'] = chartObj['fpyOob_ramp'];
			resetOptionChart(2);
		},
		'Switch_1_ani_end':function() { 
			disposeChart(2);
			chartObj['p2'] = chartObj['fpyOob_mass'];
			resetOptionChart(2);
		}
	});
});