/*
* name;
*/
class BaseProxy<T = any> extends puremvc.Proxy {
    data: T;
}

/**
 * 获取Proxy的装饰器
 * @param proxy 
 */
function Proxy(proxy: any) {
    return (target: any, propertyName: string) => {
        Object.defineProperty(target, propertyName, {
            get: () => {
                return ApplicationFacade.I.retrieveProxy(proxy.NAME);
            }
        });
    }
}