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
 * app门面基类，必须调用startup来注册app上下文媒介
 */
var ApplicationFacadeBase = /** @class */ (function (_super) {
    __extends(ApplicationFacadeBase, _super);
    function ApplicationFacadeBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ApplicationFacadeBase, "I", {
        get: function () {
            if (!puremvc.Facade.instance)
                puremvc.Facade.instance = new ApplicationFacadeBase();
            return puremvc.Facade.instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 启动
     */
    ApplicationFacadeBase.prototype.startup = function (stage) {
        this.registerMediator(new AppContextMediator(stage));
        this.sendNotification(ApplicationFacade.STARTUP);
        this.removeCommand(ApplicationFacade.STARTUP);
    };
    ApplicationFacadeBase.STARTUP = "STARTUP";
    return ApplicationFacadeBase;
}(puremvc.Facade));
//# sourceMappingURL=ApplicationFacadeBase.js.map