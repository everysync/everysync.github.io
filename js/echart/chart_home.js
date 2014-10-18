define(['echarts','echarts/chart/line','echarts/chart/bar'],
    function(ec){
        var lvChart = {
            echarts:ec,
            ecConfig:require('echarts/config')
        };
        function LvHome(container){
            MyChart.call(this, lvChart.echarts, lvChart.ecConfig, container, {}, 0, 0);
            this.getChartData(0);
        }
        iheritPrototype(LvHome, MyChart);
        LvHome.prototype._setOptionDataZoom = function(mydata){
            var option = {
                animation:true,
                animationDuration:600,
                backgroundColor:"rgba(0,0,0,0)",
                color: ['#FF9080','#00BFB7', '#FFBB59', '#FFF100','#00BFB7','#FF9080','#2290B3','#C680C2'],
                title : {
                    text: ''
                },
                tooltip:{
                    show: true,
                    trigger: 'item'
                },
                dataZoom: {
                    show: true,
                    realtime: true,
                    x:70,
                    //y:document.getElementById(this.dom_id).offsetHeight - 70,
                    backgroundColor:'rgba(61, 72, 82,0.5)',
                    dataBackgroundColor: 'rgba(90, 99, 107,1)',            
                    fillerColor: 'rgba(156, 161, 166,0.5)',
                    handleColor: 'rgba(249, 115, 96, 1)',
                    start: 5,
                    end: 83
                },
                grid: {
                    'x':70,
                    'y':110,
                    'x2':70,
                    'y2':80,
                    borderWidth:0
                },
                legend: {
                    x: 72,
                    y: 5,
                    textStyle:{color: '#B7E1EA',fontSize:14},
                    data: []
                },
                xAxis: [{
                    type: 'category',
                    'axisLabel':{'interval':0,'rotate':-45,'textStyle':{color: 'rgba(255,255,255,0.6)'}},
                    'axisLine':{show : false,lineStyle:{color: 'rgba(255,255,255,0.35)', width: 1, type: 'solid'}},
                    'axisTick':{show : true,lineStyle:{color: 'rgba(255,255,255,0.35)', width: 1, type: 'solid'}},
                    'splitLine':{show : false},
                    data: [],
                }],
                yAxis: [{
                    type: 'value',
                    'splitLine':{show : false},
                    'axisTick':{show : true,inside:true,lineStyle:{color: 'rgba(255,255,255,0.35)', width: 1, type: 'solid'}},
                    'axisLine':{lineStyle:{color: 'rgba(255,255,255,0.35)', width: 1, type: 'solid'}},
                    'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                    'nameTextStyle':{color: '#E2F3F6'}
                }, {
                    type: 'value',
                    'splitLine':{show : false},
                    'axisTick':{show : true,inside:true,lineStyle:{color: 'rgba(255,255,255,0.35)', width: 1, type: 'solid'}},
                    'axisLine':{lineStyle:{color: 'rgba(255,255,255,0.35)', width: 1, type: 'solid'}},
                    'axisLabel':{'textStyle':{color: '#E2F3F6'}},
                    'nameTextStyle':{color: '#E2F3F6'}
                }],
                series: [{
                        name: 'Open',
                        type: 'bar',
                        stack: 'sum',
                        barCategoryGap: '40%',
                        data: []
                    }, {
                        name: 'Monitor',
                        type: 'bar',
                        barCategoryGap: '40%',
                        stack: 'sum',
                        data: []
                    }, {
                        name: 'Close',
                        type: 'bar',
                        barCategoryGap: '40%',
                        stack: 'sum',
                        data: []
                    }, {
                        name: 'IRCT',
                        type: 'line',
                        data: [],
                        yAxisIndex: 1,
                        markLine: {
                            symbol: 'none',
                            itemStyle: {
                                normal: {
                                    color: '#F97360',
                                    lineStyle: { // 系列级个性化折线样式
                                        type:'dotted'
                                    }, 
                                    label: {
                                        show: false
                                    }
                                }
                            },
                            data: [
                                [{
                                    name: 'IRCT Target',
                                    value: mydata.target_value,
                                    xAxis: 0,
                                    yAxis: mydata.target_value
                                }, // 当xAxis或yAxis为数值轴时，不管传入是什么，都被理解为数值后做空间位置换算
                                {
                                    xAxis: mydata.xAxis.length-1,
                                    yAxis: mydata.target_value
                                }]
                            ]
                        }
                    }, {
                        name: 'Related',
                        type: 'pie',
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        center: ['80%', 75],
                        radius: [0, 50],
                        itemStyle: 　{
                            normal: {
                                label: {
                                    'textStyle':{color: '#E2F3F6',fontSize:14},
                                    formatter: function(a,b,c,d) {return b+'\n'+(d - 0).toFixed(0) + '%'}
                                },
                                labelLine: {
                                    length: 5,
                                    lineStyle:{color: 'rgba(255,255,255,0.35)', width: 1, type: 'solid'}
                                }
                            }
                        },
                        data: []
                    }
                ]
            };
            option.legend.data = mydata.legend;
            // x轴
            option.xAxis[0].data = mydata.xAxis;
            option.series[0].name = mydata.series_bar_1.name;
            option.series[0].data = mydata.series_bar_1.data;
            option.series[1].name = mydata.series_bar_2.name;
            option.series[1].data = mydata.series_bar_2.data;
            option.series[2].name = mydata.series_bar_3.name;
            option.series[2].data = mydata.series_bar_3.data;
            option.series[3].name = mydata.series_line_1.name;
            option.series[3].data = mydata.series_line_1.data;   
            option.series[4].data = mydata.series_pie_1; 
            this.option = option;
            this.loadStatus = true;
            return option;
        };
        LvHome.prototype.getChartData = function(drawFlag){
            var self = this;
            var mydata =  {
                legend:['Open', 'Monitor', 'Close','IRCT'],
                xAxis:['TNID', 'CKSN', 'CKSD', 'WZSD', 'QSJD', 'BLDN', 'BJPD','SHPN', 'SHPD', 'HYPD', 'CDPD', 'WKSN', 'LCFC', 'PEGN','CCDN', 'WCDN', 'IUTN', 'INNB', 'WRGN', 'ITUD', 'BLDD'],
                other_parm_data:['TNID1', 'CKSN2', 'CKSD3', 'WZSD4', 'QSJD5', 'BLDN6', 'BJPD7','SHPN8', 'SHPD9', 'HYPD10', 'CDPD11', 'WKSN12', 'LCFC13', 'PEGN14','CCDN15', 'WCDN16', 'IUTN17', 'INNB18', 'WRGN19', 'ITUD20', 'BLDD21'],//其他不可见参数
                series_bar_1:{name:'Open',data:[1, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 2]},
                series_bar_2:{name:'Monitor',data:[1, 0, 0, 2, 0, 0, 2, 1, 0, 0, 2, 0, 0, 2, 1, 0, 0, 2, 0, 0, 2]},
                series_bar_3:{name:'Close',data:[5, 6, 4, 3, 4, 1.5, 5, 5, 6, 4, 3, 4, 1.5, 5, 5, 6, 4, 3, 4, 1.5, 5]},
                series_line_1:{name:'IRCT',data:[12, 7, 8, 10, 6, 14, 12, 12, 7, 8, 10, 6, 14, 12, 12, 7, 8, 10, 6, 14, 12]},
                series_pie_1:[
                    {name: 'Design related',value: 15},
                    {name: 'Supplier related',value: 30},
                    {name: 'MFG related',value: 32},
                    {name: 'Engineering related',value: 25}
                ],
                target_value:8
            };
            self._setOptionDataZoom(mydata);
            drawFlag&&self.resetOption();
        };
        return LvHome;
    }
);