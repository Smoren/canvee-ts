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
            zIndex: Math.max.apply(Math, groupItems.map(function (item) { return item.config.zIndex; })) + 1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxHQUFHLENBQUM7WUFDbEQsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFdBQVcsRUFBRSxPQUFPO1lBQ3BCLFNBQVMsRUFBRSxDQUFDO1NBQ2IsQ0FBQyxDQUFDLENBQUM7S0FDTDtJQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRVAsVUFBVSxDQUFDO0lBQ1QsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNiLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNyQixXQUFXLEVBQUUsY0FBSSxJQUFJLFdBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBeEIsQ0FBd0I7S0FDOUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLDREQUFJLENBQUMsRUFBRSxFQUFFO1FBQ3ZCLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDbkIsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUNkLE1BQU0sRUFBRSxDQUFDO1FBQ1QsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsS0FBSztRQUNqQixTQUFTLEVBQUUsS0FBSztRQUNoQixXQUFXLEVBQUUsT0FBTztRQUNwQixTQUFTLEVBQUUsQ0FBQztLQUNiLENBQUMsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvZHJhd2VyLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL2ZpZ3VyZXMvZ3JpZC50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9maWd1cmVzL3JlY3QudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvZmlndXJlcy9zdmcudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvaGVscGVycy9iYXNlLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS1ncm91cC50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZpZXctY29uZmlnLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIERyYXdlckNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2VySW50ZXJmYWNlLCBWZWN0b3JBcnJheVR5cGUsXG4gIFZpZXdDb25maWdJbnRlcmZhY2UsXG4gIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlXG59IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICogQ2FudmFzIGRyYXdlclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3ZXIgaW1wbGVtZW50cyBEcmF3ZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTmFtZSBvZiBjbGFzcyB0byB1c2UgYXMgc3Vic2NyaWJlciBuYW1lIGluIG9ic2VydmFibGUgbG9naWNcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdlcic7XG4gIC8qKlxuICAgKiBDYW52YXMgRE9NIGVsZW1lbnRcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kb21FbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfdmlld0NvbmZpZzogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBEcmF3YWJsZSBvYmplY3RzIHN0b3JhZ2VcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9zdG9yYWdlOiBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBDYW52YXMgZHJhd2luZyBjb250ZXh0XG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAvKipcbiAgICogUmVzaXplIG9ic2VydmVyIG9iamVjdFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcblxuICAvKipcbiAgICogRHJhd2VyIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBkb21FbGVtZW50IC0gY2FudmFzIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB2aWV3Q29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIHN0b3JhZ2UgLSBkcmF3YWJsZSBvYmplY3RzIHN0b3JhZ2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBkb21FbGVtZW50LFxuICAgIHZpZXdDb25maWcsXG4gICAgc3RvcmFnZVxuICB9OiBEcmF3ZXJDb25maWdJbnRlcmZhY2UpIHtcbiAgICB0aGlzLl9kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcbiAgICB0aGlzLl92aWV3Q29uZmlnID0gdmlld0NvbmZpZztcbiAgICB0aGlzLl9zdG9yYWdlID0gc3RvcmFnZTtcbiAgICB0aGlzLl9jb250ZXh0ID0gZG9tRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgdGhpcy5faW5pdFJlc2l6ZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdFZpZXdDb25maWdPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRTdG9yYWdlT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9pbml0TW91c2VFdmVudHMoKTtcblxuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3ZXJJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBkcmF3KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgIHRoaXMuX2NvbnRleHQudHJhbnNsYXRlKC4uLnRoaXMuX3ZpZXdDb25maWcub2Zmc2V0KTtcbiAgICB0aGlzLl9jb250ZXh0LnNjYWxlKC4uLnRoaXMuX3ZpZXdDb25maWcuc2NhbGUpO1xuICAgIHRoaXMuX3N0b3JhZ2UubGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0uY29uZmlnLnZpc2libGUpIHtcbiAgICAgICAgaXRlbS5kcmF3KHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3ZXJJbnRlcmZhY2UucmVmcmVzaH1cbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kb21FbGVtZW50LndpZHRoICE9PSB0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LndpZHRoID0gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZG9tRWxlbWVudC5oZWlnaHQgIT09IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdyZWZyZXNoZWQnKTtcblxuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLmNsZWFyfVxuICAgKi9cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJvdW5kcyBvZiBjYW52YXMgZnJhbWVcbiAgICovXG4gIHB1YmxpYyBnZXRCb3VuZHMoKTogW1ZlY3RvckFycmF5VHlwZSwgVmVjdG9yQXJyYXlUeXBlXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX3ZpZXdDb25maWcudHJhbnNwb3NlRm9yd2FyZChbMCwgMF0pLFxuICAgICAgdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF0pLFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBnZXQgdmlld0NvbmZpZygpOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogQ2FudmFzIGNvbnRleHQgZ2V0dGVyXG4gICAqL1xuICBnZXQgY29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyB3aWR0aCBnZXR0ZXJcbiAgICovXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyBoZWlnaHQgZ2V0dGVyXG4gICAqL1xuICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBjYW52YXMgcmVzaXplIG9ic2VydmVyXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdFJlc2l6ZU9ic2VydmVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuX2RvbUVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB2aWV3IGNvbmZpZyBvYnNlcnZlclxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRWaWV3Q29uZmlnT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld0NvbmZpZy5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgc3RvcmFnZSBvYnNlcnZlclxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRTdG9yYWdlT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmFnZS5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgbW91c2UgZXZlbnRzIG9ic2VydmVyXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdE1vdXNlRXZlbnRzKCk6IHZvaWQge1xuICAgIC8vIFRPRE8g0YLQvtC20LUg0L/QtdGA0LXQvdC10YHRgtC4INC60YPQtNCwLdC90LjQsdGD0LTRjFxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5jdHJsS2V5KSB7XG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuX3ZpZXdDb25maWcuc2NhbGVbMF07XG4gICAgICAgIHNjYWxlICs9IGV2ZW50LmRlbHRhWSAqIC0wLjAwMjtcbiAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihNYXRoLm1heCgwLjAwMSwgc2NhbGUpLCAxMDApO1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLnVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0KFtzY2FsZSwgc2NhbGVdLCBbZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WV0pO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFswXSAtPSBldmVudC5kZWx0YVk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFsxXSAtPSBldmVudC5kZWx0YVk7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkczogVmVjdG9yQXJyYXlUeXBlID0gW2V2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFldO1xuICAgICAgY29uc3QgY29vcmRzMTogVmVjdG9yQXJyYXlUeXBlID0gdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKGNvb3Jkcyk7XG4gICAgICBjb25zdCBjb29yZHMyOiBWZWN0b3JBcnJheVR5cGUgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUJhY2t3YXJkKGNvb3JkczEpO1xuICAgICAgY29uc29sZS5sb2coJ21vdXNlIGNvb3JkcycsIGNvb3Jkcyk7XG4gICAgICBjb25zb2xlLmxvZygncmVhbCBjb29yZHMnLCBjb29yZHMxKTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGxldCBtb3VzZURvd25Db29yZHM6IFZlY3RvckFycmF5VHlwZSB8IG51bGwgPSBudWxsO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBpZiAobW91c2VEb3duQ29vcmRzID09PSBudWxsKSB7XG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2V3LXJlc2l6ZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vdXNlTW92ZUNvb3JkczogVmVjdG9yQXJyYXlUeXBlID0gW2V2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFldO1xuICAgICAgY29uc3QgZGlmZmVyZW5jZTogVmVjdG9yQXJyYXlUeXBlID0gW21vdXNlRG93bkNvb3Jkc1swXS1tb3VzZU1vdmVDb29yZHNbMF0sIG1vdXNlRG93bkNvb3Jkc1sxXS1tb3VzZU1vdmVDb29yZHNbMV1dO1xuICAgICAgdGhpcy5fdmlld0NvbmZpZy5vZmZzZXQgPSBbdGhpcy5fdmlld0NvbmZpZy5vZmZzZXRbMF0tZGlmZmVyZW5jZVswXSwgdGhpcy5fdmlld0NvbmZpZy5vZmZzZXRbMV0tZGlmZmVyZW5jZVsxXV07XG4gICAgICBtb3VzZURvd25Db29yZHMgPSBtb3VzZU1vdmVDb29yZHM7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IG51bGw7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgTGlua2VkRGF0YVR5cGUsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIFZlY3RvckFycmF5VHlwZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIERyYXdhYmxlSWRUeXBlLFxufSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCBEcmF3YWJsZSBmcm9tIFwiLi4vc3RydWN0cy9kcmF3YWJsZVwiO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIGdyaWRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkQ29uZmlnSW50ZXJmYWNlIGV4dGVuZHMgRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICBtYWluTGluZUNvbG9yOiBzdHJpbmc7XG4gIHN1YkxpbmVDb2xvcjogc3RyaW5nO1xuICBsaW5lV2lkdGg6IG51bWJlcjtcbiAgbGluZXNJbkJsb2NrOiBudW1iZXI7XG59XG5cbi8qKlxuICogR3JpZCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnR3JpZCc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogR3JpZENvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogR3JpZCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBHcmlkQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuc2F2ZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgY29uc3QgW2Zyb21Cb3VuZCwgdG9Cb3VuZF0gPSBkcmF3ZXIuZ2V0Qm91bmRzKCk7XG4gICAgY29uc3Qgc2NhbGUgPSBkcmF3ZXIudmlld0NvbmZpZy5zY2FsZVswXTtcblxuICAgIGRyYXdlci5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuX2NvbmZpZy5saW5lV2lkdGggLyBzY2FsZTtcblxuICAgIGxldCBzdGVwID0gZHJhd2VyLnZpZXdDb25maWcuZ3JpZFN0ZXA7XG5cbiAgICBpZihzY2FsZSA8IDEpIHtcbiAgICAgIHN0ZXAgPSBzdGVwKihNYXRoLnBvdygyLCBNYXRoLnJvdW5kKE1hdGgubG9nMigxL3NjYWxlKSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RlcCA9IHN0ZXAvKE1hdGgucG93KDIsIE1hdGgucm91bmQoTWF0aC5sb2cyKHNjYWxlKSkpKTtcbiAgICB9XG5cbiAgICBjb25zdCBtYWluTGluZURpc3RhbmNlID0gc3RlcCp0aGlzLl9jb25maWcubGluZXNJbkJsb2NrO1xuICAgIGxldCB4R2FwID0gKGZyb21Cb3VuZFswXSAlIG1haW5MaW5lRGlzdGFuY2UpO1xuICAgIGlmKHhHYXAgPCAwKSB7XG4gICAgICB4R2FwICs9IG1haW5MaW5lRGlzdGFuY2U7XG4gICAgfVxuICAgIGxldCB5R2FwID0gKGZyb21Cb3VuZFsxXSAlIG1haW5MaW5lRGlzdGFuY2UpO1xuICAgIGlmKHlHYXAgPCAwKSB7XG4gICAgICB5R2FwICs9IG1haW5MaW5lRGlzdGFuY2U7XG4gICAgfVxuXG4gICAge1xuICAgICAgbGV0IGo9MDtcbiAgICAgIGZvcihsZXQgaT1mcm9tQm91bmRbMV0teUdhcDsgaTw9dG9Cb3VuZFsxXTsgaSs9c3RlcCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IChqKysgJSB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrID09PSAwKVxuICAgICAgICAgID8gdGhpcy5fY29uZmlnLm1haW5MaW5lQ29sb3JcbiAgICAgICAgICA6IHRoaXMuX2NvbmZpZy5zdWJMaW5lQ29sb3I7XG4gICAgICAgIHRoaXMuX2RyYXdIb3Jpem9udGFsTGluZShpLCBkcmF3ZXIsIGNvbG9yLCBbZnJvbUJvdW5kLCB0b0JvdW5kXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAge1xuICAgICAgbGV0IGo9MDtcbiAgICAgIGZvcihsZXQgaT1mcm9tQm91bmRbMF0teEdhcDsgaTw9dG9Cb3VuZFswXTsgaSs9c3RlcCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IChqKysgJSB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrID09PSAwKVxuICAgICAgICAgID8gdGhpcy5fY29uZmlnLm1haW5MaW5lQ29sb3JcbiAgICAgICAgICA6IHRoaXMuX2NvbmZpZy5zdWJMaW5lQ29sb3I7XG4gICAgICAgIHRoaXMuX2RyYXdWZXJ0aWNhbExpbmUoaSwgZHJhd2VyLCBjb2xvciwgW2Zyb21Cb3VuZCwgdG9Cb3VuZF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGhvcml6b250YWwgbGluZVxuICAgKiBAcGFyYW0gZHJhd2VyXG4gICAqIEBwYXJhbSB5T2Zmc2V0XG4gICAqIEBwYXJhbSBjb2xvclxuICAgKiBAcGFyYW0gZnJvbUJvdW5kXG4gICAqIEBwYXJhbSB0b0JvdW5kXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RyYXdIb3Jpem9udGFsTGluZShcbiAgICB5T2Zmc2V0OiBudW1iZXIsXG4gICAgZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UsXG4gICAgY29sb3I6IHN0cmluZyxcbiAgICBbZnJvbUJvdW5kLCB0b0JvdW5kXTogW1ZlY3RvckFycmF5VHlwZSwgVmVjdG9yQXJyYXlUeXBlXVxuICApIHtcbiAgICBjb25zdCBsaW5lRnJvbSA9IFtmcm9tQm91bmRbMF0sIHlPZmZzZXRdO1xuICAgIGNvbnN0IGxpbmVUbyA9IFt0b0JvdW5kWzBdLCB5T2Zmc2V0XTtcblxuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgZHJhd2VyLmNvbnRleHQubW92ZVRvKGxpbmVGcm9tWzBdLCBsaW5lRnJvbVsxXSk7XG4gICAgZHJhd2VyLmNvbnRleHQubGluZVRvKGxpbmVUb1swXSwgbGluZVRvWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2UoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgdmVydGljYWwgbGluZVxuICAgKiBAcGFyYW0gZHJhd2VyXG4gICAqIEBwYXJhbSB4T2Zmc2V0XG4gICAqIEBwYXJhbSBjb2xvclxuICAgKiBAcGFyYW0gZnJvbUJvdW5kXG4gICAqIEBwYXJhbSB0b0JvdW5kXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RyYXdWZXJ0aWNhbExpbmUoXG4gICAgeE9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV1cbiAgKSB7XG4gICAgY29uc3QgbGluZUZyb20gPSBbeE9mZnNldCwgZnJvbUJvdW5kWzFdXTtcbiAgICBjb25zdCBsaW5lVG8gPSBbeE9mZnNldCwgdG9Cb3VuZFsxXV07XG5cbiAgICBkcmF3ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGRyYXdlci5jb250ZXh0Lm1vdmVUbyhsaW5lRnJvbVswXSwgbGluZUZyb21bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LmxpbmVUbyhsaW5lVG9bMF0sIGxpbmVUb1sxXSk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgTGlua2VkRGF0YVR5cGUsXG4gIFZlY3RvckFycmF5VHlwZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSxcbiAgQmFzaWNGaWd1cmVEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgRHJhd2FibGVJZFR5cGUsXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gXCIuLi9zdHJ1Y3RzL2RyYXdhYmxlXCI7XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBjb25maWcgb2YgcmVjdCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWN0Q29uZmlnSW50ZXJmYWNlIGV4dGVuZHMgQmFzaWNGaWd1cmVEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG5cbn1cblxuLyoqXG4gKiBSZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0IGV4dGVuZHMgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdSZWN0JztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBSZWN0Q29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBSZWN0IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKi9cbiAgY29uc3RydWN0b3IoaWQ6IERyYXdhYmxlSWRUeXBlLCBjb25maWc6IFJlY3RDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBkcmF3ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX2NvbmZpZy5zdHJva2VTdHlsZTtcbiAgICBkcmF3ZXIuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9jb25maWcuZmlsbFN0eWxlO1xuICAgIGRyYXdlci5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuX2NvbmZpZy5saW5lV2lkdGg7XG4gICAgZHJhd2VyLmNvbnRleHQuZmlsbFJlY3QoLi4udGhpcy5fY29uZmlnLnBvc2l0aW9uLCAuLi50aGlzLl9jb25maWcuc2l6ZSk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlUmVjdCguLi50aGlzLl9jb25maWcucG9zaXRpb24sIC4uLnRoaXMuX2NvbmZpZy5zaXplKTtcbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgTGlua2VkRGF0YVR5cGUsXG4gIFZlY3RvckFycmF5VHlwZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSxcbiAgQmFzaWNGaWd1cmVEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgRHJhd2FibGVJZFR5cGUsXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gXCIuLi9zdHJ1Y3RzL2RyYXdhYmxlXCI7XG5pbXBvcnQgeyBjcmVhdGVCbG9iLCBjcmVhdGVFbGVtZW50RnJvbUhUTUwsIGNyZWF0ZVVybEZyb21CbG9iIH0gZnJvbSBcIi4uL2hlbHBlcnMvYmFzZVwiO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIHJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3ZnQ29uZmlnSW50ZXJmYWNlIGV4dGVuZHMgQmFzaWNGaWd1cmVEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBTVkcgZGF0YVxuICAgKi9cbiAgZGF0YTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFN2ZyBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ZnIGV4dGVuZHMgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdTdmcnO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IFN2Z0NvbmZpZ0ludGVyZmFjZTtcbiAgLyoqXG4gICAqIEltYWdlIERPTSBlbGVtZW50XG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfaW1nOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFN2ZyBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBTdmdDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faW1nICE9PSBudWxsKSB7XG4gICAgICBkcmF3ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLl9pbWcsIC4uLnRoaXMuX2NvbmZpZy5wb3NpdGlvbik7XG4gICAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnN0IHN2Z0VsZW1lbnQ6IFNWR0VsZW1lbnQgPSBjcmVhdGVFbGVtZW50RnJvbUhUTUwodGhpcy5fY29uZmlnLmRhdGEpIGFzIFNWR0VsZW1lbnQ7XG4gICAgY29uc3QgYmxvYjogQmxvYiA9IGNyZWF0ZUJsb2IodGhpcy5fY29uZmlnLmRhdGEsICdpbWFnZS9zdmcreG1sJyk7XG4gICAgY29uc3QgdXJsOiBzdHJpbmcgPSBjcmVhdGVVcmxGcm9tQmxvYihibG9iKTtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gdXJsO1xuXG4gICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAvLyBUT0RPINCy0L7Qt9C80L7QttC90L4g0YHQu9C10LTRg9C10YIg0L/RgNC40LTRg9C80LDRgtGMINCx0L7Qu9C10LUg0Y3Qu9C10LPQsNC90YLQvdC+0LUg0YDQtdGI0LXQvdC40LVcbiAgICAgIC8vINC60LDQuiDQstCw0YDQuNCw0L3Rgiwg0YHQtNC10LvQsNGC0Ywg0LXQtNC40L3QvtC1INGF0YDQsNC90LjQu9C40YnQtSDQstGB0LXRhSDRgNCw0L3QtdC1INC30LDQs9GA0YPQttC10L3QvdGL0YUgSU1HXG4gICAgICB0aGlzLl9pbWcgPSBpbWc7XG4gICAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFycmF5cyBhcmUgZXF1YWwgYW5kIGZhbHNlIGVsc2VcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBsaHMgLSBmaXJzdCBhcnJheSB0byBjb21wYXJlXG4gKiBAcGFyYW0gcmhzIC0gc2Vjb25kIGFycmF5IHRvIGNvbXBhcmVcbiAqL1xuaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVBcnJheXNFcXVhbChsaHM6IEFycmF5PHVua25vd24+LCByaHM6IEFycmF5PHVua25vd24+KTogYm9vbGVhbiB7XG4gIHJldHVybiBsaHMubGVuZ3RoID09PSByaHMubGVuZ3RoICYmIGxocy5ldmVyeSgodiwgaSkgPT4gdiA9PT0gcmhzW2ldKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIERPTSBlbGVtZW50IGZyb20gSFRNTCBzdHJpbmdcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBodG1sU3RyaW5nIC0gSFRNTCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRGcm9tSFRNTChodG1sU3RyaW5nOiBzdHJpbmcpOiB1bmtub3duIHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5pbm5lckhUTUwgPSBodG1sU3RyaW5nLnRyaW0oKTtcblxuICByZXR1cm4gZGl2LmZpcnN0Q2hpbGQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBibG9iIGZyb20gdGV4dFxuICogQHBhcmFtIGRhdGEgLSB0ZXh0XG4gKiBAcGFyYW0gdHlwZSAtIHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJsb2IoZGF0YTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOiBCbG9iIHtcbiAgcmV0dXJuIG5ldyBCbG9iKFtkYXRhXSwge3R5cGU6IHR5cGV9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIFVSTCBmcm9tIGJsb2JcbiAqIEBwYXJhbSBibG9iIC0gYmxvYlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsRnJvbUJsb2IoYmxvYjogQmxvYik6IHN0cmluZyB7XG4gIGNvbnN0IFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3c7XG4gIC8vIEB0cy1pZ25vcmVcbiAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59XG5cbi8qKlxuICogRmluZHMgYW5kIHJldHVybnMgbWluaW1hbCAobGVmdC10b3ApIHBvc2l0aW9uXG4gKiBAcGFyYW0gcG9zaXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW5Qb3NpdGlvbihwb3NpdGlvbnM6IFZlY3RvckFycmF5VHlwZVtdKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgbGV0IG1pblg6IG51bWJlciA9IEluZmluaXR5O1xuICBsZXQgbWluWTogbnVtYmVyID0gSW5maW5pdHk7XG5cbiAgcG9zaXRpb25zLmZvckVhY2gocG9zaXRpb24gPT4ge1xuICAgIGlmIChwb3NpdGlvblswXSA8IG1pblgpIHtcbiAgICAgIG1pblggPSBwb3NpdGlvblswXTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uWzFdIDwgbWluWSkge1xuICAgICAgbWluWSA9IHBvc2l0aW9uWzFdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFttaW5YLCBtaW5ZXTtcbn1cbiIsImltcG9ydCB7IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuLyoqXG4gKiBIZWxwZXIgZm9yIG9ic2VydmFibGUgbG9naWNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZUhlbHBlciBpbXBsZW1lbnRzIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uge1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXJzIG1hcHBlZCBieSBzdWJzY3JpYmVyc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX2hhbmRsZXJNYXA6IFJlY29yZDxzdHJpbmcsIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGU+ID0ge307XG4gICAgLyoqXG4gICAgICogRmxhZyBmb3IgbXV0aW5nIGhhbmRsZXJzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfbXV0ZUhhbmRsZXJzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5vbkNoYW5nZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgb25DaGFuZ2UoXG4gICAgICBzdWJzY3JpYmVyTmFtZTogc3RyaW5nLFxuICAgICAgaGFuZGxlcjogVmlld09ic2VydmFibGVIYW5kbGVyVHlwZVxuICAgICk6IHZvaWQge1xuICAgICAgICB0aGlzLl9oYW5kbGVyTWFwW3N1YnNjcmliZXJOYW1lXSA9IGhhbmRsZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uub2ZmQ2hhbmdlfVxuICAgICAqL1xuICAgIHB1YmxpYyBvZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBkZWxldGUgdGhpcy5faGFuZGxlck1hcFtzdWJzY3JpYmVyTmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnN9XG4gICAgICovXG4gICAgcHVibGljIHByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKFxuICAgICAgICBleHRyYTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0gbnVsbFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc0hhbmRsZXJzKG11dGVkQmVmb3JlLCBleHRyYSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLndpdGhNdXRlSGFuZGxlcnN9XG4gICAgICovXG4gICAgcHVibGljIHdpdGhNdXRlSGFuZGxlcnMoXG4gICAgICAgIGFjdGlvbjogKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB2b2lkXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9tdXRlSGFuZGxlcnMpIHtcbiAgICAgICAgICAgIGFjdGlvbih0cnVlLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX211dGVIYW5kbGVycyA9IHRydWU7XG4gICAgICAgICAgICBhY3Rpb24oZmFsc2UsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fbXV0ZUhhbmRsZXJzID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5wcm9jZXNzSGFuZGxlcnN9XG4gICAgICovXG4gICAgcHVibGljIHByb2Nlc3NIYW5kbGVycyhcbiAgICAgICAgaXNNdXRlZDogYm9vbGVhbixcbiAgICAgICAgZXh0cmE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9IG51bGxcbiAgICApOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFpc011dGVkKSB7XG4gICAgICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuX2hhbmRsZXJNYXApXG4gICAgICAgICAgICAgICAgLmZvckVhY2goaGFuZGxlciA9PiBoYW5kbGVyKHRoaXMsIGV4dHJhKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVHcm91cEludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLCBWZWN0b3JBcnJheVR5cGVcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgRHJhd2FibGUgZnJvbSBcIi4vZHJhd2FibGVcIjtcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3YWJsZUdyb3VwIGV4dGVuZHMgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUdyb3VwSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgY2xhc3MgdG8gdXNlIGFzIHN1YnNjcmliZXIgbmFtZSBpbiBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlck5hbWU6ICdEcmF3YWJsZUdyb3VwJztcbiAgLyoqXG4gICAqIExpc3Qgb2Ygb2JqZWN0cyBpbiBncm91cFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xpc3Q6IERyYXdhYmxlSW50ZXJmYWNlW107XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlR3JvdXAgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gZ3JvdXAgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGV4dHJhIGRhdGFcbiAgICogQHBhcmFtIGxpc3QgLSBsaXN0IG9mIGdyb3VwZWQgb2JqZWN0c1xuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IERyYXdhYmxlSWRUeXBlLFxuICAgIGNvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gICAgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSxcbiAgICBsaXN0OiBEcmF3YWJsZUludGVyZmFjZVtdXG4gICkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2FzZGFzZCcsIHRhcmdldCk7XG4gICAgfSk7XG5cbiAgICAvLyBUT0RPINC90YPQttC10L0g0LvQuCDQt9C00LXRgdGMIFByb3h5P1xuICAgIHRoaXMuX2xpc3QgPSBuZXcgUHJveHkobGlzdCBhcyBEcmF3YWJsZUludGVyZmFjZVtdLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IERyYXdhYmxlSW50ZXJmYWNlW10sIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAodGFyZ2V0W2luZGV4IGFzIGtleW9mIERyYXdhYmxlSW50ZXJmYWNlW11dIGFzIHVua25vd24pID0gdmFsdWUgYXMgdW5rbm93bjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fY29uZmlnLnZpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkcmF3ZXIuY29udGV4dC5zYXZlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQudHJhbnNsYXRlKC4uLnRoaXMuY29uZmlnLnBvc2l0aW9uKTtcbiAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uZHJhdyhkcmF3ZXIpO1xuICAgIH0pO1xuICAgIGRyYXdlci5jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBsaXN0KCk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9saXN0O1xuICB9XG59IiwiaW1wb3J0IHtcbiAgRHJhd2FibGVTdG9yYWdlRmlsdGVyQ2FsbGJhY2tUeXBlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSxcbiAgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSxcbiAgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSwgRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlLCBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tIFwiLi4vaGVscGVycy9vYnNlcnZlLWhlbHBlclwiO1xuaW1wb3J0IHsgdXBkYXRlRmlsZVdpdGhUZXh0IH0gZnJvbSBcInRzLWxvYWRlci9kaXN0L3NlcnZpY2VzSG9zdFwiO1xuaW1wb3J0IERyYXdhYmxlR3JvdXAgZnJvbSBcIi4vZHJhd2FibGUtZ3JvdXBcIjtcbmltcG9ydCB7IGdldE1pblBvc2l0aW9uIH0gZnJvbSBcIi4uL2hlbHBlcnMvYmFzZVwiO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSBcIi4vdmVjdG9yXCI7XG5cbi8qKlxuICogU3RvcmFnZSBmb3IgZHJhd2FibGUgb2JqZWN0c1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3YWJsZVN0b3JhZ2UgaW1wbGVtZW50cyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTmFtZSBvZiBjbGFzcyB0byB1c2UgYXMgc3Vic2NyaWJlciBuYW1lIGluIG9ic2VydmFibGUgbG9naWNcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogJ0RyYXdhYmxlU3RvcmFnZSc7XG4gIC8qKlxuICAgKiBMaXN0IG9mIHN0b3JlZCBkcmF3YWJsZSBvYmplY3RzXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfbGlzdDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuICAvKipcbiAgICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfb2JzZXJ2ZUhlbHBlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZTtcblxuICAvKipcbiAgICogRHJhd2FibGUgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGl0ZW1zIC0gYmF0Y2ggbGlzdCB0byBhZGRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGl0ZW1zOiBEcmF3YWJsZUludGVyZmFjZVtdKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlciA9IG5ldyBPYnNlcnZlSGVscGVyKCk7XG4gICAgdGhpcy5hZGRCYXRjaChpdGVtcyk7XG4gICAgdGhpcy5fc29ydCgpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIGlmIChleHRyYSAhPT0gbnVsbCAmJiBleHRyYS5oYXNPd25Qcm9wZXJ0eSgnekluZGV4Q2hhbmdlZCcpICYmIGV4dHJhLnpJbmRleENoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5fc29ydCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlZCBkcmF3YWJsZSBvYmplY3RzIGxpc3QgZ2V0dGVyXG4gICAqL1xuICBnZXQgbGlzdCgpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmFkZH1cbiAgICovXG4gIHB1YmxpYyBhZGQoaXRlbTogRHJhd2FibGVJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpdGVtLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKGV4dHJhKTtcbiAgICB9KTtcbiAgICB0aGlzLl9saXN0LnB1c2goaXRlbSk7XG4gICAgdGhpcy5fc29ydCgpO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmFkZH1cbiAgICovXG4gIHB1YmxpYyBhZGRCYXRjaChpdGVtczogRHJhd2FibGVJbnRlcmZhY2VbXSk6IHZvaWQge1xuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoZXh0cmEpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9saXN0LnB1c2goaXRlbSk7XG4gICAgfSk7XG4gICAgdGhpcy5fc29ydCgpO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIG9iamVjdHMgZm91bmQgYnkgY29uZmlnIGZyb20gc3RvcmFnZVxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlKGNvbmZpZzogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKCkgPT4ge1xuICAgICAgdGhpcy5maW5kKGNvbmZpZykuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5kZWxldGVCeUlkKGl0ZW0uaWQpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBvYmplY3QgYnkgSUQgZnJvbSBzdG9yYWdlXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IERyYXdhYmxlSWRUeXBlKTogRHJhd2FibGVJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZihpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICAgIGNvbnN0IGRlbGV0ZWRJdGVtID0gdGhpcy5fbGlzdC5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgICAgZGVsZXRlZEl0ZW0ub2ZmVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSk7XG4gICAgICByZXR1cm4gZGVsZXRlZEl0ZW07XG4gICAgfVxuXG4gICAgLy8gVE9ETyBjdXN0b21pemUgZXhjZXB0aW9uXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZmluZCBvYmplY3Qgd2l0aCBpZCAnJHtpZH0nYCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5jbGVhcn1cbiAgICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2xpc3QubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5maW5kfVxuICAgKi9cbiAgcHVibGljIGZpbmQoY29uZmlnOiBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDb25maWdJbnRlcmZhY2UpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmluZChpdGVtID0+IHtcbiAgICAgIGlmIChjb25maWcuaWRzT25seSAmJiBjb25maWcuaWRzT25seS5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGNvbmZpZy5pZHNFeGNlcHQgJiYgY29uZmlnLmlkc0V4Y2VwdC5pbmRleE9mKGl0ZW0uaWQpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcudHlwZXNPbmx5ICYmIGNvbmZpZy50eXBlc09ubHkuaW5kZXhPZihpdGVtLnR5cGUpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGNvbmZpZy50eXBlc0V4Y2VwdCAmJiBjb25maWcudHlwZXNFeGNlcHQuaW5kZXhPZihpdGVtLnR5cGUpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhKGNvbmZpZy5leHRyYUZpbHRlciAmJiAhY29uZmlnLmV4dHJhRmlsdGVyKGl0ZW0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmRCeUlkfVxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkKGlkOiBEcmF3YWJsZUlkVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gdGhpcy5fZmluZChjYW5kaWRhdGUgPT4gY2FuZGlkYXRlLmlkID09PSBpZCk7XG4gICAgaWYgKGZvdW5kSXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZm91bmRJdGVtc1swXTtcbiAgICB9XG4gICAgLy8gVE9ETyBjdXN0b21pemUgZXhjZXB0aW9uXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZmluZCBvYmplY3Qgd2l0aCBpZCAnJHtpZH0nYCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5ncm91cH1cbiAgICovXG4gIHB1YmxpYyBncm91cChpZHM6IERyYXdhYmxlSWRUeXBlW10pOiBEcmF3YWJsZUdyb3VwIHtcbiAgICBjb25zdCBncm91cEl0ZW1zID0gdGhpcy5kZWxldGUoeyBpZHNPbmx5OiBpZHMgfSk7XG4gICAgY29uc3QgbWluUG9zaXRpb24gPSBnZXRNaW5Qb3NpdGlvbihncm91cEl0ZW1zLm1hcChpdGVtID0+IGl0ZW0uY29uZmlnLnBvc2l0aW9uKSk7XG5cbiAgICBjb25zdCBjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlID0ge1xuICAgICAgcG9zaXRpb246IG1pblBvc2l0aW9uLFxuICAgICAgekluZGV4OiBNYXRoLm1heCguLi5ncm91cEl0ZW1zLm1hcChpdGVtID0+IGl0ZW0uY29uZmlnLnpJbmRleCkpKzEsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcbiAgICB9O1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKCgpID0+IHtcbiAgICAgIGdyb3VwSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5tb3ZlUG9zaXRpb24oXG4gICAgICAgICAgY3JlYXRlVmVjdG9yKG1pblBvc2l0aW9uKS5pbnZlcnNlKCkudG9BcnJheSgpXG4gICAgICAgIClcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZ3JvdXBJZCA9ICdncm91cC0nKyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCkrJy0nK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDApO1xuICAgIGNvbnN0IGdyb3VwID0gbmV3IERyYXdhYmxlR3JvdXAoZ3JvdXBJZCwgY29uZmlnLCB7fSwgZ3JvdXBJdGVtcyk7XG4gICAgdGhpcy5hZGQoZ3JvdXApO1xuXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UudW5ncm91cH1cbiAgICovXG4gIHB1YmxpYyB1bmdyb3VwKGdyb3VwSWQ6IERyYXdhYmxlSWRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXA6IERyYXdhYmxlR3JvdXAgPSB0aGlzLmRlbGV0ZUJ5SWQoZ3JvdXBJZCkgYXMgRHJhd2FibGVHcm91cDtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygoKSA9PiB7XG4gICAgICBncm91cC5saXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0ubW92ZVBvc2l0aW9uKGdyb3VwLmNvbmZpZy5wb3NpdGlvbilcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRCYXRjaChncm91cC5saXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLm9uVmlld0NoYW5nZX1cbiAgICovXG4gIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBvYmplY3RzIGluIHN0b3JhZ2UgYnkgZmlsdGVyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBmaWx0ZXIgLSBmaWx0ZXIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCBfZmluZChmaWx0ZXI6IERyYXdhYmxlU3RvcmFnZUZpbHRlckNhbGxiYWNrVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIGNvbnN0IHJlc3VsdDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuXG4gICAgdGhpcy5fbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoZmlsdGVyKGl0ZW0pKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBzdG9yZWQgb2JqZWN0cyBieSB6LWluZGV4XG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfc29ydCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnc29ydCcpO1xuICAgIHRoaXMuX2xpc3Quc29ydCgobGhzLCByaHMpID0+IGxocy5jb25maWcuekluZGV4IC0gcmhzLmNvbmZpZy56SW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLCBWZWN0b3JBcnJheVR5cGUsIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUsXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgYXJlQXJyYXlzRXF1YWwgfSBmcm9tIFwiLi4vaGVscGVycy9iYXNlXCI7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tIFwiLi4vaGVscGVycy9vYnNlcnZlLWhlbHBlclwiO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSBcIi4vdmVjdG9yXCI7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIGRyYXdhYmxlIG9iamVjdHNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgSURcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9pZDogRHJhd2FibGVJZFR5cGU7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZTtcbiAgLyoqXG4gICAqIEV4dHJhIGxpbmtlZCBkYXRhXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfZGF0YTogTGlua2VkRGF0YVR5cGU7XG4gIC8qKlxuICAgKiBPYnNlcnZlIGhlbHBlclxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX29ic2VydmVIZWxwZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5zZXRQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBzZXRQb3NpdGlvbihjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9IGNvb3JkcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UubW92ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIG1vdmVQb3NpdGlvbihvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oXG4gICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKVxuICAgICAgICAuYWRkKGNyZWF0ZVZlY3RvcihvZmZzZXQpKVxuICAgICAgICAudG9BcnJheSgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZDtcblxuICAvKipcbiAgICogSUQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlkKCk6IERyYXdhYmxlSWRUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICAvKipcbiAgICogVHlwZSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBjb25maWcoKTogRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgc2V0dGVyXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKi9cbiAgcHVibGljIHNldCBjb25maWcoY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChPYmplY3QuZW50cmllcyhjb25maWcpLCBPYmplY3QuZW50cmllcyh0aGlzLl9jb25maWcpKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICBjb25zdCBpc1pJbmRleENoYW5nZWQgPSBjb25maWcuekluZGV4ICE9PSB0aGlzLl9jb25maWcuekluZGV4O1xuXG4gICAgICBPYmplY3QuZW50cmllcyhjb25maWcpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAodGhpcy5fY29uZmlnW2tleSBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gYXMgdW5rbm93bikgPSB2YWx1ZSBhcyB1bmtub3duO1xuICAgICAgfSk7XG5cbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUsIHtcbiAgICAgICAgekluZGV4Q2hhbmdlZDogaXNaSW5kZXhDaGFuZ2VkLFxuICAgICAgfSk7XG4gICAgfSkpXG4gIH1cblxuICAvKipcbiAgICogTGlua2VkIGRhdGEgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGRhdGEoKTogTGlua2VkRGF0YVR5cGUge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5vblZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25WaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9uQ2hhbmdlKHN1YnNjcmliZXJOYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uub2ZmVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvZmZWaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9mZkNoYW5nZShzdWJzY3JpYmVyTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogRHJhd2FibGUgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihpZDogRHJhd2FibGVJZFR5cGUsIGNvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICB0aGlzLl9pZCA9IGlkO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuX2NvbmZpZyA9IG5ldyBQcm94eShjb25maWcsIHtcbiAgICAgIHNldDogKHRhcmdldDogRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgRHJhd2FibGVDb25maWdJbnRlcmZhY2VdICE9PSB2YWx1ZTtcbiAgICAgICAgKHRhcmdldFtpbmRleCBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gYXMgdW5rbm93bikgPSB2YWx1ZSBhcyB1bmtub3duO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyh7XG4gICAgICAgICAgekluZGV4Q2hhbmdlZDogaW5kZXggPT09ICd6SW5kZXgnLFxuICAgICAgICB9KSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgUHJveHkoZGF0YSwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBMaW5rZWREYXRhVHlwZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBMaW5rZWREYXRhVHlwZV0gIT09IHZhbHVlO1xuICAgICAgICB0YXJnZXRbaW5kZXggYXMga2V5b2YgTGlua2VkRGF0YVR5cGVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCkgOiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JJbnRlcmZhY2UgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuLyoqXG4gKiBWZWN0b3IgY2xhc3NcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgVmVjdG9ySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIENvb3JkaW5hdGUgWFxuICAgKi9cbiAgcHVibGljIHg6IG51bWJlcjtcbiAgLyoqXG4gICAqIENvb3JkaW5hdGUgWVxuICAgKi9cbiAgcHVibGljIHk6IG51bWJlcjtcblxuICAvKipcbiAgICogVmVjdG9yIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB4IC0gY29vcmRpbmF0ZSBYXG4gICAqIEBwYXJhbSB5IC0gY29vcmRpbmF0ZSBZXG4gICAqL1xuICBjb25zdHJ1Y3RvcihbeCwgeV06IFZlY3RvckFycmF5VHlwZSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSB2ZWN0b3IgdG8gYWRkXG4gICAqL1xuICBhZGQodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICB0aGlzLnggKz0gdi54O1xuICAgIHRoaXMueSArPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgdmVjdG9yIHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSB2ZWN0b3IgdG8gc3VidHJhY3RcbiAgICovXG4gIHN1Yih2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgIHRoaXMueCAtPSB2Lng7XG4gICAgdGhpcy55IC09IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxlcyB2ZWN0b3IgYnkgbnVtYmVyXG4gICAqIEBwYXJhbSBtdWwgLSBtdWx0aXBsaWVyXG4gICAqL1xuICBtdWwobXVsOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgIHRoaXMueCAqPSBtdWw7XG4gICAgdGhpcy55ICo9IG11bDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERpdmlkZXMgdmVjdG9yIGJ5IG51bWJlclxuICAgKiBAcGFyYW0gZGl2IC0gZGl2aWRlclxuICAgKi9cbiAgZGl2KGRpdjogbnVtYmVyKTogVmVjdG9yIHtcbiAgICB0aGlzLnggLz0gZGl2O1xuICAgIHRoaXMueSAvPSBkaXY7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZlcnNlcyB2ZWN0b3JcbiAgICovXG4gIGludmVyc2UoKTogVmVjdG9yIHtcbiAgICB0aGlzLnggPSAtdGhpcy54O1xuICAgIHRoaXMueSA9IC10aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZlcnNlcyB2ZWN0b3JcbiAgICovXG4gIHJldmVyc2UoKTogVmVjdG9yIHtcbiAgICB0aGlzLnggPSAxL3RoaXMueDtcbiAgICB0aGlzLnkgPSAxL3RoaXMueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiB2ZWN0b3JcbiAgICovXG4gIGxlbigpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCArIHRoaXMueSp0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZGlzdGFuY2UgdmVjdG9yIG9mIHRoaXMgYW5kIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIGRpc3RhbmNlKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zdWIodik7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmVzIHZlY3RvclxuICAgKi9cbiAgY2xvbmUoKTogVmVjdG9yIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnRvQXJyYXkoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdmVjdG9yIHRvIGFycmF5XG4gICAqL1xuICB0b0FycmF5KCk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV07XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIG5ldyB2ZWN0b3JcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBjb29yZHMgLSBjb29yZGluYXRlcyBvZiBuZXcgdmVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWZWN0b3IoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3Ige1xuICByZXR1cm4gbmV3IFZlY3Rvcihjb29yZHMpO1xufVxuIiwiaW1wb3J0IHtcbiAgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxuICBWaWV3Q29uZmlnSW50ZXJmYWNlLFxuICBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSxcbiAgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZVxufSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IGFyZUFycmF5c0VxdWFsIH0gZnJvbSBcIi4uL2hlbHBlcnMvYmFzZVwiO1xuaW1wb3J0IE9ic2VydmVIZWxwZXIgZnJvbSBcIi4uL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG4vKipcbiAqIENvbmZpZyBmb3Igb2JqZWN0cyBkcmF3YWJsZSBvbiBjYW52YXNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbmZpZyBpbXBsZW1lbnRzIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFNjYWxlXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfc2NhbGU6IFZlY3RvckFycmF5VHlwZTtcbiAgLyoqXG4gICAqIE9mZnNldFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX29mZnNldDogVmVjdG9yQXJyYXlUeXBlO1xuICAvKipcbiAgICogR3JpZCBzdGVwXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfZ3JpZFN0ZXA6IG51bWJlcjtcbiAgLyoqXG4gICAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX29ic2VydmVIZWxwZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFZpZXdDb25maWcgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKiBAcGFyYW0gZ3JpZFN0ZXAgLSBncmlkIHN0ZXBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHsgc2NhbGUsIG9mZnNldCwgZ3JpZFN0ZXAgfTogVmlld0NvbmZpZ0ludGVyZmFjZSkge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuX3NjYWxlID0gbmV3IFByb3h5KHNjYWxlLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IFZlY3RvckFycmF5VHlwZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdICE9PSB2YWx1ZTtcbiAgICAgICAgdGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuX29mZnNldCA9IG5ldyBQcm94eShvZmZzZXQsIHtcbiAgICAgIHNldDogKHRhcmdldDogVmVjdG9yQXJyYXlUeXBlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gIT09IHZhbHVlO1xuICAgICAgICB0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fZ3JpZFN0ZXAgPSBncmlkU3RlcDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLnRyYW5zcG9zZUZvcndhcmR9XG4gICAqL1xuICBwdWJsaWMgdHJhbnNwb3NlRm9yd2FyZChjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgY29uc3QgW3gsIHldID0gY29vcmRzO1xuICAgIHJldHVybiBbKHggLSB0aGlzLl9vZmZzZXRbMF0pL3RoaXMuX3NjYWxlWzBdLCAoeSAtIHRoaXMuX29mZnNldFsxXSkvdGhpcy5fc2NhbGVbMV1dO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS50cmFuc3Bvc2VCYWNrd2FyZH1cbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VCYWNrd2FyZChjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgY29uc3QgW3gsIHldID0gY29vcmRzO1xuICAgIHJldHVybiBbeCp0aGlzLl9zY2FsZVswXSArIHRoaXMuX29mZnNldFswXSwgeSp0aGlzLl9zY2FsZVsxXSArIHRoaXMuX29mZnNldFsxXV07XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLnVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0fVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0KG5ld1NjYWxlOiBWZWN0b3JBcnJheVR5cGUsIGN1cnNvckNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKG5ld1NjYWxlLCB0aGlzLl9zY2FsZSk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICBjb25zdCBvbGRTY2FsZVBvc2l0aW9uID0gY3JlYXRlVmVjdG9yKHRoaXMudHJhbnNwb3NlRm9yd2FyZChjdXJzb3JDb29yZHMpKTtcbiAgICAgIHRoaXMuc2NhbGUgPSBuZXdTY2FsZTtcbiAgICAgIGNvbnN0IG5ld1NjYWxlUG9zaXRpb24gPSBjcmVhdGVWZWN0b3IodGhpcy50cmFuc3Bvc2VGb3J3YXJkKGN1cnNvckNvb3JkcykpO1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IG5ld1NjYWxlUG9zaXRpb24uY2xvbmUoKS5zdWIob2xkU2NhbGVQb3NpdGlvbik7XG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMudHJhbnNwb3NlQmFja3dhcmQoZGlmZmVyZW5jZS50b0FycmF5KCkpO1xuXG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFsbCB0aGUgZGF0YSBpbiBjb25maWdcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKiBAcGFyYW0gZ3JpZFN0ZXAgLSBncmlkIHN0ZXBcbiAgICovXG4gIHVwZGF0ZSh7IHNjYWxlLCBvZmZzZXQsIGdyaWRTdGVwIH06IFZpZXdDb25maWdJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwoc2NhbGUsIHRoaXMuX3NjYWxlKSB8fCAhYXJlQXJyYXlzRXF1YWwob2Zmc2V0LCB0aGlzLl9vZmZzZXQpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICB0aGlzLmdyaWRTdGVwID0gZ3JpZFN0ZXA7XG5cbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIGdldHRlclxuICAgKi9cbiAgZ2V0IHNjYWxlKCk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIHNldHRlclxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKi9cbiAgc2V0IHNjYWxlKHNjYWxlOiBWZWN0b3JBcnJheVR5cGUpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwoc2NhbGUsIHRoaXMuX3NjYWxlKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuX3NjYWxlWzBdID0gc2NhbGVbMF07XG4gICAgICB0aGlzLl9zY2FsZVsxXSA9IHNjYWxlWzFdO1xuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT2Zmc2V0IGdldHRlclxuICAgKi9cbiAgZ2V0IG9mZnNldCgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gIH1cblxuICAvKipcbiAgICogT2Zmc2V0IHNldHRlclxuICAgKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0XG4gICAqL1xuICBzZXQgb2Zmc2V0KG9mZnNldDogVmVjdG9yQXJyYXlUeXBlKSB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKG9mZnNldCwgdGhpcy5fb2Zmc2V0KTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuX29mZnNldFswXSA9IG9mZnNldFswXTtcbiAgICAgIHRoaXMuX29mZnNldFsxXSA9IG9mZnNldFsxXTtcbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyaWQgc3RlcCBnZXR0ZXJcbiAgICovXG4gIGdldCBncmlkU3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9ncmlkU3RlcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmlkIHN0ZXAgc2V0dGVyXG4gICAqIEBwYXJhbSBncmlkU3RlcCAtIGdyaWQgc3RlcFxuICAgKi9cbiAgc2V0IGdyaWRTdGVwKGdyaWRTdGVwOiBudW1iZXIpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSBncmlkU3RlcCAhPT0gdGhpcy5fZ3JpZFN0ZXA7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLl9ncmlkU3RlcCA9IGdyaWRTdGVwO1xuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERyYXdlciBmcm9tIFwiLi9jYW52YXMvZHJhd2VyXCI7XG5pbXBvcnQgUmVjdCBmcm9tIFwiLi9jYW52YXMvZmlndXJlcy9yZWN0XCI7XG5pbXBvcnQgRHJhd2FibGVTdG9yYWdlIGZyb20gXCIuL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlLXN0b3JhZ2VcIjtcbmltcG9ydCB7IERyYXdhYmxlSW50ZXJmYWNlLCBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB9IGZyb20gXCIuL2NhbnZhcy90eXBlc1wiO1xuaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4vY2FudmFzL3N0cnVjdHMvdmlldy1jb25maWdcIjtcbmltcG9ydCBHcmlkIGZyb20gXCIuL2NhbnZhcy9maWd1cmVzL2dyaWRcIjtcbmltcG9ydCBTdmcgZnJvbSBcIi4vY2FudmFzL2ZpZ3VyZXMvc3ZnXCI7XG5pbXBvcnQgRHJhd2FibGVHcm91cCBmcm9tIFwiLi9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS1ncm91cFwiO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IERyYXdhYmxlU3RvcmFnZShbXG4gIG5ldyBHcmlkKDEsIHtcbiAgICBwb3NpdGlvbjogWzAsIDBdLFxuICAgIHpJbmRleDogLUluZmluaXR5LFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgbWFpbkxpbmVDb2xvcjogJyNiYmInLFxuICAgIHN1YkxpbmVDb2xvcjogJyNkZWRlZGUnLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgICBsaW5lc0luQmxvY2s6IDUsXG4gIH0pLFxuICBuZXcgUmVjdCgyLCB7XG4gICAgcG9zaXRpb246IFsxMCwgMjBdLFxuICAgIHNpemU6IFsxMDAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBmaWxsU3R5bGU6ICdncmVlbicsXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFJlY3QoMywge1xuICAgIHBvc2l0aW9uOiBbMTAsIDI1XSxcbiAgICBzaXplOiBbNTAsIDUwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBmaWxsU3R5bGU6ICdibHVlJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pLFxuICBuZXcgUmVjdCg0LCB7XG4gICAgcG9zaXRpb246IFs3MDAsIDI1MF0sXG4gICAgc2l6ZTogWzE1MCwgMTAwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBmaWxsU3R5bGU6ICdibHVlJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pLFxuICBuZXcgU3ZnKDUsIHtcbiAgICBwb3NpdGlvbjogWzMwMCwgNTUwXSxcbiAgICBzaXplOiBbMTUwLCAxMDBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGRhdGE6IFwiPHN2ZyB3aWR0aD0nMTYyJyBoZWlnaHQ9JzgyJyB2aWV3Qm94PScwIDAgMTYyIDgyJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J00yOC42OTIzIDFMMSA0MC4xMjQxTDI4LjY5MjMgODFIMTM0LjY3NUwxNjEgNDAuMTI0MUwxMzQuNjc1IDFIMjguNjkyM1onIGZpbGw9JyNGRkJDRjInIHN0cm9rZT0nYmxhY2snIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIC8+PC9zdmc+XCIsXG4gICAgZmlsbFN0eWxlOiAnYmx1ZScsIC8vIFRPRE8g0L3QtSDQvdGD0LbQvdGLXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFJlY3QoNiwge1xuICAgIHBvc2l0aW9uOiBbMzAwLCAzMDBdLFxuICAgIHNpemU6IFszMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG4gIG5ldyBSZWN0KDcsIHtcbiAgICBwb3NpdGlvbjogWzM1MCwgMzAwXSxcbiAgICBzaXplOiBbMzAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pLFxuICBuZXcgUmVjdCg4LCB7XG4gICAgcG9zaXRpb246IFszMDAsIDM1MF0sXG4gICAgc2l6ZTogWzMwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbl0pO1xuXG5jb25zdCBncm91cCA9IHN0b3JhZ2UuZ3JvdXAoWzYsIDcsIDhdKTtcbi8vIHN0b3JhZ2UudW5ncm91cChncm91cC5pZCk7XG5cbmNvbnNvbGUubG9nKHN0b3JhZ2UpO1xuXG5jb25zdCB2aWV3Q29uZmlnOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSA9IG5ldyBWaWV3Q29uZmlnKHtcbiAgc2NhbGU6IFsxLCAxXSxcbiAgb2Zmc2V0OiBbMCwgMF0sXG4gIGdyaWRTdGVwOiAxNSxcbn0pO1xuY29uc29sZS5sb2codmlld0NvbmZpZyk7XG5cbmNvbnN0IGRyYXdlcjogRHJhd2VyID0gbmV3IERyYXdlcih7XG4gIGRvbUVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudCxcbiAgdmlld0NvbmZpZyxcbiAgc3RvcmFnZSxcbn0pO1xuZHJhd2VyLmRyYXcoKTtcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIGNvbnN0IGJhdGNoOiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG4gIGZvciAobGV0IGk9MDsgaTwxMDAwOyArK2kpIHtcbiAgICBiYXRjaC5wdXNoKG5ldyBSZWN0KGkrMTAwLCB7XG4gICAgICBwb3NpdGlvbjogW01hdGgucmFuZG9tKCkqZHJhd2VyLndpZHRoLCBNYXRoLnJhbmRvbSgpKmRyYXdlci5oZWlnaHRdLFxuICAgICAgc2l6ZTogWzMwK01hdGgucmFuZG9tKCkqMTAwLCAzMCtNYXRoLnJhbmRvbSgpKjEwMF0sXG4gICAgICB6SW5kZXg6IDAsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgICBmaWxsU3R5bGU6ICd3aGl0ZScsXG4gICAgICBzdHJva2VTdHlsZTogJ2dyZWVuJyxcbiAgICAgIGxpbmVXaWR0aDogMSxcbiAgICB9KSk7XG4gIH1cbiAgc3RvcmFnZS5hZGRCYXRjaChiYXRjaCk7XG59LCAzMCk7XG5cbnNldFRpbWVvdXQoKCkgPT4ge1xuICBzdG9yYWdlLmRlbGV0ZSh7XG4gICAgdHlwZXNFeGNlcHQ6IFsnR3JpZCddLFxuICAgIGV4dHJhRmlsdGVyOiBpdGVtID0+IGl0ZW0uY29uZmlnLnpJbmRleCA9PT0gMCxcbiAgfSk7XG4gIHN0b3JhZ2UuYWRkKG5ldyBSZWN0KDUwLCB7XG4gICAgcG9zaXRpb246IFsxMDAsIDI1XSxcbiAgICBzaXplOiBbNTAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBmaWxsU3R5bGU6ICdyZWQnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSkpO1xufSwgMTAwMCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=