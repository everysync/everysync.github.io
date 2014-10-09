$(function() {
    function requireEcharts(requireCallback) {
        var pathArr = [
                'echarts',
                'echarts/chart/pie',
                'echarts/chart/bar'
            ];
            
        require(
            pathArr,
            requireCallback
        );
    }

    function drawChart_pie(container,mydata){
        var option = {
            backgroundColor:"#6D5842",
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            title:{
                text:'',
                x:'center',
                y:10,
                textStyle:{
                    fontSize: 16, 
                    fontWeight: 'normal',
                    color: '#5d5d5d'
                }
            },
            color: ["#FEDAB8","#DF9B59","#C27A34","#FFC286"],
            series: [{
                name: 'Demo test',
                type: 'pie',
                radius: '48%',
                center: ['50%', '50%'],
                startAngle: -60,
                minAngle:5,
                itemStyle: {
                    normal: {
                        label: {
                            textStyle:{color:"#E2F3F6",fontSize:16},
                            //position : 'inner'
                            formatter : function(a,b,c,d) {return (d - 0).toFixed(0) + '%'+"\n"+b }
                            //formatter: "{b}\n{c}"
                        },
                        labelLine: {
                            show:false,
                            length: 14
                        }
                    }
                },
                data: []
            }]
        };
        for(var i=0,len=mydata.series.length;i<len;i++){
            if(mydata.series[i].value > 0){
                option.series[0].data.push({name:mydata.series[i].name,value:mydata.series[i].value});
            }
        }
        return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
    }

    function drawChart_bar(container,mydata){
        var option = {
            color: ["#FFAE5F","#FF7E00"],
            title:{
                text:'',
                x:'center',
                y:10,
                textStyle:{
                    fontSize: 16, 
                    fontWeight: 'normal',
                    color: '#5d5d5d'
                }
            },
            tooltip: {
                trigger: 'axis',
                //{Function}，传递参数列表如下：
                //<Array> params : 数组内容同模板变量，[[a, b, c, d], [a1, b1, c1, d1], ...]
                //<String> ticket : 异步回调标识
                //<Function> callback : 异步回调，回调时需要两个参数，第一个为前面提到的ticket，第二个为填充内容html
                formatter:function(params,ticket,callback){
                    var result = params[0][1]+'<br>';
                    result += params[2][0]+'：'+params[2][2]+'<br>';//第一个bar的数据
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
                data: ['Approved', 'Failed','Name']
            },
            grid:{
                x:100,
                y:10,
                x2:30,
                y2:60,
                borderWidth:0
                //backgroundColor:'rgba(200,200,200,0.2)'
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            dataZoom: {
                    show: true,
                    realtime: true,
                    height:15,
                    //y:290,
                    backgroundColor:'rgba(111, 86, 62,0.5)',
                    dataBackgroundColor: 'rgba(255, 174, 95,0.4)',            
                    fillerColor: 'rgba(255, 126, 0,0.3)',
                    handleColor: 'rgba(255, 174, 95, 0.7)',
                    start: 5,
                    end: 20,
                    zoomLock:true//数据缩放锁，默认为false，当设置为true时选择区域不能伸缩，即(end - start)值保持不变
                },
            xAxis: [{
                type: 'category',
                data: [],
                'axisLabel':{'rotate':0,'textStyle':{color: '#E2F3F6'}},
                'axisLine':{lineStyle:{color: '#503E2C', width: 1, type: 'solid'}},
                'axisTick':{show : false,lineStyle:{color: '#076377', width: 1, type: 'solid'}},
                'splitLine':{show : false}
            }],
            yAxis: [{
                    type: 'value',
                    'splitLine':{show : false},
                    'axisTick':{show : true,lineStyle:{color: '#E2F3F6', width: 1, type: 'solid'}},
                    'axisLine':{lineStyle:{color: '#E2F3F6', width: 1, type: 'solid'}},
                    'axisLabel':{'textStyle':{color: '#E2F3F6'},'formatter':function (value){return Math.abs(value);}},
                    'nameTextStyle':{color: '#E2F3F6'}
                }

            ],
            series: [{
                name: 'Approved',
                type: 'bar',
                stack: '总量',
                barCategoryGap: '40%',
                itemStyle: {
                    normal: {
                        label : {
                            show: false,
                            position: 'inside',
                            formatter: function(a, b, c) {
                                return fmoney(c, 0);
                            },
                        }
                    }
                },
                data: []
            }, {
                name: 'Failed',
                type: 'bar',
                stack: '总量',
                barCategoryGap: '40%',
                itemStyle: {
                    normal: {
                        borderRadius:2,
                        label: {
                            show: false,
                            position: 'bottom',
                            formatter : function(a,b,c,d) {return Math.abs(c)>0?fmoney(Math.abs(c)):''; }
                        }
                    }
                },
                data: []
            }, {
                name: 'name',
                type: 'bar',
                stack: '总量',
                barCategoryGap: '40%',
                itemStyle: {
                    normal: {
                        color: '#2D9E63',
                        label: {
                            show: false,
                            position: 'top',
                            formatter : function(a,b,c,d) {return b; }
                        }
                    }
                },
                data: []
            }]
        };
        option.xAxis[0].data = mydata.xAxis;
        option.series[0].data = mydata.series_bar_1;
        option.series[1].data = mydata.series_bar_2;
        var data_bar3 = [];
        for (var i = 0, len = mydata.xAxis.length; i < len; i++) {
            data_bar3.push(0);//此bar数据只是为显示效果，设置为0即可
        }
        option.series[2].data = data_bar3;
        return new MyChart(lvChart.echarts, lvChart.ecConfig, container, option, 0, 1);
    }

    function requireCallback(ec) {
      lvChart.echarts = ec;
      lvChart.ecConfig = require('echarts/config');
      getChartData();
    }
    requireEcharts(requireCallback);

    function getChartData(){
        //饼图数据
        var mydata_pie = {
            series:[
                {name: 'Lenovo BOM',value: 25},
                {name: 'ODM BOM',value: 21},
                {name: 'Lenovo Work ManShip',value: 44},
                {name: 'ODM Work ManShip',value: 58}
            ]
        };
        var myChart1 = drawChart_pie('chart_fai_pie',mydata_pie);
        myChart1.loadingData();
        // setTimeout(function(){
        //     var img = new Image();
        //     //img.crossOrigin = "*";
        //     img.src = myChart1.chart.getDataURL();
        //     $('body').append(img);
        // },3000);
        var myChart2 = drawChart_bar('chart_fai_bar',getNewData_bar());
        myChart2.loadingData();
    }

    //数字格式化 如123456789 -> 123,456,789
    function fmoney(s, n) {
        return String(s).replace(/\d+?(?=(?:\d{3})+$)/img, "$&,");
    }

    function getNewData_bar(){
        var axisData,
            data_bar1 = [],
            data_bar2 = [];
        axisData = ['BLDD', 'ITUD', 'ARGN', 'INNB', 'IUTN', 'WCDN', 'CCDN', 'PEGN', 'LCFC', 'WKSN', 'CDPD', 'HYPD', 'SHPD', 'SHPN','BLDD', 'ITUD', 'ARGN', 'INNB', 'IUTN', 'WCDN', 'CCDN', 'PEGN', 'LCFC', 'WKSN', 'CDPD', 'HYPD', 'SHPD', 'SHPN','BLDD', 'ITUD', 'ARGN', 'INNB', 'IUTN', 'WCDN', 'CCDN', 'PEGN', 'LCFC', 'WKSN', 'CDPD', 'HYPD', 'SHPD', 'SHPN'];
        for (var i = 0, len = axisData.length; i < len; i++) {
            data_bar1.push(Math.floor(Math.random() * 700)+150);
            data_bar2.push(-Math.floor(Math.random() * 400));
        }
        //图表数据 
        var mydata1 = {
            xAxis:axisData,
            series_bar_1:data_bar1,
            series_bar_2:data_bar2
        };
        return mydata1;
    }
});



                    