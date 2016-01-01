var mygl=(function(){
  var fpsStats;
  var canvas ;
  var gl ;
  var prg ;
  return{

    canvas:canvas,
    gl:gl,
    prg:prg
  };
}());

mygl.setUniform = function(name, value){
  var uniLocation = this.gl.getUniformLocation (this.prg, name);
  this.gl.uniformMatrix4fv(uniLocation, this.gl.FALSE, value);
}

mygl.createCanvas = function(name, width, height){
  var c = document.getElementById(name);
  c.width = width;
  c.height = height;
  return c;
};

mygl.createGLContext = function(c){
  var context = c.getContext("webgl")||c.getContext("experimental-webgl");
  // context.viewportWidth = c.width;
  // context.viewportHeight = c.height;
  return context;
}

mygl.create_shader = function(id){
  var shader;
  var scriptElement = document.getElementById(id);
  if(!scriptElement){
    return;
  }
  switch(scriptElement.type){
          case 'x-shader/x-vertex':
              shader = this.gl.createShader(this.gl.VERTEX_SHADER);
              break;
          case 'x-shader/x-fragment':
              shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
              break;
          default :
              return;
  }
  this.gl.shaderSource(shader, scriptElement.text);
  this.gl.compileShader(shader);
  if(this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)){
    return shader;
  }else{
    alert(this.gl.getShaderInfoLog(shader));
  }
}

mygl.create_program = function(vs, fs){
  var v_shader = this.create_shader(vs);
  var f_shader = this.create_shader(fs);
  var program = this.gl.createProgram();
      this.gl.attachShader(program, v_shader);
      this.gl.attachShader(program, f_shader);
      this.gl.linkProgram(program);
  if(this.gl.getProgramParameter(program, this.gl.LINK_STATUS)){
      this.gl.useProgram(program);
      return program;
  }else{
      alert(this.gl.getProgramInfoLog(program));
  }
}


mygl.create_vbo = function(data){
  var vbo = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  return vbo;
}

mygl.clearCanvas = function(){
  this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
  this.gl.clearDepth(1.0);
  this.gl.clear(mygl.gl.COLOR_BUFFER_BIT | mygl.gl.DEPTH_BUFFER_BIT);
}
