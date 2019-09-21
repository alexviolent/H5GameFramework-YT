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
var yt;
(function (yt) {
    var TickerManager = /** @class */ (function () {
        function TickerManager() {
            this.tickers = [];
        }
        TickerManager.prototype.onFrame = function () {
            this.tickers.forEach(function (ticker, index, array) {
                ticker.onFrame();
                if (ticker.isDisposed) {
                    array.splice(index, 1);
                    yt.TickerPool.getInstance().reclaim(ticker);
                }
            });
        };
        TickerManager.prototype.timer = function (interval, listener, caller) {
            this.addTicker(this.newTicker(interval, listener, caller));
        };
        TickerManager.prototype.delay = function (delay, listener, caller) {
            this.addTicker(this.newTicker(delay, listener, caller, 1));
        };
        TickerManager.prototype.clear = function (listener, caller) {
            this.tickers.forEach(function (ticker, index, array) {
                if (ticker.listener === listener && ticker.caller === caller) {
                    array.splice(index, 1);
                    yt.TickerPool.getInstance().reclaim(ticker);
                }
            });
        };
        TickerManager.prototype.newTicker = function (interval, listener, caller, maxTick) {
            var ticker = yt.TickerPool.getInstance().get({ interval: interval, maxTick: maxTick });
            ticker.listener = listener;
            ticker.caller = caller || undefined;
            listener = caller ? listener.bind(caller) : listener;
            ticker.onTick.add(function (currentTimeSeconds, tickDeltaTimeSeconds, currentTick) {
                listener();
            });
            return ticker;
        };
        TickerManager.prototype.addTicker = function (ticker) {
            ticker.resume();
            this.tickers.push(ticker);
        };
        return TickerManager;
    }());
    yt.Ticker = new TickerManager();
})(yt || (yt = {}));
//# sourceMappingURL=TickerManager.js.map