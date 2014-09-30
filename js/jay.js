var window=window,$=$,console=window.console,alert=window.alert;

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


//INIT FUNCTIONS
function jayfunction() {
	//Ajax_Data
	ajaxLoadData(utf8to16(base64decode("aHR0cDovLzEyNy4wLjAuMS9qc29ucGNhbGxiYWNrL2pzb25wY2FsbGJhY2suanM=")), "mydata");
	
	$(".container").onepage_scroll({
		sectionContainer: "div",
		loop: true,
		responsiveFallback: false
	});
	  
	
}