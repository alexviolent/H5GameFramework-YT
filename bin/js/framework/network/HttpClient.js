/*
 * Created at Sat Aug 03 2019 by clh
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
var yt;
(function (yt) {
    var HttpResponseType;
    (function (HttpResponseType) {
        HttpResponseType[HttpResponseType["text"] = 0] = "text";
        HttpResponseType[HttpResponseType["json"] = 1] = "json";
        HttpResponseType[HttpResponseType["xml"] = 2] = "xml";
        HttpResponseType[HttpResponseType["arraybuffer"] = 3] = "arraybuffer";
    })(HttpResponseType = yt.HttpResponseType || (yt.HttpResponseType = {}));
    var HttpClient = /** @class */ (function () {
        function HttpClient() {
            this.http = new Laya.HttpRequest();
        }
        HttpClient.prototype.initialize = function (options) {
            this.options = options;
            this.options.responseType = options.responseType || HttpResponseType.text;
            this.headers = [];
            if (options.headers) {
                for (var k in options.headers) {
                    this.headers.push(k);
                    this.headers.push(options.headers[k]);
                }
            }
        };
        HttpClient.prototype.get = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.send("get", data)];
                });
            });
        };
        HttpClient.prototype.post = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.send("post", data)];
                });
            });
        };
        HttpClient.prototype.send = function (method, data) {
            return __awaiter(this, void 0, void 0, function () {
                var opt, responseType;
                var _this = this;
                return __generator(this, function (_a) {
                    opt = this.options;
                    responseType = HttpResponseType[opt.responseType];
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.http.once(Laya.Event.COMPLETE, _this, function (err) { return resolve(_this.http.data); });
                            _this.http.once(Laya.Event.ERROR, _this, function (err) { return reject(err); });
                            _this.http.send(opt.url, data, method, responseType, _this.headers);
                        })];
                });
            });
        };
        return HttpClient;
    }());
    yt.HttpClient = HttpClient;
})(yt || (yt = {}));
//# sourceMappingURL=HttpClient.js.map