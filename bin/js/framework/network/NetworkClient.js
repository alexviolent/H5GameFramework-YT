var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NetworkClient = /** @class */ (function (_super) {
    __extends(NetworkClient, _super);
    function NetworkClient(handler, url, options) {
        var _this = _super.call(this, "ws://" + url, options) || this;
        _this.room = undefined;
        _this.handler = undefined;
        _this.handler = handler;
        return _this;
    }
    // 127.0.0.1:8889 room#10000
    NetworkClient.prototype.joinRoom = function (roomName, options) {
        var _this = this;
        this.room = this.join(roomName, options);
        this.room.onMessage.add(function (data) {
            _this.onRoomMessage(data);
        });
    };
    NetworkClient.prototype.onRoomMessage = function (data) {
        var opcode = data.shift();
        var msg = Protocol.decode(opcode, data);
        Logger.info(MessageType[opcode] + " - " + JSON.stringify(msg));
        this.handler.onMessage(opcode, msg);
    };
    NetworkClient.prototype.sendMessage = function (opcode, msg) {
        var data = Protocol.encode(opcode, msg);
        data.unshift(opcode);
        this.room.send(data);
    };
    NetworkClient.prototype.disconent = function () {
        if (this.room) {
            this.room.leave();
            this.room = undefined;
        }
        this.close("");
    };
    return NetworkClient;
}(Colyseus.Client));
//# sourceMappingURL=NetworkClient.js.map