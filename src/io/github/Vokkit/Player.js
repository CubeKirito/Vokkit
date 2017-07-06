function Player(name, position, acceleration, yaw, pitch, socket){
    this.name = name;
    this.position = position.slice();
    this.acceleration = acceleration.slice();
    this.yaw = yaw;
    this.pitch = pitch;
    this.socket = socket;
    var player = this;
    this.getName = function(){
        return player.name;
    }
    this.getId = function(){
        return player.socket.id;
    }
    this.getPosition = function(){
        return player.position.slice();
    }
    this.setPosition = function(position){
        player.position = position.slice();
    }
    this.getAcceleration = function(){
        return player.acceleration.slice();
    }
    this.setAcceleration = function(acceleration){
        player.acceleration = acceleration.slice();
    }
    this.getYaw = function(){
        return player.yaw;
    }
    this.setYaw = function(yaw) {
        player.yaw = yaw;
    }
    this.getPitch = function(){
        return player.pitch;
    }
    this.setPitch = function(pitch) {
        player.pitch = pitch;
    }
    this.getSocket = function(){
        return player.socket;
    }
    this.equals = function(object) {
        return object instanceof Player && object.getId() == player.getId();
    }
    this.toObject = function(){
        return {
            name: player.getName(),
            position: [0, 0, 0],
            acceleration: [0, 0, 0],
            yaw: 0,
            pitch: 0,
            id: player.getId()
        };
    }
}

module.exports = Player;