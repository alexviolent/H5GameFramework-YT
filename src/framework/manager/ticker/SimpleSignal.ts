/**
 * @author zeh fernando
 */
class SimpleSignal<F extends Function> {

	// Properties
	private functions: F[];


	// ================================================================================================================
	// CONSTRUCTOR ----------------------------------------------------------------------------------------------------

	constructor() {
		this.functions = [];
	}


	// ================================================================================================================
	// PUBLIC INTERFACE -----------------------------------------------------------------------------------------------

	public add(func: F): boolean {
		if (this.functions.indexOf(func) === -1) {
			this.functions.push(func);
			return true;
		}
		return false;
	}

	public remove(func: F): boolean {
		const ifr = this.functions.indexOf(func);
		if (ifr > -1) {
			this.functions.splice(ifr, 1);
			return true;
		}
		return false;
	}

	public removeAll(): boolean {
		if (this.functions.length > 0) {
			this.functions.length = 0;
			return true;
		}
		return false;
	}

	public dispatch(...args: any[]): void {
		const functionsDuplicate = this.functions.concat();
		functionsDuplicate.forEach((func) => {
			func.apply(undefined, args);
		});
	}


	// ================================================================================================================
	// ACCESSOR INTERFACE ---------------------------------------------------------------------------------------------

	public get numItems(): number {
		return this.functions.length;
	}
}
