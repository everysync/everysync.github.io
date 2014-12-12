var lvChart = {
    echarts:null,
    ecConfig:null
};

function drawChart_line(container,mydata){
    var option = {
        tooltip : {
            trigger: 'item'
        },
        title : {
            text: '总量趋势分析',
            x:20,
            y:10,
            textStyle:{
                fontSize: 16, 
                fontWeight: 'normal', 
                color: '#333',
                fontFamily:'Microsoft yahei'
            }
        },
        legend: {
            x:"right",
            y:15,
            data:mydata.legend
        },
        calculable : false,
        animation:true,
        backgroundColor:"#fff",
        color: ["#F47070","#66A1D9"],
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
        grid: {
            x:60,
            y:55,
            x2:40,
            y2:40,
            borderWidth:0
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : true,
                axisLine:{
                    show : true,
                    lineStyle:{
                        width:1,
                        color:"#ccc"
                    }
                },
                axisTick:{
                    lineStyle:{
                        color:"#ccc"
                    }
                },
                axisLabel:{
                    textStyle:{
                        color:"#888"
                    }
                },
                splitLine:{
                    show : true,
                    lineStyle:{
                      type:"dotted",
                      width:1,
                      color:"#ccc"
                    }
                },
                data : mydata.xAxis
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                    show : true,
                    lineStyle:{
                      type:"dotted",
                      width:1,
                      color:"#ccc"
                    }
                },
                axisLabel:{
                  textStyle:{
                      color:"#888"
                  }
                },
                splitArea:{
                    show:false
                },
                axisLine:{show : false}
            }
        ],
        series : [
            {
                name:mydata.series_line_1.name,
                type:'line',
                symbol: 'emptyCircle',
                symbolSize: 4,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            color:"rgba(182, 182, 244, 0.1)",
                            type: 'default'
                        },
                        lineStyle: {
                            width:1.5
                        }
                    }
                },
                data:mydata.series_line_1.data
            },{
                name:mydata.series_line_2.name,
                type:'line',
                symbol: 'triangle',
                symbolSize: 4,
                itemStyle: {
                    normal: {
                        areaStyle: {
                            color:"rgba(182, 182, 244, 0.1)",
                            type: 'default'
                        },
                        lineStyle: {
                            width:1.5
                        }
                    }
                },
                data:mydata.series_line_2.data
            }
            // ,{
            //     name:'本条舆情内容',
            //     type:'scatter',
            //     symbol: 'triangle',
            //     symbolSize: 4,
            //     data:[{
            //         value : ['09.11', 45, 40],    //[xValue, yValue, rValue]，数组内依次为横值，纵值，大小(可选)
            //         itemStyle: {
            //             normal: {
            //                 borderWidth: 0,
            //                 color: '#66A1D9'
            //             }
            //         },
            //         symbol: 'triangle',
            //         symbolSize:8
            //     }]
            // }
        ]
    };
    return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
}

function drawChart_pie(container,mydata){
    var option = {
        title : {
            text: '来源分析',
            x:20,
            y:10,
            textStyle:{
                fontSize: 16, 
                fontWeight: 'normal', 
                color: '#333',
                fontFamily:'Microsoft yahei'
            }
        },
        color:["#009AF2","#61B2A9","#8E6297","#F4B326","#E55A45"],
        tooltip : {
            trigger: 'item',
            position:[10,35],
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : -300,
            data:mydata.legend
        },
        animation:true,
        calculable : false,
        backgroundColor:"#fff",
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '75%',
                center: ['50%', '58%'],
                //roseType : 'area',
                clockWise: false,
                minAngle:5,
                itemStyle: {
                    normal : {
                        label : {
                            position : 'inner',
                            formatter : function (a,b,c,d) {return (d - 0).toFixed(0) + '%'}
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    }
                },
                data:mydata.data
            }
        ]
    };
    return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
}

function drawChart_line2(container,mydata){
    var option = {
        color:["#009AF2","#61B2A9","#8E6297","#F4B326","#E55A45"],
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type: 'shadow'
            }
        },
        legend: {
            x:"right",
            y:15,
            data:mydata.legend
        },
        toolbox: {
            show : false,
            orient : 'vertical',
            y : 'center',
            feature : {
                mark : {show: true},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        animation:true,
        calculable : false,
        backgroundColor:"#fff",
        xAxis : [
            {
                type : 'category',
                boundaryGap : true,
                    axisLine:{
                        show : true,
                        lineStyle:{
                            width:1,
                            color:"#ccc"
                        }
                    },
                    axisTick:{
                        lineStyle:{
                            color:"#ccc"
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            color:"#888"
                        }
                    },
                    splitLine:{
                        show : true,
                        lineStyle:{
                          type:"dotted",
                          width:0,
                          color:"#ccc"
                        }
                    },
                data : mydata.xAxis
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine:{
                        show : true,
                        lineStyle:{
                          type:"dotted",
                          width:1,
                          color:"#ccc"
                        }
                    },
                    axisLabel:{
                      show:false,
                      textStyle:{
                          color:"#888"
                      }
                    },
                    splitArea:{
                        show:false
                    },
                    axisLine:{show : false}
            }
        ],
        grid: {
            x:20,
            y:55,
            x2:20,
            y2:40,
            borderWidth:0
        },
        series : []
    };
    for(var i=0,len=mydata.data.length;i<len;i++){
        var nv = {
                name: mydata.data[i].name,
                data: mydata.data[i].value,
                type:'line',
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width:1.5
                        }
                    }
                }
            };
        option.series.push(nv);
    }
    return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
}

$(function() {
  function requireCallback(ec) {
      lvChart.echarts = ec;
      lvChart.ecConfig = require('echarts/config');
  }
  requireEcharts(0, requireCallback);
});

var chart_arr = [];
function getChartData(){
    if(lvChart.echarts == null){
        return false;
    }
    $.each(chart_arr,function(k,item){
        item.chart.dispose();
    });
    var dom1 = $("#line_chart_1");
    dom1.css({"height":dom1.height(),"width":dom1.width(),"position":"relative","text-align":"left"});
    var dom2 = $("#line_chart_2");
    dom2.css({"height":dom2.height(),"width":dom2.width(),"position":"relative","text-align":"left"});
    var dom3 = $("#line_chart_3");
    dom3.css({"height":dom3.height(),"width":dom3.width(),"position":"relative","text-align":"left"});
    chart_arr = [];
    var mydata1 = {
      legend:['全部舆情内容','本条舆情内容'],
      xAxis:['09.05','09.06','09.07','09.08','09.09','09.10','09.11'],
      series_line_1:{name:'全部舆情内容',data:[65, 45, 60, 50, 42, 58, 70]},
      series_line_2:{name:'本条舆情内容',data:[38, 10, 20, 10, 20, 40, 23]}
    };
    var myChart1 = drawChart_line('line_chart_1',mydata1);
    var mydata2 = {
      legend:['资讯','论坛','微博','博客','研报'],
      data:[
          {value:335, name:'资讯'},
          {value:310, name:'论坛'},
          {value:234, name:'微博'},
          {value:135, name:'博客'},
          {value:148, name:'研报'}
      ]
    };
    var myChart2 = drawChart_pie('line_chart_2',mydata2);
    var mydata3 = {
      legend:['资讯','论坛','微博','博客','研报'],
      xAxis:['09.05','09.06','09.07','09.08','09.09','09.10','09.11'],
      data:[
          {value:[320, 332, 301, 334, 390, 330, 320], name:'资讯'},
          {value:[120, 132, 101, 134, 90, 230, 210], name:'论坛'},
          {value:[220, 182, 191, 234, 290, 330, 310], name:'微博'},
          {value:[150, 232, 201, 154, 190, 330, 410], name:'博客'},
          {value:[820, 932, 901, 934, 1290, 1330, 1320], name:'研报'}
      ]
    };
    var myChart3 = drawChart_line2('line_chart_3',mydata3);
    chart_arr.push(myChart1);
    chart_arr.push(myChart2);
    chart_arr.push(myChart3);
    myChart2.chart.connect(myChart3.chart);
    myChart3.chart.connect(myChart2.chart);
    $.each(chart_arr,function(k,item){
      item.loadingData();
    });
}
