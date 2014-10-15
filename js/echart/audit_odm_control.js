define([''],function(){
	var chartObj = {
		p1:[]
	};
	var currIdx = 1;
	function init(){
		console.log('init');
		chartObj.p1 = [];
		require(["chart_audit"],function(LvAudit){ //AUDIT
			var bar = new LvAudit('chart_auditOdm_bar','bar2'),
					timeLine = new LvAudit('chart_auditOdm_timeLine','timeLine');
			chartObj['p1'].push(bar, timeLine);
			resetOptionChart(1);
		});
		window.onresize = function(){
			$.each(chartObj['p'+currIdx],function(k,v){
				v.chart.resize();
			});
		}
	}

	
	function disposeChart(index){//清除chart实例，减小内存使用
		$.each(chartObj['p'+index],function(k,v){
			// var img = new Image();
   //    img.src = v.chart.getDataURL();
   //    $("#"+v.dom_id).html(img);
			v.chart.dispose();
		});
	}
	function resetOptionChart(index){//绘制chart
		currIdx = index;
		$.each(chartObj['p'+index],function(k,v){
			v.resetOption();
			//console.log('p'+index);
		});
	}

	
	return {
		init:init
	}
});