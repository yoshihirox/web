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
quat4.rotate = function(angle, axis, dest){
  var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
  if(!sq){return null;}
  var a = axis[0], b = axis[1], c = axis[2];
  if(sq != 1){sq = 1 / sq; a *= sq; b *= sq; c *= sq;}
  var s = Math.sin(angle * 0.5);
  dest[0] = a * s;
  dest[1] = b * s;
  dest[2] = c * s;
  dest[3] = Math.cos(angle * 0.5);

  return dest;
};
quat4.toVec3 = function(vec, qtn, dest){
  var qp = quat4.create();
  var qq = quat4.create();
  var qr = quat4.create();
  quat4.inverse(qtn, qr);
  qp[0] = vec[0];
  qp[1] = vec[1];
  qp[2] = vec[2];
  quat4.multiply(qr, qp, qq);
  quat4.multiply(qq, qtn, qr);
  dest[0] = qr[0];
  dest[1] = qr[1];
  dest[2] = qr[2];
  return dest;
};
