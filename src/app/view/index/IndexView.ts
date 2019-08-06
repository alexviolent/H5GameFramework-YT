/*
* name;
*/
class IndexView extends ui.indexUI implements IndexContract.IView {
    private delegate: IndexContract.IDelegate;

    constructor(delegate: IndexContract.IDelegate) {
        super();
        this.delegate = delegate;
        this.initUI();
    }

    private initUI() {
        this.btnStart.on(Laya.Event.CLICK, this, () => {
            this.delegate.onStart();
        });

        this.btnExit.on(Laya.Event.CLICK, this, () => {
            this.delegate.onExit();
        });
    }
}