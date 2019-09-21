/**
 * app门面基类，必须调用startup来注册app上下文媒介
 */
class ApplicationFacadeBase extends puremvc.Facade implements puremvc.IFacade {
    public static STARTUP: string = "STARTUP";

    public static get I(): ApplicationFacadeBase {
        if (!puremvc.Facade.instance)
            puremvc.Facade.instance = new ApplicationFacadeBase();
        return <ApplicationFacadeBase>puremvc.Facade.instance;
    }

    /**
     * 启动
     */
    public startup(stage: DisplayObject) {
        this.registerMediator(new AppContextMediator(stage));

        this.sendNotification(ApplicationFacade.STARTUP);
        this.removeCommand(ApplicationFacade.STARTUP);
    }

}
