onload = function(){
	var count = 0;

	var createFPSWindow = function(){
	  fpsStats = new Stats();
	  fpsStats.domElement.style.position = 'absolute';
	      fpsStats.domElement.style.top = '0px';
	      fpsStats.domElement.style.zIndex = 100;
	      document.body.appendChild(fpsStats.domElement);
	}
	var showFPS = function(){
	  setInterval(function(){
	    fpsStats.update();
	  }, 1000/60);
	}

	function setupTestTriangle(){
		var attLocation = mygl.gl.getAttribLocation(mygl.prg,"position");
		var attStride = 3;
		var vertex_position = [
			0.0, 0.2, 0.0,
			0.2, 0.0, 0.0,
			-0.2, 0.0, 0.0
		];
		var vbo = mygl.create_vbo(vertex_position);
		mygl.gl.bindBuffer(mygl.gl.ARRAY_BUFFER, vbo);
		mygl.gl.enableVertexAttribArray(attLocation);
		mygl.gl.vertexAttribPointer(attLocation, attStride, mygl.gl.FLOAT, false, 0, 0);
	}


	function startup(){
		MvpMats.initMat();
		createFPSWindow();
		showFPS();
		mygl.canvas = mygl.createCanvas("canvas", 1024,768);
		mygl.gl = mygl.createGLContext(canvas);
		mygl.prg = mygl.create_program("vs","fs");
		setupTestTriangle();
		draw();
	}

	function draw(currentTime){
		count++;
    mygl.clearCanvas();
    CADCam.update(MvpMats.matV);

		MvpMats.matM =  mat4.identity(mat4.create());
		mat4.translate(MvpMats.matM, [1,0,0,0]);
    MvpMats.updateMats();
		mygl.gl.drawArrays(mygl.gl.TRIANGLES, 0, 3);

		// for(i = 0; i< 1000; i++){
		// 	var x = Math.random()*4;
		//
		// 	var y = Math.random()*4;
		//
		// 	var z = Math.random()*4;
		// 	MvpMats.matM =  mat4.identity(mat4.create());
		// 	mat4.translate(MvpMats.matM, [x,y,z,0]);
		// 	MvpMats.updateMats();
		// 	mygl.gl.drawArrays(mygl.gl.TRIANGLES, 0, 3);
		// }


		var eyeX = quat4.create([0,0,0,1]);
		var eyeY = quat4.create([0,0,0,1]);
		requestAnimationFrame(draw);

		mygl.gl.flush();
	}

	startup();
}
