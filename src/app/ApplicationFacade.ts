class ApplicationFacade extends ApplicationFacadeBase {

    public static get I(): ApplicationFacade {
        if (!puremvc.Facade.instance)
            puremvc.Facade.instance = new ApplicationFacade();
        return <ApplicationFacade>puremvc.Facade.instance;
    }

    initializeController() {
        super.initializeController();
        this.registerCommand(ApplicationFacade.STARTUP, StartupCommand);
    }

    public startup(stage: DisplayObject) {
        super.startup(stage);
    }

}
