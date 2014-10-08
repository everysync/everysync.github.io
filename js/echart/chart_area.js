var lvChart = {
    echarts:null,
    ecConfig:null
};

function drawChart_line(container,mydata){
    var option = {
        color:["#fff"],
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type : 'line',
                lineStyle : {
                  color: '#fff',
                  width: 2,
                  type: 'solid'
                },
                crossStyle : {
                  color: '#fff',
                  width: 2,
                  type: 'solid'
                }
            }
        },
        legend: {
            y:-300,
            data:['成交']
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        grid : {
            x:40,
            'x2':0,
            borderWidth:0
        },
        xAxis : [
            {
                'type':'category',
                boundaryGap : false,
                'axisLabel':{show : false,'interval':0,'textStyle':{color: '#E2F3F6'}},
                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'splitLine':{show : false},
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                min:0,
                max:100,
                'type':'value',
                'splitLine':{show : false},
                'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                'nameTextStyle':{color: '#E2F3F6'}
            }
        ],
        series : [
            {
                name:'成交',
                type:'line',
                'smooth':true,
                'symbol':'none',
                itemStyle: {normal: {areaStyle: {
                        // 区域图，纵向渐变填充
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, 200, 0, 400,
                                [[0, 'rgba(255,255,255,0.2)'],[0.8, 'rgba(255,255,255,0.1)']]
                            )
                        })()
                    }}},
                data:[10, 12, 21, 30, 35, 33, 30]
            }
        ]
    };        
    return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
}
function drawChart_line2(container,mydata){
    var option = {
        color:["#fff"],
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type : 'line',
                lineStyle : {
                  color: '#fff',
                  width: 2,
                  type: 'solid'
                },
                crossStyle : {
                  color: '#fff',
                  width: 2,
                  type: 'solid'
                }
            }
        },
        legend: {
            y:-300,
            data:['成交']
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        grid : {
            'x':0,
            'x2':0,
            borderWidth:0
        },
        xAxis : [
            {
                'type':'category',
                boundaryGap : false,
                'axisLabel':{show : false,'interval':0,'textStyle':{color: '#E2F3F6'}},
                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'splitLine':{show : false},
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                min:0,
                max:100,
                'type':'value',
                'splitLine':{show : false},
                'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                'nameTextStyle':{color: '#E2F3F6'}
            }
        ],
        series : [
            {
                name:'成交',
                type:'line',
                'smooth':true,
                'symbol':'none',
                itemStyle: {normal: {areaStyle: {
                        // 区域图，纵向渐变填充
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, 200, 0, 400,
                                [[0, 'rgba(255,255,255,0.2)'],[0.8, 'rgba(255,255,255,0.1)']]
                            )
                        })()
                    }}},
                data:[30, 29, 34, 40, 45, 50,46]
            }
        ]
    };        
    return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
}
function drawChart_line3(container,mydata){
    var option = {
        color:["#fff"],
        title : {
            text: '',
            subtext: ''
        },
        tooltip : {
            trigger: 'axis',
            axisPointer:{
                type : 'line',
                lineStyle : {
                  color: '#fff',
                  width: 2,
                  type: 'solid'
                },
                crossStyle : {
                  color: '#fff',
                  width: 2,
                  type: 'solid'
                }
            }
        },
        legend: {
            y:-300,
            data:['成交']
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        grid : {
            'x':0,
            'x2':0,
            borderWidth:0
        },
        xAxis : [
            {
                'type':'category',
                boundaryGap : false,
                'axisLabel':{show : false,'interval':0,'textStyle':{color: '#E2F3F6'}},
                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'splitLine':{show : false},
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                min:0,
                max:100,
                'type':'value',
                'splitLine':{show : false},
                'axisTick':{show : true,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisLine':{lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                'nameTextStyle':{color: '#E2F3F6'}
            }
        ],
        series : [
            {
                name:'成交',
                type:'line',
                'smooth':true,
                'symbol':'none',
                itemStyle: {normal: {areaStyle: {
                        // 区域图，纵向渐变填充
                        color : (function (){
                            var zrColor = require('zrender/tool/color');
                            return zrColor.getLinearGradient(
                                0, 200, 0, 400,
                                [[0, 'rgba(255,255,255,0.2)'],[0.8, 'rgba(255,255,255,0.1)']]
                            )
                        })()
                    }}},
                data:[46, 43, 38, 34, 39, 42, 48]
            }
        ]
    };        
    return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
}

$(function() {
  function requireCallback(ec) {
      lvChart.echarts = ec;
      lvChart.ecConfig = require('echarts/config');
      getChartData();
  }
  requireEcharts(0, requireCallback);
});

var chart_arr = [];
function getChartData(){
    if(lvChart.echarts == null){
        return false;
    }
    var mydata1 = {
      legend:['FPY','OOB','FPY Target','OOB Target'],
      xAxis:['TNID', 'CKSN', 'CKSD', 'WZSD', 'QSJD', 'BLDN', 'BJPD','SHPN', 'SHPD', 'HYPD', 'CDPD', 'WKSN', 'LCFC', 'PEGN','CCDN', 'WCDN', 'IUTN', 'INNB', 'WRGN', 'ITUD', 'BLDD'],
      series_bar_1:{name:'FPY',data:[]},
      series_line_1:{name:'OOB',data:[]},
      series_bar_target:25,
      series_line_target:30
    };
    for (var i = 12; i >= 0; i--) {
        var newBarArr = [],
            newLineArr = [];
        for (var j = mydata1.xAxis.length; j >= 0; j--) {
            newBarArr.push(Math.floor(Math.random()*100));
            newLineArr.push(Math.floor(Math.random()*100));
        };
        mydata1.series_bar_1.data.push(newBarArr);
        mydata1.series_line_1.data.push(newLineArr);
    };
    var myChart1 = drawChart_line('chartContainer1',mydata1);
    myChart1.loadingData();
    var myChart2 = drawChart_line2('chartContainer2',mydata1);
    myChart2.loadingData();
    var myChart3 = drawChart_line3('chartContainer3',mydata1);
    myChart3.loadingData();
}



                    