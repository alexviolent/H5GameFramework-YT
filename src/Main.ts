// impoter
import Handler = Laya.Handler;
declare var Promise: any;

// main class
class GameMain {
	constructor() {

		//初始化微信小游戏
		Laya.MiniAdpter.init();
		//程序入口
		Laya.init(480, 800);
		Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
		Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
		//设置水平对齐
		Laya.stage.alignH = "center";
		//设置垂直对齐
		Laya.stage.alignV = "middle";

		//激活资源版本控制
		Laya.ResourceVersion.enable("version.json", Handler.create(this, this.beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
	}

	private async beginLoad() {
		ApplicationFacade.I.startup(Laya.stage);
	}

	
}

new GameMain();

