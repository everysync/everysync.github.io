//var window=window,$=$,console=window.console,alert=window.alert;

//TO: AJAX_DATA
function ajaxLoadData(URL,DATA) {
	$.ajax({
		type: "get",
		url: URL,
		dataType: "jsonp",
		jsonpCallback:DATA
	}).done(function(data){
		console.log(data);
		//do something
	}).error(function(){
		window.console?console.log("Fail to load data!"):'';
		//do something
	}).always(function() {
		//do something
	});	
}
//Building_layouts 
function buildLayout() {
	var scalcNum = [
		["wraps",80]
	];
	$.fn.winCssHeight($(window),scalcNum);
}


//TO:PAGESCROLL
function pagescroll(obj,content,options) {
	var $obj = $(obj);
	var opts = options || {
		sectionContainer   : "div",
		easing             : "cubic-bezier(0, 1, 1, 1)",
		loop               : true,
		animationTime      : 500,
		keyboard           : true,
		responsiveFallback : false,
		afterCreate:function(a) {
			//Add_touch_control
			$obj.on("flick", function(e) {
				if ("vertical" == e.orientation && 1 == e.direction ) {
					$obj.data("onepage_scroll").moveUp();
				} else if ("vertical" == e.orientation && -1 == e.direction) {
					$obj.data("onepage_scroll").moveDown();
				}
			});
		},
    	afterMove: function(a) {
			//console.log(a);
		}
	};
	$.extend(opts,{sectionContainer: content});
	function initps() {
		$obj.onepage_scroll(opts);
	}
	$obj.length?initps():'';
}
//INIT FUNCTIONS
function jayfunction() {
	//Building_layouts
	buildLayout();
	//AJAX_DATA
	ajaxLoadData(utf8to16(base64decode("aHR0cDovLzEyNy4wLjAuMS9qc29ucGNhbGxiYWNrL2pzb25wY2FsbGJhY2suanM=")), "mydata");
	//PAGESCROLL
	pagescroll(".container",".eachBlck");
}