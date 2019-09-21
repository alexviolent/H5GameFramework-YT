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
    export enum HttpResponseType {
        text,
        json,
        xml,
        arraybuffer
    }

    export class HttpClient {
        private http: Laya.HttpRequest;
        private options: HttpOptions;
        private headers: Array<any>;

        constructor() {
            this.http = new Laya.HttpRequest();
        }

        public initialize(options: HttpOptions) {
            this.options = options;
            this.options.responseType = options.responseType || HttpResponseType.text;
            this.headers = [];

            if (options.headers) {
                for (let k in options.headers) {
                    this.headers.push(k);
                    this.headers.push(options.headers[k]);
                }
            }
        }

        public async get(data: any) {
            return this.send("get", data);
        }

        public async post(data: any) {
            return this.send("post", data);
        }

        private async send(method: string, data: any) {
            const opt = this.options;
            const responseType = HttpResponseType[opt.responseType];

            return new Promise<string>((resolve, reject) => {
                this.http.once(Laya.Event.COMPLETE, this, err => resolve(this.http.data));
                this.http.once(Laya.Event.ERROR, this, err => reject(err));
                this.http.send(opt.url, data, method, responseType, this.headers);
            });
        }
    }
}