/*
* 应用定义;
*/
namespace appdf {
    /** 网络消息数据 */
    export interface INetMessageData {
        opcode: number,
        msg: any
    }
}

/**
 * 网络消息监听的修饰器
 * @param messageType 
 */
function MessageHandler(messageType: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target._handlers) {
            target._handlers = {};
        }
        target._handlers[messageType] = target[propertyKey];
    };
}

/**
 * 让view具有delegate属性
 */
function UseDelegate<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        delegate = arguments[0];
    }
}

/** 游戏显示对象
 * 不同游戏引擎可以定义为不同类型，如Laya.Sprite, egret.DisplayObject
 */
class DisplayObject extends Laya.Sprite { };

/**
 * 
 */
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}