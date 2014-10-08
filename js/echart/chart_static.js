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
            //text: '总量趋势分析',
            textStyle:{
                fontSize: 18, 
                fontWeight: 'bolder', 
                color: '#606060',
                fontFamily:'Microsoft YaHei'
            }
        },
        legend: {
            x:"right",
            // y:15,
            y:-300,
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
            y:10,
            x2:40,
            y2:20,
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
            // text: '来源分析',
            textStyle:{
                fontSize: 18, 
                fontWeight: 'bolder', 
                color: '#606060',
                fontFamily:'Microsoft YaHei'
            }
        },
        color:["#009AF2","#61B2A9","#8E6297","#F4B326","#E55A45"],
        tooltip : {
            trigger: 'item',
            position:[0,0],
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
                name:'来源分析',
                type:'pie',
                radius : '100%',
                center: ['50%', '50%'],
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
            //y:15,
            y:-300,
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
            y:10,
            x2:20,
            y2:20,
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

function drawChart_pie2(container,mydata){
    var option = {
        title : {
            // text: '来源分析',
            textStyle:{
                fontSize: 18, 
                fontWeight: 'bolder', 
                color: '#606060',
                fontFamily:'Microsoft YaHei'
            }
        },
        color:["#E55A45","#F4B326","#918785"],
        tooltip : {
            trigger: 'item',
            position:[0,0],
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
                name:'属性分布',
                type:'pie',
                radius : ['56%', '80%'],
                center: ['50%', '55%'],
                //roseType : 'area',
                clockWise: false,
                minAngle:5,
                itemStyle: {
                    normal : {
                        label : {
                            formatter : function (a,b,c,d) {return (d - 0).toFixed(0) + '%'}
                        },
                        labelLine : {
                            show : false,
                            length:-7
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

function drawChart_line3(container,mydata){
    var option = {
        color:["#E55A45","#F4B326","#918785"],
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type: 'shadow'
            }
        },
        legend: {
            x:"right",
            //y:15,
            y:-300,
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
            y:20,
            x2:20,
            y2:30,
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

function drawChart_bar(container,mydata){
    var option = {
        color:["#E55A45","#F4B326","#918785"],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            y:-300,
            data:mydata.legend
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
        animation:true,
        calculable : false,
        backgroundColor:"#fff",
        xAxis : [
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
                      show:true,
                      textStyle:{
                          color:"#888"
                      }
                    },
                    splitArea:{
                        show:false
                    },
                    axisTick:{
                      show : true,
                        lineStyle:{
                            color:"#ccc"
                        }
                    },
                    axisLine:{
                        show : true,
                        lineStyle:{
                            width:1,
                            color:"#ccc"
                        }
                    }
            }
        ],
        yAxis : [
            {
                type : 'category',
                boundaryGap : true,
                    axisLine:{
                        show : false,
                        lineStyle:{
                            width:1,
                            color:"#ccc"
                        }
                    },
                    axisTick:{
                        show : false,
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
                data : mydata.yAxis
            }
        ],
        grid: {
            x:90,
            y:20,
            x2:30,
            y2:30,
            borderWidth:0
        },
        series : []
    }; 
    for(var i=0,len=mydata.data.length;i<len;i++){
        var nv = {
                name: mydata.data[i].name,
                data: mydata.data[i].value,
                type:'bar',
                stack: '总量',
                barCategoryGap:'35%',
                itemStyle : { normal: {label : {show: false, position: 'insideRight'}}},
            };
        option.series.push(nv);
    }
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
    var dom1 = $("#static_chart_1");
    dom1.css({"height":dom1.height(),"width":dom1.width(),"position":"relative","text-align":"left"});
    var dom2 = $("#static_chart_2");
    dom2.css({"height":dom2.height(),"width":dom2.width(),"position":"relative","text-align":"left"});
    var dom3 = $("#static_chart_3");
    dom3.css({"height":dom3.height(),"width":dom3.width(),"position":"relative","text-align":"left"});
    var dom4 = $("#static_chart_4");
    dom4.css({"height":dom4.height(),"width":dom4.width(),"position":"relative","text-align":"left"});
    var dom5 = $("#static_chart_5");
    dom5.css({"height":dom5.height(),"width":dom5.width(),"position":"relative","text-align":"left"});
    var dom6 = $("#static_chart_6");
    dom6.css({"height":dom6.height(),"width":dom6.width(),"position":"relative","text-align":"left"});
    var mydata1 = {
      legend:['全部舆情内容','本条舆情内容'],
      xAxis:['09.05','09.06','09.07','09.08','09.09','09.10','09.11'],
      series_line_1:{name:'全部舆情内容',data:[65, 45, 60, 50, 42, 58, 70]},
      series_line_2:{name:'本条舆情内容',data:[38, 10, 20, 10, 20, 40, 23]}
    };
    var myChart1 = drawChart_line('static_chart_1',mydata1);
    myChart1.loadingData();

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
    var myChart2 = drawChart_pie('static_chart_2',mydata2);
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
    var myChart3 = drawChart_line2('static_chart_3',mydata3);
    myChart2.loadingData();
    myChart3.loadingData();
    myChart2.chart.connect(myChart3.chart);
    myChart3.chart.connect(myChart2.chart);

    var mydata4 = {},
        mydata5 = {};
    mydata4.all = {
      legend:['正','中','负'],
      data:[
          {value:335, name:'正'},
          {value:310, name:'中'},
          {value:234, name:'负'}
      ]
    };
    mydata4.zixun = {
      legend:['正','中','负'],
      data:[
          {value:335, name:'正'},
          {value:310, name:'中'},
          {value:234, name:'负'}
      ]
    };
    var myChart4 = drawChart_pie2('static_chart_4',mydata4.all);
    mydata5.all = {
      legend:['正','中','负'],
      xAxis:['09.05','09.06','09.07','09.08','09.09','09.10','09.11'],
      data:[
          {value:[320, 332, 301, 334, 390, 330, 320], name:'正'},
          {value:[120, 132, 101, 134, 90, 230, 210], name:'中'},
          {value:[220, 182, 191, 234, 290, 330, 310], name:'负'}
      ]
    };
    mydata5.zixun = {
      legend:['正','中','负'],
      xAxis:['09.05','09.06','09.07','09.08','09.09','09.10','09.11'],
      data:[
          {value:[320, 332, 301, 334, 390, 330, 320], name:'正'},
          {value:[120, 132, 101, 134, 90, 230, 210], name:'中'},
          {value:[220, 182, 191, 234, 290, 330, 310], name:'负'}
      ]
    };
    var myChart5 = drawChart_line3('static_chart_5',mydata5.all);
    myChart4.loadingData();
    myChart5.loadingData();
    myChart4.chart.connect(myChart5.chart);
    myChart5.chart.connect(myChart4.chart);
    $("#menu_attribute").on("click","li:not('.cur')",function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        myChart4.chart.dispose();
        myChart5.chart.dispose();
        myChart4 = drawChart_pie2('static_chart_4',mydata4[$(this).attr("data-type")]);
        myChart5 = drawChart_line3('static_chart_5',mydata5[$(this).attr("data-type")]);
        myChart4.loadingData();
        myChart5.loadingData();
        myChart4.chart.connect(myChart5.chart);
        myChart5.chart.connect(myChart4.chart);
    });

    var mydata6 = {};
    mydata6.all = {
      legend:['正','中','负'],
      yAxis:['中金在线','中金在线2','中金在线3','中金在线4','中金在线5','中金在线6','中金在线7','中金在线8','中金在线9','中金在线10'],
      data:[
          {value:[320, 332, 301,320, 332, 301,320, 332, 301,120], name:'正'},
          {value:[120, 132, 101,320, 332, 301,320, 332, 301,120], name:'中'},
          {value:[220, 182, 191,320, 332, 301,320, 332, 301,120], name:'负'}
      ]
    };
    mydata6.zixun = {
      legend:['正','中','负'],
      yAxis:['中金在线zx','中金在线zx2','中金在线zx3','中金在线zx4','中金在线zx5','中金在线zx6','中金在线zx7','中金在线zx8','中金在线zx9','中金在线zx10'],
      data:[
          {value:[320, 332, 301,320, 332, 301,320, 332, 301,120], name:'正'},
          {value:[120, 132, 101,320, 332, 301,320, 332, 301,120], name:'中'},
          {value:[220, 182, 191,320, 332, 301,320, 332, 301,120], name:'负'}
      ]
    };
    mydata6.feizixun = {
      legend:['正','中','负'],
      yAxis:['中金在线fzx','中金在线fzx2','中金在线fzx3','中金在线fzx4','中金在线fzx5','中金在线fzx6','中金在线fzx7','中金在线fzx8','中金在线fzx9','中金在线fzx10'],
      data:[
          {value:[320, 332, 301,320, 332, 301,320, 332, 301,120], name:'正'},
          {value:[120, 132, 101,320, 332, 301,320, 332, 301,120], name:'中'},
          {value:[220, 182, 191,320, 332, 301,320, 332, 301,120], name:'负'}
      ]
    };
    var myChart6 = drawChart_bar('static_chart_6',mydata6.all);
    myChart6.loadingData();

    $("#menu_top10").on("click","li:not('.cur')",function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        myChart6.chart.dispose();
        myChart6 = drawChart_bar('static_chart_6',mydata6[$(this).attr("data-type")]);
        myChart6.loadingData();
    });
}
