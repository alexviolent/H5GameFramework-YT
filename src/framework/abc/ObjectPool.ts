
namespace core {

	var poolId = 0,
		noop = function () { };
	/**
	* 对象池 
	*/
	export class ObjectPool {
		/** 对象池名称 */
		private name: string;
		/** 创建对象的工厂函数 */
		private factoryFunction: Function;
		/** 对象初始化函数 */
		private initializeFunction: Function;
		/** 首次分配对象数量 */
		private firstAllocationNumber: number;
		/** 每次分配数量 */
		private allocationNumber: number;
		/** 全部实例数量 */
		private totalInstances: number;
		/** 可用实例数组 */
		availableInstances: any[];

		constructor(name: string, factory: Function, initialize?: Function, firstAllocationNumber?: number, allocationNumber?: number) {
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
		public static create(options) {
			poolId++;

			return new ObjectPool(
				options.name ? options.name + ' (pool #' + poolId + ')' : 'pool #' + poolId,
				options.factory,
				options.initialize || noop,
				options.firstAllocationNumber || 20,
				options.allocationNumber || 1
			);
		}

		/**
		 * 预先分配指定数量的对象
		 */
		private allocate(num: number) {
			this.totalInstances += num;

			for (let i = 0; i < num; i++) {
				this.availableInstances.push(this.factoryFunction());
			}

			return this;
		}

		/**
		 * 获取一个对象并重新初始化
		 */
		public get(initializationOptions?) {
			let element;

			// 检查是否有足够的实例
			if (this.availableInstances.length < 1) {
				this.allocate(this.allocationNumber);
			}

			element = this.availableInstances.pop();

			this.initializeFunction(element, initializationOptions);

			return element;
		};

		/**
		 * 回收一个对象到池子中
		 */
		public reclaim(element) {
			if (this.availableInstances.indexOf(element) === -1) {
				this.availableInstances.push(element);
			}

			return this;
		};

		/**
		 * 清空对象池
		 */
		public clear() {
			while (this.availableInstances.length) {
				this.availableInstances.pop();
			}

			this.totalInstances = 0;

			return this;
		};

		public toString() {
			return this.name + ' : ' + this.totalInstances + ' total instances, ' + this.availableInstances.length + ' available instances';
		};
	}
}

class ObjectFactory {
	static create<T>(c: { new(): T; }): T {
		return new c();
	}
}