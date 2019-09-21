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
/*
* name;
*/
var BaseProxy = /** @class */ (function (_super) {
    __extends(BaseProxy, _super);
    function BaseProxy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseProxy;
}(puremvc.Proxy));
/**
 * 获取Proxy的装饰器
 * @param proxy
 */
function Proxy(proxy) {
    return function (target, propertyName) {
        Object.defineProperty(target, propertyName, {
            get: function () {
                return ApplicationFacade.I.retrieveProxy(proxy.NAME);
            }
        });
    };
}
//# sourceMappingURL=BaseProxy.js.map