onload = function(){
	var canvas ;
	var gl;
	var prg;
	var input_key_buffer = new Array();

	function showFPS(){
		var stats = new Stats();
		stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.zIndex = 100;
        document.body.appendChild(stats.domElement);
		setInterval(function(){
			stats.update();
		}, 1000/60);
	}
	showFPS();

	function createCanvas(name, width, height){
		var c = document.getElementById(name);
		c.width = width;
		c.height = height;
		return c;
	};
	function createGLContext(c){
		var context = c.getContext("webgl")||c.getContext("experimental-webgl");
		// context.viewportWidth = c.width;
		// context.viewportHeight = c.height;
		return context;
	}
	function create_shader(id){
		var shader;
		var scriptElement = document.getElementById(id);
		if(!scriptElement){
			return;
		}
		switch(scriptElement.type){
            case 'x-shader/x-vertex':
                shader = gl.createShader(gl.VERTEX_SHADER);
                break;
            case 'x-shader/x-fragment':
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

    function create_vbo(data){
		var vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		return vbo;
	}

	function setupTestTriangle(){
		var attLocation = gl.getAttribLocation(prg,"position");
		var attStride = 3;
		var vertex_position = [
			0.0, 1.0, 0.0,
			1.0, 0.0, 0.0,
			-1.0, 0.0, 0.0
		];
		var vbo = create_vbo(vertex_position);
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.enableVertexAttribArray(attLocation);
		gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);
	}
	function setUniform(name, value){
		var uniLocation = gl.getUniformLocation (prg, name);
		gl.uniformMatrix4fv(uniLocation, gl.FALSE, value);
	}



	function draw(currentTime){
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		toRad = function(deg){
			return deg*(Math.PI/ 180.0)
		}

		var matP = mat4.identity(mat4.create());
		var matV =  mat4.identity(mat4.create());
		var matM =  mat4.identity(mat4.create());
		var matMVP =  mat4.identity(mat4.create());
		var matMV =  mat4.identity(mat4.create());

		var loc = vec3.create([0.0, 1.0, 3.0]);
		var center = vec3.create([0,0,0]);
		var up = vec3.create([0,1,0]);
		mat4.lookAt(CADCam.position,CADCam.center.position,up, matV);
		//mat4.lookAt(loc, center, up, matV);
		var aspcet = canvas.width/canvas.height;
		var fov  = toRad(90.0);
		mat4.perspective( 90.0, aspcet, 0.1, 100.0, matP);

		matMV = mat4.multiply( matV, matM);
		matMVP = mat4.multiply(matP, matMV);
		setUniform("mvpMatrix", matMVP);

		gl.drawArrays(gl.TRIANGLES, 0, 3);
		gl.flush();

	requestAnimationFrame(draw);
	}

	function startup(){
		canvas = createCanvas("canvas", 1024,768);
		gl = createGLContext(canvas);
    	prg = create_program("vs","fs");

	    setupTestTriangle();

		draw();
	}
	startup();




}
