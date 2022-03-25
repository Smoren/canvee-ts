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
/* harmony import */ var _structs_drawable_positional_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./structs/drawable/positional-context */ "./src/canvas/structs/drawable/positional-context.ts");





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
            // TODO toConfig???
            return coordsFilter.process(coords, {
                scale: _this._viewConfig.scale,
                offset: _this._viewConfig.offset,
                gridStep: _this._viewConfig.gridStep,
            });
        };
        var currentElementContext = new _structs_drawable_positional_context__WEBPACK_IMPORTED_MODULE_4__["default"](null, null);
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
                if (getNearBoundElement(mouseMoveCoords) !== null) {
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
                var newPosition = (0,_structs_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(transposedCoords)
                    .sub((0,_structs_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(currentElementContext.position))
                    .toArray();
                var newPositionFiltered = filterCoords(newPosition);
                if (!(0,_structs_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(newPositionFiltered).isEqual((0,_structs_vector__WEBPACK_IMPORTED_MODULE_2__.createVector)(currentElementContext.element.config.position))) {
                    currentElementContext.element.config.position = filterCoords(newPosition);
                }
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
            if (!currentElementContext.isEmpty()) {
                console.log(currentElementContext.element);
            }
            currentElementContext = new _structs_drawable_positional_context__WEBPACK_IMPORTED_MODULE_4__["default"](null, null);
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
/* harmony import */ var _helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers/type-helpers */ "./src/canvas/helpers/type-helpers.ts");
/* harmony import */ var _positional_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./positional-context */ "./src/canvas/structs/drawable/positional-context.ts");






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
            if ((0,_helpers_type_helpers__WEBPACK_IMPORTED_MODULE_4__.isPositional)(item) && item.boundIncludes(coords)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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X21vZHVsZXMvY3J5cHRvLWpzL2NvcmUuanMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vbm9kZV9tb2R1bGVzL2NyeXB0by1qcy9tZDUuanMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9kcmF3ZXIudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9maWd1cmVzL2dyaWQudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9maWd1cmVzL3JlY3QudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9maWd1cmVzL3N2Zy50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL2hlbHBlcnMvYmFzZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL2hlbHBlcnMvaW1hZ2UtY2FjaGUtaGVscGVyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvaGVscGVycy9vYnNlcnZlLWhlbHBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL2hlbHBlcnMvdHlwZS1oZWxwZXJzLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9ib3VuZHMvcmVjdGFuZ3VsYXItYm91bmQudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL2RyYXdhYmxlL2RyYXdhYmxlLWdyb3VwLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9kcmF3YWJsZS1zdG9yYWdlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9kcmF3YWJsZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvZHJhd2FibGUvcG9zaXRpb25hbC1jb250ZXh0LnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlLWdyb3VwLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9maWx0ZXJzL2dyaWQtZmlsdGVyLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy9pbWFnZS1jYWNoZS50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmVjdG9yL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzLy4vc3JjL2NhbnZhcy9zdHJ1Y3RzL3ZlY3Rvci9pbmRleC50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvY2FudmFzL3N0cnVjdHMvdmVjdG9yL3Bvc2l0aW9uYWwtdmVjdG9yLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy92ZWN0b3IvdmVjdG9yLnRzIiwid2VicGFjazovL2NhbnZhcy10cy8uL3NyYy9jYW52YXMvc3RydWN0cy92aWV3LWNvbmZpZy50cyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvaWdub3JlZHwvaG9tZS9zbW9yZW4vcHJvamVjdHMvY2FudmFzLXRzL25vZGVfbW9kdWxlcy9jcnlwdG8tanN8Y3J5cHRvIiwid2VicGFjazovL2NhbnZhcy10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vY2FudmFzLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYW52YXMtdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKmdsb2JhbHMgd2luZG93LCBnbG9iYWwsIHJlcXVpcmUqL1xuXG5cdC8qKlxuXHQgKiBDcnlwdG9KUyBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHR2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCAoZnVuY3Rpb24gKE1hdGgsIHVuZGVmaW5lZCkge1xuXG5cdCAgICB2YXIgY3J5cHRvO1xuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGZyb20gd2luZG93IChCcm93c2VyKVxuXHQgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSB3aW5kb3cuY3J5cHRvO1xuXHQgICAgfVxuXG5cdCAgICAvLyBOYXRpdmUgY3J5cHRvIGluIHdlYiB3b3JrZXIgKEJyb3dzZXIpXG5cdCAgICBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY3J5cHRvKSB7XG5cdCAgICAgICAgY3J5cHRvID0gc2VsZi5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gZnJvbSB3b3JrZXJcblx0ICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsVGhpcy5jcnlwdG8pIHtcblx0ICAgICAgICBjcnlwdG8gPSBnbG9iYWxUaGlzLmNyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIChleHBlcmltZW50YWwgSUUgMTEpIGNyeXB0byBmcm9tIHdpbmRvdyAoQnJvd3Nlcilcblx0ICAgIGlmICghY3J5cHRvICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5tc0NyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IHdpbmRvdy5tc0NyeXB0bztcblx0ICAgIH1cblxuXHQgICAgLy8gTmF0aXZlIGNyeXB0byBmcm9tIGdsb2JhbCAoTm9kZUpTKVxuXHQgICAgaWYgKCFjcnlwdG8gJiYgdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsLmNyeXB0bykge1xuXHQgICAgICAgIGNyeXB0byA9IGdsb2JhbC5jcnlwdG87XG5cdCAgICB9XG5cblx0ICAgIC8vIE5hdGl2ZSBjcnlwdG8gaW1wb3J0IHZpYSByZXF1aXJlIChOb2RlSlMpXG5cdCAgICBpZiAoIWNyeXB0byAmJiB0eXBlb2YgcmVxdWlyZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRyeSB7XG5cdCAgICAgICAgICAgIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXHQgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgIH1cblxuXHQgICAgLypcblx0ICAgICAqIENyeXB0b2dyYXBoaWNhbGx5IHNlY3VyZSBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvclxuXHQgICAgICpcblx0ICAgICAqIEFzIE1hdGgucmFuZG9tKCkgaXMgY3J5cHRvZ3JhcGhpY2FsbHkgbm90IHNhZmUgdG8gdXNlXG5cdCAgICAgKi9cblx0ICAgIHZhciBjcnlwdG9TZWN1cmVSYW5kb21JbnQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgaWYgKGNyeXB0bykge1xuXHQgICAgICAgICAgICAvLyBVc2UgZ2V0UmFuZG9tVmFsdWVzIG1ldGhvZCAoQnJvd3Nlcilcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50MzJBcnJheSgxKSlbMF07XG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHt9XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBVc2UgcmFuZG9tQnl0ZXMgbWV0aG9kIChOb2RlSlMpXG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvLnJhbmRvbUJ5dGVzID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoNCkucmVhZEludDMyTEUoKTtcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcignTmF0aXZlIGNyeXB0byBtb2R1bGUgY291bGQgbm90IGJlIHVzZWQgdG8gZ2V0IHNlY3VyZSByYW5kb20gbnVtYmVyLicpO1xuXHQgICAgfTtcblxuXHQgICAgLypcblx0ICAgICAqIExvY2FsIHBvbHlmaWxsIG9mIE9iamVjdC5jcmVhdGVcblxuXHQgICAgICovXG5cdCAgICB2YXIgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuXG5cdCAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcblx0ICAgICAgICAgICAgdmFyIHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvYmo7XG5cblx0ICAgICAgICAgICAgc3VidHlwZSA9IG5ldyBGKCk7XG5cblx0ICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBudWxsO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIENyeXB0b0pTIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMaWJyYXJ5IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfbGliID0gQy5saWIgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlIG9iamVjdCBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlID0gKGZ1bmN0aW9uICgpIHtcblxuXG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBQcm9wZXJ0aWVzIHRvIGNvcHkgaW50byB0aGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNwYXduXG5cdCAgICAgICAgICAgICAgICB2YXIgc3VidHlwZSA9IGNyZWF0ZSh0aGlzKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQXVnbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUubWl4SW4ob3ZlcnJpZGVzKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgaW5pdGlhbGl6ZXJcblx0ICAgICAgICAgICAgICAgIGlmICghc3VidHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5pdCcpIHx8IHRoaXMuaW5pdCA9PT0gc3VidHlwZS5pbml0KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZXIncyBwcm90b3R5cGUgaXMgdGhlIHN1YnR5cGUgb2JqZWN0XG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQucHJvdG90eXBlID0gc3VidHlwZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIHN1cGVydHlwZVxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIgPSB0aGlzO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRXh0ZW5kcyB0aGlzIG9iamVjdCBhbmQgcnVucyB0aGUgaW5pdCBtZXRob2QuXG5cdCAgICAgICAgICAgICAqIEFyZ3VtZW50cyB0byBjcmVhdGUoKSB3aWxsIGJlIHBhc3NlZCB0byBpbml0KCkuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBpbnN0YW5jZSA9IE15VHlwZS5jcmVhdGUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5leHRlbmQoKTtcblx0ICAgICAgICAgICAgICAgIGluc3RhbmNlLmluaXQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG9iamVjdC5cblx0ICAgICAgICAgICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHNvbWUgbG9naWMgd2hlbiB5b3VyIG9iamVjdHMgYXJlIGNyZWF0ZWQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgICAgIC8vIC4uLlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBpbnRvIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0byBtaXggaW4uXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBNeVR5cGUubWl4SW4oe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnXG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIG1peEluOiBmdW5jdGlvbiAocHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElFIHdvbid0IGNvcHkgdG9TdHJpbmcgdXNpbmcgdGhlIGxvb3AgYWJvdmVcblx0ICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0b1N0cmluZycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IHByb3BlcnRpZXMudG9TdHJpbmc7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGluc3RhbmNlLmNsb25lKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10pO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgd29yZCBhcnJheSB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciAoT3B0aW9uYWwpIFRoZSBlbmNvZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IENyeXB0b0pTLmVuYy5IZXhcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGVuY29kZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChlbmNvZGVyIHx8IEhleCkuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25jYXRlbmF0ZXMgYSB3b3JkIGFycmF5IHRvIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbmNhdDogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHRoaXNXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0V29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGlzU2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb25jYXRcblx0ICAgICAgICAgICAgaWYgKHRoaXNTaWdCeXRlcyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIGJ5dGUgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXRCeXRlID0gKHRoYXRXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gfD0gdGhhdEJ5dGUgPDwgKDI0IC0gKCh0aGlzU2lnQnl0ZXMgKyBpKSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSB3b3JkIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGF0U2lnQnl0ZXM7IGogKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaikgPj4+IDJdID0gdGhhdFdvcmRzW2ogPj4+IDJdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgKz0gdGhhdFNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsYW1wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wXG5cdCAgICAgICAgICAgIHdvcmRzW3NpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtIChzaWdCeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIHdvcmRzLmxlbmd0aCA9IE1hdGguY2VpbChzaWdCeXRlcyAvIDQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgd29yZCBhcnJheSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbkJ5dGVzIFRoZSBudW1iZXIgb2YgcmFuZG9tIGJ5dGVzIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbSgxNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmFuZG9tOiBmdW5jdGlvbiAobkJ5dGVzKSB7XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbkJ5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goY3J5cHRvU2VjdXJlUmFuZG9tSW50KCkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbkJ5dGVzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBFbmNvZGVyIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBIZXggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkhleC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGhleENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgJiAweDBmKS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhleENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleFN0ciBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChoZXhTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhleFN0ckxlbmd0aCA9IGhleFN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gM10gfD0gcGFyc2VJbnQoaGV4U3RyLnN1YnN0cihpLCAyKSwgMTYpIDw8ICgyNCAtIChpICUgOCkgKiA0KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGF0aW4xIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgTGF0aW4xID0gQ19lbmMuTGF0aW4xID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGxhdGluMVN0cmluZyA9IENyeXB0b0pTLmVuYy5MYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgTGF0aW4xIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF0aW4xU3RyIFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5MYXRpbjEucGFyc2UobGF0aW4xU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGxhdGluMVN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGluMVN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBsYXRpbjFTdHJMZW5ndGgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmOCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmOFN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmOFN0ciBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmOFN0cikge1xuXHQgICAgICAgICAgICByZXR1cm4gTGF0aW4xLnBhcnNlKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh1dGY4U3RyKSkpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYnVmZmVyZWQgYmxvY2sgYWxnb3JpdGhtIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIFRoZSBwcm9wZXJ0eSBibG9ja1NpemUgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbiBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9taW5CdWZmZXJTaXplIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgc2hvdWxkIGJlIGtlcHQgdW5wcm9jZXNzZWQgaW4gdGhlIGJ1ZmZlci4gRGVmYXVsdDogMFxuXHQgICAgICovXG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgZGF0YSBidWZmZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheS5pbml0KCk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIG5ldyBkYXRhIHRvIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgYnVmZmVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGFwcGVuZC4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGEgV29yZEFycmF5IHVzaW5nIFVURi04LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEuY29uY2F0KGRhdGEpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzICs9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFByb2Nlc3NlcyBhdmFpbGFibGUgZGF0YSBibG9ja3MuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwcm9jZXNzZWQgZGF0YS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcyghISdmbHVzaCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkV29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgcHJvY2Vzc2VkV29yZHMgPSBkYXRhV29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gbkJ5dGVzUmVhZHk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsIG5CeXRlc1JlYWR5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWluQnVmZmVyU2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgaGFzaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBoYXNoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDE2ICg1MTIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaGVyID0gQ3J5cHRvSlMuYWxnby5TSEEyNTYuY3JlYXRlKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBoYXNoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBoYXNoZXIgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SGFzaGVyfSBUaGlzIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFzaFxuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBtZXNzYWdlIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNTEyLzMyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIFNIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGNmZykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZSBpbiB0aGlzIEhNQUMgaGVscGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEhtYWNTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDX2FsZ28uSE1BQy5pbml0KGhhc2hlciwga2V5KS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbGdvcml0aG0gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvID0ge307XG5cblx0ICAgIHJldHVybiBDO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gQ29uc3RhbnRzIHRhYmxlXG5cdCAgICB2YXIgVCA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY0OyBpKyspIHtcblx0ICAgICAgICAgICAgVFtpXSA9IChNYXRoLmFicyhNYXRoLnNpbihpICsgMSkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIE1ENSBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIE1ENSA9IENfYWxnby5NRDUgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KFtcblx0ICAgICAgICAgICAgICAgIDB4Njc0NTIzMDEsIDB4ZWZjZGFiODksXG5cdCAgICAgICAgICAgICAgICAweDk4YmFkY2ZlLCAweDEwMzI1NDc2XG5cdCAgICAgICAgICAgIF0pO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU3dhcCBlbmRpYW5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgICAgIHZhciBvZmZzZXRfaSA9IG9mZnNldCArIGk7XG5cdCAgICAgICAgICAgICAgICB2YXIgTV9vZmZzZXRfaSA9IE1bb2Zmc2V0X2ldO1xuXG5cdCAgICAgICAgICAgICAgICBNW29mZnNldF9pXSA9IChcblx0ICAgICAgICAgICAgICAgICAgICAoKChNX29mZnNldF9pIDw8IDgpICB8IChNX29mZnNldF9pID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgICAgICgoKE1fb2Zmc2V0X2kgPDwgMjQpIHwgKE1fb2Zmc2V0X2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKVxuXHQgICAgICAgICAgICAgICAgKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzAgID0gTVtvZmZzZXQgKyAwXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEgID0gTVtvZmZzZXQgKyAxXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzIgID0gTVtvZmZzZXQgKyAyXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzMgID0gTVtvZmZzZXQgKyAzXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzQgID0gTVtvZmZzZXQgKyA0XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzUgID0gTVtvZmZzZXQgKyA1XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzYgID0gTVtvZmZzZXQgKyA2XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzcgID0gTVtvZmZzZXQgKyA3XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzggID0gTVtvZmZzZXQgKyA4XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzkgID0gTVtvZmZzZXQgKyA5XTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEwID0gTVtvZmZzZXQgKyAxMF07XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xMSA9IE1bb2Zmc2V0ICsgMTFdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTIgPSBNW29mZnNldCArIDEyXTtcblx0ICAgICAgICAgICAgdmFyIE1fb2Zmc2V0XzEzID0gTVtvZmZzZXQgKyAxM107XG5cdCAgICAgICAgICAgIHZhciBNX29mZnNldF8xNCA9IE1bb2Zmc2V0ICsgMTRdO1xuXHQgICAgICAgICAgICB2YXIgTV9vZmZzZXRfMTUgPSBNW29mZnNldCArIDE1XTtcblxuXHQgICAgICAgICAgICAvLyBXb3JraW5nIHZhcmlhbGJlc1xuXHQgICAgICAgICAgICB2YXIgYSA9IEhbMF07XG5cdCAgICAgICAgICAgIHZhciBiID0gSFsxXTtcblx0ICAgICAgICAgICAgdmFyIGMgPSBIWzJdO1xuXHQgICAgICAgICAgICB2YXIgZCA9IEhbM107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzAsICA3LCAgVFswXSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF8xLCAgMTIsIFRbMV0pO1xuXHQgICAgICAgICAgICBjID0gRkYoYywgZCwgYSwgYiwgTV9vZmZzZXRfMiwgIDE3LCBUWzJdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzMsICAyMiwgVFszXSk7XG5cdCAgICAgICAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBNX29mZnNldF80LCAgNywgIFRbNF0pO1xuXHQgICAgICAgICAgICBkID0gRkYoZCwgYSwgYiwgYywgTV9vZmZzZXRfNSwgIDEyLCBUWzVdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzYsICAxNywgVFs2XSk7XG5cdCAgICAgICAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBNX29mZnNldF83LCAgMjIsIFRbN10pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfOCwgIDcsICBUWzhdKTtcblx0ICAgICAgICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzksICAxMiwgVFs5XSk7XG5cdCAgICAgICAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBNX29mZnNldF8xMCwgMTcsIFRbMTBdKTtcblx0ICAgICAgICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzExLCAyMiwgVFsxMV0pO1xuXHQgICAgICAgICAgICBhID0gRkYoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTIsIDcsICBUWzEyXSk7XG5cdCAgICAgICAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBNX29mZnNldF8xMywgMTIsIFRbMTNdKTtcblx0ICAgICAgICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE0LCAxNywgVFsxNF0pO1xuXHQgICAgICAgICAgICBiID0gRkYoYiwgYywgZCwgYSwgTV9vZmZzZXRfMTUsIDIyLCBUWzE1XSk7XG5cblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEsICA1LCAgVFsxNl0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfNiwgIDksICBUWzE3XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF8xMSwgMTQsIFRbMThdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzAsICAyMCwgVFsxOV0pO1xuXHQgICAgICAgICAgICBhID0gR0coYSwgYiwgYywgZCwgTV9vZmZzZXRfNSwgIDUsICBUWzIwXSk7XG5cdCAgICAgICAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBNX29mZnNldF8xMCwgOSwgIFRbMjFdKTtcblx0ICAgICAgICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE1LCAxNCwgVFsyMl0pO1xuXHQgICAgICAgICAgICBiID0gR0coYiwgYywgZCwgYSwgTV9vZmZzZXRfNCwgIDIwLCBUWzIzXSk7XG5cdCAgICAgICAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBNX29mZnNldF85LCAgNSwgIFRbMjRdKTtcblx0ICAgICAgICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzE0LCA5LCAgVFsyNV0pO1xuXHQgICAgICAgICAgICBjID0gR0coYywgZCwgYSwgYiwgTV9vZmZzZXRfMywgIDE0LCBUWzI2XSk7XG5cdCAgICAgICAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBNX29mZnNldF84LCAgMjAsIFRbMjddKTtcblx0ICAgICAgICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEzLCA1LCAgVFsyOF0pO1xuXHQgICAgICAgICAgICBkID0gR0coZCwgYSwgYiwgYywgTV9vZmZzZXRfMiwgIDksICBUWzI5XSk7XG5cdCAgICAgICAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBNX29mZnNldF83LCAgMTQsIFRbMzBdKTtcblx0ICAgICAgICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEyLCAyMCwgVFszMV0pO1xuXG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF81LCAgNCwgIFRbMzJdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzgsICAxMSwgVFszM10pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTEsIDE2LCBUWzM0XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8xNCwgMjMsIFRbMzVdKTtcblx0ICAgICAgICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzEsICA0LCAgVFszNl0pO1xuXHQgICAgICAgICAgICBkID0gSEgoZCwgYSwgYiwgYywgTV9vZmZzZXRfNCwgIDExLCBUWzM3XSk7XG5cdCAgICAgICAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBNX29mZnNldF83LCAgMTYsIFRbMzhdKTtcblx0ICAgICAgICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEwLCAyMywgVFszOV0pO1xuXHQgICAgICAgICAgICBhID0gSEgoYSwgYiwgYywgZCwgTV9vZmZzZXRfMTMsIDQsICBUWzQwXSk7XG5cdCAgICAgICAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBNX29mZnNldF8wLCAgMTEsIFRbNDFdKTtcblx0ICAgICAgICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzMsICAxNiwgVFs0Ml0pO1xuXHQgICAgICAgICAgICBiID0gSEgoYiwgYywgZCwgYSwgTV9vZmZzZXRfNiwgIDIzLCBUWzQzXSk7XG5cdCAgICAgICAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBNX29mZnNldF85LCAgNCwgIFRbNDRdKTtcblx0ICAgICAgICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzEyLCAxMSwgVFs0NV0pO1xuXHQgICAgICAgICAgICBjID0gSEgoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTUsIDE2LCBUWzQ2XSk7XG5cdCAgICAgICAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBNX29mZnNldF8yLCAgMjMsIFRbNDddKTtcblxuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfMCwgIDYsICBUWzQ4XSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF83LCAgMTAsIFRbNDldKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzE0LCAxNSwgVFs1MF0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfNSwgIDIxLCBUWzUxXSk7XG5cdCAgICAgICAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBNX29mZnNldF8xMiwgNiwgIFRbNTJdKTtcblx0ICAgICAgICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIE1fb2Zmc2V0XzMsICAxMCwgVFs1M10pO1xuXHQgICAgICAgICAgICBjID0gSUkoYywgZCwgYSwgYiwgTV9vZmZzZXRfMTAsIDE1LCBUWzU0XSk7XG5cdCAgICAgICAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBNX29mZnNldF8xLCAgMjEsIFRbNTVdKTtcblx0ICAgICAgICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIE1fb2Zmc2V0XzgsICA2LCAgVFs1Nl0pO1xuXHQgICAgICAgICAgICBkID0gSUkoZCwgYSwgYiwgYywgTV9vZmZzZXRfMTUsIDEwLCBUWzU3XSk7XG5cdCAgICAgICAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBNX29mZnNldF82LCAgMTUsIFRbNThdKTtcblx0ICAgICAgICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIE1fb2Zmc2V0XzEzLCAyMSwgVFs1OV0pO1xuXHQgICAgICAgICAgICBhID0gSUkoYSwgYiwgYywgZCwgTV9vZmZzZXRfNCwgIDYsICBUWzYwXSk7XG5cdCAgICAgICAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBNX29mZnNldF8xMSwgMTAsIFRbNjFdKTtcblx0ICAgICAgICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIE1fb2Zmc2V0XzIsICAxNSwgVFs2Ml0pO1xuXHQgICAgICAgICAgICBiID0gSUkoYiwgYywgZCwgYSwgTV9vZmZzZXRfOSwgIDIxLCBUWzYzXSk7XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cblx0ICAgICAgICAgICAgdmFyIG5CaXRzVG90YWxIID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbEwgPSBuQml0c1RvdGFsO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IChcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxIIDw8IDgpICB8IChuQml0c1RvdGFsSCA+Pj4gMjQpKSAmIDB4MDBmZjAwZmYpIHxcblx0ICAgICAgICAgICAgICAgICgoKG5CaXRzVG90YWxIIDw8IDI0KSB8IChuQml0c1RvdGFsSCA+Pj4gOCkpICAmIDB4ZmYwMGZmMDApXG5cdCAgICAgICAgICAgICk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gKFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEwgPDwgOCkgIHwgKG5CaXRzVG90YWxMID4+PiAyNCkpICYgMHgwMGZmMDBmZikgfFxuXHQgICAgICAgICAgICAgICAgKCgobkJpdHNUb3RhbEwgPDwgMjQpIHwgKG5CaXRzVG90YWxMID4+PiA4KSkgICYgMHhmZjAwZmYwMClcblx0ICAgICAgICAgICAgKTtcblxuXHQgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzID0gKGRhdGFXb3Jkcy5sZW5ndGggKyAxKSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gSGFzaCBmaW5hbCBibG9ja3Ncblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgaGFzaCA9IHRoaXMuX2hhc2g7XG5cdCAgICAgICAgICAgIHZhciBIID0gaGFzaC53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBTd2FwIGVuZGlhblxuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgICAgIHZhciBIX2kgPSBIW2ldO1xuXG5cdCAgICAgICAgICAgICAgICBIW2ldID0gKCgoSF9pIDw8IDgpICB8IChIX2kgPj4+IDI0KSkgJiAweDAwZmYwMGZmKSB8XG5cdCAgICAgICAgICAgICAgICAgICAgICAgKCgoSF9pIDw8IDI0KSB8IChIX2kgPj4+IDgpKSAgJiAweGZmMDBmZjAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFJldHVybiBmaW5hbCBjb21wdXRlZCBoYXNoXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBIYXNoZXIuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2hhc2ggPSB0aGlzLl9oYXNoLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBmdW5jdGlvbiBGRihhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKChiICYgYykgfCAofmIgJiBkKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBHRyhhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKChiICYgZCkgfCAoYyAmIH5kKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBISChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICBmdW5jdGlvbiBJSShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG5cdCAgICAgICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyB4ICsgdDtcblx0ICAgICAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xuXHQgICAgfVxuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBoYXNoZXIncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuTUQ1KCdtZXNzYWdlJyk7XG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5NRDUod29yZEFycmF5KTtcblx0ICAgICAqL1xuXHQgICAgQy5NRDUgPSBIYXNoZXIuX2NyZWF0ZUhlbHBlcihNRDUpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIFNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30ga2V5IFRoZSBzZWNyZXQga2V5LlxuXHQgICAgICpcblx0ICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIEhNQUMuXG5cdCAgICAgKlxuXHQgICAgICogQHN0YXRpY1xuXHQgICAgICpcblx0ICAgICAqIEBleGFtcGxlXG5cdCAgICAgKlxuXHQgICAgICogICAgIHZhciBobWFjID0gQ3J5cHRvSlMuSG1hY01ENShtZXNzYWdlLCBrZXkpO1xuXHQgICAgICovXG5cdCAgICBDLkhtYWNNRDUgPSBIYXNoZXIuX2NyZWF0ZUhtYWNIZWxwZXIoTUQ1KTtcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlMuTUQ1O1xuXG59KSk7IiwiaW1wb3J0IHtcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBEcmF3ZXJDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxuICBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSwgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBpbWFnZUNhY2hlSGVscGVyIGZyb20gJy4vaGVscGVycy9pbWFnZS1jYWNoZS1oZWxwZXInO1xuaW1wb3J0IHsgaXNQb3NpdGlvbmFsIH0gZnJvbSAnLi9oZWxwZXJzL3R5cGUtaGVscGVycyc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuL3N0cnVjdHMvdmVjdG9yJztcbmltcG9ydCBHcmlkRmlsdGVyIGZyb20gJy4vc3RydWN0cy9maWx0ZXJzL2dyaWQtZmlsdGVyJztcbmltcG9ydCBQb3NpdGlvbmFsQ29udGV4dCBmcm9tICcuL3N0cnVjdHMvZHJhd2FibGUvcG9zaXRpb25hbC1jb250ZXh0JztcblxuLyoqXG4gKiBDYW52YXMgZHJhd2VyXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdlciBpbXBsZW1lbnRzIERyYXdlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdlcic7XG4gIC8qKlxuICAgKiBDYW52YXMgRE9NIGVsZW1lbnRcbiAgICovXG4gIHByb3RlY3RlZCBfZG9tRWxlbWVudDogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF92aWV3Q29uZmlnOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZTtcbiAgLyoqXG4gICAqIERyYXdhYmxlIG9iamVjdHMgc3RvcmFnZVxuICAgKi9cbiAgcHJvdGVjdGVkIF9zdG9yYWdlOiBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2U7XG4gIC8qKlxuICAgKiBDYW52YXMgZHJhd2luZyBjb250ZXh0XG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgLyoqXG4gICAqIFJlc2l6ZSBvYnNlcnZlciBvYmplY3RcbiAgICovXG4gIHByb3RlY3RlZCBfcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyO1xuXG4gIC8qKlxuICAgKiBEcmF3ZXIgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGRvbUVsZW1lbnQgLSBjYW52YXMgRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIHZpZXdDb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gc3RvcmFnZSAtIGRyYXdhYmxlIG9iamVjdHMgc3RvcmFnZVxuICAgKi9cbiAgY29uc3RydWN0b3Ioe1xuICAgIGRvbUVsZW1lbnQsXG4gICAgdmlld0NvbmZpZyxcbiAgICBzdG9yYWdlLFxuICB9OiBEcmF3ZXJDb25maWdJbnRlcmZhY2UpIHtcbiAgICB0aGlzLl9kb21FbGVtZW50ID0gZG9tRWxlbWVudDtcbiAgICB0aGlzLl92aWV3Q29uZmlnID0gdmlld0NvbmZpZztcbiAgICB0aGlzLl9zdG9yYWdlID0gc3RvcmFnZTtcbiAgICB0aGlzLl9jb250ZXh0ID0gZG9tRWxlbWVudC5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgdGhpcy5faW5pdFJlc2l6ZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdFZpZXdDb25maWdPYnNlcnZlcigpO1xuICAgIHRoaXMuX2luaXRTdG9yYWdlT2JzZXJ2ZXIoKTtcbiAgICB0aGlzLl9pbml0SW1hZ2VDYWNoZU9ic2VydmVyKCk7XG4gICAgdGhpcy5faW5pdE1vdXNlRXZlbnRzKCk7XG5cbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdygpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLl9jb250ZXh0LnRyYW5zbGF0ZSguLi50aGlzLl92aWV3Q29uZmlnLm9mZnNldCk7XG4gICAgdGhpcy5fY29udGV4dC5zY2FsZSguLi50aGlzLl92aWV3Q29uZmlnLnNjYWxlKTtcbiAgICB0aGlzLl9zdG9yYWdlLmxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uY29uZmlnLnZpc2libGUpIHtcbiAgICAgICAgaXRlbS5kcmF3KHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2NvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3ZXJJbnRlcmZhY2UucmVmcmVzaH1cbiAgICovXG4gIHB1YmxpYyByZWZyZXNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kb21FbGVtZW50LndpZHRoICE9PSB0aGlzLndpZHRoKSB7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LndpZHRoID0gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZG9tRWxlbWVudC5oZWlnaHQgIT09IHRoaXMuaGVpZ2h0KSB7XG4gICAgICB0aGlzLl9kb21FbGVtZW50LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdyZWZyZXNoZWQnKTtcblxuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2VySW50ZXJmYWNlLmNsZWFyfVxuICAgKi9cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJvdW5kcyBvZiBjYW52YXMgZnJhbWVcbiAgICovXG4gIHB1YmxpYyBnZXRCb3VuZHMoKTogW1ZlY3RvckFycmF5VHlwZSwgVmVjdG9yQXJyYXlUeXBlXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuX3ZpZXdDb25maWcudHJhbnNwb3NlRm9yd2FyZChbMCwgMF0pLFxuICAgICAgdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKFt0aGlzLndpZHRoLCB0aGlzLmhlaWdodF0pLFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBnZXQgdmlld0NvbmZpZygpOiBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogQ2FudmFzIGNvbnRleHQgZ2V0dGVyXG4gICAqL1xuICBnZXQgY29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyB3aWR0aCBnZXR0ZXJcbiAgICovXG4gIGdldCB3aWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbnZhcyBoZWlnaHQgZ2V0dGVyXG4gICAqL1xuICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBjYW52YXMgcmVzaXplIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRSZXNpemVPYnNlcnZlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLnJlZnJlc2goKSk7XG4gICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9kb21FbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdmlldyBjb25maWcgb2JzZXJ2ZXJcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdFZpZXdDb25maWdPYnNlcnZlcigpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3Q29uZmlnLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKCkgPT4gdGhpcy5yZWZyZXNoKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBzdG9yYWdlIG9ic2VydmVyXG4gICAqL1xuICBwcm90ZWN0ZWQgX2luaXRTdG9yYWdlT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmFnZS5vblZpZXdDaGFuZ2UodGhpcy5fc3Vic2NyaWJlck5hbWUsICgpID0+IHRoaXMucmVmcmVzaCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgaW1hZ2UgY2FjaGUgb2JzZXJ2ZXJcbiAgICovXG4gIHByb3RlY3RlZCBfaW5pdEltYWdlQ2FjaGVPYnNlcnZlcigpOiB2b2lkIHtcbiAgICBpbWFnZUNhY2hlSGVscGVyLnN1YnNjcmliZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKCkgPT4ge1xuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIG1vdXNlIGV2ZW50cyBvYnNlcnZlclxuICAgKi9cbiAgcHJvdGVjdGVkIF9pbml0TW91c2VFdmVudHMoKTogdm9pZCB7XG4gICAgLy8gVE9ETyDQv9C10YDQtdC90LXRgdGC0Lgg0LrRg9C00LAt0L3QuNCx0YPQtNGMXG5cbiAgICBjb25zdCBjb29yZHNGaWx0ZXIgPSBuZXcgR3JpZEZpbHRlcigpO1xuICAgIGNvbnN0IGZpbHRlckNvb3JkcyA9IChjb29yZHM6IFZlY3RvckFycmF5VHlwZSkgPT4ge1xuICAgICAgLy8gVE9ETyB0b0NvbmZpZz8/P1xuICAgICAgcmV0dXJuIGNvb3Jkc0ZpbHRlci5wcm9jZXNzKGNvb3Jkcywge1xuICAgICAgICBzY2FsZTogdGhpcy5fdmlld0NvbmZpZy5zY2FsZSxcbiAgICAgICAgb2Zmc2V0OiB0aGlzLl92aWV3Q29uZmlnLm9mZnNldCxcbiAgICAgICAgZ3JpZFN0ZXA6IHRoaXMuX3ZpZXdDb25maWcuZ3JpZFN0ZXAsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnRFbGVtZW50Q29udGV4dDogUG9zaXRpb25hbENvbnRleHQgPSBuZXcgUG9zaXRpb25hbENvbnRleHQobnVsbCwgbnVsbCk7XG5cbiAgICBjb25zdCBERVZJQVRJT04gPSA4O1xuICAgIGNvbnN0IGdldE5lYXJCb3VuZEVsZW1lbnQgPSAoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UgfCBudWxsID0+IHtcbiAgICAgIC8vIFRPRE8g0L/RgNC+0LHQu9C10LzQsCwg0LrQvtCz0LTQsCDQvdCwINGE0LjQs9GD0YDRgyDQvdCw0LrQu9Cw0LTRi9Cy0LDQtdGC0YHRjyDQtNGA0YPQs9Cw0Y8g0YTQuNCz0YPRgNCwXG4gICAgICBjb25zdCB0cmFuc3Bvc2VkQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQoY29vcmRzKTtcblxuICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX3N0b3JhZ2UubGlzdDtcbiAgICAgIGZvciAobGV0IGk9bGlzdC5sZW5ndGgtMTsgaT49MDsgLS1pKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAvLyBUT0RPIG1heWJlIG9ubHkgdmlzaWJsZT9cbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzUG9zaXRpb25hbChpdGVtKVxuICAgICAgICAgICYmIChpdGVtIGFzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSlcbiAgICAgICAgICAgIC5pc05lYXJCb3VuZEVkZ2UodHJhbnNwb3NlZENvb3JkcywgREVWSUFUSU9OIC8gdGhpcy5fdmlld0NvbmZpZy5zY2FsZVswXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIChpdGVtIGFzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5jdHJsS2V5KSB7XG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuX3ZpZXdDb25maWcuc2NhbGVbMF07XG4gICAgICAgIHNjYWxlICs9IGV2ZW50LmRlbHRhWSAqIC0wLjAwMjtcbiAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihNYXRoLm1heCgwLjAwMSwgc2NhbGUpLCAxMDApO1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLnVwZGF0ZVNjYWxlSW5DdXJzb3JDb250ZXh0KFtzY2FsZSwgc2NhbGVdLCBbZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WV0pO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFswXSAtPSBldmVudC5kZWx0YVk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl92aWV3Q29uZmlnLm9mZnNldFsxXSAtPSBldmVudC5kZWx0YVk7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBsZXQgbW91c2VEb3duQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUgfCBudWxsID0gbnVsbDtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBpZiAoY3VycmVudEVsZW1lbnRDb250ZXh0LmlzRW1wdHkoKSkge1xuICAgICAgICBjb25zdCB0cmFuc3Bvc2VkQ29vcmRzID0gdGhpcy5fdmlld0NvbmZpZy50cmFuc3Bvc2VGb3J3YXJkKFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXSk7XG4gICAgICAgIGN1cnJlbnRFbGVtZW50Q29udGV4dCA9IHRoaXMuX3N0b3JhZ2UuZmluZEJ5UG9zaXRpb24odHJhbnNwb3NlZENvb3Jkcyk7XG4gICAgICB9XG5cbiAgICAgIG1vdXNlRG93bkNvb3JkcyA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2dyYWJiaW5nJztcbiAgICB9KTtcblxuICAgIHRoaXMuX2RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBtb3VzZU1vdmVDb29yZHM6IFZlY3RvckFycmF5VHlwZSA9IFtldmVudC5vZmZzZXRYLCBldmVudC5vZmZzZXRZXTtcbiAgICAgIGNvbnN0IHRyYW5zcG9zZWRDb29yZHMgPSB0aGlzLl92aWV3Q29uZmlnLnRyYW5zcG9zZUZvcndhcmQobW91c2VNb3ZlQ29vcmRzKTtcblxuICAgICAgaWYgKG1vdXNlRG93bkNvb3JkcyA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZ2V0TmVhckJvdW5kRWxlbWVudChtb3VzZU1vdmVDb29yZHMpICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fZG9tRWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fc3RvcmFnZS5maW5kQnlQb3NpdGlvbih0cmFuc3Bvc2VkQ29vcmRzKS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9kb21FbGVtZW50LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjdXJyZW50RWxlbWVudENvbnRleHQuaXNFbXB0eSgpKSB7XG4gICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gY3JlYXRlVmVjdG9yKHRyYW5zcG9zZWRDb29yZHMpXG4gICAgICAgICAgLnN1YihjcmVhdGVWZWN0b3IoY3VycmVudEVsZW1lbnRDb250ZXh0LnBvc2l0aW9uKSlcbiAgICAgICAgICAudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBuZXdQb3NpdGlvbkZpbHRlcmVkID0gZmlsdGVyQ29vcmRzKG5ld1Bvc2l0aW9uKTtcblxuICAgICAgICBpZiAoIWNyZWF0ZVZlY3RvcihuZXdQb3NpdGlvbkZpbHRlcmVkKS5pc0VxdWFsKGNyZWF0ZVZlY3RvcihjdXJyZW50RWxlbWVudENvbnRleHQuZWxlbWVudC5jb25maWcucG9zaXRpb24pKSkge1xuICAgICAgICAgIGN1cnJlbnRFbGVtZW50Q29udGV4dC5lbGVtZW50LmNvbmZpZy5wb3NpdGlvbiA9IGZpbHRlckNvb3JkcyhuZXdQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2U6IFZlY3RvckFycmF5VHlwZSA9IFtcbiAgICAgICAgICBtb3VzZURvd25Db29yZHNbMF0tbW91c2VNb3ZlQ29vcmRzWzBdLFxuICAgICAgICAgIG1vdXNlRG93bkNvb3Jkc1sxXS1tb3VzZU1vdmVDb29yZHNbMV0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fdmlld0NvbmZpZy5vZmZzZXQgPSBjcmVhdGVWZWN0b3IodGhpcy5fdmlld0NvbmZpZy5vZmZzZXQpXG4gICAgICAgICAgLnN1YihjcmVhdGVWZWN0b3IoZGlmZmVyZW5jZSkpXG4gICAgICAgICAgLnRvQXJyYXkoKTtcbiAgICAgIH1cblxuICAgICAgbW91c2VEb3duQ29vcmRzID0gbW91c2VNb3ZlQ29vcmRzO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgaWYgKCFjdXJyZW50RWxlbWVudENvbnRleHQuaXNFbXB0eSgpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRFbGVtZW50Q29udGV4dC5lbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudEVsZW1lbnRDb250ZXh0ID0gbmV3IFBvc2l0aW9uYWxDb250ZXh0KG51bGwsIG51bGwpO1xuICAgICAgbW91c2VEb3duQ29vcmRzID0gbnVsbDtcbiAgICAgIHRoaXMuX2RvbUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBEcmF3YWJsZSBmcm9tICcuLi9zdHJ1Y3RzL2RyYXdhYmxlL2RyYXdhYmxlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiBncmlkXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3JpZENvbmZpZ0ludGVyZmFjZSBleHRlbmRzIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgbWFpbkxpbmVDb2xvcjogc3RyaW5nO1xuICBzdWJMaW5lQ29sb3I6IHN0cmluZztcbiAgbGluZVdpZHRoOiBudW1iZXI7XG4gIGxpbmVzSW5CbG9jazogbnVtYmVyO1xufVxuXG4vKipcbiAqIEdyaWQgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQgZXh0ZW5kcyBEcmF3YWJsZSBpbXBsZW1lbnRzIERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIE9iamVjdCB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX3R5cGU6IHN0cmluZyA9ICdHcmlkJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogR3JpZENvbmZpZ0ludGVyZmFjZTtcblxuICAvKipcbiAgICogR3JpZCBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIGNvbnN0cnVjdG9yKGlkOiBEcmF3YWJsZUlkVHlwZSwgY29uZmlnOiBHcmlkQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuc2F2ZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXG4gICAgY29uc3QgW2Zyb21Cb3VuZCwgdG9Cb3VuZF0gPSBkcmF3ZXIuZ2V0Qm91bmRzKCk7XG4gICAgY29uc3Qgc2NhbGUgPSBkcmF3ZXIudmlld0NvbmZpZy5zY2FsZVswXTtcblxuICAgIGRyYXdlci5jb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuX2NvbmZpZy5saW5lV2lkdGggLyBzY2FsZTtcblxuICAgIGxldCBzdGVwID0gZHJhd2VyLnZpZXdDb25maWcuZ3JpZFN0ZXA7XG5cbiAgICBpZiAoc2NhbGUgPCAxKSB7XG4gICAgICBzdGVwICo9IDIgKiogTWF0aC5yb3VuZChNYXRoLmxvZzIoMSAvIHNjYWxlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ZXAgLz0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMihzY2FsZSkpO1xuICAgIH1cblxuICAgIGNvbnN0IG1haW5MaW5lRGlzdGFuY2UgPSBzdGVwICogdGhpcy5fY29uZmlnLmxpbmVzSW5CbG9jaztcbiAgICBsZXQgeEdhcCA9IChmcm9tQm91bmRbMF0gJSBtYWluTGluZURpc3RhbmNlKTtcbiAgICBpZiAoeEdhcCA8IDApIHtcbiAgICAgIHhHYXAgKz0gbWFpbkxpbmVEaXN0YW5jZTtcbiAgICB9XG4gICAgbGV0IHlHYXAgPSAoZnJvbUJvdW5kWzFdICUgbWFpbkxpbmVEaXN0YW5jZSk7XG4gICAgaWYgKHlHYXAgPCAwKSB7XG4gICAgICB5R2FwICs9IG1haW5MaW5lRGlzdGFuY2U7XG4gICAgfVxuXG4gICAge1xuICAgICAgbGV0IGogPSAwO1xuICAgICAgZm9yIChsZXQgaT1mcm9tQm91bmRbMV0teUdhcDsgaTw9dG9Cb3VuZFsxXTsgaSs9c3RlcCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IChqKysgJSB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrID09PSAwKVxuICAgICAgICAgID8gdGhpcy5fY29uZmlnLm1haW5MaW5lQ29sb3JcbiAgICAgICAgICA6IHRoaXMuX2NvbmZpZy5zdWJMaW5lQ29sb3I7XG4gICAgICAgIHRoaXMuX2RyYXdIb3Jpem9udGFsTGluZShpLCBkcmF3ZXIsIGNvbG9yLCBbZnJvbUJvdW5kLCB0b0JvdW5kXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAge1xuICAgICAgbGV0IGogPSAwO1xuICAgICAgZm9yIChsZXQgaT1mcm9tQm91bmRbMF0teEdhcDsgaTw9dG9Cb3VuZFswXTsgaSs9c3RlcCkge1xuICAgICAgICBjb25zdCBjb2xvciA9IChqKysgJSB0aGlzLl9jb25maWcubGluZXNJbkJsb2NrID09PSAwKVxuICAgICAgICAgID8gdGhpcy5fY29uZmlnLm1haW5MaW5lQ29sb3JcbiAgICAgICAgICA6IHRoaXMuX2NvbmZpZy5zdWJMaW5lQ29sb3I7XG4gICAgICAgIHRoaXMuX2RyYXdWZXJ0aWNhbExpbmUoaSwgZHJhd2VyLCBjb2xvciwgW2Zyb21Cb3VuZCwgdG9Cb3VuZF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGhvcml6b250YWwgbGluZVxuICAgKiBAcGFyYW0geU9mZnNldCAtIHZlcnRpY2FsIG9mZnNldFxuICAgKiBAcGFyYW0gZHJhd2VyIC0gZHJhd2VyIG9iamVjdFxuICAgKiBAcGFyYW0gY29sb3IgLSBjb2xvclxuICAgKiBAcGFyYW0gZnJvbUJvdW5kIC0gbGVmdC10b3AgYm91bmRcbiAgICogQHBhcmFtIHRvQm91bmQgLSByaWdodC1ib3R0b20gYm91bmRcbiAgICovXG4gIHByb3RlY3RlZCBfZHJhd0hvcml6b250YWxMaW5lKFxuICAgIHlPZmZzZXQ6IG51bWJlcixcbiAgICBkcmF3ZXI6IERyYXdlckludGVyZmFjZSxcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIFtmcm9tQm91bmQsIHRvQm91bmRdOiBbVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JBcnJheVR5cGVdLFxuICApIHtcbiAgICBjb25zdCBsaW5lRnJvbSA9IFtmcm9tQm91bmRbMF0sIHlPZmZzZXRdO1xuICAgIGNvbnN0IGxpbmVUbyA9IFt0b0JvdW5kWzBdLCB5T2Zmc2V0XTtcblxuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgZHJhd2VyLmNvbnRleHQubW92ZVRvKGxpbmVGcm9tWzBdLCBsaW5lRnJvbVsxXSk7XG4gICAgZHJhd2VyLmNvbnRleHQubGluZVRvKGxpbmVUb1swXSwgbGluZVRvWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2UoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERyYXcgdmVydGljYWwgbGluZVxuICAgKiBAcGFyYW0gZHJhd2VyIC0gZHJhd2VyIG9iamVjdFxuICAgKiBAcGFyYW0geE9mZnNldCAtIGhvcml6b250YWwgb2Zmc2V0XG4gICAqIEBwYXJhbSBjb2xvciAtIGNvbG9yXG4gICAqIEBwYXJhbSBmcm9tQm91bmQgLSBsZWZ0LXRvcCBib3VuZFxuICAgKiBAcGFyYW0gdG9Cb3VuZCAtIHJpZ2h0LWJvdHRvbSBib3VuZFxuICAgKi9cbiAgcHJvdGVjdGVkIF9kcmF3VmVydGljYWxMaW5lKFxuICAgIHhPZmZzZXQ6IG51bWJlcixcbiAgICBkcmF3ZXI6IERyYXdlckludGVyZmFjZSxcbiAgICBjb2xvcjogc3RyaW5nLFxuICAgIFtmcm9tQm91bmQsIHRvQm91bmRdOiBbVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JBcnJheVR5cGVdLFxuICApIHtcbiAgICBjb25zdCBsaW5lRnJvbSA9IFt4T2Zmc2V0LCBmcm9tQm91bmRbMV1dO1xuICAgIGNvbnN0IGxpbmVUbyA9IFt4T2Zmc2V0LCB0b0JvdW5kWzFdXTtcblxuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgZHJhd2VyLmNvbnRleHQubW92ZVRvKGxpbmVGcm9tWzBdLCBsaW5lRnJvbVsxXSk7XG4gICAgZHJhd2VyLmNvbnRleHQubGluZVRvKGxpbmVUb1swXSwgbGluZVRvWzFdKTtcbiAgICBkcmF3ZXIuY29udGV4dC5zdHJva2UoKTtcbiAgICBkcmF3ZXIuY29udGV4dC5jbG9zZVBhdGgoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgU3R5bGl6ZWREcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGUgZnJvbSAnLi4vc3RydWN0cy9kcmF3YWJsZS9wb3NpdGlvbmFsLWRyYXdhYmxlJztcblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIGNvbmZpZyBvZiByZWN0IGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlY3RDb25maWdJbnRlcmZhY2UgZXh0ZW5kcyBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIFN0eWxpemVkRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuXG59XG5cbi8qKlxuICogUmVjdCBmaWd1cmVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdCBleHRlbmRzIFBvc2l0aW9uYWxEcmF3YWJsZSBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgdHlwZVxuICAgKi9cbiAgcHJvdGVjdGVkIF90eXBlOiBzdHJpbmcgPSAnUmVjdCc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IFJlY3RDb25maWdJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFJlY3QgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpZDogRHJhd2FibGVJZFR5cGUsIGNvbmZpZzogUmVjdENvbmZpZ0ludGVyZmFjZSwgZGF0YTogTGlua2VkRGF0YVR5cGUgPSB7fSkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5kcmF3fVxuICAgKi9cbiAgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGRyYXdlci5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGRyYXdlci5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5fY29uZmlnLnN0cm9rZVN0eWxlO1xuICAgIGRyYXdlci5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2NvbmZpZy5maWxsU3R5bGU7XG4gICAgZHJhd2VyLmNvbnRleHQubGluZVdpZHRoID0gdGhpcy5fY29uZmlnLmxpbmVXaWR0aDtcbiAgICBkcmF3ZXIuY29udGV4dC5maWxsUmVjdCguLi50aGlzLl9jb25maWcucG9zaXRpb24sIC4uLnRoaXMuX2NvbmZpZy5zaXplKTtcblxuICAgIGlmICh0aGlzLl9jb25maWcubGluZVdpZHRoICE9PSAwKSB7XG4gICAgICBkcmF3ZXIuY29udGV4dC5zdHJva2VSZWN0KC4uLnRoaXMuX2NvbmZpZy5wb3NpdGlvbiwgLi4udGhpcy5fY29uZmlnLnNpemUpO1xuICAgIH1cblxuICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdlckludGVyZmFjZSxcbiAgTGlua2VkRGF0YVR5cGUsIFZlY3RvckFycmF5VHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IFBvc2l0aW9uYWxEcmF3YWJsZSBmcm9tICcuLi9zdHJ1Y3RzL2RyYXdhYmxlL3Bvc2l0aW9uYWwtZHJhd2FibGUnO1xuaW1wb3J0IGltYWdlQ2FjaGVIZWxwZXIgZnJvbSAnLi4vaGVscGVycy9pbWFnZS1jYWNoZS1oZWxwZXInO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgY29uZmlnIG9mIHJlY3QgZmlndXJlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3ZnQ29uZmlnSW50ZXJmYWNlIGV4dGVuZHMgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIFNWRyBkYXRhXG4gICAqL1xuICBkYXRhOiBzdHJpbmc7XG59XG5cbi8qKlxuICogU3ZnIGZpZ3VyZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdmcgZXh0ZW5kcyBQb3NpdGlvbmFsRHJhd2FibGUgaW1wbGVtZW50cyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nID0gJ1N2Zyc7XG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9jb25maWc6IFN2Z0NvbmZpZ0ludGVyZmFjZTtcbiAgLyoqXG4gICAqIEltYWdlIERPTSBlbGVtZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgX2ltZzogSFRNTEltYWdlRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBTdmcgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSB2aWV3IGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGxpbmtlZCBleHRyYSBkYXRhXG4gICAqL1xuICBjb25zdHJ1Y3RvcihpZDogRHJhd2FibGVJZFR5cGUsIGNvbmZpZzogU3ZnQ29uZmlnSW50ZXJmYWNlLCBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9KSB7XG4gICAgc3VwZXIoaWQsIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdHJ5RHJhdyhkcmF3ZXIpKSB7XG4gICAgICB0aGlzLl9pbWcgPSBpbWFnZUNhY2hlSGVscGVyLmNhY2hlKHRoaXMuX2NvbmZpZy5kYXRhLCAnaW1hZ2Uvc3ZnK3htbCcsIChpbWcpID0+IHtcbiAgICAgICAgdGhpcy5faW1nID0gaW1nO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl90cnlEcmF3KGRyYXdlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNvdXJjZVdpZHRoIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBzb3VyY2VXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbWcud2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogc291cmNlSGVpZ2h0IGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBzb3VyY2VIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faW1nLmhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBzY2FsZSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgc2NhbGUoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gW1xuICAgICAgdGhpcy5fY29uZmlnLnNpemVbMF0gLyB0aGlzLnNvdXJjZVdpZHRoLFxuICAgICAgdGhpcy5fY29uZmlnLnNpemVbMV0gLyB0aGlzLnNvdXJjZUhlaWdodCxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIGRyYXcgdGhlIGZpZ3VyZSBpZiB0aGUgaW1hZ2UgaXMgcmVhZHlcbiAgICogQHBhcmFtIGRyYXdlciAtIGRyYXdlciBvYmplY3RcbiAgICovXG4gIHByb3RlY3RlZCBfdHJ5RHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9pbWcgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5fY29uZmlnLnBvc2l0aW9uO1xuICAgICAgY29uc3Qgc2NhbGVkUG9zaXRpb246IFZlY3RvckFycmF5VHlwZSA9IFtwb3NpdGlvblswXS9zY2FsZVswXSwgcG9zaXRpb25bMV0vc2NhbGVbMV1dO1xuXG4gICAgICBkcmF3ZXIuY29udGV4dC5zYXZlKCk7XG4gICAgICBkcmF3ZXIuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LnNjYWxlKC4uLnNjYWxlKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLl9pbWcsIC4uLnNjYWxlZFBvc2l0aW9uKTtcbiAgICAgIGRyYXdlci5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgZHJhd2VyLmNvbnRleHQucmVzdG9yZSgpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7IGRlZmF1bHQgYXMgbWQ1IH0gZnJvbSAnY3J5cHRvLWpzL21kNSc7XG5pbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFycmF5cyBhcmUgZXF1YWwgYW5kIGZhbHNlIGVsc2VcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSBsaHMgLSBmaXJzdCBhcnJheSB0byBjb21wYXJlXG4gKiBAcGFyYW0gcmhzIC0gc2Vjb25kIGFycmF5IHRvIGNvbXBhcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFyZUFycmF5c0VxdWFsKGxoczogQXJyYXk8dW5rbm93bj4sIHJoczogQXJyYXk8dW5rbm93bj4pOiBib29sZWFuIHtcbiAgcmV0dXJuIGxocy5sZW5ndGggPT09IHJocy5sZW5ndGggJiYgbGhzLmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSByaHNbaV0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgRE9NIGVsZW1lbnQgZnJvbSBIVE1MIHN0cmluZ1xuICogQHB1YmxpY1xuICogQHBhcmFtIGh0bWxTdHJpbmcgLSBIVE1MIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudEZyb21IVE1MKGh0bWxTdHJpbmc6IHN0cmluZyk6IHVua25vd24ge1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LmlubmVySFRNTCA9IGh0bWxTdHJpbmcudHJpbSgpO1xuXG4gIHJldHVybiBkaXYuZmlyc3RDaGlsZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGJsb2IgZnJvbSB0ZXh0XG4gKiBAcHVibGljXG4gKiBAcGFyYW0gZGF0YSAtIHRleHRcbiAqIEBwYXJhbSB0eXBlIC0gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmxvYihkYXRhOiBzdHJpbmcsIHR5cGU6IHN0cmluZyk6IEJsb2Ige1xuICByZXR1cm4gbmV3IEJsb2IoW2RhdGFdLCB7IHR5cGUgfSk7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIGZvciB1bmRlcnN0YW5kaW5nIG1ldGhvZCBjcmVhdGVPYmplY3RVUkwoKVxuICovXG5pbnRlcmZhY2UgVXJsSW50ZXJmYWNlIHtcbiAgY3JlYXRlT2JqZWN0VVJMKGJsb2I6IEJsb2IpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBVUkwgZnJvbSBibG9iXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gYmxvYiAtIGJsb2JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVybEZyb21CbG9iKGJsb2I6IEJsb2IpOiBzdHJpbmcge1xuICBjb25zdCBVUkw6IFVybEludGVyZmFjZSA9ICh3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93KSBhcyBVcmxJbnRlcmZhY2U7XG4gIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xufVxuXG4vKipcbiAqIEZpbmRzIGFuZCByZXR1cm5zIG1pbmltYWwgKGxlZnQtdG9wKSBwb3NpdGlvblxuICogQHB1YmxpY1xuICogQHBhcmFtIHBvc2l0aW9ucyAtIGlucHV0IHBvc2l0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWluUG9zaXRpb24ocG9zaXRpb25zOiBWZWN0b3JBcnJheVR5cGVbXSk6IFZlY3RvckFycmF5VHlwZSB7XG4gIGxldCBtaW5YOiBudW1iZXIgPSBJbmZpbml0eTtcbiAgbGV0IG1pblk6IG51bWJlciA9IEluZmluaXR5O1xuXG4gIHBvc2l0aW9ucy5mb3JFYWNoKChwb3NpdGlvbikgPT4ge1xuICAgIGlmIChwb3NpdGlvblswXSA8IG1pblgpIHtcbiAgICAgIG1pblggPSBwb3NpdGlvblswXTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uWzFdIDwgbWluWSkge1xuICAgICAgbWluWSA9IHBvc2l0aW9uWzFdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFttaW5YLCBtaW5ZXTtcbn1cblxuLyoqXG4gKiBGaW5kcyBhbmQgcmV0dXJucyBtYXhpbWFsIChyaWdodC1ib3R0b20pIHBvc2l0aW9uXG4gKiBAcHVibGljXG4gKiBAcGFyYW0gcG9zaXRpb25zIC0gaW5wdXQgcG9zaXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXhQb3NpdGlvbihwb3NpdGlvbnM6IFZlY3RvckFycmF5VHlwZVtdKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgbGV0IG1heFg6IG51bWJlciA9IC1JbmZpbml0eTtcbiAgbGV0IG1heFk6IG51bWJlciA9IC1JbmZpbml0eTtcblxuICBwb3NpdGlvbnMuZm9yRWFjaCgocG9zaXRpb24pID0+IHtcbiAgICBpZiAocG9zaXRpb25bMF0gPiBtYXhYKSB7XG4gICAgICBtYXhYID0gcG9zaXRpb25bMF07XG4gICAgfVxuICAgIGlmIChwb3NpdGlvblsxXSA+IG1heFkpIHtcbiAgICAgIG1heFkgPSBwb3NpdGlvblsxXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBbbWF4WCwgbWF4WV07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBNRDUgaGFzaCBmcm9tIHN0cmluZ1xuICogQHB1YmxpY1xuICogQHBhcmFtIGlucHV0IC0gaW5wdXQgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNoU3RyaW5nKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gbWQ1KGlucHV0KS50b1N0cmluZygpO1xufVxuIiwiaW1wb3J0IEltYWdlQ2FjaGUgZnJvbSAnLi4vc3RydWN0cy9pbWFnZS1jYWNoZSc7XG5cbi8qKlxuICogSW1hZ2UgY2FjaGUgaGVscGVyXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IG5ldyBJbWFnZUNhY2hlKCk7XG4iLCJpbXBvcnQgeyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLCBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG4vKipcbiAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNlcnZlSGVscGVyIGltcGxlbWVudHMgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBIYW5kbGVycyBtYXBwZWQgYnkgc3Vic2NyaWJlcnNcbiAgICovXG4gIHByb3RlY3RlZCBfaGFuZGxlck1hcDogUmVjb3JkPHN0cmluZywgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZT4gPSB7fTtcbiAgLyoqXG4gICAqIEZsYWcgZm9yIG11dGluZyBoYW5kbGVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9tdXRlSGFuZGxlcnM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uub25DaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25DaGFuZ2UoXG4gICAgc3Vic2NyaWJlck5hbWU6IHN0cmluZyxcbiAgICBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9oYW5kbGVyTWFwW3N1YnNjcmliZXJOYW1lXSA9IGhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uub2ZmQ2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZkNoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgZGVsZXRlIHRoaXMuX2hhbmRsZXJNYXBbc3Vic2NyaWJlck5hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBPYnNlcnZlSGVscGVySW50ZXJmYWNlLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzfVxuICAgKi9cbiAgcHVibGljIHByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKFxuICAgIGV4dHJhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPSBudWxsLFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbikgPT4gdGhpcy5wcm9jZXNzSGFuZGxlcnMobXV0ZWRCZWZvcmUsIGV4dHJhKSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2Uud2l0aE11dGVIYW5kbGVyc31cbiAgICovXG4gIHB1YmxpYyB3aXRoTXV0ZUhhbmRsZXJzKFxuICAgIGFjdGlvbjogKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB2b2lkLFxuICApOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fbXV0ZUhhbmRsZXJzKSB7XG4gICAgICBhY3Rpb24odHJ1ZSwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX211dGVIYW5kbGVycyA9IHRydWU7XG4gICAgICBhY3Rpb24oZmFsc2UsIHRoaXMpO1xuICAgICAgdGhpcy5fbXV0ZUhhbmRsZXJzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIE9ic2VydmVIZWxwZXJJbnRlcmZhY2UucHJvY2Vzc0hhbmRsZXJzfVxuICAgKi9cbiAgcHVibGljIHByb2Nlc3NIYW5kbGVycyhcbiAgICBpc011dGVkOiBib29sZWFuLFxuICAgIGV4dHJhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPSBudWxsLFxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIWlzTXV0ZWQpIHtcbiAgICAgIE9iamVjdC52YWx1ZXModGhpcy5faGFuZGxlck1hcClcbiAgICAgICAgLmZvckVhY2goKGhhbmRsZXIpID0+IGhhbmRsZXIodGhpcywgZXh0cmEpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRHJhd2FibGVJbnRlcmZhY2UgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGl0ZW0gaXMgaW5zdGFuY2Ugb2YgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlXG4gKiBAc2VlIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVxuICogQHBhcmFtIGl0ZW0gLSBpdGVtIHRvIGNoZWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Bvc2l0aW9uYWwoaXRlbTogRHJhd2FibGVJbnRlcmZhY2UpOiBib29sZWFuIHtcbiAgcmV0dXJuICdpc1Bvc2l0aW9uYWwnIGluIGl0ZW07XG59XG4iLCJpbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBCb3VuZEludGVyZmFjZSwgUmVjdGFuZ3VsYXJCb3VuZENvbmZpZyB9IGZyb20gJy4uLy4uL3R5cGVzL2JvdW5kJztcbmltcG9ydCB7IGNyZWF0ZVBvbHlnb25WZWN0b3JzIH0gZnJvbSAnLi4vdmVjdG9yJztcblxuLyoqXG4gKiBSZWN0YW5ndWxhckJvdW5kIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3Rhbmd1bGFyQm91bmQgaW1wbGVtZW50cyBCb3VuZEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBCb3VuZCBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBSZWN0YW5ndWxhckJvdW5kQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBSZWN0YW5ndWxhckJvdW5kIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb25maWcgLSBib3VuZCBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUmVjdGFuZ3VsYXJCb3VuZENvbmZpZykge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQm91bmRJbnRlcmZhY2UuaW5jbHVkZXN9XG4gICAqL1xuICBpbmNsdWRlcyhjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjb29yZHNbMF0gPj0gdGhpcy5fY29uZmlnLnBvc2l0aW9uWzBdXG4gICAgICAmJiBjb29yZHNbMF0gPD0gdGhpcy5fY29uZmlnLnBvc2l0aW9uWzBdICsgdGhpcy5fY29uZmlnLnNpemVbMF1cbiAgICAgICYmIGNvb3Jkc1sxXSA+PSB0aGlzLl9jb25maWcucG9zaXRpb25bMV1cbiAgICAgICYmIGNvb3Jkc1sxXSA8PSB0aGlzLl9jb25maWcucG9zaXRpb25bMV0gKyB0aGlzLl9jb25maWcuc2l6ZVsxXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgQm91bmRJbnRlcmZhY2UuaXNOZWFyRWRnZX1cbiAgICovXG4gIGlzTmVhckVkZ2UoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmVjdG9ycyA9IGNyZWF0ZVBvbHlnb25WZWN0b3JzKFtcbiAgICAgIFt0aGlzLl9jb25maWcucG9zaXRpb25bMF0sIHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXV0sXG4gICAgICBbdGhpcy5fY29uZmlnLnBvc2l0aW9uWzBdICsgdGhpcy5fY29uZmlnLnNpemVbMF0sIHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXV0sXG4gICAgICBbdGhpcy5fY29uZmlnLnBvc2l0aW9uWzBdICsgdGhpcy5fY29uZmlnLnNpemVbMF0sIHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXSArIHRoaXMuX2NvbmZpZy5zaXplWzFdXSxcbiAgICAgIFt0aGlzLl9jb25maWcucG9zaXRpb25bMF0sIHRoaXMuX2NvbmZpZy5wb3NpdGlvblsxXSArIHRoaXMuX2NvbmZpZy5zaXplWzFdXSxcbiAgICBdKTtcblxuICAgIGZvciAoY29uc3QgdmVjdG9yIG9mIHZlY3RvcnMpIHtcbiAgICAgIGlmICh2ZWN0b3IuZ2V0RGlzdGFuY2VWZWN0b3IoY29vcmRzKS5sZW5ndGggPD0gZGV2aWF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYXdhYmxlR3JvdXBJbnRlcmZhY2UsXG4gIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUludGVyZmFjZSxcbiAgRHJhd2FibGVJZFR5cGUsXG4gIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gJy4uL2RyYXdhYmxlL2RyYXdhYmxlJztcbmltcG9ydCBEcmF3YWJsZVN0b3JhZ2UgZnJvbSAnLi4vZHJhd2FibGUvZHJhd2FibGUtc3RvcmFnZSc7XG5cbi8qKlxuICogRHJhd2FibGUgZ3JvdXAgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2FibGVHcm91cCBleHRlbmRzIERyYXdhYmxlIGltcGxlbWVudHMgRHJhd2FibGVHcm91cEludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdhYmxlR3JvdXAnO1xuICAvKipcbiAgICogU3RvcmFnZSBvZiB0aGUgY2hpbGRyZW4gb2JqZWN0c1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdG9yYWdlOiBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIERyYXdhYmxlR3JvdXAgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGlkIC0gZ3JvdXAgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIGNvbmZpZ1xuICAgKiBAcGFyYW0gZGF0YSAtIGV4dHJhIGRhdGFcbiAgICogQHBhcmFtIGNoaWxkcmVuIC0gY2hpbGRyZW4gb2YgZ3JvdXBlZCBvYmplY3RzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogRHJhd2FibGVJZFR5cGUsXG4gICAgY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSxcbiAgICBkYXRhOiBMaW5rZWREYXRhVHlwZSA9IHt9LFxuICAgIGNoaWxkcmVuOiBEcmF3YWJsZUludGVyZmFjZVtdID0gW10sXG4gICkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEpO1xuXG4gICAgdGhpcy5fc3RvcmFnZSA9IG5ldyBEcmF3YWJsZVN0b3JhZ2UodGhpcy5fcHJvY2Vzc0NoaWxkcmVuVG9Hcm91cChjaGlsZHJlbikpO1xuICAgIHRoaXMuX3N0b3JhZ2Uub25WaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lLCAodGFyZ2V0LCBleHRyYSkgPT4ge1xuICAgICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyhleHRyYSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JhZ2UubGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5jb25maWcudmlzaWJsZSkge1xuICAgICAgICBpdGVtLmRyYXcoZHJhd2VyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZGVzdHJ1Y3R9XG4gICAqL1xuICBwdWJsaWMgZGVzdHJ1Y3QoKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgdGhpcy5fc3RvcmFnZS5saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ub2ZmVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5fcHJvY2Vzc0NoaWxkcmVuVG9Vbmdyb3VwKHRoaXMuY2hpbGRyZW4pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3QgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLmxpc3Q7XG4gIH1cblxuICAvKipcbiAgICogU29tZSBhY3Rpb25zIHdpdGggY2hpbGRyZW4gYmVmb3JlIGdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NDaGlsZHJlblRvR3JvdXAoY2hpbGRyZW46IERyYXdhYmxlSW50ZXJmYWNlW10pOiBEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogU29tZSBhY3Rpb25zIHdpdGggY2hpbGRyZW4gYmVmb3JlIHVuZ3JvdXBpbmdcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc0NoaWxkcmVuVG9Vbmdyb3VwKGNoaWxkcmVuOiBEcmF3YWJsZUludGVyZmFjZVtdKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UsXG4gIERyYXdhYmxlSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2FibGVTdG9yYWdlRmlsdGVyQ2FsbGJhY2tUeXBlLFxuICBEcmF3YWJsZVN0b3JhZ2VGaWx0ZXJDb25maWdJbnRlcmZhY2UsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSxcbiAgUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlLCBWZWN0b3JBcnJheVR5cGUsIFBvc2l0aW9uYWxDb250ZXh0SW50ZXJmYWNlLFxufSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tICcuLi8uLi9oZWxwZXJzL29ic2VydmUtaGVscGVyJztcbmltcG9ydCBEcmF3YWJsZUdyb3VwIGZyb20gJy4uL2RyYXdhYmxlL2RyYXdhYmxlLWdyb3VwJztcbmltcG9ydCB7IGdldE1heFBvc2l0aW9uLCBnZXRNaW5Qb3NpdGlvbiB9IGZyb20gJy4uLy4uL2hlbHBlcnMvYmFzZSc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuLi92ZWN0b3InO1xuaW1wb3J0IFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwIGZyb20gJy4uL2RyYXdhYmxlL3Bvc2l0aW9uYWwtZHJhd2FibGUtZ3JvdXAnO1xuaW1wb3J0IHsgaXNQb3NpdGlvbmFsIH0gZnJvbSAnLi4vLi4vaGVscGVycy90eXBlLWhlbHBlcnMnO1xuaW1wb3J0IFBvc2l0aW9uYWxDb250ZXh0IGZyb20gJy4vcG9zaXRpb25hbC1jb250ZXh0JztcblxuLyoqXG4gKiBTdG9yYWdlIGZvciBkcmF3YWJsZSBvYmplY3RzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdhYmxlU3RvcmFnZSBpbXBsZW1lbnRzIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ0RyYXdhYmxlU3RvcmFnZSc7XG4gIC8qKlxuICAgKiBMaXN0IG9mIHN0b3JlZCBkcmF3YWJsZSBvYmplY3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgX2xpc3Q6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcbiAgLyoqXG4gICAqIEhlbHBlciBmb3Igb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9vYnNlcnZlSGVscGVyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBEcmF3YWJsZSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaXRlbXMgLSBiYXRjaCBjaGlsZHJlbiB0byBjYWNoZVxuICAgKi9cbiAgY29uc3RydWN0b3IoaXRlbXM6IERyYXdhYmxlSW50ZXJmYWNlW10pIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyID0gbmV3IE9ic2VydmVIZWxwZXIoKTtcbiAgICB0aGlzLmFkZEJhdGNoKGl0ZW1zKTtcbiAgICB0aGlzLl9zb3J0KCk7XG5cbiAgICB0aGlzLm9uVmlld0NoYW5nZSh0aGlzLl9zdWJzY3JpYmVyTmFtZSwgKHRhcmdldCwgZXh0cmEpID0+IHtcbiAgICAgIGlmIChleHRyYSAhPT0gbnVsbCAmJiBleHRyYS5oYXNPd25Qcm9wZXJ0eSgnekluZGV4Q2hhbmdlZCcpICYmIGV4dHJhLnpJbmRleENoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5fc29ydCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlZCBkcmF3YWJsZSBvYmplY3RzIGNoaWxkcmVuIGdldHRlclxuICAgKi9cbiAgZ2V0IGxpc3QoKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3Q7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5jYWNoZX1cbiAgICovXG4gIHB1YmxpYyBhZGQoaXRlbTogRHJhd2FibGVJbnRlcmZhY2UpOiB2b2lkIHtcbiAgICBpdGVtLm9uVmlld0NoYW5nZShcbiAgICAgIHRoaXMuX3N1YnNjcmliZXJOYW1lLFxuICAgICAgKHRhcmdldCwgZXh0cmEpID0+IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoZXh0cmEpLFxuICAgICk7XG4gICAgdGhpcy5fbGlzdC5wdXNoKGl0ZW0pO1xuICAgIHRoaXMuX3NvcnQoKTtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5jYWNoZX1cbiAgICovXG4gIHB1YmxpYyBhZGRCYXRjaChpdGVtczogRHJhd2FibGVJbnRlcmZhY2VbXSk6IHZvaWQge1xuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ub25WaWV3Q2hhbmdlKFxuICAgICAgICB0aGlzLl9zdWJzY3JpYmVyTmFtZSxcbiAgICAgICAgKHRhcmdldCwgZXh0cmEpID0+IHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoZXh0cmEpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuX2xpc3QucHVzaChpdGVtKTtcbiAgICB9KTtcbiAgICB0aGlzLl9zb3J0KCk7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgb2JqZWN0cyBmb3VuZCBieSBjb25maWcgZnJvbSBzdG9yYWdlXG4gICAqIEBwYXJhbSBjb25maWcgLSBmaWx0ZXIgY29uZmlnXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlKGNvbmZpZzogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ29uZmlnSW50ZXJmYWNlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKCkgPT4ge1xuICAgICAgdGhpcy5maW5kKGNvbmZpZykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLmRlbGV0ZUJ5SWQoaXRlbS5pZCkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGVzIG9iamVjdCBieSBJRCBmcm9tIHN0b3JhZ2VcbiAgICogQHBhcmFtIGlkIC0gb2JqZWN0IElEXG4gICAqL1xuICBwdWJsaWMgZGVsZXRlQnlJZChpZDogRHJhd2FibGVJZFR5cGUpOiBEcmF3YWJsZUludGVyZmFjZSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9saXN0LmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaWQpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgY29uc3QgZGVsZXRlZEl0ZW0gPSB0aGlzLl9saXN0LnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICBkZWxldGVkSXRlbS5vZmZWaWV3Q2hhbmdlKHRoaXMuX3N1YnNjcmliZXJOYW1lKTtcbiAgICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgICAgIHJldHVybiBkZWxldGVkSXRlbTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIGN1c3RvbWl6ZSBleGNlcHRpb25cbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBmaW5kIG9iamVjdCB3aXRoIGlkICcke2lkfSdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmNsZWFyfVxuICAgKi9cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fbGlzdC5sZW5ndGggPSAwO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIucHJvY2Vzc1dpdGhNdXRlSGFuZGxlcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmR9XG4gICAqL1xuICBwdWJsaWMgZmluZChjb25maWc6IERyYXdhYmxlU3RvcmFnZUZpbHRlckNvbmZpZ0ludGVyZmFjZSk6IERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9maW5kKChpdGVtKSA9PiB7XG4gICAgICBpZiAoY29uZmlnLmlkc09ubHkgJiYgY29uZmlnLmlkc09ubHkuaW5kZXhPZihpdGVtLmlkKSA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5pZHNFeGNsdWRlICYmIGNvbmZpZy5pZHNFeGNsdWRlLmluZGV4T2YoaXRlbS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbmZpZy50eXBlc09ubHkgJiYgY29uZmlnLnR5cGVzT25seS5pbmRleE9mKGl0ZW0udHlwZSkgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcudHlwZXNFeGNsdWRlICYmIGNvbmZpZy50eXBlc0V4Y2x1ZGUuaW5kZXhPZihpdGVtLnR5cGUpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhKGNvbmZpZy5leHRyYUZpbHRlciAmJiAhY29uZmlnLmV4dHJhRmlsdGVyKGl0ZW0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmRCeUlkfVxuICAgKi9cbiAgcHVibGljIGZpbmRCeUlkKGlkOiBEcmF3YWJsZUlkVHlwZSk6IERyYXdhYmxlSW50ZXJmYWNlIHtcbiAgICBjb25zdCBmb3VuZEl0ZW1zID0gdGhpcy5fZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUuaWQgPT09IGlkKTtcbiAgICBpZiAoZm91bmRJdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmb3VuZEl0ZW1zWzBdO1xuICAgIH1cbiAgICAvLyBUT0RPIGN1c3RvbWl6ZSBleGNlcHRpb25cbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBmaW5kIG9iamVjdCB3aXRoIGlkICcke2lkfSdgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLmZpbmRCeVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIGZpbmRCeVBvc2l0aW9uKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogUG9zaXRpb25hbENvbnRleHRJbnRlcmZhY2Uge1xuICAgIGZvciAobGV0IGk9dGhpcy5fbGlzdC5sZW5ndGgtMTsgaT49MDsgLS1pKSB7XG4gICAgICBjb25zdCBpdGVtOiBEcmF3YWJsZUludGVyZmFjZSA9IHRoaXMuX2xpc3RbaV07XG4gICAgICAvLyBUT0RPIG1heWJlIG9ubHkgdmlzaWJsZT9cbiAgICAgIGlmIChpc1Bvc2l0aW9uYWwoaXRlbSkgJiYgKGl0ZW0gYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlKS5ib3VuZEluY2x1ZGVzKGNvb3JkcykpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IChpdGVtIGFzIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSk7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWxlbWVudC5nZXRSZWxhdGl2ZVBvc2l0aW9uKGNvb3Jkcyk7XG4gICAgICAgIHJldHVybiBuZXcgUG9zaXRpb25hbENvbnRleHQoZWxlbWVudCwgcG9zaXRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUG9zaXRpb25hbENvbnRleHQobnVsbCwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5ncm91cH1cbiAgICovXG4gIHB1YmxpYyBncm91cChpZHM6IERyYXdhYmxlSWRUeXBlW10pOiBEcmF3YWJsZUdyb3VwIHtcbiAgICBjb25zdCBncm91cEl0ZW1zID0gdGhpcy5kZWxldGUoeyBpZHNPbmx5OiBpZHMgfSkgYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW107XG4gICAgY29uc3QgbWluUG9zaXRpb24gPSBnZXRNaW5Qb3NpdGlvbihncm91cEl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5jb25maWcucG9zaXRpb24pKTtcbiAgICBjb25zdCBtYXhQb3NpdGlvbiA9IGdldE1heFBvc2l0aW9uKGdyb3VwSXRlbXMubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gY3JlYXRlVmVjdG9yKGl0ZW0uY29uZmlnLnBvc2l0aW9uKVxuICAgICAgICAuYWRkKGNyZWF0ZVZlY3RvcihpdGVtLmNvbmZpZy5zaXplKSlcbiAgICAgICAgLnRvQXJyYXkoKTtcbiAgICB9KSk7XG4gICAgY29uc3QgZ3JvdXBTaXplID0gY3JlYXRlVmVjdG9yKG1heFBvc2l0aW9uKS5zdWIoY3JlYXRlVmVjdG9yKG1pblBvc2l0aW9uKSkudG9BcnJheSgpO1xuICAgIGNvbnN0IGdyb3VwWkluZGV4ID0gTWF0aC5tYXgoLi4uZ3JvdXBJdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW0uY29uZmlnLnpJbmRleCkpKzE7XG5cbiAgICBjb25zdCBjb25maWc6IFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSA9IHtcbiAgICAgIHBvc2l0aW9uOiBtaW5Qb3NpdGlvbixcbiAgICAgIHNpemU6IGdyb3VwU2l6ZSxcbiAgICAgIHpJbmRleDogZ3JvdXBaSW5kZXgsXG4gICAgICB2aXNpYmxlOiB0cnVlLFxuICAgIH07XG5cbiAgICBjb25zdCBncm91cElkID0gJ2dyb3VwLScrKG5ldyBEYXRlKCkpLmdldFRpbWUoKSsnLScrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMDAwMCk7XG4gICAgY29uc3QgZ3JvdXAgPSBuZXcgUG9zaXRpb25hbERyYXdhYmxlR3JvdXAoZ3JvdXBJZCwgY29uZmlnLCB7fSwgZ3JvdXBJdGVtcyk7XG4gICAgdGhpcy5hZGQoZ3JvdXApO1xuXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2UudW5ncm91cH1cbiAgICovXG4gIHB1YmxpYyB1bmdyb3VwKGdyb3VwSWQ6IERyYXdhYmxlSWRUeXBlKTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXA6IERyYXdhYmxlR3JvdXAgPSB0aGlzLmRlbGV0ZUJ5SWQoZ3JvdXBJZCkgYXMgRHJhd2FibGVHcm91cDtcbiAgICB0aGlzLmFkZEJhdGNoKGdyb3VwLmRlc3RydWN0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZVN0b3JhZ2VJbnRlcmZhY2Uub25WaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9uVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nLCBoYW5kbGVyOiBWaWV3T2JzZXJ2YWJsZUhhbmRsZXJUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vbkNoYW5nZShzdWJzY3JpYmVyTmFtZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlU3RvcmFnZUludGVyZmFjZS5vZmZWaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZlZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIG9iamVjdHMgaW4gc3RvcmFnZSBieSBmaWx0ZXIgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHBhcmFtIGZpbHRlciAtIGZpbHRlciBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIF9maW5kKGZpbHRlcjogRHJhd2FibGVTdG9yYWdlRmlsdGVyQ2FsbGJhY2tUeXBlKTogRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG5cbiAgICB0aGlzLl9saXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChmaWx0ZXIoaXRlbSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBzdG9yZWQgb2JqZWN0cyBieSB6LWluZGV4XG4gICAqL1xuICBwcm90ZWN0ZWQgX3NvcnQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ3NvcnQnKTtcbiAgICB0aGlzLl9saXN0LnNvcnQoKGxocywgcmhzKSA9PiBsaHMuY29uZmlnLnpJbmRleCAtIHJocy5jb25maWcuekluZGV4KTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgRHJhd2FibGVJbnRlcmZhY2UsXG4gIERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICBEcmF3YWJsZUlkVHlwZSxcbiAgRHJhd2VySW50ZXJmYWNlLFxuICBMaW5rZWREYXRhVHlwZSxcbiAgT2JzZXJ2ZUhlbHBlckludGVyZmFjZSxcbiAgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IE9ic2VydmVIZWxwZXIgZnJvbSAnLi4vLi4vaGVscGVycy9vYnNlcnZlLWhlbHBlcic7XG5pbXBvcnQgeyBhcmVBcnJheXNFcXVhbCB9IGZyb20gJy4uLy4uL2hlbHBlcnMvYmFzZSc7XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgZm9yIGRyYXdhYmxlIG9iamVjdHNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgRHJhd2FibGUgaW1wbGVtZW50cyBEcmF3YWJsZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBPYmplY3QgSURcbiAgICovXG4gIHByb3RlY3RlZCBfaWQ6IERyYXdhYmxlSWRUeXBlO1xuICAvKipcbiAgICogT2JqZWN0IHR5cGVcbiAgICovXG4gIHByb3RlY3RlZCBfdHlwZTogc3RyaW5nO1xuICAvKipcbiAgICogVmlldyBjb25maWdcbiAgICovXG4gIHByb3RlY3RlZCBfY29uZmlnOiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZTtcbiAgLyoqXG4gICAqIEV4dHJhIGxpbmtlZCBkYXRhXG4gICAqL1xuICBwcm90ZWN0ZWQgX2RhdGE6IExpbmtlZERhdGFUeXBlO1xuICAvKipcbiAgICogT2JzZXJ2ZSBoZWxwZXJcbiAgICovXG4gIHByb3RlY3RlZCBfb2JzZXJ2ZUhlbHBlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZTtcblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmRyYXd9XG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgZHJhdyhkcmF3ZXI6IERyYXdlckludGVyZmFjZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIElEIGdldHRlclxuICAgKi9cbiAgcHVibGljIGdldCBpZCgpOiBEcmF3YWJsZUlkVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xuICB9XG5cbiAgLyoqXG4gICAqIFR5cGUgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnIHNldHRlclxuICAgKiBAcGFyYW0gY29uZmlnIC0gdmlldyBjb25maWdcbiAgICovXG4gIHB1YmxpYyBzZXQgY29uZmlnKGNvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2UpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwoT2JqZWN0LmVudHJpZXMoY29uZmlnKSwgT2JqZWN0LmVudHJpZXModGhpcy5fY29uZmlnKSk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgY29uc3QgaXNaSW5kZXhDaGFuZ2VkID0gY29uZmlnLnpJbmRleCAhPT0gdGhpcy5fY29uZmlnLnpJbmRleDtcblxuICAgICAgT2JqZWN0LmVudHJpZXMoY29uZmlnKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgKHRoaXMuX2NvbmZpZ1trZXkgYXMga2V5b2YgRHJhd2FibGVDb25maWdJbnRlcmZhY2VdIGFzIHVua25vd24pID0gdmFsdWUgYXMgdW5rbm93bjtcbiAgICAgIH0pO1xuXG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlLCB7XG4gICAgICAgIHpJbmRleENoYW5nZWQ6IGlzWkluZGV4Q2hhbmdlZCxcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5rZWQgZGF0YSBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBMaW5rZWREYXRhVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm9uVmlld0NoYW5nZX1cbiAgICovXG4gIHB1YmxpYyBvblZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZywgaGFuZGxlcjogVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub25DaGFuZ2Uoc3Vic2NyaWJlck5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5vZmZWaWV3Q2hhbmdlfVxuICAgKi9cbiAgcHVibGljIG9mZlZpZXdDaGFuZ2Uoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIub2ZmQ2hhbmdlKHN1YnNjcmliZXJOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3YWJsZSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gaWQgLSBvYmplY3QgSURcbiAgICogQHBhcmFtIGNvbmZpZyAtIHZpZXcgY29uZmlnXG4gICAqIEBwYXJhbSBkYXRhIC0gbGlua2VkIGV4dHJhIGRhdGFcbiAgICovXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihpZDogRHJhd2FibGVJZFR5cGUsIGNvbmZpZzogRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30pIHtcbiAgICB0aGlzLl9pZCA9IGlkO1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuX2NvbmZpZyA9IG5ldyBQcm94eShjb25maWcsIHtcbiAgICAgIHNldDogKHRhcmdldDogRHJhd2FibGVDb25maWdJbnRlcmZhY2UsIGluZGV4LCB2YWx1ZSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCBpc0NoYW5nZWQgPSB0YXJnZXRbaW5kZXggYXMga2V5b2YgRHJhd2FibGVDb25maWdJbnRlcmZhY2VdICE9PSB2YWx1ZTtcbiAgICAgICAgKHRhcmdldFtpbmRleCBhcyBrZXlvZiBEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZV0gYXMgdW5rbm93bikgPSB2YWx1ZSBhcyB1bmtub3duO1xuICAgICAgICByZXR1cm4gaXNDaGFuZ2VkID8gdGhpcy5fb2JzZXJ2ZUhlbHBlci5wcm9jZXNzV2l0aE11dGVIYW5kbGVycyh7XG4gICAgICAgICAgekluZGV4Q2hhbmdlZDogaW5kZXggPT09ICd6SW5kZXgnLFxuICAgICAgICB9KSA6IHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgUHJveHkoZGF0YSwge1xuICAgICAgc2V0OiAodGFyZ2V0OiBMaW5rZWREYXRhVHlwZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBMaW5rZWREYXRhVHlwZV0gIT09IHZhbHVlO1xuICAgICAgICB0YXJnZXRbaW5kZXggYXMga2V5b2YgTGlua2VkRGF0YVR5cGVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCkgOiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUG9zaXRpb25hbENvbnRleHRJbnRlcmZhY2UsIFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZSwgVmVjdG9yQXJyYXlUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG4vKipcbiAqIFBvc2l0aW9uYWxDb250ZXh0IGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uYWxDb250ZXh0IGltcGxlbWVudHMgUG9zaXRpb25hbENvbnRleHRJbnRlcmZhY2Uge1xuICAvKipcbiAgICogRWxlbWVudCBpbiBjb250ZXh0XG4gICAqL1xuICBwdWJsaWMgZWxlbWVudDogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHwgbnVsbCA9IG51bGw7XG4gIC8qKlxuICAgKiBSZWxhdGl2ZSBldmVudCBwb3NpdGlvbidzIGNvb3Jkc1xuICAgKi9cbiAgcHVibGljIHBvc2l0aW9uOiBWZWN0b3JBcnJheVR5cGUgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogUG9zaXRpb25hbENvbnRleHQgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGVsZW1lbnQgLSBlbGVtZW50IGluIGNvbnRleHRcbiAgICogQHBhcmFtIHBvc2l0aW9uIC0gcmVsYXRpdmUgY29udGV4dCBwb3NpdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IoZWxlbWVudDogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlIHwgbnVsbCwgcG9zaXRpb246IFZlY3RvckFycmF5VHlwZSB8IG51bGwpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgY29udGV4dCBpcyBlbXB0eVxuICAgKi9cbiAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudCA9PT0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIERyYXdhYmxlSWRUeXBlLFxuICBEcmF3ZXJJbnRlcmZhY2UsXG4gIExpbmtlZERhdGFUeXBlLFxuICBWZWN0b3JBcnJheVR5cGUsXG4gIFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwSW50ZXJmYWNlLFxufSBmcm9tICcuLi8uLi90eXBlcyc7XG5pbXBvcnQgRHJhd2FibGVHcm91cCBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZS1ncm91cCc7XG5pbXBvcnQgeyBjcmVhdGVWZWN0b3IgfSBmcm9tICcuLi92ZWN0b3InO1xuaW1wb3J0IHsgQm91bmRJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi90eXBlcy9ib3VuZCc7XG5pbXBvcnQgUmVjdGFuZ3VsYXJCb3VuZCBmcm9tICcuLi9ib3VuZHMvcmVjdGFuZ3VsYXItYm91bmQnO1xuaW1wb3J0IHsgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZCB9IGZyb20gJy4uL3ZlY3Rvci9oZWxwZXJzJztcbmltcG9ydCB7IGlzUG9zaXRpb25hbCB9IGZyb20gJy4uLy4uL2hlbHBlcnMvdHlwZS1oZWxwZXJzJztcbmltcG9ydCBQb3NpdGlvbmFsRHJhd2FibGUgZnJvbSAnLi9wb3NpdGlvbmFsLWRyYXdhYmxlJztcblxuLyoqXG4gKiBQb3NpdGlvbmFsIGRyYXdhYmxlIGdyb3VwIGNsYXNzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwIGV4dGVuZHMgRHJhd2FibGVHcm91cCBpbXBsZW1lbnRzIFBvc2l0aW9uYWxEcmF3YWJsZUdyb3VwSW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIEludGVyZmFjZSBiZWxvbmdpbmcgZmxhZ1xuICAgKi9cbiAgcHVibGljIGlzUG9zaXRpb25hbDogdHJ1ZSA9IHRydWU7XG4gIC8qKlxuICAgKiBOYW1lIG9mIGNsYXNzIHRvIHVzZSBhcyBzdWJzY3JpYmVyIG5hbWUgaW4gb2JzZXJ2YWJsZSBsb2dpY1xuICAgKi9cbiAgcHJvdGVjdGVkIF9zdWJzY3JpYmVyTmFtZTogc3RyaW5nID0gJ1Bvc2l0aW9uYWxEcmF3YWJsZUdyb3VwJztcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiBEcmF3YWJsZUdyb3VwIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBpZCAtIGdyb3VwIElEXG4gICAqIEBwYXJhbSBjb25maWcgLSBjb25maWdcbiAgICogQHBhcmFtIGRhdGEgLSBleHRyYSBkYXRhXG4gICAqIEBwYXJhbSBjaGlsZHJlbiAtIGNoaWxkcmVuIG9mIGdyb3VwZWQgb2JqZWN0c1xuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IERyYXdhYmxlSWRUeXBlLFxuICAgIGNvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlLFxuICAgIGRhdGE6IExpbmtlZERhdGFUeXBlID0ge30sXG4gICAgY2hpbGRyZW46IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdID0gW10sXG4gICkge1xuICAgIHN1cGVyKGlkLCBjb25maWcsIGRhdGEsIGNoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuZHJhd31cbiAgICovXG4gIHB1YmxpYyBkcmF3KGRyYXdlcjogRHJhd2VySW50ZXJmYWNlKTogdm9pZCB7XG4gICAgZHJhd2VyLmNvbnRleHQuc2F2ZSgpO1xuICAgIGRyYXdlci5jb250ZXh0LnRyYW5zbGF0ZSguLi50aGlzLmNvbmZpZy5wb3NpdGlvbik7XG4gICAgc3VwZXIuZHJhdyhkcmF3ZXIpO1xuICAgIGRyYXdlci5jb250ZXh0LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uuc2V0UG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgc2V0UG9zaXRpb24oY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWcucG9zaXRpb24gPSBjb29yZHM7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm1vdmVQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBtb3ZlUG9zaXRpb24ob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKFxuICAgICAgY3JlYXRlVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbilcbiAgICAgICAgLmFkZChjcmVhdGVWZWN0b3Iob2Zmc2V0KSlcbiAgICAgICAgLnRvQXJyYXkoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5nZXRSZWxhdGl2ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIGdldFJlbGF0aXZlUG9zaXRpb24ocG9pbnQ6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVZlY3Rvcihwb2ludClcbiAgICAgIC5zdWIoY3JlYXRlVmVjdG9yKHRoaXMuY29uZmlnLnBvc2l0aW9uKSlcbiAgICAgIC50b0FycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmJvdW5kSW5jbHVkZXN9XG4gICAqL1xuICBwdWJsaWMgYm91bmRJbmNsdWRlcyhjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5jaGlsZHJlbikge1xuICAgICAgaWYgKFxuICAgICAgICBpc1Bvc2l0aW9uYWwoY2hpbGQpXG4gICAgICAgICYmIChjaGlsZCBhcyBQb3NpdGlvbmFsRHJhd2FibGUpLmJvdW5kSW5jbHVkZXModHJhbnNwb3NlQ29vcmRzRm9yd2FyZChjb29yZHMsIHRoaXMuX2NvbmZpZy5wb3NpdGlvbikpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5pc05lYXJCb3VuZEVkZ2V9XG4gICAqL1xuICBpc05lYXJCb3VuZEVkZ2UoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIGRldmlhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYm91bmQuaXNOZWFyRWRnZShcbiAgICAgIHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQoY29vcmRzLCB0aGlzLl9jb25maWcucG9zaXRpb24pLFxuICAgICAgZGV2aWF0aW9uLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10ge1xuICAgIHJldHVybiB0aGlzLl9zdG9yYWdlLmxpc3QgYXMgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW107XG4gIH1cblxuICAvKipcbiAgICogVmlldyBjb25maWcgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogYm91bmQgZ2V0dGVyXG4gICAqL1xuICBwdWJsaWMgZ2V0IGJvdW5kKCk6IEJvdW5kSW50ZXJmYWNlIHtcbiAgICByZXR1cm4gbmV3IFJlY3Rhbmd1bGFyQm91bmQoe1xuICAgICAgcG9zaXRpb246IFswLCAwXSxcbiAgICAgIHNpemU6IHRoaXMuX2NvbmZpZy5zaXplLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgYWN0aW9ucyB3aXRoIGNoaWxkcmVuIGJlZm9yZSBncm91cGluZ1xuICAgKi9cbiAgcHJvdGVjdGVkIF9wcm9jZXNzQ2hpbGRyZW5Ub0dyb3VwKGNoaWxkcmVuOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSk6IFBvc2l0aW9uYWxEcmF3YWJsZUludGVyZmFjZVtdIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLm1vdmVQb3NpdGlvbihcbiAgICAgICAgY3JlYXRlVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbikuaW52ZXJzZSgpLnRvQXJyYXkoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvbWUgYWN0aW9ucyB3aXRoIGNoaWxkcmVuIGJlZm9yZSB1bmdyb3VwaW5nXG4gICAqL1xuICBwcm90ZWN0ZWQgX3Byb2Nlc3NDaGlsZHJlblRvVW5ncm91cChjaGlsZHJlbjogUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlW10pOiBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2VbXSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5tb3ZlUG9zaXRpb24odGhpcy5fY29uZmlnLnBvc2l0aW9uKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUG9zaXRpb25hbERyYXdhYmxlSW50ZXJmYWNlLFxuICBQb3NpdGlvbmFsRHJhd2FibGVDb25maWdJbnRlcmZhY2UsXG4gIFZlY3RvckFycmF5VHlwZSxcbn0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlVmVjdG9yIH0gZnJvbSAnLi4vdmVjdG9yJztcbmltcG9ydCBEcmF3YWJsZSBmcm9tICcuLi9kcmF3YWJsZS9kcmF3YWJsZSc7XG5pbXBvcnQgeyBCb3VuZEludGVyZmFjZSB9IGZyb20gJy4uLy4uL3R5cGVzL2JvdW5kJztcbmltcG9ydCBSZWN0YW5ndWxhckJvdW5kIGZyb20gJy4uL2JvdW5kcy9yZWN0YW5ndWxhci1ib3VuZCc7XG5pbXBvcnQgeyB0cmFuc3Bvc2VDb29yZHNGb3J3YXJkIH0gZnJvbSAnLi4vdmVjdG9yL2hlbHBlcnMnO1xuXG4vKipcbiAqIEFic3RyYWN0IGNsYXNzIGZvciBkcmF3YWJsZSBwb3NpdGlvbmFsIG9iamVjdHNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgUG9zaXRpb25hbERyYXdhYmxlIGV4dGVuZHMgRHJhd2FibGUgaW1wbGVtZW50cyBQb3NpdGlvbmFsRHJhd2FibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogSW50ZXJmYWNlIGJlbG9uZ2luZyBmbGFnXG4gICAqL1xuICBwdWJsaWMgaXNQb3NpdGlvbmFsOiB0cnVlID0gdHJ1ZTtcbiAgLyoqXG4gICAqIFZpZXcgY29uZmlnXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NvbmZpZzogUG9zaXRpb25hbERyYXdhYmxlQ29uZmlnSW50ZXJmYWNlO1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2Uuc2V0UG9zaXRpb259XG4gICAqL1xuICBwdWJsaWMgc2V0UG9zaXRpb24oY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maWcucG9zaXRpb24gPSBjb29yZHM7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLm1vdmVQb3NpdGlvbn1cbiAgICovXG4gIHB1YmxpYyBtb3ZlUG9zaXRpb24ob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKFxuICAgICAgY3JlYXRlVmVjdG9yKHRoaXMuX2NvbmZpZy5wb3NpdGlvbilcbiAgICAgICAgLmFkZChjcmVhdGVWZWN0b3Iob2Zmc2V0KSlcbiAgICAgICAgLnRvQXJyYXkoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBEcmF3YWJsZUludGVyZmFjZS5nZXRSZWxhdGl2ZVBvc2l0aW9ufVxuICAgKi9cbiAgcHVibGljIGdldFJlbGF0aXZlUG9zaXRpb24ocG9pbnQ6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVZlY3Rvcihwb2ludClcbiAgICAgIC5zdWIoY3JlYXRlVmVjdG9yKHRoaXMuY29uZmlnLnBvc2l0aW9uKSlcbiAgICAgIC50b0FycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIERyYXdhYmxlSW50ZXJmYWNlLmJvdW5kSW5jbHVkZXN9XG4gICAqL1xuICBwdWJsaWMgYm91bmRJbmNsdWRlcyhjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmJvdW5kLmluY2x1ZGVzKFxuICAgICAgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZChjb29yZHMsIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVJbnRlcmZhY2UuaXNOZWFyQm91bmRFZGdlfVxuICAgKi9cbiAgcHVibGljIGlzTmVhckJvdW5kRWRnZShjb29yZHM6IFZlY3RvckFycmF5VHlwZSwgZGV2aWF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ib3VuZC5pc05lYXJFZGdlKFxuICAgICAgdHJhbnNwb3NlQ29vcmRzRm9yd2FyZChjb29yZHMsIHRoaXMuX2NvbmZpZy5wb3NpdGlvbiksXG4gICAgICBkZXZpYXRpb24sXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaWV3IGNvbmZpZyBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgY29uZmlnKCk6IFBvc2l0aW9uYWxEcmF3YWJsZUNvbmZpZ0ludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBib3VuZCBnZXR0ZXJcbiAgICovXG4gIHB1YmxpYyBnZXQgYm91bmQoKTogQm91bmRJbnRlcmZhY2Uge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ3VsYXJCb3VuZCh7XG4gICAgICBwb3NpdGlvbjogWzAsIDBdLFxuICAgICAgc2l6ZTogdGhpcy5fY29uZmlnLnNpemUsXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvb3Jkc0ZpbHRlckNvbmZpZ0ludGVyZmFjZSwgQ29vcmRzRmlsdGVySW50ZXJmYWNlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuLi92ZWN0b3IvdHlwZXMnO1xuXG4vKipcbiAqIEZpbHRlciBjb29yZHMgdXNpbmcgZ3JpZFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkRmlsdGVyIGltcGxlbWVudHMgQ29vcmRzRmlsdGVySW50ZXJmYWNlIHtcbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBDb29yZHNGaWx0ZXJJbnRlcmZhY2UucHJvY2Vzc31cbiAgICovXG4gIHB1YmxpYyBwcm9jZXNzKGRhdGE6IFZlY3RvckFycmF5VHlwZSwgY29uZmlnOiBDb29yZHNGaWx0ZXJDb25maWdJbnRlcmZhY2UpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIGNvbnN0IFt4LCB5XSA9IGRhdGE7XG4gICAgY29uc3Qgc2NhbGUgPSBjb25maWcuc2NhbGVbMF07XG5cbiAgICBsZXQgc3RlcCA9IGNvbmZpZy5ncmlkU3RlcDtcblxuICAgIGlmIChzY2FsZSA8IDEpIHtcbiAgICAgIHN0ZXAgKj0gMiAqKiBNYXRoLnJvdW5kKE1hdGgubG9nMigxIC8gc2NhbGUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RlcCAvPSAyICoqIE1hdGgucm91bmQoTWF0aC5sb2cyKHNjYWxlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFt4LXglc3RlcCwgeS15JXN0ZXBdO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVCbG9iLCBjcmVhdGVVcmxGcm9tQmxvYiwgaGFzaFN0cmluZyB9IGZyb20gJy4uL2hlbHBlcnMvYmFzZSc7XG5pbXBvcnQge1xuICBIYXNoS2V5VHlwZSxcbiAgSW1hZ2VDYWNoZUludGVyZmFjZSxcbiAgT25Mb2FkSGFuZGxlclR5cGUsXG4gIE9uVG90YWxMb2FkSGFuZGxlclR5cGUsXG59IGZyb20gJy4uL3R5cGVzJztcblxuLyoqXG4gKiBDYWNoZSBoZWxwZXIgZm9yIGltYWdlc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZUNhY2hlIGltcGxlbWVudHMgSW1hZ2VDYWNoZUludGVyZmFjZSB7XG4gIC8qKlxuICAgKiBNYXAgb2YgdGhlIHByZWxvYWRlZCBpbWFnZXNcbiAgICovXG4gIHByb3RlY3RlZCBfaW1hZ2VNYXA6IFJlY29yZDxIYXNoS2V5VHlwZSwgSFRNTEltYWdlRWxlbWVudD4gPSB7fTtcbiAgLyoqXG4gICAqIE1hcCBvZiB0aGUgcnVubmluZyBwcm9jZXNzZXNcbiAgICovXG4gIHByb3RlY3RlZCBfcHJvY2Vzc01hcDogUmVjb3JkPEhhc2hLZXlUeXBlLCBib29sZWFuPiA9IHt9O1xuICAvKipcbiAgICogTWFwIG9mIHRoZSBidWZmZXJlZCBoYW5kbGVyc1xuICAgKi9cbiAgcHJvdGVjdGVkIF9oYW5kbGVyczogUmVjb3JkPEhhc2hLZXlUeXBlLCBBcnJheTxPbkxvYWRIYW5kbGVyVHlwZT4+ID0ge307XG4gIC8qKlxuICAgKiBNYXAgb2YgdGhlIGhhbmRsZXJzIGZvciBzdWJzY3JpYmVkIG9iamVjdHNcbiAgICovXG4gIHByb3RlY3RlZCBfdG90YWxIYW5kbGVyczogUmVjb3JkPEhhc2hLZXlUeXBlLCBPblRvdGFsTG9hZEhhbmRsZXJUeXBlPiA9IHt9O1xuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgSW1hZ2VDYWNoZUludGVyZmFjZS5zdWJzY3JpYmV9XG4gICAqL1xuICBwdWJsaWMgc3Vic2NyaWJlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IE9uVG90YWxMb2FkSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl90b3RhbEhhbmRsZXJzW3N1YnNjcmliZXJOYW1lXSA9IGhhbmRsZXI7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIEltYWdlQ2FjaGVJbnRlcmZhY2UudW5zdWJzY3JpYmV9XG4gICAqL1xuICBwdWJsaWMgdW5zdWJzY3JpYmUoc3Vic2NyaWJlck5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLl90b3RhbEhhbmRsZXJzW3N1YnNjcmliZXJOYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgSW1hZ2VDYWNoZUludGVyZmFjZS5jYWNoZX1cbiAgICovXG4gIHB1YmxpYyBjYWNoZShcbiAgICBzb3VyY2U6IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgY2FsbGJhY2s6IE9uTG9hZEhhbmRsZXJUeXBlIHwgbnVsbCA9IG51bGwsXG4gICk6IEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCBrZXkgPSB0aGlzLl9nZXRLZXkoc291cmNlLCB0eXBlKTtcblxuICAgIGlmICh0aGlzLl9pbWFnZU1hcFtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBjYWxsYmFjayh0aGlzLl9pbWFnZU1hcFtrZXldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9pbWFnZU1hcFtrZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wcm9jZXNzTWFwW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVyc1trZXldID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faGFuZGxlcnNba2V5XS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2Nlc3NNYXBba2V5XSA9IHRydWU7XG5cbiAgICBjb25zdCBibG9iOiBCbG9iID0gY3JlYXRlQmxvYihzb3VyY2UsIHR5cGUpO1xuICAgIGNvbnN0IHVybDogc3RyaW5nID0gY3JlYXRlVXJsRnJvbUJsb2IoYmxvYik7XG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHVybDtcblxuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgdGhpcy5faW1hZ2VNYXBba2V5XSA9IGltZztcbiAgICAgIGRlbGV0ZSB0aGlzLl9wcm9jZXNzTWFwW2tleV07XG5cbiAgICAgIGlmICh0aGlzLl9oYW5kbGVyc1trZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSB0aGlzLl9oYW5kbGVyc1trZXldO1xuICAgICAgICB3aGlsZSAoaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgKGhhbmRsZXJzLnBvcCgpKShpbWcpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9oYW5kbGVyc1trZXldO1xuICAgICAgfVxuXG4gICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuX3Byb2Nlc3NNYXApLmxlbmd0aCkge1xuICAgICAgICBPYmplY3QudmFsdWVzKHRoaXMuX3RvdGFsSGFuZGxlcnMpLmZvckVhY2goKGhhbmRsZXIpID0+IGhhbmRsZXIoKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgaGFzaCBmb3IgaW1hZ2UgZGF0YSBhbmQgdHlwZSBhbmQgcmV0dXJucyBpdCBhcyBzdHJpbmdcbiAgICogQHBhcmFtIHNvdXJjZSAtIHNvdXJjZSBkYXRhIG9mIGltYWdlXG4gICAqIEBwYXJhbSB0eXBlIC0gbWltZSB0eXBlXG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldEtleShzb3VyY2U6IHN0cmluZywgdHlwZTogc3RyaW5nKTogSGFzaEtleVR5cGUge1xuICAgIHJldHVybiBoYXNoU3RyaW5nKGAke3NvdXJjZX1fJHt0eXBlfWApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBudW1iZXIgaXMgaW5zaWRlIGludGVydmFsXG4gKiBAcGFyYW0gd2hhdCAtIG51bWJlclxuICogQHBhcmFtIGludGVydmFsIC0gaW50ZXJ2YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSW5JbnRlcnZhbCh3aGF0OiBudW1iZXIsIGludGVydmFsOiBWZWN0b3JBcnJheVR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHdoYXQgPiBpbnRlcnZhbFswXSAmJiB3aGF0IDwgaW50ZXJ2YWxbMV07XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgbnVtYmVyIGlzIGluc2lkZSBzZWdtZW50XG4gKiBAcGFyYW0gd2hhdCAtIG51bWJlclxuICogQHBhcmFtIHNlZ21lbnQgLSBzZWdtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0luU2VnbWVudCh3aGF0OiBudW1iZXIsIHNlZ21lbnQ6IFZlY3RvckFycmF5VHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gd2hhdCA+PSBzZWdtZW50WzBdICYmIHdoYXQgPD0gc2VnbWVudFsxXTtcbn1cblxuLyoqXG4gKiBSb3VuZHMgYSBudW1iZXIgd2l0aCBhIHByZWNpc2lvblxuICogQHBhcmFtIG51bSAtIG51bWJlclxuICogQHBhcmFtIHByZWNpc2lvbiAtIHBlcmNpc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmQobnVtOiBudW1iZXIsIHByZWNpc2lvbjogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gIGNvbnN0IG11bHQgPSAxMCoqcHJlY2lzaW9uO1xuICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBtdWx0KSAvIG11bHQ7XG59XG5cbi8qKlxuICogVHJhbnNwb3NlIGNvb3JkcyB3aXRoIGZvcndhcmQgYXBwbHlpbmcgb2Zmc2V0IGFuZCBzY2FsZVxuICogQHBhcmFtIGNvb3JkcyAtIGNvb3JkcyB0byB0cmFuc3Bvc2VcbiAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXQgdmVjdG9yXG4gKiBAcGFyYW0gc2NhbGUgLSBzY2FsZSB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zcG9zZUNvb3Jkc0ZvcndhcmQoXG4gIGNvb3JkczogVmVjdG9yQXJyYXlUeXBlLCBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSA9IFsxLCAxXSxcbik6IFZlY3RvckFycmF5VHlwZSB7XG4gIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcbiAgcmV0dXJuIFsoeCAtIG9mZnNldFswXSkvc2NhbGVbMF0sICh5IC0gb2Zmc2V0WzFdKS9zY2FsZVsxXV07XG59XG5cbi8qKlxuICogVHJhbnNwb3NlIGNvb3JkcyB3aXRoIGJhY2t3YXJkIGFwcGx5aW5nIG9mZnNldCBhbmQgc2NhbGVcbiAqIEBwYXJhbSBjb29yZHMgLSBjb29yZHMgdG8gdHJhbnNwb3NlXG4gKiBAcGFyYW0gb2Zmc2V0IC0gb2Zmc2V0IHZlY3RvclxuICogQHBhcmFtIHNjYWxlIC0gc2NhbGUgdmVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc3Bvc2VDb29yZHNCYWNrd2FyZChcbiAgY29vcmRzOiBWZWN0b3JBcnJheVR5cGUsIG9mZnNldDogVmVjdG9yQXJyYXlUeXBlLCBzY2FsZTogVmVjdG9yQXJyYXlUeXBlID0gWzEsIDFdLFxuKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgY29uc3QgW3gsIHldID0gY29vcmRzO1xuICByZXR1cm4gW3gqc2NhbGVbMF0gKyBvZmZzZXRbMF0sIHkqc2NhbGVbMV0gKyBvZmZzZXRbMV1dO1xufVxuIiwiaW1wb3J0IFBvc2l0aW9uYWxWZWN0b3IsIHsgY3JlYXRlUG9seWdvblZlY3RvcnMgfSBmcm9tICcuL3Bvc2l0aW9uYWwtdmVjdG9yJztcbmltcG9ydCB7IGlzSW5JbnRlcnZhbCwgaXNJblNlZ21lbnQsIHJvdW5kIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCBWZWN0b3IsIHsgY3JlYXRlVmVjdG9yLCB0b1ZlY3RvciB9IGZyb20gJy4vdmVjdG9yJztcblxuZXhwb3J0IHtcbiAgVmVjdG9yLFxuICBjcmVhdGVWZWN0b3IsXG4gIHRvVmVjdG9yLFxuICBQb3NpdGlvbmFsVmVjdG9yLFxuICBpc0luSW50ZXJ2YWwsXG4gIGlzSW5TZWdtZW50LFxuICByb3VuZCxcbiAgY3JlYXRlUG9seWdvblZlY3RvcnMsXG59O1xuIiwiaW1wb3J0IHsgUG9zaXRpb25hbFZlY3RvckludGVyZmFjZSwgVmVjdG9yQXJyYXlUeXBlLCBWZWN0b3JJbnRlcmZhY2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBWZWN0b3IsIHsgdG9WZWN0b3IgfSBmcm9tICcuL3ZlY3Rvcic7XG5cbi8qKlxuICogUG9zaXRpb25hbCB2ZWN0b3IgY2xhc3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb25hbFZlY3RvciBpbXBsZW1lbnRzIFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2Uge1xuICAvKipcbiAgICogUG9zaXRpb25cbiAgICovXG4gIHB1YmxpYyBwb3NpdGlvbjogVmVjdG9ySW50ZXJmYWNlO1xuICAvKipcbiAgICogU2l6ZVxuICAgKi9cbiAgcHVibGljIHNpemU6IFZlY3RvckludGVyZmFjZTtcblxuICAvKipcbiAgICogUG9zaXRpb25hbFZlY3RvciBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gcG9zaXRpb24gLSBwb3NpdGlvblxuICAgKiBAcGFyYW0gc2l6ZSAtIHNpemVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsIHNpemU6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSkge1xuICAgIHRoaXMucG9zaXRpb24gPSB0b1ZlY3Rvcihwb3NpdGlvbik7XG4gICAgdGhpcy5zaXplID0gdG9WZWN0b3Ioc2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2UudGFyZ2V0fVxuICAgKi9cbiAgcHVibGljIGdldCB0YXJnZXQoKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5jbG9uZSgpLmFkZCh0aGlzLnNpemUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZS5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2UuaW5jbHVkZXN9XG4gICAqL1xuICBwdWJsaWMgaW5jbHVkZXMocG9pbnQ6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSwgcHJlY2lzaW9uOiBudW1iZXIgPSA0KTogYm9vbGVhbiB7XG4gICAgY29uc3QgcG9pbnRWZWN0b3IgPSB0b1ZlY3Rvcihwb2ludCk7XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbi5pc0VxdWFsKHBvaW50VmVjdG9yLCBwcmVjaXNpb24pIHx8IHRoaXMudGFyZ2V0LmlzRXF1YWwocG9pbnRWZWN0b3IsIHByZWNpc2lvbikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IFt4MSwgeTFdID0gdGhpcy5wb3NpdGlvbi50b0FycmF5KHByZWNpc2lvbik7XG4gICAgY29uc3QgW3gyLCB5Ml0gPSB0aGlzLnRhcmdldC50b0FycmF5KHByZWNpc2lvbik7XG4gICAgY29uc3QgW3gsIHldID0gcG9pbnRWZWN0b3IudG9BcnJheShwcmVjaXNpb24pO1xuXG4gICAgcmV0dXJuICh4LXgxKSAqICh5Mi15MSkgLSAoeS15MSkgKiAoeDIteDEpID09PSAwXG4gICAgICAmJiAoeDEgPCB4ICYmIHggPCB4MikgJiYgKHkxIDwgeSAmJiB5IDwgeTIpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlLmdldERpc3RhbmNlVmVjdG9yfVxuICAgKi9cbiAgcHVibGljIGdldERpc3RhbmNlVmVjdG9yKHBvaW50OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UpOiBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCB2ZWN0b3JQb2ludCA9IHRvVmVjdG9yKHBvaW50KTtcbiAgICBjb25zdCBkZXN0UG9pbnQgPSB0aGlzLl9nZXROZWFyZXN0TGluZVBvaW50KHBvaW50KTtcblxuICAgIGlmIChcbiAgICAgIGRlc3RQb2ludC54IDwgTWF0aC5taW4odGhpcy5wb3NpdGlvbi54LCB0aGlzLnRhcmdldC54KSB8fFxuICAgICAgZGVzdFBvaW50LnggPiBNYXRoLm1heCh0aGlzLnBvc2l0aW9uLngsIHRoaXMudGFyZ2V0LngpIHx8XG4gICAgICBkZXN0UG9pbnQueSA8IE1hdGgubWluKHRoaXMucG9zaXRpb24ueSwgdGhpcy50YXJnZXQueSkgfHxcbiAgICAgIGRlc3RQb2ludC55ID4gTWF0aC5tYXgodGhpcy5wb3NpdGlvbi55LCB0aGlzLnRhcmdldC55KVxuICAgICkge1xuICAgICAgY29uc3QgbDEgPSBuZXcgUG9zaXRpb25hbFZlY3Rvcih2ZWN0b3JQb2ludCwgdG9WZWN0b3IodGhpcy5wb3NpdGlvbikuc3ViKHZlY3RvclBvaW50KSk7XG4gICAgICBjb25zdCBsMiA9IG5ldyBQb3NpdGlvbmFsVmVjdG9yKHZlY3RvclBvaW50LCB0b1ZlY3Rvcih0aGlzLnRhcmdldCkuc3ViKHZlY3RvclBvaW50KSk7XG5cbiAgICAgIGlmIChsMS5sZW5ndGggPCBsMi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGwxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGwyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUG9zaXRpb25hbFZlY3Rvcih2ZWN0b3JQb2ludCwgZGVzdFBvaW50LnN1Yih2ZWN0b3JQb2ludCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvb3JkcyBvZiB0aGUgbmVhcmVzdCBwb2ludCBvbiB2ZWN0b3IgdG8gYW5vdGhlciBwb2ludFxuICAgKiBAcGFyYW0gcG9pbnQgLSBhbm90aGVyIHBvaW50XG4gICAqL1xuICBwcm90ZWN0ZWQgX2dldE5lYXJlc3RMaW5lUG9pbnQocG9pbnQ6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSkge1xuICAgIGNvbnN0IHBvaW50VmVjdG9yID0gdG9WZWN0b3IocG9pbnQpO1xuXG4gICAgY29uc3QgayA9IChcbiAgICAgICh0aGlzLnRhcmdldC55LXRoaXMucG9zaXRpb24ueSkgKiAocG9pbnRWZWN0b3IueC10aGlzLnBvc2l0aW9uLngpXG4gICAgICAtICh0aGlzLnRhcmdldC54LXRoaXMucG9zaXRpb24ueCkgKiAocG9pbnRWZWN0b3IueS10aGlzLnBvc2l0aW9uLnkpXG4gICAgKSAvICgodGhpcy50YXJnZXQueS10aGlzLnBvc2l0aW9uLnkpKioyICsgKHRoaXMudGFyZ2V0LngtdGhpcy5wb3NpdGlvbi54KSoqMik7XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcihbXG4gICAgICBwb2ludFZlY3Rvci54IC0gayAqICh0aGlzLnRhcmdldC55LXRoaXMucG9zaXRpb24ueSksXG4gICAgICBwb2ludFZlY3Rvci55ICsgayAqICh0aGlzLnRhcmdldC54LXRoaXMucG9zaXRpb24ueCksXG4gICAgXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbGlzdCBvZiB2ZWN0b3JzIG9mIHRoZSBwb2x5Z29uIGZyb20gYSBsaXN0IG9mIHBvaW50c1xuICogQHBhcmFtIHBvaW50cyAtIGxpc3Qgb2YgcG9pbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQb2x5Z29uVmVjdG9ycyhwb2ludHM6IFZlY3RvckFycmF5VHlwZVtdIHwgVmVjdG9ySW50ZXJmYWNlW10pOiBQb3NpdGlvbmFsVmVjdG9ySW50ZXJmYWNlW10ge1xuICBjb25zdCByZXN1bHQ6IFBvc2l0aW9uYWxWZWN0b3JJbnRlcmZhY2VbXSA9IFtdO1xuXG4gIGZvciAobGV0IGk9MCwgaj1wb2ludHMubGVuZ3RoLTE7IGk8cG9pbnRzLmxlbmd0aDsgaj1pKyspIHtcbiAgICBjb25zdCBsaHNQb2ludCA9IHRvVmVjdG9yKHBvaW50c1tqXSk7XG4gICAgY29uc3QgcmhzUG9pbnQgPSB0b1ZlY3Rvcihwb2ludHNbaV0pO1xuXG4gICAgcmVzdWx0LnB1c2gobmV3IFBvc2l0aW9uYWxWZWN0b3IobGhzUG9pbnQsIHJoc1BvaW50LnN1YihsaHNQb2ludCkpKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBWZWN0b3JBcnJheVR5cGUsIFZlY3RvckludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG4vKipcbiAqIFZlY3RvciBjbGFzc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IgaW1wbGVtZW50cyBWZWN0b3JJbnRlcmZhY2Uge1xuICAvKipcbiAgICogQ29vcmRpbmF0ZSBYXG4gICAqL1xuICBwdWJsaWMgeDogbnVtYmVyO1xuICAvKipcbiAgICogQ29vcmRpbmF0ZSBZXG4gICAqL1xuICBwdWJsaWMgeTogbnVtYmVyO1xuICAvKipcbiAgICogRGVmYXVsdCBwcmVjaXNpb25cbiAgICovXG4gIHByb3RlY3RlZCBfZGVmYXVsdFByZWNpc2lvbjogbnVtYmVyID0gNDtcblxuICAvKipcbiAgICogVmVjdG9yIGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB4IC0gY29vcmRpbmF0ZSBYXG4gICAqIEBwYXJhbSB5IC0gY29vcmRpbmF0ZSBZXG4gICAqIEBwYXJhbSBkZWZhdWx0UHJlY2lzaW9uIC0gZGVmYXVsdCBwcmVjaXNpb25cbiAgICovXG4gIGNvbnN0cnVjdG9yKFt4LCB5XTogVmVjdG9yQXJyYXlUeXBlLCBkZWZhdWx0UHJlY2lzaW9uPzogbnVtYmVyKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgaWYgKHRoaXMuX2RlZmF1bHRQcmVjaXNpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fZGVmYXVsdFByZWNpc2lvbiA9IGRlZmF1bHRQcmVjaXNpb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbm90aGVyIHZlY3RvciB0byB0aGlzIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIHZlY3RvciB0byBjYWNoZVxuICAgKi9cbiAgcHVibGljIGFkZCh2OiBWZWN0b3IpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHRoaXMueCArPSB2Lng7XG4gICAgdGhpcy55ICs9IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyB2ZWN0b3Igd2l0aCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIHZlY3RvciB0byBzdWJ0cmFjdFxuICAgKi9cbiAgcHVibGljIHN1Yih2OiBWZWN0b3JJbnRlcmZhY2UpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHRoaXMueCAtPSB2Lng7XG4gICAgdGhpcy55IC09IHYueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGxlcyB2ZWN0b3IgYnkgbnVtYmVyXG4gICAqIEBwYXJhbSBtdWwgLSBtdWx0aXBsaWVyXG4gICAqL1xuICBwdWJsaWMgbXVsKG11bDogbnVtYmVyKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB0aGlzLnggKj0gbXVsO1xuICAgIHRoaXMueSAqPSBtdWw7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGVzIHZlY3RvciBieSBudW1iZXJcbiAgICogQHBhcmFtIGRpdiAtIGRpdmlkZXJcbiAgICovXG4gIHB1YmxpYyBkaXYoZGl2OiBudW1iZXIpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIHRoaXMueCAvPSBkaXY7XG4gICAgdGhpcy55IC89IGRpdjtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEludmVyc2VzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGludmVyc2UoKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICB0aGlzLnggPSAtdGhpcy54O1xuICAgIHRoaXMueSA9IC10aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZlcnNlcyB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyByZXZlcnNlKCk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgdGhpcy54ID0gMS90aGlzLng7XG4gICAgdGhpcy55ID0gMS90aGlzLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCArIHRoaXMueSp0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHZlY3RvciBpcyBlcXVhbCB0byBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSBwcmVjaXNpb24gLSByb3VuZCBwcmVjaXNpb24gZm9yIGNvbXBhcmlzb25cbiAgICovXG4gIHB1YmxpYyBpc0VxdWFsKHY6IFZlY3RvckludGVyZmFjZSwgcHJlY2lzaW9uOiBudW1iZXIgPSB0aGlzLl9kZWZhdWx0UHJlY2lzaW9uKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJvdW5kKHYueCwgcHJlY2lzaW9uKSA9PT0gcm91bmQodGhpcy54LCBwcmVjaXNpb24pXG4gICAgICAmJiByb3VuZCh2LnksIHByZWNpc2lvbikgPT09IHJvdW5kKHRoaXMueSwgcHJlY2lzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYW5nbGUgYmV0d2VlbiB2ZWN0b3JzIGVxdWFscyA5MCBkZWdyZWVzXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBpc09ydGhvZ29uYWwodjogVmVjdG9ySW50ZXJmYWNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29zKHYpID09PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGlzIHZlY3RvciBpcyBjb2xsaW5lYXIgd2l0aCBhcmd1bWVudCB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGlzQ29sbGluZWFyKHY6IFZlY3RvckludGVyZmFjZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm11bFZlY3Rvcih2KSA9PT0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGRpc3RhbmNlIHZlY3RvciBvZiB0aGlzIGFuZCBhbm90aGVyIHZlY3RvclxuICAgKiBAcGFyYW0gdiAtIGFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgZGlzdGFuY2UodjogVmVjdG9ySW50ZXJmYWNlKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICByZXR1cm4gdGhpcy5jbG9uZSgpLnN1Yih2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHNjYWxhciBwcm9kdWN0IHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIG11bFNjYWxhcih2OiBWZWN0b3JJbnRlcmZhY2UpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLngqdi54ICsgdGhpcy55KnYueTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGxlbmd0aCBvZiB2ZWN0b3IgcHJvZHVjdCB3aXRoIGFub3RoZXIgdmVjdG9yXG4gICAqIEBwYXJhbSB2IC0gYW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBtdWxWZWN0b3IodjogVmVjdG9ySW50ZXJmYWNlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54KnYueSAtIHRoaXMueSp2Lng7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGlzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIG5vcm1hbGl6ZSgpOiBWZWN0b3JJbnRlcmZhY2Uge1xuICAgIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoO1xuXG4gICAgdGhpcy54IC89IGxlbjtcbiAgICB0aGlzLnkgLz0gbGVuO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNwb3NlcyB2ZWN0b3IgZm9yd2FyZCB3aXRoIG9mZnNldCBhbmQgc2NhbGVcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKiBAcGFyYW0gc2NhbGUgLSBzY2FsZVxuICAgKi9cbiAgcHVibGljIHRyYW5zcG9zZUZvcndhcmQoXG4gICAgb2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsIHNjYWxlOiBWZWN0b3JBcnJheVR5cGUgfCBWZWN0b3JJbnRlcmZhY2UsXG4gICk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgY29uc3Qgb2Zmc2V0VmVjdG9yID0gdG9WZWN0b3Iob2Zmc2V0KTtcbiAgICBjb25zdCBzY2FsZVZlY3RvciA9IHRvVmVjdG9yKHNjYWxlKTtcblxuICAgIHRoaXMueCA9ICh0aGlzLnggLSBvZmZzZXRWZWN0b3IueCkgLyBzY2FsZVZlY3Rvci54O1xuICAgIHRoaXMueSA9ICh0aGlzLnkgLSBvZmZzZXRWZWN0b3IueSkgLyBzY2FsZVZlY3Rvci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNwb3NlcyB2ZWN0b3IgYmFja3dhcmQgd2l0aCBvZmZzZXQgYW5kIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICovXG4gIHB1YmxpYyB0cmFuc3Bvc2VCYWNrd2FyZChcbiAgICBvZmZzZXQ6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSwgc2NhbGU6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSxcbiAgKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCBvZmZzZXRWZWN0b3IgPSB0b1ZlY3RvcihvZmZzZXQpO1xuICAgIGNvbnN0IHNjYWxlVmVjdG9yID0gdG9WZWN0b3Ioc2NhbGUpO1xuXG4gICAgdGhpcy54ID0gb2Zmc2V0VmVjdG9yLnggKyB0aGlzLngqc2NhbGVWZWN0b3IueDtcbiAgICB0aGlzLnkgPSBvZmZzZXRWZWN0b3IueSArIHRoaXMueSpzY2FsZVZlY3Rvci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBuZXcgdmVjdG9yIGJ5IHJvdGF0aW5nIHRoaXNcbiAgICogQHBhcmFtIGFuZ2xlIC0gYW5nbGUgdG8gcm90YXRlIHRvXG4gICAqIEBwYXJhbSBwcmVjaXNpb24gLSByb3VuZCBwcmVjaXNpb25cbiAgICovXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIgPSB0aGlzLl9kZWZhdWx0UHJlY2lzaW9uKTogVmVjdG9ySW50ZXJmYWNlIHtcbiAgICBjb25zdCBjcyA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICBjb25zdCBzbiA9IE1hdGguc2luKGFuZ2xlKTtcblxuICAgIHRoaXMueCA9IHJvdW5kKHRoaXMueCpjcyAtIHRoaXMueSpzbiwgcHJlY2lzaW9uKTtcbiAgICB0aGlzLnkgPSByb3VuZCh0aGlzLngqc24gKyB0aGlzLnkqY3MsIHByZWNpc2lvbik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY29zIHdpdGggYW5vdGhlciB2ZWN0b3JcbiAgICogQHBhcmFtIHYgLSBhbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGdldENvcyh2OiBWZWN0b3JJbnRlcmZhY2UgfCBudWxsID0gbnVsbCk6IG51bWJlciB7XG4gICAgaWYgKHYgPT09IG51bGwpIHtcbiAgICAgIHYgPSBjcmVhdGVWZWN0b3IoWzEsIDBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tdWxTY2FsYXIodikgLyAodGhpcy5sZW5ndGggKiB2Lmxlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmVzIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFZlY3RvckludGVyZmFjZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVZlY3Rvcih0aGlzLnRvQXJyYXkoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdmVjdG9yIHRvIGFycmF5XG4gICAqIEBwYXJhbSBwcmVjaXNpb24gLSBwcmVjaXNpb25cbiAgICovXG4gIHB1YmxpYyB0b0FycmF5KHByZWNpc2lvbj86IG51bWJlcik6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgaWYgKHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gW3RoaXMueCwgdGhpcy55XTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3JvdW5kKHRoaXMueCwgcHJlY2lzaW9uKSwgcm91bmQodGhpcy55LCBwcmVjaXNpb24pXTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgbmV3IHZlY3RvclxuICogQHB1YmxpY1xuICogQHBhcmFtIGNvb3JkcyAtIGNvb3JkaW5hdGVzIG9mIG5ldyB2ZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZlY3Rvcihjb29yZHM6IFZlY3RvckFycmF5VHlwZSk6IFZlY3RvckludGVyZmFjZSB7XG4gIHJldHVybiBuZXcgVmVjdG9yKGNvb3Jkcyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgaW5zdGFuY2UgdG8gdmVjdG9yIGlmIGl0J3MgYW4gYXJyYXlcbiAqIEBwYXJhbSBjb29yZHMgLSBjb29yZHMgYXMgdmVjdG9yIG9yIGFuIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1ZlY3Rvcihjb29yZHM6IFZlY3RvckFycmF5VHlwZSB8IFZlY3RvckludGVyZmFjZSk6IFZlY3RvckludGVyZmFjZSB7XG4gIHJldHVybiAoY29vcmRzIGluc3RhbmNlb2YgQXJyYXkpID8gY3JlYXRlVmVjdG9yKGNvb3JkcykgOiBjb29yZHM7XG59XG4iLCJpbXBvcnQge1xuICBPYnNlcnZlSGVscGVySW50ZXJmYWNlLFxuICBWaWV3Q29uZmlnSW50ZXJmYWNlLFxuICBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZSxcbiAgVmlld09ic2VydmFibGVIYW5kbGVyVHlwZSxcbiAgVmVjdG9yQXJyYXlUeXBlLFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBhcmVBcnJheXNFcXVhbCB9IGZyb20gJy4uL2hlbHBlcnMvYmFzZSc7XG5pbXBvcnQgT2JzZXJ2ZUhlbHBlciBmcm9tICcuLi9oZWxwZXJzL29ic2VydmUtaGVscGVyJztcbmltcG9ydCB7IGNyZWF0ZVZlY3RvciB9IGZyb20gJy4vdmVjdG9yJztcbmltcG9ydCB7IHRyYW5zcG9zZUNvb3Jkc0JhY2t3YXJkLCB0cmFuc3Bvc2VDb29yZHNGb3J3YXJkIH0gZnJvbSAnLi92ZWN0b3IvaGVscGVycyc7XG5cbi8qKlxuICogQ29uZmlnIGZvciBvYmplY3RzIGRyYXdhYmxlIG9uIGNhbnZhc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29uZmlnIGltcGxlbWVudHMgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2Uge1xuICAvKipcbiAgICogU2NhbGVcbiAgICovXG4gIHByb3RlY3RlZCBfc2NhbGU6IFZlY3RvckFycmF5VHlwZTtcbiAgLyoqXG4gICAqIE9mZnNldFxuICAgKi9cbiAgcHJvdGVjdGVkIF9vZmZzZXQ6IFZlY3RvckFycmF5VHlwZTtcbiAgLyoqXG4gICAqIEdyaWQgc3RlcFxuICAgKi9cbiAgcHJvdGVjdGVkIF9ncmlkU3RlcDogbnVtYmVyO1xuICAvKipcbiAgICogSGVscGVyIGZvciBvYnNlcnZhYmxlIGxvZ2ljXG4gICAqL1xuICBwcm90ZWN0ZWQgX29ic2VydmVIZWxwZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2U7XG5cbiAgLyoqXG4gICAqIFZpZXdDb25maWcgY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHNjYWxlIC0gc2NhbGVcbiAgICogQHBhcmFtIG9mZnNldCAtIG9mZnNldFxuICAgKiBAcGFyYW0gZ3JpZFN0ZXAgLSBncmlkIHN0ZXBcbiAgICovXG4gIGNvbnN0cnVjdG9yKHsgc2NhbGUsIG9mZnNldCwgZ3JpZFN0ZXAgfTogVmlld0NvbmZpZ0ludGVyZmFjZSkge1xuICAgIHRoaXMuX29ic2VydmVIZWxwZXIgPSBuZXcgT2JzZXJ2ZUhlbHBlcigpO1xuICAgIHRoaXMuX3NjYWxlID0gbmV3IFByb3h5KHNjYWxlLCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IFZlY3RvckFycmF5VHlwZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdICE9PSB2YWx1ZTtcbiAgICAgICAgKHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdIGFzIHVua25vd24pID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCkgOiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLl9vZmZzZXQgPSBuZXcgUHJveHkob2Zmc2V0LCB7XG4gICAgICBzZXQ6ICh0YXJnZXQ6IFZlY3RvckFycmF5VHlwZSwgaW5kZXgsIHZhbHVlKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQ2hhbmdlZCA9IHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdICE9PSB2YWx1ZTtcbiAgICAgICAgKHRhcmdldFtpbmRleCBhcyBrZXlvZiBWZWN0b3JBcnJheVR5cGVdIGFzIHVua25vd24pID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBpc0NoYW5nZWQgPyB0aGlzLl9vYnNlcnZlSGVscGVyLnByb2Nlc3NXaXRoTXV0ZUhhbmRsZXJzKCkgOiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLl9ncmlkU3RlcCA9IGdyaWRTdGVwO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS5vblZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb25WaWV3Q2hhbmdlKHN1YnNjcmliZXJOYW1lOiBzdHJpbmcsIGhhbmRsZXI6IFZpZXdPYnNlcnZhYmxlSGFuZGxlclR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLm9uQ2hhbmdlKHN1YnNjcmliZXJOYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgRHJhd2FibGVTdG9yYWdlSW50ZXJmYWNlLm9mZlZpZXdDaGFuZ2V9XG4gICAqL1xuICBwdWJsaWMgb2ZmVmlld0NoYW5nZShzdWJzY3JpYmVyTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci5vZmZDaGFuZ2Uoc3Vic2NyaWJlck5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHtAaW5oZXJpdERvYyBWaWV3Q29uZmlnT2JzZXJ2YWJsZUludGVyZmFjZS50cmFuc3Bvc2VGb3J3YXJkfVxuICAgKi9cbiAgcHVibGljIHRyYW5zcG9zZUZvcndhcmQoY29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiBWZWN0b3JBcnJheVR5cGUge1xuICAgIHJldHVybiB0cmFuc3Bvc2VDb29yZHNGb3J3YXJkKGNvb3JkcywgdGhpcy5fb2Zmc2V0LCB0aGlzLl9zY2FsZSk7XG4gIH1cblxuICAvKipcbiAgICoge0Bpbmhlcml0RG9jIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlLnRyYW5zcG9zZUJhY2t3YXJkfVxuICAgKi9cbiAgcHVibGljIHRyYW5zcG9zZUJhY2t3YXJkKGNvb3JkczogVmVjdG9yQXJyYXlUeXBlKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdHJhbnNwb3NlQ29vcmRzQmFja3dhcmQoY29vcmRzLCB0aGlzLl9vZmZzZXQsIHRoaXMuX3NjYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB7QGluaGVyaXREb2MgVmlld0NvbmZpZ09ic2VydmFibGVJbnRlcmZhY2UudXBkYXRlU2NhbGVJbkN1cnNvckNvbnRleHR9XG4gICAqL1xuICBwdWJsaWMgdXBkYXRlU2NhbGVJbkN1cnNvckNvbnRleHQobmV3U2NhbGU6IFZlY3RvckFycmF5VHlwZSwgY3Vyc29yQ29vcmRzOiBWZWN0b3JBcnJheVR5cGUpOiB2b2lkIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwobmV3U2NhbGUsIHRoaXMuX3NjYWxlKTtcblxuICAgIGlmICghaXNDaGFuZ2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgY29uc3Qgb2xkU2NhbGVQb3NpdGlvbiA9IGNyZWF0ZVZlY3Rvcih0aGlzLnRyYW5zcG9zZUZvcndhcmQoY3Vyc29yQ29vcmRzKSk7XG4gICAgICB0aGlzLnNjYWxlID0gbmV3U2NhbGU7XG4gICAgICBjb25zdCBuZXdTY2FsZVBvc2l0aW9uID0gY3JlYXRlVmVjdG9yKHRoaXMudHJhbnNwb3NlRm9yd2FyZChjdXJzb3JDb29yZHMpKTtcbiAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBuZXdTY2FsZVBvc2l0aW9uLmNsb25lKCkuc3ViKG9sZFNjYWxlUG9zaXRpb24pO1xuICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLnRyYW5zcG9zZUJhY2t3YXJkKGRpZmZlcmVuY2UudG9BcnJheSgpKTtcblxuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyBhbGwgdGhlIGRhdGEgaW4gY29uZmlnXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKHsgc2NhbGUsIG9mZnNldCwgZ3JpZFN0ZXAgfTogVmlld0NvbmZpZ0ludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChzY2FsZSwgdGhpcy5fc2NhbGUpIHx8ICFhcmVBcnJheXNFcXVhbChvZmZzZXQsIHRoaXMuX29mZnNldCk7XG5cbiAgICB0aGlzLl9vYnNlcnZlSGVscGVyLndpdGhNdXRlSGFuZGxlcnMoKG11dGVkQmVmb3JlOiBib29sZWFuLCBtYW5hZ2VyOiBPYnNlcnZlSGVscGVySW50ZXJmYWNlKSA9PiB7XG4gICAgICB0aGlzLnNjYWxlID0gc2NhbGU7XG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgIHRoaXMuZ3JpZFN0ZXAgPSBncmlkU3RlcDtcblxuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgZ2V0dGVyXG4gICAqL1xuICBnZXQgc2NhbGUoKTogVmVjdG9yQXJyYXlUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogU2NhbGUgc2V0dGVyXG4gICAqIEBwYXJhbSBzY2FsZSAtIHNjYWxlXG4gICAqL1xuICBzZXQgc2NhbGUoc2NhbGU6IFZlY3RvckFycmF5VHlwZSkge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFhcmVBcnJheXNFcXVhbChzY2FsZSwgdGhpcy5fc2NhbGUpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5fc2NhbGVbMF0gPSBzY2FsZVswXTtcbiAgICAgIHRoaXMuX3NjYWxlWzFdID0gc2NhbGVbMV07XG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZzZXQgZ2V0dGVyXG4gICAqL1xuICBnZXQgb2Zmc2V0KCk6IFZlY3RvckFycmF5VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPZmZzZXQgc2V0dGVyXG4gICAqIEBwYXJhbSBvZmZzZXQgLSBvZmZzZXRcbiAgICovXG4gIHNldCBvZmZzZXQob2Zmc2V0OiBWZWN0b3JBcnJheVR5cGUpIHtcbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhYXJlQXJyYXlzRXF1YWwob2Zmc2V0LCB0aGlzLl9vZmZzZXQpO1xuXG4gICAgdGhpcy5fb2JzZXJ2ZUhlbHBlci53aXRoTXV0ZUhhbmRsZXJzKChtdXRlZEJlZm9yZTogYm9vbGVhbiwgbWFuYWdlcjogT2JzZXJ2ZUhlbHBlckludGVyZmFjZSkgPT4ge1xuICAgICAgdGhpcy5fb2Zmc2V0WzBdID0gb2Zmc2V0WzBdO1xuICAgICAgdGhpcy5fb2Zmc2V0WzFdID0gb2Zmc2V0WzFdO1xuICAgICAgbWFuYWdlci5wcm9jZXNzSGFuZGxlcnMoIWlzQ2hhbmdlZCB8fCBtdXRlZEJlZm9yZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR3JpZCBzdGVwIGdldHRlclxuICAgKi9cbiAgZ2V0IGdyaWRTdGVwKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2dyaWRTdGVwO1xuICB9XG5cbiAgLyoqXG4gICAqIEdyaWQgc3RlcCBzZXR0ZXJcbiAgICogQHBhcmFtIGdyaWRTdGVwIC0gZ3JpZCBzdGVwXG4gICAqL1xuICBzZXQgZ3JpZFN0ZXAoZ3JpZFN0ZXA6IG51bWJlcikge1xuICAgIGNvbnN0IGlzQ2hhbmdlZCA9IGdyaWRTdGVwICE9PSB0aGlzLl9ncmlkU3RlcDtcblxuICAgIHRoaXMuX29ic2VydmVIZWxwZXIud2l0aE11dGVIYW5kbGVycygobXV0ZWRCZWZvcmU6IGJvb2xlYW4sIG1hbmFnZXI6IE9ic2VydmVIZWxwZXJJbnRlcmZhY2UpID0+IHtcbiAgICAgIHRoaXMuX2dyaWRTdGVwID0gZ3JpZFN0ZXA7XG4gICAgICBtYW5hZ2VyLnByb2Nlc3NIYW5kbGVycyghaXNDaGFuZ2VkIHx8IG11dGVkQmVmb3JlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLyogKGlnbm9yZWQpICovIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IERyYXdlciBmcm9tICcuL2NhbnZhcy9kcmF3ZXInO1xuaW1wb3J0IFJlY3QgZnJvbSAnLi9jYW52YXMvZmlndXJlcy9yZWN0JztcbmltcG9ydCBEcmF3YWJsZVN0b3JhZ2UgZnJvbSAnLi9jYW52YXMvc3RydWN0cy9kcmF3YWJsZS9kcmF3YWJsZS1zdG9yYWdlJztcbmltcG9ydCB7IERyYXdhYmxlSW50ZXJmYWNlLCBWZWN0b3JBcnJheVR5cGUsIFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlIH0gZnJvbSAnLi9jYW52YXMvdHlwZXMnO1xuaW1wb3J0IFZpZXdDb25maWcgZnJvbSAnLi9jYW52YXMvc3RydWN0cy92aWV3LWNvbmZpZyc7XG5pbXBvcnQgR3JpZCBmcm9tICcuL2NhbnZhcy9maWd1cmVzL2dyaWQnO1xuaW1wb3J0IFN2ZyBmcm9tICcuL2NhbnZhcy9maWd1cmVzL3N2Zyc7XG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgRHJhd2FibGVTdG9yYWdlKFtcbiAgbmV3IEdyaWQoMSwge1xuICAgIHpJbmRleDogLUluZmluaXR5LFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgbWFpbkxpbmVDb2xvcjogJyNiYmInLFxuICAgIHN1YkxpbmVDb2xvcjogJyNkZWRlZGUnLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgICBsaW5lc0luQmxvY2s6IDUsXG4gIH0pLFxuICBuZXcgUmVjdCgyLCB7XG4gICAgcG9zaXRpb246IFsxMCwgMjBdLFxuICAgIHNpemU6IFsxMDAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBmaWxsU3R5bGU6ICdncmVlbicsXG4gICAgc3Ryb2tlU3R5bGU6ICdibGFjaycsXG4gICAgbGluZVdpZHRoOiAxLFxuICB9KSxcbiAgbmV3IFJlY3QoMywge1xuICAgIHBvc2l0aW9uOiBbMTAsIDI1XSxcbiAgICBzaXplOiBbNTAsIDUwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBmaWxsU3R5bGU6ICdibHVlJyxcbiAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gIH0pLFxuICBuZXcgUmVjdCg0LCB7XG4gICAgcG9zaXRpb246IFsxNSozMCwgMTUqMTBdLFxuICAgIHNpemU6IFsxNSoxMCwgMTUqNV0sXG4gICAgekluZGV4OiAxMCxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICBzdHJva2VTdHlsZTogJ3JlZCcsXG4gICAgbGluZVdpZHRoOiAxLFxuICB9KSxcbiAgbmV3IFN2Zyg1LCB7XG4gICAgcG9zaXRpb246IFszMDAsIDU1MF0sXG4gICAgc2l6ZTogWzE2MiwgODJdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGRhdGE6IFwiPHN2ZyB3aWR0aD0nMTYyJyBoZWlnaHQ9JzgyJyB2aWV3Qm94PScwIDAgMTYyIDgyJyBmaWxsPSdub25lJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxwYXRoIGQ9J00yOC42OTIzIDFMMSA0MC4xMjQxTDI4LjY5MjMgODFIMTM0LjY3NUwxNjEgNDAuMTI0MUwxMzQuNjc1IDFIMjguNjkyM1onIGZpbGw9JyNGRkJDRjInIHN0cm9rZT0nYmxhY2snIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIC8+PC9zdmc+XCIsIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfSksXG4gIG5ldyBTdmcoNSwge1xuICAgIHBvc2l0aW9uOiBbMTAwLCA1NTBdLFxuICAgIHNpemU6IFsxNjIsIDgyXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBkYXRhOiBcIjxzdmcgd2lkdGg9JzE2MicgaGVpZ2h0PSc4Micgdmlld0JveD0nMCAwIDE2MiA4MicgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMjguNjkyMyAxTDEgNDAuMTI0MUwyOC42OTIzIDgxSDEzNC42NzVMMTYxIDQwLjEyNDFMMTM0LjY3NSAxSDI4LjY5MjNaJyBmaWxsPScjRkZCQ0YyJyBzdHJva2U9J2JsYWNrJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyAvPjwvc3ZnPlwiLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIH0pLFxuICBuZXcgUmVjdCg2LCB7XG4gICAgcG9zaXRpb246IFszNTAsIDM1MF0sXG4gICAgc2l6ZTogWzMwLCAzMF0sXG4gICAgekluZGV4OiAxLFxuICAgIHZpc2libGU6IHRydWUsXG4gICAgZmlsbFN0eWxlOiAndHJhbnNwYXJlbnQnLFxuICAgIHN0cm9rZVN0eWxlOiAnYmx1ZScsXG4gICAgbGluZVdpZHRoOiAxLFxuICB9KSxcbiAgbmV3IFJlY3QoNywge1xuICAgIHBvc2l0aW9uOiBbMzUwLCAzMDBdLFxuICAgIHNpemU6IFszMCwgMzBdLFxuICAgIHpJbmRleDogMSxcbiAgICB2aXNpYmxlOiB0cnVlLFxuICAgIGZpbGxTdHlsZTogJ3RyYW5zcGFyZW50JyxcbiAgICBzdHJva2VTdHlsZTogJ2JsdWUnLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgfSksXG4gIG5ldyBSZWN0KDgsIHtcbiAgICBwb3NpdGlvbjogWzMwMCwgMzUwXSxcbiAgICBzaXplOiBbMzAsIDMwXSxcbiAgICB6SW5kZXg6IDEsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBmaWxsU3R5bGU6ICd0cmFuc3BhcmVudCcsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gIH0pLFxuICBuZXcgUmVjdCg5LCB7XG4gICAgcG9zaXRpb246IFsyMDAsIDIwMF0sXG4gICAgc2l6ZTogWzE2MCwgMTYwXSxcbiAgICB6SW5kZXg6IDAsXG4gICAgdmlzaWJsZTogdHJ1ZSxcbiAgICBmaWxsU3R5bGU6ICdncmVlbicsXG4gICAgc3Ryb2tlU3R5bGU6ICdibHVlJyxcbiAgICBsaW5lV2lkdGg6IDEsXG4gIH0pLFxuXSk7XG5cbmNvbnN0IGdyb3VwID0gc3RvcmFnZS5ncm91cChbNiwgNywgOCwgOV0pO1xuY29uc29sZS5sb2coZ3JvdXApO1xuLy8gc3RvcmFnZS51bmdyb3VwKGdyb3VwLmlkKTtcblxuY29uc29sZS5sb2coc3RvcmFnZSk7XG5cbmNvbnN0IHZpZXdDb25maWc6IFZpZXdDb25maWdPYnNlcnZhYmxlSW50ZXJmYWNlID0gbmV3IFZpZXdDb25maWcoe1xuICBzY2FsZTogWzEsIDFdLFxuICBvZmZzZXQ6IFswLCAwXSxcbiAgZ3JpZFN0ZXA6IDE1LFxufSk7XG5jb25zb2xlLmxvZyh2aWV3Q29uZmlnKTtcblxuY29uc3QgZHJhd2VyOiBEcmF3ZXIgPSBuZXcgRHJhd2VyKHtcbiAgZG9tRWxlbWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50LFxuICB2aWV3Q29uZmlnLFxuICBzdG9yYWdlLFxufSk7XG5kcmF3ZXIuZHJhdygpO1xuXG4vLyBzZXRUaW1lb3V0KCgpID0+IHtcbi8vICAgY29uc3QgYmF0Y2g6IERyYXdhYmxlSW50ZXJmYWNlW10gPSBbXTtcbi8vICAgZm9yIChsZXQgaT0wOyBpPDEwMDA7ICsraSkge1xuLy8gICAgIGJhdGNoLnB1c2gobmV3IFJlY3QoaSsxMDAsIHtcbi8vICAgICAgIHBvc2l0aW9uOiBbTWF0aC5yYW5kb20oKSpkcmF3ZXIud2lkdGgsIE1hdGgucmFuZG9tKCkqZHJhd2VyLmhlaWdodF0sXG4vLyAgICAgICBzaXplOiBbMzArTWF0aC5yYW5kb20oKSoxMDAsIDMwK01hdGgucmFuZG9tKCkqMTAwXSxcbi8vICAgICAgIHpJbmRleDogMCxcbi8vICAgICAgIHZpc2libGU6IHRydWUsXG4vLyAgICAgICBmaWxsU3R5bGU6ICd3aGl0ZScsXG4vLyAgICAgICBzdHJva2VTdHlsZTogJ2dyZWVuJyxcbi8vICAgICAgIGxpbmVXaWR0aDogMSxcbi8vICAgICB9KSk7XG4vLyAgIH1cbi8vICAgc3RvcmFnZS5hZGRCYXRjaChiYXRjaCk7XG4vLyB9LCAzMCk7XG5cbnNldFRpbWVvdXQoKCkgPT4ge1xuICByZXR1cm47XG4gIGNvbnN0IGJhdGNoOiBEcmF3YWJsZUludGVyZmFjZVtdID0gW107XG4gIGNvbnN0IGRhdGExID0gXCI8c3ZnIHdpZHRoPScxNjInIGhlaWdodD0nODInIHZpZXdCb3g9JzAgMCAxNjIgODInIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTI4LjY5MjMgMUwxIDQwLjEyNDFMMjguNjkyMyA4MUgxMzQuNjc1TDE2MSA0MC4xMjQxTDEzNC42NzUgMUgyOC42OTIzWicgZmlsbD0nI0ZGQkNGMicgc3Ryb2tlPSdibGFjaycgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgLz48L3N2Zz5cIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjb25zdCBkYXRhMiA9IFwiPHN2ZyB3aWR0aD0nMTYwJyBoZWlnaHQ9JzEwMCcgdmlld0JveD0nMCAwIDE2MCAxMDAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGVsbGlwc2UgZmlsbD0nI2M1YzZlMicgc3Ryb2tlLXdpZHRoPSdudWxsJyBzdHJva2Utb3BhY2l0eT0nbnVsbCcgY3g9Jzc5Ljg4NjE1OCcgY3k9Jzg3LjQ1NjU3MycgaWQ9J3N2Z18yNicgcng9Jzc5LjUyNDA3Mycgcnk9JzExLjg3ODIyNicgc3Ryb2tlPSdibGFjaycvPjxyZWN0IHN0cm9rZT0nYmxhY2snIGZpbGw9JyNjNWM2ZTInIHN0cm9rZS13aWR0aD0nbnVsbCcgc3Ryb2tlLW9wYWNpdHk9J251bGwnIGZpbGwtb3BhY2l0eT0nbnVsbCcgeD0nMC4zMzM4NjQnIHk9JzEyLjQ4OTc2Nicgd2lkdGg9JzE1OC45OTg5MzgnIGhlaWdodD0nNzUuMzMyOTAzJyBpZD0nc3ZnXzI3Jy8+PGVsbGlwc2UgZmlsbD0nI2M1YzZlMicgc3Ryb2tlLXdpZHRoPSdudWxsJyBzdHJva2Utb3BhY2l0eT0nbnVsbCcgY3g9Jzc5LjgwMjgyNicgY3k9JzEyLjQ1NzAwMycgaWQ9J3N2Z185JyByeD0nNzkuNTI0MDczJyByeT0nMTEuODc4MjI2JyBzdHJva2U9J2JsYWNrJy8+PHJlY3QgZmlsbD0nI2M1YzZlMicgc3Ryb2tlLXdpZHRoPSdudWxsJyBzdHJva2Utb3BhY2l0eT0nMCcgZmlsbC1vcGFjaXR5PSdudWxsJyB4PScxLjA4Mzg1NicgeT0nODUuMjM5MzU0JyB3aWR0aD0nMTU3LjgzMjI5NCcgaGVpZ2h0PSczLjY2NjY0MicgaWQ9J3N2Z18zMCcgc3Ryb2tlPScjMDAwMDAwJy8+PC9zdmc+XCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgY29uc3Qgc2l6ZTE6IFZlY3RvckFycmF5VHlwZSA9IFsxNjIsIDgyXTtcbiAgY29uc3Qgc2l6ZTI6IFZlY3RvckFycmF5VHlwZSA9IFsxNjAsIDEwMF07XG5cbiAgZm9yIChsZXQgaT0wOyBpPDEyMDA7ICsraSkge1xuICAgIGNvbnN0IHJhbmRGbGFnID0gTWF0aC5yYW5kb20oKSA+IDAuNTtcblxuICAgIGJhdGNoLnB1c2gobmV3IFN2ZyhpKzEwMCwge1xuICAgICAgcG9zaXRpb246IFtNYXRoLnJhbmRvbSgpKmRyYXdlci53aWR0aCwgTWF0aC5yYW5kb20oKSpkcmF3ZXIuaGVpZ2h0XSxcbiAgICAgIHNpemU6IHJhbmRGbGFnID8gc2l6ZTEgOiBzaXplMixcbiAgICAgIGRhdGE6IHJhbmRGbGFnID8gZGF0YTEgOiBkYXRhMixcbiAgICAgIHpJbmRleDogMCxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgfSkpO1xuICB9XG4gIHN0b3JhZ2UuYWRkQmF0Y2goYmF0Y2gpO1xufSwgMTAwMCk7XG5cbi8vIHNldFRpbWVvdXQoKCkgPT4ge1xuLy8gICBzdG9yYWdlLmRlbGV0ZSh7XG4vLyAgICAgdHlwZXNFeGNsdWRlOiBbJ0dyaWQnXSxcbi8vICAgICBleHRyYUZpbHRlcjogaXRlbSA9PiBpdGVtLmNvbmZpZy56SW5kZXggPT09IDAsXG4vLyAgIH0pO1xuLy8gICBzdG9yYWdlLmFkZChuZXcgUmVjdCg1MCwge1xuLy8gICAgIHBvc2l0aW9uOiBbMTAwLCAyNV0sXG4vLyAgICAgc2l6ZTogWzUwLCAzMF0sXG4vLyAgICAgekluZGV4OiAxLFxuLy8gICAgIHZpc2libGU6IHRydWUsXG4vLyAgICAgZmlsbFN0eWxlOiAncmVkJyxcbi8vICAgICBzdHJva2VTdHlsZTogJ2JsYWNrJyxcbi8vICAgICBsaW5lV2lkdGg6IDMsXG4vLyAgIH0pKTtcbi8vIH0sIDEwMDApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9