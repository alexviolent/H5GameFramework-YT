/*
 * Created at Sat Aug 03 2019 by clh
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
var core;
(function (core) {
    /*
    * 遍历出laya的ui结构中用到的资源;
    */
    var SkinTraversal = /** @class */ (function () {
        function SkinTraversal() {
        }
        SkinTraversal.listSkins = function (root) {
            var skins = [];
            this.traverseChild(root, skins);
            return skins;
        };
        SkinTraversal.traverseChild = function (root, skins) {
            for (var _i = 0, _a = root.child; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child.props && child.props.skin) {
                    skins.push(child.props.skin);
                }
                if (child.child) {
                    this.traverseChild(child, skins);
                }
            }
        };
        return SkinTraversal;
    }());
    core.SkinTraversal = SkinTraversal;
})(core || (core = {}));
//# sourceMappingURL=SkinTraversal.js.map