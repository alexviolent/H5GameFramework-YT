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
var IndexView = /** @class */ (function (_super) {
    __extends(IndexView, _super);
    function IndexView(delegate) {
        var _this = _super.call(this) || this;
        _this.delegate = delegate;
        _this.initUI();
        return _this;
    }
    IndexView.prototype.initUI = function () {
        var _this = this;
        this.btnStart.on(Laya.Event.CLICK, this, function () {
            _this.delegate.onStart();
        });
        this.btnExit.on(Laya.Event.CLICK, this, function () {
            _this.delegate.onExit();
        });
    };
    return IndexView;
}(ui.indexUI));
//# sourceMappingURL=IndexView.js.map