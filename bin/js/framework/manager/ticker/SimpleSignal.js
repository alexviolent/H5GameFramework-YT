/**
 * @author zeh fernando
 */
var SimpleSignal = /** @class */ (function () {
    // ================================================================================================================
    // CONSTRUCTOR ----------------------------------------------------------------------------------------------------
    function SimpleSignal() {
        this.functions = [];
    }
    // ================================================================================================================
    // PUBLIC INTERFACE -----------------------------------------------------------------------------------------------
    SimpleSignal.prototype.add = function (func) {
        if (this.functions.indexOf(func) === -1) {
            this.functions.push(func);
            return true;
        }
        return false;
    };
    SimpleSignal.prototype.remove = function (func) {
        var ifr = this.functions.indexOf(func);
        if (ifr > -1) {
            this.functions.splice(ifr, 1);
            return true;
        }
        return false;
    };
    SimpleSignal.prototype.removeAll = function () {
        if (this.functions.length > 0) {
            this.functions.length = 0;
            return true;
        }
        return false;
    };
    SimpleSignal.prototype.dispatch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var functionsDuplicate = this.functions.concat();
        functionsDuplicate.forEach(function (func) {
            func.apply(undefined, args);
        });
    };
    Object.defineProperty(SimpleSignal.prototype, "numItems", {
        // ================================================================================================================
        // ACCESSOR INTERFACE ---------------------------------------------------------------------------------------------
        get: function () {
            return this.functions.length;
        },
        enumerable: true,
        configurable: true
    });
    return SimpleSignal;
}());
//# sourceMappingURL=SimpleSignal.js.map