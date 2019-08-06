/*
* name;
*/
class ExitConfirmMediator extends BaseMediator<ui.popupUI> {
    public static NAME = "ExitConfirmMediator";

    constructor() {
        super(ExitConfirmMediator.NAME, AppContextMediator.dialog);
    }

    protected onCreateResourceLoader(): core.BaseResourceLoader {
        return new core.ViewResourceLoader(ui.popupUI.uiView);
    }

    protected onCreateView() {
        return new ui.popupUI;
    }

    async onRegister() {
        await super.onRegister();
        this.initUI();
    }

    private initUI() {
        const view = this.viewComponent;

        view.btnClose.on(Laya.Event.CLICK, this, () => {
            this.facade.removeMediator(this.mediatorName);
        });

    }

}
