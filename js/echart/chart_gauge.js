$(function() {
    function requireEcharts(requireCallback) {
        var pathArr = [
                'echarts',
                'echarts/chart/gauge',
                'echarts/chart/bar'
            ];
            
        require(
            pathArr,
            requireCallback
        );
    }

    function drawChart_gauge(container,mydata){
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}"
            },
            title : {
                'text':'AUDIT',
                x:40,
                y:20,
                textStyle:{
                    fontSize: 24, 
                    fontWeight: 'normal',
                    color: '#fff'
                }
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name:'个性化仪表盘',
                    type:'gauge',
                    center : ['50%', '50%'],    // 默认全局居中
                    radius : [0, '55%'],
                    startAngle: 140,
                    endAngle : -140,
                    min: 0,                     // 最小值
                    max: 100,                   // 最大值
                    precision: 0,               // 小数精度，默认为0，无小数点
                    splitNumber: 10,             // 分割段数，默认为5
                    axisLine: {            // 坐标轴线
                        show: true,        // 默认显示，属性show控制显示与否
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [], 
                            width: 8
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        show: true,        // 属性show控制显示与否，默认不显示
                        splitNumber: 5,    // 每份split细分多少段
                        length :0,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#eee',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                        show: false,
                        formatter: function(v){
                            switch (v+''){
                                case '10': return '弱';
                                case '30': return '低';
                                case '60': return '中';
                                case '90': return '高';
                                default: return '';
                            }
                        },
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#333'
                        }
                    },
                    splitLine: {           // 分隔线
                        show: false,        // 默认显示，属性show控制显示与否
                        length :30,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: '#eee',
                            width: 2,
                            type: 'solid'
                        }
                    },
                    pointer : {
                        length : '90%',
                        width : 8,
                        color : 'auto'
                    },
                    title : {
                        show : false,
                        offsetCenter: ['-65%', -10],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#333',
                            fontSize : 15
                        }
                    },
                    detail : {
                        show : true,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        borderColor: '#ccc',
                        width: 100,
                        height: 40,
                        offsetCenter: ['-75%', -20],       // x, y，单位px
                        formatter:'{value}',
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: 'auto',
                            fontSize : 40,
                            fontWeight:'100'
                        }
                    },
                    data:mydata.data
                }
            ]
        };
        var colors = ["#FF8105","#FFE063","#74BBD4"];
        var sum = 0;
        for (var i = 0,len=mydata.axisLineData.length; i < len; i++) {
            sum += mydata.axisLineData[i]*1;
        };
        var mycolor = []
            mysum = 0;
        for (var i = 0,len=mydata.axisLineData.length; i < len; i++) {
            mysum += mydata.axisLineData[i];
            mycolor.push([mysum/sum,colors[i%3]]);
        };
        option.series[0]['axisLine']['lineStyle']['color'] = mycolor;
        return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
    }

    function drawChart_bar(container,mydata){
        var option = {
            color:['#FFE063','#00B7FF'],
            tooltip : {
                trigger: 'axis',
                //{Function}，传递参数列表如下：
                //<Array> params : 数组内容同模板变量，[[a, b, c, d], [a1, b1, c1, d1], ...]
                //<String> ticket : 异步回调标识
                //<Function> callback : 异步回调，回调时需要两个参数，第一个为前面提到的ticket，第二个为填充内容html
                formatter:function(params,ticket,callback){
                    var result = params[0][1]+'<br>';
                    result += params[0][0]+'：'+params[0][2]+'<br>';//第一个bar的数据
                    result += params[1][0]+'：'+Math.abs(params[1][2])+'<br>';//第二个bar的数据
                    return result;
                },
                //'{b}'+'<br>{a}：'+'{c}'+'<br>{a1}：'+'{c1}',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                y:-300,
                data:['fail', 'success']
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : false,
            grid : {
                'x':100,
                'y':10,
                'x2':80,
                'y2':70,
                borderWidth:0
            },
            xAxis : [
                {
                    type : 'value',
                    'splitArea':{show : true,areaStyle:{color: ['rgba(100,100,100,0.1)','rgba(200,200,200,0.1)']}},
                    'axisLabel':{'interval':0,'textStyle':{color: '#E2F3F6'}},
                    'axisLine':{lineStyle:{color: '#B0B1C2', width: 1, type: 'solid'}},
                    'axisTick':{show : false,lineStyle:{color: '#B0B1C2', width: 1, type: 'solid'}},
                    'splitLine':{show : false}
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    'splitLine':{show : false},
                    'axisTick':{show : false,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                    'axisLine':{show : true,lineStyle:{color: '#FFE063', width: 1, type: 'solid'}},
                    'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                    'nameTextStyle':{color: '#E2F3F6'},
                    data : ['Type1','Type2','Type3','Type4','Type5','Type6']
                }
            ],
            series : [
                {
                    name:'success',
                    type:'bar',
                    stack: '总量',
                    barWidth : 8,
                    itemStyle: {normal: {
                        label : {show: true}
                    }},
                    data:mydata.series_bar_1
                },
                {
                    name:'fail',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {
                        label : {show: true,  formatter : function (a,b,c,d) {return Math.abs(c);},position: 'left'}
                    }},
                    data:[]
                }
            ]
        };
        for (var i = mydata.series_bar_2.length - 1; i >= 0; i--) {
            mydata.series_bar_2[i] = 0-mydata.series_bar_2[i];
        };
        option.series[1].data = mydata.series_bar_2;
        return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
    }

    function requireCallback(ec) {
      lvChart.echarts = ec;
      lvChart.ecConfig = require('echarts/config');
      getChartData();
    }
    requireEcharts(requireCallback);

    function getChartData(){
        var mydata1 = {
          axisLineData:[20,30,40,50,60,70,80],
          data:[{value: 58, name: '仪表盘'}]
        };
        var myChart1 = drawChart_gauge('chart_gauge_1',mydata1);
        myChart1.loadingData();

        var mydata2 = {
            series_bar_1:[320, 302, 341, 374, 390, 450],
            series_bar_2:[120, 132, 101, 134, 190, 230]
        };
        var myChart2 = drawChart_bar('chart_gauge_2',mydata2);
        myChart2.loadingData();
    }
});                