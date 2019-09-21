///<reference path='../../../../../org/puremvc/typescript/interfaces/IProxy.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotifier.ts'/>
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
     * A base <code>IProxy</code> implementation.
     *
     * In PureMVC, <code>IProxy</code> implementors assume these responsibilities:
     * <UL>
     * <LI>Implement a common method which returns the name of the Proxy.
     * <LI>Provide methods for setting and getting the data object.
     *
     * Additionally, <code>IProxy</code>s typically:
     * <UL>
     * <LI>Maintain references to one or more pieces of model data.
     * <LI>Provide methods for manipulating that data.
     * <LI>Generate <code>INotifications</code> when their model data changes.
     * <LI>Expose their name as a <code>constant</code> called <code>NAME</code>, if they are not
     * instantiated multiple times.
     * <LI>Encapsulate interaction with local or remote services used to fetch and persist model
     * data.
     */
    var Proxy = /** @class */ (function (_super) {
        __extends(Proxy, _super);
        /**
         * Constructs a <code>Proxy</code> instance.
         *
         * @param proxyName
         * 		The name of the <code>Proxy</code> instance.
         *
         * @param data
         * 		An initial data object to be held by the <code>Proxy</code>.
         */
        function Proxy(proxyName, data) {
            if (proxyName === void 0) { proxyName = null; }
            if (data === void 0) { data = null; }
            var _this = _super.call(this) || this;
            /**
             * The data object controlled by the <code>Proxy</code>.
             *
             * @protected
             */
            _this.proxyName = null;
            /**
             * The name of the <code>Proxy</code>.
             *
             * @protected
             */
            _this.data = null;
            _this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;
            if (data != null)
                _this.setData(data);
            return _this;
        }
        /**
         * Get the name of the <code>Proxy></code> instance.
         *
         * @return
         * 		The name of the <code>Proxy></code> instance.
         */
        Proxy.prototype.getProxyName = function () {
            return this.proxyName;
        };
        /**
         * Set the data of the <code>Proxy></code> instance.
         *
         * @param data
         * 		The data to set for the <code>Proxy></code> instance.
         */
        Proxy.prototype.setData = function (data) {
            this.data = data;
        };
        /**
         * Get the data of the <code>Proxy></code> instance.
         *
         * @return
         * 		The data held in the <code>Proxy</code> instance.
         */
        Proxy.prototype.getData = function () {
            return this.data;
        };
        /**
         * Called by the Model when the <code>Proxy</code> is registered. This method has to be
         * overridden by the subclass to know when the instance is registered.
         */
        Proxy.prototype.onRegister = function () {
        };
        /**
         * Called by the Model when the <code>Proxy</code> is removed. This method has to be
         * overridden by the subclass to know when the instance is removed.
         */
        Proxy.prototype.onRemove = function () {
        };
        /**
         * The default name of the <code>Proxy</code>
         *
         * @type
         * @constant
         */
        Proxy.NAME = "Proxy";
        return Proxy;
    }(puremvc.Notifier));
    puremvc.Proxy = Proxy;
})(puremvc || (puremvc = {}));
//# sourceMappingURL=Proxy.js.map