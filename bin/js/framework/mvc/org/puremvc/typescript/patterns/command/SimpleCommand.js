///<reference path='../../../../../org/puremvc/typescript/interfaces/ICommand.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotifier.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotification.ts'/>
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
///<reference path='../../../../../org/puremvc/typescript/patterns/observer/Notifier.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>ICommand</code> implementation.
     *
     * Your subclass should override the <code>execute</code> method where your business logic will
     * handle the <code>INotification</code>.
     */
    var SimpleCommand = /** @class */ (function (_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Fulfill the use-case initiated by the given <code>INotification</code>.
         *
         * In the Command Pattern, an application use-case typically begins with some user action,
         * which results in an <code>INotification</code> being broadcast, which is handled by
         * business logic in the <code>execute</code> method of an <code>ICommand</code>.
         *
         * @param notification
         * 		The <code>INotification</code> to handle.
         */
        SimpleCommand.prototype.execute = function (notification) {
        };
        return SimpleCommand;
    }(puremvc.Notifier));
    puremvc.SimpleCommand = SimpleCommand;
})(puremvc || (puremvc = {}));
//# sourceMappingURL=SimpleCommand.js.map