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
/* harmony import */ var _helpers_type_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/type-helpers */ "./src/canvas/helpers/type-helpers.ts");
/* harmony import */ var _structs_vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structs/vector */ "./src/canvas/structs/vector/index.ts");
/* harmony import */ var _structs_filters_grid_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./structs/filters/grid-filter */ "./src/canvas/structs/filters/grid-filter.ts");
/* harmony import */ var _helpers_current_element_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/current-element-manager */ "./src/canvas/helpers/current-element-manager.ts");





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
        var coordsFilter = new _structs_filters_grid_filter__WEBPACK_IMPORTED_MODULE_3__["default"]();
        var filterCoords = function (coords) {
            return coordsFilter.process(coords, {
                scale: _this._viewConfig.scale,
                offset: _this._viewConfig.offset,
                gridStep: _this._viewConfig.gridStep,
                bounds: _this.getBounds(),
            });
        };
        var currentElementManager = new _helpers_current_element_manager__WEBPACK_IMPORTED_MODULE_4__["default"](this, this._storage);
        var DEVIATION = 8;
        var getNearBoundElement = function (coords) {
            // TODO проблема, когда на фигуру накладывается другая фигура
            var transposedCoords = _this._viewConfig.transposeForward(coords);
            var list = _this._storage.list;
            for (var i = list.length - 1; i >= 0; --i) {
                var item = list[i];
                // TODO maybe only visible?
                if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_1__.isPositional)(item)
                    && item
                        .isNearBoundEdge(transposedCoords, DEVIATION / _this._viewConfig.scale[0])) {
                    return item;
                }
            }
            return null;
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
            if (!currentElementManager.found()) {
                currentElementManager.search([event.offsetX, event.offsetY]);
            }
            mouseDownCoords = [event.offsetX, event.offsetY];
            _this._domElement.style.cursor = 'grabbing';
        });
        this._domElement.addEventListener('mousemove', function (event) {
            var mouseMoveCoords = [event.offsetX, event.offsetY];
            if (mouseDownCoords === null) {
                if (getNearBoundElement(mouseMoveCoords) !== null) {
                    _this._domElement.style.cursor = 'crosshair';
                }
                else if (currentElementManager.found()) {
                    _this._domElement.style.cursor = 'pointer';
                }
                else {
                    _this._domElement.style.cursor = 'default';
                }
                return;
            }
            if (currentElementManager.found()) {
                var transposedCoords = _this.viewConfig.transposeForward(mouseMoveCoords);
                var newPosition = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(transposedCoords)
                    .sub((0,_structs_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(currentElementManager.position))
                    .toArray();
                currentElementManager.element.config.position = filterCoords(newPosition);
            }
            else {
                var difference = [
                    mouseDownCoords[0] - mouseMoveCoords[0],
                    mouseDownCoords[1] - mouseMoveCoords[1],
                ];
                _this._viewConfig.offset = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(_this._viewConfig.offset)
                    .sub((0,_structs_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(difference))
                    .toArray();
            }
            mouseDownCoords = mouseMoveCoords;
        });
        this._domElement.addEventListener('mouseup', function () {
            if (currentElementManager.found()) {
                console.log(currentElementManager.element);
            }
            currentElementManager.lose();
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
    function Grid(id, config, data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this, id, config, data) || this;
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
        var _a = drawer.getBounds(), fromBound = _a[0], toBound = _a[1];
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
        if (this._config.lineWidth !== 0) {
            (_b = drawer.context).strokeRect.apply(_b, __spreadArray(__spreadArray([], this._config.position, false), this._config.size, false));
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
         */
        _this._type = 'Svg';
        /**
         * Image DOM element
         */
        _this._img = null;
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
            return this._img.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Svg.prototype, "sourceHeight", {
        /**
         * sourceHeight getter
         */
        get: function () {
            return this._img.height;
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
    /**
     * Tries to draw the figure if the image is ready
     * @param drawer - drawer object
     */
    Svg.prototype._tryDraw = function (drawer) {
        var _a, _b;
        if (this._img !== null) {
            var scale = this.scale;
            var position = this._config.position;
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
/* harmony export */   "hashString": () => (/* binding */ hashString)
/* harmony export */ });
/* harmony import */ var crypto_js_md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto-js/md5 */ "./node_modules/crypto-js/md5.js");
/* harmony import */ var crypto_js_md5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto_js_md5__WEBPACK_IMPORTED_MODULE_0__);

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


/***/ }),

/***/ "./src/canvas/helpers/current-element-manager.ts":
/*!*******************************************************!*\
  !*** ./src/canvas/helpers/current-element-manager.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _type_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type-helpers */ "./src/canvas/helpers/type-helpers.ts");

/**
 * CurrentElementManager class
 */
var CurrentElementManager = /** @class */ (function () {
    /**
     * CurrentElementManager constructor
     * @param drawer - drawer
     * @param storage - storage
     */
    function CurrentElementManager(drawer, storage) {
        this.element = null;
        this.position = null;
        this._drawer = drawer;
        this._storage = storage;
    }
    /**
     * Search
     * @param mouseCoords - mouse coords
     */
    CurrentElementManager.prototype.search = function (mouseCoords) {
        var transposedCoords = this._drawer.viewConfig.transposeForward(mouseCoords);
        var list = this._storage.list;
        for (var i = list.length - 1; i >= 0; --i) {
            var item = list[i];
            // TODO maybe only visible?
            if ((0,_type_helpers__WEBPACK_IMPORTED_MODULE_0__.isPositional)(item) && item.boundIncludes(transposedCoords)) {
                this.element = item;
                this.position = this.element.getRelativePosition(transposedCoords);
                return this;
            }
        }
        this.lose();
        return this;
    };
    /**
     * Lose element
     */
    CurrentElementManager.prototype.lose = function () {
        this.element = null;
        this.position = null;
    };
    /**
     * If element has been found
     */
    CurrentElementManager.prototype.found = function () {
        return this.element !== null;
    };
    return CurrentElementManager;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CurrentElementManager);


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
     * {@inheritDoc ObserveHelperInterface.processWithMuteHandlers}
     */
    ObserveHelper.prototype.processWithMuteHandlers = function (extra) {
        var _this = this;
        if (extra === void 0) { extra = null; }
        return this.withMuteHandlers(function (mutedBefore) { return _this.processHandlers(mutedBefore, extra); });
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

/***/ "./src/canvas/helpers/type-helpers.ts":
/*!********************************************!*\
  !*** ./src/canvas/helpers/type-helpers.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vector */ "./src/canvas/structs/vector/index.ts");

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
    RectangularBound.prototype.isNearEdge = function (coords, deviation) {
        var vectors = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.createPolygonVectors)([
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
     * @param children - children of grouped objects
     */
    function DrawableGroup(id, config, data, children) {
        if (data === void 0) { data = {}; }
        if (children === void 0) { children = []; }
        var _this = _super.call(this, id, config, data) || this;
        /**
         * Name of class to use as subscriber name in observable logic
         */
        _this._subscriberName = 'DrawableGroup';
        _this._storage = new _drawable_drawable_storage__WEBPACK_IMPORTED_MODULE_1__["default"](_this._processChildrenToGroup(children));
        _this._storage.onViewChange(_this._subscriberName, function (target, extra) {
            _this._observeHelper.processWithMuteHandlers(extra);
        });
        return _this;
    }
    /**
     * {@inheritDoc DrawableInterface.draw}
     */
    DrawableGroup.prototype.draw = function (drawer) {
        this._storage.list.forEach(function (item) {
            if (item.config.visible) {
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
        return this._processChildrenToUngroup(this.children);
    };
    Object.defineProperty(DrawableGroup.prototype, "children", {
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
     * Some actions with children before grouping
     */
    DrawableGroup.prototype._processChildrenToGroup = function (children) {
        return children;
    };
    /**
     * Some actions with children before ungrouping
     */
    DrawableGroup.prototype._processChildrenToUngroup = function (children) {
        return children;
    };
    return DrawableGroup;
}(_drawable_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawableGroup);


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




/**
 * Storage for drawable objects
 * @public
 */
var DrawableStorage = /** @class */ (function () {
    /**
     * Drawable constructor
     * @param items - batch children to cache
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
         * Stored drawable objects children getter
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
        item.onViewChange(this._subscriberName, function (target, extra) { return _this._observeHelper.processWithMuteHandlers(extra); });
        this._list.push(item);
        this._sort();
        this._observeHelper.processWithMuteHandlers();
    };
    /**
     * {@inheritDoc DrawableStorageInterface.cache}
     */
    DrawableStorage.prototype.addBatch = function (items) {
        var _this = this;
        items.forEach(function (item) {
            item.onViewChange(_this._subscriberName, function (target, extra) { return _this._observeHelper.processWithMuteHandlers(extra); });
            _this._list.push(item);
        });
        this._sort();
        this._observeHelper.processWithMuteHandlers();
    };
    /**
     * Deletes objects found by config from storage
     * @param config - filter config
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
     * @param id - object ID
     */
    DrawableStorage.prototype.deleteById = function (id) {
        var index = this._list.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            var deletedItem = this._list.splice(index, 1)[0];
            deletedItem.offViewChange(this._subscriberName);
            this._observeHelper.processWithMuteHandlers();
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
     * {@inheritDoc DrawableStorageInterface.group}
     */
    DrawableStorage.prototype.group = function (ids) {
        var groupItems = this.delete({ idsOnly: ids });
        var minPosition = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.getMinPosition)(groupItems.map(function (item) { return item.config.position; }));
        var maxPosition = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.getMaxPosition)(groupItems.map(function (item) {
            return (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(item.config.position)
                .add((0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(item.config.size))
                .toArray();
        }));
        var groupSize = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(maxPosition).sub((0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(minPosition)).toArray();
        var groupZIndex = Math.max.apply(Math, groupItems.map(function (item) { return item.config.zIndex; })) + 1;
        var config = {
            position: minPosition,
            size: groupSize,
            zIndex: groupZIndex,
            visible: true,
        };
        var groupId = 'group-' + (new Date()).getTime() + '-' + Math.floor(Math.random() * 100000);
        var group = new _drawable_positional_drawable_group__WEBPACK_IMPORTED_MODULE_3__["default"](groupId, config, {}, groupItems);
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
        console.log('sort');
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
    function Drawable(id, config, data) {
        if (data === void 0) { data = {}; }
        var _this = this;
        this._id = id;
        this._observeHelper = new _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
     * @param children - children of grouped objects
     */
    function PositionalDrawableGroup(id, config, data, children) {
        if (data === void 0) { data = {}; }
        if (children === void 0) { children = []; }
        var _this = _super.call(this, id, config, data, children) || this;
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
    PositionalDrawableGroup.prototype.boundIncludes = function (coords) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isPositional)(child)
                && child.boundIncludes((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsForward)(coords, this._config.position))) {
                return true;
            }
        }
        return false;
    };
    /**
     * {@inheritDoc DrawableInterface.isNearBoundEdge}
     */
    PositionalDrawableGroup.prototype.isNearBoundEdge = function (coords, deviation) {
        return this.bound.isNearEdge((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsForward)(coords, this._config.position), deviation);
    };
    Object.defineProperty(PositionalDrawableGroup.prototype, "children", {
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
     * Some actions with children before grouping
     */
    PositionalDrawableGroup.prototype._processChildrenToGroup = function (children) {
        var _this = this;
        children.forEach(function (item) {
            item.movePosition((0,_vector__WEBPACK_IMPORTED_MODULE_1__.createVector)(_this._config.position).inverse().toArray());
        });
        return children;
    };
    /**
     * Some actions with children before ungrouping
     */
    PositionalDrawableGroup.prototype._processChildrenToUngroup = function (children) {
        var _this = this;
        children.forEach(function (item) {
            item.movePosition(_this._config.position);
        });
        return children;
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
    function PositionalDrawable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
    PositionalDrawable.prototype.boundIncludes = function (coords) {
        return this.bound.includes((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsForward)(coords, this._config.position));
    };
    /**
     * {@inheritDoc DrawableInterface.isNearBoundEdge}
     */
    PositionalDrawable.prototype.isNearBoundEdge = function (coords, deviation) {
        return this.bound.isNearEdge((0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsForward)(coords, this._config.position), deviation);
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

/***/ "./src/canvas/structs/filters/grid-filter.ts":
/*!***************************************************!*\
  !*** ./src/canvas/structs/filters/grid-filter.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Filter coords using grid
 */
var GridFilter = /** @class */ (function () {
    function GridFilter() {
    }
    /**
     * {@inheritDoc CoordsFilterInterface.process}
     */
    GridFilter.prototype.process = function (data, config) {
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
    return GridFilter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GridFilter);


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
 * @param precision - percision
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    var mult = Math.pow(10, precision);
    return Math.round(num * mult) / mult;
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
    return [(x - offset[0]) / scale[0], (y - offset[1]) / scale[1]];
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
        if (this._defaultPrecision !== undefined) {
            this._defaultPrecision = defaultPrecision;
        }
    }
    /**
     * Add another vector to this vector
     * @param v - vector to cache
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
     * Returns true if this vector is equal to another vector
     * @param v - another vector
     * @param precision - round precision for comparison
     */
    Vector.prototype.isEqual = function (v, precision) {
        if (precision === void 0) { precision = this._defaultPrecision; }
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
     * Returns distance vector of this and another vector
     * @param v - another vector
     */
    Vector.prototype.distance = function (v) {
        return this.clone().sub(v);
    };
    /**
     * Returns scalar product with another vector
     * @param v - another vector
     */
    Vector.prototype.mulScalar = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    /**
     * Returns length of vector product with another vector
     * @param v - another vector
     */
    Vector.prototype.mulVector = function (v) {
        return this.x * v.y - this.y * v.x;
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
     * Transposes vector forward with offset and scale
     * @param offset - offset
     * @param scale - scale
     */
    Vector.prototype.transposeForward = function (offset, scale) {
        var offsetVector = toVector(offset);
        var scaleVector = toVector(scale);
        this.x = (this.x - offsetVector.x) / scaleVector.x;
        this.y = (this.y - offsetVector.y) / scaleVector.y;
        return this;
    };
    /**
     * Transposes vector backward with offset and scale
     * @param offset - offset
     * @param scale - scale
     */
    Vector.prototype.transposeBackward = function (offset, scale) {
        var offsetVector = toVector(offset);
        var scaleVector = toVector(scale);
        this.x = offsetVector.x + this.x * scaleVector.x;
        this.y = offsetVector.y + this.y * scaleVector.y;
        return this;
    };
    /**
     * Returns new vector by rotating this
     * @param angle - angle to rotate to
     * @param precision - round precision
     */
    Vector.prototype.rotate = function (angle, precision) {
        if (precision === void 0) { precision = this._defaultPrecision; }
        var cs = Math.cos(angle);
        var sn = Math.sin(angle);
        this.x = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.x * cs - this.y * sn, precision);
        this.y = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.round)(this.x * sn + this.y * cs, precision);
        return this;
    };
    /**
     * Get cos with another vector
     * @param v - another vector
     */
    Vector.prototype.getCos = function (v) {
        if (v === void 0) { v = null; }
        if (v === null) {
            v = createVector([1, 0]);
        }
        return this.mulScalar(v) / (this.length * v.length);
    };
    /**
     * Clones vector
     */
    Vector.prototype.clone = function () {
        return createVector(this.toArray());
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
 */
function createVector(coords) {
    return new Vector(coords);
}
/**
 * Converts instance to vector if it's an array
 * @param coords - coords as vector or an array
 */
function toVector(coords) {
    return (coords instanceof Array) ? createVector(coords) : coords;
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
     * {@inheritDoc DrawableStorageInterface.offViewChange}
     */
    ViewConfig.prototype.offViewChange = function (subscriberName) {
        this._observeHelper.offChange(subscriberName);
    };
    /**
     * {@inheritDoc ViewConfigObservableInterface.transposeForward}
     */
    ViewConfig.prototype.transposeForward = function (coords) {
        return (0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsForward)(coords, this._offset, this._scale);
    };
    /**
     * {@inheritDoc ViewConfigObservableInterface.transposeBackward}
     */
    ViewConfig.prototype.transposeBackward = function (coords) {
        return (0,_vector_helpers__WEBPACK_IMPORTED_MODULE_3__.transposeCoordsBackward)(coords, this._offset, this._scale);
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
/* harmony import */ var _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas/figures/rect */ "./src/canvas/figures/rect.ts");
/* harmony import */ var _canvas_structs_drawable_drawable_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas/structs/drawable/drawable-storage */ "./src/canvas/structs/drawable/drawable-storage.ts");
/* harmony import */ var _canvas_structs_view_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas/structs/view-config */ "./src/canvas/structs/view-config.ts");
/* harmony import */ var _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas/figures/grid */ "./src/canvas/figures/grid.ts");
/* harmony import */ var _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvas/figures/svg */ "./src/canvas/figures/svg.ts");






var storage = new _canvas_structs_drawable_drawable_storage__WEBPACK_IMPORTED_MODULE_2__["default"]([
    new _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__["default"](1, {
        zIndex: -Infinity,
        visible: true,
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
        fillStyle: 'green',
        strokeStyle: 'black',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](3, {
        position: [10, 25],
        size: [50, 50],
        zIndex: 1,
        visible: true,
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](4, {
        position: [15 * 30, 15 * 10],
        size: [15 * 10, 15 * 5],
        zIndex: 10,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'red',
        lineWidth: 1,
    }),
    new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__["default"](5, {
        position: [300, 550],
        size: [162, 82],
        zIndex: 1,
        visible: true,
        data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
    }),
    new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__["default"](5, {
        position: [100, 550],
        size: [162, 82],
        zIndex: 1,
        visible: true,
        data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](6, {
        position: [350, 350],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](7, {
        position: [350, 300],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](8, {
        position: [300, 350],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](9, {
        position: [200, 200],
        size: [160, 160],
        zIndex: 0,
        visible: true,
        fillStyle: 'green',
        strokeStyle: 'blue',
        lineWidth: 1,
    }),
]);
var group = storage.group([6, 7, 8, 9]);
console.log(group);
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
// setTimeout(() => {
//   const batch: DrawableInterface[] = [];
//   for (let i=0; i<1000; ++i) {
//     batch.push(new Rect(i+100, {
//       position: [Math.random()*drawer.width, Math.random()*drawer.height],
//       size: [30+Math.random()*100, 30+Math.random()*100],
//       zIndex: 0,
//       visible: true,
//       fillStyle: 'white',
//       strokeStyle: 'green',
//       lineWidth: 1,
//     }));
//   }
//   storage.addBatch(batch);
// }, 30);
setTimeout(function () {
    return;
    var batch = [];
    var data1 = "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>"; // eslint-disable-line
    var data2 = "<svg width='160' height='100' viewBox='0 0 160 100' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse fill='#c5c6e2' stroke-width='null' stroke-opacity='null' cx='79.886158' cy='87.456573' id='svg_26' rx='79.524073' ry='11.878226' stroke='black'/><rect stroke='black' fill='#c5c6e2' stroke-width='null' stroke-opacity='null' fill-opacity='null' x='0.333864' y='12.489766' width='158.998938' height='75.332903' id='svg_27'/><ellipse fill='#c5c6e2' stroke-width='null' stroke-opacity='null' cx='79.802826' cy='12.457003' id='svg_9' rx='79.524073' ry='11.878226' stroke='black'/><rect fill='#c5c6e2' stroke-width='null' stroke-opacity='0' fill-opacity='null' x='1.083856' y='85.239354' width='157.832294' height='3.666642' id='svg_30' stroke='#000000'/></svg>"; // eslint-disable-line
    var size1 = [162, 82];
    var size2 = [160, 100];
    for (var i = 0; i < 1200; ++i) {
        var randFlag = Math.random() > 0.5;
        batch.push(new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__["default"](i + 100, {
            position: [Math.random() * drawer.width, Math.random() * drawer.height],
            size: randFlag ? size1 : size2,
            data: randFlag ? data1 : data2,
            zIndex: 0,
            visible: true,
        }));
    }
    storage.addBatch(batch);
}, 1000);
// setTimeout(() => {
//   storage.delete({
//     typesExclude: ['Grid'],
//     extraFilter: item => item.config.zIndex === 0,
//   });
//   storage.add(new Rect(50, {
//     position: [100, 25],
//     size: [50, 30],
//     zIndex: 1,
//     visible: true,
//     fillStyle: 'red',
//     strokeStyle: 'black',
//     lineWidth: 3,
//   }));
// }, 1000);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRTtRQUN6QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBRXJDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSwyREFBRyxDQUFDLENBQUMsR0FBQyxHQUFHLEVBQUU7WUFDeEIsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbkUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzlCLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSztZQUM5QixNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDLENBQUM7S0FDTDtJQUNELE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRVQscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQiw4QkFBOEI7QUFDOUIscURBQXFEO0FBQ3JELFFBQVE7QUFDUiwrQkFBK0I7QUFDL0IsMkJBQTJCO0FBQzNCLHNCQUFzQjtBQUN0QixpQkFBaUI7QUFDakIscUJBQXFCO0FBQ3JCLHdCQUF3QjtBQUN4Qiw0QkFBNEI7QUFDNUIsb0JBQW9CO0FBQ3BCLFNBQVM7QUFDVCxZQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9jb3JlLmpzIiwid2VicGFjazovL2NhbnZhcy10cy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvbWQ1LmpzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZHJhd2VyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9ncmlkLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9yZWN0LnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9zdmcudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9oZWxwZXJzL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9oZWxwZXJzL2N1cnJlbnQtZWxlbWVudC1tYW5hZ2VyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvaGVscGVycy9pbWFnZS1jYWNoZS1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9oZWxwZXJzL29ic2VydmUtaGVscGVyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvaGVscGVycy90eXBlLWhlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2JvdW5kcy9yZWN0YW5ndWxhci1ib3VuZC50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvZHJhd2FibGUvZHJhd2FibGUtZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlL2RyYXdhYmxlLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlL2RyYXdhYmxlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlLWdyb3VwLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9maWx0ZXJzL2dyaWQtZmlsdGVyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9pbWFnZS1jYWNoZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmVjdG9yL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZlY3Rvci9pbmRleC50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmVjdG9yL3Bvc2l0aW9uYWwtdmVjdG9yLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy92ZWN0b3IvdmVjdG9yLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy92aWV3LWNvbmZpZy50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvaWdub3JlZHwvaG9tZS9zbW9yZW4vcHJvamVjdHMvY2FudmFzL25vZGVfbW9kdWxlcy9jcnlwdG8tanN8Y3J5cHRvIiwid2VicGFjazovL2NhbnZhcy10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKmdsb2JhbHMgd2luZG93LCBnbG9iYWwsIHJlcXVpcmUqL1xuXG5cdC8qKlxuXHQgKiBDcnlwdG9KUyBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHR2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCAoZnVuY3Rpb24gKE1hdGgsIHVuZGVmaW5lZCkge1xuXG5cdCAgICB2YXIgY3J5cHRvO1xuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd2luZG93IChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGluIHdlYiB3b3JrZXIgKEJyb3dzZXIpXG5cdCAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gc2VsZi5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSB3b3JrZXJcblx0ICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWxUaGlzLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIChleHBlcmltZW50YWwgSUUgMTEpIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5tc0NyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHdpbmRvdy5tc0NyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIGdsb2JhbCAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IGdsb2JhbC5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gaW1wb3J0IHZpYSByZXF1aXJlIChOb2RlSlMpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgIH1cblxuXHQgICAgLypcblx0ICAgICAqIENyeXB0b2dyYXBoaWNhbGx5IHNlY3VyZSBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvclxuXHQgICAgICpcblx0ICAgICAqIEFzIE1hdGgucmFuZG9tKCkgaXMgY3J5cHRvZ3JhcGhpY2FsbHkgbm90IHNhZmUgdG8gdXNlXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcnlwdG9TZWN1cmVSYW5kb21JbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKGNyeXB0bykge1xuXHQgICAgICAgICAgICAvLyBVc2UgZ2V0UmFuZG9tVmFsdWVzIG1ldGhvZCAoQnJvd3Nlcilcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgxKSlbMF07XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBVc2UgcmFuZG9tQnl0ZXMgbWV0aG9kIChOb2RlSlMpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLnJhbmRvbUJ5dGVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoNCkucmVhZEludDMyTEUoKTtcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcignTmF0aXZlIGNyeXB0byBtb2R1bGUgY291bGQgbm90IGJlIHVzZWQgdG8gZ2V0IHNlY3VyZSByYW5kb20gbnVtYmVyLicpO1xuXHQgICAgfTtcblxuXHQgICAgLypcblx0ICAgICAqIExvY2FsIHBvbHlmaWxsIG9mIE9iamVjdC5jcmVhdGVcblxuXHQgICAgICovXG5cdCAgICB2YXIgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuXG5cdCAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcblx0ICAgICAgICAgICAgdmFyIHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvYmo7XG5cblx0ICAgICAgICAgICAgc3VidHlwZSA9IG5ldyBGKCk7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBudWxsO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIENyeXB0b0pTIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMaWJyYXJ5IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfbGliID0gQy5saWIgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlIG9iamVjdCBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlID0gKGZ1bmN0aW9uICgpIHtcblxuXG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBQcm9wZXJ0aWVzIHRvIGNvcHkgaW50byB0aGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNwYXduXG5cdCAgICAgICAgICAgICAgICB2YXIgc3VidHlwZSA9IGNyZWF0ZSh0aGlzKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQXVnbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUubWl4SW4ob3ZlcnJpZGVzKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgaW5pdGlhbGl6ZXJcblx0ICAgICAgICAgICAgICAgIGlmICghc3VidHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5pdCcpIHx8IHRoaXMuaW5pdCA9PT0gc3VidHlwZS5pbml0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZXIncyBwcm90b3R5cGUgaXMgdGhlIHN1YnR5cGUgb2JqZWN0XG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQucHJvdG90eXBlID0gc3VidHlwZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIHN1cGVydHlwZVxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIgPSB0aGlzO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRXh0ZW5kcyB0aGlzIG9iamVjdCBhbmQgcnVucyB0aGUgaW5pdCBtZXRob2QuXG5cdCAgICAgICAgICAgICAqIEFyZ3VtZW50cyB0byBjcmVhdGUoKSB3aWxsIGJlIHBhc3NlZCB0byBpbml0KCkuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBpbnN0YW5jZSA9IE15VHlwZS5jcmVhdGUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5leHRlbmQoKTtcblx0ICAgICAgICAgICAgICAgIGluc3RhbmNlLmluaXQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG9iamVjdC5cblx0ICAgICAgICAgICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHNvbWUgbG9naWMgd2hlbiB5b3VyIG9iamVjdHMgYXJlIGNyZWF0ZWQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgICAgIC8vIC4uLlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBpbnRvIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0byBtaXggaW4uXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBNeVR5cGUubWl4SW4oe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnXG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIG1peEluOiBmdW5jdGlvbiAocHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElFIHdvbid0IGNvcHkgdG9TdHJpbmcgdXNpbmcgdGhlIGxvb3AgYWJvdmVcblx0ICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0b1N0cmluZycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IHByb3BlcnRpZXMudG9TdHJpbmc7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGluc3RhbmNlLmNsb25lKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10pO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgd29yZCBhcnJheSB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciAoT3B0aW9uYWwpIFRoZSBlbmNvZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IENyeXB0b0pTLmVuYy5IZXhcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGVuY29kZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChlbmNvZGVyIHx8IEhleCkuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25jYXRlbmF0ZXMgYSB3b3JkIGFycmF5IHRvIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbmNhdDogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHRoaXNXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0V29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGlzU2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb25jYXRcblx0ICAgICAgICAgICAgaWYgKHRoaXNTaWdCeXRlcyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIGJ5dGUgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXRCeXRlID0gKHRoYXRXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gfD0gdGhhdEJ5dGUgPDwgKDI0IC0gKCh0aGlzU2lnQnl0ZXMgKyBpKSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSB3b3JkIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGF0U2lnQnl0ZXM7IGogKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaikgPj4+IDJdID0gdGhhdFdvcmRzW2ogPj4+IDJdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgKz0gdGhhdFNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsYW1wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wXG5cdCAgICAgICAgICAgIHdvcmRzW3NpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtIChzaWdCeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIHdvcmRzLmxlbmd0aCA9IE1hdGguY2VpbChzaWdCeXRlcyAvIDQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgd29yZCBhcnJheSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbkJ5dGVzIFRoZSBudW1iZXIgb2YgcmFuZG9tIGJ5dGVzIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbSgxNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmFuZG9tOiBmdW5jdGlvbiAobkJ5dGVzKSB7XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkJ5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goY3J5cHRvU2VjdXJlUmFuZG9tSW50KCkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbkJ5dGVzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBFbmNvZGVyIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBIZXggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkhleC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGhleENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgJiAweDBmKS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhleENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleFN0ciBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChoZXhTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhleFN0ckxlbmd0aCA9IGhleFN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gM10gfD0gcGFyc2VJbnQoaGV4U3RyLnN1YnN0cihpLCAyKSwgMTYpIDw8ICgyNCAtIChpICUgOCkgKiA0KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGF0aW4xIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgTGF0aW4xID0gQ19lbmMuTGF0aW4xID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGxhdGluMVN0cmluZyA9IENyeXB0b0pTLmVuYy5MYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgTGF0aW4xIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF0aW4xU3RyIFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5MYXRpbjEucGFyc2UobGF0aW4xU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGxhdGluMVN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGluMVN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBsYXRpbjFTdHJMZW5ndGgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmOCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmOFN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmOFN0ciBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmOFN0cikge1xuXHQgICAgICAgICAgICByZXR1cm4gTGF0aW4xLnBhcnNlKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh1dGY4U3RyKSkpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYnVmZmVyZWQgYmxvY2sgYWxnb3JpdGhtIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIFRoZSBwcm9wZXJ0eSBibG9ja1NpemUgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbiBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9taW5CdWZmZXJTaXplIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgc2hvdWxkIGJlIGtlcHQgdW5wcm9jZXNzZWQgaW4gdGhlIGJ1ZmZlci4gRGVmYXVsdDogMFxuXHQgICAgICovXG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgZGF0YSBidWZmZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheS5pbml0KCk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIG5ldyBkYXRhIHRvIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgYnVmZmVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGFwcGVuZC4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGEgV29yZEFycmF5IHVzaW5nIFVURi04LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEuY29uY2F0KGRhdGEpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzICs9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFByb2Nlc3NlcyBhdmFpbGFibGUgZGF0YSBibG9ja3MuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwcm9jZXNzZWQgZGF0YS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcyghISdmbHVzaCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkV29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgcHJvY2Vzc2VkV29yZHMgPSBkYXRhV29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gbkJ5dGVzUmVhZHk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsIG5CeXRlc1JlYWR5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWluQnVmZmVyU2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgaGFzaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBoYXNoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDE2ICg1MTIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaGVyID0gQ3J5cHRvSlMuYWxnby5TSEEyNTYuY3JlYXRlKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBoYXNoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBoYXNoZXIgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SGFzaGVyfSBUaGlzIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFzaFxuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBtZXNzYWdlIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNTEyLzMyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIFNIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGNmZykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZSBpbiB0aGlzIEhNQUMgaGVscGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEhtYWNTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDX2FsZ28uSE1BQy5pbml0KGhhc2hlciwga2V5KS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbGdvcml0aG0gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvID0ge307XG5cblx0ICAgIHJldHVybiBDO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gQ29uc3RhbnRzIHRhYmxlXG5cdCAgICB2YXIgVCA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcblx0ICAgICAgICAgICAgVFtpXSA9IChNYXRoLmFicyhNYXRoLnNpbihpICsgMSkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIE1ENSBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIE1ENSA9IENfYWxnby5NRDUgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIDB4Njc0NTIzMDEsIDB4ZWZjZGFiODksXG5cdCAgICAgICAgICAgICAgICAweDk4YmFkY2ZlLCAweDEwMzI1NDc2XG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBvZmZzZXRfaSA9IG9mZnNldCArIGk7XG5cdCAgICAgICAgICAgICAgICB2YXIgTV9vZmZzZXRfaSA9IE1bb2Zmc2V0X2ldO1xuXG5cdCAgICAgICAgICAgICAgICBNW29mZnNldF9pXSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDgpICB8IChNX29mZnNldF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgMjQpIHwgKE1fb2Zmc2V0X2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzAgID0gTVtvZmZzZXQgKyAwXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEgID0gTVtvZmZzZXQgKyAxXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzIgID0gTVtvZmZzZXQgKyAyXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzMgID0gTVtvZmZzZXQgKyAzXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzQgID0gTVtvZmZzZXQgKyA0XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzUgID0gTVtvZmZzZXQgKyA1XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzYgID0gTVtvZmZzZXQgKyA2XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzcgID0gTVtvZmZzZXQgKyA3XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzggID0gTVtvZmZzZXQgKyA4XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzkgID0gTVtvZmZzZXQgKyA5XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEwID0gTVtvZmZzZXQgKyAxMF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMSA9IE1bb2Zmc2V0ICsgMTFdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTIgPSBNW29mZnNldCArIDEyXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEzID0gTVtvZmZzZXQgKyAxM107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xNCA9IE1bb2Zmc2V0ICsgMTRdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTUgPSBNW29mZnNldCArIDE1XTtcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhbGJlc1xuXHQgICAgICAgICAgICB2YXIgYSA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBiID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIGMgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgZCA9IEhbM107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzAsICA3LCAgVFswXSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF8xLCAgMTIsIFRbMV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMiwgIDE3LCBUWzJdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzMsICAyMiwgVFszXSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF80LCAgNywgIFRbNF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfNSwgIDEyLCBUWzVdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzYsICAxNywgVFs2XSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF83LCAgMjIsIFRbN10pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfOCwgIDcsICBUWzhdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzksICAxMiwgVFs5XSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8xMCwgMTcsIFRbMTBdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzExLCAyMiwgVFsxMV0pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTIsIDcsICBUWzEyXSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF8xMywgMTIsIFRbMTNdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE0LCAxNywgVFsxNF0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTUsIDIyLCBUWzE1XSk7XG5cblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEsICA1LCAgVFsxNl0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfNiwgIDksICBUWzE3XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8xMSwgMTQsIFRbMThdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzAsICAyMCwgVFsxOV0pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfNSwgIDUsICBUWzIwXSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8xMCwgOSwgIFRbMjFdKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE1LCAxNCwgVFsyMl0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfNCwgIDIwLCBUWzIzXSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF85LCAgNSwgIFRbMjRdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzE0LCA5LCAgVFsyNV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMywgIDE0LCBUWzI2XSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF84LCAgMjAsIFRbMjddKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEzLCA1LCAgVFsyOF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMiwgIDksICBUWzI5XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF83LCAgMTQsIFRbMzBdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEyLCAyMCwgVFszMV0pO1xuXG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF81LCAgNCwgIFRbMzJdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzgsICAxMSwgVFszM10pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTEsIDE2LCBUWzM0XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8xNCwgMjMsIFRbMzVdKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEsICA0LCAgVFszNl0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfNCwgIDExLCBUWzM3XSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF83LCAgMTYsIFRbMzhdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEwLCAyMywgVFszOV0pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTMsIDQsICBUWzQwXSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF8wLCAgMTEsIFRbNDFdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzMsICAxNiwgVFs0Ml0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfNiwgIDIzLCBUWzQzXSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF85LCAgNCwgIFRbNDRdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEyLCAxMSwgVFs0NV0pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTUsIDE2LCBUWzQ2XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8yLCAgMjMsIFRbNDddKTtcblxuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfMCwgIDYsICBUWzQ4XSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF83LCAgMTAsIFRbNDldKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE0LCAxNSwgVFs1MF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfNSwgIDIxLCBUWzUxXSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF8xMiwgNiwgIFRbNTJdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzMsICAxMCwgVFs1M10pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTAsIDE1LCBUWzU0XSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF8xLCAgMjEsIFRbNTVdKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzgsICA2LCAgVFs1Nl0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTUsIDEwLCBUWzU3XSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF82LCAgMTUsIFRbNThdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEzLCAyMSwgVFs1OV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfNCwgIDYsICBUWzYwXSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8xMSwgMTAsIFRbNjFdKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzIsICAxNSwgVFs2Ml0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfOSwgIDIxLCBUWzYzXSk7XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWxIID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbEwgPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxIIDw8IDgpICB8IChuQml0c1RvdGFsSCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxIIDw8IDI0KSB8IChuQml0c1RvdGFsSCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gKFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEwgPDwgOCkgIHwgKG5CaXRzVG90YWxMID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEwgPDwgMjQpIHwgKG5CaXRzVG90YWxMID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblxuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gKGRhdGFXb3Jkcy5sZW5ndGggKyAxKSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2hhc2g7XG5cdCAgICAgICAgICAgIHZhciBIID0gaGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBIX2kgPSBIW2ldO1xuXG5cdCAgICAgICAgICAgICAgICBIW2ldID0gKCgoSF9pIDw8IDgpICB8IChIX2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoSF9pIDw8IDI0KSB8IChIX2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBGRihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKChiICYgYykgfCAofmIgJiBkKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBHRyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKChiICYgZCkgfCAoYyAmIH5kKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBISChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBJSShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuTUQ1KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5NRDUod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5NRDUgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihNRDUpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY01ENShtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNNRDUgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoTUQ1KTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuTUQ1O1xuXG59KSk7IiwiaW1wb3J0IHtcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBEcmF3ZXJDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxuICBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSwgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBpbWFnZUNhY2hlSGVscGVyIGZyb20gJy4vaGVscGVycy9pbWFnZS1jYWNoZS1oZWxwZXInO1xuaW1wb3J0IHsgaXNQb3NpdGlvbmFsIH0gZnJvbSAnLi9oZWxwZXJzL3R5cGUtaGVscGVycyc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuL3N0cnVjdHMvdmVjdG9yJztcbmltcG9ydCBHcmlkRmlsdGVyIGZyb20gJy4vc3RydWN0cy9maWx0ZXJzL2dyaWQtZmlsdGVyJztcbmltcG9ydCBDdXJyZW50RWxlbWVudE1hbmFnZXIgZnJvbSAnLi9oZWxwZXJzL2N1cnJlbnQtZWxlbWVudC1tYW5hZ2VyJztcblxuLyoqXG4gKiBDYW52YXMgZHJhd2VyXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdlciBpbXBsZW1lbnRzIERyYXdlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdlcic7XG4gIC8qKlxuICAgKiBDYW52YXMgRE9NIGVsZW1lbnRcbiAgICovXG4gIHByb3RlY3RlZCBfZG9tRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF92aWV3Q29uZmlnOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZTtcbiAgLyoqXG4gICAqIERyYXdhYmxlIG9iamVjdHMgc3RvcmFnZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9zdG9yYWdlOiBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBDYW52YXMgZHJhd2luZyBjb250ZXh0XG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgLyoqXG4gICAqIFJlc2l6ZSBvYnNlcnZlciBvYmplY3RcbiAgICovXG4gIHByb3RlY3RlZCBfcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyO1xuXG4gIC8qKlxuICAgKiBEcmF3ZXIgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGRvbUVsZW1lbnQgLSBjYW52YXMgRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHZpZXdDb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gc3RvcmFnZSAtIGRyYXdhYmxlIG9iamVjdHMgc3RvcmFnZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioe1xuICAgIGRvbUVsZW1lbnQsXG4gICAgdmlld0NvbmZpZyxcbiAgICBzdG9yYWdlLFxuICB9OiBEcmF3ZXJDb25maWdJbnRlcmZhY2UpIHtcbiAgICB0aGlzLl9kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcbiAgICB0aGlzLl92aWV3Q29uZmlnID0gdmlld0NvbmZpZztcbiAgICB0aGlzLl9zdG9yYWdlID0gc3RvcmFnZTtcbiAgICB0aGlzLl9jb250ZXh0ID0gZG9tRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgdGhpcy5faW5pdFJlc2l6ZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdFZpZXdDb25maWdPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRTdG9yYWdlT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9pbml0SW1hZ2VDYWNoZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdE1vdXNlRXZlbnRzKCk7XG5cbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdygpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZSguLi50aGlzLl92aWV3Q29uZmlnLm9mZnNldCk7XG4gICAgdGhpcy5fY29udGV4dC5zY2FsZSguLi50aGlzLl92aWV3Q29uZmlnLnNjYWxlKTtcbiAgICB0aGlzLl9zdG9yYWdlLmxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uY29uZmlnLnZpc2libGUpIHtcbiAgICAgICAgaXRlbS5kcmF3KHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3ZXJJbnRlcmZhY2UucmVmcmVzaH1cbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kb21FbGVtZW50LndpZHRoICE9PSB0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LndpZHRoID0gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZG9tRWxlbWVudC5oZWlnaHQgIT09IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdyZWZyZXNoZWQnKTtcblxuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLmNsZWFyfVxuICAgKi9cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJvdW5kcyBvZiBjYW52YXMgZnJhbWVcbiAgICovXG4gIHB1YmxpYyBnZXRCb3VuZHMoKTogW1ZlY3RvckFycmF5VHlwZSwgVmVjdG9yQXJyYXlUeXBlXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX3ZpZXdDb25maWcudHJhbnNwb3NlRm9yd2FyZChbMCwgMF0pLFxuICAgICAgdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF0pLFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBnZXQgdmlld0NvbmZpZygpOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogQ2FudmFzIGNvbnRleHQgZ2V0dGVyXG4gICAqL1xuICBnZXQgY29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyB3aWR0aCBnZXR0ZXJcbiAgICovXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyBoZWlnaHQgZ2V0dGVyXG4gICAqL1xuICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBjYW52YXMgcmVzaXplIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRSZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9kb21FbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdmlldyBjb25maWcgb2JzZXJ2ZXJcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdFZpZXdDb25maWdPYnNlcnZlcigpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3Q29uZmlnLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBzdG9yYWdlIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRTdG9yYWdlT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmFnZS5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgaW1hZ2UgY2FjaGUgb2JzZXJ2ZXJcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdEltYWdlQ2FjaGVPYnNlcnZlcigpOiB2b2lkIHtcbiAgICBpbWFnZUNhY2hlSGVscGVyLnN1YnNjcmliZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKCkgPT4ge1xuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIG1vdXNlIGV2ZW50cyBvYnNlcnZlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0TW91c2VFdmVudHMoKTogdm9pZCB7XG4gICAgLy8gVE9ETyDQv9C10YDQtdC90LXRgdGC0Lgg0LrRg9C00LAt0L3QuNCx0YPQtNGMXG5cbiAgICBjb25zdCBjb29yZHNGaWx0ZXIgPSBuZXcgR3JpZEZpbHRlcigpO1xuICAgIGNvbnN0IGZpbHRlckNvb3JkcyA9IChjb29yZHM6IFZlY3RvckFycmF5VHlwZSkgPT4ge1xuICAgICAgcmV0dXJuIGNvb3Jkc0ZpbHRlci5wcm9jZXNzKGNvb3Jkcywge1xuICAgICAgICBzY2FsZTogdGhpcy5fdmlld0NvbmZpZy5zY2FsZSxcbiAgICAgICAgb2Zmc2V0OiB0aGlzLl92aWV3Q29uZmlnLm9mZnNldCxcbiAgICAgICAgZ3JpZFN0ZXA6IHRoaXMuX3ZpZXdDb25maWcuZ3JpZFN0ZXAsXG4gICAgICAgIGJvdW5kczogdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBjdXJyZW50RWxlbWVudE1hbmFnZXIgPSBuZXcgQ3VycmVudEVsZW1lbnRNYW5hZ2VyKHRoaXMsIHRoaXMuX3N0b3JhZ2UpO1xuXG4gICAgY29uc3QgREVWSUFUSU9OID0gODtcbiAgICBjb25zdCBnZXROZWFyQm91bmRFbGVtZW50ID0gKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHwgbnVsbCA9PiB7XG4gICAgICAvLyBUT0RPINC/0YDQvtCx0LvQtdC80LAsINC60L7Qs9C00LAg0L3QsCDRhNC40LPRg9GA0YMg0L3QsNC60LvQsNC00YvQstCw0LXRgtGB0Y8g0LTRgNGD0LPQsNGPINGE0LjQs9GD0YDQsFxuICAgICAgY29uc3QgdHJhbnNwb3NlZENvb3JkczogVmVjdG9yQXJyYXlUeXBlID0gdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKGNvb3Jkcyk7XG5cbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9zdG9yYWdlLmxpc3Q7XG4gICAgICBmb3IgKGxldCBpPWxpc3QubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgICAgICBjb25zdCBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgLy8gVE9ETyBtYXliZSBvbmx5IHZpc2libGU/XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc1Bvc2l0aW9uYWwoaXRlbSlcbiAgICAgICAgICAmJiAoaXRlbSBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UpXG4gICAgICAgICAgICAuaXNOZWFyQm91bmRFZGdlKHRyYW5zcG9zZWRDb29yZHMsIERFVklBVElPTiAvIHRoaXMuX3ZpZXdDb25maWcuc2NhbGVbMF0pXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAoaXRlbSBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgKGV2ZW50OiBXaGVlbEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQuY3RybEtleSkge1xuICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLl92aWV3Q29uZmlnLnNjYWxlWzBdO1xuICAgICAgICBzY2FsZSArPSBldmVudC5kZWx0YVkgKiAtMC4wMDI7XG4gICAgICAgIHNjYWxlID0gTWF0aC5taW4oTWF0aC5tYXgoMC4wMDEsIHNjYWxlKSwgMTAwKTtcbiAgICAgICAgdGhpcy5fdmlld0NvbmZpZy51cGRhdGVTY2FsZUluQ3Vyc29yQ29udGV4dChbc2NhbGUsIHNjYWxlXSwgW2V2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFldKTtcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgdGhpcy5fdmlld0NvbmZpZy5vZmZzZXRbMF0gLT0gZXZlbnQuZGVsdGFZO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdmlld0NvbmZpZy5vZmZzZXRbMV0gLT0gZXZlbnQuZGVsdGFZO1xuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgbGV0IG1vdXNlRG93bkNvb3JkczogVmVjdG9yQXJyYXlUeXBlIHwgbnVsbCA9IG51bGw7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgaWYgKCFjdXJyZW50RWxlbWVudE1hbmFnZXIuZm91bmQoKSkge1xuICAgICAgICBjdXJyZW50RWxlbWVudE1hbmFnZXIuc2VhcmNoKFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXSk7XG4gICAgICB9XG5cbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBtb3VzZU1vdmVDb29yZHM6IFZlY3RvckFycmF5VHlwZSA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcblxuICAgICAgaWYgKG1vdXNlRG93bkNvb3JkcyA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZ2V0TmVhckJvdW5kRWxlbWVudChtb3VzZU1vdmVDb29yZHMpICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudE1hbmFnZXIuZm91bmQoKSkge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudEVsZW1lbnRNYW5hZ2VyLmZvdW5kKCkpIHtcbiAgICAgICAgY29uc3QgdHJhbnNwb3NlZENvb3JkcyA9IHRoaXMudmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKG1vdXNlTW92ZUNvb3Jkcyk7XG4gICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gY3JlYXRlVmVjdG9yKHRyYW5zcG9zZWRDb29yZHMpXG4gICAgICAgICAgLnN1YihjcmVhdGVWZWN0b3IoY3VycmVudEVsZW1lbnRNYW5hZ2VyLnBvc2l0aW9uKSlcbiAgICAgICAgICAudG9BcnJheSgpO1xuXG4gICAgICAgIGN1cnJlbnRFbGVtZW50TWFuYWdlci5lbGVtZW50LmNvbmZpZy5wb3NpdGlvbiA9IGZpbHRlckNvb3JkcyhuZXdQb3NpdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkaWZmZXJlbmNlOiBWZWN0b3JBcnJheVR5cGUgPSBbXG4gICAgICAgICAgbW91c2VEb3duQ29vcmRzWzBdLW1vdXNlTW92ZUNvb3Jkc1swXSxcbiAgICAgICAgICBtb3VzZURvd25Db29yZHNbMV0tbW91c2VNb3ZlQ29vcmRzWzFdLFxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0ID0gY3JlYXRlVmVjdG9yKHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0KVxuICAgICAgICAgIC5zdWIoY3JlYXRlVmVjdG9yKGRpZmZlcmVuY2UpKVxuICAgICAgICAgIC50b0FycmF5KCk7XG4gICAgICB9XG5cbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IG1vdXNlTW92ZUNvb3JkcztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIGlmIChjdXJyZW50RWxlbWVudE1hbmFnZXIuZm91bmQoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50RWxlbWVudE1hbmFnZXIuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRFbGVtZW50TWFuYWdlci5sb3NlKCk7XG4gICAgICBtb3VzZURvd25Db29yZHMgPSBudWxsO1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG4gIFZlY3RvckFycmF5VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gJy4uL3N0cnVjdHMvZHJhd2FibGUvZHJhd2FibGUnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIGdyaWRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkQ29uZmlnSW50ZXJmYWNlIGV4dGVuZHMgRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICBtYWluTGluZUNvbG9yOiBzdHJpbmc7XG4gIHN1YkxpbmVDb2xvcjogc3RyaW5nO1xuICBsaW5lV2lkdGg6IG51bWJlcjtcbiAgbGluZXNJbkJsb2NrOiBudW1iZXI7XG59XG5cbi8qKlxuICogR3JpZCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ0dyaWQnO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBHcmlkQ29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBHcmlkIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKi9cbiAgY29uc3RydWN0b3IoaWQ6IERyYXdhYmxlSWRUeXBlLCBjb25maWc6IEdyaWRDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBkcmF3ZXIuY29udGV4dC5zYXZlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICBjb25zdCBbZnJvbUJvdW5kLCB0b0JvdW5kXSA9IGRyYXdlci5nZXRCb3VuZHMoKTtcbiAgICBjb25zdCBzY2FsZSA9IGRyYXdlci52aWV3Q29uZmlnLnNjYWxlWzBdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5fY29uZmlnLmxpbmVXaWR0aCAvIHNjYWxlO1xuXG4gICAgbGV0IHN0ZXAgPSBkcmF3ZXIudmlld0NvbmZpZy5ncmlkU3RlcDtcblxuICAgIGlmIChzY2FsZSA8IDEpIHtcbiAgICAgIHN0ZXAgKj0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMigxIC8gc2NhbGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RlcCAvPSAyICoqIE1hdGgucm91bmQoTWF0aC5sb2cyKHNjYWxlKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFpbkxpbmVEaXN0YW5jZSA9IHN0ZXAgKiB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrO1xuICAgIGxldCB4R2FwID0gKGZyb21Cb3VuZFswXSAlIG1haW5MaW5lRGlzdGFuY2UpO1xuICAgIGlmICh4R2FwIDwgMCkge1xuICAgICAgeEdhcCArPSBtYWluTGluZURpc3RhbmNlO1xuICAgIH1cbiAgICBsZXQgeUdhcCA9IChmcm9tQm91bmRbMV0gJSBtYWluTGluZURpc3RhbmNlKTtcbiAgICBpZiAoeUdhcCA8IDApIHtcbiAgICAgIHlHYXAgKz0gbWFpbkxpbmVEaXN0YW5jZTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBsZXQgaiA9IDA7XG4gICAgICBmb3IgKGxldCBpPWZyb21Cb3VuZFsxXS15R2FwOyBpPD10b0JvdW5kWzFdOyBpKz1zdGVwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKGorKyAlIHRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2sgPT09IDApXG4gICAgICAgICAgPyB0aGlzLl9jb25maWcubWFpbkxpbmVDb2xvclxuICAgICAgICAgIDogdGhpcy5fY29uZmlnLnN1YkxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fZHJhd0hvcml6b250YWxMaW5lKGksIGRyYXdlciwgY29sb3IsIFtmcm9tQm91bmQsIHRvQm91bmRdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBsZXQgaiA9IDA7XG4gICAgICBmb3IgKGxldCBpPWZyb21Cb3VuZFswXS14R2FwOyBpPD10b0JvdW5kWzBdOyBpKz1zdGVwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKGorKyAlIHRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2sgPT09IDApXG4gICAgICAgICAgPyB0aGlzLl9jb25maWcubWFpbkxpbmVDb2xvclxuICAgICAgICAgIDogdGhpcy5fY29uZmlnLnN1YkxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fZHJhd1ZlcnRpY2FsTGluZShpLCBkcmF3ZXIsIGNvbG9yLCBbZnJvbUJvdW5kLCB0b0JvdW5kXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgaG9yaXpvbnRhbCBsaW5lXG4gICAqIEBwYXJhbSB5T2Zmc2V0IC0gdmVydGljYWwgb2Zmc2V0XG4gICAqIEBwYXJhbSBkcmF3ZXIgLSBkcmF3ZXIgb2JqZWN0XG4gICAqIEBwYXJhbSBjb2xvciAtIGNvbG9yXG4gICAqIEBwYXJhbSBmcm9tQm91bmQgLSBsZWZ0LXRvcCBib3VuZFxuICAgKiBAcGFyYW0gdG9Cb3VuZCAtIHJpZ2h0LWJvdHRvbSBib3VuZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kcmF3SG9yaXpvbnRhbExpbmUoXG4gICAgeU9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0sXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW2Zyb21Cb3VuZFswXSwgeU9mZnNldF07XG4gICAgY29uc3QgbGluZVRvID0gW3RvQm91bmRbMF0sIHlPZmZzZXRdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyB2ZXJ0aWNhbCBsaW5lXG4gICAqIEBwYXJhbSBkcmF3ZXIgLSBkcmF3ZXIgb2JqZWN0XG4gICAqIEBwYXJhbSB4T2Zmc2V0IC0gaG9yaXpvbnRhbCBvZmZzZXRcbiAgICogQHBhcmFtIGNvbG9yIC0gY29sb3JcbiAgICogQHBhcmFtIGZyb21Cb3VuZCAtIGxlZnQtdG9wIGJvdW5kXG4gICAqIEBwYXJhbSB0b0JvdW5kIC0gcmlnaHQtYm90dG9tIGJvdW5kXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RyYXdWZXJ0aWNhbExpbmUoXG4gICAgeE9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0sXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW3hPZmZzZXQsIGZyb21Cb3VuZFsxXV07XG4gICAgY29uc3QgbGluZVRvID0gW3hPZmZzZXQsIHRvQm91bmRbMV1dO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBTdHlsaXplZERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFBvc2l0aW9uYWxEcmF3YWJsZSBmcm9tICcuLi9zdHJ1Y3RzL2RyYXdhYmxlL3Bvc2l0aW9uYWwtZHJhd2FibGUnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIHJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVjdENvbmZpZ0ludGVyZmFjZSBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgU3R5bGl6ZWREcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG5cbn1cblxuLyoqXG4gKiBSZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0IGV4dGVuZHMgUG9zaXRpb25hbERyYXdhYmxlIGltcGxlbWVudHMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdSZWN0JztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUmVjdENvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogUmVjdCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBSZWN0Q29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9jb25maWcuc3Ryb2tlU3R5bGU7XG4gICAgZHJhd2VyLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fY29uZmlnLmZpbGxTdHlsZTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLl9jb25maWcubGluZVdpZHRoO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGxSZWN0KC4uLnRoaXMuX2NvbmZpZy5wb3NpdGlvbiwgLi4udGhpcy5fY29uZmlnLnNpemUpO1xuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5saW5lV2lkdGggIT09IDApIHtcbiAgICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVJlY3QoLi4udGhpcy5fY29uZmlnLnBvc2l0aW9uLCAuLi50aGlzLl9jb25maWcuc2l6ZSk7XG4gICAgfVxuXG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSwgVmVjdG9yQXJyYXlUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgUG9zaXRpb25hbERyYXdhYmxlIGZyb20gJy4uL3N0cnVjdHMvZHJhd2FibGUvcG9zaXRpb25hbC1kcmF3YWJsZSc7XG5pbXBvcnQgaW1hZ2VDYWNoZUhlbHBlciBmcm9tICcuLi9oZWxwZXJzL2ltYWdlLWNhY2hlLWhlbHBlcic7XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBjb25maWcgb2YgcmVjdCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdmdDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU1ZHIGRhdGFcbiAgICovXG4gIGRhdGE6IHN0cmluZztcbn1cblxuLyoqXG4gKiBTdmcgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN2ZyBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnU3ZnJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogU3ZnQ29uZmlnSW50ZXJmYWNlO1xuICAvKipcbiAgICogSW1hZ2UgRE9NIGVsZW1lbnRcbiAgICovXG4gIHByb3RlY3RlZCBfaW1nOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFN2ZyBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBTdmdDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90cnlEcmF3KGRyYXdlcikpIHtcbiAgICAgIHRoaXMuX2ltZyA9IGltYWdlQ2FjaGVIZWxwZXIuY2FjaGUodGhpcy5fY29uZmlnLmRhdGEsICdpbWFnZS9zdmcreG1sJywgKGltZykgPT4ge1xuICAgICAgICB0aGlzLl9pbWcgPSBpbWc7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3RyeURyYXcoZHJhd2VyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc291cmNlV2lkdGggZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNvdXJjZVdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ltZy53aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzb3VyY2VIZWlnaHQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNvdXJjZUhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbWcuaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIHNjYWxlIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBzY2FsZSgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLl9jb25maWcuc2l6ZVswXSAvIHRoaXMuc291cmNlV2lkdGgsXG4gICAgICB0aGlzLl9jb25maWcuc2l6ZVsxXSAvIHRoaXMuc291cmNlSGVpZ2h0LFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogVHJpZXMgdG8gZHJhdyB0aGUgZmlndXJlIGlmIHRoZSBpbWFnZSBpcyByZWFkeVxuICAgKiBAcGFyYW0gZHJhd2VyIC0gZHJhd2VyIG9iamVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIF90cnlEcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2ltZyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9jb25maWcucG9zaXRpb247XG4gICAgICBjb25zdCBzY2FsZWRQb3NpdGlvbjogVmVjdG9yQXJyYXlUeXBlID0gW3Bvc2l0aW9uWzBdL3NjYWxlWzBdLCBwb3NpdGlvblsxXS9zY2FsZVsxXV07XG5cbiAgICAgIGRyYXdlci5jb250ZXh0LnNhdmUoKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgZHJhd2VyLmNvbnRleHQuc2NhbGUoLi4uc2NhbGUpO1xuICAgICAgZHJhd2VyLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuX2ltZywgLi4uc2NhbGVkUG9zaXRpb24pO1xuICAgICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICBkcmF3ZXIuY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZGVmYXVsdCBhcyBtZDUgfSBmcm9tICdjcnlwdG8tanMvbWQ1JztcbmltcG9ydCB7IFZlY3RvckFycmF5VHlwZSB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYXJyYXlzIGFyZSBlcXVhbCBhbmQgZmFsc2UgZWxzZVxuICogQHB1YmxpY1xuICogQHBhcmFtIGxocyAtIGZpcnN0IGFycmF5IHRvIGNvbXBhcmVcbiAqIEBwYXJhbSByaHMgLSBzZWNvbmQgYXJyYXkgdG8gY29tcGFyZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJlQXJyYXlzRXF1YWwobGhzOiBBcnJheTx1bmtub3duPiwgcmhzOiBBcnJheTx1bmtub3duPik6IGJvb2xlYW4ge1xuICByZXR1cm4gbGhzLmxlbmd0aCA9PT0gcmhzLmxlbmd0aCAmJiBsaHMuZXZlcnkoKHYsIGkpID0+IHYgPT09IHJoc1tpXSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBET00gZWxlbWVudCBmcm9tIEhUTUwgc3RyaW5nXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gaHRtbFN0cmluZyAtIEhUTUwgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50RnJvbUhUTUwoaHRtbFN0cmluZzogc3RyaW5nKTogdW5rbm93biB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gaHRtbFN0cmluZy50cmltKCk7XG5cbiAgcmV0dXJuIGRpdi5maXJzdENoaWxkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYmxvYiBmcm9tIHRleHRcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBkYXRhIC0gdGV4dFxuICogQHBhcmFtIHR5cGUgLSB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCbG9iKGRhdGE6IHN0cmluZywgdHlwZTogc3RyaW5nKTogQmxvYiB7XG4gIHJldHVybiBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZSB9KTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHVuZGVyc3RhbmRpbmcgbWV0aG9kIGNyZWF0ZU9iamVjdFVSTCgpXG4gKi9cbmludGVyZmFjZSBVcmxJbnRlcmZhY2Uge1xuICBjcmVhdGVPYmplY3RVUkwoYmxvYjogQmxvYik6IHN0cmluZztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIFVSTCBmcm9tIGJsb2JcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBibG9iIC0gYmxvYlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsRnJvbUJsb2IoYmxvYjogQmxvYik6IHN0cmluZyB7XG4gIGNvbnN0IFVSTDogVXJsSW50ZXJmYWNlID0gKHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cpIGFzIFVybEludGVyZmFjZTtcbiAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59XG5cbi8qKlxuICogRmluZHMgYW5kIHJldHVybnMgbWluaW1hbCAobGVmdC10b3ApIHBvc2l0aW9uXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gcG9zaXRpb25zIC0gaW5wdXQgcG9zaXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW5Qb3NpdGlvbihwb3NpdGlvbnM6IFZlY3RvckFycmF5VHlwZVtdKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgbGV0IG1pblg6IG51bWJlciA9IEluZmluaXR5O1xuICBsZXQgbWluWTogbnVtYmVyID0gSW5maW5pdHk7XG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgaWYgKHBvc2l0aW9uWzBdIDwgbWluWCkge1xuICAgICAgbWluWCA9IHBvc2l0aW9uWzBdO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb25bMV0gPCBtaW5ZKSB7XG4gICAgICBtaW5ZID0gcG9zaXRpb25bMV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gW21pblgsIG1pblldO1xufVxuXG4vKipcbiAqIEZpbmRzIGFuZCByZXR1cm5zIG1heGltYWwgKHJpZ2h0LWJvdHRvbSkgcG9zaXRpb25cbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBwb3NpdGlvbnMgLSBpbnB1dCBwb3NpdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1heFBvc2l0aW9uKHBvc2l0aW9uczogVmVjdG9yQXJyYXlUeXBlW10pOiBWZWN0b3JBcnJheVR5cGUge1xuICBsZXQgbWF4WDogbnVtYmVyID0gLUluZmluaXR5O1xuICBsZXQgbWF4WTogbnVtYmVyID0gLUluZmluaXR5O1xuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIGlmIChwb3NpdGlvblswXSA+IG1heFgpIHtcbiAgICAgIG1heFggPSBwb3NpdGlvblswXTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uWzFdID4gbWF4WSkge1xuICAgICAgbWF4WSA9IHBvc2l0aW9uWzFdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFttYXhYLCBtYXhZXTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIE1ENSBoYXNoIGZyb20gc3RyaW5nXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gaW5wdXQgLSBpbnB1dCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc2hTdHJpbmcoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBtZDUoaW5wdXQpLnRvU3RyaW5nKCk7XG59XG4iLCJpbXBvcnQgeyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsIERyYXdlckludGVyZmFjZSwgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLCBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBpc1Bvc2l0aW9uYWwgfSBmcm9tICcuL3R5cGUtaGVscGVycyc7XG5cbi8qKlxuICogQ3VycmVudEVsZW1lbnRNYW5hZ2VyIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnJlbnRFbGVtZW50TWFuYWdlciB7XG4gIHB1YmxpYyBlbGVtZW50OiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3JBcnJheVR5cGUgfCBudWxsID0gbnVsbDtcblxuICBwcm90ZWN0ZWQgX2RyYXdlcjogRHJhd2VySW50ZXJmYWNlO1xuICBwcm90ZWN0ZWQgX3N0b3JhZ2U6IERyYXdhYmxlU3RvcmFnZUludGVyZmFjZTtcblxuICAvKipcbiAgICogQ3VycmVudEVsZW1lbnRNYW5hZ2VyIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBkcmF3ZXIgLSBkcmF3ZXJcbiAgICogQHBhcmFtIHN0b3JhZ2UgLSBzdG9yYWdlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkcmF3ZXI6IERyYXdlckludGVyZmFjZSwgc3RvcmFnZTogRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fZHJhd2VyID0gZHJhd2VyO1xuICAgIHRoaXMuX3N0b3JhZ2UgPSBzdG9yYWdlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaFxuICAgKiBAcGFyYW0gbW91c2VDb29yZHMgLSBtb3VzZSBjb29yZHNcbiAgICovXG4gIHB1YmxpYyBzZWFyY2gobW91c2VDb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IEN1cnJlbnRFbGVtZW50TWFuYWdlciB7XG4gICAgY29uc3QgdHJhbnNwb3NlZENvb3JkczogVmVjdG9yQXJyYXlUeXBlID0gdGhpcy5fZHJhd2VyLnZpZXdDb25maWcudHJhbnNwb3NlRm9yd2FyZChtb3VzZUNvb3Jkcyk7XG5cbiAgICBjb25zdCBsaXN0ID0gdGhpcy5fc3RvcmFnZS5saXN0O1xuICAgIGZvciAobGV0IGk9bGlzdC5sZW5ndGgtMTsgaT49MDsgLS1pKSB7XG4gICAgICBjb25zdCBpdGVtID0gbGlzdFtpXTtcbiAgICAgIC8vIFRPRE8gbWF5YmUgb25seSB2aXNpYmxlP1xuICAgICAgaWYgKGlzUG9zaXRpb25hbChpdGVtKSAmJiAoaXRlbSBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UpLmJvdW5kSW5jbHVkZXModHJhbnNwb3NlZENvb3JkcykpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gKGl0ZW0gYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZWxlbWVudC5nZXRSZWxhdGl2ZVBvc2l0aW9uKHRyYW5zcG9zZWRDb29yZHMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmxvc2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBMb3NlIGVsZW1lbnRcbiAgICovXG4gIHB1YmxpYyBsb3NlKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5wb3NpdGlvbiA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogSWYgZWxlbWVudCBoYXMgYmVlbiBmb3VuZFxuICAgKi9cbiAgcHVibGljIGZvdW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQgIT09IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBJbWFnZUNhY2hlIGZyb20gJy4uL3N0cnVjdHMvaW1hZ2UtY2FjaGUnO1xuXG4vKipcbiAqIEltYWdlIGNhY2hlIGhlbHBlclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBuZXcgSW1hZ2VDYWNoZSgpO1xuIiwiaW1wb3J0IHsgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSwgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBIZWxwZXIgZm9yIG9ic2VydmFibGUgbG9naWNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzZXJ2ZUhlbHBlciBpbXBsZW1lbnRzIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICogSGFuZGxlcnMgbWFwcGVkIGJ5IHN1YnNjcmliZXJzXG4gICAqL1xuICBwcm90ZWN0ZWQgX2hhbmRsZXJNYXA6IFJlY29yZDxzdHJpbmcsIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGU+ID0ge307XG4gIC8qKlxuICAgKiBGbGFnIGZvciBtdXRpbmcgaGFuZGxlcnNcbiAgICovXG4gIHByb3RlY3RlZCBfbXV0ZUhhbmRsZXJzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLm9uQ2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uQ2hhbmdlKFxuICAgIHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsXG4gICAgaGFuZGxlcjogVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5faGFuZGxlck1hcFtzdWJzY3JpYmVyTmFtZV0gPSBoYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLm9mZkNoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLl9oYW5kbGVyTWFwW3N1YnNjcmliZXJOYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5wcm9jZXNzV2l0aE11dGVIYW5kbGVyc31cbiAgICovXG4gIHB1YmxpYyBwcm9jZXNzV2l0aE11dGVIYW5kbGVycyhcbiAgICBleHRyYTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0gbnVsbCxcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4pID0+IHRoaXMucHJvY2Vzc0hhbmRsZXJzKG11dGVkQmVmb3JlLCBleHRyYSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLndpdGhNdXRlSGFuZGxlcnN9XG4gICAqL1xuICBwdWJsaWMgd2l0aE11dGVIYW5kbGVycyhcbiAgICBhY3Rpb246IChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4gdm9pZCxcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX211dGVIYW5kbGVycykge1xuICAgICAgYWN0aW9uKHRydWUsIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tdXRlSGFuZGxlcnMgPSB0cnVlO1xuICAgICAgYWN0aW9uKGZhbHNlLCB0aGlzKTtcbiAgICAgIHRoaXMuX211dGVIYW5kbGVycyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLnByb2Nlc3NIYW5kbGVyc31cbiAgICovXG4gIHB1YmxpYyBwcm9jZXNzSGFuZGxlcnMoXG4gICAgaXNNdXRlZDogYm9vbGVhbixcbiAgICBleHRyYTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gfCBudWxsID0gbnVsbCxcbiAgKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc011dGVkKSB7XG4gICAgICBPYmplY3QudmFsdWVzKHRoaXMuX2hhbmRsZXJNYXApXG4gICAgICAgIC5mb3JFYWNoKChoYW5kbGVyKSA9PiBoYW5kbGVyKHRoaXMsIGV4dHJhKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IERyYXdhYmxlSW50ZXJmYWNlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBpdGVtIGlzIGluc3RhbmNlIG9mIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVxuICogQHNlZSBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VcbiAqIEBwYXJhbSBpdGVtIC0gaXRlbSB0byBjaGVja1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQb3NpdGlvbmFsKGl0ZW06IERyYXdhYmxlSW50ZXJmYWNlKTogYm9vbGVhbiB7XG4gIHJldHVybiAnaXNQb3NpdGlvbmFsJyBpbiBpdGVtO1xufVxuIiwiaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQm91bmRJbnRlcmZhY2UsIFJlY3Rhbmd1bGFyQm91bmRDb25maWcgfSBmcm9tICcuLi8uLi90eXBlcy9ib3VuZCc7XG5pbXBvcnQgeyBjcmVhdGVQb2x5Z29uVmVjdG9ycyB9IGZyb20gJy4uL3ZlY3Rvcic7XG5cbi8qKlxuICogUmVjdGFuZ3VsYXJCb3VuZCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5ndWxhckJvdW5kIGltcGxlbWVudHMgQm91bmRJbnRlcmZhY2Uge1xuICAvKipcbiAgICogQm91bmQgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUmVjdGFuZ3VsYXJCb3VuZENvbmZpZztcblxuICAvKipcbiAgICogUmVjdGFuZ3VsYXJCb3VuZCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29uZmlnIC0gYm91bmQgY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWc6IFJlY3Rhbmd1bGFyQm91bmRDb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEJvdW5kSW50ZXJmYWNlLmluY2x1ZGVzfVxuICAgKi9cbiAgaW5jbHVkZXMoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gY29vcmRzWzBdID49IHRoaXMuX2NvbmZpZy5wb3NpdGlvblswXVxuICAgICAgJiYgY29vcmRzWzBdIDw9IHRoaXMuX2NvbmZpZy5wb3NpdGlvblswXSArIHRoaXMuX2NvbmZpZy5zaXplWzBdXG4gICAgICAmJiBjb29yZHNbMV0gPj0gdGhpcy5fY29uZmlnLnBvc2l0aW9uWzFdXG4gICAgICAmJiBjb29yZHNbMV0gPD0gdGhpcy5fY29uZmlnLnBvc2l0aW9uWzFdICsgdGhpcy5fY29uZmlnLnNpemVbMV07XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEJvdW5kSW50ZXJmYWNlLmlzTmVhckVkZ2V9XG4gICAqL1xuICBpc05lYXJFZGdlKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBkZXZpYXRpb246IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZlY3RvcnMgPSBjcmVhdGVQb2x5Z29uVmVjdG9ycyhbXG4gICAgICBbdGhpcy5fY29uZmlnLnBvc2l0aW9uWzBdLCB0aGlzLl9jb25maWcucG9zaXRpb25bMV1dLFxuICAgICAgW3RoaXMuX2NvbmZpZy5wb3NpdGlvblswXSArIHRoaXMuX2NvbmZpZy5zaXplWzBdLCB0aGlzLl9jb25maWcucG9zaXRpb25bMV1dLFxuICAgICAgW3RoaXMuX2NvbmZpZy5wb3NpdGlvblswXSArIHRoaXMuX2NvbmZpZy5zaXplWzBdLCB0aGlzLl9jb25maWcucG9zaXRpb25bMV0gKyB0aGlzLl9jb25maWcuc2l6ZVsxXV0sXG4gICAgICBbdGhpcy5fY29uZmlnLnBvc2l0aW9uWzBdLCB0aGlzLl9jb25maWcucG9zaXRpb25bMV0gKyB0aGlzLl9jb25maWcuc2l6ZVsxXV0sXG4gICAgXSk7XG5cbiAgICBmb3IgKGNvbnN0IHZlY3RvciBvZiB2ZWN0b3JzKSB7XG4gICAgICBpZiAodmVjdG9yLmdldERpc3RhbmNlVmVjdG9yKGNvb3JkcykubGVuZ3RoIDw9IGRldmlhdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUdyb3VwSW50ZXJmYWNlLFxuICBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBEcmF3YWJsZSBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZSc7XG5pbXBvcnQgRHJhd2FibGVTdG9yYWdlIGZyb20gJy4uL2RyYXdhYmxlL2RyYXdhYmxlLXN0b3JhZ2UnO1xuXG4vKipcbiAqIERyYXdhYmxlIGdyb3VwIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdhYmxlR3JvdXAgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlR3JvdXBJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTmFtZSBvZiBjbGFzcyB0byB1c2UgYXMgc3Vic2NyaWJlciBuYW1lIGluIG9ic2VydmFibGUgbG9naWNcbiAgICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlck5hbWU6IHN0cmluZyA9ICdEcmF3YWJsZUdyb3VwJztcbiAgLyoqXG4gICAqIFN0b3JhZ2Ugb2YgdGhlIGNoaWxkcmVuIG9iamVjdHNcbiAgICovXG4gIHByb3RlY3RlZCBfc3RvcmFnZTogRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBEcmF3YWJsZUdyb3VwIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIGdyb3VwIElEXG4gICAqIEBwYXJhbSBjb25maWcgLSBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBleHRyYSBkYXRhXG4gICAqIEBwYXJhbSBjaGlsZHJlbiAtIGNoaWxkcmVuIG9mIGdyb3VwZWQgb2JqZWN0c1xuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IERyYXdhYmxlSWRUeXBlLFxuICAgIGNvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gICAgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSxcbiAgICBjaGlsZHJlbjogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdLFxuICApIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcblxuICAgIHRoaXMuX3N0b3JhZ2UgPSBuZXcgRHJhd2FibGVTdG9yYWdlKHRoaXMuX3Byb2Nlc3NDaGlsZHJlblRvR3JvdXAoY2hpbGRyZW4pKTtcbiAgICB0aGlzLl9zdG9yYWdlLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoZXh0cmEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICB0aGlzLl9zdG9yYWdlLmxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uY29uZmlnLnZpc2libGUpIHtcbiAgICAgICAgaXRlbS5kcmF3KGRyYXdlcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRlc3RydWN0fVxuICAgKi9cbiAgcHVibGljIGRlc3RydWN0KCk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHRoaXMuX3N0b3JhZ2UubGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm9mZlZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NDaGlsZHJlblRvVW5ncm91cCh0aGlzLmNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBjaGlsZHJlbigpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmFnZS5saXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgYWN0aW9ucyB3aXRoIGNoaWxkcmVuIGJlZm9yZSBncm91cGluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9wcm9jZXNzQ2hpbGRyZW5Ub0dyb3VwKGNoaWxkcmVuOiBEcmF3YWJsZUludGVyZmFjZVtdKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgYWN0aW9ucyB3aXRoIGNoaWxkcmVuIGJlZm9yZSB1bmdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NDaGlsZHJlblRvVW5ncm91cChjaGlsZHJlbjogRHJhd2FibGVJbnRlcmZhY2VbXSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdhYmxlU3RvcmFnZUZpbHRlckNhbGxiYWNrVHlwZSxcbiAgRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSxcbiAgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IE9ic2VydmVIZWxwZXIgZnJvbSAnLi4vLi4vaGVscGVycy9vYnNlcnZlLWhlbHBlcic7XG5pbXBvcnQgRHJhd2FibGVHcm91cCBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZS1ncm91cCc7XG5pbXBvcnQgeyBnZXRNYXhQb3NpdGlvbiwgZ2V0TWluUG9zaXRpb24gfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Jhc2UnO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGVHcm91cCBmcm9tICcuLi9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlLWdyb3VwJztcblxuLyoqXG4gKiBTdG9yYWdlIGZvciBkcmF3YWJsZSBvYmplY3RzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdhYmxlU3RvcmFnZSBpbXBsZW1lbnRzIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdhYmxlU3RvcmFnZSc7XG4gIC8qKlxuICAgKiBMaXN0IG9mIHN0b3JlZCBkcmF3YWJsZSBvYmplY3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xpc3Q6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcbiAgLyoqXG4gICAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBEcmF3YWJsZSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaXRlbXMgLSBiYXRjaCBjaGlsZHJlbiB0byBjYWNoZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaXRlbXM6IERyYXdhYmxlSW50ZXJmYWNlW10pIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyID0gbmV3IE9ic2VydmVIZWxwZXIoKTtcbiAgICB0aGlzLmFkZEJhdGNoKGl0ZW1zKTtcbiAgICB0aGlzLl9zb3J0KCk7XG5cbiAgICB0aGlzLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIGlmIChleHRyYSAhPT0gbnVsbCAmJiBleHRyYS5oYXNPd25Qcm9wZXJ0eSgnekluZGV4Q2hhbmdlZCcpICYmIGV4dHJhLnpJbmRleENoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5fc29ydCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlZCBkcmF3YWJsZSBvYmplY3RzIGNoaWxkcmVuIGdldHRlclxuICAgKi9cbiAgZ2V0IGxpc3QoKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3Q7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5jYWNoZX1cbiAgICovXG4gIHB1YmxpYyBhZGQoaXRlbTogRHJhd2FibGVJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpdGVtLm9uVmlld0NoYW5nZShcbiAgICAgIHRoaXMuX3N1YnNjcmliZXJOYW1lLFxuICAgICAgKHRhcmdldCwgZXh0cmEpID0+IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoZXh0cmEpLFxuICAgICk7XG4gICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xuICAgIHRoaXMuX3NvcnQoKTtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5jYWNoZX1cbiAgICovXG4gIHB1YmxpYyBhZGRCYXRjaChpdGVtczogRHJhd2FibGVJbnRlcmZhY2VbXSk6IHZvaWQge1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ub25WaWV3Q2hhbmdlKFxuICAgICAgICB0aGlzLl9zdWJzY3JpYmVyTmFtZSxcbiAgICAgICAgKHRhcmdldCwgZXh0cmEpID0+IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoZXh0cmEpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuX2xpc3QucHVzaChpdGVtKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zb3J0KCk7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgb2JqZWN0cyBmb3VuZCBieSBjb25maWcgZnJvbSBzdG9yYWdlXG4gICAqIEBwYXJhbSBjb25maWcgLSBmaWx0ZXIgY29uZmlnXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlKGNvbmZpZzogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKCkgPT4ge1xuICAgICAgdGhpcy5maW5kKGNvbmZpZykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLmRlbGV0ZUJ5SWQoaXRlbS5pZCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIG9iamVjdCBieSBJRCBmcm9tIHN0b3JhZ2VcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQnlJZChpZDogRHJhd2FibGVJZFR5cGUpOiBEcmF3YWJsZUludGVyZmFjZSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0LmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgY29uc3QgZGVsZXRlZEl0ZW0gPSB0aGlzLl9saXN0LnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICBkZWxldGVkSXRlbS5vZmZWaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lKTtcbiAgICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICAgIHJldHVybiBkZWxldGVkSXRlbTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIGN1c3RvbWl6ZSBleGNlcHRpb25cbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBmaW5kIG9iamVjdCB3aXRoIGlkICcke2lkfSdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmNsZWFyfVxuICAgKi9cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdC5sZW5ndGggPSAwO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmR9XG4gICAqL1xuICBwdWJsaWMgZmluZChjb25maWc6IERyYXdhYmxlU3RvcmFnZUZpbHRlckNvbmZpZ0ludGVyZmFjZSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9maW5kKChpdGVtKSA9PiB7XG4gICAgICBpZiAoY29uZmlnLmlkc09ubHkgJiYgY29uZmlnLmlkc09ubHkuaW5kZXhPZihpdGVtLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5pZHNFeGNsdWRlICYmIGNvbmZpZy5pZHNFeGNsdWRlLmluZGV4T2YoaXRlbS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy50eXBlc09ubHkgJiYgY29uZmlnLnR5cGVzT25seS5pbmRleE9mKGl0ZW0udHlwZSkgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcudHlwZXNFeGNsdWRlICYmIGNvbmZpZy50eXBlc0V4Y2x1ZGUuaW5kZXhPZihpdGVtLnR5cGUpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhKGNvbmZpZy5leHRyYUZpbHRlciAmJiAhY29uZmlnLmV4dHJhRmlsdGVyKGl0ZW0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmRCeUlkfVxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkKGlkOiBEcmF3YWJsZUlkVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gdGhpcy5fZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUuaWQgPT09IGlkKTtcbiAgICBpZiAoZm91bmRJdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmb3VuZEl0ZW1zWzBdO1xuICAgIH1cbiAgICAvLyBUT0RPIGN1c3RvbWl6ZSBleGNlcHRpb25cbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBmaW5kIG9iamVjdCB3aXRoIGlkICcke2lkfSdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmdyb3VwfVxuICAgKi9cbiAgcHVibGljIGdyb3VwKGlkczogRHJhd2FibGVJZFR5cGVbXSk6IERyYXdhYmxlR3JvdXAge1xuICAgIGNvbnN0IGdyb3VwSXRlbXMgPSB0aGlzLmRlbGV0ZSh7IGlkc09ubHk6IGlkcyB9KSBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXTtcbiAgICBjb25zdCBtaW5Qb3NpdGlvbiA9IGdldE1pblBvc2l0aW9uKGdyb3VwSXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmNvbmZpZy5wb3NpdGlvbikpO1xuICAgIGNvbnN0IG1heFBvc2l0aW9uID0gZ2V0TWF4UG9zaXRpb24oZ3JvdXBJdGVtcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBjcmVhdGVWZWN0b3IoaXRlbS5jb25maWcucG9zaXRpb24pXG4gICAgICAgIC5hZGQoY3JlYXRlVmVjdG9yKGl0ZW0uY29uZmlnLnNpemUpKVxuICAgICAgICAudG9BcnJheSgpO1xuICAgIH0pKTtcbiAgICBjb25zdCBncm91cFNpemUgPSBjcmVhdGVWZWN0b3IobWF4UG9zaXRpb24pLnN1YihjcmVhdGVWZWN0b3IobWluUG9zaXRpb24pKS50b0FycmF5KCk7XG4gICAgY29uc3QgZ3JvdXBaSW5kZXggPSBNYXRoLm1heCguLi5ncm91cEl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5jb25maWcuekluZGV4KSkrMTtcblxuICAgIGNvbnN0IGNvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlID0ge1xuICAgICAgcG9zaXRpb246IG1pblBvc2l0aW9uLFxuICAgICAgc2l6ZTogZ3JvdXBTaXplLFxuICAgICAgekluZGV4OiBncm91cFpJbmRleCxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgfTtcblxuICAgIGNvbnN0IGdyb3VwSWQgPSAnZ3JvdXAtJysobmV3IERhdGUoKSkuZ2V0VGltZSgpKyctJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDAwKTtcbiAgICBjb25zdCBncm91cCA9IG5ldyBQb3NpdGlvbmFsRHJhd2FibGVHcm91cChncm91cElkLCBjb25maWcsIHt9LCBncm91cEl0ZW1zKTtcbiAgICB0aGlzLmFkZChncm91cCk7XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS51bmdyb3VwfVxuICAgKi9cbiAgcHVibGljIHVuZ3JvdXAoZ3JvdXBJZDogRHJhd2FibGVJZFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cDogRHJhd2FibGVHcm91cCA9IHRoaXMuZGVsZXRlQnlJZChncm91cElkKSBhcyBEcmF3YWJsZUdyb3VwO1xuICAgIHRoaXMuYWRkQmF0Y2goZ3JvdXAuZGVzdHJ1Y3QoKSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5vblZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25WaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9uQ2hhbmdlKHN1YnNjcmliZXJOYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLm9mZlZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb2ZmVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgb2JqZWN0cyBpbiBzdG9yYWdlIGJ5IGZpbHRlciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0gZmlsdGVyIC0gZmlsdGVyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2ZpbmQoZmlsdGVyOiBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDYWxsYmFja1R5cGUpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcblxuICAgIHRoaXMuX2xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGZpbHRlcihpdGVtKSkge1xuICAgICAgICByZXN1bHQucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdGhlIHN0b3JlZCBvYmplY3RzIGJ5IHotaW5kZXhcbiAgICovXG4gIHByb3RlY3RlZCBfc29ydCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnc29ydCcpO1xuICAgIHRoaXMuX2xpc3Quc29ydCgobGhzLCByaHMpID0+IGxocy5jb25maWcuekluZGV4IC0gcmhzLmNvbmZpZy56SW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tICcuLi8uLi9oZWxwZXJzL29ic2VydmUtaGVscGVyJztcbmltcG9ydCB7IGFyZUFycmF5c0VxdWFsIH0gZnJvbSAnLi4vLi4vaGVscGVycy9iYXNlJztcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBmb3IgZHJhd2FibGUgb2JqZWN0c1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCBJRFxuICAgKi9cbiAgcHJvdGVjdGVkIF9pZDogRHJhd2FibGVJZFR5cGU7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuICAvKipcbiAgICogRXh0cmEgbGlua2VkIGRhdGFcbiAgICovXG4gIHByb3RlY3RlZCBfZGF0YTogTGlua2VkRGF0YVR5cGU7XG4gIC8qKlxuICAgKiBPYnNlcnZlIGhlbHBlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZDtcblxuICAvKipcbiAgICogSUQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlkKCk6IERyYXdhYmxlSWRUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICAvKipcbiAgICogVHlwZSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBjb25maWcoKTogRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgc2V0dGVyXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKi9cbiAgcHVibGljIHNldCBjb25maWcoY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChPYmplY3QuZW50cmllcyhjb25maWcpLCBPYmplY3QuZW50cmllcyh0aGlzLl9jb25maWcpKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICBjb25zdCBpc1pJbmRleENoYW5nZWQgPSBjb25maWcuekluZGV4ICE9PSB0aGlzLl9jb25maWcuekluZGV4O1xuXG4gICAgICBPYmplY3QuZW50cmllcyhjb25maWcpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAodGhpcy5fY29uZmlnW2tleSBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gYXMgdW5rbm93bikgPSB2YWx1ZSBhcyB1bmtub3duO1xuICAgICAgfSk7XG5cbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUsIHtcbiAgICAgICAgekluZGV4Q2hhbmdlZDogaXNaSW5kZXhDaGFuZ2VkLFxuICAgICAgfSk7XG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmtlZCBkYXRhIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBkYXRhKCk6IExpbmtlZERhdGFUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm9mZlZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb2ZmVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSkge1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlciA9IG5ldyBPYnNlcnZlSGVscGVyKCk7XG4gICAgdGhpcy5fY29uZmlnID0gbmV3IFByb3h5KGNvbmZpZywge1xuICAgICAgc2V0OiAodGFyZ2V0OiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gIT09IHZhbHVlO1xuICAgICAgICAodGFyZ2V0W2luZGV4IGFzIGtleW9mIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlXSBhcyB1bmtub3duKSA9IHZhbHVlIGFzIHVua25vd247XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKHtcbiAgICAgICAgICB6SW5kZXhDaGFuZ2VkOiBpbmRleCA9PT0gJ3pJbmRleCcsXG4gICAgICAgIH0pIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fZGF0YSA9IG5ldyBQcm94eShkYXRhLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IExpbmtlZERhdGFUeXBlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIExpbmtlZERhdGFUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgIHRhcmdldFtpbmRleCBhcyBrZXlvZiBMaW5rZWREYXRhVHlwZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG4gIFZlY3RvckFycmF5VHlwZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlR3JvdXBJbnRlcmZhY2UsXG59IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBEcmF3YWJsZUdyb3VwIGZyb20gJy4uL2RyYXdhYmxlL2RyYXdhYmxlLWdyb3VwJztcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciB9IGZyb20gJy4uL3ZlY3Rvcic7XG5pbXBvcnQgeyBCb3VuZEludGVyZmFjZSB9IGZyb20gJy4uLy4uL3R5cGVzL2JvdW5kJztcbmltcG9ydCBSZWN0YW5ndWxhckJvdW5kIGZyb20gJy4uL2JvdW5kcy9yZWN0YW5ndWxhci1ib3VuZCc7XG5pbXBvcnQgeyB0cmFuc3Bvc2VDb29yZHNGb3J3YXJkIH0gZnJvbSAnLi4vdmVjdG9yL2hlbHBlcnMnO1xuaW1wb3J0IHsgaXNQb3NpdGlvbmFsIH0gZnJvbSAnLi4vLi4vaGVscGVycy90eXBlLWhlbHBlcnMnO1xuaW1wb3J0IFBvc2l0aW9uYWxEcmF3YWJsZSBmcm9tICcuL3Bvc2l0aW9uYWwtZHJhd2FibGUnO1xuXG4vKipcbiAqIFBvc2l0aW9uYWwgZHJhd2FibGUgZ3JvdXAgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb25hbERyYXdhYmxlR3JvdXAgZXh0ZW5kcyBEcmF3YWJsZUdyb3VwIGltcGxlbWVudHMgUG9zaXRpb25hbERyYXdhYmxlR3JvdXBJbnRlcmZhY2Uge1xuICAvKipcbiAgICogSW50ZXJmYWNlIGJlbG9uZ2luZyBmbGFnXG4gICAqL1xuICBwdWJsaWMgaXNQb3NpdGlvbmFsOiB0cnVlID0gdHJ1ZTtcbiAgLyoqXG4gICAqIE5hbWUgb2YgY2xhc3MgdG8gdXNlIGFzIHN1YnNjcmliZXIgbmFtZSBpbiBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZXJOYW1lOiBzdHJpbmcgPSAnUG9zaXRpb25hbERyYXdhYmxlR3JvdXAnO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlR3JvdXAgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gZ3JvdXAgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGV4dHJhIGRhdGFcbiAgICogQHBhcmFtIGNoaWxkcmVuIC0gY2hpbGRyZW4gb2YgZ3JvdXBlZCBvYmplY3RzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogRHJhd2FibGVJZFR5cGUsXG4gICAgY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gICAgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSxcbiAgICBjaGlsZHJlbjogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXSxcbiAgKSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSwgY2hpbGRyZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBkcmF3ZXIuY29udGV4dC5zYXZlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQudHJhbnNsYXRlKC4uLnRoaXMuY29uZmlnLnBvc2l0aW9uKTtcbiAgICBzdXBlci5kcmF3KGRyYXdlcik7XG4gICAgZHJhd2VyLmNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5zZXRQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBzZXRQb3NpdGlvbihjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9IGNvb3JkcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UubW92ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIG1vdmVQb3NpdGlvbihvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oXG4gICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKVxuICAgICAgICAuYWRkKGNyZWF0ZVZlY3RvcihvZmZzZXQpKVxuICAgICAgICAudG9BcnJheSgpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmdldFJlbGF0aXZlUG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgZ2V0UmVsYXRpdmVQb3NpdGlvbihwb2ludDogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gY3JlYXRlVmVjdG9yKHBvaW50KVxuICAgICAgLnN1YihjcmVhdGVWZWN0b3IodGhpcy5jb25maWcucG9zaXRpb24pKVxuICAgICAgLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuYm91bmRJbmNsdWRlc31cbiAgICovXG4gIHB1YmxpYyBib3VuZEluY2x1ZGVzKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGlzUG9zaXRpb25hbChjaGlsZClcbiAgICAgICAgJiYgKGNoaWxkIGFzIFBvc2l0aW9uYWxEcmF3YWJsZSkuYm91bmRJbmNsdWRlcyh0cmFuc3Bvc2VDb29yZHNGb3J3YXJkKGNvb3JkcywgdGhpcy5fY29uZmlnLnBvc2l0aW9uKSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmlzTmVhckJvdW5kRWRnZX1cbiAgICovXG4gIGlzTmVhckJvdW5kRWRnZShjb29yZHM6IFZlY3RvckFycmF5VHlwZSwgZGV2aWF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ib3VuZC5pc05lYXJFZGdlKFxuICAgICAgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZChjb29yZHMsIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiksXG4gICAgICBkZXZpYXRpb24sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0IGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBjaGlsZHJlbigpOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JhZ2UubGlzdCBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBib3VuZCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgYm91bmQoKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ3VsYXJCb3VuZCh7XG4gICAgICBwb3NpdGlvbjogWzAsIDBdLFxuICAgICAgc2l6ZTogdGhpcy5fY29uZmlnLnNpemUsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU29tZSBhY3Rpb25zIHdpdGggY2hpbGRyZW4gYmVmb3JlIGdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NDaGlsZHJlblRvR3JvdXAoY2hpbGRyZW46IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdKTogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ubW92ZVBvc2l0aW9uKFxuICAgICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKS5pbnZlcnNlKCkudG9BcnJheSgpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogU29tZSBhY3Rpb25zIHdpdGggY2hpbGRyZW4gYmVmb3JlIHVuZ3JvdXBpbmdcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc0NoaWxkcmVuVG9Vbmdyb3VwKGNoaWxkcmVuOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSk6IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm1vdmVQb3NpdGlvbih0aGlzLl9jb25maWcucG9zaXRpb24pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuLi92ZWN0b3InO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gJy4uL2RyYXdhYmxlL2RyYXdhYmxlJztcbmltcG9ydCB7IEJvdW5kSW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vdHlwZXMvYm91bmQnO1xuaW1wb3J0IFJlY3Rhbmd1bGFyQm91bmQgZnJvbSAnLi4vYm91bmRzL3JlY3Rhbmd1bGFyLWJvdW5kJztcbmltcG9ydCB7IHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQgfSBmcm9tICcuLi92ZWN0b3IvaGVscGVycyc7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIGRyYXdhYmxlIHBvc2l0aW9uYWwgb2JqZWN0c1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBQb3NpdGlvbmFsRHJhd2FibGUgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgYmVsb25naW5nIGZsYWdcbiAgICovXG4gIHB1YmxpYyBpc1Bvc2l0aW9uYWw6IHRydWUgPSB0cnVlO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5zZXRQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBzZXRQb3NpdGlvbihjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9IGNvb3JkcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UubW92ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIG1vdmVQb3NpdGlvbihvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oXG4gICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKVxuICAgICAgICAuYWRkKGNyZWF0ZVZlY3RvcihvZmZzZXQpKVxuICAgICAgICAudG9BcnJheSgpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmdldFJlbGF0aXZlUG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgZ2V0UmVsYXRpdmVQb3NpdGlvbihwb2ludDogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gY3JlYXRlVmVjdG9yKHBvaW50KVxuICAgICAgLnN1YihjcmVhdGVWZWN0b3IodGhpcy5jb25maWcucG9zaXRpb24pKVxuICAgICAgLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuYm91bmRJbmNsdWRlc31cbiAgICovXG4gIHB1YmxpYyBib3VuZEluY2x1ZGVzKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYm91bmQuaW5jbHVkZXMoXG4gICAgICB0cmFuc3Bvc2VDb29yZHNGb3J3YXJkKGNvb3JkcywgdGhpcy5fY29uZmlnLnBvc2l0aW9uKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5pc05lYXJCb3VuZEVkZ2V9XG4gICAqL1xuICBpc05lYXJCb3VuZEVkZ2UoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYm91bmQuaXNOZWFyRWRnZShcbiAgICAgIHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQoY29vcmRzLCB0aGlzLl9jb25maWcucG9zaXRpb24pLFxuICAgICAgZGV2aWF0aW9uLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogYm91bmQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJvdW5kKCk6IEJvdW5kSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gbmV3IFJlY3Rhbmd1bGFyQm91bmQoe1xuICAgICAgcG9zaXRpb246IFswLCAwXSxcbiAgICAgIHNpemU6IHRoaXMuX2NvbmZpZy5zaXplLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb29yZHNGaWx0ZXJDb25maWdJbnRlcmZhY2UsIENvb3Jkc0ZpbHRlckludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi4vdmVjdG9yL3R5cGVzJztcblxuLyoqXG4gKiBGaWx0ZXIgY29vcmRzIHVzaW5nIGdyaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZEZpbHRlciBpbXBsZW1lbnRzIENvb3Jkc0ZpbHRlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQ29vcmRzRmlsdGVySW50ZXJmYWNlLnByb2Nlc3N9XG4gICAqL1xuICBwdWJsaWMgcHJvY2VzcyhkYXRhOiBWZWN0b3JBcnJheVR5cGUsIGNvbmZpZzogQ29vcmRzRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICBjb25zdCBbeCwgeV0gPSBkYXRhO1xuICAgIGNvbnN0IHNjYWxlID0gY29uZmlnLnNjYWxlWzBdO1xuXG4gICAgbGV0IHN0ZXAgPSBjb25maWcuZ3JpZFN0ZXA7XG5cbiAgICBpZiAoc2NhbGUgPCAxKSB7XG4gICAgICBzdGVwICo9IDIgKiogTWF0aC5yb3VuZChNYXRoLmxvZzIoMSAvIHNjYWxlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ZXAgLz0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMihzY2FsZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBbeC14JXN0ZXAsIHkteSVzdGVwXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlQmxvYiwgY3JlYXRlVXJsRnJvbUJsb2IsIGhhc2hTdHJpbmcgfSBmcm9tICcuLi9oZWxwZXJzL2Jhc2UnO1xuaW1wb3J0IHtcbiAgSGFzaEtleVR5cGUsXG4gIEltYWdlQ2FjaGVJbnRlcmZhY2UsXG4gIE9uTG9hZEhhbmRsZXJUeXBlLFxuICBPblRvdGFsTG9hZEhhbmRsZXJUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQ2FjaGUgaGVscGVyIGZvciBpbWFnZXNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VDYWNoZSBpbXBsZW1lbnRzIEltYWdlQ2FjaGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTWFwIG9mIHRoZSBwcmVsb2FkZWQgaW1hZ2VzXG4gICAqL1xuICBwcm90ZWN0ZWQgX2ltYWdlTWFwOiBSZWNvcmQ8SGFzaEtleVR5cGUsIEhUTUxJbWFnZUVsZW1lbnQ+ID0ge307XG4gIC8qKlxuICAgKiBNYXAgb2YgdGhlIHJ1bm5pbmcgcHJvY2Vzc2VzXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NNYXA6IFJlY29yZDxIYXNoS2V5VHlwZSwgYm9vbGVhbj4gPSB7fTtcbiAgLyoqXG4gICAqIE1hcCBvZiB0aGUgYnVmZmVyZWQgaGFuZGxlcnNcbiAgICovXG4gIHByb3RlY3RlZCBfaGFuZGxlcnM6IFJlY29yZDxIYXNoS2V5VHlwZSwgQXJyYXk8T25Mb2FkSGFuZGxlclR5cGU+PiA9IHt9O1xuICAvKipcbiAgICogTWFwIG9mIHRoZSBoYW5kbGVycyBmb3Igc3Vic2NyaWJlZCBvYmplY3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgX3RvdGFsSGFuZGxlcnM6IFJlY29yZDxIYXNoS2V5VHlwZSwgT25Ub3RhbExvYWRIYW5kbGVyVHlwZT4gPSB7fTtcblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEltYWdlQ2FjaGVJbnRlcmZhY2Uuc3Vic2NyaWJlfVxuICAgKi9cbiAgcHVibGljIHN1YnNjcmliZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBPblRvdGFsTG9hZEhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fdG90YWxIYW5kbGVyc1tzdWJzY3JpYmVyTmFtZV0gPSBoYW5kbGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBJbWFnZUNhY2hlSW50ZXJmYWNlLnVuc3Vic2NyaWJlfVxuICAgKi9cbiAgcHVibGljIHVuc3Vic2NyaWJlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5fdG90YWxIYW5kbGVyc1tzdWJzY3JpYmVyTmFtZV07XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEltYWdlQ2FjaGVJbnRlcmZhY2UuY2FjaGV9XG4gICAqL1xuICBwdWJsaWMgY2FjaGUoXG4gICAgc291cmNlOiBzdHJpbmcsXG4gICAgdHlwZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiBPbkxvYWRIYW5kbGVyVHlwZSB8IG51bGwgPSBudWxsLFxuICApOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5fZ2V0S2V5KHNvdXJjZSwgdHlwZSk7XG5cbiAgICBpZiAodGhpcy5faW1hZ2VNYXBba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY2FsbGJhY2sgIT09IG51bGwpIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcy5faW1hZ2VNYXBba2V5XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5faW1hZ2VNYXBba2V5XTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcHJvY2Vzc01hcFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFuZGxlcnNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5faGFuZGxlcnNba2V5XSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hhbmRsZXJzW2tleV0ucHVzaChjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9wcm9jZXNzTWFwW2tleV0gPSB0cnVlO1xuXG4gICAgY29uc3QgYmxvYjogQmxvYiA9IGNyZWF0ZUJsb2Ioc291cmNlLCB0eXBlKTtcbiAgICBjb25zdCB1cmw6IHN0cmluZyA9IGNyZWF0ZVVybEZyb21CbG9iKGJsb2IpO1xuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5zcmMgPSB1cmw7XG5cbiAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIHRoaXMuX2ltYWdlTWFwW2tleV0gPSBpbWc7XG4gICAgICBkZWxldGUgdGhpcy5fcHJvY2Vzc01hcFtrZXldO1xuXG4gICAgICBpZiAodGhpcy5faGFuZGxlcnNba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0gdGhpcy5faGFuZGxlcnNba2V5XTtcbiAgICAgICAgd2hpbGUgKGhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgICAgIChoYW5kbGVycy5wb3AoKSkoaW1nKTtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5faGFuZGxlcnNba2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLl9wcm9jZXNzTWFwKS5sZW5ndGgpIHtcbiAgICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLl90b3RhbEhhbmRsZXJzKS5mb3JFYWNoKChoYW5kbGVyKSA9PiBoYW5kbGVyKCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGhhc2ggZm9yIGltYWdlIGRhdGEgYW5kIHR5cGUgYW5kIHJldHVybnMgaXQgYXMgc3RyaW5nXG4gICAqIEBwYXJhbSBzb3VyY2UgLSBzb3VyY2UgZGF0YSBvZiBpbWFnZVxuICAgKiBAcGFyYW0gdHlwZSAtIG1pbWUgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRLZXkoc291cmNlOiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6IEhhc2hLZXlUeXBlIHtcbiAgICByZXR1cm4gaGFzaFN0cmluZyhgJHtzb3VyY2V9XyR7dHlwZX1gKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbnVtYmVyIGlzIGluc2lkZSBpbnRlcnZhbFxuICogQHBhcmFtIHdoYXQgLSBudW1iZXJcbiAqIEBwYXJhbSBpbnRlcnZhbCAtIGludGVydmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0luSW50ZXJ2YWwod2hhdDogbnVtYmVyLCBpbnRlcnZhbDogVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gIHJldHVybiB3aGF0ID4gaW50ZXJ2YWxbMF0gJiYgd2hhdCA8IGludGVydmFsWzFdO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIG51bWJlciBpcyBpbnNpZGUgc2VnbWVudFxuICogQHBhcmFtIHdoYXQgLSBudW1iZXJcbiAqIEBwYXJhbSBzZWdtZW50IC0gc2VnbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJblNlZ21lbnQod2hhdDogbnVtYmVyLCBzZWdtZW50OiBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHdoYXQgPj0gc2VnbWVudFswXSAmJiB3aGF0IDw9IHNlZ21lbnRbMV07XG59XG5cbi8qKlxuICogUm91bmRzIGEgbnVtYmVyIHdpdGggYSBwcmVjaXNpb25cbiAqIEBwYXJhbSBudW0gLSBudW1iZXJcbiAqIEBwYXJhbSBwcmVjaXNpb24gLSBwZXJjaXNpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kKG51bTogbnVtYmVyLCBwcmVjaXNpb246IG51bWJlciA9IDApOiBudW1iZXIge1xuICBjb25zdCBtdWx0ID0gMTAqKnByZWNpc2lvbjtcbiAgcmV0dXJuIE1hdGgucm91bmQobnVtICogbXVsdCkgLyBtdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zcG9zZSBjb29yZHMgd2l0aCBmb3J3YXJkIGFwcGx5aW5nIG9mZnNldCBhbmQgc2NhbGVcbiAqIEBwYXJhbSBjb29yZHMgLSBjb29yZHMgdG8gdHJhbnNwb3NlXG4gKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0IHZlY3RvclxuICogQHBhcmFtIHNjYWxlIC0gc2NhbGUgdmVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2VDb29yZHNGb3J3YXJkKFxuICBjb29yZHM6IFZlY3RvckFycmF5VHlwZSwgb2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUsIHNjYWxlOiBWZWN0b3JBcnJheVR5cGUgPSBbMSwgMV0sXG4pOiBWZWN0b3JBcnJheVR5cGUge1xuICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XG4gIHJldHVybiBbKHggLSBvZmZzZXRbMF0pL3NjYWxlWzBdLCAoeSAtIG9mZnNldFsxXSkvc2NhbGVbMV1dO1xufVxuXG4vKipcbiAqIFRyYW5zcG9zZSBjb29yZHMgd2l0aCBiYWNrd2FyZCBhcHBseWluZyBvZmZzZXQgYW5kIHNjYWxlXG4gKiBAcGFyYW0gY29vcmRzIC0gY29vcmRzIHRvIHRyYW5zcG9zZVxuICogQHBhcmFtIG9mZnNldCAtIG9mZnNldCB2ZWN0b3JcbiAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlIHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNwb3NlQ29vcmRzQmFja3dhcmQoXG4gIGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSA9IFsxLCAxXSxcbik6IFZlY3RvckFycmF5VHlwZSB7XG4gIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcbiAgcmV0dXJuIFt4KnNjYWxlWzBdICsgb2Zmc2V0WzBdLCB5KnNjYWxlWzFdICsgb2Zmc2V0WzFdXTtcbn1cbiIsImltcG9ydCBQb3NpdGlvbmFsVmVjdG9yLCB7IGNyZWF0ZVBvbHlnb25WZWN0b3JzIH0gZnJvbSAnLi9wb3NpdGlvbmFsLXZlY3Rvcic7XG5pbXBvcnQgeyBpc0luSW50ZXJ2YWwsIGlzSW5TZWdtZW50LCByb3VuZCB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgVmVjdG9yLCB7IGNyZWF0ZVZlY3RvciwgdG9WZWN0b3IgfSBmcm9tICcuL3ZlY3Rvcic7XG5cbmV4cG9ydCB7XG4gIFZlY3RvcixcbiAgY3JlYXRlVmVjdG9yLFxuICB0b1ZlY3RvcixcbiAgUG9zaXRpb25hbFZlY3RvcixcbiAgaXNJbkludGVydmFsLFxuICBpc0luU2VnbWVudCxcbiAgcm91bmQsXG4gIGNyZWF0ZVBvbHlnb25WZWN0b3JzLFxufTtcbiIsImltcG9ydCB7IFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2UsIFZlY3RvckFycmF5VHlwZSwgVmVjdG9ySW50ZXJmYWNlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgVmVjdG9yLCB7IHRvVmVjdG9yIH0gZnJvbSAnLi92ZWN0b3InO1xuXG4vKipcbiAqIFBvc2l0aW9uYWwgdmVjdG9yIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uYWxWZWN0b3IgaW1wbGVtZW50cyBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFBvc2l0aW9uXG4gICAqL1xuICBwdWJsaWMgcG9zaXRpb246IFZlY3RvckludGVyZmFjZTtcbiAgLyoqXG4gICAqIFNpemVcbiAgICovXG4gIHB1YmxpYyBzaXplOiBWZWN0b3JJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uYWxWZWN0b3IgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHBvc2l0aW9uIC0gcG9zaXRpb25cbiAgICogQHBhcmFtIHNpemUgLSBzaXplXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjdG9yQXJyYXlUeXBlIHwgVmVjdG9ySW50ZXJmYWNlLCBzaXplOiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UpIHtcbiAgICB0aGlzLnBvc2l0aW9uID0gdG9WZWN0b3IocG9zaXRpb24pO1xuICAgIHRoaXMuc2l6ZSA9IHRvVmVjdG9yKHNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlLnRhcmdldH1cbiAgICovXG4gIHB1YmxpYyBnZXQgdGFyZ2V0KCk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uY2xvbmUoKS5hZGQodGhpcy5zaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNpemUubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlLmluY2x1ZGVzfVxuICAgKi9cbiAgcHVibGljIGluY2x1ZGVzKHBvaW50OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsIHByZWNpc2lvbjogbnVtYmVyID0gNCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHBvaW50VmVjdG9yID0gdG9WZWN0b3IocG9pbnQpO1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb24uaXNFcXVhbChwb2ludFZlY3RvciwgcHJlY2lzaW9uKSB8fCB0aGlzLnRhcmdldC5pc0VxdWFsKHBvaW50VmVjdG9yLCBwcmVjaXNpb24pKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBbeDEsIHkxXSA9IHRoaXMucG9zaXRpb24udG9BcnJheShwcmVjaXNpb24pO1xuICAgIGNvbnN0IFt4MiwgeTJdID0gdGhpcy50YXJnZXQudG9BcnJheShwcmVjaXNpb24pO1xuICAgIGNvbnN0IFt4LCB5XSA9IHBvaW50VmVjdG9yLnRvQXJyYXkocHJlY2lzaW9uKTtcblxuICAgIHJldHVybiAoeC14MSkgKiAoeTIteTEpIC0gKHkteTEpICogKHgyLXgxKSA9PT0gMFxuICAgICAgJiYgKHgxIDwgeCAmJiB4IDwgeDIpICYmICh5MSA8IHkgJiYgeSA8IHkyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgUG9zaXRpb25hbFZlY3RvckludGVyZmFjZS5nZXREaXN0YW5jZVZlY3Rvcn1cbiAgICovXG4gIHB1YmxpYyBnZXREaXN0YW5jZVZlY3Rvcihwb2ludDogVmVjdG9yQXJyYXlUeXBlIHwgVmVjdG9ySW50ZXJmYWNlKTogUG9zaXRpb25hbFZlY3RvckludGVyZmFjZSB7XG4gICAgY29uc3QgdmVjdG9yUG9pbnQgPSB0b1ZlY3Rvcihwb2ludCk7XG4gICAgY29uc3QgZGVzdFBvaW50ID0gdGhpcy5fZ2V0TmVhcmVzdExpbmVQb2ludChwb2ludCk7XG5cbiAgICBpZiAoXG4gICAgICBkZXN0UG9pbnQueCA8IE1hdGgubWluKHRoaXMucG9zaXRpb24ueCwgdGhpcy50YXJnZXQueCkgfHxcbiAgICAgIGRlc3RQb2ludC54ID4gTWF0aC5tYXgodGhpcy5wb3NpdGlvbi54LCB0aGlzLnRhcmdldC54KSB8fFxuICAgICAgZGVzdFBvaW50LnkgPCBNYXRoLm1pbih0aGlzLnBvc2l0aW9uLnksIHRoaXMudGFyZ2V0LnkpIHx8XG4gICAgICBkZXN0UG9pbnQueSA+IE1hdGgubWF4KHRoaXMucG9zaXRpb24ueSwgdGhpcy50YXJnZXQueSlcbiAgICApIHtcbiAgICAgIGNvbnN0IGwxID0gbmV3IFBvc2l0aW9uYWxWZWN0b3IodmVjdG9yUG9pbnQsIHRvVmVjdG9yKHRoaXMucG9zaXRpb24pLnN1Yih2ZWN0b3JQb2ludCkpO1xuICAgICAgY29uc3QgbDIgPSBuZXcgUG9zaXRpb25hbFZlY3Rvcih2ZWN0b3JQb2ludCwgdG9WZWN0b3IodGhpcy50YXJnZXQpLnN1Yih2ZWN0b3JQb2ludCkpO1xuXG4gICAgICBpZiAobDEubGVuZ3RoIDwgbDIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBsMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxWZWN0b3IodmVjdG9yUG9pbnQsIGRlc3RQb2ludC5zdWIodmVjdG9yUG9pbnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb29yZHMgb2YgdGhlIG5lYXJlc3QgcG9pbnQgb24gdmVjdG9yIHRvIGFub3RoZXIgcG9pbnRcbiAgICogQHBhcmFtIHBvaW50IC0gYW5vdGhlciBwb2ludFxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXROZWFyZXN0TGluZVBvaW50KHBvaW50OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UpIHtcbiAgICBjb25zdCBwb2ludFZlY3RvciA9IHRvVmVjdG9yKHBvaW50KTtcblxuICAgIGNvbnN0IGsgPSAoXG4gICAgICAodGhpcy50YXJnZXQueS10aGlzLnBvc2l0aW9uLnkpICogKHBvaW50VmVjdG9yLngtdGhpcy5wb3NpdGlvbi54KVxuICAgICAgLSAodGhpcy50YXJnZXQueC10aGlzLnBvc2l0aW9uLngpICogKHBvaW50VmVjdG9yLnktdGhpcy5wb3NpdGlvbi55KVxuICAgICkgLyAoKHRoaXMudGFyZ2V0LnktdGhpcy5wb3NpdGlvbi55KSoqMiArICh0aGlzLnRhcmdldC54LXRoaXMucG9zaXRpb24ueCkqKjIpO1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoW1xuICAgICAgcG9pbnRWZWN0b3IueCAtIGsgKiAodGhpcy50YXJnZXQueS10aGlzLnBvc2l0aW9uLnkpLFxuICAgICAgcG9pbnRWZWN0b3IueSArIGsgKiAodGhpcy50YXJnZXQueC10aGlzLnBvc2l0aW9uLngpLFxuICAgIF0pO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGxpc3Qgb2YgdmVjdG9ycyBvZiB0aGUgcG9seWdvbiBmcm9tIGEgbGlzdCBvZiBwb2ludHNcbiAqIEBwYXJhbSBwb2ludHMgLSBsaXN0IG9mIHBvaW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUG9seWdvblZlY3RvcnMocG9pbnRzOiBWZWN0b3JBcnJheVR5cGVbXSB8IFZlY3RvckludGVyZmFjZVtdKTogUG9zaXRpb25hbFZlY3RvckludGVyZmFjZVtdIHtcbiAgY29uc3QgcmVzdWx0OiBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlW10gPSBbXTtcblxuICBmb3IgKGxldCBpPTAsIGo9cG9pbnRzLmxlbmd0aC0xOyBpPHBvaW50cy5sZW5ndGg7IGo9aSsrKSB7XG4gICAgY29uc3QgbGhzUG9pbnQgPSB0b1ZlY3Rvcihwb2ludHNbal0pO1xuICAgIGNvbnN0IHJoc1BvaW50ID0gdG9WZWN0b3IocG9pbnRzW2ldKTtcblxuICAgIHJlc3VsdC5wdXNoKG5ldyBQb3NpdGlvbmFsVmVjdG9yKGxoc1BvaW50LCByaHNQb2ludC5zdWIobGhzUG9pbnQpKSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JJbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHJvdW5kIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuLyoqXG4gKiBWZWN0b3IgY2xhc3NcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIGltcGxlbWVudHMgVmVjdG9ySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIENvb3JkaW5hdGUgWFxuICAgKi9cbiAgcHVibGljIHg6IG51bWJlcjtcbiAgLyoqXG4gICAqIENvb3JkaW5hdGUgWVxuICAgKi9cbiAgcHVibGljIHk6IG51bWJlcjtcbiAgLyoqXG4gICAqIERlZmF1bHQgcHJlY2lzaW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RlZmF1bHRQcmVjaXNpb246IG51bWJlciA9IDQ7XG5cbiAgLyoqXG4gICAqIFZlY3RvciBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geCAtIGNvb3JkaW5hdGUgWFxuICAgKiBAcGFyYW0geSAtIGNvb3JkaW5hdGUgWVxuICAgKiBAcGFyYW0gZGVmYXVsdFByZWNpc2lvbiAtIGRlZmF1bHQgcHJlY2lzaW9uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihbeCwgeV06IFZlY3RvckFycmF5VHlwZSwgZGVmYXVsdFByZWNpc2lvbj86IG51bWJlcikge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIGlmICh0aGlzLl9kZWZhdWx0UHJlY2lzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRQcmVjaXNpb24gPSBkZWZhdWx0UHJlY2lzaW9uO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSB2ZWN0b3IgdG8gY2FjaGVcbiAgICovXG4gIHB1YmxpYyBhZGQodjogVmVjdG9yKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB0aGlzLnggKz0gdi54O1xuICAgIHRoaXMueSArPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgdmVjdG9yIHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSB2ZWN0b3IgdG8gc3VidHJhY3RcbiAgICovXG4gIHB1YmxpYyBzdWIodjogVmVjdG9ySW50ZXJmYWNlKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsZXMgdmVjdG9yIGJ5IG51bWJlclxuICAgKiBAcGFyYW0gbXVsIC0gbXVsdGlwbGllclxuICAgKi9cbiAgcHVibGljIG11bChtdWw6IG51bWJlcik6IFZlY3RvckludGVyZmFjZSB7XG4gICAgdGhpcy54ICo9IG11bDtcbiAgICB0aGlzLnkgKj0gbXVsO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlcyB2ZWN0b3IgYnkgbnVtYmVyXG4gICAqIEBwYXJhbSBkaXYgLSBkaXZpZGVyXG4gICAqL1xuICBwdWJsaWMgZGl2KGRpdjogbnVtYmVyKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB0aGlzLnggLz0gZGl2O1xuICAgIHRoaXMueSAvPSBkaXY7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZlcnNlcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBpbnZlcnNlKCk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICB0aGlzLnkgPSAtdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJzZXMgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgcmV2ZXJzZSgpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHRoaXMueCA9IDEvdGhpcy54O1xuICAgIHRoaXMueSA9IDEvdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCp0aGlzLnggKyB0aGlzLnkqdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgZXF1YWwgdG8gYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gcHJlY2lzaW9uIC0gcm91bmQgcHJlY2lzaW9uIGZvciBjb21wYXJpc29uXG4gICAqL1xuICBwdWJsaWMgaXNFcXVhbCh2OiBWZWN0b3JJbnRlcmZhY2UsIHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5fZGVmYXVsdFByZWNpc2lvbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiByb3VuZCh2LngsIHByZWNpc2lvbikgPT09IHJvdW5kKHRoaXMueCwgcHJlY2lzaW9uKVxuICAgICAgJiYgcm91bmQodi55LCBwcmVjaXNpb24pID09PSByb3VuZCh0aGlzLnksIHByZWNpc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGFuZ2xlIGJldHdlZW4gdmVjdG9ycyBlcXVhbHMgOTAgZGVncmVlc1xuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgaXNPcnRob2dvbmFsKHY6IFZlY3RvckludGVyZmFjZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldENvcyh2KSA9PT0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgY29sbGluZWFyIHdpdGggYXJndW1lbnQgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBpc0NvbGxpbmVhcih2OiBWZWN0b3JJbnRlcmZhY2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tdWxWZWN0b3IodikgPT09IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkaXN0YW5jZSB2ZWN0b3Igb2YgdGhpcyBhbmQgYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGRpc3RhbmNlKHY6IFZlY3RvckludGVyZmFjZSk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zdWIodik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzY2FsYXIgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBtdWxTY2FsYXIodjogVmVjdG9ySW50ZXJmYWNlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54KnYueCArIHRoaXMueSp2Lnk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsZW5ndGggb2YgdmVjdG9yIHByb2R1Y3Qgd2l0aCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgbXVsVmVjdG9yKHY6IFZlY3RvckludGVyZmFjZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueCp2LnkgLSB0aGlzLnkqdi54O1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhpcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBub3JtYWxpemUoKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aDtcblxuICAgIHRoaXMueCAvPSBsZW47XG4gICAgdGhpcy55IC89IGxlbjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9zZXMgdmVjdG9yIGZvcndhcmQgd2l0aCBvZmZzZXQgYW5kIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VGb3J3YXJkKFxuICAgIG9mZnNldDogVmVjdG9yQXJyYXlUeXBlIHwgVmVjdG9ySW50ZXJmYWNlLCBzY2FsZTogVmVjdG9yQXJyYXlUeXBlIHwgVmVjdG9ySW50ZXJmYWNlLFxuICApOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0IG9mZnNldFZlY3RvciA9IHRvVmVjdG9yKG9mZnNldCk7XG4gICAgY29uc3Qgc2NhbGVWZWN0b3IgPSB0b1ZlY3RvcihzY2FsZSk7XG5cbiAgICB0aGlzLnggPSAodGhpcy54IC0gb2Zmc2V0VmVjdG9yLngpIC8gc2NhbGVWZWN0b3IueDtcbiAgICB0aGlzLnkgPSAodGhpcy55IC0gb2Zmc2V0VmVjdG9yLnkpIC8gc2NhbGVWZWN0b3IueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9zZXMgdmVjdG9yIGJhY2t3YXJkIHdpdGggb2Zmc2V0IGFuZCBzY2FsZVxuICAgKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0XG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqL1xuICBwdWJsaWMgdHJhbnNwb3NlQmFja3dhcmQoXG4gICAgb2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsIHNjYWxlOiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsXG4gICk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgY29uc3Qgb2Zmc2V0VmVjdG9yID0gdG9WZWN0b3Iob2Zmc2V0KTtcbiAgICBjb25zdCBzY2FsZVZlY3RvciA9IHRvVmVjdG9yKHNjYWxlKTtcblxuICAgIHRoaXMueCA9IG9mZnNldFZlY3Rvci54ICsgdGhpcy54KnNjYWxlVmVjdG9yLng7XG4gICAgdGhpcy55ID0gb2Zmc2V0VmVjdG9yLnkgKyB0aGlzLnkqc2NhbGVWZWN0b3IueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgbmV3IHZlY3RvciBieSByb3RhdGluZyB0aGlzXG4gICAqIEBwYXJhbSBhbmdsZSAtIGFuZ2xlIHRvIHJvdGF0ZSB0b1xuICAgKiBAcGFyYW0gcHJlY2lzaW9uIC0gcm91bmQgcHJlY2lzaW9uXG4gICAqL1xuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyID0gdGhpcy5fZGVmYXVsdFByZWNpc2lvbik6IFZlY3RvckludGVyZmFjZSB7XG4gICAgY29uc3QgY3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgY29uc3Qgc24gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICB0aGlzLnggPSByb3VuZCh0aGlzLngqY3MgLSB0aGlzLnkqc24sIHByZWNpc2lvbik7XG4gICAgdGhpcy55ID0gcm91bmQodGhpcy54KnNuICsgdGhpcy55KmNzLCBwcmVjaXNpb24pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvcyB3aXRoIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBnZXRDb3ModjogVmVjdG9ySW50ZXJmYWNlIHwgbnVsbCA9IG51bGwpOiBudW1iZXIge1xuICAgIGlmICh2ID09PSBudWxsKSB7XG4gICAgICB2ID0gY3JlYXRlVmVjdG9yKFsxLCAwXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubXVsU2NhbGFyKHYpIC8gKHRoaXMubGVuZ3RoICogdi5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb25lcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHJldHVybiBjcmVhdGVWZWN0b3IodGhpcy50b0FycmF5KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHZlY3RvciB0byBhcnJheVxuICAgKiBAcGFyYW0gcHJlY2lzaW9uIC0gcHJlY2lzaW9uXG4gICAqL1xuICBwdWJsaWMgdG9BcnJheShwcmVjaXNpb24/OiBudW1iZXIpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIGlmIChwcmVjaXNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFt0aGlzLngsIHRoaXMueV07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyb3VuZCh0aGlzLngsIHByZWNpc2lvbiksIHJvdW5kKHRoaXMueSwgcHJlY2lzaW9uKV07XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIG5ldyB2ZWN0b3JcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBjb29yZHMgLSBjb29yZGluYXRlcyBvZiBuZXcgdmVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWZWN0b3IoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICByZXR1cm4gbmV3IFZlY3Rvcihjb29yZHMpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGluc3RhbmNlIHRvIHZlY3RvciBpZiBpdCdzIGFuIGFycmF5XG4gKiBAcGFyYW0gY29vcmRzIC0gY29vcmRzIGFzIHZlY3RvciBvciBhbiBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9WZWN0b3IoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICByZXR1cm4gKGNvb3JkcyBpbnN0YW5jZW9mIEFycmF5KSA/IGNyZWF0ZVZlY3Rvcihjb29yZHMpIDogY29vcmRzO1xufVxuIiwiaW1wb3J0IHtcbiAgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSxcbiAgVmlld0NvbmZpZ0ludGVyZmFjZSxcbiAgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UsXG4gIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUsXG4gIFZlY3RvckFycmF5VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXJlQXJyYXlzRXF1YWwgfSBmcm9tICcuLi9oZWxwZXJzL2Jhc2UnO1xuaW1wb3J0IE9ic2VydmVIZWxwZXIgZnJvbSAnLi4vaGVscGVycy9vYnNlcnZlLWhlbHBlcic7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuL3ZlY3Rvcic7XG5pbXBvcnQgeyB0cmFuc3Bvc2VDb29yZHNCYWNrd2FyZCwgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZCB9IGZyb20gJy4vdmVjdG9yL2hlbHBlcnMnO1xuXG4vKipcbiAqIENvbmZpZyBmb3Igb2JqZWN0cyBkcmF3YWJsZSBvbiBjYW52YXNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbmZpZyBpbXBsZW1lbnRzIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFNjYWxlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3NjYWxlOiBWZWN0b3JBcnJheVR5cGU7XG4gIC8qKlxuICAgKiBPZmZzZXRcbiAgICovXG4gIHByb3RlY3RlZCBfb2Zmc2V0OiBWZWN0b3JBcnJheVR5cGU7XG4gIC8qKlxuICAgKiBHcmlkIHN0ZXBcbiAgICovXG4gIHByb3RlY3RlZCBfZ3JpZFN0ZXA6IG51bWJlcjtcbiAgLyoqXG4gICAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBWaWV3Q29uZmlnIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IHNjYWxlLCBvZmZzZXQsIGdyaWRTdGVwIH06IFZpZXdDb25maWdJbnRlcmZhY2UpIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyID0gbmV3IE9ic2VydmVIZWxwZXIoKTtcbiAgICB0aGlzLl9zY2FsZSA9IG5ldyBQcm94eShzY2FsZSwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBWZWN0b3JBcnJheVR5cGUsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgICh0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSBhcyB1bmtub3duKSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fb2Zmc2V0ID0gbmV3IFByb3h5KG9mZnNldCwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBWZWN0b3JBcnJheVR5cGUsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgICh0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSBhcyB1bmtub3duKSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fZ3JpZFN0ZXAgPSBncmlkU3RlcDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5vZmZWaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZlZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudHJhbnNwb3NlRm9yd2FyZH1cbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VGb3J3YXJkKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdHJhbnNwb3NlQ29vcmRzRm9yd2FyZChjb29yZHMsIHRoaXMuX29mZnNldCwgdGhpcy5fc2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS50cmFuc3Bvc2VCYWNrd2FyZH1cbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VCYWNrd2FyZChjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRyYW5zcG9zZUNvb3Jkc0JhY2t3YXJkKGNvb3JkcywgdGhpcy5fb2Zmc2V0LCB0aGlzLl9zY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLnVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0fVxuICAgKi9cbiAgcHVibGljIHVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0KG5ld1NjYWxlOiBWZWN0b3JBcnJheVR5cGUsIGN1cnNvckNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKG5ld1NjYWxlLCB0aGlzLl9zY2FsZSk7XG5cbiAgICBpZiAoIWlzQ2hhbmdlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIGNvbnN0IG9sZFNjYWxlUG9zaXRpb24gPSBjcmVhdGVWZWN0b3IodGhpcy50cmFuc3Bvc2VGb3J3YXJkKGN1cnNvckNvb3JkcykpO1xuICAgICAgdGhpcy5zY2FsZSA9IG5ld1NjYWxlO1xuICAgICAgY29uc3QgbmV3U2NhbGVQb3NpdGlvbiA9IGNyZWF0ZVZlY3Rvcih0aGlzLnRyYW5zcG9zZUZvcndhcmQoY3Vyc29yQ29vcmRzKSk7XG4gICAgICBjb25zdCBkaWZmZXJlbmNlID0gbmV3U2NhbGVQb3NpdGlvbi5jbG9uZSgpLnN1YihvbGRTY2FsZVBvc2l0aW9uKTtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy50cmFuc3Bvc2VCYWNrd2FyZChkaWZmZXJlbmNlLnRvQXJyYXkoKSk7XG5cbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYWxsIHRoZSBkYXRhIGluIGNvbmZpZ1xuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0XG4gICAqIEBwYXJhbSBncmlkU3RlcCAtIGdyaWQgc3RlcFxuICAgKi9cbiAgcHVibGljIHVwZGF0ZSh7IHNjYWxlLCBvZmZzZXQsIGdyaWRTdGVwIH06IFZpZXdDb25maWdJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwoc2NhbGUsIHRoaXMuX3NjYWxlKSB8fCAhYXJlQXJyYXlzRXF1YWwob2Zmc2V0LCB0aGlzLl9vZmZzZXQpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5zY2FsZSA9IHNjYWxlO1xuICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICB0aGlzLmdyaWRTdGVwID0gZ3JpZFN0ZXA7XG5cbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIGdldHRlclxuICAgKi9cbiAgZ2V0IHNjYWxlKCk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIHNldHRlclxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKi9cbiAgc2V0IHNjYWxlKHNjYWxlOiBWZWN0b3JBcnJheVR5cGUpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwoc2NhbGUsIHRoaXMuX3NjYWxlKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuX3NjYWxlWzBdID0gc2NhbGVbMF07XG4gICAgICB0aGlzLl9zY2FsZVsxXSA9IHNjYWxlWzFdO1xuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogT2Zmc2V0IGdldHRlclxuICAgKi9cbiAgZ2V0IG9mZnNldCgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gIH1cblxuICAvKipcbiAgICogT2Zmc2V0IHNldHRlclxuICAgKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0XG4gICAqL1xuICBzZXQgb2Zmc2V0KG9mZnNldDogVmVjdG9yQXJyYXlUeXBlKSB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKG9mZnNldCwgdGhpcy5fb2Zmc2V0KTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuX29mZnNldFswXSA9IG9mZnNldFswXTtcbiAgICAgIHRoaXMuX29mZnNldFsxXSA9IG9mZnNldFsxXTtcbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyaWQgc3RlcCBnZXR0ZXJcbiAgICovXG4gIGdldCBncmlkU3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9ncmlkU3RlcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmlkIHN0ZXAgc2V0dGVyXG4gICAqIEBwYXJhbSBncmlkU3RlcCAtIGdyaWQgc3RlcFxuICAgKi9cbiAgc2V0IGdyaWRTdGVwKGdyaWRTdGVwOiBudW1iZXIpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSBncmlkU3RlcCAhPT0gdGhpcy5fZ3JpZFN0ZXA7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLl9ncmlkU3RlcCA9IGdyaWRTdGVwO1xuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qIChpZ25vcmVkKSAqLyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEcmF3ZXIgZnJvbSAnLi9jYW52YXMvZHJhd2VyJztcbmltcG9ydCBSZWN0IGZyb20gJy4vY2FudmFzL2ZpZ3VyZXMvcmVjdCc7XG5pbXBvcnQgRHJhd2FibGVTdG9yYWdlIGZyb20gJy4vY2FudmFzL3N0cnVjdHMvZHJhd2FibGUvZHJhd2FibGUtc3RvcmFnZSc7XG5pbXBvcnQgeyBEcmF3YWJsZUludGVyZmFjZSwgVmVjdG9yQXJyYXlUeXBlLCBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB9IGZyb20gJy4vY2FudmFzL3R5cGVzJztcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gJy4vY2FudmFzL3N0cnVjdHMvdmlldy1jb25maWcnO1xuaW1wb3J0IEdyaWQgZnJvbSAnLi9jYW52YXMvZmlndXJlcy9ncmlkJztcbmltcG9ydCBTdmcgZnJvbSAnLi9jYW52YXMvZmlndXJlcy9zdmcnO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IERyYXdhYmxlU3RvcmFnZShbXG4gIG5ldyBHcmlkKDEsIHtcbiAgICB6SW5kZXg6IC1JbmZpbml0eSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIG1haW5MaW5lQ29sb3I6ICcjYmJiJyxcbiAgICBzdWJMaW5lQ29sb3I6ICcjZGVkZWRlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gICAgbGluZXNJbkJsb2NrOiA1LFxuICB9KSxcbiAgbmV3IFJlY3QoMiwge1xuICAgIHBvc2l0aW9uOiBbMTAsIDIwXSxcbiAgICBzaXplOiBbMTAwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAnZ3JlZW4nLFxuICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgfSksXG4gIG5ldyBSZWN0KDMsIHtcbiAgICBwb3NpdGlvbjogWzEwLCAyNV0sXG4gICAgc2l6ZTogWzUwLCA1MF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAnYmx1ZScsXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAxLFxuICB9KSxcbiAgbmV3IFJlY3QoNCwge1xuICAgIHBvc2l0aW9uOiBbMTUqMzAsIDE1KjEwXSxcbiAgICBzaXplOiBbMTUqMTAsIDE1KjVdLFxuICAgIHpJbmRleDogMTAsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdyZWQnLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgfSksXG4gIG5ldyBTdmcoNSwge1xuICAgIHBvc2l0aW9uOiBbMzAwLCA1NTBdLFxuICAgIHNpemU6IFsxNjIsIDgyXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBkYXRhOiBcIjxzdmcgd2lkdGg9JzE2MicgaGVpZ2h0PSc4Micgdmlld0JveD0nMCAwIDE2MiA4MicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMjguNjkyMyAxTDEgNDAuMTI0MUwyOC42OTIzIDgxSDEzNC42NzVMMTYxIDQwLjEyNDFMMTM0LjY3NSAxSDI4LjY5MjNaJyBmaWxsPScjRkZCQ0YyJyBzdHJva2U9J2JsYWNrJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyAvPjwvc3ZnPlwiLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0pLFxuICBuZXcgU3ZnKDUsIHtcbiAgICBwb3NpdGlvbjogWzEwMCwgNTUwXSxcbiAgICBzaXplOiBbMTYyLCA4Ml0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZGF0YTogXCI8c3ZnIHdpZHRoPScxNjInIGhlaWdodD0nODInIHZpZXdCb3g9JzAgMCAxNjIgODInIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTI4LjY5MjMgMUwxIDQwLjEyNDFMMjguNjkyMyA4MUgxMzQuNjc1TDE2MSA0MC4xMjQxTDEzNC42NzUgMUgyOC42OTIzWicgZmlsbD0nI0ZGQkNGMicgc3Ryb2tlPSdibGFjaycgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgLz48L3N2Zz5cIiwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9KSxcbiAgbmV3IFJlY3QoNiwge1xuICAgIHBvc2l0aW9uOiBbMzUwLCAzNTBdLFxuICAgIHNpemU6IFszMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgfSksXG4gIG5ldyBSZWN0KDcsIHtcbiAgICBwb3NpdGlvbjogWzM1MCwgMzAwXSxcbiAgICBzaXplOiBbMzAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gIH0pLFxuICBuZXcgUmVjdCg4LCB7XG4gICAgcG9zaXRpb246IFszMDAsIDM1MF0sXG4gICAgc2l6ZTogWzMwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAxLFxuICB9KSxcbiAgbmV3IFJlY3QoOSwge1xuICAgIHBvc2l0aW9uOiBbMjAwLCAyMDBdLFxuICAgIHNpemU6IFsxNjAsIDE2MF0sXG4gICAgekluZGV4OiAwLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAnZ3JlZW4nLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAxLFxuICB9KSxcbl0pO1xuXG5jb25zdCBncm91cCA9IHN0b3JhZ2UuZ3JvdXAoWzYsIDcsIDgsIDldKTtcbmNvbnNvbGUubG9nKGdyb3VwKTtcbi8vIHN0b3JhZ2UudW5ncm91cChncm91cC5pZCk7XG5cbmNvbnNvbGUubG9nKHN0b3JhZ2UpO1xuXG5jb25zdCB2aWV3Q29uZmlnOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSA9IG5ldyBWaWV3Q29uZmlnKHtcbiAgc2NhbGU6IFsxLCAxXSxcbiAgb2Zmc2V0OiBbMCwgMF0sXG4gIGdyaWRTdGVwOiAxNSxcbn0pO1xuY29uc29sZS5sb2codmlld0NvbmZpZyk7XG5cbmNvbnN0IGRyYXdlcjogRHJhd2VyID0gbmV3IERyYXdlcih7XG4gIGRvbUVsZW1lbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudCxcbiAgdmlld0NvbmZpZyxcbiAgc3RvcmFnZSxcbn0pO1xuZHJhd2VyLmRyYXcoKTtcblxuLy8gc2V0VGltZW91dCgoKSA9PiB7XG4vLyAgIGNvbnN0IGJhdGNoOiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG4vLyAgIGZvciAobGV0IGk9MDsgaTwxMDAwOyArK2kpIHtcbi8vICAgICBiYXRjaC5wdXNoKG5ldyBSZWN0KGkrMTAwLCB7XG4vLyAgICAgICBwb3NpdGlvbjogW01hdGgucmFuZG9tKCkqZHJhd2VyLndpZHRoLCBNYXRoLnJhbmRvbSgpKmRyYXdlci5oZWlnaHRdLFxuLy8gICAgICAgc2l6ZTogWzMwK01hdGgucmFuZG9tKCkqMTAwLCAzMCtNYXRoLnJhbmRvbSgpKjEwMF0sXG4vLyAgICAgICB6SW5kZXg6IDAsXG4vLyAgICAgICB2aXNpYmxlOiB0cnVlLFxuLy8gICAgICAgZmlsbFN0eWxlOiAnd2hpdGUnLFxuLy8gICAgICAgc3Ryb2tlU3R5bGU6ICdncmVlbicsXG4vLyAgICAgICBsaW5lV2lkdGg6IDEsXG4vLyAgICAgfSkpO1xuLy8gICB9XG4vLyAgIHN0b3JhZ2UuYWRkQmF0Y2goYmF0Y2gpO1xuLy8gfSwgMzApO1xuXG5zZXRUaW1lb3V0KCgpID0+IHtcbiAgcmV0dXJuO1xuICBjb25zdCBiYXRjaDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuICBjb25zdCBkYXRhMSA9IFwiPHN2ZyB3aWR0aD0nMTYyJyBoZWlnaHQ9JzgyJyB2aWV3Qm94PScwIDAgMTYyIDgyJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J00yOC42OTIzIDFMMSA0MC4xMjQxTDI4LjY5MjMgODFIMTM0LjY3NUwxNjEgNDAuMTI0MUwxMzQuNjc1IDFIMjguNjkyM1onIGZpbGw9JyNGRkJDRjInIHN0cm9rZT0nYmxhY2snIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIC8+PC9zdmc+XCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgY29uc3QgZGF0YTIgPSBcIjxzdmcgd2lkdGg9JzE2MCcgaGVpZ2h0PScxMDAnIHZpZXdCb3g9JzAgMCAxNjAgMTAwJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxlbGxpcHNlIGZpbGw9JyNjNWM2ZTInIHN0cm9rZS13aWR0aD0nbnVsbCcgc3Ryb2tlLW9wYWNpdHk9J251bGwnIGN4PSc3OS44ODYxNTgnIGN5PSc4Ny40NTY1NzMnIGlkPSdzdmdfMjYnIHJ4PSc3OS41MjQwNzMnIHJ5PScxMS44NzgyMjYnIHN0cm9rZT0nYmxhY2snLz48cmVjdCBzdHJva2U9J2JsYWNrJyBmaWxsPScjYzVjNmUyJyBzdHJva2Utd2lkdGg9J251bGwnIHN0cm9rZS1vcGFjaXR5PSdudWxsJyBmaWxsLW9wYWNpdHk9J251bGwnIHg9JzAuMzMzODY0JyB5PScxMi40ODk3NjYnIHdpZHRoPScxNTguOTk4OTM4JyBoZWlnaHQ9Jzc1LjMzMjkwMycgaWQ9J3N2Z18yNycvPjxlbGxpcHNlIGZpbGw9JyNjNWM2ZTInIHN0cm9rZS13aWR0aD0nbnVsbCcgc3Ryb2tlLW9wYWNpdHk9J251bGwnIGN4PSc3OS44MDI4MjYnIGN5PScxMi40NTcwMDMnIGlkPSdzdmdfOScgcng9Jzc5LjUyNDA3Mycgcnk9JzExLjg3ODIyNicgc3Ryb2tlPSdibGFjaycvPjxyZWN0IGZpbGw9JyNjNWM2ZTInIHN0cm9rZS13aWR0aD0nbnVsbCcgc3Ryb2tlLW9wYWNpdHk9JzAnIGZpbGwtb3BhY2l0eT0nbnVsbCcgeD0nMS4wODM4NTYnIHk9Jzg1LjIzOTM1NCcgd2lkdGg9JzE1Ny44MzIyOTQnIGhlaWdodD0nMy42NjY2NDInIGlkPSdzdmdfMzAnIHN0cm9rZT0nIzAwMDAwMCcvPjwvc3ZnPlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IHNpemUxOiBWZWN0b3JBcnJheVR5cGUgPSBbMTYyLCA4Ml07XG4gIGNvbnN0IHNpemUyOiBWZWN0b3JBcnJheVR5cGUgPSBbMTYwLCAxMDBdO1xuXG4gIGZvciAobGV0IGk9MDsgaTwxMjAwOyArK2kpIHtcbiAgICBjb25zdCByYW5kRmxhZyA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XG5cbiAgICBiYXRjaC5wdXNoKG5ldyBTdmcoaSsxMDAsIHtcbiAgICAgIHBvc2l0aW9uOiBbTWF0aC5yYW5kb20oKSpkcmF3ZXIud2lkdGgsIE1hdGgucmFuZG9tKCkqZHJhd2VyLmhlaWdodF0sXG4gICAgICBzaXplOiByYW5kRmxhZyA/IHNpemUxIDogc2l6ZTIsXG4gICAgICBkYXRhOiByYW5kRmxhZyA/IGRhdGExIDogZGF0YTIsXG4gICAgICB6SW5kZXg6IDAsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxuICBzdG9yYWdlLmFkZEJhdGNoKGJhdGNoKTtcbn0sIDEwMDApO1xuXG4vLyBzZXRUaW1lb3V0KCgpID0+IHtcbi8vICAgc3RvcmFnZS5kZWxldGUoe1xuLy8gICAgIHR5cGVzRXhjbHVkZTogWydHcmlkJ10sXG4vLyAgICAgZXh0cmFGaWx0ZXI6IGl0ZW0gPT4gaXRlbS5jb25maWcuekluZGV4ID09PSAwLFxuLy8gICB9KTtcbi8vICAgc3RvcmFnZS5hZGQobmV3IFJlY3QoNTAsIHtcbi8vICAgICBwb3NpdGlvbjogWzEwMCwgMjVdLFxuLy8gICAgIHNpemU6IFs1MCwgMzBdLFxuLy8gICAgIHpJbmRleDogMSxcbi8vICAgICB2aXNpYmxlOiB0cnVlLFxuLy8gICAgIGZpbGxTdHlsZTogJ3JlZCcsXG4vLyAgICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4vLyAgICAgbGluZVdpZHRoOiAzLFxuLy8gICB9KSk7XG4vLyB9LCAxMDAwKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==