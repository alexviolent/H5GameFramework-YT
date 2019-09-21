///<reference path='../../../../../org/puremvc/typescript/interfaces/ICommand.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotifier.ts'/>
///<reference path='../../../../../org/puremvc/typescript/interfaces/INotification.ts'/>
///<reference path='../../../../../org/puremvc/typescript/patterns/observer/Notifier.ts'/>
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
var puremvc;
(function (puremvc) {
    "use strict";
    /**
     * A base <code>ICommand</code> implementation that executes other <code>ICommand</code>s.
     *
     * A <code>MacroCommand</code> maintains an list of <code>ICommand</code> constructor references
     * called <i>SubCommand</i>s.
     *
     * When <code>execute</code> is called, the <code>MacroCommand</code> instantiates and calls
     * <code>execute</code> on each of its <i>SubCommands</i> turn. Each <i>SubCommand</i> will be
     * passed a reference to the original <code>INotification</code> that was passed to the
     * <code>MacroCommand</code>'s <code>execute</code> method.
     *
     * Unlike <code>SimpleCommand</code>, your subclass should not override <code>execute</code>,
     * but instead, should override the <code>initializeMacroCommand</code> method, calling
     * <code>addSubCommand</code> once for each <i>SubCommand</i> to be executed.
     */
    var MacroCommand = /** @class */ (function (_super) {
        __extends(MacroCommand, _super);
        /**
         * Constructs a <code>MacroCommand</code> instance.
         *
         * You should not need to define a constructor in your subclasses, instead, override the
         * <code>initializeMacroCommand</code> method.
         *
         * If your subclass does define a constructor, be  sure to call <code>super()</code>.
         */
        function MacroCommand() {
            var _this = _super.call(this) || this;
            /**
             * An array of <code>ICommand</code>s.
             *
             * @protected
             */
            _this.subCommands = null;
            _this.subCommands = new Array();
            _this.initializeMacroCommand();
            return _this;
        }
        /**
         * Initialize the <code>MacroCommand</code>.
         *
         * In your subclass, override this method to  initialize the <code>MacroCommand</code>'s
         * <i>SubCommand</i> list with <code>ICommand</code> class references like this:
         *
         * <pre>
         *		// Initialize MyMacroCommand
         *		initializeMacroCommand():void
         *		{
         *			this.addSubCommand( FirstCommand );
         *			this.addSubCommand( SecondCommand );
         *			this.addSubCommand( ThirdCommand );
         *		}
         * </pre>
         *
         * Note that <i>subCommand</i>s may be any <code>ICommand</code> implementor so
         * <code>MacroCommand</code>s or <code>SimpleCommand</code>s are both acceptable.
         */
        MacroCommand.prototype.initializeMacroCommand = function () {
        };
        /**
         * Add an entry to the <i>subCommands</i> list.
         *
         * The <i>subCommands</i> will be called in First In/First Out (FIFO) order.
         *
         * @param commandClassRef
         *		A reference to the constructor of the <code>ICommand</code>.
         */
        MacroCommand.prototype.addSubCommand = function (commandClassRef) {
            this.subCommands.push(commandClassRef);
        };
        /**
         * Execute this <code>MacroCommand</code>'s <i>SubCommands</i>.
         *
         * The <i>SubCommands</i> will be called in First In/First Out (FIFO)
         * order.
         *
         * @param notification
         *		The <code>INotification</code> object to be passed to each <i>SubCommand</i> of
         *		the list.
         *
         * @final
         */
        MacroCommand.prototype.execute = function (notification) {
            var subCommands = this.subCommands.slice(0);
            var len = this.subCommands.length;
            for (var i = 0; i < len; i++) {
                /*
                 * Typed any here instead of <code>Function</code> ( won't compile if set to Function
                 * because today the compiler consider that <code>Function</code> is not newable and
                 * doesn't have a <code>Class</code> type)
                 */
                var commandClassRef = subCommands[i];
                var commandInstance = new commandClassRef();
                commandInstance.execute(notification);
            }
            this.subCommands.splice(0);
        };
        return MacroCommand;
    }(puremvc.Notifier));
    puremvc.MacroCommand = MacroCommand;
})(puremvc || (puremvc = {}));
//# sourceMappingURL=MacroCommand.js.map