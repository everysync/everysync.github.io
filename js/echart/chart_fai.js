define(['echarts','echarts/chart/pie','echarts/chart/bar'],
    function(ec){
        var lvChart = {
            echarts:ec,
            ecConfig:require('echarts/config')
        };
        function LvFai(container,chartType){
            MyChart.call(this, lvChart.echarts, lvChart.ecConfig, container, {}, 0, 0);
            this.chartType = chartType;
            this.getChartData(0);
        }
        iheritPrototype(LvFai, MyChart);
        LvFai.prototype._setOptionPie = function(mydata){
            var option = {
                animation:true,
                animationDuration:600,
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
            this.option = option;
            this.loadStatus = true;
            return option;
        };
        LvFai.prototype._setOptionBar = function(mydata){
            var option = {
                animation:true,
                animationDuration:600,
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
            this.option = option;
            this.loadStatus = true;
            return option;
        };
        LvFai.prototype.getChartData = function(drawFlag){
            switch(this.chartType){
                case "pie":
                    this.getChartDataPie(drawFlag);break;
                case "bar":
                    this.getChartDataBar(drawFlag);break;
                default:break;
            }
        };
        LvFai.prototype.getChartDataPie = function(drawFlag){
            var self = this;
            //饼图数据
            var mydata = {
                series:[
                    {name: 'Lenovo BOM',value: 25},
                    {name: 'ODM BOM',value: 21},
                    {name: 'Lenovo Work ManShip',value: 44},
                    {name: 'ODM Work ManShip',value: 58}
                ]
            };
            self._setOptionPie(mydata);
            drawFlag&&self.resetOption();
        };
        LvFai.prototype.getChartDataBar = function(drawFlag){
            var self = this;
            var axisData,
                data_bar1 = [],
                data_bar2 = [];
            axisData = ['BLDD', 'ITUD', 'ARGN', 'INNB', 'IUTN', 'WCDN', 'CCDN', 'PEGN', 'LCFC', 'WKSN', 'CDPD', 'HYPD', 'SHPD', 'SHPN','BLDD', 'ITUD', 'ARGN', 'INNB', 'IUTN', 'WCDN', 'CCDN', 'PEGN', 'LCFC', 'WKSN', 'CDPD', 'HYPD', 'SHPD', 'SHPN','BLDD', 'ITUD', 'ARGN', 'INNB', 'IUTN', 'WCDN', 'CCDN', 'PEGN', 'LCFC', 'WKSN', 'CDPD', 'HYPD', 'SHPD', 'SHPN'];
            for (var i = 0, len = axisData.length; i < len; i++) {
                data_bar1.push(Math.floor(Math.random() * 700)+150);
                data_bar2.push(-Math.floor(Math.random() * 400));
            }
            //图表数据 
            var mydata = {
                xAxis:axisData,
                series_bar_1:data_bar1,
                series_bar_2:data_bar2
            };
            self._setOptionBar(mydata);
            drawFlag&&self.resetOption();
        };
        return LvFai;
    }
);
                