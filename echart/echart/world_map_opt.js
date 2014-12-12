option = {
    tooltip : {
        trigger: 'item',
        formatter: '{b}'
    },
  backgroundColor: 'rgba(120, 93, 67,1)',
  dataRange: {
        min: 0,
        max: 5,
        text:['High','Low'],
        realtime: false,
        calculable : true,
        color: ['#796755','#9C4E01','#FFDCB9']
    },
    series : [
        {
            name: '世界地图',
            type: 'map',
            mapType: 'world',
            roam: true,
            selectedMode : 'single',
           itemStyle:{
                normal:{
                    borderColor:'rgba(46, 67, 79,1)',
                    borderWidth:1,
                    areaStyle:{
                        color: 'rgba(236, 212, 194,1)'
                    }
                }
            },
            data:[
                {name : 'China', value : 5},
                {name : 'United States of America', value : 1},
                {name : 'Uzbekistan', value : 2},
                {name : 'Venezuela', value : 3},
                {name : 'Vietnam', value : 4},
                {name : 'Vanuatu', value : 1},
                {name : 'West Bank', value : 2},
                {name : 'Yemen', value :3},
                {name : 'South Africa', value : 4},
                {name : 'Zambia', value : 1},
                {name : 'Zimbabwe', value : 5}
            ]
        }
    ]
};
var ecConfig = require('echarts/config');
myChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
    var selected = param.selected;
    var str = '当前选择： ';
    for (var p in selected) {
        if (selected[p]) {
            str += p + ' ';
        }
    }
    document.getElementById('wrong-message').innerHTML = str;
})
                    