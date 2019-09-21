///<reference path='../../../../org/puremvc/typescript/interfaces/IView.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/IObserver.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../org/puremvc/typescript/interfaces/IMediator.ts'/>
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * The <code>View</code> class for PureMVC.
     *
     * A singleton <code>IView</code> implementation.
     *
     * In PureMVC, the <code>View</code> class assumes these responsibilities:
     * <UL>
     * <LI>Maintain a cache of <code>IMediator</code> instances.
     * <LI>Provide methods for registering, retrieving, and removing <code>IMediator</code>s.
     * <LI>Notifiying <code>IMediator</code>s when they are registered or removed.
     * <LI>Managing the <code>Observer</code> lists for each <code>INotification</code> in the
     * application.
     * <LI>Providing a method for attaching <code>IObservers</code> to an
     * <code>INotification</code>'s <code>Observer</code> list.
     * <LI>Providing a method for broadcasting an <code>INotification</code>.
     * <LI>Notifying the <code>IObserver</code>s of a given <code>INotification</code> when it
     * broadcasts.
     */
    var View = /** @class */ (function () {
        /**
         * This <code>IView</code> implementation is a singleton, so you should not call the
         * constructor directly, but instead call the static singleton Factory method
         * <code>View.getInstance()</code>.
         *
         * @throws Error
         * 		Throws an error if an instance for this singleton has already been constructed.
         */
        function View() {
            /**
             * Mapping of <code>Mediator</code> names to <code>Mediator</code> instances.
             *
             * @protected
             */
            this.mediatorMap = null;
            /**
             * Mapping of <code>Notification</code> names to <code>Observers</code> lists.
             *
             * @protected
             */
            this.observerMap = null;
            if (View.instance)
                throw Error(View.SINGLETON_MSG);
            View.instance = this;
            this.mediatorMap = {};
            this.observerMap = {};
            this.initializeView();
        }
        /**
         * Initialize the singleton <code>View</code> instance.
         *
         * Called automatically by the constructor. This is the opportunity to initialize the
         * singleton instance in a subclass without overriding the constructor.
         */
        View.prototype.initializeView = function () {
        };
        /**
         * Register an <code>IObserver</code> to be notified of <code>INotifications</code> with a
         * given name.
         *
         * @param notificationName
         * 		The name of the <code>INotifications</code> to notify this <code>IObserver</code>
         * 		of.
         *
         * @param observer
         * 		The <code>IObserver</code> to register.
         */
        View.prototype.registerObserver = function (notificationName, observer) {
            var observers = this.observerMap[notificationName];
            if (observers)
                observers.push(observer);
            else
                this.observerMap[notificationName] = [observer];
        };
        /**
         * Remove a list of <code>Observer</code>s for a given <code>notifyContext</code> from an
         * <code>Observer</code> list for a given <code>INotification</code> name.
         *
         * @param notificationName
         * 		Which <code>IObserver</code> list to remove from.
         *
         * @param notifyContext
         * 		Remove the <code>IObserver</code> with this object as its
         *		<code>notifyContext</code>.
         */
        View.prototype.removeObserver = function (notificationName, notifyContext) {
            //The observer list for the notification under inspection
            var observers = this.observerMap[notificationName];
            //Find the observer for the notifyContext.
            var i = observers.length;
            while (i--) {
                var observer = observers[i];
                if (observer.compareNotifyContext(notifyContext)) {
                    observers.splice(i, 1);
                    break;
                }
            }
            /*
             * Also, when a Notification's Observer list length falls to zero, delete the
             * notification key from the observer map.
             */
            if (observers.length == 0)
                delete this.observerMap[notificationName];
        };
        /**
         * Notify the <code>IObserver</code>s for a particular <code>INotification</code>.
         *
         * All previously attached <code>IObserver</code>s for this <code>INotification</code>'s
         * list are notified and are passed a reference to the <code>INotification</code> in the
         * order in which they were registered.
         *
         * @param notification
         * 		The <code>INotification</code> to notify <code>IObserver</code>s of.
         */
        View.prototype.notifyObservers = function (notification) {
            var notificationName = notification.getName();
            var observersRef /*Array*/ = this.observerMap[notificationName];
            if (observersRef) {
                // Copy the array.
                var observers /*Array*/ = observersRef.slice(0);
                var len /*Number*/ = observers.length;
                for (var i /*Number*/ = 0; i < len; i++) {
                    var observer /*Observer*/ = observers[i];
                    observer.notifyObserver(notification);
                }
            }
        };
        /**
         * Register an <code>IMediator</code> instance with the <code>View</code>.
         *
         * Registers the <code>IMediator</code> so that it can be retrieved by name, and further
         * interrogates the <code>IMediator</code> for its <code>INotification</code> interests.
         *
         * If the <code>IMediator</code> returns any <code>INotification</code> names to be
         * notified about, an <code>Observer</code> is created to encapsulate the
         * <code>IMediator</code> instance's <code>handleNotification</code> method and register
         * it as an <code>Observer</code> for all <code>INotification</code>s the
         * <code>IMediator</code> is interested in.
         *
         * @param mediator
         * 		A reference to an <code>IMediator</code> implementation instance.
         */
        View.prototype.registerMediator = function (mediator) {
            var name = mediator.getMediatorName();
            //Do not allow re-registration (you must removeMediator first).
            if (this.mediatorMap[name])
                return;
            //Register the Mediator for retrieval by name.
            this.mediatorMap[name] = mediator;
            //Get Notification interests, if any.
            var interests = mediator.listNotificationInterests();
            var len = interests.length;
            if (len > 0) {
                //Create Observer referencing this mediator's handlNotification method.
                var observer = new puremvc.Observer(mediator.handleNotification, mediator);
                //Register Mediator as Observer for its list of Notification interests.
                for (var i = 0; i < len; i++)
                    this.registerObserver(interests[i], observer);
            }
            //Alert the mediator that it has been registered.
            mediator.onRegister();
        };
        /**
         * Retrieve an <code>IMediator</code> from the <code>View</code>.
         *
         * @param mediatorName
         * 		The name of the <code>IMediator</code> instance to retrieve.
         *
         * @return
         * 		The <code>IMediator</code> instance previously registered with the given
         *		<code>mediatorName</code> or an explicit <code>null</code> if it doesn't exists.
         */
        View.prototype.retrieveMediator = function (mediatorName) {
            //Return a strict null when the mediator doesn't exist
            return this.mediatorMap[mediatorName] || null;
        };
        /**
         * Remove an <code>IMediator</code> from the <code>View</code>.
         *
         * @param mediatorName
         * 		Name of the <code>IMediator</code> instance to be removed.
         *
         * @return
         *		The <code>IMediator</code> that was removed from the <code>View</code> or a
         *		strict <code>null</null> if the <code>Mediator</code> didn't exist.
         */
        View.prototype.removeMediator = function (mediatorName) {
            // Retrieve the named mediator
            var mediator = this.mediatorMap[mediatorName];
            if (!mediator)
                return null;
            //Get Notification interests, if any.
            var interests = mediator.listNotificationInterests();
            //For every notification this mediator is interested in...
            var i = interests.length;
            while (i--)
                this.removeObserver(interests[i], mediator);
            // remove the mediator from the map
            delete this.mediatorMap[mediatorName];
            //Alert the mediator that it has been removed
            mediator.onRemove();
            return mediator;
        };
        /**
         * Check if a <code>IMediator</code> is registered or not.
         *
         * @param mediatorName
         * 		The <code>IMediator</code> name to check whether it is registered.
         *
         * @return
         *		A <code>Mediator</code> is registered with the given <code>mediatorName</code>.
         */
        View.prototype.hasMediator = function (mediatorName) {
            return this.mediatorMap[mediatorName] != null;
        };
        /**
         * <code>View</code> singleton Factory method.
         *
         * @return
         *		The singleton instance of <code>View</code>.
         */
        View.getInstance = function () {
            if (!View.instance)
                View.instance = new View();
            return View.instance;
        };
        /**
         * @constant
         * @protected
         */
        View.SINGLETON_MSG = "View singleton already constructed!";
        return View;
    }());
    puremvc.View = View;
})(puremvc || (puremvc = {}));
//# sourceMappingURL=View.js.map