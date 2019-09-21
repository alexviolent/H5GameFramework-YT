/*
 * Created at Tue Aug 06 2019 by clh
 * Contact <395942144@qq.com>
 *
 * The MIT License (MIT)
 * Copyright (c) 2019 clh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
* view媒介基类;
*/
abstract class BaseMediator<T = any> extends puremvc.Mediator {
    public static REGISTER = "app_notify_registerMediator";
    public static REMOVE = "app_notify_removeMediator";

    viewParent: DisplayObject;
    viewComponent: T;
    /** 一个界面内的子节点 */
    protected subMediators: BaseMediator[];
    /** 资源是否已经加载过 */
    private isResLoaded: boolean = false;

    constructor(name: string, viewParent: DisplayObject) {
        super(name, null);
        this.subMediators = [];
        
        if (viewParent) {
            this.viewParent = viewParent;
        }
    }

    public init(viewParent: DisplayObject) {
        if (viewParent) {
            this.viewParent = viewParent;
        }
        this.subMediators = [];
    }

    // 子类必须实现该方法，返回资源加载器
    protected abstract onCreateResourceLoader(): yt.BaseResourceLoader;

    // 子类必须实现该方法，返回创建的view实例
    protected abstract onCreateView(): T;

    /**
     * 获取实例，不必每次使用都new一次，
     * 不再使用此类对象，需要调用free的来回收
     */
    static get<T extends {}>(this: new (...args) => T, ...args): T {
        let self = <any>this;
        if (!self.instance) {
            self.instance = new this(...args);
            self.instance.init(...args);
        } else {
            self.instance.init(...args);
        }
        return self.instance;
    }

    /**
     * 释放实例
     */
    static free<T extends {}>(this: new () => T) {
        let self = <any>this;
        if (self.instance) {
            self.instance = undefined;
        }
    }

    async onRegister() {
        // 加载资源
        if (!this.isResLoaded) {
            let loader = this.onCreateResourceLoader();
            if (loader) {
                this.facade.registerMediator(LoadingMediator.get());
                loader.setOnProgressListener(LoadingMediator.get());
                await loader.startLoading();
                this.facade.removeMediator(LoadingMediator.NAME);
            }
            this.isResLoaded = true;
        }

        // 创建view实例
        if (!this.viewComponent) {
            this.viewComponent = this.onCreateView();
        }

        // 添加到view父节点
        if (this.viewComponent && this.viewParent) {
            this.viewParent.addChild(<any>this.viewComponent);
        }

        this.facade.sendNotification(BaseMediator.REGISTER, this.getMediatorName());
    }

    onRemove() {
        // 移除子节点
        for (let mediator of this.subMediators) {
            this.facade.removeMediator(mediator.getMediatorName());
        }
        this.subMediators = [];

        // 移除view
        this.viewParent.removeChild(<any>this.viewComponent);
        this.viewComponent = undefined;

        this.facade.sendNotification(BaseMediator.REMOVE, this.getMediatorName());
    }

    /** 初始化界面内的子节点 */
    protected initializeSubMediator() {
    }

    /** 添加界面内的子节点 */
    protected addSubMediator(mediator: BaseMediator) {
        this.facade.registerMediator(mediator);
        this.subMediators.push(mediator);
    }

    listNotificationInterests(): string[] {
        return [
        ];
    }

    handleNotification(note: puremvc.INotification) {

    }
}

/**
 * 获取Mediator的装饰器
 * @param mediator 
 */
function Mediator(mediator: any) {
    return (target: any, propertyName: string) => {
        Object.defineProperty(target, propertyName, {
            get: () => {
                return ApplicationFacade.I.retrieveMediator(mediator.NAME);
            }
        });
    }
}