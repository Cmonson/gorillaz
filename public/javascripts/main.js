/* dropbox version:
	this site : https://dl.dropbox.com/u/24733418/serve/html/world.html
	this code : https://dl.dropbox.com/u/24733418/serve/html/main.js
*/

/*	
	Main.js depends Box2DWeb.js and Processing.js
	Author : @dreamPilot_
    ---------------------------------------------
	Note:
	Box2DWeb uses Standard Units, meters, kilos, 
	secs as well as radians for angles.

		 *
	World specs:
	Gravity: 10 m/s/s 
	Sleeping :allowed
	Coordinate system : same as processing.js

	For most things a reference to p5 is really a reference 
	to processing.js object.
*/

var world;
var b2Vec2;
var debugDraw;
var body1;
var objectCout;
var box;

init(); 

function init(){

	b2Vec2 = Box2D.Common.Math.b2Vec2
	,	b2BodyDef = Box2D.Dynamics.b2BodyDef
	,	b2Body = Box2D.Dynamics.b2Body
	,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	,	b2World = Box2D.Dynamics.b2World
	,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

	debugDraw = new b2DebugDraw();
		
	function createGround(){
		var bodyDef = new b2BodyDef();
		fixDef = new b2FixtureDef();
		fixDef.density = 1.0;
		fixDef.friction = 1.0;
		fixDef.restitution = 0.5;
		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(145.00 , 0.90);
		bodyDef.position.Set(14.10 , 10.70);
		return world.CreateBody(bodyDef).CreateFixture(fixDef);
	};

	function createWorld(){
		var gravity =  new b2Vec2(0,10);
		world  = new b2World(gravity, true);
		createGround(world);
		return world;
	};

	createWorld();
};


//  properties for this object with:
var fixDef = new b2FixtureDef();
	fixDef.density = 8.0;
	fixDef.friction = 7.15;
	fixDef.restitution = 1;
	fixDef.shape = new b2PolygonShape(); // define shape
	fixDef.shape.SetAsBox(1, 1);         // define size


function createDynamicBody(x,y){

	var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;  // define object type 
		bodyDef.position.Set(x, y);
		return world.CreateBody(bodyDef).CreateFixture(fixDef);
};

function createStaticBody(x,y){

	var holderDef = new b2BodyDef();
		holderDef.type = b2Body.b2_staticBody;
		holderDef.position.Set(x, y);

	var holder = world.CreateBody(holderDef);
	return holder.CreateFixture(fixDef);
};

// sketchProc accepts the processing function context 
function sketchProc(p5){
	// processing.js Directive 
	/* @pjs globalKeyEvents="true"; */
	
	var framerate = 30;
	var object;

/*	SETUP & DRAW Functions
	
	TODO: Render box2d and processing
	on the same canvas or maybe overlapping
	canvases with opacity turned on.
	Right now only one of them works.

	Also, since processing and box2d use the 
	same coordinate system we can probably 
	call mouse and key tracking from processing 
	and use it in the context of box2d
    -------------------------------------------
*/
	with(p5){
		
		// TODO: As it stands,
		// processing draw loop controls the framerate
		// find another (more efficient) way to do this.

		setup = function(){
			size(550,300);
			frameRate(framerate);
			createDynamicBody(4,0);
			createStaticBody(1,0);

			object = new b2BodyDef();
			object.type = b2Body.b2_dynamicBody;  // define `ect type 
			object.position.Set(12, 0);

			world.CreateBody(object).CreateFixture(fixDef);
			box = world.CreateBody(object);
			box.CreateFixture(fixDef);
		};

		draw = function() {
			
			noFill();
			world.SetDebugDraw(debugDraw);
			update();
			rectMode(CENTER);
			rect(mouseX,mouseY,20,20); 
		};
		mouseMoved = function(){
			mouseDebug(true);
		};

		keyPressed = function() {
			
			// report key - canvas focused
			console.log("keycode: " + key.code);

			if(keyCode == BACKSPACE ){
				console.log("backspace was pressed");
			}else if(key == 32){
				console.log("/////   spacebar was pressed");
				createDynamicBody(random(30),0);
			}else if(key == 10){
				console.log("right");
				pushRight(box);
			}else if(key == 39){
				console.log("left");
				pushLeft(box);
			};
		};
	};

	/*
		forces
		------
	*/

	function pushRight(obj){	
		var force = new b2Vec2(-200,0);
		obj.ApplyForce(force, obj.GetWorldCenter());
	};

	/*
		update functions
		----------------
	*/
	
	function update(){
		world.Step(1 / framerate, 10, 10);
		world.DrawDebugData();

		// TODO: find out how to clear the canvas from boxes
		// canvas.clearRect( 0 , 0 , p5.width, p5.height );
		world.ClearForces();
	};

	/*
		console debugging
		-----------------
	*/

	function mouseDebug(bool){
		// TODO: Convert this to meter ratio to match box2d
		// probably something like this:
		// var mouseX = parseInt(mouseX % p5.width / 10);
		// var mouseY = parseInt(mouseY % p5.heigth / 10);

		if(bool) console.log("mouseX: "+p5.mouseX+"::"+"mouseY: "+p5.mouseY);
	};
};

/*
	get canvas element and debug options for web2DWeb
	-------------------------------------------------
*/

debugDraw.SetSprite( document.getElementById ("world_canvas").getContext("2d"));
debugDraw.SetDrawScale(30.0);
debugDraw.SetFillAlpha(0.8);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
var canvas = document.getElementById('world_canvas');

// Passes the sketchProcedure to the newly create 
// Processing object. 
// this techique comes from processingjs.org website
var processing = new Processing(canvas, sketchProc);






