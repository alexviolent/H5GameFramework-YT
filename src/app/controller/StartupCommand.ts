/*
* name;
*/
class StartupCommand extends BaseMacroCommand {

    public initializeMacroCommand(): void {
        super.initializeMacroCommand();
    }

    public execute(note: puremvc.INotification): void {
        super.execute(note);
        this.facade.registerProxy(new GameProxy());
        this.facade.registerMediator(TestMediator.get());
    }
}