///<reference path='../../../../../org/puremvc/typescript/interfaces/INotifier.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/IFacade.ts'/>
///<reference path='../../../../../org/puremvc/typescript/patterns/facade/Facade.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>INotifier</code> implementation.
     *
     * <code>MacroCommand</code>, <code>SimpleCommand</code>, <code>Mediator</code> and
     * <code>Proxy</code> all have a need to send <code>Notifications</code>.
     *
     * The <code>INotifier</code> interface provides a common method called
     * <code>sendNotification</code> that relieves implementation code of the necessity to actually
     * construct <code>Notification</code>s.
     *
     * The <code>INotifier</code> interface, which all of the above mentioned classes extend,
     * provides an initialized reference to the <code>Facade</code> singleton, which is required by
     * the convenience method <code>sendNotification</code>	for sending <code>Notifications</code>,
     * but it also eases implementation as these classes have frequent <code>Facade</code>
     * interactions and usually require access to the facade anyway.
     */
    var Notifier = /** @class */ (function () {
        /**
         * Constructs a <code>Notifier</code> instance.
         */
        function Notifier() {
            /**
             * Local reference to the singleton <code>Facade</code>.
             *
             * @protected
             */
            this.facade = null;
            this.facade = puremvc.Facade.getInstance();
        }
        /**
         * Create and send a <code>Notification</code>.
         *
         * Keeps us from having to construct new <code>Notification</code> instances in our
         * implementation code.
         *
         * @param name
         * 		The name of the notification to send.
         *
         * @param body
         * 		The body of the notification.
         *
         * @param type
         * 		The type of the notification.
         */
        Notifier.prototype.sendNotification = function (name, body, type) {
            if (body === void 0) { body = null; }
            if (type === void 0) { type = null; }
            this.facade.sendNotification(name, body, type);
        };
        return Notifier;
    }());
    puremvc.Notifier = Notifier;
})(puremvc || (puremvc = {}));
//# sourceMappingURL=Notifier.js.map