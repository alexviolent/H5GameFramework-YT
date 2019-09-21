/*
* app上下文媒介，这里注册了界面的层级管理和时钟调用;
*/
class AppContextMediator extends puremvc.Mediator {
    public static NAME = "AppContextMediator";

    public static stage: any;
    public static scene: DisplayObject;
    public static dialog: DisplayObject;
    public static float: DisplayObject;
    public static topmost: DisplayObject;

    constructor(stage: DisplayObject) {
        super(AppContextMediator.NAME, stage);
    }

    onRegister() {
        let p = <DisplayObject>this.viewComponent;
        AppContextMediator.stage = p;
        AppContextMediator.scene = <DisplayObject>p.addChild(new DisplayObject());
        AppContextMediator.dialog = <DisplayObject>p.addChild(new DisplayObject());
        AppContextMediator.float = <DisplayObject>p.addChild(new DisplayObject());
        AppContextMediator.topmost = <DisplayObject>p.addChild(new DisplayObject());

        Laya.timer.frameLoop(1, this, this.onFrame);

    }

    onRemove() {
        this.viewComponent.removeSelf();
    }

    onFrame() {
        yt.Ticker.onFrame();
    }
}