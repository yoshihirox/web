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
  var diff = vec3.create();
  if(mouseProp.clicking){
    calculateDiff(e,diff);
  }
  if(e.button == 0 || e.button == 1){//if click button is down
    var qt = quat4.create([0,0,0,1]);
    vec3.add( CADCam.position, diff);
  //  CADCam.updatePosition();
  }
  if(e.button == 1 ){// if wheel button is down
    //vec3.invertY(diff);
    vec3.add( CADCam.position,diff);
    //vec3.invertX(diff);
    //vec3.add(CADCam.center.position, CADCam.center.position, diff);
  }
  if(e.button == 2){//if rigth click button is down

  }
//  addDiffPos();
}
function calculateDiff(e,diff){
  var currentPos = vec3.create([e.clientX, e.clientY, 0]);
  vec3.subtract( currentPos, mouseProp.clickPos, diff);
  vec3.scale(diff, CADCam.sensi, diff);
  mouseProp.clickPos = currentPos;
}

document.onmousedown = function handleMouseUp(event){
  mouseProp.clicking = true;
  vec3.setXY(mouseProp.clickPos,event.clientX, event.clientY);
}

document.onmouseup = function handleMouseDown(event){
  // console.log("mousemove -clientX=%d, clientY=%d, button=%d",event.clientX, event.clientY, event.button);
  // console.log(event);
  mouseProp.clicking = false;
}
