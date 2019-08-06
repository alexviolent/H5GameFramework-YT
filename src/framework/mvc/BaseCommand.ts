
class BaseSimpleCommand<T = any> extends puremvc.SimpleCommand {

	constructor() { super() }

	protected data: T;

	public execute(notification: puremvc.INotification): void {
		this.data = notification.getBody();
	}

	public static register(facade: puremvc.IFacade) {
		facade.registerCommand((<any>this).NAME, this);
	}

}

class BaseMacroCommand extends puremvc.MacroCommand {
	constructor() { super() }
}