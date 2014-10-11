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
	}
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
		var line = new LvFpyOob('chart_fpy_timeLine');
		chartObj['fpyOob_mass'].push(line);
	});
	require(["chart_fpyoob_ramp"],function(LvFpyOobRamp){//FPY/OOB Ramp
		var line1 = new LvFpyOobRamp('chart_fpy_Line1'),
				line2 = new LvFpyOobRamp('chart_fpy_Line2')
				line3 = new LvFpyOobRamp('chart_fpy_Line3');
		line1.getChartDataLine1();
		line2.getChartDataLine2();
		line3.getChartDataLine3();
		chartObj['fpyOob_ramp'].push(line1, line2, line3);
		chartObj['p2'] = chartObj['fpyOob_ramp'];
	});
	require(["chart_audit"],function(LvAudit){ //AUDIT
		var gauge = new LvAudit('chart_audit_gauge','gauge'),
				bar = new LvAudit('chart_audit_bar','bar');
		gauge.getChartDataGauge();
		bar.getChartDataBar();
		chartObj['p3'].push(gauge, bar);
	});
	require(["chart_fai"],function(LvFai){//FAI
		var pie = new LvFai('chart_fai_pie','pie'),
				bar = new LvFai('chart_fai_bar','bar');
		pie.getChartDataPie();
		bar.getChartDataBar();
		chartObj['p4'].push(pie, bar);
	});
	function disposeChart(index){//清除chart实例，减小内存使用
		$.each(chartObj['p'+index],function(k,v){
			v.chart.dispose();
		});
	}
	function resetOptionChart(index){//绘制chart
		$.each(chartObj['p'+index],function(k,v){
			v.resetOption();
		});
	}

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