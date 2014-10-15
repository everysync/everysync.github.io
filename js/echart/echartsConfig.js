//寄生组合式继承的基本模式
function iheritPrototype(subType, superType){
    function F(){};
    F.prototype = superType.prototype;
    var prototype = new F();//创建对象
    prototype.constructor = subType;//增强对象
    subType.prototype = prototype;//指定对象
}

function MyChart(myEcharts, ecConfig, dom_id, option, flag, initFlag) {
    this.myEcharts = myEcharts;
    this.ecConfig = ecConfig;
    this.dom_id = dom_id; //渲染的位置id
    this.option = option; //chart option
    this.loading_flag = flag; //显示过渡效果标志 --0:不显示, 1:显示
    this.chart = '';
    this.loadStatus = false;//是否根据新数据重置了option
}

MyChart.prototype.init = function () {
    this.chart = this.myEcharts.init(document.getElementById(this.dom_id));
    this.chart.on(this.ecConfig.EVENT.RESIZE, this.eConsole);
}

MyChart.prototype.resetOption = function () {
    if(!this.loadStatus){
        this.getChartData(1);
    }
    this.chart = this.myEcharts.init(document.getElementById(this.dom_id));
    this.chart.setOption(this.option);
    this.bindEvents();
}

MyChart.prototype.dispose = function () {
    this.chart.dispose();
}

MyChart.prototype.bindEvents = function () {//绑定相关事件
    
}

MyChart.prototype.eConsole = function (param) {
    //console.log(param);
}

MyChart.prototype.loadingData = function(){// 开始加载数据,显示过渡效果
    if (this.loading_flag) {
        this.chart.showLoading({
            text: 'loading',
            effect: 'whirling'
        });
    }
    this.getNewData();
}

MyChart.prototype.getDataBack = function(){//获取数据后,关闭过渡效果,重绘chart
    //---------正式使用时请注释----
    var curChart = this;
    // ajax return
    setTimeout(function() {
        if (curChart.loading_flag) {
            curChart.chart.hideLoading();
        }
    }, 2000);
    //-----------
//    if (this.loading_flag) {
//        this.chart.hideLoading();
//    }
    this.chart.setOption(this.option);
}                   

MyChart.prototype.getNewData = function () {//加载数据
    // ajax --------
    this.getDataBack();
}