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
/* harmony import */ var _structs_filters_grid_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structs/filters/grid-filter */ "./src/canvas/structs/filters/grid-filter.ts");
/* harmony import */ var _structs_drawable_positional_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./structs/drawable/positional-context */ "./src/canvas/structs/drawable/positional-context.ts");




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
        var coordsFilter = new _structs_filters_grid_filter__WEBPACK_IMPORTED_MODULE_2__["default"]();
        var filterCoords = function (coords) {
            return coordsFilter.process(coords, _this._viewConfig.getConfig());
        };
        var currentElementContext = new _structs_drawable_positional_context__WEBPACK_IMPORTED_MODULE_3__["default"](null, null);
        var DEVIATION = 8;
        var getNearBoundElement = function (coords) {
            var transposedCoords = _this._viewConfig.transposeForward(coords);
            return _this._storage.findByNearEdgePosition(transposedCoords, DEVIATION / _this._viewConfig.scale[0]);
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
                var transposedCoords = _this._viewConfig.transposeForward([event.offsetX, event.offsetY]);
                currentElementContext = _this._storage.findByPosition(transposedCoords);
            }
            mouseDownCoords = [event.offsetX, event.offsetY];
            _this._domElement.style.cursor = 'grabbing';
        });
        this._domElement.addEventListener('mousemove', function (event) {
            var mouseMoveCoords = [event.offsetX, event.offsetY];
            var transposedCoords = _this._viewConfig.transposeForward(mouseMoveCoords);
            if (mouseDownCoords === null) {
                if (!getNearBoundElement(mouseMoveCoords).isEmpty()) {
                    _this._domElement.style.cursor = 'crosshair';
                }
                else if (!_this._storage.findByPosition(transposedCoords).isEmpty()) {
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
     * @param children - children of grouped objects
     */
    function DrawableLayer(id, config, data, children) {
        if (data === void 0) { data = {}; }
        if (children === void 0) { children = []; }
        var _this = _super.call(this, id, config, data) || this;
        /**
         * {@inheritDoc DrawableLayerInterface.isLayer}
         */
        _this.isLayer = true;
        _this._storage = new _drawable_storage__WEBPACK_IMPORTED_MODULE_1__["default"](_this._processChildrenToGroup(children));
        _this._storage.onViewChange(_this._subscriberName, function (target, extra) {
            _this._observeHelper.processWithMuteHandlers(extra);
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
     * {@inheritDoc DrawableStorageInterface.findByPosition}
     */
    DrawableStorage.prototype.findByPosition = function (coords) {
        for (var i = this._list.length - 1; i >= 0; --i) {
            var item = this._list[i];
            // TODO maybe only visible?
            if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isLayer)(item)) {
                var context = item.storage.findByPosition(coords);
                if (!context.isEmpty()) {
                    return context;
                }
            }
            else if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isPositional)(item) && item.boundIncludes(coords)) {
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
    DrawableStorage.prototype.findByNearEdgePosition = function (coords, deviation) {
        var positionContext = this.findByPosition(coords);
        for (var i = this._list.length - 1; i >= 0; --i) {
            var item = this._list[i];
            // TODO maybe only visible?
            if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isLayer)(item)) {
                var context = item.storage.findByNearEdgePosition(coords, deviation);
                if (!context.isEmpty()) {
                    return context;
                }
            }
            else if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isPositional)(item)
                && item.isNearBoundEdge(coords, deviation)
                && (positionContext.isEmpty() || positionContext.element === item)) {
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
     * {@inheritDoc DrawableStorageInterface.addLayer}
     */
    DrawableStorage.prototype.addLayer = function (id, name, children) {
        if (children === void 0) { children = []; }
        var layer = new _drawable_layer__WEBPACK_IMPORTED_MODULE_6__["default"](id, {
            visible: true,
            zIndex: this._getMaxZIndex() + 1,
            name: name,
        }, {}, children);
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
 * @param precision - precision
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
        v = toVector(v);
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    /**
     * Subtracts vector with another vector
     * @param v - vector to subtract
     */
    Vector.prototype.sub = function (v) {
        v = toVector(v);
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
        v = toVector(v);
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
        v = toVector(v);
        return this.x * v.x + this.y * v.y;
    };
    /**
     * Returns length of vector product with another vector
     * @param v - another vector
     */
    Vector.prototype.mulVector = function (v) {
        v = toVector(v);
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
        else {
            v = toVector(v);
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
/* harmony import */ var _canvas_structs_drawable_drawable_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas/structs/drawable/drawable-storage */ "./src/canvas/structs/drawable/drawable-storage.ts");
/* harmony import */ var _canvas_structs_view_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas/structs/view-config */ "./src/canvas/structs/view-config.ts");
/* harmony import */ var _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas/figures/svg */ "./src/canvas/figures/svg.ts");
/* harmony import */ var _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./canvas/figures/grid */ "./src/canvas/figures/grid.ts");
/* harmony import */ var _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./canvas/figures/rect */ "./src/canvas/figures/rect.ts");






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
    new _canvas_figures_grid__WEBPACK_IMPORTED_MODULE_4__["default"](1, {
        zIndex: -Infinity,
        visible: true,
        mainLineColor: '#bbb',
        subLineColor: '#dedede',
        lineWidth: 1,
        linesInBlock: 5,
    }),
]);
var elementsLayer = storage.addLayer('elements', 'Elements layer', [
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"](2, {
        position: [10, 20],
        size: [100, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'green',
        strokeStyle: 'black',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"](3, {
        position: [10, 25],
        size: [50, 50],
        zIndex: 1,
        visible: true,
        fillStyle: 'blue',
        strokeStyle: 'black',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"](4, {
        position: [15 * 30, 15 * 10],
        size: [15 * 10, 15 * 5],
        zIndex: 10,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'red',
        lineWidth: 1,
    }),
    new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_3__["default"](5, {
        position: [300, 550],
        size: [162, 82],
        zIndex: 1,
        visible: true,
        data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
    }),
    new _canvas_figures_svg__WEBPACK_IMPORTED_MODULE_3__["default"](5, {
        position: [100, 550],
        size: [162, 82],
        zIndex: 1,
        visible: true,
        data: "<svg width='162' height='82' viewBox='0 0 162 82' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M28.6923 1L1 40.1241L28.6923 81H134.675L161 40.1241L134.675 1H28.6923Z' fill='#FFBCF2' stroke='black' stroke-linejoin='round' /></svg>", // eslint-disable-line
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"](6, {
        position: [350, 350],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"](7, {
        position: [350, 300],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"](8, {
        position: [300, 350],
        size: [30, 30],
        zIndex: 1,
        visible: true,
        fillStyle: 'transparent',
        strokeStyle: 'blue',
        lineWidth: 1,
    }),
    new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"](9, {
        position: [200, 200],
        size: [160, 160],
        zIndex: 0,
        visible: true,
        fillStyle: 'green',
        strokeStyle: 'blue',
        lineWidth: 1,
    }),
]);
var group = elementsLayer.storage.group([6, 7, 8, 9]);
console.log(group);
// elementsLayer.storage.ungroup(group.id);
var anotherLayer = storage.addLayer('another', 'Another Layer', []);
anotherLayer.storage.add(new _canvas_figures_rect__WEBPACK_IMPORTED_MODULE_5__["default"](9, {
    position: [800, 500],
    size: [100, 100],
    zIndex: -100,
    visible: true,
    fillStyle: 'lightblue',
    strokeStyle: 'blue',
    lineWidth: 1,
}));
console.log('layers', storage.getLayers());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSw0REFBSSxDQUFDLENBQUMsRUFBRTtJQUNuQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3BCLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDaEIsTUFBTSxFQUFFLENBQUMsR0FBRztJQUNaLE9BQU8sRUFBRSxJQUFJO0lBQ2IsU0FBUyxFQUFFLFdBQVc7SUFDdEIsV0FBVyxFQUFFLE1BQU07SUFDbkIsU0FBUyxFQUFFLENBQUM7Q0FDYixDQUFDLENBQUMsQ0FBQztBQUVKLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9jb3JlLmpzIiwid2VicGFjazovL2NhbnZhcy10cy8uL25vZGVfbW9kdWxlcy9jcnlwdG8tanMvbWQ1LmpzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZHJhd2VyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9ncmlkLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9yZWN0LnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvZmlndXJlcy9zdmcudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9oZWxwZXJzL2Jhc2UudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9oZWxwZXJzL2ltYWdlLWNhY2hlLWhlbHBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXIudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9oZWxwZXJzL3R5cGUtaGVscGVycy50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvYm91bmRzL3JlY3Rhbmd1bGFyLWJvdW5kLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9kcmF3YWJsZS1ncm91cC50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvZHJhd2FibGUvZHJhd2FibGUtbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlL2RyYXdhYmxlLXN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlL2RyYXdhYmxlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlL3Bvc2l0aW9uYWwtZHJhd2FibGUtZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlL3Bvc2l0aW9uYWwtZHJhd2FibGUudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2ZpbHRlcnMvZ3JpZC1maWx0ZXIudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2ltYWdlLWNhY2hlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy92ZWN0b3IvaGVscGVycy50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmVjdG9yL2luZGV4LnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy92ZWN0b3IvcG9zaXRpb25hbC12ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZlY3Rvci92ZWN0b3IudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZpZXctY29uZmlnLnRzIiwid2VicGFjazovL2NhbnZhcy10cy9pZ25vcmVkfC9ob21lL3Ntb3Jlbi9wcm9qZWN0cy9jYW52YXMvbm9kZV9tb2R1bGVzL2NyeXB0by1qc3xjcnlwdG8iLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhbnZhcy10cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhbnZhcy10cy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2NhbnZhcy10cy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NhbnZhcy10cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdHJvb3QuQ3J5cHRvSlMgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXG5cdC8qZ2xvYmFscyB3aW5kb3csIGdsb2JhbCwgcmVxdWlyZSovXG5cblx0LyoqXG5cdCAqIENyeXB0b0pTIGNvcmUgY29tcG9uZW50cy5cblx0ICovXG5cdHZhciBDcnlwdG9KUyA9IENyeXB0b0pTIHx8IChmdW5jdGlvbiAoTWF0aCwgdW5kZWZpbmVkKSB7XG5cblx0ICAgIHZhciBjcnlwdG87XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSB3aW5kb3cgKEJyb3dzZXIpXG5cdCAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHdpbmRvdy5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gaW4gd2ViIHdvcmtlciAoQnJvd3Nlcilcblx0ICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBzZWxmLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIHdvcmtlclxuXHQgICAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWxUaGlzLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IGdsb2JhbFRoaXMuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgKGV4cGVyaW1lbnRhbCBJRSAxMSkgY3J5cHRvIGZyb20gd2luZG93IChCcm93c2VyKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm1zQ3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gd2luZG93Lm1zQ3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gZ2xvYmFsIChOb2RlSlMpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBnbG9iYWwuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gZ2xvYmFsLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBpbXBvcnQgdmlhIHJlcXVpcmUgKE5vZGVKUylcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cdCAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgfVxuXG5cdCAgICAvKlxuXHQgICAgICogQ3J5cHRvZ3JhcGhpY2FsbHkgc2VjdXJlIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yXG5cdCAgICAgKlxuXHQgICAgICogQXMgTWF0aC5yYW5kb20oKSBpcyBjcnlwdG9ncmFwaGljYWxseSBub3Qgc2FmZSB0byB1c2Vcblx0ICAgICAqL1xuXHQgICAgdmFyIGNyeXB0b1NlY3VyZVJhbmRvbUludCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoY3J5cHRvKSB7XG5cdCAgICAgICAgICAgIC8vIFVzZSBnZXRSYW5kb21WYWx1ZXMgbWV0aG9kIChCcm93c2VyKVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KDEpKVswXTtcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFVzZSByYW5kb21CeXRlcyBtZXRob2QgKE5vZGVKUylcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8ucmFuZG9tQnl0ZXMgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5yYW5kb21CeXRlcyg0KS5yZWFkSW50MzJMRSgpO1xuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYXRpdmUgY3J5cHRvIG1vZHVsZSBjb3VsZCBub3QgYmUgdXNlZCB0byBnZXQgc2VjdXJlIHJhbmRvbSBudW1iZXIuJyk7XG5cdCAgICB9O1xuXG5cdCAgICAvKlxuXHQgICAgICogTG9jYWwgcG9seWZpbGwgb2YgT2JqZWN0LmNyZWF0ZVxuXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gRigpIHt9XG5cblx0ICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgICAgICB2YXIgc3VidHlwZTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG9iajtcblxuXHQgICAgICAgICAgICBzdWJ0eXBlID0gbmV3IEYoKTtcblxuXHQgICAgICAgICAgICBGLnByb3RvdHlwZSA9IG51bGw7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQ3J5cHRvSlMgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExpYnJhcnkgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYiA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2Ugb2JqZWN0IGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2UgPSAoZnVuY3Rpb24gKCkge1xuXG5cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3ZlcnJpZGVzIFByb3BlcnRpZXMgdG8gY29weSBpbnRvIHRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJyxcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgLy8gU3Bhd25cblx0ICAgICAgICAgICAgICAgIHZhciBzdWJ0eXBlID0gY3JlYXRlKHRoaXMpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBBdWdtZW50XG5cdCAgICAgICAgICAgICAgICBpZiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5taXhJbihvdmVycmlkZXMpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBDcmVhdGUgZGVmYXVsdCBpbml0aWFsaXplclxuXHQgICAgICAgICAgICAgICAgaWYgKCFzdWJ0eXBlLmhhc093blByb3BlcnR5KCdpbml0JykgfHwgdGhpcy5pbml0ID09PSBzdWJ0eXBlLmluaXQpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplcidzIHByb3RvdHlwZSBpcyB0aGUgc3VidHlwZSBvYmplY3Rcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdC5wcm90b3R5cGUgPSBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZWZlcmVuY2Ugc3VwZXJ0eXBlXG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlciA9IHRoaXM7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBFeHRlbmRzIHRoaXMgb2JqZWN0IGFuZCBydW5zIHRoZSBpbml0IG1ldGhvZC5cblx0ICAgICAgICAgICAgICogQXJndW1lbnRzIHRvIGNyZWF0ZSgpIHdpbGwgYmUgcGFzc2VkIHRvIGluaXQoKS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGluc3RhbmNlID0gTXlUeXBlLmNyZWF0ZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmV4dGVuZCgpO1xuXHQgICAgICAgICAgICAgICAgaW5zdGFuY2UuaW5pdC5hcHBseShpbnN0YW5jZSwgYXJndW1lbnRzKTtcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBhZGQgc29tZSBsb2dpYyB3aGVuIHlvdXIgb2JqZWN0cyBhcmUgY3JlYXRlZC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICAgICAgLy8gLi4uXG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENvcGllcyBwcm9wZXJ0aWVzIGludG8gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRvIG1peCBpbi5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIE15VHlwZS5taXhJbih7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZSdcblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgbWl4SW46IGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSUUgd29uJ3QgY29weSB0b1N0cmluZyB1c2luZyB0aGUgbG9vcCBhYm92ZVxuXHQgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3RvU3RyaW5nJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvU3RyaW5nID0gcHJvcGVydGllcy50b1N0cmluZztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gaW5zdGFuY2UuY2xvbmUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0LnByb3RvdHlwZS5leHRlbmQodGhpcyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtBcnJheX0gd29yZHMgVGhlIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaWdCeXRlcyAoT3B0aW9uYWwpIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhlIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10sIDYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3b3Jkcywgc2lnQnl0ZXMpIHtcblx0ICAgICAgICAgICAgd29yZHMgPSB0aGlzLndvcmRzID0gd29yZHMgfHwgW107XG5cblx0ICAgICAgICAgICAgaWYgKHNpZ0J5dGVzICE9IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHdvcmRzLmxlbmd0aCAqIDQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgdGhpcyB3b3JkIGFycmF5IHRvIGEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyIChPcHRpb25hbCkgVGhlIGVuY29kaW5nIHN0cmF0ZWd5IHRvIHVzZS4gRGVmYXVsdDogQ3J5cHRvSlMuZW5jLkhleFxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5naWZpZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheSArICcnO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKCk7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoZW5jb2Rlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gKGVuY29kZXIgfHwgSGV4KS5zdHJpbmdpZnkodGhpcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmNhdGVuYXRlcyBhIHdvcmQgYXJyYXkgdG8gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5MS5jb25jYXQod29yZEFycmF5Mik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29uY2F0OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgdGhpc1dvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRXb3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoaXNTaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0U2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAgdGhpcy5jbGFtcCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbmNhdFxuXHQgICAgICAgICAgICBpZiAodGhpc1NpZ0J5dGVzICUgNCkge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgYnl0ZSBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdEJ5dGUgPSAodGhhdFdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSB8PSB0aGF0Qnl0ZSA8PCAoMjQgLSAoKHRoaXNTaWdCeXRlcyArIGkpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIHdvcmQgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoYXRTaWdCeXRlczsgaiArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBqKSA+Pj4gMl0gPSB0aGF0V29yZHNbaiA+Pj4gMl07XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyArPSB0aGF0U2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZW1vdmVzIGluc2lnbmlmaWNhbnQgYml0cy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5LmNsYW1wKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xhbXA6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXBcblx0ICAgICAgICAgICAgd29yZHNbc2lnQnl0ZXMgPj4+IDJdICY9IDB4ZmZmZmZmZmYgPDwgKDMyIC0gKHNpZ0J5dGVzICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgd29yZHMubGVuZ3RoID0gTWF0aC5jZWlsKHNpZ0J5dGVzIC8gNCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSB3b3JkQXJyYXkuY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLndvcmRzID0gdGhpcy53b3Jkcy5zbGljZSgwKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSB3b3JkIGFycmF5IGZpbGxlZCB3aXRoIHJhbmRvbSBieXRlcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBuQnl0ZXMgVGhlIG51bWJlciBvZiByYW5kb20gYnl0ZXMgdG8gZ2VuZXJhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSByYW5kb20gd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkucmFuZG9tKDE2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByYW5kb206IGZ1bmN0aW9uIChuQnl0ZXMpIHtcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgd29yZHMucHVzaChjcnlwdG9TZWN1cmVSYW5kb21JbnQoKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBuQnl0ZXMpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEVuY29kZXIgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEhleCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEhleCA9IENfZW5jLkhleCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoZXhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuSGV4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgaGV4Q2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlID4+PiA0KS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSAmIDB4MGYpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gaGV4Q2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgaGV4IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4U3RyIFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5IZXgucGFyc2UoaGV4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGhleFN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGV4U3RyTGVuZ3RoID0gaGV4U3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhleFN0ckxlbmd0aDsgaSArPSAyKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAzXSB8PSBwYXJzZUludChoZXhTdHIuc3Vic3RyKGksIDIpLCAxNikgPDwgKDI0IC0gKGkgJSA4KSAqIDQpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgaGV4U3RyTGVuZ3RoIC8gMik7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMYXRpbjEgZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBMYXRpbjEgPSBDX2VuYy5MYXRpbjEgPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgbGF0aW4xU3RyaW5nID0gQ3J5cHRvSlMuZW5jLkxhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMUNoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgbGF0aW4xQ2hhcnMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJpdGUpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBsYXRpbjFDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBMYXRpbjEgc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYXRpbjFTdHIgVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkxhdGluMS5wYXJzZShsYXRpbjFTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAobGF0aW4xU3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFTdHJMZW5ndGggPSBsYXRpbjFTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF0aW4xU3RyTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDJdIHw9IChsYXRpbjFTdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYpIDw8ICgyNCAtIChpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGxhdGluMVN0ckxlbmd0aCk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBVVEYtOCBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB1dGY4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLlV0Zjguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShMYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSkpKTtcblx0ICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgVVRGLTggZGF0YScpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgVVRGLTggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dGY4U3RyIFRoZSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UodXRmOFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uICh1dGY4U3RyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBMYXRpbjEucGFyc2UodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHV0ZjhTdHIpKSk7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBidWZmZXJlZCBibG9jayBhbGdvcml0aG0gdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogVGhlIHByb3BlcnR5IGJsb2NrU2l6ZSBtdXN0IGJlIGltcGxlbWVudGVkIGluIGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gX21pbkJ1ZmZlclNpemUgVGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBzaG91bGQgYmUga2VwdCB1bnByb2Nlc3NlZCBpbiB0aGUgYnVmZmVyLiBEZWZhdWx0OiAwXG5cdCAgICAgKi9cblx0ICAgIHZhciBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQ19saWIuQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBibG9jayBhbGdvcml0aG0ncyBkYXRhIGJ1ZmZlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIEluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBuZXcgV29yZEFycmF5LmluaXQoKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyA9IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEFkZHMgbmV3IGRhdGEgdG8gdGhpcyBibG9jayBhbGdvcml0aG0ncyBidWZmZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYXBwZW5kLiBTdHJpbmdzIGFyZSBjb252ZXJ0ZWQgdG8gYSBXb3JkQXJyYXkgdXNpbmcgVVRGLTguXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCgnZGF0YScpO1xuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfYXBwZW5kOiBmdW5jdGlvbiAoZGF0YSkge1xuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAgZGF0YSA9IFV0ZjgucGFyc2UoZGF0YSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YS5jb25jYXQoZGF0YSk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgKz0gZGF0YS5zaWdCeXRlcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUHJvY2Vzc2VzIGF2YWlsYWJsZSBkYXRhIGJsb2Nrcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIFRoaXMgbWV0aG9kIGludm9rZXMgX2RvUHJvY2Vzc0Jsb2NrKG9mZnNldCksIHdoaWNoIG11c3QgYmUgaW1wbGVtZW50ZWQgYnkgYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBkb0ZsdXNoIFdoZXRoZXIgYWxsIGJsb2NrcyBhbmQgcGFydGlhbCBibG9ja3Mgc2hvdWxkIGJlIHByb2Nlc3NlZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHByb2Nlc3NlZCBkYXRhLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX3Byb2Nlc3M6IGZ1bmN0aW9uIChkb0ZsdXNoKSB7XG5cdCAgICAgICAgICAgIHZhciBwcm9jZXNzZWRXb3JkcztcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGRhdGFTaWdCeXRlcyA9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSB0aGlzLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBibG9ja3MgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CbG9ja3NSZWFkeSA9IGRhdGFTaWdCeXRlcyAvIGJsb2NrU2l6ZUJ5dGVzO1xuXHQgICAgICAgICAgICBpZiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgdXAgdG8gaW5jbHVkZSBwYXJ0aWFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5jZWlsKG5CbG9ja3NSZWFkeSk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCBkb3duIHRvIGluY2x1ZGUgb25seSBmdWxsIGJsb2Nrcyxcblx0ICAgICAgICAgICAgICAgIC8vIGxlc3MgdGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBtdXN0IHJlbWFpbiBpbiB0aGUgYnVmZmVyXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLm1heCgobkJsb2Nrc1JlYWR5IHwgMCkgLSB0aGlzLl9taW5CdWZmZXJTaXplLCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvdW50IHdvcmRzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuV29yZHNSZWFkeSA9IG5CbG9ja3NSZWFkeSAqIGJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBieXRlcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJ5dGVzUmVhZHkgPSBNYXRoLm1pbihuV29yZHNSZWFkeSAqIDQsIGRhdGFTaWdCeXRlcyk7XG5cblx0ICAgICAgICAgICAgLy8gUHJvY2VzcyBibG9ja3Ncblx0ICAgICAgICAgICAgaWYgKG5Xb3Jkc1JlYWR5KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBuV29yZHNSZWFkeTsgb2Zmc2V0ICs9IGJsb2NrU2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtYWxnb3JpdGhtIGxvZ2ljXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9Qcm9jZXNzQmxvY2soZGF0YVdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgICAgICBwcm9jZXNzZWRXb3JkcyA9IGRhdGFXb3Jkcy5zcGxpY2UoMCwgbldvcmRzUmVhZHkpO1xuXHQgICAgICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyAtPSBuQnl0ZXNSZWFkeTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBwcm9jZXNzZWQgd29yZHNcblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdChwcm9jZXNzZWRXb3JkcywgbkJ5dGVzUmVhZHkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5fZGF0YSA9IHRoaXMuX2RhdGEuY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9taW5CdWZmZXJTaXplOiAwXG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBYnN0cmFjdCBoYXNoZXIgdGVtcGxhdGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJsb2NrU2l6ZSBUaGUgbnVtYmVyIG9mIDMyLWJpdCB3b3JkcyB0aGlzIGhhc2hlciBvcGVyYXRlcyBvbi4gRGVmYXVsdDogMTYgKDUxMiBiaXRzKVxuXHQgICAgICovXG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyID0gQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucy5cblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjZmc6IEJhc2UuZXh0ZW5kKCksXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgaGFzaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoYXNoZXIgPSBDcnlwdG9KUy5hbGdvLlNIQTI1Ni5jcmVhdGUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoY2ZnKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xuXHQgICAgICAgICAgICB0aGlzLmNmZyA9IHRoaXMuY2ZnLmV4dGVuZChjZmcpO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGhhc2hlciB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gUmVzZXQgZGF0YSBidWZmZXJcblx0ICAgICAgICAgICAgQnVmZmVyZWRCbG9ja0FsZ29yaXRobS5yZXNldC5jYWxsKHRoaXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHRoaXMuX2RvUmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogVXBkYXRlcyB0aGlzIGhhc2hlciB3aXRoIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSBUaGUgbWVzc2FnZSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtIYXNoZXJ9IFRoaXMgaGFzaGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBoYXNoXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEZpbmFsaXplcyB0aGUgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKiBOb3RlIHRoYXQgdGhlIGZpbmFsaXplIG9wZXJhdGlvbiBpcyBlZmZlY3RpdmVseSBhIGRlc3RydWN0aXZlLCByZWFkLW9uY2Ugb3BlcmF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIChPcHRpb25hbCkgQSBmaW5hbCBtZXNzYWdlIHVwZGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIHZhciBoYXNoID0gaGFzaGVyLmZpbmFsaXplKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgZmluYWxpemU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIC8vIEZpbmFsIG1lc3NhZ2UgdXBkYXRlXG5cdCAgICAgICAgICAgIGlmIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9hcHBlbmQobWVzc2FnZVVwZGF0ZSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2RvRmluYWxpemUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gaGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgYmxvY2tTaXplOiA1MTIvMzIsXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gYSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIGNyZWF0ZSBhIGhlbHBlciBmb3IuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHNob3J0Y3V0IGZ1bmN0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSGVscGVyOiBmdW5jdGlvbiAoaGFzaGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSwgY2ZnKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGhhc2hlci5pbml0KGNmZykuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gdXNlIGluIHRoaXMgSE1BQyBoZWxwZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIHNob3J0Y3V0IGZ1bmN0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgSG1hY1NIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIbWFjSGVscGVyOiBmdW5jdGlvbiAoaGFzaGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSwga2V5KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3IENfYWxnby5ITUFDLmluaXQoaGFzaGVyLCBrZXkpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFsZ29yaXRobSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ28gPSB7fTtcblxuXHQgICAgcmV0dXJuIEM7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTO1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBDb25zdGFudHMgdGFibGVcblx0ICAgIHZhciBUID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgY29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICBUW2ldID0gKE1hdGguYWJzKE1hdGguc2luKGkgKyAxKSkgKiAweDEwMDAwMDAwMCkgfCAwO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogTUQ1IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgTUQ1ID0gQ19hbGdvLk1ENSA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoW1xuXHQgICAgICAgICAgICAgICAgMHg2NzQ1MjMwMSwgMHhlZmNkYWI4OSxcblx0ICAgICAgICAgICAgICAgIDB4OThiYWRjZmUsIDB4MTAzMjU0NzZcblx0ICAgICAgICAgICAgXSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE2OyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICAgICAgdmFyIG9mZnNldF9pID0gb2Zmc2V0ICsgaTtcblx0ICAgICAgICAgICAgICAgIHZhciBNX29mZnNldF9pID0gTVtvZmZzZXRfaV07XG5cblx0ICAgICAgICAgICAgICAgIE1bb2Zmc2V0X2ldID0gKFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgOCkgIHwgKE1fb2Zmc2V0X2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgKCgoTV9vZmZzZXRfaSA8PCAyNCkgfCAoTV9vZmZzZXRfaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICAgICApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBIID0gdGhpcy5faGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMCAgPSBNW29mZnNldCArIDBdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMSAgPSBNW29mZnNldCArIDFdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMiAgPSBNW29mZnNldCArIDJdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMyAgPSBNW29mZnNldCArIDNdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNCAgPSBNW29mZnNldCArIDRdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNSAgPSBNW29mZnNldCArIDVdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNiAgPSBNW29mZnNldCArIDZdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfNyAgPSBNW29mZnNldCArIDddO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfOCAgPSBNW29mZnNldCArIDhdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfOSAgPSBNW29mZnNldCArIDldO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTAgPSBNW29mZnNldCArIDEwXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzExID0gTVtvZmZzZXQgKyAxMV07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMiA9IE1bb2Zmc2V0ICsgMTJdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTMgPSBNW29mZnNldCArIDEzXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzE0ID0gTVtvZmZzZXQgKyAxNF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xNSA9IE1bb2Zmc2V0ICsgMTVdO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFsYmVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRhdGlvblxuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfMCwgIDcsICBUWzBdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEsICAxMiwgVFsxXSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8yLCAgMTcsIFRbMl0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMywgIDIyLCBUWzNdKTtcblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzQsICA3LCAgVFs0XSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF81LCAgMTIsIFRbNV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfNiwgIDE3LCBUWzZdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzcsICAyMiwgVFs3XSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF84LCAgNywgIFRbOF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfOSwgIDEyLCBUWzldKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzEwLCAxNywgVFsxMF0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTEsIDIyLCBUWzExXSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF8xMiwgNywgIFRbMTJdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEzLCAxMiwgVFsxM10pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTQsIDE3LCBUWzE0XSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF8xNSwgMjIsIFRbMTVdKTtcblxuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfMSwgIDUsICBUWzE2XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF82LCAgOSwgIFRbMTddKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzExLCAxNCwgVFsxOF0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfMCwgIDIwLCBUWzE5XSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF81LCAgNSwgIFRbMjBdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEwLCA5LCAgVFsyMV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMTUsIDE0LCBUWzIyXSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF80LCAgMjAsIFRbMjNdKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzksICA1LCAgVFsyNF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMTQsIDksICBUWzI1XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8zLCAgMTQsIFRbMjZdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzgsICAyMCwgVFsyN10pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfMTMsIDUsICBUWzI4XSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8yLCAgOSwgIFRbMjldKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzcsICAxNCwgVFszMF0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfMTIsIDIwLCBUWzMxXSk7XG5cblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzUsICA0LCAgVFszMl0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfOCwgIDExLCBUWzMzXSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8xMSwgMTYsIFRbMzRdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzE0LCAyMywgVFszNV0pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfMSwgIDQsICBUWzM2XSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF80LCAgMTEsIFRbMzddKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzcsICAxNiwgVFszOF0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTAsIDIzLCBUWzM5XSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF8xMywgNCwgIFRbNDBdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzAsICAxMSwgVFs0MV0pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMywgIDE2LCBUWzQyXSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF82LCAgMjMsIFRbNDNdKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzksICA0LCAgVFs0NF0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTIsIDExLCBUWzQ1XSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF8xNSwgMTYsIFRbNDZdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzIsICAyMywgVFs0N10pO1xuXG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF8wLCAgNiwgIFRbNDhdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzcsICAxMCwgVFs0OV0pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTQsIDE1LCBUWzUwXSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF81LCAgMjEsIFRbNTFdKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEyLCA2LCAgVFs1Ml0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMywgIDEwLCBUWzUzXSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF8xMCwgMTUsIFRbNTRdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEsICAyMSwgVFs1NV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfOCwgIDYsICBUWzU2XSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8xNSwgMTAsIFRbNTddKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzYsICAxNSwgVFs1OF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTMsIDIxLCBUWzU5XSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF80LCAgNiwgIFRbNjBdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzExLCAxMCwgVFs2MV0pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMiwgIDE1LCBUWzYyXSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF85LCAgMjEsIFRbNjNdKTtcblxuXHQgICAgICAgICAgICAvLyBJbnRlcm1lZGlhdGUgaGFzaCB2YWx1ZVxuXHQgICAgICAgICAgICBIWzBdID0gKEhbMF0gKyBhKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMV0gPSAoSFsxXSArIGIpIHwgMDtcblx0ICAgICAgICAgICAgSFsyXSA9IChIWzJdICsgYykgfCAwO1xuXHQgICAgICAgICAgICBIWzNdID0gKEhbM10gKyBkKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbEggPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsTCA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gKFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEggPDwgOCkgIHwgKG5CaXRzVG90YWxIID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEggPDwgMjQpIHwgKG5CaXRzVG90YWxIID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSAoXG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsTCA8PCA4KSAgfCAobkJpdHNUb3RhbEwgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAoKChuQml0c1RvdGFsTCA8PCAyNCkgfCAobkJpdHNUb3RhbEwgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICApO1xuXG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSAoZGF0YVdvcmRzLmxlbmd0aCArIDEpICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5faGFzaDtcblx0ICAgICAgICAgICAgdmFyIEggPSBoYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFN3YXAgZW5kaWFuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICAgICAgdmFyIEhfaSA9IEhbaV07XG5cblx0ICAgICAgICAgICAgICAgIEhbaV0gPSAoKChIX2kgPDwgOCkgIHwgKEhfaSA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICAgICAgICAoKChIX2kgPDwgMjQpIHwgKEhfaSA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIGZ1bmN0aW9uIEZGKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoKGIgJiBjKSB8ICh+YiAmIGQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIEdHKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoKGIgJiBkKSB8IChjICYgfmQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIEhIKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoYiBeIGMgXiBkKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIGZ1bmN0aW9uIElJKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcblx0ICAgICAgICB2YXIgbiA9IGEgKyAoYyBeIChiIHwgfmQpKSArIHggKyB0O1xuXHQgICAgICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XG5cdCAgICB9XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5NRDUoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLk1ENSh3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLk1ENSA9IEhhc2hlci5fY3JlYXRlSGVscGVyKE1ENSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjTUQ1KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY01ENSA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihNRDUpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5NRDU7XG5cbn0pKTsiLCJpbXBvcnQge1xuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIERyYXdlckNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLFxuICBWZWN0b3JBcnJheVR5cGUsXG4gIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBpbWFnZUNhY2hlSGVscGVyIGZyb20gJy4vaGVscGVycy9pbWFnZS1jYWNoZS1oZWxwZXInO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSAnLi9zdHJ1Y3RzL3ZlY3Rvcic7XG5pbXBvcnQgR3JpZEZpbHRlciBmcm9tICcuL3N0cnVjdHMvZmlsdGVycy9ncmlkLWZpbHRlcic7XG5pbXBvcnQgUG9zaXRpb25hbENvbnRleHQgZnJvbSAnLi9zdHJ1Y3RzL2RyYXdhYmxlL3Bvc2l0aW9uYWwtY29udGV4dCc7XG5pbXBvcnQgeyBDb29yZHNGaWx0ZXJDb25maWdJbnRlcmZhY2UgfSBmcm9tICcuL3N0cnVjdHMvZmlsdGVycy90eXBlcyc7XG5cbi8qKlxuICogQ2FudmFzIGRyYXdlclxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3ZXIgaW1wbGVtZW50cyBEcmF3ZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICogTmFtZSBvZiBjbGFzcyB0byB1c2UgYXMgc3Vic2NyaWJlciBuYW1lIGluIG9ic2VydmFibGUgbG9naWNcbiAgICovXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlck5hbWU6IHN0cmluZyA9ICdEcmF3ZXInO1xuICAvKipcbiAgICogQ2FudmFzIERPTSBlbGVtZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgX2RvbUVsZW1lbnQ6IEhUTUxDYW52YXNFbGVtZW50O1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfdmlld0NvbmZpZzogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBEcmF3YWJsZSBvYmplY3RzIHN0b3JhZ2VcbiAgICovXG4gIHByb3RlY3RlZCBfc3RvcmFnZTogRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlO1xuICAvKipcbiAgICogQ2FudmFzIGRyYXdpbmcgY29udGV4dFxuICAgKi9cbiAgcHJvdGVjdGVkIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIC8qKlxuICAgKiBSZXNpemUgb2JzZXJ2ZXIgb2JqZWN0XG4gICAqL1xuICBwcm90ZWN0ZWQgX3Jlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcblxuICAvKipcbiAgICogRHJhd2VyIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBkb21FbGVtZW50IC0gY2FudmFzIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSB2aWV3Q29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIHN0b3JhZ2UgLSBkcmF3YWJsZSBvYmplY3RzIHN0b3JhZ2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKHtcbiAgICBkb21FbGVtZW50LFxuICAgIHZpZXdDb25maWcsXG4gICAgc3RvcmFnZSxcbiAgfTogRHJhd2VyQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgdGhpcy5fdmlld0NvbmZpZyA9IHZpZXdDb25maWc7XG4gICAgdGhpcy5fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgdGhpcy5fY29udGV4dCA9IGRvbUVsZW1lbnQuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIHRoaXMuX2luaXRSZXNpemVPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRWaWV3Q29uZmlnT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9pbml0U3RvcmFnZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdEltYWdlQ2FjaGVPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRNb3VzZUV2ZW50cygpO1xuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdlckludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGRyYXcoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoLi4udGhpcy5fdmlld0NvbmZpZy5vZmZzZXQpO1xuICAgIHRoaXMuX2NvbnRleHQuc2NhbGUoLi4udGhpcy5fdmlld0NvbmZpZy5zY2FsZSk7XG4gICAgdGhpcy5fc3RvcmFnZS5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmNvbmZpZy52aXNpYmxlKSB7XG4gICAgICAgIGl0ZW0uZHJhdyh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLnJlZnJlc2h9XG4gICAqL1xuICBwdWJsaWMgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZG9tRWxlbWVudC53aWR0aCAhPT0gdGhpcy53aWR0aCkge1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2RvbUVsZW1lbnQuaGVpZ2h0ICE9PSB0aGlzLmhlaWdodCkge1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygncmVmcmVzaGVkJyk7XG5cbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdlckludGVyZmFjZS5jbGVhcn1cbiAgICovXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBib3VuZHMgb2YgY2FudmFzIGZyYW1lXG4gICAqL1xuICBwdWJsaWMgZ2V0Qm91bmRzKCk6IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0ge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQoWzAsIDBdKSxcbiAgICAgIHRoaXMuX3ZpZXdDb25maWcudHJhbnNwb3NlRm9yd2FyZChbdGhpcy53aWR0aCwgdGhpcy5oZWlnaHRdKSxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIGdldHRlclxuICAgKi9cbiAgZ2V0IHZpZXdDb25maWcoKTogVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl92aWV3Q29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyBjb250ZXh0IGdldHRlclxuICAgKi9cbiAgZ2V0IGNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgd2lkdGggZ2V0dGVyXG4gICAqL1xuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW52YXMgaGVpZ2h0IGdldHRlclxuICAgKi9cbiAgZ2V0IGhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kb21FbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgY2FudmFzIHJlc2l6ZSBvYnNlcnZlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0UmVzaXplT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5fZG9tRWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHZpZXcgY29uZmlnIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRWaWV3Q29uZmlnT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld0NvbmZpZy5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgc3RvcmFnZSBvYnNlcnZlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0U3RvcmFnZU9ic2VydmVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JhZ2Uub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIGltYWdlIGNhY2hlIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRJbWFnZUNhY2hlT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgaW1hZ2VDYWNoZUhlbHBlci5zdWJzY3JpYmUodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHtcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBtb3VzZSBldmVudHMgb2JzZXJ2ZXJcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdE1vdXNlRXZlbnRzKCk6IHZvaWQge1xuICAgIC8vIFRPRE8g0L/QtdGA0LXQvdC10YHRgtC4INC60YPQtNCwLdC90LjQsdGD0LTRjFxuXG4gICAgY29uc3QgY29vcmRzRmlsdGVyID0gbmV3IEdyaWRGaWx0ZXIoKTtcbiAgICBjb25zdCBmaWx0ZXJDb29yZHMgPSAoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpID0+IHtcbiAgICAgIHJldHVybiBjb29yZHNGaWx0ZXIucHJvY2Vzcyhjb29yZHMsIHRoaXMuX3ZpZXdDb25maWcuZ2V0Q29uZmlnKCkgYXMgQ29vcmRzRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTtcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnRFbGVtZW50Q29udGV4dDogUG9zaXRpb25hbENvbnRleHQgPSBuZXcgUG9zaXRpb25hbENvbnRleHQobnVsbCwgbnVsbCk7XG5cbiAgICBjb25zdCBERVZJQVRJT04gPSA4O1xuICAgIGNvbnN0IGdldE5lYXJCb3VuZEVsZW1lbnQgPSAoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBQb3NpdGlvbmFsQ29udGV4dCA9PiB7XG4gICAgICBjb25zdCB0cmFuc3Bvc2VkQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQoY29vcmRzKTtcbiAgICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLmZpbmRCeU5lYXJFZGdlUG9zaXRpb24odHJhbnNwb3NlZENvb3JkcywgREVWSUFUSU9OIC8gdGhpcy5fdmlld0NvbmZpZy5zY2FsZVswXSk7XG4gICAgfTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5jdHJsS2V5KSB7XG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuX3ZpZXdDb25maWcuc2NhbGVbMF07XG4gICAgICAgIHNjYWxlICs9IGV2ZW50LmRlbHRhWSAqIC0wLjAwMjtcbiAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihNYXRoLm1heCgwLjAwMSwgc2NhbGUpLCAxMDApO1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLnVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0KFtzY2FsZSwgc2NhbGVdLCBbZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WV0pO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFswXSAtPSBldmVudC5kZWx0YVk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFsxXSAtPSBldmVudC5kZWx0YVk7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBsZXQgbW91c2VEb3duQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUgfCBudWxsID0gbnVsbDtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBpZiAoY3VycmVudEVsZW1lbnRDb250ZXh0LmlzRW1wdHkoKSkge1xuICAgICAgICBjb25zdCB0cmFuc3Bvc2VkQ29vcmRzID0gdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXSk7XG4gICAgICAgIGN1cnJlbnRFbGVtZW50Q29udGV4dCA9IHRoaXMuX3N0b3JhZ2UuZmluZEJ5UG9zaXRpb24odHJhbnNwb3NlZENvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBtb3VzZU1vdmVDb29yZHM6IFZlY3RvckFycmF5VHlwZSA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIGNvbnN0IHRyYW5zcG9zZWRDb29yZHMgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQobW91c2VNb3ZlQ29vcmRzKTtcblxuICAgICAgaWYgKG1vdXNlRG93bkNvb3JkcyA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoIWdldE5lYXJCb3VuZEVsZW1lbnQobW91c2VNb3ZlQ29vcmRzKS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdjcm9zc2hhaXInO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9zdG9yYWdlLmZpbmRCeVBvc2l0aW9uKHRyYW5zcG9zZWRDb29yZHMpLmlzRW1wdHkoKSkge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWN1cnJlbnRFbGVtZW50Q29udGV4dC5pc0VtcHR5KCkpIHtcbiAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSBjcmVhdGVWZWN0b3IodHJhbnNwb3NlZENvb3JkcylcbiAgICAgICAgICAuc3ViKGNyZWF0ZVZlY3RvcihjdXJyZW50RWxlbWVudENvbnRleHQucG9zaXRpb24pKVxuICAgICAgICAgIC50b0FycmF5KCk7XG4gICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uRmlsdGVyZWQgPSBmaWx0ZXJDb29yZHMobmV3UG9zaXRpb24pO1xuXG4gICAgICAgIGlmICghY3JlYXRlVmVjdG9yKG5ld1Bvc2l0aW9uRmlsdGVyZWQpLmlzRXF1YWwoY3JlYXRlVmVjdG9yKGN1cnJlbnRFbGVtZW50Q29udGV4dC5lbGVtZW50LmNvbmZpZy5wb3NpdGlvbikpKSB7XG4gICAgICAgICAgY3VycmVudEVsZW1lbnRDb250ZXh0LmVsZW1lbnQuY29uZmlnLnBvc2l0aW9uID0gbmV3UG9zaXRpb25GaWx0ZXJlZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlmZmVyZW5jZTogVmVjdG9yQXJyYXlUeXBlID0gW1xuICAgICAgICAgIG1vdXNlRG93bkNvb3Jkc1swXS1tb3VzZU1vdmVDb29yZHNbMF0sXG4gICAgICAgICAgbW91c2VEb3duQ29vcmRzWzFdLW1vdXNlTW92ZUNvb3Jkc1sxXSxcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldCA9IGNyZWF0ZVZlY3Rvcih0aGlzLl92aWV3Q29uZmlnLm9mZnNldClcbiAgICAgICAgICAuc3ViKGNyZWF0ZVZlY3RvcihkaWZmZXJlbmNlKSlcbiAgICAgICAgICAudG9BcnJheSgpO1xuICAgICAgfVxuXG4gICAgICBtb3VzZURvd25Db29yZHMgPSBtb3VzZU1vdmVDb29yZHM7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICBpZiAoIWN1cnJlbnRFbGVtZW50Q29udGV4dC5pc0VtcHR5KCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudEVsZW1lbnRDb250ZXh0LmVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50RWxlbWVudENvbnRleHQgPSBuZXcgUG9zaXRpb25hbENvbnRleHQobnVsbCwgbnVsbCk7XG4gICAgICBtb3VzZURvd25Db29yZHMgPSBudWxsO1xuICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG4gIFZlY3RvckFycmF5VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gJy4uL3N0cnVjdHMvZHJhd2FibGUvZHJhd2FibGUnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIGdyaWRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkQ29uZmlnSW50ZXJmYWNlIGV4dGVuZHMgRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICBtYWluTGluZUNvbG9yOiBzdHJpbmc7XG4gIHN1YkxpbmVDb2xvcjogc3RyaW5nO1xuICBsaW5lV2lkdGg6IG51bWJlcjtcbiAgbGluZXNJbkJsb2NrOiBudW1iZXI7XG59XG5cbi8qKlxuICogR3JpZCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ0dyaWQnO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBHcmlkQ29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBHcmlkIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIG9iamVjdCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBsaW5rZWQgZXh0cmEgZGF0YVxuICAgKi9cbiAgY29uc3RydWN0b3IoaWQ6IERyYXdhYmxlSWRUeXBlLCBjb25maWc6IEdyaWRDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBkcmF3ZXIuY29udGV4dC5zYXZlKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cbiAgICBjb25zdCBbZnJvbUJvdW5kLCB0b0JvdW5kXSA9IGRyYXdlci5nZXRCb3VuZHMoKTtcbiAgICBjb25zdCBzY2FsZSA9IGRyYXdlci52aWV3Q29uZmlnLnNjYWxlWzBdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5fY29uZmlnLmxpbmVXaWR0aCAvIHNjYWxlO1xuXG4gICAgbGV0IHN0ZXAgPSBkcmF3ZXIudmlld0NvbmZpZy5ncmlkU3RlcDtcblxuICAgIGlmIChzY2FsZSA8IDEpIHtcbiAgICAgIHN0ZXAgKj0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMigxIC8gc2NhbGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RlcCAvPSAyICoqIE1hdGgucm91bmQoTWF0aC5sb2cyKHNjYWxlKSk7XG4gICAgfVxuXG4gICAgY29uc3QgbWFpbkxpbmVEaXN0YW5jZSA9IHN0ZXAgKiB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrO1xuICAgIGxldCB4R2FwID0gKGZyb21Cb3VuZFswXSAlIG1haW5MaW5lRGlzdGFuY2UpO1xuICAgIGlmICh4R2FwIDwgMCkge1xuICAgICAgeEdhcCArPSBtYWluTGluZURpc3RhbmNlO1xuICAgIH1cbiAgICBsZXQgeUdhcCA9IChmcm9tQm91bmRbMV0gJSBtYWluTGluZURpc3RhbmNlKTtcbiAgICBpZiAoeUdhcCA8IDApIHtcbiAgICAgIHlHYXAgKz0gbWFpbkxpbmVEaXN0YW5jZTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBsZXQgaiA9IDA7XG4gICAgICBmb3IgKGxldCBpPWZyb21Cb3VuZFsxXS15R2FwOyBpPD10b0JvdW5kWzFdOyBpKz1zdGVwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKGorKyAlIHRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2sgPT09IDApXG4gICAgICAgICAgPyB0aGlzLl9jb25maWcubWFpbkxpbmVDb2xvclxuICAgICAgICAgIDogdGhpcy5fY29uZmlnLnN1YkxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fZHJhd0hvcml6b250YWxMaW5lKGksIGRyYXdlciwgY29sb3IsIFtmcm9tQm91bmQsIHRvQm91bmRdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBsZXQgaiA9IDA7XG4gICAgICBmb3IgKGxldCBpPWZyb21Cb3VuZFswXS14R2FwOyBpPD10b0JvdW5kWzBdOyBpKz1zdGVwKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gKGorKyAlIHRoaXMuX2NvbmZpZy5saW5lc0luQmxvY2sgPT09IDApXG4gICAgICAgICAgPyB0aGlzLl9jb25maWcubWFpbkxpbmVDb2xvclxuICAgICAgICAgIDogdGhpcy5fY29uZmlnLnN1YkxpbmVDb2xvcjtcbiAgICAgICAgdGhpcy5fZHJhd1ZlcnRpY2FsTGluZShpLCBkcmF3ZXIsIGNvbG9yLCBbZnJvbUJvdW5kLCB0b0JvdW5kXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgaG9yaXpvbnRhbCBsaW5lXG4gICAqIEBwYXJhbSB5T2Zmc2V0IC0gdmVydGljYWwgb2Zmc2V0XG4gICAqIEBwYXJhbSBkcmF3ZXIgLSBkcmF3ZXIgb2JqZWN0XG4gICAqIEBwYXJhbSBjb2xvciAtIGNvbG9yXG4gICAqIEBwYXJhbSBmcm9tQm91bmQgLSBsZWZ0LXRvcCBib3VuZFxuICAgKiBAcGFyYW0gdG9Cb3VuZCAtIHJpZ2h0LWJvdHRvbSBib3VuZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kcmF3SG9yaXpvbnRhbExpbmUoXG4gICAgeU9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0sXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW2Zyb21Cb3VuZFswXSwgeU9mZnNldF07XG4gICAgY29uc3QgbGluZVRvID0gW3RvQm91bmRbMF0sIHlPZmZzZXRdO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyB2ZXJ0aWNhbCBsaW5lXG4gICAqIEBwYXJhbSBkcmF3ZXIgLSBkcmF3ZXIgb2JqZWN0XG4gICAqIEBwYXJhbSB4T2Zmc2V0IC0gaG9yaXpvbnRhbCBvZmZzZXRcbiAgICogQHBhcmFtIGNvbG9yIC0gY29sb3JcbiAgICogQHBhcmFtIGZyb21Cb3VuZCAtIGxlZnQtdG9wIGJvdW5kXG4gICAqIEBwYXJhbSB0b0JvdW5kIC0gcmlnaHQtYm90dG9tIGJvdW5kXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RyYXdWZXJ0aWNhbExpbmUoXG4gICAgeE9mZnNldDogbnVtYmVyLFxuICAgIGRyYXdlcjogRHJhd2VySW50ZXJmYWNlLFxuICAgIGNvbG9yOiBzdHJpbmcsXG4gICAgW2Zyb21Cb3VuZCwgdG9Cb3VuZF06IFtWZWN0b3JBcnJheVR5cGUsIFZlY3RvckFycmF5VHlwZV0sXG4gICkge1xuICAgIGNvbnN0IGxpbmVGcm9tID0gW3hPZmZzZXQsIGZyb21Cb3VuZFsxXV07XG4gICAgY29uc3QgbGluZVRvID0gW3hPZmZzZXQsIHRvQm91bmRbMV1dO1xuXG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBkcmF3ZXIuY29udGV4dC5tb3ZlVG8obGluZUZyb21bMF0sIGxpbmVGcm9tWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lVG8obGluZVRvWzBdLCBsaW5lVG9bMV0pO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBTdHlsaXplZERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFBvc2l0aW9uYWxEcmF3YWJsZSBmcm9tICcuLi9zdHJ1Y3RzL2RyYXdhYmxlL3Bvc2l0aW9uYWwtZHJhd2FibGUnO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIHJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVjdENvbmZpZ0ludGVyZmFjZSBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSwgU3R5bGl6ZWREcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG5cbn1cblxuLyoqXG4gKiBSZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0IGV4dGVuZHMgUG9zaXRpb25hbERyYXdhYmxlIGltcGxlbWVudHMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdSZWN0JztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUmVjdENvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogUmVjdCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBSZWN0Q29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgZHJhd2VyLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9jb25maWcuc3Ryb2tlU3R5bGU7XG4gICAgZHJhd2VyLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fY29uZmlnLmZpbGxTdHlsZTtcbiAgICBkcmF3ZXIuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLl9jb25maWcubGluZVdpZHRoO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGxSZWN0KC4uLnRoaXMuX2NvbmZpZy5wb3NpdGlvbiwgLi4udGhpcy5fY29uZmlnLnNpemUpO1xuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5saW5lV2lkdGggIT09IDApIHtcbiAgICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVJlY3QoLi4udGhpcy5fY29uZmlnLnBvc2l0aW9uLCAuLi50aGlzLl9jb25maWcuc2l6ZSk7XG4gICAgfVxuXG4gICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSwgVmVjdG9yQXJyYXlUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgUG9zaXRpb25hbERyYXdhYmxlIGZyb20gJy4uL3N0cnVjdHMvZHJhd2FibGUvcG9zaXRpb25hbC1kcmF3YWJsZSc7XG5pbXBvcnQgaW1hZ2VDYWNoZUhlbHBlciBmcm9tICcuLi9oZWxwZXJzL2ltYWdlLWNhY2hlLWhlbHBlcic7XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciBjb25maWcgb2YgcmVjdCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdmdDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU1ZHIGRhdGFcbiAgICovXG4gIGRhdGE6IHN0cmluZztcbn1cblxuLyoqXG4gKiBTdmcgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN2ZyBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnU3ZnJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogU3ZnQ29uZmlnSW50ZXJmYWNlO1xuICAvKipcbiAgICogSW1hZ2UgRE9NIGVsZW1lbnRcbiAgICovXG4gIHByb3RlY3RlZCBfaW1nOiBIVE1MSW1hZ2VFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFN2ZyBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBTdmdDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90cnlEcmF3KGRyYXdlcikpIHtcbiAgICAgIHRoaXMuX2ltZyA9IGltYWdlQ2FjaGVIZWxwZXIuY2FjaGUodGhpcy5fY29uZmlnLmRhdGEsICdpbWFnZS9zdmcreG1sJywgKGltZykgPT4ge1xuICAgICAgICB0aGlzLl9pbWcgPSBpbWc7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3RyeURyYXcoZHJhd2VyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc291cmNlV2lkdGggZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNvdXJjZVdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2ltZy53aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzb3VyY2VIZWlnaHQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHNvdXJjZUhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbWcuaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIHNjYWxlIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBzY2FsZSgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiBbXG4gICAgICB0aGlzLl9jb25maWcuc2l6ZVswXSAvIHRoaXMuc291cmNlV2lkdGgsXG4gICAgICB0aGlzLl9jb25maWcuc2l6ZVsxXSAvIHRoaXMuc291cmNlSGVpZ2h0LFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogVHJpZXMgdG8gZHJhdyB0aGUgZmlndXJlIGlmIHRoZSBpbWFnZSBpcyByZWFkeVxuICAgKiBAcGFyYW0gZHJhd2VyIC0gZHJhd2VyIG9iamVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIF90cnlEcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2ltZyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9jb25maWcucG9zaXRpb247XG4gICAgICBjb25zdCBzY2FsZWRQb3NpdGlvbjogVmVjdG9yQXJyYXlUeXBlID0gW3Bvc2l0aW9uWzBdL3NjYWxlWzBdLCBwb3NpdGlvblsxXS9zY2FsZVsxXV07XG5cbiAgICAgIGRyYXdlci5jb250ZXh0LnNhdmUoKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgZHJhd2VyLmNvbnRleHQuc2NhbGUoLi4uc2NhbGUpO1xuICAgICAgZHJhd2VyLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuX2ltZywgLi4uc2NhbGVkUG9zaXRpb24pO1xuICAgICAgZHJhd2VyLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICBkcmF3ZXIuY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZGVmYXVsdCBhcyBtZDUgfSBmcm9tICdjcnlwdG8tanMvbWQ1JztcbmltcG9ydCB7IFZlY3RvckFycmF5VHlwZSB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYXJyYXlzIGFyZSBlcXVhbCBhbmQgZmFsc2UgZWxzZVxuICogQHB1YmxpY1xuICogQHBhcmFtIGxocyAtIGZpcnN0IGFycmF5IHRvIGNvbXBhcmVcbiAqIEBwYXJhbSByaHMgLSBzZWNvbmQgYXJyYXkgdG8gY29tcGFyZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJlQXJyYXlzRXF1YWwobGhzOiBBcnJheTx1bmtub3duPiwgcmhzOiBBcnJheTx1bmtub3duPik6IGJvb2xlYW4ge1xuICByZXR1cm4gbGhzLmxlbmd0aCA9PT0gcmhzLmxlbmd0aCAmJiBsaHMuZXZlcnkoKHYsIGkpID0+IHYgPT09IHJoc1tpXSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBET00gZWxlbWVudCBmcm9tIEhUTUwgc3RyaW5nXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gaHRtbFN0cmluZyAtIEhUTUwgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50RnJvbUhUTUwoaHRtbFN0cmluZzogc3RyaW5nKTogdW5rbm93biB7XG4gIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuaW5uZXJIVE1MID0gaHRtbFN0cmluZy50cmltKCk7XG5cbiAgcmV0dXJuIGRpdi5maXJzdENoaWxkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYmxvYiBmcm9tIHRleHRcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBkYXRhIC0gdGV4dFxuICogQHBhcmFtIHR5cGUgLSB0eXBlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCbG9iKGRhdGE6IHN0cmluZywgdHlwZTogc3RyaW5nKTogQmxvYiB7XG4gIHJldHVybiBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZSB9KTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHVuZGVyc3RhbmRpbmcgbWV0aG9kIGNyZWF0ZU9iamVjdFVSTCgpXG4gKi9cbmludGVyZmFjZSBVcmxJbnRlcmZhY2Uge1xuICBjcmVhdGVPYmplY3RVUkwoYmxvYjogQmxvYik6IHN0cmluZztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIFVSTCBmcm9tIGJsb2JcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBibG9iIC0gYmxvYlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXJsRnJvbUJsb2IoYmxvYjogQmxvYik6IHN0cmluZyB7XG4gIGNvbnN0IFVSTDogVXJsSW50ZXJmYWNlID0gKHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cpIGFzIFVybEludGVyZmFjZTtcbiAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59XG5cbi8qKlxuICogRmluZHMgYW5kIHJldHVybnMgbWluaW1hbCAobGVmdC10b3ApIHBvc2l0aW9uXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gcG9zaXRpb25zIC0gaW5wdXQgcG9zaXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW5Qb3NpdGlvbihwb3NpdGlvbnM6IFZlY3RvckFycmF5VHlwZVtdKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgbGV0IG1pblg6IG51bWJlciA9IEluZmluaXR5O1xuICBsZXQgbWluWTogbnVtYmVyID0gSW5maW5pdHk7XG5cbiAgcG9zaXRpb25zLmZvckVhY2goKHBvc2l0aW9uKSA9PiB7XG4gICAgaWYgKHBvc2l0aW9uWzBdIDwgbWluWCkge1xuICAgICAgbWluWCA9IHBvc2l0aW9uWzBdO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb25bMV0gPCBtaW5ZKSB7XG4gICAgICBtaW5ZID0gcG9zaXRpb25bMV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gW21pblgsIG1pblldO1xufVxuXG4vKipcbiAqIEZpbmRzIGFuZCByZXR1cm5zIG1heGltYWwgKHJpZ2h0LWJvdHRvbSkgcG9zaXRpb25cbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBwb3NpdGlvbnMgLSBpbnB1dCBwb3NpdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1heFBvc2l0aW9uKHBvc2l0aW9uczogVmVjdG9yQXJyYXlUeXBlW10pOiBWZWN0b3JBcnJheVR5cGUge1xuICBsZXQgbWF4WDogbnVtYmVyID0gLUluZmluaXR5O1xuICBsZXQgbWF4WTogbnVtYmVyID0gLUluZmluaXR5O1xuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIGlmIChwb3NpdGlvblswXSA+IG1heFgpIHtcbiAgICAgIG1heFggPSBwb3NpdGlvblswXTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uWzFdID4gbWF4WSkge1xuICAgICAgbWF4WSA9IHBvc2l0aW9uWzFdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFttYXhYLCBtYXhZXTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIE1ENSBoYXNoIGZyb20gc3RyaW5nXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gaW5wdXQgLSBpbnB1dCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc2hTdHJpbmcoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBtZDUoaW5wdXQpLnRvU3RyaW5nKCk7XG59XG4iLCJpbXBvcnQgSW1hZ2VDYWNoZSBmcm9tICcuLi9zdHJ1Y3RzL2ltYWdlLWNhY2hlJztcblxuLyoqXG4gKiBJbWFnZSBjYWNoZSBoZWxwZXJcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgbmV3IEltYWdlQ2FjaGUoKTtcbiIsImltcG9ydCB7IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic2VydmVIZWxwZXIgaW1wbGVtZW50cyBPYnNlcnZlSGVscGVySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIEhhbmRsZXJzIG1hcHBlZCBieSBzdWJzY3JpYmVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9oYW5kbGVyTWFwOiBSZWNvcmQ8c3RyaW5nLCBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlPiA9IHt9O1xuICAvKipcbiAgICogRmxhZyBmb3IgbXV0aW5nIGhhbmRsZXJzXG4gICAqL1xuICBwcm90ZWN0ZWQgX211dGVIYW5kbGVyczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5vbkNoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvbkNoYW5nZShcbiAgICBzdWJzY3JpYmVyTmFtZTogc3RyaW5nLFxuICAgIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2hhbmRsZXJNYXBbc3Vic2NyaWJlck5hbWVdID0gaGFuZGxlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5vZmZDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBkZWxldGUgdGhpcy5faGFuZGxlck1hcFtzdWJzY3JpYmVyTmFtZV07XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnN9XG4gICAqL1xuICBwdWJsaWMgcHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoXG4gICAgZXh0cmE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9IG51bGwsXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuKSA9PiB0aGlzLnByb2Nlc3NIYW5kbGVycyhtdXRlZEJlZm9yZSwgZXh0cmEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS53aXRoTXV0ZUhhbmRsZXJzfVxuICAgKi9cbiAgcHVibGljIHdpdGhNdXRlSGFuZGxlcnMoXG4gICAgYWN0aW9uOiAobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHZvaWQsXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9tdXRlSGFuZGxlcnMpIHtcbiAgICAgIGFjdGlvbih0cnVlLCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbXV0ZUhhbmRsZXJzID0gdHJ1ZTtcbiAgICAgIGFjdGlvbihmYWxzZSwgdGhpcyk7XG4gICAgICB0aGlzLl9tdXRlSGFuZGxlcnMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgT2JzZXJ2ZUhlbHBlckludGVyZmFjZS5wcm9jZXNzSGFuZGxlcnN9XG4gICAqL1xuICBwdWJsaWMgcHJvY2Vzc0hhbmRsZXJzKFxuICAgIGlzTXV0ZWQ6IGJvb2xlYW4sXG4gICAgZXh0cmE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9IG51bGwsXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNNdXRlZCkge1xuICAgICAgT2JqZWN0LnZhbHVlcyh0aGlzLl9oYW5kbGVyTWFwKVxuICAgICAgICAuZm9yRWFjaCgoaGFuZGxlcikgPT4gaGFuZGxlcih0aGlzLCBleHRyYSkpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEcmF3YWJsZUludGVyZmFjZSB9IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgaXRlbSBpcyBpbnN0YW5jZSBvZiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VcbiAqIEBzZWUgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlXG4gKiBAcGFyYW0gaXRlbSAtIGl0ZW0gdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUG9zaXRpb25hbChpdGVtOiBEcmF3YWJsZUludGVyZmFjZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gJ2lzUG9zaXRpb25hbCcgaW4gaXRlbTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgaXRlbSBpcyBpbnN0YW5jZSBvZiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VcbiAqIEBzZWUgRHJhd2FibGVMYXllckludGVyZmFjZVxuICogQHBhcmFtIGl0ZW0gLSBpdGVtIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xheWVyKGl0ZW06IERyYXdhYmxlSW50ZXJmYWNlKTogYm9vbGVhbiB7XG4gIHJldHVybiAnaXNMYXllcicgaW4gaXRlbTtcbn1cbiIsImltcG9ydCB7IFZlY3RvckFycmF5VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IEJvdW5kSW50ZXJmYWNlLCBSZWN0YW5ndWxhckJvdW5kQ29uZmlnIH0gZnJvbSAnLi4vLi4vdHlwZXMvYm91bmQnO1xuaW1wb3J0IHsgY3JlYXRlUG9seWdvblZlY3RvcnMgfSBmcm9tICcuLi92ZWN0b3InO1xuXG4vKipcbiAqIFJlY3Rhbmd1bGFyQm91bmQgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ3VsYXJCb3VuZCBpbXBsZW1lbnRzIEJvdW5kSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIEJvdW5kIGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IFJlY3Rhbmd1bGFyQm91bmRDb25maWc7XG5cbiAgLyoqXG4gICAqIFJlY3Rhbmd1bGFyQm91bmQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZyAtIGJvdW5kIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnOiBSZWN0YW5ndWxhckJvdW5kQ29uZmlnKSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS5pbmNsdWRlc31cbiAgICovXG4gIGluY2x1ZGVzKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvb3Jkc1swXSA+PSB0aGlzLl9jb25maWcucG9zaXRpb25bMF1cbiAgICAgICYmIGNvb3Jkc1swXSA8PSB0aGlzLl9jb25maWcucG9zaXRpb25bMF0gKyB0aGlzLl9jb25maWcuc2l6ZVswXVxuICAgICAgJiYgY29vcmRzWzFdID49IHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXVxuICAgICAgJiYgY29vcmRzWzFdIDw9IHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXSArIHRoaXMuX2NvbmZpZy5zaXplWzFdO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBCb3VuZEludGVyZmFjZS5pc05lYXJFZGdlfVxuICAgKi9cbiAgaXNOZWFyRWRnZShjb29yZHM6IFZlY3RvckFycmF5VHlwZSwgZGV2aWF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCB2ZWN0b3JzID0gY3JlYXRlUG9seWdvblZlY3RvcnMoW1xuICAgICAgW3RoaXMuX2NvbmZpZy5wb3NpdGlvblswXSwgdGhpcy5fY29uZmlnLnBvc2l0aW9uWzFdXSxcbiAgICAgIFt0aGlzLl9jb25maWcucG9zaXRpb25bMF0gKyB0aGlzLl9jb25maWcuc2l6ZVswXSwgdGhpcy5fY29uZmlnLnBvc2l0aW9uWzFdXSxcbiAgICAgIFt0aGlzLl9jb25maWcucG9zaXRpb25bMF0gKyB0aGlzLl9jb25maWcuc2l6ZVswXSwgdGhpcy5fY29uZmlnLnBvc2l0aW9uWzFdICsgdGhpcy5fY29uZmlnLnNpemVbMV1dLFxuICAgICAgW3RoaXMuX2NvbmZpZy5wb3NpdGlvblswXSwgdGhpcy5fY29uZmlnLnBvc2l0aW9uWzFdICsgdGhpcy5fY29uZmlnLnNpemVbMV1dLFxuICAgIF0pO1xuXG4gICAgZm9yIChjb25zdCB2ZWN0b3Igb2YgdmVjdG9ycykge1xuICAgICAgaWYgKHZlY3Rvci5nZXREaXN0YW5jZVZlY3Rvcihjb29yZHMpLmxlbmd0aCA8PSBkZXZpYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRHJhd2FibGVHcm91cEludGVyZmFjZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgRHJhd2FibGUgZnJvbSAnLi4vZHJhd2FibGUvZHJhd2FibGUnO1xuaW1wb3J0IERyYXdhYmxlU3RvcmFnZSBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZS1zdG9yYWdlJztcblxuLyoqXG4gKiBEcmF3YWJsZSBncm91cCBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3YWJsZUdyb3VwIGV4dGVuZHMgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUdyb3VwSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgY2xhc3MgdG8gdXNlIGFzIHN1YnNjcmliZXIgbmFtZSBpbiBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZXJOYW1lOiBzdHJpbmcgPSAnRHJhd2FibGVHcm91cCc7XG4gIC8qKlxuICAgKiBTdG9yYWdlIG9mIHRoZSBjaGlsZHJlbiBvYmplY3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N0b3JhZ2U6IERyYXdhYmxlU3RvcmFnZUludGVyZmFjZTtcblxuICAvKipcbiAgICogRHJhd2FibGVHcm91cCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBncm91cCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gZXh0cmEgZGF0YVxuICAgKiBAcGFyYW0gY2hpbGRyZW4gLSBjaGlsZHJlbiBvZiBncm91cGVkIG9iamVjdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGlkOiBEcmF3YWJsZUlkVHlwZSxcbiAgICBjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICAgIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30sXG4gICAgY2hpbGRyZW46IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXSxcbiAgKSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG5cbiAgICB0aGlzLl9zdG9yYWdlID0gbmV3IERyYXdhYmxlU3RvcmFnZSh0aGlzLl9wcm9jZXNzQ2hpbGRyZW5Ub0dyb3VwKGNoaWxkcmVuKSk7XG4gICAgdGhpcy5fc3RvcmFnZS5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICh0YXJnZXQsIGV4dHJhKSA9PiB7XG4gICAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKGV4dHJhKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmFnZS5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmNvbmZpZy52aXNpYmxlKSB7XG4gICAgICAgIGl0ZW0uZHJhdyhkcmF3ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kZXN0cnVjdH1cbiAgICovXG4gIHB1YmxpYyBkZXN0cnVjdCgpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICB0aGlzLl9zdG9yYWdlLmxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5vZmZWaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLl9wcm9jZXNzQ2hpbGRyZW5Ub1VuZ3JvdXAodGhpcy5jaGlsZHJlbik7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JhZ2UubGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb21lIGFjdGlvbnMgd2l0aCBjaGlsZHJlbiBiZWZvcmUgZ3JvdXBpbmdcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc0NoaWxkcmVuVG9Hcm91cChjaGlsZHJlbjogRHJhd2FibGVJbnRlcmZhY2VbXSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTb21lIGFjdGlvbnMgd2l0aCBjaGlsZHJlbiBiZWZvcmUgdW5ncm91cGluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9wcm9jZXNzQ2hpbGRyZW5Ub1VuZ3JvdXAoY2hpbGRyZW46IERyYXdhYmxlSW50ZXJmYWNlW10pOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVMYXllckNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVMYXllckludGVyZmFjZSxcbiAgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IERyYXdhYmxlR3JvdXAgZnJvbSAnLi9kcmF3YWJsZS1ncm91cCc7XG5pbXBvcnQgRHJhd2FibGVTdG9yYWdlIGZyb20gJy4vZHJhd2FibGUtc3RvcmFnZSc7XG5cbi8qKlxuICogRHJhd2FibGVMYXllciBjbGFzc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3YWJsZUxheWVyIGV4dGVuZHMgRHJhd2FibGVHcm91cCBpbXBsZW1lbnRzIERyYXdhYmxlTGF5ZXJJbnRlcmZhY2Uge1xuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlTGF5ZXJJbnRlcmZhY2UuaXNMYXllcn1cbiAgICovXG4gIHB1YmxpYyBpc0xheWVyOiB0cnVlID0gdHJ1ZTtcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogRHJhd2FibGVMYXllckNvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogRHJhd2FibGVMYXllciBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBncm91cCBJRFxuICAgKiBAcGFyYW0gY29uZmlnIC0gY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gZXh0cmEgZGF0YVxuICAgKiBAcGFyYW0gY2hpbGRyZW4gLSBjaGlsZHJlbiBvZiBncm91cGVkIG9iamVjdHNcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIGlkOiBEcmF3YWJsZUlkVHlwZSxcbiAgICBjb25maWc6IERyYXdhYmxlTGF5ZXJDb25maWdJbnRlcmZhY2UsXG4gICAgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSxcbiAgICBjaGlsZHJlbjogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdLFxuICApIHtcbiAgICBzdXBlcihpZCwgY29uZmlnLCBkYXRhKTtcblxuICAgIHRoaXMuX3N0b3JhZ2UgPSBuZXcgRHJhd2FibGVTdG9yYWdlKHRoaXMuX3Byb2Nlc3NDaGlsZHJlblRvR3JvdXAoY2hpbGRyZW4pKTtcbiAgICB0aGlzLl9zdG9yYWdlLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoZXh0cmEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IERyYXdhYmxlTGF5ZXJDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlTGF5ZXJJbnRlcmZhY2Uuc3RvcmFnZX1cbiAgICovXG4gIHB1YmxpYyBnZXQgc3RvcmFnZSgpOiBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9zdG9yYWdlO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVTdG9yYWdlRmlsdGVyQ2FsbGJhY2tUeXBlLFxuICBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDb25maWdJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG4gIFBvc2l0aW9uYWxDb250ZXh0SW50ZXJmYWNlLCBEcmF3YWJsZUxheWVySW50ZXJmYWNlLFxufSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tICcuLi8uLi9oZWxwZXJzL29ic2VydmUtaGVscGVyJztcbmltcG9ydCBEcmF3YWJsZUdyb3VwIGZyb20gJy4uL2RyYXdhYmxlL2RyYXdhYmxlLWdyb3VwJztcbmltcG9ydCB7IGdldE1heFBvc2l0aW9uLCBnZXRNaW5Qb3NpdGlvbiB9IGZyb20gJy4uLy4uL2hlbHBlcnMvYmFzZSc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuLi92ZWN0b3InO1xuaW1wb3J0IFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwIGZyb20gJy4uL2RyYXdhYmxlL3Bvc2l0aW9uYWwtZHJhd2FibGUtZ3JvdXAnO1xuaW1wb3J0IHsgaXNMYXllciwgaXNQb3NpdGlvbmFsIH0gZnJvbSAnLi4vLi4vaGVscGVycy90eXBlLWhlbHBlcnMnO1xuaW1wb3J0IFBvc2l0aW9uYWxDb250ZXh0IGZyb20gJy4vcG9zaXRpb25hbC1jb250ZXh0JztcbmltcG9ydCBEcmF3YWJsZUxheWVyIGZyb20gJy4vZHJhd2FibGUtbGF5ZXInO1xuXG4vKipcbiAqIFN0b3JhZ2UgZm9yIGRyYXdhYmxlIG9iamVjdHNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2FibGVTdG9yYWdlIGltcGxlbWVudHMgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgY2xhc3MgdG8gdXNlIGFzIHN1YnNjcmliZXIgbmFtZSBpbiBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX3N1YnNjcmliZXJOYW1lOiBzdHJpbmcgPSAnRHJhd2FibGVTdG9yYWdlJztcbiAgLyoqXG4gICAqIExpc3Qgb2Ygc3RvcmVkIGRyYXdhYmxlIG9iamVjdHNcbiAgICovXG4gIHByb3RlY3RlZCBfbGlzdDogRHJhd2FibGVJbnRlcmZhY2VbXSA9IFtdO1xuICAvKipcbiAgICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX29ic2VydmVIZWxwZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpdGVtcyAtIGJhdGNoIGNoaWxkcmVuIHRvIGNhY2hlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpdGVtczogRHJhd2FibGVJbnRlcmZhY2VbXSkge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuYWRkQmF0Y2goaXRlbXMpO1xuICAgIHRoaXMuX3NvcnQoKTtcblxuICAgIHRoaXMub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAodGFyZ2V0LCBleHRyYSkgPT4ge1xuICAgICAgaWYgKGV4dHJhICE9PSBudWxsICYmIGV4dHJhLmhhc093blByb3BlcnR5KCd6SW5kZXhDaGFuZ2VkJykgJiYgZXh0cmEuekluZGV4Q2hhbmdlZCkge1xuICAgICAgICB0aGlzLl9zb3J0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVkIGRyYXdhYmxlIG9iamVjdHMgY2hpbGRyZW4gZ2V0dGVyXG4gICAqL1xuICBnZXQgbGlzdCgpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmNhY2hlfVxuICAgKi9cbiAgcHVibGljIGFkZChpdGVtOiBEcmF3YWJsZUludGVyZmFjZSk6IHZvaWQge1xuICAgIGl0ZW0ub25WaWV3Q2hhbmdlKFxuICAgICAgdGhpcy5fc3Vic2NyaWJlck5hbWUsXG4gICAgICAodGFyZ2V0LCBleHRyYSkgPT4gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyhleHRyYSksXG4gICAgKTtcbiAgICB0aGlzLl9saXN0LnB1c2goaXRlbSk7XG4gICAgdGhpcy5fc29ydCgpO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmNhY2hlfVxuICAgKi9cbiAgcHVibGljIGFkZEJhdGNoKGl0ZW1zOiBEcmF3YWJsZUludGVyZmFjZVtdKTogdm9pZCB7XG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5vblZpZXdDaGFuZ2UoXG4gICAgICAgIHRoaXMuX3N1YnNjcmliZXJOYW1lLFxuICAgICAgICAodGFyZ2V0LCBleHRyYSkgPT4gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyhleHRyYSksXG4gICAgICApO1xuICAgICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICAgIHRoaXMuX3NvcnQoKTtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBvYmplY3RzIGZvdW5kIGJ5IGNvbmZpZyBmcm9tIHN0b3JhZ2VcbiAgICogQHBhcmFtIGNvbmZpZyAtIGZpbHRlciBjb25maWdcbiAgICovXG4gIHB1YmxpYyBkZWxldGUoY29uZmlnOiBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDb25maWdJbnRlcmZhY2UpOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjb25zdCByZXN1bHQ6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygoKSA9PiB7XG4gICAgICB0aGlzLmZpbmQoY29uZmlnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZGVsZXRlQnlJZChpdGVtLmlkKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgb2JqZWN0IGJ5IElEIGZyb20gc3RvcmFnZVxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICovXG4gIHB1YmxpYyBkZWxldGVCeUlkKGlkOiBEcmF3YWJsZUlkVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBpZCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBkZWxldGVkSXRlbSA9IHRoaXMuX2xpc3Quc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgIGRlbGV0ZWRJdGVtLm9mZlZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUpO1xuICAgICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICAgICAgcmV0dXJuIGRlbGV0ZWRJdGVtO1xuICAgIH1cblxuICAgIC8vIFRPRE8gY3VzdG9taXplIGV4Y2VwdGlvblxuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGZpbmQgb2JqZWN0IHdpdGggaWQgJyR7aWR9J2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuY2xlYXJ9XG4gICAqL1xuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9saXN0Lmxlbmd0aCA9IDA7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZmluZH1cbiAgICovXG4gIHB1YmxpYyBmaW5kKGNvbmZpZzogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmQoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChjb25maWcuaWRzT25seSAmJiBjb25maWcuaWRzT25seS5pbmRleE9mKGl0ZW0uaWQpID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmlkc0V4Y2x1ZGUgJiYgY29uZmlnLmlkc0V4Y2x1ZGUuaW5kZXhPZihpdGVtLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnR5cGVzT25seSAmJiBjb25maWcudHlwZXNPbmx5LmluZGV4T2YoaXRlbS50eXBlKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy50eXBlc0V4Y2x1ZGUgJiYgY29uZmlnLnR5cGVzRXhjbHVkZS5pbmRleE9mKGl0ZW0udHlwZSkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICEoY29uZmlnLmV4dHJhRmlsdGVyICYmICFjb25maWcuZXh0cmFGaWx0ZXIoaXRlbSkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZmluZEJ5SWR9XG4gICAqL1xuICBwdWJsaWMgZmluZEJ5SWQoaWQ6IERyYXdhYmxlSWRUeXBlKTogRHJhd2FibGVJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGZvdW5kSXRlbXMgPSB0aGlzLl9maW5kKChjYW5kaWRhdGUpID0+IGNhbmRpZGF0ZS5pZCA9PT0gaWQpO1xuICAgIGlmIChmb3VuZEl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZvdW5kSXRlbXNbMF07XG4gICAgfVxuICAgIC8vIFRPRE8gY3VzdG9taXplIGV4Y2VwdGlvblxuICAgIHRocm93IG5ldyBFcnJvcihgY2Fubm90IGZpbmQgb2JqZWN0IHdpdGggaWQgJyR7aWR9J2ApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZmluZEJ5UG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgZmluZEJ5UG9zaXRpb24oY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBQb3NpdGlvbmFsQ29udGV4dEludGVyZmFjZSB7XG4gICAgZm9yIChsZXQgaT10aGlzLl9saXN0Lmxlbmd0aC0xOyBpPj0wOyAtLWkpIHtcbiAgICAgIGNvbnN0IGl0ZW06IERyYXdhYmxlSW50ZXJmYWNlID0gdGhpcy5fbGlzdFtpXTtcblxuICAgICAgLy8gVE9ETyBtYXliZSBvbmx5IHZpc2libGU/XG4gICAgICBpZiAoaXNMYXllcihpdGVtKSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gKGl0ZW0gYXMgRHJhd2FibGVMYXllcikuc3RvcmFnZS5maW5kQnlQb3NpdGlvbihjb29yZHMpO1xuICAgICAgICBpZiAoIWNvbnRleHQuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNQb3NpdGlvbmFsKGl0ZW0pICYmIChpdGVtIGFzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSkuYm91bmRJbmNsdWRlcyhjb29yZHMpKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAoaXRlbSBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGVsZW1lbnQuZ2V0UmVsYXRpdmVQb3NpdGlvbihjb29yZHMpO1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxDb250ZXh0KGVsZW1lbnQsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxDb250ZXh0KG51bGwsIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZmluZEJ5TmVhckVkZ2VQb3NpdGlvbn1cbiAgICovXG4gIGZpbmRCeU5lYXJFZGdlUG9zaXRpb24oY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogUG9zaXRpb25hbENvbnRleHRJbnRlcmZhY2Uge1xuICAgIGNvbnN0IHBvc2l0aW9uQ29udGV4dCA9IHRoaXMuZmluZEJ5UG9zaXRpb24oY29vcmRzKTtcblxuICAgIGZvciAobGV0IGk9dGhpcy5fbGlzdC5sZW5ndGgtMTsgaT49MDsgLS1pKSB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5fbGlzdFtpXTtcblxuICAgICAgLy8gVE9ETyBtYXliZSBvbmx5IHZpc2libGU/XG4gICAgICBpZiAoaXNMYXllcihpdGVtKSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gKGl0ZW0gYXMgRHJhd2FibGVMYXllcikuc3RvcmFnZS5maW5kQnlOZWFyRWRnZVBvc2l0aW9uKGNvb3JkcywgZGV2aWF0aW9uKTtcbiAgICAgICAgaWYgKCFjb250ZXh0LmlzRW1wdHkoKSkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBpc1Bvc2l0aW9uYWwoaXRlbSlcbiAgICAgICAgJiYgKGl0ZW0gYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlKS5pc05lYXJCb3VuZEVkZ2UoY29vcmRzLCBkZXZpYXRpb24pXG4gICAgICAgICYmIChwb3NpdGlvbkNvbnRleHQuaXNFbXB0eSgpIHx8IHBvc2l0aW9uQ29udGV4dC5lbGVtZW50ID09PSBpdGVtKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAoaXRlbSBhcyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IGVsZW1lbnQuZ2V0UmVsYXRpdmVQb3NpdGlvbihjb29yZHMpO1xuICAgICAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxDb250ZXh0KGVsZW1lbnQsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uYWxDb250ZXh0KG51bGwsIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UuZ3JvdXB9XG4gICAqL1xuICBwdWJsaWMgZ3JvdXAoaWRzOiBEcmF3YWJsZUlkVHlwZVtdKTogRHJhd2FibGVHcm91cCB7XG4gICAgY29uc3QgZ3JvdXBJdGVtcyA9IHRoaXMuZGVsZXRlKHsgaWRzT25seTogaWRzIH0pIGFzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdO1xuICAgIGNvbnN0IG1pblBvc2l0aW9uID0gZ2V0TWluUG9zaXRpb24oZ3JvdXBJdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uY29uZmlnLnBvc2l0aW9uKSk7XG4gICAgY29uc3QgbWF4UG9zaXRpb24gPSBnZXRNYXhQb3NpdGlvbihncm91cEl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGNyZWF0ZVZlY3RvcihpdGVtLmNvbmZpZy5wb3NpdGlvbilcbiAgICAgICAgLmFkZChjcmVhdGVWZWN0b3IoaXRlbS5jb25maWcuc2l6ZSkpXG4gICAgICAgIC50b0FycmF5KCk7XG4gICAgfSkpO1xuICAgIGNvbnN0IGdyb3VwU2l6ZSA9IGNyZWF0ZVZlY3RvcihtYXhQb3NpdGlvbikuc3ViKGNyZWF0ZVZlY3RvcihtaW5Qb3NpdGlvbikpLnRvQXJyYXkoKTtcbiAgICBjb25zdCBncm91cFpJbmRleCA9IE1hdGgubWF4KC4uLmdyb3VwSXRlbXMubWFwKChpdGVtKSA9PiBpdGVtLmNvbmZpZy56SW5kZXgpKSsxO1xuXG4gICAgY29uc3QgY29uZmlnOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UgPSB7XG4gICAgICBwb3NpdGlvbjogbWluUG9zaXRpb24sXG4gICAgICBzaXplOiBncm91cFNpemUsXG4gICAgICB6SW5kZXg6IGdyb3VwWkluZGV4LFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICB9O1xuXG4gICAgY29uc3QgZ3JvdXBJZCA9ICdncm91cC0nKyhuZXcgRGF0ZSgpKS5nZXRUaW1lKCkrJy0nK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAwMDApO1xuICAgIGNvbnN0IGdyb3VwID0gbmV3IFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwKGdyb3VwSWQsIGNvbmZpZywge30sIGdyb3VwSXRlbXMpO1xuICAgIHRoaXMuYWRkKGdyb3VwKTtcblxuICAgIHJldHVybiBncm91cDtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLnVuZ3JvdXB9XG4gICAqL1xuICBwdWJsaWMgdW5ncm91cChncm91cElkOiBEcmF3YWJsZUlkVHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGdyb3VwOiBEcmF3YWJsZUdyb3VwID0gdGhpcy5kZWxldGVCeUlkKGdyb3VwSWQpIGFzIERyYXdhYmxlR3JvdXA7XG4gICAgdGhpcy5hZGRCYXRjaChncm91cC5kZXN0cnVjdCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmFkZExheWVyfVxuICAgKi9cbiAgcHVibGljIGFkZExheWVyKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY2hpbGRyZW46IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXSk6IERyYXdhYmxlTGF5ZXJJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGxheWVyID0gbmV3IERyYXdhYmxlTGF5ZXIoaWQsIHtcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICB6SW5kZXg6IHRoaXMuX2dldE1heFpJbmRleCgpKzEsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgIH0sIHt9LCBjaGlsZHJlbik7XG5cbiAgICB0aGlzLmFkZChsYXllcik7XG5cbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5nZXRMYXllcn1cbiAgICovXG4gIHB1YmxpYyBnZXRMYXllcihpZDogc3RyaW5nKTogRHJhd2FibGVMYXllckludGVyZmFjZSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHRoaXMuZmluZEJ5SWQoaWQpO1xuXG4gICAgICBpZiAoIWlzTGF5ZXIoY2FuZGlkYXRlKSkge1xuICAgICAgICAvLyBUT0RPIGN1c3RvbWl6ZSBleGNlcHRpb25cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAodGhpcy5maW5kQnlJZChpZCkgYXMgRHJhd2FibGVMYXllckludGVyZmFjZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgZmluZCBsYXllciB3aXRoIGlkICcke2lkfSdgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5nZXRMYXllcnN9XG4gICAqL1xuICBwdWJsaWMgZ2V0TGF5ZXJzKCk6IERyYXdhYmxlTGF5ZXJJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuICh0aGlzLl9maW5kKChpdGVtKSA9PiBpc0xheWVyKGl0ZW0pKSBhcyBEcmF3YWJsZUxheWVySW50ZXJmYWNlW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5vZmZWaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZlZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBtYXggekluZGV4IG9mIHRoZSBmaXJzdCBkZXB0aCBsZXZlbCBpdGVtc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRNYXhaSW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5fbGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX2xpc3QubGVuZ3RoIC0gMV0uY29uZmlnLnpJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIG9iamVjdHMgaW4gc3RvcmFnZSBieSBmaWx0ZXIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIGZpbHRlciAtIGZpbHRlciBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIF9maW5kKGZpbHRlcjogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ2FsbGJhY2tUeXBlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG5cbiAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChmaWx0ZXIoaXRlbSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBzdG9yZWQgb2JqZWN0cyBieSB6LWluZGV4XG4gICAqL1xuICBwcm90ZWN0ZWQgX3NvcnQoKTogdm9pZCB7XG4gICAgLy8gVE9ETyDRgdC70LXQtNC40YLRjFxuICAgIC8vIGNvbnNvbGUubG9nKCdzb3J0Jyk7XG4gICAgdGhpcy5fbGlzdC5zb3J0KChsaHMsIHJocykgPT4gbGhzLmNvbmZpZy56SW5kZXggLSByaHMuY29uZmlnLnpJbmRleCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG4gIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsXG4gIFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCBPYnNlcnZlSGVscGVyIGZyb20gJy4uLy4uL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXInO1xuaW1wb3J0IHsgYXJlQXJyYXlzRXF1YWwgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2Jhc2UnO1xuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBkcmF3YWJsZSBvYmplY3RzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IElEXG4gICAqL1xuICBwcm90ZWN0ZWQgX2lkOiBEcmF3YWJsZUlkVHlwZTtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBFeHRyYSBsaW5rZWQgZGF0YVxuICAgKi9cbiAgcHJvdGVjdGVkIF9kYXRhOiBMaW5rZWREYXRhVHlwZTtcbiAgLyoqXG4gICAqIE9ic2VydmUgaGVscGVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX29ic2VydmVIZWxwZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGRyYXcoZHJhd2VyOiBEcmF3ZXJJbnRlcmZhY2UpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBJRCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgaWQoKTogRHJhd2FibGVJZFR5cGUge1xuICAgIHJldHVybiB0aGlzLl9pZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUeXBlIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBzZXR0ZXJcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqL1xuICBwdWJsaWMgc2V0IGNvbmZpZyhjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlKSB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKE9iamVjdC5lbnRyaWVzKGNvbmZpZyksIE9iamVjdC5lbnRyaWVzKHRoaXMuX2NvbmZpZykpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKCgobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIGNvbnN0IGlzWkluZGV4Q2hhbmdlZCA9IGNvbmZpZy56SW5kZXggIT09IHRoaXMuX2NvbmZpZy56SW5kZXg7XG5cbiAgICAgIE9iamVjdC5lbnRyaWVzKGNvbmZpZykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICh0aGlzLl9jb25maWdba2V5IGFzIGtleW9mIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlXSBhcyB1bmtub3duKSA9IHZhbHVlIGFzIHVua25vd247XG4gICAgICB9KTtcblxuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSwge1xuICAgICAgICB6SW5kZXhDaGFuZ2VkOiBpc1pJbmRleENoYW5nZWQsXG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogTGlua2VkIGRhdGEgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGRhdGEoKTogTGlua2VkRGF0YVR5cGUge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5vblZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25WaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9uQ2hhbmdlKHN1YnNjcmliZXJOYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uub2ZmVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvZmZWaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9mZkNoYW5nZShzdWJzY3JpYmVyTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogRHJhd2FibGUgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoaWQ6IERyYXdhYmxlSWRUeXBlLCBjb25maWc6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyID0gbmV3IE9ic2VydmVIZWxwZXIoKTtcbiAgICB0aGlzLl9jb25maWcgPSBuZXcgUHJveHkoY29uZmlnLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlXSAhPT0gdmFsdWU7XG4gICAgICAgICh0YXJnZXRbaW5kZXggYXMga2V5b2YgRHJhd2FibGVDb25maWdJbnRlcmZhY2VdIGFzIHVua25vd24pID0gdmFsdWUgYXMgdW5rbm93bjtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoe1xuICAgICAgICAgIHpJbmRleENoYW5nZWQ6IGluZGV4ID09PSAnekluZGV4JyxcbiAgICAgICAgfSkgOiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLl9kYXRhID0gbmV3IFByb3h5KGRhdGEsIHtcbiAgICAgIHNldDogKHRhcmdldDogTGlua2VkRGF0YVR5cGUsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgTGlua2VkRGF0YVR5cGVdICE9PSB2YWx1ZTtcbiAgICAgICAgdGFyZ2V0W2luZGV4IGFzIGtleW9mIExpbmtlZERhdGFUeXBlXSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpIDogdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBvc2l0aW9uYWxDb250ZXh0SW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFZlY3RvckFycmF5VHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG4vKipcbiAqIFBvc2l0aW9uYWxDb250ZXh0IGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uYWxDb250ZXh0IGltcGxlbWVudHMgUG9zaXRpb25hbENvbnRleHRJbnRlcmZhY2Uge1xuICAvKipcbiAgICogRWxlbWVudCBpbiBjb250ZXh0XG4gICAqL1xuICBwdWJsaWMgZWxlbWVudDogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHwgbnVsbCA9IG51bGw7XG4gIC8qKlxuICAgKiBSZWxhdGl2ZSBldmVudCBwb3NpdGlvbidzIGNvb3Jkc1xuICAgKi9cbiAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3JBcnJheVR5cGUgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogUG9zaXRpb25hbENvbnRleHQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnQgLSBlbGVtZW50IGluIGNvbnRleHRcbiAgICogQHBhcmFtIHBvc2l0aW9uIC0gcmVsYXRpdmUgY29udGV4dCBwb3NpdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudDogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHwgbnVsbCwgcG9zaXRpb246IFZlY3RvckFycmF5VHlwZSB8IG51bGwpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgY29udGV4dCBpcyBlbXB0eVxuICAgKi9cbiAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudCA9PT0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwSW50ZXJmYWNlLFxufSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgRHJhd2FibGVHcm91cCBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZS1ncm91cCc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuLi92ZWN0b3InO1xuaW1wb3J0IHsgQm91bmRJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi90eXBlcy9ib3VuZCc7XG5pbXBvcnQgUmVjdGFuZ3VsYXJCb3VuZCBmcm9tICcuLi9ib3VuZHMvcmVjdGFuZ3VsYXItYm91bmQnO1xuaW1wb3J0IHsgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZCB9IGZyb20gJy4uL3ZlY3Rvci9oZWxwZXJzJztcbmltcG9ydCB7IGlzUG9zaXRpb25hbCB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdHlwZS1oZWxwZXJzJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGUgZnJvbSAnLi9wb3NpdGlvbmFsLWRyYXdhYmxlJztcblxuLyoqXG4gKiBQb3NpdGlvbmFsIGRyYXdhYmxlIGdyb3VwIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwIGV4dGVuZHMgRHJhd2FibGVHcm91cCBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIEludGVyZmFjZSBiZWxvbmdpbmcgZmxhZ1xuICAgKi9cbiAgcHVibGljIGlzUG9zaXRpb25hbDogdHJ1ZSA9IHRydWU7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ1Bvc2l0aW9uYWxEcmF3YWJsZUdyb3VwJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBEcmF3YWJsZUdyb3VwIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIGdyb3VwIElEXG4gICAqIEBwYXJhbSBjb25maWcgLSBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBleHRyYSBkYXRhXG4gICAqIEBwYXJhbSBjaGlsZHJlbiAtIGNoaWxkcmVuIG9mIGdyb3VwZWQgb2JqZWN0c1xuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IERyYXdhYmxlSWRUeXBlLFxuICAgIGNvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICAgIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30sXG4gICAgY2hpbGRyZW46IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdID0gW10sXG4gICkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEsIGNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuc2F2ZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LnRyYW5zbGF0ZSguLi50aGlzLmNvbmZpZy5wb3NpdGlvbik7XG4gICAgc3VwZXIuZHJhdyhkcmF3ZXIpO1xuICAgIGRyYXdlci5jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uuc2V0UG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgc2V0UG9zaXRpb24oY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWcucG9zaXRpb24gPSBjb29yZHM7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm1vdmVQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBtb3ZlUG9zaXRpb24ob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKFxuICAgICAgY3JlYXRlVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbilcbiAgICAgICAgLmFkZChjcmVhdGVWZWN0b3Iob2Zmc2V0KSlcbiAgICAgICAgLnRvQXJyYXkoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5nZXRSZWxhdGl2ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIGdldFJlbGF0aXZlUG9zaXRpb24ocG9pbnQ6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVZlY3Rvcihwb2ludClcbiAgICAgIC5zdWIoY3JlYXRlVmVjdG9yKHRoaXMuY29uZmlnLnBvc2l0aW9uKSlcbiAgICAgIC50b0FycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmJvdW5kSW5jbHVkZXN9XG4gICAqL1xuICBwdWJsaWMgYm91bmRJbmNsdWRlcyhjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgaWYgKFxuICAgICAgICBpc1Bvc2l0aW9uYWwoY2hpbGQpXG4gICAgICAgICYmIChjaGlsZCBhcyBQb3NpdGlvbmFsRHJhd2FibGUpLmJvdW5kSW5jbHVkZXModHJhbnNwb3NlQ29vcmRzRm9yd2FyZChjb29yZHMsIHRoaXMuX2NvbmZpZy5wb3NpdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5pc05lYXJCb3VuZEVkZ2V9XG4gICAqL1xuICBpc05lYXJCb3VuZEVkZ2UoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYm91bmQuaXNOZWFyRWRnZShcbiAgICAgIHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQoY29vcmRzLCB0aGlzLl9jb25maWcucG9zaXRpb24pLFxuICAgICAgZGV2aWF0aW9uLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLmxpc3QgYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW107XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogYm91bmQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJvdW5kKCk6IEJvdW5kSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gbmV3IFJlY3Rhbmd1bGFyQm91bmQoe1xuICAgICAgcG9zaXRpb246IFswLCAwXSxcbiAgICAgIHNpemU6IHRoaXMuX2NvbmZpZy5zaXplLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgYWN0aW9ucyB3aXRoIGNoaWxkcmVuIGJlZm9yZSBncm91cGluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9wcm9jZXNzQ2hpbGRyZW5Ub0dyb3VwKGNoaWxkcmVuOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSk6IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm1vdmVQb3NpdGlvbihcbiAgICAgICAgY3JlYXRlVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbikuaW52ZXJzZSgpLnRvQXJyYXkoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgYWN0aW9ucyB3aXRoIGNoaWxkcmVuIGJlZm9yZSB1bmdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NDaGlsZHJlblRvVW5ncm91cChjaGlsZHJlbjogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10pOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5tb3ZlUG9zaXRpb24odGhpcy5fY29uZmlnLnBvc2l0aW9uKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIFZlY3RvckFycmF5VHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yJztcbmltcG9ydCBEcmF3YWJsZSBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZSc7XG5pbXBvcnQgeyBCb3VuZEludGVyZmFjZSB9IGZyb20gJy4uLy4uL3R5cGVzL2JvdW5kJztcbmltcG9ydCBSZWN0YW5ndWxhckJvdW5kIGZyb20gJy4uL2JvdW5kcy9yZWN0YW5ndWxhci1ib3VuZCc7XG5pbXBvcnQgeyB0cmFuc3Bvc2VDb29yZHNGb3J3YXJkIH0gZnJvbSAnLi4vdmVjdG9yL2hlbHBlcnMnO1xuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBkcmF3YWJsZSBwb3NpdGlvbmFsIG9iamVjdHNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgUG9zaXRpb25hbERyYXdhYmxlIGV4dGVuZHMgRHJhd2FibGUgaW1wbGVtZW50cyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogSW50ZXJmYWNlIGJlbG9uZ2luZyBmbGFnXG4gICAqL1xuICBwdWJsaWMgaXNQb3NpdGlvbmFsOiB0cnVlID0gdHJ1ZTtcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uuc2V0UG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgc2V0UG9zaXRpb24oY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWcucG9zaXRpb24gPSBjb29yZHM7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm1vdmVQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBtb3ZlUG9zaXRpb24ob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKFxuICAgICAgY3JlYXRlVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbilcbiAgICAgICAgLmFkZChjcmVhdGVWZWN0b3Iob2Zmc2V0KSlcbiAgICAgICAgLnRvQXJyYXkoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5nZXRSZWxhdGl2ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIGdldFJlbGF0aXZlUG9zaXRpb24ocG9pbnQ6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVZlY3Rvcihwb2ludClcbiAgICAgIC5zdWIoY3JlYXRlVmVjdG9yKHRoaXMuY29uZmlnLnBvc2l0aW9uKSlcbiAgICAgIC50b0FycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmJvdW5kSW5jbHVkZXN9XG4gICAqL1xuICBwdWJsaWMgYm91bmRJbmNsdWRlcyhjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmJvdW5kLmluY2x1ZGVzKFxuICAgICAgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZChjb29yZHMsIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuaXNOZWFyQm91bmRFZGdlfVxuICAgKi9cbiAgcHVibGljIGlzTmVhckJvdW5kRWRnZShjb29yZHM6IFZlY3RvckFycmF5VHlwZSwgZGV2aWF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ib3VuZC5pc05lYXJFZGdlKFxuICAgICAgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZChjb29yZHMsIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiksXG4gICAgICBkZXZpYXRpb24sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBib3VuZCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgYm91bmQoKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ3VsYXJCb3VuZCh7XG4gICAgICBwb3NpdGlvbjogWzAsIDBdLFxuICAgICAgc2l6ZTogdGhpcy5fY29uZmlnLnNpemUsXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvb3Jkc0ZpbHRlckNvbmZpZ0ludGVyZmFjZSwgQ29vcmRzRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuLi92ZWN0b3IvdHlwZXMnO1xuXG4vKipcbiAqIEZpbHRlciBjb29yZHMgdXNpbmcgZ3JpZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkRmlsdGVyIGltcGxlbWVudHMgQ29vcmRzRmlsdGVySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBDb29yZHNGaWx0ZXJJbnRlcmZhY2UucHJvY2Vzc31cbiAgICovXG4gIHB1YmxpYyBwcm9jZXNzKGRhdGE6IFZlY3RvckFycmF5VHlwZSwgY29uZmlnOiBDb29yZHNGaWx0ZXJDb25maWdJbnRlcmZhY2UpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIGNvbnN0IFt4LCB5XSA9IGRhdGE7XG4gICAgY29uc3Qgc2NhbGUgPSBjb25maWcuc2NhbGVbMF07XG5cbiAgICBsZXQgc3RlcCA9IGNvbmZpZy5ncmlkU3RlcDtcblxuICAgIGlmIChzY2FsZSA8IDEpIHtcbiAgICAgIHN0ZXAgKj0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMigxIC8gc2NhbGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RlcCAvPSAyICoqIE1hdGgucm91bmQoTWF0aC5sb2cyKHNjYWxlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFt4LXglc3RlcCwgeS15JXN0ZXBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVCbG9iLCBjcmVhdGVVcmxGcm9tQmxvYiwgaGFzaFN0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvYmFzZSc7XG5pbXBvcnQge1xuICBIYXNoS2V5VHlwZSxcbiAgSW1hZ2VDYWNoZUludGVyZmFjZSxcbiAgT25Mb2FkSGFuZGxlclR5cGUsXG4gIE9uVG90YWxMb2FkSGFuZGxlclR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBDYWNoZSBoZWxwZXIgZm9yIGltYWdlc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZUNhY2hlIGltcGxlbWVudHMgSW1hZ2VDYWNoZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBNYXAgb2YgdGhlIHByZWxvYWRlZCBpbWFnZXNcbiAgICovXG4gIHByb3RlY3RlZCBfaW1hZ2VNYXA6IFJlY29yZDxIYXNoS2V5VHlwZSwgSFRNTEltYWdlRWxlbWVudD4gPSB7fTtcbiAgLyoqXG4gICAqIE1hcCBvZiB0aGUgcnVubmluZyBwcm9jZXNzZXNcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc01hcDogUmVjb3JkPEhhc2hLZXlUeXBlLCBib29sZWFuPiA9IHt9O1xuICAvKipcbiAgICogTWFwIG9mIHRoZSBidWZmZXJlZCBoYW5kbGVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9oYW5kbGVyczogUmVjb3JkPEhhc2hLZXlUeXBlLCBBcnJheTxPbkxvYWRIYW5kbGVyVHlwZT4+ID0ge307XG4gIC8qKlxuICAgKiBNYXAgb2YgdGhlIGhhbmRsZXJzIGZvciBzdWJzY3JpYmVkIG9iamVjdHNcbiAgICovXG4gIHByb3RlY3RlZCBfdG90YWxIYW5kbGVyczogUmVjb3JkPEhhc2hLZXlUeXBlLCBPblRvdGFsTG9hZEhhbmRsZXJUeXBlPiA9IHt9O1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgSW1hZ2VDYWNoZUludGVyZmFjZS5zdWJzY3JpYmV9XG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IE9uVG90YWxMb2FkSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl90b3RhbEhhbmRsZXJzW3N1YnNjcmliZXJOYW1lXSA9IGhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEltYWdlQ2FjaGVJbnRlcmZhY2UudW5zdWJzY3JpYmV9XG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmUoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLl90b3RhbEhhbmRsZXJzW3N1YnNjcmliZXJOYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgSW1hZ2VDYWNoZUludGVyZmFjZS5jYWNoZX1cbiAgICovXG4gIHB1YmxpYyBjYWNoZShcbiAgICBzb3VyY2U6IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgY2FsbGJhY2s6IE9uTG9hZEhhbmRsZXJUeXBlIHwgbnVsbCA9IG51bGwsXG4gICk6IEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLl9nZXRLZXkoc291cmNlLCB0eXBlKTtcblxuICAgIGlmICh0aGlzLl9pbWFnZU1hcFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBjYWxsYmFjayh0aGlzLl9pbWFnZU1hcFtrZXldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9pbWFnZU1hcFtrZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wcm9jZXNzTWFwW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVyc1trZXldID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGFuZGxlcnNba2V5XS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2Nlc3NNYXBba2V5XSA9IHRydWU7XG5cbiAgICBjb25zdCBibG9iOiBCbG9iID0gY3JlYXRlQmxvYihzb3VyY2UsIHR5cGUpO1xuICAgIGNvbnN0IHVybDogc3RyaW5nID0gY3JlYXRlVXJsRnJvbUJsb2IoYmxvYik7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHVybDtcblxuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgdGhpcy5faW1hZ2VNYXBba2V5XSA9IGltZztcbiAgICAgIGRlbGV0ZSB0aGlzLl9wcm9jZXNzTWFwW2tleV07XG5cbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLl9oYW5kbGVyc1trZXldO1xuICAgICAgICB3aGlsZSAoaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgKGhhbmRsZXJzLnBvcCgpKShpbWcpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9oYW5kbGVyc1trZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuX3Byb2Nlc3NNYXApLmxlbmd0aCkge1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuX3RvdGFsSGFuZGxlcnMpLmZvckVhY2goKGhhbmRsZXIpID0+IGhhbmRsZXIoKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgaGFzaCBmb3IgaW1hZ2UgZGF0YSBhbmQgdHlwZSBhbmQgcmV0dXJucyBpdCBhcyBzdHJpbmdcbiAgICogQHBhcmFtIHNvdXJjZSAtIHNvdXJjZSBkYXRhIG9mIGltYWdlXG4gICAqIEBwYXJhbSB0eXBlIC0gbWltZSB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldEtleShzb3VyY2U6IHN0cmluZywgdHlwZTogc3RyaW5nKTogSGFzaEtleVR5cGUge1xuICAgIHJldHVybiBoYXNoU3RyaW5nKGAke3NvdXJjZX1fJHt0eXBlfWApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBudW1iZXIgaXMgaW5zaWRlIGludGVydmFsXG4gKiBAcGFyYW0gd2hhdCAtIG51bWJlclxuICogQHBhcmFtIGludGVydmFsIC0gaW50ZXJ2YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5JbnRlcnZhbCh3aGF0OiBudW1iZXIsIGludGVydmFsOiBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHdoYXQgPiBpbnRlcnZhbFswXSAmJiB3aGF0IDwgaW50ZXJ2YWxbMV07XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbnVtYmVyIGlzIGluc2lkZSBzZWdtZW50XG4gKiBAcGFyYW0gd2hhdCAtIG51bWJlclxuICogQHBhcmFtIHNlZ21lbnQgLSBzZWdtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0luU2VnbWVudCh3aGF0OiBudW1iZXIsIHNlZ21lbnQ6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gd2hhdCA+PSBzZWdtZW50WzBdICYmIHdoYXQgPD0gc2VnbWVudFsxXTtcbn1cblxuLyoqXG4gKiBSb3VuZHMgYSBudW1iZXIgd2l0aCBhIHByZWNpc2lvblxuICogQHBhcmFtIG51bSAtIG51bWJlclxuICogQHBhcmFtIHByZWNpc2lvbiAtIHByZWNpc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQobnVtOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gIGNvbnN0IG11bHQgPSAxMCoqcHJlY2lzaW9uO1xuICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBtdWx0KSAvIG11bHQ7XG59XG5cbi8qKlxuICogVHJhbnNwb3NlIGNvb3JkcyB3aXRoIGZvcndhcmQgYXBwbHlpbmcgb2Zmc2V0IGFuZCBzY2FsZVxuICogQHBhcmFtIGNvb3JkcyAtIGNvb3JkcyB0byB0cmFuc3Bvc2VcbiAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXQgdmVjdG9yXG4gKiBAcGFyYW0gc2NhbGUgLSBzY2FsZSB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQoXG4gIGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSA9IFsxLCAxXSxcbik6IFZlY3RvckFycmF5VHlwZSB7XG4gIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcbiAgcmV0dXJuIFsoeCAtIG9mZnNldFswXSkvc2NhbGVbMF0sICh5IC0gb2Zmc2V0WzFdKS9zY2FsZVsxXV07XG59XG5cbi8qKlxuICogVHJhbnNwb3NlIGNvb3JkcyB3aXRoIGJhY2t3YXJkIGFwcGx5aW5nIG9mZnNldCBhbmQgc2NhbGVcbiAqIEBwYXJhbSBjb29yZHMgLSBjb29yZHMgdG8gdHJhbnNwb3NlXG4gKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0IHZlY3RvclxuICogQHBhcmFtIHNjYWxlIC0gc2NhbGUgdmVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2VDb29yZHNCYWNrd2FyZChcbiAgY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIG9mZnNldDogVmVjdG9yQXJyYXlUeXBlLCBzY2FsZTogVmVjdG9yQXJyYXlUeXBlID0gWzEsIDFdLFxuKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgY29uc3QgW3gsIHldID0gY29vcmRzO1xuICByZXR1cm4gW3gqc2NhbGVbMF0gKyBvZmZzZXRbMF0sIHkqc2NhbGVbMV0gKyBvZmZzZXRbMV1dO1xufVxuIiwiaW1wb3J0IFBvc2l0aW9uYWxWZWN0b3IsIHsgY3JlYXRlUG9seWdvblZlY3RvcnMgfSBmcm9tICcuL3Bvc2l0aW9uYWwtdmVjdG9yJztcbmltcG9ydCB7IGlzSW5JbnRlcnZhbCwgaXNJblNlZ21lbnQsIHJvdW5kIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBWZWN0b3IsIHsgY3JlYXRlVmVjdG9yLCB0b1ZlY3RvciB9IGZyb20gJy4vdmVjdG9yJztcblxuZXhwb3J0IHtcbiAgVmVjdG9yLFxuICBjcmVhdGVWZWN0b3IsXG4gIHRvVmVjdG9yLFxuICBQb3NpdGlvbmFsVmVjdG9yLFxuICBpc0luSW50ZXJ2YWwsXG4gIGlzSW5TZWdtZW50LFxuICByb3VuZCxcbiAgY3JlYXRlUG9seWdvblZlY3RvcnMsXG59O1xuIiwiaW1wb3J0IHsgUG9zaXRpb25hbFZlY3RvckludGVyZmFjZSwgVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JJbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBWZWN0b3IsIHsgdG9WZWN0b3IgfSBmcm9tICcuL3ZlY3Rvcic7XG5cbi8qKlxuICogUG9zaXRpb25hbCB2ZWN0b3IgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb25hbFZlY3RvciBpbXBsZW1lbnRzIFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2Uge1xuICAvKipcbiAgICogUG9zaXRpb25cbiAgICovXG4gIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9ySW50ZXJmYWNlO1xuICAvKipcbiAgICogU2l6ZVxuICAgKi9cbiAgcHVibGljIHNpemU6IFZlY3RvckludGVyZmFjZTtcblxuICAvKipcbiAgICogUG9zaXRpb25hbFZlY3RvciBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gcG9zaXRpb24gLSBwb3NpdGlvblxuICAgKiBAcGFyYW0gc2l6ZSAtIHNpemVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsIHNpemU6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSkge1xuICAgIHRoaXMucG9zaXRpb24gPSB0b1ZlY3Rvcihwb3NpdGlvbik7XG4gICAgdGhpcy5zaXplID0gdG9WZWN0b3Ioc2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2UudGFyZ2V0fVxuICAgKi9cbiAgcHVibGljIGdldCB0YXJnZXQoKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5jbG9uZSgpLmFkZCh0aGlzLnNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZS5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2UuaW5jbHVkZXN9XG4gICAqL1xuICBwdWJsaWMgaW5jbHVkZXMocG9pbnQ6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSwgcHJlY2lzaW9uOiBudW1iZXIgPSA0KTogYm9vbGVhbiB7XG4gICAgY29uc3QgcG9pbnRWZWN0b3IgPSB0b1ZlY3Rvcihwb2ludCk7XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbi5pc0VxdWFsKHBvaW50VmVjdG9yLCBwcmVjaXNpb24pIHx8IHRoaXMudGFyZ2V0LmlzRXF1YWwocG9pbnRWZWN0b3IsIHByZWNpc2lvbikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IFt4MSwgeTFdID0gdGhpcy5wb3NpdGlvbi50b0FycmF5KHByZWNpc2lvbik7XG4gICAgY29uc3QgW3gyLCB5Ml0gPSB0aGlzLnRhcmdldC50b0FycmF5KHByZWNpc2lvbik7XG4gICAgY29uc3QgW3gsIHldID0gcG9pbnRWZWN0b3IudG9BcnJheShwcmVjaXNpb24pO1xuXG4gICAgcmV0dXJuICh4LXgxKSAqICh5Mi15MSkgLSAoeS15MSkgKiAoeDIteDEpID09PSAwXG4gICAgICAmJiAoeDEgPCB4ICYmIHggPCB4MikgJiYgKHkxIDwgeSAmJiB5IDwgeTIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlLmdldERpc3RhbmNlVmVjdG9yfVxuICAgKi9cbiAgcHVibGljIGdldERpc3RhbmNlVmVjdG9yKHBvaW50OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UpOiBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCB2ZWN0b3JQb2ludCA9IHRvVmVjdG9yKHBvaW50KTtcbiAgICBjb25zdCBkZXN0UG9pbnQgPSB0aGlzLl9nZXROZWFyZXN0TGluZVBvaW50KHBvaW50KTtcblxuICAgIGlmIChcbiAgICAgIGRlc3RQb2ludC54IDwgTWF0aC5taW4odGhpcy5wb3NpdGlvbi54LCB0aGlzLnRhcmdldC54KSB8fFxuICAgICAgZGVzdFBvaW50LnggPiBNYXRoLm1heCh0aGlzLnBvc2l0aW9uLngsIHRoaXMudGFyZ2V0LngpIHx8XG4gICAgICBkZXN0UG9pbnQueSA8IE1hdGgubWluKHRoaXMucG9zaXRpb24ueSwgdGhpcy50YXJnZXQueSkgfHxcbiAgICAgIGRlc3RQb2ludC55ID4gTWF0aC5tYXgodGhpcy5wb3NpdGlvbi55LCB0aGlzLnRhcmdldC55KVxuICAgICkge1xuICAgICAgY29uc3QgbDEgPSBuZXcgUG9zaXRpb25hbFZlY3Rvcih2ZWN0b3JQb2ludCwgdG9WZWN0b3IodGhpcy5wb3NpdGlvbikuc3ViKHZlY3RvclBvaW50KSk7XG4gICAgICBjb25zdCBsMiA9IG5ldyBQb3NpdGlvbmFsVmVjdG9yKHZlY3RvclBvaW50LCB0b1ZlY3Rvcih0aGlzLnRhcmdldCkuc3ViKHZlY3RvclBvaW50KSk7XG5cbiAgICAgIGlmIChsMS5sZW5ndGggPCBsMi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGwxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGwyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUG9zaXRpb25hbFZlY3Rvcih2ZWN0b3JQb2ludCwgZGVzdFBvaW50LnN1Yih2ZWN0b3JQb2ludCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvb3JkcyBvZiB0aGUgbmVhcmVzdCBwb2ludCBvbiB2ZWN0b3IgdG8gYW5vdGhlciBwb2ludFxuICAgKiBAcGFyYW0gcG9pbnQgLSBhbm90aGVyIHBvaW50XG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldE5lYXJlc3RMaW5lUG9pbnQocG9pbnQ6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSkge1xuICAgIGNvbnN0IHBvaW50VmVjdG9yID0gdG9WZWN0b3IocG9pbnQpO1xuXG4gICAgY29uc3QgayA9IChcbiAgICAgICh0aGlzLnRhcmdldC55LXRoaXMucG9zaXRpb24ueSkgKiAocG9pbnRWZWN0b3IueC10aGlzLnBvc2l0aW9uLngpXG4gICAgICAtICh0aGlzLnRhcmdldC54LXRoaXMucG9zaXRpb24ueCkgKiAocG9pbnRWZWN0b3IueS10aGlzLnBvc2l0aW9uLnkpXG4gICAgKSAvICgodGhpcy50YXJnZXQueS10aGlzLnBvc2l0aW9uLnkpKioyICsgKHRoaXMudGFyZ2V0LngtdGhpcy5wb3NpdGlvbi54KSoqMik7XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcihbXG4gICAgICBwb2ludFZlY3Rvci54IC0gayAqICh0aGlzLnRhcmdldC55LXRoaXMucG9zaXRpb24ueSksXG4gICAgICBwb2ludFZlY3Rvci55ICsgayAqICh0aGlzLnRhcmdldC54LXRoaXMucG9zaXRpb24ueCksXG4gICAgXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbGlzdCBvZiB2ZWN0b3JzIG9mIHRoZSBwb2x5Z29uIGZyb20gYSBsaXN0IG9mIHBvaW50c1xuICogQHBhcmFtIHBvaW50cyAtIGxpc3Qgb2YgcG9pbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQb2x5Z29uVmVjdG9ycyhwb2ludHM6IFZlY3RvckFycmF5VHlwZVtdIHwgVmVjdG9ySW50ZXJmYWNlW10pOiBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlW10ge1xuICBjb25zdCByZXN1bHQ6IFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2VbXSA9IFtdO1xuXG4gIGZvciAobGV0IGk9MCwgaj1wb2ludHMubGVuZ3RoLTE7IGk8cG9pbnRzLmxlbmd0aDsgaj1pKyspIHtcbiAgICBjb25zdCBsaHNQb2ludCA9IHRvVmVjdG9yKHBvaW50c1tqXSk7XG4gICAgY29uc3QgcmhzUG9pbnQgPSB0b1ZlY3Rvcihwb2ludHNbaV0pO1xuXG4gICAgcmVzdWx0LnB1c2gobmV3IFBvc2l0aW9uYWxWZWN0b3IobGhzUG9pbnQsIHJoc1BvaW50LnN1YihsaHNQb2ludCkpKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUsIFZlY3RvckludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vKipcbiAqIFZlY3RvciBjbGFzc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IgaW1wbGVtZW50cyBWZWN0b3JJbnRlcmZhY2Uge1xuICAvKipcbiAgICogQ29vcmRpbmF0ZSBYXG4gICAqL1xuICBwdWJsaWMgeDogbnVtYmVyO1xuICAvKipcbiAgICogQ29vcmRpbmF0ZSBZXG4gICAqL1xuICBwdWJsaWMgeTogbnVtYmVyO1xuICAvKipcbiAgICogRGVmYXVsdCBwcmVjaXNpb25cbiAgICovXG4gIHByb3RlY3RlZCBfZGVmYXVsdFByZWNpc2lvbjogbnVtYmVyID0gNDtcblxuICAvKipcbiAgICogVmVjdG9yIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB4IC0gY29vcmRpbmF0ZSBYXG4gICAqIEBwYXJhbSB5IC0gY29vcmRpbmF0ZSBZXG4gICAqIEBwYXJhbSBkZWZhdWx0UHJlY2lzaW9uIC0gZGVmYXVsdCBwcmVjaXNpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKFt4LCB5XTogVmVjdG9yQXJyYXlUeXBlLCBkZWZhdWx0UHJlY2lzaW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgaWYgKHRoaXMuX2RlZmF1bHRQcmVjaXNpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fZGVmYXVsdFByZWNpc2lvbiA9IGRlZmF1bHRQcmVjaXNpb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbm90aGVyIHZlY3RvciB0byB0aGlzIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIHZlY3RvciB0byBjYWNoZVxuICAgKi9cbiAgcHVibGljIGFkZCh2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHYgPSB0b1ZlY3Rvcih2KTtcblxuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyB2ZWN0b3Igd2l0aCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIHZlY3RvciB0byBzdWJ0cmFjdFxuICAgKi9cbiAgcHVibGljIHN1Yih2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHYgPSB0b1ZlY3Rvcih2KTtcblxuICAgIHRoaXMueCAtPSB2Lng7XG4gICAgdGhpcy55IC09IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxlcyB2ZWN0b3IgYnkgbnVtYmVyXG4gICAqIEBwYXJhbSBtdWwgLSBtdWx0aXBsaWVyXG4gICAqL1xuICBwdWJsaWMgbXVsKG11bDogbnVtYmVyKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB0aGlzLnggKj0gbXVsO1xuICAgIHRoaXMueSAqPSBtdWw7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIHZlY3RvciBieSBudW1iZXJcbiAgICogQHBhcmFtIGRpdiAtIGRpdmlkZXJcbiAgICovXG4gIHB1YmxpYyBkaXYoZGl2OiBudW1iZXIpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHRoaXMueCAvPSBkaXY7XG4gICAgdGhpcy55IC89IGRpdjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVyc2VzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGludmVyc2UoKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB0aGlzLnggPSAtdGhpcy54O1xuICAgIHRoaXMueSA9IC10aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZlcnNlcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyByZXZlcnNlKCk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgdGhpcy54ID0gMS90aGlzLng7XG4gICAgdGhpcy55ID0gMS90aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCArIHRoaXMueSp0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHZlY3RvciBpcyBlcXVhbCB0byBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSBwcmVjaXNpb24gLSByb3VuZCBwcmVjaXNpb24gZm9yIGNvbXBhcmlzb25cbiAgICovXG4gIHB1YmxpYyBpc0VxdWFsKHY6IFZlY3RvckludGVyZmFjZSB8IFZlY3RvckFycmF5VHlwZSwgcHJlY2lzaW9uOiBudW1iZXIgPSB0aGlzLl9kZWZhdWx0UHJlY2lzaW9uKTogYm9vbGVhbiB7XG4gICAgdiA9IHRvVmVjdG9yKHYpO1xuICAgIHJldHVybiByb3VuZCh2LngsIHByZWNpc2lvbikgPT09IHJvdW5kKHRoaXMueCwgcHJlY2lzaW9uKVxuICAgICAgJiYgcm91bmQodi55LCBwcmVjaXNpb24pID09PSByb3VuZCh0aGlzLnksIHByZWNpc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGFuZ2xlIGJldHdlZW4gdmVjdG9ycyBlcXVhbHMgOTAgZGVncmVlc1xuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgaXNPcnRob2dvbmFsKHY6IFZlY3RvckludGVyZmFjZSB8IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldENvcyh2KSA9PT0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgY29sbGluZWFyIHdpdGggYXJndW1lbnQgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBpc0NvbGxpbmVhcih2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tdWxWZWN0b3IodikgPT09IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBkaXN0YW5jZSB2ZWN0b3Igb2YgdGhpcyBhbmQgYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGRpc3RhbmNlKHY6IFZlY3RvckludGVyZmFjZSB8IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zdWIodik7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBzY2FsYXIgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBtdWxTY2FsYXIodjogVmVjdG9ySW50ZXJmYWNlIHwgVmVjdG9yQXJyYXlUeXBlKTogbnVtYmVyIHtcbiAgICB2ID0gdG9WZWN0b3Iodik7XG4gICAgcmV0dXJuIHRoaXMueCp2LnggKyB0aGlzLnkqdi55O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgbGVuZ3RoIG9mIHZlY3RvciBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIG11bFZlY3Rvcih2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUpOiBudW1iZXIge1xuICAgIHYgPSB0b1ZlY3Rvcih2KTtcbiAgICByZXR1cm4gdGhpcy54KnYueSAtIHRoaXMueSp2Lng7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGlzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoO1xuXG4gICAgdGhpcy54IC89IGxlbjtcbiAgICB0aGlzLnkgLz0gbGVuO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNwb3NlcyB2ZWN0b3IgZm9yd2FyZCB3aXRoIG9mZnNldCBhbmQgc2NhbGVcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKi9cbiAgcHVibGljIHRyYW5zcG9zZUZvcndhcmQoXG4gICAgb2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsIHNjYWxlOiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsXG4gICk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgY29uc3Qgb2Zmc2V0VmVjdG9yID0gdG9WZWN0b3Iob2Zmc2V0KTtcbiAgICBjb25zdCBzY2FsZVZlY3RvciA9IHRvVmVjdG9yKHNjYWxlKTtcblxuICAgIHRoaXMueCA9ICh0aGlzLnggLSBvZmZzZXRWZWN0b3IueCkgLyBzY2FsZVZlY3Rvci54O1xuICAgIHRoaXMueSA9ICh0aGlzLnkgLSBvZmZzZXRWZWN0b3IueSkgLyBzY2FsZVZlY3Rvci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNwb3NlcyB2ZWN0b3IgYmFja3dhcmQgd2l0aCBvZmZzZXQgYW5kIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VCYWNrd2FyZChcbiAgICBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSxcbiAgKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCBvZmZzZXRWZWN0b3IgPSB0b1ZlY3RvcihvZmZzZXQpO1xuICAgIGNvbnN0IHNjYWxlVmVjdG9yID0gdG9WZWN0b3Ioc2NhbGUpO1xuXG4gICAgdGhpcy54ID0gb2Zmc2V0VmVjdG9yLnggKyB0aGlzLngqc2NhbGVWZWN0b3IueDtcbiAgICB0aGlzLnkgPSBvZmZzZXRWZWN0b3IueSArIHRoaXMueSpzY2FsZVZlY3Rvci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBuZXcgdmVjdG9yIGJ5IHJvdGF0aW5nIHRoaXNcbiAgICogQHBhcmFtIGFuZ2xlIC0gYW5nbGUgdG8gcm90YXRlIHRvXG4gICAqIEBwYXJhbSBwcmVjaXNpb24gLSByb3VuZCBwcmVjaXNpb25cbiAgICovXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIgPSB0aGlzLl9kZWZhdWx0UHJlY2lzaW9uKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCBjcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICBjb25zdCBzbiA9IE1hdGguc2luKGFuZ2xlKTtcblxuICAgIHRoaXMueCA9IHJvdW5kKHRoaXMueCpjcyAtIHRoaXMueSpzbiwgcHJlY2lzaW9uKTtcbiAgICB0aGlzLnkgPSByb3VuZCh0aGlzLngqc24gKyB0aGlzLnkqY3MsIHByZWNpc2lvbik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29zIHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGdldENvcyh2OiBWZWN0b3JJbnRlcmZhY2UgfCBWZWN0b3JBcnJheVR5cGUgfCBudWxsID0gbnVsbCk6IG51bWJlciB7XG4gICAgaWYgKHYgPT09IG51bGwpIHtcbiAgICAgIHYgPSBjcmVhdGVWZWN0b3IoWzEsIDBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdiA9IHRvVmVjdG9yKHYpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm11bFNjYWxhcih2KSAvICh0aGlzLmxlbmd0aCAqIHYubGVuZ3RoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZXMgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gY3JlYXRlVmVjdG9yKHRoaXMudG9BcnJheSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB2ZWN0b3IgdG8gYXJyYXlcbiAgICogQHBhcmFtIHByZWNpc2lvbiAtIHByZWNpc2lvblxuICAgKi9cbiAgcHVibGljIHRvQXJyYXkocHJlY2lzaW9uPzogbnVtYmVyKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICBpZiAocHJlY2lzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBbdGhpcy54LCB0aGlzLnldO1xuICAgIH1cblxuICAgIHJldHVybiBbcm91bmQodGhpcy54LCBwcmVjaXNpb24pLCByb3VuZCh0aGlzLnksIHByZWNpc2lvbildO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgdmVjdG9yXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gY29vcmRzIC0gY29vcmRpbmF0ZXMgb2YgbmV3IHZlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmVjdG9yKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgcmV0dXJuIG5ldyBWZWN0b3IoY29vcmRzKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBpbnN0YW5jZSB0byB2ZWN0b3IgaWYgaXQncyBhbiBhcnJheVxuICogQHBhcmFtIGNvb3JkcyAtIGNvb3JkcyBhcyB2ZWN0b3Igb3IgYW4gYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvVmVjdG9yKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlIHwgVmVjdG9ySW50ZXJmYWNlKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgcmV0dXJuIChjb29yZHMgaW5zdGFuY2VvZiBBcnJheSkgPyBjcmVhdGVWZWN0b3IoY29vcmRzKSA6IGNvb3Jkcztcbn1cbiIsImltcG9ydCB7XG4gIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UsXG4gIFZpZXdDb25maWdJbnRlcmZhY2UsXG4gIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGFyZUFycmF5c0VxdWFsIH0gZnJvbSAnLi4vaGVscGVycy9iYXNlJztcbmltcG9ydCBPYnNlcnZlSGVscGVyIGZyb20gJy4uL2hlbHBlcnMvb2JzZXJ2ZS1oZWxwZXInO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSAnLi92ZWN0b3InO1xuaW1wb3J0IHsgdHJhbnNwb3NlQ29vcmRzQmFja3dhcmQsIHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQgfSBmcm9tICcuL3ZlY3Rvci9oZWxwZXJzJztcblxuLyoqXG4gKiBDb25maWcgZm9yIG9iamVjdHMgZHJhd2FibGUgb24gY2FudmFzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb25maWcgaW1wbGVtZW50cyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBTY2FsZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9zY2FsZTogVmVjdG9yQXJyYXlUeXBlO1xuICAvKipcbiAgICogT2Zmc2V0XG4gICAqL1xuICBwcm90ZWN0ZWQgX29mZnNldDogVmVjdG9yQXJyYXlUeXBlO1xuICAvKipcbiAgICogR3JpZCBzdGVwXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dyaWRTdGVwOiBudW1iZXI7XG4gIC8qKlxuICAgKiBIZWxwZXIgZm9yIG9ic2VydmFibGUgbG9naWNcbiAgICovXG4gIHByb3RlY3RlZCBfb2JzZXJ2ZUhlbHBlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZTtcblxuICAvKipcbiAgICogVmlld0NvbmZpZyBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0XG4gICAqIEBwYXJhbSBncmlkU3RlcCAtIGdyaWQgc3RlcFxuICAgKi9cbiAgY29uc3RydWN0b3IoeyBzY2FsZSwgb2Zmc2V0LCBncmlkU3RlcCB9OiBWaWV3Q29uZmlnSW50ZXJmYWNlKSB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlciA9IG5ldyBPYnNlcnZlSGVscGVyKCk7XG4gICAgdGhpcy5fc2NhbGUgPSBuZXcgUHJveHkoc2NhbGUsIHtcbiAgICAgIHNldDogKHRhcmdldDogVmVjdG9yQXJyYXlUeXBlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gIT09IHZhbHVlO1xuICAgICAgICAodGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gYXMgdW5rbm93bikgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuX29mZnNldCA9IG5ldyBQcm94eShvZmZzZXQsIHtcbiAgICAgIHNldDogKHRhcmdldDogVmVjdG9yQXJyYXlUeXBlLCBpbmRleCwgdmFsdWUpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNDaGFuZ2VkID0gdGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gIT09IHZhbHVlO1xuICAgICAgICAodGFyZ2V0W2luZGV4IGFzIGtleW9mIFZlY3RvckFycmF5VHlwZV0gYXMgdW5rbm93bikgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGlzQ2hhbmdlZCA/IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuX2dyaWRTdGVwID0gZ3JpZFN0ZXA7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLm9uVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvblZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZywgaGFuZGxlcjogVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub25DaGFuZ2Uoc3Vic2NyaWJlck5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2Uub2ZmVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvZmZWaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9mZkNoYW5nZShzdWJzY3JpYmVyTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLnRyYW5zcG9zZUZvcndhcmR9XG4gICAqL1xuICBwdWJsaWMgdHJhbnNwb3NlRm9yd2FyZChjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQoY29vcmRzLCB0aGlzLl9vZmZzZXQsIHRoaXMuX3NjYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudHJhbnNwb3NlQmFja3dhcmR9XG4gICAqL1xuICBwdWJsaWMgdHJhbnNwb3NlQmFja3dhcmQoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0cmFuc3Bvc2VDb29yZHNCYWNrd2FyZChjb29yZHMsIHRoaXMuX29mZnNldCwgdGhpcy5fc2NhbGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS51cGRhdGVTY2FsZUluQ3Vyc29yQ29udGV4dH1cbiAgICovXG4gIHB1YmxpYyB1cGRhdGVTY2FsZUluQ3Vyc29yQ29udGV4dChuZXdTY2FsZTogVmVjdG9yQXJyYXlUeXBlLCBjdXJzb3JDb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChuZXdTY2FsZSwgdGhpcy5fc2NhbGUpO1xuXG4gICAgaWYgKCFpc0NoYW5nZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICBjb25zdCBvbGRTY2FsZVBvc2l0aW9uID0gY3JlYXRlVmVjdG9yKHRoaXMudHJhbnNwb3NlRm9yd2FyZChjdXJzb3JDb29yZHMpKTtcbiAgICAgIHRoaXMuc2NhbGUgPSBuZXdTY2FsZTtcbiAgICAgIGNvbnN0IG5ld1NjYWxlUG9zaXRpb24gPSBjcmVhdGVWZWN0b3IodGhpcy50cmFuc3Bvc2VGb3J3YXJkKGN1cnNvckNvb3JkcykpO1xuICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IG5ld1NjYWxlUG9zaXRpb24uY2xvbmUoKS5zdWIob2xkU2NhbGVQb3NpdGlvbik7XG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMudHJhbnNwb3NlQmFja3dhcmQoZGlmZmVyZW5jZS50b0FycmF5KCkpO1xuXG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGFsbCB0aGUgZGF0YSBpbiBjb25maWdcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKiBAcGFyYW0gZ3JpZFN0ZXAgLSBncmlkIHN0ZXBcbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoeyBzY2FsZSwgb2Zmc2V0LCBncmlkU3RlcCB9OiBWaWV3Q29uZmlnSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKHNjYWxlLCB0aGlzLl9zY2FsZSkgfHwgIWFyZUFycmF5c0VxdWFsKG9mZnNldCwgdGhpcy5fb2Zmc2V0KTtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgdGhpcy5ncmlkU3RlcCA9IGdyaWRTdGVwO1xuXG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb25maWcgZGF0YVxuICAgKi9cbiAgcHVibGljIGdldENvbmZpZygpOiBWaWV3Q29uZmlnSW50ZXJmYWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2NhbGU6IHRoaXMuX3NjYWxlLFxuICAgICAgb2Zmc2V0OiB0aGlzLl9vZmZzZXQsXG4gICAgICBncmlkU3RlcDogdGhpcy5fZ3JpZFN0ZXAsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2FsZSBnZXR0ZXJcbiAgICovXG4gIGdldCBzY2FsZSgpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2FsZSBzZXR0ZXJcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICovXG4gIHNldCBzY2FsZShzY2FsZTogVmVjdG9yQXJyYXlUeXBlKSB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWFyZUFycmF5c0VxdWFsKHNjYWxlLCB0aGlzLl9zY2FsZSk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLl9zY2FsZVswXSA9IHNjYWxlWzBdO1xuICAgICAgdGhpcy5fc2NhbGVbMV0gPSBzY2FsZVsxXTtcbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9mZnNldCBnZXR0ZXJcbiAgICovXG4gIGdldCBvZmZzZXQoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fb2Zmc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIE9mZnNldCBzZXR0ZXJcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKi9cbiAgc2V0IG9mZnNldChvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChvZmZzZXQsIHRoaXMuX29mZnNldCk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLl9vZmZzZXRbMF0gPSBvZmZzZXRbMF07XG4gICAgICB0aGlzLl9vZmZzZXRbMV0gPSBvZmZzZXRbMV07XG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHcmlkIHN0ZXAgZ2V0dGVyXG4gICAqL1xuICBnZXQgZ3JpZFN0ZXAoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JpZFN0ZXA7XG4gIH1cblxuICAvKipcbiAgICogR3JpZCBzdGVwIHNldHRlclxuICAgKiBAcGFyYW0gZ3JpZFN0ZXAgLSBncmlkIHN0ZXBcbiAgICovXG4gIHNldCBncmlkU3RlcChncmlkU3RlcDogbnVtYmVyKSB7XG4gICAgY29uc3QgaXNDaGFuZ2VkID0gZ3JpZFN0ZXAgIT09IHRoaXMuX2dyaWRTdGVwO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5fZ3JpZFN0ZXAgPSBncmlkU3RlcDtcbiAgICAgIG1hbmFnZXIucHJvY2Vzc0hhbmRsZXJzKCFpc0NoYW5nZWQgfHwgbXV0ZWRCZWZvcmUpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvKiAoaWdub3JlZCkgKi8iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRHJhd2VyIGZyb20gJy4vY2FudmFzL2RyYXdlcic7XG5pbXBvcnQgRHJhd2FibGVTdG9yYWdlIGZyb20gJy4vY2FudmFzL3N0cnVjdHMvZHJhd2FibGUvZHJhd2FibGUtc3RvcmFnZSc7XG5pbXBvcnQgeyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB9IGZyb20gJy4vY2FudmFzL3R5cGVzJztcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gJy4vY2FudmFzL3N0cnVjdHMvdmlldy1jb25maWcnO1xuaW1wb3J0IFN2ZyBmcm9tICcuL2NhbnZhcy9maWd1cmVzL3N2Zyc7XG5pbXBvcnQgR3JpZCBmcm9tICcuL2NhbnZhcy9maWd1cmVzL2dyaWQnO1xuaW1wb3J0IFJlY3QgZnJvbSAnLi9jYW52YXMvZmlndXJlcy9yZWN0JztcblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBEcmF3YWJsZVN0b3JhZ2UoW10pO1xuY29uc29sZS5sb2coc3RvcmFnZSk7XG5cbmNvbnN0IHZpZXdDb25maWc6IFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlID0gbmV3IFZpZXdDb25maWcoe1xuICBzY2FsZTogWzEsIDFdLFxuICBvZmZzZXQ6IFswLCAwXSxcbiAgZ3JpZFN0ZXA6IDE1LFxufSk7XG5jb25zb2xlLmxvZyh2aWV3Q29uZmlnKTtcblxuY29uc3QgZHJhd2VyOiBEcmF3ZXIgPSBuZXcgRHJhd2VyKHtcbiAgZG9tRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50LFxuICB2aWV3Q29uZmlnLFxuICBzdG9yYWdlLFxufSk7XG5kcmF3ZXIuZHJhdygpO1xuXG5zdG9yYWdlLmFkZExheWVyKCdncmlkJywgJ0dyaWQgbGF5ZXInLCBbXG4gIG5ldyBHcmlkKDEsIHtcbiAgICB6SW5kZXg6IC1JbmZpbml0eSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIG1haW5MaW5lQ29sb3I6ICcjYmJiJyxcbiAgICBzdWJMaW5lQ29sb3I6ICcjZGVkZWRlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gICAgbGluZXNJbkJsb2NrOiA1LFxuICB9KSxcbl0pO1xuXG5jb25zdCBlbGVtZW50c0xheWVyID0gc3RvcmFnZS5hZGRMYXllcignZWxlbWVudHMnLCAnRWxlbWVudHMgbGF5ZXInLCBbXG4gIG5ldyBSZWN0KDIsIHtcbiAgICBwb3NpdGlvbjogWzEwLCAyMF0sXG4gICAgc2l6ZTogWzEwMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ2dyZWVuJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gIH0pLFxuICBuZXcgUmVjdCgzLCB7XG4gICAgcG9zaXRpb246IFsxMCwgMjVdLFxuICAgIHNpemU6IFs1MCwgNTBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ2JsdWUnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmxhY2snLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgfSksXG4gIG5ldyBSZWN0KDQsIHtcbiAgICBwb3NpdGlvbjogWzE1KjMwLCAxNSoxMF0sXG4gICAgc2l6ZTogWzE1KjEwLCAxNSo1XSxcbiAgICB6SW5kZXg6IDEwLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgIHN0cm9rZVN0eWxlOiAncmVkJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gIH0pLFxuICBuZXcgU3ZnKDUsIHtcbiAgICBwb3NpdGlvbjogWzMwMCwgNTUwXSxcbiAgICBzaXplOiBbMTYyLCA4Ml0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZGF0YTogXCI8c3ZnIHdpZHRoPScxNjInIGhlaWdodD0nODInIHZpZXdCb3g9JzAgMCAxNjIgODInIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTI4LjY5MjMgMUwxIDQwLjEyNDFMMjguNjkyMyA4MUgxMzQuNjc1TDE2MSA0MC4xMjQxTDEzNC42NzUgMUgyOC42OTIzWicgZmlsbD0nI0ZGQkNGMicgc3Ryb2tlPSdibGFjaycgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgLz48L3N2Zz5cIiwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB9KSxcbiAgbmV3IFN2Zyg1LCB7XG4gICAgcG9zaXRpb246IFsxMDAsIDU1MF0sXG4gICAgc2l6ZTogWzE2MiwgODJdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGRhdGE6IFwiPHN2ZyB3aWR0aD0nMTYyJyBoZWlnaHQ9JzgyJyB2aWV3Qm94PScwIDAgMTYyIDgyJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J00yOC42OTIzIDFMMSA0MC4xMjQxTDI4LjY5MjMgODFIMTM0LjY3NUwxNjEgNDAuMTI0MUwxMzQuNjc1IDFIMjguNjkyM1onIGZpbGw9JyNGRkJDRjInIHN0cm9rZT0nYmxhY2snIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIC8+PC9zdmc+XCIsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSksXG4gIG5ldyBSZWN0KDYsIHtcbiAgICBwb3NpdGlvbjogWzM1MCwgMzUwXSxcbiAgICBzaXplOiBbMzAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gIH0pLFxuICBuZXcgUmVjdCg3LCB7XG4gICAgcG9zaXRpb246IFszNTAsIDMwMF0sXG4gICAgc2l6ZTogWzMwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAxLFxuICB9KSxcbiAgbmV3IFJlY3QoOCwge1xuICAgIHBvc2l0aW9uOiBbMzAwLCAzNTBdLFxuICAgIHNpemU6IFszMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgfSksXG4gIG5ldyBSZWN0KDksIHtcbiAgICBwb3NpdGlvbjogWzIwMCwgMjAwXSxcbiAgICBzaXplOiBbMTYwLCAxNjBdLFxuICAgIHpJbmRleDogMCxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ2dyZWVuJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgfSksXG5dKTtcblxuY29uc3QgZ3JvdXAgPSBlbGVtZW50c0xheWVyLnN0b3JhZ2UuZ3JvdXAoWzYsIDcsIDgsIDldKTtcbmNvbnNvbGUubG9nKGdyb3VwKTtcbi8vIGVsZW1lbnRzTGF5ZXIuc3RvcmFnZS51bmdyb3VwKGdyb3VwLmlkKTtcblxuY29uc3QgYW5vdGhlckxheWVyID0gc3RvcmFnZS5hZGRMYXllcignYW5vdGhlcicsICdBbm90aGVyIExheWVyJywgW10pO1xuYW5vdGhlckxheWVyLnN0b3JhZ2UuYWRkKG5ldyBSZWN0KDksIHtcbiAgcG9zaXRpb246IFs4MDAsIDUwMF0sXG4gIHNpemU6IFsxMDAsIDEwMF0sXG4gIHpJbmRleDogLTEwMCxcbiAgdmlzaWJsZTogdHJ1ZSxcbiAgZmlsbFN0eWxlOiAnbGlnaHRibHVlJyxcbiAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgbGluZVdpZHRoOiAxLFxufSkpO1xuXG5jb25zb2xlLmxvZygnbGF5ZXJzJywgc3RvcmFnZS5nZXRMYXllcnMoKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=