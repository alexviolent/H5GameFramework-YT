/*
* name;
*/
var Protocol = /** @class */ (function () {
    function Protocol() {
    }
    Object.defineProperty(Protocol, "protobuf", {
        /** pomelo-protobuf对象 */
        get: function () {
            return window.protobuf;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 初始化protobuf协议
    * @param obj
    */
    Protocol.initProtobuf = function (obj) {
        var protos = this.protobuf.parser.parse(obj);
        this.protobuf.init({ encoderProtos: protos, decoderProtos: protos });
    };
    Protocol.encode = function (opcode, msg) {
        var buf = this.protobuf.encode(MessageType[opcode], msg);
        return buf ? [].slice.call(buf) : [];
    };
    Protocol.decode = function (opcode, data) {
        return this.protobuf.decode(MessageType[opcode], data);
    };
    return Protocol;
}());
//# sourceMappingURL=Protocol.js.map