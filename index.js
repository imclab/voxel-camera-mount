var Stream = require('stream').Stream
  , THREE = require('three')
  , inherits = require('inherits')

module.exports = Mount

function Mount(camera, offset) {
  if(!(this instanceof cons)) {
    return new cons(camera)
  }

  Stream.call(this)
  this.camera = camera
  this.offset = new THREE.Object3D()
  this.roll = new THREE.Object3D()
  this.pitch = new THREE.Object3D()
  this.yaw = new THREE.Object3D()

  this.roll.add(this.camera)
  this.pitch.add(this.roll)
  this.yaw.add(this.pitch)
  this.offset.add(this.yaw)

  this.readable =
  this.writable = true
}

var cons = Mount
  , proto

var min = Math.min
  , max = Math.max
  , PI_2 = Math.PI / 2

inherits(Mount, Stream)

proto = cons.prototype

proto.write = function(deltas) {
  this.yaw.rotation.y -= deltas.dx * 0.002
  this.pitch.rotation.x -= deltas.dy * 0.002
  this.pitch.rotation.x = max(-PI_2, min(PI_2, this.pitch.rotation.x))
}

proto.end = function() {
  this.emit('end')
}
