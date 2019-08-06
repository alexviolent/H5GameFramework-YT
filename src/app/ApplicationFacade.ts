class ApplicationFacade extends puremvc.Facade implements puremvc.IFacade {
    public static STARTUP: string = "STARTUP";


    public static get I(): ApplicationFacade {
        if (!puremvc.Facade.instance)
            puremvc.Facade.instance = new ApplicationFacade();
        return <ApplicationFacade>puremvc.Facade.instance;
    }

    initializeController() {
        super.initializeController();
        this.registerCommand(ApplicationFacade.STARTUP, StartupCommand);
    }

    /**
     * 启动
     */
    public startup(stage: DisplayObject) {
        this.sendNotification(ApplicationFacade.STARTUP, stage);
        this.removeCommand(ApplicationFacade.STARTUP);
    }

}
