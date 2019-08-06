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
var BaseSimpleCommand = /** @class */ (function (_super) {
    __extends(BaseSimpleCommand, _super);
    function BaseSimpleCommand() {
        return _super.call(this) || this;
    }
    BaseSimpleCommand.prototype.execute = function (notification) {
        this.data = notification.getBody();
    };
    BaseSimpleCommand.register = function (facade) {
        facade.registerCommand(this.NAME, this);
    };
    return BaseSimpleCommand;
}(puremvc.SimpleCommand));
var BaseMacroCommand = /** @class */ (function (_super) {
    __extends(BaseMacroCommand, _super);
    function BaseMacroCommand() {
        return _super.call(this) || this;
    }
    return BaseMacroCommand;
}(puremvc.MacroCommand));
//# sourceMappingURL=BaseCommand.js.map