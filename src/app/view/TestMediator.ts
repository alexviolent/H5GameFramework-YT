/*
* name;
*/
class TestMediator extends BaseMediator<TestUI> {
    public static NAME = "TestMediator";

    constructor() {
        super(TestMediator.NAME, AppContextMediator.scene);
    }

    protected onCreateResourceLoader(): yt.BaseResourceLoader {
        return new yt.FileResourceLoader("res/atlas/comp.atlas");
    }

    protected onCreateView() {
        return new TestUI;
    }

    async onRegister() {
        await super.onRegister();
        this.initUI();
    }

    private initUI() {
        const view = this.viewComponent;

    }
}
