define(function() {
	var obj = {};
	var stage;
	obj.init = function() {
		// console.log($('.LenovoIconBox').width());
		$('#line').html('<canvas id="lineCanvas" width="'+$('#chart_fpy_Line').width()+'px" height="'+$('#chart_fpy_Line').height()+'px"  style="position:absolute;left:0;z-index:0;top: 150px;"></canvas>')
		stage = new createjs.Stage("lineCanvas");
		// $('#lineCanvas').width($('.LenovoIconBox').width());
		// $('#lineCanvas').height($('.LenovoIconBox').height());
	}

	obj.draw = function(locx, locy, h) {

		// var locx = randRange(50, 100);
		var circle = new createjs.Shape();
		circle.graphics.beginFill("white").drawCircle(0, 0, 6);
		//Set position of Shape instance.           
		//Add Shape instance to stage display list.
		var line = new createjs.Shape();
		line.graphics.beginFill("rgba(255,255,255,0.35)").rect(0, 0, 2, h);
		// line.x = line.y = locx;
		circle.x = line.x = locx;
		circle.y = line.y = locy;
		// console.log(locx,locy);
		stage.removeAllChildren();
		stage.addChild(circle);
		stage.addChild(line);
		//Update stage will render next frame
		stage.update();

	}
	return obj;
});