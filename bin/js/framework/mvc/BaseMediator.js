/*
 * Created at Tue Aug 06 2019 by clh
 * Contact <395942144@qq.com>
 *
 * The MIT License (MIT)
 * Copyright (c) 2019 clh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
* view媒介基类;
*/
var BaseMediator = /** @class */ (function (_super) {
    __extends(BaseMediator, _super);
    function BaseMediator(name, viewParent) {
        var _this = _super.call(this, name, null) || this;
        /** 资源是否已经加载过 */
        _this.isResLoaded = false;
        _this.subMediators = [];
        if (viewParent) {
            _this.viewParent = viewParent;
        }
        return _this;
    }
    BaseMediator.prototype.init = function (viewParent) {
        if (viewParent) {
            this.viewParent = viewParent;
        }
        this.subMediators = [];
    };
    /**
     * 获取实例，不必每次使用都new一次，
     * 不再使用此类对象，需要调用free的来回收
     */
    BaseMediator.get = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this;
        if (!self.instance) {
            self.instance = new (this.bind.apply(this, [void 0].concat(args)))();
            (_a = self.instance).init.apply(_a, args);
        }
        else {
            (_b = self.instance).init.apply(_b, args);
        }
        return self.instance;
    };
    /**
     * 释放实例
     */
    BaseMediator.free = function () {
        var self = this;
        if (self.instance) {
            self.instance = undefined;
        }
    };
    BaseMediator.prototype.onRegister = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.isResLoaded) return [3 /*break*/, 3];
                        loader = this.onCreateResourceLoader();
                        if (!loader) return [3 /*break*/, 2];
                        this.facade.registerMediator(LoadingMediator.get());
                        loader.setOnProgressListener(LoadingMediator.get());
                        return [4 /*yield*/, loader.startLoading()];
                    case 1:
                        _a.sent();
                        this.facade.removeMediator(LoadingMediator.NAME);
                        _a.label = 2;
                    case 2:
                        this.isResLoaded = true;
                        _a.label = 3;
                    case 3:
                        // 创建view实例
                        if (!this.viewComponent) {
                            this.viewComponent = this.onCreateView();
                        }
                        // 添加到view父节点
                        if (this.viewComponent && this.viewParent) {
                            this.viewParent.addChild(this.viewComponent);
                        }
                        this.facade.sendNotification(BaseMediator.REGISTER, this.getMediatorName());
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseMediator.prototype.onRemove = function () {
        // 移除子节点
        for (var _i = 0, _a = this.subMediators; _i < _a.length; _i++) {
            var mediator = _a[_i];
            this.facade.removeMediator(mediator.getMediatorName());
        }
        this.subMediators = [];
        // 移除view
        this.viewParent.removeChild(this.viewComponent);
        this.viewComponent = undefined;
        this.facade.sendNotification(BaseMediator.REMOVE, this.getMediatorName());
    };
    /** 初始化界面内的子节点 */
    BaseMediator.prototype.initializeSubMediator = function () {
    };
    /** 添加界面内的子节点 */
    BaseMediator.prototype.addSubMediator = function (mediator) {
        this.facade.registerMediator(mediator);
        this.subMediators.push(mediator);
    };
    BaseMediator.prototype.listNotificationInterests = function () {
        return [];
    };
    BaseMediator.prototype.handleNotification = function (note) {
    };
    BaseMediator.REGISTER = "app_notify_registerMediator";
    BaseMediator.REMOVE = "app_notify_removeMediator";
    return BaseMediator;
}(puremvc.Mediator));
/**
 * 获取Mediator的装饰器
 * @param mediator
 */
function Mediator(mediator) {
    return function (target, propertyName) {
        Object.defineProperty(target, propertyName, {
            get: function () {
                return ApplicationFacade.I.retrieveMediator(mediator.NAME);
            }
        });
    };
}
//# sourceMappingURL=BaseMediator.js.map