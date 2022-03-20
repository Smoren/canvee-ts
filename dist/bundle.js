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
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector.ts");
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
     * {@inheritDoc DrawableInterface.setPosition}
     */
    DrawableGroup.prototype.setPosition = function (coords) {
        var _this = this;
        var difference = (0,_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(coords)
            .sub((0,_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(this._config.position))
            .toArray();
        this._observeHelper.withMuteHandlers(function () {
            _this._list.forEach(function (item) {
                item.movePosition(difference);
            });
        });
        _super.prototype.setPosition.call(this, coords);
    };
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    DrawableGroup.prototype.draw = function (drawer) {
        if (!this._config.visible) {
            return;
        }
        this._list.forEach(function (item) {
            item.draw(drawer);
        });
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
        var config = {
            position: (0,_helpers_base__WEBPACK_IMPORTED_MODULE_2__.getMinPosition)(groupItems.map(function (item) { return item.config.position; })),
            zIndex: Math.max.apply(Math, groupItems.map(function (item) { return item.config.zIndex; })),
            visible: true,
            selectable: true,
        };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ3JCLFdBQVcsRUFBRSxjQUFJLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUF4QixDQUF3QjtLQUM5QyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksNERBQUksQ0FBQyxFQUFFLEVBQUU7UUFDdkIsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUNuQixJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ2QsTUFBTSxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUUsSUFBSTtRQUNiLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLFNBQVMsRUFBRSxDQUFDO0tBQ2IsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9kcmF3ZXIudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvZmlndXJlcy9ncmlkLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL2ZpZ3VyZXMvcmVjdC50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9maWd1cmVzL3N2Zy50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9oZWxwZXJzL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC8uL3NyYy9jYW52YXMvaGVscGVycy9vYnNlcnZlLWhlbHBlci50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlLWdyb3VwLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL3N0cnVjdHMvZHJhd2FibGUtc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94Ly4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmVjdG9yLnRzIiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmlldy1jb25maWcudHMiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nZW5ldGljLWZvdXJpZXItZnVuY3Rpb24tYXBwcm94L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZ2VuZXRpYy1mb3VyaWVyLWZ1bmN0aW9uLWFwcHJveC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dlbmV0aWMtZm91cmllci1mdW5jdGlvbi1hcHByb3gvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSxcbiAgRHJhd2VyQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3ZXJJbnRlcmZhY2UsIFZlY3RvckFycmF5VHlwZSxcbiAgVmlld0NvbmZpZ0ludGVyZmFjZSxcbiAgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Vcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiBDYW52YXMgZHJhd2VyXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdlciBpbXBsZW1lbnRzIERyYXdlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZXJOYW1lOiBzdHJpbmcgPSAnRHJhd2VyJztcbiAgLyoqXG4gICAqIENhbnZhcyBET00gZWxlbWVudFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF92aWV3Q29uZmlnOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZTtcbiAgLyoqXG4gICAqIERyYXdhYmxlIG9iamVjdHMgc3RvcmFnZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N0b3JhZ2U6IERyYXdhYmxlU3RvcmFnZUludGVyZmFjZTtcbiAgLyoqXG4gICAqIENhbnZhcyBkcmF3aW5nIGNvbnRleHRcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIC8qKlxuICAgKiBSZXNpemUgb2JzZXJ2ZXIgb2JqZWN0XG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyO1xuXG4gIC8qKlxuICAgKiBEcmF3ZXIgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGRvbUVsZW1lbnQgLSBjYW52YXMgRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHZpZXdDb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gc3RvcmFnZSAtIGRyYXdhYmxlIG9iamVjdHMgc3RvcmFnZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioe1xuICAgIGRvbUVsZW1lbnQsXG4gICAgdmlld0NvbmZpZyxcbiAgICBzdG9yYWdlXG4gIH06IERyYXdlckNvbmZpZ0ludGVyZmFjZSkge1xuICAgIHRoaXMuX2RvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICAgIHRoaXMuX3ZpZXdDb25maWcgPSB2aWV3Q29uZmlnO1xuICAgIHRoaXMuX3N0b3JhZ2UgPSBzdG9yYWdlO1xuICAgIHRoaXMuX2NvbnRleHQgPSBkb21FbGVtZW50LmdldENvbnRleHQoJzJkJyk7XG5cbiAgICB0aGlzLl9pbml0UmVzaXplT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9pbml0Vmlld0NvbmZpZ09ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdFN0b3JhZ2VPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRNb3VzZUV2ZW50cygpO1xuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdlckludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoLi4udGhpcy5fdmlld0NvbmZpZy5vZmZzZXQpO1xuICAgIHRoaXMuX2NvbnRleHQuc2NhbGUoLi4udGhpcy5fdmlld0NvbmZpZy5zY2FsZSk7XG4gICAgdGhpcy5fc3RvcmFnZS5saXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbS5jb25maWcudmlzaWJsZSkge1xuICAgICAgICBpdGVtLmRyYXcodGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdlckludGVyZmFjZS5yZWZyZXNofVxuICAgKi9cbiAgcHVibGljIHJlZnJlc2goKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RvbUVsZW1lbnQud2lkdGggIT09IHRoaXMud2lkdGgpIHtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQud2lkdGggPSB0aGlzLndpZHRoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kb21FbGVtZW50LmhlaWdodCAhPT0gdGhpcy5oZWlnaHQpIHtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coJ3JlZnJlc2hlZCcpO1xuXG4gICAgdGhpcy5jbGVhcigpO1xuICAgIHRoaXMuZHJhdygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3ZXJJbnRlcmZhY2UuY2xlYXJ9XG4gICAqL1xuICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYm91bmRzIG9mIGNhbnZhcyBmcmFtZVxuICAgKi9cbiAgcHVibGljIGdldEJvdW5kcygpOiBbVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JBcnJheVR5cGVdIHtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKFswLCAwXSksXG4gICAgICB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQoW3RoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XSksXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIGdldCB2aWV3Q29uZmlnKCk6IFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0NvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgY29udGV4dCBnZXR0ZXJcbiAgICovXG4gIGdldCBjb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2FudmFzIHdpZHRoIGdldHRlclxuICAgKi9cbiAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogQ2FudmFzIGhlaWdodCBnZXR0ZXJcbiAgICovXG4gIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIGNhbnZhcyByZXNpemUgb2JzZXJ2ZXJcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0UmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5fZG9tRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHZpZXcgY29uZmlnIG9ic2VydmVyXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdFZpZXdDb25maWdPYnNlcnZlcigpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3Q29uZmlnLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBzdG9yYWdlIG9ic2VydmVyXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdFN0b3JhZ2VPYnNlcnZlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zdG9yYWdlLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBtb3VzZSBldmVudHMgb2JzZXJ2ZXJcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0TW91c2VFdmVudHMoKTogdm9pZCB7XG4gICAgLy8gVE9ETyDRgtC+0LbQtSDQv9C10YDQtdC90LXRgdGC0Lgg0LrRg9C00LAt0L3QuNCx0YPQtNGMXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChldmVudDogV2hlZWxFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5fdmlld0NvbmZpZy5zY2FsZVswXTtcbiAgICAgICAgc2NhbGUgKz0gZXZlbnQuZGVsdGFZICogLTAuMDAyO1xuICAgICAgICBzY2FsZSA9IE1hdGgubWluKE1hdGgubWF4KDAuMDAxLCBzY2FsZSksIDEwMCk7XG4gICAgICAgIHRoaXMuX3ZpZXdDb25maWcudXBkYXRlU2NhbGVJbkN1cnNvckNvbnRleHQoW3NjYWxlLCBzY2FsZV0sIFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXSk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0WzBdIC09IGV2ZW50LmRlbHRhWTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0WzFdIC09IGV2ZW50LmRlbHRhWTtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IFBvaW50ZXJFdmVudCkgPT4ge1xuICAgICAgY29uc3QgY29vcmRzOiBWZWN0b3JBcnJheVR5cGUgPSBbZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WV07XG4gICAgICBjb25zdCBjb29yZHMxOiBWZWN0b3JBcnJheVR5cGUgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQoY29vcmRzKTtcbiAgICAgIGNvbnN0IGNvb3JkczI6IFZlY3RvckFycmF5VHlwZSA9IHRoaXMuX3ZpZXdDb25maWcudHJhbnNwb3NlQmFja3dhcmQoY29vcmRzMSk7XG4gICAgICBjb25zb2xlLmxvZygnbW91c2UgY29vcmRzJywgY29vcmRzKTtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWFsIGNvb3JkcycsIGNvb3JkczEpO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgbGV0IG1vdXNlRG93bkNvb3JkczogVmVjdG9yQXJyYXlUeXBlIHwgbnVsbCA9IG51bGw7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgbW91c2VEb3duQ29vcmRzID0gW2V2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFldO1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZ3JhYmJpbmcnO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmIChtb3VzZURvd25Db29yZHMgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZXctcmVzaXplJztcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbW91c2VNb3ZlQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUgPSBbZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WV07XG4gICAgICBjb25zdCBkaWZmZXJlbmNlOiBWZWN0b3JBcnJheVR5cGUgPSBbbW91c2VEb3duQ29vcmRzWzBdLW1vdXNlTW92ZUNvb3Jkc1swXSwgbW91c2VEb3duQ29vcmRzWzFdLW1vdXNlTW92ZUNvb3Jkc1sxXV07XG4gICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldCA9IFt0aGlzLl92aWV3Q29uZmlnLm9mZnNldFswXS1kaWZmZXJlbmNlWzBdLCB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFsxXS1kaWZmZXJlbmNlWzFdXTtcbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IG1vdXNlTW92ZUNvb3JkcztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgbW91c2VEb3duQ29vcmRzID0gbnVsbDtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBMaW5rZWREYXRhVHlwZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxuICBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgRHJhd2FibGVJZFR5cGUsXG59IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gXCIuLi9zdHJ1Y3RzL2RyYXdhYmxlXCI7XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBjb25maWcgb2YgZ3JpZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEdyaWRDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG4gIG1haW5MaW5lQ29sb3I6IHN0cmluZztcbiAgc3ViTGluZUNvbG9yOiBzdHJpbmc7XG4gIGxpbmVXaWR0aDogbnVtYmVyO1xuICBsaW5lc0luQmxvY2s6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBHcmlkIGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkIGV4dGVuZHMgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdHcmlkJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBHcmlkQ29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBHcmlkIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKi9cbiAgY29uc3RydWN0b3IoaWQ6IERyYXdhYmxlSWRUeXBlLCBjb25maWc6IEdyaWRDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBkcmF3ZXIuY29udGV4dC5zYXZlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICBjb25zdCBbZnJvbUJvdW5kLCB0b0JvdW5kXSA9IGRyYXdlci5nZXRCb3VuZHMoKTtcbiAgICBjb25zdCBzY2FsZSA9IGRyYXdlci52aWV3Q29uZmlnLnNjYWxlWzBdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5fY29uZmlnLmxpbmVXaWR0aCAvIHNjYWxlO1xuXG4gICAgbGV0IHN0ZXAgPSBkcmF3ZXIudmlld0NvbmZpZy5ncmlkU3RlcDtcblxuICAgIGlmKHNjYWxlIDwgMSkge1xuICAgICAgc3RlcCA9IHN0ZXAqKE1hdGgucG93KDIsIE1hdGgucm91bmQoTWF0aC5sb2cyKDEvc2NhbGUpKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGVwID0gc3RlcC8oTWF0aC5wb3coMiwgTWF0aC5yb3VuZChNYXRoLmxvZzIoc2NhbGUpKSkpO1xuICAgIH1cblxuICAgIGNvbnN0IG1haW5MaW5lRGlzdGFuY2UgPSBzdGVwKnRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2s7XG4gICAgbGV0IHhHYXAgPSAoZnJvbUJvdW5kWzBdICUgbWFpbkxpbmVEaXN0YW5jZSk7XG4gICAgaWYoeEdhcCA8IDApIHtcbiAgICAgIHhHYXAgKz0gbWFpbkxpbmVEaXN0YW5jZTtcbiAgICB9XG4gICAgbGV0IHlHYXAgPSAoZnJvbUJvdW5kWzFdICUgbWFpbkxpbmVEaXN0YW5jZSk7XG4gICAgaWYoeUdhcCA8IDApIHtcbiAgICAgIHlHYXAgKz0gbWFpbkxpbmVEaXN0YW5jZTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBsZXQgaj0wO1xuICAgICAgZm9yKGxldCBpPWZyb21Cb3VuZFsxXS15R2FwOyBpPD10b0JvdW5kWzFdOyBpKz1zdGVwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKGorKyAlIHRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2sgPT09IDApXG4gICAgICAgICAgPyB0aGlzLl9jb25maWcubWFpbkxpbmVDb2xvclxuICAgICAgICAgIDogdGhpcy5fY29uZmlnLnN1YkxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fZHJhd0hvcml6b250YWxMaW5lKGksIGRyYXdlciwgY29sb3IsIFtmcm9tQm91bmQsIHRvQm91bmRdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBsZXQgaj0wO1xuICAgICAgZm9yKGxldCBpPWZyb21Cb3VuZFswXS14R2FwOyBpPD10b0JvdW5kWzBdOyBpKz1zdGVwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKGorKyAlIHRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2sgPT09IDApXG4gICAgICAgICAgPyB0aGlzLl9jb25maWcubWFpbkxpbmVDb2xvclxuICAgICAgICAgIDogdGhpcy5fY29uZmlnLnN1YkxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fZHJhd1ZlcnRpY2FsTGluZShpLCBkcmF3ZXIsIGNvbG9yLCBbZnJvbUJvdW5kLCB0b0JvdW5kXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgaG9yaXpvbnRhbCBsaW5lXG4gICAqIEBwYXJhbSBkcmF3ZXJcbiAgICogQHBhcmFtIHlPZmZzZXRcbiAgICogQHBhcmFtIGNvbG9yXG4gICAqIEBwYXJhbSBmcm9tQm91bmRcbiAgICogQHBhcmFtIHRvQm91bmRcbiAgICovXG4gIHByb3RlY3RlZCBfZHJhd0hvcml6b250YWxMaW5lKFxuICAgIHlPZmZzZXQ6IG51bWJlcixcbiAgICBkcmF3ZXI6IERyYXdlckludGVyZmFjZSxcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIFtmcm9tQm91bmQsIHRvQm91bmRdOiBbVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JBcnJheVR5cGVdXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW2Zyb21Cb3VuZFswXSwgeU9mZnNldF07XG4gICAgY29uc3QgbGluZVRvID0gW3RvQm91bmRbMF0sIHlPZmZzZXRdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyB2ZXJ0aWNhbCBsaW5lXG4gICAqIEBwYXJhbSBkcmF3ZXJcbiAgICogQHBhcmFtIHhPZmZzZXRcbiAgICogQHBhcmFtIGNvbG9yXG4gICAqIEBwYXJhbSBmcm9tQm91bmRcbiAgICogQHBhcmFtIHRvQm91bmRcbiAgICovXG4gIHByb3RlY3RlZCBfZHJhd1ZlcnRpY2FsTGluZShcbiAgICB4T2Zmc2V0OiBudW1iZXIsXG4gICAgZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UsXG4gICAgY29sb3I6IHN0cmluZyxcbiAgICBbZnJvbUJvdW5kLCB0b0JvdW5kXTogW1ZlY3RvckFycmF5VHlwZSwgVmVjdG9yQXJyYXlUeXBlXVxuICApIHtcbiAgICBjb25zdCBsaW5lRnJvbSA9IFt4T2Zmc2V0LCBmcm9tQm91bmRbMV1dO1xuICAgIGNvbnN0IGxpbmVUbyA9IFt4T2Zmc2V0LCB0b0JvdW5kWzFdXTtcblxuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgZHJhd2VyLmNvbnRleHQubW92ZVRvKGxpbmVGcm9tWzBdLCBsaW5lRnJvbVsxXSk7XG4gICAgZHJhd2VyLmNvbnRleHQubGluZVRvKGxpbmVUb1swXSwgbGluZVRvWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2UoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBMaW5rZWREYXRhVHlwZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBCYXNpY0ZpZ3VyZURyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBEcmF3YWJsZUlkVHlwZSxcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgRHJhd2FibGUgZnJvbSBcIi4uL3N0cnVjdHMvZHJhd2FibGVcIjtcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiByZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlY3RDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBCYXNpY0ZpZ3VyZURyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcblxufVxuXG4vKipcbiAqIFJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3QgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ1JlY3QnO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IFJlY3RDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFJlY3QgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpZDogRHJhd2FibGVJZFR5cGUsIGNvbmZpZzogUmVjdENvbmZpZ0ludGVyZmFjZSwgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5fY29uZmlnLnN0cm9rZVN0eWxlO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2NvbmZpZy5maWxsU3R5bGU7XG4gICAgZHJhd2VyLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5fY29uZmlnLmxpbmVXaWR0aDtcbiAgICBkcmF3ZXIuY29udGV4dC5maWxsUmVjdCguLi50aGlzLl9jb25maWcucG9zaXRpb24sIC4uLnRoaXMuX2NvbmZpZy5zaXplKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2VSZWN0KC4uLnRoaXMuX2NvbmZpZy5wb3NpdGlvbiwgLi4udGhpcy5fY29uZmlnLnNpemUpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBMaW5rZWREYXRhVHlwZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBCYXNpY0ZpZ3VyZURyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBEcmF3YWJsZUlkVHlwZSxcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgRHJhd2FibGUgZnJvbSBcIi4uL3N0cnVjdHMvZHJhd2FibGVcIjtcbmltcG9ydCB7IGNyZWF0ZUJsb2IsIGNyZWF0ZUVsZW1lbnRGcm9tSFRNTCwgY3JlYXRlVXJsRnJvbUJsb2IgfSBmcm9tIFwiLi4vaGVscGVycy9iYXNlXCI7XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBjb25maWcgb2YgcmVjdCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdmdDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBCYXNpY0ZpZ3VyZURyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFNWRyBkYXRhXG4gICAqL1xuICBkYXRhOiBzdHJpbmc7XG59XG5cbi8qKlxuICogU3ZnIGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ1N2Zyc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogU3ZnQ29uZmlnSW50ZXJmYWNlO1xuICAvKipcbiAgICogSW1hZ2UgRE9NIGVsZW1lbnRcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbWc6IEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogU3ZnIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKi9cbiAgY29uc3RydWN0b3IoaWQ6IERyYXdhYmxlSWRUeXBlLCBjb25maWc6IFN2Z0NvbmZpZ0ludGVyZmFjZSwgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbWcgIT09IG51bGwpIHtcbiAgICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgZHJhd2VyLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuX2ltZywgLi4udGhpcy5fY29uZmlnLnBvc2l0aW9uKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc3Qgc3ZnRWxlbWVudDogU1ZHRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnRGcm9tSFRNTCh0aGlzLl9jb25maWcuZGF0YSkgYXMgU1ZHRWxlbWVudDtcbiAgICBjb25zdCBibG9iOiBCbG9iID0gY3JlYXRlQmxvYih0aGlzLl9jb25maWcuZGF0YSwgJ2ltYWdlL3N2Zyt4bWwnKTtcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IGNyZWF0ZVVybEZyb21CbG9iKGJsb2IpO1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSB1cmw7XG5cbiAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIC8vIFRPRE8g0LLQvtC30LzQvtC20L3QviDRgdC70LXQtNGD0LXRgiDQv9GA0LjQtNGD0LzQsNGC0Ywg0LHQvtC70LXQtSDRjdC70LXQs9Cw0L3RgtC90L7QtSDRgNC10YjQtdC90LjQtVxuICAgICAgLy8g0LrQsNC6INCy0LDRgNC40LDQvdGCLCDRgdC00LXQu9Cw0YLRjCDQtdC00LjQvdC+0LUg0YXRgNCw0L3QuNC70LjRidC1INCy0YHQtdGFINGA0LDQvdC10LUg0LfQsNCz0YDRg9C20LXQvdC90YvRhSBJTUdcbiAgICAgIHRoaXMuX2ltZyA9IGltZztcbiAgICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYXJyYXlzIGFyZSBlcXVhbCBhbmQgZmFsc2UgZWxzZVxuICogQHB1YmxpY1xuICogQHBhcmFtIGxocyAtIGZpcnN0IGFycmF5IHRvIGNvbXBhcmVcbiAqIEBwYXJhbSByaHMgLSBzZWNvbmQgYXJyYXkgdG8gY29tcGFyZVxuICovXG5pbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFyZUFycmF5c0VxdWFsKGxoczogQXJyYXk8dW5rbm93bj4sIHJoczogQXJyYXk8dW5rbm93bj4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGxocy5sZW5ndGggPT09IHJocy5sZW5ndGggJiYgbGhzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSByaHNbaV0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgRE9NIGVsZW1lbnQgZnJvbSBIVE1MIHN0cmluZ1xuICogQHB1YmxpY1xuICogQHBhcmFtIGh0bWxTdHJpbmcgLSBIVE1MIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEZyb21IVE1MKGh0bWxTdHJpbmc6IHN0cmluZyk6IHVua25vd24ge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmlubmVySFRNTCA9IGh0bWxTdHJpbmcudHJpbSgpO1xuXG4gIHJldHVybiBkaXYuZmlyc3RDaGlsZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGJsb2IgZnJvbSB0ZXh0XG4gKiBAcGFyYW0gZGF0YSAtIHRleHRcbiAqIEBwYXJhbSB0eXBlIC0gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmxvYihkYXRhOiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6IEJsb2Ige1xuICByZXR1cm4gbmV3IEJsb2IoW2RhdGFdLCB7dHlwZTogdHlwZX0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgVVJMIGZyb20gYmxvYlxuICogQHBhcmFtIGJsb2IgLSBibG9iXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVcmxGcm9tQmxvYihibG9iOiBCbG9iKTogc3RyaW5nIHtcbiAgY29uc3QgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdztcbiAgLy8gQHRzLWlnbm9yZVxuICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhbmQgcmV0dXJucyBtaW5pbWFsIChsZWZ0LXRvcCkgcG9zaXRpb25cbiAqIEBwYXJhbSBwb3NpdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1pblBvc2l0aW9uKHBvc2l0aW9uczogVmVjdG9yQXJyYXlUeXBlW10pOiBWZWN0b3JBcnJheVR5cGUge1xuICBsZXQgbWluWDogbnVtYmVyID0gSW5maW5pdHk7XG4gIGxldCBtaW5ZOiBudW1iZXIgPSBJbmZpbml0eTtcblxuICBwb3NpdGlvbnMuZm9yRWFjaChwb3NpdGlvbiA9PiB7XG4gICAgaWYgKHBvc2l0aW9uWzBdIDwgbWluWCkge1xuICAgICAgbWluWCA9IHBvc2l0aW9uWzBdO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb25bMV0gPCBtaW5ZKSB7XG4gICAgICBtaW5ZID0gcG9zaXRpb25bMV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gW21pblgsIG1pblldO1xufVxuIiwiaW1wb3J0IHsgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSwgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG4vKipcbiAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlSGVscGVyIGltcGxlbWVudHMgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSB7XG4gICAgLyoqXG4gICAgICogSGFuZGxlcnMgbWFwcGVkIGJ5IHN1YnNjcmliZXJzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfaGFuZGxlck1hcDogUmVjb3JkPHN0cmluZywgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZT4gPSB7fTtcbiAgICAvKipcbiAgICAgKiBGbGFnIGZvciBtdXRpbmcgaGFuZGxlcnNcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9tdXRlSGFuZGxlcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLm9uQ2hhbmdlfVxuICAgICAqL1xuICAgIHB1YmxpYyBvbkNoYW5nZShcbiAgICAgIHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsXG4gICAgICBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlXG4gICAgKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hhbmRsZXJNYXBbc3Vic2NyaWJlck5hbWVdID0gaGFuZGxlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5vZmZDaGFuZ2V9XG4gICAgICovXG4gICAgcHVibGljIG9mZkNoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9oYW5kbGVyTWFwW3N1YnNjcmliZXJOYW1lXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5wcm9jZXNzV2l0aE11dGVIYW5kbGVyc31cbiAgICAgKi9cbiAgICBwdWJsaWMgcHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoXG4gICAgICAgIGV4dHJhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPSBudWxsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzSGFuZGxlcnMobXV0ZWRCZWZvcmUsIGV4dHJhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uud2l0aE11dGVIYW5kbGVyc31cbiAgICAgKi9cbiAgICBwdWJsaWMgd2l0aE11dGVIYW5kbGVycyhcbiAgICAgICAgYWN0aW9uOiAobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHZvaWRcbiAgICApOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX211dGVIYW5kbGVycykge1xuICAgICAgICAgICAgYWN0aW9uKHRydWUsIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbXV0ZUhhbmRsZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgIGFjdGlvbihmYWxzZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9tdXRlSGFuZGxlcnMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLnByb2Nlc3NIYW5kbGVyc31cbiAgICAgKi9cbiAgICBwdWJsaWMgcHJvY2Vzc0hhbmRsZXJzKFxuICAgICAgICBpc011dGVkOiBib29sZWFuLFxuICAgICAgICBleHRyYTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0gbnVsbFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWlzTXV0ZWQpIHtcbiAgICAgICAgICAgIE9iamVjdC52YWx1ZXModGhpcy5faGFuZGxlck1hcClcbiAgICAgICAgICAgICAgICAuZm9yRWFjaChoYW5kbGVyID0+IGhhbmRsZXIodGhpcywgZXh0cmEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUdyb3VwSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsIFZlY3RvckFycmF5VHlwZVxufSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCBEcmF3YWJsZSBmcm9tIFwiLi9kcmF3YWJsZVwiO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSBcIi4vdmVjdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdhYmxlR3JvdXAgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlR3JvdXBJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTGlzdCBvZiBvYmplY3RzIGluIGdyb3VwXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfbGlzdDogRHJhd2FibGVJbnRlcmZhY2VbXTtcblxuICAvKipcbiAgICogRHJhd2FibGVHcm91cCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBncm91cCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gZXh0cmEgZGF0YVxuICAgKiBAcGFyYW0gbGlzdCAtIGxpc3Qgb2YgZ3JvdXBlZCBvYmplY3RzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogRHJhd2FibGVJZFR5cGUsXG4gICAgY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgICBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9LFxuICAgIGxpc3Q6IERyYXdhYmxlSW50ZXJmYWNlW11cbiAgKSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG5cbiAgICAvLyBUT0RPINC90YPQttC10L0g0LvQuCDQt9C00LXRgdGMIFByb3h5P1xuICAgIHRoaXMuX2xpc3QgPSBuZXcgUHJveHkobGlzdCBhcyBEcmF3YWJsZUludGVyZmFjZVtdLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IERyYXdhYmxlSW50ZXJmYWNlW10sIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAodGFyZ2V0W2luZGV4IGFzIGtleW9mIERyYXdhYmxlSW50ZXJmYWNlW11dIGFzIHVua25vd24pID0gdmFsdWUgYXMgdW5rbm93bjtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLnNldFBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIHNldFBvc2l0aW9uKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKSB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IGNyZWF0ZVZlY3Rvcihjb29yZHMpXG4gICAgICAuc3ViKGNyZWF0ZVZlY3Rvcih0aGlzLl9jb25maWcucG9zaXRpb24pKVxuICAgICAgLnRvQXJyYXkoKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygoKSA9PiB7XG4gICAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5tb3ZlUG9zaXRpb24oZGlmZmVyZW5jZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHN1cGVyLnNldFBvc2l0aW9uKGNvb3Jkcyk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fY29uZmlnLnZpc2libGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uZHJhdyhkcmF3ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3QgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxpc3QoKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3Q7XG4gIH1cbn0iLCJpbXBvcnQge1xuICBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDYWxsYmFja1R5cGUsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLFxuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLCBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDb25maWdJbnRlcmZhY2UsIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxufSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCBPYnNlcnZlSGVscGVyIGZyb20gXCIuLi9oZWxwZXJzL29ic2VydmUtaGVscGVyXCI7XG5pbXBvcnQgeyB1cGRhdGVGaWxlV2l0aFRleHQgfSBmcm9tIFwidHMtbG9hZGVyL2Rpc3Qvc2VydmljZXNIb3N0XCI7XG5pbXBvcnQgRHJhd2FibGVHcm91cCBmcm9tIFwiLi9kcmF3YWJsZS1ncm91cFwiO1xuaW1wb3J0IHsgZ2V0TWluUG9zaXRpb24gfSBmcm9tIFwiLi4vaGVscGVycy9iYXNlXCI7XG5cbi8qKlxuICogU3RvcmFnZSBmb3IgZHJhd2FibGUgb2JqZWN0c1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3YWJsZVN0b3JhZ2UgaW1wbGVtZW50cyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTmFtZSBvZiBjbGFzcyB0byB1c2UgYXMgc3Vic2NyaWJlciBuYW1lIGluIG9ic2VydmFibGUgbG9naWNcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogJ0RyYXdhYmxlU3RvcmFnZSc7XG4gIC8qKlxuICAgKiBMaXN0IG9mIHN0b3JlZCBkcmF3YWJsZSBvYmplY3RzXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfbGlzdDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuICAvKipcbiAgICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfb2JzZXJ2ZUhlbHBlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZTtcblxuICAvKipcbiAgICogRHJhd2FibGUgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGl0ZW1zIC0gYmF0Y2ggbGlzdCB0byBhZGRcbiAgICovXG4gIGNvbnN0cnVjdG9yKGl0ZW1zOiBEcmF3YWJsZUludGVyZmFjZVtdKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlciA9IG5ldyBPYnNlcnZlSGVscGVyKCk7XG4gICAgdGhpcy5hZGRCYXRjaChpdGVtcyk7XG4gICAgdGhpcy5fc29ydCgpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIGlmIChleHRyYSAhPT0gbnVsbCAmJiBleHRyYS5oYXNPd25Qcm9wZXJ0eSgnekluZGV4Q2hhbmdlZCcpICYmIGV4dHJhLnpJbmRleENoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5fc29ydCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlZCBkcmF3YWJsZSBvYmplY3RzIGxpc3QgZ2V0dGVyXG4gICAqL1xuICBnZXQgbGlzdCgpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmFkZH1cbiAgICovXG4gIHB1YmxpYyBhZGQoaXRlbTogRHJhd2FibGVJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpdGVtLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKGV4dHJhKTtcbiAgICB9KTtcbiAgICB0aGlzLl9saXN0LnB1c2goaXRlbSk7XG4gICAgdGhpcy5fc29ydCgpO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmFkZH1cbiAgICovXG4gIHB1YmxpYyBhZGRCYXRjaChpdGVtczogRHJhd2FibGVJbnRlcmZhY2VbXSk6IHZvaWQge1xuICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoZXh0cmEpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9saXN0LnB1c2goaXRlbSk7XG4gICAgfSk7XG4gICAgdGhpcy5fc29ydCgpO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIG9iamVjdHMgZm91bmQgYnkgY29uZmlnIGZyb20gc3RvcmFnZVxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlKGNvbmZpZzogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKCkgPT4ge1xuICAgICAgdGhpcy5maW5kKGNvbmZpZykuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5kZWxldGVCeUlkKGl0ZW0uaWQpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBvYmplY3QgYnkgSUQgZnJvbSBzdG9yYWdlXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IERyYXdhYmxlSWRUeXBlKTogRHJhd2FibGVJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdC5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZihpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICAgIGNvbnN0IGRlbGV0ZWRJdGVtID0gdGhpcy5fbGlzdC5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgICAgZGVsZXRlZEl0ZW0ub2ZmVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSk7XG4gICAgICByZXR1cm4gZGVsZXRlZEl0ZW07XG4gICAgfVxuXG4gICAgLy8gVE9ETyBjdXN0b21pemUgZXhjZXB0aW9uXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZmluZCBvYmplY3Qgd2l0aCBpZCAnJHtpZH0nYCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5jbGVhcn1cbiAgICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2xpc3QubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5maW5kfVxuICAgKi9cbiAgcHVibGljIGZpbmQoY29uZmlnOiBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDb25maWdJbnRlcmZhY2UpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fZmluZChpdGVtID0+IHtcbiAgICAgIGlmIChjb25maWcuaWRzT25seSAmJiBjb25maWcuaWRzT25seS5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGNvbmZpZy5pZHNFeGNlcHQgJiYgY29uZmlnLmlkc0V4Y2VwdC5pbmRleE9mKGl0ZW0uaWQpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcudHlwZXNPbmx5ICYmIGNvbmZpZy50eXBlc09ubHkuaW5kZXhPZihpdGVtLnR5cGUpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGNvbmZpZy50eXBlc0V4Y2VwdCAmJiBjb25maWcudHlwZXNFeGNlcHQuaW5kZXhPZihpdGVtLnR5cGUpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhKGNvbmZpZy5leHRyYUZpbHRlciAmJiAhY29uZmlnLmV4dHJhRmlsdGVyKGl0ZW0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmRCeUlkfVxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkKGlkOiBEcmF3YWJsZUlkVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gdGhpcy5fZmluZChjYW5kaWRhdGUgPT4gY2FuZGlkYXRlLmlkID09PSBpZCk7XG4gICAgaWYgKGZvdW5kSXRlbXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZm91bmRJdGVtc1swXTtcbiAgICB9XG4gICAgLy8gVE9ETyBjdXN0b21pemUgZXhjZXB0aW9uXG4gICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZmluZCBvYmplY3Qgd2l0aCBpZCAnJHtpZH0nYCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5ncm91cH1cbiAgICovXG4gIHB1YmxpYyBncm91cChpZHM6IERyYXdhYmxlSWRUeXBlW10pOiBEcmF3YWJsZUdyb3VwIHtcbiAgICBjb25zdCBncm91cEl0ZW1zID0gdGhpcy5kZWxldGUoeyBpZHNPbmx5OiBpZHMgfSk7XG5cbiAgICBjb25zdCBjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlID0ge1xuICAgICAgcG9zaXRpb246IGdldE1pblBvc2l0aW9uKGdyb3VwSXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5jb25maWcucG9zaXRpb24pKSxcbiAgICAgIHpJbmRleDogTWF0aC5tYXgoLi4uZ3JvdXBJdGVtcy5tYXAoaXRlbSA9PiBpdGVtLmNvbmZpZy56SW5kZXgpKSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxuICAgIH07XG5cbiAgICBjb25zdCBncm91cElkID0gJ2dyb3VwLScrKG5ldyBEYXRlKCkpLmdldFRpbWUoKSsnLScrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMCk7XG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgRHJhd2FibGVHcm91cChncm91cElkLCBjb25maWcsIHt9LCBncm91cEl0ZW1zKTtcbiAgICB0aGlzLmFkZChncm91cCk7XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS51bmdyb3VwfVxuICAgKi9cbiAgcHVibGljIHVuZ3JvdXAoZ3JvdXBJZDogRHJhd2FibGVJZFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cDogRHJhd2FibGVHcm91cCA9IHRoaXMuZGVsZXRlQnlJZChncm91cElkKSBhcyBEcmF3YWJsZUdyb3VwO1xuICAgIHRoaXMuYWRkQmF0Y2goZ3JvdXAubGlzdCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5vblZpZXdDaGFuZ2V9XG4gICAqL1xuICBvblZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZywgaGFuZGxlcjogVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub25DaGFuZ2Uoc3Vic2NyaWJlck5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgb2JqZWN0cyBpbiBzdG9yYWdlIGJ5IGZpbHRlciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0gZmlsdGVyIC0gZmlsdGVyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2ZpbmQoZmlsdGVyOiBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDYWxsYmFja1R5cGUpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcblxuICAgIHRoaXMuX2xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGZpbHRlcihpdGVtKSkge1xuICAgICAgICByZXN1bHQucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgc3RvcmVkIG9iamVjdHMgYnkgei1pbmRleFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3NvcnQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ3NvcnQnKTtcbiAgICB0aGlzLl9saXN0LnNvcnQoKGxocywgcmhzKSA9PiBsaHMuY29uZmlnLnpJbmRleCAtIHJocy5jb25maWcuekluZGV4KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbiAgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSwgVmVjdG9yQXJyYXlUeXBlLCBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxufSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IGFyZUFycmF5c0VxdWFsIH0gZnJvbSBcIi4uL2hlbHBlcnMvYmFzZVwiO1xuaW1wb3J0IE9ic2VydmVIZWxwZXIgZnJvbSBcIi4uL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXJcIjtcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciB9IGZyb20gXCIuL3ZlY3RvclwiO1xuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBkcmF3YWJsZSBvYmplY3RzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IElEXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHByb3RlY3RlZCBfaWQ6IERyYXdhYmxlSWRUeXBlO1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBFeHRyYSBsaW5rZWQgZGF0YVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RhdGE6IExpbmtlZERhdGFUeXBlO1xuICAvKipcbiAgICogT2JzZXJ2ZSBoZWxwZXJcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uuc2V0UG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgc2V0UG9zaXRpb24oY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWcucG9zaXRpb24gPSBjb29yZHM7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm1vdmVQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBtb3ZlUG9zaXRpb24ob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKFxuICAgICAgY3JlYXRlVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbilcbiAgICAgICAgLmFkZChjcmVhdGVWZWN0b3Iob2Zmc2V0KSlcbiAgICAgICAgLnRvQXJyYXkoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIElEIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBpZCgpOiBEcmF3YWJsZUlkVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgLyoqXG4gICAqIFR5cGUgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIHNldHRlclxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICovXG4gIHB1YmxpYyBzZXQgY29uZmlnKGNvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2UpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwoT2JqZWN0LmVudHJpZXMoY29uZmlnKSwgT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnKSk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgY29uc3QgaXNaSW5kZXhDaGFuZ2VkID0gY29uZmlnLnpJbmRleCAhPT0gdGhpcy5fY29uZmlnLnpJbmRleDtcblxuICAgICAgT2JqZWN0LmVudHJpZXMoY29uZmlnKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgKHRoaXMuX2NvbmZpZ1trZXkgYXMga2V5b2YgRHJhd2FibGVDb25maWdJbnRlcmZhY2VdIGFzIHVua25vd24pID0gdmFsdWUgYXMgdW5rbm93bjtcbiAgICAgIH0pO1xuXG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlLCB7XG4gICAgICAgIHpJbmRleENoYW5nZWQ6IGlzWkluZGV4Q2hhbmdlZCxcbiAgICAgIH0pO1xuICAgIH0pKVxuICB9XG5cbiAgLyoqXG4gICAqIExpbmtlZCBkYXRhIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBkYXRhKCk6IExpbmtlZERhdGFUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm9mZlZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb2ZmVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoaWQ6IERyYXdhYmxlSWRUeXBlLCBjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyID0gbmV3IE9ic2VydmVIZWxwZXIoKTtcbiAgICB0aGlzLl9jb25maWcgPSBuZXcgUHJveHkoY29uZmlnLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlXSAhPT0gdmFsdWU7XG4gICAgICAgICh0YXJnZXRbaW5kZXggYXMga2V5b2YgRHJhd2FibGVDb25maWdJbnRlcmZhY2VdIGFzIHVua25vd24pID0gdmFsdWUgYXMgdW5rbm93bjtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoe1xuICAgICAgICAgIHpJbmRleENoYW5nZWQ6IGluZGV4ID09PSAnekluZGV4JyxcbiAgICAgICAgfSkgOiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLl9kYXRhID0gbmV3IFByb3h5KGRhdGEsIHtcbiAgICAgIHNldDogKHRhcmdldDogTGlua2VkRGF0YVR5cGUsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgTGlua2VkRGF0YVR5cGVdICE9PSB2YWx1ZTtcbiAgICAgICAgdGFyZ2V0W2luZGV4IGFzIGtleW9mIExpbmtlZERhdGFUeXBlXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvckFycmF5VHlwZSwgVmVjdG9ySW50ZXJmYWNlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbi8qKlxuICogVmVjdG9yIGNsYXNzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciBpbXBsZW1lbnRzIFZlY3RvckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBDb29yZGluYXRlIFhcbiAgICovXG4gIHB1YmxpYyB4OiBudW1iZXI7XG4gIC8qKlxuICAgKiBDb29yZGluYXRlIFlcbiAgICovXG4gIHB1YmxpYyB5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFZlY3RvciBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geCAtIGNvb3JkaW5hdGUgWFxuICAgKiBAcGFyYW0geSAtIGNvb3JkaW5hdGUgWVxuICAgKi9cbiAgY29uc3RydWN0b3IoW3gsIHldOiBWZWN0b3JBcnJheVR5cGUpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFub3RoZXIgdmVjdG9yIHRvIHRoaXMgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gdmVjdG9yIHRvIGFkZFxuICAgKi9cbiAgYWRkKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgdGhpcy54ICs9IHYueDtcbiAgICB0aGlzLnkgKz0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIHZlY3RvciB3aXRoIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gdmVjdG9yIHRvIHN1YnRyYWN0XG4gICAqL1xuICBzdWIodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsZXMgdmVjdG9yIGJ5IG51bWJlclxuICAgKiBAcGFyYW0gbXVsIC0gbXVsdGlwbGllclxuICAgKi9cbiAgbXVsKG11bDogbnVtYmVyKTogVmVjdG9yIHtcbiAgICB0aGlzLnggKj0gbXVsO1xuICAgIHRoaXMueSAqPSBtdWw7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIHZlY3RvciBieSBudW1iZXJcbiAgICogQHBhcmFtIGRpdiAtIGRpdmlkZXJcbiAgICovXG4gIGRpdihkaXY6IG51bWJlcik6IFZlY3RvciB7XG4gICAgdGhpcy54IC89IGRpdjtcbiAgICB0aGlzLnkgLz0gZGl2O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogSW52ZXJzZXMgdmVjdG9yXG4gICAqL1xuICBpbnZlcnNlKCk6IFZlY3RvciB7XG4gICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICB0aGlzLnkgPSAtdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJzZXMgdmVjdG9yXG4gICAqL1xuICByZXZlcnNlKCk6IFZlY3RvciB7XG4gICAgdGhpcy54ID0gMS90aGlzLng7XG4gICAgdGhpcy55ID0gMS90aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdmVjdG9yXG4gICAqL1xuICBsZW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCp0aGlzLnggKyB0aGlzLnkqdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGRpc3RhbmNlIHZlY3RvciBvZiB0aGlzIGFuZCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBkaXN0YW5jZSh2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuc3ViKHYpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb25lcyB2ZWN0b3JcbiAgICovXG4gIGNsb25lKCk6IFZlY3RvciB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy50b0FycmF5KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHZlY3RvciB0byBhcnJheVxuICAgKi9cbiAgdG9BcnJheSgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnldO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgdmVjdG9yXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gY29vcmRzIC0gY29vcmRpbmF0ZXMgb2YgbmV3IHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmVjdG9yKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yIHtcbiAgcmV0dXJuIG5ldyBWZWN0b3IoY29vcmRzKTtcbn1cbiIsImltcG9ydCB7XG4gIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsXG4gIFZlY3RvckFycmF5VHlwZSxcbiAgVmlld0NvbmZpZ0ludGVyZmFjZSxcbiAgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UsXG4gIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGVcbn0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBhcmVBcnJheXNFcXVhbCB9IGZyb20gXCIuLi9oZWxwZXJzL2Jhc2VcIjtcbmltcG9ydCBPYnNlcnZlSGVscGVyIGZyb20gXCIuLi9oZWxwZXJzL29ic2VydmUtaGVscGVyXCI7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tIFwiLi92ZWN0b3JcIjtcblxuLyoqXG4gKiBDb25maWcgZm9yIG9iamVjdHMgZHJhd2FibGUgb24gY2FudmFzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb25maWcgaW1wbGVtZW50cyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBTY2FsZVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX3NjYWxlOiBWZWN0b3JBcnJheVR5cGU7XG4gIC8qKlxuICAgKiBPZmZzZXRcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9vZmZzZXQ6IFZlY3RvckFycmF5VHlwZTtcbiAgLyoqXG4gICAqIEdyaWQgc3RlcFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dyaWRTdGVwOiBudW1iZXI7XG4gIC8qKlxuICAgKiBIZWxwZXIgZm9yIG9ic2VydmFibGUgbG9naWNcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBWaWV3Q29uZmlnIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IHNjYWxlLCBvZmZzZXQsIGdyaWRTdGVwIH06IFZpZXdDb25maWdJbnRlcmZhY2UpIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyID0gbmV3IE9ic2VydmVIZWxwZXIoKTtcbiAgICB0aGlzLl9zY2FsZSA9IG5ldyBQcm94eShzY2FsZSwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBWZWN0b3JBcnJheVR5cGUsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgIHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCkgOiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLl9vZmZzZXQgPSBuZXcgUHJveHkob2Zmc2V0LCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IFZlY3RvckFycmF5VHlwZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdICE9PSB2YWx1ZTtcbiAgICAgICAgdGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuX2dyaWRTdGVwID0gZ3JpZFN0ZXA7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLm9uVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvblZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZywgaGFuZGxlcjogVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub25DaGFuZ2Uoc3Vic2NyaWJlck5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS50cmFuc3Bvc2VGb3J3YXJkfVxuICAgKi9cbiAgcHVibGljIHRyYW5zcG9zZUZvcndhcmQoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcbiAgICByZXR1cm4gWyh4IC0gdGhpcy5fb2Zmc2V0WzBdKS90aGlzLl9zY2FsZVswXSwgKHkgLSB0aGlzLl9vZmZzZXRbMV0pL3RoaXMuX3NjYWxlWzFdXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudHJhbnNwb3NlQmFja3dhcmR9XG4gICAqL1xuICBwdWJsaWMgdHJhbnNwb3NlQmFja3dhcmQoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcbiAgICByZXR1cm4gW3gqdGhpcy5fc2NhbGVbMF0gKyB0aGlzLl9vZmZzZXRbMF0sIHkqdGhpcy5fc2NhbGVbMV0gKyB0aGlzLl9vZmZzZXRbMV1dO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS51cGRhdGVTY2FsZUluQ3Vyc29yQ29udGV4dH1cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVTY2FsZUluQ3Vyc29yQ29udGV4dChuZXdTY2FsZTogVmVjdG9yQXJyYXlUeXBlLCBjdXJzb3JDb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChuZXdTY2FsZSwgdGhpcy5fc2NhbGUpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgY29uc3Qgb2xkU2NhbGVQb3NpdGlvbiA9IGNyZWF0ZVZlY3Rvcih0aGlzLnRyYW5zcG9zZUZvcndhcmQoY3Vyc29yQ29vcmRzKSk7XG4gICAgICB0aGlzLnNjYWxlID0gbmV3U2NhbGU7XG4gICAgICBjb25zdCBuZXdTY2FsZVBvc2l0aW9uID0gY3JlYXRlVmVjdG9yKHRoaXMudHJhbnNwb3NlRm9yd2FyZChjdXJzb3JDb29yZHMpKTtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBuZXdTY2FsZVBvc2l0aW9uLmNsb25lKCkuc3ViKG9sZFNjYWxlUG9zaXRpb24pO1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLnRyYW5zcG9zZUJhY2t3YXJkKGRpZmZlcmVuY2UudG9BcnJheSgpKTtcblxuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbGwgdGhlIGRhdGEgaW4gY29uZmlnXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICB1cGRhdGUoeyBzY2FsZSwgb2Zmc2V0LCBncmlkU3RlcCB9OiBWaWV3Q29uZmlnSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKHNjYWxlLCB0aGlzLl9zY2FsZSkgfHwgIWFyZUFycmF5c0VxdWFsKG9mZnNldCwgdGhpcy5fb2Zmc2V0KTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgdGhpcy5ncmlkU3RlcCA9IGdyaWRTdGVwO1xuXG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2FsZSBnZXR0ZXJcbiAgICovXG4gIGdldCBzY2FsZSgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2FsZSBzZXR0ZXJcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICovXG4gIHNldCBzY2FsZShzY2FsZTogVmVjdG9yQXJyYXlUeXBlKSB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKHNjYWxlLCB0aGlzLl9zY2FsZSk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLl9zY2FsZVswXSA9IHNjYWxlWzBdO1xuICAgICAgdGhpcy5fc2NhbGVbMV0gPSBzY2FsZVsxXTtcbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9mZnNldCBnZXR0ZXJcbiAgICovXG4gIGdldCBvZmZzZXQoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIE9mZnNldCBzZXR0ZXJcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKi9cbiAgc2V0IG9mZnNldChvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChvZmZzZXQsIHRoaXMuX29mZnNldCk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLl9vZmZzZXRbMF0gPSBvZmZzZXRbMF07XG4gICAgICB0aGlzLl9vZmZzZXRbMV0gPSBvZmZzZXRbMV07XG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmlkIHN0ZXAgZ2V0dGVyXG4gICAqL1xuICBnZXQgZ3JpZFN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JpZFN0ZXA7XG4gIH1cblxuICAvKipcbiAgICogR3JpZCBzdGVwIHNldHRlclxuICAgKiBAcGFyYW0gZ3JpZFN0ZXAgLSBncmlkIHN0ZXBcbiAgICovXG4gIHNldCBncmlkU3RlcChncmlkU3RlcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gZ3JpZFN0ZXAgIT09IHRoaXMuX2dyaWRTdGVwO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5fZ3JpZFN0ZXAgPSBncmlkU3RlcDtcbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEcmF3ZXIgZnJvbSBcIi4vY2FudmFzL2RyYXdlclwiO1xuaW1wb3J0IFJlY3QgZnJvbSBcIi4vY2FudmFzL2ZpZ3VyZXMvcmVjdFwiO1xuaW1wb3J0IERyYXdhYmxlU3RvcmFnZSBmcm9tIFwiLi9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS1zdG9yYWdlXCI7XG5pbXBvcnQgeyBEcmF3YWJsZUludGVyZmFjZSwgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UgfSBmcm9tIFwiLi9jYW52YXMvdHlwZXNcIjtcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuL2NhbnZhcy9zdHJ1Y3RzL3ZpZXctY29uZmlnXCI7XG5pbXBvcnQgR3JpZCBmcm9tIFwiLi9jYW52YXMvZmlndXJlcy9ncmlkXCI7XG5pbXBvcnQgU3ZnIGZyb20gXCIuL2NhbnZhcy9maWd1cmVzL3N2Z1wiO1xuaW1wb3J0IERyYXdhYmxlR3JvdXAgZnJvbSBcIi4vY2FudmFzL3N0cnVjdHMvZHJhd2FibGUtZ3JvdXBcIjtcblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBEcmF3YWJsZVN0b3JhZ2UoW1xuICBuZXcgR3JpZCgxLCB7XG4gICAgcG9zaXRpb246IFswLCAwXSxcbiAgICB6SW5kZXg6IC1JbmZpbml0eSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIG1haW5MaW5lQ29sb3I6ICcjYmJiJyxcbiAgICBzdWJMaW5lQ29sb3I6ICcjZGVkZWRlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gICAgbGluZXNJbkJsb2NrOiA1LFxuICB9KSxcbiAgbmV3IFJlY3QoMiwge1xuICAgIHBvc2l0aW9uOiBbMTAsIDIwXSxcbiAgICBzaXplOiBbMTAwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZmlsbFN0eWxlOiAnZ3JlZW4nLFxuICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG4gIG5ldyBSZWN0KDMsIHtcbiAgICBwb3NpdGlvbjogWzEwLCAyNV0sXG4gICAgc2l6ZTogWzUwLCA1MF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZmlsbFN0eWxlOiAnYmx1ZScsXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFJlY3QoNCwge1xuICAgIHBvc2l0aW9uOiBbNzAwLCAyNTBdLFxuICAgIHNpemU6IFsxNTAsIDEwMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZmlsbFN0eWxlOiAnYmx1ZScsXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFN2Zyg1LCB7XG4gICAgcG9zaXRpb246IFszMDAsIDU1MF0sXG4gICAgc2l6ZTogWzE1MCwgMTAwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBkYXRhOiBcIjxzdmcgd2lkdGg9JzE2MicgaGVpZ2h0PSc4Micgdmlld0JveD0nMCAwIDE2MiA4MicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMjguNjkyMyAxTDEgNDAuMTI0MUwyOC42OTIzIDgxSDEzNC42NzVMMTYxIDQwLjEyNDFMMTM0LjY3NSAxSDI4LjY5MjNaJyBmaWxsPScjRkZCQ0YyJyBzdHJva2U9J2JsYWNrJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyAvPjwvc3ZnPlwiLFxuICAgIGZpbGxTdHlsZTogJ2JsdWUnLCAvLyBUT0RPINC90LUg0L3Rg9C20L3Ri1xuICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG4gIG5ldyBSZWN0KDYsIHtcbiAgICBwb3NpdGlvbjogWzMwMCwgMzAwXSxcbiAgICBzaXplOiBbMzAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pLFxuICBuZXcgUmVjdCg3LCB7XG4gICAgcG9zaXRpb246IFszNTAsIDMwMF0sXG4gICAgc2l6ZTogWzMwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFJlY3QoOCwge1xuICAgIHBvc2l0aW9uOiBbMzAwLCAzNTBdLFxuICAgIHNpemU6IFszMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG5dKTtcblxuY29uc3QgZ3JvdXAgPSBzdG9yYWdlLmdyb3VwKFs2LCA3LCA4XSk7XG4vLyBzdG9yYWdlLnVuZ3JvdXAoZ3JvdXAuaWQpO1xuXG5jb25zb2xlLmxvZyhzdG9yYWdlKTtcblxuY29uc3Qgdmlld0NvbmZpZzogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UgPSBuZXcgVmlld0NvbmZpZyh7XG4gIHNjYWxlOiBbMSwgMV0sXG4gIG9mZnNldDogWzAsIDBdLFxuICBncmlkU3RlcDogMTUsXG59KTtcbmNvbnNvbGUubG9nKHZpZXdDb25maWcpO1xuXG5jb25zdCBkcmF3ZXI6IERyYXdlciA9IG5ldyBEcmF3ZXIoe1xuICBkb21FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQsXG4gIHZpZXdDb25maWcsXG4gIHN0b3JhZ2UsXG59KTtcbmRyYXdlci5kcmF3KCk7XG5cbnNldFRpbWVvdXQoKCkgPT4ge1xuICBjb25zdCBiYXRjaDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuICBmb3IgKGxldCBpPTA7IGk8MTAwMDsgKytpKSB7XG4gICAgYmF0Y2gucHVzaChuZXcgUmVjdChpKzEwMCwge1xuICAgICAgcG9zaXRpb246IFtNYXRoLnJhbmRvbSgpKmRyYXdlci53aWR0aCwgTWF0aC5yYW5kb20oKSpkcmF3ZXIuaGVpZ2h0XSxcbiAgICAgIHNpemU6IFszMCtNYXRoLnJhbmRvbSgpKjEwMCwgMzArTWF0aC5yYW5kb20oKSoxMDBdLFxuICAgICAgekluZGV4OiAwLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIHNlbGVjdGFibGU6IGZhbHNlLFxuICAgICAgZmlsbFN0eWxlOiAnd2hpdGUnLFxuICAgICAgc3Ryb2tlU3R5bGU6ICdncmVlbicsXG4gICAgICBsaW5lV2lkdGg6IDEsXG4gICAgfSkpO1xuICB9XG4gIHN0b3JhZ2UuYWRkQmF0Y2goYmF0Y2gpO1xufSwgMzApO1xuXG5zZXRUaW1lb3V0KCgpID0+IHtcbiAgc3RvcmFnZS5kZWxldGUoe1xuICAgIHR5cGVzRXhjZXB0OiBbJ0dyaWQnXSxcbiAgICBleHRyYUZpbHRlcjogaXRlbSA9PiBpdGVtLmNvbmZpZy56SW5kZXggPT09IDAsXG4gIH0pO1xuICBzdG9yYWdlLmFkZChuZXcgUmVjdCg1MCwge1xuICAgIHBvc2l0aW9uOiBbMTAwLCAyNV0sXG4gICAgc2l6ZTogWzUwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgZmlsbFN0eWxlOiAncmVkJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pKTtcbn0sIDEwMDApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9