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
        var _this = this;
        // TODO перенести куда-нибудь
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
            // const coords2: VectorArrayType = this._viewConfig.transposeBackward(coords1);
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
            var difference = [
                mouseDownCoords[0] - mouseMoveCoords[0],
                mouseDownCoords[1] - mouseMoveCoords[1],
            ];
            _this._viewConfig.offset = [_this._viewConfig.offset[0] - difference[0], _this._viewConfig.offset[1] - difference[1]];
            mouseDownCoords = mouseMoveCoords;
        });
        this._domElement.addEventListener('mouseup', function () {
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
     * @param drawer - drawer object
     * @param xOffset - horizontal offset
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
}(_structs_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
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
/* harmony import */ var _structs_positional_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/positional-drawable */ "./src/canvas/structs/positional-drawable.ts");
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
        (_b = drawer.context).strokeRect.apply(_b, __spreadArray(__spreadArray([], this._config.position, false), this._config.size, false));
        drawer.context.closePath();
    };
    return Rect;
}(_structs_positional_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
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
/* harmony import */ var _structs_positional_drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../structs/positional-drawable */ "./src/canvas/structs/positional-drawable.ts");
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
    /**
     * Tries to draw the figure if the image is ready
     * @param drawer - drawer object
     */
    Svg.prototype._tryDraw = function (drawer) {
        var _a;
        if (this._img !== null) {
            drawer.context.beginPath();
            (_a = drawer.context).drawImage.apply(_a, __spreadArray([this._img], this._config.position, false));
            drawer.context.closePath();
            return true;
        }
        return false;
    };
    return Svg;
}(_structs_positional_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
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

/***/ "./src/canvas/structs/drawable-group.ts":
/*!**********************************************!*\
  !*** ./src/canvas/structs/drawable-group.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _drawable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawable */ "./src/canvas/structs/drawable.ts");
/* harmony import */ var _structs_drawable_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../structs/drawable-storage */ "./src/canvas/structs/drawable-storage.ts");
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
        _this._storage = new _structs_drawable_storage__WEBPACK_IMPORTED_MODULE_1__["default"](_this._processChildrenToGroup(children));
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
}(_drawable__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DrawableGroup);


/***/ }),

/***/ "./src/canvas/structs/drawable-storage.ts":
/*!************************************************!*\
  !*** ./src/canvas/structs/drawable-storage.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/observe-helper */ "./src/canvas/helpers/observe-helper.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/base */ "./src/canvas/helpers/base.ts");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector.ts");
/* harmony import */ var _positional_drawable_group__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./positional-drawable-group */ "./src/canvas/structs/positional-drawable-group.ts");




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
        var maxPosition = (0,_helpers_base__WEBPACK_IMPORTED_MODULE_1__.getMaxPosition)(groupItems.map(function (item) { return item.config.position; }));
        var groupSize = (0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(maxPosition).sub((0,_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(minPosition)).toArray();
        var groupZIndex = Math.max.apply(Math, groupItems.map(function (item) { return item.config.zIndex; })) + 1;
        var config = {
            position: minPosition,
            size: groupSize,
            zIndex: groupZIndex,
            visible: true,
        };
        var groupId = 'group-' + (new Date()).getTime() + '-' + Math.floor(Math.random() * 100000);
        var group = new _positional_drawable_group__WEBPACK_IMPORTED_MODULE_3__["default"](groupId, config, {}, groupItems);
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

/***/ "./src/canvas/structs/drawable.ts":
/*!****************************************!*\
  !*** ./src/canvas/structs/drawable.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_observe_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/observe-helper */ "./src/canvas/helpers/observe-helper.ts");
/* harmony import */ var _helpers_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/base */ "./src/canvas/helpers/base.ts");


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

/***/ "./src/canvas/structs/positional-drawable-group.ts":
/*!*********************************************************!*\
  !*** ./src/canvas/structs/positional-drawable-group.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _drawable_group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawable-group */ "./src/canvas/structs/drawable-group.ts");
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
}(_drawable_group__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PositionalDrawableGroup);


/***/ }),

/***/ "./src/canvas/structs/positional-drawable.ts":
/*!***************************************************!*\
  !*** ./src/canvas/structs/positional-drawable.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/canvas/structs/vector.ts");
/* harmony import */ var _drawable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawable */ "./src/canvas/structs/drawable.ts");
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
    return PositionalDrawable;
}(_drawable__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PositionalDrawable);


/***/ }),

/***/ "./src/canvas/structs/vector.ts":
/*!**************************************!*\
  !*** ./src/canvas/structs/vector.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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
     * {@inheritDoc DrawableStorageInterface.offViewChange}
     */
    ViewConfig.prototype.offViewChange = function (subscriberName) {
        this._observeHelper.offChange(subscriberName);
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
/* harmony import */ var _canvas_structs_drawable_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas/structs/drawable-storage */ "./src/canvas/structs/drawable-storage.ts");
/* harmony import */ var _canvas_structs_view_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas/structs/view-config */ "./src/canvas/structs/view-config.ts");
/* harmony import */ var _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas/figures/grid */ "./src/canvas/figures/grid.ts");
/* harmony import */ var _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvas/figures/svg */ "./src/canvas/figures/svg.ts");






var storage = new _canvas_structs_drawable_storage__WEBPACK_IMPORTED_MODULE_2__["default"]([
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
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](3, {
        position: [10, 25],
        size: [50, 50],
        zIndex: 1,
        visible: true,
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](4, {
        position: [700, 250],
        size: [150, 100],
        zIndex: 1,
        visible: true,
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 3,
    }),
    new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__["default"](5, {
        position: [300, 550],
        size: [150, 100],
        zIndex: 1,
        visible: true,
        data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
    }),
    new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__["default"](5, {
        position: [100, 550],
        size: [150, 100],
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
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](7, {
        position: [350, 300],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](8, {
        position: [300, 350],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 3,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_1__["default"](9, {
        position: [200, 200],
        size: [160, 160],
        zIndex: 0,
        visible: true,
        fillStyle: 'green',
        strokeStyle: 'blue',
        lineWidth: 3,
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
    for (var i = 0; i < 200; ++i) {
        batch.push(new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_5__["default"](i + 100, {
            position: [Math.random() * drawer.width, Math.random() * drawer.height],
            size: [30 + Math.random() * 100, 30 + Math.random() * 100],
            data: Math.random() > 0.5 ? data1 : data2,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBK0I7QUFDL0IsMkJBQTJCO0FBQzNCLHNCQUFzQjtBQUN0QixpQkFBaUI7QUFDakIscUJBQXFCO0FBQ3JCLHdCQUF3QjtBQUN4Qiw0QkFBNEI7QUFDNUIsb0JBQW9CO0FBQ3BCLFNBQVM7QUFDVCxZQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9jb3JlLmpzIiwid2VicGFjazovL2NhbnZhcy10cy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvbWQ1LmpzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZHJhd2VyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9ncmlkLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9yZWN0LnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9zdmcudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9oZWxwZXJzL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9oZWxwZXJzL2ltYWdlLWNhY2hlLWhlbHBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlLWdyb3VwLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS1zdG9yYWdlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvaW1hZ2UtY2FjaGUudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3Bvc2l0aW9uYWwtZHJhd2FibGUtZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3Bvc2l0aW9uYWwtZHJhd2FibGUudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZlY3Rvci50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmlldy1jb25maWcudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL2lnbm9yZWR8L2hvbWUvc21vcmVuL3Byb2plY3RzL2NhbnZhcy9ub2RlX21vZHVsZXMvY3J5cHRvLWpzfGNyeXB0byIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2NhbnZhcy10cy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0cm9vdC5DcnlwdG9KUyA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cblx0LypnbG9iYWxzIHdpbmRvdywgZ2xvYmFsLCByZXF1aXJlKi9cblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblxuXHQgICAgdmFyIGNyeXB0bztcblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gd2luZG93LmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBpbiB3ZWIgd29ya2VyIChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHNlbGYuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd29ya2VyXG5cdCAgICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gZ2xvYmFsVGhpcy5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSAoZXhwZXJpbWVudGFsIElFIDExKSBjcnlwdG8gZnJvbSB3aW5kb3cgKEJyb3dzZXIpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubXNDcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cubXNDcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSBnbG9iYWwgKE5vZGVKUylcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbC5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWwuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGltcG9ydCB2aWEgcmVxdWlyZSAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblx0ICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICB9XG5cblx0ICAgIC8qXG5cdCAgICAgKiBDcnlwdG9ncmFwaGljYWxseSBzZWN1cmUgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3Jcblx0ICAgICAqXG5cdCAgICAgKiBBcyBNYXRoLnJhbmRvbSgpIGlzIGNyeXB0b2dyYXBoaWNhbGx5IG5vdCBzYWZlIHRvIHVzZVxuXHQgICAgICovXG5cdCAgICB2YXIgY3J5cHRvU2VjdXJlUmFuZG9tSW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmIChjcnlwdG8pIHtcblx0ICAgICAgICAgICAgLy8gVXNlIGdldFJhbmRvbVZhbHVlcyBtZXRob2QgKEJyb3dzZXIpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoMSkpWzBdO1xuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gVXNlIHJhbmRvbUJ5dGVzIG1ldGhvZCAoTm9kZUpTKVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0by5yYW5kb21CeXRlcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKDQpLnJlYWRJbnQzMkxFKCk7XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cblx0ICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hdGl2ZSBjcnlwdG8gbW9kdWxlIGNvdWxkIG5vdCBiZSB1c2VkIHRvIGdldCBzZWN1cmUgcmFuZG9tIG51bWJlci4nKTtcblx0ICAgIH07XG5cblx0ICAgIC8qXG5cdCAgICAgKiBMb2NhbCBwb2x5ZmlsbCBvZiBPYmplY3QuY3JlYXRlXG5cblx0ICAgICAqL1xuXHQgICAgdmFyIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBGKCkge31cblxuXHQgICAgICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgICAgICAgIHZhciBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gb2JqO1xuXG5cdCAgICAgICAgICAgIHN1YnR5cGUgPSBuZXcgRigpO1xuXG5cdCAgICAgICAgICAgIEYucHJvdG90eXBlID0gbnVsbDtcblxuXHQgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cblxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgUHJvcGVydGllcyB0byBjb3B5IGludG8gdGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnLFxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTcGF3blxuXHQgICAgICAgICAgICAgICAgdmFyIHN1YnR5cGUgPSBjcmVhdGUodGhpcyk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSB8fCB0aGlzLmluaXQgPT09IHN1YnR5cGUuaW5pdCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhhdFNpZ0J5dGVzOyBqICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGopID4+PiAyXSA9IHRoYXRXb3Jkc1tqID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5CeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkcy5wdXNoKGNyeXB0b1NlY3VyZVJhbmRvbUludCgpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVNpZ0J5dGVzID0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IHRoaXMuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplQnl0ZXMgPSBibG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJsb2NrcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJsb2Nrc1JlYWR5ID0gZGF0YVNpZ0J5dGVzIC8gYmxvY2tTaXplQnl0ZXM7XG5cdCAgICAgICAgICAgIGlmIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCB1cCB0byBpbmNsdWRlIHBhcnRpYWwgYmxvY2tzXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLmNlaWwobkJsb2Nrc1JlYWR5KTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIGRvd24gdG8gaW5jbHVkZSBvbmx5IGZ1bGwgYmxvY2tzLFxuXHQgICAgICAgICAgICAgICAgLy8gbGVzcyB0aGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IG11c3QgcmVtYWluIGluIHRoZSBidWZmZXJcblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGgubWF4KChuQmxvY2tzUmVhZHkgfCAwKSAtIHRoaXMuX21pbkJ1ZmZlclNpemUsIDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgd29yZHMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5Xb3Jkc1JlYWR5ID0gbkJsb2Nrc1JlYWR5ICogYmxvY2tTaXplO1xuXG5cdCAgICAgICAgICAgIC8vIENvdW50IGJ5dGVzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQnl0ZXNSZWFkeSA9IE1hdGgubWluKG5Xb3Jkc1JlYWR5ICogNCwgZGF0YVNpZ0J5dGVzKTtcblxuXHQgICAgICAgICAgICAvLyBQcm9jZXNzIGJsb2Nrc1xuXHQgICAgICAgICAgICBpZiAobldvcmRzUmVhZHkpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IG5Xb3Jkc1JlYWR5OyBvZmZzZXQgKz0gYmxvY2tTaXplKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1hbGdvcml0aG0gbG9naWNcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLl9kb1Byb2Nlc3NCbG9jayhkYXRhV29yZHMsIG9mZnNldCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgICAgIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoTWF0aCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5O1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlcjtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8vIENvbnN0YW50cyB0YWJsZVxuXHQgICAgdmFyIFQgPSBbXTtcblxuXHQgICAgLy8gQ29tcHV0ZSBjb25zdGFudHNcblx0ICAgIChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgIFRbaV0gPSAoTWF0aC5hYnMoTWF0aC5zaW4oaSArIDEpKSAqIDB4MTAwMDAwMDAwKSB8IDA7XG5cdCAgICAgICAgfVxuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBNRDUgaGFzaCBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBNRDUgPSBDX2FsZ28uTUQ1ID0gSGFzaGVyLmV4dGVuZCh7XG5cdCAgICAgICAgX2RvUmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdGhpcy5faGFzaCA9IG5ldyBXb3JkQXJyYXkuaW5pdChbXG5cdCAgICAgICAgICAgICAgICAweDY3NDUyMzAxLCAweGVmY2RhYjg5LFxuXHQgICAgICAgICAgICAgICAgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3NlxuXHQgICAgICAgICAgICBdKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvUHJvY2Vzc0Jsb2NrOiBmdW5jdGlvbiAoTSwgb2Zmc2V0KSB7XG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0X2kgPSBvZmZzZXQgKyBpO1xuXHQgICAgICAgICAgICAgICAgdmFyIE1fb2Zmc2V0X2kgPSBNW29mZnNldF9pXTtcblxuXHQgICAgICAgICAgICAgICAgTVtvZmZzZXRfaV0gPSAoXG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCA4KSAgfCAoTV9vZmZzZXRfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDI0KSB8IChNX29mZnNldF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8wICA9IE1bb2Zmc2V0ICsgMF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xICA9IE1bb2Zmc2V0ICsgMV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8yICA9IE1bb2Zmc2V0ICsgMl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8zICA9IE1bb2Zmc2V0ICsgM107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF80ICA9IE1bb2Zmc2V0ICsgNF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF81ICA9IE1bb2Zmc2V0ICsgNV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF82ICA9IE1bb2Zmc2V0ICsgNl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF83ICA9IE1bb2Zmc2V0ICsgN107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF84ICA9IE1bb2Zmc2V0ICsgOF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF85ICA9IE1bb2Zmc2V0ICsgOV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMCA9IE1bb2Zmc2V0ICsgMTBdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTEgPSBNW29mZnNldCArIDExXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEyID0gTVtvZmZzZXQgKyAxMl07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMyA9IE1bb2Zmc2V0ICsgMTNdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTQgPSBNW29mZnNldCArIDE0XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzE1ID0gTVtvZmZzZXQgKyAxNV07XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWxiZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF8wLCAgNywgIFRbMF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfMSwgIDEyLCBUWzFdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzIsICAxNywgVFsyXSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8zLCAgMjIsIFRbM10pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfNCwgIDcsICBUWzRdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzUsICAxMiwgVFs1XSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF82LCAgMTcsIFRbNl0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfNywgIDIyLCBUWzddKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzgsICA3LCAgVFs4XSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF85LCAgMTIsIFRbOV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTAsIDE3LCBUWzEwXSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8xMSwgMjIsIFRbMTFdKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEyLCA3LCAgVFsxMl0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTMsIDEyLCBUWzEzXSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8xNCwgMTcsIFRbMTRdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzE1LCAyMiwgVFsxNV0pO1xuXG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF8xLCAgNSwgIFRbMTZdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzYsICA5LCAgVFsxN10pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMTEsIDE0LCBUWzE4XSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF8wLCAgMjAsIFRbMTldKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzUsICA1LCAgVFsyMF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMTAsIDksICBUWzIxXSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8xNSwgMTQsIFRbMjJdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzQsICAyMCwgVFsyM10pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfOSwgIDUsICBUWzI0XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8xNCwgOSwgIFRbMjVdKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzMsICAxNCwgVFsyNl0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfOCwgIDIwLCBUWzI3XSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF8xMywgNSwgIFRbMjhdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzIsICA5LCAgVFsyOV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfNywgIDE0LCBUWzMwXSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF8xMiwgMjAsIFRbMzFdKTtcblxuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfNSwgIDQsICBUWzMyXSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF84LCAgMTEsIFRbMzNdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzExLCAxNiwgVFszNF0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTQsIDIzLCBUWzM1XSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF8xLCAgNCwgIFRbMzZdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzQsICAxMSwgVFszN10pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfNywgIDE2LCBUWzM4XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8xMCwgMjMsIFRbMzldKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEzLCA0LCAgVFs0MF0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfMCwgIDExLCBUWzQxXSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8zLCAgMTYsIFRbNDJdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzYsICAyMywgVFs0M10pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfOSwgIDQsICBUWzQ0XSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF8xMiwgMTEsIFRbNDVdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE1LCAxNiwgVFs0Nl0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMiwgIDIzLCBUWzQ3XSk7XG5cblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzAsICA2LCAgVFs0OF0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfNywgIDEwLCBUWzQ5XSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8xNCwgMTUsIFRbNTBdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzUsICAyMSwgVFs1MV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTIsIDYsICBUWzUyXSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8zLCAgMTAsIFRbNTNdKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzEwLCAxNSwgVFs1NF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfMSwgIDIxLCBUWzU1XSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF84LCAgNiwgIFRbNTZdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzE1LCAxMCwgVFs1N10pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfNiwgIDE1LCBUWzU4XSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF8xMywgMjEsIFRbNTldKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzQsICA2LCAgVFs2MF0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTEsIDEwLCBUWzYxXSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8yLCAgMTUsIFRbNjJdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzksICAyMSwgVFs2M10pO1xuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWwgPSB0aGlzLl9uRGF0YUJ5dGVzICogODtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzTGVmdCA9IGRhdGEuc2lnQnl0ZXMgKiA4O1xuXG5cdCAgICAgICAgICAgIC8vIEFkZCBwYWRkaW5nXG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1tuQml0c0xlZnQgPj4+IDVdIHw9IDB4ODAgPDwgKDI0IC0gbkJpdHNMZWZ0ICUgMzIpO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsSCA9IE1hdGguZmxvb3IobkJpdHNUb3RhbCAvIDB4MTAwMDAwMDAwKTtcblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWxMID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNV0gPSAoXG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsSCA8PCA4KSAgfCAobkJpdHNUb3RhbEggPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsSCA8PCAyNCkgfCAobkJpdHNUb3RhbEggPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE0XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxMIDw8IDgpICB8IChuQml0c1RvdGFsTCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxMIDw8IDI0KSB8IChuQml0c1RvdGFsTCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IChkYXRhV29yZHMubGVuZ3RoICsgMSkgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9oYXNoO1xuXHQgICAgICAgICAgICB2YXIgSCA9IGhhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgICAgICB2YXIgSF9pID0gSFtpXTtcblxuXHQgICAgICAgICAgICAgICAgSFtpXSA9ICgoKEhfaSA8PCA4KSAgfCAoSF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICAgICgoKEhfaSA8PCAyNCkgfCAoSF9pID4+PiA4KSkgICYgMHhmZjAwZmYwMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgZnVuY3Rpb24gRkYoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArICgoYiAmIGMpIHwgKH5iICYgZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gR0coYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArICgoYiAmIGQpIHwgKGMgJiB+ZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gSEgoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArIChiIF4gYyBeIGQpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgZnVuY3Rpb24gSUkoYSwgYiwgYywgZCwgeCwgcywgdCkge1xuXHQgICAgICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgeCArIHQ7XG5cdCAgICAgICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcblx0ICAgIH1cblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLk1ENSgnbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuTUQ1KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuTUQ1ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoTUQ1KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNNRDUobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjTUQ1ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKE1ENSk7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLk1ENTtcblxufSkpOyIsImltcG9ydCB7XG4gIERyYXdlckludGVyZmFjZSxcbiAgRHJhd2VyQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIFZlY3RvckFycmF5VHlwZSxcbiAgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UsXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IGltYWdlQ2FjaGVIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2ltYWdlLWNhY2hlLWhlbHBlcic7XG5cbi8qKlxuICogQ2FudmFzIGRyYXdlclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3ZXIgaW1wbGVtZW50cyBEcmF3ZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTmFtZSBvZiBjbGFzcyB0byB1c2UgYXMgc3Vic2NyaWJlciBuYW1lIGluIG9ic2VydmFibGUgbG9naWNcbiAgICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlck5hbWU6IHN0cmluZyA9ICdEcmF3ZXInO1xuICAvKipcbiAgICogQ2FudmFzIERPTSBlbGVtZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgX2RvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfdmlld0NvbmZpZzogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBEcmF3YWJsZSBvYmplY3RzIHN0b3JhZ2VcbiAgICovXG4gIHByb3RlY3RlZCBfc3RvcmFnZTogRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlO1xuICAvKipcbiAgICogQ2FudmFzIGRyYXdpbmcgY29udGV4dFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIC8qKlxuICAgKiBSZXNpemUgb2JzZXJ2ZXIgb2JqZWN0XG4gICAqL1xuICBwcm90ZWN0ZWQgX3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcblxuICAvKipcbiAgICogRHJhd2VyIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBkb21FbGVtZW50IC0gY2FudmFzIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB2aWV3Q29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIHN0b3JhZ2UgLSBkcmF3YWJsZSBvYmplY3RzIHN0b3JhZ2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBkb21FbGVtZW50LFxuICAgIHZpZXdDb25maWcsXG4gICAgc3RvcmFnZSxcbiAgfTogRHJhd2VyQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5fdmlld0NvbmZpZyA9IHZpZXdDb25maWc7XG4gICAgdGhpcy5fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgdGhpcy5fY29udGV4dCA9IGRvbUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIHRoaXMuX2luaXRSZXNpemVPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRWaWV3Q29uZmlnT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9pbml0U3RvcmFnZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdEltYWdlQ2FjaGVPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRNb3VzZUV2ZW50cygpO1xuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdlckludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoLi4udGhpcy5fdmlld0NvbmZpZy5vZmZzZXQpO1xuICAgIHRoaXMuX2NvbnRleHQuc2NhbGUoLi4udGhpcy5fdmlld0NvbmZpZy5zY2FsZSk7XG4gICAgdGhpcy5fc3RvcmFnZS5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmNvbmZpZy52aXNpYmxlKSB7XG4gICAgICAgIGl0ZW0uZHJhdyh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLnJlZnJlc2h9XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZG9tRWxlbWVudC53aWR0aCAhPT0gdGhpcy53aWR0aCkge1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RvbUVsZW1lbnQuaGVpZ2h0ICE9PSB0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygncmVmcmVzaGVkJyk7XG5cbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdlckludGVyZmFjZS5jbGVhcn1cbiAgICovXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBib3VuZHMgb2YgY2FudmFzIGZyYW1lXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm91bmRzKCk6IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQoWzAsIDBdKSxcbiAgICAgIHRoaXMuX3ZpZXdDb25maWcudHJhbnNwb3NlRm9yd2FyZChbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKSxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIGdldHRlclxuICAgKi9cbiAgZ2V0IHZpZXdDb25maWcoKTogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl92aWV3Q29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyBjb250ZXh0IGdldHRlclxuICAgKi9cbiAgZ2V0IGNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgd2lkdGggZ2V0dGVyXG4gICAqL1xuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgaGVpZ2h0IGdldHRlclxuICAgKi9cbiAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kb21FbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgY2FudmFzIHJlc2l6ZSBvYnNlcnZlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0UmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5fZG9tRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHZpZXcgY29uZmlnIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRWaWV3Q29uZmlnT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld0NvbmZpZy5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgc3RvcmFnZSBvYnNlcnZlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0U3RvcmFnZU9ic2VydmVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JhZ2Uub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIGltYWdlIGNhY2hlIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRJbWFnZUNhY2hlT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaW1hZ2VDYWNoZUhlbHBlci5zdWJzY3JpYmUodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHtcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBtb3VzZSBldmVudHMgb2JzZXJ2ZXJcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdE1vdXNlRXZlbnRzKCk6IHZvaWQge1xuICAgIC8vIFRPRE8g0L/QtdGA0LXQvdC10YHRgtC4INC60YPQtNCwLdC90LjQsdGD0LTRjFxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5jdHJsS2V5KSB7XG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuX3ZpZXdDb25maWcuc2NhbGVbMF07XG4gICAgICAgIHNjYWxlICs9IGV2ZW50LmRlbHRhWSAqIC0wLjAwMjtcbiAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihNYXRoLm1heCgwLjAwMSwgc2NhbGUpLCAxMDApO1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLnVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0KFtzY2FsZSwgc2NhbGVdLCBbZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WV0pO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFswXSAtPSBldmVudC5kZWx0YVk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFsxXSAtPSBldmVudC5kZWx0YVk7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkczogVmVjdG9yQXJyYXlUeXBlID0gW2V2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFldO1xuICAgICAgY29uc3QgY29vcmRzMTogVmVjdG9yQXJyYXlUeXBlID0gdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKGNvb3Jkcyk7XG4gICAgICAvLyBjb25zdCBjb29yZHMyOiBWZWN0b3JBcnJheVR5cGUgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUJhY2t3YXJkKGNvb3JkczEpO1xuICAgICAgY29uc29sZS5sb2coJ21vdXNlIGNvb3JkcycsIGNvb3Jkcyk7XG4gICAgICBjb25zb2xlLmxvZygncmVhbCBjb29yZHMnLCBjb29yZHMxKTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIGxldCBtb3VzZURvd25Db29yZHM6IFZlY3RvckFycmF5VHlwZSB8IG51bGwgPSBudWxsO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBpZiAobW91c2VEb3duQ29vcmRzID09PSBudWxsKSB7XG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2V3LXJlc2l6ZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2Nyb3NzaGFpcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vdXNlTW92ZUNvb3JkczogVmVjdG9yQXJyYXlUeXBlID0gW2V2ZW50Lm9mZnNldFgsIGV2ZW50Lm9mZnNldFldO1xuICAgICAgY29uc3QgZGlmZmVyZW5jZTogVmVjdG9yQXJyYXlUeXBlID0gW1xuICAgICAgICBtb3VzZURvd25Db29yZHNbMF0tbW91c2VNb3ZlQ29vcmRzWzBdLFxuICAgICAgICBtb3VzZURvd25Db29yZHNbMV0tbW91c2VNb3ZlQ29vcmRzWzFdLFxuICAgICAgXTtcbiAgICAgIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0ID0gW3RoaXMuX3ZpZXdDb25maWcub2Zmc2V0WzBdLWRpZmZlcmVuY2VbMF0sIHRoaXMuX3ZpZXdDb25maWcub2Zmc2V0WzFdLWRpZmZlcmVuY2VbMV1dO1xuICAgICAgbW91c2VEb3duQ29vcmRzID0gbW91c2VNb3ZlQ29vcmRzO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgbW91c2VEb3duQ29vcmRzID0gbnVsbDtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBEcmF3YWJsZSBmcm9tICcuLi9zdHJ1Y3RzL2RyYXdhYmxlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiBncmlkXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENvbmZpZ0ludGVyZmFjZSBleHRlbmRzIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgbWFpbkxpbmVDb2xvcjogc3RyaW5nO1xuICBzdWJMaW5lQ29sb3I6IHN0cmluZztcbiAgbGluZVdpZHRoOiBudW1iZXI7XG4gIGxpbmVzSW5CbG9jazogbnVtYmVyO1xufVxuXG4vKipcbiAqIEdyaWQgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdHcmlkJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogR3JpZENvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogR3JpZCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBHcmlkQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuc2F2ZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgY29uc3QgW2Zyb21Cb3VuZCwgdG9Cb3VuZF0gPSBkcmF3ZXIuZ2V0Qm91bmRzKCk7XG4gICAgY29uc3Qgc2NhbGUgPSBkcmF3ZXIudmlld0NvbmZpZy5zY2FsZVswXTtcblxuICAgIGRyYXdlci5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuX2NvbmZpZy5saW5lV2lkdGggLyBzY2FsZTtcblxuICAgIGxldCBzdGVwID0gZHJhd2VyLnZpZXdDb25maWcuZ3JpZFN0ZXA7XG5cbiAgICBpZiAoc2NhbGUgPCAxKSB7XG4gICAgICBzdGVwICo9IDIgKiogTWF0aC5yb3VuZChNYXRoLmxvZzIoMSAvIHNjYWxlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ZXAgLz0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMihzY2FsZSkpO1xuICAgIH1cblxuICAgIGNvbnN0IG1haW5MaW5lRGlzdGFuY2UgPSBzdGVwICogdGhpcy5fY29uZmlnLmxpbmVzSW5CbG9jaztcbiAgICBsZXQgeEdhcCA9IChmcm9tQm91bmRbMF0gJSBtYWluTGluZURpc3RhbmNlKTtcbiAgICBpZiAoeEdhcCA8IDApIHtcbiAgICAgIHhHYXAgKz0gbWFpbkxpbmVEaXN0YW5jZTtcbiAgICB9XG4gICAgbGV0IHlHYXAgPSAoZnJvbUJvdW5kWzFdICUgbWFpbkxpbmVEaXN0YW5jZSk7XG4gICAgaWYgKHlHYXAgPCAwKSB7XG4gICAgICB5R2FwICs9IG1haW5MaW5lRGlzdGFuY2U7XG4gICAgfVxuXG4gICAge1xuICAgICAgbGV0IGogPSAwO1xuICAgICAgZm9yIChsZXQgaT1mcm9tQm91bmRbMV0teUdhcDsgaTw9dG9Cb3VuZFsxXTsgaSs9c3RlcCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IChqKysgJSB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrID09PSAwKVxuICAgICAgICAgID8gdGhpcy5fY29uZmlnLm1haW5MaW5lQ29sb3JcbiAgICAgICAgICA6IHRoaXMuX2NvbmZpZy5zdWJMaW5lQ29sb3I7XG4gICAgICAgIHRoaXMuX2RyYXdIb3Jpem9udGFsTGluZShpLCBkcmF3ZXIsIGNvbG9yLCBbZnJvbUJvdW5kLCB0b0JvdW5kXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAge1xuICAgICAgbGV0IGogPSAwO1xuICAgICAgZm9yIChsZXQgaT1mcm9tQm91bmRbMF0teEdhcDsgaTw9dG9Cb3VuZFswXTsgaSs9c3RlcCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IChqKysgJSB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrID09PSAwKVxuICAgICAgICAgID8gdGhpcy5fY29uZmlnLm1haW5MaW5lQ29sb3JcbiAgICAgICAgICA6IHRoaXMuX2NvbmZpZy5zdWJMaW5lQ29sb3I7XG4gICAgICAgIHRoaXMuX2RyYXdWZXJ0aWNhbExpbmUoaSwgZHJhd2VyLCBjb2xvciwgW2Zyb21Cb3VuZCwgdG9Cb3VuZF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGhvcml6b250YWwgbGluZVxuICAgKiBAcGFyYW0gZHJhd2VyIC0gZHJhd2VyIG9iamVjdFxuICAgKiBAcGFyYW0geE9mZnNldCAtIGhvcml6b250YWwgb2Zmc2V0XG4gICAqIEBwYXJhbSBjb2xvciAtIGNvbG9yXG4gICAqIEBwYXJhbSBmcm9tQm91bmQgLSBsZWZ0LXRvcCBib3VuZFxuICAgKiBAcGFyYW0gdG9Cb3VuZCAtIHJpZ2h0LWJvdHRvbSBib3VuZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kcmF3SG9yaXpvbnRhbExpbmUoXG4gICAgeU9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0sXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW2Zyb21Cb3VuZFswXSwgeU9mZnNldF07XG4gICAgY29uc3QgbGluZVRvID0gW3RvQm91bmRbMF0sIHlPZmZzZXRdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyB2ZXJ0aWNhbCBsaW5lXG4gICAqIEBwYXJhbSBkcmF3ZXIgLSBkcmF3ZXIgb2JqZWN0XG4gICAqIEBwYXJhbSB4T2Zmc2V0IC0gaG9yaXpvbnRhbCBvZmZzZXRcbiAgICogQHBhcmFtIGNvbG9yIC0gY29sb3JcbiAgICogQHBhcmFtIGZyb21Cb3VuZCAtIGxlZnQtdG9wIGJvdW5kXG4gICAqIEBwYXJhbSB0b0JvdW5kIC0gcmlnaHQtYm90dG9tIGJvdW5kXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RyYXdWZXJ0aWNhbExpbmUoXG4gICAgeE9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0sXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW3hPZmZzZXQsIGZyb21Cb3VuZFsxXV07XG4gICAgY29uc3QgbGluZVRvID0gW3hPZmZzZXQsIHRvQm91bmRbMV1dO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBTdHlsaXplZERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFBvc2l0aW9uYWxEcmF3YWJsZSBmcm9tICcuLi9zdHJ1Y3RzL3Bvc2l0aW9uYWwtZHJhd2FibGUnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIHJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVjdENvbmZpZ0ludGVyZmFjZSBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgU3R5bGl6ZWREcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG5cbn1cblxuLyoqXG4gKiBSZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0IGV4dGVuZHMgUG9zaXRpb25hbERyYXdhYmxlIGltcGxlbWVudHMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdSZWN0JztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUmVjdENvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogUmVjdCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBSZWN0Q29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9jb25maWcuc3Ryb2tlU3R5bGU7XG4gICAgZHJhd2VyLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fY29uZmlnLmZpbGxTdHlsZTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLl9jb25maWcubGluZVdpZHRoO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGxSZWN0KC4uLnRoaXMuX2NvbmZpZy5wb3NpdGlvbiwgLi4udGhpcy5fY29uZmlnLnNpemUpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVJlY3QoLi4udGhpcy5fY29uZmlnLnBvc2l0aW9uLCAuLi50aGlzLl9jb25maWcuc2l6ZSk7XG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFBvc2l0aW9uYWxEcmF3YWJsZSBmcm9tICcuLi9zdHJ1Y3RzL3Bvc2l0aW9uYWwtZHJhd2FibGUnO1xuaW1wb3J0IGltYWdlQ2FjaGVIZWxwZXIgZnJvbSAnLi4vaGVscGVycy9pbWFnZS1jYWNoZS1oZWxwZXInO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIHJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3ZnQ29uZmlnSW50ZXJmYWNlIGV4dGVuZHMgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFNWRyBkYXRhXG4gICAqL1xuICBkYXRhOiBzdHJpbmc7XG59XG5cbi8qKlxuICogU3ZnIGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcgZXh0ZW5kcyBQb3NpdGlvbmFsRHJhd2FibGUgaW1wbGVtZW50cyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ1N2Zyc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IFN2Z0NvbmZpZ0ludGVyZmFjZTtcbiAgLyoqXG4gICAqIEltYWdlIERPTSBlbGVtZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgX2ltZzogSFRNTEltYWdlRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTdmcgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpZDogRHJhd2FibGVJZFR5cGUsIGNvbmZpZzogU3ZnQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdHJ5RHJhdyhkcmF3ZXIpKSB7XG4gICAgICB0aGlzLl9pbWcgPSBpbWFnZUNhY2hlSGVscGVyLmNhY2hlKHRoaXMuX2NvbmZpZy5kYXRhLCAnaW1hZ2Uvc3ZnK3htbCcsIChpbWcpID0+IHtcbiAgICAgICAgdGhpcy5faW1nID0gaW1nO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl90cnlEcmF3KGRyYXdlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIGRyYXcgdGhlIGZpZ3VyZSBpZiB0aGUgaW1hZ2UgaXMgcmVhZHlcbiAgICogQHBhcmFtIGRyYXdlciAtIGRyYXdlciBvYmplY3RcbiAgICovXG4gIHByb3RlY3RlZCBfdHJ5RHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9pbWcgIT09IG51bGwpIHtcbiAgICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgZHJhd2VyLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuX2ltZywgLi4udGhpcy5fY29uZmlnLnBvc2l0aW9uKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IGRlZmF1bHQgYXMgbWQ1IH0gZnJvbSAnY3J5cHRvLWpzL21kNSc7XG5pbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFycmF5cyBhcmUgZXF1YWwgYW5kIGZhbHNlIGVsc2VcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBsaHMgLSBmaXJzdCBhcnJheSB0byBjb21wYXJlXG4gKiBAcGFyYW0gcmhzIC0gc2Vjb25kIGFycmF5IHRvIGNvbXBhcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyZUFycmF5c0VxdWFsKGxoczogQXJyYXk8dW5rbm93bj4sIHJoczogQXJyYXk8dW5rbm93bj4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGxocy5sZW5ndGggPT09IHJocy5sZW5ndGggJiYgbGhzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSByaHNbaV0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgRE9NIGVsZW1lbnQgZnJvbSBIVE1MIHN0cmluZ1xuICogQHB1YmxpY1xuICogQHBhcmFtIGh0bWxTdHJpbmcgLSBIVE1MIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEZyb21IVE1MKGh0bWxTdHJpbmc6IHN0cmluZyk6IHVua25vd24ge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmlubmVySFRNTCA9IGh0bWxTdHJpbmcudHJpbSgpO1xuXG4gIHJldHVybiBkaXYuZmlyc3RDaGlsZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGJsb2IgZnJvbSB0ZXh0XG4gKiBAcHVibGljXG4gKiBAcGFyYW0gZGF0YSAtIHRleHRcbiAqIEBwYXJhbSB0eXBlIC0gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmxvYihkYXRhOiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6IEJsb2Ige1xuICByZXR1cm4gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGUgfSk7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciB1bmRlcnN0YW5kaW5nIG1ldGhvZCBjcmVhdGVPYmplY3RVUkwoKVxuICovXG5pbnRlcmZhY2UgVXJsSW50ZXJmYWNlIHtcbiAgY3JlYXRlT2JqZWN0VVJMKGJsb2I6IEJsb2IpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBVUkwgZnJvbSBibG9iXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gYmxvYiAtIGJsb2JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVybEZyb21CbG9iKGJsb2I6IEJsb2IpOiBzdHJpbmcge1xuICBjb25zdCBVUkw6IFVybEludGVyZmFjZSA9ICh3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93KSBhcyBVcmxJbnRlcmZhY2U7XG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufVxuXG4vKipcbiAqIEZpbmRzIGFuZCByZXR1cm5zIG1pbmltYWwgKGxlZnQtdG9wKSBwb3NpdGlvblxuICogQHB1YmxpY1xuICogQHBhcmFtIHBvc2l0aW9ucyAtIGlucHV0IHBvc2l0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWluUG9zaXRpb24ocG9zaXRpb25zOiBWZWN0b3JBcnJheVR5cGVbXSk6IFZlY3RvckFycmF5VHlwZSB7XG4gIGxldCBtaW5YOiBudW1iZXIgPSBJbmZpbml0eTtcbiAgbGV0IG1pblk6IG51bWJlciA9IEluZmluaXR5O1xuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIGlmIChwb3NpdGlvblswXSA8IG1pblgpIHtcbiAgICAgIG1pblggPSBwb3NpdGlvblswXTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uWzFdIDwgbWluWSkge1xuICAgICAgbWluWSA9IHBvc2l0aW9uWzFdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFttaW5YLCBtaW5ZXTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhbmQgcmV0dXJucyBtYXhpbWFsIChyaWdodC1ib3R0b20pIHBvc2l0aW9uXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gcG9zaXRpb25zIC0gaW5wdXQgcG9zaXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXhQb3NpdGlvbihwb3NpdGlvbnM6IFZlY3RvckFycmF5VHlwZVtdKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgbGV0IG1heFg6IG51bWJlciA9IC1JbmZpbml0eTtcbiAgbGV0IG1heFk6IG51bWJlciA9IC1JbmZpbml0eTtcblxuICBwb3NpdGlvbnMuZm9yRWFjaCgocG9zaXRpb24pID0+IHtcbiAgICBpZiAocG9zaXRpb25bMF0gPiBtYXhYKSB7XG4gICAgICBtYXhYID0gcG9zaXRpb25bMF07XG4gICAgfVxuICAgIGlmIChwb3NpdGlvblsxXSA+IG1heFkpIHtcbiAgICAgIG1heFkgPSBwb3NpdGlvblsxXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBbbWF4WCwgbWF4WV07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBNRDUgaGFzaCBmcm9tIHN0cmluZ1xuICogQHB1YmxpY1xuICogQHBhcmFtIGlucHV0IC0gaW5wdXQgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNoU3RyaW5nKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbWQ1KGlucHV0KS50b1N0cmluZygpO1xufVxuIiwiaW1wb3J0IEltYWdlQ2FjaGUgZnJvbSAnLi4vc3RydWN0cy9pbWFnZS1jYWNoZSc7XG5cbi8qKlxuICogSW1hZ2UgY2FjaGUgaGVscGVyXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IG5ldyBJbWFnZUNhY2hlKCk7XG4iLCJpbXBvcnQgeyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLCBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlSGVscGVyIGltcGxlbWVudHMgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBIYW5kbGVycyBtYXBwZWQgYnkgc3Vic2NyaWJlcnNcbiAgICovXG4gIHByb3RlY3RlZCBfaGFuZGxlck1hcDogUmVjb3JkPHN0cmluZywgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZT4gPSB7fTtcbiAgLyoqXG4gICAqIEZsYWcgZm9yIG11dGluZyBoYW5kbGVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9tdXRlSGFuZGxlcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uub25DaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25DaGFuZ2UoXG4gICAgc3Vic2NyaWJlck5hbWU6IHN0cmluZyxcbiAgICBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9oYW5kbGVyTWFwW3N1YnNjcmliZXJOYW1lXSA9IGhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uub2ZmQ2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZkNoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuX2hhbmRsZXJNYXBbc3Vic2NyaWJlck5hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzfVxuICAgKi9cbiAgcHVibGljIHByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKFxuICAgIGV4dHJhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPSBudWxsLFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbikgPT4gdGhpcy5wcm9jZXNzSGFuZGxlcnMobXV0ZWRCZWZvcmUsIGV4dHJhKSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uud2l0aE11dGVIYW5kbGVyc31cbiAgICovXG4gIHB1YmxpYyB3aXRoTXV0ZUhhbmRsZXJzKFxuICAgIGFjdGlvbjogKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB2b2lkLFxuICApOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fbXV0ZUhhbmRsZXJzKSB7XG4gICAgICBhY3Rpb24odHJ1ZSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX211dGVIYW5kbGVycyA9IHRydWU7XG4gICAgICBhY3Rpb24oZmFsc2UsIHRoaXMpO1xuICAgICAgdGhpcy5fbXV0ZUhhbmRsZXJzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UucHJvY2Vzc0hhbmRsZXJzfVxuICAgKi9cbiAgcHVibGljIHByb2Nlc3NIYW5kbGVycyhcbiAgICBpc011dGVkOiBib29sZWFuLFxuICAgIGV4dHJhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPSBudWxsLFxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIWlzTXV0ZWQpIHtcbiAgICAgIE9iamVjdC52YWx1ZXModGhpcy5faGFuZGxlck1hcClcbiAgICAgICAgLmZvckVhY2goKGhhbmRsZXIpID0+IGhhbmRsZXIodGhpcywgZXh0cmEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRHJhd2FibGVHcm91cEludGVyZmFjZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgRHJhd2FibGUgZnJvbSAnLi9kcmF3YWJsZSc7XG5pbXBvcnQgRHJhd2FibGVTdG9yYWdlIGZyb20gJy4uL3N0cnVjdHMvZHJhd2FibGUtc3RvcmFnZSc7XG5cbi8qKlxuICogRHJhd2FibGUgZ3JvdXAgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2FibGVHcm91cCBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVHcm91cEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdhYmxlR3JvdXAnO1xuICAvKipcbiAgICogU3RvcmFnZSBvZiB0aGUgY2hpbGRyZW4gb2JqZWN0c1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdG9yYWdlOiBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlR3JvdXAgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gZ3JvdXAgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGV4dHJhIGRhdGFcbiAgICogQHBhcmFtIGNoaWxkcmVuIC0gY2hpbGRyZW4gb2YgZ3JvdXBlZCBvYmplY3RzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogRHJhd2FibGVJZFR5cGUsXG4gICAgY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgICBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9LFxuICAgIGNoaWxkcmVuOiBEcmF3YWJsZUludGVyZmFjZVtdID0gW10sXG4gICkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEpO1xuXG4gICAgdGhpcy5fc3RvcmFnZSA9IG5ldyBEcmF3YWJsZVN0b3JhZ2UodGhpcy5fcHJvY2Vzc0NoaWxkcmVuVG9Hcm91cChjaGlsZHJlbikpO1xuICAgIHRoaXMuX3N0b3JhZ2Uub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAodGFyZ2V0LCBleHRyYSkgPT4ge1xuICAgICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyhleHRyYSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JhZ2UubGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5jb25maWcudmlzaWJsZSkge1xuICAgICAgICBpdGVtLmRyYXcoZHJhd2VyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZGVzdHJ1Y3R9XG4gICAqL1xuICBwdWJsaWMgZGVzdHJ1Y3QoKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgdGhpcy5fc3RvcmFnZS5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ub2ZmVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc0NoaWxkcmVuVG9Vbmdyb3VwKHRoaXMuY2hpbGRyZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3QgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLmxpc3Q7XG4gIH1cblxuICAvKipcbiAgICogU29tZSBhY3Rpb25zIHdpdGggY2hpbGRyZW4gYmVmb3JlIGdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NDaGlsZHJlblRvR3JvdXAoY2hpbGRyZW46IERyYXdhYmxlSW50ZXJmYWNlW10pOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogU29tZSBhY3Rpb25zIHdpdGggY2hpbGRyZW4gYmVmb3JlIHVuZ3JvdXBpbmdcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc0NoaWxkcmVuVG9Vbmdyb3VwKGNoaWxkcmVuOiBEcmF3YWJsZUludGVyZmFjZVtdKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVTdG9yYWdlRmlsdGVyQ2FsbGJhY2tUeXBlLFxuICBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDb25maWdJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tICcuLi9oZWxwZXJzL29ic2VydmUtaGVscGVyJztcbmltcG9ydCBEcmF3YWJsZUdyb3VwIGZyb20gJy4vZHJhd2FibGUtZ3JvdXAnO1xuaW1wb3J0IHsgZ2V0TWF4UG9zaXRpb24sIGdldE1pblBvc2l0aW9uIH0gZnJvbSAnLi4vaGVscGVycy9iYXNlJztcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciB9IGZyb20gJy4vdmVjdG9yJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGVHcm91cCBmcm9tICcuL3Bvc2l0aW9uYWwtZHJhd2FibGUtZ3JvdXAnO1xuXG4vKipcbiAqIFN0b3JhZ2UgZm9yIGRyYXdhYmxlIG9iamVjdHNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2FibGVTdG9yYWdlIGltcGxlbWVudHMgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgY2xhc3MgdG8gdXNlIGFzIHN1YnNjcmliZXIgbmFtZSBpbiBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZXJOYW1lOiBzdHJpbmcgPSAnRHJhd2FibGVTdG9yYWdlJztcbiAgLyoqXG4gICAqIExpc3Qgb2Ygc3RvcmVkIGRyYXdhYmxlIG9iamVjdHNcbiAgICovXG4gIHByb3RlY3RlZCBfbGlzdDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuICAvKipcbiAgICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX29ic2VydmVIZWxwZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpdGVtcyAtIGJhdGNoIGNoaWxkcmVuIHRvIGNhY2hlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpdGVtczogRHJhd2FibGVJbnRlcmZhY2VbXSkge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuYWRkQmF0Y2goaXRlbXMpO1xuICAgIHRoaXMuX3NvcnQoKTtcblxuICAgIHRoaXMub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAodGFyZ2V0LCBleHRyYSkgPT4ge1xuICAgICAgaWYgKGV4dHJhICE9PSBudWxsICYmIGV4dHJhLmhhc093blByb3BlcnR5KCd6SW5kZXhDaGFuZ2VkJykgJiYgZXh0cmEuekluZGV4Q2hhbmdlZCkge1xuICAgICAgICB0aGlzLl9zb3J0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVkIGRyYXdhYmxlIG9iamVjdHMgY2hpbGRyZW4gZ2V0dGVyXG4gICAqL1xuICBnZXQgbGlzdCgpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmNhY2hlfVxuICAgKi9cbiAgcHVibGljIGFkZChpdGVtOiBEcmF3YWJsZUludGVyZmFjZSk6IHZvaWQge1xuICAgIGl0ZW0ub25WaWV3Q2hhbmdlKFxuICAgICAgdGhpcy5fc3Vic2NyaWJlck5hbWUsXG4gICAgICAodGFyZ2V0LCBleHRyYSkgPT4gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyhleHRyYSksXG4gICAgKTtcbiAgICB0aGlzLl9saXN0LnB1c2goaXRlbSk7XG4gICAgdGhpcy5fc29ydCgpO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmNhY2hlfVxuICAgKi9cbiAgcHVibGljIGFkZEJhdGNoKGl0ZW1zOiBEcmF3YWJsZUludGVyZmFjZVtdKTogdm9pZCB7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5vblZpZXdDaGFuZ2UoXG4gICAgICAgIHRoaXMuX3N1YnNjcmliZXJOYW1lLFxuICAgICAgICAodGFyZ2V0LCBleHRyYSkgPT4gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyhleHRyYSksXG4gICAgICApO1xuICAgICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICAgIHRoaXMuX3NvcnQoKTtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBvYmplY3RzIGZvdW5kIGJ5IGNvbmZpZyBmcm9tIHN0b3JhZ2VcbiAgICogQHBhcmFtIGNvbmZpZyAtIGZpbHRlciBjb25maWdcbiAgICovXG4gIHB1YmxpYyBkZWxldGUoY29uZmlnOiBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDb25maWdJbnRlcmZhY2UpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygoKSA9PiB7XG4gICAgICB0aGlzLmZpbmQoY29uZmlnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZGVsZXRlQnlJZChpdGVtLmlkKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgb2JqZWN0IGJ5IElEIGZyb20gc3RvcmFnZVxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICovXG4gIHB1YmxpYyBkZWxldGVCeUlkKGlkOiBEcmF3YWJsZUlkVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBkZWxldGVkSXRlbSA9IHRoaXMuX2xpc3Quc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgIGRlbGV0ZWRJdGVtLm9mZlZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUpO1xuICAgICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICAgICAgcmV0dXJuIGRlbGV0ZWRJdGVtO1xuICAgIH1cblxuICAgIC8vIFRPRE8gY3VzdG9taXplIGV4Y2VwdGlvblxuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGZpbmQgb2JqZWN0IHdpdGggaWQgJyR7aWR9J2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuY2xlYXJ9XG4gICAqL1xuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZmluZH1cbiAgICovXG4gIHB1YmxpYyBmaW5kKGNvbmZpZzogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmQoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChjb25maWcuaWRzT25seSAmJiBjb25maWcuaWRzT25seS5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmlkc0V4Y2x1ZGUgJiYgY29uZmlnLmlkc0V4Y2x1ZGUuaW5kZXhPZihpdGVtLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnR5cGVzT25seSAmJiBjb25maWcudHlwZXNPbmx5LmluZGV4T2YoaXRlbS50eXBlKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy50eXBlc0V4Y2x1ZGUgJiYgY29uZmlnLnR5cGVzRXhjbHVkZS5pbmRleE9mKGl0ZW0udHlwZSkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICEoY29uZmlnLmV4dHJhRmlsdGVyICYmICFjb25maWcuZXh0cmFGaWx0ZXIoaXRlbSkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZmluZEJ5SWR9XG4gICAqL1xuICBwdWJsaWMgZmluZEJ5SWQoaWQ6IERyYXdhYmxlSWRUeXBlKTogRHJhd2FibGVJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGZvdW5kSXRlbXMgPSB0aGlzLl9maW5kKChjYW5kaWRhdGUpID0+IGNhbmRpZGF0ZS5pZCA9PT0gaWQpO1xuICAgIGlmIChmb3VuZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZvdW5kSXRlbXNbMF07XG4gICAgfVxuICAgIC8vIFRPRE8gY3VzdG9taXplIGV4Y2VwdGlvblxuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGZpbmQgb2JqZWN0IHdpdGggaWQgJyR7aWR9J2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZ3JvdXB9XG4gICAqL1xuICBwdWJsaWMgZ3JvdXAoaWRzOiBEcmF3YWJsZUlkVHlwZVtdKTogRHJhd2FibGVHcm91cCB7XG4gICAgY29uc3QgZ3JvdXBJdGVtcyA9IHRoaXMuZGVsZXRlKHsgaWRzT25seTogaWRzIH0pIGFzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdO1xuICAgIGNvbnN0IG1pblBvc2l0aW9uID0gZ2V0TWluUG9zaXRpb24oZ3JvdXBJdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uY29uZmlnLnBvc2l0aW9uKSk7XG4gICAgY29uc3QgbWF4UG9zaXRpb24gPSBnZXRNYXhQb3NpdGlvbihncm91cEl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5jb25maWcucG9zaXRpb24pKTtcbiAgICBjb25zdCBncm91cFNpemUgPSBjcmVhdGVWZWN0b3IobWF4UG9zaXRpb24pLnN1YihjcmVhdGVWZWN0b3IobWluUG9zaXRpb24pKS50b0FycmF5KCk7XG4gICAgY29uc3QgZ3JvdXBaSW5kZXggPSBNYXRoLm1heCguLi5ncm91cEl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5jb25maWcuekluZGV4KSkrMTtcblxuICAgIGNvbnN0IGNvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlID0ge1xuICAgICAgcG9zaXRpb246IG1pblBvc2l0aW9uLFxuICAgICAgc2l6ZTogZ3JvdXBTaXplLFxuICAgICAgekluZGV4OiBncm91cFpJbmRleCxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgfTtcblxuICAgIGNvbnN0IGdyb3VwSWQgPSAnZ3JvdXAtJysobmV3IERhdGUoKSkuZ2V0VGltZSgpKyctJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDAwKTtcbiAgICBjb25zdCBncm91cCA9IG5ldyBQb3NpdGlvbmFsRHJhd2FibGVHcm91cChncm91cElkLCBjb25maWcsIHt9LCBncm91cEl0ZW1zKTtcbiAgICB0aGlzLmFkZChncm91cCk7XG5cbiAgICByZXR1cm4gZ3JvdXA7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS51bmdyb3VwfVxuICAgKi9cbiAgcHVibGljIHVuZ3JvdXAoZ3JvdXBJZDogRHJhd2FibGVJZFR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBncm91cDogRHJhd2FibGVHcm91cCA9IHRoaXMuZGVsZXRlQnlJZChncm91cElkKSBhcyBEcmF3YWJsZUdyb3VwO1xuICAgIHRoaXMuYWRkQmF0Y2goZ3JvdXAuZGVzdHJ1Y3QoKSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5vblZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25WaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9uQ2hhbmdlKHN1YnNjcmliZXJOYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLm9mZlZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb2ZmVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgb2JqZWN0cyBpbiBzdG9yYWdlIGJ5IGZpbHRlciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0gZmlsdGVyIC0gZmlsdGVyIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgX2ZpbmQoZmlsdGVyOiBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDYWxsYmFja1R5cGUpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcblxuICAgIHRoaXMuX2xpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGZpbHRlcihpdGVtKSkge1xuICAgICAgICByZXN1bHQucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogU29ydHMgdGhlIHN0b3JlZCBvYmplY3RzIGJ5IHotaW5kZXhcbiAgICovXG4gIHByb3RlY3RlZCBfc29ydCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnc29ydCcpO1xuICAgIHRoaXMuX2xpc3Quc29ydCgobGhzLCByaHMpID0+IGxocy5jb25maWcuekluZGV4IC0gcmhzLmNvbmZpZy56SW5kZXgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tICcuLi9oZWxwZXJzL29ic2VydmUtaGVscGVyJztcbmltcG9ydCB7IGFyZUFycmF5c0VxdWFsIH0gZnJvbSAnLi4vaGVscGVycy9iYXNlJztcblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyBmb3IgZHJhd2FibGUgb2JqZWN0c1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCBJRFxuICAgKi9cbiAgcHJvdGVjdGVkIF9pZDogRHJhd2FibGVJZFR5cGU7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuICAvKipcbiAgICogRXh0cmEgbGlua2VkIGRhdGFcbiAgICovXG4gIHByb3RlY3RlZCBfZGF0YTogTGlua2VkRGF0YVR5cGU7XG4gIC8qKlxuICAgKiBPYnNlcnZlIGhlbHBlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZDtcblxuICAvKipcbiAgICogSUQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGlkKCk6IERyYXdhYmxlSWRUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICAvKipcbiAgICogVHlwZSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBjb25maWcoKTogRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgc2V0dGVyXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKi9cbiAgcHVibGljIHNldCBjb25maWcoY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChPYmplY3QuZW50cmllcyhjb25maWcpLCBPYmplY3QuZW50cmllcyh0aGlzLl9jb25maWcpKTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICBjb25zdCBpc1pJbmRleENoYW5nZWQgPSBjb25maWcuekluZGV4ICE9PSB0aGlzLl9jb25maWcuekluZGV4O1xuXG4gICAgICBPYmplY3QuZW50cmllcyhjb25maWcpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAodGhpcy5fY29uZmlnW2tleSBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gYXMgdW5rbm93bikgPSB2YWx1ZSBhcyB1bmtub3duO1xuICAgICAgfSk7XG5cbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUsIHtcbiAgICAgICAgekluZGV4Q2hhbmdlZDogaXNaSW5kZXhDaGFuZ2VkLFxuICAgICAgfSk7XG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmtlZCBkYXRhIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBkYXRhKCk6IExpbmtlZERhdGFUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm9mZlZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb2ZmVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSkge1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlciA9IG5ldyBPYnNlcnZlSGVscGVyKCk7XG4gICAgdGhpcy5fY29uZmlnID0gbmV3IFByb3h5KGNvbmZpZywge1xuICAgICAgc2V0OiAodGFyZ2V0OiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gIT09IHZhbHVlO1xuICAgICAgICAodGFyZ2V0W2luZGV4IGFzIGtleW9mIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlXSBhcyB1bmtub3duKSA9IHZhbHVlIGFzIHVua25vd247XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKHtcbiAgICAgICAgICB6SW5kZXhDaGFuZ2VkOiBpbmRleCA9PT0gJ3pJbmRleCcsXG4gICAgICAgIH0pIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fZGF0YSA9IG5ldyBQcm94eShkYXRhLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IExpbmtlZERhdGFUeXBlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIExpbmtlZERhdGFUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgIHRhcmdldFtpbmRleCBhcyBrZXlvZiBMaW5rZWREYXRhVHlwZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVCbG9iLCBjcmVhdGVVcmxGcm9tQmxvYiwgaGFzaFN0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvYmFzZSc7XG5pbXBvcnQge1xuICBIYXNoS2V5VHlwZSxcbiAgSW1hZ2VDYWNoZUludGVyZmFjZSxcbiAgT25Mb2FkSGFuZGxlclR5cGUsXG4gIE9uVG90YWxMb2FkSGFuZGxlclR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBDYWNoZSBoZWxwZXIgZm9yIGltYWdlc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZUNhY2hlIGltcGxlbWVudHMgSW1hZ2VDYWNoZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBNYXAgb2YgdGhlIHByZWxvYWRlZCBpbWFnZXNcbiAgICovXG4gIHByb3RlY3RlZCBfaW1hZ2VNYXA6IFJlY29yZDxIYXNoS2V5VHlwZSwgSFRNTEltYWdlRWxlbWVudD4gPSB7fTtcbiAgLyoqXG4gICAqIE1hcCBvZiB0aGUgcnVubmluZyBwcm9jZXNzZXNcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc01hcDogUmVjb3JkPEhhc2hLZXlUeXBlLCBib29sZWFuPiA9IHt9O1xuICAvKipcbiAgICogTWFwIG9mIHRoZSBidWZmZXJlZCBoYW5kbGVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9oYW5kbGVyczogUmVjb3JkPEhhc2hLZXlUeXBlLCBBcnJheTxPbkxvYWRIYW5kbGVyVHlwZT4+ID0ge307XG4gIC8qKlxuICAgKiBNYXAgb2YgdGhlIGhhbmRsZXJzIGZvciBzdWJzY3JpYmVkIG9iamVjdHNcbiAgICovXG4gIHByb3RlY3RlZCBfdG90YWxIYW5kbGVyczogUmVjb3JkPEhhc2hLZXlUeXBlLCBPblRvdGFsTG9hZEhhbmRsZXJUeXBlPiA9IHt9O1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgSW1hZ2VDYWNoZUludGVyZmFjZS5zdWJzY3JpYmV9XG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IE9uVG90YWxMb2FkSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl90b3RhbEhhbmRsZXJzW3N1YnNjcmliZXJOYW1lXSA9IGhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEltYWdlQ2FjaGVJbnRlcmZhY2UudW5zdWJzY3JpYmV9XG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmUoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLl90b3RhbEhhbmRsZXJzW3N1YnNjcmliZXJOYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgSW1hZ2VDYWNoZUludGVyZmFjZS5jYWNoZX1cbiAgICovXG4gIHB1YmxpYyBjYWNoZShcbiAgICBzb3VyY2U6IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgY2FsbGJhY2s6IE9uTG9hZEhhbmRsZXJUeXBlIHwgbnVsbCA9IG51bGwsXG4gICk6IEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLl9nZXRLZXkoc291cmNlLCB0eXBlKTtcblxuICAgIGlmICh0aGlzLl9pbWFnZU1hcFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBjYWxsYmFjayh0aGlzLl9pbWFnZU1hcFtrZXldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9pbWFnZU1hcFtrZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wcm9jZXNzTWFwW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVyc1trZXldID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGFuZGxlcnNba2V5XS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2Nlc3NNYXBba2V5XSA9IHRydWU7XG5cbiAgICBjb25zdCBibG9iOiBCbG9iID0gY3JlYXRlQmxvYihzb3VyY2UsIHR5cGUpO1xuICAgIGNvbnN0IHVybDogc3RyaW5nID0gY3JlYXRlVXJsRnJvbUJsb2IoYmxvYik7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHVybDtcblxuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgdGhpcy5faW1hZ2VNYXBba2V5XSA9IGltZztcbiAgICAgIGRlbGV0ZSB0aGlzLl9wcm9jZXNzTWFwW2tleV07XG5cbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLl9oYW5kbGVyc1trZXldO1xuICAgICAgICB3aGlsZSAoaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgKGhhbmRsZXJzLnBvcCgpKShpbWcpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9oYW5kbGVyc1trZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuX3Byb2Nlc3NNYXApLmxlbmd0aCkge1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuX3RvdGFsSGFuZGxlcnMpLmZvckVhY2goKGhhbmRsZXIpID0+IGhhbmRsZXIoKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgaGFzaCBmb3IgaW1hZ2UgZGF0YSBhbmQgdHlwZSBhbmQgcmV0dXJucyBpdCBhcyBzdHJpbmdcbiAgICogQHBhcmFtIHNvdXJjZSAtIHNvdXJjZSBkYXRhIG9mIGltYWdlXG4gICAqIEBwYXJhbSB0eXBlIC0gbWltZSB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldEtleShzb3VyY2U6IHN0cmluZywgdHlwZTogc3RyaW5nKTogSGFzaEtleVR5cGUge1xuICAgIHJldHVybiBoYXNoU3RyaW5nKGAke3NvdXJjZX1fJHt0eXBlfWApO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVHcm91cEludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG4gIFZlY3RvckFycmF5VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IERyYXdhYmxlR3JvdXAgZnJvbSAnLi9kcmF3YWJsZS1ncm91cCc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuL3ZlY3Rvcic7XG5cbi8qKlxuICogUG9zaXRpb25hbCBkcmF3YWJsZSBncm91cCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3NpdGlvbmFsRHJhd2FibGVHcm91cCBleHRlbmRzIERyYXdhYmxlR3JvdXBcbiAgaW1wbGVtZW50cyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsIERyYXdhYmxlR3JvdXBJbnRlcmZhY2Uge1xuICAvKipcbiAgICogSW50ZXJmYWNlIGJlbG9uZ2luZyBmbGFnXG4gICAqL1xuICBwdWJsaWMgaXNQb3NpdGlvbmFsOiB0cnVlID0gdHJ1ZTtcbiAgLyoqXG4gICAqIE5hbWUgb2YgY2xhc3MgdG8gdXNlIGFzIHN1YnNjcmliZXIgbmFtZSBpbiBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZXJOYW1lOiBzdHJpbmcgPSAnUG9zaXRpb25hbERyYXdhYmxlR3JvdXAnO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlR3JvdXAgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gZ3JvdXAgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGV4dHJhIGRhdGFcbiAgICogQHBhcmFtIGNoaWxkcmVuIC0gY2hpbGRyZW4gb2YgZ3JvdXBlZCBvYmplY3RzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogRHJhd2FibGVJZFR5cGUsXG4gICAgY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gICAgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSxcbiAgICBjaGlsZHJlbjogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXSxcbiAgKSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSwgY2hpbGRyZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBkcmF3ZXIuY29udGV4dC5zYXZlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQudHJhbnNsYXRlKC4uLnRoaXMuY29uZmlnLnBvc2l0aW9uKTtcbiAgICBzdXBlci5kcmF3KGRyYXdlcik7XG4gICAgZHJhd2VyLmNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5zZXRQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBzZXRQb3NpdGlvbihjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9IGNvb3JkcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UubW92ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIG1vdmVQb3NpdGlvbihvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oXG4gICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKVxuICAgICAgICAuYWRkKGNyZWF0ZVZlY3RvcihvZmZzZXQpKVxuICAgICAgICAudG9BcnJheSgpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLmxpc3QgYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW107XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogU29tZSBhY3Rpb25zIHdpdGggY2hpbGRyZW4gYmVmb3JlIGdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NDaGlsZHJlblRvR3JvdXAoY2hpbGRyZW46IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdKTogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIGNoaWxkcmVuLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ubW92ZVBvc2l0aW9uKFxuICAgICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKS5pbnZlcnNlKCkudG9BcnJheSgpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogU29tZSBhY3Rpb25zIHdpdGggY2hpbGRyZW4gYmVmb3JlIHVuZ3JvdXBpbmdcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc0NoaWxkcmVuVG9Vbmdyb3VwKGNoaWxkcmVuOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSk6IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm1vdmVQb3NpdGlvbih0aGlzLl9jb25maWcucG9zaXRpb24pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuL3ZlY3Rvcic7XG5pbXBvcnQgRHJhd2FibGUgZnJvbSAnLi9kcmF3YWJsZSc7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIGRyYXdhYmxlIHBvc2l0aW9uYWwgb2JqZWN0c1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBQb3NpdGlvbmFsRHJhd2FibGUgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBJbnRlcmZhY2UgYmVsb25naW5nIGZsYWdcbiAgICovXG4gIHB1YmxpYyBpc1Bvc2l0aW9uYWw6IHRydWUgPSB0cnVlO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5zZXRQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBzZXRQb3NpdGlvbihjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiA9IGNvb3JkcztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UubW92ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIG1vdmVQb3NpdGlvbihvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oXG4gICAgICBjcmVhdGVWZWN0b3IodGhpcy5fY29uZmlnLnBvc2l0aW9uKVxuICAgICAgICAuYWRkKGNyZWF0ZVZlY3RvcihvZmZzZXQpKVxuICAgICAgICAudG9BcnJheSgpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cbn1cbiIsImltcG9ydCB7IFZlY3RvckFycmF5VHlwZSwgVmVjdG9ySW50ZXJmYWNlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIFZlY3RvciBjbGFzc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IgaW1wbGVtZW50cyBWZWN0b3JJbnRlcmZhY2Uge1xuICAvKipcbiAgICogQ29vcmRpbmF0ZSBYXG4gICAqL1xuICBwdWJsaWMgeDogbnVtYmVyO1xuICAvKipcbiAgICogQ29vcmRpbmF0ZSBZXG4gICAqL1xuICBwdWJsaWMgeTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBWZWN0b3IgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHggLSBjb29yZGluYXRlIFhcbiAgICogQHBhcmFtIHkgLSBjb29yZGluYXRlIFlcbiAgICovXG4gIGNvbnN0cnVjdG9yKFt4LCB5XTogVmVjdG9yQXJyYXlUeXBlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbm90aGVyIHZlY3RvciB0byB0aGlzIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIHZlY3RvciB0byBjYWNoZVxuICAgKi9cbiAgYWRkKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgdGhpcy54ICs9IHYueDtcbiAgICB0aGlzLnkgKz0gdi55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU3VidHJhY3RzIHZlY3RvciB3aXRoIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gdmVjdG9yIHRvIHN1YnRyYWN0XG4gICAqL1xuICBzdWIodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICB0aGlzLnggLT0gdi54O1xuICAgIHRoaXMueSAtPSB2Lnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBsZXMgdmVjdG9yIGJ5IG51bWJlclxuICAgKiBAcGFyYW0gbXVsIC0gbXVsdGlwbGllclxuICAgKi9cbiAgbXVsKG11bDogbnVtYmVyKTogVmVjdG9yIHtcbiAgICB0aGlzLnggKj0gbXVsO1xuICAgIHRoaXMueSAqPSBtdWw7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIHZlY3RvciBieSBudW1iZXJcbiAgICogQHBhcmFtIGRpdiAtIGRpdmlkZXJcbiAgICovXG4gIGRpdihkaXY6IG51bWJlcik6IFZlY3RvciB7XG4gICAgdGhpcy54IC89IGRpdjtcbiAgICB0aGlzLnkgLz0gZGl2O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogSW52ZXJzZXMgdmVjdG9yXG4gICAqL1xuICBpbnZlcnNlKCk6IFZlY3RvciB7XG4gICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICB0aGlzLnkgPSAtdGhpcy55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV2ZXJzZXMgdmVjdG9yXG4gICAqL1xuICByZXZlcnNlKCk6IFZlY3RvciB7XG4gICAgdGhpcy54ID0gMS90aGlzLng7XG4gICAgdGhpcy55ID0gMS90aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdmVjdG9yXG4gICAqL1xuICBsZW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCp0aGlzLnggKyB0aGlzLnkqdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGRpc3RhbmNlIHZlY3RvciBvZiB0aGlzIGFuZCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBkaXN0YW5jZSh2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgIHJldHVybiB0aGlzLmNsb25lKCkuc3ViKHYpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb25lcyB2ZWN0b3JcbiAgICovXG4gIGNsb25lKCk6IFZlY3RvciB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy50b0FycmF5KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHZlY3RvciB0byBhcnJheVxuICAgKi9cbiAgdG9BcnJheSgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnldO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgdmVjdG9yXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gY29vcmRzIC0gY29vcmRpbmF0ZXMgb2YgbmV3IHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmVjdG9yKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yIHtcbiAgcmV0dXJuIG5ldyBWZWN0b3IoY29vcmRzKTtcbn1cbiIsImltcG9ydCB7XG4gIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsXG4gIFZpZXdDb25maWdJbnRlcmZhY2UsXG4gIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFyZUFycmF5c0VxdWFsIH0gZnJvbSAnLi4vaGVscGVycy9iYXNlJztcbmltcG9ydCBPYnNlcnZlSGVscGVyIGZyb20gJy4uL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXInO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSAnLi92ZWN0b3InO1xuXG4vKipcbiAqIENvbmZpZyBmb3Igb2JqZWN0cyBkcmF3YWJsZSBvbiBjYW52YXNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbmZpZyBpbXBsZW1lbnRzIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFNjYWxlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3NjYWxlOiBWZWN0b3JBcnJheVR5cGU7XG4gIC8qKlxuICAgKiBPZmZzZXRcbiAgICovXG4gIHByb3RlY3RlZCBfb2Zmc2V0OiBWZWN0b3JBcnJheVR5cGU7XG4gIC8qKlxuICAgKiBHcmlkIHN0ZXBcbiAgICovXG4gIHByb3RlY3RlZCBfZ3JpZFN0ZXA6IG51bWJlcjtcbiAgLyoqXG4gICAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBWaWV3Q29uZmlnIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih7IHNjYWxlLCBvZmZzZXQsIGdyaWRTdGVwIH06IFZpZXdDb25maWdJbnRlcmZhY2UpIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyID0gbmV3IE9ic2VydmVIZWxwZXIoKTtcbiAgICB0aGlzLl9zY2FsZSA9IG5ldyBQcm94eShzY2FsZSwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBWZWN0b3JBcnJheVR5cGUsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgICh0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSBhcyB1bmtub3duKSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fb2Zmc2V0ID0gbmV3IFByb3h5KG9mZnNldCwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBWZWN0b3JBcnJheVR5cGUsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSAhPT0gdmFsdWU7XG4gICAgICAgICh0YXJnZXRbaW5kZXggYXMga2V5b2YgVmVjdG9yQXJyYXlUeXBlXSBhcyB1bmtub3duKSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5fZ3JpZFN0ZXAgPSBncmlkU3RlcDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5vZmZWaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZlZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudHJhbnNwb3NlRm9yd2FyZH1cbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VGb3J3YXJkKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XG4gICAgcmV0dXJuIFsoeCAtIHRoaXMuX29mZnNldFswXSkvdGhpcy5fc2NhbGVbMF0sICh5IC0gdGhpcy5fb2Zmc2V0WzFdKS90aGlzLl9zY2FsZVsxXV07XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLnRyYW5zcG9zZUJhY2t3YXJkfVxuICAgKi9cbiAgcHVibGljIHRyYW5zcG9zZUJhY2t3YXJkKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XG4gICAgcmV0dXJuIFt4KnRoaXMuX3NjYWxlWzBdICsgdGhpcy5fb2Zmc2V0WzBdLCB5KnRoaXMuX3NjYWxlWzFdICsgdGhpcy5fb2Zmc2V0WzFdXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudXBkYXRlU2NhbGVJbkN1cnNvckNvbnRleHR9XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlU2NhbGVJbkN1cnNvckNvbnRleHQobmV3U2NhbGU6IFZlY3RvckFycmF5VHlwZSwgY3Vyc29yQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwobmV3U2NhbGUsIHRoaXMuX3NjYWxlKTtcblxuICAgIGlmICghaXNDaGFuZ2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgY29uc3Qgb2xkU2NhbGVQb3NpdGlvbiA9IGNyZWF0ZVZlY3Rvcih0aGlzLnRyYW5zcG9zZUZvcndhcmQoY3Vyc29yQ29vcmRzKSk7XG4gICAgICB0aGlzLnNjYWxlID0gbmV3U2NhbGU7XG4gICAgICBjb25zdCBuZXdTY2FsZVBvc2l0aW9uID0gY3JlYXRlVmVjdG9yKHRoaXMudHJhbnNwb3NlRm9yd2FyZChjdXJzb3JDb29yZHMpKTtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBuZXdTY2FsZVBvc2l0aW9uLmNsb25lKCkuc3ViKG9sZFNjYWxlUG9zaXRpb24pO1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLnRyYW5zcG9zZUJhY2t3YXJkKGRpZmZlcmVuY2UudG9BcnJheSgpKTtcblxuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbGwgdGhlIGRhdGEgaW4gY29uZmlnXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKHsgc2NhbGUsIG9mZnNldCwgZ3JpZFN0ZXAgfTogVmlld0NvbmZpZ0ludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChzY2FsZSwgdGhpcy5fc2NhbGUpIHx8ICFhcmVBcnJheXNFcXVhbChvZmZzZXQsIHRoaXMuX29mZnNldCk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgIHRoaXMuZ3JpZFN0ZXAgPSBncmlkU3RlcDtcblxuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgZ2V0dGVyXG4gICAqL1xuICBnZXQgc2NhbGUoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgc2V0dGVyXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqL1xuICBzZXQgc2NhbGUoc2NhbGU6IFZlY3RvckFycmF5VHlwZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChzY2FsZSwgdGhpcy5fc2NhbGUpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5fc2NhbGVbMF0gPSBzY2FsZVswXTtcbiAgICAgIHRoaXMuX3NjYWxlWzFdID0gc2NhbGVbMV07XG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZzZXQgZ2V0dGVyXG4gICAqL1xuICBnZXQgb2Zmc2V0KCk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZzZXQgc2V0dGVyXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICovXG4gIHNldCBvZmZzZXQob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwob2Zmc2V0LCB0aGlzLl9vZmZzZXQpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5fb2Zmc2V0WzBdID0gb2Zmc2V0WzBdO1xuICAgICAgdGhpcy5fb2Zmc2V0WzFdID0gb2Zmc2V0WzFdO1xuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR3JpZCBzdGVwIGdldHRlclxuICAgKi9cbiAgZ2V0IGdyaWRTdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWRTdGVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyaWQgc3RlcCBzZXR0ZXJcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBzZXQgZ3JpZFN0ZXAoZ3JpZFN0ZXA6IG51bWJlcikge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9IGdyaWRTdGVwICE9PSB0aGlzLl9ncmlkU3RlcDtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuX2dyaWRTdGVwID0gZ3JpZFN0ZXA7XG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyogKGlnbm9yZWQpICovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERyYXdlciBmcm9tICcuL2NhbnZhcy9kcmF3ZXInO1xuaW1wb3J0IFJlY3QgZnJvbSAnLi9jYW52YXMvZmlndXJlcy9yZWN0JztcbmltcG9ydCBEcmF3YWJsZVN0b3JhZ2UgZnJvbSAnLi9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS1zdG9yYWdlJztcbmltcG9ydCB7IERyYXdhYmxlSW50ZXJmYWNlLCBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB9IGZyb20gJy4vY2FudmFzL3R5cGVzJztcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gJy4vY2FudmFzL3N0cnVjdHMvdmlldy1jb25maWcnO1xuaW1wb3J0IEdyaWQgZnJvbSAnLi9jYW52YXMvZmlndXJlcy9ncmlkJztcbmltcG9ydCBTdmcgZnJvbSAnLi9jYW52YXMvZmlndXJlcy9zdmcnO1xuXG5jb25zdCBzdG9yYWdlID0gbmV3IERyYXdhYmxlU3RvcmFnZShbXG4gIG5ldyBHcmlkKDEsIHtcbiAgICB6SW5kZXg6IC1JbmZpbml0eSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIG1haW5MaW5lQ29sb3I6ICcjYmJiJyxcbiAgICBzdWJMaW5lQ29sb3I6ICcjZGVkZWRlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gICAgbGluZXNJbkJsb2NrOiA1LFxuICB9KSxcbiAgbmV3IFJlY3QoMiwge1xuICAgIHBvc2l0aW9uOiBbMTAsIDIwXSxcbiAgICBzaXplOiBbMTAwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAnZ3JlZW4nLFxuICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG4gIG5ldyBSZWN0KDMsIHtcbiAgICBwb3NpdGlvbjogWzEwLCAyNV0sXG4gICAgc2l6ZTogWzUwLCA1MF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAnYmx1ZScsXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFJlY3QoNCwge1xuICAgIHBvc2l0aW9uOiBbNzAwLCAyNTBdLFxuICAgIHNpemU6IFsxNTAsIDEwMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAnYmx1ZScsXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFN2Zyg1LCB7XG4gICAgcG9zaXRpb246IFszMDAsIDU1MF0sXG4gICAgc2l6ZTogWzE1MCwgMTAwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBkYXRhOiBcIjxzdmcgd2lkdGg9JzE2MicgaGVpZ2h0PSc4Micgdmlld0JveD0nMCAwIDE2MiA4MicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMjguNjkyMyAxTDEgNDAuMTI0MUwyOC42OTIzIDgxSDEzNC42NzVMMTYxIDQwLjEyNDFMMTM0LjY3NSAxSDI4LjY5MjNaJyBmaWxsPScjRkZCQ0YyJyBzdHJva2U9J2JsYWNrJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyAvPjwvc3ZnPlwiLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0pLFxuICBuZXcgU3ZnKDUsIHtcbiAgICBwb3NpdGlvbjogWzEwMCwgNTUwXSxcbiAgICBzaXplOiBbMTUwLCAxMDBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGRhdGE6IFwiPHN2ZyB3aWR0aD0nMTYyJyBoZWlnaHQ9JzgyJyB2aWV3Qm94PScwIDAgMTYyIDgyJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J00yOC42OTIzIDFMMSA0MC4xMjQxTDI4LjY5MjMgODFIMTM0LjY3NUwxNjEgNDAuMTI0MUwxMzQuNjc1IDFIMjguNjkyM1onIGZpbGw9JyNGRkJDRjInIHN0cm9rZT0nYmxhY2snIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIC8+PC9zdmc+XCIsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSksXG4gIG5ldyBSZWN0KDYsIHtcbiAgICBwb3NpdGlvbjogWzM1MCwgMzUwXSxcbiAgICBzaXplOiBbMzAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDMsXG4gIH0pLFxuICBuZXcgUmVjdCg3LCB7XG4gICAgcG9zaXRpb246IFszNTAsIDMwMF0sXG4gICAgc2l6ZTogWzMwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAzLFxuICB9KSxcbiAgbmV3IFJlY3QoOCwge1xuICAgIHBvc2l0aW9uOiBbMzAwLCAzNTBdLFxuICAgIHNpemU6IFszMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG4gIG5ldyBSZWN0KDksIHtcbiAgICBwb3NpdGlvbjogWzIwMCwgMjAwXSxcbiAgICBzaXplOiBbMTYwLCAxNjBdLFxuICAgIHpJbmRleDogMCxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ2dyZWVuJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMyxcbiAgfSksXG5dKTtcblxuY29uc3QgZ3JvdXAgPSBzdG9yYWdlLmdyb3VwKFs2LCA3LCA4LCA5XSk7XG5jb25zb2xlLmxvZyhncm91cCk7XG4vLyBzdG9yYWdlLnVuZ3JvdXAoZ3JvdXAuaWQpO1xuXG5jb25zb2xlLmxvZyhzdG9yYWdlKTtcblxuY29uc3Qgdmlld0NvbmZpZzogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UgPSBuZXcgVmlld0NvbmZpZyh7XG4gIHNjYWxlOiBbMSwgMV0sXG4gIG9mZnNldDogWzAsIDBdLFxuICBncmlkU3RlcDogMTUsXG59KTtcbmNvbnNvbGUubG9nKHZpZXdDb25maWcpO1xuXG5jb25zdCBkcmF3ZXI6IERyYXdlciA9IG5ldyBEcmF3ZXIoe1xuICBkb21FbGVtZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQsXG4gIHZpZXdDb25maWcsXG4gIHN0b3JhZ2UsXG59KTtcbmRyYXdlci5kcmF3KCk7XG5cbi8vIHNldFRpbWVvdXQoKCkgPT4ge1xuLy8gICBjb25zdCBiYXRjaDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuLy8gICBmb3IgKGxldCBpPTA7IGk8MTAwMDsgKytpKSB7XG4vLyAgICAgYmF0Y2gucHVzaChuZXcgUmVjdChpKzEwMCwge1xuLy8gICAgICAgcG9zaXRpb246IFtNYXRoLnJhbmRvbSgpKmRyYXdlci53aWR0aCwgTWF0aC5yYW5kb20oKSpkcmF3ZXIuaGVpZ2h0XSxcbi8vICAgICAgIHNpemU6IFszMCtNYXRoLnJhbmRvbSgpKjEwMCwgMzArTWF0aC5yYW5kb20oKSoxMDBdLFxuLy8gICAgICAgekluZGV4OiAwLFxuLy8gICAgICAgdmlzaWJsZTogdHJ1ZSxcbi8vICAgICAgIGZpbGxTdHlsZTogJ3doaXRlJyxcbi8vICAgICAgIHN0cm9rZVN0eWxlOiAnZ3JlZW4nLFxuLy8gICAgICAgbGluZVdpZHRoOiAxLFxuLy8gICAgIH0pKTtcbi8vICAgfVxuLy8gICBzdG9yYWdlLmFkZEJhdGNoKGJhdGNoKTtcbi8vIH0sIDMwKTtcblxuc2V0VGltZW91dCgoKSA9PiB7XG4gIHJldHVybjtcbiAgY29uc3QgYmF0Y2g6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcbiAgY29uc3QgZGF0YTEgPSBcIjxzdmcgd2lkdGg9JzE2MicgaGVpZ2h0PSc4Micgdmlld0JveD0nMCAwIDE2MiA4MicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMjguNjkyMyAxTDEgNDAuMTI0MUwyOC42OTIzIDgxSDEzNC42NzVMMTYxIDQwLjEyNDFMMTM0LjY3NSAxSDI4LjY5MjNaJyBmaWxsPScjRkZCQ0YyJyBzdHJva2U9J2JsYWNrJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyAvPjwvc3ZnPlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGNvbnN0IGRhdGEyID0gXCI8c3ZnIHdpZHRoPScxNjAnIGhlaWdodD0nMTAwJyB2aWV3Qm94PScwIDAgMTYwIDEwMCcgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZWxsaXBzZSBmaWxsPScjYzVjNmUyJyBzdHJva2Utd2lkdGg9J251bGwnIHN0cm9rZS1vcGFjaXR5PSdudWxsJyBjeD0nNzkuODg2MTU4JyBjeT0nODcuNDU2NTczJyBpZD0nc3ZnXzI2JyByeD0nNzkuNTI0MDczJyByeT0nMTEuODc4MjI2JyBzdHJva2U9J2JsYWNrJy8+PHJlY3Qgc3Ryb2tlPSdibGFjaycgZmlsbD0nI2M1YzZlMicgc3Ryb2tlLXdpZHRoPSdudWxsJyBzdHJva2Utb3BhY2l0eT0nbnVsbCcgZmlsbC1vcGFjaXR5PSdudWxsJyB4PScwLjMzMzg2NCcgeT0nMTIuNDg5NzY2JyB3aWR0aD0nMTU4Ljk5ODkzOCcgaGVpZ2h0PSc3NS4zMzI5MDMnIGlkPSdzdmdfMjcnLz48ZWxsaXBzZSBmaWxsPScjYzVjNmUyJyBzdHJva2Utd2lkdGg9J251bGwnIHN0cm9rZS1vcGFjaXR5PSdudWxsJyBjeD0nNzkuODAyODI2JyBjeT0nMTIuNDU3MDAzJyBpZD0nc3ZnXzknIHJ4PSc3OS41MjQwNzMnIHJ5PScxMS44NzgyMjYnIHN0cm9rZT0nYmxhY2snLz48cmVjdCBmaWxsPScjYzVjNmUyJyBzdHJva2Utd2lkdGg9J251bGwnIHN0cm9rZS1vcGFjaXR5PScwJyBmaWxsLW9wYWNpdHk9J251bGwnIHg9JzEuMDgzODU2JyB5PSc4NS4yMzkzNTQnIHdpZHRoPScxNTcuODMyMjk0JyBoZWlnaHQ9JzMuNjY2NjQyJyBpZD0nc3ZnXzMwJyBzdHJva2U9JyMwMDAwMDAnLz48L3N2Zz5cIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIGZvciAobGV0IGk9MDsgaTwyMDA7ICsraSkge1xuICAgIGJhdGNoLnB1c2gobmV3IFN2ZyhpKzEwMCwge1xuICAgICAgcG9zaXRpb246IFtNYXRoLnJhbmRvbSgpKmRyYXdlci53aWR0aCwgTWF0aC5yYW5kb20oKSpkcmF3ZXIuaGVpZ2h0XSxcbiAgICAgIHNpemU6IFszMCtNYXRoLnJhbmRvbSgpKjEwMCwgMzArTWF0aC5yYW5kb20oKSoxMDBdLFxuICAgICAgZGF0YTogTWF0aC5yYW5kb20oKSA+IDAuNSA/IGRhdGExIDogZGF0YTIsXG4gICAgICB6SW5kZXg6IDAsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH0pKTtcbiAgfVxuICBzdG9yYWdlLmFkZEJhdGNoKGJhdGNoKTtcbn0sIDEwMDApO1xuXG4vLyBzZXRUaW1lb3V0KCgpID0+IHtcbi8vICAgc3RvcmFnZS5kZWxldGUoe1xuLy8gICAgIHR5cGVzRXhjbHVkZTogWydHcmlkJ10sXG4vLyAgICAgZXh0cmFGaWx0ZXI6IGl0ZW0gPT4gaXRlbS5jb25maWcuekluZGV4ID09PSAwLFxuLy8gICB9KTtcbi8vICAgc3RvcmFnZS5hZGQobmV3IFJlY3QoNTAsIHtcbi8vICAgICBwb3NpdGlvbjogWzEwMCwgMjVdLFxuLy8gICAgIHNpemU6IFs1MCwgMzBdLFxuLy8gICAgIHpJbmRleDogMSxcbi8vICAgICB2aXNpYmxlOiB0cnVlLFxuLy8gICAgIGZpbGxTdHlsZTogJ3JlZCcsXG4vLyAgICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4vLyAgICAgbGluZVdpZHRoOiAzLFxuLy8gICB9KSk7XG4vLyB9LCAxMDAwKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==