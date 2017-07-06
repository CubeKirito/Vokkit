var Logger = new (require("../Logger.js"))();
var Player = require("../Player.js");

function LoginManager() {
    this.getListener = function (socket) {
        return function (data) {
            var playerList = Vokkit.getServer().getOnlinePlayers();
            for (var i in playerList) {
                if (playerList[i].getName() == data.name) {
                    socket.emit("loginResult", {
                        succeed: false,
                        reason: 0
                    });
                    return;
                }
            }
            var sendPlayers = [];
            for (var i in playerList) {
                sendPlayers.push(playerList[i].toObject());
            }
            socket.emit("loginResult", {
                succeed: true,
                players: sendPlayers
            });
            var player = new Player(data.name, [0, 0, 0], [0, 0, 0], 0, 0, socket);
            Vokkit.getServer().addPlayer(player);
            var address = socket.request.connection._peername;
            Logger.info(player.getName() + "[" + address.address + ":" + address.port + "] 이가 로그인 했습니다.");
            Vokkit.getServer().getSocketServer().emit("playerJoin", {
                name: player.getName(),
                position: [0, 0, 0],
                acceleration: [0, 0, 0],
                yaw: 0,
                pitch: 0,
                id: player.getId()
            });
        }
    }
}

module.exports = LoginManager;