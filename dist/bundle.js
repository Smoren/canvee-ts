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
/**
 * Canvas drawer
 * @public
 */
var Drawer = /** @class */ (function () {
    /**
     * Drawer constructor
     * @param domElement - canvas DOM element
     * @param viewConfig - view config
     * @param storage - drawable objects storage
     */
    function Drawer(_a) {
        var domElement = _a.domElement, viewConfig = _a.viewConfig, storage = _a.storage;
        /**
         * Name of class to use as subscriber name in observable logic
         * @protected
         */
        this._subscriberName = 'Drawer';
        this._domElement = domElement;
        this._viewConfig = viewConfig;
        this._storage = storage;
        this._context = domElement.getContext('2d');
        this._initResizeObserver();
        this._initViewConfigObserver();
        this._initStorageObserver();
        this._initMouseEvents();
        this.refresh();
    }
    /**
     * {@inheritDoc DrawerInterface.draw}
     */
    Drawer.prototype.draw = function () {
        var _a, _b;
        var _this = this;
        this._context.save();
        (_a = this._context).translate.apply(_a, this._viewConfig.offset);
        (_b = this._context).scale.apply(_b, this._viewConfig.scale);
        this._storage.list.forEach(function (item) {
            if (item.config.visible) {
                item.draw(_this);
            }
        });
        this._context.restore();
    };
    /**
     * {@inheritDoc DrawerInterface.refresh}
     */
    Drawer.prototype.refresh = function () {
        if (this._domElement.width !== this.width) {
            this._domElement.width = this.width;
        }
        if (this._domElement.height !== this.height) {
            this._domElement.height = this.height;
        }
        console.log('refreshed');
        this.clear();
        this.draw();
    };
    /**
     * {@inheritDoc DrawerInterface.clear}
     */
    Drawer.prototype.clear = function () {
        this._context.clearRect(0, 0, this.width, this.height);
    };
    /**
     * Returns bounds of canvas frame
     */
    Drawer.prototype.getBounds = function () {
        return [
            this._viewConfig.transposeForward([0, 0]),
            this._viewConfig.transposeForward([this.width, this.height]),
        ];
    };
    Object.defineProperty(Drawer.prototype, "viewConfig", {
        /**
         * View config getter
         */
        get: function () {
            return this._viewConfig;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawer.prototype, "context", {
        /**
         * Canvas context getter
         */
        get: function () {
            return this._context;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawer.prototype, "width", {
        /**
         * Canvas width getter
         */
        get: function () {
            return this._domElement.clientWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawer.prototype, "height", {
        /**
         * Canvas height getter
         */
        get: function () {
            return this._domElement.clientHeight;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initiates canvas resize observer
     * @protected
     */
    Drawer.prototype._initResizeObserver = function () {
        var _this = this;
        this._resizeObserver = new ResizeObserver(function () { return _this.refresh(); });
        this._resizeObserver.observe(this._domElement);
    };
    /**
     * Initiates view config observer
     * @protected
     */
    Drawer.prototype._initViewConfigObserver = function () {
        var _this = this;
        this._viewConfig.onViewChange(this._subscriberName, function () { return _this.refresh(); });
    };
    /**
     * Initiates storage observer
     * @protected
     */
    Drawer.prototype._initStorageObserver = function () {
        var _this = this;
        this._storage.onViewChange(this._subscriberName, function () { return _this.refresh(); });
    };
    /**
     * Initiates mouse events observer
     * @protected
     */
    Drawer.prototype._initMouseEvents = function () {
        var _this = this;
        // TODO тоже перенести куда-нибудь
        this._domElement.addEventListener('wheel', function (event) {
            if (event.ctrlKey) {
                var scale = _this._viewConfig.scale[0];
                scale += event.deltaY * -0.002;
                scale = Math.min(Math.max(0.001, scale), 100);
                _this._viewConfig.updateScaleInCursorContext([scale, scale], [event.offsetX, event.offsetY]);
            }
            else if (event.shiftKey) {
                _this._viewConfig.offset[0] -= event.deltaY;
            }
            else {
                _this._viewConfig.offset[1] -= event.deltaY;
            }
            event.preventDefault();
        });
        this._domElement.addEventListener('click', function (event) {
            var coords = [event.offsetX, event.offsetY];
            var coords1 = _this._viewConfig.transposeForward(coords);
            var coords2 = _this._viewConfig.transposeBackward(coords1);
            console.log('mouse coords', coords);
            console.log('real coords', coords1);
            event.preventDefault();
        });
        var mouseDownCoords = null;
        this._domElement.addEventListener('mousedown', function (event) {
            mouseDownCoords = [event.offsetX, event.offsetY];
            _this._domElement.style.cursor = 'grabbing';
        });
        this._domElement.addEventListener('mousemove', function (event) {
            if (mouseDownCoords === null) {
                if (event.shiftKey) {
                    _this._domElement.style.cursor = 'ew-resize';
                }
                else if (event.ctrlKey) {
                    _this._domElement.style.cursor = 'crosshair';
                }
                else {
                    _this._domElement.style.cursor = 'default';
                }
                return;
            }
            var mouseMoveCoords = [event.offsetX, event.offsetY];
            var difference = [mouseDownCoords[0] - mouseMoveCoords[0], mouseDownCoords[1] - mouseMoveCoords[1]];
            _this._viewConfig.offset = [_this._viewConfig.offset[0] - difference[0], _this._viewConfig.offset[1] - difference[1]];
            mouseDownCoords = mouseMoveCoords;
        });
        this._domElement.addEventListener('mouseup', function (event) {
            mouseDownCoords = null;
            _this._domElement.style.cursor = 'default';
        });
    };
    return Drawer;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawer);


/***/ }),

/***/ "./src/canvas/figures/grid.ts":
/*!************************************!*\
  !*** ./src/canvas/figures/grid.ts ***!
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

/**
 * Grid figure
 * @public
 */
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    /**
     * Grid constructor
     * @param id - object ID
     * @param config - view config
     * @param data - linked extra data
     */
    function Grid(id, config, data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, id, config, data) || this;
        /**
         * Object type
         * @protected
         */
        _this._type = 'Grid';
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    Grid.prototype.draw = function (drawer) {
        drawer.context.save();
        drawer.context.beginPath();
        var _a = drawer.getBounds(), fromBound = _a[0], toBound = _a[1];
        var scale = drawer.viewConfig.scale[0];
        drawer.context.lineWidth = this._config.lineWidth / scale;
        var step = drawer.viewConfig.gridStep;
        if (scale < 1) {
            step = step * (Math.pow(2, Math.round(Math.log2(1 / scale))));
        }
        else {
            step = step / (Math.pow(2, Math.round(Math.log2(scale))));
        }
        var mainLineDistance = step * this._config.linesInBlock;
        var xGap = (fromBound[0] % mainLineDistance);
        if (xGap < 0) {
            xGap += mainLineDistance;
        }
        var yGap = (fromBound[1] % mainLineDistance);
        if (yGap < 0) {
            yGap += mainLineDistance;
        }
        {
            var j = 0;
            for (var i = fromBound[1] - yGap; i <= toBound[1]; i += step) {
                var color = (j++ % this._config.linesInBlock === 0)
                    ? this._config.mainLineColor
                    : this._config.subLineColor;
                this._drawHorizontalLine(i, drawer, color, [fromBound, toBound]);
            }
        }
        {
            var j = 0;
            for (var i = fromBound[0] - xGap; i <= toBound[0]; i += step) {
                var color = (j++ % this._config.linesInBlock === 0)
                    ? this._config.mainLineColor
                    : this._config.subLineColor;
                this._drawVerticalLine(i, drawer, color, [fromBound, toBound]);
            }
        }
        drawer.context.closePath();
        drawer.context.restore();
    };
    /**
     * Draw horizontal line
     * @param drawer
     * @param yOffset
     * @param color
     * @param fromBound
     * @param toBound
     */
    Grid.prototype._drawHorizontalLine = function (yOffset, drawer, color, _a) {
        var fromBound = _a[0], toBound = _a[1];
        var lineFrom = [fromBound[0], yOffset];
        var lineTo = [toBound[0], yOffset];
        drawer.context.beginPath();
        drawer.context.strokeStyle = color;
        drawer.context.moveTo(lineFrom[0], lineFrom[1]);
        drawer.context.lineTo(lineTo[0], lineTo[1]);
        drawer.context.stroke();
        drawer.context.closePath();
        return this;
    };
    /**
     * Draw vertical line
     * @param drawer
     * @param xOffset
     * @param color
     * @param fromBound
     * @param toBound
     */
    Grid.prototype._drawVerticalLine = function (xOffset, drawer, color, _a) {
        var fromBound = _a[0], toBound = _a[1];
        var lineFrom = [xOffset, fromBound[1]];
        var lineTo = [xOffset, toBound[1]];
        drawer.context.beginPath();
        drawer.context.strokeStyle = color;
        drawer.context.moveTo(lineFrom[0], lineFrom[1]);
        drawer.context.lineTo(lineTo[0], lineTo[1]);
        drawer.context.stroke();
        drawer.context.closePath();
        return this;
    };
    return Grid;
}(_structs_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Grid);


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

/**
 * Rect figure
 * @public
 */
var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    /**
     * Rect constructor
     * @param id - object ID
     * @param config - view config
     * @param data - linked extra data
     */
    function Rect(id, config, data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, id, config, data) || this;
        /**
         * Object type
         * @protected
         */
        _this._type = 'Rect';
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    Rect.prototype.draw = function (drawer) {
        var _a, _b;
        drawer.context.beginPath();
        drawer.context.strokeStyle = this._config.strokeStyle;
        drawer.context.fillStyle = this._config.fillStyle;
        drawer.context.lineWidth = this._config.lineWidth;
        (_a = drawer.context).fillRect.apply(_a, __spreadArray(__spreadArray([], this._config.position, false), this._config.size, false));
        (_b = drawer.context).strokeRect.apply(_b, __spreadArray(__spreadArray([], this._config.position, false), this._config.size, false));
        drawer.context.closePath();
    };
    return Rect;
}(_structs_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rect);


/***/ }),

/***/ "./src/canvas/figures/svg.ts":
/*!***********************************!*\
  !*** ./src/canvas/figures/svg.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/drawable */ "./src/canvas/structs/drawable.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/base */ "./src/canvas/helpers/base.ts");
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


/**
 * Svg figure
 * @public
 */
var Svg = /** @class */ (function (_super) {
    __extends(Svg, _super);
    /**
     * Svg constructor
     * @param id - object ID
     * @param config - view config
     * @param data - linked extra data
     */
    function Svg(id, config, data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, id, config, data) || this;
        /**
         * Object type
         * @protected
         */
        _this._type = 'Svg';
        /**
         * Image DOM element
         * @protected
         */
        _this._img = null;
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    Svg.prototype.draw = function (drawer) {
        var _a;
        var _this = this;
        if (this._img !== null) {
            drawer.context.beginPath();
            (_a = drawer.context).drawImage.apply(_a, __spreadArray([this._img], this._config.position, false));
            drawer.context.closePath();
            return;
        }
        // const svgElement: SVGElement = createElementFromHTML(this._config.data) as SVGElement;
        var blob = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.createBlob)(this._config.data, 'image/svg+xml');
        var url = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.createUrlFromBlob)(blob);
        var img = new Image();
        img.src = url;
        img.addEventListener('load', function () {
            // TODO возможно следует придумать более элегантное решение
            // как вариант, сделать единое хранилище всех ранее загруженных IMG
            _this._img = img;
            _this._observeHelper.processWithMuteHandlers();
        });
    };
    return Svg;
}(_structs_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Svg);


/***/ }),

/***/ "./src/canvas/helpers/base.ts":
/*!************************************!*\
  !*** ./src/canvas/helpers/base.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areArraysEqual": () => (/* binding */ areArraysEqual),
/* harmony export */   "createBlob": () => (/* binding */ createBlob),
/* harmony export */   "createElementFromHTML": () => (/* binding */ createElementFromHTML),
/* harmony export */   "createUrlFromBlob": () => (/* binding */ createUrlFromBlob),
/* harmony export */   "getMinPosition": () => (/* binding */ getMinPosition)
/* harmony export */ });
function areArraysEqual(lhs, rhs) {
    return lhs.length === rhs.length && lhs.every(function (v, i) { return v === rhs[i]; });
}
/**
 * Creates DOM element from HTML string
 * @public
 * @param htmlString - HTML string
 */
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
/**
 * Creates blob from text
 * @param data - text
 * @param type - type
 */
function createBlob(data, type) {
    return new Blob([data], { type: type });
}
/**
 * Creates URL from blob
 * @param blob - blob
 */
function createUrlFromBlob(blob) {
    var URL = window.URL || window.webkitURL || window;
    // @ts-ignore
    return URL.createObjectURL(blob);
}
/**
 * Finds and returns minimal (left-top) position
 * @param positions
 */
function getMinPosition(positions) {
    var minX = Infinity;
    var minY = Infinity;
    positions.forEach(function (position) {
        if (position[0] < minX) {
            minX = position[0];
        }
        if (position[1] < minY) {
            minY = position[1];
        }
    });
    return [minX, minY];
}


/***/ }),

/***/ "./src/canvas/helpers/observe-helper.ts":
/*!**********************************************!*\
  !*** ./src/canvas/helpers/observe-helper.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Helper for observable logic
 * @public
 */
var ObserveHelper = /** @class */ (function () {
    function ObserveHelper() {
        /**
         * Handlers mapped by subscribers
         * @protected
         */
        this._handlerMap = {};
        /**
         * Flag for muting handlers
         * @protected
         */
        this._muteHandlers = false;
    }
    /**
     * {@inheritDoc ObserveHelperInterface.onChange}
     */
    ObserveHelper.prototype.onChange = function (subscriberName, handler) {
        this._handlerMap[subscriberName] = handler;
    };
    /**
     * {@inheritDoc ObserveHelperInterface.offChange}
     */
    ObserveHelper.prototype.offChange = function (subscriberName) {
        delete this._handlerMap[subscriberName];
    };
    /**
     * {@inheritDoc ObserveHelperInterface.processWithMuteHandlers}
     */
    ObserveHelper.prototype.processWithMuteHandlers = function (extra) {
        var _this = this;
        if (extra === void 0) { extra = null; }
        return this.withMuteHandlers(function (mutedBefore) {
            return _this.processHandlers(mutedBefore, extra);
        });
    };
    /**
     * {@inheritDoc ObserveHelperInterface.withMuteHandlers}
     */
    ObserveHelper.prototype.withMuteHandlers = function (action) {
        if (this._muteHandlers) {
            action(true, this);
        }
        else {
            this._muteHandlers = true;
            action(false, this);
            this._muteHandlers = false;
        }
        return true;
    };
    /**
     * {@inheritDoc ObserveHelperInterface.processHandlers}
     */
    ObserveHelper.prototype.processHandlers = function (isMuted, extra) {
        var _this = this;
        if (extra === void 0) { extra = null; }
        if (!isMuted) {
            Object.values(this._handlerMap)
                .forEach(function (handler) { return handler(_this, extra); });
        }
        return true;
    };
    return ObserveHelper;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ObserveHelper);


/***/ }),

/***/ "./src/canvas/structs/drawable-group.ts":
/*!**********************************************!*\
  !*** ./src/canvas/structs/drawable-group.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawable */ "./src/canvas/structs/drawable.ts");
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

var DrawableGroup = /** @class */ (function (_super) {
    __extends(DrawableGroup, _super);
    /**
     * DrawableGroup constructor
     * @param id - group ID
     * @param config - config
     * @param data - extra data
     * @param list - list of grouped objects
     */
    function DrawableGroup(id, config, data, list) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, id, config, data) || this;
        _this._observeHelper.onChange(_this._subscriberName, function (target) {
            console.log('asdasd', target);
        });
        // TODO нужен ли здесь Proxy?
        _this._list = new Proxy(list, {
            set: function (target, index, value) {
                target[index] = value;
                return _this._observeHelper.processWithMuteHandlers();
            },
        });
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    DrawableGroup.prototype.draw = function (drawer) {
        var _a;
        if (!this._config.visible) {
            return;
        }
        drawer.context.save();
        (_a = drawer.context).translate.apply(_a, this.config.position);
        this._list.forEach(function (item) {
            item.draw(drawer);
        });
        drawer.context.restore();
    };
    Object.defineProperty(DrawableGroup.prototype, "list", {
        /**
         * List getter
         */
        get: function () {
            return this._list;
        },
        enumerable: false,
        configurable: true
    });
    return DrawableGroup;
}(_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawableGroup);


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
/* harmony import */ var _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/observe-helper */ "./src/canvas/helpers/observe-helper.ts");
/* harmony import */ var _drawable_group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawable-group */ "./src/canvas/structs/drawable-group.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector.ts");




/**
 * Storage for drawable objects
 * @public
 */
var DrawableStorage = /** @class */ (function () {
    /**
     * Drawable constructor
     * @param items - batch list to add
     */
    function DrawableStorage(items) {
        var _this = this;
        /**
         * List of stored drawable objects
         * @protected
         */
        this._list = [];
        this._observeHelper = new _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.addBatch(items);
        this._sort();
        this._observeHelper.onChange(this._subscriberName, function (target, extra) {
            if (extra !== null && extra.hasOwnProperty('zIndexChanged') && extra.zIndexChanged) {
                _this._sort();
            }
        });
    }
    Object.defineProperty(DrawableStorage.prototype, "list", {
        /**
         * Stored drawable objects list getter
         */
        get: function () {
            return this._list;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * {@inheritDoc DrawableStorageInterface.add}
     */
    DrawableStorage.prototype.add = function (item) {
        var _this = this;
        item.onViewChange(this._subscriberName, function (target, extra) {
            return _this._observeHelper.processWithMuteHandlers(extra);
        });
        this._list.push(item);
        this._sort();
        this._observeHelper.processWithMuteHandlers();
    };
    /**
     * {@inheritDoc DrawableStorageInterface.add}
     */
    DrawableStorage.prototype.addBatch = function (items) {
        var _this = this;
        items.forEach(function (item) {
            item.onViewChange(_this._subscriberName, function (target, extra) {
                return _this._observeHelper.processWithMuteHandlers(extra);
            });
            _this._list.push(item);
        });
        this._sort();
        this._observeHelper.processWithMuteHandlers();
    };
    /**
     * Deletes objects found by config from storage
     * @param config
     */
    DrawableStorage.prototype.delete = function (config) {
        var _this = this;
        var result = [];
        this._observeHelper.withMuteHandlers(function () {
            _this.find(config).forEach(function (item) {
                result.push(_this.deleteById(item.id));
            });
        });
        this._observeHelper.processWithMuteHandlers();
        return result;
    };
    /**
     * Deletes object by ID from storage
     * @param id
     */
    DrawableStorage.prototype.deleteById = function (id) {
        var index = this._list.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            this._observeHelper.processWithMuteHandlers();
            var deletedItem = this._list.splice(index, 1)[0];
            deletedItem.offViewChange(this._subscriberName);
            return deletedItem;
        }
        // TODO customize exception
        throw new Error("cannot find object with id '".concat(id, "'"));
    };
    /**
     * {@inheritDoc DrawableStorageInterface.clear}
     */
    DrawableStorage.prototype.clear = function () {
        this._list.length = 0;
        this._observeHelper.processWithMuteHandlers();
    };
    /**
     * {@inheritDoc DrawableStorageInterface.find}
     */
    DrawableStorage.prototype.find = function (config) {
        return this._find(function (item) {
            if (config.idsOnly && config.idsOnly.indexOf(item.id) === -1) {
                return false;
            }
            else if (config.idsExcept && config.idsExcept.indexOf(item.id) !== -1) {
                return false;
            }
            if (config.typesOnly && config.typesOnly.indexOf(item.type) === -1) {
                return false;
            }
            else if (config.typesExcept && config.typesExcept.indexOf(item.type) !== -1) {
                return false;
            }
            return !(config.extraFilter && !config.extraFilter(item));
        });
    };
    /**
     * {@inheritDoc DrawableStorageInterface.findById}
     */
    DrawableStorage.prototype.findById = function (id) {
        var foundItems = this._find(function (candidate) { return candidate.id === id; });
        if (foundItems.length) {
            return foundItems[0];
        }
        // TODO customize exception
        throw new Error("cannot find object with id '".concat(id, "'"));
    };
    /**
     * {@inheritDoc DrawableStorageInterface.group}
     */
    DrawableStorage.prototype.group = function (ids) {
        var groupItems = this.delete({ idsOnly: ids });
        var minPosition = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_2__.getMinPosition)(groupItems.map(function (item) { return item.config.position; }));
        var config = {
            position: minPosition,
            zIndex: Math.max.apply(Math, groupItems.map(function (item) { return item.config.zIndex; })),
            visible: true,
            selectable: true,
        };
        this._observeHelper.withMuteHandlers(function () {
            groupItems.forEach(function (item) {
                item.movePosition((0,_vector__WEBPACK_IMPORTED_MODULE_3__.createVector)(minPosition).inverse().toArray());
            });
        });
        var groupId = 'group-' + (new Date()).getTime() + '-' + Math.floor(Math.random() * 100000);
        var group = new _drawable_group__WEBPACK_IMPORTED_MODULE_1__["default"](groupId, config, {}, groupItems);
        this.add(group);
        return group;
    };
    /**
     * {@inheritDoc DrawableStorageInterface.ungroup}
     */
    DrawableStorage.prototype.ungroup = function (groupId) {
        var group = this.deleteById(groupId);
        this._observeHelper.withMuteHandlers(function () {
            group.list.forEach(function (item) {
                item.movePosition(group.config.position);
            });
        });
        this.addBatch(group.list);
    };
    /**
     * {@inheritDoc DrawableStorageInterface.onViewChange}
     */
    DrawableStorage.prototype.onViewChange = function (subscriberName, handler) {
        this._observeHelper.onChange(subscriberName, handler);
    };
    /**
     * Find objects in storage by filter callback function
     * @param filter - filter callback function
     */
    DrawableStorage.prototype._find = function (filter) {
        var result = [];
        this._list.forEach(function (item) {
            if (filter(item)) {
                result.push(item);
            }
        });
        return result;
    };
    /**
     * Sorts the stored objects by z-index
     * @protected
     */
    DrawableStorage.prototype._sort = function () {
        console.log('sort');
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
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/observe-helper */ "./src/canvas/helpers/observe-helper.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector.ts");



/**
 * Abstract class for drawable objects
 * @public
 */
var Drawable = /** @class */ (function () {
    /**
     * Drawable constructor
     * @param id - object ID
     * @param config - view config
     * @param data - linked extra data
     * @protected
     */
    function Drawable(id, config, data) {
        if (data === void 0) { data = {}; }
        var _this = this;
        this._id = id;
        this._observeHelper = new _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this._config = new Proxy(config, {
            set: function (target, index, value) {
                var isChanged = target[index] !== value;
                target[index] = value;
                return isChanged ? _this._observeHelper.processWithMuteHandlers({
                    zIndexChanged: index === 'zIndex',
                }) : true;
            },
        });
        this._data = new Proxy(data, {
            set: function (target, index, value) {
                var isChanged = target[index] !== value;
                target[index] = value;
                return isChanged ? _this._observeHelper.processWithMuteHandlers() : true;
            },
        });
    }
    /**
     * {@inheritDoc DrawableInterface.setPosition}
     */
    Drawable.prototype.setPosition = function (coords) {
        this._config.position = coords;
    };
    /**
     * {@inheritDoc DrawableInterface.movePosition}
     */
    Drawable.prototype.movePosition = function (offset) {
        this.setPosition((0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(this._config.position)
            .add((0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(offset))
            .toArray());
    };
    Object.defineProperty(Drawable.prototype, "id", {
        /**
         * ID getter
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawable.prototype, "type", {
        /**
         * Type getter
         */
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawable.prototype, "config", {
        /**
         * View config getter
         */
        get: function () {
            return this._config;
        },
        /**
         * View config setter
         * @param config - view config
         */
        set: function (config) {
            var _this = this;
            var isChanged = !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.areArraysEqual)(Object.entries(config), Object.entries(this._config));
            this._observeHelper.withMuteHandlers((function (mutedBefore, manager) {
                var isZIndexChanged = config.zIndex !== _this._config.zIndex;
                Object.entries(config).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    _this._config[key] = value;
                });
                manager.processHandlers(!isChanged || mutedBefore, {
                    zIndexChanged: isZIndexChanged,
                });
            }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Drawable.prototype, "data", {
        /**
         * Linked data getter
         */
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * {@inheritDoc DrawableInterface.onViewChange}
     */
    Drawable.prototype.onViewChange = function (subscriberName, handler) {
        this._observeHelper.onChange(subscriberName, handler);
    };
    /**
     * {@inheritDoc DrawableInterface.offViewChange}
     */
    Drawable.prototype.offViewChange = function (subscriberName) {
        this._observeHelper.offChange(subscriberName);
    };
    return Drawable;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawable);


/***/ }),

/***/ "./src/canvas/structs/vector.ts":
/*!**************************************!*\
  !*** ./src/canvas/structs/vector.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVector": () => (/* binding */ createVector),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Vector class
 * @public
 */
var Vector = /** @class */ (function () {
    /**
     * Vector constructor
     * @param x - coordinate X
     * @param y - coordinate Y
     */
    function Vector(_a) {
        var x = _a[0], y = _a[1];
        this.x = x;
        this.y = y;
    }
    /**
     * Add another vector to this vector
     * @param v - vector to add
     */
    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    /**
     * Subtracts vector with another vector
     * @param v - vector to subtract
     */
    Vector.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    /**
     * Multiples vector by number
     * @param mul - multiplier
     */
    Vector.prototype.mul = function (mul) {
        this.x *= mul;
        this.y *= mul;
        return this;
    };
    /**
     * Divides vector by number
     * @param div - divider
     */
    Vector.prototype.div = function (div) {
        this.x /= div;
        this.y /= div;
        return this;
    };
    /**
     * Inverses vector
     */
    Vector.prototype.inverse = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    /**
     * Reverses vector
     */
    Vector.prototype.reverse = function () {
        this.x = 1 / this.x;
        this.y = 1 / this.y;
        return this;
    };
    /**
     * Returns the length of vector
     */
    Vector.prototype.len = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    /**
     * Returns distance vector of this and another vector
     * @param v - another vector
     */
    Vector.prototype.distance = function (v) {
        return this.clone().sub(v);
    };
    /**
     * Clones vector
     */
    Vector.prototype.clone = function () {
        return new Vector(this.toArray());
    };
    /**
     * Converts vector to array
     */
    Vector.prototype.toArray = function () {
        return [this.x, this.y];
    };
    return Vector;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector);
/**
 * Creates new vector
 * @public
 * @param coords - coordinates of new vector
 */
function createVector(coords) {
    return new Vector(coords);
}


/***/ }),

/***/ "./src/canvas/structs/view-config.ts":
/*!*******************************************!*\
  !*** ./src/canvas/structs/view-config.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/observe-helper */ "./src/canvas/helpers/observe-helper.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector.ts");



/**
 * Config for objects drawable on canvas
 * @public
 */
var ViewConfig = /** @class */ (function () {
    /**
     * ViewConfig constructor
     * @param scale - scale
     * @param offset - offset
     * @param gridStep - grid step
     */
    function ViewConfig(_a) {
        var scale = _a.scale, offset = _a.offset, gridStep = _a.gridStep;
        var _this = this;
        this._observeHelper = new _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this._scale = new Proxy(scale, {
            set: function (target, index, value) {
                var isChanged = target[index] !== value;
                target[index] = value;
                return isChanged ? _this._observeHelper.processWithMuteHandlers() : true;
            },
        });
        this._offset = new Proxy(offset, {
            set: function (target, index, value) {
                var isChanged = target[index] !== value;
                target[index] = value;
                return isChanged ? _this._observeHelper.processWithMuteHandlers() : true;
            },
        });
        this._gridStep = gridStep;
    }
    /**
     * {@inheritDoc ViewConfigObservableInterface.onViewChange}
     */
    ViewConfig.prototype.onViewChange = function (subscriberName, handler) {
        this._observeHelper.onChange(subscriberName, handler);
    };
    /**
     * {@inheritDoc ViewConfigObservableInterface.transposeForward}
     */
    ViewConfig.prototype.transposeForward = function (coords) {
        var x = coords[0], y = coords[1];
        return [(x - this._offset[0]) / this._scale[0], (y - this._offset[1]) / this._scale[1]];
    };
    /**
     * {@inheritDoc ViewConfigObservableInterface.transposeBackward}
     */
    ViewConfig.prototype.transposeBackward = function (coords) {
        var x = coords[0], y = coords[1];
        return [x * this._scale[0] + this._offset[0], y * this._scale[1] + this._offset[1]];
    };
    /**
     * {@inheritDoc ViewConfigObservableInterface.updateScaleInCursorContext}
     */
    ViewConfig.prototype.updateScaleInCursorContext = function (newScale, cursorCoords) {
        var _this = this;
        var isChanged = !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.areArraysEqual)(newScale, this._scale);
        this._observeHelper.withMuteHandlers(function (mutedBefore, manager) {
            var oldScalePosition = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(_this.transposeForward(cursorCoords));
            _this.scale = newScale;
            var newScalePosition = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(_this.transposeForward(cursorCoords));
            var difference = newScalePosition.clone().sub(oldScalePosition);
            _this.offset = _this.transposeBackward(difference.toArray());
            manager.processHandlers(!isChanged || mutedBefore);
        });
    };
    /**
     * Updates all the data in config
     * @param scale - scale
     * @param offset - offset
     * @param gridStep - grid step
     */
    ViewConfig.prototype.update = function (_a) {
        var _this = this;
        var scale = _a.scale, offset = _a.offset, gridStep = _a.gridStep;
        var isChanged = !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.areArraysEqual)(scale, this._scale) || !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.areArraysEqual)(offset, this._offset);
        this._observeHelper.withMuteHandlers(function (mutedBefore, manager) {
            _this.scale = scale;
            _this.offset = offset;
            _this.gridStep = gridStep;
            manager.processHandlers(!isChanged || mutedBefore);
        });
    };
    Object.defineProperty(ViewConfig.prototype, "scale", {
        /**
         * Scale getter
         */
        get: function () {
            return this._scale;
        },
        /**
         * Scale setter
         * @param scale - scale
         */
        set: function (scale) {
            var _this = this;
            var isChanged = !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.areArraysEqual)(scale, this._scale);
            this._observeHelper.withMuteHandlers(function (mutedBefore, manager) {
                _this._scale[0] = scale[0];
                _this._scale[1] = scale[1];
                manager.processHandlers(!isChanged || mutedBefore);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewConfig.prototype, "offset", {
        /**
         * Offset getter
         */
        get: function () {
            return this._offset;
        },
        /**
         * Offset setter
         * @param offset - offset
         */
        set: function (offset) {
            var _this = this;
            var isChanged = !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.areArraysEqual)(offset, this._offset);
            this._observeHelper.withMuteHandlers(function (mutedBefore, manager) {
                _this._offset[0] = offset[0];
                _this._offset[1] = offset[1];
                manager.processHandlers(!isChanged || mutedBefore);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewConfig.prototype, "gridStep", {
        /**
         * Grid step getter
         */
        get: function () {
            return this._gridStep;
        },
        /**
         * Grid step setter
         * @param gridStep - grid step
         */
        set: function (gridStep) {
            var _this = this;
            var isChanged = gridStep !== this._gridStep;
            this._observeHelper.withMuteHandlers(function (mutedBefore, manager) {
                _this._gridStep = gridStep;
                manager.processHandlers(!isChanged || mutedBefore);
            });
        },
        enumerable: false,
        configurable: true
    });
    return ViewConfig;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewConfig);


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
/* harmony import */ var _canvas_structs_view_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas/structs/view-config */ "./src/canvas/structs/view-config.ts");
/* harmony import */ var _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas/figures/grid */ "./src/canvas/figures/grid.ts");
/* harmony import */ var _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvas/figures/svg */ "./src/canvas/figures/svg.ts");






var storage = new _canvas_structs_drawable_storage__WEBPACK_IMPORTED_MODULE_2__["default"]([
    new _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__["default"](1, {
        position: [0, 0],
        zIndex: -Infinity,
        visible: true,
        selectable: false,
        mainLineColor: '#bbb',
        subLineColor: '#dedede',
        lineWidth: 1,
        linesInBlock: 5,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](2, {
        position: [10, 20],
        size: [100, 30],
        zIndex: 1,
        visible: true,
        selectable: false,
        fillStyle: 'green',
        strokeStyle: 'black',
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](3, {
        position: [10, 25],
        size: [50, 50],
        zIndex: 1,
        visible: true,
        selectable: false,
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](4, {
        position: [700, 250],
        size: [150, 100],
        zIndex: 1,
        visible: true,
        selectable: false,
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 3,
    }),
    new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__["default"](5, {
        position: [300, 550],
        size: [150, 100],
        zIndex: 1,
        visible: true,
        selectable: false,
        data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>",
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](6, {
        position: [300, 300],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        selectable: false,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](7, {
        position: [350, 300],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        selectable: false,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](8, {
        position: [300, 350],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        selectable: false,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 3,
    }),
]);
var group = storage.group([6, 7, 8]);
// storage.ungroup(group.id);
console.log(storage);
var viewConfig = new _canvas_structs_view_config__WEBPACK_IMPORTED_MODULE_3__["default"]({
    scale: [1, 1],
    offset: [0, 0],
    gridStep: 15,
});
console.log(viewConfig);
var drawer = new _canvas_drawer__WEBPACK_IMPORTED_MODULE_0__["default"]({
    domElement: document.getElementById('canvas'),
    viewConfig: viewConfig,
    storage: storage,
});
drawer.draw();
setTimeout(function () {
    var batch = [];
    for (var i = 0; i < 1000; ++i) {
        batch.push(new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](i + 100, {
            position: [Math.random() * drawer.width, Math.random() * drawer.height],
            size: [30 + Math.random() * 100, 30 + Math.random() * 100],
            zIndex: 0,
            visible: true,
            selectable: false,
            fillStyle: 'white',
            strokeStyle: 'green',
            lineWidth: 1,
        }));
    }
    storage.addBatch(batch);
}, 30);
setTimeout(function () {
    storage.delete({
        typesExcept: ['Grid'],
        extraFilter: function (item) { return item.config.zIndex === 0; },
    });
    storage.add(new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](50, {
        position: [100, 25],
        size: [50, 30],
        zIndex: 1,
        visible: true,
        selectable: false,
        fillStyle: 'red',
        strokeStyle: 'black',
        lineWidth: 3,
    }));
}, 1000);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxDQUFDO1lBQ2xELE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLElBQUk7WUFDYixVQUFVLEVBQUUsS0FBSztZQUNqQixTQUFTLEVBQUUsT0FBTztZQUNsQixXQUFXLEVBQUUsT0FBTztZQUNwQixTQUFTLEVBQUUsQ0FBQztTQUNiLENBQUMsQ0FBQyxDQUFDO0tBQ0w7SUFDRCxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVQLFVBQVUsQ0FBQztJQUNULE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDYixXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDckIsV0FBVyxFQUFFLGNBQUksSUFBSSxXQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQXhCLENBQXdCO0tBQzlDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSw0REFBSSxDQUFDLEVBQUUsRUFBRTtRQUN2QixRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ25CLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDZCxNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxJQUFJO1FBQ2IsVUFBVSxFQUFFLEtBQUs7UUFDakIsU0FBUyxFQUFFLEtBQUs7UUFDaEIsV0FBVyxFQUFFLE9BQU87UUFDcEIsU0FBUyxFQUFFLENBQUM7S0FDYixDQUFDLENBQUMsQ0FBQztBQUNOLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL2RyYXdlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9maWd1cmVzL2dyaWQudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvZmlndXJlcy9yZWN0LnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL2ZpZ3VyZXMvc3ZnLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL2hlbHBlcnMvYmFzZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9oZWxwZXJzL29ic2VydmUtaGVscGVyLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL3N0cnVjdHMvZHJhd2FibGUtZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS1zdG9yYWdlLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL3N0cnVjdHMvZHJhd2FibGUudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvc3RydWN0cy92ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvc3RydWN0cy92aWV3LWNvbmZpZy50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLFxuICBEcmF3ZXJDb25maWdJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSwgVmVjdG9yQXJyYXlUeXBlLFxuICBWaWV3Q29uZmlnSW50ZXJmYWNlLFxuICBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZVxufSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKipcbiAqIENhbnZhcyBkcmF3ZXJcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2VyIGltcGxlbWVudHMgRHJhd2VySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgY2xhc3MgdG8gdXNlIGFzIHN1YnNjcmliZXIgbmFtZSBpbiBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlck5hbWU6IHN0cmluZyA9ICdEcmF3ZXInO1xuICAvKipcbiAgICogQ2FudmFzIERPTSBlbGVtZW50XG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfZG9tRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3ZpZXdDb25maWc6IFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlO1xuICAvKipcbiAgICogRHJhd2FibGUgb2JqZWN0cyBzdG9yYWdlXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfc3RvcmFnZTogRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlO1xuICAvKipcbiAgICogQ2FudmFzIGRyYXdpbmcgY29udGV4dFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgLyoqXG4gICAqIFJlc2l6ZSBvYnNlcnZlciBvYmplY3RcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9yZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG5cbiAgLyoqXG4gICAqIERyYXdlciBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gZG9tRWxlbWVudCAtIGNhbnZhcyBET00gZWxlbWVudFxuICAgKiBAcGFyYW0gdmlld0NvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBzdG9yYWdlIC0gZHJhd2FibGUgb2JqZWN0cyBzdG9yYWdlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgZG9tRWxlbWVudCxcbiAgICB2aWV3Q29uZmlnLFxuICAgIHN0b3JhZ2VcbiAgfTogRHJhd2VyQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5fdmlld0NvbmZpZyA9IHZpZXdDb25maWc7XG4gICAgdGhpcy5fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgdGhpcy5fY29udGV4dCA9IGRvbUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIHRoaXMuX2luaXRSZXNpemVPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRWaWV3Q29uZmlnT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9pbml0U3RvcmFnZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdE1vdXNlRXZlbnRzKCk7XG5cbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdygpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZSguLi50aGlzLl92aWV3Q29uZmlnLm9mZnNldCk7XG4gICAgdGhpcy5fY29udGV4dC5zY2FsZSguLi50aGlzLl92aWV3Q29uZmlnLnNjYWxlKTtcbiAgICB0aGlzLl9zdG9yYWdlLmxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmNvbmZpZy52aXNpYmxlKSB7XG4gICAgICAgIGl0ZW0uZHJhdyh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLnJlZnJlc2h9XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZG9tRWxlbWVudC53aWR0aCAhPT0gdGhpcy53aWR0aCkge1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RvbUVsZW1lbnQuaGVpZ2h0ICE9PSB0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygncmVmcmVzaGVkJyk7XG5cbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdlckludGVyZmFjZS5jbGVhcn1cbiAgICovXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBib3VuZHMgb2YgY2FudmFzIGZyYW1lXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm91bmRzKCk6IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQoWzAsIDBdKSxcbiAgICAgIHRoaXMuX3ZpZXdDb25maWcudHJhbnNwb3NlRm9yd2FyZChbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKSxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIGdldHRlclxuICAgKi9cbiAgZ2V0IHZpZXdDb25maWcoKTogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl92aWV3Q29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyBjb250ZXh0IGdldHRlclxuICAgKi9cbiAgZ2V0IGNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgd2lkdGggZ2V0dGVyXG4gICAqL1xuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgaGVpZ2h0IGdldHRlclxuICAgKi9cbiAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kb21FbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgY2FudmFzIHJlc2l6ZSBvYnNlcnZlclxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRSZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9kb21FbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdmlldyBjb25maWcgb2JzZXJ2ZXJcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0Vmlld0NvbmZpZ09ic2VydmVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZXdDb25maWcub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHN0b3JhZ2Ugb2JzZXJ2ZXJcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0U3RvcmFnZU9ic2VydmVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JhZ2Uub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIG1vdXNlIGV2ZW50cyBvYnNlcnZlclxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRNb3VzZUV2ZW50cygpOiB2b2lkIHtcbiAgICAvLyBUT0RPINGC0L7QttC1INC/0LXRgNC10L3QtdGB0YLQuCDQutGD0LTQsC3QvdC40LHRg9C00YxcbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50OiBXaGVlbEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQuY3RybEtleSkge1xuICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLl92aWV3Q29uZmlnLnNjYWxlWzBdO1xuICAgICAgICBzY2FsZSArPSBldmVudC5kZWx0YVkgKiAtMC4wMDI7XG4gICAgICAgIHNjYWxlID0gTWF0aC5taW4oTWF0aC5tYXgoMC4wMDEsIHNjYWxlKSwgMTAwKTtcbiAgICAgICAgdGhpcy5fdmlld0NvbmZpZy51cGRhdGVTY2FsZUluQ3Vyc29yQ29udGV4dChbc2NhbGUsIHNjYWxlXSwgW2V2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFldKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgdGhpcy5fdmlld0NvbmZpZy5vZmZzZXRbMF0gLT0gZXZlbnQuZGVsdGFZO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdmlld0NvbmZpZy5vZmZzZXRbMV0gLT0gZXZlbnQuZGVsdGFZO1xuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjb29yZHM6IFZlY3RvckFycmF5VHlwZSA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIGNvbnN0IGNvb3JkczE6IFZlY3RvckFycmF5VHlwZSA9IHRoaXMuX3ZpZXdDb25maWcudHJhbnNwb3NlRm9yd2FyZChjb29yZHMpO1xuICAgICAgY29uc3QgY29vcmRzMjogVmVjdG9yQXJyYXlUeXBlID0gdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VCYWNrd2FyZChjb29yZHMxKTtcbiAgICAgIGNvbnNvbGUubG9nKCdtb3VzZSBjb29yZHMnLCBjb29yZHMpO1xuICAgICAgY29uc29sZS5sb2coJ3JlYWwgY29vcmRzJywgY29vcmRzMSk7XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBsZXQgbW91c2VEb3duQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUgfCBudWxsID0gbnVsbDtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBtb3VzZURvd25Db29yZHMgPSBbZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WV07XG4gICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdncmFiYmluZyc7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgaWYgKG1vdXNlRG93bkNvb3JkcyA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdldy1yZXNpemUnO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdjcm9zc2hhaXInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtb3VzZU1vdmVDb29yZHM6IFZlY3RvckFycmF5VHlwZSA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2U6IFZlY3RvckFycmF5VHlwZSA9IFttb3VzZURvd25Db29yZHNbMF0tbW91c2VNb3ZlQ29vcmRzWzBdLCBtb3VzZURvd25Db29yZHNbMV0tbW91c2VNb3ZlQ29vcmRzWzFdXTtcbiAgICAgIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0ID0gW3RoaXMuX3ZpZXdDb25maWcub2Zmc2V0WzBdLWRpZmZlcmVuY2VbMF0sIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0WzFdLWRpZmZlcmVuY2VbMV1dO1xuICAgICAgbW91c2VEb3duQ29vcmRzID0gbW91c2VNb3ZlQ29vcmRzO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBtb3VzZURvd25Db29yZHMgPSBudWxsO1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIExpbmtlZERhdGFUeXBlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBWZWN0b3JBcnJheVR5cGUsXG4gIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBEcmF3YWJsZUlkVHlwZSxcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgRHJhd2FibGUgZnJvbSBcIi4uL3N0cnVjdHMvZHJhd2FibGVcIjtcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiBncmlkXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENvbmZpZ0ludGVyZmFjZSBleHRlbmRzIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgbWFpbkxpbmVDb2xvcjogc3RyaW5nO1xuICBzdWJMaW5lQ29sb3I6IHN0cmluZztcbiAgbGluZVdpZHRoOiBudW1iZXI7XG4gIGxpbmVzSW5CbG9jazogbnVtYmVyO1xufVxuXG4vKipcbiAqIEdyaWQgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ0dyaWQnO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IEdyaWRDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIEdyaWQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpZDogRHJhd2FibGVJZFR5cGUsIGNvbmZpZzogR3JpZENvbmZpZ0ludGVyZmFjZSwgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGRyYXdlci5jb250ZXh0LnNhdmUoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcblxuICAgIGNvbnN0IFtmcm9tQm91bmQsIHRvQm91bmRdID0gZHJhd2VyLmdldEJvdW5kcygpO1xuICAgIGNvbnN0IHNjYWxlID0gZHJhd2VyLnZpZXdDb25maWcuc2NhbGVbMF07XG5cbiAgICBkcmF3ZXIuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLl9jb25maWcubGluZVdpZHRoIC8gc2NhbGU7XG5cbiAgICBsZXQgc3RlcCA9IGRyYXdlci52aWV3Q29uZmlnLmdyaWRTdGVwO1xuXG4gICAgaWYoc2NhbGUgPCAxKSB7XG4gICAgICBzdGVwID0gc3RlcCooTWF0aC5wb3coMiwgTWF0aC5yb3VuZChNYXRoLmxvZzIoMS9zY2FsZSkpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ZXAgPSBzdGVwLyhNYXRoLnBvdygyLCBNYXRoLnJvdW5kKE1hdGgubG9nMihzY2FsZSkpKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFpbkxpbmVEaXN0YW5jZSA9IHN0ZXAqdGhpcy5fY29uZmlnLmxpbmVzSW5CbG9jaztcbiAgICBsZXQgeEdhcCA9IChmcm9tQm91bmRbMF0gJSBtYWluTGluZURpc3RhbmNlKTtcbiAgICBpZih4R2FwIDwgMCkge1xuICAgICAgeEdhcCArPSBtYWluTGluZURpc3RhbmNlO1xuICAgIH1cbiAgICBsZXQgeUdhcCA9IChmcm9tQm91bmRbMV0gJSBtYWluTGluZURpc3RhbmNlKTtcbiAgICBpZih5R2FwIDwgMCkge1xuICAgICAgeUdhcCArPSBtYWluTGluZURpc3RhbmNlO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGxldCBqPTA7XG4gICAgICBmb3IobGV0IGk9ZnJvbUJvdW5kWzFdLXlHYXA7IGk8PXRvQm91bmRbMV07IGkrPXN0ZXApIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSAoaisrICUgdGhpcy5fY29uZmlnLmxpbmVzSW5CbG9jayA9PT0gMClcbiAgICAgICAgICA/IHRoaXMuX2NvbmZpZy5tYWluTGluZUNvbG9yXG4gICAgICAgICAgOiB0aGlzLl9jb25maWcuc3ViTGluZUNvbG9yO1xuICAgICAgICB0aGlzLl9kcmF3SG9yaXpvbnRhbExpbmUoaSwgZHJhd2VyLCBjb2xvciwgW2Zyb21Cb3VuZCwgdG9Cb3VuZF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHtcbiAgICAgIGxldCBqPTA7XG4gICAgICBmb3IobGV0IGk9ZnJvbUJvdW5kWzBdLXhHYXA7IGk8PXRvQm91bmRbMF07IGkrPXN0ZXApIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSAoaisrICUgdGhpcy5fY29uZmlnLmxpbmVzSW5CbG9jayA9PT0gMClcbiAgICAgICAgICA/IHRoaXMuX2NvbmZpZy5tYWluTGluZUNvbG9yXG4gICAgICAgICAgOiB0aGlzLl9jb25maWcuc3ViTGluZUNvbG9yO1xuICAgICAgICB0aGlzLl9kcmF3VmVydGljYWxMaW5lKGksIGRyYXdlciwgY29sb3IsIFtmcm9tQm91bmQsIHRvQm91bmRdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5yZXN0b3JlKCk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBob3Jpem9udGFsIGxpbmVcbiAgICogQHBhcmFtIGRyYXdlclxuICAgKiBAcGFyYW0geU9mZnNldFxuICAgKiBAcGFyYW0gY29sb3JcbiAgICogQHBhcmFtIGZyb21Cb3VuZFxuICAgKiBAcGFyYW0gdG9Cb3VuZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kcmF3SG9yaXpvbnRhbExpbmUoXG4gICAgeU9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV1cbiAgKSB7XG4gICAgY29uc3QgbGluZUZyb20gPSBbZnJvbUJvdW5kWzBdLCB5T2Zmc2V0XTtcbiAgICBjb25zdCBsaW5lVG8gPSBbdG9Cb3VuZFswXSwgeU9mZnNldF07XG5cbiAgICBkcmF3ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGRyYXdlci5jb250ZXh0Lm1vdmVUbyhsaW5lRnJvbVswXSwgbGluZUZyb21bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LmxpbmVUbyhsaW5lVG9bMF0sIGxpbmVUb1sxXSk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHZlcnRpY2FsIGxpbmVcbiAgICogQHBhcmFtIGRyYXdlclxuICAgKiBAcGFyYW0geE9mZnNldFxuICAgKiBAcGFyYW0gY29sb3JcbiAgICogQHBhcmFtIGZyb21Cb3VuZFxuICAgKiBAcGFyYW0gdG9Cb3VuZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kcmF3VmVydGljYWxMaW5lKFxuICAgIHhPZmZzZXQ6IG51bWJlcixcbiAgICBkcmF3ZXI6IERyYXdlckludGVyZmFjZSxcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIFtmcm9tQm91bmQsIHRvQm91bmRdOiBbVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JBcnJheVR5cGVdXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW3hPZmZzZXQsIGZyb21Cb3VuZFsxXV07XG4gICAgY29uc3QgbGluZVRvID0gW3hPZmZzZXQsIHRvQm91bmRbMV1dO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIExpbmtlZERhdGFUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIEJhc2ljRmlndXJlRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIERyYXdhYmxlSWRUeXBlLFxufSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCBEcmF3YWJsZSBmcm9tIFwiLi4vc3RydWN0cy9kcmF3YWJsZVwiO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIHJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVjdENvbmZpZ0ludGVyZmFjZSBleHRlbmRzIEJhc2ljRmlndXJlRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuXG59XG5cbi8qKlxuICogUmVjdCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdCBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnUmVjdCc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUmVjdENvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogUmVjdCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBSZWN0Q29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9jb25maWcuc3Ryb2tlU3R5bGU7XG4gICAgZHJhd2VyLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fY29uZmlnLmZpbGxTdHlsZTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLl9jb25maWcubGluZVdpZHRoO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGxSZWN0KC4uLnRoaXMuX2NvbmZpZy5wb3NpdGlvbiwgLi4udGhpcy5fY29uZmlnLnNpemUpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVJlY3QoLi4udGhpcy5fY29uZmlnLnBvc2l0aW9uLCAuLi50aGlzLl9jb25maWcuc2l6ZSk7XG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIExpbmtlZERhdGFUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIEJhc2ljRmlndXJlRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIERyYXdhYmxlSWRUeXBlLFxufSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCBEcmF3YWJsZSBmcm9tIFwiLi4vc3RydWN0cy9kcmF3YWJsZVwiO1xuaW1wb3J0IHsgY3JlYXRlQmxvYiwgY3JlYXRlRWxlbWVudEZyb21IVE1MLCBjcmVhdGVVcmxGcm9tQmxvYiB9IGZyb20gXCIuLi9oZWxwZXJzL2Jhc2VcIjtcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiByZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFN2Z0NvbmZpZ0ludGVyZmFjZSBleHRlbmRzIEJhc2ljRmlndXJlRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU1ZHIGRhdGFcbiAgICovXG4gIGRhdGE6IHN0cmluZztcbn1cblxuLyoqXG4gKiBTdmcgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN2ZyBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnU3ZnJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBTdmdDb25maWdJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBJbWFnZSBET00gZWxlbWVudFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2ltZzogSFRNTEltYWdlRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTdmcgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpZDogRHJhd2FibGVJZFR5cGUsIGNvbmZpZzogU3ZnQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ltZyAhPT0gbnVsbCkge1xuICAgICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBkcmF3ZXIuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5faW1nLCAuLi50aGlzLl9jb25maWcucG9zaXRpb24pO1xuICAgICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zdCBzdmdFbGVtZW50OiBTVkdFbGVtZW50ID0gY3JlYXRlRWxlbWVudEZyb21IVE1MKHRoaXMuX2NvbmZpZy5kYXRhKSBhcyBTVkdFbGVtZW50O1xuICAgIGNvbnN0IGJsb2I6IEJsb2IgPSBjcmVhdGVCbG9iKHRoaXMuX2NvbmZpZy5kYXRhLCAnaW1hZ2Uvc3ZnK3htbCcpO1xuICAgIGNvbnN0IHVybDogc3RyaW5nID0gY3JlYXRlVXJsRnJvbUJsb2IoYmxvYik7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHVybDtcblxuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgLy8gVE9ETyDQstC+0LfQvNC+0LbQvdC+INGB0LvQtdC00YPQtdGCINC/0YDQuNC00YPQvNCw0YLRjCDQsdC+0LvQtdC1INGN0LvQtdCz0LDQvdGC0L3QvtC1INGA0LXRiNC10L3QuNC1XG4gICAgICAvLyDQutCw0Log0LLQsNGA0LjQsNC90YIsINGB0LTQtdC70LDRgtGMINC10LTQuNC90L7QtSDRhdGA0LDQvdC40LvQuNGJ0LUg0LLRgdC10YUg0YDQsNC90LXQtSDQt9Cw0LPRgNGD0LbQtdC90L3Ri9GFIElNR1xuICAgICAgdGhpcy5faW1nID0gaW1nO1xuICAgICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhcnJheXMgYXJlIGVxdWFsIGFuZCBmYWxzZSBlbHNlXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gbGhzIC0gZmlyc3QgYXJyYXkgdG8gY29tcGFyZVxuICogQHBhcmFtIHJocyAtIHNlY29uZCBhcnJheSB0byBjb21wYXJlXG4gKi9cbmltcG9ydCB7IFZlY3RvckFycmF5VHlwZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXJlQXJyYXlzRXF1YWwobGhzOiBBcnJheTx1bmtub3duPiwgcmhzOiBBcnJheTx1bmtub3duPik6IGJvb2xlYW4ge1xuICByZXR1cm4gbGhzLmxlbmd0aCA9PT0gcmhzLmxlbmd0aCAmJiBsaHMuZXZlcnkoKHYsIGkpID0+IHYgPT09IHJoc1tpXSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBET00gZWxlbWVudCBmcm9tIEhUTUwgc3RyaW5nXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gaHRtbFN0cmluZyAtIEhUTUwgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50RnJvbUhUTUwoaHRtbFN0cmluZzogc3RyaW5nKTogdW5rbm93biB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gaHRtbFN0cmluZy50cmltKCk7XG5cbiAgcmV0dXJuIGRpdi5maXJzdENoaWxkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYmxvYiBmcm9tIHRleHRcbiAqIEBwYXJhbSBkYXRhIC0gdGV4dFxuICogQHBhcmFtIHR5cGUgLSB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCbG9iKGRhdGE6IHN0cmluZywgdHlwZTogc3RyaW5nKTogQmxvYiB7XG4gIHJldHVybiBuZXcgQmxvYihbZGF0YV0sIHt0eXBlOiB0eXBlfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBVUkwgZnJvbSBibG9iXG4gKiBAcGFyYW0gYmxvYiAtIGJsb2JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVybEZyb21CbG9iKGJsb2I6IEJsb2IpOiBzdHJpbmcge1xuICBjb25zdCBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93O1xuICAvLyBAdHMtaWdub3JlXG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufVxuXG4vKipcbiAqIEZpbmRzIGFuZCByZXR1cm5zIG1pbmltYWwgKGxlZnQtdG9wKSBwb3NpdGlvblxuICogQHBhcmFtIHBvc2l0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWluUG9zaXRpb24ocG9zaXRpb25zOiBWZWN0b3JBcnJheVR5cGVbXSk6IFZlY3RvckFycmF5VHlwZSB7XG4gIGxldCBtaW5YOiBudW1iZXIgPSBJbmZpbml0eTtcbiAgbGV0IG1pblk6IG51bWJlciA9IEluZmluaXR5O1xuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKHBvc2l0aW9uID0+IHtcbiAgICBpZiAocG9zaXRpb25bMF0gPCBtaW5YKSB7XG4gICAgICBtaW5YID0gcG9zaXRpb25bMF07XG4gICAgfVxuICAgIGlmIChwb3NpdGlvblsxXSA8IG1pblkpIHtcbiAgICAgIG1pblkgPSBwb3NpdGlvblsxXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBbbWluWCwgbWluWV07XG59XG4iLCJpbXBvcnQgeyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLCBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbi8qKlxuICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVIZWxwZXIgaW1wbGVtZW50cyBPYnNlcnZlSGVscGVySW50ZXJmYWNlIHtcbiAgICAvKipcbiAgICAgKiBIYW5kbGVycyBtYXBwZWQgYnkgc3Vic2NyaWJlcnNcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9oYW5kbGVyTWFwOiBSZWNvcmQ8c3RyaW5nLCBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlPiA9IHt9O1xuICAgIC8qKlxuICAgICAqIEZsYWcgZm9yIG11dGluZyBoYW5kbGVyc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX211dGVIYW5kbGVyczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uub25DaGFuZ2V9XG4gICAgICovXG4gICAgcHVibGljIG9uQ2hhbmdlKFxuICAgICAgc3Vic2NyaWJlck5hbWU6IHN0cmluZyxcbiAgICAgIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGVcbiAgICApOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faGFuZGxlck1hcFtzdWJzY3JpYmVyTmFtZV0gPSBoYW5kbGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLm9mZkNoYW5nZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgb2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2hhbmRsZXJNYXBbc3Vic2NyaWJlck5hbWVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzfVxuICAgICAqL1xuICAgIHB1YmxpYyBwcm9jZXNzV2l0aE11dGVIYW5kbGVycyhcbiAgICAgICAgZXh0cmE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9IG51bGxcbiAgICApOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NIYW5kbGVycyhtdXRlZEJlZm9yZSwgZXh0cmEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS53aXRoTXV0ZUhhbmRsZXJzfVxuICAgICAqL1xuICAgIHB1YmxpYyB3aXRoTXV0ZUhhbmRsZXJzKFxuICAgICAgICBhY3Rpb246IChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4gdm9pZFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5fbXV0ZUhhbmRsZXJzKSB7XG4gICAgICAgICAgICBhY3Rpb24odHJ1ZSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tdXRlSGFuZGxlcnMgPSB0cnVlO1xuICAgICAgICAgICAgYWN0aW9uKGZhbHNlLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX211dGVIYW5kbGVycyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UucHJvY2Vzc0hhbmRsZXJzfVxuICAgICAqL1xuICAgIHB1YmxpYyBwcm9jZXNzSGFuZGxlcnMoXG4gICAgICAgIGlzTXV0ZWQ6IGJvb2xlYW4sXG4gICAgICAgIGV4dHJhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPSBudWxsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghaXNNdXRlZCkge1xuICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLl9oYW5kbGVyTWFwKVxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKGhhbmRsZXIgPT4gaGFuZGxlcih0aGlzLCBleHRyYSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlR3JvdXBJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSwgVmVjdG9yQXJyYXlUeXBlXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gXCIuL2RyYXdhYmxlXCI7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tIFwiLi92ZWN0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2FibGVHcm91cCBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVHcm91cEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZXJOYW1lOiAnRHJhd2FibGVHcm91cCc7XG4gIC8qKlxuICAgKiBMaXN0IG9mIG9iamVjdHMgaW4gZ3JvdXBcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9saXN0OiBEcmF3YWJsZUludGVyZmFjZVtdO1xuXG4gIC8qKlxuICAgKiBEcmF3YWJsZUdyb3VwIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIGdyb3VwIElEXG4gICAqIEBwYXJhbSBjb25maWcgLSBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBleHRyYSBkYXRhXG4gICAqIEBwYXJhbSBsaXN0IC0gbGlzdCBvZiBncm91cGVkIG9iamVjdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGlkOiBEcmF3YWJsZUlkVHlwZSxcbiAgICBjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICAgIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30sXG4gICAgbGlzdDogRHJhd2FibGVJbnRlcmZhY2VbXVxuICApIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub25DaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICh0YXJnZXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdhc2Rhc2QnLCB0YXJnZXQpO1xuICAgIH0pO1xuXG4gICAgLy8gVE9ETyDQvdGD0LbQtdC9INC70Lgg0LfQtNC10YHRjCBQcm94eT9cbiAgICB0aGlzLl9saXN0ID0gbmV3IFByb3h5KGxpc3QgYXMgRHJhd2FibGVJbnRlcmZhY2VbXSwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBEcmF3YWJsZUludGVyZmFjZVtdLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgKHRhcmdldFtpbmRleCBhcyBrZXlvZiBEcmF3YWJsZUludGVyZmFjZVtdXSBhcyB1bmtub3duKSA9IHZhbHVlIGFzIHVua25vd247XG4gICAgICAgIHJldHVybiB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy52aXNpYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZHJhd2VyLmNvbnRleHQuc2F2ZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LnRyYW5zbGF0ZSguLi50aGlzLmNvbmZpZy5wb3NpdGlvbik7XG4gICAgdGhpcy5fbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmRyYXcoZHJhd2VyKTtcbiAgICB9KTtcbiAgICBkcmF3ZXIuY29udGV4dC5yZXN0b3JlKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgbGlzdCgpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxufSIsImltcG9ydCB7XG4gIERyYXdhYmxlU3RvcmFnZUZpbHRlckNhbGxiYWNrVHlwZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsXG4gIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUsIERyYXdhYmxlU3RvcmFnZUZpbHRlckNvbmZpZ0ludGVyZmFjZSwgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IE9ic2VydmVIZWxwZXIgZnJvbSBcIi4uL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXJcIjtcbmltcG9ydCB7IHVwZGF0ZUZpbGVXaXRoVGV4dCB9IGZyb20gXCJ0cy1sb2FkZXIvZGlzdC9zZXJ2aWNlc0hvc3RcIjtcbmltcG9ydCBEcmF3YWJsZUdyb3VwIGZyb20gXCIuL2RyYXdhYmxlLWdyb3VwXCI7XG5pbXBvcnQgeyBnZXRNaW5Qb3NpdGlvbiB9IGZyb20gXCIuLi9oZWxwZXJzL2Jhc2VcIjtcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG4vKipcbiAqIFN0b3JhZ2UgZm9yIGRyYXdhYmxlIG9iamVjdHNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2FibGVTdG9yYWdlIGltcGxlbWVudHMgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgY2xhc3MgdG8gdXNlIGFzIHN1YnNjcmliZXIgbmFtZSBpbiBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlck5hbWU6ICdEcmF3YWJsZVN0b3JhZ2UnO1xuICAvKipcbiAgICogTGlzdCBvZiBzdG9yZWQgZHJhd2FibGUgb2JqZWN0c1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xpc3Q6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcbiAgLyoqXG4gICAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX29ic2VydmVIZWxwZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpdGVtcyAtIGJhdGNoIGxpc3QgdG8gYWRkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpdGVtczogRHJhd2FibGVJbnRlcmZhY2VbXSkge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuYWRkQmF0Y2goaXRlbXMpO1xuICAgIHRoaXMuX3NvcnQoKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub25DaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICh0YXJnZXQsIGV4dHJhKSA9PiB7XG4gICAgICBpZiAoZXh0cmEgIT09IG51bGwgJiYgZXh0cmEuaGFzT3duUHJvcGVydHkoJ3pJbmRleENoYW5nZWQnKSAmJiBleHRyYS56SW5kZXhDaGFuZ2VkKSB7XG4gICAgICAgIHRoaXMuX3NvcnQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9yZWQgZHJhd2FibGUgb2JqZWN0cyBsaXN0IGdldHRlclxuICAgKi9cbiAgZ2V0IGxpc3QoKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3Q7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5hZGR9XG4gICAqL1xuICBwdWJsaWMgYWRkKGl0ZW06IERyYXdhYmxlSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaXRlbS5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICh0YXJnZXQsIGV4dHJhKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyhleHRyYSk7XG4gICAgfSk7XG4gICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xuICAgIHRoaXMuX3NvcnQoKTtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5hZGR9XG4gICAqL1xuICBwdWJsaWMgYWRkQmF0Y2goaXRlbXM6IERyYXdhYmxlSW50ZXJmYWNlW10pOiB2b2lkIHtcbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICh0YXJnZXQsIGV4dHJhKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKGV4dHJhKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICAgIHRoaXMuX3NvcnQoKTtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBvYmplY3RzIGZvdW5kIGJ5IGNvbmZpZyBmcm9tIHN0b3JhZ2VcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgcHVibGljIGRlbGV0ZShjb25maWc6IERyYXdhYmxlU3RvcmFnZUZpbHRlckNvbmZpZ0ludGVyZmFjZSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIGNvbnN0IHJlc3VsdDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKCgpID0+IHtcbiAgICAgIHRoaXMuZmluZChjb25maWcpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZGVsZXRlQnlJZChpdGVtLmlkKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgb2JqZWN0IGJ5IElEIGZyb20gc3RvcmFnZVxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIHB1YmxpYyBkZWxldGVCeUlkKGlkOiBEcmF3YWJsZUlkVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3QuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuXG4gICAgaWYoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gICAgICBjb25zdCBkZWxldGVkSXRlbSA9IHRoaXMuX2xpc3Quc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgIGRlbGV0ZWRJdGVtLm9mZlZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUpO1xuICAgICAgcmV0dXJuIGRlbGV0ZWRJdGVtO1xuICAgIH1cblxuICAgIC8vIFRPRE8gY3VzdG9taXplIGV4Y2VwdGlvblxuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGZpbmQgb2JqZWN0IHdpdGggaWQgJyR7aWR9J2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuY2xlYXJ9XG4gICAqL1xuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZmluZH1cbiAgICovXG4gIHB1YmxpYyBmaW5kKGNvbmZpZzogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmQoaXRlbSA9PiB7XG4gICAgICBpZiAoY29uZmlnLmlkc09ubHkgJiYgY29uZmlnLmlkc09ubHkuaW5kZXhPZihpdGVtLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChjb25maWcuaWRzRXhjZXB0ICYmIGNvbmZpZy5pZHNFeGNlcHQuaW5kZXhPZihpdGVtLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnR5cGVzT25seSAmJiBjb25maWcudHlwZXNPbmx5LmluZGV4T2YoaXRlbS50eXBlKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChjb25maWcudHlwZXNFeGNlcHQgJiYgY29uZmlnLnR5cGVzRXhjZXB0LmluZGV4T2YoaXRlbS50eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gIShjb25maWcuZXh0cmFGaWx0ZXIgJiYgIWNvbmZpZy5leHRyYUZpbHRlcihpdGVtKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5maW5kQnlJZH1cbiAgICovXG4gIHB1YmxpYyBmaW5kQnlJZChpZDogRHJhd2FibGVJZFR5cGUpOiBEcmF3YWJsZUludGVyZmFjZSB7XG4gICAgY29uc3QgZm91bmRJdGVtcyA9IHRoaXMuX2ZpbmQoY2FuZGlkYXRlID0+IGNhbmRpZGF0ZS5pZCA9PT0gaWQpO1xuICAgIGlmIChmb3VuZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZvdW5kSXRlbXNbMF07XG4gICAgfVxuICAgIC8vIFRPRE8gY3VzdG9taXplIGV4Y2VwdGlvblxuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGZpbmQgb2JqZWN0IHdpdGggaWQgJyR7aWR9J2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZ3JvdXB9XG4gICAqL1xuICBwdWJsaWMgZ3JvdXAoaWRzOiBEcmF3YWJsZUlkVHlwZVtdKTogRHJhd2FibGVHcm91cCB7XG4gICAgY29uc3QgZ3JvdXBJdGVtcyA9IHRoaXMuZGVsZXRlKHsgaWRzT25seTogaWRzIH0pO1xuICAgIGNvbnN0IG1pblBvc2l0aW9uID0gZ2V0TWluUG9zaXRpb24oZ3JvdXBJdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmNvbmZpZy5wb3NpdGlvbikpO1xuXG4gICAgY29uc3QgY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSA9IHtcbiAgICAgIHBvc2l0aW9uOiBtaW5Qb3NpdGlvbixcbiAgICAgIHpJbmRleDogTWF0aC5tYXgoLi4uZ3JvdXBJdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmNvbmZpZy56SW5kZXgpKSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxuICAgIH07XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKCkgPT4ge1xuICAgICAgZ3JvdXBJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLm1vdmVQb3NpdGlvbihcbiAgICAgICAgICBjcmVhdGVWZWN0b3IobWluUG9zaXRpb24pLmludmVyc2UoKS50b0FycmF5KClcbiAgICAgICAgKVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBncm91cElkID0gJ2dyb3VwLScrKG5ldyBEYXRlKCkpLmdldFRpbWUoKSsnLScrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMCk7XG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgRHJhd2FibGVHcm91cChncm91cElkLCBjb25maWcsIHt9LCBncm91cEl0ZW1zKTtcbiAgICB0aGlzLmFkZChncm91cCk7XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS51bmdyb3VwfVxuICAgKi9cbiAgcHVibGljIHVuZ3JvdXAoZ3JvdXBJZDogRHJhd2FibGVJZFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cDogRHJhd2FibGVHcm91cCA9IHRoaXMuZGVsZXRlQnlJZChncm91cElkKSBhcyBEcmF3YWJsZUdyb3VwO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKCgpID0+IHtcbiAgICAgIGdyb3VwLmxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5tb3ZlUG9zaXRpb24oZ3JvdXAuY29uZmlnLnBvc2l0aW9uKVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZEJhdGNoKGdyb3VwLmxpc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgb25WaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9uQ2hhbmdlKHN1YnNjcmliZXJOYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIG9iamVjdHMgaW4gc3RvcmFnZSBieSBmaWx0ZXIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIGZpbHRlciAtIGZpbHRlciBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIF9maW5kKGZpbHRlcjogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ2FsbGJhY2tUeXBlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG5cbiAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChmaWx0ZXIoaXRlbSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdGhlIHN0b3JlZCBvYmplY3RzIGJ5IHotaW5kZXhcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9zb3J0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdzb3J0Jyk7XG4gICAgdGhpcy5fbGlzdC5zb3J0KChsaHMsIHJocykgPT4gbGhzLmNvbmZpZy56SW5kZXggLSByaHMuY29uZmlnLnpJbmRleCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG4gIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsIFZlY3RvckFycmF5VHlwZSwgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSxcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBhcmVBcnJheXNFcXVhbCB9IGZyb20gXCIuLi9oZWxwZXJzL2Jhc2VcIjtcbmltcG9ydCBPYnNlcnZlSGVscGVyIGZyb20gXCIuLi9oZWxwZXJzL29ic2VydmUtaGVscGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tIFwiLi92ZWN0b3JcIjtcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBmb3IgZHJhd2FibGUgb2JqZWN0c1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCBJRFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2lkOiBEcmF3YWJsZUlkVHlwZTtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuICAvKipcbiAgICogRXh0cmEgbGlua2VkIGRhdGFcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kYXRhOiBMaW5rZWREYXRhVHlwZTtcbiAgLyoqXG4gICAqIE9ic2VydmUgaGVscGVyXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfb2JzZXJ2ZUhlbHBlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZTtcblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLnNldFBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIHNldFBvc2l0aW9uKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fY29uZmlnLnBvc2l0aW9uID0gY29vcmRzO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5tb3ZlUG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgbW92ZVBvc2l0aW9uKG9mZnNldDogVmVjdG9yQXJyYXlUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5zZXRQb3NpdGlvbihcbiAgICAgIGNyZWF0ZVZlY3Rvcih0aGlzLl9jb25maWcucG9zaXRpb24pXG4gICAgICAgIC5hZGQoY3JlYXRlVmVjdG9yKG9mZnNldCkpXG4gICAgICAgIC50b0FycmF5KClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBJRCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgaWQoKTogRHJhd2FibGVJZFR5cGUge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUeXBlIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBzZXR0ZXJcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqL1xuICBwdWJsaWMgc2V0IGNvbmZpZyhjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKE9iamVjdC5lbnRyaWVzKGNvbmZpZyksIE9iamVjdC5lbnRyaWVzKHRoaXMuX2NvbmZpZykpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKCgobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIGNvbnN0IGlzWkluZGV4Q2hhbmdlZCA9IGNvbmZpZy56SW5kZXggIT09IHRoaXMuX2NvbmZpZy56SW5kZXg7XG5cbiAgICAgIE9iamVjdC5lbnRyaWVzKGNvbmZpZykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICh0aGlzLl9jb25maWdba2V5IGFzIGtleW9mIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlXSBhcyB1bmtub3duKSA9IHZhbHVlIGFzIHVua25vd247XG4gICAgICB9KTtcblxuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSwge1xuICAgICAgICB6SW5kZXhDaGFuZ2VkOiBpc1pJbmRleENoYW5nZWQsXG4gICAgICB9KTtcbiAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rZWQgZGF0YSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBMaW5rZWREYXRhVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm9uVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvblZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZywgaGFuZGxlcjogVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub25DaGFuZ2Uoc3Vic2NyaWJlck5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5vZmZWaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZlZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3YWJsZSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSkge1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlciA9IG5ldyBPYnNlcnZlSGVscGVyKCk7XG4gICAgdGhpcy5fY29uZmlnID0gbmV3IFByb3h5KGNvbmZpZywge1xuICAgICAgc2V0OiAodGFyZ2V0OiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gIT09IHZhbHVlO1xuICAgICAgICAodGFyZ2V0W2luZGV4IGFzIGtleW9mIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlXSBhcyB1bmtub3duKSA9IHZhbHVlIGFzIHVua25vd247XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKHtcbiAgICAgICAgICB6SW5kZXhDaGFuZ2VkOiBpbmRleCA9PT0gJ3pJbmRleCcsXG4gICAgICAgIH0pIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fZGF0YSA9IG5ldyBQcm94eShkYXRhLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IExpbmtlZERhdGFUeXBlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIExpbmtlZERhdGFUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgIHRhcmdldFtpbmRleCBhcyBrZXlvZiBMaW5rZWREYXRhVHlwZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUsIFZlY3RvckludGVyZmFjZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG4vKipcbiAqIFZlY3RvciBjbGFzc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IgaW1wbGVtZW50cyBWZWN0b3JJbnRlcmZhY2Uge1xuICAvKipcbiAgICogQ29vcmRpbmF0ZSBYXG4gICAqL1xuICBwdWJsaWMgeDogbnVtYmVyO1xuICAvKipcbiAgICogQ29vcmRpbmF0ZSBZXG4gICAqL1xuICBwdWJsaWMgeTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBWZWN0b3IgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHggLSBjb29yZGluYXRlIFhcbiAgICogQHBhcmFtIHkgLSBjb29yZGluYXRlIFlcbiAgICovXG4gIGNvbnN0cnVjdG9yKFt4LCB5XTogVmVjdG9yQXJyYXlUeXBlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbm90aGVyIHZlY3RvciB0byB0aGlzIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIHZlY3RvciB0byBhZGRcbiAgICovXG4gIGFkZCh2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyB2ZWN0b3Igd2l0aCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIHZlY3RvciB0byBzdWJ0cmFjdFxuICAgKi9cbiAgc3ViKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgdGhpcy54IC09IHYueDtcbiAgICB0aGlzLnkgLT0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbGVzIHZlY3RvciBieSBudW1iZXJcbiAgICogQHBhcmFtIG11bCAtIG11bHRpcGxpZXJcbiAgICovXG4gIG11bChtdWw6IG51bWJlcik6IFZlY3RvciB7XG4gICAgdGhpcy54ICo9IG11bDtcbiAgICB0aGlzLnkgKj0gbXVsO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlcyB2ZWN0b3IgYnkgbnVtYmVyXG4gICAqIEBwYXJhbSBkaXYgLSBkaXZpZGVyXG4gICAqL1xuICBkaXYoZGl2OiBudW1iZXIpOiBWZWN0b3Ige1xuICAgIHRoaXMueCAvPSBkaXY7XG4gICAgdGhpcy55IC89IGRpdjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVyc2VzIHZlY3RvclxuICAgKi9cbiAgaW52ZXJzZSgpOiBWZWN0b3Ige1xuICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgdGhpcy55ID0gLXRoaXMueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldmVyc2VzIHZlY3RvclxuICAgKi9cbiAgcmV2ZXJzZSgpOiBWZWN0b3Ige1xuICAgIHRoaXMueCA9IDEvdGhpcy54O1xuICAgIHRoaXMueSA9IDEvdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHZlY3RvclxuICAgKi9cbiAgbGVuKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLngqdGhpcy54ICsgdGhpcy55KnRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkaXN0YW5jZSB2ZWN0b3Igb2YgdGhpcyBhbmQgYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgZGlzdGFuY2UodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnN1Yih2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZXMgdmVjdG9yXG4gICAqL1xuICBjbG9uZSgpOiBWZWN0b3Ige1xuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMudG9BcnJheSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB2ZWN0b3IgdG8gYXJyYXlcbiAgICovXG4gIHRvQXJyYXkoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55XTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgbmV3IHZlY3RvclxuICogQHB1YmxpY1xuICogQHBhcmFtIGNvb3JkcyAtIGNvb3JkaW5hdGVzIG9mIG5ldyB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZlY3Rvcihjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvciB7XG4gIHJldHVybiBuZXcgVmVjdG9yKGNvb3Jkcyk7XG59XG4iLCJpbXBvcnQge1xuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWZWN0b3JBcnJheVR5cGUsXG4gIFZpZXdDb25maWdJbnRlcmZhY2UsXG4gIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgYXJlQXJyYXlzRXF1YWwgfSBmcm9tIFwiLi4vaGVscGVycy9iYXNlXCI7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tIFwiLi4vaGVscGVycy9vYnNlcnZlLWhlbHBlclwiO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSBcIi4vdmVjdG9yXCI7XG5cbi8qKlxuICogQ29uZmlnIGZvciBvYmplY3RzIGRyYXdhYmxlIG9uIGNhbnZhc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29uZmlnIGltcGxlbWVudHMgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU2NhbGVcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9zY2FsZTogVmVjdG9yQXJyYXlUeXBlO1xuICAvKipcbiAgICogT2Zmc2V0XG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfb2Zmc2V0OiBWZWN0b3JBcnJheVR5cGU7XG4gIC8qKlxuICAgKiBHcmlkIHN0ZXBcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9ncmlkU3RlcDogbnVtYmVyO1xuICAvKipcbiAgICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfb2JzZXJ2ZUhlbHBlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZTtcblxuICAvKipcbiAgICogVmlld0NvbmZpZyBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0XG4gICAqIEBwYXJhbSBncmlkU3RlcCAtIGdyaWQgc3RlcFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBzY2FsZSwgb2Zmc2V0LCBncmlkU3RlcCB9OiBWaWV3Q29uZmlnSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlciA9IG5ldyBPYnNlcnZlSGVscGVyKCk7XG4gICAgdGhpcy5fc2NhbGUgPSBuZXcgUHJveHkoc2NhbGUsIHtcbiAgICAgIHNldDogKHRhcmdldDogVmVjdG9yQXJyYXlUeXBlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gIT09IHZhbHVlO1xuICAgICAgICB0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fb2Zmc2V0ID0gbmV3IFByb3h5KG9mZnNldCwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBWZWN0b3JBcnJheVR5cGUsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgIHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCkgOiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLl9ncmlkU3RlcCA9IGdyaWRTdGVwO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS5vblZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25WaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9uQ2hhbmdlKHN1YnNjcmliZXJOYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudHJhbnNwb3NlRm9yd2FyZH1cbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VGb3J3YXJkKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XG4gICAgcmV0dXJuIFsoeCAtIHRoaXMuX29mZnNldFswXSkvdGhpcy5fc2NhbGVbMF0sICh5IC0gdGhpcy5fb2Zmc2V0WzFdKS90aGlzLl9zY2FsZVsxXV07XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLnRyYW5zcG9zZUJhY2t3YXJkfVxuICAgKi9cbiAgcHVibGljIHRyYW5zcG9zZUJhY2t3YXJkKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XG4gICAgcmV0dXJuIFt4KnRoaXMuX3NjYWxlWzBdICsgdGhpcy5fb2Zmc2V0WzBdLCB5KnRoaXMuX3NjYWxlWzFdICsgdGhpcy5fb2Zmc2V0WzFdXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudXBkYXRlU2NhbGVJbkN1cnNvckNvbnRleHR9XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlU2NhbGVJbkN1cnNvckNvbnRleHQobmV3U2NhbGU6IFZlY3RvckFycmF5VHlwZSwgY3Vyc29yQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwobmV3U2NhbGUsIHRoaXMuX3NjYWxlKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIGNvbnN0IG9sZFNjYWxlUG9zaXRpb24gPSBjcmVhdGVWZWN0b3IodGhpcy50cmFuc3Bvc2VGb3J3YXJkKGN1cnNvckNvb3JkcykpO1xuICAgICAgdGhpcy5zY2FsZSA9IG5ld1NjYWxlO1xuICAgICAgY29uc3QgbmV3U2NhbGVQb3NpdGlvbiA9IGNyZWF0ZVZlY3Rvcih0aGlzLnRyYW5zcG9zZUZvcndhcmQoY3Vyc29yQ29vcmRzKSk7XG4gICAgICBjb25zdCBkaWZmZXJlbmNlID0gbmV3U2NhbGVQb3NpdGlvbi5jbG9uZSgpLnN1YihvbGRTY2FsZVBvc2l0aW9uKTtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy50cmFuc3Bvc2VCYWNrd2FyZChkaWZmZXJlbmNlLnRvQXJyYXkoKSk7XG5cbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYWxsIHRoZSBkYXRhIGluIGNvbmZpZ1xuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0XG4gICAqIEBwYXJhbSBncmlkU3RlcCAtIGdyaWQgc3RlcFxuICAgKi9cbiAgdXBkYXRlKHsgc2NhbGUsIG9mZnNldCwgZ3JpZFN0ZXAgfTogVmlld0NvbmZpZ0ludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChzY2FsZSwgdGhpcy5fc2NhbGUpIHx8ICFhcmVBcnJheXNFcXVhbChvZmZzZXQsIHRoaXMuX29mZnNldCk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgIHRoaXMuZ3JpZFN0ZXAgPSBncmlkU3RlcDtcblxuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgZ2V0dGVyXG4gICAqL1xuICBnZXQgc2NhbGUoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgc2V0dGVyXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqL1xuICBzZXQgc2NhbGUoc2NhbGU6IFZlY3RvckFycmF5VHlwZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChzY2FsZSwgdGhpcy5fc2NhbGUpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5fc2NhbGVbMF0gPSBzY2FsZVswXTtcbiAgICAgIHRoaXMuX3NjYWxlWzFdID0gc2NhbGVbMV07XG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZzZXQgZ2V0dGVyXG4gICAqL1xuICBnZXQgb2Zmc2V0KCk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZzZXQgc2V0dGVyXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICovXG4gIHNldCBvZmZzZXQob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwob2Zmc2V0LCB0aGlzLl9vZmZzZXQpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5fb2Zmc2V0WzBdID0gb2Zmc2V0WzBdO1xuICAgICAgdGhpcy5fb2Zmc2V0WzFdID0gb2Zmc2V0WzFdO1xuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR3JpZCBzdGVwIGdldHRlclxuICAgKi9cbiAgZ2V0IGdyaWRTdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWRTdGVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyaWQgc3RlcCBzZXR0ZXJcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBzZXQgZ3JpZFN0ZXAoZ3JpZFN0ZXA6IG51bWJlcikge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9IGdyaWRTdGVwICE9PSB0aGlzLl9ncmlkU3RlcDtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuX2dyaWRTdGVwID0gZ3JpZFN0ZXA7XG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRHJhd2VyIGZyb20gXCIuL2NhbnZhcy9kcmF3ZXJcIjtcbmltcG9ydCBSZWN0IGZyb20gXCIuL2NhbnZhcy9maWd1cmVzL3JlY3RcIjtcbmltcG9ydCBEcmF3YWJsZVN0b3JhZ2UgZnJvbSBcIi4vY2FudmFzL3N0cnVjdHMvZHJhd2FibGUtc3RvcmFnZVwiO1xuaW1wb3J0IHsgRHJhd2FibGVJbnRlcmZhY2UsIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlIH0gZnJvbSBcIi4vY2FudmFzL3R5cGVzXCI7XG5pbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi9jYW52YXMvc3RydWN0cy92aWV3LWNvbmZpZ1wiO1xuaW1wb3J0IEdyaWQgZnJvbSBcIi4vY2FudmFzL2ZpZ3VyZXMvZ3JpZFwiO1xuaW1wb3J0IFN2ZyBmcm9tIFwiLi9jYW52YXMvZmlndXJlcy9zdmdcIjtcbmltcG9ydCBEcmF3YWJsZUdyb3VwIGZyb20gXCIuL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlLWdyb3VwXCI7XG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgRHJhd2FibGVTdG9yYWdlKFtcbiAgbmV3IEdyaWQoMSwge1xuICAgIHBvc2l0aW9uOiBbMCwgMF0sXG4gICAgekluZGV4OiAtSW5maW5pdHksXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBtYWluTGluZUNvbG9yOiAnI2JiYicsXG4gICAgc3ViTGluZUNvbG9yOiAnI2RlZGVkZScsXG4gICAgbGluZVdpZHRoOiAxLFxuICAgIGxpbmVzSW5CbG9jazogNSxcbiAgfSksXG4gIG5ldyBSZWN0KDIsIHtcbiAgICBwb3NpdGlvbjogWzEwLCAyMF0sXG4gICAgc2l6ZTogWzEwMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGZpbGxTdHlsZTogJ2dyZWVuJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pLFxuICBuZXcgUmVjdCgzLCB7XG4gICAgcG9zaXRpb246IFsxMCwgMjVdLFxuICAgIHNpemU6IFs1MCwgNTBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGZpbGxTdHlsZTogJ2JsdWUnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG4gIG5ldyBSZWN0KDQsIHtcbiAgICBwb3NpdGlvbjogWzcwMCwgMjUwXSxcbiAgICBzaXplOiBbMTUwLCAxMDBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGZpbGxTdHlsZTogJ2JsdWUnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG4gIG5ldyBTdmcoNSwge1xuICAgIHBvc2l0aW9uOiBbMzAwLCA1NTBdLFxuICAgIHNpemU6IFsxNTAsIDEwMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZGF0YTogXCI8c3ZnIHdpZHRoPScxNjInIGhlaWdodD0nODInIHZpZXdCb3g9JzAgMCAxNjIgODInIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTI4LjY5MjMgMUwxIDQwLjEyNDFMMjguNjkyMyA4MUgxMzQuNjc1TDE2MSA0MC4xMjQxTDEzNC42NzUgMUgyOC42OTIzWicgZmlsbD0nI0ZGQkNGMicgc3Ryb2tlPSdibGFjaycgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgLz48L3N2Zz5cIixcbiAgICBmaWxsU3R5bGU6ICdibHVlJywgLy8gVE9ETyDQvdC1INC90YPQttC90YtcbiAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pLFxuICBuZXcgUmVjdCg2LCB7XG4gICAgcG9zaXRpb246IFszMDAsIDMwMF0sXG4gICAgc2l6ZTogWzMwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFJlY3QoNywge1xuICAgIHBvc2l0aW9uOiBbMzUwLCAzMDBdLFxuICAgIHNpemU6IFszMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG4gIG5ldyBSZWN0KDgsIHtcbiAgICBwb3NpdGlvbjogWzMwMCwgMzUwXSxcbiAgICBzaXplOiBbMzAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pLFxuXSk7XG5cbmNvbnN0IGdyb3VwID0gc3RvcmFnZS5ncm91cChbNiwgNywgOF0pO1xuLy8gc3RvcmFnZS51bmdyb3VwKGdyb3VwLmlkKTtcblxuY29uc29sZS5sb2coc3RvcmFnZSk7XG5cbmNvbnN0IHZpZXdDb25maWc6IFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlID0gbmV3IFZpZXdDb25maWcoe1xuICBzY2FsZTogWzEsIDFdLFxuICBvZmZzZXQ6IFswLCAwXSxcbiAgZ3JpZFN0ZXA6IDE1LFxufSk7XG5jb25zb2xlLmxvZyh2aWV3Q29uZmlnKTtcblxuY29uc3QgZHJhd2VyOiBEcmF3ZXIgPSBuZXcgRHJhd2VyKHtcbiAgZG9tRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50LFxuICB2aWV3Q29uZmlnLFxuICBzdG9yYWdlLFxufSk7XG5kcmF3ZXIuZHJhdygpO1xuXG5zZXRUaW1lb3V0KCgpID0+IHtcbiAgY29uc3QgYmF0Y2g6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcbiAgZm9yIChsZXQgaT0wOyBpPDEwMDA7ICsraSkge1xuICAgIGJhdGNoLnB1c2gobmV3IFJlY3QoaSsxMDAsIHtcbiAgICAgIHBvc2l0aW9uOiBbTWF0aC5yYW5kb20oKSpkcmF3ZXIud2lkdGgsIE1hdGgucmFuZG9tKCkqZHJhd2VyLmhlaWdodF0sXG4gICAgICBzaXplOiBbMzArTWF0aC5yYW5kb20oKSoxMDAsIDMwK01hdGgucmFuZG9tKCkqMTAwXSxcbiAgICAgIHpJbmRleDogMCxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICAgIGZpbGxTdHlsZTogJ3doaXRlJyxcbiAgICAgIHN0cm9rZVN0eWxlOiAnZ3JlZW4nLFxuICAgICAgbGluZVdpZHRoOiAxLFxuICAgIH0pKTtcbiAgfVxuICBzdG9yYWdlLmFkZEJhdGNoKGJhdGNoKTtcbn0sIDMwKTtcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIHN0b3JhZ2UuZGVsZXRlKHtcbiAgICB0eXBlc0V4Y2VwdDogWydHcmlkJ10sXG4gICAgZXh0cmFGaWx0ZXI6IGl0ZW0gPT4gaXRlbS5jb25maWcuekluZGV4ID09PSAwLFxuICB9KTtcbiAgc3RvcmFnZS5hZGQobmV3IFJlY3QoNTAsIHtcbiAgICBwb3NpdGlvbjogWzEwMCwgMjVdLFxuICAgIHNpemU6IFs1MCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGZpbGxTdHlsZTogJ3JlZCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSk7XG59LCAxMDAwKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==