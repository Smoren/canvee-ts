/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/crypto-js/core.js":
/*!****************************************!*\
  !*** ./node_modules/crypto-js/core.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/*globals window, global, require*/

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {

	    var crypto;

	    // Native crypto from window (Browser)
	    if (typeof window !== 'undefined' && window.crypto) {
	        crypto = window.crypto;
	    }

	    // Native crypto in web worker (Browser)
	    if (typeof self !== 'undefined' && self.crypto) {
	        crypto = self.crypto;
	    }

	    // Native crypto from worker
	    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
	        crypto = globalThis.crypto;
	    }

	    // Native (experimental IE 11) crypto from window (Browser)
	    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
	        crypto = window.msCrypto;
	    }

	    // Native crypto from global (NodeJS)
	    if (!crypto && typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g.crypto) {
	        crypto = __webpack_require__.g.crypto;
	    }

	    // Native crypto import via require (NodeJS)
	    if (!crypto && "function" === 'function') {
	        try {
	            crypto = __webpack_require__(/*! crypto */ "?9157");
	        } catch (err) {}
	    }

	    /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */
	    var cryptoSecureRandomInt = function () {
	        if (crypto) {
	            // Use getRandomValues method (Browser)
	            if (typeof crypto.getRandomValues === 'function') {
	                try {
	                    return crypto.getRandomValues(new Uint32Array(1))[0];
	                } catch (err) {}
	            }

	            // Use randomBytes method (NodeJS)
	            if (typeof crypto.randomBytes === 'function') {
	                try {
	                    return crypto.randomBytes(4).readInt32LE();
	                } catch (err) {}
	            }
	        }

	        throw new Error('Native crypto module could not be used to get secure random number.');
	    };

	    /*
	     * Local polyfill of Object.create

	     */
	    var create = Object.create || (function () {
	        function F() {}

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }());

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var j = 0; j < thatSigBytes; j += 4) {
	                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            for (var i = 0; i < nBytes; i += 4) {
	                words.push(cryptoSecureRandomInt());
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            var processedWords;

	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),

/***/ "./node_modules/crypto-js/md5.js":
/*!***************************************!*\
  !*** ./node_modules/crypto-js/md5.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(/*! ./core */ "./node_modules/crypto-js/core.js"));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),

/***/ "./src/canvas/drawer.ts":
/*!******************************!*\
  !*** ./src/canvas/drawer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_image_cache_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/image-cache-helper */ "./src/canvas/helpers/image-cache-helper.ts");
/* harmony import */ var _structs_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./structs/vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _structs_filters_coords_grid_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structs/filters/coords-grid-filter */ "./src/canvas/structs/filters/coords-grid-filter.ts");
/* harmony import */ var _structs_drawable_positional_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./structs/drawable/positional-context */ "./src/canvas/structs/drawable/positional-context.ts");
/* harmony import */ var _structs_bounds_rectangular_bound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./structs/bounds/rectangular-bound */ "./src/canvas/structs/bounds/rectangular-bound.ts");





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
         */
        this._subscriberName = 'Drawer';
        this._domElement = domElement;
        this._viewConfig = viewConfig;
        this._storage = storage;
        this._context = domElement.getContext('2d');
        this._initResizeObserver();
        this._initViewConfigObserver();
        this._initStorageObserver();
        this._initImageCacheObserver();
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
            if (item.config.visible && item.config.display) {
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
    Drawer.prototype.getBound = function () {
        return new _structs_bounds_rectangular_bound__WEBPACK_IMPORTED_MODULE_4__["default"]({
            position: this._viewConfig.transposeBackward([0, 0]),
            size: this._viewConfig.transposeBackward([this.width, this.height]),
        });
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
     */
    Drawer.prototype._initResizeObserver = function () {
        var _this = this;
        this._resizeObserver = new ResizeObserver(function () { return _this.refresh(); });
        this._resizeObserver.observe(this._domElement);
    };
    /**
     * Initiates view config observer
     */
    Drawer.prototype._initViewConfigObserver = function () {
        var _this = this;
        this._viewConfig.onViewChange(this._subscriberName, function () { return _this.refresh(); });
    };
    /**
     * Initiates storage observer
     */
    Drawer.prototype._initStorageObserver = function () {
        var _this = this;
        this._storage.onViewChange(this._subscriberName, function () { return _this.refresh(); });
    };
    /**
     * Initiates image cache observer
     */
    Drawer.prototype._initImageCacheObserver = function () {
        var _this = this;
        _helpers_image_cache_helper__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe(this._subscriberName, function () {
            _this.refresh();
        });
    };
    /**
     * Initiates mouse events observer
     */
    Drawer.prototype._initMouseEvents = function () {
        // TODO перенести куда-нибудь
        var _this = this;
        var coordsFilter = new _structs_filters_coords_grid_filter__WEBPACK_IMPORTED_MODULE_2__["default"]();
        var filterCoords = function (coords) {
            return coordsFilter.process(coords, _this._viewConfig.getConfig());
        };
        var currentElementContext = new _structs_drawable_positional_context__WEBPACK_IMPORTED_MODULE_3__["default"](null, null);
        var DEVIATION = 8;
        var getNearBoundElement = function (coords) {
            var transposedCoords = _this._viewConfig.transposeBackward(coords);
            return _this._storage.findByNearEdgePosition(transposedCoords, _this._viewConfig.scale, true, DEVIATION / _this._viewConfig.scale[0]);
        };
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
            event.preventDefault();
        });
        var mouseDownCoords = null;
        this._domElement.addEventListener('mousedown', function (event) {
            if (currentElementContext.isEmpty()) {
                var transposedCoords = _this._viewConfig.transposeBackward([event.offsetX, event.offsetY]);
                currentElementContext = _this._storage.findByPosition(transposedCoords, _this._viewConfig.scale, true);
            }
            mouseDownCoords = [event.offsetX, event.offsetY];
            _this._domElement.style.cursor = 'grabbing';
        });
        this._domElement.addEventListener('mousemove', function (event) {
            var mouseMoveCoords = [event.offsetX, event.offsetY];
            var transposedCoords = _this._viewConfig.transposeBackward(mouseMoveCoords);
            if (mouseDownCoords === null) {
                if (!getNearBoundElement(mouseMoveCoords).isEmpty()) {
                    _this._domElement.style.cursor = 'crosshair';
                }
                else if (!_this._storage.findByPosition(transposedCoords, _this._viewConfig.scale, true).isEmpty()) {
                    _this._domElement.style.cursor = 'pointer';
                }
                else {
                    _this._domElement.style.cursor = 'default';
                }
                return;
            }
            if (!currentElementContext.isEmpty()) {
                var newPosition = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(transposedCoords)
                    .sub((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(currentElementContext.position))
                    .toArray();
                var newPositionFiltered = filterCoords(newPosition);
                if (!(0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(newPositionFiltered).isEqual((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(currentElementContext.element.config.position))) {
                    currentElementContext.element.config.position = newPositionFiltered;
                }
            }
            else {
                var difference = [
                    mouseDownCoords[0] - mouseMoveCoords[0],
                    mouseDownCoords[1] - mouseMoveCoords[1],
                ];
                _this._viewConfig.offset = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(_this._viewConfig.offset)
                    .sub((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(difference))
                    .toArray();
            }
            mouseDownCoords = mouseMoveCoords;
        });
        this._domElement.addEventListener('mouseup', function () {
            if (!currentElementContext.isEmpty()) {
                console.log(currentElementContext.element);
            }
            currentElementContext = new _structs_drawable_positional_context__WEBPACK_IMPORTED_MODULE_3__["default"](null, null);
            mouseDownCoords = null;
            _this._domElement.style.cursor = 'default';
        });
    };
    return Drawer;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drawer);


/***/ }),

/***/ "./src/canvas/figures/ellipse.ts":
/*!***************************************!*\
  !*** ./src/canvas/figures/ellipse.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_drawable_positional_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/drawable/positional-drawable */ "./src/canvas/structs/drawable/positional-drawable.ts");
/* harmony import */ var _structs_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../structs/vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _structs_bounds_ellipse_bound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../structs/bounds/ellipse-bound */ "./src/canvas/structs/bounds/ellipse-bound.ts");
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
 * Ellipse figure
 * @public
 */
var Ellipse = /** @class */ (function (_super) {
    __extends(Ellipse, _super);
    /**
     * Rect constructor
     * @param id - object ID
     * @param config - view config
     * @param data - linked extra data
     */
    function Ellipse(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
        }) || this;
        /**
         * Object type
         */
        _this._type = 'Ellipse';
        return _this;
    }
    /**
     * Center getter
     * @param scale - scale vector
     */
    Ellipse.prototype.getCenter = function (scale) {
        var _a = this.translatePositionConfig((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(scale).reverse().toArray()), position = _a[0], size = _a[1];
        return (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(position).add((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(size).div(2)).toArray();
    };
    /**
     * Center getter
     * @param scale - scale vector
     */
    Ellipse.prototype.getRadius = function (scale) {
        var _a = this.translatePositionConfig((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(scale).reverse().toArray()), size = _a[1];
        return (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(size).div(2).toArray();
    };
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    Ellipse.prototype.draw = function (drawer) {
        var _a;
        drawer.context.beginPath();
        var lineWidth = this._config.scalable
            ? this._config.lineWidth
            : this._config.lineWidth / drawer.viewConfig.scale[0];
        drawer.context.strokeStyle = this._config.strokeStyle;
        drawer.context.fillStyle = this._config.fillStyle;
        drawer.context.lineWidth = lineWidth;
        (_a = drawer.context).ellipse.apply(_a, __spreadArray(__spreadArray(__spreadArray([], this.getCenter(drawer.viewConfig.scale), false), this.getRadius(drawer.viewConfig.scale), false), [0, 0, 2 * Math.PI], false));
        drawer.context.fill();
        if (this._config.lineWidth !== 0) {
            drawer.context.stroke();
        }
        drawer.context.closePath();
    };
    Object.defineProperty(Ellipse.prototype, "bound", {
        /**
         * bound getter
         */
        get: function () {
            return new _structs_bounds_ellipse_bound__WEBPACK_IMPORTED_MODULE_2__["default"]({
                position: [0, 0],
                size: this._config.size,
            });
        },
        enumerable: false,
        configurable: true
    });
    return Ellipse;
}(_structs_drawable_positional_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ellipse);


/***/ }),

/***/ "./src/canvas/figures/grid.ts":
/*!************************************!*\
  !*** ./src/canvas/figures/grid.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_drawable_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/drawable/drawable */ "./src/canvas/structs/drawable/drawable.ts");
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
    function Grid(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
        }) || this;
        /**
         * Object type
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
        var _a = drawer.getBound().toArray(), fromBound = _a[0], toBound = _a[1];
        var scale = drawer.viewConfig.scale[0];
        drawer.context.lineWidth = this._config.lineWidth / scale;
        var step = drawer.viewConfig.gridStep;
        if (scale < 1) {
            step *= Math.pow(2, Math.round(Math.log2(1 / scale)));
        }
        else {
            step /= Math.pow(2, Math.round(Math.log2(scale)));
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
     * @param yOffset - vertical offset
     * @param drawer - drawer object
     * @param color - color
     * @param fromBound - left-top bound
     * @param toBound - right-bottom bound
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
     * @param drawer - drawer object
     * @param xOffset - horizontal offset
     * @param color - color
     * @param fromBound - left-top bound
     * @param toBound - right-bottom bound
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
}(_structs_drawable_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Grid);


/***/ }),

/***/ "./src/canvas/figures/line.ts":
/*!************************************!*\
  !*** ./src/canvas/figures/line.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_drawable_positional_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/drawable/positional-drawable */ "./src/canvas/structs/drawable/positional-drawable.ts");
/* harmony import */ var _structs_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../structs/vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _structs_bounds_line_bound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../structs/bounds/line-bound */ "./src/canvas/structs/bounds/line-bound.ts");
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
 * Line figure
 * @public
 */
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    /**
     * Rect constructor
     * @param id - object ID
     * @param config - view config
     * @param data - linked extra data
     */
    function Line(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
        }) || this;
        /**
         * Object type
         */
        _this._type = 'Line';
        return _this;
    }
    Object.defineProperty(Line.prototype, "from", {
        /**
         * From getter
         */
        get: function () {
            return this._config.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "to", {
        /**
         * To getter
         */
        get: function () {
            return (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(this._config.position).add(this._config.size).toArray();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    Line.prototype.draw = function (drawer) {
        var _a, _b;
        var scale = drawer.viewConfig.scale[0];
        drawer.context.beginPath();
        drawer.context.strokeStyle = this._config.strokeStyle;
        drawer.context.lineWidth = this._config.scalable ? this._config.lineWidth : this._config.lineWidth / scale;
        (_a = drawer.context).moveTo.apply(_a, this.from);
        (_b = drawer.context).lineTo.apply(_b, this.to);
        if (this._config.lineWidth !== 0) {
            drawer.context.stroke();
        }
        drawer.context.closePath();
    };
    Object.defineProperty(Line.prototype, "bound", {
        /**
         * bound getter
         */
        get: function () {
            return new _structs_bounds_line_bound__WEBPACK_IMPORTED_MODULE_2__["default"]({
                position: this._config.position,
                size: this._config.size,
                deviation: this._config.lineWidth / 2,
                scalable: this._config.scalable,
            });
        },
        enumerable: false,
        configurable: true
    });
    return Line;
}(_structs_drawable_positional_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Line);


/***/ }),

/***/ "./src/canvas/figures/rect.ts":
/*!************************************!*\
  !*** ./src/canvas/figures/rect.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_drawable_positional_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/drawable/positional-drawable */ "./src/canvas/structs/drawable/positional-drawable.ts");
/* harmony import */ var _structs_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../structs/vector */ "./src/canvas/structs/vector/index.ts");
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
    function Rect(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
        }) || this;
        /**
         * Object type
         */
        _this._type = 'Rect';
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    Rect.prototype.draw = function (drawer) {
        var _a, _b;
        var _c = this.translatePositionConfig((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(drawer.viewConfig.scale).reverse().toArray()), position = _c[0], size = _c[1];
        var lineWidth = this._config.scalable
            ? this._config.lineWidth
            : this._config.lineWidth / drawer.viewConfig.scale[0];
        drawer.context.beginPath();
        drawer.context.strokeStyle = this._config.strokeStyle;
        drawer.context.fillStyle = this._config.fillStyle;
        drawer.context.lineWidth = lineWidth;
        (_a = drawer.context).fillRect.apply(_a, __spreadArray(__spreadArray([], position, false), size, false));
        if (this._config.lineWidth !== 0) {
            (_b = drawer.context).strokeRect.apply(_b, __spreadArray(__spreadArray([], position, false), size, false));
        }
        drawer.context.closePath();
    };
    return Rect;
}(_structs_drawable_positional_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rect);


/***/ }),

/***/ "./src/canvas/figures/svg.ts":
/*!***********************************!*\
  !*** ./src/canvas/figures/svg.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_drawable_positional_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/drawable/positional-drawable */ "./src/canvas/structs/drawable/positional-drawable.ts");
/* harmony import */ var _helpers_image_cache_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/image-cache-helper */ "./src/canvas/helpers/image-cache-helper.ts");
/* harmony import */ var _structs_bounds_polygonal_bound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../structs/bounds/polygonal-bound */ "./src/canvas/structs/bounds/polygonal-bound.ts");
/* harmony import */ var _structs_filters_coords_collection_forward_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../structs/filters/coords-collection-forward-filter */ "./src/canvas/structs/filters/coords-collection-forward-filter.ts");
/* harmony import */ var _structs_vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../structs/vector */ "./src/canvas/structs/vector/index.ts");
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
     * @param bound - collection of the bound points
     * @param data - linked extra data
     */
    function Svg(_a) {
        var id = _a.id, config = _a.config, bound = _a.bound, _b = _a.data, data = _b === void 0 ? {} : _b;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
        }) || this;
        /**
         * Object type
         */
        _this._type = 'Svg';
        /**
         * Image DOM element
         */
        _this._img = null;
        _this._bound = bound;
        _this._boundFilter = new _structs_filters_coords_collection_forward_filter__WEBPACK_IMPORTED_MODULE_3__["default"]();
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    Svg.prototype.draw = function (drawer) {
        var _this = this;
        if (!this._tryDraw(drawer)) {
            this._img = _helpers_image_cache_helper__WEBPACK_IMPORTED_MODULE_1__["default"].cache(this._config.data, 'image/svg+xml', function (img) {
                _this._img = img;
            });
            this._tryDraw(drawer);
        }
    };
    Object.defineProperty(Svg.prototype, "sourceWidth", {
        /**
         * sourceWidth getter
         */
        get: function () {
            return this._img !== null ? this._img.width : this._config.size[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Svg.prototype, "sourceHeight", {
        /**
         * sourceHeight getter
         */
        get: function () {
            return this._img !== null ? this._img.height : this._config.size[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Svg.prototype, "scale", {
        /**
         * scale getter
         */
        get: function () {
            return [
                this._config.size[0] / this.sourceWidth,
                this._config.size[1] / this.sourceHeight,
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Svg.prototype, "bound", {
        /**
         * bound getter
         */
        get: function () {
            return new _structs_bounds_polygonal_bound__WEBPACK_IMPORTED_MODULE_2__["default"]({
                points: this._boundFilter.process(this._bound, {
                    scale: this.scale,
                    offset: [0, 0],
                    gridStep: 0,
                }),
            });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * {@inheritDoc DrawableInterface.getScaledBound}
     */
    Svg.prototype.getScaledBound = function (scale) {
        // TODO implement
        return _super.prototype.getScaledBound.call(this, scale);
    };
    /**
     * Tries to draw the figure if the image is ready
     * @param drawer - drawer object
     */
    Svg.prototype._tryDraw = function (drawer) {
        var _a, _b;
        if (this._img !== null) {
            // const scale = this.scale;
            // const position = this._config.position;
            // const scaledPosition: VectorArrayType = [position[0]/scale[0], position[1]/scale[1]];
            var _c = this.translatePositionConfig((0,_structs_vector__WEBPACK_IMPORTED_MODULE_4__.toVector)(drawer.viewConfig.scale).reverse().toArray()), position = _c[0], size = _c[1];
            var scale = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_4__.toVector)(this.scale)
                .divCoords(this._config.size)
                .mulCoords(size)
                .toArray();
            var scaledPosition = [position[0] / scale[0], position[1] / scale[1]];
            drawer.context.save();
            drawer.context.beginPath();
            (_a = drawer.context).scale.apply(_a, scale);
            (_b = drawer.context).drawImage.apply(_b, __spreadArray([this._img], scaledPosition, false));
            drawer.context.closePath();
            drawer.context.restore();
            return true;
        }
        return false;
    };
    return Svg;
}(_structs_drawable_positional_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Svg);


/***/ }),

/***/ "./src/canvas/helpers/base.ts":
/*!************************************!*\
  !*** ./src/canvas/helpers/base.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "areArraysEqual": () => (/* binding */ areArraysEqual),
/* harmony export */   "createBlob": () => (/* binding */ createBlob),
/* harmony export */   "createElementFromHTML": () => (/* binding */ createElementFromHTML),
/* harmony export */   "createUrlFromBlob": () => (/* binding */ createUrlFromBlob),
/* harmony export */   "getMaxPosition": () => (/* binding */ getMaxPosition),
/* harmony export */   "getMinPosition": () => (/* binding */ getMinPosition),
/* harmony export */   "hashString": () => (/* binding */ hashString),
/* harmony export */   "isInEllipse": () => (/* binding */ isInEllipse),
/* harmony export */   "translatePositionConfig": () => (/* binding */ translatePositionConfig)
/* harmony export */ });
/* harmony import */ var crypto_js_md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js/md5 */ "./node_modules/crypto-js/md5.js");
/* harmony import */ var crypto_js_md5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js_md5__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _structs_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../structs/vector */ "./src/canvas/structs/vector/index.ts");


/**
 * Returns true if arrays are equal and false else
 * @public
 * @param lhs - first array to compare
 * @param rhs - second array to compare
 */
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
 * @public
 * @param data - text
 * @param type - type
 */
function createBlob(data, type) {
    return new Blob([data], { type: type });
}
/**
 * Creates URL from blob
 * @public
 * @param blob - blob
 */
function createUrlFromBlob(blob) {
    var URL = (window.URL || window.webkitURL || window);
    return URL.createObjectURL(blob);
}
/**
 * Finds and returns minimal (left-top) position
 * @public
 * @param positions - input positions
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
/**
 * Finds and returns maximal (right-bottom) position
 * @public
 * @param positions - input positions
 */
function getMaxPosition(positions) {
    var maxX = -Infinity;
    var maxY = -Infinity;
    positions.forEach(function (position) {
        if (position[0] > maxX) {
            maxX = position[0];
        }
        if (position[1] > maxY) {
            maxY = position[1];
        }
    });
    return [maxX, maxY];
}
/**
 * Creates an MD5 hash from string
 * @public
 * @param input - input string
 */
function hashString(input) {
    return crypto_js_md5__WEBPACK_IMPORTED_MODULE_0___default()(input).toString();
}
/**
 * Returns true if ellipse includes point
 * @param point - point coords vector
 * @param center - center vector
 * @param radius - radius vector
 */
function isInEllipse(point, center, radius) {
    var _a = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(point).sub(center).toArray(), x = _a[0], y = _a[1];
    var _b = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(radius).toArray(), a = _b[0], b = _b[1];
    return (Math.pow(x, 2)) / (Math.pow(a, 2)) + (Math.pow(y, 2)) / (Math.pow(b, 2)) <= 1;
}
/**
 * Returns centered scaled position and size
 * @param position - position vector
 * @param size - size vector
 * @param scale - scale vector
 * @param offset - left top point relative offset
 */
function translatePositionConfig(position, size, scale, offset) {
    var mainPosition = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(position).sub((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(size).mulCoords(offset)).toArray();
    var newSize = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(size).mulCoords(scale).toArray();
    var newPosition = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(mainPosition).add((0,_structs_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(size).sub(newSize).mulCoords(offset)).toArray();
    return [newPosition, newSize];
}


/***/ }),

/***/ "./src/canvas/helpers/image-cache-helper.ts":
/*!**************************************************!*\
  !*** ./src/canvas/helpers/image-cache-helper.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _structs_image_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/image-cache */ "./src/canvas/structs/image-cache.ts");

/**
 * Image cache helper
 * @public
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new _structs_image_cache__WEBPACK_IMPORTED_MODULE_0__["default"]());


/***/ }),

/***/ "./src/canvas/helpers/observe-helper.ts":
/*!**********************************************!*\
  !*** ./src/canvas/helpers/observe-helper.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
         */
        this._handlerMap = {};
        /**
         * Flag for muting handlers
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
     * {@inheritDoc ObserveHelperInterface.processWithMutingHandlers}
     */
    ObserveHelper.prototype.processWithMutingHandlers = function (extra) {
        if (extra === void 0) { extra = null; }
        return this.withMutingHandlers(function () { return [true, extra]; });
    };
    /**
     * {@inheritDoc ObserveHelperInterface.withMutingHandlers}
     */
    ObserveHelper.prototype.withMutingHandlers = function (action) {
        if (this._muteHandlers) {
            action(this);
        }
        else {
            this._muteHandlers = true;
            var _a = action(this), processFlag = _a[0], extra = _a[1];
            this._muteHandlers = false;
            if (processFlag) {
                return this._processHandlers(extra);
            }
        }
        return true;
    };
    /**
     * Process all registered handlers
     * @param extra - linked extra data
     */
    ObserveHelper.prototype._processHandlers = function (extra) {
        var _this = this;
        if (extra === void 0) { extra = null; }
        Object.values(this._handlerMap)
            .forEach(function (handler) { return handler(_this, extra); });
        return true;
    };
    return ObserveHelper;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ObserveHelper);


/***/ }),

/***/ "./src/canvas/helpers/type-helpers.ts":
/*!********************************************!*\
  !*** ./src/canvas/helpers/type-helpers.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isLayer": () => (/* binding */ isLayer),
/* harmony export */   "isPositional": () => (/* binding */ isPositional)
/* harmony export */ });
/**
 * Checks if item is instance of PositionalDrawableInterface
 * @see PositionalDrawableInterface
 * @param item - item to check
 */
function isPositional(item) {
    return 'isPositional' in item;
}
/**
 * Checks if item is instance of PositionalDrawableInterface
 * @see DrawableLayerInterface
 * @param item - item to check
 */
function isLayer(item) {
    return 'isLayer' in item;
}


/***/ }),

/***/ "./src/canvas/structs/bounds/ellipse-bound.ts":
/*!****************************************************!*\
  !*** ./src/canvas/structs/bounds/ellipse-bound.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rectangular_bound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangular-bound */ "./src/canvas/structs/bounds/rectangular-bound.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vector */ "./src/canvas/structs/vector/index.ts");



/**
 * RectangularBound class
 */
var EllipseBound = /** @class */ (function () {
    /**
     * RectangularBound constructor
     * @param config - bound config
     */
    function EllipseBound(config) {
        this._config = config;
    }
    Object.defineProperty(EllipseBound.prototype, "center", {
        /**
         * Radius getter
         */
        get: function () {
            return (0,_vector__WEBPACK_IMPORTED_MODULE_2__.toVector)(this._config.position).add(this.radius).toArray();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EllipseBound.prototype, "radius", {
        /**
         * Radius getter
         */
        get: function () {
            return (0,_vector__WEBPACK_IMPORTED_MODULE_2__.toVector)(this._config.size).div(2).toArray();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * {@inheritDoc BoundInterface.includes}
     */
    EllipseBound.prototype.includes = function (coords) {
        return (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.isInEllipse)(coords, this.center, this.radius);
    };
    /**
     * {@inheritDoc BoundInterface.isNearEdge}
     */
    EllipseBound.prototype.isNearEdge = function (coords, scale, deviation) {
        var deviationVector = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.toVector)([deviation, deviation]);
        var maxRadius = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.toVector)(this.radius).add(deviationVector);
        var minRadius = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.toVector)(this.radius).sub(deviationVector);
        return (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.isInEllipse)(coords, this.center, maxRadius)
            && !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.isInEllipse)(coords, this.center, minRadius);
    };
    /**
     * {@inheritDoc BoundInterface.toArray}
     */
    EllipseBound.prototype.toArray = function () {
        return [this._config.position, this._config.size];
    };
    /**
     * {@inheritDoc BoundInterface.toRectBound}
     */
    EllipseBound.prototype.toRectBound = function () {
        return new _rectangular_bound__WEBPACK_IMPORTED_MODULE_0__["default"]({
            position: this._config.position,
            size: this._config.size,
        });
    };
    /**
     * {@inheritDoc BoundInterface.specify}
     */
    EllipseBound.prototype.specify = function (scale, offset) {
        if (offset === void 0) { offset = [0, 0]; }
        var _a = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.translatePositionConfig)(this._config.position, this._config.size, scale, offset), position = _a[0], size = _a[1];
        this._config.position = position;
        this._config.size = size;
        return this;
    };
    return EllipseBound;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EllipseBound);


/***/ }),

/***/ "./src/canvas/structs/bounds/line-bound.ts":
/*!*************************************************!*\
  !*** ./src/canvas/structs/bounds/line-bound.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rectangular_bound__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangular-bound */ "./src/canvas/structs/bounds/rectangular-bound.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vector */ "./src/canvas/structs/vector/index.ts");


/**
 * RectangularBound class
 */
var LineBound = /** @class */ (function () {
    /**
     * RectangularBound constructor
     * @param config - bound config
     */
    function LineBound(config) {
        this._config = config;
    }
    /**
     * {@inheritDoc BoundInterface.includes}
     * @param coords - coords vector
     * @param scale - scale vector
     * @param extraDeviation - minimal deviation size
     */
    LineBound.prototype.includes = function (coords, scale, extraDeviation) {
        if (extraDeviation === void 0) { extraDeviation = 0; }
        // TODO добавить в вектор укорачивание/удлиннение начала и конца
        var vectors = (0,_vector__WEBPACK_IMPORTED_MODULE_1__.createPolygonVectors)([
            [0, 0],
            [this._config.size[0], this._config.size[1]],
        ]);
        var deviation = this._config.scalable ? this._config.deviation : this._config.deviation / scale[0];
        for (var _i = 0, vectors_1 = vectors; _i < vectors_1.length; _i++) {
            var vector = vectors_1[_i];
            if (vector.getDistanceVector(coords).length <= deviation + extraDeviation) {
                return true;
            }
        }
        return false;
    };
    /**
     * {@inheritDoc BoundInterface.isNearEdge}
     */
    LineBound.prototype.isNearEdge = function (coords, scale, deviation) {
        return !this.includes(coords, scale, 0) && this.includes(coords, scale, deviation);
    };
    /**
     * {@inheritDoc BoundInterface.toArray}
     */
    LineBound.prototype.toArray = function () {
        return [this._config.position, this._config.size];
    };
    /**
     * {@inheritDoc BoundInterface.toRectBound}
     */
    LineBound.prototype.toRectBound = function () {
        return new _rectangular_bound__WEBPACK_IMPORTED_MODULE_0__["default"]({
            position: this._config.position,
            size: this._config.size,
        });
    };
    /**
     * {@inheritDoc BoundInterface.specify}
     */
    LineBound.prototype.specify = function () {
        // line does not need bound scaling
        return this;
    };
    return LineBound;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LineBound);


/***/ }),

/***/ "./src/canvas/structs/bounds/polygonal-bound.ts":
/*!******************************************************!*\
  !*** ./src/canvas/structs/bounds/polygonal-bound.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _rectangular_bound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rectangular-bound */ "./src/canvas/structs/bounds/rectangular-bound.ts");



/**
 * PolygonalBound class
 */
var PolygonalBound = /** @class */ (function () {
    /**
     * RectangularBound constructor
     * @param config - bound config
     */
    function PolygonalBound(config) {
        this._config = config;
    }
    /**
     * {@inheritDoc BoundInterface.includes}
     */
    PolygonalBound.prototype.includes = function (coords) {
        var precision = 0;
        var x = coords[0];
        var y = coords[1];
        var isInside = false;
        var polygonVectors = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.createPolygonVectors)(this._config.points);
        for (var _i = 0, polygonVectors_1 = polygonVectors; _i < polygonVectors_1.length; _i++) {
            var vector = polygonVectors_1[_i];
            if (vector.includes(coords, precision)) {
                return true;
            }
            var _a = vector.position.toArray(), xj = _a[0], yj = _a[1];
            var _b = vector.target.toArray(), xi = _b[0], yi = _b[1];
            var isIntersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (isIntersect) {
                isInside = !isInside;
            }
        }
        return isInside;
    };
    /**
     * {@inheritDoc BoundInterface.isNearEdge}
     */
    PolygonalBound.prototype.isNearEdge = function (coords, scale, deviation) {
        var vectors = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.createPolygonVectors)(this._config.points);
        for (var _i = 0, vectors_1 = vectors; _i < vectors_1.length; _i++) {
            var vector = vectors_1[_i];
            if (vector.getDistanceVector(coords).length <= deviation) {
                return true;
            }
        }
        return false;
    };
    /**
     * {@inheritDoc BoundInterface.toArray}
     */
    PolygonalBound.prototype.toArray = function () {
        return this.toRectBound().toArray();
    };
    /**
     * {@inheritDoc BoundInterface.toRectBound}
     */
    PolygonalBound.prototype.toRectBound = function () {
        var minPosition = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.getMinPosition)(this._config.points);
        var maxPosition = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.getMaxPosition)(this._config.points);
        return new _rectangular_bound__WEBPACK_IMPORTED_MODULE_2__["default"]({
            position: minPosition,
            size: (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(maxPosition).sub(minPosition).toArray(),
        });
    };
    /**
     * {@inheritDoc BoundInterface.specify}
     */
    PolygonalBound.prototype.specify = function (scale, offset) {
        var _a = this.toRectBound().toArray(), oldPosition = _a[0], oldSize = _a[1];
        var _b = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.translatePositionConfig)(oldPosition, oldSize, scale, offset), position = _b[0], size = _b[1];
        var newScale = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(size).divCoords(oldSize).toArray();
        var newPosition = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(position).sub(oldPosition).toArray();
        for (var i in this._config.points) {
            this._config.points[i] = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(this._config.points[i])
                .mulCoords(newScale)
                .add(newPosition)
                .toArray();
        }
        return this;
    };
    return PolygonalBound;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PolygonalBound);


/***/ }),

/***/ "./src/canvas/structs/bounds/rectangular-bound.ts":
/*!********************************************************!*\
  !*** ./src/canvas/structs/bounds/rectangular-bound.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vector */ "./src/canvas/structs/vector/index.ts");


/**
 * RectangularBound class
 */
var RectangularBound = /** @class */ (function () {
    /**
     * RectangularBound constructor
     * @param config - bound config
     */
    function RectangularBound(config) {
        this._config = config;
    }
    /**
     * {@inheritDoc BoundInterface.includes}
     */
    RectangularBound.prototype.includes = function (coords) {
        return coords[0] >= this._config.position[0]
            && coords[0] <= this._config.position[0] + this._config.size[0]
            && coords[1] >= this._config.position[1]
            && coords[1] <= this._config.position[1] + this._config.size[1];
    };
    /**
     * {@inheritDoc BoundInterface.isNearEdge}
     */
    RectangularBound.prototype.isNearEdge = function (coords, scale, deviation) {
        var vectors = (0,_vector__WEBPACK_IMPORTED_MODULE_1__.createPolygonVectors)([
            [this._config.position[0], this._config.position[1]],
            [this._config.position[0] + this._config.size[0], this._config.position[1]],
            [this._config.position[0] + this._config.size[0], this._config.position[1] + this._config.size[1]],
            [this._config.position[0], this._config.position[1] + this._config.size[1]],
        ]);
        for (var _i = 0, vectors_1 = vectors; _i < vectors_1.length; _i++) {
            var vector = vectors_1[_i];
            if (vector.getDistanceVector(coords).length <= deviation) {
                return true;
            }
        }
        return false;
    };
    /**
     * {@inheritDoc BoundInterface.toArray}
     */
    RectangularBound.prototype.toArray = function () {
        return [this._config.position, this._config.size];
    };
    /**
     * {@inheritDoc BoundInterface.toRectBound}
     */
    RectangularBound.prototype.toRectBound = function () {
        return new RectangularBound({
            position: this._config.position,
            size: this._config.size,
        });
    };
    /**
     * {@inheritDoc BoundInterface.specify}
     */
    RectangularBound.prototype.specify = function (scale, offset) {
        if (offset === void 0) { offset = [0, 0]; }
        var _a = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.translatePositionConfig)(this._config.position, this._config.size, scale, offset), position = _a[0], size = _a[1];
        this._config.position = position;
        this._config.size = size;
        return this;
    };
    return RectangularBound;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RectangularBound);


/***/ }),

/***/ "./src/canvas/structs/drawable/drawable-group.ts":
/*!*******************************************************!*\
  !*** ./src/canvas/structs/drawable/drawable-group.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _drawable_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../drawable/drawable */ "./src/canvas/structs/drawable/drawable.ts");
/* harmony import */ var _drawable_drawable_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../drawable/drawable-storage */ "./src/canvas/structs/drawable/drawable-storage.ts");
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
 * Drawable group class
 */
var DrawableGroup = /** @class */ (function (_super) {
    __extends(DrawableGroup, _super);
    /**
     * DrawableGroup constructor
     * @param id - group ID
     * @param config - config
     * @param data - extra data
     * @param list - list of grouped objects
     */
    function DrawableGroup(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b, _c = _a.list, list = _c === void 0 ? [] : _c;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
        }) || this;
        /**
         * Name of class to use as subscriber name in observable logic
         */
        _this._subscriberName = 'DrawableGroup';
        _this._storage = new _drawable_drawable_storage__WEBPACK_IMPORTED_MODULE_1__["default"](_this._processListToGroup(list));
        _this._storage.onViewChange(_this._subscriberName, function (target, extra) {
            _this._observeHelper.processWithMutingHandlers(extra);
        });
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    DrawableGroup.prototype.draw = function (drawer) {
        this._storage.list.forEach(function (item) {
            if (item.config.visible && item.config.display) {
                item.draw(drawer);
            }
        });
    };
    /**
     * {@inheritDoc DrawableInterface.destruct}
     */
    DrawableGroup.prototype.destruct = function () {
        var _this = this;
        this._storage.list.forEach(function (item) {
            item.offViewChange(_this._subscriberName);
        });
        return this._processListToUngroup(this.list);
    };
    Object.defineProperty(DrawableGroup.prototype, "list", {
        /**
         * List getter
         */
        get: function () {
            return this._storage.list;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Some actions with list before grouping
     */
    DrawableGroup.prototype._processListToGroup = function (list) {
        return list;
    };
    /**
     * Some actions with list before ungrouping
     */
    DrawableGroup.prototype._processListToUngroup = function (list) {
        return list;
    };
    return DrawableGroup;
}(_drawable_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawableGroup);


/***/ }),

/***/ "./src/canvas/structs/drawable/drawable-layer.ts":
/*!*******************************************************!*\
  !*** ./src/canvas/structs/drawable/drawable-layer.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _drawable_group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawable-group */ "./src/canvas/structs/drawable/drawable-group.ts");
/* harmony import */ var _drawable_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawable-storage */ "./src/canvas/structs/drawable/drawable-storage.ts");
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
 * DrawableLayer class
 */
var DrawableLayer = /** @class */ (function (_super) {
    __extends(DrawableLayer, _super);
    /**
     * DrawableLayer constructor
     * @param id - group ID
     * @param config - config
     * @param data - extra data
     * @param list - list of grouped objects
     */
    function DrawableLayer(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b, _c = _a.list, list = _c === void 0 ? [] : _c;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
        }) || this;
        /**
         * {@inheritDoc DrawableLayerInterface.isLayer}
         */
        _this.isLayer = true;
        _this._storage = new _drawable_storage__WEBPACK_IMPORTED_MODULE_1__["default"](_this._processListToGroup(list));
        _this._storage.onViewChange(_this._subscriberName, function (target, extra) {
            _this._observeHelper.processWithMutingHandlers(extra);
        });
        return _this;
    }
    Object.defineProperty(DrawableLayer.prototype, "config", {
        /**
         * config getter
         */
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrawableLayer.prototype, "storage", {
        /**
         * {@inheritDoc DrawableLayerInterface.storage}
         */
        get: function () {
            return this._storage;
        },
        enumerable: false,
        configurable: true
    });
    return DrawableLayer;
}(_drawable_group__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawableLayer);


/***/ }),

/***/ "./src/canvas/structs/drawable/drawable-storage.ts":
/*!*********************************************************!*\
  !*** ./src/canvas/structs/drawable/drawable-storage.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/observe-helper */ "./src/canvas/helpers/observe-helper.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _drawable_positional_drawable_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../drawable/positional-drawable-group */ "./src/canvas/structs/drawable/positional-drawable-group.ts");
/* harmony import */ var _helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers/type-helpers */ "./src/canvas/helpers/type-helpers.ts");
/* harmony import */ var _positional_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./positional-context */ "./src/canvas/structs/drawable/positional-context.ts");
/* harmony import */ var _drawable_layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./drawable-layer */ "./src/canvas/structs/drawable/drawable-layer.ts");







/**
 * Storage for drawable objects
 * @public
 */
var DrawableStorage = /** @class */ (function () {
    /**
     * Drawable constructor
     * @param items - batch list to cache
     */
    function DrawableStorage(items) {
        var _this = this;
        /**
         * Name of class to use as subscriber name in observable logic
         */
        this._subscriberName = 'DrawableStorage';
        /**
         * List of stored drawable objects
         */
        this._list = [];
        this._observeHelper = new _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.addBatch(items);
        this._sort();
        this.onViewChange(this._subscriberName, function (target, extra) {
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
     * {@inheritDoc DrawableStorageInterface.cache}
     */
    DrawableStorage.prototype.add = function (item) {
        var _this = this;
        item.onViewChange(this._subscriberName, function (target, extra) { return _this._observeHelper.processWithMutingHandlers(extra); });
        this._list.push(item);
        this._sort();
        this._observeHelper.processWithMutingHandlers();
    };
    /**
     * {@inheritDoc DrawableStorageInterface.cache}
     */
    DrawableStorage.prototype.addBatch = function (items) {
        var _this = this;
        items.forEach(function (item) {
            item.onViewChange(_this._subscriberName, function (target, extra) { return _this._observeHelper.processWithMutingHandlers(extra); });
            _this._list.push(item);
        });
        this._sort();
        this._observeHelper.processWithMutingHandlers();
    };
    /**
     * Deletes objects found by config from storage
     * @param config - filter config
     */
    DrawableStorage.prototype.delete = function (config) {
        var _this = this;
        var result = [];
        this._observeHelper.withMutingHandlers(function () {
            _this.find(config).forEach(function (item) {
                result.push(_this.deleteById(item.id));
            });
            return [true, null];
        });
        return result;
    };
    /**
     * Deletes object by ID from storage
     * @param id - object ID
     */
    DrawableStorage.prototype.deleteById = function (id) {
        var index = this._list.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            var deletedItem = this._list.splice(index, 1)[0];
            deletedItem.offViewChange(this._subscriberName);
            this._observeHelper.processWithMutingHandlers();
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
        this._observeHelper.processWithMutingHandlers();
    };
    /**
     * {@inheritDoc DrawableStorageInterface.find}
     */
    DrawableStorage.prototype.find = function (config) {
        return this._find(function (item) {
            if (config.idsOnly && config.idsOnly.indexOf(item.id) === -1) {
                return false;
            }
            if (config.idsExclude && config.idsExclude.indexOf(item.id) !== -1) {
                return false;
            }
            if (config.typesOnly && config.typesOnly.indexOf(item.type) === -1) {
                return false;
            }
            if (config.typesExclude && config.typesExclude.indexOf(item.type) !== -1) {
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
     * {@inheritDoc DrawableStorageInterface.findByPosition}
     */
    DrawableStorage.prototype.findByPosition = function (coords, scale, interactiveOnly) {
        for (var i = this._list.length - 1; i >= 0; --i) {
            var item = this._list[i];
            if (interactiveOnly && !item.isInteractive) {
                continue;
            }
            if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isLayer)(item)) {
                var context = item.storage.findByPosition(coords, scale, interactiveOnly);
                if (!context.isEmpty()) {
                    return context;
                }
            }
            else if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isPositional)(item) && item.boundIncludes(coords, scale)) {
                var element = item;
                var position = element.getRelativePosition(coords);
                return new _positional_context__WEBPACK_IMPORTED_MODULE_5__["default"](element, position);
            }
        }
        return new _positional_context__WEBPACK_IMPORTED_MODULE_5__["default"](null, null);
    };
    /**
     * {@inheritDoc DrawableStorageInterface.findByNearEdgePosition}
     */
    DrawableStorage.prototype.findByNearEdgePosition = function (coords, scale, interactiveOnly, deviation) {
        var positionContext = this.findByPosition(coords, scale, interactiveOnly);
        for (var i = this._list.length - 1; i >= 0; --i) {
            var item = this._list[i];
            if (interactiveOnly && !item.isInteractive) {
                continue;
            }
            if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isLayer)(item)) {
                var context = item.storage.findByNearEdgePosition(coords, scale, interactiveOnly, deviation);
                if (!context.isEmpty()
                    && (positionContext.isEmpty() || positionContext.element === context.element)) {
                    return context;
                }
            }
            else if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isPositional)(item)
                && item.isNearBoundEdge(coords, scale, deviation)
                && (positionContext.isEmpty()
                    || positionContext.element === item
                    || item.config.zIndex >= positionContext.element.config.zIndex)) {
                var element = item;
                var position = element.getRelativePosition(coords);
                return new _positional_context__WEBPACK_IMPORTED_MODULE_5__["default"](element, position);
            }
        }
        return new _positional_context__WEBPACK_IMPORTED_MODULE_5__["default"](null, null);
    };
    /**
     * {@inheritDoc DrawableStorageInterface.group}
     */
    DrawableStorage.prototype.group = function (ids) {
        var list = this.delete({ idsOnly: ids });
        var minPosition = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.getMinPosition)(list.map(function (item) { return item.config.position; }));
        var maxPosition = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.getMaxPosition)(list.map(function (item) {
            return (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(item.config.position)
                .add((0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(item.config.size))
                .toArray();
        }));
        var groupSize = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(maxPosition).sub((0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(minPosition)).toArray();
        var groupZIndex = Math.max.apply(Math, list.map(function (item) { return item.config.zIndex; })) + 1;
        var config = {
            position: minPosition,
            size: groupSize,
            zIndex: groupZIndex,
            scalable: true,
            display: true,
            visible: true,
            interactive: true,
        };
        var id = 'group-' + (new Date()).getTime() + '-' + Math.floor(Math.random() * 100000);
        var group = new _drawable_positional_drawable_group__WEBPACK_IMPORTED_MODULE_3__["default"]({
            id: id,
            config: config,
            list: list,
        });
        this.add(group);
        return group;
    };
    /**
     * {@inheritDoc DrawableStorageInterface.ungroup}
     */
    DrawableStorage.prototype.ungroup = function (groupId) {
        var group = this.deleteById(groupId);
        this.addBatch(group.destruct());
    };
    /**
     * {@inheritDoc DrawableStorageInterface.addLayer}
     */
    DrawableStorage.prototype.addLayer = function (id, name, list) {
        if (list === void 0) { list = []; }
        var layer = new _drawable_layer__WEBPACK_IMPORTED_MODULE_6__["default"]({
            id: id,
            list: list,
            config: {
                visible: true,
                display: true,
                interactive: true,
                zIndex: this._getMaxZIndex() + 1,
                name: name,
            },
        });
        this.add(layer);
        return layer;
    };
    /**
     * {@inheritDoc DrawableStorageInterface.getLayer}
     */
    DrawableStorage.prototype.getLayer = function (id) {
        try {
            var candidate = this.findById(id);
            if (!(0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isLayer)(candidate)) {
                // TODO customize exception
                throw new Error();
            }
            return this.findById(id);
        }
        catch (e) {
            throw new Error("cannot find layer with id '".concat(id, "'"));
        }
    };
    /**
     * {@inheritDoc DrawableStorageInterface.getLayers}
     */
    DrawableStorage.prototype.getLayers = function () {
        return this._find(function (item) { return (0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isLayer)(item); });
    };
    /**
     * {@inheritDoc DrawableStorageInterface.onViewChange}
     */
    DrawableStorage.prototype.onViewChange = function (subscriberName, handler) {
        this._observeHelper.onChange(subscriberName, handler);
    };
    /**
     * {@inheritDoc DrawableStorageInterface.offViewChange}
     */
    DrawableStorage.prototype.offViewChange = function (subscriberName) {
        this._observeHelper.offChange(subscriberName);
    };
    /**
     * Returns the max zIndex of the first depth level items
     */
    DrawableStorage.prototype._getMaxZIndex = function () {
        if (this._list.length === 0) {
            return 0;
        }
        return this._list[this._list.length - 1].config.zIndex;
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
     */
    DrawableStorage.prototype._sort = function () {
        // TODO следить
        // console.log('sort');
        this._list.sort(function (lhs, rhs) { return lhs.config.zIndex - rhs.config.zIndex; });
    };
    return DrawableStorage;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawableStorage);


/***/ }),

/***/ "./src/canvas/structs/drawable/drawable.ts":
/*!*************************************************!*\
  !*** ./src/canvas/structs/drawable/drawable.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/observe-helper */ "./src/canvas/helpers/observe-helper.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/base */ "./src/canvas/helpers/base.ts");


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
     */
    function Drawable(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b;
        var _this = this;
        this._id = id;
        this._observeHelper = new _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this._config = new Proxy(config, {
            set: function (target, index, value) {
                var isChanged = target[index] !== value;
                target[index] = value;
                return isChanged ? _this._observeHelper.processWithMutingHandlers({
                    zIndexChanged: index === 'zIndex',
                }) : true;
            },
        });
        this._data = new Proxy(data, {
            set: function (target, index, value) {
                var isChanged = target[index] !== value;
                target[index] = value;
                return isChanged ? _this._observeHelper.processWithMutingHandlers() : true;
            },
        });
    }
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
            var isChanged = !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.areArraysEqual)(Object.entries(config), Object.entries(this._config));
            this._observeHelper.withMutingHandlers(function () {
                var isZIndexChanged = config.zIndex !== _this._config.zIndex;
                Object.entries(config).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    _this._config[key] = value;
                });
                return [isChanged, { zIndexChanged: isZIndexChanged }];
            });
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
    Object.defineProperty(Drawable.prototype, "isInteractive", {
        /**
         * isInteractive getter
         */
        get: function () {
            return this._config.interactive && this._config.display;
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

/***/ "./src/canvas/structs/drawable/positional-context.ts":
/*!***********************************************************!*\
  !*** ./src/canvas/structs/drawable/positional-context.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * PositionalContext class
 */
var PositionalContext = /** @class */ (function () {
    /**
     * PositionalContext constructor
     * @param element - element in context
     * @param position - relative context position
     */
    function PositionalContext(element, position) {
        /**
         * Element in context
         */
        this.element = null;
        /**
         * Relative event position's coords
         */
        this.position = null;
        this.element = element;
        this.position = position;
    }
    /**
     * Returns true if context is empty
     */
    PositionalContext.prototype.isEmpty = function () {
        return this.element === null;
    };
    return PositionalContext;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PositionalContext);


/***/ }),

/***/ "./src/canvas/structs/drawable/positional-drawable-group.ts":
/*!******************************************************************!*\
  !*** ./src/canvas/structs/drawable/positional-drawable-group.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _drawable_drawable_group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../drawable/drawable-group */ "./src/canvas/structs/drawable/drawable-group.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _bounds_rectangular_bound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bounds/rectangular-bound */ "./src/canvas/structs/bounds/rectangular-bound.ts");
/* harmony import */ var _vector_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vector/helpers */ "./src/canvas/structs/vector/helpers.ts");
/* harmony import */ var _helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers/type-helpers */ "./src/canvas/helpers/type-helpers.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../helpers/base */ "./src/canvas/helpers/base.ts");
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
 * Positional drawable group class
 */
var PositionalDrawableGroup = /** @class */ (function (_super) {
    __extends(PositionalDrawableGroup, _super);
    /**
     * DrawableGroup constructor
     * @param id - group ID
     * @param config - config
     * @param data - extra data
     * @param list - list of grouped objects
     */
    function PositionalDrawableGroup(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b, _c = _a.list, list = _c === void 0 ? [] : _c;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
            list: list,
        }) || this;
        /**
         * Interface belonging flag
         */
        _this.isPositional = true;
        /**
         * Name of class to use as subscriber name in observable logic
         */
        _this._subscriberName = 'PositionalDrawableGroup';
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    PositionalDrawableGroup.prototype.draw = function (drawer) {
        var _a;
        drawer.context.save();
        (_a = drawer.context).translate.apply(_a, this.config.position);
        _super.prototype.draw.call(this, drawer);
        drawer.context.restore();
    };
    /**
     * {@inheritDoc DrawableInterface.setPosition}
     */
    PositionalDrawableGroup.prototype.setPosition = function (coords) {
        this._config.position = coords;
    };
    /**
     * {@inheritDoc DrawableInterface.movePosition}
     */
    PositionalDrawableGroup.prototype.movePosition = function (offset) {
        this.setPosition((0,_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(this._config.position)
            .add((0,_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(offset))
            .toArray());
    };
    /**
     * {@inheritDoc DrawableInterface.getRelativePosition}
     */
    PositionalDrawableGroup.prototype.getRelativePosition = function (point) {
        return (0,_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(point)
            .sub((0,_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(this.config.position))
            .toArray();
    };
    /**
     * {@inheritDoc DrawableInterface.boundIncludes}
     */
    PositionalDrawableGroup.prototype.boundIncludes = function (coords, scale) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var child = _a[_i];
            if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isPositional)(child)
                && child.boundIncludes((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsBackward)(coords, this._config.position), scale)) {
                return true;
            }
        }
        return false;
    };
    /**
     * {@inheritDoc DrawableInterface.isNearBoundEdge}
     */
    PositionalDrawableGroup.prototype.isNearBoundEdge = function (coords, scale, deviation) {
        return this.bound.isNearEdge((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsBackward)(coords, this._config.position), scale, deviation);
    };
    Object.defineProperty(PositionalDrawableGroup.prototype, "list", {
        /**
         * List getter
         */
        get: function () {
            return this._storage.list;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PositionalDrawableGroup.prototype, "config", {
        /**
         * View config getter
         */
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PositionalDrawableGroup.prototype, "bound", {
        /**
         * bound getter
         */
        get: function () {
            return new _bounds_rectangular_bound__WEBPACK_IMPORTED_MODULE_2__["default"]({
                position: [0, 0],
                size: this._config.size,
            });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * {@inheritDoc DrawableInterface.getScaledBound}
     */
    PositionalDrawableGroup.prototype.getScaledBound = function (scale) {
        return this._config.scalable
            ? this.bound.specify([1, 1], [0, 0])
            : this.bound.specify((0,_vector__WEBPACK_IMPORTED_MODULE_1__.toVector)(scale).reverse().toArray(), [0.5, 0.5]);
    };
    /**
     * {@inheritDoc DrawableInterface.translatePositionConfig}
     */
    PositionalDrawableGroup.prototype.translatePositionConfig = function (scale) {
        return (0,_helpers_base__WEBPACK_IMPORTED_MODULE_5__.translatePositionConfig)(this._config.position, this._config.size, scale, [0.5, 0.5]);
    };
    /**
     * Some actions with list before grouping
     */
    PositionalDrawableGroup.prototype._processListToGroup = function (list) {
        var _this = this;
        list.forEach(function (item) {
            item.movePosition((0,_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(_this._config.position).inverse().toArray());
        });
        return list;
    };
    /**
     * Some actions with list before ungrouping
     */
    PositionalDrawableGroup.prototype._processListToUngroup = function (list) {
        var _this = this;
        list.forEach(function (item) {
            item.movePosition(_this._config.position);
        });
        return list;
    };
    return PositionalDrawableGroup;
}(_drawable_drawable_group__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PositionalDrawableGroup);


/***/ }),

/***/ "./src/canvas/structs/drawable/positional-drawable.ts":
/*!************************************************************!*\
  !*** ./src/canvas/structs/drawable/positional-drawable.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _drawable_drawable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../drawable/drawable */ "./src/canvas/structs/drawable/drawable.ts");
/* harmony import */ var _bounds_rectangular_bound__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bounds/rectangular-bound */ "./src/canvas/structs/bounds/rectangular-bound.ts");
/* harmony import */ var _vector_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../vector/helpers */ "./src/canvas/structs/vector/helpers.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers/base */ "./src/canvas/helpers/base.ts");
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
 * Abstract class for drawable positional objects
 * @public
 */
var PositionalDrawable = /** @class */ (function (_super) {
    __extends(PositionalDrawable, _super);
    /**
     * PositionalDrawable constructor
     * @param id - group ID
     * @param config - config
     * @param data - extra data
     */
    function PositionalDrawable(_a) {
        var id = _a.id, config = _a.config, _b = _a.data, data = _b === void 0 ? {} : _b;
        var _this = _super.call(this, {
            id: id,
            config: config,
            data: data,
        }) || this;
        /**
         * Interface belonging flag
         */
        _this.isPositional = true;
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.setPosition}
     */
    PositionalDrawable.prototype.setPosition = function (coords) {
        this._config.position = coords;
    };
    /**
     * {@inheritDoc DrawableInterface.movePosition}
     */
    PositionalDrawable.prototype.movePosition = function (offset) {
        this.setPosition((0,_vector__WEBPACK_IMPORTED_MODULE_0__.createVector)(this._config.position)
            .add((0,_vector__WEBPACK_IMPORTED_MODULE_0__.createVector)(offset))
            .toArray());
    };
    /**
     * {@inheritDoc DrawableInterface.getRelativePosition}
     */
    PositionalDrawable.prototype.getRelativePosition = function (point) {
        return (0,_vector__WEBPACK_IMPORTED_MODULE_0__.createVector)(point)
            .sub((0,_vector__WEBPACK_IMPORTED_MODULE_0__.createVector)(this.config.position))
            .toArray();
    };
    /**
     * {@inheritDoc DrawableInterface.boundIncludes}
     */
    PositionalDrawable.prototype.boundIncludes = function (coords, scale) {
        return this.getScaledBound(scale).includes((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsBackward)(coords, this._config.position), scale);
    };
    /**
     * {@inheritDoc DrawableInterface.isNearBoundEdge}
     */
    PositionalDrawable.prototype.isNearBoundEdge = function (coords, scale, deviation) {
        return this.getScaledBound(scale).isNearEdge((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsBackward)(coords, this._config.position), scale, deviation);
    };
    /**
     * {@inheritDoc DrawableInterface.getScaledBound}
     */
    PositionalDrawable.prototype.getScaledBound = function (scale) {
        var offset = this._config.offset;
        return this._config.scalable
            ? this.bound.specify([1, 1], offset !== null && offset !== void 0 ? offset : [0, 0])
            : this.bound.specify((0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(scale).reverse().toArray(), offset !== null && offset !== void 0 ? offset : [0.5, 0.5]);
    };
    /**
     * {@inheritDoc DrawableInterface.translatePositionConfig}
     */
    PositionalDrawable.prototype.translatePositionConfig = function (scale) {
        // TODO use with scalable and unscalable
        var offset = this._config.offset;
        return this._config.scalable
            ? (0,_helpers_base__WEBPACK_IMPORTED_MODULE_4__.translatePositionConfig)(this._config.position, this._config.size, [1, 1], offset !== null && offset !== void 0 ? offset : [0, 0])
            : (0,_helpers_base__WEBPACK_IMPORTED_MODULE_4__.translatePositionConfig)(this._config.position, this._config.size, scale, offset !== null && offset !== void 0 ? offset : [0.5, 0.5]);
    };
    Object.defineProperty(PositionalDrawable.prototype, "config", {
        /**
         * View config getter
         */
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PositionalDrawable.prototype, "bound", {
        /**
         * bound getter
         */
        get: function () {
            return new _bounds_rectangular_bound__WEBPACK_IMPORTED_MODULE_2__["default"]({
                position: [0, 0],
                size: this._config.size,
            });
        },
        enumerable: false,
        configurable: true
    });
    return PositionalDrawable;
}(_drawable_drawable__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PositionalDrawable);


/***/ }),

/***/ "./src/canvas/structs/filters/coords-collection-forward-filter.ts":
/*!************************************************************************!*\
  !*** ./src/canvas/structs/filters/coords-collection-forward-filter.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vector_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vector/helpers */ "./src/canvas/structs/vector/helpers.ts");

/**
 * Filter for backward transposing of the points collection
 */
var CoordsCollectionForwardFilter = /** @class */ (function () {
    function CoordsCollectionForwardFilter() {
    }
    /**
     * {@inheritDoc CoordsCollectionFilterInterface.process}
     */
    CoordsCollectionForwardFilter.prototype.process = function (data, config) {
        var result = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var coords = data_1[_i];
            result.push((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_0__.transposeCoordsForward)(coords, config.offset, config.scale));
        }
        return result;
    };
    return CoordsCollectionForwardFilter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoordsCollectionForwardFilter);


/***/ }),

/***/ "./src/canvas/structs/filters/coords-grid-filter.ts":
/*!**********************************************************!*\
  !*** ./src/canvas/structs/filters/coords-grid-filter.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Filter coords using grid
 */
var CoordsGridFilter = /** @class */ (function () {
    function CoordsGridFilter() {
    }
    /**
     * {@inheritDoc CoordsFilterInterface.process}
     */
    CoordsGridFilter.prototype.process = function (data, config) {
        var x = data[0], y = data[1];
        var scale = config.scale[0];
        var step = config.gridStep;
        if (scale < 1) {
            step *= Math.pow(2, Math.round(Math.log2(1 / scale)));
        }
        else {
            step /= Math.pow(2, Math.round(Math.log2(scale)));
        }
        return [x - x % step, y - y % step];
    };
    return CoordsGridFilter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CoordsGridFilter);


/***/ }),

/***/ "./src/canvas/structs/image-cache.ts":
/*!*******************************************!*\
  !*** ./src/canvas/structs/image-cache.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/base */ "./src/canvas/helpers/base.ts");

/**
 * Cache helper for images
 * @public
 */
var ImageCache = /** @class */ (function () {
    function ImageCache() {
        /**
         * Map of the preloaded images
         */
        this._imageMap = {};
        /**
         * Map of the running processes
         */
        this._processMap = {};
        /**
         * Map of the buffered handlers
         */
        this._handlers = {};
        /**
         * Map of the handlers for subscribed objects
         */
        this._totalHandlers = {};
    }
    /**
     * {@inheritDoc ImageCacheInterface.subscribe}
     */
    ImageCache.prototype.subscribe = function (subscriberName, handler) {
        this._totalHandlers[subscriberName] = handler;
    };
    /**
     * {@inheritDoc ImageCacheInterface.unsubscribe}
     */
    ImageCache.prototype.unsubscribe = function (subscriberName) {
        delete this._totalHandlers[subscriberName];
    };
    /**
     * {@inheritDoc ImageCacheInterface.cache}
     */
    ImageCache.prototype.cache = function (source, type, callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var key = this._getKey(source, type);
        if (this._imageMap[key] !== undefined) {
            if (callback !== null) {
                callback(this._imageMap[key]);
            }
            return this._imageMap[key];
        }
        if (this._processMap[key] !== undefined) {
            if (callback !== null) {
                if (this._handlers[key] === undefined) {
                    this._handlers[key] = [];
                }
                this._handlers[key].push(callback);
            }
            return null;
        }
        this._processMap[key] = true;
        var blob = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.createBlob)(source, type);
        var url = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.createUrlFromBlob)(blob);
        var img = new Image();
        img.src = url;
        img.addEventListener('load', function () {
            _this._imageMap[key] = img;
            delete _this._processMap[key];
            if (_this._handlers[key] !== undefined) {
                var handlers = _this._handlers[key];
                while (handlers.length) {
                    (handlers.pop())(img);
                }
                delete _this._handlers[key];
            }
            if (!Object.keys(_this._processMap).length) {
                Object.values(_this._totalHandlers).forEach(function (handler) { return handler(); });
            }
        });
        return null;
    };
    /**
     * Creates a hash for image data and type and returns it as string
     * @param source - source data of image
     * @param type - mime type
     */
    ImageCache.prototype._getKey = function (source, type) {
        return (0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.hashString)("".concat(source, "_").concat(type));
    };
    return ImageCache;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageCache);


/***/ }),

/***/ "./src/canvas/structs/vector/helpers.ts":
/*!**********************************************!*\
  !*** ./src/canvas/structs/vector/helpers.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isInInterval": () => (/* binding */ isInInterval),
/* harmony export */   "isInSegment": () => (/* binding */ isInSegment),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "transposeCoordsBackward": () => (/* binding */ transposeCoordsBackward),
/* harmony export */   "transposeCoordsForward": () => (/* binding */ transposeCoordsForward)
/* harmony export */ });
/**
 * Returns true if a number is inside interval
 * @param what - number
 * @param interval - interval
 */
function isInInterval(what, interval) {
    return what > interval[0] && what < interval[1];
}
/**
 * Returns true if a number is inside segment
 * @param what - number
 * @param segment - segment
 */
function isInSegment(what, segment) {
    return what >= segment[0] && what <= segment[1];
}
/**
 * Rounds a number with a precision
 * @param num - number
 * @param precision - precision
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    var mult = Math.pow(10, precision);
    return Math.round(num * mult) / mult;
}
/**
 * Transpose coords with backward applying offset and scale
 * @param coords - coords to transpose
 * @param offset - offset vector
 * @param scale - scale vector
 */
function transposeCoordsBackward(coords, offset, scale) {
    if (scale === void 0) { scale = [1, 1]; }
    var x = coords[0], y = coords[1];
    return [(x - offset[0]) / scale[0], (y - offset[1]) / scale[1]];
}
/**
 * Transpose coords with forward applying offset and scale
 * @param coords - coords to transpose
 * @param offset - offset vector
 * @param scale - scale vector
 */
function transposeCoordsForward(coords, offset, scale) {
    if (scale === void 0) { scale = [1, 1]; }
    var x = coords[0], y = coords[1];
    return [x * scale[0] + offset[0], y * scale[1] + offset[1]];
}


/***/ }),

/***/ "./src/canvas/structs/vector/index.ts":
/*!********************************************!*\
  !*** ./src/canvas/structs/vector/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PositionalVector": () => (/* reexport safe */ _positional_vector__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Vector": () => (/* reexport safe */ _vector__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "createPolygonVectors": () => (/* reexport safe */ _positional_vector__WEBPACK_IMPORTED_MODULE_0__.createPolygonVectors),
/* harmony export */   "createVector": () => (/* reexport safe */ _vector__WEBPACK_IMPORTED_MODULE_2__.createVector),
/* harmony export */   "isInInterval": () => (/* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_1__.isInInterval),
/* harmony export */   "isInSegment": () => (/* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_1__.isInSegment),
/* harmony export */   "round": () => (/* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_1__.round),
/* harmony export */   "toVector": () => (/* reexport safe */ _vector__WEBPACK_IMPORTED_MODULE_2__.toVector)
/* harmony export */ });
/* harmony import */ var _positional_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./positional-vector */ "./src/canvas/structs/vector/positional-vector.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/canvas/structs/vector/helpers.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector/vector.ts");






/***/ }),

/***/ "./src/canvas/structs/vector/positional-vector.ts":
/*!********************************************************!*\
  !*** ./src/canvas/structs/vector/positional-vector.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPolygonVectors": () => (/* binding */ createPolygonVectors),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector/vector.ts");

/**
 * Positional vector class
 */
var PositionalVector = /** @class */ (function () {
    /**
     * PositionalVector constructor
     * @param position - position
     * @param size - size
     */
    function PositionalVector(position, size) {
        this.position = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(position);
        this.size = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(size);
    }
    Object.defineProperty(PositionalVector.prototype, "target", {
        /**
         * {@inheritDoc PositionalVectorInterface.target}
         */
        get: function () {
            return this.position.clone().add(this.size);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PositionalVector.prototype, "length", {
        /**
         * Returns the length of vector
         */
        get: function () {
            return this.size.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * {@inheritDoc PositionalVectorInterface.includes}
     */
    PositionalVector.prototype.includes = function (point, precision) {
        if (precision === void 0) { precision = 4; }
        var pointVector = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(point);
        if (this.position.isEqual(pointVector, precision) || this.target.isEqual(pointVector, precision)) {
            return true;
        }
        var _a = this.position.toArray(precision), x1 = _a[0], y1 = _a[1];
        var _b = this.target.toArray(precision), x2 = _b[0], y2 = _b[1];
        var _c = pointVector.toArray(precision), x = _c[0], y = _c[1];
        return (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1) === 0
            && (x1 < x && x < x2) && (y1 < y && y < y2);
    };
    /**
     * {@inheritDoc PositionalVectorInterface.getDistanceVector}
     */
    PositionalVector.prototype.getDistanceVector = function (point) {
        var vectorPoint = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(point);
        var destPoint = this._getNearestLinePoint(point);
        if (destPoint.x < Math.min(this.position.x, this.target.x) ||
            destPoint.x > Math.max(this.position.x, this.target.x) ||
            destPoint.y < Math.min(this.position.y, this.target.y) ||
            destPoint.y > Math.max(this.position.y, this.target.y)) {
            var l1 = new PositionalVector(vectorPoint, (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(this.position).sub(vectorPoint));
            var l2 = new PositionalVector(vectorPoint, (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(this.target).sub(vectorPoint));
            if (l1.length < l2.length) {
                return l1;
            }
            else {
                return l2;
            }
        }
        return new PositionalVector(vectorPoint, destPoint.sub(vectorPoint));
    };
    /**
     * Returns the coords of the nearest point on vector to another point
     * @param point - another point
     */
    PositionalVector.prototype._getNearestLinePoint = function (point) {
        var pointVector = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(point);
        var k = ((this.target.y - this.position.y) * (pointVector.x - this.position.x)
            - (this.target.x - this.position.x) * (pointVector.y - this.position.y)) / (Math.pow((this.target.y - this.position.y), 2) + Math.pow((this.target.x - this.position.x), 2));
        return new _vector__WEBPACK_IMPORTED_MODULE_0__["default"]([
            pointVector.x - k * (this.target.y - this.position.y),
            pointVector.y + k * (this.target.x - this.position.x),
        ]);
    };
    return PositionalVector;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PositionalVector);
/**
 * Creates a list of vectors of the polygon from a list of points
 * @param points - list of points
 */
function createPolygonVectors(points) {
    var result = [];
    for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
        var lhsPoint = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(points[j]);
        var rhsPoint = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.toVector)(points[i]);
        result.push(new PositionalVector(lhsPoint, rhsPoint.sub(lhsPoint)));
    }
    return result;
}


/***/ }),

/***/ "./src/canvas/structs/vector/vector.ts":
/*!*********************************************!*\
  !*** ./src/canvas/structs/vector/vector.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createVector": () => (/* binding */ createVector),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "toVector": () => (/* binding */ toVector)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/canvas/structs/vector/helpers.ts");

/**
 * Vector class
 * @public
 */
var Vector = /** @class */ (function () {
    /**
     * Vector constructor
     * @param x - coordinate X
     * @param y - coordinate Y
     * @param defaultPrecision - default precision
     */
    function Vector(_a, defaultPrecision) {
        var x = _a[0], y = _a[1];
        /**
         * Default precision
         */
        this._defaultPrecision = 4;
        this.x = x;
        this.y = y;
        if (this._defaultPrecision === undefined) {
            this._defaultPrecision = defaultPrecision;
        }
    }
    /**
     * Add another vector to this vector
     * @param v - vector to cache
     */
    Vector.prototype.add = function (v) {
        v = toVector(v, this._defaultPrecision);
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    /**
     * Subtracts vector with another vector
     * @param v - vector to subtract
     */
    Vector.prototype.sub = function (v) {
        v = toVector(v, this._defaultPrecision);
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
    Object.defineProperty(Vector.prototype, "length", {
        /**
         * Returns the length of vector
         */
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns scalar product with another vector
     * @param v - another vector
     */
    Vector.prototype.mulScalar = function (v) {
        v = toVector(v, this._defaultPrecision);
        return this.x * v.x + this.y * v.y;
    };
    /**
     * Returns length of vector product with another vector
     * @param v - another vector
     */
    Vector.prototype.mulVector = function (v) {
        v = toVector(v, this._defaultPrecision);
        return this.x * v.y - this.y * v.x;
    };
    /**
     * Multiplies this vector with another vector coordinate-by-coordinate
     * @param v - another vector
     */
    Vector.prototype.mulCoords = function (v) {
        v = toVector(v, this._defaultPrecision);
        this.x *= v.x;
        this.y *= v.y;
        return this;
    };
    /**
     * Divides this vector with another vector coordinate-by-coordinate
     * @param v - another vector
     */
    Vector.prototype.divCoords = function (v) {
        v = toVector(v, this._defaultPrecision);
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    /**
     * Returns true if this vector is equal to another vector
     * @param v - another vector
     * @param precision - round precision for comparison
     */
    Vector.prototype.isEqual = function (v, precision) {
        if (precision === void 0) { precision = this._defaultPrecision; }
        v = toVector(v, this._defaultPrecision);
        return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(v.x, precision) === (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.x, precision)
            && (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(v.y, precision) === (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.y, precision);
    };
    /**
     * Returns true if angle between vectors equals 90 degrees
     * @param v - another vector
     */
    Vector.prototype.isOrthogonal = function (v) {
        return this.getCos(v) === 0;
    };
    /**
     * Returns true if this vector is collinear with argument vector
     * @param v - another vector
     */
    Vector.prototype.isCollinear = function (v) {
        return this.mulVector(v) === 0;
    };
    /**
     * Returns true if vector is normalized
     * @param precision - round precision
     */
    Vector.prototype.isNormalized = function (precision) {
        if (precision === void 0) { precision = this._defaultPrecision; }
        return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.length, precision) === 1;
    };
    /**
     * Returns true if another vector is on left with this one
     * @param v - another vector
     */
    Vector.prototype.hasOnLeft = function (v) {
        return this.mulVector(v) > 0;
    };
    /**
     * Returns true if another vector is on right with this one
     * @param v - another vector
     */
    Vector.prototype.hasOnRight = function (v) {
        return this.mulVector(v) < 0;
    };
    /**
     * Returns true if angle between vectors is sharp
     * @param v - another vector
     */
    Vector.prototype.hasSharpCornerWith = function (v) {
        return this.getCos(v) > 0;
    };
    /**
     * Returns true if angle between vectors is obtuse
     * @param v - another vector
     */
    Vector.prototype.hasObtuseCornerWith = function (v) {
        return this.getCos(v) < 0;
    };
    /**
     * Returns distance vector of this and another vector
     * @param v - another vector
     */
    Vector.prototype.distance = function (v) {
        return this.clone().sub(v);
    };
    /**
     * Normalizes this vector
     */
    Vector.prototype.normalize = function () {
        var len = this.length;
        this.x /= len;
        this.y /= len;
        return this;
    };
    /**
     * Transposes vector backward with offset and scale
     * @param offset - offset
     * @param scale - scale
     */
    Vector.prototype.transposeBackward = function (offset, scale) {
        var offsetVector = toVector(offset, this._defaultPrecision);
        var scaleVector = toVector(scale, this._defaultPrecision);
        this.x = (this.x - offsetVector.x) / scaleVector.x;
        this.y = (this.y - offsetVector.y) / scaleVector.y;
        return this;
    };
    /**
     * Transposes vector forward with offset and scale
     * @param offset - offset
     * @param scale - scale
     */
    Vector.prototype.transposeForward = function (offset, scale) {
        var offsetVector = toVector(offset, this._defaultPrecision);
        var scaleVector = toVector(scale, this._defaultPrecision);
        this.x = offsetVector.x + this.x * scaleVector.x;
        this.y = offsetVector.y + this.y * scaleVector.y;
        return this;
    };
    /**
     * Rotates vector by angle clockwise
     * @param angle - angle to rotate to
     * @param precision - round precision
     */
    Vector.prototype.rotate = function (angle, precision) {
        if (precision === void 0) { precision = this._defaultPrecision; }
        var cs = Math.cos(-angle);
        var sn = Math.sin(-angle);
        var newX = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.x * cs - this.y * sn, precision);
        var newY = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.x * sn + this.y * cs, precision);
        this.x = newX;
        this.y = newY;
        return this;
    };
    /**
     * Rotates vector to the left by 90 degrees
     * @param precision - round precision
     */
    Vector.prototype.rotateLeft = function (precision) {
        if (precision === void 0) { precision = this._defaultPrecision; }
        return this.rotate(-Math.PI / 2, precision);
    };
    /**
     * Rotates vector to the right by 90 degrees
     * @param precision - round precision
     */
    Vector.prototype.rotateRight = function (precision) {
        if (precision === void 0) { precision = this._defaultPrecision; }
        return this.rotate(Math.PI / 2, precision);
    };
    /**
     * Get cos with another vector
     * @param v - another vector
     */
    Vector.prototype.getCos = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            v = createVector([1, 0], this._defaultPrecision);
        }
        else {
            v = toVector(v, this._defaultPrecision);
        }
        return this.mulScalar(v) / (this.length * v.length);
    };
    /**
     * Clones vector
     */
    Vector.prototype.clone = function () {
        return createVector(this.toArray(), this._defaultPrecision);
    };
    /**
     * Converts vector to array
     * @param precision - precision
     */
    Vector.prototype.toArray = function (precision) {
        if (precision === undefined) {
            return [this.x, this.y];
        }
        return [(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.x, precision), (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.y, precision)];
    };
    return Vector;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector);
/**
 * Creates new vector
 * @public
 * @param coords - coordinates of new vector
 * @param defaultPrecision - round precision
 */
function createVector(coords, defaultPrecision) {
    return new Vector(coords, defaultPrecision);
}
/**
 * Converts instance to vector if it's an array
 * @public
 * @param coords - coords as vector or an array
 * @param defaultPrecision - round precision
 */
function toVector(coords, defaultPrecision) {
    return (coords instanceof Array) ? createVector(coords, defaultPrecision) : coords;
}


/***/ }),

/***/ "./src/canvas/structs/view-config.ts":
/*!*******************************************!*\
  !*** ./src/canvas/structs/view-config.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/observe-helper */ "./src/canvas/helpers/observe-helper.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _vector_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vector/helpers */ "./src/canvas/structs/vector/helpers.ts");




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
                return isChanged ? _this._observeHelper.processWithMutingHandlers() : true;
            },
        });
        this._offset = new Proxy(offset, {
            set: function (target, index, value) {
                var isChanged = target[index] !== value;
                target[index] = value;
                return isChanged ? _this._observeHelper.processWithMutingHandlers() : true;
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
     * {@inheritDoc DrawableStorageInterface.offViewChange}
     */
    ViewConfig.prototype.offViewChange = function (subscriberName) {
        this._observeHelper.offChange(subscriberName);
    };
    /**
     * {@inheritDoc ViewConfigObservableInterface.transposeBackward}
     */
    ViewConfig.prototype.transposeBackward = function (coords) {
        return (0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsBackward)(coords, this._offset, this._scale);
    };
    /**
     * {@inheritDoc ViewConfigObservableInterface.transposeForward}
     */
    ViewConfig.prototype.transposeForward = function (coords) {
        return (0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsForward)(coords, this._offset, this._scale);
    };
    /**
     * {@inheritDoc ViewConfigObservableInterface.updateScaleInCursorContext}
     */
    ViewConfig.prototype.updateScaleInCursorContext = function (newScale, cursorCoords) {
        var _this = this;
        var isChanged = !(0,_helpers_base__WEBPACK_IMPORTED_MODULE_0__.areArraysEqual)(newScale, this._scale);
        if (!isChanged) {
            return;
        }
        this._observeHelper.withMutingHandlers(function () {
            var oldScalePosition = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(_this.transposeBackward(cursorCoords));
            _this.scale = newScale;
            var newScalePosition = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(_this.transposeBackward(cursorCoords));
            var difference = newScalePosition.clone().sub(oldScalePosition);
            _this.offset = _this.transposeForward(difference.toArray());
            return [isChanged, null];
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
        this._observeHelper.withMutingHandlers(function () {
            _this.scale = scale;
            _this.offset = offset;
            _this.gridStep = gridStep;
            return [isChanged, null];
        });
    };
    /**
     * Returns the config data
     */
    ViewConfig.prototype.getConfig = function () {
        return {
            scale: this._scale,
            offset: this._offset,
            gridStep: this._gridStep,
        };
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
            this._observeHelper.withMutingHandlers(function () {
                _this._scale[0] = scale[0];
                _this._scale[1] = scale[1];
                return [isChanged, null];
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
            this._observeHelper.withMutingHandlers(function () {
                _this._offset[0] = offset[0];
                _this._offset[1] = offset[1];
                return [isChanged, null];
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
            this._observeHelper.withMutingHandlers(function () {
                _this._gridStep = gridStep;
                return [isChanged, null];
            });
        },
        enumerable: false,
        configurable: true
    });
    return ViewConfig;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewConfig);


/***/ }),

/***/ "?9157":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas_drawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas/drawer */ "./src/canvas/drawer.ts");
/* harmony import */ var _canvas_structs_drawable_drawable_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas/structs/drawable/drawable-storage */ "./src/canvas/structs/drawable/drawable-storage.ts");
/* harmony import */ var _canvas_structs_view_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas/structs/view-config */ "./src/canvas/structs/view-config.ts");
/* harmony import */ var _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas/figures/svg */ "./src/canvas/figures/svg.ts");
/* harmony import */ var _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas/figures/grid */ "./src/canvas/figures/grid.ts");
/* harmony import */ var _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvas/figures/rect */ "./src/canvas/figures/rect.ts");
/* harmony import */ var _canvas_figures_ellipse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./canvas/figures/ellipse */ "./src/canvas/figures/ellipse.ts");
/* harmony import */ var _canvas_figures_line__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./canvas/figures/line */ "./src/canvas/figures/line.ts");








var storage = new _canvas_structs_drawable_drawable_storage__WEBPACK_IMPORTED_MODULE_1__["default"]([]);
console.log(storage);
var viewConfig = new _canvas_structs_view_config__WEBPACK_IMPORTED_MODULE_2__["default"]({
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
storage.addLayer('grid', 'Grid layer', [
    new _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__["default"]({
        id: 1,
        config: {
            zIndex: -Infinity,
            display: true,
            visible: true,
            interactive: false,
            mainLineColor: '#bbb',
            subLineColor: '#dedede',
            lineWidth: 1,
            linesInBlock: 5,
        },
    }),
]);
var elementsLayer = storage.addLayer('elements', 'Elements layer', [
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"]({
        id: 2,
        config: {
            position: [10, 20],
            size: [100, 30],
            zIndex: 1,
            scalable: true,
            display: true,
            visible: true,
            interactive: true,
            fillStyle: 'green',
            strokeStyle: 'black',
            lineWidth: 1,
        },
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"]({
        id: 3,
        config: {
            position: [10, 25],
            size: [50, 50],
            zIndex: 1,
            scalable: true,
            display: true,
            visible: true,
            interactive: true,
            fillStyle: 'blue',
            strokeStyle: 'black',
            lineWidth: 1,
        },
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"]({
        id: 4,
        config: {
            position: [15 * 30, 15 * 10],
            size: [15 * 10, 15 * 5],
            zIndex: 10,
            scalable: true,
            display: true,
            visible: true,
            interactive: true,
            fillStyle: 'transparent',
            strokeStyle: 'red',
            lineWidth: 1,
        },
    }),
    new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_3__["default"]({
        id: 5,
        config: {
            position: [300, 550],
            size: [162, 82],
            zIndex: 1,
            scalable: false,
            display: true,
            visible: true,
            interactive: true,
            offset: [1, 1],
            data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
        },
        bound: [[28, 0], [134, 0], [161, 40], [134, 81], [28, 81], [0, 40]],
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"]({
        id: 6,
        config: {
            position: [350, 350],
            size: [30, 30],
            zIndex: 1,
            scalable: true,
            display: true,
            visible: true,
            interactive: true,
            fillStyle: 'transparent',
            strokeStyle: 'blue',
            lineWidth: 1,
        },
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"]({
        id: 7,
        config: {
            position: [350, 300],
            size: [30, 30],
            zIndex: 1,
            scalable: true,
            display: true,
            visible: true,
            interactive: true,
            fillStyle: 'transparent',
            strokeStyle: 'blue',
            lineWidth: 1,
        },
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"]({
        id: 8,
        config: {
            position: [300, 350],
            size: [30, 30],
            zIndex: 1,
            scalable: true,
            display: true,
            visible: true,
            interactive: true,
            fillStyle: 'transparent',
            strokeStyle: 'blue',
            lineWidth: 1,
        },
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"]({
        id: 9,
        config: {
            position: [200, 200],
            size: [160, 160],
            zIndex: 0,
            scalable: true,
            display: true,
            visible: true,
            interactive: true,
            fillStyle: 'green',
            strokeStyle: 'blue',
            lineWidth: 1,
        },
    }),
]);
var group = elementsLayer.storage.group([6, 7, 8, 9]);
console.log(group);
// elementsLayer.storage.ungroup(group.id);
var anotherLayer = storage.addLayer('another', 'Another Layer', []);
anotherLayer.storage.add(new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"]({
    id: 10,
    config: {
        position: [120, 300],
        size: [100, 100],
        zIndex: -100,
        scalable: false,
        display: true,
        visible: true,
        interactive: true,
        fillStyle: 'lightblue',
        strokeStyle: 'blue',
        lineWidth: 1,
        offset: [0.5, 1],
    },
}));
anotherLayer.storage.add(new _canvas_figures_ellipse__WEBPACK_IMPORTED_MODULE_6__["default"]({
    id: 11,
    config: {
        position: [0, 0],
        size: [120, 180],
        zIndex: 100,
        scalable: false,
        display: true,
        visible: true,
        interactive: true,
        fillStyle: 'lightblue',
        strokeStyle: 'blue',
        lineWidth: 1,
        offset: [0.5, 0.5],
    },
}));
anotherLayer.storage.add(new _canvas_figures_line__WEBPACK_IMPORTED_MODULE_7__["default"]({
    id: 12,
    config: {
        position: [0, 0],
        size: [100, 100],
        zIndex: 101,
        scalable: false,
        display: true,
        visible: true,
        interactive: true,
        strokeStyle: 'blue',
        lineWidth: 2,
    },
}));
console.log('layers', storage.getLayers());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9ub2RlX21vZHVsZXMvY3J5cHRvLWpzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tZDUuanMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9kcmF3ZXIudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9maWd1cmVzL2VsbGlwc2UudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9maWd1cmVzL2dyaWQudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9maWd1cmVzL2xpbmUudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9maWd1cmVzL3JlY3QudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9maWd1cmVzL3N2Zy50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL2hlbHBlcnMvYmFzZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL2hlbHBlcnMvaW1hZ2UtY2FjaGUtaGVscGVyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvaGVscGVycy9vYnNlcnZlLWhlbHBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL2hlbHBlcnMvdHlwZS1oZWxwZXJzLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9ib3VuZHMvZWxsaXBzZS1ib3VuZC50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvYm91bmRzL2xpbmUtYm91bmQudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2JvdW5kcy9wb2x5Z29uYWwtYm91bmQudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2JvdW5kcy9yZWN0YW5ndWxhci1ib3VuZC50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvZHJhd2FibGUvZHJhd2FibGUtZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlL2RyYXdhYmxlLWxheWVyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9kcmF3YWJsZS1zdG9yYWdlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9kcmF3YWJsZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvZHJhd2FibGUvcG9zaXRpb25hbC1jb250ZXh0LnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlLWdyb3VwLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9maWx0ZXJzL2Nvb3Jkcy1jb2xsZWN0aW9uLWZvcndhcmQtZmlsdGVyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9maWx0ZXJzL2Nvb3Jkcy1ncmlkLWZpbHRlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvaW1hZ2UtY2FjaGUudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZlY3Rvci9oZWxwZXJzLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy92ZWN0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZlY3Rvci9wb3NpdGlvbmFsLXZlY3Rvci50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmVjdG9yL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmlldy1jb25maWcudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL2lnbm9yZWR8L2hvbWUvc21vcmVuL3Byb2plY3RzL2V4cGVyaW1lbnRzL2NhbnZlZS10cy9ub2RlX21vZHVsZXMvY3J5cHRvLWpzfGNyeXB0byIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NhbnZhcy10cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0cm9vdC5DcnlwdG9KUyA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cblx0LypnbG9iYWxzIHdpbmRvdywgZ2xvYmFsLCByZXF1aXJlKi9cblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblxuXHQgICAgdmFyIGNyeXB0bztcblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gd2luZG93LmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBpbiB3ZWIgd29ya2VyIChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHNlbGYuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd29ya2VyXG5cdCAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gZ2xvYmFsVGhpcy5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSAoZXhwZXJpbWVudGFsIElFIDExKSBjcnlwdG8gZnJvbSB3aW5kb3cgKEJyb3dzZXIpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubXNDcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cubXNDcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSBnbG9iYWwgKE5vZGVKUylcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWwuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGltcG9ydCB2aWEgcmVxdWlyZSAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblx0ICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICB9XG5cblx0ICAgIC8qXG5cdCAgICAgKiBDcnlwdG9ncmFwaGljYWxseSBzZWN1cmUgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3Jcblx0ICAgICAqXG5cdCAgICAgKiBBcyBNYXRoLnJhbmRvbSgpIGlzIGNyeXB0b2dyYXBoaWNhbGx5IG5vdCBzYWZlIHRvIHVzZVxuXHQgICAgICovXG5cdCAgICB2YXIgY3J5cHRvU2VjdXJlUmFuZG9tSW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmIChjcnlwdG8pIHtcblx0ICAgICAgICAgICAgLy8gVXNlIGdldFJhbmRvbVZhbHVlcyBtZXRob2QgKEJyb3dzZXIpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoMSkpWzBdO1xuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gVXNlIHJhbmRvbUJ5dGVzIG1ldGhvZCAoTm9kZUpTKVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0by5yYW5kb21CeXRlcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKDQpLnJlYWRJbnQzMkxFKCk7XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hdGl2ZSBjcnlwdG8gbW9kdWxlIGNvdWxkIG5vdCBiZSB1c2VkIHRvIGdldCBzZWN1cmUgcmFuZG9tIG51bWJlci4nKTtcblx0ICAgIH07XG5cblx0ICAgIC8qXG5cdCAgICAgKiBMb2NhbCBwb2x5ZmlsbCBvZiBPYmplY3QuY3JlYXRlXG5cblx0ICAgICAqL1xuXHQgICAgdmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBGKCkge31cblxuXHQgICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgICAgICAgIHZhciBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gb2JqO1xuXG5cdCAgICAgICAgICAgIHN1YnR5cGUgPSBuZXcgRigpO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gbnVsbDtcblxuXHQgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cblxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgUHJvcGVydGllcyB0byBjb3B5IGludG8gdGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnLFxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTcGF3blxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YnR5cGUgPSBjcmVhdGUodGhpcyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSB8fCB0aGlzLmluaXQgPT09IHN1YnR5cGUuaW5pdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhhdFNpZ0J5dGVzOyBqICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGopID4+PiAyXSA9IHRoYXRXb3Jkc1tqID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5CeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkcy5wdXNoKGNyeXB0b1NlY3VyZVJhbmRvbUludCgpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVNpZ0J5dGVzID0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IHRoaXMuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJsb2NrcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJsb2Nrc1JlYWR5ID0gZGF0YVNpZ0J5dGVzIC8gYmxvY2tTaXplQnl0ZXM7XG5cdCAgICAgICAgICAgIGlmIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCB1cCB0byBpbmNsdWRlIHBhcnRpYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLmNlaWwobkJsb2Nrc1JlYWR5KTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIGRvd24gdG8gaW5jbHVkZSBvbmx5IGZ1bGwgYmxvY2tzLFxuXHQgICAgICAgICAgICAgICAgLy8gbGVzcyB0aGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IG11c3QgcmVtYWluIGluIHRoZSBidWZmZXJcblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGgubWF4KChuQmxvY2tzUmVhZHkgfCAwKSAtIHRoaXMuX21pbkJ1ZmZlclNpemUsIDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgd29yZHMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5Xb3Jkc1JlYWR5ID0gbkJsb2Nrc1JlYWR5ICogYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJ5dGVzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQnl0ZXNSZWFkeSA9IE1hdGgubWluKG5Xb3Jkc1JlYWR5ICogNCwgZGF0YVNpZ0J5dGVzKTtcblxuXHQgICAgICAgICAgICAvLyBQcm9jZXNzIGJsb2Nrc1xuXHQgICAgICAgICAgICBpZiAobldvcmRzUmVhZHkpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IG5Xb3Jkc1JlYWR5OyBvZmZzZXQgKz0gYmxvY2tTaXplKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1hbGdvcml0aG0gbG9naWNcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb1Byb2Nlc3NCbG9jayhkYXRhV29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgICAgIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIENvbnN0YW50cyB0YWJsZVxuXHQgICAgdmFyIFQgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBjb25zdGFudHNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgIFRbaV0gPSAoTWF0aC5hYnMoTWF0aC5zaW4oaSArIDEpKSAqIDB4MTAwMDAwMDAwKSB8IDA7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBNRDUgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBNRDUgPSBDX2FsZ28uTUQ1ID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LFxuXHQgICAgICAgICAgICAgICAgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3NlxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0X2kgPSBvZmZzZXQgKyBpO1xuXHQgICAgICAgICAgICAgICAgdmFyIE1fb2Zmc2V0X2kgPSBNW29mZnNldF9pXTtcblxuXHQgICAgICAgICAgICAgICAgTVtvZmZzZXRfaV0gPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCA4KSAgfCAoTV9vZmZzZXRfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDI0KSB8IChNX29mZnNldF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8wICA9IE1bb2Zmc2V0ICsgMF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xICA9IE1bb2Zmc2V0ICsgMV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8yICA9IE1bb2Zmc2V0ICsgMl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8zICA9IE1bb2Zmc2V0ICsgM107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF80ICA9IE1bb2Zmc2V0ICsgNF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF81ICA9IE1bb2Zmc2V0ICsgNV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF82ICA9IE1bb2Zmc2V0ICsgNl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF83ICA9IE1bb2Zmc2V0ICsgN107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF84ICA9IE1bb2Zmc2V0ICsgOF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF85ICA9IE1bb2Zmc2V0ICsgOV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMCA9IE1bb2Zmc2V0ICsgMTBdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTEgPSBNW29mZnNldCArIDExXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEyID0gTVtvZmZzZXQgKyAxMl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMyA9IE1bb2Zmc2V0ICsgMTNdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTQgPSBNW29mZnNldCArIDE0XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzE1ID0gTVtvZmZzZXQgKyAxNV07XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWxiZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF8wLCAgNywgIFRbMF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfMSwgIDEyLCBUWzFdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzIsICAxNywgVFsyXSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8zLCAgMjIsIFRbM10pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfNCwgIDcsICBUWzRdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzUsICAxMiwgVFs1XSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF82LCAgMTcsIFRbNl0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfNywgIDIyLCBUWzddKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzgsICA3LCAgVFs4XSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF85LCAgMTIsIFRbOV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTAsIDE3LCBUWzEwXSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8xMSwgMjIsIFRbMTFdKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEyLCA3LCAgVFsxMl0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTMsIDEyLCBUWzEzXSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8xNCwgMTcsIFRbMTRdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzE1LCAyMiwgVFsxNV0pO1xuXG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF8xLCAgNSwgIFRbMTZdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzYsICA5LCAgVFsxN10pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMTEsIDE0LCBUWzE4XSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF8wLCAgMjAsIFRbMTldKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzUsICA1LCAgVFsyMF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMTAsIDksICBUWzIxXSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8xNSwgMTQsIFRbMjJdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzQsICAyMCwgVFsyM10pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfOSwgIDUsICBUWzI0XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8xNCwgOSwgIFRbMjVdKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzMsICAxNCwgVFsyNl0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfOCwgIDIwLCBUWzI3XSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF8xMywgNSwgIFRbMjhdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzIsICA5LCAgVFsyOV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfNywgIDE0LCBUWzMwXSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF8xMiwgMjAsIFRbMzFdKTtcblxuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfNSwgIDQsICBUWzMyXSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF84LCAgMTEsIFRbMzNdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzExLCAxNiwgVFszNF0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTQsIDIzLCBUWzM1XSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF8xLCAgNCwgIFRbMzZdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzQsICAxMSwgVFszN10pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfNywgIDE2LCBUWzM4XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8xMCwgMjMsIFRbMzldKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEzLCA0LCAgVFs0MF0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfMCwgIDExLCBUWzQxXSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8zLCAgMTYsIFRbNDJdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzYsICAyMywgVFs0M10pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfOSwgIDQsICBUWzQ0XSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF8xMiwgMTEsIFRbNDVdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE1LCAxNiwgVFs0Nl0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMiwgIDIzLCBUWzQ3XSk7XG5cblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzAsICA2LCAgVFs0OF0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfNywgIDEwLCBUWzQ5XSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8xNCwgMTUsIFRbNTBdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzUsICAyMSwgVFs1MV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTIsIDYsICBUWzUyXSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8zLCAgMTAsIFRbNTNdKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzEwLCAxNSwgVFs1NF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfMSwgIDIxLCBUWzU1XSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF84LCAgNiwgIFRbNTZdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzE1LCAxMCwgVFs1N10pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfNiwgIDE1LCBUWzU4XSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF8xMywgMjEsIFRbNTldKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzQsICA2LCAgVFs2MF0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTEsIDEwLCBUWzYxXSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8yLCAgMTUsIFRbNjJdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzksICAyMSwgVFs2M10pO1xuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsSCA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWxMID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSAoXG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsSCA8PCA4KSAgfCAobkJpdHNUb3RhbEggPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsSCA8PCAyNCkgfCAobkJpdHNUb3RhbEggPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxMIDw8IDgpICB8IChuQml0c1RvdGFsTCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxMIDw8IDI0KSB8IChuQml0c1RvdGFsTCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IChkYXRhV29yZHMubGVuZ3RoICsgMSkgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9oYXNoO1xuXHQgICAgICAgICAgICB2YXIgSCA9IGhhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgSF9pID0gSFtpXTtcblxuXHQgICAgICAgICAgICAgICAgSFtpXSA9ICgoKEhfaSA8PCA4KSAgfCAoSF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKEhfaSA8PCAyNCkgfCAoSF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gRkYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArICgoYiAmIGMpIHwgKH5iICYgZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gR0coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArICgoYiAmIGQpIHwgKGMgJiB+ZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gSEgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArIChiIF4gYyBeIGQpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gSUkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLk1ENSgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuTUQ1KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuTUQ1ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoTUQ1KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNNRDUobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjTUQ1ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKE1ENSk7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLk1ENTtcblxufSkpOyIsImltcG9ydCB7XG4gIERyYXdlckludGVyZmFjZSxcbiAgRHJhd2VyQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIFZlY3RvckFycmF5VHlwZSxcbiAgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UsXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IGltYWdlQ2FjaGVIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2ltYWdlLWNhY2hlLWhlbHBlcic7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuL3N0cnVjdHMvdmVjdG9yJztcbmltcG9ydCBDb29yZHNHcmlkRmlsdGVyIGZyb20gJy4vc3RydWN0cy9maWx0ZXJzL2Nvb3Jkcy1ncmlkLWZpbHRlcic7XG5pbXBvcnQgUG9zaXRpb25hbENvbnRleHQgZnJvbSAnLi9zdHJ1Y3RzL2RyYXdhYmxlL3Bvc2l0aW9uYWwtY29udGV4dCc7XG5pbXBvcnQgeyBDb29yZHNGaWx0ZXJDb25maWdJbnRlcmZhY2UgfSBmcm9tICcuL3N0cnVjdHMvZmlsdGVycy90eXBlcyc7XG5pbXBvcnQgeyBCb3VuZEludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMvYm91bmQnO1xuaW1wb3J0IFJlY3Rhbmd1bGFyQm91bmQgZnJvbSAnLi9zdHJ1Y3RzL2JvdW5kcy9yZWN0YW5ndWxhci1ib3VuZCc7XG5cbi8qKlxuICogQ2FudmFzIGRyYXdlclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3ZXIgaW1wbGVtZW50cyBEcmF3ZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTmFtZSBvZiBjbGFzcyB0byB1c2UgYXMgc3Vic2NyaWJlciBuYW1lIGluIG9ic2VydmFibGUgbG9naWNcbiAgICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlck5hbWU6IHN0cmluZyA9ICdEcmF3ZXInO1xuICAvKipcbiAgICogQ2FudmFzIERPTSBlbGVtZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgX2RvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfdmlld0NvbmZpZzogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBEcmF3YWJsZSBvYmplY3RzIHN0b3JhZ2VcbiAgICovXG4gIHByb3RlY3RlZCBfc3RvcmFnZTogRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlO1xuICAvKipcbiAgICogQ2FudmFzIGRyYXdpbmcgY29udGV4dFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIC8qKlxuICAgKiBSZXNpemUgb2JzZXJ2ZXIgb2JqZWN0XG4gICAqL1xuICBwcm90ZWN0ZWQgX3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcblxuICAvKipcbiAgICogRHJhd2VyIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBkb21FbGVtZW50IC0gY2FudmFzIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB2aWV3Q29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIHN0b3JhZ2UgLSBkcmF3YWJsZSBvYmplY3RzIHN0b3JhZ2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBkb21FbGVtZW50LFxuICAgIHZpZXdDb25maWcsXG4gICAgc3RvcmFnZSxcbiAgfTogRHJhd2VyQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5fdmlld0NvbmZpZyA9IHZpZXdDb25maWc7XG4gICAgdGhpcy5fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgdGhpcy5fY29udGV4dCA9IGRvbUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIHRoaXMuX2luaXRSZXNpemVPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRWaWV3Q29uZmlnT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9pbml0U3RvcmFnZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdEltYWdlQ2FjaGVPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRNb3VzZUV2ZW50cygpO1xuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdlckludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoLi4udGhpcy5fdmlld0NvbmZpZy5vZmZzZXQpO1xuICAgIHRoaXMuX2NvbnRleHQuc2NhbGUoLi4udGhpcy5fdmlld0NvbmZpZy5zY2FsZSk7XG4gICAgdGhpcy5fc3RvcmFnZS5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmNvbmZpZy52aXNpYmxlICYmIGl0ZW0uY29uZmlnLmRpc3BsYXkpIHtcbiAgICAgICAgaXRlbS5kcmF3KHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3ZXJJbnRlcmZhY2UucmVmcmVzaH1cbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kb21FbGVtZW50LndpZHRoICE9PSB0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LndpZHRoID0gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZG9tRWxlbWVudC5oZWlnaHQgIT09IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdyZWZyZXNoZWQnKTtcblxuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLmNsZWFyfVxuICAgKi9cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJvdW5kcyBvZiBjYW52YXMgZnJhbWVcbiAgICovXG4gIHB1YmxpYyBnZXRCb3VuZCgpOiBCb3VuZEludGVyZmFjZSB7XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5ndWxhckJvdW5kKHtcbiAgICAgIHBvc2l0aW9uOiB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUJhY2t3YXJkKFswLCAwXSksXG4gICAgICBzaXplOiB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUJhY2t3YXJkKFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF0pLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIGdldHRlclxuICAgKi9cbiAgZ2V0IHZpZXdDb25maWcoKTogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl92aWV3Q29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyBjb250ZXh0IGdldHRlclxuICAgKi9cbiAgZ2V0IGNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgd2lkdGggZ2V0dGVyXG4gICAqL1xuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgaGVpZ2h0IGdldHRlclxuICAgKi9cbiAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kb21FbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgY2FudmFzIHJlc2l6ZSBvYnNlcnZlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0UmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5fZG9tRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHZpZXcgY29uZmlnIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRWaWV3Q29uZmlnT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld0NvbmZpZy5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgc3RvcmFnZSBvYnNlcnZlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0U3RvcmFnZU9ic2VydmVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JhZ2Uub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIGltYWdlIGNhY2hlIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRJbWFnZUNhY2hlT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaW1hZ2VDYWNoZUhlbHBlci5zdWJzY3JpYmUodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHtcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBtb3VzZSBldmVudHMgb2JzZXJ2ZXJcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdE1vdXNlRXZlbnRzKCk6IHZvaWQge1xuICAgIC8vIFRPRE8g0L/QtdGA0LXQvdC10YHRgtC4INC60YPQtNCwLdC90LjQsdGD0LTRjFxuXG4gICAgY29uc3QgY29vcmRzRmlsdGVyID0gbmV3IENvb3Jkc0dyaWRGaWx0ZXIoKTtcbiAgICBjb25zdCBmaWx0ZXJDb29yZHMgPSAoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpID0+IHtcbiAgICAgIHJldHVybiBjb29yZHNGaWx0ZXIucHJvY2Vzcyhjb29yZHMsIHRoaXMuX3ZpZXdDb25maWcuZ2V0Q29uZmlnKCkgYXMgQ29vcmRzRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTtcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnRFbGVtZW50Q29udGV4dDogUG9zaXRpb25hbENvbnRleHQgPSBuZXcgUG9zaXRpb25hbENvbnRleHQobnVsbCwgbnVsbCk7XG5cbiAgICBjb25zdCBERVZJQVRJT04gPSA4O1xuICAgIGNvbnN0IGdldE5lYXJCb3VuZEVsZW1lbnQgPSAoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBQb3NpdGlvbmFsQ29udGV4dCA9PiB7XG4gICAgICBjb25zdCB0cmFuc3Bvc2VkQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUJhY2t3YXJkKGNvb3Jkcyk7XG4gICAgICByZXR1cm4gdGhpcy5fc3RvcmFnZS5maW5kQnlOZWFyRWRnZVBvc2l0aW9uKFxuICAgICAgICB0cmFuc3Bvc2VkQ29vcmRzLCB0aGlzLl92aWV3Q29uZmlnLnNjYWxlLCB0cnVlLCBERVZJQVRJT04gLyB0aGlzLl92aWV3Q29uZmlnLnNjYWxlWzBdLFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChldmVudDogV2hlZWxFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5fdmlld0NvbmZpZy5zY2FsZVswXTtcbiAgICAgICAgc2NhbGUgKz0gZXZlbnQuZGVsdGFZICogLTAuMDAyO1xuICAgICAgICBzY2FsZSA9IE1hdGgubWluKE1hdGgubWF4KDAuMDAxLCBzY2FsZSksIDEwMCk7XG4gICAgICAgIHRoaXMuX3ZpZXdDb25maWcudXBkYXRlU2NhbGVJbkN1cnNvckNvbnRleHQoW3NjYWxlLCBzY2FsZV0sIFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXSk7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0WzBdIC09IGV2ZW50LmRlbHRhWTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0WzFdIC09IGV2ZW50LmRlbHRhWTtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IFBvaW50ZXJFdmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGxldCBtb3VzZURvd25Db29yZHM6IFZlY3RvckFycmF5VHlwZSB8IG51bGwgPSBudWxsO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmIChjdXJyZW50RWxlbWVudENvbnRleHQuaXNFbXB0eSgpKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zcG9zZWRDb29yZHMgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUJhY2t3YXJkKFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXSk7XG4gICAgICAgIGN1cnJlbnRFbGVtZW50Q29udGV4dCA9IHRoaXMuX3N0b3JhZ2UuZmluZEJ5UG9zaXRpb24odHJhbnNwb3NlZENvb3JkcywgdGhpcy5fdmlld0NvbmZpZy5zY2FsZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBtb3VzZU1vdmVDb29yZHM6IFZlY3RvckFycmF5VHlwZSA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIGNvbnN0IHRyYW5zcG9zZWRDb29yZHMgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUJhY2t3YXJkKG1vdXNlTW92ZUNvb3Jkcyk7XG5cbiAgICAgIGlmIChtb3VzZURvd25Db29yZHMgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKCFnZXROZWFyQm91bmRFbGVtZW50KG1vdXNlTW92ZUNvb3JkcykuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAhdGhpcy5fc3RvcmFnZS5maW5kQnlQb3NpdGlvbih0cmFuc3Bvc2VkQ29vcmRzLCB0aGlzLl92aWV3Q29uZmlnLnNjYWxlLCB0cnVlKS5pc0VtcHR5KClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghY3VycmVudEVsZW1lbnRDb250ZXh0LmlzRW1wdHkoKSkge1xuICAgICAgICBjb25zdCBuZXdQb3NpdGlvbiA9IGNyZWF0ZVZlY3Rvcih0cmFuc3Bvc2VkQ29vcmRzKVxuICAgICAgICAgIC5zdWIoY3JlYXRlVmVjdG9yKGN1cnJlbnRFbGVtZW50Q29udGV4dC5wb3NpdGlvbikpXG4gICAgICAgICAgLnRvQXJyYXkoKTtcbiAgICAgICAgY29uc3QgbmV3UG9zaXRpb25GaWx0ZXJlZCA9IGZpbHRlckNvb3JkcyhuZXdQb3NpdGlvbik7XG5cbiAgICAgICAgaWYgKCFjcmVhdGVWZWN0b3IobmV3UG9zaXRpb25GaWx0ZXJlZCkuaXNFcXVhbChjcmVhdGVWZWN0b3IoY3VycmVudEVsZW1lbnRDb250ZXh0LmVsZW1lbnQuY29uZmlnLnBvc2l0aW9uKSkpIHtcbiAgICAgICAgICBjdXJyZW50RWxlbWVudENvbnRleHQuZWxlbWVudC5jb25maWcucG9zaXRpb24gPSBuZXdQb3NpdGlvbkZpbHRlcmVkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkaWZmZXJlbmNlOiBWZWN0b3JBcnJheVR5cGUgPSBbXG4gICAgICAgICAgbW91c2VEb3duQ29vcmRzWzBdLW1vdXNlTW92ZUNvb3Jkc1swXSxcbiAgICAgICAgICBtb3VzZURvd25Db29yZHNbMV0tbW91c2VNb3ZlQ29vcmRzWzFdLFxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0ID0gY3JlYXRlVmVjdG9yKHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0KVxuICAgICAgICAgIC5zdWIoY3JlYXRlVmVjdG9yKGRpZmZlcmVuY2UpKVxuICAgICAgICAgIC50b0FycmF5KCk7XG4gICAgICB9XG5cbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IG1vdXNlTW92ZUNvb3JkcztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIGlmICghY3VycmVudEVsZW1lbnRDb250ZXh0LmlzRW1wdHkoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RWxlbWVudENvbnRleHQuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRFbGVtZW50Q29udGV4dCA9IG5ldyBQb3NpdGlvbmFsQ29udGV4dChudWxsLCBudWxsKTtcbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IG51bGw7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIFN0eWxpemVkRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLCBWZWN0b3JBcnJheVR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGUgZnJvbSAnLi4vc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlJztcbmltcG9ydCB7IHRvVmVjdG9yIH0gZnJvbSAnLi4vc3RydWN0cy92ZWN0b3InO1xuaW1wb3J0IHsgQm91bmRJbnRlcmZhY2UgfSBmcm9tICcuLi90eXBlcy9ib3VuZCc7XG5pbXBvcnQgRWxsaXBzZUJvdW5kIGZyb20gJy4uL3N0cnVjdHMvYm91bmRzL2VsbGlwc2UtYm91bmQnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIHJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRWxsaXBzZUNvbmZpZ0ludGVyZmFjZSBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgU3R5bGl6ZWREcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG5cbn1cblxuaW50ZXJmYWNlIENvbnN0cnVjdG9ySW50ZXJmYWNlIHtcbiAgaWQ6IERyYXdhYmxlSWRUeXBlO1xuICBjb25maWc6IEVsbGlwc2VDb25maWdJbnRlcmZhY2U7XG4gIGRhdGE/OiBMaW5rZWREYXRhVHlwZTtcbn1cblxuLyoqXG4gKiBFbGxpcHNlIGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGxpcHNlIGV4dGVuZHMgUG9zaXRpb25hbERyYXdhYmxlIGltcGxlbWVudHMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdFbGxpcHNlJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogRWxsaXBzZUNvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogUmVjdCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBpZCxcbiAgICBjb25maWcsXG4gICAgZGF0YSA9IHt9LFxuICB9OiBDb25zdHJ1Y3RvckludGVyZmFjZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGlkLFxuICAgICAgY29uZmlnLFxuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDZW50ZXIgZ2V0dGVyXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGdldENlbnRlcihzY2FsZTogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICBjb25zdCBbcG9zaXRpb24sIHNpemVdID0gdGhpcy50cmFuc2xhdGVQb3NpdGlvbkNvbmZpZyhcbiAgICAgIHRvVmVjdG9yKHNjYWxlKS5yZXZlcnNlKCkudG9BcnJheSgpLFxuICAgICk7XG4gICAgcmV0dXJuIHRvVmVjdG9yKHBvc2l0aW9uKS5hZGQodG9WZWN0b3Ioc2l6ZSkuZGl2KDIpKS50b0FycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2VudGVyIGdldHRlclxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZSB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBnZXRSYWRpdXMoc2NhbGU6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgY29uc3QgWywgc2l6ZV0gPSB0aGlzLnRyYW5zbGF0ZVBvc2l0aW9uQ29uZmlnKFxuICAgICAgdG9WZWN0b3Ioc2NhbGUpLnJldmVyc2UoKS50b0FycmF5KCksXG4gICAgKTtcbiAgICByZXR1cm4gdG9WZWN0b3Ioc2l6ZSkuZGl2KDIpLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICBjb25zdCBsaW5lV2lkdGggPSB0aGlzLl9jb25maWcuc2NhbGFibGVcbiAgICAgID8gdGhpcy5fY29uZmlnLmxpbmVXaWR0aFxuICAgICAgOiB0aGlzLl9jb25maWcubGluZVdpZHRoIC8gZHJhd2VyLnZpZXdDb25maWcuc2NhbGVbMF07XG5cbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX2NvbmZpZy5zdHJva2VTdHlsZTtcbiAgICBkcmF3ZXIuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLl9jb25maWcuZmlsbFN0eWxlO1xuICAgIGRyYXdlci5jb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcbiAgICBkcmF3ZXIuY29udGV4dC5lbGxpcHNlKFxuICAgICAgLi4udGhpcy5nZXRDZW50ZXIoZHJhd2VyLnZpZXdDb25maWcuc2NhbGUpLCAuLi50aGlzLmdldFJhZGl1cyhkcmF3ZXIudmlld0NvbmZpZy5zY2FsZSksIDAsIDAsIDIqTWF0aC5QSSxcbiAgICApO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGwoKTtcblxuICAgIGlmICh0aGlzLl9jb25maWcubGluZVdpZHRoICE9PSAwKSB7XG4gICAgICBkcmF3ZXIuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBib3VuZCBnZXR0ZXJcbiAgICovXG4gIGdldCBib3VuZCgpOiBCb3VuZEludGVyZmFjZSB7XG4gICAgcmV0dXJuIG5ldyBFbGxpcHNlQm91bmQoe1xuICAgICAgcG9zaXRpb246IFswLCAwXSxcbiAgICAgIHNpemU6IHRoaXMuX2NvbmZpZy5zaXplLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBEcmF3YWJsZSBmcm9tICcuLi9zdHJ1Y3RzL2RyYXdhYmxlL2RyYXdhYmxlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiBncmlkXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENvbmZpZ0ludGVyZmFjZSBleHRlbmRzIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgbWFpbkxpbmVDb2xvcjogc3RyaW5nO1xuICBzdWJMaW5lQ29sb3I6IHN0cmluZztcbiAgbGluZVdpZHRoOiBudW1iZXI7XG4gIGxpbmVzSW5CbG9jazogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgQ29uc3RydWN0b3JJbnRlcmZhY2Uge1xuICBpZDogRHJhd2FibGVJZFR5cGU7XG4gIGNvbmZpZzogR3JpZENvbmZpZ0ludGVyZmFjZTtcbiAgZGF0YT86IExpbmtlZERhdGFUeXBlO1xufVxuXG4vKipcbiAqIEdyaWQgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdHcmlkJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogR3JpZENvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogR3JpZCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBpZCxcbiAgICBjb25maWcsXG4gICAgZGF0YSA9IHt9LFxuICB9OiBDb25zdHJ1Y3RvckludGVyZmFjZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGlkLFxuICAgICAgY29uZmlnLFxuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBkcmF3ZXIuY29udGV4dC5zYXZlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICBjb25zdCBbZnJvbUJvdW5kLCB0b0JvdW5kXSA9IGRyYXdlci5nZXRCb3VuZCgpLnRvQXJyYXkoKTtcbiAgICBjb25zdCBzY2FsZSA9IGRyYXdlci52aWV3Q29uZmlnLnNjYWxlWzBdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5fY29uZmlnLmxpbmVXaWR0aCAvIHNjYWxlO1xuXG4gICAgbGV0IHN0ZXAgPSBkcmF3ZXIudmlld0NvbmZpZy5ncmlkU3RlcDtcblxuICAgIGlmIChzY2FsZSA8IDEpIHtcbiAgICAgIHN0ZXAgKj0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMigxIC8gc2NhbGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RlcCAvPSAyICoqIE1hdGgucm91bmQoTWF0aC5sb2cyKHNjYWxlKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFpbkxpbmVEaXN0YW5jZSA9IHN0ZXAgKiB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrO1xuICAgIGxldCB4R2FwID0gKGZyb21Cb3VuZFswXSAlIG1haW5MaW5lRGlzdGFuY2UpO1xuICAgIGlmICh4R2FwIDwgMCkge1xuICAgICAgeEdhcCArPSBtYWluTGluZURpc3RhbmNlO1xuICAgIH1cbiAgICBsZXQgeUdhcCA9IChmcm9tQm91bmRbMV0gJSBtYWluTGluZURpc3RhbmNlKTtcbiAgICBpZiAoeUdhcCA8IDApIHtcbiAgICAgIHlHYXAgKz0gbWFpbkxpbmVEaXN0YW5jZTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBsZXQgaiA9IDA7XG4gICAgICBmb3IgKGxldCBpPWZyb21Cb3VuZFsxXS15R2FwOyBpPD10b0JvdW5kWzFdOyBpKz1zdGVwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKGorKyAlIHRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2sgPT09IDApXG4gICAgICAgICAgPyB0aGlzLl9jb25maWcubWFpbkxpbmVDb2xvclxuICAgICAgICAgIDogdGhpcy5fY29uZmlnLnN1YkxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fZHJhd0hvcml6b250YWxMaW5lKGksIGRyYXdlciwgY29sb3IsIFtmcm9tQm91bmQsIHRvQm91bmRdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBsZXQgaiA9IDA7XG4gICAgICBmb3IgKGxldCBpPWZyb21Cb3VuZFswXS14R2FwOyBpPD10b0JvdW5kWzBdOyBpKz1zdGVwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKGorKyAlIHRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2sgPT09IDApXG4gICAgICAgICAgPyB0aGlzLl9jb25maWcubWFpbkxpbmVDb2xvclxuICAgICAgICAgIDogdGhpcy5fY29uZmlnLnN1YkxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fZHJhd1ZlcnRpY2FsTGluZShpLCBkcmF3ZXIsIGNvbG9yLCBbZnJvbUJvdW5kLCB0b0JvdW5kXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgaG9yaXpvbnRhbCBsaW5lXG4gICAqIEBwYXJhbSB5T2Zmc2V0IC0gdmVydGljYWwgb2Zmc2V0XG4gICAqIEBwYXJhbSBkcmF3ZXIgLSBkcmF3ZXIgb2JqZWN0XG4gICAqIEBwYXJhbSBjb2xvciAtIGNvbG9yXG4gICAqIEBwYXJhbSBmcm9tQm91bmQgLSBsZWZ0LXRvcCBib3VuZFxuICAgKiBAcGFyYW0gdG9Cb3VuZCAtIHJpZ2h0LWJvdHRvbSBib3VuZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kcmF3SG9yaXpvbnRhbExpbmUoXG4gICAgeU9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0sXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW2Zyb21Cb3VuZFswXSwgeU9mZnNldF07XG4gICAgY29uc3QgbGluZVRvID0gW3RvQm91bmRbMF0sIHlPZmZzZXRdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyB2ZXJ0aWNhbCBsaW5lXG4gICAqIEBwYXJhbSBkcmF3ZXIgLSBkcmF3ZXIgb2JqZWN0XG4gICAqIEBwYXJhbSB4T2Zmc2V0IC0gaG9yaXpvbnRhbCBvZmZzZXRcbiAgICogQHBhcmFtIGNvbG9yIC0gY29sb3JcbiAgICogQHBhcmFtIGZyb21Cb3VuZCAtIGxlZnQtdG9wIGJvdW5kXG4gICAqIEBwYXJhbSB0b0JvdW5kIC0gcmlnaHQtYm90dG9tIGJvdW5kXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RyYXdWZXJ0aWNhbExpbmUoXG4gICAgeE9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0sXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW3hPZmZzZXQsIGZyb21Cb3VuZFsxXV07XG4gICAgY29uc3QgbGluZVRvID0gW3hPZmZzZXQsIHRvQm91bmRbMV1dO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSwgVmVjdG9yQXJyYXlUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgUG9zaXRpb25hbERyYXdhYmxlIGZyb20gJy4uL3N0cnVjdHMvZHJhd2FibGUvcG9zaXRpb25hbC1kcmF3YWJsZSc7XG5pbXBvcnQgeyB0b1ZlY3RvciB9IGZyb20gJy4uL3N0cnVjdHMvdmVjdG9yJztcbmltcG9ydCB7IEJvdW5kSW50ZXJmYWNlIH0gZnJvbSAnLi4vdHlwZXMvYm91bmQnO1xuaW1wb3J0IExpbmVCb3VuZCBmcm9tICcuLi9zdHJ1Y3RzL2JvdW5kcy9saW5lLWJvdW5kJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiByZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIExpbmVDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU3Ryb2tlIHN0eWxlXG4gICAqL1xuICBzdHJva2VTdHlsZTogc3RyaW5nO1xuICAvKipcbiAgICogTGluZSB3aWR0aFxuICAgKi9cbiAgbGluZVdpZHRoOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBDb25zdHJ1Y3RvckludGVyZmFjZSB7XG4gIGlkOiBEcmF3YWJsZUlkVHlwZTtcbiAgY29uZmlnOiBMaW5lQ29uZmlnSW50ZXJmYWNlO1xuICBkYXRhPzogTGlua2VkRGF0YVR5cGU7XG59XG5cbi8qKlxuICogTGluZSBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZSBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnTGluZSc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IExpbmVDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFJlY3QgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgaWQsXG4gICAgY29uZmlnLFxuICAgIGRhdGEgPSB7fSxcbiAgfTogQ29uc3RydWN0b3JJbnRlcmZhY2UpIHtcbiAgICBzdXBlcih7XG4gICAgICBpZCxcbiAgICAgIGNvbmZpZyxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRnJvbSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgZnJvbSgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcucG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogVG8gZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRvKCk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRvVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbikuYWRkKHRoaXMuX2NvbmZpZy5zaXplKS50b0FycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IHNjYWxlID0gZHJhd2VyLnZpZXdDb25maWcuc2NhbGVbMF07XG5cbiAgICBkcmF3ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX2NvbmZpZy5zdHJva2VTdHlsZTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLl9jb25maWcuc2NhbGFibGUgPyB0aGlzLl9jb25maWcubGluZVdpZHRoIDogdGhpcy5fY29uZmlnLmxpbmVXaWR0aCAvIHNjYWxlO1xuICAgIGRyYXdlci5jb250ZXh0Lm1vdmVUbyguLi50aGlzLmZyb20pO1xuICAgIGRyYXdlci5jb250ZXh0LmxpbmVUbyguLi50aGlzLnRvKTtcblxuICAgIGlmICh0aGlzLl9jb25maWcubGluZVdpZHRoICE9PSAwKSB7XG4gICAgICBkcmF3ZXIuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBib3VuZCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgYm91bmQoKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIHJldHVybiBuZXcgTGluZUJvdW5kKHtcbiAgICAgIHBvc2l0aW9uOiB0aGlzLl9jb25maWcucG9zaXRpb24sXG4gICAgICBzaXplOiB0aGlzLl9jb25maWcuc2l6ZSxcbiAgICAgIGRldmlhdGlvbjogdGhpcy5fY29uZmlnLmxpbmVXaWR0aC8yLFxuICAgICAgc2NhbGFibGU6IHRoaXMuX2NvbmZpZy5zY2FsYWJsZSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIFN0eWxpemVkRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgUG9zaXRpb25hbERyYXdhYmxlIGZyb20gJy4uL3N0cnVjdHMvZHJhd2FibGUvcG9zaXRpb25hbC1kcmF3YWJsZSc7XG5pbXBvcnQgeyB0b1ZlY3RvciB9IGZyb20gJy4uL3N0cnVjdHMvdmVjdG9yJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiByZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlY3RDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIFN0eWxpemVkRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuXG59XG5cbmludGVyZmFjZSBDb25zdHJ1Y3RvckludGVyZmFjZSB7XG4gIGlkOiBEcmF3YWJsZUlkVHlwZTtcbiAgY29uZmlnOiBSZWN0Q29uZmlnSW50ZXJmYWNlO1xuICBkYXRhPzogTGlua2VkRGF0YVR5cGU7XG59XG5cbi8qKlxuICogUmVjdCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdCBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnUmVjdCc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IFJlY3RDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFJlY3QgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgaWQsXG4gICAgY29uZmlnLFxuICAgIGRhdGEgPSB7fSxcbiAgfTogQ29uc3RydWN0b3JJbnRlcmZhY2UpIHtcbiAgICBzdXBlcih7XG4gICAgICBpZCxcbiAgICAgIGNvbmZpZyxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgY29uc3QgW3Bvc2l0aW9uLCBzaXplXSA9IHRoaXMudHJhbnNsYXRlUG9zaXRpb25Db25maWcoXG4gICAgICB0b1ZlY3RvcihkcmF3ZXIudmlld0NvbmZpZy5zY2FsZSkucmV2ZXJzZSgpLnRvQXJyYXkoKSxcbiAgICApO1xuICAgIGNvbnN0IGxpbmVXaWR0aCA9IHRoaXMuX2NvbmZpZy5zY2FsYWJsZVxuICAgICAgPyB0aGlzLl9jb25maWcubGluZVdpZHRoXG4gICAgICA6IHRoaXMuX2NvbmZpZy5saW5lV2lkdGggLyBkcmF3ZXIudmlld0NvbmZpZy5zY2FsZVswXTtcblxuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5fY29uZmlnLnN0cm9rZVN0eWxlO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2NvbmZpZy5maWxsU3R5bGU7XG4gICAgZHJhd2VyLmNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGxSZWN0KC4uLnBvc2l0aW9uLCAuLi5zaXplKTtcblxuICAgIGlmICh0aGlzLl9jb25maWcubGluZVdpZHRoICE9PSAwKSB7XG4gICAgICBkcmF3ZXIuY29udGV4dC5zdHJva2VSZWN0KC4uLnBvc2l0aW9uLCAuLi5zaXplKTtcbiAgICB9XG5cbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLCBWZWN0b3JBcnJheVR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGUgZnJvbSAnLi4vc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlJztcbmltcG9ydCBpbWFnZUNhY2hlSGVscGVyIGZyb20gJy4uL2hlbHBlcnMvaW1hZ2UtY2FjaGUtaGVscGVyJztcbmltcG9ydCB7IEJvdW5kSW50ZXJmYWNlLCBWZWN0b3JBcnJheUNvbGxlY3Rpb25UeXBlIH0gZnJvbSAnLi4vdHlwZXMvYm91bmQnO1xuaW1wb3J0IFBvbHlnb25hbEJvdW5kIGZyb20gJy4uL3N0cnVjdHMvYm91bmRzL3BvbHlnb25hbC1ib3VuZCc7XG5pbXBvcnQgeyBDb29yZHNDb2xsZWN0aW9uRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi4vc3RydWN0cy9maWx0ZXJzL3R5cGVzJztcbmltcG9ydCBDb29yZHNDb2xsZWN0aW9uRm9yd2FyZEZpbHRlciBmcm9tICcuLi9zdHJ1Y3RzL2ZpbHRlcnMvY29vcmRzLWNvbGxlY3Rpb24tZm9yd2FyZC1maWx0ZXInO1xuaW1wb3J0IHsgdG9WZWN0b3IgfSBmcm9tICcuLi9zdHJ1Y3RzL3ZlY3Rvcic7XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBjb25maWcgb2YgcmVjdCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdmdDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU1ZHIGRhdGFcbiAgICovXG4gIGRhdGE6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIENvbnN0cnVjdG9ySW50ZXJmYWNlIHtcbiAgaWQ6IERyYXdhYmxlSWRUeXBlO1xuICBjb25maWc6IFN2Z0NvbmZpZ0ludGVyZmFjZTtcbiAgYm91bmQ6IFZlY3RvckFycmF5Q29sbGVjdGlvblR5cGU7XG4gIGRhdGE/OiBMaW5rZWREYXRhVHlwZTtcbn1cblxuLyoqXG4gKiBTdmcgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN2ZyBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnU3ZnJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogU3ZnQ29uZmlnSW50ZXJmYWNlO1xuICAvKipcbiAgICogSW1hZ2UgRE9NIGVsZW1lbnRcbiAgICovXG4gIHByb3RlY3RlZCBfaW1nOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIHRoZSBib3VuZCBwb2ludHNcbiAgICovXG4gIHByb3RlY3RlZCBfYm91bmQ6IFZlY3RvckFycmF5Q29sbGVjdGlvblR5cGU7XG4gIC8qKlxuICAgKiBGaWx0ZXIgZm9yIHNjYWxpbmcgYm91bmRcbiAgICovXG4gIHByb3RlY3RlZCBfYm91bmRGaWx0ZXI6IENvb3Jkc0NvbGxlY3Rpb25GaWx0ZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFN2ZyBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBib3VuZCAtIGNvbGxlY3Rpb24gb2YgdGhlIGJvdW5kIHBvaW50c1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgaWQsXG4gICAgY29uZmlnLFxuICAgIGJvdW5kLFxuICAgIGRhdGEgPSB7fSxcbiAgfTogQ29uc3RydWN0b3JJbnRlcmZhY2UpIHtcbiAgICBzdXBlcih7XG4gICAgICBpZCxcbiAgICAgIGNvbmZpZyxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gICAgdGhpcy5fYm91bmQgPSBib3VuZDtcbiAgICB0aGlzLl9ib3VuZEZpbHRlciA9IG5ldyBDb29yZHNDb2xsZWN0aW9uRm9yd2FyZEZpbHRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3RyeURyYXcoZHJhd2VyKSkge1xuICAgICAgdGhpcy5faW1nID0gaW1hZ2VDYWNoZUhlbHBlci5jYWNoZSh0aGlzLl9jb25maWcuZGF0YSwgJ2ltYWdlL3N2Zyt4bWwnLCAoaW1nKSA9PiB7XG4gICAgICAgIHRoaXMuX2ltZyA9IGltZztcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fdHJ5RHJhdyhkcmF3ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBzb3VyY2VXaWR0aCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgc291cmNlV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faW1nICE9PSBudWxsID8gdGhpcy5faW1nLndpZHRoIDogdGhpcy5fY29uZmlnLnNpemVbMF07XG4gIH1cblxuICAvKipcbiAgICogc291cmNlSGVpZ2h0IGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBzb3VyY2VIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faW1nICE9PSBudWxsID8gdGhpcy5faW1nLmhlaWdodCA6IHRoaXMuX2NvbmZpZy5zaXplWzFdO1xuICB9XG5cbiAgLyoqXG4gICAqIHNjYWxlIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBzY2FsZSgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLl9jb25maWcuc2l6ZVswXSAvIHRoaXMuc291cmNlV2lkdGgsXG4gICAgICB0aGlzLl9jb25maWcuc2l6ZVsxXSAvIHRoaXMuc291cmNlSGVpZ2h0LFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogYm91bmQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJvdW5kKCk6IEJvdW5kSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gbmV3IFBvbHlnb25hbEJvdW5kKHtcbiAgICAgIHBvaW50czogdGhpcy5fYm91bmRGaWx0ZXIucHJvY2Vzcyh0aGlzLl9ib3VuZCwge1xuICAgICAgICBzY2FsZTogdGhpcy5zY2FsZSxcbiAgICAgICAgb2Zmc2V0OiBbMCwgMF0sXG4gICAgICAgIGdyaWRTdGVwOiAwLFxuICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmdldFNjYWxlZEJvdW5kfVxuICAgKi9cbiAgZ2V0U2NhbGVkQm91bmQoc2NhbGU6IFZlY3RvckFycmF5VHlwZSk6IEJvdW5kSW50ZXJmYWNlIHtcbiAgICAvLyBUT0RPIGltcGxlbWVudFxuICAgIHJldHVybiBzdXBlci5nZXRTY2FsZWRCb3VuZChzY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZXMgdG8gZHJhdyB0aGUgZmlndXJlIGlmIHRoZSBpbWFnZSBpcyByZWFkeVxuICAgKiBAcGFyYW0gZHJhd2VyIC0gZHJhd2VyIG9iamVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIF90cnlEcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2ltZyAhPT0gbnVsbCkge1xuICAgICAgLy8gY29uc3Qgc2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgICAgLy8gY29uc3QgcG9zaXRpb24gPSB0aGlzLl9jb25maWcucG9zaXRpb247XG4gICAgICAvLyBjb25zdCBzY2FsZWRQb3NpdGlvbjogVmVjdG9yQXJyYXlUeXBlID0gW3Bvc2l0aW9uWzBdL3NjYWxlWzBdLCBwb3NpdGlvblsxXS9zY2FsZVsxXV07XG5cbiAgICAgIGNvbnN0IFtwb3NpdGlvbiwgc2l6ZV0gPSB0aGlzLnRyYW5zbGF0ZVBvc2l0aW9uQ29uZmlnKFxuICAgICAgICB0b1ZlY3RvcihkcmF3ZXIudmlld0NvbmZpZy5zY2FsZSkucmV2ZXJzZSgpLnRvQXJyYXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBzY2FsZSA9IHRvVmVjdG9yKHRoaXMuc2NhbGUpXG4gICAgICAgIC5kaXZDb29yZHModGhpcy5fY29uZmlnLnNpemUpXG4gICAgICAgIC5tdWxDb29yZHMoc2l6ZSlcbiAgICAgICAgLnRvQXJyYXkoKTtcbiAgICAgIGNvbnN0IHNjYWxlZFBvc2l0aW9uOiBWZWN0b3JBcnJheVR5cGUgPSBbcG9zaXRpb25bMF0vc2NhbGVbMF0sIHBvc2l0aW9uWzFdL3NjYWxlWzFdXTtcblxuICAgICAgZHJhd2VyLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICBkcmF3ZXIuY29udGV4dC5zY2FsZSguLi5zY2FsZSk7XG4gICAgICBkcmF3ZXIuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5faW1nLCAuLi5zY2FsZWRQb3NpdGlvbik7XG4gICAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LnJlc3RvcmUoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBkZWZhdWx0IGFzIG1kNSB9IGZyb20gJ2NyeXB0by1qcy9tZDUnO1xuaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JJbnRlcmZhY2UgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyB0b1ZlY3RvciB9IGZyb20gJy4uL3N0cnVjdHMvdmVjdG9yJztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYXJyYXlzIGFyZSBlcXVhbCBhbmQgZmFsc2UgZWxzZVxuICogQHB1YmxpY1xuICogQHBhcmFtIGxocyAtIGZpcnN0IGFycmF5IHRvIGNvbXBhcmVcbiAqIEBwYXJhbSByaHMgLSBzZWNvbmQgYXJyYXkgdG8gY29tcGFyZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJlQXJyYXlzRXF1YWwobGhzOiBBcnJheTx1bmtub3duPiwgcmhzOiBBcnJheTx1bmtub3duPik6IGJvb2xlYW4ge1xuICByZXR1cm4gbGhzLmxlbmd0aCA9PT0gcmhzLmxlbmd0aCAmJiBsaHMuZXZlcnkoKHYsIGkpID0+IHYgPT09IHJoc1tpXSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBET00gZWxlbWVudCBmcm9tIEhUTUwgc3RyaW5nXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gaHRtbFN0cmluZyAtIEhUTUwgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50RnJvbUhUTUwoaHRtbFN0cmluZzogc3RyaW5nKTogdW5rbm93biB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gaHRtbFN0cmluZy50cmltKCk7XG5cbiAgcmV0dXJuIGRpdi5maXJzdENoaWxkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYmxvYiBmcm9tIHRleHRcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBkYXRhIC0gdGV4dFxuICogQHBhcmFtIHR5cGUgLSB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCbG9iKGRhdGE6IHN0cmluZywgdHlwZTogc3RyaW5nKTogQmxvYiB7XG4gIHJldHVybiBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZSB9KTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHVuZGVyc3RhbmRpbmcgbWV0aG9kIGNyZWF0ZU9iamVjdFVSTCgpXG4gKi9cbmludGVyZmFjZSBVcmxJbnRlcmZhY2Uge1xuICBjcmVhdGVPYmplY3RVUkwoYmxvYjogQmxvYik6IHN0cmluZztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIFVSTCBmcm9tIGJsb2JcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBibG9iIC0gYmxvYlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsRnJvbUJsb2IoYmxvYjogQmxvYik6IHN0cmluZyB7XG4gIGNvbnN0IFVSTDogVXJsSW50ZXJmYWNlID0gKHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cpIGFzIFVybEludGVyZmFjZTtcbiAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59XG5cbi8qKlxuICogRmluZHMgYW5kIHJldHVybnMgbWluaW1hbCAobGVmdC10b3ApIHBvc2l0aW9uXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gcG9zaXRpb25zIC0gaW5wdXQgcG9zaXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW5Qb3NpdGlvbihwb3NpdGlvbnM6IFZlY3RvckFycmF5VHlwZVtdKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgbGV0IG1pblg6IG51bWJlciA9IEluZmluaXR5O1xuICBsZXQgbWluWTogbnVtYmVyID0gSW5maW5pdHk7XG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgaWYgKHBvc2l0aW9uWzBdIDwgbWluWCkge1xuICAgICAgbWluWCA9IHBvc2l0aW9uWzBdO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb25bMV0gPCBtaW5ZKSB7XG4gICAgICBtaW5ZID0gcG9zaXRpb25bMV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gW21pblgsIG1pblldO1xufVxuXG4vKipcbiAqIEZpbmRzIGFuZCByZXR1cm5zIG1heGltYWwgKHJpZ2h0LWJvdHRvbSkgcG9zaXRpb25cbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBwb3NpdGlvbnMgLSBpbnB1dCBwb3NpdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1heFBvc2l0aW9uKHBvc2l0aW9uczogVmVjdG9yQXJyYXlUeXBlW10pOiBWZWN0b3JBcnJheVR5cGUge1xuICBsZXQgbWF4WDogbnVtYmVyID0gLUluZmluaXR5O1xuICBsZXQgbWF4WTogbnVtYmVyID0gLUluZmluaXR5O1xuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIGlmIChwb3NpdGlvblswXSA+IG1heFgpIHtcbiAgICAgIG1heFggPSBwb3NpdGlvblswXTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uWzFdID4gbWF4WSkge1xuICAgICAgbWF4WSA9IHBvc2l0aW9uWzFdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFttYXhYLCBtYXhZXTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIE1ENSBoYXNoIGZyb20gc3RyaW5nXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gaW5wdXQgLSBpbnB1dCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc2hTdHJpbmcoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBtZDUoaW5wdXQpLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGVsbGlwc2UgaW5jbHVkZXMgcG9pbnRcbiAqIEBwYXJhbSBwb2ludCAtIHBvaW50IGNvb3JkcyB2ZWN0b3JcbiAqIEBwYXJhbSBjZW50ZXIgLSBjZW50ZXIgdmVjdG9yXG4gKiBAcGFyYW0gcmFkaXVzIC0gcmFkaXVzIHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbkVsbGlwc2UoXG4gIHBvaW50OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsXG4gIGNlbnRlcjogVmVjdG9yQXJyYXlUeXBlIHwgVmVjdG9ySW50ZXJmYWNlLFxuICByYWRpdXM6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSxcbik6IGJvb2xlYW4ge1xuICBjb25zdCBbeCwgeV0gPSB0b1ZlY3Rvcihwb2ludCkuc3ViKGNlbnRlcikudG9BcnJheSgpO1xuICBjb25zdCBbYSwgYl0gPSB0b1ZlY3RvcihyYWRpdXMpLnRvQXJyYXkoKTtcblxuICByZXR1cm4gKHgqKjIpIC8gKGEqKjIpICsgKHkqKjIpIC8gKGIqKjIpIDw9IDE7XG59XG5cbi8qKlxuICogUmV0dXJucyBjZW50ZXJlZCBzY2FsZWQgcG9zaXRpb24gYW5kIHNpemVcbiAqIEBwYXJhbSBwb3NpdGlvbiAtIHBvc2l0aW9uIHZlY3RvclxuICogQHBhcmFtIHNpemUgLSBzaXplIHZlY3RvclxuICogQHBhcmFtIHNjYWxlIC0gc2NhbGUgdmVjdG9yXG4gKiBAcGFyYW0gb2Zmc2V0IC0gbGVmdCB0b3AgcG9pbnQgcmVsYXRpdmUgb2Zmc2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVQb3NpdGlvbkNvbmZpZyhcbiAgcG9zaXRpb246IFZlY3RvckFycmF5VHlwZSwgc2l6ZTogVmVjdG9yQXJyYXlUeXBlLCBzY2FsZTogVmVjdG9yQXJyYXlUeXBlLCBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSxcbik6IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0ge1xuICBjb25zdCBtYWluUG9zaXRpb24gPSB0b1ZlY3Rvcihwb3NpdGlvbikuc3ViKHRvVmVjdG9yKHNpemUpLm11bENvb3JkcyhvZmZzZXQpKS50b0FycmF5KCk7XG4gIGNvbnN0IG5ld1NpemUgPSB0b1ZlY3RvcihzaXplKS5tdWxDb29yZHMoc2NhbGUpLnRvQXJyYXkoKTtcblxuICBjb25zdCBuZXdQb3NpdGlvbiA9IHRvVmVjdG9yKG1haW5Qb3NpdGlvbikuYWRkKFxuICAgIHRvVmVjdG9yKHNpemUpLnN1YihuZXdTaXplKS5tdWxDb29yZHMob2Zmc2V0KSxcbiAgKS50b0FycmF5KCk7XG5cbiAgcmV0dXJuIFtuZXdQb3NpdGlvbiwgbmV3U2l6ZV07XG59XG4iLCJpbXBvcnQgSW1hZ2VDYWNoZSBmcm9tICcuLi9zdHJ1Y3RzL2ltYWdlLWNhY2hlJztcblxuLyoqXG4gKiBJbWFnZSBjYWNoZSBoZWxwZXJcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgbmV3IEltYWdlQ2FjaGUoKTtcbiIsImltcG9ydCB7XG4gIEV4dHJhRGF0YVR5cGUsXG4gIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsXG4gIFZpZXdPYnNlcnZhYmxlQ2FsbGJhY2tUeXBlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVIZWxwZXIgaW1wbGVtZW50cyBPYnNlcnZlSGVscGVySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIEhhbmRsZXJzIG1hcHBlZCBieSBzdWJzY3JpYmVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9oYW5kbGVyTWFwOiBSZWNvcmQ8c3RyaW5nLCBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlPiA9IHt9O1xuICAvKipcbiAgICogRmxhZyBmb3IgbXV0aW5nIGhhbmRsZXJzXG4gICAqL1xuICBwcm90ZWN0ZWQgX211dGVIYW5kbGVyczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5vbkNoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvbkNoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5faGFuZGxlck1hcFtzdWJzY3JpYmVyTmFtZV0gPSBoYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLm9mZkNoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLl9oYW5kbGVyTWFwW3N1YnNjcmliZXJOYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5wcm9jZXNzV2l0aE11dGluZ0hhbmRsZXJzfVxuICAgKi9cbiAgcHVibGljIHByb2Nlc3NXaXRoTXV0aW5nSGFuZGxlcnMoZXh0cmE6IEV4dHJhRGF0YVR5cGUgfCBudWxsID0gbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRpbmdIYW5kbGVycygoKSA9PiBbdHJ1ZSwgZXh0cmFdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS53aXRoTXV0aW5nSGFuZGxlcnN9XG4gICAqL1xuICBwdWJsaWMgd2l0aE11dGluZ0hhbmRsZXJzKGFjdGlvbjogVmlld09ic2VydmFibGVDYWxsYmFja1R5cGUpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fbXV0ZUhhbmRsZXJzKSB7XG4gICAgICBhY3Rpb24odGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX211dGVIYW5kbGVycyA9IHRydWU7XG4gICAgICBjb25zdCBbcHJvY2Vzc0ZsYWcsIGV4dHJhXSA9IGFjdGlvbih0aGlzKTtcbiAgICAgIHRoaXMuX211dGVIYW5kbGVycyA9IGZhbHNlO1xuXG4gICAgICBpZiAocHJvY2Vzc0ZsYWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NIYW5kbGVycyhleHRyYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBhbGwgcmVnaXN0ZXJlZCBoYW5kbGVyc1xuICAgKiBAcGFyYW0gZXh0cmEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKi9cbiAgcHJvdGVjdGVkIF9wcm9jZXNzSGFuZGxlcnMoZXh0cmE6IEV4dHJhRGF0YVR5cGUgfCBudWxsID0gbnVsbCk6IGJvb2xlYW4ge1xuICAgIE9iamVjdC52YWx1ZXModGhpcy5faGFuZGxlck1hcClcbiAgICAgIC5mb3JFYWNoKChoYW5kbGVyKSA9PiBoYW5kbGVyKHRoaXMsIGV4dHJhKSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRHJhd2FibGVJbnRlcmZhY2UgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGl0ZW0gaXMgaW5zdGFuY2Ugb2YgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlXG4gKiBAc2VlIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVxuICogQHBhcmFtIGl0ZW0gLSBpdGVtIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Bvc2l0aW9uYWwoaXRlbTogRHJhd2FibGVJbnRlcmZhY2UpOiBib29sZWFuIHtcbiAgcmV0dXJuICdpc1Bvc2l0aW9uYWwnIGluIGl0ZW07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGl0ZW0gaXMgaW5zdGFuY2Ugb2YgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlXG4gKiBAc2VlIERyYXdhYmxlTGF5ZXJJbnRlcmZhY2VcbiAqIEBwYXJhbSBpdGVtIC0gaXRlbSB0byBjaGVja1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNMYXllcihpdGVtOiBEcmF3YWJsZUludGVyZmFjZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gJ2lzTGF5ZXInIGluIGl0ZW07XG59XG4iLCJpbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUsIFZlY3RvckludGVyZmFjZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IEJvdW5kSW50ZXJmYWNlLCBFbGxpcHNlQm91bmRDb25maWcgfSBmcm9tICcuLi8uLi90eXBlcy9ib3VuZCc7XG5pbXBvcnQgUmVjdGFuZ3VsYXJCb3VuZCBmcm9tICcuL3JlY3Rhbmd1bGFyLWJvdW5kJztcbmltcG9ydCB7IHRyYW5zbGF0ZVBvc2l0aW9uQ29uZmlnLCBpc0luRWxsaXBzZSB9IGZyb20gJy4uLy4uL2hlbHBlcnMvYmFzZSc7XG5pbXBvcnQgeyB0b1ZlY3RvciB9IGZyb20gJy4uL3ZlY3Rvcic7XG5cbi8qKlxuICogUmVjdGFuZ3VsYXJCb3VuZCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGxpcHNlQm91bmQgaW1wbGVtZW50cyBCb3VuZEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBCb3VuZCBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBFbGxpcHNlQm91bmRDb25maWc7XG5cbiAgLyoqXG4gICAqIFJlY3Rhbmd1bGFyQm91bmQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZyAtIGJvdW5kIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnOiBFbGxpcHNlQm91bmRDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogUmFkaXVzIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBjZW50ZXIoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdG9WZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKS5hZGQodGhpcy5yYWRpdXMpLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSYWRpdXMgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHJhZGl1cygpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0b1ZlY3Rvcih0aGlzLl9jb25maWcuc2l6ZSkuZGl2KDIpLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQm91bmRJbnRlcmZhY2UuaW5jbHVkZXN9XG4gICAqL1xuICBwdWJsaWMgaW5jbHVkZXMoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNJbkVsbGlwc2UoY29vcmRzLCB0aGlzLmNlbnRlciwgdGhpcy5yYWRpdXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS5pc05lYXJFZGdlfVxuICAgKi9cbiAgcHVibGljIGlzTmVhckVkZ2UoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIHNjYWxlOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGV2aWF0aW9uVmVjdG9yOiBWZWN0b3JJbnRlcmZhY2UgPSB0b1ZlY3RvcihbZGV2aWF0aW9uLCBkZXZpYXRpb25dKTtcblxuICAgIGNvbnN0IG1heFJhZGl1cyA9IHRvVmVjdG9yKHRoaXMucmFkaXVzKS5hZGQoZGV2aWF0aW9uVmVjdG9yKTtcbiAgICBjb25zdCBtaW5SYWRpdXMgPSB0b1ZlY3Rvcih0aGlzLnJhZGl1cykuc3ViKGRldmlhdGlvblZlY3Rvcik7XG5cbiAgICByZXR1cm4gaXNJbkVsbGlwc2UoY29vcmRzLCB0aGlzLmNlbnRlciwgbWF4UmFkaXVzKVxuICAgICAgJiYgIWlzSW5FbGxpcHNlKGNvb3JkcywgdGhpcy5jZW50ZXIsIG1pblJhZGl1cyk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEJvdW5kSW50ZXJmYWNlLnRvQXJyYXl9XG4gICAqL1xuICBwdWJsaWMgdG9BcnJheSgpOiBbVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JBcnJheVR5cGVdIHtcbiAgICByZXR1cm4gW3RoaXMuX2NvbmZpZy5wb3NpdGlvbiwgdGhpcy5fY29uZmlnLnNpemVdO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS50b1JlY3RCb3VuZH1cbiAgICovXG4gIHB1YmxpYyB0b1JlY3RCb3VuZCgpOiBCb3VuZEludGVyZmFjZSB7XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5ndWxhckJvdW5kKHtcbiAgICAgIHBvc2l0aW9uOiB0aGlzLl9jb25maWcucG9zaXRpb24sXG4gICAgICBzaXplOiB0aGlzLl9jb25maWcuc2l6ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQm91bmRJbnRlcmZhY2Uuc3BlY2lmeX1cbiAgICovXG4gIHB1YmxpYyBzcGVjaWZ5KHNjYWxlOiBWZWN0b3JBcnJheVR5cGUsIG9mZnNldDogVmVjdG9yQXJyYXlUeXBlID0gWzAsIDBdKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2l6ZV0gPSB0cmFuc2xhdGVQb3NpdGlvbkNvbmZpZyh0aGlzLl9jb25maWcucG9zaXRpb24sIHRoaXMuX2NvbmZpZy5zaXplLCBzY2FsZSwgb2Zmc2V0KTtcblxuICAgIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuX2NvbmZpZy5zaXplID0gc2l6ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBCb3VuZEludGVyZmFjZSwgTGluZUJvdW5kQ29uZmlnIH0gZnJvbSAnLi4vLi4vdHlwZXMvYm91bmQnO1xuaW1wb3J0IFJlY3Rhbmd1bGFyQm91bmQgZnJvbSAnLi9yZWN0YW5ndWxhci1ib3VuZCc7XG5pbXBvcnQgeyBjcmVhdGVQb2x5Z29uVmVjdG9ycyB9IGZyb20gJy4uL3ZlY3Rvcic7XG5cbi8qKlxuICogUmVjdGFuZ3VsYXJCb3VuZCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lQm91bmQgaW1wbGVtZW50cyBCb3VuZEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBCb3VuZCBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBMaW5lQm91bmRDb25maWc7XG5cbiAgLyoqXG4gICAqIFJlY3Rhbmd1bGFyQm91bmQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZyAtIGJvdW5kIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnOiBMaW5lQm91bmRDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEJvdW5kSW50ZXJmYWNlLmluY2x1ZGVzfVxuICAgKiBAcGFyYW0gY29vcmRzIC0gY29vcmRzIHZlY3RvclxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZSB2ZWN0b3JcbiAgICogQHBhcmFtIGV4dHJhRGV2aWF0aW9uIC0gbWluaW1hbCBkZXZpYXRpb24gc2l6ZVxuICAgKi9cbiAgcHVibGljIGluY2x1ZGVzKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBzY2FsZTogVmVjdG9yQXJyYXlUeXBlLCBleHRyYURldmlhdGlvbjogbnVtYmVyID0gMCk6IGJvb2xlYW4ge1xuICAgIC8vIFRPRE8g0LTQvtCx0LDQstC40YLRjCDQsiDQstC10LrRgtC+0YAg0YPQutC+0YDQsNGH0LjQstCw0L3QuNC1L9GD0LTQu9C40L3QvdC10L3QuNC1INC90LDRh9Cw0LvQsCDQuCDQutC+0L3RhtCwXG4gICAgY29uc3QgdmVjdG9ycyA9IGNyZWF0ZVBvbHlnb25WZWN0b3JzKFtcbiAgICAgIFswLCAwXSxcbiAgICAgIFt0aGlzLl9jb25maWcuc2l6ZVswXSwgdGhpcy5fY29uZmlnLnNpemVbMV1dLFxuICAgIF0pO1xuICAgIGNvbnN0IGRldmlhdGlvbiA9IHRoaXMuX2NvbmZpZy5zY2FsYWJsZSA/IHRoaXMuX2NvbmZpZy5kZXZpYXRpb24gOiB0aGlzLl9jb25maWcuZGV2aWF0aW9uIC8gc2NhbGVbMF07XG5cbiAgICBmb3IgKGNvbnN0IHZlY3RvciBvZiB2ZWN0b3JzKSB7XG4gICAgICBpZiAodmVjdG9yLmdldERpc3RhbmNlVmVjdG9yKGNvb3JkcykubGVuZ3RoIDw9IGRldmlhdGlvbiArIGV4dHJhRGV2aWF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEJvdW5kSW50ZXJmYWNlLmlzTmVhckVkZ2V9XG4gICAqL1xuICBwdWJsaWMgaXNOZWFyRWRnZShjb29yZHM6IFZlY3RvckFycmF5VHlwZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSwgZGV2aWF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaW5jbHVkZXMoY29vcmRzLCBzY2FsZSwgMCkgJiYgdGhpcy5pbmNsdWRlcyhjb29yZHMsIHNjYWxlLCBkZXZpYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS50b0FycmF5fVxuICAgKi9cbiAgcHVibGljIHRvQXJyYXkoKTogW1ZlY3RvckFycmF5VHlwZSwgVmVjdG9yQXJyYXlUeXBlXSB7XG4gICAgcmV0dXJuIFt0aGlzLl9jb25maWcucG9zaXRpb24sIHRoaXMuX2NvbmZpZy5zaXplXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQm91bmRJbnRlcmZhY2UudG9SZWN0Qm91bmR9XG4gICAqL1xuICBwdWJsaWMgdG9SZWN0Qm91bmQoKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ3VsYXJCb3VuZCh7XG4gICAgICBwb3NpdGlvbjogdGhpcy5fY29uZmlnLnBvc2l0aW9uLFxuICAgICAgc2l6ZTogdGhpcy5fY29uZmlnLnNpemUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEJvdW5kSW50ZXJmYWNlLnNwZWNpZnl9XG4gICAqL1xuICBwdWJsaWMgc3BlY2lmeSgpOiBCb3VuZEludGVyZmFjZSB7XG4gICAgLy8gbGluZSBkb2VzIG5vdCBuZWVkIGJvdW5kIHNjYWxpbmdcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQm91bmRJbnRlcmZhY2UsIFBvbHlnb25hbEJvdW5kQ29uZmlnIH0gZnJvbSAnLi4vLi4vdHlwZXMvYm91bmQnO1xuaW1wb3J0IHsgY3JlYXRlUG9seWdvblZlY3RvcnMsIHRvVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yJztcbmltcG9ydCB7IGdldE1heFBvc2l0aW9uLCBnZXRNaW5Qb3NpdGlvbiwgdHJhbnNsYXRlUG9zaXRpb25Db25maWcgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Jhc2UnO1xuaW1wb3J0IFJlY3Rhbmd1bGFyQm91bmQgZnJvbSAnLi9yZWN0YW5ndWxhci1ib3VuZCc7XG5cbi8qKlxuICogUG9seWdvbmFsQm91bmQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbmFsQm91bmQgaW1wbGVtZW50cyBCb3VuZEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBCb3VuZCBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBQb2x5Z29uYWxCb3VuZENvbmZpZztcblxuICAvKipcbiAgICogUmVjdGFuZ3VsYXJCb3VuZCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29uZmlnIC0gYm91bmQgY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWc6IFBvbHlnb25hbEJvdW5kQ29uZmlnKSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS5pbmNsdWRlc31cbiAgICovXG4gIHB1YmxpYyBpbmNsdWRlcyhjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHByZWNpc2lvbiA9IDA7XG4gICAgY29uc3QgeCA9IGNvb3Jkc1swXTtcbiAgICBjb25zdCB5ID0gY29vcmRzWzFdO1xuICAgIGxldCBpc0luc2lkZSA9IGZhbHNlO1xuXG4gICAgY29uc3QgcG9seWdvblZlY3RvcnMgPSBjcmVhdGVQb2x5Z29uVmVjdG9ycyh0aGlzLl9jb25maWcucG9pbnRzKTtcblxuICAgIGZvciAoY29uc3QgdmVjdG9yIG9mIHBvbHlnb25WZWN0b3JzKSB7XG4gICAgICBpZiAodmVjdG9yLmluY2x1ZGVzKGNvb3JkcywgcHJlY2lzaW9uKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgW3hqLCB5al0gPSB2ZWN0b3IucG9zaXRpb24udG9BcnJheSgpO1xuICAgICAgY29uc3QgW3hpLCB5aV0gPSB2ZWN0b3IudGFyZ2V0LnRvQXJyYXkoKTtcblxuICAgICAgY29uc3QgaXNJbnRlcnNlY3QgPSAoKHlpID4geSkgIT09ICh5aiA+IHkpKSAmJlxuICAgICAgICAoeCA8ICh4aiAtIHhpKSAqICh5IC0geWkpIC8gKHlqIC0geWkpICsgeGkpO1xuXG4gICAgICBpZiAoaXNJbnRlcnNlY3QpIHtcbiAgICAgICAgaXNJbnNpZGUgPSAhaXNJbnNpZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzSW5zaWRlO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS5pc05lYXJFZGdlfVxuICAgKi9cbiAgcHVibGljIGlzTmVhckVkZ2UoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIHNjYWxlOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmVjdG9ycyA9IGNyZWF0ZVBvbHlnb25WZWN0b3JzKHRoaXMuX2NvbmZpZy5wb2ludHMpO1xuXG4gICAgZm9yIChjb25zdCB2ZWN0b3Igb2YgdmVjdG9ycykge1xuICAgICAgaWYgKHZlY3Rvci5nZXREaXN0YW5jZVZlY3Rvcihjb29yZHMpLmxlbmd0aCA8PSBkZXZpYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQm91bmRJbnRlcmZhY2UudG9BcnJheX1cbiAgICovXG4gIHB1YmxpYyB0b0FycmF5KCk6IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0ge1xuICAgIHJldHVybiB0aGlzLnRvUmVjdEJvdW5kKCkudG9BcnJheSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS50b1JlY3RCb3VuZH1cbiAgICovXG4gIHB1YmxpYyB0b1JlY3RCb3VuZCgpOiBCb3VuZEludGVyZmFjZSB7XG4gICAgY29uc3QgbWluUG9zaXRpb24gPSBnZXRNaW5Qb3NpdGlvbih0aGlzLl9jb25maWcucG9pbnRzKTtcbiAgICBjb25zdCBtYXhQb3NpdGlvbiA9IGdldE1heFBvc2l0aW9uKHRoaXMuX2NvbmZpZy5wb2ludHMpO1xuXG4gICAgcmV0dXJuIG5ldyBSZWN0YW5ndWxhckJvdW5kKHtcbiAgICAgIHBvc2l0aW9uOiBtaW5Qb3NpdGlvbixcbiAgICAgIHNpemU6IHRvVmVjdG9yKG1heFBvc2l0aW9uKS5zdWIobWluUG9zaXRpb24pLnRvQXJyYXkoKSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQm91bmRJbnRlcmZhY2Uuc3BlY2lmeX1cbiAgICovXG4gIHB1YmxpYyBzcGVjaWZ5KHNjYWxlOiBWZWN0b3JBcnJheVR5cGUsIG9mZnNldDogVmVjdG9yQXJyYXlUeXBlKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIGNvbnN0IFtvbGRQb3NpdGlvbiwgb2xkU2l6ZV0gPSB0aGlzLnRvUmVjdEJvdW5kKCkudG9BcnJheSgpO1xuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2l6ZV0gPSB0cmFuc2xhdGVQb3NpdGlvbkNvbmZpZyhvbGRQb3NpdGlvbiwgb2xkU2l6ZSwgc2NhbGUsIG9mZnNldCk7XG4gICAgY29uc3QgbmV3U2NhbGU6IFZlY3RvckFycmF5VHlwZSA9IHRvVmVjdG9yKHNpemUpLmRpdkNvb3JkcyhvbGRTaXplKS50b0FycmF5KCk7XG4gICAgY29uc3QgbmV3UG9zaXRpb246IFZlY3RvckFycmF5VHlwZSA9IHRvVmVjdG9yKHBvc2l0aW9uKS5zdWIob2xkUG9zaXRpb24pLnRvQXJyYXkoKTtcblxuICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLl9jb25maWcucG9pbnRzKSB7XG4gICAgICB0aGlzLl9jb25maWcucG9pbnRzW2ldID0gdG9WZWN0b3IodGhpcy5fY29uZmlnLnBvaW50c1tpXSlcbiAgICAgICAgLm11bENvb3JkcyhuZXdTY2FsZSlcbiAgICAgICAgLmFkZChuZXdQb3NpdGlvbilcbiAgICAgICAgLnRvQXJyYXkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgdHJhbnNsYXRlUG9zaXRpb25Db25maWcgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Jhc2UnO1xuaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQm91bmRJbnRlcmZhY2UsIFJlY3Rhbmd1bGFyQm91bmRDb25maWcgfSBmcm9tICcuLi8uLi90eXBlcy9ib3VuZCc7XG5pbXBvcnQgeyBjcmVhdGVQb2x5Z29uVmVjdG9ycyB9IGZyb20gJy4uL3ZlY3Rvcic7XG5cbi8qKlxuICogUmVjdGFuZ3VsYXJCb3VuZCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5ndWxhckJvdW5kIGltcGxlbWVudHMgQm91bmRJbnRlcmZhY2Uge1xuICAvKipcbiAgICogQm91bmQgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUmVjdGFuZ3VsYXJCb3VuZENvbmZpZztcblxuICAvKipcbiAgICogUmVjdGFuZ3VsYXJCb3VuZCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29uZmlnIC0gYm91bmQgY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWc6IFJlY3Rhbmd1bGFyQm91bmRDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEJvdW5kSW50ZXJmYWNlLmluY2x1ZGVzfVxuICAgKi9cbiAgcHVibGljIGluY2x1ZGVzKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvb3Jkc1swXSA+PSB0aGlzLl9jb25maWcucG9zaXRpb25bMF1cbiAgICAgICYmIGNvb3Jkc1swXSA8PSB0aGlzLl9jb25maWcucG9zaXRpb25bMF0gKyB0aGlzLl9jb25maWcuc2l6ZVswXVxuICAgICAgJiYgY29vcmRzWzFdID49IHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXVxuICAgICAgJiYgY29vcmRzWzFdIDw9IHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXSArIHRoaXMuX2NvbmZpZy5zaXplWzFdO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS5pc05lYXJFZGdlfVxuICAgKi9cbiAgcHVibGljIGlzTmVhckVkZ2UoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIHNjYWxlOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmVjdG9ycyA9IGNyZWF0ZVBvbHlnb25WZWN0b3JzKFtcbiAgICAgIFt0aGlzLl9jb25maWcucG9zaXRpb25bMF0sIHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXV0sXG4gICAgICBbdGhpcy5fY29uZmlnLnBvc2l0aW9uWzBdICsgdGhpcy5fY29uZmlnLnNpemVbMF0sIHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXV0sXG4gICAgICBbdGhpcy5fY29uZmlnLnBvc2l0aW9uWzBdICsgdGhpcy5fY29uZmlnLnNpemVbMF0sIHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXSArIHRoaXMuX2NvbmZpZy5zaXplWzFdXSxcbiAgICAgIFt0aGlzLl9jb25maWcucG9zaXRpb25bMF0sIHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXSArIHRoaXMuX2NvbmZpZy5zaXplWzFdXSxcbiAgICBdKTtcblxuICAgIGZvciAoY29uc3QgdmVjdG9yIG9mIHZlY3RvcnMpIHtcbiAgICAgIGlmICh2ZWN0b3IuZ2V0RGlzdGFuY2VWZWN0b3IoY29vcmRzKS5sZW5ndGggPD0gZGV2aWF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEJvdW5kSW50ZXJmYWNlLnRvQXJyYXl9XG4gICAqL1xuICBwdWJsaWMgdG9BcnJheSgpOiBbVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JBcnJheVR5cGVdIHtcbiAgICByZXR1cm4gW3RoaXMuX2NvbmZpZy5wb3NpdGlvbiwgdGhpcy5fY29uZmlnLnNpemVdO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS50b1JlY3RCb3VuZH1cbiAgICovXG4gIHB1YmxpYyB0b1JlY3RCb3VuZCgpOiBCb3VuZEludGVyZmFjZSB7XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5ndWxhckJvdW5kKHtcbiAgICAgIHBvc2l0aW9uOiB0aGlzLl9jb25maWcucG9zaXRpb24sXG4gICAgICBzaXplOiB0aGlzLl9jb25maWcuc2l6ZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQm91bmRJbnRlcmZhY2Uuc3BlY2lmeX1cbiAgICovXG4gIHB1YmxpYyBzcGVjaWZ5KHNjYWxlOiBWZWN0b3JBcnJheVR5cGUsIG9mZnNldDogVmVjdG9yQXJyYXlUeXBlID0gWzAsIDBdKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2l6ZV0gPSB0cmFuc2xhdGVQb3NpdGlvbkNvbmZpZyh0aGlzLl9jb25maWcucG9zaXRpb24sIHRoaXMuX2NvbmZpZy5zaXplLCBzY2FsZSwgb2Zmc2V0KTtcblxuICAgIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuX2NvbmZpZy5zaXplID0gc2l6ZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUdyb3VwSW50ZXJmYWNlLFxuICBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBEcmF3YWJsZSBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZSc7XG5pbXBvcnQgRHJhd2FibGVTdG9yYWdlIGZyb20gJy4uL2RyYXdhYmxlL2RyYXdhYmxlLXN0b3JhZ2UnO1xuXG5pbnRlcmZhY2UgQ29uc3RydWN0b3JJbnRlcmZhY2Uge1xuICBpZDogRHJhd2FibGVJZFR5cGU7XG4gIGNvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2U7XG4gIGRhdGE/OiBMaW5rZWREYXRhVHlwZTtcbiAgbGlzdD86IERyYXdhYmxlSW50ZXJmYWNlW107XG59XG5cbi8qKlxuICogRHJhd2FibGUgZ3JvdXAgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2FibGVHcm91cCBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVHcm91cEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdhYmxlR3JvdXAnO1xuICAvKipcbiAgICogU3RvcmFnZSBvZiB0aGUgbGlzdCBvYmplY3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N0b3JhZ2U6IERyYXdhYmxlU3RvcmFnZUludGVyZmFjZTtcblxuICAvKipcbiAgICogRHJhd2FibGVHcm91cCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBncm91cCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gZXh0cmEgZGF0YVxuICAgKiBAcGFyYW0gbGlzdCAtIGxpc3Qgb2YgZ3JvdXBlZCBvYmplY3RzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgaWQsXG4gICAgY29uZmlnLFxuICAgIGRhdGEgPSB7fSxcbiAgICBsaXN0ID0gW10sXG4gIH06IENvbnN0cnVjdG9ySW50ZXJmYWNlKSB7XG4gICAgc3VwZXIoe1xuICAgICAgaWQsXG4gICAgICBjb25maWcsXG4gICAgICBkYXRhLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fc3RvcmFnZSA9IG5ldyBEcmF3YWJsZVN0b3JhZ2UodGhpcy5fcHJvY2Vzc0xpc3RUb0dyb3VwKGxpc3QpKTtcbiAgICB0aGlzLl9zdG9yYWdlLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRpbmdIYW5kbGVycyhleHRyYSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JhZ2UubGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5jb25maWcudmlzaWJsZSAmJiBpdGVtLmNvbmZpZy5kaXNwbGF5KSB7XG4gICAgICAgIGl0ZW0uZHJhdyhkcmF3ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kZXN0cnVjdH1cbiAgICovXG4gIHB1YmxpYyBkZXN0cnVjdCgpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICB0aGlzLl9zdG9yYWdlLmxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5vZmZWaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9wcm9jZXNzTGlzdFRvVW5ncm91cCh0aGlzLmxpc3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3QgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxpc3QoKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JhZ2UubGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb21lIGFjdGlvbnMgd2l0aCBsaXN0IGJlZm9yZSBncm91cGluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9wcm9jZXNzTGlzdFRvR3JvdXAobGlzdDogRHJhd2FibGVJbnRlcmZhY2VbXSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgYWN0aW9ucyB3aXRoIGxpc3QgYmVmb3JlIHVuZ3JvdXBpbmdcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc0xpc3RUb1VuZ3JvdXAobGlzdDogRHJhd2FibGVJbnRlcmZhY2VbXSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiBsaXN0O1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdhYmxlTGF5ZXJDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlTGF5ZXJJbnRlcmZhY2UsXG4gIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBEcmF3YWJsZUdyb3VwIGZyb20gJy4vZHJhd2FibGUtZ3JvdXAnO1xuaW1wb3J0IERyYXdhYmxlU3RvcmFnZSBmcm9tICcuL2RyYXdhYmxlLXN0b3JhZ2UnO1xuXG5pbnRlcmZhY2UgQ29uc3RydWN0b3JJbnRlcmZhY2Uge1xuICBpZDogRHJhd2FibGVJZFR5cGU7XG4gIGNvbmZpZzogRHJhd2FibGVMYXllckNvbmZpZ0ludGVyZmFjZTtcbiAgZGF0YT86IExpbmtlZERhdGFUeXBlO1xuICBsaXN0PzogRHJhd2FibGVJbnRlcmZhY2VbXTtcbn1cblxuLyoqXG4gKiBEcmF3YWJsZUxheWVyIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdhYmxlTGF5ZXIgZXh0ZW5kcyBEcmF3YWJsZUdyb3VwIGltcGxlbWVudHMgRHJhd2FibGVMYXllckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVMYXllckludGVyZmFjZS5pc0xheWVyfVxuICAgKi9cbiAgcHVibGljIGlzTGF5ZXI6IGJvb2xlYW4gPSB0cnVlO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBEcmF3YWJsZUxheWVyQ29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBEcmF3YWJsZUxheWVyIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIGdyb3VwIElEXG4gICAqIEBwYXJhbSBjb25maWcgLSBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBleHRyYSBkYXRhXG4gICAqIEBwYXJhbSBsaXN0IC0gbGlzdCBvZiBncm91cGVkIG9iamVjdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBpZCxcbiAgICBjb25maWcsXG4gICAgZGF0YSA9IHt9LFxuICAgIGxpc3QgPSBbXSxcbiAgfTogQ29uc3RydWN0b3JJbnRlcmZhY2UpIHtcbiAgICBzdXBlcih7XG4gICAgICBpZCxcbiAgICAgIGNvbmZpZyxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG5cbiAgICB0aGlzLl9zdG9yYWdlID0gbmV3IERyYXdhYmxlU3RvcmFnZSh0aGlzLl9wcm9jZXNzTGlzdFRvR3JvdXAobGlzdCkpO1xuICAgIHRoaXMuX3N0b3JhZ2Uub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAodGFyZ2V0LCBleHRyYSkgPT4ge1xuICAgICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGluZ0hhbmRsZXJzKGV4dHJhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBEcmF3YWJsZUxheWVyQ29uZmlnSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUxheWVySW50ZXJmYWNlLnN0b3JhZ2V9XG4gICAqL1xuICBwdWJsaWMgZ2V0IHN0b3JhZ2UoKTogRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmFnZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdhYmxlU3RvcmFnZUZpbHRlckNhbGxiYWNrVHlwZSxcbiAgRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSxcbiAgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxuICBQb3NpdGlvbmFsQ29udGV4dEludGVyZmFjZSxcbiAgRHJhd2FibGVMYXllckludGVyZmFjZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IE9ic2VydmVIZWxwZXIgZnJvbSAnLi4vLi4vaGVscGVycy9vYnNlcnZlLWhlbHBlcic7XG5pbXBvcnQgRHJhd2FibGVHcm91cCBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZS1ncm91cCc7XG5pbXBvcnQgeyBnZXRNYXhQb3NpdGlvbiwgZ2V0TWluUG9zaXRpb24gfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Jhc2UnO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGVHcm91cCBmcm9tICcuLi9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlLWdyb3VwJztcbmltcG9ydCB7IGlzTGF5ZXIsIGlzUG9zaXRpb25hbCB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdHlwZS1oZWxwZXJzJztcbmltcG9ydCBQb3NpdGlvbmFsQ29udGV4dCBmcm9tICcuL3Bvc2l0aW9uYWwtY29udGV4dCc7XG5pbXBvcnQgRHJhd2FibGVMYXllciBmcm9tICcuL2RyYXdhYmxlLWxheWVyJztcblxuLyoqXG4gKiBTdG9yYWdlIGZvciBkcmF3YWJsZSBvYmplY3RzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdhYmxlU3RvcmFnZSBpbXBsZW1lbnRzIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdhYmxlU3RvcmFnZSc7XG4gIC8qKlxuICAgKiBMaXN0IG9mIHN0b3JlZCBkcmF3YWJsZSBvYmplY3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xpc3Q6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcbiAgLyoqXG4gICAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBEcmF3YWJsZSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaXRlbXMgLSBiYXRjaCBsaXN0IHRvIGNhY2hlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpdGVtczogRHJhd2FibGVJbnRlcmZhY2VbXSkge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuYWRkQmF0Y2goaXRlbXMpO1xuICAgIHRoaXMuX3NvcnQoKTtcblxuICAgIHRoaXMub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAodGFyZ2V0LCBleHRyYSkgPT4ge1xuICAgICAgaWYgKGV4dHJhICE9PSBudWxsICYmIGV4dHJhLmhhc093blByb3BlcnR5KCd6SW5kZXhDaGFuZ2VkJykgJiYgZXh0cmEuekluZGV4Q2hhbmdlZCkge1xuICAgICAgICB0aGlzLl9zb3J0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVkIGRyYXdhYmxlIG9iamVjdHMgbGlzdCBnZXR0ZXJcbiAgICovXG4gIGdldCBsaXN0KCk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9saXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuY2FjaGV9XG4gICAqL1xuICBwdWJsaWMgYWRkKGl0ZW06IERyYXdhYmxlSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaXRlbS5vblZpZXdDaGFuZ2UoXG4gICAgICB0aGlzLl9zdWJzY3JpYmVyTmFtZSxcbiAgICAgICh0YXJnZXQsIGV4dHJhKSA9PiB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0aW5nSGFuZGxlcnMoZXh0cmEpLFxuICAgICk7XG4gICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xuICAgIHRoaXMuX3NvcnQoKTtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0aW5nSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmNhY2hlfVxuICAgKi9cbiAgcHVibGljIGFkZEJhdGNoKGl0ZW1zOiBEcmF3YWJsZUludGVyZmFjZVtdKTogdm9pZCB7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5vblZpZXdDaGFuZ2UoXG4gICAgICAgIHRoaXMuX3N1YnNjcmliZXJOYW1lLFxuICAgICAgICAodGFyZ2V0LCBleHRyYSkgPT4gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGluZ0hhbmRsZXJzKGV4dHJhKSxcbiAgICAgICk7XG4gICAgICB0aGlzLl9saXN0LnB1c2goaXRlbSk7XG4gICAgfSk7XG4gICAgdGhpcy5fc29ydCgpO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRpbmdIYW5kbGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgb2JqZWN0cyBmb3VuZCBieSBjb25maWcgZnJvbSBzdG9yYWdlXG4gICAqIEBwYXJhbSBjb25maWcgLSBmaWx0ZXIgY29uZmlnXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlKGNvbmZpZzogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRpbmdIYW5kbGVycygoKSA9PiB7XG4gICAgICB0aGlzLmZpbmQoY29uZmlnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZGVsZXRlQnlJZChpdGVtLmlkKSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFt0cnVlLCBudWxsXTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBvYmplY3QgYnkgSUQgZnJvbSBzdG9yYWdlXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKi9cbiAgcHVibGljIGRlbGV0ZUJ5SWQoaWQ6IERyYXdhYmxlSWRUeXBlKTogRHJhd2FibGVJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fbGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlkKTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IGRlbGV0ZWRJdGVtID0gdGhpcy5fbGlzdC5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgICAgZGVsZXRlZEl0ZW0ub2ZmVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSk7XG4gICAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0aW5nSGFuZGxlcnMoKTtcbiAgICAgIHJldHVybiBkZWxldGVkSXRlbTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIGN1c3RvbWl6ZSBleGNlcHRpb25cbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBmaW5kIG9iamVjdCB3aXRoIGlkICcke2lkfSdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmNsZWFyfVxuICAgKi9cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2xpc3QubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0aW5nSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmR9XG4gICAqL1xuICBwdWJsaWMgZmluZChjb25maWc6IERyYXdhYmxlU3RvcmFnZUZpbHRlckNvbmZpZ0ludGVyZmFjZSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9maW5kKChpdGVtKSA9PiB7XG4gICAgICBpZiAoY29uZmlnLmlkc09ubHkgJiYgY29uZmlnLmlkc09ubHkuaW5kZXhPZihpdGVtLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5pZHNFeGNsdWRlICYmIGNvbmZpZy5pZHNFeGNsdWRlLmluZGV4T2YoaXRlbS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy50eXBlc09ubHkgJiYgY29uZmlnLnR5cGVzT25seS5pbmRleE9mKGl0ZW0udHlwZSkgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcudHlwZXNFeGNsdWRlICYmIGNvbmZpZy50eXBlc0V4Y2x1ZGUuaW5kZXhPZihpdGVtLnR5cGUpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhKGNvbmZpZy5leHRyYUZpbHRlciAmJiAhY29uZmlnLmV4dHJhRmlsdGVyKGl0ZW0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmRCeUlkfVxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkKGlkOiBEcmF3YWJsZUlkVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gdGhpcy5fZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUuaWQgPT09IGlkKTtcbiAgICBpZiAoZm91bmRJdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmb3VuZEl0ZW1zWzBdO1xuICAgIH1cbiAgICAvLyBUT0RPIGN1c3RvbWl6ZSBleGNlcHRpb25cbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBmaW5kIG9iamVjdCB3aXRoIGlkICcke2lkfSdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmRCeVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIGZpbmRCeVBvc2l0aW9uKFxuICAgIGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBzY2FsZTogVmVjdG9yQXJyYXlUeXBlLCBpbnRlcmFjdGl2ZU9ubHk6IGJvb2xlYW4sXG4gICk6IFBvc2l0aW9uYWxDb250ZXh0SW50ZXJmYWNlIHtcbiAgICBmb3IgKGxldCBpPXRoaXMuX2xpc3QubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgICAgY29uc3QgaXRlbTogRHJhd2FibGVJbnRlcmZhY2UgPSB0aGlzLl9saXN0W2ldO1xuXG4gICAgICBpZiAoaW50ZXJhY3RpdmVPbmx5ICYmICFpdGVtLmlzSW50ZXJhY3RpdmUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0xheWVyKGl0ZW0pKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSAoaXRlbSBhcyBEcmF3YWJsZUxheWVyKS5zdG9yYWdlLmZpbmRCeVBvc2l0aW9uKGNvb3Jkcywgc2NhbGUsIGludGVyYWN0aXZlT25seSk7XG4gICAgICAgIGlmICghY29udGV4dC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc1Bvc2l0aW9uYWwoaXRlbSkgJiYgKGl0ZW0gYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlKS5ib3VuZEluY2x1ZGVzKGNvb3Jkcywgc2NhbGUpKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAoaXRlbSBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGVsZW1lbnQuZ2V0UmVsYXRpdmVQb3NpdGlvbihjb29yZHMpO1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxDb250ZXh0KGVsZW1lbnQsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxDb250ZXh0KG51bGwsIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZmluZEJ5TmVhckVkZ2VQb3NpdGlvbn1cbiAgICovXG4gIGZpbmRCeU5lYXJFZGdlUG9zaXRpb24oXG4gICAgY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsXG4gICAgc2NhbGU6IFZlY3RvckFycmF5VHlwZSxcbiAgICBpbnRlcmFjdGl2ZU9ubHk6IGJvb2xlYW4sXG4gICAgZGV2aWF0aW9uOiBudW1iZXIsXG4gICk6IFBvc2l0aW9uYWxDb250ZXh0SW50ZXJmYWNlIHtcbiAgICBjb25zdCBwb3NpdGlvbkNvbnRleHQgPSB0aGlzLmZpbmRCeVBvc2l0aW9uKGNvb3Jkcywgc2NhbGUsIGludGVyYWN0aXZlT25seSk7XG5cbiAgICBmb3IgKGxldCBpPXRoaXMuX2xpc3QubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2xpc3RbaV07XG5cbiAgICAgIGlmIChpbnRlcmFjdGl2ZU9ubHkgJiYgIWl0ZW0uaXNJbnRlcmFjdGl2ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTGF5ZXIoaXRlbSkpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IChpdGVtIGFzIERyYXdhYmxlTGF5ZXIpLnN0b3JhZ2UuZmluZEJ5TmVhckVkZ2VQb3NpdGlvbihcbiAgICAgICAgICBjb29yZHMsIHNjYWxlLCBpbnRlcmFjdGl2ZU9ubHksIGRldmlhdGlvbixcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFjb250ZXh0LmlzRW1wdHkoKVxuICAgICAgICAgICYmIChwb3NpdGlvbkNvbnRleHQuaXNFbXB0eSgpIHx8IHBvc2l0aW9uQ29udGV4dC5lbGVtZW50ID09PSBjb250ZXh0LmVsZW1lbnQpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBpc1Bvc2l0aW9uYWwoaXRlbSlcbiAgICAgICAgJiYgKGl0ZW0gYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlKS5pc05lYXJCb3VuZEVkZ2UoY29vcmRzLCBzY2FsZSwgZGV2aWF0aW9uKVxuICAgICAgICAmJiAoXG4gICAgICAgICAgcG9zaXRpb25Db250ZXh0LmlzRW1wdHkoKVxuICAgICAgICAgIHx8IHBvc2l0aW9uQ29udGV4dC5lbGVtZW50ID09PSBpdGVtXG4gICAgICAgICAgfHwgaXRlbS5jb25maWcuekluZGV4ID49IHBvc2l0aW9uQ29udGV4dC5lbGVtZW50LmNvbmZpZy56SW5kZXhcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAoaXRlbSBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGVsZW1lbnQuZ2V0UmVsYXRpdmVQb3NpdGlvbihjb29yZHMpO1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxDb250ZXh0KGVsZW1lbnQsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxDb250ZXh0KG51bGwsIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZ3JvdXB9XG4gICAqL1xuICBwdWJsaWMgZ3JvdXAoaWRzOiBEcmF3YWJsZUlkVHlwZVtdKTogRHJhd2FibGVHcm91cCB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuZGVsZXRlKHsgaWRzT25seTogaWRzIH0pIGFzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdO1xuICAgIGNvbnN0IG1pblBvc2l0aW9uID0gZ2V0TWluUG9zaXRpb24obGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0uY29uZmlnLnBvc2l0aW9uKSk7XG4gICAgY29uc3QgbWF4UG9zaXRpb24gPSBnZXRNYXhQb3NpdGlvbihsaXN0Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZVZlY3RvcihpdGVtLmNvbmZpZy5wb3NpdGlvbilcbiAgICAgICAgLmFkZChjcmVhdGVWZWN0b3IoaXRlbS5jb25maWcuc2l6ZSkpXG4gICAgICAgIC50b0FycmF5KCk7XG4gICAgfSkpO1xuICAgIGNvbnN0IGdyb3VwU2l6ZSA9IGNyZWF0ZVZlY3RvcihtYXhQb3NpdGlvbikuc3ViKGNyZWF0ZVZlY3RvcihtaW5Qb3NpdGlvbikpLnRvQXJyYXkoKTtcbiAgICBjb25zdCBncm91cFpJbmRleCA9IE1hdGgubWF4KC4uLmxpc3QubWFwKChpdGVtKSA9PiBpdGVtLmNvbmZpZy56SW5kZXgpKSsxO1xuXG4gICAgY29uc3QgY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UgPSB7XG4gICAgICBwb3NpdGlvbjogbWluUG9zaXRpb24sXG4gICAgICBzaXplOiBncm91cFNpemUsXG4gICAgICB6SW5kZXg6IGdyb3VwWkluZGV4LFxuICAgICAgc2NhbGFibGU6IHRydWUsXG4gICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgIH07XG5cbiAgICBjb25zdCBpZCA9ICdncm91cC0nKyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCkrJy0nK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDApO1xuICAgIGNvbnN0IGdyb3VwID0gbmV3IFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwKHtcbiAgICAgIGlkLFxuICAgICAgY29uZmlnLFxuICAgICAgbGlzdCxcbiAgICB9KTtcbiAgICB0aGlzLmFkZChncm91cCk7XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS51bmdyb3VwfVxuICAgKi9cbiAgcHVibGljIHVuZ3JvdXAoZ3JvdXBJZDogRHJhd2FibGVJZFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cDogRHJhd2FibGVHcm91cCA9IHRoaXMuZGVsZXRlQnlJZChncm91cElkKSBhcyBEcmF3YWJsZUdyb3VwO1xuICAgIHRoaXMuYWRkQmF0Y2goZ3JvdXAuZGVzdHJ1Y3QoKSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5hZGRMYXllcn1cbiAgICovXG4gIHB1YmxpYyBhZGRMYXllcihpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGxpc3Q6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXSk6IERyYXdhYmxlTGF5ZXJJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGxheWVyID0gbmV3IERyYXdhYmxlTGF5ZXIoe1xuICAgICAgaWQsXG4gICAgICBsaXN0LFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgICB6SW5kZXg6IHRoaXMuX2dldE1heFpJbmRleCgpKzEsXG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQobGF5ZXIpO1xuXG4gICAgcmV0dXJuIGxheWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZ2V0TGF5ZXJ9XG4gICAqL1xuICBwdWJsaWMgZ2V0TGF5ZXIoaWQ6IHN0cmluZyk6IERyYXdhYmxlTGF5ZXJJbnRlcmZhY2Uge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjYW5kaWRhdGUgPSB0aGlzLmZpbmRCeUlkKGlkKTtcblxuICAgICAgaWYgKCFpc0xheWVyKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgLy8gVE9ETyBjdXN0b21pemUgZXhjZXB0aW9uXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKHRoaXMuZmluZEJ5SWQoaWQpIGFzIERyYXdhYmxlTGF5ZXJJbnRlcmZhY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGZpbmQgbGF5ZXIgd2l0aCBpZCAnJHtpZH0nYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZ2V0TGF5ZXJzfVxuICAgKi9cbiAgcHVibGljIGdldExheWVycygpOiBEcmF3YWJsZUxheWVySW50ZXJmYWNlW10ge1xuICAgIHJldHVybiAodGhpcy5fZmluZCgoaXRlbSkgPT4gaXNMYXllcihpdGVtKSkgYXMgRHJhd2FibGVMYXllckludGVyZmFjZVtdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLm9uVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvblZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZywgaGFuZGxlcjogVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub25DaGFuZ2Uoc3Vic2NyaWJlck5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2Uub2ZmVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvZmZWaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9mZkNoYW5nZShzdWJzY3JpYmVyTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWF4IHpJbmRleCBvZiB0aGUgZmlyc3QgZGVwdGggbGV2ZWwgaXRlbXNcbiAgICovXG4gIHByb3RlY3RlZCBfZ2V0TWF4WkluZGV4KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX2xpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fbGlzdFt0aGlzLl9saXN0Lmxlbmd0aCAtIDFdLmNvbmZpZy56SW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBvYmplY3RzIGluIHN0b3JhZ2UgYnkgZmlsdGVyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBmaWx0ZXIgLSBmaWx0ZXIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCBfZmluZChmaWx0ZXI6IERyYXdhYmxlU3RvcmFnZUZpbHRlckNhbGxiYWNrVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIGNvbnN0IHJlc3VsdDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuXG4gICAgdGhpcy5fbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoZmlsdGVyKGl0ZW0pKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgc3RvcmVkIG9iamVjdHMgYnkgei1pbmRleFxuICAgKi9cbiAgcHJvdGVjdGVkIF9zb3J0KCk6IHZvaWQge1xuICAgIC8vIFRPRE8g0YHQu9C10LTQuNGC0YxcbiAgICAvLyBjb25zb2xlLmxvZygnc29ydCcpO1xuICAgIHRoaXMuX2xpc3Quc29ydCgobGhzLCByaHMpID0+IGxocy5jb25maWcuekluZGV4IC0gcmhzLmNvbmZpZy56SW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tICcuLi8uLi9oZWxwZXJzL29ic2VydmUtaGVscGVyJztcbmltcG9ydCB7IGFyZUFycmF5c0VxdWFsIH0gZnJvbSAnLi4vLi4vaGVscGVycy9iYXNlJztcblxuaW50ZXJmYWNlIENvbnN0cnVjdG9ySW50ZXJmYWNlIHtcbiAgaWQ6IERyYXdhYmxlSWRUeXBlO1xuICBjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuICBkYXRhPzogTGlua2VkRGF0YVR5cGU7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIGRyYXdhYmxlIG9iamVjdHNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgSURcbiAgICovXG4gIHByb3RlY3RlZCBfaWQ6IERyYXdhYmxlSWRUeXBlO1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZTtcbiAgLyoqXG4gICAqIEV4dHJhIGxpbmtlZCBkYXRhXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RhdGE6IExpbmtlZERhdGFUeXBlO1xuICAvKipcbiAgICogT2JzZXJ2ZSBoZWxwZXJcbiAgICovXG4gIHByb3RlY3RlZCBfb2JzZXJ2ZUhlbHBlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZTtcblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIElEIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBpZCgpOiBEcmF3YWJsZUlkVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgLyoqXG4gICAqIFR5cGUgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIHNldHRlclxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICovXG4gIHB1YmxpYyBzZXQgY29uZmlnKGNvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2UpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwoT2JqZWN0LmVudHJpZXMoY29uZmlnKSwgT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnKSk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRpbmdIYW5kbGVycygoKSA9PiB7XG4gICAgICBjb25zdCBpc1pJbmRleENoYW5nZWQgPSBjb25maWcuekluZGV4ICE9PSB0aGlzLl9jb25maWcuekluZGV4O1xuXG4gICAgICBPYmplY3QuZW50cmllcyhjb25maWcpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAodGhpcy5fY29uZmlnW2tleSBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gYXMgdW5rbm93bikgPSB2YWx1ZSBhcyB1bmtub3duO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBbaXNDaGFuZ2VkLCB7IHpJbmRleENoYW5nZWQ6IGlzWkluZGV4Q2hhbmdlZCB9XTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rZWQgZGF0YSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBMaW5rZWREYXRhVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICAvKipcbiAgICogaXNJbnRlcmFjdGl2ZSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgaXNJbnRlcmFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLmludGVyYWN0aXZlICYmIHRoaXMuX2NvbmZpZy5kaXNwbGF5O1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5vblZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25WaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9uQ2hhbmdlKHN1YnNjcmliZXJOYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uub2ZmVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvZmZWaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9mZkNoYW5nZShzdWJzY3JpYmVyTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogRHJhd2FibGUgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioe1xuICAgIGlkLFxuICAgIGNvbmZpZyxcbiAgICBkYXRhID0ge30sXG4gIH06IENvbnN0cnVjdG9ySW50ZXJmYWNlKSB7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyID0gbmV3IE9ic2VydmVIZWxwZXIoKTtcbiAgICB0aGlzLl9jb25maWcgPSBuZXcgUHJveHkoY29uZmlnLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlXSAhPT0gdmFsdWU7XG4gICAgICAgICh0YXJnZXRbaW5kZXggYXMga2V5b2YgRHJhd2FibGVDb25maWdJbnRlcmZhY2VdIGFzIHVua25vd24pID0gdmFsdWUgYXMgdW5rbm93bjtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRpbmdIYW5kbGVycyh7XG4gICAgICAgICAgekluZGV4Q2hhbmdlZDogaW5kZXggPT09ICd6SW5kZXgnLFxuICAgICAgICB9KSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgUHJveHkoZGF0YSwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBMaW5rZWREYXRhVHlwZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBMaW5rZWREYXRhVHlwZV0gIT09IHZhbHVlO1xuICAgICAgICB0YXJnZXRbaW5kZXggYXMga2V5b2YgTGlua2VkRGF0YVR5cGVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0aW5nSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQb3NpdGlvbmFsQ29udGV4dEludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxuICBWZWN0b3JBcnJheVR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzJztcblxuLyoqXG4gKiBQb3NpdGlvbmFsQ29udGV4dCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbmFsQ29udGV4dCBpbXBsZW1lbnRzIFBvc2l0aW9uYWxDb250ZXh0SW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIEVsZW1lbnQgaW4gY29udGV4dFxuICAgKi9cbiAgcHVibGljIGVsZW1lbnQ6IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB8IG51bGwgPSBudWxsO1xuICAvKipcbiAgICogUmVsYXRpdmUgZXZlbnQgcG9zaXRpb24ncyBjb29yZHNcbiAgICovXG4gIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yQXJyYXlUeXBlIHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uYWxDb250ZXh0IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBlbGVtZW50IC0gZWxlbWVudCBpbiBjb250ZXh0XG4gICAqIEBwYXJhbSBwb3NpdGlvbiAtIHJlbGF0aXZlIGNvbnRleHQgcG9zaXRpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB8IG51bGwsIHBvc2l0aW9uOiBWZWN0b3JBcnJheVR5cGUgfCBudWxsKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGNvbnRleHQgaXMgZW1wdHlcbiAgICovXG4gIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQgPT09IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVHcm91cEludGVyZmFjZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IERyYXdhYmxlR3JvdXAgZnJvbSAnLi4vZHJhd2FibGUvZHJhd2FibGUtZ3JvdXAnO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yLCB0b1ZlY3RvciB9IGZyb20gJy4uL3ZlY3Rvcic7XG5pbXBvcnQgeyBCb3VuZEludGVyZmFjZSB9IGZyb20gJy4uLy4uL3R5cGVzL2JvdW5kJztcbmltcG9ydCBSZWN0YW5ndWxhckJvdW5kIGZyb20gJy4uL2JvdW5kcy9yZWN0YW5ndWxhci1ib3VuZCc7XG5pbXBvcnQgeyB0cmFuc3Bvc2VDb29yZHNCYWNrd2FyZCB9IGZyb20gJy4uL3ZlY3Rvci9oZWxwZXJzJztcbmltcG9ydCB7IGlzUG9zaXRpb25hbCB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdHlwZS1oZWxwZXJzJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGUgZnJvbSAnLi9wb3NpdGlvbmFsLWRyYXdhYmxlJztcbmltcG9ydCB7IHRyYW5zbGF0ZVBvc2l0aW9uQ29uZmlnIH0gZnJvbSAnLi4vLi4vaGVscGVycy9iYXNlJztcblxuaW50ZXJmYWNlIENvbnN0cnVjdG9ySW50ZXJmYWNlIHtcbiAgaWQ6IERyYXdhYmxlSWRUeXBlO1xuICBjb25maWc6IFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZTtcbiAgZGF0YT86IExpbmtlZERhdGFUeXBlO1xuICBsaXN0PzogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW107XG59XG5cbi8qKlxuICogUG9zaXRpb25hbCBkcmF3YWJsZSBncm91cCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbmFsRHJhd2FibGVHcm91cCBleHRlbmRzIERyYXdhYmxlR3JvdXAgaW1wbGVtZW50cyBQb3NpdGlvbmFsRHJhd2FibGVHcm91cEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgYmVsb25naW5nIGZsYWdcbiAgICovXG4gIHB1YmxpYyBpc1Bvc2l0aW9uYWw6IGJvb2xlYW4gPSB0cnVlO1xuICAvKipcbiAgICogTmFtZSBvZiBjbGFzcyB0byB1c2UgYXMgc3Vic2NyaWJlciBuYW1lIGluIG9ic2VydmFibGUgbG9naWNcbiAgICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlck5hbWU6IHN0cmluZyA9ICdQb3NpdGlvbmFsRHJhd2FibGVHcm91cCc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogRHJhd2FibGVHcm91cCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBncm91cCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gZXh0cmEgZGF0YVxuICAgKiBAcGFyYW0gbGlzdCAtIGxpc3Qgb2YgZ3JvdXBlZCBvYmplY3RzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7XG4gICAgaWQsXG4gICAgY29uZmlnLFxuICAgIGRhdGEgPSB7fSxcbiAgICBsaXN0ID0gW10sXG4gIH06IENvbnN0cnVjdG9ySW50ZXJmYWNlKSB7XG4gICAgc3VwZXIoe1xuICAgICAgaWQsXG4gICAgICBjb25maWcsXG4gICAgICBkYXRhLFxuICAgICAgbGlzdCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuc2F2ZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LnRyYW5zbGF0ZSguLi50aGlzLmNvbmZpZy5wb3NpdGlvbik7XG4gICAgc3VwZXIuZHJhdyhkcmF3ZXIpO1xuICAgIGRyYXdlci5jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uuc2V0UG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgc2V0UG9zaXRpb24oY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWcucG9zaXRpb24gPSBjb29yZHM7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm1vdmVQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBtb3ZlUG9zaXRpb24ob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKFxuICAgICAgY3JlYXRlVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbilcbiAgICAgICAgLmFkZChjcmVhdGVWZWN0b3Iob2Zmc2V0KSlcbiAgICAgICAgLnRvQXJyYXkoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5nZXRSZWxhdGl2ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIGdldFJlbGF0aXZlUG9zaXRpb24ocG9pbnQ6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVZlY3Rvcihwb2ludClcbiAgICAgIC5zdWIoY3JlYXRlVmVjdG9yKHRoaXMuY29uZmlnLnBvc2l0aW9uKSlcbiAgICAgIC50b0FycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmJvdW5kSW5jbHVkZXN9XG4gICAqL1xuICBwdWJsaWMgYm91bmRJbmNsdWRlcyhjb29yZHM6IFZlY3RvckFycmF5VHlwZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5saXN0KSB7XG4gICAgICBpZiAoXG4gICAgICAgIGlzUG9zaXRpb25hbChjaGlsZClcbiAgICAgICAgJiYgKGNoaWxkIGFzIFBvc2l0aW9uYWxEcmF3YWJsZSkuYm91bmRJbmNsdWRlcyhcbiAgICAgICAgICB0cmFuc3Bvc2VDb29yZHNCYWNrd2FyZChjb29yZHMsIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiksIHNjYWxlLFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5pc05lYXJCb3VuZEVkZ2V9XG4gICAqL1xuICBpc05lYXJCb3VuZEVkZ2UoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIHNjYWxlOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYm91bmQuaXNOZWFyRWRnZShcbiAgICAgIHRyYW5zcG9zZUNvb3Jkc0JhY2t3YXJkKGNvb3JkcywgdGhpcy5fY29uZmlnLnBvc2l0aW9uKSxcbiAgICAgIHNjYWxlLFxuICAgICAgZGV2aWF0aW9uLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgbGlzdCgpOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JhZ2UubGlzdCBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBib3VuZCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgYm91bmQoKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ3VsYXJCb3VuZCh7XG4gICAgICBwb3NpdGlvbjogWzAsIDBdLFxuICAgICAgc2l6ZTogdGhpcy5fY29uZmlnLnNpemUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmdldFNjYWxlZEJvdW5kfVxuICAgKi9cbiAgcHVibGljIGdldFNjYWxlZEJvdW5kKHNjYWxlOiBWZWN0b3JBcnJheVR5cGUpOiBCb3VuZEludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zY2FsYWJsZVxuICAgICAgPyB0aGlzLmJvdW5kLnNwZWNpZnkoWzEsIDFdLCBbMCwgMF0pXG4gICAgICA6IHRoaXMuYm91bmQuc3BlY2lmeSh0b1ZlY3RvcihzY2FsZSkucmV2ZXJzZSgpLnRvQXJyYXkoKSwgWzAuNSwgMC41XSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLnRyYW5zbGF0ZVBvc2l0aW9uQ29uZmlnfVxuICAgKi9cbiAgcHVibGljIHRyYW5zbGF0ZVBvc2l0aW9uQ29uZmlnKHNjYWxlOiBWZWN0b3JBcnJheVR5cGUpOiBbVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JBcnJheVR5cGVdIHtcbiAgICByZXR1cm4gdHJhbnNsYXRlUG9zaXRpb25Db25maWcodGhpcy5fY29uZmlnLnBvc2l0aW9uLCB0aGlzLl9jb25maWcuc2l6ZSwgc2NhbGUsIFswLjUsIDAuNV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgYWN0aW9ucyB3aXRoIGxpc3QgYmVmb3JlIGdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NMaXN0VG9Hcm91cChsaXN0OiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSk6IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ubW92ZVBvc2l0aW9uKFxuICAgICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKS5pbnZlcnNlKCkudG9BcnJheSgpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb21lIGFjdGlvbnMgd2l0aCBsaXN0IGJlZm9yZSB1bmdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NMaXN0VG9Vbmdyb3VwKGxpc3Q6IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdKTogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5tb3ZlUG9zaXRpb24odGhpcy5fY29uZmlnLnBvc2l0aW9uKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBsaXN0O1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgVmVjdG9yQXJyYXlUeXBlLCBEcmF3YWJsZUlkVHlwZSwgTGlua2VkRGF0YVR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciwgdG9WZWN0b3IgfSBmcm9tICcuLi92ZWN0b3InO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gJy4uL2RyYXdhYmxlL2RyYXdhYmxlJztcbmltcG9ydCB7IEJvdW5kSW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vdHlwZXMvYm91bmQnO1xuaW1wb3J0IFJlY3Rhbmd1bGFyQm91bmQgZnJvbSAnLi4vYm91bmRzL3JlY3Rhbmd1bGFyLWJvdW5kJztcbmltcG9ydCB7IHRyYW5zcG9zZUNvb3Jkc0JhY2t3YXJkIH0gZnJvbSAnLi4vdmVjdG9yL2hlbHBlcnMnO1xuaW1wb3J0IHsgdHJhbnNsYXRlUG9zaXRpb25Db25maWcgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Jhc2UnO1xuXG5pbnRlcmZhY2UgQ29uc3RydWN0b3JJbnRlcmZhY2Uge1xuICBpZDogRHJhd2FibGVJZFR5cGU7XG4gIGNvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuICBkYXRhPzogTGlua2VkRGF0YVR5cGU7XG59XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIGRyYXdhYmxlIHBvc2l0aW9uYWwgb2JqZWN0c1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBQb3NpdGlvbmFsRHJhd2FibGUgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgYmVsb25naW5nIGZsYWdcbiAgICovXG4gIHB1YmxpYyBpc1Bvc2l0aW9uYWw6IGJvb2xlYW4gPSB0cnVlO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5zZXRQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBzZXRQb3NpdGlvbihjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9IGNvb3JkcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UubW92ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIG1vdmVQb3NpdGlvbihvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oXG4gICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKVxuICAgICAgICAuYWRkKGNyZWF0ZVZlY3RvcihvZmZzZXQpKVxuICAgICAgICAudG9BcnJheSgpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmdldFJlbGF0aXZlUG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgZ2V0UmVsYXRpdmVQb3NpdGlvbihwb2ludDogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gY3JlYXRlVmVjdG9yKHBvaW50KVxuICAgICAgLnN1YihjcmVhdGVWZWN0b3IodGhpcy5jb25maWcucG9zaXRpb24pKVxuICAgICAgLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuYm91bmRJbmNsdWRlc31cbiAgICovXG4gIHB1YmxpYyBib3VuZEluY2x1ZGVzKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBzY2FsZTogVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2NhbGVkQm91bmQoc2NhbGUpLmluY2x1ZGVzKFxuICAgICAgdHJhbnNwb3NlQ29vcmRzQmFja3dhcmQoY29vcmRzLCB0aGlzLl9jb25maWcucG9zaXRpb24pLFxuICAgICAgc2NhbGUsXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuaXNOZWFyQm91bmRFZGdlfVxuICAgKi9cbiAgcHVibGljIGlzTmVhckJvdW5kRWRnZShjb29yZHM6IFZlY3RvckFycmF5VHlwZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSwgZGV2aWF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTY2FsZWRCb3VuZChzY2FsZSkuaXNOZWFyRWRnZShcbiAgICAgIHRyYW5zcG9zZUNvb3Jkc0JhY2t3YXJkKGNvb3JkcywgdGhpcy5fY29uZmlnLnBvc2l0aW9uKSxcbiAgICAgIHNjYWxlLFxuICAgICAgZGV2aWF0aW9uLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmdldFNjYWxlZEJvdW5kfVxuICAgKi9cbiAgcHVibGljIGdldFNjYWxlZEJvdW5kKHNjYWxlOiBWZWN0b3JBcnJheVR5cGUpOiBCb3VuZEludGVyZmFjZSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fY29uZmlnLm9mZnNldDtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNjYWxhYmxlXG4gICAgICA/IHRoaXMuYm91bmQuc3BlY2lmeShbMSwgMV0sIG9mZnNldCA/PyBbMCwgMF0pXG4gICAgICA6IHRoaXMuYm91bmQuc3BlY2lmeSh0b1ZlY3RvcihzY2FsZSkucmV2ZXJzZSgpLnRvQXJyYXkoKSwgb2Zmc2V0ID8/IFswLjUsIDAuNV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS50cmFuc2xhdGVQb3NpdGlvbkNvbmZpZ31cbiAgICovXG4gIHB1YmxpYyB0cmFuc2xhdGVQb3NpdGlvbkNvbmZpZyhzY2FsZTogVmVjdG9yQXJyYXlUeXBlKTogW1ZlY3RvckFycmF5VHlwZSwgVmVjdG9yQXJyYXlUeXBlXSB7XG4gICAgLy8gVE9ETyB1c2Ugd2l0aCBzY2FsYWJsZSBhbmQgdW5zY2FsYWJsZVxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX2NvbmZpZy5vZmZzZXQ7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zY2FsYWJsZVxuICAgICAgPyB0cmFuc2xhdGVQb3NpdGlvbkNvbmZpZyh0aGlzLl9jb25maWcucG9zaXRpb24sIHRoaXMuX2NvbmZpZy5zaXplLCBbMSwgMV0sIG9mZnNldCA/PyBbMCwgMF0pXG4gICAgICA6IHRyYW5zbGF0ZVBvc2l0aW9uQ29uZmlnKHRoaXMuX2NvbmZpZy5wb3NpdGlvbiwgdGhpcy5fY29uZmlnLnNpemUsIHNjYWxlLCBvZmZzZXQgPz8gWzAuNSwgMC41XSk7XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogYm91bmQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJvdW5kKCk6IEJvdW5kSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gbmV3IFJlY3Rhbmd1bGFyQm91bmQoe1xuICAgICAgcG9zaXRpb246IFswLCAwXSxcbiAgICAgIHNpemU6IHRoaXMuX2NvbmZpZy5zaXplLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uYWxEcmF3YWJsZSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBncm91cCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gZXh0cmEgZGF0YVxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHtcbiAgICBpZCxcbiAgICBjb25maWcsXG4gICAgZGF0YSA9IHt9LFxuICB9OiBDb25zdHJ1Y3RvckludGVyZmFjZSkge1xuICAgIHN1cGVyKHtcbiAgICAgIGlkLFxuICAgICAgY29uZmlnLFxuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi4vdmVjdG9yL3R5cGVzJztcbmltcG9ydCB7IENvb3Jkc0NvbGxlY3Rpb25GaWx0ZXJJbnRlcmZhY2UsIENvb3Jkc0ZpbHRlckNvbmZpZ0ludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZCB9IGZyb20gJy4uL3ZlY3Rvci9oZWxwZXJzJztcblxuLyoqXG4gKiBGaWx0ZXIgZm9yIGJhY2t3YXJkIHRyYW5zcG9zaW5nIG9mIHRoZSBwb2ludHMgY29sbGVjdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb29yZHNDb2xsZWN0aW9uRm9yd2FyZEZpbHRlciBpbXBsZW1lbnRzIENvb3Jkc0NvbGxlY3Rpb25GaWx0ZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIENvb3Jkc0NvbGxlY3Rpb25GaWx0ZXJJbnRlcmZhY2UucHJvY2Vzc31cbiAgICovXG4gIHByb2Nlc3MoXG4gICAgZGF0YTogVmVjdG9yQXJyYXlUeXBlW10sXG4gICAgY29uZmlnOiBDb29yZHNGaWx0ZXJDb25maWdJbnRlcmZhY2UsXG4gICk6IFZlY3RvckFycmF5VHlwZVtdIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGZvciAoY29uc3QgY29vcmRzIG9mIGRhdGEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQoY29vcmRzLCBjb25maWcub2Zmc2V0LCBjb25maWcuc2NhbGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb29yZHNGaWx0ZXJDb25maWdJbnRlcmZhY2UsIENvb3Jkc0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi4vdmVjdG9yL3R5cGVzJztcblxuLyoqXG4gKiBGaWx0ZXIgY29vcmRzIHVzaW5nIGdyaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29vcmRzR3JpZEZpbHRlciBpbXBsZW1lbnRzIENvb3Jkc0ZpbHRlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQ29vcmRzRmlsdGVySW50ZXJmYWNlLnByb2Nlc3N9XG4gICAqL1xuICBwdWJsaWMgcHJvY2VzcyhkYXRhOiBWZWN0b3JBcnJheVR5cGUsIGNvbmZpZzogQ29vcmRzRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICBjb25zdCBbeCwgeV0gPSBkYXRhO1xuICAgIGNvbnN0IHNjYWxlID0gY29uZmlnLnNjYWxlWzBdO1xuXG4gICAgbGV0IHN0ZXAgPSBjb25maWcuZ3JpZFN0ZXA7XG5cbiAgICBpZiAoc2NhbGUgPCAxKSB7XG4gICAgICBzdGVwICo9IDIgKiogTWF0aC5yb3VuZChNYXRoLmxvZzIoMSAvIHNjYWxlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ZXAgLz0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMihzY2FsZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBbeC14JXN0ZXAsIHkteSVzdGVwXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlQmxvYiwgY3JlYXRlVXJsRnJvbUJsb2IsIGhhc2hTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2Jhc2UnO1xuaW1wb3J0IHtcbiAgSGFzaEtleVR5cGUsXG4gIEltYWdlQ2FjaGVJbnRlcmZhY2UsXG4gIE9uTG9hZEhhbmRsZXJUeXBlLFxuICBPblRvdGFsTG9hZEhhbmRsZXJUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQ2FjaGUgaGVscGVyIGZvciBpbWFnZXNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VDYWNoZSBpbXBsZW1lbnRzIEltYWdlQ2FjaGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTWFwIG9mIHRoZSBwcmVsb2FkZWQgaW1hZ2VzXG4gICAqL1xuICBwcm90ZWN0ZWQgX2ltYWdlTWFwOiBSZWNvcmQ8SGFzaEtleVR5cGUsIEhUTUxJbWFnZUVsZW1lbnQ+ID0ge307XG4gIC8qKlxuICAgKiBNYXAgb2YgdGhlIHJ1bm5pbmcgcHJvY2Vzc2VzXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NNYXA6IFJlY29yZDxIYXNoS2V5VHlwZSwgYm9vbGVhbj4gPSB7fTtcbiAgLyoqXG4gICAqIE1hcCBvZiB0aGUgYnVmZmVyZWQgaGFuZGxlcnNcbiAgICovXG4gIHByb3RlY3RlZCBfaGFuZGxlcnM6IFJlY29yZDxIYXNoS2V5VHlwZSwgQXJyYXk8T25Mb2FkSGFuZGxlclR5cGU+PiA9IHt9O1xuICAvKipcbiAgICogTWFwIG9mIHRoZSBoYW5kbGVycyBmb3Igc3Vic2NyaWJlZCBvYmplY3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgX3RvdGFsSGFuZGxlcnM6IFJlY29yZDxIYXNoS2V5VHlwZSwgT25Ub3RhbExvYWRIYW5kbGVyVHlwZT4gPSB7fTtcblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEltYWdlQ2FjaGVJbnRlcmZhY2Uuc3Vic2NyaWJlfVxuICAgKi9cbiAgcHVibGljIHN1YnNjcmliZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBPblRvdGFsTG9hZEhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fdG90YWxIYW5kbGVyc1tzdWJzY3JpYmVyTmFtZV0gPSBoYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBJbWFnZUNhY2hlSW50ZXJmYWNlLnVuc3Vic2NyaWJlfVxuICAgKi9cbiAgcHVibGljIHVuc3Vic2NyaWJlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5fdG90YWxIYW5kbGVyc1tzdWJzY3JpYmVyTmFtZV07XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEltYWdlQ2FjaGVJbnRlcmZhY2UuY2FjaGV9XG4gICAqL1xuICBwdWJsaWMgY2FjaGUoXG4gICAgc291cmNlOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiBPbkxvYWRIYW5kbGVyVHlwZSB8IG51bGwgPSBudWxsLFxuICApOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5fZ2V0S2V5KHNvdXJjZSwgdHlwZSk7XG5cbiAgICBpZiAodGhpcy5faW1hZ2VNYXBba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY2FsbGJhY2sgIT09IG51bGwpIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcy5faW1hZ2VNYXBba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5faW1hZ2VNYXBba2V5XTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcHJvY2Vzc01hcFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFuZGxlcnNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5faGFuZGxlcnNba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW2tleV0ucHVzaChjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9wcm9jZXNzTWFwW2tleV0gPSB0cnVlO1xuXG4gICAgY29uc3QgYmxvYjogQmxvYiA9IGNyZWF0ZUJsb2Ioc291cmNlLCB0eXBlKTtcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IGNyZWF0ZVVybEZyb21CbG9iKGJsb2IpO1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSB1cmw7XG5cbiAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIHRoaXMuX2ltYWdlTWFwW2tleV0gPSBpbWc7XG4gICAgICBkZWxldGUgdGhpcy5fcHJvY2Vzc01hcFtrZXldO1xuXG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5faGFuZGxlcnNba2V5XTtcbiAgICAgICAgd2hpbGUgKGhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgIChoYW5kbGVycy5wb3AoKSkoaW1nKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5faGFuZGxlcnNba2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLl9wcm9jZXNzTWFwKS5sZW5ndGgpIHtcbiAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLl90b3RhbEhhbmRsZXJzKS5mb3JFYWNoKChoYW5kbGVyKSA9PiBoYW5kbGVyKCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGhhc2ggZm9yIGltYWdlIGRhdGEgYW5kIHR5cGUgYW5kIHJldHVybnMgaXQgYXMgc3RyaW5nXG4gICAqIEBwYXJhbSBzb3VyY2UgLSBzb3VyY2UgZGF0YSBvZiBpbWFnZVxuICAgKiBAcGFyYW0gdHlwZSAtIG1pbWUgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRLZXkoc291cmNlOiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6IEhhc2hLZXlUeXBlIHtcbiAgICByZXR1cm4gaGFzaFN0cmluZyhgJHtzb3VyY2V9XyR7dHlwZX1gKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbnVtYmVyIGlzIGluc2lkZSBpbnRlcnZhbFxuICogQHBhcmFtIHdoYXQgLSBudW1iZXJcbiAqIEBwYXJhbSBpbnRlcnZhbCAtIGludGVydmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0luSW50ZXJ2YWwod2hhdDogbnVtYmVyLCBpbnRlcnZhbDogVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gIHJldHVybiB3aGF0ID4gaW50ZXJ2YWxbMF0gJiYgd2hhdCA8IGludGVydmFsWzFdO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIG51bWJlciBpcyBpbnNpZGUgc2VnbWVudFxuICogQHBhcmFtIHdoYXQgLSBudW1iZXJcbiAqIEBwYXJhbSBzZWdtZW50IC0gc2VnbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJblNlZ21lbnQod2hhdDogbnVtYmVyLCBzZWdtZW50OiBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHdoYXQgPj0gc2VnbWVudFswXSAmJiB3aGF0IDw9IHNlZ21lbnRbMV07XG59XG5cbi8qKlxuICogUm91bmRzIGEgbnVtYmVyIHdpdGggYSBwcmVjaXNpb25cbiAqIEBwYXJhbSBudW0gLSBudW1iZXJcbiAqIEBwYXJhbSBwcmVjaXNpb24gLSBwcmVjaXNpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG51bTogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlciA9IDApOiBudW1iZXIge1xuICBjb25zdCBtdWx0ID0gMTAqKnByZWNpc2lvbjtcbiAgcmV0dXJuIE1hdGgucm91bmQobnVtICogbXVsdCkgLyBtdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zcG9zZSBjb29yZHMgd2l0aCBiYWNrd2FyZCBhcHBseWluZyBvZmZzZXQgYW5kIHNjYWxlXG4gKiBAcGFyYW0gY29vcmRzIC0gY29vcmRzIHRvIHRyYW5zcG9zZVxuICogQHBhcmFtIG9mZnNldCAtIG9mZnNldCB2ZWN0b3JcbiAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlIHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3NlQ29vcmRzQmFja3dhcmQoXG4gIGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSA9IFsxLCAxXSxcbik6IFZlY3RvckFycmF5VHlwZSB7XG4gIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcbiAgcmV0dXJuIFsoeCAtIG9mZnNldFswXSkvc2NhbGVbMF0sICh5IC0gb2Zmc2V0WzFdKS9zY2FsZVsxXV07XG59XG5cbi8qKlxuICogVHJhbnNwb3NlIGNvb3JkcyB3aXRoIGZvcndhcmQgYXBwbHlpbmcgb2Zmc2V0IGFuZCBzY2FsZVxuICogQHBhcmFtIGNvb3JkcyAtIGNvb3JkcyB0byB0cmFuc3Bvc2VcbiAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXQgdmVjdG9yXG4gKiBAcGFyYW0gc2NhbGUgLSBzY2FsZSB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQoXG4gIGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSA9IFsxLCAxXSxcbik6IFZlY3RvckFycmF5VHlwZSB7XG4gIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcbiAgcmV0dXJuIFt4KnNjYWxlWzBdICsgb2Zmc2V0WzBdLCB5KnNjYWxlWzFdICsgb2Zmc2V0WzFdXTtcbn1cbiIsImltcG9ydCBQb3NpdGlvbmFsVmVjdG9yLCB7IGNyZWF0ZVBvbHlnb25WZWN0b3JzIH0gZnJvbSAnLi9wb3NpdGlvbmFsLXZlY3Rvcic7XG5pbXBvcnQgeyBpc0luSW50ZXJ2YWwsIGlzSW5TZWdtZW50LCByb3VuZCB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgVmVjdG9yLCB7IGNyZWF0ZVZlY3RvciwgdG9WZWN0b3IgfSBmcm9tICcuL3ZlY3Rvcic7XG5cbmV4cG9ydCB7XG4gIFZlY3RvcixcbiAgY3JlYXRlVmVjdG9yLFxuICB0b1ZlY3RvcixcbiAgUG9zaXRpb25hbFZlY3RvcixcbiAgaXNJbkludGVydmFsLFxuICBpc0luU2VnbWVudCxcbiAgcm91bmQsXG4gIGNyZWF0ZVBvbHlnb25WZWN0b3JzLFxufTtcbiIsImltcG9ydCB7IFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2UsIFZlY3RvckFycmF5VHlwZSwgVmVjdG9ySW50ZXJmYWNlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgVmVjdG9yLCB7IHRvVmVjdG9yIH0gZnJvbSAnLi92ZWN0b3InO1xuXG4vKipcbiAqIFBvc2l0aW9uYWwgdmVjdG9yIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uYWxWZWN0b3IgaW1wbGVtZW50cyBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFBvc2l0aW9uXG4gICAqL1xuICBwdWJsaWMgcG9zaXRpb246IFZlY3RvckludGVyZmFjZTtcbiAgLyoqXG4gICAqIFNpemVcbiAgICovXG4gIHB1YmxpYyBzaXplOiBWZWN0b3JJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uYWxWZWN0b3IgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHBvc2l0aW9uIC0gcG9zaXRpb25cbiAgICogQHBhcmFtIHNpemUgLSBzaXplXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjdG9yQXJyYXlUeXBlIHwgVmVjdG9ySW50ZXJmYWNlLCBzaXplOiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gdG9WZWN0b3IocG9zaXRpb24pO1xuICAgIHRoaXMuc2l6ZSA9IHRvVmVjdG9yKHNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlLnRhcmdldH1cbiAgICovXG4gIHB1YmxpYyBnZXQgdGFyZ2V0KCk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uY2xvbmUoKS5hZGQodGhpcy5zaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNpemUubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlLmluY2x1ZGVzfVxuICAgKi9cbiAgcHVibGljIGluY2x1ZGVzKHBvaW50OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsIHByZWNpc2lvbjogbnVtYmVyID0gNCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHBvaW50VmVjdG9yID0gdG9WZWN0b3IocG9pbnQpO1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb24uaXNFcXVhbChwb2ludFZlY3RvciwgcHJlY2lzaW9uKSB8fCB0aGlzLnRhcmdldC5pc0VxdWFsKHBvaW50VmVjdG9yLCBwcmVjaXNpb24pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBbeDEsIHkxXSA9IHRoaXMucG9zaXRpb24udG9BcnJheShwcmVjaXNpb24pO1xuICAgIGNvbnN0IFt4MiwgeTJdID0gdGhpcy50YXJnZXQudG9BcnJheShwcmVjaXNpb24pO1xuICAgIGNvbnN0IFt4LCB5XSA9IHBvaW50VmVjdG9yLnRvQXJyYXkocHJlY2lzaW9uKTtcblxuICAgIHJldHVybiAoeC14MSkgKiAoeTIteTEpIC0gKHkteTEpICogKHgyLXgxKSA9PT0gMFxuICAgICAgJiYgKHgxIDwgeCAmJiB4IDwgeDIpICYmICh5MSA8IHkgJiYgeSA8IHkyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgUG9zaXRpb25hbFZlY3RvckludGVyZmFjZS5nZXREaXN0YW5jZVZlY3Rvcn1cbiAgICovXG4gIHB1YmxpYyBnZXREaXN0YW5jZVZlY3Rvcihwb2ludDogVmVjdG9yQXJyYXlUeXBlIHwgVmVjdG9ySW50ZXJmYWNlKTogUG9zaXRpb25hbFZlY3RvckludGVyZmFjZSB7XG4gICAgY29uc3QgdmVjdG9yUG9pbnQgPSB0b1ZlY3Rvcihwb2ludCk7XG4gICAgY29uc3QgZGVzdFBvaW50ID0gdGhpcy5fZ2V0TmVhcmVzdExpbmVQb2ludChwb2ludCk7XG5cbiAgICBpZiAoXG4gICAgICBkZXN0UG9pbnQueCA8IE1hdGgubWluKHRoaXMucG9zaXRpb24ueCwgdGhpcy50YXJnZXQueCkgfHxcbiAgICAgIGRlc3RQb2ludC54ID4gTWF0aC5tYXgodGhpcy5wb3NpdGlvbi54LCB0aGlzLnRhcmdldC54KSB8fFxuICAgICAgZGVzdFBvaW50LnkgPCBNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnksIHRoaXMudGFyZ2V0LnkpIHx8XG4gICAgICBkZXN0UG9pbnQueSA+IE1hdGgubWF4KHRoaXMucG9zaXRpb24ueSwgdGhpcy50YXJnZXQueSlcbiAgICApIHtcbiAgICAgIGNvbnN0IGwxID0gbmV3IFBvc2l0aW9uYWxWZWN0b3IodmVjdG9yUG9pbnQsIHRvVmVjdG9yKHRoaXMucG9zaXRpb24pLnN1Yih2ZWN0b3JQb2ludCkpO1xuICAgICAgY29uc3QgbDIgPSBuZXcgUG9zaXRpb25hbFZlY3Rvcih2ZWN0b3JQb2ludCwgdG9WZWN0b3IodGhpcy50YXJnZXQpLnN1Yih2ZWN0b3JQb2ludCkpO1xuXG4gICAgICBpZiAobDEubGVuZ3RoIDwgbDIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBsMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxWZWN0b3IodmVjdG9yUG9pbnQsIGRlc3RQb2ludC5zdWIodmVjdG9yUG9pbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb29yZHMgb2YgdGhlIG5lYXJlc3QgcG9pbnQgb24gdmVjdG9yIHRvIGFub3RoZXIgcG9pbnRcbiAgICogQHBhcmFtIHBvaW50IC0gYW5vdGhlciBwb2ludFxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXROZWFyZXN0TGluZVBvaW50KHBvaW50OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UpIHtcbiAgICBjb25zdCBwb2ludFZlY3RvciA9IHRvVmVjdG9yKHBvaW50KTtcblxuICAgIGNvbnN0IGsgPSAoXG4gICAgICAodGhpcy50YXJnZXQueS10aGlzLnBvc2l0aW9uLnkpICogKHBvaW50VmVjdG9yLngtdGhpcy5wb3NpdGlvbi54KVxuICAgICAgLSAodGhpcy50YXJnZXQueC10aGlzLnBvc2l0aW9uLngpICogKHBvaW50VmVjdG9yLnktdGhpcy5wb3NpdGlvbi55KVxuICAgICkgLyAoKHRoaXMudGFyZ2V0LnktdGhpcy5wb3NpdGlvbi55KSoqMiArICh0aGlzLnRhcmdldC54LXRoaXMucG9zaXRpb24ueCkqKjIpO1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoW1xuICAgICAgcG9pbnRWZWN0b3IueCAtIGsgKiAodGhpcy50YXJnZXQueS10aGlzLnBvc2l0aW9uLnkpLFxuICAgICAgcG9pbnRWZWN0b3IueSArIGsgKiAodGhpcy50YXJnZXQueC10aGlzLnBvc2l0aW9uLngpLFxuICAgIF0pO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGxpc3Qgb2YgdmVjdG9ycyBvZiB0aGUgcG9seWdvbiBmcm9tIGEgbGlzdCBvZiBwb2ludHNcbiAqIEBwYXJhbSBwb2ludHMgLSBsaXN0IG9mIHBvaW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUG9seWdvblZlY3RvcnMocG9pbnRzOiBWZWN0b3JBcnJheVR5cGVbXSB8IFZlY3RvckludGVyZmFjZVtdKTogUG9zaXRpb25hbFZlY3RvckludGVyZmFjZVtdIHtcbiAgY29uc3QgcmVzdWx0OiBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlW10gPSBbXTtcblxuICBmb3IgKGxldCBpPTAsIGo9cG9pbnRzLmxlbmd0aC0xOyBpPHBvaW50cy5sZW5ndGg7IGo9aSsrKSB7XG4gICAgY29uc3QgbGhzUG9pbnQgPSB0b1ZlY3Rvcihwb2ludHNbal0pO1xuICAgIGNvbnN0IHJoc1BvaW50ID0gdG9WZWN0b3IocG9pbnRzW2ldKTtcblxuICAgIHJlc3VsdC5wdXNoKG5ldyBQb3NpdGlvbmFsVmVjdG9yKGxoc1BvaW50LCByaHNQb2ludC5zdWIobGhzUG9pbnQpKSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JJbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuLyoqXG4gKiBWZWN0b3IgY2xhc3NcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgVmVjdG9ySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIENvb3JkaW5hdGUgWFxuICAgKi9cbiAgcHVibGljIHg6IG51bWJlcjtcbiAgLyoqXG4gICAqIENvb3JkaW5hdGUgWVxuICAgKi9cbiAgcHVibGljIHk6IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmF1bHQgcHJlY2lzaW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RlZmF1bHRQcmVjaXNpb246IG51bWJlciA9IDQ7XG5cbiAgLyoqXG4gICAqIFZlY3RvciBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geCAtIGNvb3JkaW5hdGUgWFxuICAgKiBAcGFyYW0geSAtIGNvb3JkaW5hdGUgWVxuICAgKiBAcGFyYW0gZGVmYXVsdFByZWNpc2lvbiAtIGRlZmF1bHQgcHJlY2lzaW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihbeCwgeV06IFZlY3RvckFycmF5VHlwZSwgZGVmYXVsdFByZWNpc2lvbj86IG51bWJlcikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIGlmICh0aGlzLl9kZWZhdWx0UHJlY2lzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24gPSBkZWZhdWx0UHJlY2lzaW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSB2ZWN0b3IgdG8gY2FjaGVcbiAgICovXG4gIHB1YmxpYyBhZGQodjogVmVjdG9ySW50ZXJmYWNlIHwgVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB2ID0gdG9WZWN0b3IodiwgdGhpcy5fZGVmYXVsdFByZWNpc2lvbik7XG5cbiAgICB0aGlzLnggKz0gdi54O1xuICAgIHRoaXMueSArPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgdmVjdG9yIHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSB2ZWN0b3IgdG8gc3VidHJhY3RcbiAgICovXG4gIHB1YmxpYyBzdWIodjogVmVjdG9ySW50ZXJmYWNlIHwgVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB2ID0gdG9WZWN0b3IodiwgdGhpcy5fZGVmYXVsdFByZWNpc2lvbik7XG5cbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsZXMgdmVjdG9yIGJ5IG51bWJlclxuICAgKiBAcGFyYW0gbXVsIC0gbXVsdGlwbGllclxuICAgKi9cbiAgcHVibGljIG11bChtdWw6IG51bWJlcik6IFZlY3RvckludGVyZmFjZSB7XG4gICAgdGhpcy54ICo9IG11bDtcbiAgICB0aGlzLnkgKj0gbXVsO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlcyB2ZWN0b3IgYnkgbnVtYmVyXG4gICAqIEBwYXJhbSBkaXYgLSBkaXZpZGVyXG4gICAqL1xuICBwdWJsaWMgZGl2KGRpdjogbnVtYmVyKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB0aGlzLnggLz0gZGl2O1xuICAgIHRoaXMueSAvPSBkaXY7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZlcnNlcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBpbnZlcnNlKCk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICB0aGlzLnkgPSAtdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJzZXMgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgcmV2ZXJzZSgpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHRoaXMueCA9IDEvdGhpcy54O1xuICAgIHRoaXMueSA9IDEvdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCp0aGlzLnggKyB0aGlzLnkqdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHNjYWxhciBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIG11bFNjYWxhcih2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUpOiBudW1iZXIge1xuICAgIHYgPSB0b1ZlY3Rvcih2LCB0aGlzLl9kZWZhdWx0UHJlY2lzaW9uKTtcbiAgICByZXR1cm4gdGhpcy54KnYueCArIHRoaXMueSp2Lnk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsZW5ndGggb2YgdmVjdG9yIHByb2R1Y3Qgd2l0aCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgbXVsVmVjdG9yKHY6IFZlY3RvckludGVyZmFjZSB8IFZlY3RvckFycmF5VHlwZSk6IG51bWJlciB7XG4gICAgdiA9IHRvVmVjdG9yKHYsIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24pO1xuICAgIHJldHVybiB0aGlzLngqdi55IC0gdGhpcy55KnYueDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlciB2ZWN0b3IgY29vcmRpbmF0ZS1ieS1jb29yZGluYXRlXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBtdWxDb29yZHModjogVmVjdG9ySW50ZXJmYWNlIHwgVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB2ID0gdG9WZWN0b3IodiwgdGhpcy5fZGVmYXVsdFByZWNpc2lvbik7XG5cbiAgICB0aGlzLnggKj0gdi54O1xuICAgIHRoaXMueSAqPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIHRoaXMgdmVjdG9yIHdpdGggYW5vdGhlciB2ZWN0b3IgY29vcmRpbmF0ZS1ieS1jb29yZGluYXRlXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBkaXZDb29yZHModjogVmVjdG9ySW50ZXJmYWNlIHwgVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB2ID0gdG9WZWN0b3IodiwgdGhpcy5fZGVmYXVsdFByZWNpc2lvbik7XG5cbiAgICB0aGlzLnggLz0gdi54O1xuICAgIHRoaXMueSAvPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgZXF1YWwgdG8gYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gcHJlY2lzaW9uIC0gcm91bmQgcHJlY2lzaW9uIGZvciBjb21wYXJpc29uXG4gICAqL1xuICBwdWJsaWMgaXNFcXVhbCh2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUsIHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5fZGVmYXVsdFByZWNpc2lvbik6IGJvb2xlYW4ge1xuICAgIHYgPSB0b1ZlY3Rvcih2LCB0aGlzLl9kZWZhdWx0UHJlY2lzaW9uKTtcbiAgICByZXR1cm4gcm91bmQodi54LCBwcmVjaXNpb24pID09PSByb3VuZCh0aGlzLngsIHByZWNpc2lvbilcbiAgICAgICYmIHJvdW5kKHYueSwgcHJlY2lzaW9uKSA9PT0gcm91bmQodGhpcy55LCBwcmVjaXNpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhbmdsZSBiZXR3ZWVuIHZlY3RvcnMgZXF1YWxzIDkwIGRlZ3JlZXNcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGlzT3J0aG9nb25hbCh2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb3ModikgPT09IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgdmVjdG9yIGlzIGNvbGxpbmVhciB3aXRoIGFyZ3VtZW50IHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgaXNDb2xsaW5lYXIodjogVmVjdG9ySW50ZXJmYWNlIHwgVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubXVsVmVjdG9yKHYpID09PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB2ZWN0b3IgaXMgbm9ybWFsaXplZFxuICAgKiBAcGFyYW0gcHJlY2lzaW9uIC0gcm91bmQgcHJlY2lzaW9uXG4gICAqL1xuICBwdWJsaWMgaXNOb3JtYWxpemVkKHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5fZGVmYXVsdFByZWNpc2lvbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiByb3VuZCh0aGlzLmxlbmd0aCwgcHJlY2lzaW9uKSA9PT0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYW5vdGhlciB2ZWN0b3IgaXMgb24gbGVmdCB3aXRoIHRoaXMgb25lXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBoYXNPbkxlZnQodjogVmVjdG9ySW50ZXJmYWNlIHwgVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubXVsVmVjdG9yKHYpID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYW5vdGhlciB2ZWN0b3IgaXMgb24gcmlnaHQgd2l0aCB0aGlzIG9uZVxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgaGFzT25SaWdodCh2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tdWxWZWN0b3IodikgPCAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhbmdsZSBiZXR3ZWVuIHZlY3RvcnMgaXMgc2hhcnBcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGhhc1NoYXJwQ29ybmVyV2l0aCh2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb3ModikgPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhbmdsZSBiZXR3ZWVuIHZlY3RvcnMgaXMgb2J0dXNlXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBoYXNPYnR1c2VDb3JuZXJXaXRoKHY6IFZlY3RvckludGVyZmFjZSB8IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldENvcyh2KSA8IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkaXN0YW5jZSB2ZWN0b3Igb2YgdGhpcyBhbmQgYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGRpc3RhbmNlKHY6IFZlY3RvckludGVyZmFjZSB8IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zdWIodik7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGlzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoO1xuXG4gICAgdGhpcy54IC89IGxlbjtcbiAgICB0aGlzLnkgLz0gbGVuO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNwb3NlcyB2ZWN0b3IgYmFja3dhcmQgd2l0aCBvZmZzZXQgYW5kIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VCYWNrd2FyZChcbiAgICBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSxcbiAgKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCBvZmZzZXRWZWN0b3IgPSB0b1ZlY3RvcihvZmZzZXQsIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24pO1xuICAgIGNvbnN0IHNjYWxlVmVjdG9yID0gdG9WZWN0b3Ioc2NhbGUsIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24pO1xuXG4gICAgdGhpcy54ID0gKHRoaXMueCAtIG9mZnNldFZlY3Rvci54KSAvIHNjYWxlVmVjdG9yLng7XG4gICAgdGhpcy55ID0gKHRoaXMueSAtIG9mZnNldFZlY3Rvci55KSAvIHNjYWxlVmVjdG9yLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc3Bvc2VzIHZlY3RvciBmb3J3YXJkIHdpdGggb2Zmc2V0IGFuZCBzY2FsZVxuICAgKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0XG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqL1xuICBwdWJsaWMgdHJhbnNwb3NlRm9yd2FyZChcbiAgICBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSxcbiAgKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCBvZmZzZXRWZWN0b3IgPSB0b1ZlY3RvcihvZmZzZXQsIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24pO1xuICAgIGNvbnN0IHNjYWxlVmVjdG9yID0gdG9WZWN0b3Ioc2NhbGUsIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24pO1xuXG4gICAgdGhpcy54ID0gb2Zmc2V0VmVjdG9yLnggKyB0aGlzLngqc2NhbGVWZWN0b3IueDtcbiAgICB0aGlzLnkgPSBvZmZzZXRWZWN0b3IueSArIHRoaXMueSpzY2FsZVZlY3Rvci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlcyB2ZWN0b3IgYnkgYW5nbGUgY2xvY2t3aXNlXG4gICAqIEBwYXJhbSBhbmdsZSAtIGFuZ2xlIHRvIHJvdGF0ZSB0b1xuICAgKiBAcGFyYW0gcHJlY2lzaW9uIC0gcm91bmQgcHJlY2lzaW9uXG4gICAqL1xuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5fZGVmYXVsdFByZWNpc2lvbik6IFZlY3RvckludGVyZmFjZSB7XG4gICAgY29uc3QgY3MgPSBNYXRoLmNvcygtYW5nbGUpO1xuICAgIGNvbnN0IHNuID0gTWF0aC5zaW4oLWFuZ2xlKTtcblxuICAgIGNvbnN0IG5ld1ggPSByb3VuZCh0aGlzLngqY3MgLSB0aGlzLnkqc24sIHByZWNpc2lvbik7XG4gICAgY29uc3QgbmV3WSA9IHJvdW5kKHRoaXMueCpzbiArIHRoaXMueSpjcywgcHJlY2lzaW9uKTtcblxuICAgIHRoaXMueCA9IG5ld1g7XG4gICAgdGhpcy55ID0gbmV3WTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgdmVjdG9yIHRvIHRoZSBsZWZ0IGJ5IDkwIGRlZ3JlZXNcbiAgICogQHBhcmFtIHByZWNpc2lvbiAtIHJvdW5kIHByZWNpc2lvblxuICAgKi9cbiAgcHVibGljIHJvdGF0ZUxlZnQocHJlY2lzaW9uOiBudW1iZXIgPSB0aGlzLl9kZWZhdWx0UHJlY2lzaW9uKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGUoLU1hdGguUEkvMiwgcHJlY2lzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGVzIHZlY3RvciB0byB0aGUgcmlnaHQgYnkgOTAgZGVncmVlc1xuICAgKiBAcGFyYW0gcHJlY2lzaW9uIC0gcm91bmQgcHJlY2lzaW9uXG4gICAqL1xuICBwdWJsaWMgcm90YXRlUmlnaHQocHJlY2lzaW9uOiBudW1iZXIgPSB0aGlzLl9kZWZhdWx0UHJlY2lzaW9uKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5yb3RhdGUoTWF0aC5QSS8yLCBwcmVjaXNpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb3Mgd2l0aCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29zKHY6IFZlY3RvckludGVyZmFjZSB8IFZlY3RvckFycmF5VHlwZSB8IG51bGwgPSBudWxsKTogbnVtYmVyIHtcbiAgICBpZiAodiA9PT0gbnVsbCkge1xuICAgICAgdiA9IGNyZWF0ZVZlY3RvcihbMSwgMF0sIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2ID0gdG9WZWN0b3IodiwgdGhpcy5fZGVmYXVsdFByZWNpc2lvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubXVsU2NhbGFyKHYpIC8gKHRoaXMubGVuZ3RoICogdi5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb25lcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiBjcmVhdGVWZWN0b3IodGhpcy50b0FycmF5KCksIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHZlY3RvciB0byBhcnJheVxuICAgKiBAcGFyYW0gcHJlY2lzaW9uIC0gcHJlY2lzaW9uXG4gICAqL1xuICBwdWJsaWMgdG9BcnJheShwcmVjaXNpb24/OiBudW1iZXIpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIGlmIChwcmVjaXNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyb3VuZCh0aGlzLngsIHByZWNpc2lvbiksIHJvdW5kKHRoaXMueSwgcHJlY2lzaW9uKV07XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIG5ldyB2ZWN0b3JcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBjb29yZHMgLSBjb29yZGluYXRlcyBvZiBuZXcgdmVjdG9yXG4gKiBAcGFyYW0gZGVmYXVsdFByZWNpc2lvbiAtIHJvdW5kIHByZWNpc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmVjdG9yKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBkZWZhdWx0UHJlY2lzaW9uPzogbnVtYmVyKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgcmV0dXJuIG5ldyBWZWN0b3IoY29vcmRzLCBkZWZhdWx0UHJlY2lzaW9uKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBpbnN0YW5jZSB0byB2ZWN0b3IgaWYgaXQncyBhbiBhcnJheVxuICogQHB1YmxpY1xuICogQHBhcmFtIGNvb3JkcyAtIGNvb3JkcyBhcyB2ZWN0b3Igb3IgYW4gYXJyYXlcbiAqIEBwYXJhbSBkZWZhdWx0UHJlY2lzaW9uIC0gcm91bmQgcHJlY2lzaW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1ZlY3Rvcihjb29yZHM6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSwgZGVmYXVsdFByZWNpc2lvbj86IG51bWJlcik6IFZlY3RvckludGVyZmFjZSB7XG4gIHJldHVybiAoY29vcmRzIGluc3RhbmNlb2YgQXJyYXkpID8gY3JlYXRlVmVjdG9yKGNvb3JkcywgZGVmYXVsdFByZWNpc2lvbikgOiBjb29yZHM7XG59XG4iLCJpbXBvcnQge1xuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3Q29uZmlnSW50ZXJmYWNlLFxuICBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSxcbiAgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhcmVBcnJheXNFcXVhbCB9IGZyb20gJy4uL2hlbHBlcnMvYmFzZSc7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tICcuLi9oZWxwZXJzL29ic2VydmUtaGVscGVyJztcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciB9IGZyb20gJy4vdmVjdG9yJztcbmltcG9ydCB7IHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQsIHRyYW5zcG9zZUNvb3Jkc0JhY2t3YXJkIH0gZnJvbSAnLi92ZWN0b3IvaGVscGVycyc7XG5cbi8qKlxuICogQ29uZmlnIGZvciBvYmplY3RzIGRyYXdhYmxlIG9uIGNhbnZhc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29uZmlnIGltcGxlbWVudHMgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU2NhbGVcbiAgICovXG4gIHByb3RlY3RlZCBfc2NhbGU6IFZlY3RvckFycmF5VHlwZTtcbiAgLyoqXG4gICAqIE9mZnNldFxuICAgKi9cbiAgcHJvdGVjdGVkIF9vZmZzZXQ6IFZlY3RvckFycmF5VHlwZTtcbiAgLyoqXG4gICAqIEdyaWQgc3RlcFxuICAgKi9cbiAgcHJvdGVjdGVkIF9ncmlkU3RlcDogbnVtYmVyO1xuICAvKipcbiAgICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX29ic2VydmVIZWxwZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFZpZXdDb25maWcgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKiBAcGFyYW0gZ3JpZFN0ZXAgLSBncmlkIHN0ZXBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHsgc2NhbGUsIG9mZnNldCwgZ3JpZFN0ZXAgfTogVmlld0NvbmZpZ0ludGVyZmFjZSkge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuX3NjYWxlID0gbmV3IFByb3h5KHNjYWxlLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IFZlY3RvckFycmF5VHlwZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdICE9PSB2YWx1ZTtcbiAgICAgICAgKHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdIGFzIHVua25vd24pID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0aW5nSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuX29mZnNldCA9IG5ldyBQcm94eShvZmZzZXQsIHtcbiAgICAgIHNldDogKHRhcmdldDogVmVjdG9yQXJyYXlUeXBlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gIT09IHZhbHVlO1xuICAgICAgICAodGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gYXMgdW5rbm93bikgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRpbmdIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fZ3JpZFN0ZXAgPSBncmlkU3RlcDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5vZmZWaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZlZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudHJhbnNwb3NlQmFja3dhcmR9XG4gICAqL1xuICBwdWJsaWMgdHJhbnNwb3NlQmFja3dhcmQoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0cmFuc3Bvc2VDb29yZHNCYWNrd2FyZChjb29yZHMsIHRoaXMuX29mZnNldCwgdGhpcy5fc2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS50cmFuc3Bvc2VGb3J3YXJkfVxuICAgKi9cbiAgcHVibGljIHRyYW5zcG9zZUZvcndhcmQoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0cmFuc3Bvc2VDb29yZHNGb3J3YXJkKGNvb3JkcywgdGhpcy5fb2Zmc2V0LCB0aGlzLl9zY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLnVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0fVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0KG5ld1NjYWxlOiBWZWN0b3JBcnJheVR5cGUsIGN1cnNvckNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKG5ld1NjYWxlLCB0aGlzLl9zY2FsZSk7XG5cbiAgICBpZiAoIWlzQ2hhbmdlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGluZ0hhbmRsZXJzKCgpID0+IHtcbiAgICAgIGNvbnN0IG9sZFNjYWxlUG9zaXRpb24gPSBjcmVhdGVWZWN0b3IodGhpcy50cmFuc3Bvc2VCYWNrd2FyZChjdXJzb3JDb29yZHMpKTtcbiAgICAgIHRoaXMuc2NhbGUgPSBuZXdTY2FsZTtcbiAgICAgIGNvbnN0IG5ld1NjYWxlUG9zaXRpb24gPSBjcmVhdGVWZWN0b3IodGhpcy50cmFuc3Bvc2VCYWNrd2FyZChjdXJzb3JDb29yZHMpKTtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBuZXdTY2FsZVBvc2l0aW9uLmNsb25lKCkuc3ViKG9sZFNjYWxlUG9zaXRpb24pO1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLnRyYW5zcG9zZUZvcndhcmQoZGlmZmVyZW5jZS50b0FycmF5KCkpO1xuXG4gICAgICByZXR1cm4gW2lzQ2hhbmdlZCwgbnVsbF07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbGwgdGhlIGRhdGEgaW4gY29uZmlnXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKHsgc2NhbGUsIG9mZnNldCwgZ3JpZFN0ZXAgfTogVmlld0NvbmZpZ0ludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChzY2FsZSwgdGhpcy5fc2NhbGUpIHx8ICFhcmVBcnJheXNFcXVhbChvZmZzZXQsIHRoaXMuX29mZnNldCk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRpbmdIYW5kbGVycygoKSA9PiB7XG4gICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgIHRoaXMuZ3JpZFN0ZXAgPSBncmlkU3RlcDtcblxuICAgICAgcmV0dXJuIFtpc0NoYW5nZWQsIG51bGxdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbmZpZyBkYXRhXG4gICAqL1xuICBwdWJsaWMgZ2V0Q29uZmlnKCk6IFZpZXdDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB7XG4gICAgICBzY2FsZTogdGhpcy5fc2NhbGUsXG4gICAgICBvZmZzZXQ6IHRoaXMuX29mZnNldCxcbiAgICAgIGdyaWRTdGVwOiB0aGlzLl9ncmlkU3RlcCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIGdldHRlclxuICAgKi9cbiAgZ2V0IHNjYWxlKCk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIHNldHRlclxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKi9cbiAgc2V0IHNjYWxlKHNjYWxlOiBWZWN0b3JBcnJheVR5cGUpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwoc2NhbGUsIHRoaXMuX3NjYWxlKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGluZ0hhbmRsZXJzKCgpID0+IHtcbiAgICAgIHRoaXMuX3NjYWxlWzBdID0gc2NhbGVbMF07XG4gICAgICB0aGlzLl9zY2FsZVsxXSA9IHNjYWxlWzFdO1xuICAgICAgcmV0dXJuIFtpc0NoYW5nZWQsIG51bGxdO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9mZnNldCBnZXR0ZXJcbiAgICovXG4gIGdldCBvZmZzZXQoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIE9mZnNldCBzZXR0ZXJcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKi9cbiAgc2V0IG9mZnNldChvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChvZmZzZXQsIHRoaXMuX29mZnNldCk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRpbmdIYW5kbGVycygoKSA9PiB7XG4gICAgICB0aGlzLl9vZmZzZXRbMF0gPSBvZmZzZXRbMF07XG4gICAgICB0aGlzLl9vZmZzZXRbMV0gPSBvZmZzZXRbMV07XG4gICAgICByZXR1cm4gW2lzQ2hhbmdlZCwgbnVsbF07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR3JpZCBzdGVwIGdldHRlclxuICAgKi9cbiAgZ2V0IGdyaWRTdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWRTdGVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyaWQgc3RlcCBzZXR0ZXJcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBzZXQgZ3JpZFN0ZXAoZ3JpZFN0ZXA6IG51bWJlcikge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9IGdyaWRTdGVwICE9PSB0aGlzLl9ncmlkU3RlcDtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGluZ0hhbmRsZXJzKCgpID0+IHtcbiAgICAgIHRoaXMuX2dyaWRTdGVwID0gZ3JpZFN0ZXA7XG4gICAgICByZXR1cm4gW2lzQ2hhbmdlZCwgbnVsbF07XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qIChpZ25vcmVkKSAqLyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEcmF3ZXIgZnJvbSAnLi9jYW52YXMvZHJhd2VyJztcbmltcG9ydCBEcmF3YWJsZVN0b3JhZ2UgZnJvbSAnLi9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9kcmF3YWJsZS1zdG9yYWdlJztcbmltcG9ydCB7IFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlIH0gZnJvbSAnLi9jYW52YXMvdHlwZXMnO1xuaW1wb3J0IFZpZXdDb25maWcgZnJvbSAnLi9jYW52YXMvc3RydWN0cy92aWV3LWNvbmZpZyc7XG5pbXBvcnQgU3ZnIGZyb20gJy4vY2FudmFzL2ZpZ3VyZXMvc3ZnJztcbmltcG9ydCBHcmlkIGZyb20gJy4vY2FudmFzL2ZpZ3VyZXMvZ3JpZCc7XG5pbXBvcnQgUmVjdCBmcm9tICcuL2NhbnZhcy9maWd1cmVzL3JlY3QnO1xuaW1wb3J0IEVsbGlwc2UgZnJvbSAnLi9jYW52YXMvZmlndXJlcy9lbGxpcHNlJztcbmltcG9ydCBMaW5lIGZyb20gJy4vY2FudmFzL2ZpZ3VyZXMvbGluZSc7XG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgRHJhd2FibGVTdG9yYWdlKFtdKTtcbmNvbnNvbGUubG9nKHN0b3JhZ2UpO1xuXG5jb25zdCB2aWV3Q29uZmlnOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSA9IG5ldyBWaWV3Q29uZmlnKHtcbiAgc2NhbGU6IFsxLCAxXSxcbiAgb2Zmc2V0OiBbMCwgMF0sXG4gIGdyaWRTdGVwOiAxNSxcbn0pO1xuY29uc29sZS5sb2codmlld0NvbmZpZyk7XG5cbmNvbnN0IGRyYXdlcjogRHJhd2VyID0gbmV3IERyYXdlcih7XG4gIGRvbUVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudCxcbiAgdmlld0NvbmZpZyxcbiAgc3RvcmFnZSxcbn0pO1xuZHJhd2VyLmRyYXcoKTtcblxuc3RvcmFnZS5hZGRMYXllcignZ3JpZCcsICdHcmlkIGxheWVyJywgW1xuICBuZXcgR3JpZCh7XG4gICAgaWQ6IDEsXG4gICAgY29uZmlnOiB7XG4gICAgICB6SW5kZXg6IC1JbmZpbml0eSxcbiAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgICAgbWFpbkxpbmVDb2xvcjogJyNiYmInLFxuICAgICAgc3ViTGluZUNvbG9yOiAnI2RlZGVkZScsXG4gICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICBsaW5lc0luQmxvY2s6IDUsXG4gICAgfSxcbiAgfSksXG5dKTtcblxuY29uc3QgZWxlbWVudHNMYXllciA9IHN0b3JhZ2UuYWRkTGF5ZXIoJ2VsZW1lbnRzJywgJ0VsZW1lbnRzIGxheWVyJywgW1xuICBuZXcgUmVjdCh7XG4gICAgaWQ6IDIsXG4gICAgY29uZmlnOiB7XG4gICAgICBwb3NpdGlvbjogWzEwLCAyMF0sXG4gICAgICBzaXplOiBbMTAwLCAzMF0sXG4gICAgICB6SW5kZXg6IDEsXG4gICAgICBzY2FsYWJsZTogdHJ1ZSxcbiAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICBmaWxsU3R5bGU6ICdncmVlbicsXG4gICAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbiAgICAgIGxpbmVXaWR0aDogMSxcbiAgICB9LFxuICB9KSxcbiAgbmV3IFJlY3Qoe1xuICAgIGlkOiAzLFxuICAgIGNvbmZpZzoge1xuICAgICAgcG9zaXRpb246IFsxMCwgMjVdLFxuICAgICAgc2l6ZTogWzUwLCA1MF0sXG4gICAgICB6SW5kZXg6IDEsXG4gICAgICBzY2FsYWJsZTogdHJ1ZSxcbiAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICBmaWxsU3R5bGU6ICdibHVlJyxcbiAgICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgICAgbGluZVdpZHRoOiAxLFxuICAgIH0sXG4gIH0pLFxuICBuZXcgUmVjdCh7XG4gICAgaWQ6IDQsXG4gICAgY29uZmlnOiB7XG4gICAgICBwb3NpdGlvbjogWzE1ICogMzAsIDE1ICogMTBdLFxuICAgICAgc2l6ZTogWzE1ICogMTAsIDE1ICogNV0sXG4gICAgICB6SW5kZXg6IDEwLFxuICAgICAgc2NhbGFibGU6IHRydWUsXG4gICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgICAgc3Ryb2tlU3R5bGU6ICdyZWQnLFxuICAgICAgbGluZVdpZHRoOiAxLFxuICAgIH0sXG4gIH0pLFxuICBuZXcgU3ZnKHtcbiAgICBpZDogNSxcbiAgICBjb25maWc6IHtcbiAgICAgIHBvc2l0aW9uOiBbMzAwLCA1NTBdLFxuICAgICAgc2l6ZTogWzE2MiwgODJdLFxuICAgICAgekluZGV4OiAxLFxuICAgICAgc2NhbGFibGU6IGZhbHNlLFxuICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgIG9mZnNldDogWzEsIDFdLFxuICAgICAgZGF0YTogXCI8c3ZnIHdpZHRoPScxNjInIGhlaWdodD0nODInIHZpZXdCb3g9JzAgMCAxNjIgODInIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTI4LjY5MjMgMUwxIDQwLjEyNDFMMjguNjkyMyA4MUgxMzQuNjc1TDE2MSA0MC4xMjQxTDEzNC42NzUgMUgyOC42OTIzWicgZmlsbD0nI0ZGQkNGMicgc3Ryb2tlPSdibGFjaycgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgLz48L3N2Zz5cIiwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH0sXG4gICAgYm91bmQ6IFtbMjgsIDBdLCBbMTM0LCAwXSwgWzE2MSwgNDBdLCBbMTM0LCA4MV0sIFsyOCwgODFdLCBbMCwgNDBdXSxcbiAgfSksXG4gIG5ldyBSZWN0KHtcbiAgICBpZDogNixcbiAgICBjb25maWc6IHtcbiAgICAgIHBvc2l0aW9uOiBbMzUwLCAzNTBdLFxuICAgICAgc2l6ZTogWzMwLCAzMF0sXG4gICAgICB6SW5kZXg6IDEsXG4gICAgICBzY2FsYWJsZTogdHJ1ZSxcbiAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgICAgbGluZVdpZHRoOiAxLFxuICAgIH0sXG4gIH0pLFxuICBuZXcgUmVjdCh7XG4gICAgaWQ6IDcsXG4gICAgY29uZmlnOiB7XG4gICAgICBwb3NpdGlvbjogWzM1MCwgMzAwXSxcbiAgICAgIHNpemU6IFszMCwgMzBdLFxuICAgICAgekluZGV4OiAxLFxuICAgICAgc2NhbGFibGU6IHRydWUsXG4gICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICAgIGxpbmVXaWR0aDogMSxcbiAgICB9LFxuICB9KSxcbiAgbmV3IFJlY3Qoe1xuICAgIGlkOiA4LFxuICAgIGNvbmZpZzoge1xuICAgICAgcG9zaXRpb246IFszMDAsIDM1MF0sXG4gICAgICBzaXplOiBbMzAsIDMwXSxcbiAgICAgIHpJbmRleDogMSxcbiAgICAgIHNjYWxhYmxlOiB0cnVlLFxuICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgICBsaW5lV2lkdGg6IDEsXG4gICAgfSxcbiAgfSksXG4gIG5ldyBSZWN0KHtcbiAgICBpZDogOSxcbiAgICBjb25maWc6IHtcbiAgICAgIHBvc2l0aW9uOiBbMjAwLCAyMDBdLFxuICAgICAgc2l6ZTogWzE2MCwgMTYwXSxcbiAgICAgIHpJbmRleDogMCxcbiAgICAgIHNjYWxhYmxlOiB0cnVlLFxuICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICBpbnRlcmFjdGl2ZTogdHJ1ZSxcbiAgICAgIGZpbGxTdHlsZTogJ2dyZWVuJyxcbiAgICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgICBsaW5lV2lkdGg6IDEsXG4gICAgfSxcbiAgfSksXG5dKTtcblxuY29uc3QgZ3JvdXAgPSBlbGVtZW50c0xheWVyLnN0b3JhZ2UuZ3JvdXAoWzYsIDcsIDgsIDldKTtcbmNvbnNvbGUubG9nKGdyb3VwKTtcbi8vIGVsZW1lbnRzTGF5ZXIuc3RvcmFnZS51bmdyb3VwKGdyb3VwLmlkKTtcblxuY29uc3QgYW5vdGhlckxheWVyID0gc3RvcmFnZS5hZGRMYXllcignYW5vdGhlcicsICdBbm90aGVyIExheWVyJywgW10pO1xuYW5vdGhlckxheWVyLnN0b3JhZ2UuYWRkKG5ldyBSZWN0KHtcbiAgaWQ6IDEwLFxuICBjb25maWc6IHtcbiAgICBwb3NpdGlvbjogWzEyMCwgMzAwXSxcbiAgICBzaXplOiBbMTAwLCAxMDBdLFxuICAgIHpJbmRleDogLTEwMCxcbiAgICBzY2FsYWJsZTogZmFsc2UsXG4gICAgZGlzcGxheTogdHJ1ZSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ2xpZ2h0Ymx1ZScsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gICAgb2Zmc2V0OiBbMC41LCAxXSxcbiAgfSxcbn0pKTtcbmFub3RoZXJMYXllci5zdG9yYWdlLmFkZChuZXcgRWxsaXBzZSh7XG4gIGlkOiAxMSxcbiAgY29uZmlnOiB7XG4gICAgcG9zaXRpb246IFswLCAwXSxcbiAgICBzaXplOiBbMTIwLCAxODBdLFxuICAgIHpJbmRleDogMTAwLFxuICAgIHNjYWxhYmxlOiBmYWxzZSxcbiAgICBkaXNwbGF5OiB0cnVlLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgaW50ZXJhY3RpdmU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAnbGlnaHRibHVlJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgICBvZmZzZXQ6IFswLjUsIDAuNV0sXG4gIH0sXG59KSk7XG5hbm90aGVyTGF5ZXIuc3RvcmFnZS5hZGQobmV3IExpbmUoe1xuICBpZDogMTIsXG4gIGNvbmZpZzoge1xuICAgIHBvc2l0aW9uOiBbMCwgMF0sXG4gICAgc2l6ZTogWzEwMCwgMTAwXSxcbiAgICB6SW5kZXg6IDEwMSxcbiAgICBzY2FsYWJsZTogZmFsc2UsXG4gICAgZGlzcGxheTogdHJ1ZSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGludGVyYWN0aXZlOiB0cnVlLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAyLFxuICB9LFxufSkpO1xuXG5jb25zb2xlLmxvZygnbGF5ZXJzJywgc3RvcmFnZS5nZXRMYXllcnMoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=