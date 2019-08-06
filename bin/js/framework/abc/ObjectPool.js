var core;
(function (core) {
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
    core.ObjectPool = ObjectPool;
})(core || (core = {}));
var ObjectFactory = /** @class */ (function () {
    function ObjectFactory() {
    }
    ObjectFactory.create = function (c) {
        return new c();
    };
    return ObjectFactory;
}());
//# sourceMappingURL=ObjectPool.js.map