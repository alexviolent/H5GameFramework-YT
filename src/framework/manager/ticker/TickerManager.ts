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

namespace yt {
	class TickerManager {
		private tickers: FrameTicker[] = [];

		public onFrame() {
			this.tickers.forEach((ticker, index, array) => {
				ticker.onFrame();
				if (ticker.isDisposed) {
					array.splice(index, 1);
					TickerPool.getInstance().reclaim(ticker);
				}
			});
		}

		public timer(interval: number, listener: Function, caller?: any) {
			this.addTicker(this.newTicker(interval, listener, caller));
		}

		public delay(delay: number, listener: Function, caller?: any) {
			this.addTicker(this.newTicker(delay, listener, caller, 1));
		}

		public clear(listener: Function, caller?: any) {
			this.tickers.forEach((ticker, index, array) => {
				if (ticker.listener === listener && ticker.caller === caller) {
					array.splice(index, 1);
					TickerPool.getInstance().reclaim(ticker);
				}
			});
		}

		private newTicker(interval: number, listener: Function, caller?: any, maxTick?: number): FrameTicker {
			let ticker = TickerPool.getInstance().get({ interval: interval, maxTick: maxTick });
			ticker.listener = listener;
			ticker.caller = caller || undefined;
			listener = caller ? listener.bind(caller) : listener;
			ticker.onTick.add((currentTimeSeconds: number, tickDeltaTimeSeconds: number, currentTick: number) => {
				listener();
			});

			return ticker;
		}

		private addTicker(ticker: FrameTicker) {
			ticker.resume();
			this.tickers.push(ticker);
		}
	}

	export const Ticker = new TickerManager();
}