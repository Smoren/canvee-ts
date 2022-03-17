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
/* harmony export */   "Drawable": () => (/* binding */ Drawable),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Drawable = /** @class */ (function () {
    function Drawable(config) {
        this.config = config;
    }
    Drawable.prototype.draw = function (drawer) {
    };
    return Drawable;
}());
var Drawer = /** @class */ (function () {
    function Drawer(domElement) {
        var _this = this;
        this.domElement = domElement;
        this.context = domElement.getContext('2d');
        this.figures = [];
        this.resizeObserver = new ResizeObserver(function () { return _this.refresh(); });
        this.resizeObserver.observe(this.domElement);
        this.refresh();
    }
    Drawer.prototype.addFigure = function (figure) {
        this.figures.push(figure);
    };
    Drawer.prototype.draw = function () {
        var _this = this;
        this.figures
            .sort(function (lhs, rhs) { return lhs.config.zIndex - rhs.config.zIndex; })
            .forEach(function (figure) { return figure.draw(_this); });
    };
    Drawer.prototype.refresh = function () {
        if (this.domElement.width !== this.width) {
            this.domElement.width = this.width;
        }
        if (this.domElement.height !== this.height) {
            this.domElement.height = this.height;
        }
        this.draw();
        console.log(this.width, this.height);
    };
    Object.defineProperty(Drawer.prototype, "width", {
        get: function () {
            return this.domElement.clientWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawer.prototype, "height", {
        get: function () {
            return this.domElement.clientHeight;
        },
        enumerable: false,
        configurable: true
    });
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
/* harmony import */ var _drawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../drawer */ "./src/canvas/drawer.ts");
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

var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(config) {
        return _super.call(this, config) || this;
    }
    Rect.prototype.draw = function (drawer) {
        drawer.context.fillRect(this.config.position.x, this.config.position.y, this.config.size.x, this.config.size.y);
        return;
    };
    return Rect;
}(_drawer__WEBPACK_IMPORTED_MODULE_0__.Drawable));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rect);


/***/ }),

/***/ "./src/canvas/structs/vector.ts":
/*!**************************************!*\
  !*** ./src/canvas/structs/vector.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector);


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
/* harmony import */ var _canvas_structs_vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas/structs/vector */ "./src/canvas/structs/vector.ts");



var drawer = new _canvas_drawer__WEBPACK_IMPORTED_MODULE_0__["default"](document.getElementById('canvas'));
var rect = new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"]({
    position: new _canvas_structs_vector__WEBPACK_IMPORTED_MODULE_2__["default"](10, 20),
    size: new _canvas_structs_vector__WEBPACK_IMPORTED_MODULE_2__["default"](100, 30),
    zIndex: 1,
});
drawer.addFigure(rect);
drawer.draw();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ1QsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLENBaEJrQiw2Q0FBUSxHQWdCMUI7QUFFRCxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzFCcEI7SUFJRSxnQkFBWSxDQUFTLEVBQUUsQ0FBUztRQUM5QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDOzs7Ozs7OztVQ1JEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNJO0FBQ0k7QUFFN0MsSUFBTSxNQUFNLEdBQVcsSUFBSSxzREFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFzQixDQUFDLENBQUM7QUFDMUYsSUFBTSxJQUFJLEdBQUcsSUFBSSw0REFBSSxDQUFDO0lBQ3BCLFFBQVEsRUFBRSxJQUFJLDhEQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUM1QixJQUFJLEVBQUUsSUFBSSw4REFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDekIsTUFBTSxFQUFFLENBQUM7Q0FDVixDQUFDO0FBQ0YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9kcmF3ZXIudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvZmlndXJlcy9yZWN0LnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmVjdG9yLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgRHJhd2FibGVDb25maWcge1xuICB6SW5kZXg6IG51bWJlcjtcbn1cblxuY2xhc3MgRHJhd2FibGUge1xuICBjb25maWc6IERyYXdhYmxlQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogRHJhd2FibGVDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIGRyYXcoZHJhd2VyOiBEcmF3ZXIpOiB2b2lkIHtcblxuICB9XG59XG5cbmNsYXNzIERyYXdlciB7XG4gIGRvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIGZpZ3VyZXM6IERyYXdhYmxlW107XG4gIHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcblxuICBjb25zdHJ1Y3Rvcihkb21FbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5jb250ZXh0ID0gZG9tRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuZmlndXJlcyA9IFtdO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRvbUVsZW1lbnQpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgYWRkRmlndXJlKGZpZ3VyZTogRHJhd2FibGUpOiB2b2lkIHtcbiAgICB0aGlzLmZpZ3VyZXMucHVzaChmaWd1cmUpO1xuICB9XG5cbiAgZHJhdygpOiB2b2lkIHtcbiAgICB0aGlzLmZpZ3VyZXNcbiAgICAgIC5zb3J0KChsaHMsIHJocykgPT4gbGhzLmNvbmZpZy56SW5kZXggLSByaHMuY29uZmlnLnpJbmRleClcbiAgICAgIC5mb3JFYWNoKGZpZ3VyZSA9PiBmaWd1cmUuZHJhdyh0aGlzKSk7XG4gIH1cblxuICByZWZyZXNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRvbUVsZW1lbnQud2lkdGggIT09IHRoaXMud2lkdGgpIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZG9tRWxlbWVudC5oZWlnaHQgIT09IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5kcmF3KCk7XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuICB9XG5cbiAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYXdlcjtcbmV4cG9ydCB7IERyYXdhYmxlLCBEcmF3YWJsZUNvbmZpZyB9O1xuIiwiaW1wb3J0IERyYXdlciwgeyBEcmF3YWJsZUNvbmZpZywgRHJhd2FibGUgfSBmcm9tIFwiLi4vZHJhd2VyXCI7XG5pbXBvcnQgVmVjdG9yIGZyb20gXCIuLi9zdHJ1Y3RzL3ZlY3RvclwiO1xuXG5pbnRlcmZhY2UgUmVjdENvbmZpZyBleHRlbmRzIERyYXdhYmxlQ29uZmlnIHtcbiAgcG9zaXRpb246IFZlY3RvcjtcbiAgc2l6ZTogVmVjdG9yO1xufVxuXG5jbGFzcyBSZWN0IGV4dGVuZHMgRHJhd2FibGUge1xuICBjb25maWc6IFJlY3RDb25maWc7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBSZWN0Q29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgfVxuXG4gIGRyYXcoZHJhd2VyOiBEcmF3ZXIpOiB2b2lkIHtcbiAgICBkcmF3ZXIuY29udGV4dC5maWxsUmVjdChcbiAgICAgIHRoaXMuY29uZmlnLnBvc2l0aW9uLngsXG4gICAgICB0aGlzLmNvbmZpZy5wb3NpdGlvbi55LFxuICAgICAgdGhpcy5jb25maWcuc2l6ZS54LFxuICAgICAgdGhpcy5jb25maWcuc2l6ZS55XG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVjdDtcbmV4cG9ydCB7IFJlY3RDb25maWcgfTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRHJhd2VyIGZyb20gXCIuL2NhbnZhcy9kcmF3ZXJcIjtcbmltcG9ydCBSZWN0IGZyb20gXCIuL2NhbnZhcy9maWd1cmVzL3JlY3RcIjtcbmltcG9ydCBWZWN0b3IgZnJvbSBcIi4vY2FudmFzL3N0cnVjdHMvdmVjdG9yXCI7XG5cbmNvbnN0IGRyYXdlcjogRHJhd2VyID0gbmV3IERyYXdlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQpO1xuY29uc3QgcmVjdCA9IG5ldyBSZWN0KHtcbiAgcG9zaXRpb246IG5ldyBWZWN0b3IoMTAsIDIwKSxcbiAgc2l6ZTogbmV3IFZlY3RvcigxMDAsIDMwKSxcbiAgekluZGV4OiAxLFxufSlcbmRyYXdlci5hZGRGaWd1cmUocmVjdCk7XG5kcmF3ZXIuZHJhdygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9