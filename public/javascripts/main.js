
	

	// $.getJSON('ajax/test.json', function(data) {
	// 	  var items = [];
	// 	
	// 	  $.each(data, function(key, val) {
	// 	    items.push('<li id="' + key + '">' + val + '</li>');
	// 	  });
	// 	
	// 	  $('<ul/>', {
	// 	    'class': 'my-new-list',
	// 	    html: items.join('')
	// 	  }).appendTo('body');
	// 	});
	// 	
	
	// var url = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities= false&include_rts=false&screen_name=dreamPilot_&count=5';
	
	// var items = [];
	// 		$.getJSON(url,function (data) {
	// 			
	// 			$.each(data , function(num){
	// 				items.push(data[num].text);			
	// 			});
	// 			// var twitter_profile_pic = items[0].user.profile_image_url;
	// 			// console.log("twitter_profile_pic" + twitter_profile_pic);
	// 			$("#tweet").prepend(items[0]);
	// 			
	// 		}).success(
	// 			function(msg){
	// 				// console.log(msg);
	// 				}).error(  
	// 				function(msg){
	// 					console.log(msg);
	// 				}
	// 			);
	// console.log(items);
	
	// var clicked = 0;
	// document.getElementById("canvas1").onclick = function(){
	// 	clicked++;
	// 	console.log("you've clicked" + clicked + "times")
	// };
	CANVAS_WIDTH = 400; 
	CANVAS_HEIGHT = 400;
	SCALE = 300;
	
	
(function(){
	var that = this;
	//init 
	var b2World = Box2D.Dynamics.b2World,
		b2Vec2 = Box2D.Common.Math.b2Vec2,
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    	b2BodyDef = Box2D.Dynamics.b2BodyDef,
        b2Body = Box2D.Dynamics.b2Body,
        b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	
	window.requestAnimFrame = (function(){
	          return  window.requestAnimationFrame       || 
	                  window.webkitRequestAnimationFrame || 
	                  window.mozRequestAnimationFrame    || 
	                  window.oRequestAnimationFrame      || 
	                  window.msRequestAnimationFrame     || 
	                  function(/* function */ callback, 
									/* DOMElement */ element){
	                    window.setTimeout(callback, 1000 / 60);
	                  };
	 })();
	
	var SCALE,
		canvas,
		ctx,
		world,
		fixDef,
		shapes = {};
		
	var debug = false;
		

	// box2d obj 
	var box2d = {
		create: {
			world : function(){
				world = new b2World(
					new b2Vec2(0,10), // gravity
					true);		      // allow sleep
				
			}
			
		}
	};
	
	var init = {
		start : function(id){
			canvas(id);
			box2d.create.world();
		},
		canvas : function(id) {
            that.canvas = document.getElementById(id);
			ctx	   = that.canvas.getContext('2d');
		}
	}
	
	
	init.start('canvas1');
})();
	
		
	
