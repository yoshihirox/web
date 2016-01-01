var MvpMats = (function(){
  var matP,matV,matM,	matMVP,matMV;

  var clearMat = function(){
  }
  return{
    matP:matP,
    matV:matV,
    matM:matM,
    matMVP:matMVP,
    matMV:matMV,
  }
}());

var toRad = function(deg){
  return deg*(Math.PI/ 180.0)
}

MvpMats.initMat = function(){
  this.matP = mat4.identity(mat4.create());
  this.matV =  mat4.identity(mat4.create());
  this.matM =  mat4.identity(mat4.create());
  this.matMVP =  mat4.identity(mat4.create());
  this.matMV =  mat4.identity(mat4.create());
}

MvpMats.updateMats = function(){
  this.updatePerspective();
  this.matMV = mat4.multiply( this.matV, this.matM, this.matMV);
  this.matMVP = mat4.multiply(this.matP, this.matMV);
  mygl.setUniform("mvpMatrix", this.matMVP);
}

MvpMats.updatePerspective = function(){
  var aspcet = canvas.width/canvas.height;
  var fov  = toRad(90.0);
  mat4.perspective( 90.0, aspcet, 0.1, 100.0, this.matP);
}
