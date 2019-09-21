///<reference path='../../../../../org/puremvc/typescript/interfaces/INotification.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>INotification</code> implementation.
     *
     * PureMVC does not rely upon underlying event models such as the one provided in JavaScript DOM API,
     * and TypeScript does not have an inherent event model.
     *
     * The Observer pattern as implemented within PureMVC exists to support event-driven
     * communication between the application and the actors of the MVC triad (Model, View and
     * Controller).
     *
     * Notifications are not meant to be a replacement for Events in Javascript.
     * Generally, <code>IMediator</code> implementors place event listeners on their view components,
     * which they then handle in the usual way. This may lead to the broadcast of
     * <code>INotification</code>s to trigger <code>ICommand</code>s or to communicate with other
     * <code>IMediators</code>. <code>IProxy</code> and <code>ICommand</code> instances communicate
     * with each other and <code>IMediator</code>s by broadcasting <code>INotification</code>s.
     *
     * A key difference between JavaScript <code>Event</code>s and PureMVC
     * <code>INotification</code>s is that <code>Event</code>s follow the 'Chain of Responsibility'
     * pattern, 'bubbling' up the display hierarchy until some parent component handles the
     * <code>Event</code>, while PureMVC <code>INotification</code>s follow a 'Publish/Subscribe'
     * pattern. PureMVC classes need not be related to each other in a parent/child relationship in
     * order to communicate with one another using <code>INotification</code>s.
     */
    var Notification = /** @class */ (function () {
        /**
         * Constructs a <code>Notification</code> instance.
         *
         * @param name
         * 		The name of the notification.
         *
         * @param body
         * 		Body data to send with the <code>Notification</code>.
         *
         * @param type
         * 		Type identifier of the <code>Notification</code>.
         */
        function Notification(name, body, type) {
            if (body === void 0) { body = null; }
            if (type === void 0) { type = null; }
            /**
             * The name of the <code>Notification</code>.
             *
             * @protected
             */
            this.name = null;
            /**
             * The body data to send with the <code>Notification</code>.
             *
             * @protected
             */
            this.body = null;
            /**
             * The type identifier of the <code>Notification</code>.
             *
             * @protected
             */
            this.type = null;
            this.name = name;
            this.body = body;
            this.type = type;
        }
        /**
         * Get the name of the <code>Notification</code> instance.
         *
         * @return
         *		The name of the <code>Notification</code> instance.
         */
        Notification.prototype.getName = function () {
            return this.name;
        };
        /**
         * Set the body of the <code>Notification</code> instance.
         *
         * @param body
         * 		The body of the <code>Notification</code> instance.
         */
        Notification.prototype.setBody = function (body) {
            this.body = body;
        };
        /**
         * Get the body of the <code>Notification</code> instance.
         *
         * @return
         *		The body object of the <code>Notification</code> instance.
         */
        Notification.prototype.getBody = function () {
            return this.body;
        };
        /**
         * Set the type of the <code>Notification</code> instance.
         *
         * @param type
         * 		The type of the <code>Notification</code> instance.
         */
        Notification.prototype.setType = function (type) {
            this.type = type;
        };
        /**
         * Get the type of the <code>Notification</code> instance.
         *
         * @return
         *		The type of the <code>Notification</code> instance.
         */
        Notification.prototype.getType = function () {
            return this.type;
        };
        /**
         * Get a textual representation of the <code>Notification</code> instance.
         *
         * @return
         * 		The textual representation of the <code>Notification</code>	instance.
         */
        Notification.prototype.toString = function () {
            var msg = "Notification Name: " + this.getName();
            msg += "\nBody:" + ((this.getBody() == null) ? "null" : this.getBody().toString());
            msg += "\nType:" + ((this.getType() == null) ? "null" : this.getType());
            return msg;
        };
        return Notification;
    }());
    puremvc.Notification = Notification;
})(puremvc || (puremvc = {}));
//# sourceMappingURL=Notification.js.map