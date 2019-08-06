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
/**
 * 网络消息监听的修饰器
 * @param messageType
 */
function MessageHandler(messageType) {
    return function (target, propertyKey, descriptor) {
        if (!target._handlers) {
            target._handlers = {};
        }
        target._handlers[messageType] = target[propertyKey];
    };
}
/**
 * 让view具有delegate属性
 */
function UseDelegate(constructor) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.delegate = arguments[0];
            return _this;
        }
        return class_1;
    }(constructor));
}
/** 游戏显示对象
 * 不同游戏引擎可以定义为不同类型，如Laya.Sprite, egret.DisplayObject
 */
var DisplayObject = /** @class */ (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DisplayObject;
}(Laya.Sprite));
;
/**
 *
 */
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
//# sourceMappingURL=AppDef.js.map