# H5GameFramework-YT 倚天
Laya的PureMVC框架
# 前言
曹操有宝剑二口:一名“倚天”,一名“青釭”。
# PureMVC
Pure MVC是在基于模型、视图和控制器MVC模式建立的一个轻量级的应用框架，这种开源框架是免费的，它最初是执行的ActionScript 3语言使用的Adobe Flex、Flash和AIR，现在已经移植到几乎所有主要的发展平台，目前支持两个版本框架：标准和多核，总之，标准版提供了一种简单的编码分离的方法，按照MVC设计概念。
# 框架
框架封装了基本的mvc基类，封装了界面资源的自动加载，使用模板方法，开发者可以很方便的定制自己的资源加载方法。
# 使用
开箱即用，demo有简单的界面弹窗和切换。
# 指导思想
MVC的思想基本上是逻辑和视图分离，这里的Controller也就是Command可以弱化到只要一个初始化命令，其他的业务逻辑都可以塞入Mediator，Proxy就只管保存数据。

而在Mediator和View之间加一个Contract即可实现MVP模式，Mediator对应Presenter。
========================


