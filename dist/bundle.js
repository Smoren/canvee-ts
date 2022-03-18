/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas/drawer.ts":
/*!******************************!*\
  !*** ./src/canvas/drawer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Drawer = /** @class */ (function () {
    function Drawer(_a) {
        var domElement = _a.domElement, viewConfig = _a.viewConfig, storage = _a.storage;
        this._domElement = domElement;
        this._viewConfig = viewConfig;
        this._storage = storage;
        this._context = domElement.getContext('2d');
        this._resizeObserver = this._initResizeObserver();
        this.refresh();
    }
    Drawer.prototype.draw = function () {
        var _this = this;
        this._storage.list.forEach(function (item) { return item.draw(_this); });
    };
    Drawer.prototype.refresh = function () {
        if (this._domElement.width !== this.width) {
            this._domElement.width = this.width;
        }
        if (this._domElement.height !== this.height) {
            this._domElement.height = this.height;
        }
        this.draw();
    };
    Object.defineProperty(Drawer.prototype, "viewConfig", {
        get: function () {
            return this._viewConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawer.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawer.prototype, "width", {
        get: function () {
            return this._domElement.clientWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawer.prototype, "height", {
        get: function () {
            return this._domElement.clientHeight;
        },
        enumerable: false,
        configurable: true
    });
    Drawer.prototype._initResizeObserver = function () {
        var _this = this;
        var observer = new ResizeObserver(function () { return _this.refresh(); });
        observer.observe(this._domElement);
        return observer;
    };
    return Drawer;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawer);


/***/ }),

/***/ "./src/canvas/figures/rect.ts":
/*!************************************!*\
  !*** ./src/canvas/figures/rect.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/drawable */ "./src/canvas/structs/drawable.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(config, data) {
        if (data === void 0) { data = null; }
        return _super.call(this, config, data) || this;
    }
    Rect.prototype.draw = function (drawer) {
        var _a, _b;
        drawer.context.beginPath();
        drawer.context.strokeStyle = this.config.strokeStyle;
        drawer.context.fillStyle = this.config.fillStyle;
        drawer.context.lineWidth = this.config.lineWidth;
        (_a = drawer.context).fillRect.apply(_a, __spreadArray(__spreadArray([], this.config.position, false), this.config.size, false));
        (_b = drawer.context).strokeRect.apply(_b, __spreadArray(__spreadArray([], this.config.position, false), this.config.size, false));
        drawer.context.closePath();
    };
    return Rect;
}(_structs_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rect);


/***/ }),

/***/ "./src/canvas/structs/drawable-storage.ts":
/*!************************************************!*\
  !*** ./src/canvas/structs/drawable-storage.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var DrawableStorage = /** @class */ (function () {
    function DrawableStorage(list) {
        this._list = list;
        this._sort();
    }
    Object.defineProperty(DrawableStorage.prototype, "list", {
        get: function () {
            return this._list;
        },
        enumerable: false,
        configurable: true
    });
    DrawableStorage.prototype.add = function (item) {
        this._list.push(item);
        this._sort();
    };
    DrawableStorage.prototype._sort = function () {
        this._list.sort(function (lhs, rhs) { return lhs.config.zIndex - rhs.config.zIndex; });
    };
    return DrawableStorage;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawableStorage);


/***/ }),

/***/ "./src/canvas/structs/drawable.ts":
/*!****************************************!*\
  !*** ./src/canvas/structs/drawable.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Drawable = /** @class */ (function () {
    function Drawable(config, data) {
        if (data === void 0) { data = null; }
        this.config = config;
        this.data = data;
    }
    return Drawable;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawable);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas_drawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas/drawer */ "./src/canvas/drawer.ts");
/* harmony import */ var _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas/figures/rect */ "./src/canvas/figures/rect.ts");
/* harmony import */ var _canvas_structs_drawable_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas/structs/drawable-storage */ "./src/canvas/structs/drawable-storage.ts");



var storage = new _canvas_structs_drawable_storage__WEBPACK_IMPORTED_MODULE_2__["default"]([]);
storage.add(new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"]({
    position: [10, 20],
    size: [100, 30],
    zIndex: 1,
    fillStyle: 'green',
    strokeStyle: 'black',
    lineWidth: 3,
}));
var viewConfig = {
    scale: 1,
    offset: [0, 0],
};
var drawer = new _canvas_drawer__WEBPACK_IMPORTED_MODULE_0__["default"]({
    domElement: document.getElementById('canvas'),
    viewConfig: viewConfig,
    storage: storage,
});
drawer.draw();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bkIsQ0FBQztJQUdILGVBQUM7QUFBRCxDQUFDOzs7Ozs7OztVQ1pEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNJO0FBQ3VCO0FBR2hFLElBQU0sT0FBTyxHQUFHLElBQUksd0VBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksNERBQUksQ0FBQztJQUNuQixRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2xCLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDZixNQUFNLEVBQUUsQ0FBQztJQUNULFNBQVMsRUFBRSxPQUFPO0lBQ2xCLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLFNBQVMsRUFBRSxDQUFDO0NBQ2IsQ0FBQyxDQUFDLENBQUM7QUFFSixJQUFNLFVBQVUsR0FBd0I7SUFDdEMsS0FBSyxFQUFFLENBQUM7SUFDUixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQ2YsQ0FBQztBQUVGLElBQU0sTUFBTSxHQUFXLElBQUksc0RBQU0sQ0FBQztJQUNoQyxVQUFVLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQXNCO0lBQ2xFLFVBQVU7SUFDVixPQUFPO0NBQ1IsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvZHJhd2VyLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL2ZpZ3VyZXMvcmVjdC50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLCBEcmF3ZXJDb25maWdJbnRlcmZhY2UsIERyYXdlckludGVyZmFjZSwgVmlld0NvbmZpZ0ludGVyZmFjZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNsYXNzIERyYXdlciBpbXBsZW1lbnRzIERyYXdlckludGVyZmFjZSB7XG4gIHByb3RlY3RlZCBfZG9tRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByb3RlY3RlZCBfdmlld0NvbmZpZzogVmlld0NvbmZpZ0ludGVyZmFjZTtcbiAgcHJvdGVjdGVkIF9zdG9yYWdlOiBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2U7XG4gIHByb3RlY3RlZCBfY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcm90ZWN0ZWQgX3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgZG9tRWxlbWVudCxcbiAgICB2aWV3Q29uZmlnLFxuICAgIHN0b3JhZ2VcbiAgfTogRHJhd2VyQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5fdmlld0NvbmZpZyA9IHZpZXdDb25maWc7XG4gICAgdGhpcy5fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgdGhpcy5fY29udGV4dCA9IGRvbUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlciA9IHRoaXMuX2luaXRSZXNpemVPYnNlcnZlcigpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcHVibGljIGRyYXcoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmFnZS5saXN0LmZvckVhY2goaXRlbSA9PiBpdGVtLmRyYXcodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2goKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RvbUVsZW1lbnQud2lkdGggIT09IHRoaXMud2lkdGgpIHtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQud2lkdGggPSB0aGlzLndpZHRoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kb21FbGVtZW50LmhlaWdodCAhPT0gdGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICBnZXQgdmlld0NvbmZpZygpOiBWaWV3Q29uZmlnSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0NvbmZpZztcbiAgfVxuXG4gIGdldCBjb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gIH1cblxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2luaXRSZXNpemVPYnNlcnZlcigpOiBSZXNpemVPYnNlcnZlciB7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy5fZG9tRWxlbWVudCk7XG5cbiAgICByZXR1cm4gb2JzZXJ2ZXI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJhd2VyO1xuIiwiaW1wb3J0IHtcbiAgTGlua2VkRGF0YVR5cGUsXG4gIFZlY3RvckFycmF5VHlwZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSxcbiAgQmFzaWNGaWd1cmVEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgRHJhd2FibGUgZnJvbSBcIi4uL3N0cnVjdHMvZHJhd2FibGVcIjtcblxuaW50ZXJmYWNlIFJlY3RDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBCYXNpY0ZpZ3VyZURyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgcG9zaXRpb246IFZlY3RvckFycmF5VHlwZTtcbiAgc2l6ZTogVmVjdG9yQXJyYXlUeXBlO1xufVxuXG5jbGFzcyBSZWN0IGV4dGVuZHMgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUludGVyZmFjZSB7XG4gIGNvbmZpZzogUmVjdENvbmZpZ0ludGVyZmFjZTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IFJlY3RDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlIHwgbnVsbCA9IG51bGwpIHtcbiAgICBzdXBlcihjb25maWcsIGRhdGEpO1xuICB9XG5cbiAgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5jb25maWcuc3Ryb2tlU3R5bGU7XG4gICAgZHJhd2VyLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb25maWcuZmlsbFN0eWxlO1xuICAgIGRyYXdlci5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuY29uZmlnLmxpbmVXaWR0aDtcbiAgICBkcmF3ZXIuY29udGV4dC5maWxsUmVjdCguLi50aGlzLmNvbmZpZy5wb3NpdGlvbiwgLi4udGhpcy5jb25maWcuc2l6ZSk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlUmVjdCguLi50aGlzLmNvbmZpZy5wb3NpdGlvbiwgLi4udGhpcy5jb25maWcuc2l6ZSk7XG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVjdDtcbmV4cG9ydCB7IFJlY3RDb25maWdJbnRlcmZhY2UgfTtcbiIsImltcG9ydCB7IERyYXdhYmxlSW50ZXJmYWNlLCBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2FibGVTdG9yYWdlIGltcGxlbWVudHMgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlIHtcbiAgcHJvdGVjdGVkIF9saXN0OiBEcmF3YWJsZUludGVyZmFjZVtdO1xuXG4gIGNvbnN0cnVjdG9yKGxpc3Q6IERyYXdhYmxlSW50ZXJmYWNlW10pIHtcbiAgICB0aGlzLl9saXN0ID0gbGlzdDtcbiAgICB0aGlzLl9zb3J0KCk7XG4gIH1cblxuICBnZXQgbGlzdCgpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIHB1YmxpYyBhZGQoaXRlbTogRHJhd2FibGVJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0LnB1c2goaXRlbSk7XG4gICAgdGhpcy5fc29ydCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9zb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuX2xpc3Quc29ydCgobGhzLCByaHMpID0+IGxocy5jb25maWcuekluZGV4IC0gcmhzLmNvbmZpZy56SW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCYXNlRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIERyYXdhYmxlSW50ZXJmYWNlLCBEcmF3ZXJJbnRlcmZhY2UsIExpbmtlZERhdGFUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVJbnRlcmZhY2Uge1xuICBjb25maWc6IEJhc2VEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZTtcbiAgZGF0YTogTGlua2VkRGF0YVR5cGU7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGNvbmZpZzogQmFzZURyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSB8IG51bGwgPSBudWxsKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGFic3RyYWN0IGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRHJhd2VyIGZyb20gXCIuL2NhbnZhcy9kcmF3ZXJcIjtcbmltcG9ydCBSZWN0IGZyb20gXCIuL2NhbnZhcy9maWd1cmVzL3JlY3RcIjtcbmltcG9ydCBEcmF3YWJsZVN0b3JhZ2UgZnJvbSBcIi4vY2FudmFzL3N0cnVjdHMvZHJhd2FibGUtc3RvcmFnZVwiO1xuaW1wb3J0IHsgVmlld0NvbmZpZ0ludGVyZmFjZSB9IGZyb20gXCIuL2NhbnZhcy90eXBlc1wiO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IERyYXdhYmxlU3RvcmFnZShbXSk7XG5zdG9yYWdlLmFkZChuZXcgUmVjdCh7XG4gIHBvc2l0aW9uOiBbMTAsIDIwXSxcbiAgc2l6ZTogWzEwMCwgMzBdLFxuICB6SW5kZXg6IDEsXG4gIGZpbGxTdHlsZTogJ2dyZWVuJyxcbiAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gIGxpbmVXaWR0aDogMyxcbn0pKTtcblxuY29uc3Qgdmlld0NvbmZpZzogVmlld0NvbmZpZ0ludGVyZmFjZSA9IHtcbiAgc2NhbGU6IDEsXG4gIG9mZnNldDogWzAsIDBdLFxufTtcblxuY29uc3QgZHJhd2VyOiBEcmF3ZXIgPSBuZXcgRHJhd2VyKHtcbiAgZG9tRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50LFxuICB2aWV3Q29uZmlnLFxuICBzdG9yYWdlLFxufSk7XG5kcmF3ZXIuZHJhdygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9