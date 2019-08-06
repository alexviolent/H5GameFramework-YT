/*
* name;
*/
class GameMediator extends BaseMediator<ui.gameUI> {
    public static NAME = "GameMediator";

    constructor(viewIndex: number) {
        super(GameMediator.NAME + viewIndex, AppContextMediator.scene);
    }

    protected onCreateResourceLoader(): core.BaseResourceLoader {
        return new core.ViewResourceLoader(ui.gameUI.uiView);
    }

    protected onCreateView() {
        return new ui.gameUI;
    }

    async onRegister() {
        await super.onRegister();
        this.initUI();
    }

    private initUI() {
        const gameProxy = <GameProxy>this.facade.retrieveProxy(GameProxy.NAME);
        const view = this.viewComponent;

        view.btnBack.on(Laya.Event.CLICK, this, () => {

            if (gameProxy.viewCount > 0) {
                this.facade.removeMediator(GameMediator.NAME + gameProxy.viewCount);
                gameProxy.viewCount--;
            }
        });

        view.btnLevel.on(Laya.Event.CLICK, this, () => {
            gameProxy.viewCount++;
            this.facade.registerMediator(new GameMediator(gameProxy.viewCount));
        });

        view.lblTitle.text = `界面${gameProxy.viewCount}`;

    }

}
