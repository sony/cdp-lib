module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};
/******/
/******/     // The require function
/******/     function __webpack_require__(moduleId) {
/******/
/******/         // Check if module is in cache
/******/         if(installedModules[moduleId]) {
/******/             return installedModules[moduleId].exports;
/******/         }
/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             i: moduleId,
/******/             l: false,
/******/             exports: {}
/******/         };
/******/
/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/         // Flag the module as loaded
/******/         module.l = true;
/******/
/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }
/******/
/******/
/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;
/******/
/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;
/******/
/******/     // identity function for calling harmony imports with the correct context
/******/     __webpack_require__.i = function(value) { return value; };
/******/
/******/     // define getter function for harmony exports
/******/     __webpack_require__.d = function(exports, name, getter) {
/******/         if(!__webpack_require__.o(exports, name)) {
/******/             Object.defineProperty(exports, name, {
/******/                 configurable: false,
/******/                 enumerable: true,
/******/                 get: getter
/******/             });
/******/         }
/******/     };
/******/
/******/     // getDefaultExport function for compatibility with non-harmony modules
/******/     __webpack_require__.n = function(module) {
/******/         var getter = module && module.__esModule ?
/******/             function getDefault() { return module['default']; } :
/******/             function getModuleExports() { return module; };
/******/         __webpack_require__.d(getter, 'a', getter);
/******/         return getter;
/******/     };
/******/
/******/     // Object.prototype.hasOwnProperty.call
/******/     __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/     // __webpack_public_path__
/******/     __webpack_require__.p = "";
/******/
/******/     // Load entry module and return exports
/******/     return __webpack_require__(__webpack_require__.s = 60);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(3)
var polyfills = __webpack_require__(50)
var legacy = __webpack_require__(49)
var queue = []

var util = __webpack_require__(5)

function noop () {}

var debug = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
  process.on('exit', function() {
    debug(queue)
    __webpack_require__(4).equal(queue.length, 0)
  })
}

module.exports = patch(__webpack_require__(19))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
  module.exports = patch(fs)
}

// Always patch fs.close/closeSync, because we want to
// retry() whenever a close happens *anywhere* in the program.
// This is essential when multiple graceful-fs instances are
// in play at the same time.
module.exports.close =
fs.close = (function (fs$close) { return function (fd, cb) {
  return fs$close.call(fs, fd, function (err) {
    if (!err)
      retry()

    if (typeof cb === 'function')
      cb.apply(this, arguments)
  })
}})(fs.close)

module.exports.closeSync =
fs.closeSync = (function (fs$closeSync) { return function (fd) {
  // Note that graceful-fs also retries when fs.closeSync() fails.
  // Looks like a bug to me, although it's probably a harmless one.
  var rval = fs$closeSync.apply(fs, arguments)
  retry()
  return rval
}})(fs.closeSync)

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch
  fs.FileReadStream = ReadStream;  // Legacy name.
  fs.FileWriteStream = WriteStream;  // Legacy name.
  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile = fs.readFile
  fs.readFile = readFile
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$readdir = fs.readdir
  fs.readdir = readdir
  function readdir (path, options, cb) {
    var args = [path]
    if (typeof options !== 'function') {
      args.push(options)
    } else {
      cb = options
    }
    args.push(go$readdir$cb)

    return go$readdir(args)

    function go$readdir$cb (err, files) {
      if (files && files.sort)
        files.sort()

      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
        enqueue([go$readdir, [args]])
      else {
        if (typeof cb === 'function')
          cb.apply(this, arguments)
        retry()
      }
    }
  }

  function go$readdir (args) {
    return fs$readdir.apply(fs, args)
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream = fs.ReadStream
  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
  ReadStream.prototype.open = ReadStream$open

  var fs$WriteStream = fs.WriteStream
  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
  WriteStream.prototype.open = WriteStream$open

  fs.ReadStream = ReadStream
  fs.WriteStream = WriteStream

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path, options) {
    return new ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new WriteStream(path, options)
  }

  var fs$open = fs.open
  fs.open = open
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1])
  queue.push(elem)
}

function retry () {
  var elem = queue.shift()
  if (elem) {
    debug('RETRY', elem[0].name, elem[1])
    elem[0].apply(null, elem[1])
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  mkdirs: __webpack_require__(9),
  mkdirsSync: __webpack_require__(8),
  // alias
  mkdirp: __webpack_require__(9),
  mkdirpSync: __webpack_require__(8),
  ensureDir: __webpack_require__(9),
  ensureDirSync: __webpack_require__(8)
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function posix(path) {
    return path.charAt(0) === '/';
}

function win32(path) {
    // https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = result[1] || '';
    var isUnc = Boolean(device && device.charAt(1) !== ':');

    // UNC paths are always absolute
    return Boolean(result[2] || isUnc);
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var jsonFile = __webpack_require__(54)

module.exports = {
  // jsonfile exports
  readJson: jsonFile.readFile,
  readJSON: jsonFile.readFile,
  readJsonSync: jsonFile.readFileSync,
  readJSONSync: jsonFile.readFileSync,
  writeJson: jsonFile.writeFile,
  writeJSON: jsonFile.writeFile,
  writeJsonSync: jsonFile.writeFileSync,
  writeJSONSync: jsonFile.writeFileSync,
  spaces: 2 // default in fs-extra
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)
var path = __webpack_require__(0)
var invalidWin32Path = __webpack_require__(14).invalidWin32Path

var o777 = parseInt('0777', 8)

function mkdirsSync (p, opts, made) {
  if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  var mode = opts.mode
  var xfs = opts.fs || fs

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    var errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    throw errInval
  }

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  p = path.resolve(p)

  try {
    xfs.mkdirSync(p, mode)
    made = made || p
  } catch (err0) {
    switch (err0.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) throw err0
        made = mkdirsSync(path.dirname(p), opts, made)
        mkdirsSync(p, opts, made)
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        var stat
        try {
          stat = xfs.statSync(p)
        } catch (err1) {
          throw err0
        }
        if (!stat.isDirectory()) throw err0
        break
    }
  }

  return made
}

module.exports = mkdirsSync


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)
var path = __webpack_require__(0)
var invalidWin32Path = __webpack_require__(14).invalidWin32Path

var o777 = parseInt('0777', 8)

function mkdirs (p, opts, callback, made) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    var errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    return callback(errInval)
  }

  var mode = opts.mode
  var xfs = opts.fs || fs

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  callback = callback || function () {}
  p = path.resolve(p)

  xfs.mkdir(p, mode, function (er) {
    if (!er) {
      made = made || p
      return callback(null, made)
    }
    switch (er.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) return callback(er)
        mkdirs(path.dirname(p), opts, function (er, made) {
          if (er) callback(er, made)
          else mkdirs(p, opts, callback, made)
        })
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        xfs.stat(p, function (er2, stat) {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (er2 || !stat.isDirectory()) callback(er, made)
          else callback(null, made)
        })
        break
    }
  })
}

module.exports = mkdirs


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(0)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(26)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// imported from ncp (this is temporary, will rewrite)

var fs = __webpack_require__(1)
var path = __webpack_require__(0)
var utimes = __webpack_require__(45)

function ncp (source, dest, options, callback) {
  if (!callback) {
    callback = options
    options = {}
  }

  var basePath = process.cwd()
  var currentPath = path.resolve(basePath, source)
  var targetPath = path.resolve(basePath, dest)

  var filter = options.filter
  var transform = options.transform
  var clobber = options.clobber !== false
  var dereference = options.dereference
  var preserveTimestamps = options.preserveTimestamps === true

  var errs = null

  var started = 0
  var finished = 0
  var running = 0
  // this is pretty useless now that we're using graceful-fs
  // consider removing
  var limit = options.limit || 512

  startCopy(currentPath)

  function startCopy (source) {
    started++
    if (filter) {
      if (filter instanceof RegExp) {
        if (!filter.test(source)) {
          return doneOne(true)
        }
      } else if (typeof filter === 'function') {
        if (!filter(source)) {
          return doneOne(true)
        }
      }
    }
    return getStats(source)
  }

  function getStats (source) {
    var stat = dereference ? fs.stat : fs.lstat
    if (running >= limit) {
      return setImmediate(function () {
        getStats(source)
      })
    }
    running++
    stat(source, function (err, stats) {
      if (err) return onError(err)

      // We need to get the mode from the stats object and preserve it.
      var item = {
        name: source,
        mode: stats.mode,
        mtime: stats.mtime, // modified time
        atime: stats.atime, // access time
        stats: stats // temporary
      }

      if (stats.isDirectory()) {
        return onDir(item)
      } else if (stats.isFile() || stats.isCharacterDevice() || stats.isBlockDevice()) {
        return onFile(item)
      } else if (stats.isSymbolicLink()) {
        // Symlinks don't really need to know about the mode.
        return onLink(source)
      }
    })
  }

  function onFile (file) {
    var target = file.name.replace(currentPath, targetPath)
    isWritable(target, function (writable) {
      if (writable) {
        copyFile(file, target)
      } else {
        if (clobber) {
          rmFile(target, function () {
            copyFile(file, target)
          })
        } else {
          doneOne()
        }
      }
    })
  }

  function copyFile (file, target) {
    var readStream = fs.createReadStream(file.name)
    var writeStream = fs.createWriteStream(target, { mode: file.mode })

    readStream.on('error', onError)
    writeStream.on('error', onError)

    if (transform) {
      transform(readStream, writeStream, file)
    } else {
      writeStream.on('open', function () {
        readStream.pipe(writeStream)
      })
    }

    writeStream.once('finish', function () {
      fs.chmod(target, file.mode, function (err) {
        if (err) return onError(err)
        if (preserveTimestamps) {
          utimes.utimesMillis(target, file.atime, file.mtime, function (err) {
            if (err) return onError(err)
            return doneOne()
          })
        } else {
          doneOne()
        }
      })
    })
  }

  function rmFile (file, done) {
    fs.unlink(file, function (err) {
      if (err) return onError(err)
      return done()
    })
  }

  function onDir (dir) {
    var target = dir.name.replace(currentPath, targetPath)
    isWritable(target, function (writable) {
      if (writable) {
        return mkDir(dir, target)
      }
      copyDir(dir.name)
    })
  }

  function mkDir (dir, target) {
    fs.mkdir(target, dir.mode, function (err) {
      if (err) return onError(err)
      // despite setting mode in fs.mkdir, doesn't seem to work
      // so we set it here.
      fs.chmod(target, dir.mode, function (err) {
        if (err) return onError(err)
        copyDir(dir.name)
      })
    })
  }

  function copyDir (dir) {
    fs.readdir(dir, function (err, items) {
      if (err) return onError(err)
      items.forEach(function (item) {
        startCopy(path.join(dir, item))
      })
      return doneOne()
    })
  }

  function onLink (link) {
    var target = link.replace(currentPath, targetPath)
    fs.readlink(link, function (err, resolvedPath) {
      if (err) return onError(err)
      checkLink(resolvedPath, target)
    })
  }

  function checkLink (resolvedPath, target) {
    if (dereference) {
      resolvedPath = path.resolve(basePath, resolvedPath)
    }
    isWritable(target, function (writable) {
      if (writable) {
        return makeLink(resolvedPath, target)
      }
      fs.readlink(target, function (err, targetDest) {
        if (err) return onError(err)

        if (dereference) {
          targetDest = path.resolve(basePath, targetDest)
        }
        if (targetDest === resolvedPath) {
          return doneOne()
        }
        return rmFile(target, function () {
          makeLink(resolvedPath, target)
        })
      })
    })
  }

  function makeLink (linkPath, target) {
    fs.symlink(linkPath, target, function (err) {
      if (err) return onError(err)
      return doneOne()
    })
  }

  function isWritable (path, done) {
    fs.lstat(path, function (err) {
      if (err) {
        if (err.code === 'ENOENT') return done(true)
        return done(false)
      }
      return done(false)
    })
  }

  function onError (err) {
    if (options.stopOnError) {
      return callback(err)
    } else if (!errs && options.errs) {
      errs = fs.createWriteStream(options.errs)
    } else if (!errs) {
      errs = []
    }
    if (typeof errs.write === 'undefined') {
      errs.push(err)
    } else {
      errs.write(err.stack + '\n\n')
    }
    return doneOne()
  }

  function doneOne (skipped) {
    if (!skipped) running--
    finished++
    if ((started === finished) && (running === 0)) {
      if (callback !== undefined) {
        return errs ? callback(errs) : callback(null)
      }
    }
  }
}

module.exports = ncp


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)
var path = __webpack_require__(0)
var jsonFile = __webpack_require__(7)
var mkdir = __webpack_require__(2)

function outputJsonSync (file, data, options) {
  var dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  jsonFile.writeJsonSync(file, data, options)
}

module.exports = outputJsonSync


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)
var path = __webpack_require__(0)
var jsonFile = __webpack_require__(7)
var mkdir = __webpack_require__(2)

function outputJson (file, data, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var dir = path.dirname(file)

  fs.exists(dir, function (itDoes) {
    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

    mkdir.mkdirs(dir, function (err) {
      if (err) return callback(err)
      jsonFile.writeJson(file, data, options, callback)
    })
  })
}

module.exports = outputJson


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path = __webpack_require__(0)

// get drive on windows
function getRootPath (p) {
  p = path.normalize(path.resolve(p)).split(path.sep)
  if (p.length > 0) return p[0]
  else return null
}

// http://stackoverflow.com/a/62888/10333 contains more accurate
// TODO: expand to include the rest
var INVALID_PATH_CHARS = /[<>:"|?*]/

function invalidWin32Path (p) {
  var rp = getRootPath(p)
  p = p.replace(rp, '')
  return INVALID_PATH_CHARS.test(p)
}

module.exports = {
  getRootPath: getRootPath,
  invalidWin32Path: invalidWin32Path
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var rimraf = __webpack_require__(21)

function removeSync (dir) {
  return rimraf.sync(dir)
}

function remove (dir, callback) {
  return callback ? rimraf(dir, callback) : rimraf(dir, function () {})
}

module.exports = {
  remove: remove,
  removeSync: removeSync
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = realpath
realpath.realpath = realpath
realpath.sync = realpathSync
realpath.realpathSync = realpathSync
realpath.monkeypatch = monkeypatch
realpath.unmonkeypatch = unmonkeypatch

var fs = __webpack_require__(3)
var origRealpath = fs.realpath
var origRealpathSync = fs.realpathSync

var version = process.version
var ok = /^v[0-5]\./.test(version)
var old = __webpack_require__(47)

function newError (er) {
  return er && er.syscall === 'realpath' && (
    er.code === 'ELOOP' ||
    er.code === 'ENOMEM' ||
    er.code === 'ENAMETOOLONG'
  )
}

function realpath (p, cache, cb) {
  if (ok) {
    return origRealpath(p, cache, cb)
  }

  if (typeof cache === 'function') {
    cb = cache
    cache = null
  }
  origRealpath(p, cache, function (er, result) {
    if (newError(er)) {
      old.realpath(p, cache, cb)
    } else {
      cb(er, result)
    }
  })
}

function realpathSync (p, cache) {
  if (ok) {
    return origRealpathSync(p, cache)
  }

  try {
    return origRealpathSync(p, cache)
  } catch (er) {
    if (newError(er)) {
      return old.realpathSync(p, cache)
    } else {
      throw er
    }
  }
}

function monkeypatch () {
  fs.realpath = realpath
  fs.realpathSync = realpathSync
}

function unmonkeypatch () {
  fs.realpath = origRealpath
  fs.realpathSync = origRealpathSync
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports.alphasort = alphasort
exports.alphasorti = alphasorti
exports.setopts = setopts
exports.ownProp = ownProp
exports.makeAbs = makeAbs
exports.finish = finish
exports.mark = mark
exports.isIgnored = isIgnored
exports.childrenIgnored = childrenIgnored

function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}

var path = __webpack_require__(0)
var minimatch = __webpack_require__(10)
var isAbsolute = __webpack_require__(6)
var Minimatch = minimatch.Minimatch

function alphasorti (a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

function alphasort (a, b) {
  return a.localeCompare(b)
}

function setupIgnores (self, options) {
  self.ignore = options.ignore || []

  if (!Array.isArray(self.ignore))
    self.ignore = [self.ignore]

  if (self.ignore.length) {
    self.ignore = self.ignore.map(ignoreMap)
  }
}

// ignore patterns are always in dot:true mode.
function ignoreMap (pattern) {
  var gmatcher = null
  if (pattern.slice(-3) === '/**') {
    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
    gmatcher = new Minimatch(gpattern, { dot: true })
  }

  return {
    matcher: new Minimatch(pattern, { dot: true }),
    gmatcher: gmatcher
  }
}

function setopts (self, pattern, options) {
  if (!options)
    options = {}

  // base-matching: just use globstar for that.
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    if (options.noglobstar) {
      throw new Error("base matching requires globstar")
    }
    pattern = "**/" + pattern
  }

  self.silent = !!options.silent
  self.pattern = pattern
  self.strict = options.strict !== false
  self.realpath = !!options.realpath
  self.realpathCache = options.realpathCache || Object.create(null)
  self.follow = !!options.follow
  self.dot = !!options.dot
  self.mark = !!options.mark
  self.nodir = !!options.nodir
  if (self.nodir)
    self.mark = true
  self.sync = !!options.sync
  self.nounique = !!options.nounique
  self.nonull = !!options.nonull
  self.nosort = !!options.nosort
  self.nocase = !!options.nocase
  self.stat = !!options.stat
  self.noprocess = !!options.noprocess
  self.absolute = !!options.absolute

  self.maxLength = options.maxLength || Infinity
  self.cache = options.cache || Object.create(null)
  self.statCache = options.statCache || Object.create(null)
  self.symlinks = options.symlinks || Object.create(null)

  setupIgnores(self, options)

  self.changedCwd = false
  var cwd = process.cwd()
  if (!ownProp(options, "cwd"))
    self.cwd = cwd
  else {
    self.cwd = path.resolve(options.cwd)
    self.changedCwd = self.cwd !== cwd
  }

  self.root = options.root || path.resolve(self.cwd, "/")
  self.root = path.resolve(self.root)
  if (process.platform === "win32")
    self.root = self.root.replace(/\\/g, "/")

  self.cwdAbs = makeAbs(self, self.cwd)
  self.nomount = !!options.nomount

  // disable comments and negation in Minimatch.
  // Note that they are not supported in Glob itself anyway.
  options.nonegate = true
  options.nocomment = true

  self.minimatch = new Minimatch(pattern, options)
  self.options = self.minimatch.options
}

function finish (self) {
  var nou = self.nounique
  var all = nou ? [] : Object.create(null)

  for (var i = 0, l = self.matches.length; i < l; i ++) {
    var matches = self.matches[i]
    if (!matches || Object.keys(matches).length === 0) {
      if (self.nonull) {
        // do like the shell, and spit out the literal glob
        var literal = self.minimatch.globSet[i]
        if (nou)
          all.push(literal)
        else
          all[literal] = true
      }
    } else {
      // had matches
      var m = Object.keys(matches)
      if (nou)
        all.push.apply(all, m)
      else
        m.forEach(function (m) {
          all[m] = true
        })
    }
  }

  if (!nou)
    all = Object.keys(all)

  if (!self.nosort)
    all = all.sort(self.nocase ? alphasorti : alphasort)

  // at *some* point we statted all of these
  if (self.mark) {
    for (var i = 0; i < all.length; i++) {
      all[i] = self._mark(all[i])
    }
    if (self.nodir) {
      all = all.filter(function (e) {
        var notDir = !(/\/$/.test(e))
        var c = self.cache[e] || self.cache[makeAbs(self, e)]
        if (notDir && c)
          notDir = c !== 'DIR' && !Array.isArray(c)
        return notDir
      })
    }
  }

  if (self.ignore.length)
    all = all.filter(function(m) {
      return !isIgnored(self, m)
    })

  self.found = all
}

function mark (self, p) {
  var abs = makeAbs(self, p)
  var c = self.cache[abs]
  var m = p
  if (c) {
    var isDir = c === 'DIR' || Array.isArray(c)
    var slash = p.slice(-1) === '/'

    if (isDir && !slash)
      m += '/'
    else if (!isDir && slash)
      m = m.slice(0, -1)

    if (m !== p) {
      var mabs = makeAbs(self, m)
      self.statCache[mabs] = self.statCache[abs]
      self.cache[mabs] = self.cache[abs]
    }
  }

  return m
}

// lotta situps...
function makeAbs (self, f) {
  var abs = f
  if (f.charAt(0) === '/') {
    abs = path.join(self.root, f)
  } else if (isAbsolute(f) || f === '') {
    abs = f
  } else if (self.changedCwd) {
    abs = path.resolve(self.cwd, f)
  } else {
    abs = path.resolve(f)
  }

  if (process.platform === 'win32')
    abs = abs.replace(/\\/g, '/')

  return abs
}


// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
function isIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
  })
}

function childrenIgnored (self, path) {
  if (!self.ignore.length)
    return false

  return self.ignore.some(function(item) {
    return !!(item.gmatcher && item.gmatcher.match(path))
  })
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// Approach:
//
// 1. Get the minimatch set
// 2. For each pattern in the set, PROCESS(pattern, false)
// 3. Store matches per-set, then uniq them
//
// PROCESS(pattern, inGlobStar)
// Get the first [n] items from pattern that are all strings
// Join these together.  This is PREFIX.
//   If there is no more remaining, then stat(PREFIX) and
//   add to matches if it succeeds.  END.
//
// If inGlobStar and PREFIX is symlink and points to dir
//   set ENTRIES = []
// else readdir(PREFIX) as ENTRIES
//   If fail, END
//
// with ENTRIES
//   If pattern[n] is GLOBSTAR
//     // handle the case where the globstar match is empty
//     // by pruning it out, and testing the resulting pattern
//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
//     // handle other cases.
//     for ENTRY in ENTRIES (not dotfiles)
//       // attach globstar + tail onto the entry
//       // Mark that this entry is a globstar match
//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
//
//   else // not globstar
//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
//       Test ENTRY against pattern[n]
//       If fails, continue
//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
//
// Caveat:
//   Cache all stats and readdirs results to minimize syscall.  Since all
//   we ever care about is existence and directory-ness, we can just keep
//   `true` for files, and [children,...] for directories, or `false` for
//   things that don't exist.

module.exports = glob

var fs = __webpack_require__(3)
var rp = __webpack_require__(16)
var minimatch = __webpack_require__(10)
var Minimatch = minimatch.Minimatch
var inherits = __webpack_require__(52)
var EE = __webpack_require__(58).EventEmitter
var path = __webpack_require__(0)
var assert = __webpack_require__(4)
var isAbsolute = __webpack_require__(6)
var globSync = __webpack_require__(48)
var common = __webpack_require__(17)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = __webpack_require__(51)
var util = __webpack_require__(5)
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

var once = __webpack_require__(20)

function glob (pattern, options, cb) {
  if (typeof options === 'function') cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

// old api surface
glob.glob = glob

function extend (origin, add) {
  if (add === null || typeof add !== 'object') {
    return origin
  }

  var keys = Object.keys(add)
  var i = keys.length
  while (i--) {
    origin[keys[i]] = add[keys[i]]
  }
  return origin
}

glob.hasMagic = function (pattern, options_) {
  var options = extend({}, options_)
  options.noprocess = true

  var g = new Glob(pattern, options)
  var set = g.minimatch.set

  if (!pattern)
    return false

  if (set.length > 1)
    return true

  for (var j = 0; j < set[0].length; j++) {
    if (typeof set[0][j] !== 'string')
      return true
  }

  return false
}

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)
  this._didRealPath = false

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === 'function') {
    cb = once(cb)
    this.on('error', cb)
    this.on('end', function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  var n = this.minimatch.set.length
  this._processing = 0
  this.matches = new Array(n)

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (this.noprocess)
    return this

  if (n === 0)
    return done()

  var sync = true
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false, done)
  }
  sync = false

  function done () {
    --self._processing
    if (self._processing <= 0) {
      if (sync) {
        process.nextTick(function () {
          self._finish()
        })
      } else {
        self._finish()
      }
    }
  }
}

Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  if (this.aborted)
    return

  if (this.realpath && !this._didRealpath)
    return this._realpath()

  common.finish(this)
  this.emit('end', this.found)
}

Glob.prototype._realpath = function () {
  if (this._didRealpath)
    return

  this._didRealpath = true

  var n = this.matches.length
  if (n === 0)
    return this._finish()

  var self = this
  for (var i = 0; i < this.matches.length; i++)
    this._realpathSet(i, next)

  function next () {
    if (--n === 0)
      self._finish()
  }
}

Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  if (!matchset)
    return cb()

  var found = Object.keys(matchset)
  var self = this
  var n = found.length

  if (n === 0)
    return cb()

  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    // If there's a problem with the stat, then it means that
    // one or more of the links in the realpath couldn't be
    // resolved.  just return the abs value in that case.
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
      if (!er)
        set[real] = true
      else if (er.syscall === 'stat')
        set[p] = true
      else
        self.emit('error', er) // srsly wtf right here

      if (--n === 0) {
        self.matches[index] = set
        cb()
      }
    })
  })
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit('abort')
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit('pause')
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit('resume')
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
        var e = eq[i]
        this._emitMatch(e[0], e[1])
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      this._processQueue.length = 0
      for (var i = 0; i < pq.length; i ++) {
        var p = pq[i]
        this._processing--
        this._process(p[0], p[1], p[2], p[3])
      }
    }
  }
}

Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  if (this.aborted)
    return

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error('PROCESS %d', this._processing, pattern)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip _processing
  if (childrenIgnored(this, read))
    return cb()

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}

Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return cb()

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return cb()
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix) {
      if (prefix !== '/')
        e = prefix + '/' + e
      else
        e = prefix + e
    }
    this._process([e].concat(remain), index, inGlobStar, cb)
  }
  cb()
}

Glob.prototype._emitMatch = function (index, e) {
  if (this.aborted)
    return

  if (isIgnored(this, e))
    return

  if (this.paused) {
    this._emitQueue.push([index, e])
    return
  }

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute)
    e = abs

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  var st = this.statCache[abs]
  if (st)
    this.emit('stat', e, st)

  this.emit('match', e)
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  if (this.aborted)
    return

  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false, cb)

  var lstatkey = 'lstat\0' + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er)
      return cb()

    var isSym = lstat.isSymbolicLink()
    self.symlinks[abs] = isSym

    // If it's not a symlink or a dir, then it's definitely a regular file.
    // don't bother doing a readdir in that case.
    if (!isSym && !lstat.isDirectory()) {
      self.cache[abs] = 'FILE'
      cb()
    } else
      self._readdir(abs, false, cb)
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  if (this.aborted)
    return

  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
  if (!cb)
    return

  //console.error('RD %j %j', +inGlobStar, abs)
  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  if (this.aborted)
    return

  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries
  return cb(null, entries)
}

Glob.prototype._readdirError = function (f, er, cb) {
  if (this.aborted)
    return

  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        this.emit('error', error)
        this.abort()
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict) {
        this.emit('error', er)
        // If the error is handled, then we abort
        // if not, we threw out of here
        this.abort()
      }
      if (!this.silent)
        console.error('glob error', er)
      break
  }

  return cb()
}

Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}


Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  //console.error('pgs2', prefix, remain[0], entries)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return cb()

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false, cb)

  var isSym = this.symlinks[abs]
  var len = entries.length

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return cb()

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true, cb)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true, cb)
  }

  cb()
}

Glob.prototype._processSimple = function (prefix, index, cb) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var self = this
  this._stat(prefix, function (er, exists) {
    self._processSimple2(prefix, index, er, exists, cb)
  })
}
Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

  //console.error('ps2', prefix, exists)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return cb()

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
  cb()
}

// Returns either 'DIR', 'FILE', or false
Glob.prototype._stat = function (f, cb) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return cb()

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return cb(null, c)

    if (needDir && c === 'FILE')
      return cb()

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (stat !== undefined) {
    if (stat === false)
      return cb(null, stat)
    else {
      var type = stat.isDirectory() ? 'DIR' : 'FILE'
      if (needDir && type === 'FILE')
        return cb()
      else
        return cb(null, type, stat)
    }
  }

  var self = this
  var statcb = inflight('stat\0' + abs, lstatcb_)
  if (statcb)
    fs.lstat(abs, statcb)

  function lstatcb_ (er, lstat) {
    if (lstat && lstat.isSymbolicLink()) {
      // If it's a symlink, then treat it as the target, unless
      // the target does not exist, then treat it as a file.
      return fs.stat(abs, function (er, stat) {
        if (er)
          self._stat2(f, abs, null, lstat, cb)
        else
          self._stat2(f, abs, er, stat, cb)
      })
    } else {
      self._stat2(f, abs, er, lstat, cb)
    }
  }
}

Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
  if (er) {
    this.statCache[abs] = false
    return cb()
  }

  var needDir = f.slice(-1) === '/'
  this.statCache[abs] = stat

  if (abs.slice(-1) === '/' && !stat.isDirectory())
    return cb(null, false, stat)

  var c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c !== 'DIR')
    return cb()

  return cb(null, c, stat)
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(3)

module.exports = clone(fs)

function clone (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: obj.__proto__ }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(22)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = rimraf
rimraf.sync = rimrafSync

var assert = __webpack_require__(4)
var path = __webpack_require__(0)
var fs = __webpack_require__(3)
var glob = __webpack_require__(18)

var defaultGlobOpts = {
  nosort: true,
  silent: true
}

// for EMFILE handling
var timeout = 0

var isWindows = (process.platform === "win32")

function defaults (options) {
  var methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(function(m) {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
  options.emfileWait = options.emfileWait || 1000
  if (options.glob === false) {
    options.disableGlob = true
  }
  options.disableGlob = options.disableGlob || false
  options.glob = options.glob || defaultGlobOpts
}

function rimraf (p, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert.equal(typeof cb, 'function', 'rimraf: callback function required')
  assert(options, 'rimraf: invalid options argument provided')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  defaults(options)

  var busyTries = 0
  var errState = null
  var n = 0

  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p])

  options.lstat(p, function (er, stat) {
    if (!er)
      return afterGlob(null, [p])

    glob(p, options.glob, afterGlob)
  })

  function next (er) {
    errState = errState || er
    if (--n === 0)
      cb(errState)
  }

  function afterGlob (er, results) {
    if (er)
      return cb(er)

    n = results.length
    if (n === 0)
      return cb()

    results.forEach(function (p) {
      rimraf_(p, options, function CB (er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
              busyTries < options.maxBusyTries) {
            busyTries ++
            var time = busyTries * 100
            // try again, with the same exact callback as this one.
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, time)
          }

          // this one won't happen if graceful-fs is used.
          if (er.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(function () {
              rimraf_(p, options, CB)
            }, timeout ++)
          }

          // already gone
          if (er.code === "ENOENT") er = null
        }

        timeout = 0
        next(er)
      })
    })
  }
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  // sunos lets the root user unlink directories, which is... weird.
  // so we have to lstat here and make sure it's not a dir.
  options.lstat(p, function (er, st) {
    if (er && er.code === "ENOENT")
      return cb(null)

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb)

    if (st && st.isDirectory())
      return rmdir(p, options, er, cb)

    options.unlink(p, function (er) {
      if (er) {
        if (er.code === "ENOENT")
          return cb(null)
        if (er.code === "EPERM")
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        if (er.code === "EISDIR")
          return rmdir(p, options, er, cb)
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er)
    assert(er instanceof Error)

  options.chmod(p, 666, function (er2) {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er)
    else
      options.stat(p, function(er3, stats) {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er)
        else if (stats.isDirectory())
          rmdir(p, options, er, cb)
        else
          options.unlink(p, cb)
      })
  })
}

function fixWinEPERMSync (p, options, er) {
  assert(p)
  assert(options)
  if (er)
    assert(er instanceof Error)

  try {
    options.chmodSync(p, 666)
  } catch (er2) {
    if (er2.code === "ENOENT")
      return
    else
      throw er
  }

  try {
    var stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === "ENOENT")
      return
    else
      throw er
  }

  if (stats.isDirectory())
    rmdirSync(p, options, er)
  else
    options.unlinkSync(p)
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, function (er) {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb)
    else if (er && er.code === "ENOTDIR")
      cb(originalEr)
    else
      cb(er)
  })
}

function rmkids(p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, function (er, files) {
    if (er)
      return cb(er)
    var n = files.length
    if (n === 0)
      return options.rmdir(p, cb)
    var errState
    files.forEach(function (f) {
      rimraf(path.join(p, f), options, function (er) {
        if (errState)
          return
        if (er)
          return cb(errState = er)
        if (--n === 0)
          options.rmdir(p, cb)
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  var results

  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p]
  } else {
    try {
      options.lstatSync(p)
      results = [p]
    } catch (er) {
      results = glob.sync(p, options.glob)
    }
  }

  if (!results.length)
    return

  for (var i = 0; i < results.length; i++) {
    var p = results[i]

    try {
      var st = options.lstatSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return

      // Windows can EPERM on stat.  Life is suffering.
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p, options, er)
    }

    try {
      // sunos lets the root user unlink directories, which is... weird.
      if (st && st.isDirectory())
        rmdirSync(p, options, null)
      else
        options.unlinkSync(p)
    } catch (er) {
      if (er.code === "ENOENT")
        return
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
      if (er.code !== "EISDIR")
        throw er

      rmdirSync(p, options, er)
    }
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr)
    assert(originalEr instanceof Error)

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === "ENOENT")
      return
    if (er.code === "ENOTDIR")
      throw originalEr
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options)
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(function (f) {
    rimrafSync(path.join(p, f), options)
  })

  // We only end up here once we got ENOTEMPTY at least once, and
  // at this point, we are guaranteed to have removed all the kids.
  // So, we know that it won't be ENOENT or ENOTDIR or anything else.
  // try really hard to delete stuff on windows, because it has a
  // PROFOUNDLY annoying habit of not closing handles promptly when
  // files are deleted, resulting in spurious ENOTEMPTY errors.
  var retries = isWindows ? 100 : 1
  var i = 0
  do {
    var threw = true
    try {
      var ret = options.rmdirSync(p, options)
      threw = false
      return ret
    } finally {
      if (++i < retries && threw)
        continue
    }
  } while (true)
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(40);
/**
 * @class CDPLib
 * @brief CDP boilerplate 生成機能を提供するクラス
 */
class CDPLib {
    /**
     * main command
     */
    execute(options) {
        if (fs.existsSync("package.json")) {
            console.log("ok");
        }
        else {
            console.log("ng");
        }
    }
}
exports.CDPLib = CDPLib;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(27);
var balanced = __webpack_require__(25);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)

var BUF_LENGTH = 64 * 1024
var _buff = new Buffer(BUF_LENGTH)

function copyFileSync (srcFile, destFile, options) {
  var clobber = options.clobber
  var preserveTimestamps = options.preserveTimestamps

  if (fs.existsSync(destFile)) {
    if (clobber) {
      fs.chmodSync(destFile, parseInt('777', 8))
      fs.unlinkSync(destFile)
    } else {
      throw Error('EEXIST')
    }
  }

  var fdr = fs.openSync(srcFile, 'r')
  var stat = fs.fstatSync(fdr)
  var fdw = fs.openSync(destFile, 'w', stat.mode)
  var bytesRead = 1
  var pos = 0

  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  if (preserveTimestamps) {
    fs.futimesSync(fdw, stat.atime, stat.mtime)
  }

  fs.closeSync(fdr)
  fs.closeSync(fdw)
}

module.exports = copyFileSync


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)
var path = __webpack_require__(0)
var copyFileSync = __webpack_require__(28)
var mkdir = __webpack_require__(2)

function copySync (src, dest, options) {
  if (typeof options === 'function' || options instanceof RegExp) {
    options = {filter: options}
  }

  options = options || {}
  options.recursive = !!options.recursive

  // default to true for now
  options.clobber = 'clobber' in options ? !!options.clobber : true
  options.dereference = 'dereference' in options ? !!options.dereference : false
  options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false

  options.filter = options.filter || function () { return true }

  var stats = (options.recursive && !options.dereference) ? fs.lstatSync(src) : fs.statSync(src)
  var destFolder = path.dirname(dest)
  var destFolderExists = fs.existsSync(destFolder)
  var performCopy = false

  if (stats.isFile()) {
    if (options.filter instanceof RegExp) performCopy = options.filter.test(src)
    else if (typeof options.filter === 'function') performCopy = options.filter(src)

    if (performCopy) {
      if (!destFolderExists) mkdir.mkdirsSync(destFolder)
      copyFileSync(src, dest, {clobber: options.clobber, preserveTimestamps: options.preserveTimestamps})
    }
  } else if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) mkdir.mkdirsSync(dest)
    var contents = fs.readdirSync(src)
    contents.forEach(function (content) {
      var opts = options
      opts.recursive = true
      copySync(path.join(src, content), path.join(dest, content), opts)
    })
  } else if (options.recursive && stats.isSymbolicLink()) {
    var srcPath = fs.readlinkSync(src)
    fs.symlinkSync(srcPath, dest)
  }
}

module.exports = copySync


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  copySync: __webpack_require__(29)
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)
var path = __webpack_require__(0)
var ncp = __webpack_require__(11)
var mkdir = __webpack_require__(2)

function copy (src, dest, options, callback) {
  if (typeof options === 'function' && !callback) {
    callback = options
    options = {}
  } else if (typeof options === 'function' || options instanceof RegExp) {
    options = {filter: options}
  }
  callback = callback || function () {}
  options = options || {}

  // don't allow src and dest to be the same
  var basePath = process.cwd()
  var currentPath = path.resolve(basePath, src)
  var targetPath = path.resolve(basePath, dest)
  if (currentPath === targetPath) return callback(new Error('Source and destination must not be the same.'))

  fs.lstat(src, function (err, stats) {
    if (err) return callback(err)

    var dir = null
    if (stats.isDirectory()) {
      var parts = dest.split(path.sep)
      parts.pop()
      dir = parts.join(path.sep)
    } else {
      dir = path.dirname(dest)
    }

    fs.exists(dir, function (dirExists) {
      if (dirExists) return ncp(src, dest, options, callback)
      mkdir.mkdirs(dir, function (err) {
        if (err) return callback(err)
        ncp(src, dest, options, callback)
      })
    })
  })
}

module.exports = copy


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  copy: __webpack_require__(31)
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(3)
var path = __webpack_require__(0)
var mkdir = __webpack_require__(2)
var remove = __webpack_require__(15)

function emptyDir (dir, callback) {
  callback = callback || function () {}
  fs.readdir(dir, function (err, items) {
    if (err) return mkdir.mkdirs(dir, callback)

    items = items.map(function (item) {
      return path.join(dir, item)
    })

    deleteItem()

    function deleteItem () {
      var item = items.pop()
      if (!item) return callback()
      remove.remove(item, function (err) {
        if (err) return callback(err)
        deleteItem()
      })
    }
  })
}

function emptyDirSync (dir) {
  var items
  try {
    items = fs.readdirSync(dir)
  } catch (err) {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach(function (item) {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

module.exports = {
  emptyDirSync: emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir: emptyDir,
  emptydir: emptyDir
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0)
var fs = __webpack_require__(1)
var mkdir = __webpack_require__(2)

function createFile (file, callback) {
  function makeFile () {
    fs.writeFile(file, '', function (err) {
      if (err) return callback(err)
      callback()
    })
  }

  fs.exists(file, function (fileExists) {
    if (fileExists) return callback()
    var dir = path.dirname(file)
    fs.exists(dir, function (dirExists) {
      if (dirExists) return makeFile()
      mkdir.mkdirs(dir, function (err) {
        if (err) return callback(err)
        makeFile()
      })
    })
  })
}

function createFileSync (file) {
  if (fs.existsSync(file)) return

  var dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  fs.writeFileSync(file, '')
}

module.exports = {
  createFile: createFile,
  createFileSync: createFileSync,
  // alias
  ensureFile: createFile,
  ensureFileSync: createFileSync
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var file = __webpack_require__(34)
var link = __webpack_require__(36)
var symlink = __webpack_require__(39)

module.exports = {
  // file
  createFile: file.createFile,
  createFileSync: file.createFileSync,
  ensureFile: file.createFile,
  ensureFileSync: file.createFileSync,
  // link
  createLink: link.createLink,
  createLinkSync: link.createLinkSync,
  ensureLink: link.createLink,
  ensureLinkSync: link.createLinkSync,
  // symlink
  createSymlink: symlink.createSymlink,
  createSymlinkSync: symlink.createSymlinkSync,
  ensureSymlink: symlink.createSymlink,
  ensureSymlinkSync: symlink.createSymlinkSync
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0)
var fs = __webpack_require__(1)
var mkdir = __webpack_require__(2)

function createLink (srcpath, dstpath, callback) {
  function makeLink (srcpath, dstpath) {
    fs.link(srcpath, dstpath, function (err) {
      if (err) return callback(err)
      callback(null)
    })
  }

  fs.exists(dstpath, function (destinationExists) {
    if (destinationExists) return callback(null)
    fs.lstat(srcpath, function (err, stat) {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }

      var dir = path.dirname(dstpath)
      fs.exists(dir, function (dirExists) {
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, function (err) {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath, dstpath, callback) {
  var destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  try {
    fs.lstatSync(srcpath)
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  var dir = path.dirname(dstpath)
  var dirExists = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

module.exports = {
  createLink: createLink,
  createLinkSync: createLinkSync,
  // alias
  ensureLink: createLink,
  ensureLinkSync: createLinkSync
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0)
// path.isAbsolute shim for Node.js 0.10 support
path.isAbsolute = (path.isAbsolute) ? path.isAbsolute : __webpack_require__(6)
var fs = __webpack_require__(1)

/**
 * Function that returns two types of paths, one relative to symlink, and one
 * relative to the current working directory. Checks if path is absolute or
 * relative. If the path is relative, this function checks if the path is
 * relative to symlink or relative to current working directory. This is an
 * initiative to find a smarter `srcpath` to supply when building symlinks.
 * This allows you to determine which path to use out of one of three possible
 * types of source paths. The first is an absolute path. This is detected by
 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
 * see if it exists. If it does it's used, if not an error is returned
 * (callback)/ thrown (sync). The other two options for `srcpath` are a
 * relative url. By default Node's `fs.symlink` works by creating a symlink
 * using `dstpath` and expects the `srcpath` to be relative to the newly
 * created symlink. If you provide a `srcpath` that does not exist on the file
 * system it results in a broken symlink. To minimize this, the function
 * checks to see if the 'relative to symlink' source file exists, and if it
 * does it will use it. If it does not, it checks if there's a file that
 * exists that is relative to the current working directory, if does its used.
 * This preserves the expectations of the original fs.symlink spec and adds
 * the ability to pass in `relative to current working direcotry` paths.
 */

function symlinkPaths (srcpath, dstpath, callback) {
  if (path.isAbsolute(srcpath)) {
    return fs.lstat(srcpath, function (err, stat) {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureSymlink')
        return callback(err)
      }
      return callback(null, {
        'toCwd': srcpath,
        'toDst': srcpath
      })
    })
  } else {
    var dstdir = path.dirname(dstpath)
    var relativeToDst = path.join(dstdir, srcpath)
    return fs.exists(relativeToDst, function (exists) {
      if (exists) {
        return callback(null, {
          'toCwd': relativeToDst,
          'toDst': srcpath
        })
      } else {
        return fs.lstat(srcpath, function (err, stat) {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink')
            return callback(err)
          }
          return callback(null, {
            'toCwd': srcpath,
            'toDst': path.relative(dstdir, srcpath)
          })
        })
      }
    })
  }
}

function symlinkPathsSync (srcpath, dstpath) {
  var exists
  if (path.isAbsolute(srcpath)) {
    exists = fs.existsSync(srcpath)
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      'toCwd': srcpath,
      'toDst': srcpath
    }
  } else {
    var dstdir = path.dirname(dstpath)
    var relativeToDst = path.join(dstdir, srcpath)
    exists = fs.existsSync(relativeToDst)
    if (exists) {
      return {
        'toCwd': relativeToDst,
        'toDst': srcpath
      }
    } else {
      exists = fs.existsSync(srcpath)
      if (!exists) throw new Error('relative srcpath does not exist')
      return {
        'toCwd': srcpath,
        'toDst': path.relative(dstdir, srcpath)
      }
    }
  }
}

module.exports = {
  'symlinkPaths': symlinkPaths,
  'symlinkPathsSync': symlinkPathsSync
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)

function symlinkType (srcpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type
  if (type) return callback(null, type)
  fs.lstat(srcpath, function (err, stats) {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
    callback(null, type)
  })
}

function symlinkTypeSync (srcpath, type) {
  if (type) return type
  try {
    var stats = fs.lstatSync(srcpath)
  } catch (e) {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

module.exports = {
  symlinkType: symlinkType,
  symlinkTypeSync: symlinkTypeSync
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0)
var fs = __webpack_require__(1)
var _mkdirs = __webpack_require__(2)
var mkdirs = _mkdirs.mkdirs
var mkdirsSync = _mkdirs.mkdirsSync

var _symlinkPaths = __webpack_require__(37)
var symlinkPaths = _symlinkPaths.symlinkPaths
var symlinkPathsSync = _symlinkPaths.symlinkPathsSync

var _symlinkType = __webpack_require__(38)
var symlinkType = _symlinkType.symlinkType
var symlinkTypeSync = _symlinkType.symlinkTypeSync

function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  fs.exists(dstpath, function (destinationExists) {
    if (destinationExists) return callback(null)
    symlinkPaths(srcpath, dstpath, function (err, relative) {
      if (err) return callback(err)
      srcpath = relative.toDst
      symlinkType(relative.toCwd, type, function (err, type) {
        if (err) return callback(err)
        var dir = path.dirname(dstpath)
        fs.exists(dir, function (dirExists) {
          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
          mkdirs(dir, function (err) {
            if (err) return callback(err)
            fs.symlink(srcpath, dstpath, type, callback)
          })
        })
      })
    })
  })
}

function createSymlinkSync (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  var destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  var relative = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  var dir = path.dirname(dstpath)
  var exists = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

module.exports = {
  createSymlink: createSymlink,
  createSymlinkSync: createSymlinkSync,
  // alias
  ensureSymlink: createSymlink,
  ensureSymlinkSync: createSymlinkSync
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(44)

var fse = {}
var gfs = __webpack_require__(1)

// attach fs methods to fse
Object.keys(gfs).forEach(function (key) {
  fse[key] = gfs[key]
})

var fs = fse

assign(fs, __webpack_require__(32))
assign(fs, __webpack_require__(30))
assign(fs, __webpack_require__(2))
assign(fs, __webpack_require__(15))
assign(fs, __webpack_require__(41))
assign(fs, __webpack_require__(42))
assign(fs, __webpack_require__(33))
assign(fs, __webpack_require__(35))
assign(fs, __webpack_require__(43))
assign(fs, __webpack_require__(46))

module.exports = fs

// maintain backwards compatibility for awhile
var jsonfile = {}
Object.defineProperty(jsonfile, 'spaces', {
  get: function () {
    return fs.spaces // found in ./json
  },
  set: function (val) {
    fs.spaces = val
  }
})

module.exports.jsonfile = jsonfile // so users of fs-extra can modify jsonFile.spaces


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var jsonFile = __webpack_require__(7)

jsonFile.outputJsonSync = __webpack_require__(12)
jsonFile.outputJson = __webpack_require__(13)
// aliases
jsonFile.outputJSONSync = __webpack_require__(12)
jsonFile.outputJSON = __webpack_require__(13)

module.exports = jsonFile


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// most of this code was written by Andrew Kelley
// licensed under the BSD license: see
// https://github.com/andrewrk/node-mv/blob/master/package.json

// this needs a cleanup

var fs = __webpack_require__(1)
var ncp = __webpack_require__(11)
var path = __webpack_require__(0)
var rimraf = __webpack_require__(21)
var mkdirp = __webpack_require__(2).mkdirs

function mv (source, dest, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var shouldMkdirp = ('mkdirp' in options) ? options.mkdirp : true
  var clobber = ('clobber' in options) ? options.clobber : false

  var limit = options.limit || 16

  if (shouldMkdirp) {
    mkdirs()
  } else {
    doRename()
  }

  function mkdirs () {
    mkdirp(path.dirname(dest), function (err) {
      if (err) return callback(err)
      doRename()
    })
  }

  function doRename () {
    if (clobber) {
      fs.rename(source, dest, function (err) {
        if (!err) return callback()

        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
          rimraf(dest, function (err) {
            if (err) return callback(err)
            options.clobber = false // just clobbered it, no need to do it again
            mv(source, dest, options, callback)
          })
          return
        }

        // weird Windows shit
        if (err.code === 'EPERM') {
          setTimeout(function () {
            rimraf(dest, function (err) {
              if (err) return callback(err)
              options.clobber = false
              mv(source, dest, options, callback)
            })
          }, 200)
          return
        }

        if (err.code !== 'EXDEV') return callback(err)
        moveAcrossDevice(source, dest, clobber, limit, callback)
      })
    } else {
      fs.link(source, dest, function (err) {
        if (err) {
          if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM') {
            moveAcrossDevice(source, dest, clobber, limit, callback)
            return
          }
          callback(err)
          return
        }
        fs.unlink(source, callback)
      })
    }
  }
}

function moveAcrossDevice (source, dest, clobber, limit, callback) {
  fs.stat(source, function (err, stat) {
    if (err) {
      callback(err)
      return
    }

    if (stat.isDirectory()) {
      moveDirAcrossDevice(source, dest, clobber, limit, callback)
    } else {
      moveFileAcrossDevice(source, dest, clobber, limit, callback)
    }
  })
}

function moveFileAcrossDevice (source, dest, clobber, limit, callback) {
  var outFlags = clobber ? 'w' : 'wx'
  var ins = fs.createReadStream(source)
  var outs = fs.createWriteStream(dest, {flags: outFlags})

  ins.on('error', function (err) {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)

    // may want to create a directory but `out` line above
    // creates an empty file for us: See #108
    // don't care about error here
    fs.unlink(dest, function () {
      // note: `err` here is from the input stream errror
      if (err.code === 'EISDIR' || err.code === 'EPERM') {
        moveDirAcrossDevice(source, dest, clobber, limit, callback)
      } else {
        callback(err)
      }
    })
  })

  outs.on('error', function (err) {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)
    callback(err)
  })

  outs.once('close', onClose)
  ins.pipe(outs)

  function onClose () {
    fs.unlink(source, callback)
  }
}

function moveDirAcrossDevice (source, dest, clobber, limit, callback) {
  var options = {
    stopOnErr: true,
    clobber: false,
    limit: limit
  }

  function startNcp () {
    ncp(source, dest, options, function (errList) {
      if (errList) return callback(errList[0])
      rimraf(source, callback)
    })
  }

  if (clobber) {
    rimraf(dest, function (err) {
      if (err) return callback(err)
      startNcp()
    })
  } else {
    startNcp()
  }
}

module.exports = {
  move: mv
}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(0)
var fs = __webpack_require__(1)
var mkdir = __webpack_require__(2)

function outputFile (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  var dir = path.dirname(file)
  fs.exists(dir, function (itDoes) {
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, function (err) {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file, data, encoding) {
  var dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync.apply(fs, arguments)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync.apply(fs, arguments)
}

module.exports = {
  outputFile: outputFile,
  outputFileSync: outputFileSync
}


/***/ }),
/* 44 */
/***/ (function(module, exports) {

// simple mutable assign
function assign () {
  var args = [].slice.call(arguments).filter(function (i) { return i })
  var dest = args.shift()
  args.forEach(function (src) {
    Object.keys(src).forEach(function (key) {
      dest[key] = src[key]
    })
  })

  return dest
}

module.exports = assign


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(1)
var path = __webpack_require__(0)
var os = __webpack_require__(59)

// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
function hasMillisResSync () {
  var tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  var d = new Date(1435410243862)
  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
  var fd = fs.openSync(tmpfile, 'r+')
  fs.futimesSync(fd, d, d)
  fs.closeSync(fd)
  return fs.statSync(tmpfile).mtime > 1435410243000
}

function hasMillisRes (callback) {
  var tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  var d = new Date(1435410243862)
  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', function (err) {
    if (err) return callback(err)
    fs.open(tmpfile, 'r+', function (err, fd) {
      if (err) return callback(err)
      fs.futimes(fd, d, d, function (err) {
        if (err) return callback(err)
        fs.close(fd, function (err) {
          if (err) return callback(err)
          fs.stat(tmpfile, function (err, stats) {
            if (err) return callback(err)
            callback(null, stats.mtime > 1435410243000)
          })
        })
      })
    })
  })
}

function timeRemoveMillis (timestamp) {
  if (typeof timestamp === 'number') {
    return Math.floor(timestamp / 1000) * 1000
  } else if (timestamp instanceof Date) {
    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
  } else {
    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
  }
}

function utimesMillis (path, atime, mtime, callback) {
  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
  fs.open(path, 'r+', function (err, fd) {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, function (err) {
      if (err) return callback(err)
      fs.close(fd, callback)
    })
  })
}

module.exports = {
  hasMillisRes: hasMillisRes,
  hasMillisResSync: hasMillisResSync,
  timeRemoveMillis: timeRemoveMillis,
  utimesMillis: utimesMillis
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var klaw = __webpack_require__(56)

module.exports = {
  walk: klaw
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var pathModule = __webpack_require__(0);
var isWindows = process.platform === 'win32';
var fs = __webpack_require__(3);

// JavaScript implementation of realpath, ported from node pre-v6

var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

function rethrow() {
  // Only enable in debug mode. A backtrace uses ~1000 bytes of heap space and
  // is fairly slow to generate.
  var callback;
  if (DEBUG) {
    var backtrace = new Error;
    callback = debugCallback;
  } else
    callback = missingCallback;

  return callback;

  function debugCallback(err) {
    if (err) {
      backtrace.message = err.message;
      err = backtrace;
      missingCallback(err);
    }
  }

  function missingCallback(err) {
    if (err) {
      if (process.throwDeprecation)
        throw err;  // Forgot a callback but don't know where? Use NODE_DEBUG=fs
      else if (!process.noDeprecation) {
        var msg = 'fs: missing callback ' + (err.stack || err.message);
        if (process.traceDeprecation)
          console.trace(msg);
        else
          console.error(msg);
      }
    }
  }
}

function maybeCallback(cb) {
  return typeof cb === 'function' ? cb : rethrow();
}

var normalize = pathModule.normalize;

// Regexp that finds the next partion of a (partial) path
// result is [base_with_slash, base], e.g. ['somedir/', 'somedir']
if (isWindows) {
  var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
} else {
  var nextPartRe = /(.*?)(?:[\/]+|$)/g;
}

// Regex to find the device root, including trailing slash. E.g. 'c:\\'.
if (isWindows) {
  var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
} else {
  var splitRootRe = /^[\/]*/;
}

exports.realpathSync = function realpathSync(p, cache) {
  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return cache[p];
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstatSync(base);
      knownHard[base] = true;
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  // NB: p.length changes.
  while (pos < p.length) {
    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      continue;
    }

    var resolvedLink;
    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // some known symbolic link.  no need to stat again.
      resolvedLink = cache[base];
    } else {
      var stat = fs.lstatSync(base);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        continue;
      }

      // read the link if it wasn't read before
      // dev/ino always return 0 on windows, so skip the check.
      var linkTarget = null;
      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          linkTarget = seenLinks[id];
        }
      }
      if (linkTarget === null) {
        fs.statSync(base);
        linkTarget = fs.readlinkSync(base);
      }
      resolvedLink = pathModule.resolve(previous, linkTarget);
      // track this, if given a cache.
      if (cache) cache[base] = resolvedLink;
      if (!isWindows) seenLinks[id] = linkTarget;
    }

    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }

  if (cache) cache[original] = p;

  return p;
};


exports.realpath = function realpath(p, cache, cb) {
  if (typeof cb !== 'function') {
    cb = maybeCallback(cache);
    cache = null;
  }

  // make p is absolute
  p = pathModule.resolve(p);

  if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
    return process.nextTick(cb.bind(null, null, cache[p]));
  }

  var original = p,
      seenLinks = {},
      knownHard = {};

  // current character position in p
  var pos;
  // the partial path so far, including a trailing slash if any
  var current;
  // the partial path without a trailing slash (except when pointing at a root)
  var base;
  // the partial path scanned in the previous round, with slash
  var previous;

  start();

  function start() {
    // Skip over roots
    var m = splitRootRe.exec(p);
    pos = m[0].length;
    current = m[0];
    base = m[0];
    previous = '';

    // On windows, check that the root exists. On unix there is no need.
    if (isWindows && !knownHard[base]) {
      fs.lstat(base, function(err) {
        if (err) return cb(err);
        knownHard[base] = true;
        LOOP();
      });
    } else {
      process.nextTick(LOOP);
    }
  }

  // walk down the path, swapping out linked pathparts for their real
  // values
  function LOOP() {
    // stop if scanned past end of path
    if (pos >= p.length) {
      if (cache) cache[original] = p;
      return cb(null, p);
    }

    // find the next part
    nextPartRe.lastIndex = pos;
    var result = nextPartRe.exec(p);
    previous = current;
    current += result[0];
    base = previous + result[1];
    pos = nextPartRe.lastIndex;

    // continue if not a symlink
    if (knownHard[base] || (cache && cache[base] === base)) {
      return process.nextTick(LOOP);
    }

    if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
      // known symbolic link.  no need to stat again.
      return gotResolvedLink(cache[base]);
    }

    return fs.lstat(base, gotStat);
  }

  function gotStat(err, stat) {
    if (err) return cb(err);

    // if not a symlink, skip to the next path part
    if (!stat.isSymbolicLink()) {
      knownHard[base] = true;
      if (cache) cache[base] = base;
      return process.nextTick(LOOP);
    }

    // stat & read the link if not read before
    // call gotTarget as soon as the link target is known
    // dev/ino always return 0 on windows, so skip the check.
    if (!isWindows) {
      var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);
      if (seenLinks.hasOwnProperty(id)) {
        return gotTarget(null, seenLinks[id], base);
      }
    }
    fs.stat(base, function(err) {
      if (err) return cb(err);

      fs.readlink(base, function(err, target) {
        if (!isWindows) seenLinks[id] = target;
        gotTarget(err, target);
      });
    });
  }

  function gotTarget(err, target, base) {
    if (err) return cb(err);

    var resolvedLink = pathModule.resolve(previous, target);
    if (cache) cache[base] = resolvedLink;
    gotResolvedLink(resolvedLink);
  }

  function gotResolvedLink(resolvedLink) {
    // resolve the link, then start over
    p = pathModule.resolve(resolvedLink, p.slice(pos));
    start();
  }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = globSync
globSync.GlobSync = GlobSync

var fs = __webpack_require__(3)
var rp = __webpack_require__(16)
var minimatch = __webpack_require__(10)
var Minimatch = minimatch.Minimatch
var Glob = __webpack_require__(18).Glob
var util = __webpack_require__(5)
var path = __webpack_require__(0)
var assert = __webpack_require__(4)
var isAbsolute = __webpack_require__(6)
var common = __webpack_require__(17)
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var setopts = common.setopts
var ownProp = common.ownProp
var childrenIgnored = common.childrenIgnored
var isIgnored = common.isIgnored

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error('must provide pattern')

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob\n'+
                        'See: https://github.com/isaacs/node-glob/issues/167')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  if (this.noprocess)
    return this

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
    this._process(this.minimatch.set[i], i, false)
  }
  this._finish()
}

GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  if (this.realpath) {
    var self = this
    this.matches.forEach(function (matchset, index) {
      var set = self.matches[index] = Object.create(null)
      for (var p in matchset) {
        try {
          p = self._makeAbs(p)
          var real = rp.realpathSync(p, self.realpathCache)
          set[real] = true
        } catch (er) {
          if (er.syscall === 'stat')
            set[self._makeAbs(p)] = true
          else
            throw er
        }
      }
    })
  }
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === 'string') {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's 'absolute' like /foo/bar,
      // or 'relative' like '../baz'
      prefix = pattern.slice(0, n).join('/')
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = '.'
  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = '/' + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  //if ignored, skip processing
  if (childrenIgnored(this, read))
    return

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}


GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i]
    if (e.charAt(0) !== '.' || dotOk) {
      var m
      if (negate && !prefix) {
        m = !e.match(pn)
      } else {
        m = e.match(pn)
      }
      if (m)
        matchedEntries.push(e)
    }
  }

  var len = matchedEntries.length
  // If there are no matched entries, then nothing matches.
  if (len === 0)
    return

  // if this is the last remaining pattern bit, then no need for
  // an additional stat *unless* the user has specified mark or
  // stat explicitly.  We know they exist, since readdir returned
  // them.

  if (remain.length === 1 && !this.mark && !this.stat) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null)

    for (var i = 0; i < len; i ++) {
      var e = matchedEntries[i]
      if (prefix) {
        if (prefix.slice(-1) !== '/')
          e = prefix + '/' + e
        else
          e = prefix + e
      }

      if (e.charAt(0) === '/' && !this.nomount) {
        e = path.join(this.root, e)
      }
      this._emitMatch(index, e)
    }
    // This was the last one, and no stats were needed
    return
  }

  // now test all matched entries as stand-ins for that part
  // of the pattern.
  remain.shift()
  for (var i = 0; i < len; i ++) {
    var e = matchedEntries[i]
    var newPattern
    if (prefix)
      newPattern = [prefix, e]
    else
      newPattern = [e]
    this._process(newPattern.concat(remain), index, inGlobStar)
  }
}


GlobSync.prototype._emitMatch = function (index, e) {
  if (isIgnored(this, e))
    return

  var abs = this._makeAbs(e)

  if (this.mark)
    e = this._mark(e)

  if (this.absolute) {
    e = abs
  }

  if (this.matches[index][e])
    return

  if (this.nodir) {
    var c = this.cache[abs]
    if (c === 'DIR' || Array.isArray(c))
      return
  }

  this.matches[index][e] = true

  if (this.stat)
    this._stat(e)
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  // follow all symlinked directories forever
  // just proceed as if this is a non-globstar situation
  if (this.follow)
    return this._readdir(abs, false)

  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    // lstat failed, doesn't exist
    return null
  }

  var isSym = lstat.isSymbolicLink()
  this.symlinks[abs] = isSym

  // If it's not a symlink or a dir, then it's definitely a regular file.
  // don't bother doing a readdir in that case.
  if (!isSym && !lstat.isDirectory())
    this.cache[abs] = 'FILE'
  else
    entries = this._readdir(abs, false)

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar && !ownProp(this.symlinks, abs))
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
      var e = entries[i]
      if (abs === '/')
        e = abs + e
      else
        e = abs + '/' + e
      this.cache[e] = true
    }
  }

  this.cache[abs] = entries

  // mark and cache dir-ness
  return entries
}

GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
    case 'ENOTDIR': // totally normal. means it *does* exist.
      var abs = this._makeAbs(f)
      this.cache[abs] = 'FILE'
      if (abs === this.cwdAbs) {
        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
        error.path = this.cwd
        error.code = er.code
        throw error
      }
      break

    case 'ENOENT': // not terribly unusual
    case 'ELOOP':
    case 'ENAMETOOLONG':
    case 'UNKNOWN':
      this.cache[this._makeAbs(f)] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[this._makeAbs(f)] = false
      if (this.strict)
        throw er
      if (!this.silent)
        console.error('glob error', er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  var isSym = this.symlinks[abs]

  // If it's a symlink, and we're in a globstar, then stop
  if (isSym && inGlobStar)
    return

  for (var i = 0; i < len; i++) {
    var e = entries[i]
    if (e.charAt(0) === '.' && !this.dot)
      continue

    // these two cases enter the inGlobStar state
    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
    this._process(instead, index, true)

    var below = gspref.concat(entries[i], remain)
    this._process(below, index, true)
  }
}

GlobSync.prototype._processSimple = function (prefix, index) {
  // XXX review this.  Shouldn't it be doing the mounting etc
  // before doing stat?  kinda weird?
  var exists = this._stat(prefix)

  if (!this.matches[index])
    this.matches[index] = Object.create(null)

  // If it doesn't exist, then just mark the lack of results
  if (!exists)
    return

  if (prefix && isAbsolute(prefix) && !this.nomount) {
    var trail = /[\/\\]$/.test(prefix)
    if (prefix.charAt(0) === '/') {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
      if (trail)
        prefix += '/'
    }
  }

  if (process.platform === 'win32')
    prefix = prefix.replace(/\\/g, '/')

  // Mark this as a match
  this._emitMatch(index, prefix)
}

// Returns either 'DIR', 'FILE', or false
GlobSync.prototype._stat = function (f) {
  var abs = this._makeAbs(f)
  var needDir = f.slice(-1) === '/'

  if (f.length > this.maxLength)
    return false

  if (!this.stat && ownProp(this.cache, abs)) {
    var c = this.cache[abs]

    if (Array.isArray(c))
      c = 'DIR'

    // It exists, but maybe not how we need it
    if (!needDir || c === 'DIR')
      return c

    if (needDir && c === 'FILE')
      return false

    // otherwise we have to stat, because maybe c=true
    // if we know it exists, but not what it is.
  }

  var exists
  var stat = this.statCache[abs]
  if (!stat) {
    var lstat
    try {
      lstat = fs.lstatSync(abs)
    } catch (er) {
      return false
    }

    if (lstat.isSymbolicLink()) {
      try {
        stat = fs.statSync(abs)
      } catch (er) {
        stat = lstat
      }
    } else {
      stat = lstat
    }
  }

  this.statCache[abs] = stat

  var c = stat.isDirectory() ? 'DIR' : 'FILE'
  this.cache[abs] = this.cache[abs] || c

  if (needDir && c !== 'DIR')
    return false

  return c
}

GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}

GlobSync.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(23).Stream

module.exports = legacy

function legacy (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    })
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(19)
var constants = __webpack_require__(57)

var origCwd = process.cwd
var cwd = null

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
try {
  process.cwd()
} catch (er) {}

var chdir = process.chdir
process.chdir = function(d) {
  cwd = null
  chdir.call(process, d)
}

module.exports = patch

function patch (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs)
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs)
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown)
  fs.fchown = chownFix(fs.fchown)
  fs.lchown = chownFix(fs.lchown)

  fs.chmod = chmodFix(fs.chmod)
  fs.fchmod = chmodFix(fs.fchmod)
  fs.lchmod = chmodFix(fs.lchmod)

  fs.chownSync = chownFixSync(fs.chownSync)
  fs.fchownSync = chownFixSync(fs.fchownSync)
  fs.lchownSync = chownFixSync(fs.lchownSync)

  fs.chmodSync = chmodFixSync(fs.chmodSync)
  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

  fs.stat = statFix(fs.stat)
  fs.fstat = statFix(fs.fstat)
  fs.lstat = statFix(fs.lstat)

  fs.statSync = statFixSync(fs.statSync)
  fs.fstatSync = statFixSync(fs.fstatSync)
  fs.lstatSync = statFixSync(fs.lstatSync)

  // if lchmod/lchown do not exist, then make them no-ops
  if (!fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchmodSync = function () {}
  }
  if (!fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchownSync = function () {}
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = (function (fs$rename) { return function (from, to, cb) {
      var start = Date.now()
      var backoff = 0;
      fs$rename(from, to, function CB (er) {
        if (er
            && (er.code === "EACCES" || er.code === "EPERM")
            && Date.now() - start < 60000) {
          setTimeout(function() {
            fs.stat(to, function (stater, st) {
              if (stater && stater.code === "ENOENT")
                fs$rename(from, to, CB);
              else
                cb(er)
            })
          }, backoff)
          if (backoff < 100)
            backoff += 10;
          return;
        }
        if (cb) cb(er)
      })
    }})(fs.rename)
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
    var callback
    if (callback_ && typeof callback_ === 'function') {
      var eagCounter = 0
      callback = function (er, _, __) {
        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
        }
        callback_.apply(this, arguments)
      }
    }
    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
  }})(fs.read)

  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          continue
        }
        throw er
      }
    }
  }})(fs.readSync)
}

function patchLchmod (fs) {
  fs.lchmod = function (path, mode, callback) {
    fs.open( path
           , constants.O_WRONLY | constants.O_SYMLINK
           , mode
           , function (err, fd) {
      if (err) {
        if (callback) callback(err)
        return
      }
      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      fs.fchmod(fd, mode, function (err) {
        fs.close(fd, function(err2) {
          if (callback) callback(err || err2)
        })
      })
    })
  }

  fs.lchmodSync = function (path, mode) {
    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

    // prefer to return the chmod error, if one occurs,
    // but still try to close, and report closing errors if they occur.
    var threw = true
    var ret
    try {
      ret = fs.fchmodSync(fd, mode)
      threw = false
    } finally {
      if (threw) {
        try {
          fs.closeSync(fd)
        } catch (er) {}
      } else {
        fs.closeSync(fd)
      }
    }
    return ret
  }
}

function patchLutimes (fs) {
  if (constants.hasOwnProperty("O_SYMLINK")) {
    fs.lutimes = function (path, at, mt, cb) {
      fs.open(path, constants.O_SYMLINK, function (er, fd) {
        if (er) {
          if (cb) cb(er)
          return
        }
        fs.futimes(fd, at, mt, function (er) {
          fs.close(fd, function (er2) {
            if (cb) cb(er || er2)
          })
        })
      })
    }

    fs.lutimesSync = function (path, at, mt) {
      var fd = fs.openSync(path, constants.O_SYMLINK)
      var ret
      var threw = true
      try {
        ret = fs.futimesSync(fd, at, mt)
        threw = false
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd)
          } catch (er) {}
        } else {
          fs.closeSync(fd)
        }
      }
      return ret
    }

  } else {
    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
    fs.lutimesSync = function () {}
  }
}

function chmodFix (orig) {
  if (!orig) return orig
  return function (target, mode, cb) {
    return orig.call(fs, target, mode, function (er) {
      if (chownErOk(er)) er = null
      if (cb) cb.apply(this, arguments)
    })
  }
}

function chmodFixSync (orig) {
  if (!orig) return orig
  return function (target, mode) {
    try {
      return orig.call(fs, target, mode)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}


function chownFix (orig) {
  if (!orig) return orig
  return function (target, uid, gid, cb) {
    return orig.call(fs, target, uid, gid, function (er) {
      if (chownErOk(er)) er = null
      if (cb) cb.apply(this, arguments)
    })
  }
}

function chownFixSync (orig) {
  if (!orig) return orig
  return function (target, uid, gid) {
    try {
      return orig.call(fs, target, uid, gid)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}


function statFix (orig) {
  if (!orig) return orig
  // Older versions of Node erroneously returned signed integers for
  // uid + gid.
  return function (target, cb) {
    return orig.call(fs, target, function (er, stats) {
      if (!stats) return cb.apply(this, arguments)
      if (stats.uid < 0) stats.uid += 0x100000000
      if (stats.gid < 0) stats.gid += 0x100000000
      if (cb) cb.apply(this, arguments)
    })
  }
}

function statFixSync (orig) {
  if (!orig) return orig
  // Older versions of Node erroneously returned signed integers for
  // uid + gid.
  return function (target) {
    var stats = orig.call(fs, target)
    if (stats.uid < 0) stats.uid += 0x100000000
    if (stats.gid < 0) stats.gid += 0x100000000
    return stats;
  }
}

// ENOSYS means that the fs doesn't support the op. Just ignore
// that, because it doesn't matter.
//
// if there's no getuid, or if getuid() is something other
// than 0, and the error is EINVAL or EPERM, then just ignore
// it.
//
// This specific case is a silent failure in cp, install, tar,
// and most other unix tools that manage permissions.
//
// When running as root, or if other types of errors are
// encountered, then it's strict.
function chownErOk (er) {
  if (!er)
    return true

  if (er.code === "ENOSYS")
    return true

  var nonroot = !process.getuid || process.getuid() !== 0
  if (nonroot) {
    if (er.code === "EINVAL" || er.code === "EPERM")
      return true
  }

  return false
}


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(22)
var reqs = Object.create(null)
var once = __webpack_require__(20)

module.exports = wrappy(inflight)

function inflight (key, cb) {
  if (reqs[key]) {
    reqs[key].push(cb)
    return null
  } else {
    reqs[key] = [cb]
    return makeres(key)
  }
}

function makeres (key) {
  return once(function RES () {
    var cbs = reqs[key]
    var len = cbs.length
    var args = slice(arguments)

    // XXX It's somewhat ambiguous whether a new callback added in this
    // pass should be queued for later execution if something in the
    // list of callbacks throws, or if it should just be discarded.
    // However, it's such an edge case that it hardly matters, and either
    // choice is likely as surprising as the other.
    // As it happens, we do go ahead and schedule it for later execution.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(5);
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  module.exports = __webpack_require__(53);
}


/***/ }),
/* 53 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var _fs
try {
  _fs = __webpack_require__(1)
} catch (_) {
  _fs = __webpack_require__(3)
}

function readFile (file, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }

  if (typeof options === 'string') {
    options = {encoding: options}
  }

  options = options || {}
  var fs = options.fs || _fs

  var shouldThrow = true
  // DO NOT USE 'passParsingErrors' THE NAME WILL CHANGE!!!, use 'throws' instead
  if ('passParsingErrors' in options) {
    shouldThrow = options.passParsingErrors
  } else if ('throws' in options) {
    shouldThrow = options.throws
  }

  fs.readFile(file, options, function (err, data) {
    if (err) return callback(err)

    data = stripBom(data)

    var obj
    try {
      obj = JSON.parse(data, options ? options.reviver : null)
    } catch (err2) {
      if (shouldThrow) {
        err2.message = file + ': ' + err2.message
        return callback(err2)
      } else {
        return callback(null, null)
      }
    }

    callback(null, obj)
  })
}

function readFileSync (file, options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {encoding: options}
  }

  var fs = options.fs || _fs

  var shouldThrow = true
  // DO NOT USE 'passParsingErrors' THE NAME WILL CHANGE!!!, use 'throws' instead
  if ('passParsingErrors' in options) {
    shouldThrow = options.passParsingErrors
  } else if ('throws' in options) {
    shouldThrow = options.throws
  }

  var content = fs.readFileSync(file, options)
  content = stripBom(content)

  try {
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = file + ': ' + err.message
      throw err
    } else {
      return null
    }
  }
}

function writeFile (file, obj, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }
  options = options || {}
  var fs = options.fs || _fs

  var spaces = typeof options === 'object' && options !== null
    ? 'spaces' in options
    ? options.spaces : this.spaces
    : this.spaces

  var str = ''
  try {
    str = JSON.stringify(obj, options ? options.replacer : null, spaces) + '\n'
  } catch (err) {
    if (callback) return callback(err, null)
  }

  fs.writeFile(file, str, options, callback)
}

function writeFileSync (file, obj, options) {
  options = options || {}
  var fs = options.fs || _fs

  var spaces = typeof options === 'object' && options !== null
    ? 'spaces' in options
    ? options.spaces : this.spaces
    : this.spaces

  var str = JSON.stringify(obj, options.replacer, spaces) + '\n'
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

function stripBom (content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8')
  content = content.replace(/^\uFEFF/, '')
  return content
}

var jsonfile = {
  spaces: null,
  readFile: readFile,
  readFileSync: readFileSync,
  writeFile: writeFile,
  writeFileSync: writeFileSync
}

module.exports = jsonfile


/***/ }),
/* 55 */
/***/ (function(module, exports) {

// simple mutable assign (extracted from fs-extra)
// I really like object-assign package, but I wanted a lean package with zero deps
function _assign () {
  var args = [].slice.call(arguments).filter(function (i) { return i })
  var dest = args.shift()
  args.forEach(function (src) {
    Object.keys(src).forEach(function (key) {
      dest[key] = src[key]
    })
  })

  return dest
}

// thank you baby Jesus for Node v4 and Object.assign
module.exports = Object.assign || _assign


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var assert = __webpack_require__(4)
var fs
try {
  fs = __webpack_require__(1)
} catch (e) {
  fs = __webpack_require__(3)
}
var path = __webpack_require__(0)
var Readable = __webpack_require__(23).Readable
var util = __webpack_require__(5)
var assign = __webpack_require__(55)

function Walker (dir, options) {
  assert.strictEqual(typeof dir, 'string', '`dir` parameter should be of type string. Got type: ' + typeof dir)
  var defaultStreamOptions = { objectMode: true }
  var defaultOpts = { queueMethod: 'shift', pathSorter: undefined, filter: undefined }
  options = assign(defaultOpts, options, defaultStreamOptions)

  Readable.call(this, options)
  this.root = path.resolve(dir)
  this.paths = [this.root]
  this.options = options
  this.fs = options.fs || fs // mock-fs
}
util.inherits(Walker, Readable)

Walker.prototype._read = function () {
  if (this.paths.length === 0) return this.push(null)
  var self = this
  var pathItem = this.paths[this.options.queueMethod]()

  self.fs.lstat(pathItem, function (err, stats) {
    var item = { path: pathItem, stats: stats }
    if (err) return self.emit('error', err, item)
    if (!stats.isDirectory()) return self.push(item)

    self.fs.readdir(pathItem, function (err, pathItems) {
      if (err) {
        self.push(item)
        return self.emit('error', err, item)
      }

      pathItems = pathItems.map(function (part) { return path.join(pathItem, part) })
      if (self.options.filter) pathItems = pathItems.filter(self.options.filter)
      if (self.options.pathSorter) pathItems.sort(self.options.pathSorter)
      pathItems.forEach(function (pi) { self.paths.push(pi) })

      self.push(item)
    })
  })
}

function walk (root, options) {
  return new Walker(root, options)
}

module.exports = walk


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTJkMjJiMjg2MGU2ZjIzNjk1YTYiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy8uL34vZ3JhY2VmdWwtZnMvZ3JhY2VmdWwtZnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvbWtkaXJzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXNzZXJ0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIiwid2VicGFjazovLy8uL34vcGF0aC1pcy1hYnNvbHV0ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9qc29uL2pzb25maWxlLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL21rZGlycy9ta2RpcnMtc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9ta2RpcnMvbWtkaXJzLmpzIiwid2VicGFjazovLy8uL34vbWluaW1hdGNoL21pbmltYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L25jcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9qc29uL291dHB1dC1qc29uLXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvanNvbi9vdXRwdXQtanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9ta2RpcnMvd2luMzIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvcmVtb3ZlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMucmVhbHBhdGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9nbG9iL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsb2IvZ2xvYi5qcyIsIndlYnBhY2s6Ly8vLi9+L2dyYWNlZnVsLWZzL2ZzLmpzIiwid2VicGFjazovLy8uL34vb25jZS9vbmNlLmpzIiwid2VicGFjazovLy8uL34vcmltcmFmL3JpbXJhZi5qcyIsIndlYnBhY2s6Ly8vLi9+L3dyYXBweS93cmFwcHkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vLy4vbGliL2NkcC1saWIudHMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWxhbmNlZC1tYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JyYWNlLWV4cGFuc2lvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvbmNhdC1tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvY29weS1zeW5jL2NvcHktZmlsZS1zeW5jLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2NvcHktc3luYy9jb3B5LXN5bmMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvY29weS1zeW5jL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2NvcHkvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2VtcHR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9maWxlLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay1wYXRocy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay10eXBlLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9zeW1saW5rLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2pzb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvbW92ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9vdXRwdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvdXRpbC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvdXRpbC91dGltZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvd2Fsay9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLnJlYWxwYXRoL29sZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2dsb2Ivc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2dyYWNlZnVsLWZzL2xlZ2FjeS1zdHJlYW1zLmpzIiwid2VicGFjazovLy8uL34vZ3JhY2VmdWwtZnMvcG9seWZpbGxzLmpzIiwid2VicGFjazovLy8uL34vaW5mbGlnaHQvaW5mbGlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbmhlcml0cy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9qc29uZmlsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2tsYXcvc3JjL2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2tsYXcvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnN0YW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV2ZW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQSxpQzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDclFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1JBLCtCOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsaUM7Ozs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDQUF5QyxFQUFFO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDeERBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7OztBQzVEQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0EsUUFBUSx1Q0FBdUM7QUFDL0MsUUFBUSwyQkFBMkI7QUFDbkMsUUFBUSwyQkFBMkI7QUFDbkMsUUFBUSwyQkFBMkI7QUFDbkMsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxJQUFJOztBQUU3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0M7O0FBRWhDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsSUFBSTtBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSyxJQUFJO0FBQ1QsS0FBSyxHQUFHO0FBQ1IsS0FBSyxLQUFLO0FBQ1YsS0FBSyxJQUFJLElBQUksRUFBRTtBQUNmLEtBQUssSUFBSSxFQUFFLElBQUk7QUFDZjtBQUNBO0FBQ0EsS0FBSyxJQUFJLE9BQU8sSUFBSTtBQUNwQixLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsSUFBSTtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLElBQUk7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxJQUFJO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxFQUFFLEVBQUUsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7O0FBRUEsYUFBYSxnQkFBZ0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSyw2Q0FBNkM7O0FBRWxEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCOzs7Ozs7O0FDMTVCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRCxrQkFBa0I7O0FBRXRFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ2xQQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7Ozs7Ozs7O0FDdkJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkJBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNFQUFzRTtBQUN0RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxZQUFZO0FBQ3BEOztBQUVBO0FBQ0EscUNBQXFDLFlBQVk7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7O0FDM09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0NBQWdDLHFCQUFxQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIseUJBQXlCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNyeEJBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsb0JBQW9CO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7O0FDMVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hDQSxtQzs7Ozs7Ozs7O0FDQUEsbUNBQStCO0FBRS9COzs7R0FHRztBQUNIO0lBQ0k7O09BRUc7SUFDSSxPQUFPLENBQUMsT0FBWTtRQUN2QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQVhELHdCQVdDOzs7Ozs7O0FDakJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDekRBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSx3Q0FBd0MsR0FBRyxJQUFJO0FBQy9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixLQUFLOztBQUUxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixhQUFhO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUIsdUNBQXVDLEdBQUc7QUFDMUMsWUFBWSxHQUFHLHlCQUF5QjtBQUN4QztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLGNBQWMsR0FBRztBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsWUFBWTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQkFBcUIsS0FBSztBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxFQUFFO0FBQ1YsMkJBQTJCO0FBQzNCLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLFlBQVksS0FBSyxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsbUNBQW1DLDJCQUEyQjtBQUM5RDs7QUFFQSxpQkFBaUIsY0FBYztBQUMvQixtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUN2TUE7QUFDQTtBQUNBLG1CQUFtQixlQUFlO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNaQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtEQUFrRDs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0IseUVBQXlFO0FBQ3hHO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMvQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTs7Ozs7OztBQzNDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekRBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdEQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7O0FDcENBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsZ0JBQWdCOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoS0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBLDJEQUEyRCxXQUFXO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTs7Ozs7OztBQ2JBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLElBQUk7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsRUFBRTtBQUM1QyxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzlTQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixvQkFBb0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3ZEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JIQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUoseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0gsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDelVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ3BJQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsV0FBVztBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaURBQWlELG1DQUFtQztBQUNwRjtBQUNBO0FBQ0EsdUNBQXVDLHNCQUFzQjs7QUFFN0Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ3hEQSxzQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLCtCIiwiZmlsZSI6ImNkcC1saWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MmQyMmIyODYwZTZmMjM2OTVhNiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIHBvbHlmaWxscyA9IHJlcXVpcmUoJy4vcG9seWZpbGxzLmpzJylcbnZhciBsZWdhY3kgPSByZXF1aXJlKCcuL2xlZ2FjeS1zdHJlYW1zLmpzJylcbnZhciBxdWV1ZSA9IFtdXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpXG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxudmFyIGRlYnVnID0gbm9vcFxuaWYgKHV0aWwuZGVidWdsb2cpXG4gIGRlYnVnID0gdXRpbC5kZWJ1Z2xvZygnZ2ZzNCcpXG5lbHNlIGlmICgvXFxiZ2ZzNFxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJykpXG4gIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG0gPSB1dGlsLmZvcm1hdC5hcHBseSh1dGlsLCBhcmd1bWVudHMpXG4gICAgbSA9ICdHRlM0OiAnICsgbS5zcGxpdCgvXFxuLykuam9pbignXFxuR0ZTNDogJylcbiAgICBjb25zb2xlLmVycm9yKG0pXG4gIH1cblxuaWYgKC9cXGJnZnM0XFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnKSkge1xuICBwcm9jZXNzLm9uKCdleGl0JywgZnVuY3Rpb24oKSB7XG4gICAgZGVidWcocXVldWUpXG4gICAgcmVxdWlyZSgnYXNzZXJ0JykuZXF1YWwocXVldWUubGVuZ3RoLCAwKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoKHJlcXVpcmUoJy4vZnMuanMnKSlcbmlmIChwcm9jZXNzLmVudi5URVNUX0dSQUNFRlVMX0ZTX0dMT0JBTF9QQVRDSCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHBhdGNoKGZzKVxufVxuXG4vLyBBbHdheXMgcGF0Y2ggZnMuY2xvc2UvY2xvc2VTeW5jLCBiZWNhdXNlIHdlIHdhbnQgdG9cbi8vIHJldHJ5KCkgd2hlbmV2ZXIgYSBjbG9zZSBoYXBwZW5zICphbnl3aGVyZSogaW4gdGhlIHByb2dyYW0uXG4vLyBUaGlzIGlzIGVzc2VudGlhbCB3aGVuIG11bHRpcGxlIGdyYWNlZnVsLWZzIGluc3RhbmNlcyBhcmVcbi8vIGluIHBsYXkgYXQgdGhlIHNhbWUgdGltZS5cbm1vZHVsZS5leHBvcnRzLmNsb3NlID1cbmZzLmNsb3NlID0gKGZ1bmN0aW9uIChmcyRjbG9zZSkgeyByZXR1cm4gZnVuY3Rpb24gKGZkLCBjYikge1xuICByZXR1cm4gZnMkY2xvc2UuY2FsbChmcywgZmQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoIWVycilcbiAgICAgIHJldHJ5KClcblxuICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG4gICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH0pXG59fSkoZnMuY2xvc2UpXG5cbm1vZHVsZS5leHBvcnRzLmNsb3NlU3luYyA9XG5mcy5jbG9zZVN5bmMgPSAoZnVuY3Rpb24gKGZzJGNsb3NlU3luYykgeyByZXR1cm4gZnVuY3Rpb24gKGZkKSB7XG4gIC8vIE5vdGUgdGhhdCBncmFjZWZ1bC1mcyBhbHNvIHJldHJpZXMgd2hlbiBmcy5jbG9zZVN5bmMoKSBmYWlscy5cbiAgLy8gTG9va3MgbGlrZSBhIGJ1ZyB0byBtZSwgYWx0aG91Z2ggaXQncyBwcm9iYWJseSBhIGhhcm1sZXNzIG9uZS5cbiAgdmFyIHJ2YWwgPSBmcyRjbG9zZVN5bmMuYXBwbHkoZnMsIGFyZ3VtZW50cylcbiAgcmV0cnkoKVxuICByZXR1cm4gcnZhbFxufX0pKGZzLmNsb3NlU3luYylcblxuZnVuY3Rpb24gcGF0Y2ggKGZzKSB7XG4gIC8vIEV2ZXJ5dGhpbmcgdGhhdCByZWZlcmVuY2VzIHRoZSBvcGVuKCkgZnVuY3Rpb24gbmVlZHMgdG8gYmUgaW4gaGVyZVxuICBwb2x5ZmlsbHMoZnMpXG4gIGZzLmdyYWNlZnVsaWZ5ID0gcGF0Y2hcbiAgZnMuRmlsZVJlYWRTdHJlYW0gPSBSZWFkU3RyZWFtOyAgLy8gTGVnYWN5IG5hbWUuXG4gIGZzLkZpbGVXcml0ZVN0cmVhbSA9IFdyaXRlU3RyZWFtOyAgLy8gTGVnYWN5IG5hbWUuXG4gIGZzLmNyZWF0ZVJlYWRTdHJlYW0gPSBjcmVhdGVSZWFkU3RyZWFtXG4gIGZzLmNyZWF0ZVdyaXRlU3RyZWFtID0gY3JlYXRlV3JpdGVTdHJlYW1cbiAgdmFyIGZzJHJlYWRGaWxlID0gZnMucmVhZEZpbGVcbiAgZnMucmVhZEZpbGUgPSByZWFkRmlsZVxuICBmdW5jdGlvbiByZWFkRmlsZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpXG4gICAgICBjYiA9IG9wdGlvbnMsIG9wdGlvbnMgPSBudWxsXG5cbiAgICByZXR1cm4gZ28kcmVhZEZpbGUocGF0aCwgb3B0aW9ucywgY2IpXG5cbiAgICBmdW5jdGlvbiBnbyRyZWFkRmlsZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiBmcyRyZWFkRmlsZShwYXRoLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICAgIGVucXVldWUoW2dvJHJlYWRGaWxlLCBbcGF0aCwgb3B0aW9ucywgY2JdXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgdmFyIGZzJHdyaXRlRmlsZSA9IGZzLndyaXRlRmlsZVxuICBmcy53cml0ZUZpbGUgPSB3cml0ZUZpbGVcbiAgZnVuY3Rpb24gd3JpdGVGaWxlIChwYXRoLCBkYXRhLCBvcHRpb25zLCBjYikge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIGNiID0gb3B0aW9ucywgb3B0aW9ucyA9IG51bGxcblxuICAgIHJldHVybiBnbyR3cml0ZUZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpXG5cbiAgICBmdW5jdGlvbiBnbyR3cml0ZUZpbGUgKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gZnMkd3JpdGVGaWxlKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgICAgZW5xdWV1ZShbZ28kd3JpdGVGaWxlLCBbcGF0aCwgZGF0YSwgb3B0aW9ucywgY2JdXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgdmFyIGZzJGFwcGVuZEZpbGUgPSBmcy5hcHBlbmRGaWxlXG4gIGlmIChmcyRhcHBlbmRGaWxlKVxuICAgIGZzLmFwcGVuZEZpbGUgPSBhcHBlbmRGaWxlXG4gIGZ1bmN0aW9uIGFwcGVuZEZpbGUgKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IgPSBvcHRpb25zLCBvcHRpb25zID0gbnVsbFxuXG4gICAgcmV0dXJuIGdvJGFwcGVuZEZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpXG5cbiAgICBmdW5jdGlvbiBnbyRhcHBlbmRGaWxlIChwYXRoLCBkYXRhLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIGZzJGFwcGVuZEZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyICYmIChlcnIuY29kZSA9PT0gJ0VNRklMRScgfHwgZXJyLmNvZGUgPT09ICdFTkZJTEUnKSlcbiAgICAgICAgICBlbnF1ZXVlKFtnbyRhcHBlbmRGaWxlLCBbcGF0aCwgZGF0YSwgb3B0aW9ucywgY2JdXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgdmFyIGZzJHJlYWRkaXIgPSBmcy5yZWFkZGlyXG4gIGZzLnJlYWRkaXIgPSByZWFkZGlyXG4gIGZ1bmN0aW9uIHJlYWRkaXIgKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gICAgdmFyIGFyZ3MgPSBbcGF0aF1cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFyZ3MucHVzaChvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBjYiA9IG9wdGlvbnNcbiAgICB9XG4gICAgYXJncy5wdXNoKGdvJHJlYWRkaXIkY2IpXG5cbiAgICByZXR1cm4gZ28kcmVhZGRpcihhcmdzKVxuXG4gICAgZnVuY3Rpb24gZ28kcmVhZGRpciRjYiAoZXJyLCBmaWxlcykge1xuICAgICAgaWYgKGZpbGVzICYmIGZpbGVzLnNvcnQpXG4gICAgICAgIGZpbGVzLnNvcnQoKVxuXG4gICAgICBpZiAoZXJyICYmIChlcnIuY29kZSA9PT0gJ0VNRklMRScgfHwgZXJyLmNvZGUgPT09ICdFTkZJTEUnKSlcbiAgICAgICAgZW5xdWV1ZShbZ28kcmVhZGRpciwgW2FyZ3NdXSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgcmV0cnkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdvJHJlYWRkaXIgKGFyZ3MpIHtcbiAgICByZXR1cm4gZnMkcmVhZGRpci5hcHBseShmcywgYXJncylcbiAgfVxuXG4gIGlmIChwcm9jZXNzLnZlcnNpb24uc3Vic3RyKDAsIDQpID09PSAndjAuOCcpIHtcbiAgICB2YXIgbGVnU3RyZWFtcyA9IGxlZ2FjeShmcylcbiAgICBSZWFkU3RyZWFtID0gbGVnU3RyZWFtcy5SZWFkU3RyZWFtXG4gICAgV3JpdGVTdHJlYW0gPSBsZWdTdHJlYW1zLldyaXRlU3RyZWFtXG4gIH1cblxuICB2YXIgZnMkUmVhZFN0cmVhbSA9IGZzLlJlYWRTdHJlYW1cbiAgUmVhZFN0cmVhbS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGZzJFJlYWRTdHJlYW0ucHJvdG90eXBlKVxuICBSZWFkU3RyZWFtLnByb3RvdHlwZS5vcGVuID0gUmVhZFN0cmVhbSRvcGVuXG5cbiAgdmFyIGZzJFdyaXRlU3RyZWFtID0gZnMuV3JpdGVTdHJlYW1cbiAgV3JpdGVTdHJlYW0ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShmcyRXcml0ZVN0cmVhbS5wcm90b3R5cGUpXG4gIFdyaXRlU3RyZWFtLnByb3RvdHlwZS5vcGVuID0gV3JpdGVTdHJlYW0kb3BlblxuXG4gIGZzLlJlYWRTdHJlYW0gPSBSZWFkU3RyZWFtXG4gIGZzLldyaXRlU3RyZWFtID0gV3JpdGVTdHJlYW1cblxuICBmdW5jdGlvbiBSZWFkU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBSZWFkU3RyZWFtKVxuICAgICAgcmV0dXJuIGZzJFJlYWRTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdGhpc1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBSZWFkU3RyZWFtLmFwcGx5KE9iamVjdC5jcmVhdGUoUmVhZFN0cmVhbS5wcm90b3R5cGUpLCBhcmd1bWVudHMpXG4gIH1cblxuICBmdW5jdGlvbiBSZWFkU3RyZWFtJG9wZW4gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIG9wZW4odGhhdC5wYXRoLCB0aGF0LmZsYWdzLCB0aGF0Lm1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGlmICh0aGF0LmF1dG9DbG9zZSlcbiAgICAgICAgICB0aGF0LmRlc3Ryb3koKVxuXG4gICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmZkID0gZmRcbiAgICAgICAgdGhhdC5lbWl0KCdvcGVuJywgZmQpXG4gICAgICAgIHRoYXQucmVhZCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIFdyaXRlU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBXcml0ZVN0cmVhbSlcbiAgICAgIHJldHVybiBmcyRXcml0ZVN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0aGlzXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIFdyaXRlU3RyZWFtLmFwcGx5KE9iamVjdC5jcmVhdGUoV3JpdGVTdHJlYW0ucHJvdG90eXBlKSwgYXJndW1lbnRzKVxuICB9XG5cbiAgZnVuY3Rpb24gV3JpdGVTdHJlYW0kb3BlbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgb3Blbih0aGF0LnBhdGgsIHRoYXQuZmxhZ3MsIHRoYXQubW9kZSwgZnVuY3Rpb24gKGVyciwgZmQpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgdGhhdC5kZXN0cm95KClcbiAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGVycilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuZmQgPSBmZFxuICAgICAgICB0aGF0LmVtaXQoJ29wZW4nLCBmZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUmVhZFN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUmVhZFN0cmVhbShwYXRoLCBvcHRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlV3JpdGVTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFdyaXRlU3RyZWFtKHBhdGgsIG9wdGlvbnMpXG4gIH1cblxuICB2YXIgZnMkb3BlbiA9IGZzLm9wZW5cbiAgZnMub3BlbiA9IG9wZW5cbiAgZnVuY3Rpb24gb3BlbiAocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBtb2RlID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IgPSBtb2RlLCBtb2RlID0gbnVsbFxuXG4gICAgcmV0dXJuIGdvJG9wZW4ocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKVxuXG4gICAgZnVuY3Rpb24gZ28kb3BlbiAocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKSB7XG4gICAgICByZXR1cm4gZnMkb3BlbihwYXRoLCBmbGFncywgbW9kZSwgZnVuY3Rpb24gKGVyciwgZmQpIHtcbiAgICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgICAgZW5xdWV1ZShbZ28kb3BlbiwgW3BhdGgsIGZsYWdzLCBtb2RlLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnNcbn1cblxuZnVuY3Rpb24gZW5xdWV1ZSAoZWxlbSkge1xuICBkZWJ1ZygnRU5RVUVVRScsIGVsZW1bMF0ubmFtZSwgZWxlbVsxXSlcbiAgcXVldWUucHVzaChlbGVtKVxufVxuXG5mdW5jdGlvbiByZXRyeSAoKSB7XG4gIHZhciBlbGVtID0gcXVldWUuc2hpZnQoKVxuICBpZiAoZWxlbSkge1xuICAgIGRlYnVnKCdSRVRSWScsIGVsZW1bMF0ubmFtZSwgZWxlbVsxXSlcbiAgICBlbGVtWzBdLmFwcGx5KG51bGwsIGVsZW1bMV0pXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ncmFjZWZ1bC1mcy9ncmFjZWZ1bC1mcy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWtkaXJzOiByZXF1aXJlKCcuL21rZGlycycpLFxuICBta2RpcnNTeW5jOiByZXF1aXJlKCcuL21rZGlycy1zeW5jJyksXG4gIC8vIGFsaWFzXG4gIG1rZGlycDogcmVxdWlyZSgnLi9ta2RpcnMnKSxcbiAgbWtkaXJwU3luYzogcmVxdWlyZSgnLi9ta2RpcnMtc3luYycpLFxuICBlbnN1cmVEaXI6IHJlcXVpcmUoJy4vbWtkaXJzJyksXG4gIGVuc3VyZURpclN5bmM6IHJlcXVpcmUoJy4vbWtkaXJzLXN5bmMnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9ta2RpcnMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImFzc2VydFwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1dGlsXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBwb3NpeChwYXRoKSB7XG5cdHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufVxuXG5mdW5jdGlvbiB3aW4zMihwYXRoKSB7XG5cdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL2IzZmNjMjQ1ZmIyNTUzOTkwOWVmMWQ1ZWFhMDFkYmY5MmUxNjg2MzMvbGliL3BhdGguanMjTDU2XG5cdHZhciBzcGxpdERldmljZVJlID0gL14oW2EtekEtWl06fFtcXFxcXFwvXXsyfVteXFxcXFxcL10rW1xcXFxcXC9dK1teXFxcXFxcL10rKT8oW1xcXFxcXC9dKT8oW1xcc1xcU10qPykkLztcblx0dmFyIHJlc3VsdCA9IHNwbGl0RGV2aWNlUmUuZXhlYyhwYXRoKTtcblx0dmFyIGRldmljZSA9IHJlc3VsdFsxXSB8fCAnJztcblx0dmFyIGlzVW5jID0gQm9vbGVhbihkZXZpY2UgJiYgZGV2aWNlLmNoYXJBdCgxKSAhPT0gJzonKTtcblxuXHQvLyBVTkMgcGF0aHMgYXJlIGFsd2F5cyBhYnNvbHV0ZVxuXHRyZXR1cm4gQm9vbGVhbihyZXN1bHRbMl0gfHwgaXNVbmMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgPyB3aW4zMiA6IHBvc2l4O1xubW9kdWxlLmV4cG9ydHMucG9zaXggPSBwb3NpeDtcbm1vZHVsZS5leHBvcnRzLndpbjMyID0gd2luMzI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcGF0aC1pcy1hYnNvbHV0ZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIganNvbkZpbGUgPSByZXF1aXJlKCdqc29uZmlsZScpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBqc29uZmlsZSBleHBvcnRzXG4gIHJlYWRKc29uOiBqc29uRmlsZS5yZWFkRmlsZSxcbiAgcmVhZEpTT046IGpzb25GaWxlLnJlYWRGaWxlLFxuICByZWFkSnNvblN5bmM6IGpzb25GaWxlLnJlYWRGaWxlU3luYyxcbiAgcmVhZEpTT05TeW5jOiBqc29uRmlsZS5yZWFkRmlsZVN5bmMsXG4gIHdyaXRlSnNvbjoganNvbkZpbGUud3JpdGVGaWxlLFxuICB3cml0ZUpTT046IGpzb25GaWxlLndyaXRlRmlsZSxcbiAgd3JpdGVKc29uU3luYzoganNvbkZpbGUud3JpdGVGaWxlU3luYyxcbiAgd3JpdGVKU09OU3luYzoganNvbkZpbGUud3JpdGVGaWxlU3luYyxcbiAgc3BhY2VzOiAyIC8vIGRlZmF1bHQgaW4gZnMtZXh0cmFcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvanNvbi9qc29uZmlsZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIGludmFsaWRXaW4zMlBhdGggPSByZXF1aXJlKCcuL3dpbjMyJykuaW52YWxpZFdpbjMyUGF0aFxuXG52YXIgbzc3NyA9IHBhcnNlSW50KCcwNzc3JywgOClcblxuZnVuY3Rpb24gbWtkaXJzU3luYyAocCwgb3B0cywgbWFkZSkge1xuICBpZiAoIW9wdHMgfHwgdHlwZW9mIG9wdHMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0cyA9IHsgbW9kZTogb3B0cyB9XG4gIH1cblxuICB2YXIgbW9kZSA9IG9wdHMubW9kZVxuICB2YXIgeGZzID0gb3B0cy5mcyB8fCBmc1xuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInICYmIGludmFsaWRXaW4zMlBhdGgocCkpIHtcbiAgICB2YXIgZXJySW52YWwgPSBuZXcgRXJyb3IocCArICcgY29udGFpbnMgaW52YWxpZCBXSU4zMiBwYXRoIGNoYXJhY3RlcnMuJylcbiAgICBlcnJJbnZhbC5jb2RlID0gJ0VJTlZBTCdcbiAgICB0aHJvdyBlcnJJbnZhbFxuICB9XG5cbiAgaWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIG1vZGUgPSBvNzc3ICYgKH5wcm9jZXNzLnVtYXNrKCkpXG4gIH1cbiAgaWYgKCFtYWRlKSBtYWRlID0gbnVsbFxuXG4gIHAgPSBwYXRoLnJlc29sdmUocClcblxuICB0cnkge1xuICAgIHhmcy5ta2RpclN5bmMocCwgbW9kZSlcbiAgICBtYWRlID0gbWFkZSB8fCBwXG4gIH0gY2F0Y2ggKGVycjApIHtcbiAgICBzd2l0Y2ggKGVycjAuY29kZSkge1xuICAgICAgY2FzZSAnRU5PRU5UJzpcbiAgICAgICAgaWYgKHBhdGguZGlybmFtZShwKSA9PT0gcCkgdGhyb3cgZXJyMFxuICAgICAgICBtYWRlID0gbWtkaXJzU3luYyhwYXRoLmRpcm5hbWUocCksIG9wdHMsIG1hZGUpXG4gICAgICAgIG1rZGlyc1N5bmMocCwgb3B0cywgbWFkZSlcbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gSW4gdGhlIGNhc2Ugb2YgYW55IG90aGVyIGVycm9yLCBqdXN0IHNlZSBpZiB0aGVyZSdzIGEgZGlyXG4gICAgICAvLyB0aGVyZSBhbHJlYWR5LiAgSWYgc28sIHRoZW4gaG9vcmF5ISAgSWYgbm90LCB0aGVuIHNvbWV0aGluZ1xuICAgICAgLy8gaXMgYm9ya2VkLlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIHN0YXRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdGF0ID0geGZzLnN0YXRTeW5jKHApXG4gICAgICAgIH0gY2F0Y2ggKGVycjEpIHtcbiAgICAgICAgICB0aHJvdyBlcnIwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdGF0LmlzRGlyZWN0b3J5KCkpIHRocm93IGVycjBcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFkZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1rZGlyc1N5bmNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvbWtkaXJzL21rZGlycy1zeW5jLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG52YXIgaW52YWxpZFdpbjMyUGF0aCA9IHJlcXVpcmUoJy4vd2luMzInKS5pbnZhbGlkV2luMzJQYXRoXG5cbnZhciBvNzc3ID0gcGFyc2VJbnQoJzA3NzcnLCA4KVxuXG5mdW5jdGlvbiBta2RpcnMgKHAsIG9wdHMsIGNhbGxiYWNrLCBtYWRlKSB7XG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0c1xuICAgIG9wdHMgPSB7fVxuICB9IGVsc2UgaWYgKCFvcHRzIHx8IHR5cGVvZiBvcHRzICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSB7IG1vZGU6IG9wdHMgfVxuICB9XG5cbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgJiYgaW52YWxpZFdpbjMyUGF0aChwKSkge1xuICAgIHZhciBlcnJJbnZhbCA9IG5ldyBFcnJvcihwICsgJyBjb250YWlucyBpbnZhbGlkIFdJTjMyIHBhdGggY2hhcmFjdGVycy4nKVxuICAgIGVyckludmFsLmNvZGUgPSAnRUlOVkFMJ1xuICAgIHJldHVybiBjYWxsYmFjayhlcnJJbnZhbClcbiAgfVxuXG4gIHZhciBtb2RlID0gb3B0cy5tb2RlXG4gIHZhciB4ZnMgPSBvcHRzLmZzIHx8IGZzXG5cbiAgaWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIG1vZGUgPSBvNzc3ICYgKH5wcm9jZXNzLnVtYXNrKCkpXG4gIH1cbiAgaWYgKCFtYWRlKSBtYWRlID0gbnVsbFxuXG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge31cbiAgcCA9IHBhdGgucmVzb2x2ZShwKVxuXG4gIHhmcy5ta2RpcihwLCBtb2RlLCBmdW5jdGlvbiAoZXIpIHtcbiAgICBpZiAoIWVyKSB7XG4gICAgICBtYWRlID0gbWFkZSB8fCBwXG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbWFkZSlcbiAgICB9XG4gICAgc3dpdGNoIChlci5jb2RlKSB7XG4gICAgICBjYXNlICdFTk9FTlQnOlxuICAgICAgICBpZiAocGF0aC5kaXJuYW1lKHApID09PSBwKSByZXR1cm4gY2FsbGJhY2soZXIpXG4gICAgICAgIG1rZGlycyhwYXRoLmRpcm5hbWUocCksIG9wdHMsIGZ1bmN0aW9uIChlciwgbWFkZSkge1xuICAgICAgICAgIGlmIChlcikgY2FsbGJhY2soZXIsIG1hZGUpXG4gICAgICAgICAgZWxzZSBta2RpcnMocCwgb3B0cywgY2FsbGJhY2ssIG1hZGUpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGFueSBvdGhlciBlcnJvciwganVzdCBzZWUgaWYgdGhlcmUncyBhIGRpclxuICAgICAgLy8gdGhlcmUgYWxyZWFkeS4gIElmIHNvLCB0aGVuIGhvb3JheSEgIElmIG5vdCwgdGhlbiBzb21ldGhpbmdcbiAgICAgIC8vIGlzIGJvcmtlZC5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHhmcy5zdGF0KHAsIGZ1bmN0aW9uIChlcjIsIHN0YXQpIHtcbiAgICAgICAgICAvLyBpZiB0aGUgc3RhdCBmYWlscywgdGhlbiB0aGF0J3Mgc3VwZXIgd2VpcmQuXG4gICAgICAgICAgLy8gbGV0IHRoZSBvcmlnaW5hbCBlcnJvciBiZSB0aGUgZmFpbHVyZSByZWFzb24uXG4gICAgICAgICAgaWYgKGVyMiB8fCAhc3RhdC5pc0RpcmVjdG9yeSgpKSBjYWxsYmFjayhlciwgbWFkZSlcbiAgICAgICAgICBlbHNlIGNhbGxiYWNrKG51bGwsIG1hZGUpXG4gICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1rZGlyc1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9ta2RpcnMvbWtkaXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gbWluaW1hdGNoXG5taW5pbWF0Y2guTWluaW1hdGNoID0gTWluaW1hdGNoXG5cbnZhciBwYXRoID0geyBzZXA6ICcvJyB9XG50cnkge1xuICBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG59IGNhdGNoIChlcikge31cblxudmFyIEdMT0JTVEFSID0gbWluaW1hdGNoLkdMT0JTVEFSID0gTWluaW1hdGNoLkdMT0JTVEFSID0ge31cbnZhciBleHBhbmQgPSByZXF1aXJlKCdicmFjZS1leHBhbnNpb24nKVxuXG52YXIgcGxUeXBlcyA9IHtcbiAgJyEnOiB7IG9wZW46ICcoPzooPyEoPzonLCBjbG9zZTogJykpW14vXSo/KSd9LFxuICAnPyc6IHsgb3BlbjogJyg/OicsIGNsb3NlOiAnKT8nIH0sXG4gICcrJzogeyBvcGVuOiAnKD86JywgY2xvc2U6ICcpKycgfSxcbiAgJyonOiB7IG9wZW46ICcoPzonLCBjbG9zZTogJykqJyB9LFxuICAnQCc6IHsgb3BlbjogJyg/OicsIGNsb3NlOiAnKScgfVxufVxuXG4vLyBhbnkgc2luZ2xlIHRoaW5nIG90aGVyIHRoYW4gL1xuLy8gZG9uJ3QgbmVlZCB0byBlc2NhcGUgLyB3aGVuIHVzaW5nIG5ldyBSZWdFeHAoKVxudmFyIHFtYXJrID0gJ1teL10nXG5cbi8vICogPT4gYW55IG51bWJlciBvZiBjaGFyYWN0ZXJzXG52YXIgc3RhciA9IHFtYXJrICsgJyo/J1xuXG4vLyAqKiB3aGVuIGRvdHMgYXJlIGFsbG93ZWQuICBBbnl0aGluZyBnb2VzLCBleGNlcHQgLi4gYW5kIC5cbi8vIG5vdCAoXiBvciAvIGZvbGxvd2VkIGJ5IG9uZSBvciB0d28gZG90cyBmb2xsb3dlZCBieSAkIG9yIC8pLFxuLy8gZm9sbG93ZWQgYnkgYW55dGhpbmcsIGFueSBudW1iZXIgb2YgdGltZXMuXG52YXIgdHdvU3RhckRvdCA9ICcoPzooPyEoPzpcXFxcXFwvfF4pKD86XFxcXC57MSwyfSkoJHxcXFxcXFwvKSkuKSo/J1xuXG4vLyBub3QgYSBeIG9yIC8gZm9sbG93ZWQgYnkgYSBkb3QsXG4vLyBmb2xsb3dlZCBieSBhbnl0aGluZywgYW55IG51bWJlciBvZiB0aW1lcy5cbnZhciB0d29TdGFyTm9Eb3QgPSAnKD86KD8hKD86XFxcXFxcL3xeKVxcXFwuKS4pKj8nXG5cbi8vIGNoYXJhY3RlcnMgdGhhdCBuZWVkIHRvIGJlIGVzY2FwZWQgaW4gUmVnRXhwLlxudmFyIHJlU3BlY2lhbHMgPSBjaGFyU2V0KCcoKS4qe30rP1tdXiRcXFxcIScpXG5cbi8vIFwiYWJjXCIgLT4geyBhOnRydWUsIGI6dHJ1ZSwgYzp0cnVlIH1cbmZ1bmN0aW9uIGNoYXJTZXQgKHMpIHtcbiAgcmV0dXJuIHMuc3BsaXQoJycpLnJlZHVjZShmdW5jdGlvbiAoc2V0LCBjKSB7XG4gICAgc2V0W2NdID0gdHJ1ZVxuICAgIHJldHVybiBzZXRcbiAgfSwge30pXG59XG5cbi8vIG5vcm1hbGl6ZXMgc2xhc2hlcy5cbnZhciBzbGFzaFNwbGl0ID0gL1xcLysvXG5cbm1pbmltYXRjaC5maWx0ZXIgPSBmaWx0ZXJcbmZ1bmN0aW9uIGZpbHRlciAocGF0dGVybiwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICByZXR1cm4gZnVuY3Rpb24gKHAsIGksIGxpc3QpIHtcbiAgICByZXR1cm4gbWluaW1hdGNoKHAsIHBhdHRlcm4sIG9wdGlvbnMpXG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0IChhLCBiKSB7XG4gIGEgPSBhIHx8IHt9XG4gIGIgPSBiIHx8IHt9XG4gIHZhciB0ID0ge31cbiAgT2JqZWN0LmtleXMoYikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIHRba10gPSBiW2tdXG4gIH0pXG4gIE9iamVjdC5rZXlzKGEpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICB0W2tdID0gYVtrXVxuICB9KVxuICByZXR1cm4gdFxufVxuXG5taW5pbWF0Y2guZGVmYXVsdHMgPSBmdW5jdGlvbiAoZGVmKSB7XG4gIGlmICghZGVmIHx8ICFPYmplY3Qua2V5cyhkZWYpLmxlbmd0aCkgcmV0dXJuIG1pbmltYXRjaFxuXG4gIHZhciBvcmlnID0gbWluaW1hdGNoXG5cbiAgdmFyIG0gPSBmdW5jdGlvbiBtaW5pbWF0Y2ggKHAsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3JpZy5taW5pbWF0Y2gocCwgcGF0dGVybiwgZXh0KGRlZiwgb3B0aW9ucykpXG4gIH1cblxuICBtLk1pbmltYXRjaCA9IGZ1bmN0aW9uIE1pbmltYXRjaCAocGF0dGVybiwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgb3JpZy5NaW5pbWF0Y2gocGF0dGVybiwgZXh0KGRlZiwgb3B0aW9ucykpXG4gIH1cblxuICByZXR1cm4gbVxufVxuXG5NaW5pbWF0Y2guZGVmYXVsdHMgPSBmdW5jdGlvbiAoZGVmKSB7XG4gIGlmICghZGVmIHx8ICFPYmplY3Qua2V5cyhkZWYpLmxlbmd0aCkgcmV0dXJuIE1pbmltYXRjaFxuICByZXR1cm4gbWluaW1hdGNoLmRlZmF1bHRzKGRlZikuTWluaW1hdGNoXG59XG5cbmZ1bmN0aW9uIG1pbmltYXRjaCAocCwgcGF0dGVybiwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHBhdHRlcm4gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZ2xvYiBwYXR0ZXJuIHN0cmluZyByZXF1aXJlZCcpXG4gIH1cblxuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuXG4gIC8vIHNob3J0Y3V0OiBjb21tZW50cyBtYXRjaCBub3RoaW5nLlxuICBpZiAoIW9wdGlvbnMubm9jb21tZW50ICYmIHBhdHRlcm4uY2hhckF0KDApID09PSAnIycpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIFwiXCIgb25seSBtYXRjaGVzIFwiXCJcbiAgaWYgKHBhdHRlcm4udHJpbSgpID09PSAnJykgcmV0dXJuIHAgPT09ICcnXG5cbiAgcmV0dXJuIG5ldyBNaW5pbWF0Y2gocGF0dGVybiwgb3B0aW9ucykubWF0Y2gocClcbn1cblxuZnVuY3Rpb24gTWluaW1hdGNoIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW5pbWF0Y2gpKSB7XG4gICAgcmV0dXJuIG5ldyBNaW5pbWF0Y2gocGF0dGVybiwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICh0eXBlb2YgcGF0dGVybiAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdnbG9iIHBhdHRlcm4gc3RyaW5nIHJlcXVpcmVkJylcbiAgfVxuXG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG4gIHBhdHRlcm4gPSBwYXR0ZXJuLnRyaW0oKVxuXG4gIC8vIHdpbmRvd3Mgc3VwcG9ydDogbmVlZCB0byB1c2UgLywgbm90IFxcXG4gIGlmIChwYXRoLnNlcCAhPT0gJy8nKSB7XG4gICAgcGF0dGVybiA9IHBhdHRlcm4uc3BsaXQocGF0aC5zZXApLmpvaW4oJy8nKVxuICB9XG5cbiAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB0aGlzLnNldCA9IFtdXG4gIHRoaXMucGF0dGVybiA9IHBhdHRlcm5cbiAgdGhpcy5yZWdleHAgPSBudWxsXG4gIHRoaXMubmVnYXRlID0gZmFsc2VcbiAgdGhpcy5jb21tZW50ID0gZmFsc2VcbiAgdGhpcy5lbXB0eSA9IGZhbHNlXG5cbiAgLy8gbWFrZSB0aGUgc2V0IG9mIHJlZ2V4cHMgZXRjLlxuICB0aGlzLm1ha2UoKVxufVxuXG5NaW5pbWF0Y2gucHJvdG90eXBlLmRlYnVnID0gZnVuY3Rpb24gKCkge31cblxuTWluaW1hdGNoLnByb3RvdHlwZS5tYWtlID0gbWFrZVxuZnVuY3Rpb24gbWFrZSAoKSB7XG4gIC8vIGRvbid0IGRvIGl0IG1vcmUgdGhhbiBvbmNlLlxuICBpZiAodGhpcy5fbWFkZSkgcmV0dXJuXG5cbiAgdmFyIHBhdHRlcm4gPSB0aGlzLnBhdHRlcm5cbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcblxuICAvLyBlbXB0eSBwYXR0ZXJucyBhbmQgY29tbWVudHMgbWF0Y2ggbm90aGluZy5cbiAgaWYgKCFvcHRpb25zLm5vY29tbWVudCAmJiBwYXR0ZXJuLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgdGhpcy5jb21tZW50ID0gdHJ1ZVxuICAgIHJldHVyblxuICB9XG4gIGlmICghcGF0dGVybikge1xuICAgIHRoaXMuZW1wdHkgPSB0cnVlXG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBzdGVwIDE6IGZpZ3VyZSBvdXQgbmVnYXRpb24sIGV0Yy5cbiAgdGhpcy5wYXJzZU5lZ2F0ZSgpXG5cbiAgLy8gc3RlcCAyOiBleHBhbmQgYnJhY2VzXG4gIHZhciBzZXQgPSB0aGlzLmdsb2JTZXQgPSB0aGlzLmJyYWNlRXhwYW5kKClcblxuICBpZiAob3B0aW9ucy5kZWJ1ZykgdGhpcy5kZWJ1ZyA9IGNvbnNvbGUuZXJyb3JcblxuICB0aGlzLmRlYnVnKHRoaXMucGF0dGVybiwgc2V0KVxuXG4gIC8vIHN0ZXAgMzogbm93IHdlIGhhdmUgYSBzZXQsIHNvIHR1cm4gZWFjaCBvbmUgaW50byBhIHNlcmllcyBvZiBwYXRoLXBvcnRpb25cbiAgLy8gbWF0Y2hpbmcgcGF0dGVybnMuXG4gIC8vIFRoZXNlIHdpbGwgYmUgcmVnZXhwcywgZXhjZXB0IGluIHRoZSBjYXNlIG9mIFwiKipcIiwgd2hpY2ggaXNcbiAgLy8gc2V0IHRvIHRoZSBHTE9CU1RBUiBvYmplY3QgZm9yIGdsb2JzdGFyIGJlaGF2aW9yLFxuICAvLyBhbmQgd2lsbCBub3QgY29udGFpbiBhbnkgLyBjaGFyYWN0ZXJzXG4gIHNldCA9IHRoaXMuZ2xvYlBhcnRzID0gc2V0Lm1hcChmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBzLnNwbGl0KHNsYXNoU3BsaXQpXG4gIH0pXG5cbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sIHNldClcblxuICAvLyBnbG9iIC0tPiByZWdleHBzXG4gIHNldCA9IHNldC5tYXAoZnVuY3Rpb24gKHMsIHNpLCBzZXQpIHtcbiAgICByZXR1cm4gcy5tYXAodGhpcy5wYXJzZSwgdGhpcylcbiAgfSwgdGhpcylcblxuICB0aGlzLmRlYnVnKHRoaXMucGF0dGVybiwgc2V0KVxuXG4gIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGRpZG4ndCBjb21waWxlIHByb3Blcmx5LlxuICBzZXQgPSBzZXQuZmlsdGVyKGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIHMuaW5kZXhPZihmYWxzZSkgPT09IC0xXG4gIH0pXG5cbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sIHNldClcblxuICB0aGlzLnNldCA9IHNldFxufVxuXG5NaW5pbWF0Y2gucHJvdG90eXBlLnBhcnNlTmVnYXRlID0gcGFyc2VOZWdhdGVcbmZ1bmN0aW9uIHBhcnNlTmVnYXRlICgpIHtcbiAgdmFyIHBhdHRlcm4gPSB0aGlzLnBhdHRlcm5cbiAgdmFyIG5lZ2F0ZSA9IGZhbHNlXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zXG4gIHZhciBuZWdhdGVPZmZzZXQgPSAwXG5cbiAgaWYgKG9wdGlvbnMubm9uZWdhdGUpIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gcGF0dGVybi5sZW5ndGhcbiAgICA7IGkgPCBsICYmIHBhdHRlcm4uY2hhckF0KGkpID09PSAnISdcbiAgICA7IGkrKykge1xuICAgIG5lZ2F0ZSA9ICFuZWdhdGVcbiAgICBuZWdhdGVPZmZzZXQrK1xuICB9XG5cbiAgaWYgKG5lZ2F0ZU9mZnNldCkgdGhpcy5wYXR0ZXJuID0gcGF0dGVybi5zdWJzdHIobmVnYXRlT2Zmc2V0KVxuICB0aGlzLm5lZ2F0ZSA9IG5lZ2F0ZVxufVxuXG4vLyBCcmFjZSBleHBhbnNpb246XG4vLyBhe2IsY31kIC0+IGFiZCBhY2Rcbi8vIGF7Yix9YyAtPiBhYmMgYWNcbi8vIGF7MC4uM31kIC0+IGEwZCBhMWQgYTJkIGEzZFxuLy8gYXtiLGN7ZCxlfWZ9ZyAtPiBhYmcgYWNkZmcgYWNlZmdcbi8vIGF7YixjfWR7ZSxmfWcgLT4gYWJkZWcgYWNkZWcgYWJkZWcgYWJkZmdcbi8vXG4vLyBJbnZhbGlkIHNldHMgYXJlIG5vdCBleHBhbmRlZC5cbi8vIGF7Mi4ufWIgLT4gYXsyLi59YlxuLy8gYXtifWMgLT4gYXtifWNcbm1pbmltYXRjaC5icmFjZUV4cGFuZCA9IGZ1bmN0aW9uIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIHJldHVybiBicmFjZUV4cGFuZChwYXR0ZXJuLCBvcHRpb25zKVxufVxuXG5NaW5pbWF0Y2gucHJvdG90eXBlLmJyYWNlRXhwYW5kID0gYnJhY2VFeHBhbmRcblxuZnVuY3Rpb24gYnJhY2VFeHBhbmQgKHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBNaW5pbWF0Y2gpIHtcbiAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuICB9XG5cbiAgcGF0dGVybiA9IHR5cGVvZiBwYXR0ZXJuID09PSAndW5kZWZpbmVkJ1xuICAgID8gdGhpcy5wYXR0ZXJuIDogcGF0dGVyblxuXG4gIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd1bmRlZmluZWQgcGF0dGVybicpXG4gIH1cblxuICBpZiAob3B0aW9ucy5ub2JyYWNlIHx8XG4gICAgIXBhdHRlcm4ubWF0Y2goL1xcey4qXFx9LykpIHtcbiAgICAvLyBzaG9ydGN1dC4gbm8gbmVlZCB0byBleHBhbmQuXG4gICAgcmV0dXJuIFtwYXR0ZXJuXVxuICB9XG5cbiAgcmV0dXJuIGV4cGFuZChwYXR0ZXJuKVxufVxuXG4vLyBwYXJzZSBhIGNvbXBvbmVudCBvZiB0aGUgZXhwYW5kZWQgc2V0LlxuLy8gQXQgdGhpcyBwb2ludCwgbm8gcGF0dGVybiBtYXkgY29udGFpbiBcIi9cIiBpbiBpdFxuLy8gc28gd2UncmUgZ29pbmcgdG8gcmV0dXJuIGEgMmQgYXJyYXksIHdoZXJlIGVhY2ggZW50cnkgaXMgdGhlIGZ1bGxcbi8vIHBhdHRlcm4sIHNwbGl0IG9uICcvJywgYW5kIHRoZW4gdHVybmVkIGludG8gYSByZWd1bGFyIGV4cHJlc3Npb24uXG4vLyBBIHJlZ2V4cCBpcyBtYWRlIGF0IHRoZSBlbmQgd2hpY2ggam9pbnMgZWFjaCBhcnJheSB3aXRoIGFuXG4vLyBlc2NhcGVkIC8sIGFuZCBhbm90aGVyIGZ1bGwgb25lIHdoaWNoIGpvaW5zIGVhY2ggcmVnZXhwIHdpdGggfC5cbi8vXG4vLyBGb2xsb3dpbmcgdGhlIGxlYWQgb2YgQmFzaCA0LjEsIG5vdGUgdGhhdCBcIioqXCIgb25seSBoYXMgc3BlY2lhbCBtZWFuaW5nXG4vLyB3aGVuIGl0IGlzIHRoZSAqb25seSogdGhpbmcgaW4gYSBwYXRoIHBvcnRpb24uICBPdGhlcndpc2UsIGFueSBzZXJpZXNcbi8vIG9mICogaXMgZXF1aXZhbGVudCB0byBhIHNpbmdsZSAqLiAgR2xvYnN0YXIgYmVoYXZpb3IgaXMgZW5hYmxlZCBieVxuLy8gZGVmYXVsdCwgYW5kIGNhbiBiZSBkaXNhYmxlZCBieSBzZXR0aW5nIG9wdGlvbnMubm9nbG9ic3Rhci5cbk1pbmltYXRjaC5wcm90b3R5cGUucGFyc2UgPSBwYXJzZVxudmFyIFNVQlBBUlNFID0ge31cbmZ1bmN0aW9uIHBhcnNlIChwYXR0ZXJuLCBpc1N1Yikge1xuICBpZiAocGF0dGVybi5sZW5ndGggPiAxMDI0ICogNjQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXR0ZXJuIGlzIHRvbyBsb25nJylcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zXG5cbiAgLy8gc2hvcnRjdXRzXG4gIGlmICghb3B0aW9ucy5ub2dsb2JzdGFyICYmIHBhdHRlcm4gPT09ICcqKicpIHJldHVybiBHTE9CU1RBUlxuICBpZiAocGF0dGVybiA9PT0gJycpIHJldHVybiAnJ1xuXG4gIHZhciByZSA9ICcnXG4gIHZhciBoYXNNYWdpYyA9ICEhb3B0aW9ucy5ub2Nhc2VcbiAgdmFyIGVzY2FwaW5nID0gZmFsc2VcbiAgLy8gPyA9PiBvbmUgc2luZ2xlIGNoYXJhY3RlclxuICB2YXIgcGF0dGVybkxpc3RTdGFjayA9IFtdXG4gIHZhciBuZWdhdGl2ZUxpc3RzID0gW11cbiAgdmFyIHN0YXRlQ2hhclxuICB2YXIgaW5DbGFzcyA9IGZhbHNlXG4gIHZhciByZUNsYXNzU3RhcnQgPSAtMVxuICB2YXIgY2xhc3NTdGFydCA9IC0xXG4gIC8vIC4gYW5kIC4uIG5ldmVyIG1hdGNoIGFueXRoaW5nIHRoYXQgZG9lc24ndCBzdGFydCB3aXRoIC4sXG4gIC8vIGV2ZW4gd2hlbiBvcHRpb25zLmRvdCBpcyBzZXQuXG4gIHZhciBwYXR0ZXJuU3RhcnQgPSBwYXR0ZXJuLmNoYXJBdCgwKSA9PT0gJy4nID8gJycgLy8gYW55dGhpbmdcbiAgLy8gbm90IChzdGFydCBvciAvIGZvbGxvd2VkIGJ5IC4gb3IgLi4gZm9sbG93ZWQgYnkgLyBvciBlbmQpXG4gIDogb3B0aW9ucy5kb3QgPyAnKD8hKD86XnxcXFxcXFwvKVxcXFwuezEsMn0oPzokfFxcXFxcXC8pKSdcbiAgOiAnKD8hXFxcXC4pJ1xuICB2YXIgc2VsZiA9IHRoaXNcblxuICBmdW5jdGlvbiBjbGVhclN0YXRlQ2hhciAoKSB7XG4gICAgaWYgKHN0YXRlQ2hhcikge1xuICAgICAgLy8gd2UgaGFkIHNvbWUgc3RhdGUtdHJhY2tpbmcgY2hhcmFjdGVyXG4gICAgICAvLyB0aGF0IHdhc24ndCBjb25zdW1lZCBieSB0aGlzIHBhc3MuXG4gICAgICBzd2l0Y2ggKHN0YXRlQ2hhcikge1xuICAgICAgICBjYXNlICcqJzpcbiAgICAgICAgICByZSArPSBzdGFyXG4gICAgICAgICAgaGFzTWFnaWMgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJz8nOlxuICAgICAgICAgIHJlICs9IHFtYXJrXG4gICAgICAgICAgaGFzTWFnaWMgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmUgKz0gJ1xcXFwnICsgc3RhdGVDaGFyXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBzZWxmLmRlYnVnKCdjbGVhclN0YXRlQ2hhciAlaiAlaicsIHN0YXRlQ2hhciwgcmUpXG4gICAgICBzdGF0ZUNoYXIgPSBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXR0ZXJuLmxlbmd0aCwgY1xuICAgIDsgKGkgPCBsZW4pICYmIChjID0gcGF0dGVybi5jaGFyQXQoaSkpXG4gICAgOyBpKyspIHtcbiAgICB0aGlzLmRlYnVnKCclc1xcdCVzICVzICVqJywgcGF0dGVybiwgaSwgcmUsIGMpXG5cbiAgICAvLyBza2lwIG92ZXIgYW55IHRoYXQgYXJlIGVzY2FwZWQuXG4gICAgaWYgKGVzY2FwaW5nICYmIHJlU3BlY2lhbHNbY10pIHtcbiAgICAgIHJlICs9ICdcXFxcJyArIGNcbiAgICAgIGVzY2FwaW5nID0gZmFsc2VcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgc3dpdGNoIChjKSB7XG4gICAgICBjYXNlICcvJzpcbiAgICAgICAgLy8gY29tcGxldGVseSBub3QgYWxsb3dlZCwgZXZlbiBlc2NhcGVkLlxuICAgICAgICAvLyBTaG91bGQgYWxyZWFkeSBiZSBwYXRoLXNwbGl0IGJ5IG5vdy5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgIGNhc2UgJ1xcXFwnOlxuICAgICAgICBjbGVhclN0YXRlQ2hhcigpXG4gICAgICAgIGVzY2FwaW5nID0gdHJ1ZVxuICAgICAgY29udGludWVcblxuICAgICAgLy8gdGhlIHZhcmlvdXMgc3RhdGVDaGFyIHZhbHVlc1xuICAgICAgLy8gZm9yIHRoZSBcImV4dGdsb2JcIiBzdHVmZi5cbiAgICAgIGNhc2UgJz8nOlxuICAgICAgY2FzZSAnKic6XG4gICAgICBjYXNlICcrJzpcbiAgICAgIGNhc2UgJ0AnOlxuICAgICAgY2FzZSAnISc6XG4gICAgICAgIHRoaXMuZGVidWcoJyVzXFx0JXMgJXMgJWogPC0tIHN0YXRlQ2hhcicsIHBhdHRlcm4sIGksIHJlLCBjKVxuXG4gICAgICAgIC8vIGFsbCBvZiB0aG9zZSBhcmUgbGl0ZXJhbHMgaW5zaWRlIGEgY2xhc3MsIGV4Y2VwdCB0aGF0XG4gICAgICAgIC8vIHRoZSBnbG9iIFshYV0gbWVhbnMgW15hXSBpbiByZWdleHBcbiAgICAgICAgaWYgKGluQ2xhc3MpIHtcbiAgICAgICAgICB0aGlzLmRlYnVnKCcgIGluIGNsYXNzJylcbiAgICAgICAgICBpZiAoYyA9PT0gJyEnICYmIGkgPT09IGNsYXNzU3RhcnQgKyAxKSBjID0gJ14nXG4gICAgICAgICAgcmUgKz0gY1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB3ZSBhbHJlYWR5IGhhdmUgYSBzdGF0ZUNoYXIsIHRoZW4gaXQgbWVhbnNcbiAgICAgICAgLy8gdGhhdCB0aGVyZSB3YXMgc29tZXRoaW5nIGxpa2UgKiogb3IgKz8gaW4gdGhlcmUuXG4gICAgICAgIC8vIEhhbmRsZSB0aGUgc3RhdGVDaGFyLCB0aGVuIHByb2NlZWQgd2l0aCB0aGlzIG9uZS5cbiAgICAgICAgc2VsZi5kZWJ1ZygnY2FsbCBjbGVhclN0YXRlQ2hhciAlaicsIHN0YXRlQ2hhcilcbiAgICAgICAgY2xlYXJTdGF0ZUNoYXIoKVxuICAgICAgICBzdGF0ZUNoYXIgPSBjXG4gICAgICAgIC8vIGlmIGV4dGdsb2IgaXMgZGlzYWJsZWQsIHRoZW4gKyhhc2RmfGZvbykgaXNuJ3QgYSB0aGluZy5cbiAgICAgICAgLy8ganVzdCBjbGVhciB0aGUgc3RhdGVjaGFyICpub3cqLCByYXRoZXIgdGhhbiBldmVuIGRpdmluZyBpbnRvXG4gICAgICAgIC8vIHRoZSBwYXR0ZXJuTGlzdCBzdHVmZi5cbiAgICAgICAgaWYgKG9wdGlvbnMubm9leHQpIGNsZWFyU3RhdGVDaGFyKClcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAgIGNhc2UgJygnOlxuICAgICAgICBpZiAoaW5DbGFzcykge1xuICAgICAgICAgIHJlICs9ICcoJ1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXN0YXRlQ2hhcikge1xuICAgICAgICAgIHJlICs9ICdcXFxcKCdcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgcGF0dGVybkxpc3RTdGFjay5wdXNoKHtcbiAgICAgICAgICB0eXBlOiBzdGF0ZUNoYXIsXG4gICAgICAgICAgc3RhcnQ6IGkgLSAxLFxuICAgICAgICAgIHJlU3RhcnQ6IHJlLmxlbmd0aCxcbiAgICAgICAgICBvcGVuOiBwbFR5cGVzW3N0YXRlQ2hhcl0ub3BlbixcbiAgICAgICAgICBjbG9zZTogcGxUeXBlc1tzdGF0ZUNoYXJdLmNsb3NlXG4gICAgICAgIH0pXG4gICAgICAgIC8vIG5lZ2F0aW9uIGlzICg/Oig/IWpzKVteL10qKVxuICAgICAgICByZSArPSBzdGF0ZUNoYXIgPT09ICchJyA/ICcoPzooPyEoPzonIDogJyg/OidcbiAgICAgICAgdGhpcy5kZWJ1ZygncGxUeXBlICVqICVqJywgc3RhdGVDaGFyLCByZSlcbiAgICAgICAgc3RhdGVDaGFyID0gZmFsc2VcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAgIGNhc2UgJyknOlxuICAgICAgICBpZiAoaW5DbGFzcyB8fCAhcGF0dGVybkxpc3RTdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICByZSArPSAnXFxcXCknXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcbiAgICAgICAgaGFzTWFnaWMgPSB0cnVlXG4gICAgICAgIHZhciBwbCA9IHBhdHRlcm5MaXN0U3RhY2sucG9wKClcbiAgICAgICAgLy8gbmVnYXRpb24gaXMgKD86KD8hanMpW14vXSopXG4gICAgICAgIC8vIFRoZSBvdGhlcnMgYXJlICg/OjxwYXR0ZXJuPik8dHlwZT5cbiAgICAgICAgcmUgKz0gcGwuY2xvc2VcbiAgICAgICAgaWYgKHBsLnR5cGUgPT09ICchJykge1xuICAgICAgICAgIG5lZ2F0aXZlTGlzdHMucHVzaChwbClcbiAgICAgICAgfVxuICAgICAgICBwbC5yZUVuZCA9IHJlLmxlbmd0aFxuICAgICAgY29udGludWVcblxuICAgICAgY2FzZSAnfCc6XG4gICAgICAgIGlmIChpbkNsYXNzIHx8ICFwYXR0ZXJuTGlzdFN0YWNrLmxlbmd0aCB8fCBlc2NhcGluZykge1xuICAgICAgICAgIHJlICs9ICdcXFxcfCdcbiAgICAgICAgICBlc2NhcGluZyA9IGZhbHNlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcbiAgICAgICAgcmUgKz0gJ3wnXG4gICAgICBjb250aW51ZVxuXG4gICAgICAvLyB0aGVzZSBhcmUgbW9zdGx5IHRoZSBzYW1lIGluIHJlZ2V4cCBhbmQgZ2xvYlxuICAgICAgY2FzZSAnWyc6XG4gICAgICAgIC8vIHN3YWxsb3cgYW55IHN0YXRlLXRyYWNraW5nIGNoYXIgYmVmb3JlIHRoZSBbXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcblxuICAgICAgICBpZiAoaW5DbGFzcykge1xuICAgICAgICAgIHJlICs9ICdcXFxcJyArIGNcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaW5DbGFzcyA9IHRydWVcbiAgICAgICAgY2xhc3NTdGFydCA9IGlcbiAgICAgICAgcmVDbGFzc1N0YXJ0ID0gcmUubGVuZ3RoXG4gICAgICAgIHJlICs9IGNcbiAgICAgIGNvbnRpbnVlXG5cbiAgICAgIGNhc2UgJ10nOlxuICAgICAgICAvLyAgYSByaWdodCBicmFja2V0IHNoYWxsIGxvc2UgaXRzIHNwZWNpYWxcbiAgICAgICAgLy8gIG1lYW5pbmcgYW5kIHJlcHJlc2VudCBpdHNlbGYgaW5cbiAgICAgICAgLy8gIGEgYnJhY2tldCBleHByZXNzaW9uIGlmIGl0IG9jY3Vyc1xuICAgICAgICAvLyAgZmlyc3QgaW4gdGhlIGxpc3QuICAtLSBQT1NJWC4yIDIuOC4zLjJcbiAgICAgICAgaWYgKGkgPT09IGNsYXNzU3RhcnQgKyAxIHx8ICFpbkNsYXNzKSB7XG4gICAgICAgICAgcmUgKz0gJ1xcXFwnICsgY1xuICAgICAgICAgIGVzY2FwaW5nID0gZmFsc2VcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHdlIGxlZnQgYSBjbGFzcyBvcGVuLlxuICAgICAgICAvLyBcIlt6LWFdXCIgaXMgdmFsaWQsIGVxdWl2YWxlbnQgdG8gXCJcXFt6LWFcXF1cIlxuICAgICAgICBpZiAoaW5DbGFzcykge1xuICAgICAgICAgIC8vIHNwbGl0IHdoZXJlIHRoZSBsYXN0IFsgd2FzLCBtYWtlIHN1cmUgd2UgZG9uJ3QgaGF2ZVxuICAgICAgICAgIC8vIGFuIGludmFsaWQgcmUuIGlmIHNvLCByZS13YWxrIHRoZSBjb250ZW50cyBvZiB0aGVcbiAgICAgICAgICAvLyB3b3VsZC1iZSBjbGFzcyB0byByZS10cmFuc2xhdGUgYW55IGNoYXJhY3RlcnMgdGhhdFxuICAgICAgICAgIC8vIHdlcmUgcGFzc2VkIHRocm91Z2ggYXMtaXNcbiAgICAgICAgICAvLyBUT0RPOiBJdCB3b3VsZCBwcm9iYWJseSBiZSBmYXN0ZXIgdG8gZGV0ZXJtaW5lIHRoaXNcbiAgICAgICAgICAvLyB3aXRob3V0IGEgdHJ5L2NhdGNoIGFuZCBhIG5ldyBSZWdFeHAsIGJ1dCBpdCdzIHRyaWNreVxuICAgICAgICAgIC8vIHRvIGRvIHNhZmVseS4gIEZvciBub3csIHRoaXMgaXMgc2FmZSBhbmQgd29ya3MuXG4gICAgICAgICAgdmFyIGNzID0gcGF0dGVybi5zdWJzdHJpbmcoY2xhc3NTdGFydCArIDEsIGkpXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFJlZ0V4cCgnWycgKyBjcyArICddJylcbiAgICAgICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICAgICAgLy8gbm90IGEgdmFsaWQgY2xhc3MhXG4gICAgICAgICAgICB2YXIgc3AgPSB0aGlzLnBhcnNlKGNzLCBTVUJQQVJTRSlcbiAgICAgICAgICAgIHJlID0gcmUuc3Vic3RyKDAsIHJlQ2xhc3NTdGFydCkgKyAnXFxcXFsnICsgc3BbMF0gKyAnXFxcXF0nXG4gICAgICAgICAgICBoYXNNYWdpYyA9IGhhc01hZ2ljIHx8IHNwWzFdXG4gICAgICAgICAgICBpbkNsYXNzID0gZmFsc2VcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluaXNoIHVwIHRoZSBjbGFzcy5cbiAgICAgICAgaGFzTWFnaWMgPSB0cnVlXG4gICAgICAgIGluQ2xhc3MgPSBmYWxzZVxuICAgICAgICByZSArPSBjXG4gICAgICBjb250aW51ZVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBzd2FsbG93IGFueSBzdGF0ZSBjaGFyIHRoYXQgd2Fzbid0IGNvbnN1bWVkXG4gICAgICAgIGNsZWFyU3RhdGVDaGFyKClcblxuICAgICAgICBpZiAoZXNjYXBpbmcpIHtcbiAgICAgICAgICAvLyBubyBuZWVkXG4gICAgICAgICAgZXNjYXBpbmcgPSBmYWxzZVxuICAgICAgICB9IGVsc2UgaWYgKHJlU3BlY2lhbHNbY11cbiAgICAgICAgICAmJiAhKGMgPT09ICdeJyAmJiBpbkNsYXNzKSkge1xuICAgICAgICAgIHJlICs9ICdcXFxcJ1xuICAgICAgICB9XG5cbiAgICAgICAgcmUgKz0gY1xuXG4gICAgfSAvLyBzd2l0Y2hcbiAgfSAvLyBmb3JcblxuICAvLyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgbGVmdCBhIGNsYXNzIG9wZW4uXG4gIC8vIFwiW2FiY1wiIGlzIHZhbGlkLCBlcXVpdmFsZW50IHRvIFwiXFxbYWJjXCJcbiAgaWYgKGluQ2xhc3MpIHtcbiAgICAvLyBzcGxpdCB3aGVyZSB0aGUgbGFzdCBbIHdhcywgYW5kIGVzY2FwZSBpdFxuICAgIC8vIHRoaXMgaXMgYSBodWdlIHBpdGEuICBXZSBub3cgaGF2ZSB0byByZS13YWxrXG4gICAgLy8gdGhlIGNvbnRlbnRzIG9mIHRoZSB3b3VsZC1iZSBjbGFzcyB0byByZS10cmFuc2xhdGVcbiAgICAvLyBhbnkgY2hhcmFjdGVycyB0aGF0IHdlcmUgcGFzc2VkIHRocm91Z2ggYXMtaXNcbiAgICBjcyA9IHBhdHRlcm4uc3Vic3RyKGNsYXNzU3RhcnQgKyAxKVxuICAgIHNwID0gdGhpcy5wYXJzZShjcywgU1VCUEFSU0UpXG4gICAgcmUgPSByZS5zdWJzdHIoMCwgcmVDbGFzc1N0YXJ0KSArICdcXFxcWycgKyBzcFswXVxuICAgIGhhc01hZ2ljID0gaGFzTWFnaWMgfHwgc3BbMV1cbiAgfVxuXG4gIC8vIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBoYWQgYSArKCB0aGluZyBhdCB0aGUgKmVuZCpcbiAgLy8gb2YgdGhlIHBhdHRlcm4uXG4gIC8vIGVhY2ggcGF0dGVybiBsaXN0IHN0YWNrIGFkZHMgMyBjaGFycywgYW5kIHdlIG5lZWQgdG8gZ28gdGhyb3VnaFxuICAvLyBhbmQgZXNjYXBlIGFueSB8IGNoYXJzIHRoYXQgd2VyZSBwYXNzZWQgdGhyb3VnaCBhcy1pcyBmb3IgdGhlIHJlZ2V4cC5cbiAgLy8gR28gdGhyb3VnaCBhbmQgZXNjYXBlIHRoZW0sIHRha2luZyBjYXJlIG5vdCB0byBkb3VibGUtZXNjYXBlIGFueVxuICAvLyB8IGNoYXJzIHRoYXQgd2VyZSBhbHJlYWR5IGVzY2FwZWQuXG4gIGZvciAocGwgPSBwYXR0ZXJuTGlzdFN0YWNrLnBvcCgpOyBwbDsgcGwgPSBwYXR0ZXJuTGlzdFN0YWNrLnBvcCgpKSB7XG4gICAgdmFyIHRhaWwgPSByZS5zbGljZShwbC5yZVN0YXJ0ICsgcGwub3Blbi5sZW5ndGgpXG4gICAgdGhpcy5kZWJ1Zygnc2V0dGluZyB0YWlsJywgcmUsIHBsKVxuICAgIC8vIG1heWJlIHNvbWUgZXZlbiBudW1iZXIgb2YgXFwsIHRoZW4gbWF5YmUgMSBcXCwgZm9sbG93ZWQgYnkgYSB8XG4gICAgdGFpbCA9IHRhaWwucmVwbGFjZSgvKCg/OlxcXFx7Mn0pezAsNjR9KShcXFxcPylcXHwvZywgZnVuY3Rpb24gKF8sICQxLCAkMikge1xuICAgICAgaWYgKCEkMikge1xuICAgICAgICAvLyB0aGUgfCBpc24ndCBhbHJlYWR5IGVzY2FwZWQsIHNvIGVzY2FwZSBpdC5cbiAgICAgICAgJDIgPSAnXFxcXCdcbiAgICAgIH1cblxuICAgICAgLy8gbmVlZCB0byBlc2NhcGUgYWxsIHRob3NlIHNsYXNoZXMgKmFnYWluKiwgd2l0aG91dCBlc2NhcGluZyB0aGVcbiAgICAgIC8vIG9uZSB0aGF0IHdlIG5lZWQgZm9yIGVzY2FwaW5nIHRoZSB8IGNoYXJhY3Rlci4gIEFzIGl0IHdvcmtzIG91dCxcbiAgICAgIC8vIGVzY2FwaW5nIGFuIGV2ZW4gbnVtYmVyIG9mIHNsYXNoZXMgY2FuIGJlIGRvbmUgYnkgc2ltcGx5IHJlcGVhdGluZ1xuICAgICAgLy8gaXQgZXhhY3RseSBhZnRlciBpdHNlbGYuICBUaGF0J3Mgd2h5IHRoaXMgdHJpY2sgd29ya3MuXG4gICAgICAvL1xuICAgICAgLy8gSSBhbSBzb3JyeSB0aGF0IHlvdSBoYXZlIHRvIHNlZSB0aGlzLlxuICAgICAgcmV0dXJuICQxICsgJDEgKyAkMiArICd8J1xuICAgIH0pXG5cbiAgICB0aGlzLmRlYnVnKCd0YWlsPSVqXFxuICAgJXMnLCB0YWlsLCB0YWlsLCBwbCwgcmUpXG4gICAgdmFyIHQgPSBwbC50eXBlID09PSAnKicgPyBzdGFyXG4gICAgICA6IHBsLnR5cGUgPT09ICc/JyA/IHFtYXJrXG4gICAgICA6ICdcXFxcJyArIHBsLnR5cGVcblxuICAgIGhhc01hZ2ljID0gdHJ1ZVxuICAgIHJlID0gcmUuc2xpY2UoMCwgcGwucmVTdGFydCkgKyB0ICsgJ1xcXFwoJyArIHRhaWxcbiAgfVxuXG4gIC8vIGhhbmRsZSB0cmFpbGluZyB0aGluZ3MgdGhhdCBvbmx5IG1hdHRlciBhdCB0aGUgdmVyeSBlbmQuXG4gIGNsZWFyU3RhdGVDaGFyKClcbiAgaWYgKGVzY2FwaW5nKSB7XG4gICAgLy8gdHJhaWxpbmcgXFxcXFxuICAgIHJlICs9ICdcXFxcXFxcXCdcbiAgfVxuXG4gIC8vIG9ubHkgbmVlZCB0byBhcHBseSB0aGUgbm9kb3Qgc3RhcnQgaWYgdGhlIHJlIHN0YXJ0cyB3aXRoXG4gIC8vIHNvbWV0aGluZyB0aGF0IGNvdWxkIGNvbmNlaXZhYmx5IGNhcHR1cmUgYSBkb3RcbiAgdmFyIGFkZFBhdHRlcm5TdGFydCA9IGZhbHNlXG4gIHN3aXRjaCAocmUuY2hhckF0KDApKSB7XG4gICAgY2FzZSAnLic6XG4gICAgY2FzZSAnWyc6XG4gICAgY2FzZSAnKCc6IGFkZFBhdHRlcm5TdGFydCA9IHRydWVcbiAgfVxuXG4gIC8vIEhhY2sgdG8gd29yayBhcm91bmQgbGFjayBvZiBuZWdhdGl2ZSBsb29rYmVoaW5kIGluIEpTXG4gIC8vIEEgcGF0dGVybiBsaWtlOiAqLiEoeCkuISh5fHopIG5lZWRzIHRvIGVuc3VyZSB0aGF0IGEgbmFtZVxuICAvLyBsaWtlICdhLnh5ei55eicgZG9lc24ndCBtYXRjaC4gIFNvLCB0aGUgZmlyc3QgbmVnYXRpdmVcbiAgLy8gbG9va2FoZWFkLCBoYXMgdG8gbG9vayBBTEwgdGhlIHdheSBhaGVhZCwgdG8gdGhlIGVuZCBvZlxuICAvLyB0aGUgcGF0dGVybi5cbiAgZm9yICh2YXIgbiA9IG5lZ2F0aXZlTGlzdHMubGVuZ3RoIC0gMTsgbiA+IC0xOyBuLS0pIHtcbiAgICB2YXIgbmwgPSBuZWdhdGl2ZUxpc3RzW25dXG5cbiAgICB2YXIgbmxCZWZvcmUgPSByZS5zbGljZSgwLCBubC5yZVN0YXJ0KVxuICAgIHZhciBubEZpcnN0ID0gcmUuc2xpY2UobmwucmVTdGFydCwgbmwucmVFbmQgLSA4KVxuICAgIHZhciBubExhc3QgPSByZS5zbGljZShubC5yZUVuZCAtIDgsIG5sLnJlRW5kKVxuICAgIHZhciBubEFmdGVyID0gcmUuc2xpY2UobmwucmVFbmQpXG5cbiAgICBubExhc3QgKz0gbmxBZnRlclxuXG4gICAgLy8gSGFuZGxlIG5lc3RlZCBzdHVmZiBsaWtlICooKi5qc3whKCouanNvbikpLCB3aGVyZSBvcGVuIHBhcmVuc1xuICAgIC8vIG1lYW4gdGhhdCB3ZSBzaG91bGQgKm5vdCogaW5jbHVkZSB0aGUgKSBpbiB0aGUgYml0IHRoYXQgaXMgY29uc2lkZXJlZFxuICAgIC8vIFwiYWZ0ZXJcIiB0aGUgbmVnYXRlZCBzZWN0aW9uLlxuICAgIHZhciBvcGVuUGFyZW5zQmVmb3JlID0gbmxCZWZvcmUuc3BsaXQoJygnKS5sZW5ndGggLSAxXG4gICAgdmFyIGNsZWFuQWZ0ZXIgPSBubEFmdGVyXG4gICAgZm9yIChpID0gMDsgaSA8IG9wZW5QYXJlbnNCZWZvcmU7IGkrKykge1xuICAgICAgY2xlYW5BZnRlciA9IGNsZWFuQWZ0ZXIucmVwbGFjZSgvXFwpWysqP10/LywgJycpXG4gICAgfVxuICAgIG5sQWZ0ZXIgPSBjbGVhbkFmdGVyXG5cbiAgICB2YXIgZG9sbGFyID0gJydcbiAgICBpZiAobmxBZnRlciA9PT0gJycgJiYgaXNTdWIgIT09IFNVQlBBUlNFKSB7XG4gICAgICBkb2xsYXIgPSAnJCdcbiAgICB9XG4gICAgdmFyIG5ld1JlID0gbmxCZWZvcmUgKyBubEZpcnN0ICsgbmxBZnRlciArIGRvbGxhciArIG5sTGFzdFxuICAgIHJlID0gbmV3UmVcbiAgfVxuXG4gIC8vIGlmIHRoZSByZSBpcyBub3QgXCJcIiBhdCB0aGlzIHBvaW50LCB0aGVuIHdlIG5lZWQgdG8gbWFrZSBzdXJlXG4gIC8vIGl0IGRvZXNuJ3QgbWF0Y2ggYWdhaW5zdCBhbiBlbXB0eSBwYXRoIHBhcnQuXG4gIC8vIE90aGVyd2lzZSBhLyogd2lsbCBtYXRjaCBhLywgd2hpY2ggaXQgc2hvdWxkIG5vdC5cbiAgaWYgKHJlICE9PSAnJyAmJiBoYXNNYWdpYykge1xuICAgIHJlID0gJyg/PS4pJyArIHJlXG4gIH1cblxuICBpZiAoYWRkUGF0dGVyblN0YXJ0KSB7XG4gICAgcmUgPSBwYXR0ZXJuU3RhcnQgKyByZVxuICB9XG5cbiAgLy8gcGFyc2luZyBqdXN0IGEgcGllY2Ugb2YgYSBsYXJnZXIgcGF0dGVybi5cbiAgaWYgKGlzU3ViID09PSBTVUJQQVJTRSkge1xuICAgIHJldHVybiBbcmUsIGhhc01hZ2ljXVxuICB9XG5cbiAgLy8gc2tpcCB0aGUgcmVnZXhwIGZvciBub24tbWFnaWNhbCBwYXR0ZXJuc1xuICAvLyB1bmVzY2FwZSBhbnl0aGluZyBpbiBpdCwgdGhvdWdoLCBzbyB0aGF0IGl0J2xsIGJlXG4gIC8vIGFuIGV4YWN0IG1hdGNoIGFnYWluc3QgYSBmaWxlIGV0Yy5cbiAgaWYgKCFoYXNNYWdpYykge1xuICAgIHJldHVybiBnbG9iVW5lc2NhcGUocGF0dGVybilcbiAgfVxuXG4gIHZhciBmbGFncyA9IG9wdGlvbnMubm9jYXNlID8gJ2knIDogJydcbiAgdHJ5IHtcbiAgICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyByZSArICckJywgZmxhZ3MpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgLy8gSWYgaXQgd2FzIGFuIGludmFsaWQgcmVndWxhciBleHByZXNzaW9uLCB0aGVuIGl0IGNhbid0IG1hdGNoXG4gICAgLy8gYW55dGhpbmcuICBUaGlzIHRyaWNrIGxvb2tzIGZvciBhIGNoYXJhY3RlciBhZnRlciB0aGUgZW5kIG9mXG4gICAgLy8gdGhlIHN0cmluZywgd2hpY2ggaXMgb2YgY291cnNlIGltcG9zc2libGUsIGV4Y2VwdCBpbiBtdWx0aS1saW5lXG4gICAgLy8gbW9kZSwgYnV0IGl0J3Mgbm90IGEgL20gcmVnZXguXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyQuJylcbiAgfVxuXG4gIHJlZ0V4cC5fZ2xvYiA9IHBhdHRlcm5cbiAgcmVnRXhwLl9zcmMgPSByZVxuXG4gIHJldHVybiByZWdFeHBcbn1cblxubWluaW1hdGNoLm1ha2VSZSA9IGZ1bmN0aW9uIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgTWluaW1hdGNoKHBhdHRlcm4sIG9wdGlvbnMgfHwge30pLm1ha2VSZSgpXG59XG5cbk1pbmltYXRjaC5wcm90b3R5cGUubWFrZVJlID0gbWFrZVJlXG5mdW5jdGlvbiBtYWtlUmUgKCkge1xuICBpZiAodGhpcy5yZWdleHAgfHwgdGhpcy5yZWdleHAgPT09IGZhbHNlKSByZXR1cm4gdGhpcy5yZWdleHBcblxuICAvLyBhdCB0aGlzIHBvaW50LCB0aGlzLnNldCBpcyBhIDJkIGFycmF5IG9mIHBhcnRpYWxcbiAgLy8gcGF0dGVybiBzdHJpbmdzLCBvciBcIioqXCIuXG4gIC8vXG4gIC8vIEl0J3MgYmV0dGVyIHRvIHVzZSAubWF0Y2goKS4gIFRoaXMgZnVuY3Rpb24gc2hvdWxkbid0XG4gIC8vIGJlIHVzZWQsIHJlYWxseSwgYnV0IGl0J3MgcHJldHR5IGNvbnZlbmllbnQgc29tZXRpbWVzLFxuICAvLyB3aGVuIHlvdSBqdXN0IHdhbnQgdG8gd29yayB3aXRoIGEgcmVnZXguXG4gIHZhciBzZXQgPSB0aGlzLnNldFxuXG4gIGlmICghc2V0Lmxlbmd0aCkge1xuICAgIHRoaXMucmVnZXhwID0gZmFsc2VcbiAgICByZXR1cm4gdGhpcy5yZWdleHBcbiAgfVxuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuXG4gIHZhciB0d29TdGFyID0gb3B0aW9ucy5ub2dsb2JzdGFyID8gc3RhclxuICAgIDogb3B0aW9ucy5kb3QgPyB0d29TdGFyRG90XG4gICAgOiB0d29TdGFyTm9Eb3RcbiAgdmFyIGZsYWdzID0gb3B0aW9ucy5ub2Nhc2UgPyAnaScgOiAnJ1xuXG4gIHZhciByZSA9IHNldC5tYXAoZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gcGF0dGVybi5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiAocCA9PT0gR0xPQlNUQVIpID8gdHdvU3RhclxuICAgICAgOiAodHlwZW9mIHAgPT09ICdzdHJpbmcnKSA/IHJlZ0V4cEVzY2FwZShwKVxuICAgICAgOiBwLl9zcmNcbiAgICB9KS5qb2luKCdcXFxcXFwvJylcbiAgfSkuam9pbignfCcpXG5cbiAgLy8gbXVzdCBtYXRjaCBlbnRpcmUgcGF0dGVyblxuICAvLyBlbmRpbmcgaW4gYSAqIG9yICoqIHdpbGwgbWFrZSBpdCBsZXNzIHN0cmljdC5cbiAgcmUgPSAnXig/OicgKyByZSArICcpJCdcblxuICAvLyBjYW4gbWF0Y2ggYW55dGhpbmcsIGFzIGxvbmcgYXMgaXQncyBub3QgdGhpcy5cbiAgaWYgKHRoaXMubmVnYXRlKSByZSA9ICdeKD8hJyArIHJlICsgJykuKiQnXG5cbiAgdHJ5IHtcbiAgICB0aGlzLnJlZ2V4cCA9IG5ldyBSZWdFeHAocmUsIGZsYWdzKVxuICB9IGNhdGNoIChleCkge1xuICAgIHRoaXMucmVnZXhwID0gZmFsc2VcbiAgfVxuICByZXR1cm4gdGhpcy5yZWdleHBcbn1cblxubWluaW1hdGNoLm1hdGNoID0gZnVuY3Rpb24gKGxpc3QsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIG1tID0gbmV3IE1pbmltYXRjaChwYXR0ZXJuLCBvcHRpb25zKVxuICBsaXN0ID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gbW0ubWF0Y2goZilcbiAgfSlcbiAgaWYgKG1tLm9wdGlvbnMubm9udWxsICYmICFsaXN0Lmxlbmd0aCkge1xuICAgIGxpc3QucHVzaChwYXR0ZXJuKVxuICB9XG4gIHJldHVybiBsaXN0XG59XG5cbk1pbmltYXRjaC5wcm90b3R5cGUubWF0Y2ggPSBtYXRjaFxuZnVuY3Rpb24gbWF0Y2ggKGYsIHBhcnRpYWwpIHtcbiAgdGhpcy5kZWJ1ZygnbWF0Y2gnLCBmLCB0aGlzLnBhdHRlcm4pXG4gIC8vIHNob3J0LWNpcmN1aXQgaW4gdGhlIGNhc2Ugb2YgYnVzdGVkIHRoaW5ncy5cbiAgLy8gY29tbWVudHMsIGV0Yy5cbiAgaWYgKHRoaXMuY29tbWVudCkgcmV0dXJuIGZhbHNlXG4gIGlmICh0aGlzLmVtcHR5KSByZXR1cm4gZiA9PT0gJydcblxuICBpZiAoZiA9PT0gJy8nICYmIHBhcnRpYWwpIHJldHVybiB0cnVlXG5cbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcblxuICAvLyB3aW5kb3dzOiBuZWVkIHRvIHVzZSAvLCBub3QgXFxcbiAgaWYgKHBhdGguc2VwICE9PSAnLycpIHtcbiAgICBmID0gZi5zcGxpdChwYXRoLnNlcCkuam9pbignLycpXG4gIH1cblxuICAvLyB0cmVhdCB0aGUgdGVzdCBwYXRoIGFzIGEgc2V0IG9mIHBhdGhwYXJ0cy5cbiAgZiA9IGYuc3BsaXQoc2xhc2hTcGxpdClcbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sICdzcGxpdCcsIGYpXG5cbiAgLy8ganVzdCBPTkUgb2YgdGhlIHBhdHRlcm4gc2V0cyBpbiB0aGlzLnNldCBuZWVkcyB0byBtYXRjaFxuICAvLyBpbiBvcmRlciBmb3IgaXQgdG8gYmUgdmFsaWQuICBJZiBuZWdhdGluZywgdGhlbiBqdXN0IG9uZVxuICAvLyBtYXRjaCBtZWFucyB0aGF0IHdlIGhhdmUgZmFpbGVkLlxuICAvLyBFaXRoZXIgd2F5LCByZXR1cm4gb24gdGhlIGZpcnN0IGhpdC5cblxuICB2YXIgc2V0ID0gdGhpcy5zZXRcbiAgdGhpcy5kZWJ1Zyh0aGlzLnBhdHRlcm4sICdzZXQnLCBzZXQpXG5cbiAgLy8gRmluZCB0aGUgYmFzZW5hbWUgb2YgdGhlIHBhdGggYnkgbG9va2luZyBmb3IgdGhlIGxhc3Qgbm9uLWVtcHR5IHNlZ21lbnRcbiAgdmFyIGZpbGVuYW1lXG4gIHZhciBpXG4gIGZvciAoaSA9IGYubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBmaWxlbmFtZSA9IGZbaV1cbiAgICBpZiAoZmlsZW5hbWUpIGJyZWFrXG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBhdHRlcm4gPSBzZXRbaV1cbiAgICB2YXIgZmlsZSA9IGZcbiAgICBpZiAob3B0aW9ucy5tYXRjaEJhc2UgJiYgcGF0dGVybi5sZW5ndGggPT09IDEpIHtcbiAgICAgIGZpbGUgPSBbZmlsZW5hbWVdXG4gICAgfVxuICAgIHZhciBoaXQgPSB0aGlzLm1hdGNoT25lKGZpbGUsIHBhdHRlcm4sIHBhcnRpYWwpXG4gICAgaWYgKGhpdCkge1xuICAgICAgaWYgKG9wdGlvbnMuZmxpcE5lZ2F0ZSkgcmV0dXJuIHRydWVcbiAgICAgIHJldHVybiAhdGhpcy5uZWdhdGVcbiAgICB9XG4gIH1cblxuICAvLyBkaWRuJ3QgZ2V0IGFueSBoaXRzLiAgdGhpcyBpcyBzdWNjZXNzIGlmIGl0J3MgYSBuZWdhdGl2ZVxuICAvLyBwYXR0ZXJuLCBmYWlsdXJlIG90aGVyd2lzZS5cbiAgaWYgKG9wdGlvbnMuZmxpcE5lZ2F0ZSkgcmV0dXJuIGZhbHNlXG4gIHJldHVybiB0aGlzLm5lZ2F0ZVxufVxuXG4vLyBzZXQgcGFydGlhbCB0byB0cnVlIHRvIHRlc3QgaWYsIGZvciBleGFtcGxlLFxuLy8gXCIvYS9iXCIgbWF0Y2hlcyB0aGUgc3RhcnQgb2YgXCIvKi9iLyovZFwiXG4vLyBQYXJ0aWFsIG1lYW5zLCBpZiB5b3UgcnVuIG91dCBvZiBmaWxlIGJlZm9yZSB5b3UgcnVuXG4vLyBvdXQgb2YgcGF0dGVybiwgdGhlbiB0aGF0J3MgZmluZSwgYXMgbG9uZyBhcyBhbGxcbi8vIHRoZSBwYXJ0cyBtYXRjaC5cbk1pbmltYXRjaC5wcm90b3R5cGUubWF0Y2hPbmUgPSBmdW5jdGlvbiAoZmlsZSwgcGF0dGVybiwgcGFydGlhbCkge1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uc1xuXG4gIHRoaXMuZGVidWcoJ21hdGNoT25lJyxcbiAgICB7ICd0aGlzJzogdGhpcywgZmlsZTogZmlsZSwgcGF0dGVybjogcGF0dGVybiB9KVxuXG4gIHRoaXMuZGVidWcoJ21hdGNoT25lJywgZmlsZS5sZW5ndGgsIHBhdHRlcm4ubGVuZ3RoKVxuXG4gIGZvciAodmFyIGZpID0gMCxcbiAgICAgIHBpID0gMCxcbiAgICAgIGZsID0gZmlsZS5sZW5ndGgsXG4gICAgICBwbCA9IHBhdHRlcm4ubGVuZ3RoXG4gICAgICA7IChmaSA8IGZsKSAmJiAocGkgPCBwbClcbiAgICAgIDsgZmkrKywgcGkrKykge1xuICAgIHRoaXMuZGVidWcoJ21hdGNoT25lIGxvb3AnKVxuICAgIHZhciBwID0gcGF0dGVybltwaV1cbiAgICB2YXIgZiA9IGZpbGVbZmldXG5cbiAgICB0aGlzLmRlYnVnKHBhdHRlcm4sIHAsIGYpXG5cbiAgICAvLyBzaG91bGQgYmUgaW1wb3NzaWJsZS5cbiAgICAvLyBzb21lIGludmFsaWQgcmVnZXhwIHN0dWZmIGluIHRoZSBzZXQuXG4gICAgaWYgKHAgPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcblxuICAgIGlmIChwID09PSBHTE9CU1RBUikge1xuICAgICAgdGhpcy5kZWJ1ZygnR0xPQlNUQVInLCBbcGF0dGVybiwgcCwgZl0pXG5cbiAgICAgIC8vIFwiKipcIlxuICAgICAgLy8gYS8qKi9iLyoqL2Mgd291bGQgbWF0Y2ggdGhlIGZvbGxvd2luZzpcbiAgICAgIC8vIGEvYi94L3kvei9jXG4gICAgICAvLyBhL3gveS96L2IvY1xuICAgICAgLy8gYS9iL3gvYi94L2NcbiAgICAgIC8vIGEvYi9jXG4gICAgICAvLyBUbyBkbyB0aGlzLCB0YWtlIHRoZSByZXN0IG9mIHRoZSBwYXR0ZXJuIGFmdGVyXG4gICAgICAvLyB0aGUgKiosIGFuZCBzZWUgaWYgaXQgd291bGQgbWF0Y2ggdGhlIGZpbGUgcmVtYWluZGVyLlxuICAgICAgLy8gSWYgc28sIHJldHVybiBzdWNjZXNzLlxuICAgICAgLy8gSWYgbm90LCB0aGUgKiogXCJzd2FsbG93c1wiIGEgc2VnbWVudCwgYW5kIHRyeSBhZ2Fpbi5cbiAgICAgIC8vIFRoaXMgaXMgcmVjdXJzaXZlbHkgYXdmdWwuXG4gICAgICAvL1xuICAgICAgLy8gYS8qKi9iLyoqL2MgbWF0Y2hpbmcgYS9iL3gveS96L2NcbiAgICAgIC8vIC0gYSBtYXRjaGVzIGFcbiAgICAgIC8vIC0gZG91Ymxlc3RhclxuICAgICAgLy8gICAtIG1hdGNoT25lKGIveC95L3ovYywgYi8qKi9jKVxuICAgICAgLy8gICAgIC0gYiBtYXRjaGVzIGJcbiAgICAgIC8vICAgICAtIGRvdWJsZXN0YXJcbiAgICAgIC8vICAgICAgIC0gbWF0Y2hPbmUoeC95L3ovYywgYykgLT4gbm9cbiAgICAgIC8vICAgICAgIC0gbWF0Y2hPbmUoeS96L2MsIGMpIC0+IG5vXG4gICAgICAvLyAgICAgICAtIG1hdGNoT25lKHovYywgYykgLT4gbm9cbiAgICAgIC8vICAgICAgIC0gbWF0Y2hPbmUoYywgYykgeWVzLCBoaXRcbiAgICAgIHZhciBmciA9IGZpXG4gICAgICB2YXIgcHIgPSBwaSArIDFcbiAgICAgIGlmIChwciA9PT0gcGwpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnKiogYXQgdGhlIGVuZCcpXG4gICAgICAgIC8vIGEgKiogYXQgdGhlIGVuZCB3aWxsIGp1c3Qgc3dhbGxvdyB0aGUgcmVzdC5cbiAgICAgICAgLy8gV2UgaGF2ZSBmb3VuZCBhIG1hdGNoLlxuICAgICAgICAvLyBob3dldmVyLCBpdCB3aWxsIG5vdCBzd2FsbG93IC8ueCwgdW5sZXNzXG4gICAgICAgIC8vIG9wdGlvbnMuZG90IGlzIHNldC5cbiAgICAgICAgLy8gLiBhbmQgLi4gYXJlICpuZXZlciogbWF0Y2hlZCBieSAqKiwgZm9yIGV4cGxvc2l2ZWx5XG4gICAgICAgIC8vIGV4cG9uZW50aWFsIHJlYXNvbnMuXG4gICAgICAgIGZvciAoOyBmaSA8IGZsOyBmaSsrKSB7XG4gICAgICAgICAgaWYgKGZpbGVbZmldID09PSAnLicgfHwgZmlsZVtmaV0gPT09ICcuLicgfHxcbiAgICAgICAgICAgICghb3B0aW9ucy5kb3QgJiYgZmlsZVtmaV0uY2hhckF0KDApID09PSAnLicpKSByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICAvLyBvaywgbGV0J3Mgc2VlIGlmIHdlIGNhbiBzd2FsbG93IHdoYXRldmVyIHdlIGNhbi5cbiAgICAgIHdoaWxlIChmciA8IGZsKSB7XG4gICAgICAgIHZhciBzd2FsbG93ZWUgPSBmaWxlW2ZyXVxuXG4gICAgICAgIHRoaXMuZGVidWcoJ1xcbmdsb2JzdGFyIHdoaWxlJywgZmlsZSwgZnIsIHBhdHRlcm4sIHByLCBzd2FsbG93ZWUpXG5cbiAgICAgICAgLy8gWFhYIHJlbW92ZSB0aGlzIHNsaWNlLiAgSnVzdCBwYXNzIHRoZSBzdGFydCBpbmRleC5cbiAgICAgICAgaWYgKHRoaXMubWF0Y2hPbmUoZmlsZS5zbGljZShmciksIHBhdHRlcm4uc2xpY2UocHIpLCBwYXJ0aWFsKSkge1xuICAgICAgICAgIHRoaXMuZGVidWcoJ2dsb2JzdGFyIGZvdW5kIG1hdGNoIScsIGZyLCBmbCwgc3dhbGxvd2VlKVxuICAgICAgICAgIC8vIGZvdW5kIGEgbWF0Y2guXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjYW4ndCBzd2FsbG93IFwiLlwiIG9yIFwiLi5cIiBldmVyLlxuICAgICAgICAgIC8vIGNhbiBvbmx5IHN3YWxsb3cgXCIuZm9vXCIgd2hlbiBleHBsaWNpdGx5IGFza2VkLlxuICAgICAgICAgIGlmIChzd2FsbG93ZWUgPT09ICcuJyB8fCBzd2FsbG93ZWUgPT09ICcuLicgfHxcbiAgICAgICAgICAgICghb3B0aW9ucy5kb3QgJiYgc3dhbGxvd2VlLmNoYXJBdCgwKSA9PT0gJy4nKSkge1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZygnZG90IGRldGVjdGVkIScsIGZpbGUsIGZyLCBwYXR0ZXJuLCBwcilcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gKiogc3dhbGxvd3MgYSBzZWdtZW50LCBhbmQgY29udGludWUuXG4gICAgICAgICAgdGhpcy5kZWJ1ZygnZ2xvYnN0YXIgc3dhbGxvdyBhIHNlZ21lbnQsIGFuZCBjb250aW51ZScpXG4gICAgICAgICAgZnIrK1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG5vIG1hdGNoIHdhcyBmb3VuZC5cbiAgICAgIC8vIEhvd2V2ZXIsIGluIHBhcnRpYWwgbW9kZSwgd2UgY2FuJ3Qgc2F5IHRoaXMgaXMgbmVjZXNzYXJpbHkgb3Zlci5cbiAgICAgIC8vIElmIHRoZXJlJ3MgbW9yZSAqcGF0dGVybiogbGVmdCwgdGhlblxuICAgICAgaWYgKHBhcnRpYWwpIHtcbiAgICAgICAgLy8gcmFuIG91dCBvZiBmaWxlXG4gICAgICAgIHRoaXMuZGVidWcoJ1xcbj4+PiBubyBtYXRjaCwgcGFydGlhbD8nLCBmaWxlLCBmciwgcGF0dGVybiwgcHIpXG4gICAgICAgIGlmIChmciA9PT0gZmwpIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBzb21ldGhpbmcgb3RoZXIgdGhhbiAqKlxuICAgIC8vIG5vbi1tYWdpYyBwYXR0ZXJucyBqdXN0IGhhdmUgdG8gbWF0Y2ggZXhhY3RseVxuICAgIC8vIHBhdHRlcm5zIHdpdGggbWFnaWMgaGF2ZSBiZWVuIHR1cm5lZCBpbnRvIHJlZ2V4cHMuXG4gICAgdmFyIGhpdFxuICAgIGlmICh0eXBlb2YgcCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChvcHRpb25zLm5vY2FzZSkge1xuICAgICAgICBoaXQgPSBmLnRvTG93ZXJDYXNlKCkgPT09IHAudG9Mb3dlckNhc2UoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGl0ID0gZiA9PT0gcFxuICAgICAgfVxuICAgICAgdGhpcy5kZWJ1Zygnc3RyaW5nIG1hdGNoJywgcCwgZiwgaGl0KVxuICAgIH0gZWxzZSB7XG4gICAgICBoaXQgPSBmLm1hdGNoKHApXG4gICAgICB0aGlzLmRlYnVnKCdwYXR0ZXJuIG1hdGNoJywgcCwgZiwgaGl0KVxuICAgIH1cblxuICAgIGlmICghaGl0KSByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIE5vdGU6IGVuZGluZyBpbiAvIG1lYW5zIHRoYXQgd2UnbGwgZ2V0IGEgZmluYWwgXCJcIlxuICAvLyBhdCB0aGUgZW5kIG9mIHRoZSBwYXR0ZXJuLiAgVGhpcyBjYW4gb25seSBtYXRjaCBhXG4gIC8vIGNvcnJlc3BvbmRpbmcgXCJcIiBhdCB0aGUgZW5kIG9mIHRoZSBmaWxlLlxuICAvLyBJZiB0aGUgZmlsZSBlbmRzIGluIC8sIHRoZW4gaXQgY2FuIG9ubHkgbWF0Y2ggYVxuICAvLyBhIHBhdHRlcm4gdGhhdCBlbmRzIGluIC8sIHVubGVzcyB0aGUgcGF0dGVybiBqdXN0XG4gIC8vIGRvZXNuJ3QgaGF2ZSBhbnkgbW9yZSBmb3IgaXQuIEJ1dCwgYS9iLyBzaG91bGQgKm5vdCpcbiAgLy8gbWF0Y2ggXCJhL2IvKlwiLCBldmVuIHRob3VnaCBcIlwiIG1hdGNoZXMgYWdhaW5zdCB0aGVcbiAgLy8gW14vXSo/IHBhdHRlcm4sIGV4Y2VwdCBpbiBwYXJ0aWFsIG1vZGUsIHdoZXJlIGl0IG1pZ2h0XG4gIC8vIHNpbXBseSBub3QgYmUgcmVhY2hlZCB5ZXQuXG4gIC8vIEhvd2V2ZXIsIGEvYi8gc2hvdWxkIHN0aWxsIHNhdGlzZnkgYS8qXG5cbiAgLy8gbm93IGVpdGhlciB3ZSBmZWxsIG9mZiB0aGUgZW5kIG9mIHRoZSBwYXR0ZXJuLCBvciB3ZSdyZSBkb25lLlxuICBpZiAoZmkgPT09IGZsICYmIHBpID09PSBwbCkge1xuICAgIC8vIHJhbiBvdXQgb2YgcGF0dGVybiBhbmQgZmlsZW5hbWUgYXQgdGhlIHNhbWUgdGltZS5cbiAgICAvLyBhbiBleGFjdCBoaXQhXG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIGlmIChmaSA9PT0gZmwpIHtcbiAgICAvLyByYW4gb3V0IG9mIGZpbGUsIGJ1dCBzdGlsbCBoYWQgcGF0dGVybiBsZWZ0LlxuICAgIC8vIHRoaXMgaXMgb2sgaWYgd2UncmUgZG9pbmcgdGhlIG1hdGNoIGFzIHBhcnQgb2ZcbiAgICAvLyBhIGdsb2IgZnMgdHJhdmVyc2FsLlxuICAgIHJldHVybiBwYXJ0aWFsXG4gIH0gZWxzZSBpZiAocGkgPT09IHBsKSB7XG4gICAgLy8gcmFuIG91dCBvZiBwYXR0ZXJuLCBzdGlsbCBoYXZlIGZpbGUgbGVmdC5cbiAgICAvLyB0aGlzIGlzIG9ubHkgYWNjZXB0YWJsZSBpZiB3ZSdyZSBvbiB0aGUgdmVyeSBsYXN0XG4gICAgLy8gZW1wdHkgc2VnbWVudCBvZiBhIGZpbGUgd2l0aCBhIHRyYWlsaW5nIHNsYXNoLlxuICAgIC8vIGEvKiBzaG91bGQgbWF0Y2ggYS9iL1xuICAgIHZhciBlbXB0eUZpbGVFbmQgPSAoZmkgPT09IGZsIC0gMSkgJiYgKGZpbGVbZmldID09PSAnJylcbiAgICByZXR1cm4gZW1wdHlGaWxlRW5kXG4gIH1cblxuICAvLyBzaG91bGQgYmUgdW5yZWFjaGFibGUuXG4gIHRocm93IG5ldyBFcnJvcignd3RmPycpXG59XG5cbi8vIHJlcGxhY2Ugc3R1ZmYgbGlrZSBcXCogd2l0aCAqXG5mdW5jdGlvbiBnbG9iVW5lc2NhcGUgKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvXFxcXCguKS9nLCAnJDEnKVxufVxuXG5mdW5jdGlvbiByZWdFeHBFc2NhcGUgKHMpIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L21pbmltYXRjaC9taW5pbWF0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGltcG9ydGVkIGZyb20gbmNwICh0aGlzIGlzIHRlbXBvcmFyeSwgd2lsbCByZXdyaXRlKVxuXG52YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIHV0aW1lcyA9IHJlcXVpcmUoJy4uL3V0aWwvdXRpbWVzJylcblxuZnVuY3Rpb24gbmNwIChzb3VyY2UsIGRlc3QsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICghY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIHZhciBiYXNlUGF0aCA9IHByb2Nlc3MuY3dkKClcbiAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCBzb3VyY2UpXG4gIHZhciB0YXJnZXRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCBkZXN0KVxuXG4gIHZhciBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlclxuICB2YXIgdHJhbnNmb3JtID0gb3B0aW9ucy50cmFuc2Zvcm1cbiAgdmFyIGNsb2JiZXIgPSBvcHRpb25zLmNsb2JiZXIgIT09IGZhbHNlXG4gIHZhciBkZXJlZmVyZW5jZSA9IG9wdGlvbnMuZGVyZWZlcmVuY2VcbiAgdmFyIHByZXNlcnZlVGltZXN0YW1wcyA9IG9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzID09PSB0cnVlXG5cbiAgdmFyIGVycnMgPSBudWxsXG5cbiAgdmFyIHN0YXJ0ZWQgPSAwXG4gIHZhciBmaW5pc2hlZCA9IDBcbiAgdmFyIHJ1bm5pbmcgPSAwXG4gIC8vIHRoaXMgaXMgcHJldHR5IHVzZWxlc3Mgbm93IHRoYXQgd2UncmUgdXNpbmcgZ3JhY2VmdWwtZnNcbiAgLy8gY29uc2lkZXIgcmVtb3ZpbmdcbiAgdmFyIGxpbWl0ID0gb3B0aW9ucy5saW1pdCB8fCA1MTJcblxuICBzdGFydENvcHkoY3VycmVudFBhdGgpXG5cbiAgZnVuY3Rpb24gc3RhcnRDb3B5IChzb3VyY2UpIHtcbiAgICBzdGFydGVkKytcbiAgICBpZiAoZmlsdGVyKSB7XG4gICAgICBpZiAoZmlsdGVyIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIGlmICghZmlsdGVyLnRlc3Qoc291cmNlKSkge1xuICAgICAgICAgIHJldHVybiBkb25lT25lKHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAoIWZpbHRlcihzb3VyY2UpKSB7XG4gICAgICAgICAgcmV0dXJuIGRvbmVPbmUodHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ2V0U3RhdHMoc291cmNlKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3RhdHMgKHNvdXJjZSkge1xuICAgIHZhciBzdGF0ID0gZGVyZWZlcmVuY2UgPyBmcy5zdGF0IDogZnMubHN0YXRcbiAgICBpZiAocnVubmluZyA+PSBsaW1pdCkge1xuICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGdldFN0YXRzKHNvdXJjZSlcbiAgICAgIH0pXG4gICAgfVxuICAgIHJ1bm5pbmcrK1xuICAgIHN0YXQoc291cmNlLCBmdW5jdGlvbiAoZXJyLCBzdGF0cykge1xuICAgICAgaWYgKGVycikgcmV0dXJuIG9uRXJyb3IoZXJyKVxuXG4gICAgICAvLyBXZSBuZWVkIHRvIGdldCB0aGUgbW9kZSBmcm9tIHRoZSBzdGF0cyBvYmplY3QgYW5kIHByZXNlcnZlIGl0LlxuICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgIG5hbWU6IHNvdXJjZSxcbiAgICAgICAgbW9kZTogc3RhdHMubW9kZSxcbiAgICAgICAgbXRpbWU6IHN0YXRzLm10aW1lLCAvLyBtb2RpZmllZCB0aW1lXG4gICAgICAgIGF0aW1lOiBzdGF0cy5hdGltZSwgLy8gYWNjZXNzIHRpbWVcbiAgICAgICAgc3RhdHM6IHN0YXRzIC8vIHRlbXBvcmFyeVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICByZXR1cm4gb25EaXIoaXRlbSlcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHMuaXNGaWxlKCkgfHwgc3RhdHMuaXNDaGFyYWN0ZXJEZXZpY2UoKSB8fCBzdGF0cy5pc0Jsb2NrRGV2aWNlKCkpIHtcbiAgICAgICAgcmV0dXJuIG9uRmlsZShpdGVtKVxuICAgICAgfSBlbHNlIGlmIChzdGF0cy5pc1N5bWJvbGljTGluaygpKSB7XG4gICAgICAgIC8vIFN5bWxpbmtzIGRvbid0IHJlYWxseSBuZWVkIHRvIGtub3cgYWJvdXQgdGhlIG1vZGUuXG4gICAgICAgIHJldHVybiBvbkxpbmsoc291cmNlKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBvbkZpbGUgKGZpbGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZmlsZS5uYW1lLnJlcGxhY2UoY3VycmVudFBhdGgsIHRhcmdldFBhdGgpXG4gICAgaXNXcml0YWJsZSh0YXJnZXQsIGZ1bmN0aW9uICh3cml0YWJsZSkge1xuICAgICAgaWYgKHdyaXRhYmxlKSB7XG4gICAgICAgIGNvcHlGaWxlKGZpbGUsIHRhcmdldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjbG9iYmVyKSB7XG4gICAgICAgICAgcm1GaWxlKHRhcmdldCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29weUZpbGUoZmlsZSwgdGFyZ2V0KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9uZU9uZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY29weUZpbGUgKGZpbGUsIHRhcmdldCkge1xuICAgIHZhciByZWFkU3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbShmaWxlLm5hbWUpXG4gICAgdmFyIHdyaXRlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0odGFyZ2V0LCB7IG1vZGU6IGZpbGUubW9kZSB9KVxuXG4gICAgcmVhZFN0cmVhbS5vbignZXJyb3InLCBvbkVycm9yKVxuICAgIHdyaXRlU3RyZWFtLm9uKCdlcnJvcicsIG9uRXJyb3IpXG5cbiAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICB0cmFuc2Zvcm0ocmVhZFN0cmVhbSwgd3JpdGVTdHJlYW0sIGZpbGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdyaXRlU3RyZWFtLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZWFkU3RyZWFtLnBpcGUod3JpdGVTdHJlYW0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHdyaXRlU3RyZWFtLm9uY2UoJ2ZpbmlzaCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZzLmNobW9kKHRhcmdldCwgZmlsZS5tb2RlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgICAgaWYgKHByZXNlcnZlVGltZXN0YW1wcykge1xuICAgICAgICAgIHV0aW1lcy51dGltZXNNaWxsaXModGFyZ2V0LCBmaWxlLmF0aW1lLCBmaWxlLm10aW1lLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICAgICAgICByZXR1cm4gZG9uZU9uZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb25lT25lKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcm1GaWxlIChmaWxlLCBkb25lKSB7XG4gICAgZnMudW5saW5rKGZpbGUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgIHJldHVybiBkb25lKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gb25EaXIgKGRpcikge1xuICAgIHZhciB0YXJnZXQgPSBkaXIubmFtZS5yZXBsYWNlKGN1cnJlbnRQYXRoLCB0YXJnZXRQYXRoKVxuICAgIGlzV3JpdGFibGUodGFyZ2V0LCBmdW5jdGlvbiAod3JpdGFibGUpIHtcbiAgICAgIGlmICh3cml0YWJsZSkge1xuICAgICAgICByZXR1cm4gbWtEaXIoZGlyLCB0YXJnZXQpXG4gICAgICB9XG4gICAgICBjb3B5RGlyKGRpci5uYW1lKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBta0RpciAoZGlyLCB0YXJnZXQpIHtcbiAgICBmcy5ta2Rpcih0YXJnZXQsIGRpci5tb2RlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICAvLyBkZXNwaXRlIHNldHRpbmcgbW9kZSBpbiBmcy5ta2RpciwgZG9lc24ndCBzZWVtIHRvIHdvcmtcbiAgICAgIC8vIHNvIHdlIHNldCBpdCBoZXJlLlxuICAgICAgZnMuY2htb2QodGFyZ2V0LCBkaXIubW9kZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICAgIGNvcHlEaXIoZGlyLm5hbWUpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjb3B5RGlyIChkaXIpIHtcbiAgICBmcy5yZWFkZGlyKGRpciwgZnVuY3Rpb24gKGVyciwgaXRlbXMpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgc3RhcnRDb3B5KHBhdGguam9pbihkaXIsIGl0ZW0pKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBkb25lT25lKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gb25MaW5rIChsaW5rKSB7XG4gICAgdmFyIHRhcmdldCA9IGxpbmsucmVwbGFjZShjdXJyZW50UGF0aCwgdGFyZ2V0UGF0aClcbiAgICBmcy5yZWFkbGluayhsaW5rLCBmdW5jdGlvbiAoZXJyLCByZXNvbHZlZFBhdGgpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgIGNoZWNrTGluayhyZXNvbHZlZFBhdGgsIHRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tMaW5rIChyZXNvbHZlZFBhdGgsIHRhcmdldCkge1xuICAgIGlmIChkZXJlZmVyZW5jZSkge1xuICAgICAgcmVzb2x2ZWRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCByZXNvbHZlZFBhdGgpXG4gICAgfVxuICAgIGlzV3JpdGFibGUodGFyZ2V0LCBmdW5jdGlvbiAod3JpdGFibGUpIHtcbiAgICAgIGlmICh3cml0YWJsZSkge1xuICAgICAgICByZXR1cm4gbWFrZUxpbmsocmVzb2x2ZWRQYXRoLCB0YXJnZXQpXG4gICAgICB9XG4gICAgICBmcy5yZWFkbGluayh0YXJnZXQsIGZ1bmN0aW9uIChlcnIsIHRhcmdldERlc3QpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIG9uRXJyb3IoZXJyKVxuXG4gICAgICAgIGlmIChkZXJlZmVyZW5jZSkge1xuICAgICAgICAgIHRhcmdldERlc3QgPSBwYXRoLnJlc29sdmUoYmFzZVBhdGgsIHRhcmdldERlc3QpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldERlc3QgPT09IHJlc29sdmVkUGF0aCkge1xuICAgICAgICAgIHJldHVybiBkb25lT25lKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm1GaWxlKHRhcmdldCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG1ha2VMaW5rKHJlc29sdmVkUGF0aCwgdGFyZ2V0KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gbWFrZUxpbmsgKGxpbmtQYXRoLCB0YXJnZXQpIHtcbiAgICBmcy5zeW1saW5rKGxpbmtQYXRoLCB0YXJnZXQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgIHJldHVybiBkb25lT25lKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gaXNXcml0YWJsZSAocGF0aCwgZG9uZSkge1xuICAgIGZzLmxzdGF0KHBhdGgsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykgcmV0dXJuIGRvbmUodHJ1ZSlcbiAgICAgICAgcmV0dXJuIGRvbmUoZmFsc2UpXG4gICAgICB9XG4gICAgICByZXR1cm4gZG9uZShmYWxzZSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gb25FcnJvciAoZXJyKSB7XG4gICAgaWYgKG9wdGlvbnMuc3RvcE9uRXJyb3IpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgfSBlbHNlIGlmICghZXJycyAmJiBvcHRpb25zLmVycnMpIHtcbiAgICAgIGVycnMgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShvcHRpb25zLmVycnMpXG4gICAgfSBlbHNlIGlmICghZXJycykge1xuICAgICAgZXJycyA9IFtdXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZXJycy53cml0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGVycnMucHVzaChlcnIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGVycnMud3JpdGUoZXJyLnN0YWNrICsgJ1xcblxcbicpXG4gICAgfVxuICAgIHJldHVybiBkb25lT25lKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvbmVPbmUgKHNraXBwZWQpIHtcbiAgICBpZiAoIXNraXBwZWQpIHJ1bm5pbmctLVxuICAgIGZpbmlzaGVkKytcbiAgICBpZiAoKHN0YXJ0ZWQgPT09IGZpbmlzaGVkKSAmJiAocnVubmluZyA9PT0gMCkpIHtcbiAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBlcnJzID8gY2FsbGJhY2soZXJycykgOiBjYWxsYmFjayhudWxsKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5jcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L25jcC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBqc29uRmlsZSA9IHJlcXVpcmUoJy4vanNvbmZpbGUnKVxudmFyIG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcblxuZnVuY3Rpb24gb3V0cHV0SnNvblN5bmMgKGZpbGUsIGRhdGEsIG9wdGlvbnMpIHtcbiAgdmFyIGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuXG4gIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgbWtkaXIubWtkaXJzU3luYyhkaXIpXG4gIH1cblxuICBqc29uRmlsZS53cml0ZUpzb25TeW5jKGZpbGUsIGRhdGEsIG9wdGlvbnMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3V0cHV0SnNvblN5bmNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvanNvbi9vdXRwdXQtanNvbi1zeW5jLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIGpzb25GaWxlID0gcmVxdWlyZSgnLi9qc29uZmlsZScpXG52YXIgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuXG5mdW5jdGlvbiBvdXRwdXRKc29uIChmaWxlLCBkYXRhLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIHZhciBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSlcblxuICBmcy5leGlzdHMoZGlyLCBmdW5jdGlvbiAoaXREb2VzKSB7XG4gICAgaWYgKGl0RG9lcykgcmV0dXJuIGpzb25GaWxlLndyaXRlSnNvbihmaWxlLCBkYXRhLCBvcHRpb25zLCBjYWxsYmFjaylcblxuICAgIG1rZGlyLm1rZGlycyhkaXIsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBqc29uRmlsZS53cml0ZUpzb24oZmlsZSwgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgfSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdXRwdXRKc29uXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2pzb24vb3V0cHV0LWpzb24uanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuLy8gZ2V0IGRyaXZlIG9uIHdpbmRvd3NcbmZ1bmN0aW9uIGdldFJvb3RQYXRoIChwKSB7XG4gIHAgPSBwYXRoLm5vcm1hbGl6ZShwYXRoLnJlc29sdmUocCkpLnNwbGl0KHBhdGguc2VwKVxuICBpZiAocC5sZW5ndGggPiAwKSByZXR1cm4gcFswXVxuICBlbHNlIHJldHVybiBudWxsXG59XG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyODg4LzEwMzMzIGNvbnRhaW5zIG1vcmUgYWNjdXJhdGVcbi8vIFRPRE86IGV4cGFuZCB0byBpbmNsdWRlIHRoZSByZXN0XG52YXIgSU5WQUxJRF9QQVRIX0NIQVJTID0gL1s8PjpcInw/Kl0vXG5cbmZ1bmN0aW9uIGludmFsaWRXaW4zMlBhdGggKHApIHtcbiAgdmFyIHJwID0gZ2V0Um9vdFBhdGgocClcbiAgcCA9IHAucmVwbGFjZShycCwgJycpXG4gIHJldHVybiBJTlZBTElEX1BBVEhfQ0hBUlMudGVzdChwKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Um9vdFBhdGg6IGdldFJvb3RQYXRoLFxuICBpbnZhbGlkV2luMzJQYXRoOiBpbnZhbGlkV2luMzJQYXRoXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL21rZGlycy93aW4zMi5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHJpbXJhZiA9IHJlcXVpcmUoJ3JpbXJhZicpXG5cbmZ1bmN0aW9uIHJlbW92ZVN5bmMgKGRpcikge1xuICByZXR1cm4gcmltcmFmLnN5bmMoZGlyKVxufVxuXG5mdW5jdGlvbiByZW1vdmUgKGRpciwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNhbGxiYWNrID8gcmltcmFmKGRpciwgY2FsbGJhY2spIDogcmltcmFmKGRpciwgZnVuY3Rpb24gKCkge30pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZW1vdmU6IHJlbW92ZSxcbiAgcmVtb3ZlU3luYzogcmVtb3ZlU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9yZW1vdmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVhbHBhdGhcbnJlYWxwYXRoLnJlYWxwYXRoID0gcmVhbHBhdGhcbnJlYWxwYXRoLnN5bmMgPSByZWFscGF0aFN5bmNcbnJlYWxwYXRoLnJlYWxwYXRoU3luYyA9IHJlYWxwYXRoU3luY1xucmVhbHBhdGgubW9ua2V5cGF0Y2ggPSBtb25rZXlwYXRjaFxucmVhbHBhdGgudW5tb25rZXlwYXRjaCA9IHVubW9ua2V5cGF0Y2hcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIG9yaWdSZWFscGF0aCA9IGZzLnJlYWxwYXRoXG52YXIgb3JpZ1JlYWxwYXRoU3luYyA9IGZzLnJlYWxwYXRoU3luY1xuXG52YXIgdmVyc2lvbiA9IHByb2Nlc3MudmVyc2lvblxudmFyIG9rID0gL152WzAtNV1cXC4vLnRlc3QodmVyc2lvbilcbnZhciBvbGQgPSByZXF1aXJlKCcuL29sZC5qcycpXG5cbmZ1bmN0aW9uIG5ld0Vycm9yIChlcikge1xuICByZXR1cm4gZXIgJiYgZXIuc3lzY2FsbCA9PT0gJ3JlYWxwYXRoJyAmJiAoXG4gICAgZXIuY29kZSA9PT0gJ0VMT09QJyB8fFxuICAgIGVyLmNvZGUgPT09ICdFTk9NRU0nIHx8XG4gICAgZXIuY29kZSA9PT0gJ0VOQU1FVE9PTE9ORydcbiAgKVxufVxuXG5mdW5jdGlvbiByZWFscGF0aCAocCwgY2FjaGUsIGNiKSB7XG4gIGlmIChvaykge1xuICAgIHJldHVybiBvcmlnUmVhbHBhdGgocCwgY2FjaGUsIGNiKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBjYWNoZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gY2FjaGVcbiAgICBjYWNoZSA9IG51bGxcbiAgfVxuICBvcmlnUmVhbHBhdGgocCwgY2FjaGUsIGZ1bmN0aW9uIChlciwgcmVzdWx0KSB7XG4gICAgaWYgKG5ld0Vycm9yKGVyKSkge1xuICAgICAgb2xkLnJlYWxwYXRoKHAsIGNhY2hlLCBjYilcbiAgICB9IGVsc2Uge1xuICAgICAgY2IoZXIsIHJlc3VsdClcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlYWxwYXRoU3luYyAocCwgY2FjaGUpIHtcbiAgaWYgKG9rKSB7XG4gICAgcmV0dXJuIG9yaWdSZWFscGF0aFN5bmMocCwgY2FjaGUpXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBvcmlnUmVhbHBhdGhTeW5jKHAsIGNhY2hlKVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmIChuZXdFcnJvcihlcikpIHtcbiAgICAgIHJldHVybiBvbGQucmVhbHBhdGhTeW5jKHAsIGNhY2hlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlclxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtb25rZXlwYXRjaCAoKSB7XG4gIGZzLnJlYWxwYXRoID0gcmVhbHBhdGhcbiAgZnMucmVhbHBhdGhTeW5jID0gcmVhbHBhdGhTeW5jXG59XG5cbmZ1bmN0aW9uIHVubW9ua2V5cGF0Y2ggKCkge1xuICBmcy5yZWFscGF0aCA9IG9yaWdSZWFscGF0aFxuICBmcy5yZWFscGF0aFN5bmMgPSBvcmlnUmVhbHBhdGhTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMucmVhbHBhdGgvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuYWxwaGFzb3J0ID0gYWxwaGFzb3J0XG5leHBvcnRzLmFscGhhc29ydGkgPSBhbHBoYXNvcnRpXG5leHBvcnRzLnNldG9wdHMgPSBzZXRvcHRzXG5leHBvcnRzLm93blByb3AgPSBvd25Qcm9wXG5leHBvcnRzLm1ha2VBYnMgPSBtYWtlQWJzXG5leHBvcnRzLmZpbmlzaCA9IGZpbmlzaFxuZXhwb3J0cy5tYXJrID0gbWFya1xuZXhwb3J0cy5pc0lnbm9yZWQgPSBpc0lnbm9yZWRcbmV4cG9ydHMuY2hpbGRyZW5JZ25vcmVkID0gY2hpbGRyZW5JZ25vcmVkXG5cbmZ1bmN0aW9uIG93blByb3AgKG9iaiwgZmllbGQpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGZpZWxkKVxufVxuXG52YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpXG52YXIgbWluaW1hdGNoID0gcmVxdWlyZShcIm1pbmltYXRjaFwiKVxudmFyIGlzQWJzb2x1dGUgPSByZXF1aXJlKFwicGF0aC1pcy1hYnNvbHV0ZVwiKVxudmFyIE1pbmltYXRjaCA9IG1pbmltYXRjaC5NaW5pbWF0Y2hcblxuZnVuY3Rpb24gYWxwaGFzb3J0aSAoYSwgYikge1xuICByZXR1cm4gYS50b0xvd2VyQ2FzZSgpLmxvY2FsZUNvbXBhcmUoYi50b0xvd2VyQ2FzZSgpKVxufVxuXG5mdW5jdGlvbiBhbHBoYXNvcnQgKGEsIGIpIHtcbiAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKVxufVxuXG5mdW5jdGlvbiBzZXR1cElnbm9yZXMgKHNlbGYsIG9wdGlvbnMpIHtcbiAgc2VsZi5pZ25vcmUgPSBvcHRpb25zLmlnbm9yZSB8fCBbXVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShzZWxmLmlnbm9yZSkpXG4gICAgc2VsZi5pZ25vcmUgPSBbc2VsZi5pZ25vcmVdXG5cbiAgaWYgKHNlbGYuaWdub3JlLmxlbmd0aCkge1xuICAgIHNlbGYuaWdub3JlID0gc2VsZi5pZ25vcmUubWFwKGlnbm9yZU1hcClcbiAgfVxufVxuXG4vLyBpZ25vcmUgcGF0dGVybnMgYXJlIGFsd2F5cyBpbiBkb3Q6dHJ1ZSBtb2RlLlxuZnVuY3Rpb24gaWdub3JlTWFwIChwYXR0ZXJuKSB7XG4gIHZhciBnbWF0Y2hlciA9IG51bGxcbiAgaWYgKHBhdHRlcm4uc2xpY2UoLTMpID09PSAnLyoqJykge1xuICAgIHZhciBncGF0dGVybiA9IHBhdHRlcm4ucmVwbGFjZSgvKFxcL1xcKlxcKikrJC8sICcnKVxuICAgIGdtYXRjaGVyID0gbmV3IE1pbmltYXRjaChncGF0dGVybiwgeyBkb3Q6IHRydWUgfSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWF0Y2hlcjogbmV3IE1pbmltYXRjaChwYXR0ZXJuLCB7IGRvdDogdHJ1ZSB9KSxcbiAgICBnbWF0Y2hlcjogZ21hdGNoZXJcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRvcHRzIChzZWxmLCBwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucylcbiAgICBvcHRpb25zID0ge31cblxuICAvLyBiYXNlLW1hdGNoaW5nOiBqdXN0IHVzZSBnbG9ic3RhciBmb3IgdGhhdC5cbiAgaWYgKG9wdGlvbnMubWF0Y2hCYXNlICYmIC0xID09PSBwYXR0ZXJuLmluZGV4T2YoXCIvXCIpKSB7XG4gICAgaWYgKG9wdGlvbnMubm9nbG9ic3Rhcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYmFzZSBtYXRjaGluZyByZXF1aXJlcyBnbG9ic3RhclwiKVxuICAgIH1cbiAgICBwYXR0ZXJuID0gXCIqKi9cIiArIHBhdHRlcm5cbiAgfVxuXG4gIHNlbGYuc2lsZW50ID0gISFvcHRpb25zLnNpbGVudFxuICBzZWxmLnBhdHRlcm4gPSBwYXR0ZXJuXG4gIHNlbGYuc3RyaWN0ID0gb3B0aW9ucy5zdHJpY3QgIT09IGZhbHNlXG4gIHNlbGYucmVhbHBhdGggPSAhIW9wdGlvbnMucmVhbHBhdGhcbiAgc2VsZi5yZWFscGF0aENhY2hlID0gb3B0aW9ucy5yZWFscGF0aENhY2hlIHx8IE9iamVjdC5jcmVhdGUobnVsbClcbiAgc2VsZi5mb2xsb3cgPSAhIW9wdGlvbnMuZm9sbG93XG4gIHNlbGYuZG90ID0gISFvcHRpb25zLmRvdFxuICBzZWxmLm1hcmsgPSAhIW9wdGlvbnMubWFya1xuICBzZWxmLm5vZGlyID0gISFvcHRpb25zLm5vZGlyXG4gIGlmIChzZWxmLm5vZGlyKVxuICAgIHNlbGYubWFyayA9IHRydWVcbiAgc2VsZi5zeW5jID0gISFvcHRpb25zLnN5bmNcbiAgc2VsZi5ub3VuaXF1ZSA9ICEhb3B0aW9ucy5ub3VuaXF1ZVxuICBzZWxmLm5vbnVsbCA9ICEhb3B0aW9ucy5ub251bGxcbiAgc2VsZi5ub3NvcnQgPSAhIW9wdGlvbnMubm9zb3J0XG4gIHNlbGYubm9jYXNlID0gISFvcHRpb25zLm5vY2FzZVxuICBzZWxmLnN0YXQgPSAhIW9wdGlvbnMuc3RhdFxuICBzZWxmLm5vcHJvY2VzcyA9ICEhb3B0aW9ucy5ub3Byb2Nlc3NcbiAgc2VsZi5hYnNvbHV0ZSA9ICEhb3B0aW9ucy5hYnNvbHV0ZVxuXG4gIHNlbGYubWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGggfHwgSW5maW5pdHlcbiAgc2VsZi5jYWNoZSA9IG9wdGlvbnMuY2FjaGUgfHwgT2JqZWN0LmNyZWF0ZShudWxsKVxuICBzZWxmLnN0YXRDYWNoZSA9IG9wdGlvbnMuc3RhdENhY2hlIHx8IE9iamVjdC5jcmVhdGUobnVsbClcbiAgc2VsZi5zeW1saW5rcyA9IG9wdGlvbnMuc3ltbGlua3MgfHwgT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIHNldHVwSWdub3JlcyhzZWxmLCBvcHRpb25zKVxuXG4gIHNlbGYuY2hhbmdlZEN3ZCA9IGZhbHNlXG4gIHZhciBjd2QgPSBwcm9jZXNzLmN3ZCgpXG4gIGlmICghb3duUHJvcChvcHRpb25zLCBcImN3ZFwiKSlcbiAgICBzZWxmLmN3ZCA9IGN3ZFxuICBlbHNlIHtcbiAgICBzZWxmLmN3ZCA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZClcbiAgICBzZWxmLmNoYW5nZWRDd2QgPSBzZWxmLmN3ZCAhPT0gY3dkXG4gIH1cblxuICBzZWxmLnJvb3QgPSBvcHRpb25zLnJvb3QgfHwgcGF0aC5yZXNvbHZlKHNlbGYuY3dkLCBcIi9cIilcbiAgc2VsZi5yb290ID0gcGF0aC5yZXNvbHZlKHNlbGYucm9vdClcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIilcbiAgICBzZWxmLnJvb3QgPSBzZWxmLnJvb3QucmVwbGFjZSgvXFxcXC9nLCBcIi9cIilcblxuICBzZWxmLmN3ZEFicyA9IG1ha2VBYnMoc2VsZiwgc2VsZi5jd2QpXG4gIHNlbGYubm9tb3VudCA9ICEhb3B0aW9ucy5ub21vdW50XG5cbiAgLy8gZGlzYWJsZSBjb21tZW50cyBhbmQgbmVnYXRpb24gaW4gTWluaW1hdGNoLlxuICAvLyBOb3RlIHRoYXQgdGhleSBhcmUgbm90IHN1cHBvcnRlZCBpbiBHbG9iIGl0c2VsZiBhbnl3YXkuXG4gIG9wdGlvbnMubm9uZWdhdGUgPSB0cnVlXG4gIG9wdGlvbnMubm9jb21tZW50ID0gdHJ1ZVxuXG4gIHNlbGYubWluaW1hdGNoID0gbmV3IE1pbmltYXRjaChwYXR0ZXJuLCBvcHRpb25zKVxuICBzZWxmLm9wdGlvbnMgPSBzZWxmLm1pbmltYXRjaC5vcHRpb25zXG59XG5cbmZ1bmN0aW9uIGZpbmlzaCAoc2VsZikge1xuICB2YXIgbm91ID0gc2VsZi5ub3VuaXF1ZVxuICB2YXIgYWxsID0gbm91ID8gW10gOiBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzZWxmLm1hdGNoZXMubGVuZ3RoOyBpIDwgbDsgaSArKykge1xuICAgIHZhciBtYXRjaGVzID0gc2VsZi5tYXRjaGVzW2ldXG4gICAgaWYgKCFtYXRjaGVzIHx8IE9iamVjdC5rZXlzKG1hdGNoZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaWYgKHNlbGYubm9udWxsKSB7XG4gICAgICAgIC8vIGRvIGxpa2UgdGhlIHNoZWxsLCBhbmQgc3BpdCBvdXQgdGhlIGxpdGVyYWwgZ2xvYlxuICAgICAgICB2YXIgbGl0ZXJhbCA9IHNlbGYubWluaW1hdGNoLmdsb2JTZXRbaV1cbiAgICAgICAgaWYgKG5vdSlcbiAgICAgICAgICBhbGwucHVzaChsaXRlcmFsKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgYWxsW2xpdGVyYWxdID0gdHJ1ZVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYWQgbWF0Y2hlc1xuICAgICAgdmFyIG0gPSBPYmplY3Qua2V5cyhtYXRjaGVzKVxuICAgICAgaWYgKG5vdSlcbiAgICAgICAgYWxsLnB1c2guYXBwbHkoYWxsLCBtKVxuICAgICAgZWxzZVxuICAgICAgICBtLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICBhbGxbbV0gPSB0cnVlXG4gICAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaWYgKCFub3UpXG4gICAgYWxsID0gT2JqZWN0LmtleXMoYWxsKVxuXG4gIGlmICghc2VsZi5ub3NvcnQpXG4gICAgYWxsID0gYWxsLnNvcnQoc2VsZi5ub2Nhc2UgPyBhbHBoYXNvcnRpIDogYWxwaGFzb3J0KVxuXG4gIC8vIGF0ICpzb21lKiBwb2ludCB3ZSBzdGF0dGVkIGFsbCBvZiB0aGVzZVxuICBpZiAoc2VsZi5tYXJrKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFsbFtpXSA9IHNlbGYuX21hcmsoYWxsW2ldKVxuICAgIH1cbiAgICBpZiAoc2VsZi5ub2Rpcikge1xuICAgICAgYWxsID0gYWxsLmZpbHRlcihmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgbm90RGlyID0gISgvXFwvJC8udGVzdChlKSlcbiAgICAgICAgdmFyIGMgPSBzZWxmLmNhY2hlW2VdIHx8IHNlbGYuY2FjaGVbbWFrZUFicyhzZWxmLCBlKV1cbiAgICAgICAgaWYgKG5vdERpciAmJiBjKVxuICAgICAgICAgIG5vdERpciA9IGMgIT09ICdESVInICYmICFBcnJheS5pc0FycmF5KGMpXG4gICAgICAgIHJldHVybiBub3REaXJcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaWYgKHNlbGYuaWdub3JlLmxlbmd0aClcbiAgICBhbGwgPSBhbGwuZmlsdGVyKGZ1bmN0aW9uKG0pIHtcbiAgICAgIHJldHVybiAhaXNJZ25vcmVkKHNlbGYsIG0pXG4gICAgfSlcblxuICBzZWxmLmZvdW5kID0gYWxsXG59XG5cbmZ1bmN0aW9uIG1hcmsgKHNlbGYsIHApIHtcbiAgdmFyIGFicyA9IG1ha2VBYnMoc2VsZiwgcClcbiAgdmFyIGMgPSBzZWxmLmNhY2hlW2Fic11cbiAgdmFyIG0gPSBwXG4gIGlmIChjKSB7XG4gICAgdmFyIGlzRGlyID0gYyA9PT0gJ0RJUicgfHwgQXJyYXkuaXNBcnJheShjKVxuICAgIHZhciBzbGFzaCA9IHAuc2xpY2UoLTEpID09PSAnLydcblxuICAgIGlmIChpc0RpciAmJiAhc2xhc2gpXG4gICAgICBtICs9ICcvJ1xuICAgIGVsc2UgaWYgKCFpc0RpciAmJiBzbGFzaClcbiAgICAgIG0gPSBtLnNsaWNlKDAsIC0xKVxuXG4gICAgaWYgKG0gIT09IHApIHtcbiAgICAgIHZhciBtYWJzID0gbWFrZUFicyhzZWxmLCBtKVxuICAgICAgc2VsZi5zdGF0Q2FjaGVbbWFic10gPSBzZWxmLnN0YXRDYWNoZVthYnNdXG4gICAgICBzZWxmLmNhY2hlW21hYnNdID0gc2VsZi5jYWNoZVthYnNdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1cbn1cblxuLy8gbG90dGEgc2l0dXBzLi4uXG5mdW5jdGlvbiBtYWtlQWJzIChzZWxmLCBmKSB7XG4gIHZhciBhYnMgPSBmXG4gIGlmIChmLmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgYWJzID0gcGF0aC5qb2luKHNlbGYucm9vdCwgZilcbiAgfSBlbHNlIGlmIChpc0Fic29sdXRlKGYpIHx8IGYgPT09ICcnKSB7XG4gICAgYWJzID0gZlxuICB9IGVsc2UgaWYgKHNlbGYuY2hhbmdlZEN3ZCkge1xuICAgIGFicyA9IHBhdGgucmVzb2x2ZShzZWxmLmN3ZCwgZilcbiAgfSBlbHNlIHtcbiAgICBhYnMgPSBwYXRoLnJlc29sdmUoZilcbiAgfVxuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKVxuICAgIGFicyA9IGFicy5yZXBsYWNlKC9cXFxcL2csICcvJylcblxuICByZXR1cm4gYWJzXG59XG5cblxuLy8gUmV0dXJuIHRydWUsIGlmIHBhdHRlcm4gZW5kcyB3aXRoIGdsb2JzdGFyICcqKicsIGZvciB0aGUgYWNjb21wYW55aW5nIHBhcmVudCBkaXJlY3RvcnkuXG4vLyBFeDotIElmIG5vZGVfbW9kdWxlcy8qKiBpcyB0aGUgcGF0dGVybiwgYWRkICdub2RlX21vZHVsZXMnIHRvIGlnbm9yZSBsaXN0IGFsb25nIHdpdGggaXQncyBjb250ZW50c1xuZnVuY3Rpb24gaXNJZ25vcmVkIChzZWxmLCBwYXRoKSB7XG4gIGlmICghc2VsZi5pZ25vcmUubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIHJldHVybiBzZWxmLmlnbm9yZS5zb21lKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbS5tYXRjaGVyLm1hdGNoKHBhdGgpIHx8ICEhKGl0ZW0uZ21hdGNoZXIgJiYgaXRlbS5nbWF0Y2hlci5tYXRjaChwYXRoKSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW5JZ25vcmVkIChzZWxmLCBwYXRoKSB7XG4gIGlmICghc2VsZi5pZ25vcmUubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIHJldHVybiBzZWxmLmlnbm9yZS5zb21lKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICByZXR1cm4gISEoaXRlbS5nbWF0Y2hlciAmJiBpdGVtLmdtYXRjaGVyLm1hdGNoKHBhdGgpKVxuICB9KVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dsb2IvY29tbW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBBcHByb2FjaDpcbi8vXG4vLyAxLiBHZXQgdGhlIG1pbmltYXRjaCBzZXRcbi8vIDIuIEZvciBlYWNoIHBhdHRlcm4gaW4gdGhlIHNldCwgUFJPQ0VTUyhwYXR0ZXJuLCBmYWxzZSlcbi8vIDMuIFN0b3JlIG1hdGNoZXMgcGVyLXNldCwgdGhlbiB1bmlxIHRoZW1cbi8vXG4vLyBQUk9DRVNTKHBhdHRlcm4sIGluR2xvYlN0YXIpXG4vLyBHZXQgdGhlIGZpcnN0IFtuXSBpdGVtcyBmcm9tIHBhdHRlcm4gdGhhdCBhcmUgYWxsIHN0cmluZ3Ncbi8vIEpvaW4gdGhlc2UgdG9nZXRoZXIuICBUaGlzIGlzIFBSRUZJWC5cbi8vICAgSWYgdGhlcmUgaXMgbm8gbW9yZSByZW1haW5pbmcsIHRoZW4gc3RhdChQUkVGSVgpIGFuZFxuLy8gICBhZGQgdG8gbWF0Y2hlcyBpZiBpdCBzdWNjZWVkcy4gIEVORC5cbi8vXG4vLyBJZiBpbkdsb2JTdGFyIGFuZCBQUkVGSVggaXMgc3ltbGluayBhbmQgcG9pbnRzIHRvIGRpclxuLy8gICBzZXQgRU5UUklFUyA9IFtdXG4vLyBlbHNlIHJlYWRkaXIoUFJFRklYKSBhcyBFTlRSSUVTXG4vLyAgIElmIGZhaWwsIEVORFxuLy9cbi8vIHdpdGggRU5UUklFU1xuLy8gICBJZiBwYXR0ZXJuW25dIGlzIEdMT0JTVEFSXG4vLyAgICAgLy8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSBnbG9ic3RhciBtYXRjaCBpcyBlbXB0eVxuLy8gICAgIC8vIGJ5IHBydW5pbmcgaXQgb3V0LCBhbmQgdGVzdGluZyB0aGUgcmVzdWx0aW5nIHBhdHRlcm5cbi8vICAgICBQUk9DRVNTKHBhdHRlcm5bMC4ubl0gKyBwYXR0ZXJuW24rMSAuLiAkXSwgZmFsc2UpXG4vLyAgICAgLy8gaGFuZGxlIG90aGVyIGNhc2VzLlxuLy8gICAgIGZvciBFTlRSWSBpbiBFTlRSSUVTIChub3QgZG90ZmlsZXMpXG4vLyAgICAgICAvLyBhdHRhY2ggZ2xvYnN0YXIgKyB0YWlsIG9udG8gdGhlIGVudHJ5XG4vLyAgICAgICAvLyBNYXJrIHRoYXQgdGhpcyBlbnRyeSBpcyBhIGdsb2JzdGFyIG1hdGNoXG4vLyAgICAgICBQUk9DRVNTKHBhdHRlcm5bMC4ubl0gKyBFTlRSWSArIHBhdHRlcm5bbiAuLiAkXSwgdHJ1ZSlcbi8vXG4vLyAgIGVsc2UgLy8gbm90IGdsb2JzdGFyXG4vLyAgICAgZm9yIEVOVFJZIGluIEVOVFJJRVMgKG5vdCBkb3RmaWxlcywgdW5sZXNzIHBhdHRlcm5bbl0gaXMgZG90KVxuLy8gICAgICAgVGVzdCBFTlRSWSBhZ2FpbnN0IHBhdHRlcm5bbl1cbi8vICAgICAgIElmIGZhaWxzLCBjb250aW51ZVxuLy8gICAgICAgSWYgcGFzc2VzLCBQUk9DRVNTKHBhdHRlcm5bMC4ubl0gKyBpdGVtICsgcGF0dGVybltuKzEgLi4gJF0pXG4vL1xuLy8gQ2F2ZWF0OlxuLy8gICBDYWNoZSBhbGwgc3RhdHMgYW5kIHJlYWRkaXJzIHJlc3VsdHMgdG8gbWluaW1pemUgc3lzY2FsbC4gIFNpbmNlIGFsbFxuLy8gICB3ZSBldmVyIGNhcmUgYWJvdXQgaXMgZXhpc3RlbmNlIGFuZCBkaXJlY3RvcnktbmVzcywgd2UgY2FuIGp1c3Qga2VlcFxuLy8gICBgdHJ1ZWAgZm9yIGZpbGVzLCBhbmQgW2NoaWxkcmVuLC4uLl0gZm9yIGRpcmVjdG9yaWVzLCBvciBgZmFsc2VgIGZvclxuLy8gICB0aGluZ3MgdGhhdCBkb24ndCBleGlzdC5cblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcbnZhciBycCA9IHJlcXVpcmUoJ2ZzLnJlYWxwYXRoJylcbnZhciBtaW5pbWF0Y2ggPSByZXF1aXJlKCdtaW5pbWF0Y2gnKVxudmFyIE1pbmltYXRjaCA9IG1pbmltYXRjaC5NaW5pbWF0Y2hcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJylcbnZhciBFRSA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxudmFyIGlzQWJzb2x1dGUgPSByZXF1aXJlKCdwYXRoLWlzLWFic29sdXRlJylcbnZhciBnbG9iU3luYyA9IHJlcXVpcmUoJy4vc3luYy5qcycpXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKVxudmFyIGFscGhhc29ydCA9IGNvbW1vbi5hbHBoYXNvcnRcbnZhciBhbHBoYXNvcnRpID0gY29tbW9uLmFscGhhc29ydGlcbnZhciBzZXRvcHRzID0gY29tbW9uLnNldG9wdHNcbnZhciBvd25Qcm9wID0gY29tbW9uLm93blByb3BcbnZhciBpbmZsaWdodCA9IHJlcXVpcmUoJ2luZmxpZ2h0JylcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpXG52YXIgY2hpbGRyZW5JZ25vcmVkID0gY29tbW9uLmNoaWxkcmVuSWdub3JlZFxudmFyIGlzSWdub3JlZCA9IGNvbW1vbi5pc0lnbm9yZWRcblxudmFyIG9uY2UgPSByZXF1aXJlKCdvbmNlJylcblxuZnVuY3Rpb24gZ2xvYiAocGF0dGVybiwgb3B0aW9ucywgY2IpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSBjYiA9IG9wdGlvbnMsIG9wdGlvbnMgPSB7fVxuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuXG4gIGlmIChvcHRpb25zLnN5bmMpIHtcbiAgICBpZiAoY2IpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYWxsYmFjayBwcm92aWRlZCB0byBzeW5jIGdsb2InKVxuICAgIHJldHVybiBnbG9iU3luYyhwYXR0ZXJuLCBvcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBHbG9iKHBhdHRlcm4sIG9wdGlvbnMsIGNiKVxufVxuXG5nbG9iLnN5bmMgPSBnbG9iU3luY1xudmFyIEdsb2JTeW5jID0gZ2xvYi5HbG9iU3luYyA9IGdsb2JTeW5jLkdsb2JTeW5jXG5cbi8vIG9sZCBhcGkgc3VyZmFjZVxuZ2xvYi5nbG9iID0gZ2xvYlxuXG5mdW5jdGlvbiBleHRlbmQgKG9yaWdpbiwgYWRkKSB7XG4gIGlmIChhZGQgPT09IG51bGwgfHwgdHlwZW9mIGFkZCAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3JpZ2luXG4gIH1cblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZClcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dXG4gIH1cbiAgcmV0dXJuIG9yaWdpblxufVxuXG5nbG9iLmhhc01hZ2ljID0gZnVuY3Rpb24gKHBhdHRlcm4sIG9wdGlvbnNfKSB7XG4gIHZhciBvcHRpb25zID0gZXh0ZW5kKHt9LCBvcHRpb25zXylcbiAgb3B0aW9ucy5ub3Byb2Nlc3MgPSB0cnVlXG5cbiAgdmFyIGcgPSBuZXcgR2xvYihwYXR0ZXJuLCBvcHRpb25zKVxuICB2YXIgc2V0ID0gZy5taW5pbWF0Y2guc2V0XG5cbiAgaWYgKCFwYXR0ZXJuKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGlmIChzZXQubGVuZ3RoID4gMSlcbiAgICByZXR1cm4gdHJ1ZVxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgc2V0WzBdLmxlbmd0aDsgaisrKSB7XG4gICAgaWYgKHR5cGVvZiBzZXRbMF1bal0gIT09ICdzdHJpbmcnKVxuICAgICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5nbG9iLkdsb2IgPSBHbG9iXG5pbmhlcml0cyhHbG9iLCBFRSlcbmZ1bmN0aW9uIEdsb2IgKHBhdHRlcm4sIG9wdGlvbnMsIGNiKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBudWxsXG4gIH1cblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnN5bmMpIHtcbiAgICBpZiAoY2IpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYWxsYmFjayBwcm92aWRlZCB0byBzeW5jIGdsb2InKVxuICAgIHJldHVybiBuZXcgR2xvYlN5bmMocGF0dGVybiwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBHbG9iKSlcbiAgICByZXR1cm4gbmV3IEdsb2IocGF0dGVybiwgb3B0aW9ucywgY2IpXG5cbiAgc2V0b3B0cyh0aGlzLCBwYXR0ZXJuLCBvcHRpb25zKVxuICB0aGlzLl9kaWRSZWFsUGF0aCA9IGZhbHNlXG5cbiAgLy8gcHJvY2VzcyBlYWNoIHBhdHRlcm4gaW4gdGhlIG1pbmltYXRjaCBzZXRcbiAgdmFyIG4gPSB0aGlzLm1pbmltYXRjaC5zZXQubGVuZ3RoXG5cbiAgLy8gVGhlIG1hdGNoZXMgYXJlIHN0b3JlZCBhcyB7PGZpbGVuYW1lPjogdHJ1ZSwuLi59IHNvIHRoYXRcbiAgLy8gZHVwbGljYXRlcyBhcmUgYXV0b21hZ2ljYWxseSBwcnVuZWQuXG4gIC8vIExhdGVyLCB3ZSBkbyBhbiBPYmplY3Qua2V5cygpIG9uIHRoZXNlLlxuICAvLyBLZWVwIHRoZW0gYXMgYSBsaXN0IHNvIHdlIGNhbiBmaWxsIGluIHdoZW4gbm9udWxsIGlzIHNldC5cbiAgdGhpcy5tYXRjaGVzID0gbmV3IEFycmF5KG4pXG5cbiAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNiID0gb25jZShjYilcbiAgICB0aGlzLm9uKCdlcnJvcicsIGNiKVxuICAgIHRoaXMub24oJ2VuZCcsIGZ1bmN0aW9uIChtYXRjaGVzKSB7XG4gICAgICBjYihudWxsLCBtYXRjaGVzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgc2VsZiA9IHRoaXNcbiAgdmFyIG4gPSB0aGlzLm1pbmltYXRjaC5zZXQubGVuZ3RoXG4gIHRoaXMuX3Byb2Nlc3NpbmcgPSAwXG4gIHRoaXMubWF0Y2hlcyA9IG5ldyBBcnJheShuKVxuXG4gIHRoaXMuX2VtaXRRdWV1ZSA9IFtdXG4gIHRoaXMuX3Byb2Nlc3NRdWV1ZSA9IFtdXG4gIHRoaXMucGF1c2VkID0gZmFsc2VcblxuICBpZiAodGhpcy5ub3Byb2Nlc3MpXG4gICAgcmV0dXJuIHRoaXNcblxuICBpZiAobiA9PT0gMClcbiAgICByZXR1cm4gZG9uZSgpXG5cbiAgdmFyIHN5bmMgPSB0cnVlXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSArKykge1xuICAgIHRoaXMuX3Byb2Nlc3ModGhpcy5taW5pbWF0Y2guc2V0W2ldLCBpLCBmYWxzZSwgZG9uZSlcbiAgfVxuICBzeW5jID0gZmFsc2VcblxuICBmdW5jdGlvbiBkb25lICgpIHtcbiAgICAtLXNlbGYuX3Byb2Nlc3NpbmdcbiAgICBpZiAoc2VsZi5fcHJvY2Vzc2luZyA8PSAwKSB7XG4gICAgICBpZiAoc3luYykge1xuICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLl9maW5pc2goKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5fZmluaXNoKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUuX2ZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgYXNzZXJ0KHRoaXMgaW5zdGFuY2VvZiBHbG9iKVxuICBpZiAodGhpcy5hYm9ydGVkKVxuICAgIHJldHVyblxuXG4gIGlmICh0aGlzLnJlYWxwYXRoICYmICF0aGlzLl9kaWRSZWFscGF0aClcbiAgICByZXR1cm4gdGhpcy5fcmVhbHBhdGgoKVxuXG4gIGNvbW1vbi5maW5pc2godGhpcylcbiAgdGhpcy5lbWl0KCdlbmQnLCB0aGlzLmZvdW5kKVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcmVhbHBhdGggPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9kaWRSZWFscGF0aClcbiAgICByZXR1cm5cblxuICB0aGlzLl9kaWRSZWFscGF0aCA9IHRydWVcblxuICB2YXIgbiA9IHRoaXMubWF0Y2hlcy5sZW5ndGhcbiAgaWYgKG4gPT09IDApXG4gICAgcmV0dXJuIHRoaXMuX2ZpbmlzaCgpXG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXRjaGVzLmxlbmd0aDsgaSsrKVxuICAgIHRoaXMuX3JlYWxwYXRoU2V0KGksIG5leHQpXG5cbiAgZnVuY3Rpb24gbmV4dCAoKSB7XG4gICAgaWYgKC0tbiA9PT0gMClcbiAgICAgIHNlbGYuX2ZpbmlzaCgpXG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUuX3JlYWxwYXRoU2V0ID0gZnVuY3Rpb24gKGluZGV4LCBjYikge1xuICB2YXIgbWF0Y2hzZXQgPSB0aGlzLm1hdGNoZXNbaW5kZXhdXG4gIGlmICghbWF0Y2hzZXQpXG4gICAgcmV0dXJuIGNiKClcblxuICB2YXIgZm91bmQgPSBPYmplY3Qua2V5cyhtYXRjaHNldClcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHZhciBuID0gZm91bmQubGVuZ3RoXG5cbiAgaWYgKG4gPT09IDApXG4gICAgcmV0dXJuIGNiKClcblxuICB2YXIgc2V0ID0gdGhpcy5tYXRjaGVzW2luZGV4XSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgZm91bmQuZm9yRWFjaChmdW5jdGlvbiAocCwgaSkge1xuICAgIC8vIElmIHRoZXJlJ3MgYSBwcm9ibGVtIHdpdGggdGhlIHN0YXQsIHRoZW4gaXQgbWVhbnMgdGhhdFxuICAgIC8vIG9uZSBvciBtb3JlIG9mIHRoZSBsaW5rcyBpbiB0aGUgcmVhbHBhdGggY291bGRuJ3QgYmVcbiAgICAvLyByZXNvbHZlZC4gIGp1c3QgcmV0dXJuIHRoZSBhYnMgdmFsdWUgaW4gdGhhdCBjYXNlLlxuICAgIHAgPSBzZWxmLl9tYWtlQWJzKHApXG4gICAgcnAucmVhbHBhdGgocCwgc2VsZi5yZWFscGF0aENhY2hlLCBmdW5jdGlvbiAoZXIsIHJlYWwpIHtcbiAgICAgIGlmICghZXIpXG4gICAgICAgIHNldFtyZWFsXSA9IHRydWVcbiAgICAgIGVsc2UgaWYgKGVyLnN5c2NhbGwgPT09ICdzdGF0JylcbiAgICAgICAgc2V0W3BdID0gdHJ1ZVxuICAgICAgZWxzZVxuICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXIpIC8vIHNyc2x5IHd0ZiByaWdodCBoZXJlXG5cbiAgICAgIGlmICgtLW4gPT09IDApIHtcbiAgICAgICAgc2VsZi5tYXRjaGVzW2luZGV4XSA9IHNldFxuICAgICAgICBjYigpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuR2xvYi5wcm90b3R5cGUuX21hcmsgPSBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gY29tbW9uLm1hcmsodGhpcywgcClcbn1cblxuR2xvYi5wcm90b3R5cGUuX21ha2VBYnMgPSBmdW5jdGlvbiAoZikge1xuICByZXR1cm4gY29tbW9uLm1ha2VBYnModGhpcywgZilcbn1cblxuR2xvYi5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYWJvcnRlZCA9IHRydWVcbiAgdGhpcy5lbWl0KCdhYm9ydCcpXG59XG5cbkdsb2IucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlXG4gICAgdGhpcy5lbWl0KCdwYXVzZScpXG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICB0aGlzLmVtaXQoJ3Jlc3VtZScpXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZVxuICAgIGlmICh0aGlzLl9lbWl0UXVldWUubGVuZ3RoKSB7XG4gICAgICB2YXIgZXEgPSB0aGlzLl9lbWl0UXVldWUuc2xpY2UoMClcbiAgICAgIHRoaXMuX2VtaXRRdWV1ZS5sZW5ndGggPSAwXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVxLmxlbmd0aDsgaSArKykge1xuICAgICAgICB2YXIgZSA9IGVxW2ldXG4gICAgICAgIHRoaXMuX2VtaXRNYXRjaChlWzBdLCBlWzFdKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fcHJvY2Vzc1F1ZXVlLmxlbmd0aCkge1xuICAgICAgdmFyIHBxID0gdGhpcy5fcHJvY2Vzc1F1ZXVlLnNsaWNlKDApXG4gICAgICB0aGlzLl9wcm9jZXNzUXVldWUubGVuZ3RoID0gMFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcS5sZW5ndGg7IGkgKyspIHtcbiAgICAgICAgdmFyIHAgPSBwcVtpXVxuICAgICAgICB0aGlzLl9wcm9jZXNzaW5nLS1cbiAgICAgICAgdGhpcy5fcHJvY2VzcyhwWzBdLCBwWzFdLCBwWzJdLCBwWzNdKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcHJvY2VzcyA9IGZ1bmN0aW9uIChwYXR0ZXJuLCBpbmRleCwgaW5HbG9iU3RhciwgY2IpIHtcbiAgYXNzZXJ0KHRoaXMgaW5zdGFuY2VvZiBHbG9iKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuXG4gIGlmICh0aGlzLmFib3J0ZWQpXG4gICAgcmV0dXJuXG5cbiAgdGhpcy5fcHJvY2Vzc2luZysrXG4gIGlmICh0aGlzLnBhdXNlZCkge1xuICAgIHRoaXMuX3Byb2Nlc3NRdWV1ZS5wdXNoKFtwYXR0ZXJuLCBpbmRleCwgaW5HbG9iU3RhciwgY2JdKVxuICAgIHJldHVyblxuICB9XG5cbiAgLy9jb25zb2xlLmVycm9yKCdQUk9DRVNTICVkJywgdGhpcy5fcHJvY2Vzc2luZywgcGF0dGVybilcblxuICAvLyBHZXQgdGhlIGZpcnN0IFtuXSBwYXJ0cyBvZiBwYXR0ZXJuIHRoYXQgYXJlIGFsbCBzdHJpbmdzLlxuICB2YXIgbiA9IDBcbiAgd2hpbGUgKHR5cGVvZiBwYXR0ZXJuW25dID09PSAnc3RyaW5nJykge1xuICAgIG4gKytcbiAgfVxuICAvLyBub3cgbiBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IG9uZSB0aGF0IGlzICpub3QqIGEgc3RyaW5nLlxuXG4gIC8vIHNlZSBpZiB0aGVyZSdzIGFueXRoaW5nIGVsc2VcbiAgdmFyIHByZWZpeFxuICBzd2l0Y2ggKG4pIHtcbiAgICAvLyBpZiBub3QsIHRoZW4gdGhpcyBpcyByYXRoZXIgc2ltcGxlXG4gICAgY2FzZSBwYXR0ZXJuLmxlbmd0aDpcbiAgICAgIHRoaXMuX3Byb2Nlc3NTaW1wbGUocGF0dGVybi5qb2luKCcvJyksIGluZGV4LCBjYilcbiAgICAgIHJldHVyblxuXG4gICAgY2FzZSAwOlxuICAgICAgLy8gcGF0dGVybiAqc3RhcnRzKiB3aXRoIHNvbWUgbm9uLXRyaXZpYWwgaXRlbS5cbiAgICAgIC8vIGdvaW5nIHRvIHJlYWRkaXIoY3dkKSwgYnV0IG5vdCBpbmNsdWRlIHRoZSBwcmVmaXggaW4gbWF0Y2hlcy5cbiAgICAgIHByZWZpeCA9IG51bGxcbiAgICAgIGJyZWFrXG5cbiAgICBkZWZhdWx0OlxuICAgICAgLy8gcGF0dGVybiBoYXMgc29tZSBzdHJpbmcgYml0cyBpbiB0aGUgZnJvbnQuXG4gICAgICAvLyB3aGF0ZXZlciBpdCBzdGFydHMgd2l0aCwgd2hldGhlciB0aGF0J3MgJ2Fic29sdXRlJyBsaWtlIC9mb28vYmFyLFxuICAgICAgLy8gb3IgJ3JlbGF0aXZlJyBsaWtlICcuLi9iYXonXG4gICAgICBwcmVmaXggPSBwYXR0ZXJuLnNsaWNlKDAsIG4pLmpvaW4oJy8nKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHZhciByZW1haW4gPSBwYXR0ZXJuLnNsaWNlKG4pXG5cbiAgLy8gZ2V0IHRoZSBsaXN0IG9mIGVudHJpZXMuXG4gIHZhciByZWFkXG4gIGlmIChwcmVmaXggPT09IG51bGwpXG4gICAgcmVhZCA9ICcuJ1xuICBlbHNlIGlmIChpc0Fic29sdXRlKHByZWZpeCkgfHwgaXNBYnNvbHV0ZShwYXR0ZXJuLmpvaW4oJy8nKSkpIHtcbiAgICBpZiAoIXByZWZpeCB8fCAhaXNBYnNvbHV0ZShwcmVmaXgpKVxuICAgICAgcHJlZml4ID0gJy8nICsgcHJlZml4XG4gICAgcmVhZCA9IHByZWZpeFxuICB9IGVsc2VcbiAgICByZWFkID0gcHJlZml4XG5cbiAgdmFyIGFicyA9IHRoaXMuX21ha2VBYnMocmVhZClcblxuICAvL2lmIGlnbm9yZWQsIHNraXAgX3Byb2Nlc3NpbmdcbiAgaWYgKGNoaWxkcmVuSWdub3JlZCh0aGlzLCByZWFkKSlcbiAgICByZXR1cm4gY2IoKVxuXG4gIHZhciBpc0dsb2JTdGFyID0gcmVtYWluWzBdID09PSBtaW5pbWF0Y2guR0xPQlNUQVJcbiAgaWYgKGlzR2xvYlN0YXIpXG4gICAgdGhpcy5fcHJvY2Vzc0dsb2JTdGFyKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYilcbiAgZWxzZVxuICAgIHRoaXMuX3Byb2Nlc3NSZWFkZGlyKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYilcbn1cblxuR2xvYi5wcm90b3R5cGUuX3Byb2Nlc3NSZWFkZGlyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBjYikge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgdGhpcy5fcmVhZGRpcihhYnMsIGluR2xvYlN0YXIsIGZ1bmN0aW9uIChlciwgZW50cmllcykge1xuICAgIHJldHVybiBzZWxmLl9wcm9jZXNzUmVhZGRpcjIocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGVudHJpZXMsIGNiKVxuICB9KVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcHJvY2Vzc1JlYWRkaXIyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyLCBlbnRyaWVzLCBjYikge1xuXG4gIC8vIGlmIHRoZSBhYnMgaXNuJ3QgYSBkaXIsIHRoZW4gbm90aGluZyBjYW4gbWF0Y2ghXG4gIGlmICghZW50cmllcylcbiAgICByZXR1cm4gY2IoKVxuXG4gIC8vIEl0IHdpbGwgb25seSBtYXRjaCBkb3QgZW50cmllcyBpZiBpdCBzdGFydHMgd2l0aCBhIGRvdCwgb3IgaWZcbiAgLy8gZG90IGlzIHNldC4gIFN0dWZmIGxpa2UgQCguZm9vfC5iYXIpIGlzbid0IGFsbG93ZWQuXG4gIHZhciBwbiA9IHJlbWFpblswXVxuICB2YXIgbmVnYXRlID0gISF0aGlzLm1pbmltYXRjaC5uZWdhdGVcbiAgdmFyIHJhd0dsb2IgPSBwbi5fZ2xvYlxuICB2YXIgZG90T2sgPSB0aGlzLmRvdCB8fCByYXdHbG9iLmNoYXJBdCgwKSA9PT0gJy4nXG5cbiAgdmFyIG1hdGNoZWRFbnRyaWVzID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGUgPSBlbnRyaWVzW2ldXG4gICAgaWYgKGUuY2hhckF0KDApICE9PSAnLicgfHwgZG90T2spIHtcbiAgICAgIHZhciBtXG4gICAgICBpZiAobmVnYXRlICYmICFwcmVmaXgpIHtcbiAgICAgICAgbSA9ICFlLm1hdGNoKHBuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbSA9IGUubWF0Y2gocG4pXG4gICAgICB9XG4gICAgICBpZiAobSlcbiAgICAgICAgbWF0Y2hlZEVudHJpZXMucHVzaChlKVxuICAgIH1cbiAgfVxuXG4gIC8vY29uc29sZS5lcnJvcigncHJkMicsIHByZWZpeCwgZW50cmllcywgcmVtYWluWzBdLl9nbG9iLCBtYXRjaGVkRW50cmllcylcblxuICB2YXIgbGVuID0gbWF0Y2hlZEVudHJpZXMubGVuZ3RoXG4gIC8vIElmIHRoZXJlIGFyZSBubyBtYXRjaGVkIGVudHJpZXMsIHRoZW4gbm90aGluZyBtYXRjaGVzLlxuICBpZiAobGVuID09PSAwKVxuICAgIHJldHVybiBjYigpXG5cbiAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCByZW1haW5pbmcgcGF0dGVybiBiaXQsIHRoZW4gbm8gbmVlZCBmb3JcbiAgLy8gYW4gYWRkaXRpb25hbCBzdGF0ICp1bmxlc3MqIHRoZSB1c2VyIGhhcyBzcGVjaWZpZWQgbWFyayBvclxuICAvLyBzdGF0IGV4cGxpY2l0bHkuICBXZSBrbm93IHRoZXkgZXhpc3QsIHNpbmNlIHJlYWRkaXIgcmV0dXJuZWRcbiAgLy8gdGhlbS5cblxuICBpZiAocmVtYWluLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5tYXJrICYmICF0aGlzLnN0YXQpIHtcbiAgICBpZiAoIXRoaXMubWF0Y2hlc1tpbmRleF0pXG4gICAgICB0aGlzLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKyspIHtcbiAgICAgIHZhciBlID0gbWF0Y2hlZEVudHJpZXNbaV1cbiAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeCAhPT0gJy8nKVxuICAgICAgICAgIGUgPSBwcmVmaXggKyAnLycgKyBlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBlID0gcHJlZml4ICsgZVxuICAgICAgfVxuXG4gICAgICBpZiAoZS5jaGFyQXQoMCkgPT09ICcvJyAmJiAhdGhpcy5ub21vdW50KSB7XG4gICAgICAgIGUgPSBwYXRoLmpvaW4odGhpcy5yb290LCBlKVxuICAgICAgfVxuICAgICAgdGhpcy5fZW1pdE1hdGNoKGluZGV4LCBlKVxuICAgIH1cbiAgICAvLyBUaGlzIHdhcyB0aGUgbGFzdCBvbmUsIGFuZCBubyBzdGF0cyB3ZXJlIG5lZWRlZFxuICAgIHJldHVybiBjYigpXG4gIH1cblxuICAvLyBub3cgdGVzdCBhbGwgbWF0Y2hlZCBlbnRyaWVzIGFzIHN0YW5kLWlucyBmb3IgdGhhdCBwYXJ0XG4gIC8vIG9mIHRoZSBwYXR0ZXJuLlxuICByZW1haW4uc2hpZnQoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArKykge1xuICAgIHZhciBlID0gbWF0Y2hlZEVudHJpZXNbaV1cbiAgICB2YXIgbmV3UGF0dGVyblxuICAgIGlmIChwcmVmaXgpIHtcbiAgICAgIGlmIChwcmVmaXggIT09ICcvJylcbiAgICAgICAgZSA9IHByZWZpeCArICcvJyArIGVcbiAgICAgIGVsc2VcbiAgICAgICAgZSA9IHByZWZpeCArIGVcbiAgICB9XG4gICAgdGhpcy5fcHJvY2VzcyhbZV0uY29uY2F0KHJlbWFpbiksIGluZGV4LCBpbkdsb2JTdGFyLCBjYilcbiAgfVxuICBjYigpXG59XG5cbkdsb2IucHJvdG90eXBlLl9lbWl0TWF0Y2ggPSBmdW5jdGlvbiAoaW5kZXgsIGUpIHtcbiAgaWYgKHRoaXMuYWJvcnRlZClcbiAgICByZXR1cm5cblxuICBpZiAoaXNJZ25vcmVkKHRoaXMsIGUpKVxuICAgIHJldHVyblxuXG4gIGlmICh0aGlzLnBhdXNlZCkge1xuICAgIHRoaXMuX2VtaXRRdWV1ZS5wdXNoKFtpbmRleCwgZV0pXG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhlKVxuXG4gIGlmICh0aGlzLm1hcmspXG4gICAgZSA9IHRoaXMuX21hcmsoZSlcblxuICBpZiAodGhpcy5hYnNvbHV0ZSlcbiAgICBlID0gYWJzXG5cbiAgaWYgKHRoaXMubWF0Y2hlc1tpbmRleF1bZV0pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHRoaXMubm9kaXIpIHtcbiAgICB2YXIgYyA9IHRoaXMuY2FjaGVbYWJzXVxuICAgIGlmIChjID09PSAnRElSJyB8fCBBcnJheS5pc0FycmF5KGMpKVxuICAgICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLm1hdGNoZXNbaW5kZXhdW2VdID0gdHJ1ZVxuXG4gIHZhciBzdCA9IHRoaXMuc3RhdENhY2hlW2Fic11cbiAgaWYgKHN0KVxuICAgIHRoaXMuZW1pdCgnc3RhdCcsIGUsIHN0KVxuXG4gIHRoaXMuZW1pdCgnbWF0Y2gnLCBlKVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcmVhZGRpckluR2xvYlN0YXIgPSBmdW5jdGlvbiAoYWJzLCBjYikge1xuICBpZiAodGhpcy5hYm9ydGVkKVxuICAgIHJldHVyblxuXG4gIC8vIGZvbGxvdyBhbGwgc3ltbGlua2VkIGRpcmVjdG9yaWVzIGZvcmV2ZXJcbiAgLy8ganVzdCBwcm9jZWVkIGFzIGlmIHRoaXMgaXMgYSBub24tZ2xvYnN0YXIgc2l0dWF0aW9uXG4gIGlmICh0aGlzLmZvbGxvdylcbiAgICByZXR1cm4gdGhpcy5fcmVhZGRpcihhYnMsIGZhbHNlLCBjYilcblxuICB2YXIgbHN0YXRrZXkgPSAnbHN0YXRcXDAnICsgYWJzXG4gIHZhciBzZWxmID0gdGhpc1xuICB2YXIgbHN0YXRjYiA9IGluZmxpZ2h0KGxzdGF0a2V5LCBsc3RhdGNiXylcblxuICBpZiAobHN0YXRjYilcbiAgICBmcy5sc3RhdChhYnMsIGxzdGF0Y2IpXG5cbiAgZnVuY3Rpb24gbHN0YXRjYl8gKGVyLCBsc3RhdCkge1xuICAgIGlmIChlcilcbiAgICAgIHJldHVybiBjYigpXG5cbiAgICB2YXIgaXNTeW0gPSBsc3RhdC5pc1N5bWJvbGljTGluaygpXG4gICAgc2VsZi5zeW1saW5rc1thYnNdID0gaXNTeW1cblxuICAgIC8vIElmIGl0J3Mgbm90IGEgc3ltbGluayBvciBhIGRpciwgdGhlbiBpdCdzIGRlZmluaXRlbHkgYSByZWd1bGFyIGZpbGUuXG4gICAgLy8gZG9uJ3QgYm90aGVyIGRvaW5nIGEgcmVhZGRpciBpbiB0aGF0IGNhc2UuXG4gICAgaWYgKCFpc1N5bSAmJiAhbHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgc2VsZi5jYWNoZVthYnNdID0gJ0ZJTEUnXG4gICAgICBjYigpXG4gICAgfSBlbHNlXG4gICAgICBzZWxmLl9yZWFkZGlyKGFicywgZmFsc2UsIGNiKVxuICB9XG59XG5cbkdsb2IucHJvdG90eXBlLl9yZWFkZGlyID0gZnVuY3Rpb24gKGFicywgaW5HbG9iU3RhciwgY2IpIHtcbiAgaWYgKHRoaXMuYWJvcnRlZClcbiAgICByZXR1cm5cblxuICBjYiA9IGluZmxpZ2h0KCdyZWFkZGlyXFwwJythYnMrJ1xcMCcraW5HbG9iU3RhciwgY2IpXG4gIGlmICghY2IpXG4gICAgcmV0dXJuXG5cbiAgLy9jb25zb2xlLmVycm9yKCdSRCAlaiAlaicsICtpbkdsb2JTdGFyLCBhYnMpXG4gIGlmIChpbkdsb2JTdGFyICYmICFvd25Qcm9wKHRoaXMuc3ltbGlua3MsIGFicykpXG4gICAgcmV0dXJuIHRoaXMuX3JlYWRkaXJJbkdsb2JTdGFyKGFicywgY2IpXG5cbiAgaWYgKG93blByb3AodGhpcy5jYWNoZSwgYWJzKSkge1xuICAgIHZhciBjID0gdGhpcy5jYWNoZVthYnNdXG4gICAgaWYgKCFjIHx8IGMgPT09ICdGSUxFJylcbiAgICAgIHJldHVybiBjYigpXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjKSlcbiAgICAgIHJldHVybiBjYihudWxsLCBjKVxuICB9XG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGZzLnJlYWRkaXIoYWJzLCByZWFkZGlyQ2IodGhpcywgYWJzLCBjYikpXG59XG5cbmZ1bmN0aW9uIHJlYWRkaXJDYiAoc2VsZiwgYWJzLCBjYikge1xuICByZXR1cm4gZnVuY3Rpb24gKGVyLCBlbnRyaWVzKSB7XG4gICAgaWYgKGVyKVxuICAgICAgc2VsZi5fcmVhZGRpckVycm9yKGFicywgZXIsIGNiKVxuICAgIGVsc2VcbiAgICAgIHNlbGYuX3JlYWRkaXJFbnRyaWVzKGFicywgZW50cmllcywgY2IpXG4gIH1cbn1cblxuR2xvYi5wcm90b3R5cGUuX3JlYWRkaXJFbnRyaWVzID0gZnVuY3Rpb24gKGFicywgZW50cmllcywgY2IpIHtcbiAgaWYgKHRoaXMuYWJvcnRlZClcbiAgICByZXR1cm5cblxuICAvLyBpZiB3ZSBoYXZlbid0IGFza2VkIHRvIHN0YXQgZXZlcnl0aGluZywgdGhlbiBqdXN0XG4gIC8vIGFzc3VtZSB0aGF0IGV2ZXJ5dGhpbmcgaW4gdGhlcmUgZXhpc3RzLCBzbyB3ZSBjYW4gYXZvaWRcbiAgLy8gaGF2aW5nIHRvIHN0YXQgaXQgYSBzZWNvbmQgdGltZS5cbiAgaWYgKCF0aGlzLm1hcmsgJiYgIXRoaXMuc3RhdCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkgKyspIHtcbiAgICAgIHZhciBlID0gZW50cmllc1tpXVxuICAgICAgaWYgKGFicyA9PT0gJy8nKVxuICAgICAgICBlID0gYWJzICsgZVxuICAgICAgZWxzZVxuICAgICAgICBlID0gYWJzICsgJy8nICsgZVxuICAgICAgdGhpcy5jYWNoZVtlXSA9IHRydWVcbiAgICB9XG4gIH1cblxuICB0aGlzLmNhY2hlW2Fic10gPSBlbnRyaWVzXG4gIHJldHVybiBjYihudWxsLCBlbnRyaWVzKVxufVxuXG5HbG9iLnByb3RvdHlwZS5fcmVhZGRpckVycm9yID0gZnVuY3Rpb24gKGYsIGVyLCBjYikge1xuICBpZiAodGhpcy5hYm9ydGVkKVxuICAgIHJldHVyblxuXG4gIC8vIGhhbmRsZSBlcnJvcnMsIGFuZCBjYWNoZSB0aGUgaW5mb3JtYXRpb25cbiAgc3dpdGNoIChlci5jb2RlKSB7XG4gICAgY2FzZSAnRU5PVFNVUCc6IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pc2FhY3Mvbm9kZS1nbG9iL2lzc3Vlcy8yMDVcbiAgICBjYXNlICdFTk9URElSJzogLy8gdG90YWxseSBub3JtYWwuIG1lYW5zIGl0ICpkb2VzKiBleGlzdC5cbiAgICAgIHZhciBhYnMgPSB0aGlzLl9tYWtlQWJzKGYpXG4gICAgICB0aGlzLmNhY2hlW2Fic10gPSAnRklMRSdcbiAgICAgIGlmIChhYnMgPT09IHRoaXMuY3dkQWJzKSB7XG4gICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihlci5jb2RlICsgJyBpbnZhbGlkIGN3ZCAnICsgdGhpcy5jd2QpXG4gICAgICAgIGVycm9yLnBhdGggPSB0aGlzLmN3ZFxuICAgICAgICBlcnJvci5jb2RlID0gZXIuY29kZVxuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyb3IpXG4gICAgICAgIHRoaXMuYWJvcnQoKVxuICAgICAgfVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ0VOT0VOVCc6IC8vIG5vdCB0ZXJyaWJseSB1bnVzdWFsXG4gICAgY2FzZSAnRUxPT1AnOlxuICAgIGNhc2UgJ0VOQU1FVE9PTE9ORyc6XG4gICAgY2FzZSAnVU5LTk9XTic6XG4gICAgICB0aGlzLmNhY2hlW3RoaXMuX21ha2VBYnMoZildID0gZmFsc2VcbiAgICAgIGJyZWFrXG5cbiAgICBkZWZhdWx0OiAvLyBzb21lIHVudXN1YWwgZXJyb3IuICBUcmVhdCBhcyBmYWlsdXJlLlxuICAgICAgdGhpcy5jYWNoZVt0aGlzLl9tYWtlQWJzKGYpXSA9IGZhbHNlXG4gICAgICBpZiAodGhpcy5zdHJpY3QpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVyKVxuICAgICAgICAvLyBJZiB0aGUgZXJyb3IgaXMgaGFuZGxlZCwgdGhlbiB3ZSBhYm9ydFxuICAgICAgICAvLyBpZiBub3QsIHdlIHRocmV3IG91dCBvZiBoZXJlXG4gICAgICAgIHRoaXMuYWJvcnQoKVxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLnNpbGVudClcbiAgICAgICAgY29uc29sZS5lcnJvcignZ2xvYiBlcnJvcicsIGVyKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiBjYigpXG59XG5cbkdsb2IucHJvdG90eXBlLl9wcm9jZXNzR2xvYlN0YXIgPSBmdW5jdGlvbiAocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGNiKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuICB0aGlzLl9yZWFkZGlyKGFicywgaW5HbG9iU3RhciwgZnVuY3Rpb24gKGVyLCBlbnRyaWVzKSB7XG4gICAgc2VsZi5fcHJvY2Vzc0dsb2JTdGFyMihwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3RhciwgZW50cmllcywgY2IpXG4gIH0pXG59XG5cblxuR2xvYi5wcm90b3R5cGUuX3Byb2Nlc3NHbG9iU3RhcjIgPSBmdW5jdGlvbiAocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIsIGVudHJpZXMsIGNiKSB7XG4gIC8vY29uc29sZS5lcnJvcigncGdzMicsIHByZWZpeCwgcmVtYWluWzBdLCBlbnRyaWVzKVxuXG4gIC8vIG5vIGVudHJpZXMgbWVhbnMgbm90IGEgZGlyLCBzbyBpdCBjYW4gbmV2ZXIgaGF2ZSBtYXRjaGVzXG4gIC8vIGZvby50eHQvKiogZG9lc24ndCBtYXRjaCBmb28udHh0XG4gIGlmICghZW50cmllcylcbiAgICByZXR1cm4gY2IoKVxuXG4gIC8vIHRlc3Qgd2l0aG91dCB0aGUgZ2xvYnN0YXIsIGFuZCB3aXRoIGV2ZXJ5IGNoaWxkIGJvdGggYmVsb3dcbiAgLy8gYW5kIHJlcGxhY2luZyB0aGUgZ2xvYnN0YXIuXG4gIHZhciByZW1haW5XaXRob3V0R2xvYlN0YXIgPSByZW1haW4uc2xpY2UoMSlcbiAgdmFyIGdzcHJlZiA9IHByZWZpeCA/IFsgcHJlZml4IF0gOiBbXVxuICB2YXIgbm9HbG9iU3RhciA9IGdzcHJlZi5jb25jYXQocmVtYWluV2l0aG91dEdsb2JTdGFyKVxuXG4gIC8vIHRoZSBub0dsb2JTdGFyIHBhdHRlcm4gZXhpdHMgdGhlIGluR2xvYlN0YXIgc3RhdGVcbiAgdGhpcy5fcHJvY2Vzcyhub0dsb2JTdGFyLCBpbmRleCwgZmFsc2UsIGNiKVxuXG4gIHZhciBpc1N5bSA9IHRoaXMuc3ltbGlua3NbYWJzXVxuICB2YXIgbGVuID0gZW50cmllcy5sZW5ndGhcblxuICAvLyBJZiBpdCdzIGEgc3ltbGluaywgYW5kIHdlJ3JlIGluIGEgZ2xvYnN0YXIsIHRoZW4gc3RvcFxuICBpZiAoaXNTeW0gJiYgaW5HbG9iU3RhcilcbiAgICByZXR1cm4gY2IoKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgZSA9IGVudHJpZXNbaV1cbiAgICBpZiAoZS5jaGFyQXQoMCkgPT09ICcuJyAmJiAhdGhpcy5kb3QpXG4gICAgICBjb250aW51ZVxuXG4gICAgLy8gdGhlc2UgdHdvIGNhc2VzIGVudGVyIHRoZSBpbkdsb2JTdGFyIHN0YXRlXG4gICAgdmFyIGluc3RlYWQgPSBnc3ByZWYuY29uY2F0KGVudHJpZXNbaV0sIHJlbWFpbldpdGhvdXRHbG9iU3RhcilcbiAgICB0aGlzLl9wcm9jZXNzKGluc3RlYWQsIGluZGV4LCB0cnVlLCBjYilcblxuICAgIHZhciBiZWxvdyA9IGdzcHJlZi5jb25jYXQoZW50cmllc1tpXSwgcmVtYWluKVxuICAgIHRoaXMuX3Byb2Nlc3MoYmVsb3csIGluZGV4LCB0cnVlLCBjYilcbiAgfVxuXG4gIGNiKClcbn1cblxuR2xvYi5wcm90b3R5cGUuX3Byb2Nlc3NTaW1wbGUgPSBmdW5jdGlvbiAocHJlZml4LCBpbmRleCwgY2IpIHtcbiAgLy8gWFhYIHJldmlldyB0aGlzLiAgU2hvdWxkbid0IGl0IGJlIGRvaW5nIHRoZSBtb3VudGluZyBldGNcbiAgLy8gYmVmb3JlIGRvaW5nIHN0YXQ/ICBraW5kYSB3ZWlyZD9cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHRoaXMuX3N0YXQocHJlZml4LCBmdW5jdGlvbiAoZXIsIGV4aXN0cykge1xuICAgIHNlbGYuX3Byb2Nlc3NTaW1wbGUyKHByZWZpeCwgaW5kZXgsIGVyLCBleGlzdHMsIGNiKVxuICB9KVxufVxuR2xvYi5wcm90b3R5cGUuX3Byb2Nlc3NTaW1wbGUyID0gZnVuY3Rpb24gKHByZWZpeCwgaW5kZXgsIGVyLCBleGlzdHMsIGNiKSB7XG5cbiAgLy9jb25zb2xlLmVycm9yKCdwczInLCBwcmVmaXgsIGV4aXN0cylcblxuICBpZiAoIXRoaXMubWF0Y2hlc1tpbmRleF0pXG4gICAgdGhpcy5tYXRjaGVzW2luZGV4XSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICAvLyBJZiBpdCBkb2Vzbid0IGV4aXN0LCB0aGVuIGp1c3QgbWFyayB0aGUgbGFjayBvZiByZXN1bHRzXG4gIGlmICghZXhpc3RzKVxuICAgIHJldHVybiBjYigpXG5cbiAgaWYgKHByZWZpeCAmJiBpc0Fic29sdXRlKHByZWZpeCkgJiYgIXRoaXMubm9tb3VudCkge1xuICAgIHZhciB0cmFpbCA9IC9bXFwvXFxcXF0kLy50ZXN0KHByZWZpeClcbiAgICBpZiAocHJlZml4LmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgICBwcmVmaXggPSBwYXRoLmpvaW4odGhpcy5yb290LCBwcmVmaXgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeCA9IHBhdGgucmVzb2x2ZSh0aGlzLnJvb3QsIHByZWZpeClcbiAgICAgIGlmICh0cmFpbClcbiAgICAgICAgcHJlZml4ICs9ICcvJ1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKVxuICAgIHByZWZpeCA9IHByZWZpeC5yZXBsYWNlKC9cXFxcL2csICcvJylcblxuICAvLyBNYXJrIHRoaXMgYXMgYSBtYXRjaFxuICB0aGlzLl9lbWl0TWF0Y2goaW5kZXgsIHByZWZpeClcbiAgY2IoKVxufVxuXG4vLyBSZXR1cm5zIGVpdGhlciAnRElSJywgJ0ZJTEUnLCBvciBmYWxzZVxuR2xvYi5wcm90b3R5cGUuX3N0YXQgPSBmdW5jdGlvbiAoZiwgY2IpIHtcbiAgdmFyIGFicyA9IHRoaXMuX21ha2VBYnMoZilcbiAgdmFyIG5lZWREaXIgPSBmLnNsaWNlKC0xKSA9PT0gJy8nXG5cbiAgaWYgKGYubGVuZ3RoID4gdGhpcy5tYXhMZW5ndGgpXG4gICAgcmV0dXJuIGNiKClcblxuICBpZiAoIXRoaXMuc3RhdCAmJiBvd25Qcm9wKHRoaXMuY2FjaGUsIGFicykpIHtcbiAgICB2YXIgYyA9IHRoaXMuY2FjaGVbYWJzXVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYykpXG4gICAgICBjID0gJ0RJUidcblxuICAgIC8vIEl0IGV4aXN0cywgYnV0IG1heWJlIG5vdCBob3cgd2UgbmVlZCBpdFxuICAgIGlmICghbmVlZERpciB8fCBjID09PSAnRElSJylcbiAgICAgIHJldHVybiBjYihudWxsLCBjKVxuXG4gICAgaWYgKG5lZWREaXIgJiYgYyA9PT0gJ0ZJTEUnKVxuICAgICAgcmV0dXJuIGNiKClcblxuICAgIC8vIG90aGVyd2lzZSB3ZSBoYXZlIHRvIHN0YXQsIGJlY2F1c2UgbWF5YmUgYz10cnVlXG4gICAgLy8gaWYgd2Uga25vdyBpdCBleGlzdHMsIGJ1dCBub3Qgd2hhdCBpdCBpcy5cbiAgfVxuXG4gIHZhciBleGlzdHNcbiAgdmFyIHN0YXQgPSB0aGlzLnN0YXRDYWNoZVthYnNdXG4gIGlmIChzdGF0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoc3RhdCA9PT0gZmFsc2UpXG4gICAgICByZXR1cm4gY2IobnVsbCwgc3RhdClcbiAgICBlbHNlIHtcbiAgICAgIHZhciB0eXBlID0gc3RhdC5pc0RpcmVjdG9yeSgpID8gJ0RJUicgOiAnRklMRSdcbiAgICAgIGlmIChuZWVkRGlyICYmIHR5cGUgPT09ICdGSUxFJylcbiAgICAgICAgcmV0dXJuIGNiKClcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGNiKG51bGwsIHR5cGUsIHN0YXQpXG4gICAgfVxuICB9XG5cbiAgdmFyIHNlbGYgPSB0aGlzXG4gIHZhciBzdGF0Y2IgPSBpbmZsaWdodCgnc3RhdFxcMCcgKyBhYnMsIGxzdGF0Y2JfKVxuICBpZiAoc3RhdGNiKVxuICAgIGZzLmxzdGF0KGFicywgc3RhdGNiKVxuXG4gIGZ1bmN0aW9uIGxzdGF0Y2JfIChlciwgbHN0YXQpIHtcbiAgICBpZiAobHN0YXQgJiYgbHN0YXQuaXNTeW1ib2xpY0xpbmsoKSkge1xuICAgICAgLy8gSWYgaXQncyBhIHN5bWxpbmssIHRoZW4gdHJlYXQgaXQgYXMgdGhlIHRhcmdldCwgdW5sZXNzXG4gICAgICAvLyB0aGUgdGFyZ2V0IGRvZXMgbm90IGV4aXN0LCB0aGVuIHRyZWF0IGl0IGFzIGEgZmlsZS5cbiAgICAgIHJldHVybiBmcy5zdGF0KGFicywgZnVuY3Rpb24gKGVyLCBzdGF0KSB7XG4gICAgICAgIGlmIChlcilcbiAgICAgICAgICBzZWxmLl9zdGF0MihmLCBhYnMsIG51bGwsIGxzdGF0LCBjYilcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHNlbGYuX3N0YXQyKGYsIGFicywgZXIsIHN0YXQsIGNiKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5fc3RhdDIoZiwgYWJzLCBlciwgbHN0YXQsIGNiKVxuICAgIH1cbiAgfVxufVxuXG5HbG9iLnByb3RvdHlwZS5fc3RhdDIgPSBmdW5jdGlvbiAoZiwgYWJzLCBlciwgc3RhdCwgY2IpIHtcbiAgaWYgKGVyKSB7XG4gICAgdGhpcy5zdGF0Q2FjaGVbYWJzXSA9IGZhbHNlXG4gICAgcmV0dXJuIGNiKClcbiAgfVxuXG4gIHZhciBuZWVkRGlyID0gZi5zbGljZSgtMSkgPT09ICcvJ1xuICB0aGlzLnN0YXRDYWNoZVthYnNdID0gc3RhdFxuXG4gIGlmIChhYnMuc2xpY2UoLTEpID09PSAnLycgJiYgIXN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICByZXR1cm4gY2IobnVsbCwgZmFsc2UsIHN0YXQpXG5cbiAgdmFyIGMgPSBzdGF0LmlzRGlyZWN0b3J5KCkgPyAnRElSJyA6ICdGSUxFJ1xuICB0aGlzLmNhY2hlW2Fic10gPSB0aGlzLmNhY2hlW2Fic10gfHwgY1xuXG4gIGlmIChuZWVkRGlyICYmIGMgIT09ICdESVInKVxuICAgIHJldHVybiBjYigpXG5cbiAgcmV0dXJuIGNiKG51bGwsIGMsIHN0YXQpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ2xvYi9nbG9iLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lKGZzKVxuXG5mdW5jdGlvbiBjbG9uZSAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgcmV0dXJuIG9ialxuXG4gIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgdmFyIGNvcHkgPSB7IF9fcHJvdG9fXzogb2JqLl9fcHJvdG9fXyB9XG4gIGVsc2VcbiAgICB2YXIgY29weSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb3B5LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKVxuICB9KVxuXG4gIHJldHVybiBjb3B5XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ3JhY2VmdWwtZnMvZnMuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB3cmFwcHkgPSByZXF1aXJlKCd3cmFwcHknKVxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcHkob25jZSlcbm1vZHVsZS5leHBvcnRzLnN0cmljdCA9IHdyYXBweShvbmNlU3RyaWN0KVxuXG5vbmNlLnByb3RvID0gb25jZShmdW5jdGlvbiAoKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGdW5jdGlvbi5wcm90b3R5cGUsICdvbmNlJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb25jZSh0aGlzKVxuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bmN0aW9uLnByb3RvdHlwZSwgJ29uY2VTdHJpY3QnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvbmNlU3RyaWN0KHRoaXMpXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcbn0pXG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChmLmNhbGxlZCkgcmV0dXJuIGYudmFsdWVcbiAgICBmLmNhbGxlZCA9IHRydWVcbiAgICByZXR1cm4gZi52YWx1ZSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfVxuICBmLmNhbGxlZCA9IGZhbHNlXG4gIHJldHVybiBmXG59XG5cbmZ1bmN0aW9uIG9uY2VTdHJpY3QgKGZuKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChmLmNhbGxlZClcbiAgICAgIHRocm93IG5ldyBFcnJvcihmLm9uY2VFcnJvcilcbiAgICBmLmNhbGxlZCA9IHRydWVcbiAgICByZXR1cm4gZi52YWx1ZSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgfVxuICB2YXIgbmFtZSA9IGZuLm5hbWUgfHwgJ0Z1bmN0aW9uIHdyYXBwZWQgd2l0aCBgb25jZWAnXG4gIGYub25jZUVycm9yID0gbmFtZSArIFwiIHNob3VsZG4ndCBiZSBjYWxsZWQgbW9yZSB0aGFuIG9uY2VcIlxuICBmLmNhbGxlZCA9IGZhbHNlXG4gIHJldHVybiBmXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vb25jZS9vbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJpbXJhZlxucmltcmFmLnN5bmMgPSByaW1yYWZTeW5jXG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKFwiYXNzZXJ0XCIpXG52YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpXG52YXIgZnMgPSByZXF1aXJlKFwiZnNcIilcbnZhciBnbG9iID0gcmVxdWlyZShcImdsb2JcIilcblxudmFyIGRlZmF1bHRHbG9iT3B0cyA9IHtcbiAgbm9zb3J0OiB0cnVlLFxuICBzaWxlbnQ6IHRydWVcbn1cblxuLy8gZm9yIEVNRklMRSBoYW5kbGluZ1xudmFyIHRpbWVvdXQgPSAwXG5cbnZhciBpc1dpbmRvd3MgPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiKVxuXG5mdW5jdGlvbiBkZWZhdWx0cyAob3B0aW9ucykge1xuICB2YXIgbWV0aG9kcyA9IFtcbiAgICAndW5saW5rJyxcbiAgICAnY2htb2QnLFxuICAgICdzdGF0JyxcbiAgICAnbHN0YXQnLFxuICAgICdybWRpcicsXG4gICAgJ3JlYWRkaXInXG4gIF1cbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG0pIHtcbiAgICBvcHRpb25zW21dID0gb3B0aW9uc1ttXSB8fCBmc1ttXVxuICAgIG0gPSBtICsgJ1N5bmMnXG4gICAgb3B0aW9uc1ttXSA9IG9wdGlvbnNbbV0gfHwgZnNbbV1cbiAgfSlcblxuICBvcHRpb25zLm1heEJ1c3lUcmllcyA9IG9wdGlvbnMubWF4QnVzeVRyaWVzIHx8IDNcbiAgb3B0aW9ucy5lbWZpbGVXYWl0ID0gb3B0aW9ucy5lbWZpbGVXYWl0IHx8IDEwMDBcbiAgaWYgKG9wdGlvbnMuZ2xvYiA9PT0gZmFsc2UpIHtcbiAgICBvcHRpb25zLmRpc2FibGVHbG9iID0gdHJ1ZVxuICB9XG4gIG9wdGlvbnMuZGlzYWJsZUdsb2IgPSBvcHRpb25zLmRpc2FibGVHbG9iIHx8IGZhbHNlXG4gIG9wdGlvbnMuZ2xvYiA9IG9wdGlvbnMuZ2xvYiB8fCBkZWZhdWx0R2xvYk9wdHNcbn1cblxuZnVuY3Rpb24gcmltcmFmIChwLCBvcHRpb25zLCBjYikge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIGFzc2VydChwLCAncmltcmFmOiBtaXNzaW5nIHBhdGgnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHAsICdzdHJpbmcnLCAncmltcmFmOiBwYXRoIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdyaW1yYWY6IGNhbGxiYWNrIGZ1bmN0aW9uIHJlcXVpcmVkJylcbiAgYXNzZXJ0KG9wdGlvbnMsICdyaW1yYWY6IGludmFsaWQgb3B0aW9ucyBhcmd1bWVudCBwcm92aWRlZCcpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0aW9ucywgJ29iamVjdCcsICdyaW1yYWY6IG9wdGlvbnMgc2hvdWxkIGJlIG9iamVjdCcpXG5cbiAgZGVmYXVsdHMob3B0aW9ucylcblxuICB2YXIgYnVzeVRyaWVzID0gMFxuICB2YXIgZXJyU3RhdGUgPSBudWxsXG4gIHZhciBuID0gMFxuXG4gIGlmIChvcHRpb25zLmRpc2FibGVHbG9iIHx8ICFnbG9iLmhhc01hZ2ljKHApKVxuICAgIHJldHVybiBhZnRlckdsb2IobnVsbCwgW3BdKVxuXG4gIG9wdGlvbnMubHN0YXQocCwgZnVuY3Rpb24gKGVyLCBzdGF0KSB7XG4gICAgaWYgKCFlcilcbiAgICAgIHJldHVybiBhZnRlckdsb2IobnVsbCwgW3BdKVxuXG4gICAgZ2xvYihwLCBvcHRpb25zLmdsb2IsIGFmdGVyR2xvYilcbiAgfSlcblxuICBmdW5jdGlvbiBuZXh0IChlcikge1xuICAgIGVyclN0YXRlID0gZXJyU3RhdGUgfHwgZXJcbiAgICBpZiAoLS1uID09PSAwKVxuICAgICAgY2IoZXJyU3RhdGUpXG4gIH1cblxuICBmdW5jdGlvbiBhZnRlckdsb2IgKGVyLCByZXN1bHRzKSB7XG4gICAgaWYgKGVyKVxuICAgICAgcmV0dXJuIGNiKGVyKVxuXG4gICAgbiA9IHJlc3VsdHMubGVuZ3RoXG4gICAgaWYgKG4gPT09IDApXG4gICAgICByZXR1cm4gY2IoKVxuXG4gICAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICByaW1yYWZfKHAsIG9wdGlvbnMsIGZ1bmN0aW9uIENCIChlcikge1xuICAgICAgICBpZiAoZXIpIHtcbiAgICAgICAgICBpZiAoKGVyLmNvZGUgPT09IFwiRUJVU1lcIiB8fCBlci5jb2RlID09PSBcIkVOT1RFTVBUWVwiIHx8IGVyLmNvZGUgPT09IFwiRVBFUk1cIikgJiZcbiAgICAgICAgICAgICAgYnVzeVRyaWVzIDwgb3B0aW9ucy5tYXhCdXN5VHJpZXMpIHtcbiAgICAgICAgICAgIGJ1c3lUcmllcyArK1xuICAgICAgICAgICAgdmFyIHRpbWUgPSBidXN5VHJpZXMgKiAxMDBcbiAgICAgICAgICAgIC8vIHRyeSBhZ2Fpbiwgd2l0aCB0aGUgc2FtZSBleGFjdCBjYWxsYmFjayBhcyB0aGlzIG9uZS5cbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmltcmFmXyhwLCBvcHRpb25zLCBDQilcbiAgICAgICAgICAgIH0sIHRpbWUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gdGhpcyBvbmUgd29uJ3QgaGFwcGVuIGlmIGdyYWNlZnVsLWZzIGlzIHVzZWQuXG4gICAgICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRU1GSUxFXCIgJiYgdGltZW91dCA8IG9wdGlvbnMuZW1maWxlV2FpdCkge1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByaW1yYWZfKHAsIG9wdGlvbnMsIENCKVxuICAgICAgICAgICAgfSwgdGltZW91dCArKylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBhbHJlYWR5IGdvbmVcbiAgICAgICAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9FTlRcIikgZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB0aW1lb3V0ID0gMFxuICAgICAgICBuZXh0KGVyKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbi8vIFR3byBwb3NzaWJsZSBzdHJhdGVnaWVzLlxuLy8gMS4gQXNzdW1lIGl0J3MgYSBmaWxlLiAgdW5saW5rIGl0LCB0aGVuIGRvIHRoZSBkaXIgc3R1ZmYgb24gRVBFUk0gb3IgRUlTRElSXG4vLyAyLiBBc3N1bWUgaXQncyBhIGRpcmVjdG9yeS4gIHJlYWRkaXIsIHRoZW4gZG8gdGhlIGZpbGUgc3R1ZmYgb24gRU5PVERJUlxuLy9cbi8vIEJvdGggcmVzdWx0IGluIGFuIGV4dHJhIHN5c2NhbGwgd2hlbiB5b3UgZ3Vlc3Mgd3JvbmcuICBIb3dldmVyLCB0aGVyZVxuLy8gYXJlIGxpa2VseSBmYXIgbW9yZSBub3JtYWwgZmlsZXMgaW4gdGhlIHdvcmxkIHRoYW4gZGlyZWN0b3JpZXMuICBUaGlzXG4vLyBpcyBiYXNlZCBvbiB0aGUgYXNzdW1wdGlvbiB0aGF0IGEgdGhlIGF2ZXJhZ2UgbnVtYmVyIG9mIGZpbGVzIHBlclxuLy8gZGlyZWN0b3J5IGlzID49IDEuXG4vL1xuLy8gSWYgYW55b25lIGV2ZXIgY29tcGxhaW5zIGFib3V0IHRoaXMsIHRoZW4gSSBndWVzcyB0aGUgc3RyYXRlZ3kgY291bGRcbi8vIGJlIG1hZGUgY29uZmlndXJhYmxlIHNvbWVob3cuICBCdXQgdW50aWwgdGhlbiwgWUFHTkkuXG5mdW5jdGlvbiByaW1yYWZfIChwLCBvcHRpb25zLCBjYikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgLy8gc3Vub3MgbGV0cyB0aGUgcm9vdCB1c2VyIHVubGluayBkaXJlY3Rvcmllcywgd2hpY2ggaXMuLi4gd2VpcmQuXG4gIC8vIHNvIHdlIGhhdmUgdG8gbHN0YXQgaGVyZSBhbmQgbWFrZSBzdXJlIGl0J3Mgbm90IGEgZGlyLlxuICBvcHRpb25zLmxzdGF0KHAsIGZ1bmN0aW9uIChlciwgc3QpIHtcbiAgICBpZiAoZXIgJiYgZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgIHJldHVybiBjYihudWxsKVxuXG4gICAgLy8gV2luZG93cyBjYW4gRVBFUk0gb24gc3RhdC4gIExpZmUgaXMgc3VmZmVyaW5nLlxuICAgIGlmIChlciAmJiBlci5jb2RlID09PSBcIkVQRVJNXCIgJiYgaXNXaW5kb3dzKVxuICAgICAgZml4V2luRVBFUk0ocCwgb3B0aW9ucywgZXIsIGNiKVxuXG4gICAgaWYgKHN0ICYmIHN0LmlzRGlyZWN0b3J5KCkpXG4gICAgICByZXR1cm4gcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuXG4gICAgb3B0aW9ucy51bmxpbmsocCwgZnVuY3Rpb24gKGVyKSB7XG4gICAgICBpZiAoZXIpIHtcbiAgICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICAgICAgcmV0dXJuIGNiKG51bGwpXG4gICAgICAgIGlmIChlci5jb2RlID09PSBcIkVQRVJNXCIpXG4gICAgICAgICAgcmV0dXJuIChpc1dpbmRvd3MpXG4gICAgICAgICAgICA/IGZpeFdpbkVQRVJNKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICAgICAgICAgIDogcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICBpZiAoZXIuY29kZSA9PT0gXCJFSVNESVJcIilcbiAgICAgICAgICByZXR1cm4gcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNiKGVyKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZpeFdpbkVQRVJNIChwLCBvcHRpb25zLCBlciwgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICBpZiAoZXIpXG4gICAgYXNzZXJ0KGVyIGluc3RhbmNlb2YgRXJyb3IpXG5cbiAgb3B0aW9ucy5jaG1vZChwLCA2NjYsIGZ1bmN0aW9uIChlcjIpIHtcbiAgICBpZiAoZXIyKVxuICAgICAgY2IoZXIyLmNvZGUgPT09IFwiRU5PRU5UXCIgPyBudWxsIDogZXIpXG4gICAgZWxzZVxuICAgICAgb3B0aW9ucy5zdGF0KHAsIGZ1bmN0aW9uKGVyMywgc3RhdHMpIHtcbiAgICAgICAgaWYgKGVyMylcbiAgICAgICAgICBjYihlcjMuY29kZSA9PT0gXCJFTk9FTlRcIiA/IG51bGwgOiBlcilcbiAgICAgICAgZWxzZSBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSlcbiAgICAgICAgICBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBvcHRpb25zLnVubGluayhwLCBjYilcbiAgICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZpeFdpbkVQRVJNU3luYyAocCwgb3B0aW9ucywgZXIpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAoZXIpXG4gICAgYXNzZXJ0KGVyIGluc3RhbmNlb2YgRXJyb3IpXG5cbiAgdHJ5IHtcbiAgICBvcHRpb25zLmNobW9kU3luYyhwLCA2NjYpXG4gIH0gY2F0Y2ggKGVyMikge1xuICAgIGlmIChlcjIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgIHJldHVyblxuICAgIGVsc2VcbiAgICAgIHRocm93IGVyXG4gIH1cblxuICB0cnkge1xuICAgIHZhciBzdGF0cyA9IG9wdGlvbnMuc3RhdFN5bmMocClcbiAgfSBjYXRjaCAoZXIzKSB7XG4gICAgaWYgKGVyMy5jb2RlID09PSBcIkVOT0VOVFwiKVxuICAgICAgcmV0dXJuXG4gICAgZWxzZVxuICAgICAgdGhyb3cgZXJcbiAgfVxuXG4gIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKVxuICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBlcilcbiAgZWxzZVxuICAgIG9wdGlvbnMudW5saW5rU3luYyhwKVxufVxuXG5mdW5jdGlvbiBybWRpciAocCwgb3B0aW9ucywgb3JpZ2luYWxFciwgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAob3JpZ2luYWxFcilcbiAgICBhc3NlcnQob3JpZ2luYWxFciBpbnN0YW5jZW9mIEVycm9yKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuXG4gIC8vIHRyeSB0byBybWRpciBmaXJzdCwgYW5kIG9ubHkgcmVhZGRpciBvbiBFTk9URU1QVFkgb3IgRUVYSVNUIChTdW5PUylcbiAgLy8gaWYgd2UgZ3Vlc3NlZCB3cm9uZywgYW5kIGl0J3Mgbm90IGEgZGlyZWN0b3J5LCB0aGVuXG4gIC8vIHJhaXNlIHRoZSBvcmlnaW5hbCBlcnJvci5cbiAgb3B0aW9ucy5ybWRpcihwLCBmdW5jdGlvbiAoZXIpIHtcbiAgICBpZiAoZXIgJiYgKGVyLmNvZGUgPT09IFwiRU5PVEVNUFRZXCIgfHwgZXIuY29kZSA9PT0gXCJFRVhJU1RcIiB8fCBlci5jb2RlID09PSBcIkVQRVJNXCIpKVxuICAgICAgcm1raWRzKHAsIG9wdGlvbnMsIGNiKVxuICAgIGVsc2UgaWYgKGVyICYmIGVyLmNvZGUgPT09IFwiRU5PVERJUlwiKVxuICAgICAgY2Iob3JpZ2luYWxFcilcbiAgICBlbHNlXG4gICAgICBjYihlcilcbiAgfSlcbn1cblxuZnVuY3Rpb24gcm1raWRzKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICBvcHRpb25zLnJlYWRkaXIocCwgZnVuY3Rpb24gKGVyLCBmaWxlcykge1xuICAgIGlmIChlcilcbiAgICAgIHJldHVybiBjYihlcilcbiAgICB2YXIgbiA9IGZpbGVzLmxlbmd0aFxuICAgIGlmIChuID09PSAwKVxuICAgICAgcmV0dXJuIG9wdGlvbnMucm1kaXIocCwgY2IpXG4gICAgdmFyIGVyclN0YXRlXG4gICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZikge1xuICAgICAgcmltcmFmKHBhdGguam9pbihwLCBmKSwgb3B0aW9ucywgZnVuY3Rpb24gKGVyKSB7XG4gICAgICAgIGlmIChlcnJTdGF0ZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgaWYgKGVyKVxuICAgICAgICAgIHJldHVybiBjYihlcnJTdGF0ZSA9IGVyKVxuICAgICAgICBpZiAoLS1uID09PSAwKVxuICAgICAgICAgIG9wdGlvbnMucm1kaXIocCwgY2IpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIHRoaXMgbG9va3Mgc2ltcGxlciwgYW5kIGlzIHN0cmljdGx5ICpmYXN0ZXIqLCBidXQgd2lsbFxuLy8gdGllIHVwIHRoZSBKYXZhU2NyaXB0IHRocmVhZCBhbmQgZmFpbCBvbiBleGNlc3NpdmVseVxuLy8gZGVlcCBkaXJlY3RvcnkgdHJlZXMuXG5mdW5jdGlvbiByaW1yYWZTeW5jIChwLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIGRlZmF1bHRzKG9wdGlvbnMpXG5cbiAgYXNzZXJ0KHAsICdyaW1yYWY6IG1pc3NpbmcgcGF0aCcpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgcCwgJ3N0cmluZycsICdyaW1yYWY6IHBhdGggc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0KG9wdGlvbnMsICdyaW1yYWY6IG1pc3Npbmcgb3B0aW9ucycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0aW9ucywgJ29iamVjdCcsICdyaW1yYWY6IG9wdGlvbnMgc2hvdWxkIGJlIG9iamVjdCcpXG5cbiAgdmFyIHJlc3VsdHNcblxuICBpZiAob3B0aW9ucy5kaXNhYmxlR2xvYiB8fCAhZ2xvYi5oYXNNYWdpYyhwKSkge1xuICAgIHJlc3VsdHMgPSBbcF1cbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgb3B0aW9ucy5sc3RhdFN5bmMocClcbiAgICAgIHJlc3VsdHMgPSBbcF1cbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgcmVzdWx0cyA9IGdsb2Iuc3luYyhwLCBvcHRpb25zLmdsb2IpXG4gICAgfVxuICB9XG5cbiAgaWYgKCFyZXN1bHRzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcCA9IHJlc3VsdHNbaV1cblxuICAgIHRyeSB7XG4gICAgICB2YXIgc3QgPSBvcHRpb25zLmxzdGF0U3luYyhwKVxuICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIC8vIFdpbmRvd3MgY2FuIEVQRVJNIG9uIHN0YXQuICBMaWZlIGlzIHN1ZmZlcmluZy5cbiAgICAgIGlmIChlci5jb2RlID09PSBcIkVQRVJNXCIgJiYgaXNXaW5kb3dzKVxuICAgICAgICBmaXhXaW5FUEVSTVN5bmMocCwgb3B0aW9ucywgZXIpXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIHN1bm9zIGxldHMgdGhlIHJvb3QgdXNlciB1bmxpbmsgZGlyZWN0b3JpZXMsIHdoaWNoIGlzLi4uIHdlaXJkLlxuICAgICAgaWYgKHN0ICYmIHN0LmlzRGlyZWN0b3J5KCkpXG4gICAgICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBudWxsKVxuICAgICAgZWxzZVxuICAgICAgICBvcHRpb25zLnVubGlua1N5bmMocClcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICAgIHJldHVyblxuICAgICAgaWYgKGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgICAgcmV0dXJuIGlzV2luZG93cyA/IGZpeFdpbkVQRVJNU3luYyhwLCBvcHRpb25zLCBlcikgOiBybWRpclN5bmMocCwgb3B0aW9ucywgZXIpXG4gICAgICBpZiAoZXIuY29kZSAhPT0gXCJFSVNESVJcIilcbiAgICAgICAgdGhyb3cgZXJcblxuICAgICAgcm1kaXJTeW5jKHAsIG9wdGlvbnMsIGVyKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBybWRpclN5bmMgKHAsIG9wdGlvbnMsIG9yaWdpbmFsRXIpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAob3JpZ2luYWxFcilcbiAgICBhc3NlcnQob3JpZ2luYWxFciBpbnN0YW5jZW9mIEVycm9yKVxuXG4gIHRyeSB7XG4gICAgb3B0aW9ucy5ybWRpclN5bmMocClcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgIHJldHVyblxuICAgIGlmIChlci5jb2RlID09PSBcIkVOT1RESVJcIilcbiAgICAgIHRocm93IG9yaWdpbmFsRXJcbiAgICBpZiAoZXIuY29kZSA9PT0gXCJFTk9URU1QVFlcIiB8fCBlci5jb2RlID09PSBcIkVFWElTVFwiIHx8IGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgIHJta2lkc1N5bmMocCwgb3B0aW9ucylcbiAgfVxufVxuXG5mdW5jdGlvbiBybWtpZHNTeW5jIChwLCBvcHRpb25zKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgb3B0aW9ucy5yZWFkZGlyU3luYyhwKS5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgcmltcmFmU3luYyhwYXRoLmpvaW4ocCwgZiksIG9wdGlvbnMpXG4gIH0pXG5cbiAgLy8gV2Ugb25seSBlbmQgdXAgaGVyZSBvbmNlIHdlIGdvdCBFTk9URU1QVFkgYXQgbGVhc3Qgb25jZSwgYW5kXG4gIC8vIGF0IHRoaXMgcG9pbnQsIHdlIGFyZSBndWFyYW50ZWVkIHRvIGhhdmUgcmVtb3ZlZCBhbGwgdGhlIGtpZHMuXG4gIC8vIFNvLCB3ZSBrbm93IHRoYXQgaXQgd29uJ3QgYmUgRU5PRU5UIG9yIEVOT1RESVIgb3IgYW55dGhpbmcgZWxzZS5cbiAgLy8gdHJ5IHJlYWxseSBoYXJkIHRvIGRlbGV0ZSBzdHVmZiBvbiB3aW5kb3dzLCBiZWNhdXNlIGl0IGhhcyBhXG4gIC8vIFBST0ZPVU5ETFkgYW5ub3lpbmcgaGFiaXQgb2Ygbm90IGNsb3NpbmcgaGFuZGxlcyBwcm9tcHRseSB3aGVuXG4gIC8vIGZpbGVzIGFyZSBkZWxldGVkLCByZXN1bHRpbmcgaW4gc3B1cmlvdXMgRU5PVEVNUFRZIGVycm9ycy5cbiAgdmFyIHJldHJpZXMgPSBpc1dpbmRvd3MgPyAxMDAgOiAxXG4gIHZhciBpID0gMFxuICBkbyB7XG4gICAgdmFyIHRocmV3ID0gdHJ1ZVxuICAgIHRyeSB7XG4gICAgICB2YXIgcmV0ID0gb3B0aW9ucy5ybWRpclN5bmMocCwgb3B0aW9ucylcbiAgICAgIHRocmV3ID0gZmFsc2VcbiAgICAgIHJldHVybiByZXRcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKCsraSA8IHJldHJpZXMgJiYgdGhyZXcpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgfVxuICB9IHdoaWxlICh0cnVlKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JpbXJhZi9yaW1yYWYuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFJldHVybnMgYSB3cmFwcGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHdyYXBwZWQgY2FsbGJhY2tcbi8vIFRoZSB3cmFwcGVyIGZ1bmN0aW9uIHNob3VsZCBkbyBzb21lIHN0dWZmLCBhbmQgcmV0dXJuIGFcbi8vIHByZXN1bWFibHkgZGlmZmVyZW50IGNhbGxiYWNrIGZ1bmN0aW9uLlxuLy8gVGhpcyBtYWtlcyBzdXJlIHRoYXQgb3duIHByb3BlcnRpZXMgYXJlIHJldGFpbmVkLCBzbyB0aGF0XG4vLyBkZWNvcmF0aW9ucyBhbmQgc3VjaCBhcmUgbm90IGxvc3QgYWxvbmcgdGhlIHdheS5cbm1vZHVsZS5leHBvcnRzID0gd3JhcHB5XG5mdW5jdGlvbiB3cmFwcHkgKGZuLCBjYikge1xuICBpZiAoZm4gJiYgY2IpIHJldHVybiB3cmFwcHkoZm4pKGNiKVxuXG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmVlZCB3cmFwcGVyIGZ1bmN0aW9uJylcblxuICBPYmplY3Qua2V5cyhmbikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIHdyYXBwZXJba10gPSBmbltrXVxuICB9KVxuXG4gIHJldHVybiB3cmFwcGVyXG5cbiAgZnVuY3Rpb24gd3JhcHBlcigpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXVxuICAgIH1cbiAgICB2YXIgcmV0ID0gZm4uYXBwbHkodGhpcywgYXJncylcbiAgICB2YXIgY2IgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdXG4gICAgaWYgKHR5cGVvZiByZXQgPT09ICdmdW5jdGlvbicgJiYgcmV0ICE9PSBjYikge1xuICAgICAgT2JqZWN0LmtleXMoY2IpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0W2tdID0gY2Jba11cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiByZXRcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3dyYXBweS93cmFwcHkuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0cmVhbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInN0cmVhbVwiXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCLvu79pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnMtZXh0cmFcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ0RQTGliXHJcbiAqIEBicmllZiBDRFAgYm9pbGVycGxhdGUg55Sf5oiQ5qmf6IO944KS5o+Q5L6b44GZ44KL44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ0RQTGliIHtcclxuICAgIC8qKlxyXG4gICAgICogbWFpbiBjb21tYW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBleGVjdXRlKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKFwicGFja2FnZS5qc29uXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2tcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NkcC1saWIudHMiLCJtb2R1bGUuZXhwb3J0cyA9IGJhbGFuY2VkO1xuZnVuY3Rpb24gYmFsYW5jZWQoYSwgYiwgc3RyKSB7XG4gIGlmIChhIGluc3RhbmNlb2YgUmVnRXhwKSBhID0gbWF5YmVNYXRjaChhLCBzdHIpO1xuICBpZiAoYiBpbnN0YW5jZW9mIFJlZ0V4cCkgYiA9IG1heWJlTWF0Y2goYiwgc3RyKTtcblxuICB2YXIgciA9IHJhbmdlKGEsIGIsIHN0cik7XG5cbiAgcmV0dXJuIHIgJiYge1xuICAgIHN0YXJ0OiByWzBdLFxuICAgIGVuZDogclsxXSxcbiAgICBwcmU6IHN0ci5zbGljZSgwLCByWzBdKSxcbiAgICBib2R5OiBzdHIuc2xpY2UoclswXSArIGEubGVuZ3RoLCByWzFdKSxcbiAgICBwb3N0OiBzdHIuc2xpY2UoclsxXSArIGIubGVuZ3RoKVxuICB9O1xufVxuXG5mdW5jdGlvbiBtYXliZU1hdGNoKHJlZywgc3RyKSB7XG4gIHZhciBtID0gc3RyLm1hdGNoKHJlZyk7XG4gIHJldHVybiBtID8gbVswXSA6IG51bGw7XG59XG5cbmJhbGFuY2VkLnJhbmdlID0gcmFuZ2U7XG5mdW5jdGlvbiByYW5nZShhLCBiLCBzdHIpIHtcbiAgdmFyIGJlZ3MsIGJlZywgbGVmdCwgcmlnaHQsIHJlc3VsdDtcbiAgdmFyIGFpID0gc3RyLmluZGV4T2YoYSk7XG4gIHZhciBiaSA9IHN0ci5pbmRleE9mKGIsIGFpICsgMSk7XG4gIHZhciBpID0gYWk7XG5cbiAgaWYgKGFpID49IDAgJiYgYmkgPiAwKSB7XG4gICAgYmVncyA9IFtdO1xuICAgIGxlZnQgPSBzdHIubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPj0gMCAmJiAhcmVzdWx0KSB7XG4gICAgICBpZiAoaSA9PSBhaSkge1xuICAgICAgICBiZWdzLnB1c2goaSk7XG4gICAgICAgIGFpID0gc3RyLmluZGV4T2YoYSwgaSArIDEpO1xuICAgICAgfSBlbHNlIGlmIChiZWdzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIHJlc3VsdCA9IFsgYmVncy5wb3AoKSwgYmkgXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJlZyA9IGJlZ3MucG9wKCk7XG4gICAgICAgIGlmIChiZWcgPCBsZWZ0KSB7XG4gICAgICAgICAgbGVmdCA9IGJlZztcbiAgICAgICAgICByaWdodCA9IGJpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmkgPSBzdHIuaW5kZXhPZihiLCBpICsgMSk7XG4gICAgICB9XG5cbiAgICAgIGkgPSBhaSA8IGJpICYmIGFpID49IDAgPyBhaSA6IGJpO1xuICAgIH1cblxuICAgIGlmIChiZWdzLmxlbmd0aCkge1xuICAgICAgcmVzdWx0ID0gWyBsZWZ0LCByaWdodCBdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFsYW5jZWQtbWF0Y2gvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb25jYXRNYXAgPSByZXF1aXJlKCdjb25jYXQtbWFwJyk7XG52YXIgYmFsYW5jZWQgPSByZXF1aXJlKCdiYWxhbmNlZC1tYXRjaCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cGFuZFRvcDtcblxudmFyIGVzY1NsYXNoID0gJ1xcMFNMQVNIJytNYXRoLnJhbmRvbSgpKydcXDAnO1xudmFyIGVzY09wZW4gPSAnXFwwT1BFTicrTWF0aC5yYW5kb20oKSsnXFwwJztcbnZhciBlc2NDbG9zZSA9ICdcXDBDTE9TRScrTWF0aC5yYW5kb20oKSsnXFwwJztcbnZhciBlc2NDb21tYSA9ICdcXDBDT01NQScrTWF0aC5yYW5kb20oKSsnXFwwJztcbnZhciBlc2NQZXJpb2QgPSAnXFwwUEVSSU9EJytNYXRoLnJhbmRvbSgpKydcXDAnO1xuXG5mdW5jdGlvbiBudW1lcmljKHN0cikge1xuICByZXR1cm4gcGFyc2VJbnQoc3RyLCAxMCkgPT0gc3RyXG4gICAgPyBwYXJzZUludChzdHIsIDEwKVxuICAgIDogc3RyLmNoYXJDb2RlQXQoMCk7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZUJyYWNlcyhzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdCgnXFxcXFxcXFwnKS5qb2luKGVzY1NsYXNoKVxuICAgICAgICAgICAgLnNwbGl0KCdcXFxceycpLmpvaW4oZXNjT3BlbilcbiAgICAgICAgICAgIC5zcGxpdCgnXFxcXH0nKS5qb2luKGVzY0Nsb3NlKVxuICAgICAgICAgICAgLnNwbGl0KCdcXFxcLCcpLmpvaW4oZXNjQ29tbWEpXG4gICAgICAgICAgICAuc3BsaXQoJ1xcXFwuJykuam9pbihlc2NQZXJpb2QpO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZUJyYWNlcyhzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdChlc2NTbGFzaCkuam9pbignXFxcXCcpXG4gICAgICAgICAgICAuc3BsaXQoZXNjT3Blbikuam9pbigneycpXG4gICAgICAgICAgICAuc3BsaXQoZXNjQ2xvc2UpLmpvaW4oJ30nKVxuICAgICAgICAgICAgLnNwbGl0KGVzY0NvbW1hKS5qb2luKCcsJylcbiAgICAgICAgICAgIC5zcGxpdChlc2NQZXJpb2QpLmpvaW4oJy4nKTtcbn1cblxuXG4vLyBCYXNpY2FsbHkganVzdCBzdHIuc3BsaXQoXCIsXCIpLCBidXQgaGFuZGxpbmcgY2FzZXNcbi8vIHdoZXJlIHdlIGhhdmUgbmVzdGVkIGJyYWNlZCBzZWN0aW9ucywgd2hpY2ggc2hvdWxkIGJlXG4vLyB0cmVhdGVkIGFzIGluZGl2aWR1YWwgbWVtYmVycywgbGlrZSB7YSx7YixjfSxkfVxuZnVuY3Rpb24gcGFyc2VDb21tYVBhcnRzKHN0cikge1xuICBpZiAoIXN0cilcbiAgICByZXR1cm4gWycnXTtcblxuICB2YXIgcGFydHMgPSBbXTtcbiAgdmFyIG0gPSBiYWxhbmNlZCgneycsICd9Jywgc3RyKTtcblxuICBpZiAoIW0pXG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnLCcpO1xuXG4gIHZhciBwcmUgPSBtLnByZTtcbiAgdmFyIGJvZHkgPSBtLmJvZHk7XG4gIHZhciBwb3N0ID0gbS5wb3N0O1xuICB2YXIgcCA9IHByZS5zcGxpdCgnLCcpO1xuXG4gIHBbcC5sZW5ndGgtMV0gKz0gJ3snICsgYm9keSArICd9JztcbiAgdmFyIHBvc3RQYXJ0cyA9IHBhcnNlQ29tbWFQYXJ0cyhwb3N0KTtcbiAgaWYgKHBvc3QubGVuZ3RoKSB7XG4gICAgcFtwLmxlbmd0aC0xXSArPSBwb3N0UGFydHMuc2hpZnQoKTtcbiAgICBwLnB1c2guYXBwbHkocCwgcG9zdFBhcnRzKTtcbiAgfVxuXG4gIHBhcnRzLnB1c2guYXBwbHkocGFydHMsIHApO1xuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuZnVuY3Rpb24gZXhwYW5kVG9wKHN0cikge1xuICBpZiAoIXN0cilcbiAgICByZXR1cm4gW107XG5cbiAgLy8gSSBkb24ndCBrbm93IHdoeSBCYXNoIDQuMyBkb2VzIHRoaXMsIGJ1dCBpdCBkb2VzLlxuICAvLyBBbnl0aGluZyBzdGFydGluZyB3aXRoIHt9IHdpbGwgaGF2ZSB0aGUgZmlyc3QgdHdvIGJ5dGVzIHByZXNlcnZlZFxuICAvLyBidXQgKm9ubHkqIGF0IHRoZSB0b3AgbGV2ZWwsIHNvIHt9LGF9YiB3aWxsIG5vdCBleHBhbmQgdG8gYW55dGhpbmcsXG4gIC8vIGJ1dCBhe30sYn1jIHdpbGwgYmUgZXhwYW5kZWQgdG8gW2F9YyxhYmNdLlxuICAvLyBPbmUgY291bGQgYXJndWUgdGhhdCB0aGlzIGlzIGEgYnVnIGluIEJhc2gsIGJ1dCBzaW5jZSB0aGUgZ29hbCBvZlxuICAvLyB0aGlzIG1vZHVsZSBpcyB0byBtYXRjaCBCYXNoJ3MgcnVsZXMsIHdlIGVzY2FwZSBhIGxlYWRpbmcge31cbiAgaWYgKHN0ci5zdWJzdHIoMCwgMikgPT09ICd7fScpIHtcbiAgICBzdHIgPSAnXFxcXHtcXFxcfScgKyBzdHIuc3Vic3RyKDIpO1xuICB9XG5cbiAgcmV0dXJuIGV4cGFuZChlc2NhcGVCcmFjZXMoc3RyKSwgdHJ1ZSkubWFwKHVuZXNjYXBlQnJhY2VzKTtcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHkoZSkge1xuICByZXR1cm4gZTtcbn1cblxuZnVuY3Rpb24gZW1icmFjZShzdHIpIHtcbiAgcmV0dXJuICd7JyArIHN0ciArICd9Jztcbn1cbmZ1bmN0aW9uIGlzUGFkZGVkKGVsKSB7XG4gIHJldHVybiAvXi0/MFxcZC8udGVzdChlbCk7XG59XG5cbmZ1bmN0aW9uIGx0ZShpLCB5KSB7XG4gIHJldHVybiBpIDw9IHk7XG59XG5mdW5jdGlvbiBndGUoaSwgeSkge1xuICByZXR1cm4gaSA+PSB5O1xufVxuXG5mdW5jdGlvbiBleHBhbmQoc3RyLCBpc1RvcCkge1xuICB2YXIgZXhwYW5zaW9ucyA9IFtdO1xuXG4gIHZhciBtID0gYmFsYW5jZWQoJ3snLCAnfScsIHN0cik7XG4gIGlmICghbSB8fCAvXFwkJC8udGVzdChtLnByZSkpIHJldHVybiBbc3RyXTtcblxuICB2YXIgaXNOdW1lcmljU2VxdWVuY2UgPSAvXi0/XFxkK1xcLlxcLi0/XFxkKyg/OlxcLlxcLi0/XFxkKyk/JC8udGVzdChtLmJvZHkpO1xuICB2YXIgaXNBbHBoYVNlcXVlbmNlID0gL15bYS16QS1aXVxcLlxcLlthLXpBLVpdKD86XFwuXFwuLT9cXGQrKT8kLy50ZXN0KG0uYm9keSk7XG4gIHZhciBpc1NlcXVlbmNlID0gaXNOdW1lcmljU2VxdWVuY2UgfHwgaXNBbHBoYVNlcXVlbmNlO1xuICB2YXIgaXNPcHRpb25zID0gbS5ib2R5LmluZGV4T2YoJywnKSA+PSAwO1xuICBpZiAoIWlzU2VxdWVuY2UgJiYgIWlzT3B0aW9ucykge1xuICAgIC8vIHthfSxifVxuICAgIGlmIChtLnBvc3QubWF0Y2goLywuKlxcfS8pKSB7XG4gICAgICBzdHIgPSBtLnByZSArICd7JyArIG0uYm9keSArIGVzY0Nsb3NlICsgbS5wb3N0O1xuICAgICAgcmV0dXJuIGV4cGFuZChzdHIpO1xuICAgIH1cbiAgICByZXR1cm4gW3N0cl07XG4gIH1cblxuICB2YXIgbjtcbiAgaWYgKGlzU2VxdWVuY2UpIHtcbiAgICBuID0gbS5ib2R5LnNwbGl0KC9cXC5cXC4vKTtcbiAgfSBlbHNlIHtcbiAgICBuID0gcGFyc2VDb21tYVBhcnRzKG0uYm9keSk7XG4gICAgaWYgKG4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyB4e3thLGJ9fXkgPT0+IHh7YX15IHh7Yn15XG4gICAgICBuID0gZXhwYW5kKG5bMF0sIGZhbHNlKS5tYXAoZW1icmFjZSk7XG4gICAgICBpZiAobi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdmFyIHBvc3QgPSBtLnBvc3QubGVuZ3RoXG4gICAgICAgICAgPyBleHBhbmQobS5wb3N0LCBmYWxzZSlcbiAgICAgICAgICA6IFsnJ107XG4gICAgICAgIHJldHVybiBwb3N0Lm1hcChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgcmV0dXJuIG0ucHJlICsgblswXSArIHA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGF0IHRoaXMgcG9pbnQsIG4gaXMgdGhlIHBhcnRzLCBhbmQgd2Uga25vdyBpdCdzIG5vdCBhIGNvbW1hIHNldFxuICAvLyB3aXRoIGEgc2luZ2xlIGVudHJ5LlxuXG4gIC8vIG5vIG5lZWQgdG8gZXhwYW5kIHByZSwgc2luY2UgaXQgaXMgZ3VhcmFudGVlZCB0byBiZSBmcmVlIG9mIGJyYWNlLXNldHNcbiAgdmFyIHByZSA9IG0ucHJlO1xuICB2YXIgcG9zdCA9IG0ucG9zdC5sZW5ndGhcbiAgICA/IGV4cGFuZChtLnBvc3QsIGZhbHNlKVxuICAgIDogWycnXTtcblxuICB2YXIgTjtcblxuICBpZiAoaXNTZXF1ZW5jZSkge1xuICAgIHZhciB4ID0gbnVtZXJpYyhuWzBdKTtcbiAgICB2YXIgeSA9IG51bWVyaWMoblsxXSk7XG4gICAgdmFyIHdpZHRoID0gTWF0aC5tYXgoblswXS5sZW5ndGgsIG5bMV0ubGVuZ3RoKVxuICAgIHZhciBpbmNyID0gbi5sZW5ndGggPT0gM1xuICAgICAgPyBNYXRoLmFicyhudW1lcmljKG5bMl0pKVxuICAgICAgOiAxO1xuICAgIHZhciB0ZXN0ID0gbHRlO1xuICAgIHZhciByZXZlcnNlID0geSA8IHg7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIGluY3IgKj0gLTE7XG4gICAgICB0ZXN0ID0gZ3RlO1xuICAgIH1cbiAgICB2YXIgcGFkID0gbi5zb21lKGlzUGFkZGVkKTtcblxuICAgIE4gPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSB4OyB0ZXN0KGksIHkpOyBpICs9IGluY3IpIHtcbiAgICAgIHZhciBjO1xuICAgICAgaWYgKGlzQWxwaGFTZXF1ZW5jZSkge1xuICAgICAgICBjID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbiAgICAgICAgaWYgKGMgPT09ICdcXFxcJylcbiAgICAgICAgICBjID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjID0gU3RyaW5nKGkpO1xuICAgICAgICBpZiAocGFkKSB7XG4gICAgICAgICAgdmFyIG5lZWQgPSB3aWR0aCAtIGMubGVuZ3RoO1xuICAgICAgICAgIGlmIChuZWVkID4gMCkge1xuICAgICAgICAgICAgdmFyIHogPSBuZXcgQXJyYXkobmVlZCArIDEpLmpvaW4oJzAnKTtcbiAgICAgICAgICAgIGlmIChpIDwgMClcbiAgICAgICAgICAgICAgYyA9ICctJyArIHogKyBjLnNsaWNlKDEpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjID0geiArIGM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBOLnB1c2goYyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIE4gPSBjb25jYXRNYXAobiwgZnVuY3Rpb24oZWwpIHsgcmV0dXJuIGV4cGFuZChlbCwgZmFsc2UpIH0pO1xuICB9XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBOLmxlbmd0aDsgaisrKSB7XG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBwb3N0Lmxlbmd0aDsgaysrKSB7XG4gICAgICB2YXIgZXhwYW5zaW9uID0gcHJlICsgTltqXSArIHBvc3Rba107XG4gICAgICBpZiAoIWlzVG9wIHx8IGlzU2VxdWVuY2UgfHwgZXhwYW5zaW9uKVxuICAgICAgICBleHBhbnNpb25zLnB1c2goZXhwYW5zaW9uKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZXhwYW5zaW9ucztcbn1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JyYWNlLWV4cGFuc2lvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoeHMsIGZuKSB7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHggPSBmbih4c1tpXSwgaSk7XG4gICAgICAgIGlmIChpc0FycmF5KHgpKSByZXMucHVzaC5hcHBseShyZXMsIHgpO1xuICAgICAgICBlbHNlIHJlcy5wdXNoKHgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb25jYXQtbWFwL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5cbnZhciBCVUZfTEVOR1RIID0gNjQgKiAxMDI0XG52YXIgX2J1ZmYgPSBuZXcgQnVmZmVyKEJVRl9MRU5HVEgpXG5cbmZ1bmN0aW9uIGNvcHlGaWxlU3luYyAoc3JjRmlsZSwgZGVzdEZpbGUsIG9wdGlvbnMpIHtcbiAgdmFyIGNsb2JiZXIgPSBvcHRpb25zLmNsb2JiZXJcbiAgdmFyIHByZXNlcnZlVGltZXN0YW1wcyA9IG9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzXG5cbiAgaWYgKGZzLmV4aXN0c1N5bmMoZGVzdEZpbGUpKSB7XG4gICAgaWYgKGNsb2JiZXIpIHtcbiAgICAgIGZzLmNobW9kU3luYyhkZXN0RmlsZSwgcGFyc2VJbnQoJzc3NycsIDgpKVxuICAgICAgZnMudW5saW5rU3luYyhkZXN0RmlsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ0VFWElTVCcpXG4gICAgfVxuICB9XG5cbiAgdmFyIGZkciA9IGZzLm9wZW5TeW5jKHNyY0ZpbGUsICdyJylcbiAgdmFyIHN0YXQgPSBmcy5mc3RhdFN5bmMoZmRyKVxuICB2YXIgZmR3ID0gZnMub3BlblN5bmMoZGVzdEZpbGUsICd3Jywgc3RhdC5tb2RlKVxuICB2YXIgYnl0ZXNSZWFkID0gMVxuICB2YXIgcG9zID0gMFxuXG4gIHdoaWxlIChieXRlc1JlYWQgPiAwKSB7XG4gICAgYnl0ZXNSZWFkID0gZnMucmVhZFN5bmMoZmRyLCBfYnVmZiwgMCwgQlVGX0xFTkdUSCwgcG9zKVxuICAgIGZzLndyaXRlU3luYyhmZHcsIF9idWZmLCAwLCBieXRlc1JlYWQpXG4gICAgcG9zICs9IGJ5dGVzUmVhZFxuICB9XG5cbiAgaWYgKHByZXNlcnZlVGltZXN0YW1wcykge1xuICAgIGZzLmZ1dGltZXNTeW5jKGZkdywgc3RhdC5hdGltZSwgc3RhdC5tdGltZSlcbiAgfVxuXG4gIGZzLmNsb3NlU3luYyhmZHIpXG4gIGZzLmNsb3NlU3luYyhmZHcpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weUZpbGVTeW5jXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2NvcHktc3luYy9jb3B5LWZpbGUtc3luYy5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBjb3B5RmlsZVN5bmMgPSByZXF1aXJlKCcuL2NvcHktZmlsZS1zeW5jJylcbnZhciBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5cbmZ1bmN0aW9uIGNvcHlTeW5jIChzcmMsIGRlc3QsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nIHx8IG9wdGlvbnMgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICBvcHRpb25zID0ge2ZpbHRlcjogb3B0aW9uc31cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIG9wdGlvbnMucmVjdXJzaXZlID0gISFvcHRpb25zLnJlY3Vyc2l2ZVxuXG4gIC8vIGRlZmF1bHQgdG8gdHJ1ZSBmb3Igbm93XG4gIG9wdGlvbnMuY2xvYmJlciA9ICdjbG9iYmVyJyBpbiBvcHRpb25zID8gISFvcHRpb25zLmNsb2JiZXIgOiB0cnVlXG4gIG9wdGlvbnMuZGVyZWZlcmVuY2UgPSAnZGVyZWZlcmVuY2UnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMuZGVyZWZlcmVuY2UgOiBmYWxzZVxuICBvcHRpb25zLnByZXNlcnZlVGltZXN0YW1wcyA9ICdwcmVzZXJ2ZVRpbWVzdGFtcHMnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzIDogZmFsc2VcblxuICBvcHRpb25zLmZpbHRlciA9IG9wdGlvbnMuZmlsdGVyIHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWUgfVxuXG4gIHZhciBzdGF0cyA9IChvcHRpb25zLnJlY3Vyc2l2ZSAmJiAhb3B0aW9ucy5kZXJlZmVyZW5jZSkgPyBmcy5sc3RhdFN5bmMoc3JjKSA6IGZzLnN0YXRTeW5jKHNyYylcbiAgdmFyIGRlc3RGb2xkZXIgPSBwYXRoLmRpcm5hbWUoZGVzdClcbiAgdmFyIGRlc3RGb2xkZXJFeGlzdHMgPSBmcy5leGlzdHNTeW5jKGRlc3RGb2xkZXIpXG4gIHZhciBwZXJmb3JtQ29weSA9IGZhbHNlXG5cbiAgaWYgKHN0YXRzLmlzRmlsZSgpKSB7XG4gICAgaWYgKG9wdGlvbnMuZmlsdGVyIGluc3RhbmNlb2YgUmVnRXhwKSBwZXJmb3JtQ29weSA9IG9wdGlvbnMuZmlsdGVyLnRlc3Qoc3JjKVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykgcGVyZm9ybUNvcHkgPSBvcHRpb25zLmZpbHRlcihzcmMpXG5cbiAgICBpZiAocGVyZm9ybUNvcHkpIHtcbiAgICAgIGlmICghZGVzdEZvbGRlckV4aXN0cykgbWtkaXIubWtkaXJzU3luYyhkZXN0Rm9sZGVyKVxuICAgICAgY29weUZpbGVTeW5jKHNyYywgZGVzdCwge2Nsb2JiZXI6IG9wdGlvbnMuY2xvYmJlciwgcHJlc2VydmVUaW1lc3RhbXBzOiBvcHRpb25zLnByZXNlcnZlVGltZXN0YW1wc30pXG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGVzdCkpIG1rZGlyLm1rZGlyc1N5bmMoZGVzdClcbiAgICB2YXIgY29udGVudHMgPSBmcy5yZWFkZGlyU3luYyhzcmMpXG4gICAgY29udGVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgdmFyIG9wdHMgPSBvcHRpb25zXG4gICAgICBvcHRzLnJlY3Vyc2l2ZSA9IHRydWVcbiAgICAgIGNvcHlTeW5jKHBhdGguam9pbihzcmMsIGNvbnRlbnQpLCBwYXRoLmpvaW4oZGVzdCwgY29udGVudCksIG9wdHMpXG4gICAgfSlcbiAgfSBlbHNlIGlmIChvcHRpb25zLnJlY3Vyc2l2ZSAmJiBzdGF0cy5pc1N5bWJvbGljTGluaygpKSB7XG4gICAgdmFyIHNyY1BhdGggPSBmcy5yZWFkbGlua1N5bmMoc3JjKVxuICAgIGZzLnN5bWxpbmtTeW5jKHNyY1BhdGgsIGRlc3QpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5U3luY1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9jb3B5LXN5bmMvY29weS1zeW5jLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29weVN5bmM6IHJlcXVpcmUoJy4vY29weS1zeW5jJylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvY29weS1zeW5jL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIG5jcCA9IHJlcXVpcmUoJy4vbmNwJylcbnZhciBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5cbmZ1bmN0aW9uIGNvcHkgKHNyYywgZGVzdCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nICYmICFjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nIHx8IG9wdGlvbnMgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICBvcHRpb25zID0ge2ZpbHRlcjogb3B0aW9uc31cbiAgfVxuICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgLy8gZG9uJ3QgYWxsb3cgc3JjIGFuZCBkZXN0IHRvIGJlIHRoZSBzYW1lXG4gIHZhciBiYXNlUGF0aCA9IHByb2Nlc3MuY3dkKClcbiAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCBzcmMpXG4gIHZhciB0YXJnZXRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCBkZXN0KVxuICBpZiAoY3VycmVudFBhdGggPT09IHRhcmdldFBhdGgpIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoJ1NvdXJjZSBhbmQgZGVzdGluYXRpb24gbXVzdCBub3QgYmUgdGhlIHNhbWUuJykpXG5cbiAgZnMubHN0YXQoc3JjLCBmdW5jdGlvbiAoZXJyLCBzdGF0cykge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG5cbiAgICB2YXIgZGlyID0gbnVsbFxuICAgIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICB2YXIgcGFydHMgPSBkZXN0LnNwbGl0KHBhdGguc2VwKVxuICAgICAgcGFydHMucG9wKClcbiAgICAgIGRpciA9IHBhcnRzLmpvaW4ocGF0aC5zZXApXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpciA9IHBhdGguZGlybmFtZShkZXN0KVxuICAgIH1cblxuICAgIGZzLmV4aXN0cyhkaXIsIGZ1bmN0aW9uIChkaXJFeGlzdHMpIHtcbiAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBuY3Aoc3JjLCBkZXN0LCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgIG1rZGlyLm1rZGlycyhkaXIsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgbmNwKHNyYywgZGVzdCwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L2NvcHkuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjb3B5OiByZXF1aXJlKCcuL2NvcHknKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZnMgPSByZXF1aXJlKCdmcycpXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbnZhciByZW1vdmUgPSByZXF1aXJlKCcuLi9yZW1vdmUnKVxuXG5mdW5jdGlvbiBlbXB0eURpciAoZGlyLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9XG4gIGZzLnJlYWRkaXIoZGlyLCBmdW5jdGlvbiAoZXJyLCBpdGVtcykge1xuICAgIGlmIChlcnIpIHJldHVybiBta2Rpci5ta2RpcnMoZGlyLCBjYWxsYmFjaylcblxuICAgIGl0ZW1zID0gaXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gcGF0aC5qb2luKGRpciwgaXRlbSlcbiAgICB9KVxuXG4gICAgZGVsZXRlSXRlbSgpXG5cbiAgICBmdW5jdGlvbiBkZWxldGVJdGVtICgpIHtcbiAgICAgIHZhciBpdGVtID0gaXRlbXMucG9wKClcbiAgICAgIGlmICghaXRlbSkgcmV0dXJuIGNhbGxiYWNrKClcbiAgICAgIHJlbW92ZS5yZW1vdmUoaXRlbSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBkZWxldGVJdGVtKClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBlbXB0eURpclN5bmMgKGRpcikge1xuICB2YXIgaXRlbXNcbiAgdHJ5IHtcbiAgICBpdGVtcyA9IGZzLnJlYWRkaXJTeW5jKGRpcilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIG1rZGlyLm1rZGlyc1N5bmMoZGlyKVxuICB9XG5cbiAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgIGl0ZW0gPSBwYXRoLmpvaW4oZGlyLCBpdGVtKVxuICAgIHJlbW92ZS5yZW1vdmVTeW5jKGl0ZW0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbXB0eURpclN5bmM6IGVtcHR5RGlyU3luYyxcbiAgZW1wdHlkaXJTeW5jOiBlbXB0eURpclN5bmMsXG4gIGVtcHR5RGlyOiBlbXB0eURpcixcbiAgZW1wdHlkaXI6IGVtcHR5RGlyXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2VtcHR5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxudmFyIG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcblxuZnVuY3Rpb24gY3JlYXRlRmlsZSAoZmlsZSwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gbWFrZUZpbGUgKCkge1xuICAgIGZzLndyaXRlRmlsZShmaWxlLCAnJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9KVxuICB9XG5cbiAgZnMuZXhpc3RzKGZpbGUsIGZ1bmN0aW9uIChmaWxlRXhpc3RzKSB7XG4gICAgaWYgKGZpbGVFeGlzdHMpIHJldHVybiBjYWxsYmFjaygpXG4gICAgdmFyIGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuICAgIGZzLmV4aXN0cyhkaXIsIGZ1bmN0aW9uIChkaXJFeGlzdHMpIHtcbiAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBtYWtlRmlsZSgpXG4gICAgICBta2Rpci5ta2RpcnMoZGlyLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIG1ha2VGaWxlKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmlsZVN5bmMgKGZpbGUpIHtcbiAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZSkpIHJldHVyblxuXG4gIHZhciBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSlcbiAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICBta2Rpci5ta2RpcnNTeW5jKGRpcilcbiAgfVxuXG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZSwgJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVGaWxlOiBjcmVhdGVGaWxlLFxuICBjcmVhdGVGaWxlU3luYzogY3JlYXRlRmlsZVN5bmMsXG4gIC8vIGFsaWFzXG4gIGVuc3VyZUZpbGU6IGNyZWF0ZUZpbGUsXG4gIGVuc3VyZUZpbGVTeW5jOiBjcmVhdGVGaWxlU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvZmlsZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGZpbGUgPSByZXF1aXJlKCcuL2ZpbGUnKVxudmFyIGxpbmsgPSByZXF1aXJlKCcuL2xpbmsnKVxudmFyIHN5bWxpbmsgPSByZXF1aXJlKCcuL3N5bWxpbmsnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gZmlsZVxuICBjcmVhdGVGaWxlOiBmaWxlLmNyZWF0ZUZpbGUsXG4gIGNyZWF0ZUZpbGVTeW5jOiBmaWxlLmNyZWF0ZUZpbGVTeW5jLFxuICBlbnN1cmVGaWxlOiBmaWxlLmNyZWF0ZUZpbGUsXG4gIGVuc3VyZUZpbGVTeW5jOiBmaWxlLmNyZWF0ZUZpbGVTeW5jLFxuICAvLyBsaW5rXG4gIGNyZWF0ZUxpbms6IGxpbmsuY3JlYXRlTGluayxcbiAgY3JlYXRlTGlua1N5bmM6IGxpbmsuY3JlYXRlTGlua1N5bmMsXG4gIGVuc3VyZUxpbms6IGxpbmsuY3JlYXRlTGluayxcbiAgZW5zdXJlTGlua1N5bmM6IGxpbmsuY3JlYXRlTGlua1N5bmMsXG4gIC8vIHN5bWxpbmtcbiAgY3JlYXRlU3ltbGluazogc3ltbGluay5jcmVhdGVTeW1saW5rLFxuICBjcmVhdGVTeW1saW5rU3luYzogc3ltbGluay5jcmVhdGVTeW1saW5rU3luYyxcbiAgZW5zdXJlU3ltbGluazogc3ltbGluay5jcmVhdGVTeW1saW5rLFxuICBlbnN1cmVTeW1saW5rU3luYzogc3ltbGluay5jcmVhdGVTeW1saW5rU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG52YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG52YXIgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rIChzcmNwYXRoLCBkc3RwYXRoLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBtYWtlTGluayAoc3JjcGF0aCwgZHN0cGF0aCkge1xuICAgIGZzLmxpbmsoc3JjcGF0aCwgZHN0cGF0aCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgfSlcbiAgfVxuXG4gIGZzLmV4aXN0cyhkc3RwYXRoLCBmdW5jdGlvbiAoZGVzdGluYXRpb25FeGlzdHMpIHtcbiAgICBpZiAoZGVzdGluYXRpb25FeGlzdHMpIHJldHVybiBjYWxsYmFjayhudWxsKVxuICAgIGZzLmxzdGF0KHNyY3BhdGgsIGZ1bmN0aW9uIChlcnIsIHN0YXQpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVMaW5rJylcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIH1cblxuICAgICAgdmFyIGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICAgICAgZnMuZXhpc3RzKGRpciwgZnVuY3Rpb24gKGRpckV4aXN0cykge1xuICAgICAgICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gbWFrZUxpbmsoc3JjcGF0aCwgZHN0cGF0aClcbiAgICAgICAgbWtkaXIubWtkaXJzKGRpciwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgbWFrZUxpbmsoc3JjcGF0aCwgZHN0cGF0aClcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua1N5bmMgKHNyY3BhdGgsIGRzdHBhdGgsIGNhbGxiYWNrKSB7XG4gIHZhciBkZXN0aW5hdGlvbkV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZHN0cGF0aClcbiAgaWYgKGRlc3RpbmF0aW9uRXhpc3RzKSByZXR1cm4gdW5kZWZpbmVkXG5cbiAgdHJ5IHtcbiAgICBmcy5sc3RhdFN5bmMoc3JjcGF0aClcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVMaW5rJylcbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIHZhciBkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgdmFyIGRpckV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZGlyKVxuICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gZnMubGlua1N5bmMoc3JjcGF0aCwgZHN0cGF0aClcbiAgbWtkaXIubWtkaXJzU3luYyhkaXIpXG5cbiAgcmV0dXJuIGZzLmxpbmtTeW5jKHNyY3BhdGgsIGRzdHBhdGgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVMaW5rOiBjcmVhdGVMaW5rLFxuICBjcmVhdGVMaW5rU3luYzogY3JlYXRlTGlua1N5bmMsXG4gIC8vIGFsaWFzXG4gIGVuc3VyZUxpbms6IGNyZWF0ZUxpbmssXG4gIGVuc3VyZUxpbmtTeW5jOiBjcmVhdGVMaW5rU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvbGluay5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbi8vIHBhdGguaXNBYnNvbHV0ZSBzaGltIGZvciBOb2RlLmpzIDAuMTAgc3VwcG9ydFxucGF0aC5pc0Fic29sdXRlID0gKHBhdGguaXNBYnNvbHV0ZSkgPyBwYXRoLmlzQWJzb2x1dGUgOiByZXF1aXJlKCdwYXRoLWlzLWFic29sdXRlJylcbnZhciBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgdHdvIHR5cGVzIG9mIHBhdGhzLCBvbmUgcmVsYXRpdmUgdG8gc3ltbGluaywgYW5kIG9uZVxuICogcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuIENoZWNrcyBpZiBwYXRoIGlzIGFic29sdXRlIG9yXG4gKiByZWxhdGl2ZS4gSWYgdGhlIHBhdGggaXMgcmVsYXRpdmUsIHRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSBwYXRoIGlzXG4gKiByZWxhdGl2ZSB0byBzeW1saW5rIG9yIHJlbGF0aXZlIHRvIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnkuIFRoaXMgaXMgYW5cbiAqIGluaXRpYXRpdmUgdG8gZmluZCBhIHNtYXJ0ZXIgYHNyY3BhdGhgIHRvIHN1cHBseSB3aGVuIGJ1aWxkaW5nIHN5bWxpbmtzLlxuICogVGhpcyBhbGxvd3MgeW91IHRvIGRldGVybWluZSB3aGljaCBwYXRoIHRvIHVzZSBvdXQgb2Ygb25lIG9mIHRocmVlIHBvc3NpYmxlXG4gKiB0eXBlcyBvZiBzb3VyY2UgcGF0aHMuIFRoZSBmaXJzdCBpcyBhbiBhYnNvbHV0ZSBwYXRoLiBUaGlzIGlzIGRldGVjdGVkIGJ5XG4gKiBgcGF0aC5pc0Fic29sdXRlKClgLiBXaGVuIGFuIGFic29sdXRlIHBhdGggaXMgcHJvdmlkZWQsIGl0IGlzIGNoZWNrZWQgdG9cbiAqIHNlZSBpZiBpdCBleGlzdHMuIElmIGl0IGRvZXMgaXQncyB1c2VkLCBpZiBub3QgYW4gZXJyb3IgaXMgcmV0dXJuZWRcbiAqIChjYWxsYmFjaykvIHRocm93biAoc3luYykuIFRoZSBvdGhlciB0d28gb3B0aW9ucyBmb3IgYHNyY3BhdGhgIGFyZSBhXG4gKiByZWxhdGl2ZSB1cmwuIEJ5IGRlZmF1bHQgTm9kZSdzIGBmcy5zeW1saW5rYCB3b3JrcyBieSBjcmVhdGluZyBhIHN5bWxpbmtcbiAqIHVzaW5nIGBkc3RwYXRoYCBhbmQgZXhwZWN0cyB0aGUgYHNyY3BhdGhgIHRvIGJlIHJlbGF0aXZlIHRvIHRoZSBuZXdseVxuICogY3JlYXRlZCBzeW1saW5rLiBJZiB5b3UgcHJvdmlkZSBhIGBzcmNwYXRoYCB0aGF0IGRvZXMgbm90IGV4aXN0IG9uIHRoZSBmaWxlXG4gKiBzeXN0ZW0gaXQgcmVzdWx0cyBpbiBhIGJyb2tlbiBzeW1saW5rLiBUbyBtaW5pbWl6ZSB0aGlzLCB0aGUgZnVuY3Rpb25cbiAqIGNoZWNrcyB0byBzZWUgaWYgdGhlICdyZWxhdGl2ZSB0byBzeW1saW5rJyBzb3VyY2UgZmlsZSBleGlzdHMsIGFuZCBpZiBpdFxuICogZG9lcyBpdCB3aWxsIHVzZSBpdC4gSWYgaXQgZG9lcyBub3QsIGl0IGNoZWNrcyBpZiB0aGVyZSdzIGEgZmlsZSB0aGF0XG4gKiBleGlzdHMgdGhhdCBpcyByZWxhdGl2ZSB0byB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeSwgaWYgZG9lcyBpdHMgdXNlZC5cbiAqIFRoaXMgcHJlc2VydmVzIHRoZSBleHBlY3RhdGlvbnMgb2YgdGhlIG9yaWdpbmFsIGZzLnN5bWxpbmsgc3BlYyBhbmQgYWRkc1xuICogdGhlIGFiaWxpdHkgdG8gcGFzcyBpbiBgcmVsYXRpdmUgdG8gY3VycmVudCB3b3JraW5nIGRpcmVjb3RyeWAgcGF0aHMuXG4gKi9cblxuZnVuY3Rpb24gc3ltbGlua1BhdGhzIChzcmNwYXRoLCBkc3RwYXRoLCBjYWxsYmFjaykge1xuICBpZiAocGF0aC5pc0Fic29sdXRlKHNyY3BhdGgpKSB7XG4gICAgcmV0dXJuIGZzLmxzdGF0KHNyY3BhdGgsIGZ1bmN0aW9uIChlcnIsIHN0YXQpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVTeW1saW5rJylcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7XG4gICAgICAgICd0b0N3ZCc6IHNyY3BhdGgsXG4gICAgICAgICd0b0RzdCc6IHNyY3BhdGhcbiAgICAgIH0pXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICB2YXIgZHN0ZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gICAgdmFyIHJlbGF0aXZlVG9Ec3QgPSBwYXRoLmpvaW4oZHN0ZGlyLCBzcmNwYXRoKVxuICAgIHJldHVybiBmcy5leGlzdHMocmVsYXRpdmVUb0RzdCwgZnVuY3Rpb24gKGV4aXN0cykge1xuICAgICAgaWYgKGV4aXN0cykge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwge1xuICAgICAgICAgICd0b0N3ZCc6IHJlbGF0aXZlVG9Ec3QsXG4gICAgICAgICAgJ3RvRHN0Jzogc3JjcGF0aFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZzLmxzdGF0KHNyY3BhdGgsIGZ1bmN0aW9uIChlcnIsIHN0YXQpIHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlLnJlcGxhY2UoJ2xzdGF0JywgJ2Vuc3VyZVN5bWxpbmsnKVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgICAgICd0b0N3ZCc6IHNyY3BhdGgsXG4gICAgICAgICAgICAndG9Ec3QnOiBwYXRoLnJlbGF0aXZlKGRzdGRpciwgc3JjcGF0aClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gc3ltbGlua1BhdGhzU3luYyAoc3JjcGF0aCwgZHN0cGF0aCkge1xuICB2YXIgZXhpc3RzXG4gIGlmIChwYXRoLmlzQWJzb2x1dGUoc3JjcGF0aCkpIHtcbiAgICBleGlzdHMgPSBmcy5leGlzdHNTeW5jKHNyY3BhdGgpXG4gICAgaWYgKCFleGlzdHMpIHRocm93IG5ldyBFcnJvcignYWJzb2x1dGUgc3JjcGF0aCBkb2VzIG5vdCBleGlzdCcpXG4gICAgcmV0dXJuIHtcbiAgICAgICd0b0N3ZCc6IHNyY3BhdGgsXG4gICAgICAndG9Ec3QnOiBzcmNwYXRoXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBkc3RkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgICB2YXIgcmVsYXRpdmVUb0RzdCA9IHBhdGguam9pbihkc3RkaXIsIHNyY3BhdGgpXG4gICAgZXhpc3RzID0gZnMuZXhpc3RzU3luYyhyZWxhdGl2ZVRvRHN0KVxuICAgIGlmIChleGlzdHMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd0b0N3ZCc6IHJlbGF0aXZlVG9Ec3QsXG4gICAgICAgICd0b0RzdCc6IHNyY3BhdGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RzID0gZnMuZXhpc3RzU3luYyhzcmNwYXRoKVxuICAgICAgaWYgKCFleGlzdHMpIHRocm93IG5ldyBFcnJvcigncmVsYXRpdmUgc3JjcGF0aCBkb2VzIG5vdCBleGlzdCcpXG4gICAgICByZXR1cm4ge1xuICAgICAgICAndG9Dd2QnOiBzcmNwYXRoLFxuICAgICAgICAndG9Ec3QnOiBwYXRoLnJlbGF0aXZlKGRzdGRpciwgc3JjcGF0aClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICdzeW1saW5rUGF0aHMnOiBzeW1saW5rUGF0aHMsXG4gICdzeW1saW5rUGF0aHNTeW5jJzogc3ltbGlua1BhdGhzU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay1wYXRocy5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuXG5mdW5jdGlvbiBzeW1saW5rVHlwZSAoc3JjcGF0aCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sgPSAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpID8gdHlwZSA6IGNhbGxiYWNrXG4gIHR5cGUgPSAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpID8gZmFsc2UgOiB0eXBlXG4gIGlmICh0eXBlKSByZXR1cm4gY2FsbGJhY2sobnVsbCwgdHlwZSlcbiAgZnMubHN0YXQoc3JjcGF0aCwgZnVuY3Rpb24gKGVyciwgc3RhdHMpIHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2sobnVsbCwgJ2ZpbGUnKVxuICAgIHR5cGUgPSAoc3RhdHMgJiYgc3RhdHMuaXNEaXJlY3RvcnkoKSkgPyAnZGlyJyA6ICdmaWxlJ1xuICAgIGNhbGxiYWNrKG51bGwsIHR5cGUpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHN5bWxpbmtUeXBlU3luYyAoc3JjcGF0aCwgdHlwZSkge1xuICBpZiAodHlwZSkgcmV0dXJuIHR5cGVcbiAgdHJ5IHtcbiAgICB2YXIgc3RhdHMgPSBmcy5sc3RhdFN5bmMoc3JjcGF0aClcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAnZmlsZSdcbiAgfVxuICByZXR1cm4gKHN0YXRzICYmIHN0YXRzLmlzRGlyZWN0b3J5KCkpID8gJ2RpcicgOiAnZmlsZSdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN5bWxpbmtUeXBlOiBzeW1saW5rVHlwZSxcbiAgc3ltbGlua1R5cGVTeW5jOiBzeW1saW5rVHlwZVN5bmNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvZW5zdXJlL3N5bWxpbmstdHlwZS5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbnZhciBfbWtkaXJzID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbnZhciBta2RpcnMgPSBfbWtkaXJzLm1rZGlyc1xudmFyIG1rZGlyc1N5bmMgPSBfbWtkaXJzLm1rZGlyc1N5bmNcblxudmFyIF9zeW1saW5rUGF0aHMgPSByZXF1aXJlKCcuL3N5bWxpbmstcGF0aHMnKVxudmFyIHN5bWxpbmtQYXRocyA9IF9zeW1saW5rUGF0aHMuc3ltbGlua1BhdGhzXG52YXIgc3ltbGlua1BhdGhzU3luYyA9IF9zeW1saW5rUGF0aHMuc3ltbGlua1BhdGhzU3luY1xuXG52YXIgX3N5bWxpbmtUeXBlID0gcmVxdWlyZSgnLi9zeW1saW5rLXR5cGUnKVxudmFyIHN5bWxpbmtUeXBlID0gX3N5bWxpbmtUeXBlLnN5bWxpbmtUeXBlXG52YXIgc3ltbGlua1R5cGVTeW5jID0gX3N5bWxpbmtUeXBlLnN5bWxpbmtUeXBlU3luY1xuXG5mdW5jdGlvbiBjcmVhdGVTeW1saW5rIChzcmNwYXRoLCBkc3RwYXRoLCB0eXBlLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyB0eXBlIDogY2FsbGJhY2tcbiAgdHlwZSA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyBmYWxzZSA6IHR5cGVcblxuICBmcy5leGlzdHMoZHN0cGF0aCwgZnVuY3Rpb24gKGRlc3RpbmF0aW9uRXhpc3RzKSB7XG4gICAgaWYgKGRlc3RpbmF0aW9uRXhpc3RzKSByZXR1cm4gY2FsbGJhY2sobnVsbClcbiAgICBzeW1saW5rUGF0aHMoc3JjcGF0aCwgZHN0cGF0aCwgZnVuY3Rpb24gKGVyciwgcmVsYXRpdmUpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBzcmNwYXRoID0gcmVsYXRpdmUudG9Ec3RcbiAgICAgIHN5bWxpbmtUeXBlKHJlbGF0aXZlLnRvQ3dkLCB0eXBlLCBmdW5jdGlvbiAoZXJyLCB0eXBlKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIHZhciBkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgICAgICAgZnMuZXhpc3RzKGRpciwgZnVuY3Rpb24gKGRpckV4aXN0cykge1xuICAgICAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBmcy5zeW1saW5rKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUsIGNhbGxiYWNrKVxuICAgICAgICAgIG1rZGlycyhkaXIsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgICBmcy5zeW1saW5rKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUsIGNhbGxiYWNrKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN5bWxpbmtTeW5jIChzcmNwYXRoLCBkc3RwYXRoLCB0eXBlLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyB0eXBlIDogY2FsbGJhY2tcbiAgdHlwZSA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyBmYWxzZSA6IHR5cGVcblxuICB2YXIgZGVzdGluYXRpb25FeGlzdHMgPSBmcy5leGlzdHNTeW5jKGRzdHBhdGgpXG4gIGlmIChkZXN0aW5hdGlvbkV4aXN0cykgcmV0dXJuIHVuZGVmaW5lZFxuXG4gIHZhciByZWxhdGl2ZSA9IHN5bWxpbmtQYXRoc1N5bmMoc3JjcGF0aCwgZHN0cGF0aClcbiAgc3JjcGF0aCA9IHJlbGF0aXZlLnRvRHN0XG4gIHR5cGUgPSBzeW1saW5rVHlwZVN5bmMocmVsYXRpdmUudG9Dd2QsIHR5cGUpXG4gIHZhciBkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgdmFyIGV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZGlyKVxuICBpZiAoZXhpc3RzKSByZXR1cm4gZnMuc3ltbGlua1N5bmMoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSlcbiAgbWtkaXJzU3luYyhkaXIpXG4gIHJldHVybiBmcy5zeW1saW5rU3luYyhzcmNwYXRoLCBkc3RwYXRoLCB0eXBlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlU3ltbGluazogY3JlYXRlU3ltbGluayxcbiAgY3JlYXRlU3ltbGlua1N5bmM6IGNyZWF0ZVN5bWxpbmtTeW5jLFxuICAvLyBhbGlhc1xuICBlbnN1cmVTeW1saW5rOiBjcmVhdGVTeW1saW5rLFxuICBlbnN1cmVTeW1saW5rU3luYzogY3JlYXRlU3ltbGlua1N5bmNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvZW5zdXJlL3N5bWxpbmsuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhc3NpZ24gPSByZXF1aXJlKCcuL3V0aWwvYXNzaWduJylcblxudmFyIGZzZSA9IHt9XG52YXIgZ2ZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuXG4vLyBhdHRhY2ggZnMgbWV0aG9kcyB0byBmc2Vcbk9iamVjdC5rZXlzKGdmcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIGZzZVtrZXldID0gZ2ZzW2tleV1cbn0pXG5cbnZhciBmcyA9IGZzZVxuXG5hc3NpZ24oZnMsIHJlcXVpcmUoJy4vY29weScpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL2NvcHktc3luYycpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL21rZGlycycpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL3JlbW92ZScpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL2pzb24nKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9tb3ZlJykpXG5hc3NpZ24oZnMsIHJlcXVpcmUoJy4vZW1wdHknKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9lbnN1cmUnKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9vdXRwdXQnKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi93YWxrJykpXG5cbm1vZHVsZS5leHBvcnRzID0gZnNcblxuLy8gbWFpbnRhaW4gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgZm9yIGF3aGlsZVxudmFyIGpzb25maWxlID0ge31cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShqc29uZmlsZSwgJ3NwYWNlcycsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZzLnNwYWNlcyAvLyBmb3VuZCBpbiAuL2pzb25cbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgZnMuc3BhY2VzID0gdmFsXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzLmpzb25maWxlID0ganNvbmZpbGUgLy8gc28gdXNlcnMgb2YgZnMtZXh0cmEgY2FuIG1vZGlmeSBqc29uRmlsZS5zcGFjZXNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBqc29uRmlsZSA9IHJlcXVpcmUoJy4vanNvbmZpbGUnKVxuXG5qc29uRmlsZS5vdXRwdXRKc29uU3luYyA9IHJlcXVpcmUoJy4vb3V0cHV0LWpzb24tc3luYycpXG5qc29uRmlsZS5vdXRwdXRKc29uID0gcmVxdWlyZSgnLi9vdXRwdXQtanNvbicpXG4vLyBhbGlhc2VzXG5qc29uRmlsZS5vdXRwdXRKU09OU3luYyA9IHJlcXVpcmUoJy4vb3V0cHV0LWpzb24tc3luYycpXG5qc29uRmlsZS5vdXRwdXRKU09OID0gcmVxdWlyZSgnLi9vdXRwdXQtanNvbicpXG5cbm1vZHVsZS5leHBvcnRzID0ganNvbkZpbGVcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvanNvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBvZiB0aGlzIGNvZGUgd2FzIHdyaXR0ZW4gYnkgQW5kcmV3IEtlbGxleVxuLy8gbGljZW5zZWQgdW5kZXIgdGhlIEJTRCBsaWNlbnNlOiBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmRyZXdyay9ub2RlLW12L2Jsb2IvbWFzdGVyL3BhY2thZ2UuanNvblxuXG4vLyB0aGlzIG5lZWRzIGEgY2xlYW51cFxuXG52YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG52YXIgbmNwID0gcmVxdWlyZSgnLi4vY29weS9uY3AnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciByaW1yYWYgPSByZXF1aXJlKCdyaW1yYWYnKVxudmFyIG1rZGlycCA9IHJlcXVpcmUoJy4uL21rZGlycycpLm1rZGlyc1xuXG5mdW5jdGlvbiBtdiAoc291cmNlLCBkZXN0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIHZhciBzaG91bGRNa2RpcnAgPSAoJ21rZGlycCcgaW4gb3B0aW9ucykgPyBvcHRpb25zLm1rZGlycCA6IHRydWVcbiAgdmFyIGNsb2JiZXIgPSAoJ2Nsb2JiZXInIGluIG9wdGlvbnMpID8gb3B0aW9ucy5jbG9iYmVyIDogZmFsc2VcblxuICB2YXIgbGltaXQgPSBvcHRpb25zLmxpbWl0IHx8IDE2XG5cbiAgaWYgKHNob3VsZE1rZGlycCkge1xuICAgIG1rZGlycygpXG4gIH0gZWxzZSB7XG4gICAgZG9SZW5hbWUoKVxuICB9XG5cbiAgZnVuY3Rpb24gbWtkaXJzICgpIHtcbiAgICBta2RpcnAocGF0aC5kaXJuYW1lKGRlc3QpLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgZG9SZW5hbWUoKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBkb1JlbmFtZSAoKSB7XG4gICAgaWYgKGNsb2JiZXIpIHtcbiAgICAgIGZzLnJlbmFtZShzb3VyY2UsIGRlc3QsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCFlcnIpIHJldHVybiBjYWxsYmFjaygpXG5cbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRU5PVEVNUFRZJyB8fCBlcnIuY29kZSA9PT0gJ0VFWElTVCcpIHtcbiAgICAgICAgICByaW1yYWYoZGVzdCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIG9wdGlvbnMuY2xvYmJlciA9IGZhbHNlIC8vIGp1c3QgY2xvYmJlcmVkIGl0LCBubyBuZWVkIHRvIGRvIGl0IGFnYWluXG4gICAgICAgICAgICBtdihzb3VyY2UsIGRlc3QsIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZWlyZCBXaW5kb3dzIHNoaXRcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRVBFUk0nKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByaW1yYWYoZGVzdCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgICBvcHRpb25zLmNsb2JiZXIgPSBmYWxzZVxuICAgICAgICAgICAgICBtdihzb3VyY2UsIGRlc3QsIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LCAyMDApXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFWERFVicpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIG1vdmVBY3Jvc3NEZXZpY2Uoc291cmNlLCBkZXN0LCBjbG9iYmVyLCBsaW1pdCwgY2FsbGJhY2spXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBmcy5saW5rKHNvdXJjZSwgZGVzdCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRVhERVYnIHx8IGVyci5jb2RlID09PSAnRUlTRElSJyB8fCBlcnIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgICAgICAgbW92ZUFjcm9zc0RldmljZShzb3VyY2UsIGRlc3QsIGNsb2JiZXIsIGxpbWl0LCBjYWxsYmFjaylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZnMudW5saW5rKHNvdXJjZSwgY2FsbGJhY2spXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlQWNyb3NzRGV2aWNlIChzb3VyY2UsIGRlc3QsIGNsb2JiZXIsIGxpbWl0LCBjYWxsYmFjaykge1xuICBmcy5zdGF0KHNvdXJjZSwgZnVuY3Rpb24gKGVyciwgc3RhdCkge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNhbGxiYWNrKGVycilcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIG1vdmVEaXJBY3Jvc3NEZXZpY2Uoc291cmNlLCBkZXN0LCBjbG9iYmVyLCBsaW1pdCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdmVGaWxlQWNyb3NzRGV2aWNlKHNvdXJjZSwgZGVzdCwgY2xvYmJlciwgbGltaXQsIGNhbGxiYWNrKVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gbW92ZUZpbGVBY3Jvc3NEZXZpY2UgKHNvdXJjZSwgZGVzdCwgY2xvYmJlciwgbGltaXQsIGNhbGxiYWNrKSB7XG4gIHZhciBvdXRGbGFncyA9IGNsb2JiZXIgPyAndycgOiAnd3gnXG4gIHZhciBpbnMgPSBmcy5jcmVhdGVSZWFkU3RyZWFtKHNvdXJjZSlcbiAgdmFyIG91dHMgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0LCB7ZmxhZ3M6IG91dEZsYWdzfSlcblxuICBpbnMub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIGlucy5kZXN0cm95KClcbiAgICBvdXRzLmRlc3Ryb3koKVxuICAgIG91dHMucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25DbG9zZSlcblxuICAgIC8vIG1heSB3YW50IHRvIGNyZWF0ZSBhIGRpcmVjdG9yeSBidXQgYG91dGAgbGluZSBhYm92ZVxuICAgIC8vIGNyZWF0ZXMgYW4gZW1wdHkgZmlsZSBmb3IgdXM6IFNlZSAjMTA4XG4gICAgLy8gZG9uJ3QgY2FyZSBhYm91dCBlcnJvciBoZXJlXG4gICAgZnMudW5saW5rKGRlc3QsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIG5vdGU6IGBlcnJgIGhlcmUgaXMgZnJvbSB0aGUgaW5wdXQgc3RyZWFtIGVycnJvclxuICAgICAgaWYgKGVyci5jb2RlID09PSAnRUlTRElSJyB8fCBlcnIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgICBtb3ZlRGlyQWNyb3NzRGV2aWNlKHNvdXJjZSwgZGVzdCwgY2xvYmJlciwgbGltaXQsIGNhbGxiYWNrKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgb3V0cy5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaW5zLmRlc3Ryb3koKVxuICAgIG91dHMuZGVzdHJveSgpXG4gICAgb3V0cy5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbkNsb3NlKVxuICAgIGNhbGxiYWNrKGVycilcbiAgfSlcblxuICBvdXRzLm9uY2UoJ2Nsb3NlJywgb25DbG9zZSlcbiAgaW5zLnBpcGUob3V0cylcblxuICBmdW5jdGlvbiBvbkNsb3NlICgpIHtcbiAgICBmcy51bmxpbmsoc291cmNlLCBjYWxsYmFjaylcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlRGlyQWNyb3NzRGV2aWNlIChzb3VyY2UsIGRlc3QsIGNsb2JiZXIsIGxpbWl0LCBjYWxsYmFjaykge1xuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBzdG9wT25FcnI6IHRydWUsXG4gICAgY2xvYmJlcjogZmFsc2UsXG4gICAgbGltaXQ6IGxpbWl0XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydE5jcCAoKSB7XG4gICAgbmNwKHNvdXJjZSwgZGVzdCwgb3B0aW9ucywgZnVuY3Rpb24gKGVyckxpc3QpIHtcbiAgICAgIGlmIChlcnJMaXN0KSByZXR1cm4gY2FsbGJhY2soZXJyTGlzdFswXSlcbiAgICAgIHJpbXJhZihzb3VyY2UsIGNhbGxiYWNrKVxuICAgIH0pXG4gIH1cblxuICBpZiAoY2xvYmJlcikge1xuICAgIHJpbXJhZihkZXN0LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgc3RhcnROY3AoKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgc3RhcnROY3AoKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb3ZlOiBtdlxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9tb3ZlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxudmFyIG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcblxuZnVuY3Rpb24gb3V0cHV0RmlsZSAoZmlsZSwgZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIHZhciBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSlcbiAgZnMuZXhpc3RzKGRpciwgZnVuY3Rpb24gKGl0RG9lcykge1xuICAgIGlmIChpdERvZXMpIHJldHVybiBmcy53cml0ZUZpbGUoZmlsZSwgZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKVxuXG4gICAgbWtkaXIubWtkaXJzKGRpciwgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcblxuICAgICAgZnMud3JpdGVGaWxlKGZpbGUsIGRhdGEsIGVuY29kaW5nLCBjYWxsYmFjaylcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBvdXRwdXRGaWxlU3luYyAoZmlsZSwgZGF0YSwgZW5jb2RpbmcpIHtcbiAgdmFyIGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuICBpZiAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgcmV0dXJuIGZzLndyaXRlRmlsZVN5bmMuYXBwbHkoZnMsIGFyZ3VtZW50cylcbiAgfVxuICBta2Rpci5ta2RpcnNTeW5jKGRpcilcbiAgZnMud3JpdGVGaWxlU3luYy5hcHBseShmcywgYXJndW1lbnRzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb3V0cHV0RmlsZTogb3V0cHV0RmlsZSxcbiAgb3V0cHV0RmlsZVN5bmM6IG91dHB1dEZpbGVTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL291dHB1dC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc2ltcGxlIG11dGFibGUgYXNzaWduXG5mdW5jdGlvbiBhc3NpZ24gKCkge1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5maWx0ZXIoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkgfSlcbiAgdmFyIGRlc3QgPSBhcmdzLnNoaWZ0KClcbiAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChzcmMpIHtcbiAgICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVzdFtrZXldID0gc3JjW2tleV1cbiAgICB9KVxuICB9KVxuXG4gIHJldHVybiBkZXN0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL3V0aWwvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIG9zID0gcmVxdWlyZSgnb3MnKVxuXG4vLyBIRlMsIGV4dHsyLDN9LCBGQVQgZG8gbm90LCBOb2RlLmpzIHYwLjEwIGRvZXMgbm90XG5mdW5jdGlvbiBoYXNNaWxsaXNSZXNTeW5jICgpIHtcbiAgdmFyIHRtcGZpbGUgPSBwYXRoLmpvaW4oJ21pbGxpcy10ZXN0LXN5bmMnICsgRGF0ZS5ub3coKS50b1N0cmluZygpICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpKVxuICB0bXBmaWxlID0gcGF0aC5qb2luKG9zLnRtcGRpcigpLCB0bXBmaWxlKVxuXG4gIC8vIDU1MCBtaWxsaXMgcGFzdCBVTklYIGVwb2NoXG4gIHZhciBkID0gbmV3IERhdGUoMTQzNTQxMDI0Mzg2MilcbiAgZnMud3JpdGVGaWxlU3luYyh0bXBmaWxlLCAnaHR0cHM6Ly9naXRodWIuY29tL2pwcmljaGFyZHNvbi9ub2RlLWZzLWV4dHJhL3B1bGwvMTQxJylcbiAgdmFyIGZkID0gZnMub3BlblN5bmModG1wZmlsZSwgJ3IrJylcbiAgZnMuZnV0aW1lc1N5bmMoZmQsIGQsIGQpXG4gIGZzLmNsb3NlU3luYyhmZClcbiAgcmV0dXJuIGZzLnN0YXRTeW5jKHRtcGZpbGUpLm10aW1lID4gMTQzNTQxMDI0MzAwMFxufVxuXG5mdW5jdGlvbiBoYXNNaWxsaXNSZXMgKGNhbGxiYWNrKSB7XG4gIHZhciB0bXBmaWxlID0gcGF0aC5qb2luKCdtaWxsaXMtdGVzdCcgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMikpXG4gIHRtcGZpbGUgPSBwYXRoLmpvaW4ob3MudG1wZGlyKCksIHRtcGZpbGUpXG5cbiAgLy8gNTUwIG1pbGxpcyBwYXN0IFVOSVggZXBvY2hcbiAgdmFyIGQgPSBuZXcgRGF0ZSgxNDM1NDEwMjQzODYyKVxuICBmcy53cml0ZUZpbGUodG1wZmlsZSwgJ2h0dHBzOi8vZ2l0aHViLmNvbS9qcHJpY2hhcmRzb24vbm9kZS1mcy1leHRyYS9wdWxsLzE0MScsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgIGZzLm9wZW4odG1wZmlsZSwgJ3IrJywgZnVuY3Rpb24gKGVyciwgZmQpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBmcy5mdXRpbWVzKGZkLCBkLCBkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIGZzLmNsb3NlKGZkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICBmcy5zdGF0KHRtcGZpbGUsIGZ1bmN0aW9uIChlcnIsIHN0YXRzKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgc3RhdHMubXRpbWUgPiAxNDM1NDEwMjQzMDAwKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHRpbWVSZW1vdmVNaWxsaXMgKHRpbWVzdGFtcCkge1xuICBpZiAodHlwZW9mIHRpbWVzdGFtcCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aW1lc3RhbXAgLyAxMDAwKSAqIDEwMDBcbiAgfSBlbHNlIGlmICh0aW1lc3RhbXAgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE1hdGguZmxvb3IodGltZXN0YW1wLmdldFRpbWUoKSAvIDEwMDApICogMTAwMClcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZzLWV4dHJhOiB0aW1lUmVtb3ZlTWlsbGlzKCkgdW5rbm93biBwYXJhbWV0ZXIgdHlwZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRpbWVzTWlsbGlzIChwYXRoLCBhdGltZSwgbXRpbWUsIGNhbGxiYWNrKSB7XG4gIC8vIGlmICghSEFTX01JTExJU19SRVMpIHJldHVybiBmcy51dGltZXMocGF0aCwgYXRpbWUsIG10aW1lLCBjYWxsYmFjaylcbiAgZnMub3BlbihwYXRoLCAncisnLCBmdW5jdGlvbiAoZXJyLCBmZCkge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgZnMuZnV0aW1lcyhmZCwgYXRpbWUsIG10aW1lLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgZnMuY2xvc2UoZmQsIGNhbGxiYWNrKVxuICAgIH0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYXNNaWxsaXNSZXM6IGhhc01pbGxpc1JlcyxcbiAgaGFzTWlsbGlzUmVzU3luYzogaGFzTWlsbGlzUmVzU3luYyxcbiAgdGltZVJlbW92ZU1pbGxpczogdGltZVJlbW92ZU1pbGxpcyxcbiAgdXRpbWVzTWlsbGlzOiB1dGltZXNNaWxsaXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvdXRpbC91dGltZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBrbGF3ID0gcmVxdWlyZSgna2xhdycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3YWxrOiBrbGF3XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL3dhbGsvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgcGF0aE1vZHVsZSA9IHJlcXVpcmUoJ3BhdGgnKTtcbnZhciBpc1dpbmRvd3MgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xudmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcblxuLy8gSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiByZWFscGF0aCwgcG9ydGVkIGZyb20gbm9kZSBwcmUtdjZcblxudmFyIERFQlVHID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJiAvZnMvLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyk7XG5cbmZ1bmN0aW9uIHJldGhyb3coKSB7XG4gIC8vIE9ubHkgZW5hYmxlIGluIGRlYnVnIG1vZGUuIEEgYmFja3RyYWNlIHVzZXMgfjEwMDAgYnl0ZXMgb2YgaGVhcCBzcGFjZSBhbmRcbiAgLy8gaXMgZmFpcmx5IHNsb3cgdG8gZ2VuZXJhdGUuXG4gIHZhciBjYWxsYmFjaztcbiAgaWYgKERFQlVHKSB7XG4gICAgdmFyIGJhY2t0cmFjZSA9IG5ldyBFcnJvcjtcbiAgICBjYWxsYmFjayA9IGRlYnVnQ2FsbGJhY2s7XG4gIH0gZWxzZVxuICAgIGNhbGxiYWNrID0gbWlzc2luZ0NhbGxiYWNrO1xuXG4gIHJldHVybiBjYWxsYmFjaztcblxuICBmdW5jdGlvbiBkZWJ1Z0NhbGxiYWNrKGVycikge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGJhY2t0cmFjZS5tZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgICBlcnIgPSBiYWNrdHJhY2U7XG4gICAgICBtaXNzaW5nQ2FsbGJhY2soZXJyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtaXNzaW5nQ2FsbGJhY2soZXJyKSB7XG4gICAgaWYgKGVycikge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbilcbiAgICAgICAgdGhyb3cgZXJyOyAgLy8gRm9yZ290IGEgY2FsbGJhY2sgYnV0IGRvbid0IGtub3cgd2hlcmU/IFVzZSBOT0RFX0RFQlVHPWZzXG4gICAgICBlbHNlIGlmICghcHJvY2Vzcy5ub0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHZhciBtc2cgPSAnZnM6IG1pc3NpbmcgY2FsbGJhY2sgJyArIChlcnIuc3RhY2sgfHwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKVxuICAgICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF5YmVDYWxsYmFjayhjYikge1xuICByZXR1cm4gdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nID8gY2IgOiByZXRocm93KCk7XG59XG5cbnZhciBub3JtYWxpemUgPSBwYXRoTW9kdWxlLm5vcm1hbGl6ZTtcblxuLy8gUmVnZXhwIHRoYXQgZmluZHMgdGhlIG5leHQgcGFydGlvbiBvZiBhIChwYXJ0aWFsKSBwYXRoXG4vLyByZXN1bHQgaXMgW2Jhc2Vfd2l0aF9zbGFzaCwgYmFzZV0sIGUuZy4gWydzb21lZGlyLycsICdzb21lZGlyJ11cbmlmIChpc1dpbmRvd3MpIHtcbiAgdmFyIG5leHRQYXJ0UmUgPSAvKC4qPykoPzpbXFwvXFxcXF0rfCQpL2c7XG59IGVsc2Uge1xuICB2YXIgbmV4dFBhcnRSZSA9IC8oLio/KSg/OltcXC9dK3wkKS9nO1xufVxuXG4vLyBSZWdleCB0byBmaW5kIHRoZSBkZXZpY2Ugcm9vdCwgaW5jbHVkaW5nIHRyYWlsaW5nIHNsYXNoLiBFLmcuICdjOlxcXFwnLlxuaWYgKGlzV2luZG93cykge1xuICB2YXIgc3BsaXRSb290UmUgPSAvXig/OlthLXpBLVpdOnxbXFxcXFxcL117Mn1bXlxcXFxcXC9dK1tcXFxcXFwvXVteXFxcXFxcL10rKT9bXFxcXFxcL10qLztcbn0gZWxzZSB7XG4gIHZhciBzcGxpdFJvb3RSZSA9IC9eW1xcL10qLztcbn1cblxuZXhwb3J0cy5yZWFscGF0aFN5bmMgPSBmdW5jdGlvbiByZWFscGF0aFN5bmMocCwgY2FjaGUpIHtcbiAgLy8gbWFrZSBwIGlzIGFic29sdXRlXG4gIHAgPSBwYXRoTW9kdWxlLnJlc29sdmUocCk7XG5cbiAgaWYgKGNhY2hlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwgcCkpIHtcbiAgICByZXR1cm4gY2FjaGVbcF07XG4gIH1cblxuICB2YXIgb3JpZ2luYWwgPSBwLFxuICAgICAgc2VlbkxpbmtzID0ge30sXG4gICAgICBrbm93bkhhcmQgPSB7fTtcblxuICAvLyBjdXJyZW50IGNoYXJhY3RlciBwb3NpdGlvbiBpbiBwXG4gIHZhciBwb3M7XG4gIC8vIHRoZSBwYXJ0aWFsIHBhdGggc28gZmFyLCBpbmNsdWRpbmcgYSB0cmFpbGluZyBzbGFzaCBpZiBhbnlcbiAgdmFyIGN1cnJlbnQ7XG4gIC8vIHRoZSBwYXJ0aWFsIHBhdGggd2l0aG91dCBhIHRyYWlsaW5nIHNsYXNoIChleGNlcHQgd2hlbiBwb2ludGluZyBhdCBhIHJvb3QpXG4gIHZhciBiYXNlO1xuICAvLyB0aGUgcGFydGlhbCBwYXRoIHNjYW5uZWQgaW4gdGhlIHByZXZpb3VzIHJvdW5kLCB3aXRoIHNsYXNoXG4gIHZhciBwcmV2aW91cztcblxuICBzdGFydCgpO1xuXG4gIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIC8vIFNraXAgb3ZlciByb290c1xuICAgIHZhciBtID0gc3BsaXRSb290UmUuZXhlYyhwKTtcbiAgICBwb3MgPSBtWzBdLmxlbmd0aDtcbiAgICBjdXJyZW50ID0gbVswXTtcbiAgICBiYXNlID0gbVswXTtcbiAgICBwcmV2aW91cyA9ICcnO1xuXG4gICAgLy8gT24gd2luZG93cywgY2hlY2sgdGhhdCB0aGUgcm9vdCBleGlzdHMuIE9uIHVuaXggdGhlcmUgaXMgbm8gbmVlZC5cbiAgICBpZiAoaXNXaW5kb3dzICYmICFrbm93bkhhcmRbYmFzZV0pIHtcbiAgICAgIGZzLmxzdGF0U3luYyhiYXNlKTtcbiAgICAgIGtub3duSGFyZFtiYXNlXSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gd2FsayBkb3duIHRoZSBwYXRoLCBzd2FwcGluZyBvdXQgbGlua2VkIHBhdGhwYXJ0cyBmb3IgdGhlaXIgcmVhbFxuICAvLyB2YWx1ZXNcbiAgLy8gTkI6IHAubGVuZ3RoIGNoYW5nZXMuXG4gIHdoaWxlIChwb3MgPCBwLmxlbmd0aCkge1xuICAgIC8vIGZpbmQgdGhlIG5leHQgcGFydFxuICAgIG5leHRQYXJ0UmUubGFzdEluZGV4ID0gcG9zO1xuICAgIHZhciByZXN1bHQgPSBuZXh0UGFydFJlLmV4ZWMocCk7XG4gICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgIGN1cnJlbnQgKz0gcmVzdWx0WzBdO1xuICAgIGJhc2UgPSBwcmV2aW91cyArIHJlc3VsdFsxXTtcbiAgICBwb3MgPSBuZXh0UGFydFJlLmxhc3RJbmRleDtcblxuICAgIC8vIGNvbnRpbnVlIGlmIG5vdCBhIHN5bWxpbmtcbiAgICBpZiAoa25vd25IYXJkW2Jhc2VdIHx8IChjYWNoZSAmJiBjYWNoZVtiYXNlXSA9PT0gYmFzZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciByZXNvbHZlZExpbms7XG4gICAgaWYgKGNhY2hlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwgYmFzZSkpIHtcbiAgICAgIC8vIHNvbWUga25vd24gc3ltYm9saWMgbGluay4gIG5vIG5lZWQgdG8gc3RhdCBhZ2Fpbi5cbiAgICAgIHJlc29sdmVkTGluayA9IGNhY2hlW2Jhc2VdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RhdCA9IGZzLmxzdGF0U3luYyhiYXNlKTtcbiAgICAgIGlmICghc3RhdC5pc1N5bWJvbGljTGluaygpKSB7XG4gICAgICAgIGtub3duSGFyZFtiYXNlXSA9IHRydWU7XG4gICAgICAgIGlmIChjYWNoZSkgY2FjaGVbYmFzZV0gPSBiYXNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVhZCB0aGUgbGluayBpZiBpdCB3YXNuJ3QgcmVhZCBiZWZvcmVcbiAgICAgIC8vIGRldi9pbm8gYWx3YXlzIHJldHVybiAwIG9uIHdpbmRvd3MsIHNvIHNraXAgdGhlIGNoZWNrLlxuICAgICAgdmFyIGxpbmtUYXJnZXQgPSBudWxsO1xuICAgICAgaWYgKCFpc1dpbmRvd3MpIHtcbiAgICAgICAgdmFyIGlkID0gc3RhdC5kZXYudG9TdHJpbmcoMzIpICsgJzonICsgc3RhdC5pbm8udG9TdHJpbmcoMzIpO1xuICAgICAgICBpZiAoc2VlbkxpbmtzLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgICAgICAgIGxpbmtUYXJnZXQgPSBzZWVuTGlua3NbaWRdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobGlua1RhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICBmcy5zdGF0U3luYyhiYXNlKTtcbiAgICAgICAgbGlua1RhcmdldCA9IGZzLnJlYWRsaW5rU3luYyhiYXNlKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmVkTGluayA9IHBhdGhNb2R1bGUucmVzb2x2ZShwcmV2aW91cywgbGlua1RhcmdldCk7XG4gICAgICAvLyB0cmFjayB0aGlzLCBpZiBnaXZlbiBhIGNhY2hlLlxuICAgICAgaWYgKGNhY2hlKSBjYWNoZVtiYXNlXSA9IHJlc29sdmVkTGluaztcbiAgICAgIGlmICghaXNXaW5kb3dzKSBzZWVuTGlua3NbaWRdID0gbGlua1RhcmdldDtcbiAgICB9XG5cbiAgICAvLyByZXNvbHZlIHRoZSBsaW5rLCB0aGVuIHN0YXJ0IG92ZXJcbiAgICBwID0gcGF0aE1vZHVsZS5yZXNvbHZlKHJlc29sdmVkTGluaywgcC5zbGljZShwb3MpKTtcbiAgICBzdGFydCgpO1xuICB9XG5cbiAgaWYgKGNhY2hlKSBjYWNoZVtvcmlnaW5hbF0gPSBwO1xuXG4gIHJldHVybiBwO1xufTtcblxuXG5leHBvcnRzLnJlYWxwYXRoID0gZnVuY3Rpb24gcmVhbHBhdGgocCwgY2FjaGUsIGNiKSB7XG4gIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG1heWJlQ2FsbGJhY2soY2FjaGUpO1xuICAgIGNhY2hlID0gbnVsbDtcbiAgfVxuXG4gIC8vIG1ha2UgcCBpcyBhYnNvbHV0ZVxuICBwID0gcGF0aE1vZHVsZS5yZXNvbHZlKHApO1xuXG4gIGlmIChjYWNoZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIHApKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soY2IuYmluZChudWxsLCBudWxsLCBjYWNoZVtwXSkpO1xuICB9XG5cbiAgdmFyIG9yaWdpbmFsID0gcCxcbiAgICAgIHNlZW5MaW5rcyA9IHt9LFxuICAgICAga25vd25IYXJkID0ge307XG5cbiAgLy8gY3VycmVudCBjaGFyYWN0ZXIgcG9zaXRpb24gaW4gcFxuICB2YXIgcG9zO1xuICAvLyB0aGUgcGFydGlhbCBwYXRoIHNvIGZhciwgaW5jbHVkaW5nIGEgdHJhaWxpbmcgc2xhc2ggaWYgYW55XG4gIHZhciBjdXJyZW50O1xuICAvLyB0aGUgcGFydGlhbCBwYXRoIHdpdGhvdXQgYSB0cmFpbGluZyBzbGFzaCAoZXhjZXB0IHdoZW4gcG9pbnRpbmcgYXQgYSByb290KVxuICB2YXIgYmFzZTtcbiAgLy8gdGhlIHBhcnRpYWwgcGF0aCBzY2FubmVkIGluIHRoZSBwcmV2aW91cyByb3VuZCwgd2l0aCBzbGFzaFxuICB2YXIgcHJldmlvdXM7XG5cbiAgc3RhcnQoKTtcblxuICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAvLyBTa2lwIG92ZXIgcm9vdHNcbiAgICB2YXIgbSA9IHNwbGl0Um9vdFJlLmV4ZWMocCk7XG4gICAgcG9zID0gbVswXS5sZW5ndGg7XG4gICAgY3VycmVudCA9IG1bMF07XG4gICAgYmFzZSA9IG1bMF07XG4gICAgcHJldmlvdXMgPSAnJztcblxuICAgIC8vIE9uIHdpbmRvd3MsIGNoZWNrIHRoYXQgdGhlIHJvb3QgZXhpc3RzLiBPbiB1bml4IHRoZXJlIGlzIG5vIG5lZWQuXG4gICAgaWYgKGlzV2luZG93cyAmJiAha25vd25IYXJkW2Jhc2VdKSB7XG4gICAgICBmcy5sc3RhdChiYXNlLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG4gICAgICAgIGtub3duSGFyZFtiYXNlXSA9IHRydWU7XG4gICAgICAgIExPT1AoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKExPT1ApO1xuICAgIH1cbiAgfVxuXG4gIC8vIHdhbGsgZG93biB0aGUgcGF0aCwgc3dhcHBpbmcgb3V0IGxpbmtlZCBwYXRocGFydHMgZm9yIHRoZWlyIHJlYWxcbiAgLy8gdmFsdWVzXG4gIGZ1bmN0aW9uIExPT1AoKSB7XG4gICAgLy8gc3RvcCBpZiBzY2FubmVkIHBhc3QgZW5kIG9mIHBhdGhcbiAgICBpZiAocG9zID49IHAubGVuZ3RoKSB7XG4gICAgICBpZiAoY2FjaGUpIGNhY2hlW29yaWdpbmFsXSA9IHA7XG4gICAgICByZXR1cm4gY2IobnVsbCwgcCk7XG4gICAgfVxuXG4gICAgLy8gZmluZCB0aGUgbmV4dCBwYXJ0XG4gICAgbmV4dFBhcnRSZS5sYXN0SW5kZXggPSBwb3M7XG4gICAgdmFyIHJlc3VsdCA9IG5leHRQYXJ0UmUuZXhlYyhwKTtcbiAgICBwcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgY3VycmVudCArPSByZXN1bHRbMF07XG4gICAgYmFzZSA9IHByZXZpb3VzICsgcmVzdWx0WzFdO1xuICAgIHBvcyA9IG5leHRQYXJ0UmUubGFzdEluZGV4O1xuXG4gICAgLy8gY29udGludWUgaWYgbm90IGEgc3ltbGlua1xuICAgIGlmIChrbm93bkhhcmRbYmFzZV0gfHwgKGNhY2hlICYmIGNhY2hlW2Jhc2VdID09PSBiYXNlKSkge1xuICAgICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soTE9PUCk7XG4gICAgfVxuXG4gICAgaWYgKGNhY2hlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwgYmFzZSkpIHtcbiAgICAgIC8vIGtub3duIHN5bWJvbGljIGxpbmsuICBubyBuZWVkIHRvIHN0YXQgYWdhaW4uXG4gICAgICByZXR1cm4gZ290UmVzb2x2ZWRMaW5rKGNhY2hlW2Jhc2VdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnMubHN0YXQoYmFzZSwgZ290U3RhdCk7XG4gIH1cblxuICBmdW5jdGlvbiBnb3RTdGF0KGVyciwgc3RhdCkge1xuICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgLy8gaWYgbm90IGEgc3ltbGluaywgc2tpcCB0byB0aGUgbmV4dCBwYXRoIHBhcnRcbiAgICBpZiAoIXN0YXQuaXNTeW1ib2xpY0xpbmsoKSkge1xuICAgICAga25vd25IYXJkW2Jhc2VdID0gdHJ1ZTtcbiAgICAgIGlmIChjYWNoZSkgY2FjaGVbYmFzZV0gPSBiYXNlO1xuICAgICAgcmV0dXJuIHByb2Nlc3MubmV4dFRpY2soTE9PUCk7XG4gICAgfVxuXG4gICAgLy8gc3RhdCAmIHJlYWQgdGhlIGxpbmsgaWYgbm90IHJlYWQgYmVmb3JlXG4gICAgLy8gY2FsbCBnb3RUYXJnZXQgYXMgc29vbiBhcyB0aGUgbGluayB0YXJnZXQgaXMga25vd25cbiAgICAvLyBkZXYvaW5vIGFsd2F5cyByZXR1cm4gMCBvbiB3aW5kb3dzLCBzbyBza2lwIHRoZSBjaGVjay5cbiAgICBpZiAoIWlzV2luZG93cykge1xuICAgICAgdmFyIGlkID0gc3RhdC5kZXYudG9TdHJpbmcoMzIpICsgJzonICsgc3RhdC5pbm8udG9TdHJpbmcoMzIpO1xuICAgICAgaWYgKHNlZW5MaW5rcy5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICAgICAgcmV0dXJuIGdvdFRhcmdldChudWxsLCBzZWVuTGlua3NbaWRdLCBiYXNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnMuc3RhdChiYXNlLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgICBmcy5yZWFkbGluayhiYXNlLCBmdW5jdGlvbihlcnIsIHRhcmdldCkge1xuICAgICAgICBpZiAoIWlzV2luZG93cykgc2VlbkxpbmtzW2lkXSA9IHRhcmdldDtcbiAgICAgICAgZ290VGFyZ2V0KGVyciwgdGFyZ2V0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ290VGFyZ2V0KGVyciwgdGFyZ2V0LCBiYXNlKSB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG5cbiAgICB2YXIgcmVzb2x2ZWRMaW5rID0gcGF0aE1vZHVsZS5yZXNvbHZlKHByZXZpb3VzLCB0YXJnZXQpO1xuICAgIGlmIChjYWNoZSkgY2FjaGVbYmFzZV0gPSByZXNvbHZlZExpbms7XG4gICAgZ290UmVzb2x2ZWRMaW5rKHJlc29sdmVkTGluayk7XG4gIH1cblxuICBmdW5jdGlvbiBnb3RSZXNvbHZlZExpbmsocmVzb2x2ZWRMaW5rKSB7XG4gICAgLy8gcmVzb2x2ZSB0aGUgbGluaywgdGhlbiBzdGFydCBvdmVyXG4gICAgcCA9IHBhdGhNb2R1bGUucmVzb2x2ZShyZXNvbHZlZExpbmssIHAuc2xpY2UocG9zKSk7XG4gICAgc3RhcnQoKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy5yZWFscGF0aC9vbGQuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZ2xvYlN5bmNcbmdsb2JTeW5jLkdsb2JTeW5jID0gR2xvYlN5bmNcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIHJwID0gcmVxdWlyZSgnZnMucmVhbHBhdGgnKVxudmFyIG1pbmltYXRjaCA9IHJlcXVpcmUoJ21pbmltYXRjaCcpXG52YXIgTWluaW1hdGNoID0gbWluaW1hdGNoLk1pbmltYXRjaFxudmFyIEdsb2IgPSByZXF1aXJlKCcuL2dsb2IuanMnKS5HbG9iXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxudmFyIGlzQWJzb2x1dGUgPSByZXF1aXJlKCdwYXRoLWlzLWFic29sdXRlJylcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpXG52YXIgYWxwaGFzb3J0ID0gY29tbW9uLmFscGhhc29ydFxudmFyIGFscGhhc29ydGkgPSBjb21tb24uYWxwaGFzb3J0aVxudmFyIHNldG9wdHMgPSBjb21tb24uc2V0b3B0c1xudmFyIG93blByb3AgPSBjb21tb24ub3duUHJvcFxudmFyIGNoaWxkcmVuSWdub3JlZCA9IGNvbW1vbi5jaGlsZHJlbklnbm9yZWRcbnZhciBpc0lnbm9yZWQgPSBjb21tb24uaXNJZ25vcmVkXG5cbmZ1bmN0aW9uIGdsb2JTeW5jIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAzKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2NhbGxiYWNrIHByb3ZpZGVkIHRvIHN5bmMgZ2xvYlxcbicrXG4gICAgICAgICAgICAgICAgICAgICAgICAnU2VlOiBodHRwczovL2dpdGh1Yi5jb20vaXNhYWNzL25vZGUtZ2xvYi9pc3N1ZXMvMTY3JylcblxuICByZXR1cm4gbmV3IEdsb2JTeW5jKHBhdHRlcm4sIG9wdGlvbnMpLmZvdW5kXG59XG5cbmZ1bmN0aW9uIEdsb2JTeW5jIChwYXR0ZXJuLCBvcHRpb25zKSB7XG4gIGlmICghcGF0dGVybilcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ211c3QgcHJvdmlkZSBwYXR0ZXJuJylcblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYWxsYmFjayBwcm92aWRlZCB0byBzeW5jIGdsb2JcXG4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1NlZTogaHR0cHM6Ly9naXRodWIuY29tL2lzYWFjcy9ub2RlLWdsb2IvaXNzdWVzLzE2NycpXG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEdsb2JTeW5jKSlcbiAgICByZXR1cm4gbmV3IEdsb2JTeW5jKHBhdHRlcm4sIG9wdGlvbnMpXG5cbiAgc2V0b3B0cyh0aGlzLCBwYXR0ZXJuLCBvcHRpb25zKVxuXG4gIGlmICh0aGlzLm5vcHJvY2VzcylcbiAgICByZXR1cm4gdGhpc1xuXG4gIHZhciBuID0gdGhpcy5taW5pbWF0Y2guc2V0Lmxlbmd0aFxuICB0aGlzLm1hdGNoZXMgPSBuZXcgQXJyYXkobilcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpICsrKSB7XG4gICAgdGhpcy5fcHJvY2Vzcyh0aGlzLm1pbmltYXRjaC5zZXRbaV0sIGksIGZhbHNlKVxuICB9XG4gIHRoaXMuX2ZpbmlzaCgpXG59XG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICBhc3NlcnQodGhpcyBpbnN0YW5jZW9mIEdsb2JTeW5jKVxuICBpZiAodGhpcy5yZWFscGF0aCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHRoaXMubWF0Y2hlcy5mb3JFYWNoKGZ1bmN0aW9uIChtYXRjaHNldCwgaW5kZXgpIHtcbiAgICAgIHZhciBzZXQgPSBzZWxmLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgZm9yICh2YXIgcCBpbiBtYXRjaHNldCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHAgPSBzZWxmLl9tYWtlQWJzKHApXG4gICAgICAgICAgdmFyIHJlYWwgPSBycC5yZWFscGF0aFN5bmMocCwgc2VsZi5yZWFscGF0aENhY2hlKVxuICAgICAgICAgIHNldFtyZWFsXSA9IHRydWVcbiAgICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgICBpZiAoZXIuc3lzY2FsbCA9PT0gJ3N0YXQnKVxuICAgICAgICAgICAgc2V0W3NlbGYuX21ha2VBYnMocCldID0gdHJ1ZVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93IGVyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGNvbW1vbi5maW5pc2godGhpcylcbn1cblxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3Byb2Nlc3MgPSBmdW5jdGlvbiAocGF0dGVybiwgaW5kZXgsIGluR2xvYlN0YXIpIHtcbiAgYXNzZXJ0KHRoaXMgaW5zdGFuY2VvZiBHbG9iU3luYylcblxuICAvLyBHZXQgdGhlIGZpcnN0IFtuXSBwYXJ0cyBvZiBwYXR0ZXJuIHRoYXQgYXJlIGFsbCBzdHJpbmdzLlxuICB2YXIgbiA9IDBcbiAgd2hpbGUgKHR5cGVvZiBwYXR0ZXJuW25dID09PSAnc3RyaW5nJykge1xuICAgIG4gKytcbiAgfVxuICAvLyBub3cgbiBpcyB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IG9uZSB0aGF0IGlzICpub3QqIGEgc3RyaW5nLlxuXG4gIC8vIFNlZSBpZiB0aGVyZSdzIGFueXRoaW5nIGVsc2VcbiAgdmFyIHByZWZpeFxuICBzd2l0Y2ggKG4pIHtcbiAgICAvLyBpZiBub3QsIHRoZW4gdGhpcyBpcyByYXRoZXIgc2ltcGxlXG4gICAgY2FzZSBwYXR0ZXJuLmxlbmd0aDpcbiAgICAgIHRoaXMuX3Byb2Nlc3NTaW1wbGUocGF0dGVybi5qb2luKCcvJyksIGluZGV4KVxuICAgICAgcmV0dXJuXG5cbiAgICBjYXNlIDA6XG4gICAgICAvLyBwYXR0ZXJuICpzdGFydHMqIHdpdGggc29tZSBub24tdHJpdmlhbCBpdGVtLlxuICAgICAgLy8gZ29pbmcgdG8gcmVhZGRpcihjd2QpLCBidXQgbm90IGluY2x1ZGUgdGhlIHByZWZpeCBpbiBtYXRjaGVzLlxuICAgICAgcHJlZml4ID0gbnVsbFxuICAgICAgYnJlYWtcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBwYXR0ZXJuIGhhcyBzb21lIHN0cmluZyBiaXRzIGluIHRoZSBmcm9udC5cbiAgICAgIC8vIHdoYXRldmVyIGl0IHN0YXJ0cyB3aXRoLCB3aGV0aGVyIHRoYXQncyAnYWJzb2x1dGUnIGxpa2UgL2Zvby9iYXIsXG4gICAgICAvLyBvciAncmVsYXRpdmUnIGxpa2UgJy4uL2JheidcbiAgICAgIHByZWZpeCA9IHBhdHRlcm4uc2xpY2UoMCwgbikuam9pbignLycpXG4gICAgICBicmVha1xuICB9XG5cbiAgdmFyIHJlbWFpbiA9IHBhdHRlcm4uc2xpY2UobilcblxuICAvLyBnZXQgdGhlIGxpc3Qgb2YgZW50cmllcy5cbiAgdmFyIHJlYWRcbiAgaWYgKHByZWZpeCA9PT0gbnVsbClcbiAgICByZWFkID0gJy4nXG4gIGVsc2UgaWYgKGlzQWJzb2x1dGUocHJlZml4KSB8fCBpc0Fic29sdXRlKHBhdHRlcm4uam9pbignLycpKSkge1xuICAgIGlmICghcHJlZml4IHx8ICFpc0Fic29sdXRlKHByZWZpeCkpXG4gICAgICBwcmVmaXggPSAnLycgKyBwcmVmaXhcbiAgICByZWFkID0gcHJlZml4XG4gIH0gZWxzZVxuICAgIHJlYWQgPSBwcmVmaXhcblxuICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhyZWFkKVxuXG4gIC8vaWYgaWdub3JlZCwgc2tpcCBwcm9jZXNzaW5nXG4gIGlmIChjaGlsZHJlbklnbm9yZWQodGhpcywgcmVhZCkpXG4gICAgcmV0dXJuXG5cbiAgdmFyIGlzR2xvYlN0YXIgPSByZW1haW5bMF0gPT09IG1pbmltYXRjaC5HTE9CU1RBUlxuICBpZiAoaXNHbG9iU3RhcilcbiAgICB0aGlzLl9wcm9jZXNzR2xvYlN0YXIocHJlZml4LCByZWFkLCBhYnMsIHJlbWFpbiwgaW5kZXgsIGluR2xvYlN0YXIpXG4gIGVsc2VcbiAgICB0aGlzLl9wcm9jZXNzUmVhZGRpcihwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3Rhcilcbn1cblxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3Byb2Nlc3NSZWFkZGlyID0gZnVuY3Rpb24gKHByZWZpeCwgcmVhZCwgYWJzLCByZW1haW4sIGluZGV4LCBpbkdsb2JTdGFyKSB7XG4gIHZhciBlbnRyaWVzID0gdGhpcy5fcmVhZGRpcihhYnMsIGluR2xvYlN0YXIpXG5cbiAgLy8gaWYgdGhlIGFicyBpc24ndCBhIGRpciwgdGhlbiBub3RoaW5nIGNhbiBtYXRjaCFcbiAgaWYgKCFlbnRyaWVzKVxuICAgIHJldHVyblxuXG4gIC8vIEl0IHdpbGwgb25seSBtYXRjaCBkb3QgZW50cmllcyBpZiBpdCBzdGFydHMgd2l0aCBhIGRvdCwgb3IgaWZcbiAgLy8gZG90IGlzIHNldC4gIFN0dWZmIGxpa2UgQCguZm9vfC5iYXIpIGlzbid0IGFsbG93ZWQuXG4gIHZhciBwbiA9IHJlbWFpblswXVxuICB2YXIgbmVnYXRlID0gISF0aGlzLm1pbmltYXRjaC5uZWdhdGVcbiAgdmFyIHJhd0dsb2IgPSBwbi5fZ2xvYlxuICB2YXIgZG90T2sgPSB0aGlzLmRvdCB8fCByYXdHbG9iLmNoYXJBdCgwKSA9PT0gJy4nXG5cbiAgdmFyIG1hdGNoZWRFbnRyaWVzID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGUgPSBlbnRyaWVzW2ldXG4gICAgaWYgKGUuY2hhckF0KDApICE9PSAnLicgfHwgZG90T2spIHtcbiAgICAgIHZhciBtXG4gICAgICBpZiAobmVnYXRlICYmICFwcmVmaXgpIHtcbiAgICAgICAgbSA9ICFlLm1hdGNoKHBuKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbSA9IGUubWF0Y2gocG4pXG4gICAgICB9XG4gICAgICBpZiAobSlcbiAgICAgICAgbWF0Y2hlZEVudHJpZXMucHVzaChlKVxuICAgIH1cbiAgfVxuXG4gIHZhciBsZW4gPSBtYXRjaGVkRW50cmllcy5sZW5ndGhcbiAgLy8gSWYgdGhlcmUgYXJlIG5vIG1hdGNoZWQgZW50cmllcywgdGhlbiBub3RoaW5nIG1hdGNoZXMuXG4gIGlmIChsZW4gPT09IDApXG4gICAgcmV0dXJuXG5cbiAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCByZW1haW5pbmcgcGF0dGVybiBiaXQsIHRoZW4gbm8gbmVlZCBmb3JcbiAgLy8gYW4gYWRkaXRpb25hbCBzdGF0ICp1bmxlc3MqIHRoZSB1c2VyIGhhcyBzcGVjaWZpZWQgbWFyayBvclxuICAvLyBzdGF0IGV4cGxpY2l0bHkuICBXZSBrbm93IHRoZXkgZXhpc3QsIHNpbmNlIHJlYWRkaXIgcmV0dXJuZWRcbiAgLy8gdGhlbS5cblxuICBpZiAocmVtYWluLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5tYXJrICYmICF0aGlzLnN0YXQpIHtcbiAgICBpZiAoIXRoaXMubWF0Y2hlc1tpbmRleF0pXG4gICAgICB0aGlzLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKyspIHtcbiAgICAgIHZhciBlID0gbWF0Y2hlZEVudHJpZXNbaV1cbiAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgaWYgKHByZWZpeC5zbGljZSgtMSkgIT09ICcvJylcbiAgICAgICAgICBlID0gcHJlZml4ICsgJy8nICsgZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgZSA9IHByZWZpeCArIGVcbiAgICAgIH1cblxuICAgICAgaWYgKGUuY2hhckF0KDApID09PSAnLycgJiYgIXRoaXMubm9tb3VudCkge1xuICAgICAgICBlID0gcGF0aC5qb2luKHRoaXMucm9vdCwgZSlcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VtaXRNYXRjaChpbmRleCwgZSlcbiAgICB9XG4gICAgLy8gVGhpcyB3YXMgdGhlIGxhc3Qgb25lLCBhbmQgbm8gc3RhdHMgd2VyZSBuZWVkZWRcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIG5vdyB0ZXN0IGFsbCBtYXRjaGVkIGVudHJpZXMgYXMgc3RhbmQtaW5zIGZvciB0aGF0IHBhcnRcbiAgLy8gb2YgdGhlIHBhdHRlcm4uXG4gIHJlbWFpbi5zaGlmdCgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICsrKSB7XG4gICAgdmFyIGUgPSBtYXRjaGVkRW50cmllc1tpXVxuICAgIHZhciBuZXdQYXR0ZXJuXG4gICAgaWYgKHByZWZpeClcbiAgICAgIG5ld1BhdHRlcm4gPSBbcHJlZml4LCBlXVxuICAgIGVsc2VcbiAgICAgIG5ld1BhdHRlcm4gPSBbZV1cbiAgICB0aGlzLl9wcm9jZXNzKG5ld1BhdHRlcm4uY29uY2F0KHJlbWFpbiksIGluZGV4LCBpbkdsb2JTdGFyKVxuICB9XG59XG5cblxuR2xvYlN5bmMucHJvdG90eXBlLl9lbWl0TWF0Y2ggPSBmdW5jdGlvbiAoaW5kZXgsIGUpIHtcbiAgaWYgKGlzSWdub3JlZCh0aGlzLCBlKSlcbiAgICByZXR1cm5cblxuICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhlKVxuXG4gIGlmICh0aGlzLm1hcmspXG4gICAgZSA9IHRoaXMuX21hcmsoZSlcblxuICBpZiAodGhpcy5hYnNvbHV0ZSkge1xuICAgIGUgPSBhYnNcbiAgfVxuXG4gIGlmICh0aGlzLm1hdGNoZXNbaW5kZXhdW2VdKVxuICAgIHJldHVyblxuXG4gIGlmICh0aGlzLm5vZGlyKSB7XG4gICAgdmFyIGMgPSB0aGlzLmNhY2hlW2Fic11cbiAgICBpZiAoYyA9PT0gJ0RJUicgfHwgQXJyYXkuaXNBcnJheShjKSlcbiAgICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5tYXRjaGVzW2luZGV4XVtlXSA9IHRydWVcblxuICBpZiAodGhpcy5zdGF0KVxuICAgIHRoaXMuX3N0YXQoZSlcbn1cblxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3JlYWRkaXJJbkdsb2JTdGFyID0gZnVuY3Rpb24gKGFicykge1xuICAvLyBmb2xsb3cgYWxsIHN5bWxpbmtlZCBkaXJlY3RvcmllcyBmb3JldmVyXG4gIC8vIGp1c3QgcHJvY2VlZCBhcyBpZiB0aGlzIGlzIGEgbm9uLWdsb2JzdGFyIHNpdHVhdGlvblxuICBpZiAodGhpcy5mb2xsb3cpXG4gICAgcmV0dXJuIHRoaXMuX3JlYWRkaXIoYWJzLCBmYWxzZSlcblxuICB2YXIgZW50cmllc1xuICB2YXIgbHN0YXRcbiAgdmFyIHN0YXRcbiAgdHJ5IHtcbiAgICBsc3RhdCA9IGZzLmxzdGF0U3luYyhhYnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgLy8gbHN0YXQgZmFpbGVkLCBkb2Vzbid0IGV4aXN0XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZhciBpc1N5bSA9IGxzdGF0LmlzU3ltYm9saWNMaW5rKClcbiAgdGhpcy5zeW1saW5rc1thYnNdID0gaXNTeW1cblxuICAvLyBJZiBpdCdzIG5vdCBhIHN5bWxpbmsgb3IgYSBkaXIsIHRoZW4gaXQncyBkZWZpbml0ZWx5IGEgcmVndWxhciBmaWxlLlxuICAvLyBkb24ndCBib3RoZXIgZG9pbmcgYSByZWFkZGlyIGluIHRoYXQgY2FzZS5cbiAgaWYgKCFpc1N5bSAmJiAhbHN0YXQuaXNEaXJlY3RvcnkoKSlcbiAgICB0aGlzLmNhY2hlW2Fic10gPSAnRklMRSdcbiAgZWxzZVxuICAgIGVudHJpZXMgPSB0aGlzLl9yZWFkZGlyKGFicywgZmFsc2UpXG5cbiAgcmV0dXJuIGVudHJpZXNcbn1cblxuR2xvYlN5bmMucHJvdG90eXBlLl9yZWFkZGlyID0gZnVuY3Rpb24gKGFicywgaW5HbG9iU3Rhcikge1xuICB2YXIgZW50cmllc1xuXG4gIGlmIChpbkdsb2JTdGFyICYmICFvd25Qcm9wKHRoaXMuc3ltbGlua3MsIGFicykpXG4gICAgcmV0dXJuIHRoaXMuX3JlYWRkaXJJbkdsb2JTdGFyKGFicylcblxuICBpZiAob3duUHJvcCh0aGlzLmNhY2hlLCBhYnMpKSB7XG4gICAgdmFyIGMgPSB0aGlzLmNhY2hlW2Fic11cbiAgICBpZiAoIWMgfHwgYyA9PT0gJ0ZJTEUnKVxuICAgICAgcmV0dXJuIG51bGxcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGMpKVxuICAgICAgcmV0dXJuIGNcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRkaXJFbnRyaWVzKGFicywgZnMucmVhZGRpclN5bmMoYWJzKSlcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICB0aGlzLl9yZWFkZGlyRXJyb3IoYWJzLCBlcilcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fcmVhZGRpckVudHJpZXMgPSBmdW5jdGlvbiAoYWJzLCBlbnRyaWVzKSB7XG4gIC8vIGlmIHdlIGhhdmVuJ3QgYXNrZWQgdG8gc3RhdCBldmVyeXRoaW5nLCB0aGVuIGp1c3RcbiAgLy8gYXNzdW1lIHRoYXQgZXZlcnl0aGluZyBpbiB0aGVyZSBleGlzdHMsIHNvIHdlIGNhbiBhdm9pZFxuICAvLyBoYXZpbmcgdG8gc3RhdCBpdCBhIHNlY29uZCB0aW1lLlxuICBpZiAoIXRoaXMubWFyayAmJiAhdGhpcy5zdGF0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSArKykge1xuICAgICAgdmFyIGUgPSBlbnRyaWVzW2ldXG4gICAgICBpZiAoYWJzID09PSAnLycpXG4gICAgICAgIGUgPSBhYnMgKyBlXG4gICAgICBlbHNlXG4gICAgICAgIGUgPSBhYnMgKyAnLycgKyBlXG4gICAgICB0aGlzLmNhY2hlW2VdID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2FjaGVbYWJzXSA9IGVudHJpZXNcblxuICAvLyBtYXJrIGFuZCBjYWNoZSBkaXItbmVzc1xuICByZXR1cm4gZW50cmllc1xufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3JlYWRkaXJFcnJvciA9IGZ1bmN0aW9uIChmLCBlcikge1xuICAvLyBoYW5kbGUgZXJyb3JzLCBhbmQgY2FjaGUgdGhlIGluZm9ybWF0aW9uXG4gIHN3aXRjaCAoZXIuY29kZSkge1xuICAgIGNhc2UgJ0VOT1RTVVAnOiAvLyBodHRwczovL2dpdGh1Yi5jb20vaXNhYWNzL25vZGUtZ2xvYi9pc3N1ZXMvMjA1XG4gICAgY2FzZSAnRU5PVERJUic6IC8vIHRvdGFsbHkgbm9ybWFsLiBtZWFucyBpdCAqZG9lcyogZXhpc3QuXG4gICAgICB2YXIgYWJzID0gdGhpcy5fbWFrZUFicyhmKVxuICAgICAgdGhpcy5jYWNoZVthYnNdID0gJ0ZJTEUnXG4gICAgICBpZiAoYWJzID09PSB0aGlzLmN3ZEFicykge1xuICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoZXIuY29kZSArICcgaW52YWxpZCBjd2QgJyArIHRoaXMuY3dkKVxuICAgICAgICBlcnJvci5wYXRoID0gdGhpcy5jd2RcbiAgICAgICAgZXJyb3IuY29kZSA9IGVyLmNvZGVcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdFTk9FTlQnOiAvLyBub3QgdGVycmlibHkgdW51c3VhbFxuICAgIGNhc2UgJ0VMT09QJzpcbiAgICBjYXNlICdFTkFNRVRPT0xPTkcnOlxuICAgIGNhc2UgJ1VOS05PV04nOlxuICAgICAgdGhpcy5jYWNoZVt0aGlzLl9tYWtlQWJzKGYpXSA9IGZhbHNlXG4gICAgICBicmVha1xuXG4gICAgZGVmYXVsdDogLy8gc29tZSB1bnVzdWFsIGVycm9yLiAgVHJlYXQgYXMgZmFpbHVyZS5cbiAgICAgIHRoaXMuY2FjaGVbdGhpcy5fbWFrZUFicyhmKV0gPSBmYWxzZVxuICAgICAgaWYgKHRoaXMuc3RyaWN0KVxuICAgICAgICB0aHJvdyBlclxuICAgICAgaWYgKCF0aGlzLnNpbGVudClcbiAgICAgICAgY29uc29sZS5lcnJvcignZ2xvYiBlcnJvcicsIGVyKVxuICAgICAgYnJlYWtcbiAgfVxufVxuXG5HbG9iU3luYy5wcm90b3R5cGUuX3Byb2Nlc3NHbG9iU3RhciA9IGZ1bmN0aW9uIChwcmVmaXgsIHJlYWQsIGFicywgcmVtYWluLCBpbmRleCwgaW5HbG9iU3Rhcikge1xuXG4gIHZhciBlbnRyaWVzID0gdGhpcy5fcmVhZGRpcihhYnMsIGluR2xvYlN0YXIpXG5cbiAgLy8gbm8gZW50cmllcyBtZWFucyBub3QgYSBkaXIsIHNvIGl0IGNhbiBuZXZlciBoYXZlIG1hdGNoZXNcbiAgLy8gZm9vLnR4dC8qKiBkb2Vzbid0IG1hdGNoIGZvby50eHRcbiAgaWYgKCFlbnRyaWVzKVxuICAgIHJldHVyblxuXG4gIC8vIHRlc3Qgd2l0aG91dCB0aGUgZ2xvYnN0YXIsIGFuZCB3aXRoIGV2ZXJ5IGNoaWxkIGJvdGggYmVsb3dcbiAgLy8gYW5kIHJlcGxhY2luZyB0aGUgZ2xvYnN0YXIuXG4gIHZhciByZW1haW5XaXRob3V0R2xvYlN0YXIgPSByZW1haW4uc2xpY2UoMSlcbiAgdmFyIGdzcHJlZiA9IHByZWZpeCA/IFsgcHJlZml4IF0gOiBbXVxuICB2YXIgbm9HbG9iU3RhciA9IGdzcHJlZi5jb25jYXQocmVtYWluV2l0aG91dEdsb2JTdGFyKVxuXG4gIC8vIHRoZSBub0dsb2JTdGFyIHBhdHRlcm4gZXhpdHMgdGhlIGluR2xvYlN0YXIgc3RhdGVcbiAgdGhpcy5fcHJvY2Vzcyhub0dsb2JTdGFyLCBpbmRleCwgZmFsc2UpXG5cbiAgdmFyIGxlbiA9IGVudHJpZXMubGVuZ3RoXG4gIHZhciBpc1N5bSA9IHRoaXMuc3ltbGlua3NbYWJzXVxuXG4gIC8vIElmIGl0J3MgYSBzeW1saW5rLCBhbmQgd2UncmUgaW4gYSBnbG9ic3RhciwgdGhlbiBzdG9wXG4gIGlmIChpc1N5bSAmJiBpbkdsb2JTdGFyKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgZSA9IGVudHJpZXNbaV1cbiAgICBpZiAoZS5jaGFyQXQoMCkgPT09ICcuJyAmJiAhdGhpcy5kb3QpXG4gICAgICBjb250aW51ZVxuXG4gICAgLy8gdGhlc2UgdHdvIGNhc2VzIGVudGVyIHRoZSBpbkdsb2JTdGFyIHN0YXRlXG4gICAgdmFyIGluc3RlYWQgPSBnc3ByZWYuY29uY2F0KGVudHJpZXNbaV0sIHJlbWFpbldpdGhvdXRHbG9iU3RhcilcbiAgICB0aGlzLl9wcm9jZXNzKGluc3RlYWQsIGluZGV4LCB0cnVlKVxuXG4gICAgdmFyIGJlbG93ID0gZ3NwcmVmLmNvbmNhdChlbnRyaWVzW2ldLCByZW1haW4pXG4gICAgdGhpcy5fcHJvY2VzcyhiZWxvdywgaW5kZXgsIHRydWUpXG4gIH1cbn1cblxuR2xvYlN5bmMucHJvdG90eXBlLl9wcm9jZXNzU2ltcGxlID0gZnVuY3Rpb24gKHByZWZpeCwgaW5kZXgpIHtcbiAgLy8gWFhYIHJldmlldyB0aGlzLiAgU2hvdWxkbid0IGl0IGJlIGRvaW5nIHRoZSBtb3VudGluZyBldGNcbiAgLy8gYmVmb3JlIGRvaW5nIHN0YXQ/ICBraW5kYSB3ZWlyZD9cbiAgdmFyIGV4aXN0cyA9IHRoaXMuX3N0YXQocHJlZml4KVxuXG4gIGlmICghdGhpcy5tYXRjaGVzW2luZGV4XSlcbiAgICB0aGlzLm1hdGNoZXNbaW5kZXhdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIC8vIElmIGl0IGRvZXNuJ3QgZXhpc3QsIHRoZW4ganVzdCBtYXJrIHRoZSBsYWNrIG9mIHJlc3VsdHNcbiAgaWYgKCFleGlzdHMpXG4gICAgcmV0dXJuXG5cbiAgaWYgKHByZWZpeCAmJiBpc0Fic29sdXRlKHByZWZpeCkgJiYgIXRoaXMubm9tb3VudCkge1xuICAgIHZhciB0cmFpbCA9IC9bXFwvXFxcXF0kLy50ZXN0KHByZWZpeClcbiAgICBpZiAocHJlZml4LmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgICBwcmVmaXggPSBwYXRoLmpvaW4odGhpcy5yb290LCBwcmVmaXgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHByZWZpeCA9IHBhdGgucmVzb2x2ZSh0aGlzLnJvb3QsIHByZWZpeClcbiAgICAgIGlmICh0cmFpbClcbiAgICAgICAgcHJlZml4ICs9ICcvJ1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKVxuICAgIHByZWZpeCA9IHByZWZpeC5yZXBsYWNlKC9cXFxcL2csICcvJylcblxuICAvLyBNYXJrIHRoaXMgYXMgYSBtYXRjaFxuICB0aGlzLl9lbWl0TWF0Y2goaW5kZXgsIHByZWZpeClcbn1cblxuLy8gUmV0dXJucyBlaXRoZXIgJ0RJUicsICdGSUxFJywgb3IgZmFsc2Vcbkdsb2JTeW5jLnByb3RvdHlwZS5fc3RhdCA9IGZ1bmN0aW9uIChmKSB7XG4gIHZhciBhYnMgPSB0aGlzLl9tYWtlQWJzKGYpXG4gIHZhciBuZWVkRGlyID0gZi5zbGljZSgtMSkgPT09ICcvJ1xuXG4gIGlmIChmLmxlbmd0aCA+IHRoaXMubWF4TGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGlmICghdGhpcy5zdGF0ICYmIG93blByb3AodGhpcy5jYWNoZSwgYWJzKSkge1xuICAgIHZhciBjID0gdGhpcy5jYWNoZVthYnNdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjKSlcbiAgICAgIGMgPSAnRElSJ1xuXG4gICAgLy8gSXQgZXhpc3RzLCBidXQgbWF5YmUgbm90IGhvdyB3ZSBuZWVkIGl0XG4gICAgaWYgKCFuZWVkRGlyIHx8IGMgPT09ICdESVInKVxuICAgICAgcmV0dXJuIGNcblxuICAgIGlmIChuZWVkRGlyICYmIGMgPT09ICdGSUxFJylcbiAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgLy8gb3RoZXJ3aXNlIHdlIGhhdmUgdG8gc3RhdCwgYmVjYXVzZSBtYXliZSBjPXRydWVcbiAgICAvLyBpZiB3ZSBrbm93IGl0IGV4aXN0cywgYnV0IG5vdCB3aGF0IGl0IGlzLlxuICB9XG5cbiAgdmFyIGV4aXN0c1xuICB2YXIgc3RhdCA9IHRoaXMuc3RhdENhY2hlW2Fic11cbiAgaWYgKCFzdGF0KSB7XG4gICAgdmFyIGxzdGF0XG4gICAgdHJ5IHtcbiAgICAgIGxzdGF0ID0gZnMubHN0YXRTeW5jKGFicylcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKGxzdGF0LmlzU3ltYm9saWNMaW5rKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YXQgPSBmcy5zdGF0U3luYyhhYnMpXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICBzdGF0ID0gbHN0YXRcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdCA9IGxzdGF0XG4gICAgfVxuICB9XG5cbiAgdGhpcy5zdGF0Q2FjaGVbYWJzXSA9IHN0YXRcblxuICB2YXIgYyA9IHN0YXQuaXNEaXJlY3RvcnkoKSA/ICdESVInIDogJ0ZJTEUnXG4gIHRoaXMuY2FjaGVbYWJzXSA9IHRoaXMuY2FjaGVbYWJzXSB8fCBjXG5cbiAgaWYgKG5lZWREaXIgJiYgYyAhPT0gJ0RJUicpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgcmV0dXJuIGNcbn1cblxuR2xvYlN5bmMucHJvdG90eXBlLl9tYXJrID0gZnVuY3Rpb24gKHApIHtcbiAgcmV0dXJuIGNvbW1vbi5tYXJrKHRoaXMsIHApXG59XG5cbkdsb2JTeW5jLnByb3RvdHlwZS5fbWFrZUFicyA9IGZ1bmN0aW9uIChmKSB7XG4gIHJldHVybiBjb21tb24ubWFrZUFicyh0aGlzLCBmKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dsb2Ivc3luYy5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpLlN0cmVhbVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxlZ2FjeVxuXG5mdW5jdGlvbiBsZWdhY3kgKGZzKSB7XG4gIHJldHVybiB7XG4gICAgUmVhZFN0cmVhbTogUmVhZFN0cmVhbSxcbiAgICBXcml0ZVN0cmVhbTogV3JpdGVTdHJlYW1cbiAgfVxuXG4gIGZ1bmN0aW9uIFJlYWRTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVhZFN0cmVhbSkpIHJldHVybiBuZXcgUmVhZFN0cmVhbShwYXRoLCBvcHRpb25zKTtcblxuICAgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmZkID0gbnVsbDtcbiAgICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5mbGFncyA9ICdyJztcbiAgICB0aGlzLm1vZGUgPSA0Mzg7IC8qPTA2NjYqL1xuICAgIHRoaXMuYnVmZmVyU2l6ZSA9IDY0ICogMTAyNDtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gTWl4aW4gb3B0aW9ucyBpbnRvIHRoaXNcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5jb2RpbmcpIHRoaXMuc2V0RW5jb2RpbmcodGhpcy5lbmNvZGluZyk7XG5cbiAgICBpZiAodGhpcy5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiB0aGlzLnN0YXJ0KSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignc3RhcnQgbXVzdCBiZSBhIE51bWJlcicpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbmQgPSBJbmZpbml0eTtcbiAgICAgIH0gZWxzZSBpZiAoJ251bWJlcicgIT09IHR5cGVvZiB0aGlzLmVuZCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2VuZCBtdXN0IGJlIGEgTnVtYmVyJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnN0YXJ0ID4gdGhpcy5lbmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydCBtdXN0IGJlIDw9IGVuZCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcyA9IHRoaXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmQgIT09IG51bGwpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuX3JlYWQoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZzLm9wZW4odGhpcy5wYXRoLCB0aGlzLmZsYWdzLCB0aGlzLm1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICBzZWxmLnJlYWRhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5mZCA9IGZkO1xuICAgICAgc2VsZi5lbWl0KCdvcGVuJywgZmQpO1xuICAgICAgc2VsZi5fcmVhZCgpO1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBXcml0ZVN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBXcml0ZVN0cmVhbSkpIHJldHVybiBuZXcgV3JpdGVTdHJlYW0ocGF0aCwgb3B0aW9ucyk7XG5cbiAgICBTdHJlYW0uY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5mZCA9IG51bGw7XG4gICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG5cbiAgICB0aGlzLmZsYWdzID0gJ3cnO1xuICAgIHRoaXMuZW5jb2RpbmcgPSAnYmluYXJ5JztcbiAgICB0aGlzLm1vZGUgPSA0Mzg7IC8qPTA2NjYqL1xuICAgIHRoaXMuYnl0ZXNXcml0dGVuID0gMDtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gTWl4aW4gb3B0aW9ucyBpbnRvIHRoaXNcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5zdGFydCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3N0YXJ0IG11c3QgYmUgYSBOdW1iZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN0YXJ0IDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0YXJ0IG11c3QgYmUgPj0gemVybycpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcyA9IHRoaXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgdGhpcy5fcXVldWUgPSBbXTtcblxuICAgIGlmICh0aGlzLmZkID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9vcGVuID0gZnMub3BlbjtcbiAgICAgIHRoaXMuX3F1ZXVlLnB1c2goW3RoaXMuX29wZW4sIHRoaXMucGF0aCwgdGhpcy5mbGFncywgdGhpcy5tb2RlLCB1bmRlZmluZWRdKTtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ncmFjZWZ1bC1mcy9sZWdhY3ktc3RyZWFtcy5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGZzID0gcmVxdWlyZSgnLi9mcy5qcycpXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnY29uc3RhbnRzJylcblxudmFyIG9yaWdDd2QgPSBwcm9jZXNzLmN3ZFxudmFyIGN3ZCA9IG51bGxcblxudmFyIHBsYXRmb3JtID0gcHJvY2Vzcy5lbnYuR1JBQ0VGVUxfRlNfUExBVEZPUk0gfHwgcHJvY2Vzcy5wbGF0Zm9ybVxuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIWN3ZClcbiAgICBjd2QgPSBvcmlnQ3dkLmNhbGwocHJvY2VzcylcbiAgcmV0dXJuIGN3ZFxufVxudHJ5IHtcbiAgcHJvY2Vzcy5jd2QoKVxufSBjYXRjaCAoZXIpIHt9XG5cbnZhciBjaGRpciA9IHByb2Nlc3MuY2hkaXJcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbihkKSB7XG4gIGN3ZCA9IG51bGxcbiAgY2hkaXIuY2FsbChwcm9jZXNzLCBkKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoXG5cbmZ1bmN0aW9uIHBhdGNoIChmcykge1xuICAvLyAocmUtKWltcGxlbWVudCBzb21lIHRoaW5ncyB0aGF0IGFyZSBrbm93biBidXN0ZWQgb3IgbWlzc2luZy5cblxuICAvLyBsY2htb2QsIGJyb2tlbiBwcmlvciB0byAwLjYuMlxuICAvLyBiYWNrLXBvcnQgdGhlIGZpeCBoZXJlLlxuICBpZiAoY29uc3RhbnRzLmhhc093blByb3BlcnR5KCdPX1NZTUxJTksnKSAmJlxuICAgICAgcHJvY2Vzcy52ZXJzaW9uLm1hdGNoKC9edjBcXC42XFwuWzAtMl18XnYwXFwuNVxcLi8pKSB7XG4gICAgcGF0Y2hMY2htb2QoZnMpXG4gIH1cblxuICAvLyBsdXRpbWVzIGltcGxlbWVudGF0aW9uLCBvciBuby1vcFxuICBpZiAoIWZzLmx1dGltZXMpIHtcbiAgICBwYXRjaEx1dGltZXMoZnMpXG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vaXNhYWNzL25vZGUtZ3JhY2VmdWwtZnMvaXNzdWVzLzRcbiAgLy8gQ2hvd24gc2hvdWxkIG5vdCBmYWlsIG9uIGVpbnZhbCBvciBlcGVybSBpZiBub24tcm9vdC5cbiAgLy8gSXQgc2hvdWxkIG5vdCBmYWlsIG9uIGVub3N5cyBldmVyLCBhcyB0aGlzIGp1c3QgaW5kaWNhdGVzXG4gIC8vIHRoYXQgYSBmcyBkb2Vzbid0IHN1cHBvcnQgdGhlIGludGVuZGVkIG9wZXJhdGlvbi5cblxuICBmcy5jaG93biA9IGNob3duRml4KGZzLmNob3duKVxuICBmcy5mY2hvd24gPSBjaG93bkZpeChmcy5mY2hvd24pXG4gIGZzLmxjaG93biA9IGNob3duRml4KGZzLmxjaG93bilcblxuICBmcy5jaG1vZCA9IGNobW9kRml4KGZzLmNobW9kKVxuICBmcy5mY2htb2QgPSBjaG1vZEZpeChmcy5mY2htb2QpXG4gIGZzLmxjaG1vZCA9IGNobW9kRml4KGZzLmxjaG1vZClcblxuICBmcy5jaG93blN5bmMgPSBjaG93bkZpeFN5bmMoZnMuY2hvd25TeW5jKVxuICBmcy5mY2hvd25TeW5jID0gY2hvd25GaXhTeW5jKGZzLmZjaG93blN5bmMpXG4gIGZzLmxjaG93blN5bmMgPSBjaG93bkZpeFN5bmMoZnMubGNob3duU3luYylcblxuICBmcy5jaG1vZFN5bmMgPSBjaG1vZEZpeFN5bmMoZnMuY2htb2RTeW5jKVxuICBmcy5mY2htb2RTeW5jID0gY2htb2RGaXhTeW5jKGZzLmZjaG1vZFN5bmMpXG4gIGZzLmxjaG1vZFN5bmMgPSBjaG1vZEZpeFN5bmMoZnMubGNobW9kU3luYylcblxuICBmcy5zdGF0ID0gc3RhdEZpeChmcy5zdGF0KVxuICBmcy5mc3RhdCA9IHN0YXRGaXgoZnMuZnN0YXQpXG4gIGZzLmxzdGF0ID0gc3RhdEZpeChmcy5sc3RhdClcblxuICBmcy5zdGF0U3luYyA9IHN0YXRGaXhTeW5jKGZzLnN0YXRTeW5jKVxuICBmcy5mc3RhdFN5bmMgPSBzdGF0Rml4U3luYyhmcy5mc3RhdFN5bmMpXG4gIGZzLmxzdGF0U3luYyA9IHN0YXRGaXhTeW5jKGZzLmxzdGF0U3luYylcblxuICAvLyBpZiBsY2htb2QvbGNob3duIGRvIG5vdCBleGlzdCwgdGhlbiBtYWtlIHRoZW0gbm8tb3BzXG4gIGlmICghZnMubGNobW9kKSB7XG4gICAgZnMubGNobW9kID0gZnVuY3Rpb24gKHBhdGgsIG1vZGUsIGNiKSB7XG4gICAgICBpZiAoY2IpIHByb2Nlc3MubmV4dFRpY2soY2IpXG4gICAgfVxuICAgIGZzLmxjaG1vZFN5bmMgPSBmdW5jdGlvbiAoKSB7fVxuICB9XG4gIGlmICghZnMubGNob3duKSB7XG4gICAgZnMubGNob3duID0gZnVuY3Rpb24gKHBhdGgsIHVpZCwgZ2lkLCBjYikge1xuICAgICAgaWYgKGNiKSBwcm9jZXNzLm5leHRUaWNrKGNiKVxuICAgIH1cbiAgICBmcy5sY2hvd25TeW5jID0gZnVuY3Rpb24gKCkge31cbiAgfVxuXG4gIC8vIG9uIFdpbmRvd3MsIEEvViBzb2Z0d2FyZSBjYW4gbG9jayB0aGUgZGlyZWN0b3J5LCBjYXVzaW5nIHRoaXNcbiAgLy8gdG8gZmFpbCB3aXRoIGFuIEVBQ0NFUyBvciBFUEVSTSBpZiB0aGUgZGlyZWN0b3J5IGNvbnRhaW5zIG5ld2x5XG4gIC8vIGNyZWF0ZWQgZmlsZXMuICBUcnkgYWdhaW4gb24gZmFpbHVyZSwgZm9yIHVwIHRvIDYwIHNlY29uZHMuXG5cbiAgLy8gU2V0IHRoZSB0aW1lb3V0IHRoaXMgbG9uZyBiZWNhdXNlIHNvbWUgV2luZG93cyBBbnRpLVZpcnVzLCBzdWNoIGFzIFBhcml0eVxuICAvLyBiaXQ5LCBtYXkgbG9jayBmaWxlcyBmb3IgdXAgdG8gYSBtaW51dGUsIGNhdXNpbmcgbnBtIHBhY2thZ2UgaW5zdGFsbFxuICAvLyBmYWlsdXJlcy4gQWxzbywgdGFrZSBjYXJlIHRvIHlpZWxkIHRoZSBzY2hlZHVsZXIuIFdpbmRvd3Mgc2NoZWR1bGluZyBnaXZlc1xuICAvLyBDUFUgdG8gYSBidXN5IGxvb3BpbmcgcHJvY2Vzcywgd2hpY2ggY2FuIGNhdXNlIHRoZSBwcm9ncmFtIGNhdXNpbmcgdGhlIGxvY2tcbiAgLy8gY29udGVudGlvbiB0byBiZSBzdGFydmVkIG9mIENQVSBieSBub2RlLCBzbyB0aGUgY29udGVudGlvbiBkb2Vzbid0IHJlc29sdmUuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiKSB7XG4gICAgZnMucmVuYW1lID0gKGZ1bmN0aW9uIChmcyRyZW5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChmcm9tLCB0bywgY2IpIHtcbiAgICAgIHZhciBzdGFydCA9IERhdGUubm93KClcbiAgICAgIHZhciBiYWNrb2ZmID0gMDtcbiAgICAgIGZzJHJlbmFtZShmcm9tLCB0bywgZnVuY3Rpb24gQ0IgKGVyKSB7XG4gICAgICAgIGlmIChlclxuICAgICAgICAgICAgJiYgKGVyLmNvZGUgPT09IFwiRUFDQ0VTXCIgfHwgZXIuY29kZSA9PT0gXCJFUEVSTVwiKVxuICAgICAgICAgICAgJiYgRGF0ZS5ub3coKSAtIHN0YXJ0IDwgNjAwMDApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZnMuc3RhdCh0bywgZnVuY3Rpb24gKHN0YXRlciwgc3QpIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlciAmJiBzdGF0ZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgICAgICAgICAgICBmcyRyZW5hbWUoZnJvbSwgdG8sIENCKTtcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNiKGVyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LCBiYWNrb2ZmKVxuICAgICAgICAgIGlmIChiYWNrb2ZmIDwgMTAwKVxuICAgICAgICAgICAgYmFja29mZiArPSAxMDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNiKSBjYihlcilcbiAgICAgIH0pXG4gICAgfX0pKGZzLnJlbmFtZSlcbiAgfVxuXG4gIC8vIGlmIHJlYWQoKSByZXR1cm5zIEVBR0FJTiwgdGhlbiBqdXN0IHRyeSBpdCBhZ2Fpbi5cbiAgZnMucmVhZCA9IChmdW5jdGlvbiAoZnMkcmVhZCkgeyByZXR1cm4gZnVuY3Rpb24gKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2tfKSB7XG4gICAgdmFyIGNhbGxiYWNrXG4gICAgaWYgKGNhbGxiYWNrXyAmJiB0eXBlb2YgY2FsbGJhY2tfID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgZWFnQ291bnRlciA9IDBcbiAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGVyLCBfLCBfXykge1xuICAgICAgICBpZiAoZXIgJiYgZXIuY29kZSA9PT0gJ0VBR0FJTicgJiYgZWFnQ291bnRlciA8IDEwKSB7XG4gICAgICAgICAgZWFnQ291bnRlciArK1xuICAgICAgICAgIHJldHVybiBmcyRyZWFkLmNhbGwoZnMsIGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spXG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2tfLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZzJHJlYWQuY2FsbChmcywgZmQsIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvc2l0aW9uLCBjYWxsYmFjaylcbiAgfX0pKGZzLnJlYWQpXG5cbiAgZnMucmVhZFN5bmMgPSAoZnVuY3Rpb24gKGZzJHJlYWRTeW5jKSB7IHJldHVybiBmdW5jdGlvbiAoZmQsIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvc2l0aW9uKSB7XG4gICAgdmFyIGVhZ0NvdW50ZXIgPSAwXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmcyRyZWFkU3luYy5jYWxsKGZzLCBmZCwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24pXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICBpZiAoZXIuY29kZSA9PT0gJ0VBR0FJTicgJiYgZWFnQ291bnRlciA8IDEwKSB7XG4gICAgICAgICAgZWFnQ291bnRlciArK1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJcbiAgICAgIH1cbiAgICB9XG4gIH19KShmcy5yZWFkU3luYylcbn1cblxuZnVuY3Rpb24gcGF0Y2hMY2htb2QgKGZzKSB7XG4gIGZzLmxjaG1vZCA9IGZ1bmN0aW9uIChwYXRoLCBtb2RlLCBjYWxsYmFjaykge1xuICAgIGZzLm9wZW4oIHBhdGhcbiAgICAgICAgICAgLCBjb25zdGFudHMuT19XUk9OTFkgfCBjb25zdGFudHMuT19TWU1MSU5LXG4gICAgICAgICAgICwgbW9kZVxuICAgICAgICAgICAsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8vIHByZWZlciB0byByZXR1cm4gdGhlIGNobW9kIGVycm9yLCBpZiBvbmUgb2NjdXJzLFxuICAgICAgLy8gYnV0IHN0aWxsIHRyeSB0byBjbG9zZSwgYW5kIHJlcG9ydCBjbG9zaW5nIGVycm9ycyBpZiB0aGV5IG9jY3VyLlxuICAgICAgZnMuZmNobW9kKGZkLCBtb2RlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGZzLmNsb3NlKGZkLCBmdW5jdGlvbihlcnIyKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhlcnIgfHwgZXJyMilcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGZzLmxjaG1vZFN5bmMgPSBmdW5jdGlvbiAocGF0aCwgbW9kZSkge1xuICAgIHZhciBmZCA9IGZzLm9wZW5TeW5jKHBhdGgsIGNvbnN0YW50cy5PX1dST05MWSB8IGNvbnN0YW50cy5PX1NZTUxJTkssIG1vZGUpXG5cbiAgICAvLyBwcmVmZXIgdG8gcmV0dXJuIHRoZSBjaG1vZCBlcnJvciwgaWYgb25lIG9jY3VycyxcbiAgICAvLyBidXQgc3RpbGwgdHJ5IHRvIGNsb3NlLCBhbmQgcmVwb3J0IGNsb3NpbmcgZXJyb3JzIGlmIHRoZXkgb2NjdXIuXG4gICAgdmFyIHRocmV3ID0gdHJ1ZVxuICAgIHZhciByZXRcbiAgICB0cnkge1xuICAgICAgcmV0ID0gZnMuZmNobW9kU3luYyhmZCwgbW9kZSlcbiAgICAgIHRocmV3ID0gZmFsc2VcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHRocmV3KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKVxuICAgICAgICB9IGNhdGNoIChlcikge31cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZzLmNsb3NlU3luYyhmZClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoTHV0aW1lcyAoZnMpIHtcbiAgaWYgKGNvbnN0YW50cy5oYXNPd25Qcm9wZXJ0eShcIk9fU1lNTElOS1wiKSkge1xuICAgIGZzLmx1dGltZXMgPSBmdW5jdGlvbiAocGF0aCwgYXQsIG10LCBjYikge1xuICAgICAgZnMub3BlbihwYXRoLCBjb25zdGFudHMuT19TWU1MSU5LLCBmdW5jdGlvbiAoZXIsIGZkKSB7XG4gICAgICAgIGlmIChlcikge1xuICAgICAgICAgIGlmIChjYikgY2IoZXIpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZnMuZnV0aW1lcyhmZCwgYXQsIG10LCBmdW5jdGlvbiAoZXIpIHtcbiAgICAgICAgICBmcy5jbG9zZShmZCwgZnVuY3Rpb24gKGVyMikge1xuICAgICAgICAgICAgaWYgKGNiKSBjYihlciB8fCBlcjIpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnMubHV0aW1lc1N5bmMgPSBmdW5jdGlvbiAocGF0aCwgYXQsIG10KSB7XG4gICAgICB2YXIgZmQgPSBmcy5vcGVuU3luYyhwYXRoLCBjb25zdGFudHMuT19TWU1MSU5LKVxuICAgICAgdmFyIHJldFxuICAgICAgdmFyIHRocmV3ID0gdHJ1ZVxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0ID0gZnMuZnV0aW1lc1N5bmMoZmQsIGF0LCBtdClcbiAgICAgICAgdGhyZXcgPSBmYWxzZVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKHRocmV3KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZClcbiAgICAgICAgICB9IGNhdGNoIChlcikge31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcy5jbG9zZVN5bmMoZmQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXRcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBmcy5sdXRpbWVzID0gZnVuY3Rpb24gKF9hLCBfYiwgX2MsIGNiKSB7IGlmIChjYikgcHJvY2Vzcy5uZXh0VGljayhjYikgfVxuICAgIGZzLmx1dGltZXNTeW5jID0gZnVuY3Rpb24gKCkge31cbiAgfVxufVxuXG5mdW5jdGlvbiBjaG1vZEZpeCAob3JpZykge1xuICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBtb2RlLCBjYikge1xuICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgbW9kZSwgZnVuY3Rpb24gKGVyKSB7XG4gICAgICBpZiAoY2hvd25Fck9rKGVyKSkgZXIgPSBudWxsXG4gICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGNobW9kRml4U3luYyAob3JpZykge1xuICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBtb2RlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgbW9kZSlcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgaWYgKCFjaG93bkVyT2soZXIpKSB0aHJvdyBlclxuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGNob3duRml4IChvcmlnKSB7XG4gIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHVpZCwgZ2lkLCBjYikge1xuICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgdWlkLCBnaWQsIGZ1bmN0aW9uIChlcikge1xuICAgICAgaWYgKGNob3duRXJPayhlcikpIGVyID0gbnVsbFxuICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaG93bkZpeFN5bmMgKG9yaWcpIHtcbiAgaWYgKCFvcmlnKSByZXR1cm4gb3JpZ1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdWlkLCBnaWQpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG9yaWcuY2FsbChmcywgdGFyZ2V0LCB1aWQsIGdpZClcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgaWYgKCFjaG93bkVyT2soZXIpKSB0aHJvdyBlclxuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0YXRGaXggKG9yaWcpIHtcbiAgaWYgKCFvcmlnKSByZXR1cm4gb3JpZ1xuICAvLyBPbGRlciB2ZXJzaW9ucyBvZiBOb2RlIGVycm9uZW91c2x5IHJldHVybmVkIHNpZ25lZCBpbnRlZ2VycyBmb3JcbiAgLy8gdWlkICsgZ2lkLlxuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgY2IpIHtcbiAgICByZXR1cm4gb3JpZy5jYWxsKGZzLCB0YXJnZXQsIGZ1bmN0aW9uIChlciwgc3RhdHMpIHtcbiAgICAgIGlmICghc3RhdHMpIHJldHVybiBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICBpZiAoc3RhdHMudWlkIDwgMCkgc3RhdHMudWlkICs9IDB4MTAwMDAwMDAwXG4gICAgICBpZiAoc3RhdHMuZ2lkIDwgMCkgc3RhdHMuZ2lkICs9IDB4MTAwMDAwMDAwXG4gICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXRGaXhTeW5jIChvcmlnKSB7XG4gIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgLy8gT2xkZXIgdmVyc2lvbnMgb2YgTm9kZSBlcnJvbmVvdXNseSByZXR1cm5lZCBzaWduZWQgaW50ZWdlcnMgZm9yXG4gIC8vIHVpZCArIGdpZC5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB2YXIgc3RhdHMgPSBvcmlnLmNhbGwoZnMsIHRhcmdldClcbiAgICBpZiAoc3RhdHMudWlkIDwgMCkgc3RhdHMudWlkICs9IDB4MTAwMDAwMDAwXG4gICAgaWYgKHN0YXRzLmdpZCA8IDApIHN0YXRzLmdpZCArPSAweDEwMDAwMDAwMFxuICAgIHJldHVybiBzdGF0cztcbiAgfVxufVxuXG4vLyBFTk9TWVMgbWVhbnMgdGhhdCB0aGUgZnMgZG9lc24ndCBzdXBwb3J0IHRoZSBvcC4gSnVzdCBpZ25vcmVcbi8vIHRoYXQsIGJlY2F1c2UgaXQgZG9lc24ndCBtYXR0ZXIuXG4vL1xuLy8gaWYgdGhlcmUncyBubyBnZXR1aWQsIG9yIGlmIGdldHVpZCgpIGlzIHNvbWV0aGluZyBvdGhlclxuLy8gdGhhbiAwLCBhbmQgdGhlIGVycm9yIGlzIEVJTlZBTCBvciBFUEVSTSwgdGhlbiBqdXN0IGlnbm9yZVxuLy8gaXQuXG4vL1xuLy8gVGhpcyBzcGVjaWZpYyBjYXNlIGlzIGEgc2lsZW50IGZhaWx1cmUgaW4gY3AsIGluc3RhbGwsIHRhcixcbi8vIGFuZCBtb3N0IG90aGVyIHVuaXggdG9vbHMgdGhhdCBtYW5hZ2UgcGVybWlzc2lvbnMuXG4vL1xuLy8gV2hlbiBydW5uaW5nIGFzIHJvb3QsIG9yIGlmIG90aGVyIHR5cGVzIG9mIGVycm9ycyBhcmVcbi8vIGVuY291bnRlcmVkLCB0aGVuIGl0J3Mgc3RyaWN0LlxuZnVuY3Rpb24gY2hvd25Fck9rIChlcikge1xuICBpZiAoIWVyKVxuICAgIHJldHVybiB0cnVlXG5cbiAgaWYgKGVyLmNvZGUgPT09IFwiRU5PU1lTXCIpXG4gICAgcmV0dXJuIHRydWVcblxuICB2YXIgbm9ucm9vdCA9ICFwcm9jZXNzLmdldHVpZCB8fCBwcm9jZXNzLmdldHVpZCgpICE9PSAwXG4gIGlmIChub25yb290KSB7XG4gICAgaWYgKGVyLmNvZGUgPT09IFwiRUlOVkFMXCIgfHwgZXIuY29kZSA9PT0gXCJFUEVSTVwiKVxuICAgICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dyYWNlZnVsLWZzL3BvbHlmaWxscy5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHdyYXBweSA9IHJlcXVpcmUoJ3dyYXBweScpXG52YXIgcmVxcyA9IE9iamVjdC5jcmVhdGUobnVsbClcbnZhciBvbmNlID0gcmVxdWlyZSgnb25jZScpXG5cbm1vZHVsZS5leHBvcnRzID0gd3JhcHB5KGluZmxpZ2h0KVxuXG5mdW5jdGlvbiBpbmZsaWdodCAoa2V5LCBjYikge1xuICBpZiAocmVxc1trZXldKSB7XG4gICAgcmVxc1trZXldLnB1c2goY2IpXG4gICAgcmV0dXJuIG51bGxcbiAgfSBlbHNlIHtcbiAgICByZXFzW2tleV0gPSBbY2JdXG4gICAgcmV0dXJuIG1ha2VyZXMoa2V5KVxuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VyZXMgKGtleSkge1xuICByZXR1cm4gb25jZShmdW5jdGlvbiBSRVMgKCkge1xuICAgIHZhciBjYnMgPSByZXFzW2tleV1cbiAgICB2YXIgbGVuID0gY2JzLmxlbmd0aFxuICAgIHZhciBhcmdzID0gc2xpY2UoYXJndW1lbnRzKVxuXG4gICAgLy8gWFhYIEl0J3Mgc29tZXdoYXQgYW1iaWd1b3VzIHdoZXRoZXIgYSBuZXcgY2FsbGJhY2sgYWRkZWQgaW4gdGhpc1xuICAgIC8vIHBhc3Mgc2hvdWxkIGJlIHF1ZXVlZCBmb3IgbGF0ZXIgZXhlY3V0aW9uIGlmIHNvbWV0aGluZyBpbiB0aGVcbiAgICAvLyBsaXN0IG9mIGNhbGxiYWNrcyB0aHJvd3MsIG9yIGlmIGl0IHNob3VsZCBqdXN0IGJlIGRpc2NhcmRlZC5cbiAgICAvLyBIb3dldmVyLCBpdCdzIHN1Y2ggYW4gZWRnZSBjYXNlIHRoYXQgaXQgaGFyZGx5IG1hdHRlcnMsIGFuZCBlaXRoZXJcbiAgICAvLyBjaG9pY2UgaXMgbGlrZWx5IGFzIHN1cnByaXNpbmcgYXMgdGhlIG90aGVyLlxuICAgIC8vIEFzIGl0IGhhcHBlbnMsIHdlIGRvIGdvIGFoZWFkIGFuZCBzY2hlZHVsZSBpdCBmb3IgbGF0ZXIgZXhlY3V0aW9uLlxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNic1tpXS5hcHBseShudWxsLCBhcmdzKVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoY2JzLmxlbmd0aCA+IGxlbikge1xuICAgICAgICAvLyBhZGRlZCBtb3JlIGluIHRoZSBpbnRlcmltLlxuICAgICAgICAvLyBkZS16YWxnbywganVzdCBpbiBjYXNlLCBidXQgZG9uJ3QgY2FsbCBhZ2Fpbi5cbiAgICAgICAgY2JzLnNwbGljZSgwLCBsZW4pXG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgIFJFUy5hcHBseShudWxsLCBhcmdzKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHJlcXNba2V5XVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gc2xpY2UgKGFyZ3MpIHtcbiAgdmFyIGxlbmd0aCA9IGFyZ3MubGVuZ3RoXG4gIHZhciBhcnJheSA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykgYXJyYXlbaV0gPSBhcmdzW2ldXG4gIHJldHVybiBhcnJheVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luZmxpZ2h0L2luZmxpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ0cnkge1xuICB2YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbiAgaWYgKHR5cGVvZiB1dGlsLmluaGVyaXRzICE9PSAnZnVuY3Rpb24nKSB0aHJvdyAnJztcbiAgbW9kdWxlLmV4cG9ydHMgPSB1dGlsLmluaGVyaXRzO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaW5oZXJpdHNfYnJvd3Nlci5qcycpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2luaGVyaXRzL2luaGVyaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgX2ZzXG50cnkge1xuICBfZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG59IGNhdGNoIChfKSB7XG4gIF9mcyA9IHJlcXVpcmUoJ2ZzJylcbn1cblxuZnVuY3Rpb24gcmVhZEZpbGUgKGZpbGUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PSBudWxsKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgb3B0aW9ucyA9IHtlbmNvZGluZzogb3B0aW9uc31cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBmcyA9IG9wdGlvbnMuZnMgfHwgX2ZzXG5cbiAgdmFyIHNob3VsZFRocm93ID0gdHJ1ZVxuICAvLyBETyBOT1QgVVNFICdwYXNzUGFyc2luZ0Vycm9ycycgVEhFIE5BTUUgV0lMTCBDSEFOR0UhISEsIHVzZSAndGhyb3dzJyBpbnN0ZWFkXG4gIGlmICgncGFzc1BhcnNpbmdFcnJvcnMnIGluIG9wdGlvbnMpIHtcbiAgICBzaG91bGRUaHJvdyA9IG9wdGlvbnMucGFzc1BhcnNpbmdFcnJvcnNcbiAgfSBlbHNlIGlmICgndGhyb3dzJyBpbiBvcHRpb25zKSB7XG4gICAgc2hvdWxkVGhyb3cgPSBvcHRpb25zLnRocm93c1xuICB9XG5cbiAgZnMucmVhZEZpbGUoZmlsZSwgb3B0aW9ucywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG5cbiAgICBkYXRhID0gc3RyaXBCb20oZGF0YSlcblxuICAgIHZhciBvYmpcbiAgICB0cnkge1xuICAgICAgb2JqID0gSlNPTi5wYXJzZShkYXRhLCBvcHRpb25zID8gb3B0aW9ucy5yZXZpdmVyIDogbnVsbClcbiAgICB9IGNhdGNoIChlcnIyKSB7XG4gICAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgICAgZXJyMi5tZXNzYWdlID0gZmlsZSArICc6ICcgKyBlcnIyLm1lc3NhZ2VcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycjIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbnVsbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsYmFjayhudWxsLCBvYmopXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHJlYWRGaWxlU3luYyAoZmlsZSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgb3B0aW9ucyA9IHtlbmNvZGluZzogb3B0aW9uc31cbiAgfVxuXG4gIHZhciBmcyA9IG9wdGlvbnMuZnMgfHwgX2ZzXG5cbiAgdmFyIHNob3VsZFRocm93ID0gdHJ1ZVxuICAvLyBETyBOT1QgVVNFICdwYXNzUGFyc2luZ0Vycm9ycycgVEhFIE5BTUUgV0lMTCBDSEFOR0UhISEsIHVzZSAndGhyb3dzJyBpbnN0ZWFkXG4gIGlmICgncGFzc1BhcnNpbmdFcnJvcnMnIGluIG9wdGlvbnMpIHtcbiAgICBzaG91bGRUaHJvdyA9IG9wdGlvbnMucGFzc1BhcnNpbmdFcnJvcnNcbiAgfSBlbHNlIGlmICgndGhyb3dzJyBpbiBvcHRpb25zKSB7XG4gICAgc2hvdWxkVGhyb3cgPSBvcHRpb25zLnRocm93c1xuICB9XG5cbiAgdmFyIGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZSwgb3B0aW9ucylcbiAgY29udGVudCA9IHN0cmlwQm9tKGNvbnRlbnQpXG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50LCBvcHRpb25zLnJldml2ZXIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgZXJyLm1lc3NhZ2UgPSBmaWxlICsgJzogJyArIGVyci5tZXNzYWdlXG4gICAgICB0aHJvdyBlcnJcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gd3JpdGVGaWxlIChmaWxlLCBvYmosIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PSBudWxsKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGZzID0gb3B0aW9ucy5mcyB8fCBfZnNcblxuICB2YXIgc3BhY2VzID0gdHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnICYmIG9wdGlvbnMgIT09IG51bGxcbiAgICA/ICdzcGFjZXMnIGluIG9wdGlvbnNcbiAgICA/IG9wdGlvbnMuc3BhY2VzIDogdGhpcy5zcGFjZXNcbiAgICA6IHRoaXMuc3BhY2VzXG5cbiAgdmFyIHN0ciA9ICcnXG4gIHRyeSB7XG4gICAgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqLCBvcHRpb25zID8gb3B0aW9ucy5yZXBsYWNlciA6IG51bGwsIHNwYWNlcykgKyAnXFxuJ1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoY2FsbGJhY2spIHJldHVybiBjYWxsYmFjayhlcnIsIG51bGwpXG4gIH1cblxuICBmcy53cml0ZUZpbGUoZmlsZSwgc3RyLCBvcHRpb25zLCBjYWxsYmFjaylcbn1cblxuZnVuY3Rpb24gd3JpdGVGaWxlU3luYyAoZmlsZSwgb2JqLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBmcyA9IG9wdGlvbnMuZnMgfHwgX2ZzXG5cbiAgdmFyIHNwYWNlcyA9IHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JyAmJiBvcHRpb25zICE9PSBudWxsXG4gICAgPyAnc3BhY2VzJyBpbiBvcHRpb25zXG4gICAgPyBvcHRpb25zLnNwYWNlcyA6IHRoaXMuc3BhY2VzXG4gICAgOiB0aGlzLnNwYWNlc1xuXG4gIHZhciBzdHIgPSBKU09OLnN0cmluZ2lmeShvYmosIG9wdGlvbnMucmVwbGFjZXIsIHNwYWNlcykgKyAnXFxuJ1xuICAvLyBub3Qgc3VyZSBpZiBmcy53cml0ZUZpbGVTeW5jIHJldHVybnMgYW55dGhpbmcsIGJ1dCBqdXN0IGluIGNhc2VcbiAgcmV0dXJuIGZzLndyaXRlRmlsZVN5bmMoZmlsZSwgc3RyLCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBzdHJpcEJvbSAoY29udGVudCkge1xuICAvLyB3ZSBkbyB0aGlzIGJlY2F1c2UgSlNPTi5wYXJzZSB3b3VsZCBjb252ZXJ0IGl0IHRvIGEgdXRmOCBzdHJpbmcgaWYgZW5jb2Rpbmcgd2Fzbid0IHNwZWNpZmllZFxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGNvbnRlbnQpKSBjb250ZW50ID0gY29udGVudC50b1N0cmluZygndXRmOCcpXG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL15cXHVGRUZGLywgJycpXG4gIHJldHVybiBjb250ZW50XG59XG5cbnZhciBqc29uZmlsZSA9IHtcbiAgc3BhY2VzOiBudWxsLFxuICByZWFkRmlsZTogcmVhZEZpbGUsXG4gIHJlYWRGaWxlU3luYzogcmVhZEZpbGVTeW5jLFxuICB3cml0ZUZpbGU6IHdyaXRlRmlsZSxcbiAgd3JpdGVGaWxlU3luYzogd3JpdGVGaWxlU3luY1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGpzb25maWxlXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vanNvbmZpbGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNpbXBsZSBtdXRhYmxlIGFzc2lnbiAoZXh0cmFjdGVkIGZyb20gZnMtZXh0cmEpXG4vLyBJIHJlYWxseSBsaWtlIG9iamVjdC1hc3NpZ24gcGFja2FnZSwgYnV0IEkgd2FudGVkIGEgbGVhbiBwYWNrYWdlIHdpdGggemVybyBkZXBzXG5mdW5jdGlvbiBfYXNzaWduICgpIHtcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuZmlsdGVyKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpIH0pXG4gIHZhciBkZXN0ID0gYXJncy5zaGlmdCgpXG4gIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoc3JjKSB7XG4gICAgT2JqZWN0LmtleXMoc3JjKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGRlc3Rba2V5XSA9IHNyY1trZXldXG4gICAgfSlcbiAgfSlcblxuICByZXR1cm4gZGVzdFxufVxuXG4vLyB0aGFuayB5b3UgYmFieSBKZXN1cyBmb3IgTm9kZSB2NCBhbmQgT2JqZWN0LmFzc2lnblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IF9hc3NpZ25cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9rbGF3L3NyYy9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxudmFyIGZzXG50cnkge1xuICBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbn0gY2F0Y2ggKGUpIHtcbiAgZnMgPSByZXF1aXJlKCdmcycpXG59XG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIFJlYWRhYmxlID0gcmVxdWlyZSgnc3RyZWFtJykuUmVhZGFibGVcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpXG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKVxuXG5mdW5jdGlvbiBXYWxrZXIgKGRpciwgb3B0aW9ucykge1xuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIGRpciwgJ3N0cmluZycsICdgZGlyYCBwYXJhbWV0ZXIgc2hvdWxkIGJlIG9mIHR5cGUgc3RyaW5nLiBHb3QgdHlwZTogJyArIHR5cGVvZiBkaXIpXG4gIHZhciBkZWZhdWx0U3RyZWFtT3B0aW9ucyA9IHsgb2JqZWN0TW9kZTogdHJ1ZSB9XG4gIHZhciBkZWZhdWx0T3B0cyA9IHsgcXVldWVNZXRob2Q6ICdzaGlmdCcsIHBhdGhTb3J0ZXI6IHVuZGVmaW5lZCwgZmlsdGVyOiB1bmRlZmluZWQgfVxuICBvcHRpb25zID0gYXNzaWduKGRlZmF1bHRPcHRzLCBvcHRpb25zLCBkZWZhdWx0U3RyZWFtT3B0aW9ucylcblxuICBSZWFkYWJsZS5jYWxsKHRoaXMsIG9wdGlvbnMpXG4gIHRoaXMucm9vdCA9IHBhdGgucmVzb2x2ZShkaXIpXG4gIHRoaXMucGF0aHMgPSBbdGhpcy5yb290XVxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMuZnMgPSBvcHRpb25zLmZzIHx8IGZzIC8vIG1vY2stZnNcbn1cbnV0aWwuaW5oZXJpdHMoV2Fsa2VyLCBSZWFkYWJsZSlcblxuV2Fsa2VyLnByb3RvdHlwZS5fcmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucGF0aHMubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5wdXNoKG51bGwpXG4gIHZhciBzZWxmID0gdGhpc1xuICB2YXIgcGF0aEl0ZW0gPSB0aGlzLnBhdGhzW3RoaXMub3B0aW9ucy5xdWV1ZU1ldGhvZF0oKVxuXG4gIHNlbGYuZnMubHN0YXQocGF0aEl0ZW0sIGZ1bmN0aW9uIChlcnIsIHN0YXRzKSB7XG4gICAgdmFyIGl0ZW0gPSB7IHBhdGg6IHBhdGhJdGVtLCBzdGF0czogc3RhdHMgfVxuICAgIGlmIChlcnIpIHJldHVybiBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyLCBpdGVtKVxuICAgIGlmICghc3RhdHMuaXNEaXJlY3RvcnkoKSkgcmV0dXJuIHNlbGYucHVzaChpdGVtKVxuXG4gICAgc2VsZi5mcy5yZWFkZGlyKHBhdGhJdGVtLCBmdW5jdGlvbiAoZXJyLCBwYXRoSXRlbXMpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgc2VsZi5wdXNoKGl0ZW0pXG4gICAgICAgIHJldHVybiBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyLCBpdGVtKVxuICAgICAgfVxuXG4gICAgICBwYXRoSXRlbXMgPSBwYXRoSXRlbXMubWFwKGZ1bmN0aW9uIChwYXJ0KSB7IHJldHVybiBwYXRoLmpvaW4ocGF0aEl0ZW0sIHBhcnQpIH0pXG4gICAgICBpZiAoc2VsZi5vcHRpb25zLmZpbHRlcikgcGF0aEl0ZW1zID0gcGF0aEl0ZW1zLmZpbHRlcihzZWxmLm9wdGlvbnMuZmlsdGVyKVxuICAgICAgaWYgKHNlbGYub3B0aW9ucy5wYXRoU29ydGVyKSBwYXRoSXRlbXMuc29ydChzZWxmLm9wdGlvbnMucGF0aFNvcnRlcilcbiAgICAgIHBhdGhJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChwaSkgeyBzZWxmLnBhdGhzLnB1c2gocGkpIH0pXG5cbiAgICAgIHNlbGYucHVzaChpdGVtKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHdhbGsgKHJvb3QsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBXYWxrZXIocm9vdCwgb3B0aW9ucylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YWxrXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34va2xhdy9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbnN0YW50c1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNvbnN0YW50c1wiXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJldmVudHNcIlxuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJvc1wiXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9