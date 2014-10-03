//var window=window,$=$,console=window.console,alert=window.alert;

//TO: Ajax_Data
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

//TO:PAGESCROLL
function pagescroll(obj,content,options) {
	var $obj = $(obj);
	var opts = options || {
		sectionContainer   : "div",
		easing             : "cubic-bezier(0.025, 0.835, 0.040, 1)",
		loop               : true,
		animationTime      : 500,
		keyboard           : true,
		responsiveFallback : false,
    	afterMove: function(a) {
			console.log(a)
		}
	};
	$.extend(opts,{sectionContainer: content});
	function initps() {$obj.onepage_scroll(opts);}
	$obj.length?initps():'';
}
//INIT FUNCTIONS
function jayfunction() {
	//Ajax_Data
	ajaxLoadData(utf8to16(base64decode("aHR0cDovLzEyNy4wLjAuMS9qc29ucGNhbGxiYWNrL2pzb25wY2FsbGJhY2suanM=")), "mydata");
	//PAGESCROLL
	pagescroll(".container",".eachBlck");
}