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
var AppContextMediator = /** @class */ (function (_super) {
    __extends(AppContextMediator, _super);
    function AppContextMediator(stage) {
        return _super.call(this, AppContextMediator.NAME, stage) || this;
    }
    AppContextMediator.prototype.onRegister = function () {
        var p = this.viewComponent;
        AppContextMediator.scene = p.addChild(new DisplayObject());
        AppContextMediator.dialog = p.addChild(new DisplayObject());
        AppContextMediator.float = p.addChild(new DisplayObject());
        AppContextMediator.topmost = p.addChild(new DisplayObject());
    };
    AppContextMediator.prototype.onRemove = function () {
        this.viewComponent.removeSelf();
    };
    AppContextMediator.NAME = "AppContextMediator";
    return AppContextMediator;
}(puremvc.Mediator));
//# sourceMappingURL=AppContextMediator.js.map