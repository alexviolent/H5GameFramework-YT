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
    var LocalPresenceImpl = /** @class */ (function () {
        function LocalPresenceImpl() {
            this.data = {};
        }
        LocalPresenceImpl.prototype.set = function (key, value) {
            this.data[key] = value;
            try {
                if (typeof value === 'string') {
                    Laya.LocalStorage.setItem(key, value);
                }
                else {
                    Laya.LocalStorage.setJSON(key, value);
                }
            }
            catch (error) {
                console.error(error);
            }
        };
        LocalPresenceImpl.prototype.get = function (key) {
            if (!this.data[key]) {
                var str = Laya.LocalStorage.getItem(key);
                try {
                    var obj = JSON.parse(str);
                    if (obj && typeof obj == 'object') {
                        this.data[key] = obj;
                    }
                    else {
                        this.data[key] = str;
                    }
                }
                catch (error) {
                    this.data[key] = str;
                }
            }
            return this.data[key];
        };
        LocalPresenceImpl.prototype.del = function (key) {
            delete this.data[key];
            Laya.LocalStorage.removeItem(key);
        };
        return LocalPresenceImpl;
    }());
    yt.LocalPresence = new LocalPresenceImpl();
})(yt || (yt = {}));
//# sourceMappingURL=LocalPresence.js.map