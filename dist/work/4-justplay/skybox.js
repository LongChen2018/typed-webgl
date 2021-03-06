// ==================================
// 天空盒实现
// by z0gSh1u
// ==================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../framework/WebGLUtils"], function (require, exports, WebGLUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SkyBoxVBuffer;
    var SkyBoxTBuffer;
    /**
     * 初始化天空盒，发送相关信息
     */
    function initSkyBox(helper, skyBoxProgram) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        SkyBoxVBuffer = helper.createBuffer();
                        SkyBoxTBuffer = helper.createBuffer();
                        helper.switchProgram(skyBoxProgram);
                        _b = (_a = helper).sendTextureImageToGPU;
                        return [4 /*yield*/, WebGLUtils_1.loadImageAsync([
                                './model/texture/SkyBox/back.png',
                                './model/texture/SkyBox/left.png',
                                './model/texture/SkyBox/right.png',
                                './model/texture/SkyBox/up.png',
                                './model/texture/SkyBox/down.png',
                            ])];
                    case 1:
                        _b.apply(_a, [_c.sent(), 0, 5]); // 0~4 texture
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.initSkyBox = initSkyBox;
    /**
     * 渲染天空盒
     */
    function renderSkyBox(helper, lookAt, perspectiveMat, skyBoxProgram) {
        helper.switchProgram(skyBoxProgram);
        var gl = helper.glContext;
        Object.keys(faceCoords).forEach(function (key, i) {
            helper.prepare({
                attributes: [
                    { buffer: SkyBoxVBuffer, data: flatten(faceCoords[key]), varName: 'aPosition', attrPer: 3, type: gl.FLOAT },
                    { buffer: SkyBoxTBuffer, data: flatten(texCoords), varName: 'aTexCoord', attrPer: 2, type: gl.FLOAT }
                ],
                uniforms: [
                    { varName: 'uTexture', data: i, method: '1i' },
                    { varName: 'uPerspectiveMatrix', data: flatten(perspectiveMat), method: 'Matrix4fv' },
                    { varName: 'uWorldMatrix', data: flatten(lookAt), method: 'Matrix4fv' }
                ]
            });
            helper.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        });
    }
    exports.renderSkyBox = renderSkyBox;
    // 天空盒贴片位置、材质坐标等常量
    var texCoords = [
        [0.0, 0.0], [1.0, 0.0],
        [1.0, 1.0], [0.0, 1.0]
    ];
    var n = 1.0;
    var faceCoords = {
        // front做纹理场，请参考textureField.ts
        back: [
            [-n, -n, -1.0], [n, -n, -1.0],
            [n, n, -1.0], [-n, n, -1.0]
        ],
        left: [
            [-1.0, -n, -n], [-1.0, n, -n],
            [-1.0, n, n], [-1.0, -n, n]
        ],
        right: [
            [1.0, -n, -n], [1.0, n, -n],
            [1.0, n, n], [1.0, -n, n]
        ],
        up: [
            [-n, 1.0, -n], [n, 1.0, -n],
            [n, 1.0, n], [-n, 1.0, n]
        ],
        down: [
            [-n, -1.0, -n], [n, -1.0, -n],
            [n, -1.0, n], [-n, -1.0, n]
        ]
    };
});
