class GameProxy extends BaseProxy {
    static NAME = "GameProxy";

    constructor() {
        super(GameProxy.NAME);
    }

    viewCount: number = 0;

}