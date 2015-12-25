var input_key_buffer = new Array();
var modelViewMatrix = mat4.create();
var modelViewMatrixStack = [];
var mouseProp = (function(){
  var rotateSensi = 0.1;
  var clicking = false;
  var coord = vec3.create();
  var clickPos = vec3.create();
  return{
    rotateSensi:rotateSensi,
    clicking:clicking,
    coord:coord,
    clickPos:clickPos
  }
}());

//extend Vec3 class
vec3.setXY = function(out, x, y){
  out[0] = x;
  out[1] = y;
  return out;
}
vec3.setZ = function(out, z){
  out[2] = z;
  return out;
}
vec3.invertY = function(out){
  out[1] = -out[1];
}
vec3.invertX = function(out){
  out[0] = -out[0];
}

//push and pop
function pushModelViewMatrix(){
  var copyToPush = mat4.create(modelViewMatrix);
  modelViewMatrixStack.push(copyToPush);
}

function popModelViewMatrix(){
  if(modelViewMatrixStack.length ==0){
    throw "Error popModelViewMatixStack.pop()";
  }
  modelViewMatrix = modelViewMatrixStack.pop();
}

var ylib = (function(){
  var hoge;
  var unko;
  return{
    x:hoge
  }
}());

var CADCam = (function(){
  var position = vec3.fromValues(0,0,3.0);
  var sensi = 0.01;
  var center = (function(){
   var position = vec3.create();
   return{
     position:position
   }
 }());
  var key={
    up:"73",//i
    down:"75",//k
    left:"74",//j
    right:"76 "//l
  }
  return{
    position:position,
    sensi:sensi,
    center:center
  }
}());

CADCam.update =function() {
  if(input_key_buffer(this.key.up) == true){

  }
}

ylib.hoge2 = function(){
  return "hoge";
}





	document.onkeydown = function(e){
		//console.log(e);
		input_key_buffer[e.keyCode] = true;
		//console.log("code: " + key_code);
		console.log("pushed "+ input_key_buffer[e.keyCode]);
	}

	document.onkeyup = function(e){
		input_key_buffer[e.keyCode] = false;
		console.log("pulled "+ input_key_buffer[e.keyCode]);
	}

document.onmousemove = function handleMouseMove(e){
  //console.log("mousemove -clientX=%d, clientY=%d",event.clientX, event.clientY);
  //console.log(mouseProp.clicking);
  var diff = vec3.create();
  if(mouseProp.clicking){
    var currentPos = vec3.fromValues(e.clientX, e.clientY, 0);
    vec3.sub(diff, currentPos, mouseProp.clickPos);
    vec3.scale(diff,diff, CADCam.sensi);
    mouseProp.clickPos = currentPos;
  }
  if(e.button == 0){//if click button is down
    vec3.invertY(diff);
    vec3.add(CADCam.center.position, CADCam.center.position, diff);
  }
  if(e.button == 1){// if wheel button is down
    //vec3.invertY(diff);
    vec3.add(CADCam.position, CADCam.position,diff);
    //vec3.invertX(diff);
    //vec3.add(CADCam.center.position, CADCam.center.position, diff);
  }
  if(e.button == 2){//if rigth click button is down

  }
//  addDiffPos();
}

document.onmousedown = function handleMouseUp(event){
  // console.log("mousemove -clientX=%d, clientY=%d, button=%d",event.clientX, event.clientY, event.button);
  mouseProp.clicking = true;
  vec3.setXY(mouseProp.clickPos,event.clientX, event.clientY);
  console.log(mouseProp.clickPos);
}

document.onmouseup = function handleMouseDown(event){
  // console.log("mousemove -clientX=%d, clientY=%d, button=%d",event.clientX, event.clientY, event.button);
  // console.log(event);
  mouseProp.clicking = false;
}


console.log("tanak");
