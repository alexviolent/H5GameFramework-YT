/*
 * Created at Sun Aug 04 2019 by clh
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

module yt {
	export class GroupResourceLoader extends BaseResourceLoader implements IProgressListener {
		private loaders: BaseResourceLoader[];
		/** 百分比比例 */
		private ratio: number;
		/** 当前总进度 */
		private totalProgress: number;
		/** 当前加载序号 */
		private curLoaderIndex: number;

		constructor(loaders: BaseResourceLoader[], listener?: IProgressListener) {
			super(listener);
			this.loaders = loaders;
			this.ratio = 1 / loaders.length;

			for (let loader of loaders) {
				loader.setOnProgressListener(this);
			}
		}

		public async startLoading() {
			this.totalProgress = 0;
			this.curLoaderIndex = 0;
			for (let loader of this.loaders) {
				await loader.startLoading();
				this.totalProgress += this.ratio;
				this.curLoaderIndex++;
			}
		}

		onProgress(value: number) {
			this.onProgressListener.onProgress(this.totalProgress + value * this.ratio);
		}
	}
}