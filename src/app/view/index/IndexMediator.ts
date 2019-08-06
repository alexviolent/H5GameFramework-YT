/*
* name;
*/
class IndexMediator extends BaseMediator<IndexContract.IView> implements IndexContract.IDelegate {
    public static NAME = "IndexMediator";

    constructor() {
        super(IndexMediator.NAME, AppContextMediator.scene);
    }

    protected onCreateResourceLoader(): core.BaseResourceLoader {
        return new core.ViewResourceLoader(ui.indexUI.uiView);
    }

    protected onCreateView() {
        return new IndexView(this);
    }

    async onRegister() {
        await super.onRegister();
    }

    onStart() {
        const gameProxy = <GameProxy>this.facade.retrieveProxy(GameProxy.NAME);
        gameProxy.viewCount = 1;
        this.facade.registerMediator(new GameMediator(gameProxy.viewCount));
    }

    onExit() {
        this.facade.registerMediator(ExitConfirmMediator.get());
    }

}
