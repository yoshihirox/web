onload = function(){
	var canvas ;
	var gl;
	var prg;
	
	
	function createCanvas(name, width, height){
		var c = document.getElementById("canvas");
		c.width = width;
		c.height = height;
		return c;
	};
	function createGLContext(c){
		var context = c.getContext("webgl")||c.getContext("experimental-webgl");
		context.viewportWidth = c.width;
		context.viewportHeight = c.height;
		return context;
	}
	function create_shader(id){
		var shader;
		var scriptElement = document.getElementById(id);
		if(!scriptElement){
			return;
		}
		switch(scriptElement.type){
			case "x-shader/x-vertex":
				shader = gl.createShader(gl.VERTEX_SHADER);
				break;
			case "x-shader/x-fragment":
				shader = gl.createShader(gl.FRAGMENT_SHADER);
				break;
			default :
				return;
		}
		
		gl.shaderSource(shader, scriptElement.text);
		gl.compileShader(shader);
		if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
			return shader;
		}else{
			alert(gl.getShaderInfoLog(shader));
		}
	}
	function create_program(vs, fs){
		var v_shader = create_shader(vs);
		var f_shader = create_shader(fs);
		var program = gl.createProgram();
        gl.attachShader(program, v_shader);
        gl.attachShader(program, f_shader);
        gl.linkProgram(program);
        if(gl.getProgramParameter(program, gl.LINK_STATUS)){
            gl.useProgram(program);
            return program;
        }else{
            alert(gl.getProgramInfoLog(program));
        }
	}
	
	
	
	function draw(currentTime){
		requestAnimationFrame(draw);	
	}
	function startup(){
		canvas = createCanvas("canvas", 1024,768);
		//gl = createGLContext(canvas);
    	prg = create_program("vs","fs");
		draw();
	}
	
	
}