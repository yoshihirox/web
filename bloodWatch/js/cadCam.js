var CADCam = (function(){
  var position = vec3.create([0,0,3.0]);
  var sensi = 0.01;
  var up = vec3.create([0, 1, 0]);
  var loc = vec3.create([0.0, 0.0, 3.0]);
  var center = (function(){
  var position = vec3.create();
    return{
       position:position
    }
  }());
  var update = function(matV){
    var radX =(CADCam.position[0] ) * Math.PI/10;
    var radY =(CADCam.position[1] ) * Math.PI/10;

    var qtX = quat4.create([0,0,0,1]);
    var qtY = quat4.create([0,0,0,1]);

    var Yaxis = [0, 1, 0];
    var Xaxis = [1, 0, 0];
    quat4.rotate(radX,Yaxis,qtX);
    quat4.rotate(radY,Xaxis,qtY);

    var qtResult  = quat4.multiply(qtY,qtX,qtResult);
    quat4.toVec3([0,0,3],qtResult,loc);
    quat4.toVec3([0,1,0], qtResult, up);
    mat4.lookAt(loc, center.position, up, matV);
  }
  var key={
    up:"73",//i
    down:"75",//k
    left:"74",//j
    right:"76 "//l
  }
  return{
    position:position,
    sensi:sensi,
    center:center,
    update:update
  }
}());
