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
var yt;
(function (yt) {
    /**
     * http请求池
     */
    var HttpClientPool = /** @class */ (function (_super) {
        __extends(HttpClientPool, _super);
        function HttpClientPool() {
            var _this = _super.call(this) || this;
            _this.pool = yt.ObjectPool.create({
                name: "HttpClientPool",
                firstAllocationNumber: 1,
                factory: _this.createHttpClient.bind(_this),
                initialize: _this.initHttpClient.bind(_this)
            });
            return _this;
        }
        HttpClientPool.prototype.createHttpClient = function () {
            return new yt.HttpClient();
        };
        HttpClientPool.prototype.initHttpClient = function (client, options) {
            client.initialize(options);
        };
        HttpClientPool.get = function (options) {
            return HttpClientPool.getInstance().pool.get(options);
        };
        HttpClientPool.reclaim = function (client) {
            HttpClientPool.getInstance().pool.reclaim(client);
        };
        return HttpClientPool;
    }(Singleton));
    yt.HttpClientPool = HttpClientPool;
})(yt || (yt = {}));
//# sourceMappingURL=HttpClientPool.js.map