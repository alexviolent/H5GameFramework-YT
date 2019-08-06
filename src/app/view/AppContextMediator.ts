/*
* name;
*/
class AppContextMediator extends puremvc.Mediator {
    public static NAME = "AppContextMediator";

    public static scene: DisplayObject;
    public static dialog: DisplayObject;
    public static float: DisplayObject;
    public static topmost: DisplayObject;

    constructor(stage: DisplayObject) {
        super(AppContextMediator.NAME, stage);
    }

    onRegister() {
        let p = <DisplayObject>this.viewComponent;
        AppContextMediator.scene = <DisplayObject>p.addChild(new DisplayObject());
        AppContextMediator.dialog = <DisplayObject>p.addChild(new DisplayObject());
        AppContextMediator.float = <DisplayObject>p.addChild(new DisplayObject());
        AppContextMediator.topmost = <DisplayObject>p.addChild(new DisplayObject());

    }

    onRemove() {
        this.viewComponent.removeSelf();
    }
}