/*
* name;
*/
class LoadingMediator extends BaseMediator implements yt.IProgressListener {
    public static NAME = "LoadingMediator";

    constructor() {
        super(LoadingMediator.NAME, AppContextMediator.topmost);
    }

    protected onCreateResourceLoader(): yt.BaseResourceLoader {
        return null;
    }

    protected onCreateView() {
        return null;
    }

    onProgress(value: number) {
        console.log(`onProgress: ${value}`);
    }

    async onRegister() {
        await super.onRegister();
    }
}
