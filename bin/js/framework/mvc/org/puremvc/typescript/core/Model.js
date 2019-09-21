///<reference path='../../../../org/puremvc/typescript/interfaces/IModel.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/IProxy.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * The <code>Model</code> class for PureMVC.
     *
     * A singleton <code>IModel</code> implementation.
     *
     * In PureMVC, the <code>IModel</code> class provides access to model objects
     * <code>Proxie</code>s by named lookup.
     *
     * The <code>Model</code> assumes these responsibilities:
     * <UL>
     * <LI>Maintain a cache of <code>IProxy</code> instances.
     * <LI>Provide methods for registering, retrieving, and removing <code>Proxy</code> instances.
     *
     * Your application must register <code>IProxy</code> instances with the <code>Model</code>.
     * Typically, you use an <code>ICommand</code> to create and register <code>Proxy</code> instances
     * once the <code>Facade</code> has initialized the Core actors.
     */
    var Model = /** @class */ (function () {
        /**
         * This <code>IModel</code> implementation is a singleton, so you should not call the
         * constructor directly, but instead call the static singleton Factory method
         * <code>Model.getInstance()</code>.
         *
         * @throws Error
         * 		Error if singleton instance has already been constructed.
         */
        function Model() {
            /**
             * HashTable of <code>IProxy</code> registered with the <code>Model</code>.
             *
             * @protected
             */
            this.proxyMap = null;
            if (Model.instance)
                throw Error(Model.SINGLETON_MSG);
            Model.instance = this;
            this.proxyMap = {};
            this.initializeModel();
        }
        /**
         * Initialize the singleton <code>Model</code> instance.
         *
         * Called automatically by the constructor, this is the opportunity to initialize the
         * singleton instance in a subclass without overriding the constructor.
         *
         * @protected
         */
        Model.prototype.initializeModel = function () {
        };
        /**
         * Register an <code>IProxy</code> with the <code>Model</code>.
         *
         * @param proxy
         *		An <code>IProxy</code> to be held by the <code>Model</code>.
         */
        Model.prototype.registerProxy = function (proxy) {
            this.proxyMap[proxy.getProxyName()] = proxy;
            proxy.onRegister();
        };
        /**
         * Remove an <code>IProxy</code> from the <code>Model</code>.
         *
         * @param proxyName
         *		The name of the <code>Proxy</code> instance to be removed.
         *
         * @return
         *		The <code>IProxy</code> that was removed from the <code>Model</code> or an
         *		explicit <code>null</null> if the <code>IProxy</code> didn't exist.
         */
        Model.prototype.removeProxy = function (proxyName) {
            var proxy = this.proxyMap[proxyName];
            if (proxy) {
                delete this.proxyMap[proxyName];
                proxy.onRemove();
            }
            return proxy;
        };
        /**
         * Retrieve an <code>IProxy</code> from the <code>Model</code>.
         *
         * @param proxyName
         *		 The <code>IProxy</code> name to retrieve from the <code>Model</code>.
         *
         * @return
         *		The <code>IProxy</code> instance previously registered with the given
         *		<code>proxyName</code> or an explicit <code>null</code> if it doesn't exists.
         */
        Model.prototype.retrieveProxy = function (proxyName) {
            //Return a strict null when the proxy doesn't exist
            return this.proxyMap[proxyName] || null;
        };
        /**
         * Check if a Proxy is registered
         *
         * @param proxyName
         *		The name of the <code>IProxy</code> to verify the existence of its registration.
         *
         * @return
         *		A Proxy is currently registered with the given <code>proxyName</code>.
         */
        Model.prototype.hasProxy = function (proxyName) {
            return this.proxyMap[proxyName] != null;
        };
        /**
         * <code>Model</code> singleton factory method.
         *
         * @return
         * 		The singleton instance of <code>Model</code>.
         */
        Model.getInstance = function () {
            if (!Model.instance)
                Model.instance = new Model();
            return Model.instance;
        };
        /**
         * Error message used to indicate that a controller singleton is already constructed when
         * trying to constructs the class twice.
         *
         * @constant
         * @protected
         */
        Model.SINGLETON_MSG = "Model singleton already constructed!";
        return Model;
    }());
    puremvc.Model = Model;
})(puremvc || (puremvc = {}));
//# sourceMappingURL=Model.js.map