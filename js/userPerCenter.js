define([""],function() {
	function addtab() {
		var $tabwrap = $(".EcScroll");
		var $tabtabs = $tabwrap.find("dd");
		var $allLayout = $(".CreateMain");
		
		var link_1 = $("#odm-create"),
			link_2 = $("#odm-mgr"),
			link_3 = $("#product-create"),
			link_4 = $("#product-mgr"),
			link_5 = $("#usermgr-create"),
			link_6 = $("#usermgr-mgr");
		
		link_1.data({"targetTo": $(".cm_create")});
		link_2.data({"targetTo": $(".cm_managerment")});
		link_3.data({"targetTo": $(".cm_create2")});
		link_4.data({"targetTo": $(".cm_managerment2")}); 
		link_5.data({"targetTo": $(".cm_create3")}); 
		link_6.data({"targetTo": $(".cm_managerment3")}); 
		
		$tabwrap.off(".itabs");
		$tabwrap.on("tap.itabs", "dd", function(e) {
			$tabtabs.removeClass("cur");
			$allLayout.addClass("hide");
			$(this).addClass("cur");
			$(this).data("targetTo").removeClass("hide");
			e.stopPropagation();
			e.preventDefault();
		});
		//ifCreated
		
		$('.form_radio,.form_check').iCheck({
			checkboxClass: 'icheckbox_flat',
			radioClass: 'iradio_flat',
			increaseArea: '20%' // optional
		});
	}
	
	function init() {
		addtab();
	}
	
	return {init:init};
});