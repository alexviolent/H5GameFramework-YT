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
var ApplicationFacade = /** @class */ (function (_super) {
    __extends(ApplicationFacade, _super);
    function ApplicationFacade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ApplicationFacade, "I", {
        get: function () {
            if (!puremvc.Facade.instance)
                puremvc.Facade.instance = new ApplicationFacade();
            return puremvc.Facade.instance;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationFacade.prototype.initializeController = function () {
        _super.prototype.initializeController.call(this);
        this.registerCommand(ApplicationFacade.STARTUP, StartupCommand);
    };
    /**
     * 启动
     */
    ApplicationFacade.prototype.startup = function (stage) {
        this.sendNotification(ApplicationFacade.STARTUP, stage);
        this.removeCommand(ApplicationFacade.STARTUP);
    };
    ApplicationFacade.STARTUP = "STARTUP";
    return ApplicationFacade;
}(puremvc.Facade));
//# sourceMappingURL=ApplicationFacade.js.map