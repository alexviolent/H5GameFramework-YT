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
    var poolId = 0, noop = function () { };
    /**
    * 对象池
    */
    var ObjectPool = /** @class */ (function () {
        function ObjectPool(name, factory, initialize, firstAllocationNumber, allocationNumber) {
            this.name = name;
            this.factoryFunction = factory;
            this.initializeFunction = initialize;
            this.totalInstances = 0;
            this.allocationNumber = allocationNumber;
            this.availableInstances = [];
            this.allocate(firstAllocationNumber);
        }
        /**
         * 创建一个对象池
         * @param {Object} options 选项 (name, factory, initialize, firstAllocationNumber, allocationNumber)
         */
        ObjectPool.create = function (options) {
            poolId++;
            return new ObjectPool(options.name ? options.name + ' (pool #' + poolId + ')' : 'pool #' + poolId, options.factory, options.initialize || noop, options.firstAllocationNumber || 20, options.allocationNumber || 1);
        };
        /**
         * 预先分配指定数量的对象
         */
        ObjectPool.prototype.allocate = function (num) {
            this.totalInstances += num;
            for (var i = 0; i < num; i++) {
                this.availableInstances.push(this.factoryFunction());
            }
            return this;
        };
        /**
         * 获取一个对象并重新初始化
         */
        ObjectPool.prototype.get = function (initializationOptions) {
            var element;
            // 检查是否有足够的实例
            if (this.availableInstances.length < 1) {
                this.allocate(this.allocationNumber);
            }
            element = this.availableInstances.pop();
            this.initializeFunction(element, initializationOptions);
            return element;
        };
        ;
        /**
         * 回收一个对象到池子中
         */
        ObjectPool.prototype.reclaim = function (element) {
            if (this.availableInstances.indexOf(element) === -1) {
                this.availableInstances.push(element);
            }
            return this;
        };
        ;
        /**
         * 清空对象池
         */
        ObjectPool.prototype.clear = function () {
            while (this.availableInstances.length) {
                this.availableInstances.pop();
            }
            this.totalInstances = 0;
            return this;
        };
        ;
        ObjectPool.prototype.toString = function () {
            return this.name + ' : ' + this.totalInstances + ' total instances, ' + this.availableInstances.length + ' available instances';
        };
        ;
        return ObjectPool;
    }());
    yt.ObjectPool = ObjectPool;
})(yt || (yt = {}));
var ObjectFactory = /** @class */ (function () {
    function ObjectFactory() {
    }
    ObjectFactory.create = function (c) {
        return new c();
    };
    return ObjectFactory;
}());
//# sourceMappingURL=ObjectPool.js.map