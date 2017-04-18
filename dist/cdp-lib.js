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
/******/     return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(4)
var polyfills = __webpack_require__(36)
var legacy = __webpack_require__(35)
var queue = []

var util = __webpack_require__(41)

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
    __webpack_require__(14).equal(queue.length, 0)
  })
}

module.exports = patch(__webpack_require__(13))
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  mkdirs: __webpack_require__(7),
  mkdirsSync: __webpack_require__(6),
  // alias
  mkdirp: __webpack_require__(7),
  mkdirpSync: __webpack_require__(6),
  ensureDir: __webpack_require__(7),
  ensureDirSync: __webpack_require__(6)
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const rimraf = __webpack_require__(32)

function removeSync (dir) {
  return rimraf.sync(dir, {disableGlob: true})
}

function remove (dir, callback) {
  const options = {disableGlob: true}
  return callback ? rimraf(dir, options, callback) : rimraf(dir, options, function () {})
}

module.exports = {
  remove,
  removeSync
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const jsonFile = __webpack_require__(37)

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const invalidWin32Path = __webpack_require__(12).invalidWin32Path

const o777 = parseInt('0777', 8)

function mkdirsSync (p, opts, made) {
  if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
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
        let stat
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const invalidWin32Path = __webpack_require__(12).invalidWin32Path

const o777 = parseInt('0777', 8)

function mkdirs (p, opts, callback, made) {
  if (typeof opts === 'function') {
    callback = opts
    opts = {}
  } else if (!opts || typeof opts !== 'object') {
    opts = { mode: opts }
  }

  if (process.platform === 'win32' && invalidWin32Path(p)) {
    const errInval = new Error(p + ' contains invalid WIN32 path characters.')
    errInval.code = 'EINVAL'
    return callback(errInval)
  }

  let mode = opts.mode
  const xfs = opts.fs || fs

  if (mode === undefined) {
    mode = o777 & (~process.umask())
  }
  if (!made) made = null

  callback = callback || function () {}
  p = path.resolve(p)

  xfs.mkdir(p, mode, er => {
    if (!er) {
      made = made || p
      return callback(null, made)
    }
    switch (er.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) return callback(er)
        mkdirs(path.dirname(p), opts, (er, made) => {
          if (er) callback(er, made)
          else mkdirs(p, opts, callback, made)
        })
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        xfs.stat(p, (er2, stat) => {
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  copySync: __webpack_require__(17)
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// imported from ncp (this is temporary, will rewrite)

var fs = __webpack_require__(0)
var path = __webpack_require__(1)
var utimes = __webpack_require__(34)

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
  var overwrite = options.overwrite
  // If overwrite is undefined, use clobber, otherwise default to true:
  if (overwrite === undefined) overwrite = options.clobber
  if (overwrite === undefined) overwrite = true
  var errorOnExist = options.errorOnExist
  var dereference = options.dereference
  var preserveTimestamps = options.preserveTimestamps === true

  var started = 0
  var finished = 0
  var running = 0

  var errored = false

  startCopy(currentPath)

  function startCopy (source) {
    started++
    if (filter) {
      if (filter instanceof RegExp) {
        console.warn('Warning: fs-extra: Passing a RegExp filter is deprecated, use a function')
        if (!filter.test(source)) {
          return doneOne(true)
        }
      } else if (typeof filter === 'function') {
        if (!filter(source, dest)) {
          return doneOne(true)
        }
      }
    }
    return getStats(source)
  }

  function getStats (source) {
    var stat = dereference ? fs.stat : fs.lstat
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
    var target = file.name.replace(currentPath, targetPath.replace('$', '$$$$')) // escapes '$' with '$$'
    isWritable(target, function (writable) {
      if (writable) {
        copyFile(file, target)
      } else {
        if (overwrite) {
          rmFile(target, function () {
            copyFile(file, target)
          })
        } else if (errorOnExist) {
          onError(new Error(target + ' already exists'))
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

    writeStream.once('close', function () {
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
    var target = dir.name.replace(currentPath, targetPath.replace('$', '$$$$')) // escapes '$' with '$$'
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
    // ensure callback is defined & called only once:
    if (!errored && callback !== undefined) {
      errored = true
      return callback(err)
    }
  }

  function doneOne (skipped) {
    if (!skipped) running--
    finished++
    if ((started === finished) && (running === 0)) {
      if (callback !== undefined) {
        return callback(null)
      }
    }
  }
}

module.exports = ncp


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const mkdir = __webpack_require__(2)
const jsonFile = __webpack_require__(5)

function outputJsonSync (file, data, options) {
  const dir = path.dirname(file)

  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  jsonFile.writeJsonSync(file, data, options)
}

module.exports = outputJsonSync


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const mkdir = __webpack_require__(2)
const jsonFile = __webpack_require__(5)

function outputJson (file, data, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const dir = path.dirname(file)

  fs.exists(dir, itDoes => {
    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)
      jsonFile.writeJson(file, data, options, callback)
    })
  })
}

module.exports = outputJson


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(1)

// get drive on windows
function getRootPath (p) {
  p = path.normalize(path.resolve(p)).split(path.sep)
  if (p.length > 0) return p[0]
  return null
}

// http://stackoverflow.com/a/62888/10333 contains more accurate
// TODO: expand to include the rest
const INVALID_PATH_CHARS = /[<>:"|?*]/

function invalidWin32Path (p) {
  const rp = getRootPath(p)
  p = p.replace(rp, '')
  return INVALID_PATH_CHARS.test(p)
}

module.exports = {
  getRootPath,
  invalidWin32Path
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(4)

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
/* 14 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(27);
/**
 * @class CDPLib
 * @brief CDP boilerplate 生成機能を提供するクラス
 */
class CDPLib {
    /**
     * main command
     */
    static execute(options) {
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)

const BUF_LENGTH = 64 * 1024
const _buff = new Buffer(BUF_LENGTH)

function copyFileSync (srcFile, destFile, options) {
  const overwrite = options.overwrite
  const errorOnExist = options.errorOnExist
  const preserveTimestamps = options.preserveTimestamps

  if (fs.existsSync(destFile)) {
    if (overwrite) {
      fs.unlinkSync(destFile)
    } else if (errorOnExist) {
      throw new Error(`${destFile} already exists`)
    } else return
  }

  const fdr = fs.openSync(srcFile, 'r')
  const stat = fs.fstatSync(fdr)
  const fdw = fs.openSync(destFile, 'w', stat.mode)
  let bytesRead = 1
  let pos = 0

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const copyFileSync = __webpack_require__(16)
const mkdir = __webpack_require__(2)

function copySync (src, dest, options) {
  if (typeof options === 'function' || options instanceof RegExp) {
    options = {filter: options}
  }

  options = options || {}
  options.recursive = !!options.recursive

  // default to true for now
  options.clobber = 'clobber' in options ? !!options.clobber : true
  // overwrite falls back to clobber
  options.overwrite = 'overwrite' in options ? !!options.overwrite : options.clobber
  options.dereference = 'dereference' in options ? !!options.dereference : false
  options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false

  options.filter = options.filter || function () { return true }

  // Warn about using preserveTimestamps on 32-bit node:
  if (options.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  const stats = (options.recursive && !options.dereference) ? fs.lstatSync(src) : fs.statSync(src)
  const destFolder = path.dirname(dest)
  const destFolderExists = fs.existsSync(destFolder)
  let performCopy = false

  if (options.filter instanceof RegExp) {
    console.warn('Warning: fs-extra: Passing a RegExp filter is deprecated, use a function')
    performCopy = options.filter.test(src)
  } else if (typeof options.filter === 'function') performCopy = options.filter(src, dest)

  if (stats.isFile() && performCopy) {
    if (!destFolderExists) mkdir.mkdirsSync(destFolder)
    copyFileSync(src, dest, {
      overwrite: options.overwrite,
      errorOnExist: options.errorOnExist,
      preserveTimestamps: options.preserveTimestamps
    })
  } else if (stats.isDirectory() && performCopy) {
    if (!fs.existsSync(dest)) mkdir.mkdirsSync(dest)
    const contents = fs.readdirSync(src)
    contents.forEach(content => {
      const opts = options
      opts.recursive = true
      copySync(path.join(src, content), path.join(dest, content), opts)
    })
  } else if (options.recursive && stats.isSymbolicLink() && performCopy) {
    const srcPath = fs.readlinkSync(src)
    fs.symlinkSync(srcPath, dest)
  }
}

module.exports = copySync


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const ncp = __webpack_require__(9)
const mkdir = __webpack_require__(2)

function copy (src, dest, options, callback) {
  if (typeof options === 'function' && !callback) {
    callback = options
    options = {}
  } else if (typeof options === 'function' || options instanceof RegExp) {
    options = {filter: options}
  }
  callback = callback || function () {}
  options = options || {}

  // Warn about using preserveTimestamps on 32-bit node:
  if (options.preserveTimestamps && process.arch === 'ia32') {
    console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`)
  }

  // don't allow src and dest to be the same
  const basePath = process.cwd()
  const currentPath = path.resolve(basePath, src)
  const targetPath = path.resolve(basePath, dest)
  if (currentPath === targetPath) return callback(new Error('Source and destination must not be the same.'))

  fs.lstat(src, (err, stats) => {
    if (err) return callback(err)

    let dir = null
    if (stats.isDirectory()) {
      const parts = dest.split(path.sep)
      parts.pop()
      dir = parts.join(path.sep)
    } else {
      dir = path.dirname(dest)
    }

    fs.exists(dir, dirExists => {
      if (dirExists) return ncp(src, dest, options, callback)
      mkdir.mkdirs(dir, err => {
        if (err) return callback(err)
        ncp(src, dest, options, callback)
      })
    })
  })
}

module.exports = copy


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  copy: __webpack_require__(18)
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(4)
const path = __webpack_require__(1)
const mkdir = __webpack_require__(2)
const remove = __webpack_require__(3)

function emptyDir (dir, callback) {
  callback = callback || function () {}
  fs.readdir(dir, (err, items) => {
    if (err) return mkdir.mkdirs(dir, callback)

    items = items.map(item => path.join(dir, item))

    deleteItem()

    function deleteItem () {
      const item = items.pop()
      if (!item) return callback()
      remove.remove(item, err => {
        if (err) return callback(err)
        deleteItem()
      })
    }
  })
}

function emptyDirSync (dir) {
  let items
  try {
    items = fs.readdirSync(dir)
  } catch (err) {
    return mkdir.mkdirsSync(dir)
  }

  items.forEach(item => {
    item = path.join(dir, item)
    remove.removeSync(item)
  })
}

module.exports = {
  emptyDirSync,
  emptydirSync: emptyDirSync,
  emptyDir,
  emptydir: emptyDir
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(1)
const fs = __webpack_require__(0)
const mkdir = __webpack_require__(2)

function createFile (file, callback) {
  function makeFile () {
    fs.writeFile(file, '', err => {
      if (err) return callback(err)
      callback()
    })
  }

  fs.exists(file, fileExists => {
    if (fileExists) return callback()
    const dir = path.dirname(file)
    fs.exists(dir, dirExists => {
      if (dirExists) return makeFile()
      mkdir.mkdirs(dir, err => {
        if (err) return callback(err)
        makeFile()
      })
    })
  })
}

function createFileSync (file) {
  if (fs.existsSync(file)) return

  const dir = path.dirname(file)
  if (!fs.existsSync(dir)) {
    mkdir.mkdirsSync(dir)
  }

  fs.writeFileSync(file, '')
}

module.exports = {
  createFile,
  createFileSync,
  // alias
  ensureFile: createFile,
  ensureFileSync: createFileSync
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const file = __webpack_require__(21)
const link = __webpack_require__(23)
const symlink = __webpack_require__(26)

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(1)
const fs = __webpack_require__(0)
const mkdir = __webpack_require__(2)

function createLink (srcpath, dstpath, callback) {
  function makeLink (srcpath, dstpath) {
    fs.link(srcpath, dstpath, err => {
      if (err) return callback(err)
      callback(null)
    })
  }

  fs.exists(dstpath, destinationExists => {
    if (destinationExists) return callback(null)
    fs.lstat(srcpath, (err, stat) => {
      if (err) {
        err.message = err.message.replace('lstat', 'ensureLink')
        return callback(err)
      }

      const dir = path.dirname(dstpath)
      fs.exists(dir, dirExists => {
        if (dirExists) return makeLink(srcpath, dstpath)
        mkdir.mkdirs(dir, err => {
          if (err) return callback(err)
          makeLink(srcpath, dstpath)
        })
      })
    })
  })
}

function createLinkSync (srcpath, dstpath, callback) {
  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  try {
    fs.lstatSync(srcpath)
  } catch (err) {
    err.message = err.message.replace('lstat', 'ensureLink')
    throw err
  }

  const dir = path.dirname(dstpath)
  const dirExists = fs.existsSync(dir)
  if (dirExists) return fs.linkSync(srcpath, dstpath)
  mkdir.mkdirsSync(dir)

  return fs.linkSync(srcpath, dstpath)
}

module.exports = {
  createLink,
  createLinkSync,
  // alias
  ensureLink: createLink,
  ensureLinkSync: createLinkSync
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(1)
const fs = __webpack_require__(0)

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
    return fs.lstat(srcpath, (err, stat) => {
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
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
    return fs.exists(relativeToDst, exists => {
      if (exists) {
        return callback(null, {
          'toCwd': relativeToDst,
          'toDst': srcpath
        })
      } else {
        return fs.lstat(srcpath, (err, stat) => {
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
  let exists
  if (path.isAbsolute(srcpath)) {
    exists = fs.existsSync(srcpath)
    if (!exists) throw new Error('absolute srcpath does not exist')
    return {
      'toCwd': srcpath,
      'toDst': srcpath
    }
  } else {
    const dstdir = path.dirname(dstpath)
    const relativeToDst = path.join(dstdir, srcpath)
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
  symlinkPaths,
  symlinkPathsSync
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)

function symlinkType (srcpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type
  if (type) return callback(null, type)
  fs.lstat(srcpath, (err, stats) => {
    if (err) return callback(null, 'file')
    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
    callback(null, type)
  })
}

function symlinkTypeSync (srcpath, type) {
  let stats

  if (type) return type
  try {
    stats = fs.lstatSync(srcpath)
  } catch (e) {
    return 'file'
  }
  return (stats && stats.isDirectory()) ? 'dir' : 'file'
}

module.exports = {
  symlinkType,
  symlinkTypeSync
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(1)
const fs = __webpack_require__(0)
const _mkdirs = __webpack_require__(2)
const mkdirs = _mkdirs.mkdirs
const mkdirsSync = _mkdirs.mkdirsSync

const _symlinkPaths = __webpack_require__(24)
const symlinkPaths = _symlinkPaths.symlinkPaths
const symlinkPathsSync = _symlinkPaths.symlinkPathsSync

const _symlinkType = __webpack_require__(25)
const symlinkType = _symlinkType.symlinkType
const symlinkTypeSync = _symlinkType.symlinkTypeSync

function createSymlink (srcpath, dstpath, type, callback) {
  callback = (typeof type === 'function') ? type : callback
  type = (typeof type === 'function') ? false : type

  fs.exists(dstpath, destinationExists => {
    if (destinationExists) return callback(null)
    symlinkPaths(srcpath, dstpath, (err, relative) => {
      if (err) return callback(err)
      srcpath = relative.toDst
      symlinkType(relative.toCwd, type, (err, type) => {
        if (err) return callback(err)
        const dir = path.dirname(dstpath)
        fs.exists(dir, dirExists => {
          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
          mkdirs(dir, err => {
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

  const destinationExists = fs.existsSync(dstpath)
  if (destinationExists) return undefined

  const relative = symlinkPathsSync(srcpath, dstpath)
  srcpath = relative.toDst
  type = symlinkTypeSync(relative.toCwd, type)
  const dir = path.dirname(dstpath)
  const exists = fs.existsSync(dir)
  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
  mkdirsSync(dir)
  return fs.symlinkSync(srcpath, dstpath, type)
}

module.exports = {
  createSymlink,
  createSymlinkSync,
  // alias
  ensureSymlink: createSymlink,
  ensureSymlinkSync: createSymlinkSync
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const assign = __webpack_require__(33)

const fse = {}
const gfs = __webpack_require__(0)

// attach fs methods to fse
Object.keys(gfs).forEach(key => {
  fse[key] = gfs[key]
})

const fs = fse

assign(fs, __webpack_require__(19))
assign(fs, __webpack_require__(8))
assign(fs, __webpack_require__(2))
assign(fs, __webpack_require__(3))
assign(fs, __webpack_require__(28))
assign(fs, __webpack_require__(30))
assign(fs, __webpack_require__(29))
assign(fs, __webpack_require__(20))
assign(fs, __webpack_require__(22))
assign(fs, __webpack_require__(31))

module.exports = fs

// maintain backwards compatibility for awhile
const jsonfile = {}
Object.defineProperty(jsonfile, 'spaces', {
  get: () => fs.spaces, // found in ./json
  set: val => {
    fs.spaces = val
  }
})

module.exports.jsonfile = jsonfile // so users of fs-extra can modify jsonFile.spaces


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const jsonFile = __webpack_require__(5)

jsonFile.outputJsonSync = __webpack_require__(10)
jsonFile.outputJson = __webpack_require__(11)
// aliases
jsonFile.outputJSONSync = __webpack_require__(10)
jsonFile.outputJSON = __webpack_require__(11)

module.exports = jsonFile


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const copySync = __webpack_require__(8).copySync
const removeSync = __webpack_require__(3).removeSync
const mkdirpSync = __webpack_require__(2).mkdirsSync

function moveSync (src, dest, options) {
  options = options || {}
  const overwrite = options.overwrite || options.clobber || false

  src = path.resolve(src)
  dest = path.resolve(dest)

  if (src === dest) return

  if (isSrcSubdir(src, dest)) throw new Error(`Cannot move '${src}' into itself '${dest}'.`)

  mkdirpSync(path.dirname(dest))
  tryRenameSync()

  function tryRenameSync () {
    if (overwrite) {
      try {
        return fs.renameSync(src, dest)
      } catch (err) {
        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST' || err.code === 'EPERM') {
          removeSync(dest)
          options.overwrite = false // just overwriteed it, no need to do it again
          return moveSync(src, dest, options)
        }

        if (err.code !== 'EXDEV') throw err
        return moveSyncAcrossDevice(src, dest, overwrite)
      }
    } else {
      try {
        fs.linkSync(src, dest)
        return fs.unlinkSync(src)
      } catch (err) {
        if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM' || err.code === 'ENOTSUP') {
          return moveSyncAcrossDevice(src, dest, overwrite)
        }
        throw err
      }
    }
  }
}

function moveSyncAcrossDevice (src, dest, overwrite) {
  const stat = fs.statSync(src)

  if (stat.isDirectory()) {
    return moveDirSyncAcrossDevice(src, dest, overwrite)
  } else {
    return moveFileSyncAcrossDevice(src, dest, overwrite)
  }
}

function moveFileSyncAcrossDevice (src, dest, overwrite) {
  const BUF_LENGTH = 64 * 1024
  const _buff = new Buffer(BUF_LENGTH)

  const flags = overwrite ? 'w' : 'wx'

  const fdr = fs.openSync(src, 'r')
  const stat = fs.fstatSync(fdr)
  const fdw = fs.openSync(dest, flags, stat.mode)
  let bytesRead = 1
  let pos = 0

  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
    fs.writeSync(fdw, _buff, 0, bytesRead)
    pos += bytesRead
  }

  fs.closeSync(fdr)
  fs.closeSync(fdw)
  return fs.unlinkSync(src)
}

function moveDirSyncAcrossDevice (src, dest, overwrite) {
  const options = {
    overwrite: false
  }

  if (overwrite) {
    removeSync(dest)
    tryCopySync()
  } else {
    tryCopySync()
  }

  function tryCopySync () {
    copySync(src, dest, options)
    return removeSync(src)
  }
}

// return true if dest is a subdir of src, otherwise false.
// extract dest base dir and check if that is the same as src basename
function isSrcSubdir (src, dest) {
  try {
    return fs.statSync(src).isDirectory() &&
           src !== dest &&
           dest.indexOf(src) > -1 &&
           dest.split(path.dirname(src) + path.sep)[1].split(path.sep)[0] === path.basename(src)
  } catch (e) {
    return false
  }
}

module.exports = {
  moveSync
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// most of this code was written by Andrew Kelley
// licensed under the BSD license: see
// https://github.com/andrewrk/node-mv/blob/master/package.json

// this needs a cleanup

const fs = __webpack_require__(0)
const ncp = __webpack_require__(9)
const path = __webpack_require__(1)
const remove = __webpack_require__(3).remove
const mkdirp = __webpack_require__(2).mkdirs

function move (source, dest, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const shouldMkdirp = ('mkdirp' in options) ? options.mkdirp : true
  const overwrite = options.overwrite || options.clobber || false

  if (shouldMkdirp) {
    mkdirs()
  } else {
    doRename()
  }

  function mkdirs () {
    mkdirp(path.dirname(dest), err => {
      if (err) return callback(err)
      doRename()
    })
  }

  function doRename () {
    if (path.resolve(source) === path.resolve(dest)) {
      setImmediate(callback)
    } else if (overwrite) {
      fs.rename(source, dest, err => {
        if (!err) return callback()

        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
          remove(dest, err => {
            if (err) return callback(err)
            options.overwrite = false // just overwriteed it, no need to do it again
            move(source, dest, options, callback)
          })
          return
        }

        // weird Windows shit
        if (err.code === 'EPERM') {
          setTimeout(() => {
            remove(dest, err => {
              if (err) return callback(err)
              options.overwrite = false
              move(source, dest, options, callback)
            })
          }, 200)
          return
        }

        if (err.code !== 'EXDEV') return callback(err)
        moveAcrossDevice(source, dest, overwrite, callback)
      })
    } else {
      fs.link(source, dest, err => {
        if (err) {
          if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM' || err.code === 'ENOTSUP') {
            moveAcrossDevice(source, dest, overwrite, callback)
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

function moveAcrossDevice (source, dest, overwrite, callback) {
  fs.stat(source, (err, stat) => {
    if (err) {
      callback(err)
      return
    }

    if (stat.isDirectory()) {
      moveDirAcrossDevice(source, dest, overwrite, callback)
    } else {
      moveFileAcrossDevice(source, dest, overwrite, callback)
    }
  })
}

function moveFileAcrossDevice (source, dest, overwrite, callback) {
  const flags = overwrite ? 'w' : 'wx'
  const ins = fs.createReadStream(source)
  const outs = fs.createWriteStream(dest, { flags })

  ins.on('error', err => {
    ins.destroy()
    outs.destroy()
    outs.removeListener('close', onClose)

    // may want to create a directory but `out` line above
    // creates an empty file for us: See #108
    // don't care about error here
    fs.unlink(dest, () => {
      // note: `err` here is from the input stream errror
      if (err.code === 'EISDIR' || err.code === 'EPERM') {
        moveDirAcrossDevice(source, dest, overwrite, callback)
      } else {
        callback(err)
      }
    })
  })

  outs.on('error', err => {
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

function moveDirAcrossDevice (source, dest, overwrite, callback) {
  const options = {
    overwrite: false
  }

  if (overwrite) {
    remove(dest, err => {
      if (err) return callback(err)
      startNcp()
    })
  } else {
    startNcp()
  }

  function startNcp () {
    ncp(source, dest, options, err => {
      if (err) return callback(err)
      remove(source, callback)
    })
  }
}

module.exports = {
  move
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const mkdir = __webpack_require__(2)

function outputFile (file, data, encoding, callback) {
  if (typeof encoding === 'function') {
    callback = encoding
    encoding = 'utf8'
  }

  const dir = path.dirname(file)
  fs.exists(dir, itDoes => {
    if (itDoes) return fs.writeFile(file, data, encoding, callback)

    mkdir.mkdirs(dir, err => {
      if (err) return callback(err)

      fs.writeFile(file, data, encoding, callback)
    })
  })
}

function outputFileSync (file, data, encoding) {
  const dir = path.dirname(file)
  if (fs.existsSync(dir)) {
    return fs.writeFileSync.apply(fs, arguments)
  }
  mkdir.mkdirsSync(dir)
  fs.writeFileSync.apply(fs, arguments)
}

module.exports = {
  outputFile,
  outputFileSync
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const path = __webpack_require__(1)
const assert = __webpack_require__(14)

const isWindows = (process.platform === 'win32')

function defaults (options) {
  const methods = [
    'unlink',
    'chmod',
    'stat',
    'lstat',
    'rmdir',
    'readdir'
  ]
  methods.forEach(m => {
    options[m] = options[m] || fs[m]
    m = m + 'Sync'
    options[m] = options[m] || fs[m]
  })

  options.maxBusyTries = options.maxBusyTries || 3
}

function rimraf (p, options, cb) {
  let busyTries = 0

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

  rimraf_(p, options, function CB (er) {
    if (er) {
      if (isWindows && (er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
          busyTries < options.maxBusyTries) {
        busyTries++
        let time = busyTries * 100
        // try again, with the same exact callback as this one.
        return setTimeout(() => rimraf_(p, options, CB), time)
      }

      // already gone
      if (er.code === 'ENOENT') er = null
    }

    cb(er)
  })
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
  options.lstat(p, (er, st) => {
    if (er && er.code === 'ENOENT') {
      return cb(null)
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er && er.code === 'EPERM' && isWindows) {
      return fixWinEPERM(p, options, er, cb)
    }

    if (st && st.isDirectory()) {
      return rmdir(p, options, er, cb)
    }

    options.unlink(p, er => {
      if (er) {
        if (er.code === 'ENOENT') {
          return cb(null)
        }
        if (er.code === 'EPERM') {
          return (isWindows)
            ? fixWinEPERM(p, options, er, cb)
            : rmdir(p, options, er, cb)
        }
        if (er.code === 'EISDIR') {
          return rmdir(p, options, er, cb)
        }
      }
      return cb(er)
    })
  })
}

function fixWinEPERM (p, options, er, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')
  if (er) {
    assert(er instanceof Error)
  }

  options.chmod(p, 666, er2 => {
    if (er2) {
      cb(er2.code === 'ENOENT' ? null : er)
    } else {
      options.stat(p, (er3, stats) => {
        if (er3) {
          cb(er3.code === 'ENOENT' ? null : er)
        } else if (stats.isDirectory()) {
          rmdir(p, options, er, cb)
        } else {
          options.unlink(p, cb)
        }
      })
    }
  })
}

function fixWinEPERMSync (p, options, er) {
  let stats

  assert(p)
  assert(options)
  if (er) {
    assert(er instanceof Error)
  }

  try {
    options.chmodSync(p, 666)
  } catch (er2) {
    if (er2.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  try {
    stats = options.statSync(p)
  } catch (er3) {
    if (er3.code === 'ENOENT') {
      return
    } else {
      throw er
    }
  }

  if (stats.isDirectory()) {
    rmdirSync(p, options, er)
  } else {
    options.unlinkSync(p)
  }
}

function rmdir (p, options, originalEr, cb) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }
  assert(typeof cb === 'function')

  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
  // if we guessed wrong, and it's not a directory, then
  // raise the original error.
  options.rmdir(p, er => {
    if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
      rmkids(p, options, cb)
    } else if (er && er.code === 'ENOTDIR') {
      cb(originalEr)
    } else {
      cb(er)
    }
  })
}

function rmkids (p, options, cb) {
  assert(p)
  assert(options)
  assert(typeof cb === 'function')

  options.readdir(p, (er, files) => {
    if (er) return cb(er)

    let n = files.length
    let errState

    if (n === 0) return options.rmdir(p, cb)

    files.forEach(f => {
      rimraf(path.join(p, f), options, er => {
        if (errState) {
          return
        }
        if (er) return cb(errState = er)
        if (--n === 0) {
          options.rmdir(p, cb)
        }
      })
    })
  })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p, options) {
  let st

  options = options || {}
  defaults(options)

  assert(p, 'rimraf: missing path')
  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
  assert(options, 'rimraf: missing options')
  assert.equal(typeof options, 'object', 'rimraf: options should be object')

  try {
    st = options.lstatSync(p)
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    }

    // Windows can EPERM on stat.  Life is suffering.
    if (er.code === 'EPERM' && isWindows) {
      fixWinEPERMSync(p, options, er)
    }
  }

  try {
    // sunos lets the root user unlink directories, which is... weird.
    if (st && st.isDirectory()) {
      rmdirSync(p, options, null)
    } else {
      options.unlinkSync(p)
    }
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    } else if (er.code === 'EPERM') {
      return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
    } else if (er.code !== 'EISDIR') {
      throw er
    }
    rmdirSync(p, options, er)
  }
}

function rmdirSync (p, options, originalEr) {
  assert(p)
  assert(options)
  if (originalEr) {
    assert(originalEr instanceof Error)
  }

  try {
    options.rmdirSync(p)
  } catch (er) {
    if (er.code === 'ENOENT') {
      return
    } else if (er.code === 'ENOTDIR') {
      throw originalEr
    } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
      rmkidsSync(p, options)
    }
  }
}

function rmkidsSync (p, options) {
  assert(p)
  assert(options)
  options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options))
  options.rmdirSync(p, options)
}

module.exports = rimraf
rimraf.sync = rimrafSync


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// simple mutable assign
function assign () {
  const args = [].slice.call(arguments).filter(i => i)
  const dest = args.shift()
  args.forEach(src => {
    Object.keys(src).forEach(key => {
      dest[key] = src[key]
    })
  })

  return dest
}

module.exports = assign


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(0)
const os = __webpack_require__(39)
const path = __webpack_require__(1)

// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
function hasMillisResSync () {
  let tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
  const fd = fs.openSync(tmpfile, 'r+')
  fs.futimesSync(fd, d, d)
  fs.closeSync(fd)
  return fs.statSync(tmpfile).mtime > 1435410243000
}

function hasMillisRes (callback) {
  let tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
  tmpfile = path.join(os.tmpdir(), tmpfile)

  // 550 millis past UNIX epoch
  const d = new Date(1435410243862)
  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', err => {
    if (err) return callback(err)
    fs.open(tmpfile, 'r+', (err, fd) => {
      if (err) return callback(err)
      fs.futimes(fd, d, d, err => {
        if (err) return callback(err)
        fs.close(fd, err => {
          if (err) return callback(err)
          fs.stat(tmpfile, (err, stats) => {
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
  fs.open(path, 'r+', (err, fd) => {
    if (err) return callback(err)
    fs.futimes(fd, atime, mtime, futimesErr => {
      fs.close(fd, closeErr => {
        if (callback) callback(futimesErr || closeErr)
      })
    })
  })
}

module.exports = {
  hasMillisRes,
  hasMillisResSync,
  timeRemoveMillis,
  utimesMillis
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(40).Stream

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(13)
var constants = __webpack_require__(38)

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var _fs
try {
  _fs = __webpack_require__(0)
} catch (_) {
  _fs = __webpack_require__(4)
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
/* 38 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2Q3MjYyZTYxNGIwNjYzZmIwNDkiLCJ3ZWJwYWNrOi8vLy4vfi9ncmFjZWZ1bC1mcy9ncmFjZWZ1bC1mcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvbWtkaXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL3JlbW92ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2pzb24vanNvbmZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvbWtkaXJzL21rZGlycy1zeW5jLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL21rZGlycy9ta2RpcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvY29weS1zeW5jL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2NvcHkvbmNwLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2pzb24vb3V0cHV0LWpzb24tc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9qc29uL291dHB1dC1qc29uLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL21rZGlycy93aW4zMi5qcyIsIndlYnBhY2s6Ly8vLi9+L2dyYWNlZnVsLWZzL2ZzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzc2VydFwiIiwid2VicGFjazovLy8uL2xpYi9jZHAtbGliLnRzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2NvcHktc3luYy9jb3B5LWZpbGUtc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9jb3B5LXN5bmMvY29weS1zeW5jLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2NvcHkvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2VtcHR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9maWxlLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay1wYXRocy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay10eXBlLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9zeW1saW5rLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2pzb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvbW92ZS1zeW5jL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL21vdmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvb3V0cHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL3JlbW92ZS9yaW1yYWYuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvdXRpbC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvdXRpbC91dGltZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ncmFjZWZ1bC1mcy9sZWdhY3ktc3RyZWFtcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2dyYWNlZnVsLWZzL3BvbHlmaWxscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2pzb25maWxlL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnN0YW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDclFBLGlDOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUkE7O0FBRUE7O0FBRUE7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CLHdGQUF3RjtBQUN4Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQSwrQjs7Ozs7OztBQ0FBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNmQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUMxREE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOzs7Ozs7O0FDOURBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRCxrQkFBa0I7O0FBRXRFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3pPQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7OztBQ2pCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7QUN6QkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3hCQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7O0FDcEJBLG1DOzs7Ozs7Ozs7QUNBQSxtQ0FBK0I7QUFFL0I7OztHQUdHO0FBQ0g7SUFDSTs7T0FFRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBWTtRQUM5QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQVhELHdCQVdDOzs7Ozs7OztBQ2pCRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx5QkFBeUIsU0FBUztBQUNsQyxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDeENBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0Esa0dBQWtHO0FBQ2xHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtHQUFrRztBQUNsRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBOzs7Ozs7O0FDbkRBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0QkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNEQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM5QkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9EQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7OztBQ3BDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ1ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsOERBQThELElBQUksaUJBQWlCLEtBQUs7O0FBRXhGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3BIQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsUUFBUTs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEtBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUN2U0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBOzs7Ozs7OztBQ2ZBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZLElBQUk7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNySEE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNILDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3pVQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZTtBQUNmOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDcElBLHNDOzs7Ozs7QUNBQSwrQjs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLGlDIiwiZmlsZSI6ImNkcC1saWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZDcyNjJlNjE0YjA2NjNmYjA0OSIsInZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcbnZhciBwb2x5ZmlsbHMgPSByZXF1aXJlKCcuL3BvbHlmaWxscy5qcycpXG52YXIgbGVnYWN5ID0gcmVxdWlyZSgnLi9sZWdhY3ktc3RyZWFtcy5qcycpXG52YXIgcXVldWUgPSBbXVxuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKVxuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbnZhciBkZWJ1ZyA9IG5vb3BcbmlmICh1dGlsLmRlYnVnbG9nKVxuICBkZWJ1ZyA9IHV0aWwuZGVidWdsb2coJ2dmczQnKVxuZWxzZSBpZiAoL1xcYmdmczRcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJycpKVxuICBkZWJ1ZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtID0gdXRpbC5mb3JtYXQuYXBwbHkodXRpbCwgYXJndW1lbnRzKVxuICAgIG0gPSAnR0ZTNDogJyArIG0uc3BsaXQoL1xcbi8pLmpvaW4oJ1xcbkdGUzQ6ICcpXG4gICAgY29uc29sZS5lcnJvcihtKVxuICB9XG5cbmlmICgvXFxiZ2ZzNFxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJykpIHtcbiAgcHJvY2Vzcy5vbignZXhpdCcsIGZ1bmN0aW9uKCkge1xuICAgIGRlYnVnKHF1ZXVlKVxuICAgIHJlcXVpcmUoJ2Fzc2VydCcpLmVxdWFsKHF1ZXVlLmxlbmd0aCwgMClcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaChyZXF1aXJlKCcuL2ZzLmpzJykpXG5pZiAocHJvY2Vzcy5lbnYuVEVTVF9HUkFDRUZVTF9GU19HTE9CQUxfUEFUQ0gpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBwYXRjaChmcylcbn1cblxuLy8gQWx3YXlzIHBhdGNoIGZzLmNsb3NlL2Nsb3NlU3luYywgYmVjYXVzZSB3ZSB3YW50IHRvXG4vLyByZXRyeSgpIHdoZW5ldmVyIGEgY2xvc2UgaGFwcGVucyAqYW55d2hlcmUqIGluIHRoZSBwcm9ncmFtLlxuLy8gVGhpcyBpcyBlc3NlbnRpYWwgd2hlbiBtdWx0aXBsZSBncmFjZWZ1bC1mcyBpbnN0YW5jZXMgYXJlXG4vLyBpbiBwbGF5IGF0IHRoZSBzYW1lIHRpbWUuXG5tb2R1bGUuZXhwb3J0cy5jbG9zZSA9XG5mcy5jbG9zZSA9IChmdW5jdGlvbiAoZnMkY2xvc2UpIHsgcmV0dXJuIGZ1bmN0aW9uIChmZCwgY2IpIHtcbiAgcmV0dXJuIGZzJGNsb3NlLmNhbGwoZnMsIGZkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKCFlcnIpXG4gICAgICByZXRyeSgpXG5cbiAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9KVxufX0pKGZzLmNsb3NlKVxuXG5tb2R1bGUuZXhwb3J0cy5jbG9zZVN5bmMgPVxuZnMuY2xvc2VTeW5jID0gKGZ1bmN0aW9uIChmcyRjbG9zZVN5bmMpIHsgcmV0dXJuIGZ1bmN0aW9uIChmZCkge1xuICAvLyBOb3RlIHRoYXQgZ3JhY2VmdWwtZnMgYWxzbyByZXRyaWVzIHdoZW4gZnMuY2xvc2VTeW5jKCkgZmFpbHMuXG4gIC8vIExvb2tzIGxpa2UgYSBidWcgdG8gbWUsIGFsdGhvdWdoIGl0J3MgcHJvYmFibHkgYSBoYXJtbGVzcyBvbmUuXG4gIHZhciBydmFsID0gZnMkY2xvc2VTeW5jLmFwcGx5KGZzLCBhcmd1bWVudHMpXG4gIHJldHJ5KClcbiAgcmV0dXJuIHJ2YWxcbn19KShmcy5jbG9zZVN5bmMpXG5cbmZ1bmN0aW9uIHBhdGNoIChmcykge1xuICAvLyBFdmVyeXRoaW5nIHRoYXQgcmVmZXJlbmNlcyB0aGUgb3BlbigpIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIGluIGhlcmVcbiAgcG9seWZpbGxzKGZzKVxuICBmcy5ncmFjZWZ1bGlmeSA9IHBhdGNoXG4gIGZzLkZpbGVSZWFkU3RyZWFtID0gUmVhZFN0cmVhbTsgIC8vIExlZ2FjeSBuYW1lLlxuICBmcy5GaWxlV3JpdGVTdHJlYW0gPSBXcml0ZVN0cmVhbTsgIC8vIExlZ2FjeSBuYW1lLlxuICBmcy5jcmVhdGVSZWFkU3RyZWFtID0gY3JlYXRlUmVhZFN0cmVhbVxuICBmcy5jcmVhdGVXcml0ZVN0cmVhbSA9IGNyZWF0ZVdyaXRlU3RyZWFtXG4gIHZhciBmcyRyZWFkRmlsZSA9IGZzLnJlYWRGaWxlXG4gIGZzLnJlYWRGaWxlID0gcmVhZEZpbGVcbiAgZnVuY3Rpb24gcmVhZEZpbGUgKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IgPSBvcHRpb25zLCBvcHRpb25zID0gbnVsbFxuXG4gICAgcmV0dXJuIGdvJHJlYWRGaWxlKHBhdGgsIG9wdGlvbnMsIGNiKVxuXG4gICAgZnVuY3Rpb24gZ28kcmVhZEZpbGUgKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gZnMkcmVhZEZpbGUocGF0aCwgb3B0aW9ucywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyICYmIChlcnIuY29kZSA9PT0gJ0VNRklMRScgfHwgZXJyLmNvZGUgPT09ICdFTkZJTEUnKSlcbiAgICAgICAgICBlbnF1ZXVlKFtnbyRyZWFkRmlsZSwgW3BhdGgsIG9wdGlvbnMsIGNiXV0pXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICAgcmV0cnkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHZhciBmcyR3cml0ZUZpbGUgPSBmcy53cml0ZUZpbGVcbiAgZnMud3JpdGVGaWxlID0gd3JpdGVGaWxlXG4gIGZ1bmN0aW9uIHdyaXRlRmlsZSAocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpXG4gICAgICBjYiA9IG9wdGlvbnMsIG9wdGlvbnMgPSBudWxsXG5cbiAgICByZXR1cm4gZ28kd3JpdGVGaWxlKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKVxuXG4gICAgZnVuY3Rpb24gZ28kd3JpdGVGaWxlIChwYXRoLCBkYXRhLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIGZzJHdyaXRlRmlsZShwYXRoLCBkYXRhLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICAgIGVucXVldWUoW2dvJHdyaXRlRmlsZSwgW3BhdGgsIGRhdGEsIG9wdGlvbnMsIGNiXV0pXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICAgcmV0cnkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHZhciBmcyRhcHBlbmRGaWxlID0gZnMuYXBwZW5kRmlsZVxuICBpZiAoZnMkYXBwZW5kRmlsZSlcbiAgICBmcy5hcHBlbmRGaWxlID0gYXBwZW5kRmlsZVxuICBmdW5jdGlvbiBhcHBlbmRGaWxlIChwYXRoLCBkYXRhLCBvcHRpb25zLCBjYikge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIGNiID0gb3B0aW9ucywgb3B0aW9ucyA9IG51bGxcblxuICAgIHJldHVybiBnbyRhcHBlbmRGaWxlKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKVxuXG4gICAgZnVuY3Rpb24gZ28kYXBwZW5kRmlsZSAocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiBmcyRhcHBlbmRGaWxlKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgICAgZW5xdWV1ZShbZ28kYXBwZW5kRmlsZSwgW3BhdGgsIGRhdGEsIG9wdGlvbnMsIGNiXV0pXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICAgcmV0cnkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHZhciBmcyRyZWFkZGlyID0gZnMucmVhZGRpclxuICBmcy5yZWFkZGlyID0gcmVhZGRpclxuICBmdW5jdGlvbiByZWFkZGlyIChwYXRoLCBvcHRpb25zLCBjYikge1xuICAgIHZhciBhcmdzID0gW3BhdGhdXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhcmdzLnB1c2gob3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgY2IgPSBvcHRpb25zXG4gICAgfVxuICAgIGFyZ3MucHVzaChnbyRyZWFkZGlyJGNiKVxuXG4gICAgcmV0dXJuIGdvJHJlYWRkaXIoYXJncylcblxuICAgIGZ1bmN0aW9uIGdvJHJlYWRkaXIkY2IgKGVyciwgZmlsZXMpIHtcbiAgICAgIGlmIChmaWxlcyAmJiBmaWxlcy5zb3J0KVxuICAgICAgICBmaWxlcy5zb3J0KClcblxuICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgIGVucXVldWUoW2dvJHJlYWRkaXIsIFthcmdzXV0pXG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIHJldHJ5KClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnbyRyZWFkZGlyIChhcmdzKSB7XG4gICAgcmV0dXJuIGZzJHJlYWRkaXIuYXBwbHkoZnMsIGFyZ3MpXG4gIH1cblxuICBpZiAocHJvY2Vzcy52ZXJzaW9uLnN1YnN0cigwLCA0KSA9PT0gJ3YwLjgnKSB7XG4gICAgdmFyIGxlZ1N0cmVhbXMgPSBsZWdhY3koZnMpXG4gICAgUmVhZFN0cmVhbSA9IGxlZ1N0cmVhbXMuUmVhZFN0cmVhbVxuICAgIFdyaXRlU3RyZWFtID0gbGVnU3RyZWFtcy5Xcml0ZVN0cmVhbVxuICB9XG5cbiAgdmFyIGZzJFJlYWRTdHJlYW0gPSBmcy5SZWFkU3RyZWFtXG4gIFJlYWRTdHJlYW0ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShmcyRSZWFkU3RyZWFtLnByb3RvdHlwZSlcbiAgUmVhZFN0cmVhbS5wcm90b3R5cGUub3BlbiA9IFJlYWRTdHJlYW0kb3BlblxuXG4gIHZhciBmcyRXcml0ZVN0cmVhbSA9IGZzLldyaXRlU3RyZWFtXG4gIFdyaXRlU3RyZWFtLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoZnMkV3JpdGVTdHJlYW0ucHJvdG90eXBlKVxuICBXcml0ZVN0cmVhbS5wcm90b3R5cGUub3BlbiA9IFdyaXRlU3RyZWFtJG9wZW5cblxuICBmcy5SZWFkU3RyZWFtID0gUmVhZFN0cmVhbVxuICBmcy5Xcml0ZVN0cmVhbSA9IFdyaXRlU3RyZWFtXG5cbiAgZnVuY3Rpb24gUmVhZFN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgUmVhZFN0cmVhbSlcbiAgICAgIHJldHVybiBmcyRSZWFkU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHRoaXNcbiAgICBlbHNlXG4gICAgICByZXR1cm4gUmVhZFN0cmVhbS5hcHBseShPYmplY3QuY3JlYXRlKFJlYWRTdHJlYW0ucHJvdG90eXBlKSwgYXJndW1lbnRzKVxuICB9XG5cbiAgZnVuY3Rpb24gUmVhZFN0cmVhbSRvcGVuICgpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICBvcGVuKHRoYXQucGF0aCwgdGhhdC5mbGFncywgdGhhdC5tb2RlLCBmdW5jdGlvbiAoZXJyLCBmZCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBpZiAodGhhdC5hdXRvQ2xvc2UpXG4gICAgICAgICAgdGhhdC5kZXN0cm95KClcblxuICAgICAgICB0aGF0LmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5mZCA9IGZkXG4gICAgICAgIHRoYXQuZW1pdCgnb3BlbicsIGZkKVxuICAgICAgICB0aGF0LnJlYWQoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBXcml0ZVN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgV3JpdGVTdHJlYW0pXG4gICAgICByZXR1cm4gZnMkV3JpdGVTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdGhpc1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBXcml0ZVN0cmVhbS5hcHBseShPYmplY3QuY3JlYXRlKFdyaXRlU3RyZWFtLnByb3RvdHlwZSksIGFyZ3VtZW50cylcbiAgfVxuXG4gIGZ1bmN0aW9uIFdyaXRlU3RyZWFtJG9wZW4gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIG9wZW4odGhhdC5wYXRoLCB0aGF0LmZsYWdzLCB0aGF0Lm1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHRoYXQuZGVzdHJveSgpXG4gICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmZkID0gZmRcbiAgICAgICAgdGhhdC5lbWl0KCdvcGVuJywgZmQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVJlYWRTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFJlYWRTdHJlYW0ocGF0aCwgb3B0aW9ucylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVdyaXRlU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBXcml0ZVN0cmVhbShwYXRoLCBvcHRpb25zKVxuICB9XG5cbiAgdmFyIGZzJG9wZW4gPSBmcy5vcGVuXG4gIGZzLm9wZW4gPSBvcGVuXG4gIGZ1bmN0aW9uIG9wZW4gKHBhdGgsIGZsYWdzLCBtb2RlLCBjYikge1xuICAgIGlmICh0eXBlb2YgbW9kZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIGNiID0gbW9kZSwgbW9kZSA9IG51bGxcblxuICAgIHJldHVybiBnbyRvcGVuKHBhdGgsIGZsYWdzLCBtb2RlLCBjYilcblxuICAgIGZ1bmN0aW9uIGdvJG9wZW4gKHBhdGgsIGZsYWdzLCBtb2RlLCBjYikge1xuICAgICAgcmV0dXJuIGZzJG9wZW4ocGF0aCwgZmxhZ3MsIG1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICAgIGVucXVldWUoW2dvJG9wZW4sIFtwYXRoLCBmbGFncywgbW9kZSwgY2JdXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZzXG59XG5cbmZ1bmN0aW9uIGVucXVldWUgKGVsZW0pIHtcbiAgZGVidWcoJ0VOUVVFVUUnLCBlbGVtWzBdLm5hbWUsIGVsZW1bMV0pXG4gIHF1ZXVlLnB1c2goZWxlbSlcbn1cblxuZnVuY3Rpb24gcmV0cnkgKCkge1xuICB2YXIgZWxlbSA9IHF1ZXVlLnNoaWZ0KClcbiAgaWYgKGVsZW0pIHtcbiAgICBkZWJ1ZygnUkVUUlknLCBlbGVtWzBdLm5hbWUsIGVsZW1bMV0pXG4gICAgZWxlbVswXS5hcHBseShudWxsLCBlbGVtWzFdKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ3JhY2VmdWwtZnMvZ3JhY2VmdWwtZnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWtkaXJzOiByZXF1aXJlKCcuL21rZGlycycpLFxuICBta2RpcnNTeW5jOiByZXF1aXJlKCcuL21rZGlycy1zeW5jJyksXG4gIC8vIGFsaWFzXG4gIG1rZGlycDogcmVxdWlyZSgnLi9ta2RpcnMnKSxcbiAgbWtkaXJwU3luYzogcmVxdWlyZSgnLi9ta2RpcnMtc3luYycpLFxuICBlbnN1cmVEaXI6IHJlcXVpcmUoJy4vbWtkaXJzJyksXG4gIGVuc3VyZURpclN5bmM6IHJlcXVpcmUoJy4vbWtkaXJzLXN5bmMnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9ta2RpcnMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHJpbXJhZiA9IHJlcXVpcmUoJy4vcmltcmFmJylcblxuZnVuY3Rpb24gcmVtb3ZlU3luYyAoZGlyKSB7XG4gIHJldHVybiByaW1yYWYuc3luYyhkaXIsIHtkaXNhYmxlR2xvYjogdHJ1ZX0pXG59XG5cbmZ1bmN0aW9uIHJlbW92ZSAoZGlyLCBjYWxsYmFjaykge1xuICBjb25zdCBvcHRpb25zID0ge2Rpc2FibGVHbG9iOiB0cnVlfVxuICByZXR1cm4gY2FsbGJhY2sgPyByaW1yYWYoZGlyLCBvcHRpb25zLCBjYWxsYmFjaykgOiByaW1yYWYoZGlyLCBvcHRpb25zLCBmdW5jdGlvbiAoKSB7fSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlbW92ZSxcbiAgcmVtb3ZlU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9yZW1vdmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJmc1wiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBqc29uRmlsZSA9IHJlcXVpcmUoJ2pzb25maWxlJylcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGpzb25maWxlIGV4cG9ydHNcbiAgcmVhZEpzb246IGpzb25GaWxlLnJlYWRGaWxlLFxuICByZWFkSlNPTjoganNvbkZpbGUucmVhZEZpbGUsXG4gIHJlYWRKc29uU3luYzoganNvbkZpbGUucmVhZEZpbGVTeW5jLFxuICByZWFkSlNPTlN5bmM6IGpzb25GaWxlLnJlYWRGaWxlU3luYyxcbiAgd3JpdGVKc29uOiBqc29uRmlsZS53cml0ZUZpbGUsXG4gIHdyaXRlSlNPTjoganNvbkZpbGUud3JpdGVGaWxlLFxuICB3cml0ZUpzb25TeW5jOiBqc29uRmlsZS53cml0ZUZpbGVTeW5jLFxuICB3cml0ZUpTT05TeW5jOiBqc29uRmlsZS53cml0ZUZpbGVTeW5jLFxuICBzcGFjZXM6IDIgLy8gZGVmYXVsdCBpbiBmcy1leHRyYVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9qc29uL2pzb25maWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGludmFsaWRXaW4zMlBhdGggPSByZXF1aXJlKCcuL3dpbjMyJykuaW52YWxpZFdpbjMyUGF0aFxuXG5jb25zdCBvNzc3ID0gcGFyc2VJbnQoJzA3NzcnLCA4KVxuXG5mdW5jdGlvbiBta2RpcnNTeW5jIChwLCBvcHRzLCBtYWRlKSB7XG4gIGlmICghb3B0cyB8fCB0eXBlb2Ygb3B0cyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRzID0geyBtb2RlOiBvcHRzIH1cbiAgfVxuXG4gIGxldCBtb2RlID0gb3B0cy5tb2RlXG4gIGNvbnN0IHhmcyA9IG9wdHMuZnMgfHwgZnNcblxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyAmJiBpbnZhbGlkV2luMzJQYXRoKHApKSB7XG4gICAgY29uc3QgZXJySW52YWwgPSBuZXcgRXJyb3IocCArICcgY29udGFpbnMgaW52YWxpZCBXSU4zMiBwYXRoIGNoYXJhY3RlcnMuJylcbiAgICBlcnJJbnZhbC5jb2RlID0gJ0VJTlZBTCdcbiAgICB0aHJvdyBlcnJJbnZhbFxuICB9XG5cbiAgaWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIG1vZGUgPSBvNzc3ICYgKH5wcm9jZXNzLnVtYXNrKCkpXG4gIH1cbiAgaWYgKCFtYWRlKSBtYWRlID0gbnVsbFxuXG4gIHAgPSBwYXRoLnJlc29sdmUocClcblxuICB0cnkge1xuICAgIHhmcy5ta2RpclN5bmMocCwgbW9kZSlcbiAgICBtYWRlID0gbWFkZSB8fCBwXG4gIH0gY2F0Y2ggKGVycjApIHtcbiAgICBzd2l0Y2ggKGVycjAuY29kZSkge1xuICAgICAgY2FzZSAnRU5PRU5UJzpcbiAgICAgICAgaWYgKHBhdGguZGlybmFtZShwKSA9PT0gcCkgdGhyb3cgZXJyMFxuICAgICAgICBtYWRlID0gbWtkaXJzU3luYyhwYXRoLmRpcm5hbWUocCksIG9wdHMsIG1hZGUpXG4gICAgICAgIG1rZGlyc1N5bmMocCwgb3B0cywgbWFkZSlcbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gSW4gdGhlIGNhc2Ugb2YgYW55IG90aGVyIGVycm9yLCBqdXN0IHNlZSBpZiB0aGVyZSdzIGEgZGlyXG4gICAgICAvLyB0aGVyZSBhbHJlYWR5LiAgSWYgc28sIHRoZW4gaG9vcmF5ISAgSWYgbm90LCB0aGVuIHNvbWV0aGluZ1xuICAgICAgLy8gaXMgYm9ya2VkLlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGV0IHN0YXRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdGF0ID0geGZzLnN0YXRTeW5jKHApXG4gICAgICAgIH0gY2F0Y2ggKGVycjEpIHtcbiAgICAgICAgICB0aHJvdyBlcnIwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdGF0LmlzRGlyZWN0b3J5KCkpIHRocm93IGVycjBcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFkZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1rZGlyc1N5bmNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvbWtkaXJzL21rZGlycy1zeW5jLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGludmFsaWRXaW4zMlBhdGggPSByZXF1aXJlKCcuL3dpbjMyJykuaW52YWxpZFdpbjMyUGF0aFxuXG5jb25zdCBvNzc3ID0gcGFyc2VJbnQoJzA3NzcnLCA4KVxuXG5mdW5jdGlvbiBta2RpcnMgKHAsIG9wdHMsIGNhbGxiYWNrLCBtYWRlKSB7XG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0c1xuICAgIG9wdHMgPSB7fVxuICB9IGVsc2UgaWYgKCFvcHRzIHx8IHR5cGVvZiBvcHRzICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSB7IG1vZGU6IG9wdHMgfVxuICB9XG5cbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgJiYgaW52YWxpZFdpbjMyUGF0aChwKSkge1xuICAgIGNvbnN0IGVyckludmFsID0gbmV3IEVycm9yKHAgKyAnIGNvbnRhaW5zIGludmFsaWQgV0lOMzIgcGF0aCBjaGFyYWN0ZXJzLicpXG4gICAgZXJySW52YWwuY29kZSA9ICdFSU5WQUwnXG4gICAgcmV0dXJuIGNhbGxiYWNrKGVyckludmFsKVxuICB9XG5cbiAgbGV0IG1vZGUgPSBvcHRzLm1vZGVcbiAgY29uc3QgeGZzID0gb3B0cy5mcyB8fCBmc1xuXG4gIGlmIChtb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICBtb2RlID0gbzc3NyAmICh+cHJvY2Vzcy51bWFzaygpKVxuICB9XG4gIGlmICghbWFkZSkgbWFkZSA9IG51bGxcblxuICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9XG4gIHAgPSBwYXRoLnJlc29sdmUocClcblxuICB4ZnMubWtkaXIocCwgbW9kZSwgZXIgPT4ge1xuICAgIGlmICghZXIpIHtcbiAgICAgIG1hZGUgPSBtYWRlIHx8IHBcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBtYWRlKVxuICAgIH1cbiAgICBzd2l0Y2ggKGVyLmNvZGUpIHtcbiAgICAgIGNhc2UgJ0VOT0VOVCc6XG4gICAgICAgIGlmIChwYXRoLmRpcm5hbWUocCkgPT09IHApIHJldHVybiBjYWxsYmFjayhlcilcbiAgICAgICAgbWtkaXJzKHBhdGguZGlybmFtZShwKSwgb3B0cywgKGVyLCBtYWRlKSA9PiB7XG4gICAgICAgICAgaWYgKGVyKSBjYWxsYmFjayhlciwgbWFkZSlcbiAgICAgICAgICBlbHNlIG1rZGlycyhwLCBvcHRzLCBjYWxsYmFjaywgbWFkZSlcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcblxuICAgICAgLy8gSW4gdGhlIGNhc2Ugb2YgYW55IG90aGVyIGVycm9yLCBqdXN0IHNlZSBpZiB0aGVyZSdzIGEgZGlyXG4gICAgICAvLyB0aGVyZSBhbHJlYWR5LiAgSWYgc28sIHRoZW4gaG9vcmF5ISAgSWYgbm90LCB0aGVuIHNvbWV0aGluZ1xuICAgICAgLy8gaXMgYm9ya2VkLlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgeGZzLnN0YXQocCwgKGVyMiwgc3RhdCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHRoZSBzdGF0IGZhaWxzLCB0aGVuIHRoYXQncyBzdXBlciB3ZWlyZC5cbiAgICAgICAgICAvLyBsZXQgdGhlIG9yaWdpbmFsIGVycm9yIGJlIHRoZSBmYWlsdXJlIHJlYXNvbi5cbiAgICAgICAgICBpZiAoZXIyIHx8ICFzdGF0LmlzRGlyZWN0b3J5KCkpIGNhbGxiYWNrKGVyLCBtYWRlKVxuICAgICAgICAgIGVsc2UgY2FsbGJhY2sobnVsbCwgbWFkZSlcbiAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWtkaXJzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL21rZGlycy9ta2RpcnMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvcHlTeW5jOiByZXF1aXJlKCcuL2NvcHktc3luYycpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2NvcHktc3luYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBpbXBvcnRlZCBmcm9tIG5jcCAodGhpcyBpcyB0ZW1wb3JhcnksIHdpbGwgcmV3cml0ZSlcblxudmFyIGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciB1dGltZXMgPSByZXF1aXJlKCcuLi91dGlsL3V0aW1lcycpXG5cbmZ1bmN0aW9uIG5jcCAoc291cmNlLCBkZXN0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICB2YXIgYmFzZVBhdGggPSBwcm9jZXNzLmN3ZCgpXG4gIHZhciBjdXJyZW50UGF0aCA9IHBhdGgucmVzb2x2ZShiYXNlUGF0aCwgc291cmNlKVxuICB2YXIgdGFyZ2V0UGF0aCA9IHBhdGgucmVzb2x2ZShiYXNlUGF0aCwgZGVzdClcblxuICB2YXIgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXJcbiAgdmFyIHRyYW5zZm9ybSA9IG9wdGlvbnMudHJhbnNmb3JtXG4gIHZhciBvdmVyd3JpdGUgPSBvcHRpb25zLm92ZXJ3cml0ZVxuICAvLyBJZiBvdmVyd3JpdGUgaXMgdW5kZWZpbmVkLCB1c2UgY2xvYmJlciwgb3RoZXJ3aXNlIGRlZmF1bHQgdG8gdHJ1ZTpcbiAgaWYgKG92ZXJ3cml0ZSA9PT0gdW5kZWZpbmVkKSBvdmVyd3JpdGUgPSBvcHRpb25zLmNsb2JiZXJcbiAgaWYgKG92ZXJ3cml0ZSA9PT0gdW5kZWZpbmVkKSBvdmVyd3JpdGUgPSB0cnVlXG4gIHZhciBlcnJvck9uRXhpc3QgPSBvcHRpb25zLmVycm9yT25FeGlzdFxuICB2YXIgZGVyZWZlcmVuY2UgPSBvcHRpb25zLmRlcmVmZXJlbmNlXG4gIHZhciBwcmVzZXJ2ZVRpbWVzdGFtcHMgPSBvcHRpb25zLnByZXNlcnZlVGltZXN0YW1wcyA9PT0gdHJ1ZVxuXG4gIHZhciBzdGFydGVkID0gMFxuICB2YXIgZmluaXNoZWQgPSAwXG4gIHZhciBydW5uaW5nID0gMFxuXG4gIHZhciBlcnJvcmVkID0gZmFsc2VcblxuICBzdGFydENvcHkoY3VycmVudFBhdGgpXG5cbiAgZnVuY3Rpb24gc3RhcnRDb3B5IChzb3VyY2UpIHtcbiAgICBzdGFydGVkKytcbiAgICBpZiAoZmlsdGVyKSB7XG4gICAgICBpZiAoZmlsdGVyIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignV2FybmluZzogZnMtZXh0cmE6IFBhc3NpbmcgYSBSZWdFeHAgZmlsdGVyIGlzIGRlcHJlY2F0ZWQsIHVzZSBhIGZ1bmN0aW9uJylcbiAgICAgICAgaWYgKCFmaWx0ZXIudGVzdChzb3VyY2UpKSB7XG4gICAgICAgICAgcmV0dXJuIGRvbmVPbmUodHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICghZmlsdGVyKHNvdXJjZSwgZGVzdCkpIHtcbiAgICAgICAgICByZXR1cm4gZG9uZU9uZSh0cnVlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnZXRTdGF0cyhzb3VyY2UpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRTdGF0cyAoc291cmNlKSB7XG4gICAgdmFyIHN0YXQgPSBkZXJlZmVyZW5jZSA/IGZzLnN0YXQgOiBmcy5sc3RhdFxuICAgIHJ1bm5pbmcrK1xuICAgIHN0YXQoc291cmNlLCBmdW5jdGlvbiAoZXJyLCBzdGF0cykge1xuICAgICAgaWYgKGVycikgcmV0dXJuIG9uRXJyb3IoZXJyKVxuXG4gICAgICAvLyBXZSBuZWVkIHRvIGdldCB0aGUgbW9kZSBmcm9tIHRoZSBzdGF0cyBvYmplY3QgYW5kIHByZXNlcnZlIGl0LlxuICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgIG5hbWU6IHNvdXJjZSxcbiAgICAgICAgbW9kZTogc3RhdHMubW9kZSxcbiAgICAgICAgbXRpbWU6IHN0YXRzLm10aW1lLCAvLyBtb2RpZmllZCB0aW1lXG4gICAgICAgIGF0aW1lOiBzdGF0cy5hdGltZSwgLy8gYWNjZXNzIHRpbWVcbiAgICAgICAgc3RhdHM6IHN0YXRzIC8vIHRlbXBvcmFyeVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICByZXR1cm4gb25EaXIoaXRlbSlcbiAgICAgIH0gZWxzZSBpZiAoc3RhdHMuaXNGaWxlKCkgfHwgc3RhdHMuaXNDaGFyYWN0ZXJEZXZpY2UoKSB8fCBzdGF0cy5pc0Jsb2NrRGV2aWNlKCkpIHtcbiAgICAgICAgcmV0dXJuIG9uRmlsZShpdGVtKVxuICAgICAgfSBlbHNlIGlmIChzdGF0cy5pc1N5bWJvbGljTGluaygpKSB7XG4gICAgICAgIC8vIFN5bWxpbmtzIGRvbid0IHJlYWxseSBuZWVkIHRvIGtub3cgYWJvdXQgdGhlIG1vZGUuXG4gICAgICAgIHJldHVybiBvbkxpbmsoc291cmNlKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBvbkZpbGUgKGZpbGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZmlsZS5uYW1lLnJlcGxhY2UoY3VycmVudFBhdGgsIHRhcmdldFBhdGgucmVwbGFjZSgnJCcsICckJCQkJykpIC8vIGVzY2FwZXMgJyQnIHdpdGggJyQkJ1xuICAgIGlzV3JpdGFibGUodGFyZ2V0LCBmdW5jdGlvbiAod3JpdGFibGUpIHtcbiAgICAgIGlmICh3cml0YWJsZSkge1xuICAgICAgICBjb3B5RmlsZShmaWxlLCB0YXJnZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICAgICAgcm1GaWxlKHRhcmdldCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29weUZpbGUoZmlsZSwgdGFyZ2V0KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3JPbkV4aXN0KSB7XG4gICAgICAgICAgb25FcnJvcihuZXcgRXJyb3IodGFyZ2V0ICsgJyBhbHJlYWR5IGV4aXN0cycpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvbmVPbmUoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvcHlGaWxlIChmaWxlLCB0YXJnZXQpIHtcbiAgICB2YXIgcmVhZFN0cmVhbSA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oZmlsZS5uYW1lKVxuICAgIHZhciB3cml0ZVN0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKHRhcmdldCwgeyBtb2RlOiBmaWxlLm1vZGUgfSlcblxuICAgIHJlYWRTdHJlYW0ub24oJ2Vycm9yJywgb25FcnJvcilcbiAgICB3cml0ZVN0cmVhbS5vbignZXJyb3InLCBvbkVycm9yKVxuXG4gICAgaWYgKHRyYW5zZm9ybSkge1xuICAgICAgdHJhbnNmb3JtKHJlYWRTdHJlYW0sIHdyaXRlU3RyZWFtLCBmaWxlKVxuICAgIH0gZWxzZSB7XG4gICAgICB3cml0ZVN0cmVhbS5vbignb3BlbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVhZFN0cmVhbS5waXBlKHdyaXRlU3RyZWFtKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB3cml0ZVN0cmVhbS5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZzLmNobW9kKHRhcmdldCwgZmlsZS5tb2RlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgICAgaWYgKHByZXNlcnZlVGltZXN0YW1wcykge1xuICAgICAgICAgIHV0aW1lcy51dGltZXNNaWxsaXModGFyZ2V0LCBmaWxlLmF0aW1lLCBmaWxlLm10aW1lLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICAgICAgICByZXR1cm4gZG9uZU9uZSgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb25lT25lKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcm1GaWxlIChmaWxlLCBkb25lKSB7XG4gICAgZnMudW5saW5rKGZpbGUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgIHJldHVybiBkb25lKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gb25EaXIgKGRpcikge1xuICAgIHZhciB0YXJnZXQgPSBkaXIubmFtZS5yZXBsYWNlKGN1cnJlbnRQYXRoLCB0YXJnZXRQYXRoLnJlcGxhY2UoJyQnLCAnJCQkJCcpKSAvLyBlc2NhcGVzICckJyB3aXRoICckJCdcbiAgICBpc1dyaXRhYmxlKHRhcmdldCwgZnVuY3Rpb24gKHdyaXRhYmxlKSB7XG4gICAgICBpZiAod3JpdGFibGUpIHtcbiAgICAgICAgcmV0dXJuIG1rRGlyKGRpciwgdGFyZ2V0KVxuICAgICAgfVxuICAgICAgY29weURpcihkaXIubmFtZSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gbWtEaXIgKGRpciwgdGFyZ2V0KSB7XG4gICAgZnMubWtkaXIodGFyZ2V0LCBkaXIubW9kZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikgcmV0dXJuIG9uRXJyb3IoZXJyKVxuICAgICAgLy8gZGVzcGl0ZSBzZXR0aW5nIG1vZGUgaW4gZnMubWtkaXIsIGRvZXNuJ3Qgc2VlbSB0byB3b3JrXG4gICAgICAvLyBzbyB3ZSBzZXQgaXQgaGVyZS5cbiAgICAgIGZzLmNobW9kKHRhcmdldCwgZGlyLm1vZGUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIG9uRXJyb3IoZXJyKVxuICAgICAgICBjb3B5RGlyKGRpci5uYW1lKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY29weURpciAoZGlyKSB7XG4gICAgZnMucmVhZGRpcihkaXIsIGZ1bmN0aW9uIChlcnIsIGl0ZW1zKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHN0YXJ0Q29weShwYXRoLmpvaW4oZGlyLCBpdGVtKSlcbiAgICAgIH0pXG4gICAgICByZXR1cm4gZG9uZU9uZSgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTGluayAobGluaykge1xuICAgIHZhciB0YXJnZXQgPSBsaW5rLnJlcGxhY2UoY3VycmVudFBhdGgsIHRhcmdldFBhdGgpXG4gICAgZnMucmVhZGxpbmsobGluaywgZnVuY3Rpb24gKGVyciwgcmVzb2x2ZWRQYXRoKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICBjaGVja0xpbmsocmVzb2x2ZWRQYXRoLCB0YXJnZXQpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrTGluayAocmVzb2x2ZWRQYXRoLCB0YXJnZXQpIHtcbiAgICBpZiAoZGVyZWZlcmVuY2UpIHtcbiAgICAgIHJlc29sdmVkUGF0aCA9IHBhdGgucmVzb2x2ZShiYXNlUGF0aCwgcmVzb2x2ZWRQYXRoKVxuICAgIH1cbiAgICBpc1dyaXRhYmxlKHRhcmdldCwgZnVuY3Rpb24gKHdyaXRhYmxlKSB7XG4gICAgICBpZiAod3JpdGFibGUpIHtcbiAgICAgICAgcmV0dXJuIG1ha2VMaW5rKHJlc29sdmVkUGF0aCwgdGFyZ2V0KVxuICAgICAgfVxuICAgICAgZnMucmVhZGxpbmsodGFyZ2V0LCBmdW5jdGlvbiAoZXJyLCB0YXJnZXREZXN0KSB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcblxuICAgICAgICBpZiAoZGVyZWZlcmVuY2UpIHtcbiAgICAgICAgICB0YXJnZXREZXN0ID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCB0YXJnZXREZXN0KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXREZXN0ID09PSByZXNvbHZlZFBhdGgpIHtcbiAgICAgICAgICByZXR1cm4gZG9uZU9uZSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJtRmlsZSh0YXJnZXQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBtYWtlTGluayhyZXNvbHZlZFBhdGgsIHRhcmdldClcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VMaW5rIChsaW5rUGF0aCwgdGFyZ2V0KSB7XG4gICAgZnMuc3ltbGluayhsaW5rUGF0aCwgdGFyZ2V0LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICByZXR1cm4gZG9uZU9uZSgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzV3JpdGFibGUgKHBhdGgsIGRvbmUpIHtcbiAgICBmcy5sc3RhdChwYXRoLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VOT0VOVCcpIHJldHVybiBkb25lKHRydWUpXG4gICAgICAgIHJldHVybiBkb25lKGZhbHNlKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRvbmUoZmFsc2UpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRXJyb3IgKGVycikge1xuICAgIC8vIGVuc3VyZSBjYWxsYmFjayBpcyBkZWZpbmVkICYgY2FsbGVkIG9ubHkgb25jZTpcbiAgICBpZiAoIWVycm9yZWQgJiYgY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3JlZCA9IHRydWVcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZG9uZU9uZSAoc2tpcHBlZCkge1xuICAgIGlmICghc2tpcHBlZCkgcnVubmluZy0tXG4gICAgZmluaXNoZWQrK1xuICAgIGlmICgoc3RhcnRlZCA9PT0gZmluaXNoZWQpICYmIChydW5uaW5nID09PSAwKSkge1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmNwXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2NvcHkvbmNwLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IGpzb25GaWxlID0gcmVxdWlyZSgnLi9qc29uZmlsZScpXG5cbmZ1bmN0aW9uIG91dHB1dEpzb25TeW5jIChmaWxlLCBkYXRhLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuXG4gIGlmICghZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgbWtkaXIubWtkaXJzU3luYyhkaXIpXG4gIH1cblxuICBqc29uRmlsZS53cml0ZUpzb25TeW5jKGZpbGUsIGRhdGEsIG9wdGlvbnMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3V0cHV0SnNvblN5bmNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvanNvbi9vdXRwdXQtanNvbi1zeW5jLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5jb25zdCBqc29uRmlsZSA9IHJlcXVpcmUoJy4vanNvbmZpbGUnKVxuXG5mdW5jdGlvbiBvdXRwdXRKc29uIChmaWxlLCBkYXRhLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuXG4gIGZzLmV4aXN0cyhkaXIsIGl0RG9lcyA9PiB7XG4gICAgaWYgKGl0RG9lcykgcmV0dXJuIGpzb25GaWxlLndyaXRlSnNvbihmaWxlLCBkYXRhLCBvcHRpb25zLCBjYWxsYmFjaylcblxuICAgIG1rZGlyLm1rZGlycyhkaXIsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAganNvbkZpbGUud3JpdGVKc29uKGZpbGUsIGRhdGEsIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgIH0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3V0cHV0SnNvblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9qc29uL291dHB1dC1qc29uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG4vLyBnZXQgZHJpdmUgb24gd2luZG93c1xuZnVuY3Rpb24gZ2V0Um9vdFBhdGggKHApIHtcbiAgcCA9IHBhdGgubm9ybWFsaXplKHBhdGgucmVzb2x2ZShwKSkuc3BsaXQocGF0aC5zZXApXG4gIGlmIChwLmxlbmd0aCA+IDApIHJldHVybiBwWzBdXG4gIHJldHVybiBudWxsXG59XG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyODg4LzEwMzMzIGNvbnRhaW5zIG1vcmUgYWNjdXJhdGVcbi8vIFRPRE86IGV4cGFuZCB0byBpbmNsdWRlIHRoZSByZXN0XG5jb25zdCBJTlZBTElEX1BBVEhfQ0hBUlMgPSAvWzw+OlwifD8qXS9cblxuZnVuY3Rpb24gaW52YWxpZFdpbjMyUGF0aCAocCkge1xuICBjb25zdCBycCA9IGdldFJvb3RQYXRoKHApXG4gIHAgPSBwLnJlcGxhY2UocnAsICcnKVxuICByZXR1cm4gSU5WQUxJRF9QQVRIX0NIQVJTLnRlc3QocClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldFJvb3RQYXRoLFxuICBpbnZhbGlkV2luMzJQYXRoXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL21rZGlycy93aW4zMi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZShmcylcblxuZnVuY3Rpb24gY2xvbmUgKG9iaikge1xuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKVxuICAgIHJldHVybiBvYmpcblxuICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgIHZhciBjb3B5ID0geyBfX3Byb3RvX186IG9iai5fX3Byb3RvX18gfVxuICBlbHNlXG4gICAgdmFyIGNvcHkgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29weSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSlcbiAgfSlcblxuICByZXR1cm4gY29weVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dyYWNlZnVsLWZzL2ZzLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3NlcnRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJhc3NlcnRcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwi77u/aW1wb3J0ICogYXMgZnMgZnJvbSBcImZzLWV4dHJhXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIENEUExpYlxyXG4gKiBAYnJpZWYgQ0RQIGJvaWxlcnBsYXRlIOeUn+aIkOapn+iDveOCkuaPkOS+m+OBmeOCi+OCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENEUExpYiB7XHJcbiAgICAvKipcclxuICAgICAqIG1haW4gY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4ZWN1dGUob3B0aW9uczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoXCJwYWNrYWdlLmpzb25cIikpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJva1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY2RwLWxpYi50cyIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcblxuY29uc3QgQlVGX0xFTkdUSCA9IDY0ICogMTAyNFxuY29uc3QgX2J1ZmYgPSBuZXcgQnVmZmVyKEJVRl9MRU5HVEgpXG5cbmZ1bmN0aW9uIGNvcHlGaWxlU3luYyAoc3JjRmlsZSwgZGVzdEZpbGUsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3ZlcndyaXRlID0gb3B0aW9ucy5vdmVyd3JpdGVcbiAgY29uc3QgZXJyb3JPbkV4aXN0ID0gb3B0aW9ucy5lcnJvck9uRXhpc3RcbiAgY29uc3QgcHJlc2VydmVUaW1lc3RhbXBzID0gb3B0aW9ucy5wcmVzZXJ2ZVRpbWVzdGFtcHNcblxuICBpZiAoZnMuZXhpc3RzU3luYyhkZXN0RmlsZSkpIHtcbiAgICBpZiAob3ZlcndyaXRlKSB7XG4gICAgICBmcy51bmxpbmtTeW5jKGRlc3RGaWxlKVxuICAgIH0gZWxzZSBpZiAoZXJyb3JPbkV4aXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7ZGVzdEZpbGV9IGFscmVhZHkgZXhpc3RzYClcbiAgICB9IGVsc2UgcmV0dXJuXG4gIH1cblxuICBjb25zdCBmZHIgPSBmcy5vcGVuU3luYyhzcmNGaWxlLCAncicpXG4gIGNvbnN0IHN0YXQgPSBmcy5mc3RhdFN5bmMoZmRyKVxuICBjb25zdCBmZHcgPSBmcy5vcGVuU3luYyhkZXN0RmlsZSwgJ3cnLCBzdGF0Lm1vZGUpXG4gIGxldCBieXRlc1JlYWQgPSAxXG4gIGxldCBwb3MgPSAwXG5cbiAgd2hpbGUgKGJ5dGVzUmVhZCA+IDApIHtcbiAgICBieXRlc1JlYWQgPSBmcy5yZWFkU3luYyhmZHIsIF9idWZmLCAwLCBCVUZfTEVOR1RILCBwb3MpXG4gICAgZnMud3JpdGVTeW5jKGZkdywgX2J1ZmYsIDAsIGJ5dGVzUmVhZClcbiAgICBwb3MgKz0gYnl0ZXNSZWFkXG4gIH1cblxuICBpZiAocHJlc2VydmVUaW1lc3RhbXBzKSB7XG4gICAgZnMuZnV0aW1lc1N5bmMoZmR3LCBzdGF0LmF0aW1lLCBzdGF0Lm10aW1lKVxuICB9XG5cbiAgZnMuY2xvc2VTeW5jKGZkcilcbiAgZnMuY2xvc2VTeW5jKGZkdylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5RmlsZVN5bmNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvY29weS1zeW5jL2NvcHktZmlsZS1zeW5jLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBjb3B5RmlsZVN5bmMgPSByZXF1aXJlKCcuL2NvcHktZmlsZS1zeW5jJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcblxuZnVuY3Rpb24gY29weVN5bmMgKHNyYywgZGVzdCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIG9wdGlvbnMgPSB7ZmlsdGVyOiBvcHRpb25zfVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgb3B0aW9ucy5yZWN1cnNpdmUgPSAhIW9wdGlvbnMucmVjdXJzaXZlXG5cbiAgLy8gZGVmYXVsdCB0byB0cnVlIGZvciBub3dcbiAgb3B0aW9ucy5jbG9iYmVyID0gJ2Nsb2JiZXInIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMuY2xvYmJlciA6IHRydWVcbiAgLy8gb3ZlcndyaXRlIGZhbGxzIGJhY2sgdG8gY2xvYmJlclxuICBvcHRpb25zLm92ZXJ3cml0ZSA9ICdvdmVyd3JpdGUnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMub3ZlcndyaXRlIDogb3B0aW9ucy5jbG9iYmVyXG4gIG9wdGlvbnMuZGVyZWZlcmVuY2UgPSAnZGVyZWZlcmVuY2UnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMuZGVyZWZlcmVuY2UgOiBmYWxzZVxuICBvcHRpb25zLnByZXNlcnZlVGltZXN0YW1wcyA9ICdwcmVzZXJ2ZVRpbWVzdGFtcHMnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzIDogZmFsc2VcblxuICBvcHRpb25zLmZpbHRlciA9IG9wdGlvbnMuZmlsdGVyIHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWUgfVxuXG4gIC8vIFdhcm4gYWJvdXQgdXNpbmcgcHJlc2VydmVUaW1lc3RhbXBzIG9uIDMyLWJpdCBub2RlOlxuICBpZiAob3B0aW9ucy5wcmVzZXJ2ZVRpbWVzdGFtcHMgJiYgcHJvY2Vzcy5hcmNoID09PSAnaWEzMicpIHtcbiAgICBjb25zb2xlLndhcm4oYGZzLWV4dHJhOiBVc2luZyB0aGUgcHJlc2VydmVUaW1lc3RhbXBzIG9wdGlvbiBpbiAzMi1iaXQgbm9kZSBpcyBub3QgcmVjb21tZW5kZWQ7XFxuXG4gICAgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcHJpY2hhcmRzb24vbm9kZS1mcy1leHRyYS9pc3N1ZXMvMjY5YClcbiAgfVxuXG4gIGNvbnN0IHN0YXRzID0gKG9wdGlvbnMucmVjdXJzaXZlICYmICFvcHRpb25zLmRlcmVmZXJlbmNlKSA/IGZzLmxzdGF0U3luYyhzcmMpIDogZnMuc3RhdFN5bmMoc3JjKVxuICBjb25zdCBkZXN0Rm9sZGVyID0gcGF0aC5kaXJuYW1lKGRlc3QpXG4gIGNvbnN0IGRlc3RGb2xkZXJFeGlzdHMgPSBmcy5leGlzdHNTeW5jKGRlc3RGb2xkZXIpXG4gIGxldCBwZXJmb3JtQ29weSA9IGZhbHNlXG5cbiAgaWYgKG9wdGlvbnMuZmlsdGVyIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBmcy1leHRyYTogUGFzc2luZyBhIFJlZ0V4cCBmaWx0ZXIgaXMgZGVwcmVjYXRlZCwgdXNlIGEgZnVuY3Rpb24nKVxuICAgIHBlcmZvcm1Db3B5ID0gb3B0aW9ucy5maWx0ZXIudGVzdChzcmMpXG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSBwZXJmb3JtQ29weSA9IG9wdGlvbnMuZmlsdGVyKHNyYywgZGVzdClcblxuICBpZiAoc3RhdHMuaXNGaWxlKCkgJiYgcGVyZm9ybUNvcHkpIHtcbiAgICBpZiAoIWRlc3RGb2xkZXJFeGlzdHMpIG1rZGlyLm1rZGlyc1N5bmMoZGVzdEZvbGRlcilcbiAgICBjb3B5RmlsZVN5bmMoc3JjLCBkZXN0LCB7XG4gICAgICBvdmVyd3JpdGU6IG9wdGlvbnMub3ZlcndyaXRlLFxuICAgICAgZXJyb3JPbkV4aXN0OiBvcHRpb25zLmVycm9yT25FeGlzdCxcbiAgICAgIHByZXNlcnZlVGltZXN0YW1wczogb3B0aW9ucy5wcmVzZXJ2ZVRpbWVzdGFtcHNcbiAgICB9KVxuICB9IGVsc2UgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkgJiYgcGVyZm9ybUNvcHkpIHtcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGVzdCkpIG1rZGlyLm1rZGlyc1N5bmMoZGVzdClcbiAgICBjb25zdCBjb250ZW50cyA9IGZzLnJlYWRkaXJTeW5jKHNyYylcbiAgICBjb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4ge1xuICAgICAgY29uc3Qgb3B0cyA9IG9wdGlvbnNcbiAgICAgIG9wdHMucmVjdXJzaXZlID0gdHJ1ZVxuICAgICAgY29weVN5bmMocGF0aC5qb2luKHNyYywgY29udGVudCksIHBhdGguam9pbihkZXN0LCBjb250ZW50KSwgb3B0cylcbiAgICB9KVxuICB9IGVsc2UgaWYgKG9wdGlvbnMucmVjdXJzaXZlICYmIHN0YXRzLmlzU3ltYm9saWNMaW5rKCkgJiYgcGVyZm9ybUNvcHkpIHtcbiAgICBjb25zdCBzcmNQYXRoID0gZnMucmVhZGxpbmtTeW5jKHNyYylcbiAgICBmcy5zeW1saW5rU3luYyhzcmNQYXRoLCBkZXN0KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVN5bmNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvY29weS1zeW5jL2NvcHktc3luYy5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgbmNwID0gcmVxdWlyZSgnLi9uY3AnKVxuY29uc3QgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuXG5mdW5jdGlvbiBjb3B5IChzcmMsIGRlc3QsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyAmJiAhY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyB8fCBvcHRpb25zIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgb3B0aW9ucyA9IHtmaWx0ZXI6IG9wdGlvbnN9XG4gIH1cbiAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIC8vIFdhcm4gYWJvdXQgdXNpbmcgcHJlc2VydmVUaW1lc3RhbXBzIG9uIDMyLWJpdCBub2RlOlxuICBpZiAob3B0aW9ucy5wcmVzZXJ2ZVRpbWVzdGFtcHMgJiYgcHJvY2Vzcy5hcmNoID09PSAnaWEzMicpIHtcbiAgICBjb25zb2xlLndhcm4oYGZzLWV4dHJhOiBVc2luZyB0aGUgcHJlc2VydmVUaW1lc3RhbXBzIG9wdGlvbiBpbiAzMi1iaXQgbm9kZSBpcyBub3QgcmVjb21tZW5kZWQ7XFxuXG4gICAgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcHJpY2hhcmRzb24vbm9kZS1mcy1leHRyYS9pc3N1ZXMvMjY5YClcbiAgfVxuXG4gIC8vIGRvbid0IGFsbG93IHNyYyBhbmQgZGVzdCB0byBiZSB0aGUgc2FtZVxuICBjb25zdCBiYXNlUGF0aCA9IHByb2Nlc3MuY3dkKClcbiAgY29uc3QgY3VycmVudFBhdGggPSBwYXRoLnJlc29sdmUoYmFzZVBhdGgsIHNyYylcbiAgY29uc3QgdGFyZ2V0UGF0aCA9IHBhdGgucmVzb2x2ZShiYXNlUGF0aCwgZGVzdClcbiAgaWYgKGN1cnJlbnRQYXRoID09PSB0YXJnZXRQYXRoKSByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKCdTb3VyY2UgYW5kIGRlc3RpbmF0aW9uIG11c3Qgbm90IGJlIHRoZSBzYW1lLicpKVxuXG4gIGZzLmxzdGF0KHNyYywgKGVyciwgc3RhdHMpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuXG4gICAgbGV0IGRpciA9IG51bGxcbiAgICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgY29uc3QgcGFydHMgPSBkZXN0LnNwbGl0KHBhdGguc2VwKVxuICAgICAgcGFydHMucG9wKClcbiAgICAgIGRpciA9IHBhcnRzLmpvaW4ocGF0aC5zZXApXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpciA9IHBhdGguZGlybmFtZShkZXN0KVxuICAgIH1cblxuICAgIGZzLmV4aXN0cyhkaXIsIGRpckV4aXN0cyA9PiB7XG4gICAgICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gbmNwKHNyYywgZGVzdCwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICBta2Rpci5ta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBuY3Aoc3JjLCBkZXN0LCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3B5XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2NvcHkvY29weS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvcHk6IHJlcXVpcmUoJy4vY29weScpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2NvcHkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IHJlbW92ZSA9IHJlcXVpcmUoJy4uL3JlbW92ZScpXG5cbmZ1bmN0aW9uIGVtcHR5RGlyIChkaXIsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge31cbiAgZnMucmVhZGRpcihkaXIsIChlcnIsIGl0ZW1zKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIG1rZGlyLm1rZGlycyhkaXIsIGNhbGxiYWNrKVxuXG4gICAgaXRlbXMgPSBpdGVtcy5tYXAoaXRlbSA9PiBwYXRoLmpvaW4oZGlyLCBpdGVtKSlcblxuICAgIGRlbGV0ZUl0ZW0oKVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlSXRlbSAoKSB7XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXMucG9wKClcbiAgICAgIGlmICghaXRlbSkgcmV0dXJuIGNhbGxiYWNrKClcbiAgICAgIHJlbW92ZS5yZW1vdmUoaXRlbSwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgZGVsZXRlSXRlbSgpXG4gICAgICB9KVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gZW1wdHlEaXJTeW5jIChkaXIpIHtcbiAgbGV0IGl0ZW1zXG4gIHRyeSB7XG4gICAgaXRlbXMgPSBmcy5yZWFkZGlyU3luYyhkaXIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBta2Rpci5ta2RpcnNTeW5jKGRpcilcbiAgfVxuXG4gIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaXRlbSA9IHBhdGguam9pbihkaXIsIGl0ZW0pXG4gICAgcmVtb3ZlLnJlbW92ZVN5bmMoaXRlbSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVtcHR5RGlyU3luYyxcbiAgZW1wdHlkaXJTeW5jOiBlbXB0eURpclN5bmMsXG4gIGVtcHR5RGlyLFxuICBlbXB0eWRpcjogZW1wdHlEaXJcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvZW1wdHkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcblxuZnVuY3Rpb24gY3JlYXRlRmlsZSAoZmlsZSwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gbWFrZUZpbGUgKCkge1xuICAgIGZzLndyaXRlRmlsZShmaWxlLCAnJywgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfSlcbiAgfVxuXG4gIGZzLmV4aXN0cyhmaWxlLCBmaWxlRXhpc3RzID0+IHtcbiAgICBpZiAoZmlsZUV4aXN0cykgcmV0dXJuIGNhbGxiYWNrKClcbiAgICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSlcbiAgICBmcy5leGlzdHMoZGlyLCBkaXJFeGlzdHMgPT4ge1xuICAgICAgaWYgKGRpckV4aXN0cykgcmV0dXJuIG1ha2VGaWxlKClcbiAgICAgIG1rZGlyLm1rZGlycyhkaXIsIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIG1ha2VGaWxlKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmlsZVN5bmMgKGZpbGUpIHtcbiAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZSkpIHJldHVyblxuXG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuICBpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xuICAgIG1rZGlyLm1rZGlyc1N5bmMoZGlyKVxuICB9XG5cbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlLCAnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZUZpbGUsXG4gIGNyZWF0ZUZpbGVTeW5jLFxuICAvLyBhbGlhc1xuICBlbnN1cmVGaWxlOiBjcmVhdGVGaWxlLFxuICBlbnN1cmVGaWxlU3luYzogY3JlYXRlRmlsZVN5bmNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvZW5zdXJlL2ZpbGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmaWxlID0gcmVxdWlyZSgnLi9maWxlJylcbmNvbnN0IGxpbmsgPSByZXF1aXJlKCcuL2xpbmsnKVxuY29uc3Qgc3ltbGluayA9IHJlcXVpcmUoJy4vc3ltbGluaycpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBmaWxlXG4gIGNyZWF0ZUZpbGU6IGZpbGUuY3JlYXRlRmlsZSxcbiAgY3JlYXRlRmlsZVN5bmM6IGZpbGUuY3JlYXRlRmlsZVN5bmMsXG4gIGVuc3VyZUZpbGU6IGZpbGUuY3JlYXRlRmlsZSxcbiAgZW5zdXJlRmlsZVN5bmM6IGZpbGUuY3JlYXRlRmlsZVN5bmMsXG4gIC8vIGxpbmtcbiAgY3JlYXRlTGluazogbGluay5jcmVhdGVMaW5rLFxuICBjcmVhdGVMaW5rU3luYzogbGluay5jcmVhdGVMaW5rU3luYyxcbiAgZW5zdXJlTGluazogbGluay5jcmVhdGVMaW5rLFxuICBlbnN1cmVMaW5rU3luYzogbGluay5jcmVhdGVMaW5rU3luYyxcbiAgLy8gc3ltbGlua1xuICBjcmVhdGVTeW1saW5rOiBzeW1saW5rLmNyZWF0ZVN5bWxpbmssXG4gIGNyZWF0ZVN5bWxpbmtTeW5jOiBzeW1saW5rLmNyZWF0ZVN5bWxpbmtTeW5jLFxuICBlbnN1cmVTeW1saW5rOiBzeW1saW5rLmNyZWF0ZVN5bWxpbmssXG4gIGVuc3VyZVN5bWxpbmtTeW5jOiBzeW1saW5rLmNyZWF0ZVN5bWxpbmtTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rIChzcmNwYXRoLCBkc3RwYXRoLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBtYWtlTGluayAoc3JjcGF0aCwgZHN0cGF0aCkge1xuICAgIGZzLmxpbmsoc3JjcGF0aCwgZHN0cGF0aCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBjYWxsYmFjayhudWxsKVxuICAgIH0pXG4gIH1cblxuICBmcy5leGlzdHMoZHN0cGF0aCwgZGVzdGluYXRpb25FeGlzdHMgPT4ge1xuICAgIGlmIChkZXN0aW5hdGlvbkV4aXN0cykgcmV0dXJuIGNhbGxiYWNrKG51bGwpXG4gICAgZnMubHN0YXQoc3JjcGF0aCwgKGVyciwgc3RhdCkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlLnJlcGxhY2UoJ2xzdGF0JywgJ2Vuc3VyZUxpbmsnKVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgICAgIGZzLmV4aXN0cyhkaXIsIGRpckV4aXN0cyA9PiB7XG4gICAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBtYWtlTGluayhzcmNwYXRoLCBkc3RwYXRoKVxuICAgICAgICBta2Rpci5ta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgbWFrZUxpbmsoc3JjcGF0aCwgZHN0cGF0aClcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua1N5bmMgKHNyY3BhdGgsIGRzdHBhdGgsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGRlc3RpbmF0aW9uRXhpc3RzID0gZnMuZXhpc3RzU3luYyhkc3RwYXRoKVxuICBpZiAoZGVzdGluYXRpb25FeGlzdHMpIHJldHVybiB1bmRlZmluZWRcblxuICB0cnkge1xuICAgIGZzLmxzdGF0U3luYyhzcmNwYXRoKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlLnJlcGxhY2UoJ2xzdGF0JywgJ2Vuc3VyZUxpbmsnKVxuICAgIHRocm93IGVyclxuICB9XG5cbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gIGNvbnN0IGRpckV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZGlyKVxuICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gZnMubGlua1N5bmMoc3JjcGF0aCwgZHN0cGF0aClcbiAgbWtkaXIubWtkaXJzU3luYyhkaXIpXG5cbiAgcmV0dXJuIGZzLmxpbmtTeW5jKHNyY3BhdGgsIGRzdHBhdGgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVMaW5rLFxuICBjcmVhdGVMaW5rU3luYyxcbiAgLy8gYWxpYXNcbiAgZW5zdXJlTGluazogY3JlYXRlTGluayxcbiAgZW5zdXJlTGlua1N5bmM6IGNyZWF0ZUxpbmtTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9saW5rLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIHR3byB0eXBlcyBvZiBwYXRocywgb25lIHJlbGF0aXZlIHRvIHN5bWxpbmssIGFuZCBvbmVcbiAqIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LiBDaGVja3MgaWYgcGF0aCBpcyBhYnNvbHV0ZSBvclxuICogcmVsYXRpdmUuIElmIHRoZSBwYXRoIGlzIHJlbGF0aXZlLCB0aGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGUgcGF0aCBpc1xuICogcmVsYXRpdmUgdG8gc3ltbGluayBvciByZWxhdGl2ZSB0byBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LiBUaGlzIGlzIGFuXG4gKiBpbml0aWF0aXZlIHRvIGZpbmQgYSBzbWFydGVyIGBzcmNwYXRoYCB0byBzdXBwbHkgd2hlbiBidWlsZGluZyBzeW1saW5rcy5cbiAqIFRoaXMgYWxsb3dzIHlvdSB0byBkZXRlcm1pbmUgd2hpY2ggcGF0aCB0byB1c2Ugb3V0IG9mIG9uZSBvZiB0aHJlZSBwb3NzaWJsZVxuICogdHlwZXMgb2Ygc291cmNlIHBhdGhzLiBUaGUgZmlyc3QgaXMgYW4gYWJzb2x1dGUgcGF0aC4gVGhpcyBpcyBkZXRlY3RlZCBieVxuICogYHBhdGguaXNBYnNvbHV0ZSgpYC4gV2hlbiBhbiBhYnNvbHV0ZSBwYXRoIGlzIHByb3ZpZGVkLCBpdCBpcyBjaGVja2VkIHRvXG4gKiBzZWUgaWYgaXQgZXhpc3RzLiBJZiBpdCBkb2VzIGl0J3MgdXNlZCwgaWYgbm90IGFuIGVycm9yIGlzIHJldHVybmVkXG4gKiAoY2FsbGJhY2spLyB0aHJvd24gKHN5bmMpLiBUaGUgb3RoZXIgdHdvIG9wdGlvbnMgZm9yIGBzcmNwYXRoYCBhcmUgYVxuICogcmVsYXRpdmUgdXJsLiBCeSBkZWZhdWx0IE5vZGUncyBgZnMuc3ltbGlua2Agd29ya3MgYnkgY3JlYXRpbmcgYSBzeW1saW5rXG4gKiB1c2luZyBgZHN0cGF0aGAgYW5kIGV4cGVjdHMgdGhlIGBzcmNwYXRoYCB0byBiZSByZWxhdGl2ZSB0byB0aGUgbmV3bHlcbiAqIGNyZWF0ZWQgc3ltbGluay4gSWYgeW91IHByb3ZpZGUgYSBgc3JjcGF0aGAgdGhhdCBkb2VzIG5vdCBleGlzdCBvbiB0aGUgZmlsZVxuICogc3lzdGVtIGl0IHJlc3VsdHMgaW4gYSBicm9rZW4gc3ltbGluay4gVG8gbWluaW1pemUgdGhpcywgdGhlIGZ1bmN0aW9uXG4gKiBjaGVja3MgdG8gc2VlIGlmIHRoZSAncmVsYXRpdmUgdG8gc3ltbGluaycgc291cmNlIGZpbGUgZXhpc3RzLCBhbmQgaWYgaXRcbiAqIGRvZXMgaXQgd2lsbCB1c2UgaXQuIElmIGl0IGRvZXMgbm90LCBpdCBjaGVja3MgaWYgdGhlcmUncyBhIGZpbGUgdGhhdFxuICogZXhpc3RzIHRoYXQgaXMgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgd29ya2luZyBkaXJlY3RvcnksIGlmIGRvZXMgaXRzIHVzZWQuXG4gKiBUaGlzIHByZXNlcnZlcyB0aGUgZXhwZWN0YXRpb25zIG9mIHRoZSBvcmlnaW5hbCBmcy5zeW1saW5rIHNwZWMgYW5kIGFkZHNcbiAqIHRoZSBhYmlsaXR5IHRvIHBhc3MgaW4gYHJlbGF0aXZlIHRvIGN1cnJlbnQgd29ya2luZyBkaXJlY290cnlgIHBhdGhzLlxuICovXG5cbmZ1bmN0aW9uIHN5bWxpbmtQYXRocyAoc3JjcGF0aCwgZHN0cGF0aCwgY2FsbGJhY2spIHtcbiAgaWYgKHBhdGguaXNBYnNvbHV0ZShzcmNwYXRoKSkge1xuICAgIHJldHVybiBmcy5sc3RhdChzcmNwYXRoLCAoZXJyLCBzdGF0KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGVyci5tZXNzYWdlID0gZXJyLm1lc3NhZ2UucmVwbGFjZSgnbHN0YXQnLCAnZW5zdXJlU3ltbGluaycpXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICB9XG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwge1xuICAgICAgICAndG9Dd2QnOiBzcmNwYXRoLFxuICAgICAgICAndG9Ec3QnOiBzcmNwYXRoXG4gICAgICB9KVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZHN0ZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gICAgY29uc3QgcmVsYXRpdmVUb0RzdCA9IHBhdGguam9pbihkc3RkaXIsIHNyY3BhdGgpXG4gICAgcmV0dXJuIGZzLmV4aXN0cyhyZWxhdGl2ZVRvRHN0LCBleGlzdHMgPT4ge1xuICAgICAgaWYgKGV4aXN0cykge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwge1xuICAgICAgICAgICd0b0N3ZCc6IHJlbGF0aXZlVG9Ec3QsXG4gICAgICAgICAgJ3RvRHN0Jzogc3JjcGF0aFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZzLmxzdGF0KHNyY3BhdGgsIChlcnIsIHN0YXQpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlLnJlcGxhY2UoJ2xzdGF0JywgJ2Vuc3VyZVN5bWxpbmsnKVxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgICAgICd0b0N3ZCc6IHNyY3BhdGgsXG4gICAgICAgICAgICAndG9Ec3QnOiBwYXRoLnJlbGF0aXZlKGRzdGRpciwgc3JjcGF0aClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gc3ltbGlua1BhdGhzU3luYyAoc3JjcGF0aCwgZHN0cGF0aCkge1xuICBsZXQgZXhpc3RzXG4gIGlmIChwYXRoLmlzQWJzb2x1dGUoc3JjcGF0aCkpIHtcbiAgICBleGlzdHMgPSBmcy5leGlzdHNTeW5jKHNyY3BhdGgpXG4gICAgaWYgKCFleGlzdHMpIHRocm93IG5ldyBFcnJvcignYWJzb2x1dGUgc3JjcGF0aCBkb2VzIG5vdCBleGlzdCcpXG4gICAgcmV0dXJuIHtcbiAgICAgICd0b0N3ZCc6IHNyY3BhdGgsXG4gICAgICAndG9Ec3QnOiBzcmNwYXRoXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRzdGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICAgIGNvbnN0IHJlbGF0aXZlVG9Ec3QgPSBwYXRoLmpvaW4oZHN0ZGlyLCBzcmNwYXRoKVxuICAgIGV4aXN0cyA9IGZzLmV4aXN0c1N5bmMocmVsYXRpdmVUb0RzdClcbiAgICBpZiAoZXhpc3RzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAndG9Dd2QnOiByZWxhdGl2ZVRvRHN0LFxuICAgICAgICAndG9Ec3QnOiBzcmNwYXRoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoc3JjcGF0aClcbiAgICAgIGlmICghZXhpc3RzKSB0aHJvdyBuZXcgRXJyb3IoJ3JlbGF0aXZlIHNyY3BhdGggZG9lcyBub3QgZXhpc3QnKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3RvQ3dkJzogc3JjcGF0aCxcbiAgICAgICAgJ3RvRHN0JzogcGF0aC5yZWxhdGl2ZShkc3RkaXIsIHNyY3BhdGgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzeW1saW5rUGF0aHMsXG4gIHN5bWxpbmtQYXRoc1N5bmNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvZW5zdXJlL3N5bWxpbmstcGF0aHMuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcblxuZnVuY3Rpb24gc3ltbGlua1R5cGUgKHNyY3BhdGgsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrID0gKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSA/IHR5cGUgOiBjYWxsYmFja1xuICB0eXBlID0gKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSA/IGZhbHNlIDogdHlwZVxuICBpZiAodHlwZSkgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHR5cGUpXG4gIGZzLmxzdGF0KHNyY3BhdGgsIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKG51bGwsICdmaWxlJylcbiAgICB0eXBlID0gKHN0YXRzICYmIHN0YXRzLmlzRGlyZWN0b3J5KCkpID8gJ2RpcicgOiAnZmlsZSdcbiAgICBjYWxsYmFjayhudWxsLCB0eXBlKVxuICB9KVxufVxuXG5mdW5jdGlvbiBzeW1saW5rVHlwZVN5bmMgKHNyY3BhdGgsIHR5cGUpIHtcbiAgbGV0IHN0YXRzXG5cbiAgaWYgKHR5cGUpIHJldHVybiB0eXBlXG4gIHRyeSB7XG4gICAgc3RhdHMgPSBmcy5sc3RhdFN5bmMoc3JjcGF0aClcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAnZmlsZSdcbiAgfVxuICByZXR1cm4gKHN0YXRzICYmIHN0YXRzLmlzRGlyZWN0b3J5KCkpID8gJ2RpcicgOiAnZmlsZSdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHN5bWxpbmtUeXBlLFxuICBzeW1saW5rVHlwZVN5bmNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvZW5zdXJlL3N5bWxpbmstdHlwZS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgX21rZGlycyA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5jb25zdCBta2RpcnMgPSBfbWtkaXJzLm1rZGlyc1xuY29uc3QgbWtkaXJzU3luYyA9IF9ta2RpcnMubWtkaXJzU3luY1xuXG5jb25zdCBfc3ltbGlua1BhdGhzID0gcmVxdWlyZSgnLi9zeW1saW5rLXBhdGhzJylcbmNvbnN0IHN5bWxpbmtQYXRocyA9IF9zeW1saW5rUGF0aHMuc3ltbGlua1BhdGhzXG5jb25zdCBzeW1saW5rUGF0aHNTeW5jID0gX3N5bWxpbmtQYXRocy5zeW1saW5rUGF0aHNTeW5jXG5cbmNvbnN0IF9zeW1saW5rVHlwZSA9IHJlcXVpcmUoJy4vc3ltbGluay10eXBlJylcbmNvbnN0IHN5bWxpbmtUeXBlID0gX3N5bWxpbmtUeXBlLnN5bWxpbmtUeXBlXG5jb25zdCBzeW1saW5rVHlwZVN5bmMgPSBfc3ltbGlua1R5cGUuc3ltbGlua1R5cGVTeW5jXG5cbmZ1bmN0aW9uIGNyZWF0ZVN5bWxpbmsgKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrID0gKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSA/IHR5cGUgOiBjYWxsYmFja1xuICB0eXBlID0gKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSA/IGZhbHNlIDogdHlwZVxuXG4gIGZzLmV4aXN0cyhkc3RwYXRoLCBkZXN0aW5hdGlvbkV4aXN0cyA9PiB7XG4gICAgaWYgKGRlc3RpbmF0aW9uRXhpc3RzKSByZXR1cm4gY2FsbGJhY2sobnVsbClcbiAgICBzeW1saW5rUGF0aHMoc3JjcGF0aCwgZHN0cGF0aCwgKGVyciwgcmVsYXRpdmUpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBzcmNwYXRoID0gcmVsYXRpdmUudG9Ec3RcbiAgICAgIHN5bWxpbmtUeXBlKHJlbGF0aXZlLnRvQ3dkLCB0eXBlLCAoZXJyLCB0eXBlKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICAgICAgICBmcy5leGlzdHMoZGlyLCBkaXJFeGlzdHMgPT4ge1xuICAgICAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBmcy5zeW1saW5rKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUsIGNhbGxiYWNrKVxuICAgICAgICAgIG1rZGlycyhkaXIsIGVyciA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgZnMuc3ltbGluayhzcmNwYXRoLCBkc3RwYXRoLCB0eXBlLCBjYWxsYmFjaylcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTeW1saW5rU3luYyAoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2sgPSAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpID8gdHlwZSA6IGNhbGxiYWNrXG4gIHR5cGUgPSAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpID8gZmFsc2UgOiB0eXBlXG5cbiAgY29uc3QgZGVzdGluYXRpb25FeGlzdHMgPSBmcy5leGlzdHNTeW5jKGRzdHBhdGgpXG4gIGlmIChkZXN0aW5hdGlvbkV4aXN0cykgcmV0dXJuIHVuZGVmaW5lZFxuXG4gIGNvbnN0IHJlbGF0aXZlID0gc3ltbGlua1BhdGhzU3luYyhzcmNwYXRoLCBkc3RwYXRoKVxuICBzcmNwYXRoID0gcmVsYXRpdmUudG9Ec3RcbiAgdHlwZSA9IHN5bWxpbmtUeXBlU3luYyhyZWxhdGl2ZS50b0N3ZCwgdHlwZSlcbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gIGNvbnN0IGV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZGlyKVxuICBpZiAoZXhpc3RzKSByZXR1cm4gZnMuc3ltbGlua1N5bmMoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSlcbiAgbWtkaXJzU3luYyhkaXIpXG4gIHJldHVybiBmcy5zeW1saW5rU3luYyhzcmNwYXRoLCBkc3RwYXRoLCB0eXBlKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlU3ltbGluayxcbiAgY3JlYXRlU3ltbGlua1N5bmMsXG4gIC8vIGFsaWFzXG4gIGVuc3VyZVN5bWxpbms6IGNyZWF0ZVN5bWxpbmssXG4gIGVuc3VyZVN5bWxpbmtTeW5jOiBjcmVhdGVTeW1saW5rU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4vdXRpbC9hc3NpZ24nKVxuXG5jb25zdCBmc2UgPSB7fVxuY29uc3QgZ2ZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuXG4vLyBhdHRhY2ggZnMgbWV0aG9kcyB0byBmc2Vcbk9iamVjdC5rZXlzKGdmcykuZm9yRWFjaChrZXkgPT4ge1xuICBmc2Vba2V5XSA9IGdmc1trZXldXG59KVxuXG5jb25zdCBmcyA9IGZzZVxuXG5hc3NpZ24oZnMsIHJlcXVpcmUoJy4vY29weScpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL2NvcHktc3luYycpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL21rZGlycycpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL3JlbW92ZScpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL2pzb24nKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9tb3ZlJykpXG5hc3NpZ24oZnMsIHJlcXVpcmUoJy4vbW92ZS1zeW5jJykpXG5hc3NpZ24oZnMsIHJlcXVpcmUoJy4vZW1wdHknKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9lbnN1cmUnKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9vdXRwdXQnKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmc1xuXG4vLyBtYWludGFpbiBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBmb3IgYXdoaWxlXG5jb25zdCBqc29uZmlsZSA9IHt9XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoanNvbmZpbGUsICdzcGFjZXMnLCB7XG4gIGdldDogKCkgPT4gZnMuc3BhY2VzLCAvLyBmb3VuZCBpbiAuL2pzb25cbiAgc2V0OiB2YWwgPT4ge1xuICAgIGZzLnNwYWNlcyA9IHZhbFxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cy5qc29uZmlsZSA9IGpzb25maWxlIC8vIHNvIHVzZXJzIG9mIGZzLWV4dHJhIGNhbiBtb2RpZnkganNvbkZpbGUuc3BhY2VzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QganNvbkZpbGUgPSByZXF1aXJlKCcuL2pzb25maWxlJylcblxuanNvbkZpbGUub3V0cHV0SnNvblN5bmMgPSByZXF1aXJlKCcuL291dHB1dC1qc29uLXN5bmMnKVxuanNvbkZpbGUub3V0cHV0SnNvbiA9IHJlcXVpcmUoJy4vb3V0cHV0LWpzb24nKVxuLy8gYWxpYXNlc1xuanNvbkZpbGUub3V0cHV0SlNPTlN5bmMgPSByZXF1aXJlKCcuL291dHB1dC1qc29uLXN5bmMnKVxuanNvbkZpbGUub3V0cHV0SlNPTiA9IHJlcXVpcmUoJy4vb3V0cHV0LWpzb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGpzb25GaWxlXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2pzb24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGNvcHlTeW5jID0gcmVxdWlyZSgnLi4vY29weS1zeW5jJykuY29weVN5bmNcbmNvbnN0IHJlbW92ZVN5bmMgPSByZXF1aXJlKCcuLi9yZW1vdmUnKS5yZW1vdmVTeW5jXG5jb25zdCBta2RpcnBTeW5jID0gcmVxdWlyZSgnLi4vbWtkaXJzJykubWtkaXJzU3luY1xuXG5mdW5jdGlvbiBtb3ZlU3luYyAoc3JjLCBkZXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIGNvbnN0IG92ZXJ3cml0ZSA9IG9wdGlvbnMub3ZlcndyaXRlIHx8IG9wdGlvbnMuY2xvYmJlciB8fCBmYWxzZVxuXG4gIHNyYyA9IHBhdGgucmVzb2x2ZShzcmMpXG4gIGRlc3QgPSBwYXRoLnJlc29sdmUoZGVzdClcblxuICBpZiAoc3JjID09PSBkZXN0KSByZXR1cm5cblxuICBpZiAoaXNTcmNTdWJkaXIoc3JjLCBkZXN0KSkgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgbW92ZSAnJHtzcmN9JyBpbnRvIGl0c2VsZiAnJHtkZXN0fScuYClcblxuICBta2RpcnBTeW5jKHBhdGguZGlybmFtZShkZXN0KSlcbiAgdHJ5UmVuYW1lU3luYygpXG5cbiAgZnVuY3Rpb24gdHJ5UmVuYW1lU3luYyAoKSB7XG4gICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGZzLnJlbmFtZVN5bmMoc3JjLCBkZXN0KVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VOT1RFTVBUWScgfHwgZXJyLmNvZGUgPT09ICdFRVhJU1QnIHx8IGVyci5jb2RlID09PSAnRVBFUk0nKSB7XG4gICAgICAgICAgcmVtb3ZlU3luYyhkZXN0KVxuICAgICAgICAgIG9wdGlvbnMub3ZlcndyaXRlID0gZmFsc2UgLy8ganVzdCBvdmVyd3JpdGVlZCBpdCwgbm8gbmVlZCB0byBkbyBpdCBhZ2FpblxuICAgICAgICAgIHJldHVybiBtb3ZlU3luYyhzcmMsIGRlc3QsIG9wdGlvbnMpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFWERFVicpIHRocm93IGVyclxuICAgICAgICByZXR1cm4gbW92ZVN5bmNBY3Jvc3NEZXZpY2Uoc3JjLCBkZXN0LCBvdmVyd3JpdGUpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZzLmxpbmtTeW5jKHNyYywgZGVzdClcbiAgICAgICAgcmV0dXJuIGZzLnVubGlua1N5bmMoc3JjKVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VYREVWJyB8fCBlcnIuY29kZSA9PT0gJ0VJU0RJUicgfHwgZXJyLmNvZGUgPT09ICdFUEVSTScgfHwgZXJyLmNvZGUgPT09ICdFTk9UU1VQJykge1xuICAgICAgICAgIHJldHVybiBtb3ZlU3luY0Fjcm9zc0RldmljZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSlcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnJcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZVN5bmNBY3Jvc3NEZXZpY2UgKHNyYywgZGVzdCwgb3ZlcndyaXRlKSB7XG4gIGNvbnN0IHN0YXQgPSBmcy5zdGF0U3luYyhzcmMpXG5cbiAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgIHJldHVybiBtb3ZlRGlyU3luY0Fjcm9zc0RldmljZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbW92ZUZpbGVTeW5jQWNyb3NzRGV2aWNlKHNyYywgZGVzdCwgb3ZlcndyaXRlKVxuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVGaWxlU3luY0Fjcm9zc0RldmljZSAoc3JjLCBkZXN0LCBvdmVyd3JpdGUpIHtcbiAgY29uc3QgQlVGX0xFTkdUSCA9IDY0ICogMTAyNFxuICBjb25zdCBfYnVmZiA9IG5ldyBCdWZmZXIoQlVGX0xFTkdUSClcblxuICBjb25zdCBmbGFncyA9IG92ZXJ3cml0ZSA/ICd3JyA6ICd3eCdcblxuICBjb25zdCBmZHIgPSBmcy5vcGVuU3luYyhzcmMsICdyJylcbiAgY29uc3Qgc3RhdCA9IGZzLmZzdGF0U3luYyhmZHIpXG4gIGNvbnN0IGZkdyA9IGZzLm9wZW5TeW5jKGRlc3QsIGZsYWdzLCBzdGF0Lm1vZGUpXG4gIGxldCBieXRlc1JlYWQgPSAxXG4gIGxldCBwb3MgPSAwXG5cbiAgd2hpbGUgKGJ5dGVzUmVhZCA+IDApIHtcbiAgICBieXRlc1JlYWQgPSBmcy5yZWFkU3luYyhmZHIsIF9idWZmLCAwLCBCVUZfTEVOR1RILCBwb3MpXG4gICAgZnMud3JpdGVTeW5jKGZkdywgX2J1ZmYsIDAsIGJ5dGVzUmVhZClcbiAgICBwb3MgKz0gYnl0ZXNSZWFkXG4gIH1cblxuICBmcy5jbG9zZVN5bmMoZmRyKVxuICBmcy5jbG9zZVN5bmMoZmR3KVxuICByZXR1cm4gZnMudW5saW5rU3luYyhzcmMpXG59XG5cbmZ1bmN0aW9uIG1vdmVEaXJTeW5jQWNyb3NzRGV2aWNlIChzcmMsIGRlc3QsIG92ZXJ3cml0ZSkge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIG92ZXJ3cml0ZTogZmFsc2VcbiAgfVxuXG4gIGlmIChvdmVyd3JpdGUpIHtcbiAgICByZW1vdmVTeW5jKGRlc3QpXG4gICAgdHJ5Q29weVN5bmMoKVxuICB9IGVsc2Uge1xuICAgIHRyeUNvcHlTeW5jKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyeUNvcHlTeW5jICgpIHtcbiAgICBjb3B5U3luYyhzcmMsIGRlc3QsIG9wdGlvbnMpXG4gICAgcmV0dXJuIHJlbW92ZVN5bmMoc3JjKVxuICB9XG59XG5cbi8vIHJldHVybiB0cnVlIGlmIGRlc3QgaXMgYSBzdWJkaXIgb2Ygc3JjLCBvdGhlcndpc2UgZmFsc2UuXG4vLyBleHRyYWN0IGRlc3QgYmFzZSBkaXIgYW5kIGNoZWNrIGlmIHRoYXQgaXMgdGhlIHNhbWUgYXMgc3JjIGJhc2VuYW1lXG5mdW5jdGlvbiBpc1NyY1N1YmRpciAoc3JjLCBkZXN0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZzLnN0YXRTeW5jKHNyYykuaXNEaXJlY3RvcnkoKSAmJlxuICAgICAgICAgICBzcmMgIT09IGRlc3QgJiZcbiAgICAgICAgICAgZGVzdC5pbmRleE9mKHNyYykgPiAtMSAmJlxuICAgICAgICAgICBkZXN0LnNwbGl0KHBhdGguZGlybmFtZShzcmMpICsgcGF0aC5zZXApWzFdLnNwbGl0KHBhdGguc2VwKVswXSA9PT0gcGF0aC5iYXNlbmFtZShzcmMpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbW92ZVN5bmNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvbW92ZS1zeW5jL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuLy8gbW9zdCBvZiB0aGlzIGNvZGUgd2FzIHdyaXR0ZW4gYnkgQW5kcmV3IEtlbGxleVxuLy8gbGljZW5zZWQgdW5kZXIgdGhlIEJTRCBsaWNlbnNlOiBzZWVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmRyZXdyay9ub2RlLW12L2Jsb2IvbWFzdGVyL3BhY2thZ2UuanNvblxuXG4vLyB0aGlzIG5lZWRzIGEgY2xlYW51cFxuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IG5jcCA9IHJlcXVpcmUoJy4uL2NvcHkvbmNwJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IHJlbW92ZSA9IHJlcXVpcmUoJy4uL3JlbW92ZScpLnJlbW92ZVxuY29uc3QgbWtkaXJwID0gcmVxdWlyZSgnLi4vbWtkaXJzJykubWtkaXJzXG5cbmZ1bmN0aW9uIG1vdmUgKHNvdXJjZSwgZGVzdCwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICBjb25zdCBzaG91bGRNa2RpcnAgPSAoJ21rZGlycCcgaW4gb3B0aW9ucykgPyBvcHRpb25zLm1rZGlycCA6IHRydWVcbiAgY29uc3Qgb3ZlcndyaXRlID0gb3B0aW9ucy5vdmVyd3JpdGUgfHwgb3B0aW9ucy5jbG9iYmVyIHx8IGZhbHNlXG5cbiAgaWYgKHNob3VsZE1rZGlycCkge1xuICAgIG1rZGlycygpXG4gIH0gZWxzZSB7XG4gICAgZG9SZW5hbWUoKVxuICB9XG5cbiAgZnVuY3Rpb24gbWtkaXJzICgpIHtcbiAgICBta2RpcnAocGF0aC5kaXJuYW1lKGRlc3QpLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIGRvUmVuYW1lKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZG9SZW5hbWUgKCkge1xuICAgIGlmIChwYXRoLnJlc29sdmUoc291cmNlKSA9PT0gcGF0aC5yZXNvbHZlKGRlc3QpKSB7XG4gICAgICBzZXRJbW1lZGlhdGUoY2FsbGJhY2spXG4gICAgfSBlbHNlIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgIGZzLnJlbmFtZShzb3VyY2UsIGRlc3QsIGVyciA9PiB7XG4gICAgICAgIGlmICghZXJyKSByZXR1cm4gY2FsbGJhY2soKVxuXG4gICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VOT1RFTVBUWScgfHwgZXJyLmNvZGUgPT09ICdFRVhJU1QnKSB7XG4gICAgICAgICAgcmVtb3ZlKGRlc3QsIGVyciA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgb3B0aW9ucy5vdmVyd3JpdGUgPSBmYWxzZSAvLyBqdXN0IG92ZXJ3cml0ZWVkIGl0LCBubyBuZWVkIHRvIGRvIGl0IGFnYWluXG4gICAgICAgICAgICBtb3ZlKHNvdXJjZSwgZGVzdCwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHdlaXJkIFdpbmRvd3Mgc2hpdFxuICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFUEVSTScpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHJlbW92ZShkZXN0LCBlcnIgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgICBvcHRpb25zLm92ZXJ3cml0ZSA9IGZhbHNlXG4gICAgICAgICAgICAgIG1vdmUoc291cmNlLCBkZXN0LCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgMjAwKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVyci5jb2RlICE9PSAnRVhERVYnKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBtb3ZlQWNyb3NzRGV2aWNlKHNvdXJjZSwgZGVzdCwgb3ZlcndyaXRlLCBjYWxsYmFjaylcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGZzLmxpbmsoc291cmNlLCBkZXN0LCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRVhERVYnIHx8IGVyci5jb2RlID09PSAnRUlTRElSJyB8fCBlcnIuY29kZSA9PT0gJ0VQRVJNJyB8fCBlcnIuY29kZSA9PT0gJ0VOT1RTVVAnKSB7XG4gICAgICAgICAgICBtb3ZlQWNyb3NzRGV2aWNlKHNvdXJjZSwgZGVzdCwgb3ZlcndyaXRlLCBjYWxsYmFjaylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZnMudW5saW5rKHNvdXJjZSwgY2FsbGJhY2spXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlQWNyb3NzRGV2aWNlIChzb3VyY2UsIGRlc3QsIG92ZXJ3cml0ZSwgY2FsbGJhY2spIHtcbiAgZnMuc3RhdChzb3VyY2UsIChlcnIsIHN0YXQpID0+IHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjYWxsYmFjayhlcnIpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICBtb3ZlRGlyQWNyb3NzRGV2aWNlKHNvdXJjZSwgZGVzdCwgb3ZlcndyaXRlLCBjYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgbW92ZUZpbGVBY3Jvc3NEZXZpY2Uoc291cmNlLCBkZXN0LCBvdmVyd3JpdGUsIGNhbGxiYWNrKVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gbW92ZUZpbGVBY3Jvc3NEZXZpY2UgKHNvdXJjZSwgZGVzdCwgb3ZlcndyaXRlLCBjYWxsYmFjaykge1xuICBjb25zdCBmbGFncyA9IG92ZXJ3cml0ZSA/ICd3JyA6ICd3eCdcbiAgY29uc3QgaW5zID0gZnMuY3JlYXRlUmVhZFN0cmVhbShzb3VyY2UpXG4gIGNvbnN0IG91dHMgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0LCB7IGZsYWdzIH0pXG5cbiAgaW5zLm9uKCdlcnJvcicsIGVyciA9PiB7XG4gICAgaW5zLmRlc3Ryb3koKVxuICAgIG91dHMuZGVzdHJveSgpXG4gICAgb3V0cy5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbkNsb3NlKVxuXG4gICAgLy8gbWF5IHdhbnQgdG8gY3JlYXRlIGEgZGlyZWN0b3J5IGJ1dCBgb3V0YCBsaW5lIGFib3ZlXG4gICAgLy8gY3JlYXRlcyBhbiBlbXB0eSBmaWxlIGZvciB1czogU2VlICMxMDhcbiAgICAvLyBkb24ndCBjYXJlIGFib3V0IGVycm9yIGhlcmVcbiAgICBmcy51bmxpbmsoZGVzdCwgKCkgPT4ge1xuICAgICAgLy8gbm90ZTogYGVycmAgaGVyZSBpcyBmcm9tIHRoZSBpbnB1dCBzdHJlYW0gZXJycm9yXG4gICAgICBpZiAoZXJyLmNvZGUgPT09ICdFSVNESVInIHx8IGVyci5jb2RlID09PSAnRVBFUk0nKSB7XG4gICAgICAgIG1vdmVEaXJBY3Jvc3NEZXZpY2Uoc291cmNlLCBkZXN0LCBvdmVyd3JpdGUsIGNhbGxiYWNrKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG5cbiAgb3V0cy5vbignZXJyb3InLCBlcnIgPT4ge1xuICAgIGlucy5kZXN0cm95KClcbiAgICBvdXRzLmRlc3Ryb3koKVxuICAgIG91dHMucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25DbG9zZSlcbiAgICBjYWxsYmFjayhlcnIpXG4gIH0pXG5cbiAgb3V0cy5vbmNlKCdjbG9zZScsIG9uQ2xvc2UpXG4gIGlucy5waXBlKG91dHMpXG5cbiAgZnVuY3Rpb24gb25DbG9zZSAoKSB7XG4gICAgZnMudW5saW5rKHNvdXJjZSwgY2FsbGJhY2spXG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZURpckFjcm9zc0RldmljZSAoc291cmNlLCBkZXN0LCBvdmVyd3JpdGUsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgb3ZlcndyaXRlOiBmYWxzZVxuICB9XG5cbiAgaWYgKG92ZXJ3cml0ZSkge1xuICAgIHJlbW92ZShkZXN0LCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIHN0YXJ0TmNwKClcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIHN0YXJ0TmNwKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0TmNwICgpIHtcbiAgICBuY3Aoc291cmNlLCBkZXN0LCBvcHRpb25zLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIHJlbW92ZShzb3VyY2UsIGNhbGxiYWNrKVxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vdmVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvbW92ZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuXG5mdW5jdGlvbiBvdXRwdXRGaWxlIChmaWxlLCBkYXRhLCBlbmNvZGluZywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gZW5jb2RpbmdcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG4gIGZzLmV4aXN0cyhkaXIsIGl0RG9lcyA9PiB7XG4gICAgaWYgKGl0RG9lcykgcmV0dXJuIGZzLndyaXRlRmlsZShmaWxlLCBkYXRhLCBlbmNvZGluZywgY2FsbGJhY2spXG5cbiAgICBta2Rpci5ta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcblxuICAgICAgZnMud3JpdGVGaWxlKGZpbGUsIGRhdGEsIGVuY29kaW5nLCBjYWxsYmFjaylcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBvdXRwdXRGaWxlU3luYyAoZmlsZSwgZGF0YSwgZW5jb2RpbmcpIHtcbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG4gIGlmIChmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICByZXR1cm4gZnMud3JpdGVGaWxlU3luYy5hcHBseShmcywgYXJndW1lbnRzKVxuICB9XG4gIG1rZGlyLm1rZGlyc1N5bmMoZGlyKVxuICBmcy53cml0ZUZpbGVTeW5jLmFwcGx5KGZzLCBhcmd1bWVudHMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvdXRwdXRGaWxlLFxuICBvdXRwdXRGaWxlU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9vdXRwdXQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbmNvbnN0IGlzV2luZG93cyA9IChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKVxuXG5mdW5jdGlvbiBkZWZhdWx0cyAob3B0aW9ucykge1xuICBjb25zdCBtZXRob2RzID0gW1xuICAgICd1bmxpbmsnLFxuICAgICdjaG1vZCcsXG4gICAgJ3N0YXQnLFxuICAgICdsc3RhdCcsXG4gICAgJ3JtZGlyJyxcbiAgICAncmVhZGRpcidcbiAgXVxuICBtZXRob2RzLmZvckVhY2gobSA9PiB7XG4gICAgb3B0aW9uc1ttXSA9IG9wdGlvbnNbbV0gfHwgZnNbbV1cbiAgICBtID0gbSArICdTeW5jJ1xuICAgIG9wdGlvbnNbbV0gPSBvcHRpb25zW21dIHx8IGZzW21dXG4gIH0pXG5cbiAgb3B0aW9ucy5tYXhCdXN5VHJpZXMgPSBvcHRpb25zLm1heEJ1c3lUcmllcyB8fCAzXG59XG5cbmZ1bmN0aW9uIHJpbXJhZiAocCwgb3B0aW9ucywgY2IpIHtcbiAgbGV0IGJ1c3lUcmllcyA9IDBcblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIGFzc2VydChwLCAncmltcmFmOiBtaXNzaW5nIHBhdGgnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHAsICdzdHJpbmcnLCAncmltcmFmOiBwYXRoIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdyaW1yYWY6IGNhbGxiYWNrIGZ1bmN0aW9uIHJlcXVpcmVkJylcbiAgYXNzZXJ0KG9wdGlvbnMsICdyaW1yYWY6IGludmFsaWQgb3B0aW9ucyBhcmd1bWVudCBwcm92aWRlZCcpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0aW9ucywgJ29iamVjdCcsICdyaW1yYWY6IG9wdGlvbnMgc2hvdWxkIGJlIG9iamVjdCcpXG5cbiAgZGVmYXVsdHMob3B0aW9ucylcblxuICByaW1yYWZfKHAsIG9wdGlvbnMsIGZ1bmN0aW9uIENCIChlcikge1xuICAgIGlmIChlcikge1xuICAgICAgaWYgKGlzV2luZG93cyAmJiAoZXIuY29kZSA9PT0gJ0VCVVNZJyB8fCBlci5jb2RlID09PSAnRU5PVEVNUFRZJyB8fCBlci5jb2RlID09PSAnRVBFUk0nKSAmJlxuICAgICAgICAgIGJ1c3lUcmllcyA8IG9wdGlvbnMubWF4QnVzeVRyaWVzKSB7XG4gICAgICAgIGJ1c3lUcmllcysrXG4gICAgICAgIGxldCB0aW1lID0gYnVzeVRyaWVzICogMTAwXG4gICAgICAgIC8vIHRyeSBhZ2Fpbiwgd2l0aCB0aGUgc2FtZSBleGFjdCBjYWxsYmFjayBhcyB0aGlzIG9uZS5cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4gcmltcmFmXyhwLCBvcHRpb25zLCBDQiksIHRpbWUpXG4gICAgICB9XG5cbiAgICAgIC8vIGFscmVhZHkgZ29uZVxuICAgICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSBlciA9IG51bGxcbiAgICB9XG5cbiAgICBjYihlcilcbiAgfSlcbn1cblxuLy8gVHdvIHBvc3NpYmxlIHN0cmF0ZWdpZXMuXG4vLyAxLiBBc3N1bWUgaXQncyBhIGZpbGUuICB1bmxpbmsgaXQsIHRoZW4gZG8gdGhlIGRpciBzdHVmZiBvbiBFUEVSTSBvciBFSVNESVJcbi8vIDIuIEFzc3VtZSBpdCdzIGEgZGlyZWN0b3J5LiAgcmVhZGRpciwgdGhlbiBkbyB0aGUgZmlsZSBzdHVmZiBvbiBFTk9URElSXG4vL1xuLy8gQm90aCByZXN1bHQgaW4gYW4gZXh0cmEgc3lzY2FsbCB3aGVuIHlvdSBndWVzcyB3cm9uZy4gIEhvd2V2ZXIsIHRoZXJlXG4vLyBhcmUgbGlrZWx5IGZhciBtb3JlIG5vcm1hbCBmaWxlcyBpbiB0aGUgd29ybGQgdGhhbiBkaXJlY3Rvcmllcy4gIFRoaXNcbi8vIGlzIGJhc2VkIG9uIHRoZSBhc3N1bXB0aW9uIHRoYXQgYSB0aGUgYXZlcmFnZSBudW1iZXIgb2YgZmlsZXMgcGVyXG4vLyBkaXJlY3RvcnkgaXMgPj0gMS5cbi8vXG4vLyBJZiBhbnlvbmUgZXZlciBjb21wbGFpbnMgYWJvdXQgdGhpcywgdGhlbiBJIGd1ZXNzIHRoZSBzdHJhdGVneSBjb3VsZFxuLy8gYmUgbWFkZSBjb25maWd1cmFibGUgc29tZWhvdy4gIEJ1dCB1bnRpbCB0aGVuLCBZQUdOSS5cbmZ1bmN0aW9uIHJpbXJhZl8gKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICAvLyBzdW5vcyBsZXRzIHRoZSByb290IHVzZXIgdW5saW5rIGRpcmVjdG9yaWVzLCB3aGljaCBpcy4uLiB3ZWlyZC5cbiAgLy8gc28gd2UgaGF2ZSB0byBsc3RhdCBoZXJlIGFuZCBtYWtlIHN1cmUgaXQncyBub3QgYSBkaXIuXG4gIG9wdGlvbnMubHN0YXQocCwgKGVyLCBzdCkgPT4ge1xuICAgIGlmIChlciAmJiBlci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgcmV0dXJuIGNiKG51bGwpXG4gICAgfVxuXG4gICAgLy8gV2luZG93cyBjYW4gRVBFUk0gb24gc3RhdC4gIExpZmUgaXMgc3VmZmVyaW5nLlxuICAgIGlmIChlciAmJiBlci5jb2RlID09PSAnRVBFUk0nICYmIGlzV2luZG93cykge1xuICAgICAgcmV0dXJuIGZpeFdpbkVQRVJNKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICB9XG5cbiAgICBpZiAoc3QgJiYgc3QuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgcmV0dXJuIHJtZGlyKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICB9XG5cbiAgICBvcHRpb25zLnVubGluayhwLCBlciA9PiB7XG4gICAgICBpZiAoZXIpIHtcbiAgICAgICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICAgICAgcmV0dXJuIGNiKG51bGwpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVyLmNvZGUgPT09ICdFUEVSTScpIHtcbiAgICAgICAgICByZXR1cm4gKGlzV2luZG93cylcbiAgICAgICAgICAgID8gZml4V2luRVBFUk0ocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICAgICAgOiBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVyLmNvZGUgPT09ICdFSVNESVInKSB7XG4gICAgICAgICAgcmV0dXJuIHJtZGlyKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNiKGVyKVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZpeFdpbkVQRVJNIChwLCBvcHRpb25zLCBlciwgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBhc3NlcnQodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICBpZiAoZXIpIHtcbiAgICBhc3NlcnQoZXIgaW5zdGFuY2VvZiBFcnJvcilcbiAgfVxuXG4gIG9wdGlvbnMuY2htb2QocCwgNjY2LCBlcjIgPT4ge1xuICAgIGlmIChlcjIpIHtcbiAgICAgIGNiKGVyMi5jb2RlID09PSAnRU5PRU5UJyA/IG51bGwgOiBlcilcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5zdGF0KHAsIChlcjMsIHN0YXRzKSA9PiB7XG4gICAgICAgIGlmIChlcjMpIHtcbiAgICAgICAgICBjYihlcjMuY29kZSA9PT0gJ0VOT0VOVCcgPyBudWxsIDogZXIpXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgIHJtZGlyKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLnVubGluayhwLCBjYilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGZpeFdpbkVQRVJNU3luYyAocCwgb3B0aW9ucywgZXIpIHtcbiAgbGV0IHN0YXRzXG5cbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAoZXIpIHtcbiAgICBhc3NlcnQoZXIgaW5zdGFuY2VvZiBFcnJvcilcbiAgfVxuXG4gIHRyeSB7XG4gICAgb3B0aW9ucy5jaG1vZFN5bmMocCwgNjY2KVxuICB9IGNhdGNoIChlcjIpIHtcbiAgICBpZiAoZXIyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gIH1cblxuICB0cnkge1xuICAgIHN0YXRzID0gb3B0aW9ucy5zdGF0U3luYyhwKVxuICB9IGNhdGNoIChlcjMpIHtcbiAgICBpZiAoZXIzLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xuICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBlcilcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zLnVubGlua1N5bmMocClcbiAgfVxufVxuXG5mdW5jdGlvbiBybWRpciAocCwgb3B0aW9ucywgb3JpZ2luYWxFciwgY2IpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAob3JpZ2luYWxFcikge1xuICAgIGFzc2VydChvcmlnaW5hbEVyIGluc3RhbmNlb2YgRXJyb3IpXG4gIH1cbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICAvLyB0cnkgdG8gcm1kaXIgZmlyc3QsIGFuZCBvbmx5IHJlYWRkaXIgb24gRU5PVEVNUFRZIG9yIEVFWElTVCAoU3VuT1MpXG4gIC8vIGlmIHdlIGd1ZXNzZWQgd3JvbmcsIGFuZCBpdCdzIG5vdCBhIGRpcmVjdG9yeSwgdGhlblxuICAvLyByYWlzZSB0aGUgb3JpZ2luYWwgZXJyb3IuXG4gIG9wdGlvbnMucm1kaXIocCwgZXIgPT4ge1xuICAgIGlmIChlciAmJiAoZXIuY29kZSA9PT0gJ0VOT1RFTVBUWScgfHwgZXIuY29kZSA9PT0gJ0VFWElTVCcgfHwgZXIuY29kZSA9PT0gJ0VQRVJNJykpIHtcbiAgICAgIHJta2lkcyhwLCBvcHRpb25zLCBjYilcbiAgICB9IGVsc2UgaWYgKGVyICYmIGVyLmNvZGUgPT09ICdFTk9URElSJykge1xuICAgICAgY2Iob3JpZ2luYWxFcilcbiAgICB9IGVsc2Uge1xuICAgICAgY2IoZXIpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBybWtpZHMgKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcblxuICBvcHRpb25zLnJlYWRkaXIocCwgKGVyLCBmaWxlcykgPT4ge1xuICAgIGlmIChlcikgcmV0dXJuIGNiKGVyKVxuXG4gICAgbGV0IG4gPSBmaWxlcy5sZW5ndGhcbiAgICBsZXQgZXJyU3RhdGVcblxuICAgIGlmIChuID09PSAwKSByZXR1cm4gb3B0aW9ucy5ybWRpcihwLCBjYilcblxuICAgIGZpbGVzLmZvckVhY2goZiA9PiB7XG4gICAgICByaW1yYWYocGF0aC5qb2luKHAsIGYpLCBvcHRpb25zLCBlciA9PiB7XG4gICAgICAgIGlmIChlcnJTdGF0ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChlcikgcmV0dXJuIGNiKGVyclN0YXRlID0gZXIpXG4gICAgICAgIGlmICgtLW4gPT09IDApIHtcbiAgICAgICAgICBvcHRpb25zLnJtZGlyKHAsIGNiKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbi8vIHRoaXMgbG9va3Mgc2ltcGxlciwgYW5kIGlzIHN0cmljdGx5ICpmYXN0ZXIqLCBidXQgd2lsbFxuLy8gdGllIHVwIHRoZSBKYXZhU2NyaXB0IHRocmVhZCBhbmQgZmFpbCBvbiBleGNlc3NpdmVseVxuLy8gZGVlcCBkaXJlY3RvcnkgdHJlZXMuXG5mdW5jdGlvbiByaW1yYWZTeW5jIChwLCBvcHRpb25zKSB7XG4gIGxldCBzdFxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIGRlZmF1bHRzKG9wdGlvbnMpXG5cbiAgYXNzZXJ0KHAsICdyaW1yYWY6IG1pc3NpbmcgcGF0aCcpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgcCwgJ3N0cmluZycsICdyaW1yYWY6IHBhdGggc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0KG9wdGlvbnMsICdyaW1yYWY6IG1pc3Npbmcgb3B0aW9ucycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0aW9ucywgJ29iamVjdCcsICdyaW1yYWY6IG9wdGlvbnMgc2hvdWxkIGJlIG9iamVjdCcpXG5cbiAgdHJ5IHtcbiAgICBzdCA9IG9wdGlvbnMubHN0YXRTeW5jKHApXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBXaW5kb3dzIGNhbiBFUEVSTSBvbiBzdGF0LiAgTGlmZSBpcyBzdWZmZXJpbmcuXG4gICAgaWYgKGVyLmNvZGUgPT09ICdFUEVSTScgJiYgaXNXaW5kb3dzKSB7XG4gICAgICBmaXhXaW5FUEVSTVN5bmMocCwgb3B0aW9ucywgZXIpXG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBzdW5vcyBsZXRzIHRoZSByb290IHVzZXIgdW5saW5rIGRpcmVjdG9yaWVzLCB3aGljaCBpcy4uLiB3ZWlyZC5cbiAgICBpZiAoc3QgJiYgc3QuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgcm1kaXJTeW5jKHAsIG9wdGlvbnMsIG51bGwpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMudW5saW5rU3luYyhwKVxuICAgIH1cbiAgfSBjYXRjaCAoZXIpIHtcbiAgICBpZiAoZXIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAoZXIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgcmV0dXJuIGlzV2luZG93cyA/IGZpeFdpbkVQRVJNU3luYyhwLCBvcHRpb25zLCBlcikgOiBybWRpclN5bmMocCwgb3B0aW9ucywgZXIpXG4gICAgfSBlbHNlIGlmIChlci5jb2RlICE9PSAnRUlTRElSJykge1xuICAgICAgdGhyb3cgZXJcbiAgICB9XG4gICAgcm1kaXJTeW5jKHAsIG9wdGlvbnMsIGVyKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJtZGlyU3luYyAocCwgb3B0aW9ucywgb3JpZ2luYWxFcikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGlmIChvcmlnaW5hbEVyKSB7XG4gICAgYXNzZXJ0KG9yaWdpbmFsRXIgaW5zdGFuY2VvZiBFcnJvcilcbiAgfVxuXG4gIHRyeSB7XG4gICAgb3B0aW9ucy5ybWRpclN5bmMocClcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICBpZiAoZXIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAoZXIuY29kZSA9PT0gJ0VOT1RESVInKSB7XG4gICAgICB0aHJvdyBvcmlnaW5hbEVyXG4gICAgfSBlbHNlIGlmIChlci5jb2RlID09PSAnRU5PVEVNUFRZJyB8fCBlci5jb2RlID09PSAnRUVYSVNUJyB8fCBlci5jb2RlID09PSAnRVBFUk0nKSB7XG4gICAgICBybWtpZHNTeW5jKHAsIG9wdGlvbnMpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJta2lkc1N5bmMgKHAsIG9wdGlvbnMpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBvcHRpb25zLnJlYWRkaXJTeW5jKHApLmZvckVhY2goZiA9PiByaW1yYWZTeW5jKHBhdGguam9pbihwLCBmKSwgb3B0aW9ucykpXG4gIG9wdGlvbnMucm1kaXJTeW5jKHAsIG9wdGlvbnMpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmltcmFmXG5yaW1yYWYuc3luYyA9IHJpbXJhZlN5bmNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvcmVtb3ZlL3JpbXJhZi5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbi8vIHNpbXBsZSBtdXRhYmxlIGFzc2lnblxuZnVuY3Rpb24gYXNzaWduICgpIHtcbiAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5maWx0ZXIoaSA9PiBpKVxuICBjb25zdCBkZXN0ID0gYXJncy5zaGlmdCgpXG4gIGFyZ3MuZm9yRWFjaChzcmMgPT4ge1xuICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZGVzdFtrZXldID0gc3JjW2tleV1cbiAgICB9KVxuICB9KVxuXG4gIHJldHVybiBkZXN0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL3V0aWwvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuLy8gSEZTLCBleHR7MiwzfSwgRkFUIGRvIG5vdCwgTm9kZS5qcyB2MC4xMCBkb2VzIG5vdFxuZnVuY3Rpb24gaGFzTWlsbGlzUmVzU3luYyAoKSB7XG4gIGxldCB0bXBmaWxlID0gcGF0aC5qb2luKCdtaWxsaXMtdGVzdC1zeW5jJyArIERhdGUubm93KCkudG9TdHJpbmcoKSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zbGljZSgyKSlcbiAgdG1wZmlsZSA9IHBhdGguam9pbihvcy50bXBkaXIoKSwgdG1wZmlsZSlcblxuICAvLyA1NTAgbWlsbGlzIHBhc3QgVU5JWCBlcG9jaFxuICBjb25zdCBkID0gbmV3IERhdGUoMTQzNTQxMDI0Mzg2MilcbiAgZnMud3JpdGVGaWxlU3luYyh0bXBmaWxlLCAnaHR0cHM6Ly9naXRodWIuY29tL2pwcmljaGFyZHNvbi9ub2RlLWZzLWV4dHJhL3B1bGwvMTQxJylcbiAgY29uc3QgZmQgPSBmcy5vcGVuU3luYyh0bXBmaWxlLCAncisnKVxuICBmcy5mdXRpbWVzU3luYyhmZCwgZCwgZClcbiAgZnMuY2xvc2VTeW5jKGZkKVxuICByZXR1cm4gZnMuc3RhdFN5bmModG1wZmlsZSkubXRpbWUgPiAxNDM1NDEwMjQzMDAwXG59XG5cbmZ1bmN0aW9uIGhhc01pbGxpc1JlcyAoY2FsbGJhY2spIHtcbiAgbGV0IHRtcGZpbGUgPSBwYXRoLmpvaW4oJ21pbGxpcy10ZXN0JyArIERhdGUubm93KCkudG9TdHJpbmcoKSArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zbGljZSgyKSlcbiAgdG1wZmlsZSA9IHBhdGguam9pbihvcy50bXBkaXIoKSwgdG1wZmlsZSlcblxuICAvLyA1NTAgbWlsbGlzIHBhc3QgVU5JWCBlcG9jaFxuICBjb25zdCBkID0gbmV3IERhdGUoMTQzNTQxMDI0Mzg2MilcbiAgZnMud3JpdGVGaWxlKHRtcGZpbGUsICdodHRwczovL2dpdGh1Yi5jb20vanByaWNoYXJkc29uL25vZGUtZnMtZXh0cmEvcHVsbC8xNDEnLCBlcnIgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgZnMub3Blbih0bXBmaWxlLCAncisnLCAoZXJyLCBmZCkgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIGZzLmZ1dGltZXMoZmQsIGQsIGQsIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIGZzLmNsb3NlKGZkLCBlcnIgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgZnMuc3RhdCh0bXBmaWxlLCAoZXJyLCBzdGF0cykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHN0YXRzLm10aW1lID4gMTQzNTQxMDI0MzAwMClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiB0aW1lUmVtb3ZlTWlsbGlzICh0aW1lc3RhbXApIHtcbiAgaWYgKHR5cGVvZiB0aW1lc3RhbXAgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGltZXN0YW1wIC8gMTAwMCkgKiAxMDAwXG4gIH0gZWxzZSBpZiAodGltZXN0YW1wIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLmZsb29yKHRpbWVzdGFtcC5nZXRUaW1lKCkgLyAxMDAwKSAqIDEwMDApXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmcy1leHRyYTogdGltZVJlbW92ZU1pbGxpcygpIHVua25vd24gcGFyYW1ldGVyIHR5cGUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0aW1lc01pbGxpcyAocGF0aCwgYXRpbWUsIG10aW1lLCBjYWxsYmFjaykge1xuICAvLyBpZiAoIUhBU19NSUxMSVNfUkVTKSByZXR1cm4gZnMudXRpbWVzKHBhdGgsIGF0aW1lLCBtdGltZSwgY2FsbGJhY2spXG4gIGZzLm9wZW4ocGF0aCwgJ3IrJywgKGVyciwgZmQpID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgIGZzLmZ1dGltZXMoZmQsIGF0aW1lLCBtdGltZSwgZnV0aW1lc0VyciA9PiB7XG4gICAgICBmcy5jbG9zZShmZCwgY2xvc2VFcnIgPT4ge1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGZ1dGltZXNFcnIgfHwgY2xvc2VFcnIpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYXNNaWxsaXNSZXMsXG4gIGhhc01pbGxpc1Jlc1N5bmMsXG4gIHRpbWVSZW1vdmVNaWxsaXMsXG4gIHV0aW1lc01pbGxpc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi91dGlsL3V0aW1lcy5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpLlN0cmVhbVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxlZ2FjeVxuXG5mdW5jdGlvbiBsZWdhY3kgKGZzKSB7XG4gIHJldHVybiB7XG4gICAgUmVhZFN0cmVhbTogUmVhZFN0cmVhbSxcbiAgICBXcml0ZVN0cmVhbTogV3JpdGVTdHJlYW1cbiAgfVxuXG4gIGZ1bmN0aW9uIFJlYWRTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUmVhZFN0cmVhbSkpIHJldHVybiBuZXcgUmVhZFN0cmVhbShwYXRoLCBvcHRpb25zKTtcblxuICAgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICB0aGlzLmZkID0gbnVsbDtcbiAgICB0aGlzLnJlYWRhYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5mbGFncyA9ICdyJztcbiAgICB0aGlzLm1vZGUgPSA0Mzg7IC8qPTA2NjYqL1xuICAgIHRoaXMuYnVmZmVyU2l6ZSA9IDY0ICogMTAyNDtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gTWl4aW4gb3B0aW9ucyBpbnRvIHRoaXNcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZW5jb2RpbmcpIHRoaXMuc2V0RW5jb2RpbmcodGhpcy5lbmNvZGluZyk7XG5cbiAgICBpZiAodGhpcy5zdGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiB0aGlzLnN0YXJ0KSB7XG4gICAgICAgIHRocm93IFR5cGVFcnJvcignc3RhcnQgbXVzdCBiZSBhIE51bWJlcicpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lbmQgPSBJbmZpbml0eTtcbiAgICAgIH0gZWxzZSBpZiAoJ251bWJlcicgIT09IHR5cGVvZiB0aGlzLmVuZCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2VuZCBtdXN0IGJlIGEgTnVtYmVyJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnN0YXJ0ID4gdGhpcy5lbmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydCBtdXN0IGJlIDw9IGVuZCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcyA9IHRoaXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmQgIT09IG51bGwpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuX3JlYWQoKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZzLm9wZW4odGhpcy5wYXRoLCB0aGlzLmZsYWdzLCB0aGlzLm1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICBzZWxmLnJlYWRhYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5mZCA9IGZkO1xuICAgICAgc2VsZi5lbWl0KCdvcGVuJywgZmQpO1xuICAgICAgc2VsZi5fcmVhZCgpO1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBXcml0ZVN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBXcml0ZVN0cmVhbSkpIHJldHVybiBuZXcgV3JpdGVTdHJlYW0ocGF0aCwgb3B0aW9ucyk7XG5cbiAgICBTdHJlYW0uY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5mZCA9IG51bGw7XG4gICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG5cbiAgICB0aGlzLmZsYWdzID0gJ3cnO1xuICAgIHRoaXMuZW5jb2RpbmcgPSAnYmluYXJ5JztcbiAgICB0aGlzLm1vZGUgPSA0Mzg7IC8qPTA2NjYqL1xuICAgIHRoaXMuYnl0ZXNXcml0dGVuID0gMDtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gTWl4aW4gb3B0aW9ucyBpbnRvIHRoaXNcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5zdGFydCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3N0YXJ0IG11c3QgYmUgYSBOdW1iZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnN0YXJ0IDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0YXJ0IG11c3QgYmUgPj0gemVybycpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcyA9IHRoaXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgdGhpcy5idXN5ID0gZmFsc2U7XG4gICAgdGhpcy5fcXVldWUgPSBbXTtcblxuICAgIGlmICh0aGlzLmZkID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9vcGVuID0gZnMub3BlbjtcbiAgICAgIHRoaXMuX3F1ZXVlLnB1c2goW3RoaXMuX29wZW4sIHRoaXMucGF0aCwgdGhpcy5mbGFncywgdGhpcy5tb2RlLCB1bmRlZmluZWRdKTtcbiAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ncmFjZWZ1bC1mcy9sZWdhY3ktc3RyZWFtcy5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGZzID0gcmVxdWlyZSgnLi9mcy5qcycpXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnY29uc3RhbnRzJylcblxudmFyIG9yaWdDd2QgPSBwcm9jZXNzLmN3ZFxudmFyIGN3ZCA9IG51bGxcblxudmFyIHBsYXRmb3JtID0gcHJvY2Vzcy5lbnYuR1JBQ0VGVUxfRlNfUExBVEZPUk0gfHwgcHJvY2Vzcy5wbGF0Zm9ybVxuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIWN3ZClcbiAgICBjd2QgPSBvcmlnQ3dkLmNhbGwocHJvY2VzcylcbiAgcmV0dXJuIGN3ZFxufVxudHJ5IHtcbiAgcHJvY2Vzcy5jd2QoKVxufSBjYXRjaCAoZXIpIHt9XG5cbnZhciBjaGRpciA9IHByb2Nlc3MuY2hkaXJcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbihkKSB7XG4gIGN3ZCA9IG51bGxcbiAgY2hkaXIuY2FsbChwcm9jZXNzLCBkKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoXG5cbmZ1bmN0aW9uIHBhdGNoIChmcykge1xuICAvLyAocmUtKWltcGxlbWVudCBzb21lIHRoaW5ncyB0aGF0IGFyZSBrbm93biBidXN0ZWQgb3IgbWlzc2luZy5cblxuICAvLyBsY2htb2QsIGJyb2tlbiBwcmlvciB0byAwLjYuMlxuICAvLyBiYWNrLXBvcnQgdGhlIGZpeCBoZXJlLlxuICBpZiAoY29uc3RhbnRzLmhhc093blByb3BlcnR5KCdPX1NZTUxJTksnKSAmJlxuICAgICAgcHJvY2Vzcy52ZXJzaW9uLm1hdGNoKC9edjBcXC42XFwuWzAtMl18XnYwXFwuNVxcLi8pKSB7XG4gICAgcGF0Y2hMY2htb2QoZnMpXG4gIH1cblxuICAvLyBsdXRpbWVzIGltcGxlbWVudGF0aW9uLCBvciBuby1vcFxuICBpZiAoIWZzLmx1dGltZXMpIHtcbiAgICBwYXRjaEx1dGltZXMoZnMpXG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vaXNhYWNzL25vZGUtZ3JhY2VmdWwtZnMvaXNzdWVzLzRcbiAgLy8gQ2hvd24gc2hvdWxkIG5vdCBmYWlsIG9uIGVpbnZhbCBvciBlcGVybSBpZiBub24tcm9vdC5cbiAgLy8gSXQgc2hvdWxkIG5vdCBmYWlsIG9uIGVub3N5cyBldmVyLCBhcyB0aGlzIGp1c3QgaW5kaWNhdGVzXG4gIC8vIHRoYXQgYSBmcyBkb2Vzbid0IHN1cHBvcnQgdGhlIGludGVuZGVkIG9wZXJhdGlvbi5cblxuICBmcy5jaG93biA9IGNob3duRml4KGZzLmNob3duKVxuICBmcy5mY2hvd24gPSBjaG93bkZpeChmcy5mY2hvd24pXG4gIGZzLmxjaG93biA9IGNob3duRml4KGZzLmxjaG93bilcblxuICBmcy5jaG1vZCA9IGNobW9kRml4KGZzLmNobW9kKVxuICBmcy5mY2htb2QgPSBjaG1vZEZpeChmcy5mY2htb2QpXG4gIGZzLmxjaG1vZCA9IGNobW9kRml4KGZzLmxjaG1vZClcblxuICBmcy5jaG93blN5bmMgPSBjaG93bkZpeFN5bmMoZnMuY2hvd25TeW5jKVxuICBmcy5mY2hvd25TeW5jID0gY2hvd25GaXhTeW5jKGZzLmZjaG93blN5bmMpXG4gIGZzLmxjaG93blN5bmMgPSBjaG93bkZpeFN5bmMoZnMubGNob3duU3luYylcblxuICBmcy5jaG1vZFN5bmMgPSBjaG1vZEZpeFN5bmMoZnMuY2htb2RTeW5jKVxuICBmcy5mY2htb2RTeW5jID0gY2htb2RGaXhTeW5jKGZzLmZjaG1vZFN5bmMpXG4gIGZzLmxjaG1vZFN5bmMgPSBjaG1vZEZpeFN5bmMoZnMubGNobW9kU3luYylcblxuICBmcy5zdGF0ID0gc3RhdEZpeChmcy5zdGF0KVxuICBmcy5mc3RhdCA9IHN0YXRGaXgoZnMuZnN0YXQpXG4gIGZzLmxzdGF0ID0gc3RhdEZpeChmcy5sc3RhdClcblxuICBmcy5zdGF0U3luYyA9IHN0YXRGaXhTeW5jKGZzLnN0YXRTeW5jKVxuICBmcy5mc3RhdFN5bmMgPSBzdGF0Rml4U3luYyhmcy5mc3RhdFN5bmMpXG4gIGZzLmxzdGF0U3luYyA9IHN0YXRGaXhTeW5jKGZzLmxzdGF0U3luYylcblxuICAvLyBpZiBsY2htb2QvbGNob3duIGRvIG5vdCBleGlzdCwgdGhlbiBtYWtlIHRoZW0gbm8tb3BzXG4gIGlmICghZnMubGNobW9kKSB7XG4gICAgZnMubGNobW9kID0gZnVuY3Rpb24gKHBhdGgsIG1vZGUsIGNiKSB7XG4gICAgICBpZiAoY2IpIHByb2Nlc3MubmV4dFRpY2soY2IpXG4gICAgfVxuICAgIGZzLmxjaG1vZFN5bmMgPSBmdW5jdGlvbiAoKSB7fVxuICB9XG4gIGlmICghZnMubGNob3duKSB7XG4gICAgZnMubGNob3duID0gZnVuY3Rpb24gKHBhdGgsIHVpZCwgZ2lkLCBjYikge1xuICAgICAgaWYgKGNiKSBwcm9jZXNzLm5leHRUaWNrKGNiKVxuICAgIH1cbiAgICBmcy5sY2hvd25TeW5jID0gZnVuY3Rpb24gKCkge31cbiAgfVxuXG4gIC8vIG9uIFdpbmRvd3MsIEEvViBzb2Z0d2FyZSBjYW4gbG9jayB0aGUgZGlyZWN0b3J5LCBjYXVzaW5nIHRoaXNcbiAgLy8gdG8gZmFpbCB3aXRoIGFuIEVBQ0NFUyBvciBFUEVSTSBpZiB0aGUgZGlyZWN0b3J5IGNvbnRhaW5zIG5ld2x5XG4gIC8vIGNyZWF0ZWQgZmlsZXMuICBUcnkgYWdhaW4gb24gZmFpbHVyZSwgZm9yIHVwIHRvIDYwIHNlY29uZHMuXG5cbiAgLy8gU2V0IHRoZSB0aW1lb3V0IHRoaXMgbG9uZyBiZWNhdXNlIHNvbWUgV2luZG93cyBBbnRpLVZpcnVzLCBzdWNoIGFzIFBhcml0eVxuICAvLyBiaXQ5LCBtYXkgbG9jayBmaWxlcyBmb3IgdXAgdG8gYSBtaW51dGUsIGNhdXNpbmcgbnBtIHBhY2thZ2UgaW5zdGFsbFxuICAvLyBmYWlsdXJlcy4gQWxzbywgdGFrZSBjYXJlIHRvIHlpZWxkIHRoZSBzY2hlZHVsZXIuIFdpbmRvd3Mgc2NoZWR1bGluZyBnaXZlc1xuICAvLyBDUFUgdG8gYSBidXN5IGxvb3BpbmcgcHJvY2Vzcywgd2hpY2ggY2FuIGNhdXNlIHRoZSBwcm9ncmFtIGNhdXNpbmcgdGhlIGxvY2tcbiAgLy8gY29udGVudGlvbiB0byBiZSBzdGFydmVkIG9mIENQVSBieSBub2RlLCBzbyB0aGUgY29udGVudGlvbiBkb2Vzbid0IHJlc29sdmUuXG4gIGlmIChwbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiKSB7XG4gICAgZnMucmVuYW1lID0gKGZ1bmN0aW9uIChmcyRyZW5hbWUpIHsgcmV0dXJuIGZ1bmN0aW9uIChmcm9tLCB0bywgY2IpIHtcbiAgICAgIHZhciBzdGFydCA9IERhdGUubm93KClcbiAgICAgIHZhciBiYWNrb2ZmID0gMDtcbiAgICAgIGZzJHJlbmFtZShmcm9tLCB0bywgZnVuY3Rpb24gQ0IgKGVyKSB7XG4gICAgICAgIGlmIChlclxuICAgICAgICAgICAgJiYgKGVyLmNvZGUgPT09IFwiRUFDQ0VTXCIgfHwgZXIuY29kZSA9PT0gXCJFUEVSTVwiKVxuICAgICAgICAgICAgJiYgRGF0ZS5ub3coKSAtIHN0YXJ0IDwgNjAwMDApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZnMuc3RhdCh0bywgZnVuY3Rpb24gKHN0YXRlciwgc3QpIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlciAmJiBzdGF0ZXIuY29kZSA9PT0gXCJFTk9FTlRcIilcbiAgICAgICAgICAgICAgICBmcyRyZW5hbWUoZnJvbSwgdG8sIENCKTtcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNiKGVyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LCBiYWNrb2ZmKVxuICAgICAgICAgIGlmIChiYWNrb2ZmIDwgMTAwKVxuICAgICAgICAgICAgYmFja29mZiArPSAxMDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNiKSBjYihlcilcbiAgICAgIH0pXG4gICAgfX0pKGZzLnJlbmFtZSlcbiAgfVxuXG4gIC8vIGlmIHJlYWQoKSByZXR1cm5zIEVBR0FJTiwgdGhlbiBqdXN0IHRyeSBpdCBhZ2Fpbi5cbiAgZnMucmVhZCA9IChmdW5jdGlvbiAoZnMkcmVhZCkgeyByZXR1cm4gZnVuY3Rpb24gKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2tfKSB7XG4gICAgdmFyIGNhbGxiYWNrXG4gICAgaWYgKGNhbGxiYWNrXyAmJiB0eXBlb2YgY2FsbGJhY2tfID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgZWFnQ291bnRlciA9IDBcbiAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGVyLCBfLCBfXykge1xuICAgICAgICBpZiAoZXIgJiYgZXIuY29kZSA9PT0gJ0VBR0FJTicgJiYgZWFnQ291bnRlciA8IDEwKSB7XG4gICAgICAgICAgZWFnQ291bnRlciArK1xuICAgICAgICAgIHJldHVybiBmcyRyZWFkLmNhbGwoZnMsIGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spXG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2tfLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZzJHJlYWQuY2FsbChmcywgZmQsIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvc2l0aW9uLCBjYWxsYmFjaylcbiAgfX0pKGZzLnJlYWQpXG5cbiAgZnMucmVhZFN5bmMgPSAoZnVuY3Rpb24gKGZzJHJlYWRTeW5jKSB7IHJldHVybiBmdW5jdGlvbiAoZmQsIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvc2l0aW9uKSB7XG4gICAgdmFyIGVhZ0NvdW50ZXIgPSAwXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmcyRyZWFkU3luYy5jYWxsKGZzLCBmZCwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24pXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICBpZiAoZXIuY29kZSA9PT0gJ0VBR0FJTicgJiYgZWFnQ291bnRlciA8IDEwKSB7XG4gICAgICAgICAgZWFnQ291bnRlciArK1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJcbiAgICAgIH1cbiAgICB9XG4gIH19KShmcy5yZWFkU3luYylcbn1cblxuZnVuY3Rpb24gcGF0Y2hMY2htb2QgKGZzKSB7XG4gIGZzLmxjaG1vZCA9IGZ1bmN0aW9uIChwYXRoLCBtb2RlLCBjYWxsYmFjaykge1xuICAgIGZzLm9wZW4oIHBhdGhcbiAgICAgICAgICAgLCBjb25zdGFudHMuT19XUk9OTFkgfCBjb25zdGFudHMuT19TWU1MSU5LXG4gICAgICAgICAgICwgbW9kZVxuICAgICAgICAgICAsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8vIHByZWZlciB0byByZXR1cm4gdGhlIGNobW9kIGVycm9yLCBpZiBvbmUgb2NjdXJzLFxuICAgICAgLy8gYnV0IHN0aWxsIHRyeSB0byBjbG9zZSwgYW5kIHJlcG9ydCBjbG9zaW5nIGVycm9ycyBpZiB0aGV5IG9jY3VyLlxuICAgICAgZnMuZmNobW9kKGZkLCBtb2RlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGZzLmNsb3NlKGZkLCBmdW5jdGlvbihlcnIyKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhlcnIgfHwgZXJyMilcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGZzLmxjaG1vZFN5bmMgPSBmdW5jdGlvbiAocGF0aCwgbW9kZSkge1xuICAgIHZhciBmZCA9IGZzLm9wZW5TeW5jKHBhdGgsIGNvbnN0YW50cy5PX1dST05MWSB8IGNvbnN0YW50cy5PX1NZTUxJTkssIG1vZGUpXG5cbiAgICAvLyBwcmVmZXIgdG8gcmV0dXJuIHRoZSBjaG1vZCBlcnJvciwgaWYgb25lIG9jY3VycyxcbiAgICAvLyBidXQgc3RpbGwgdHJ5IHRvIGNsb3NlLCBhbmQgcmVwb3J0IGNsb3NpbmcgZXJyb3JzIGlmIHRoZXkgb2NjdXIuXG4gICAgdmFyIHRocmV3ID0gdHJ1ZVxuICAgIHZhciByZXRcbiAgICB0cnkge1xuICAgICAgcmV0ID0gZnMuZmNobW9kU3luYyhmZCwgbW9kZSlcbiAgICAgIHRocmV3ID0gZmFsc2VcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHRocmV3KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKVxuICAgICAgICB9IGNhdGNoIChlcikge31cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZzLmNsb3NlU3luYyhmZClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoTHV0aW1lcyAoZnMpIHtcbiAgaWYgKGNvbnN0YW50cy5oYXNPd25Qcm9wZXJ0eShcIk9fU1lNTElOS1wiKSkge1xuICAgIGZzLmx1dGltZXMgPSBmdW5jdGlvbiAocGF0aCwgYXQsIG10LCBjYikge1xuICAgICAgZnMub3BlbihwYXRoLCBjb25zdGFudHMuT19TWU1MSU5LLCBmdW5jdGlvbiAoZXIsIGZkKSB7XG4gICAgICAgIGlmIChlcikge1xuICAgICAgICAgIGlmIChjYikgY2IoZXIpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZnMuZnV0aW1lcyhmZCwgYXQsIG10LCBmdW5jdGlvbiAoZXIpIHtcbiAgICAgICAgICBmcy5jbG9zZShmZCwgZnVuY3Rpb24gKGVyMikge1xuICAgICAgICAgICAgaWYgKGNiKSBjYihlciB8fCBlcjIpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnMubHV0aW1lc1N5bmMgPSBmdW5jdGlvbiAocGF0aCwgYXQsIG10KSB7XG4gICAgICB2YXIgZmQgPSBmcy5vcGVuU3luYyhwYXRoLCBjb25zdGFudHMuT19TWU1MSU5LKVxuICAgICAgdmFyIHJldFxuICAgICAgdmFyIHRocmV3ID0gdHJ1ZVxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0ID0gZnMuZnV0aW1lc1N5bmMoZmQsIGF0LCBtdClcbiAgICAgICAgdGhyZXcgPSBmYWxzZVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKHRocmV3KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZClcbiAgICAgICAgICB9IGNhdGNoIChlcikge31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcy5jbG9zZVN5bmMoZmQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXRcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICBmcy5sdXRpbWVzID0gZnVuY3Rpb24gKF9hLCBfYiwgX2MsIGNiKSB7IGlmIChjYikgcHJvY2Vzcy5uZXh0VGljayhjYikgfVxuICAgIGZzLmx1dGltZXNTeW5jID0gZnVuY3Rpb24gKCkge31cbiAgfVxufVxuXG5mdW5jdGlvbiBjaG1vZEZpeCAob3JpZykge1xuICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBtb2RlLCBjYikge1xuICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgbW9kZSwgZnVuY3Rpb24gKGVyKSB7XG4gICAgICBpZiAoY2hvd25Fck9rKGVyKSkgZXIgPSBudWxsXG4gICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGNobW9kRml4U3luYyAob3JpZykge1xuICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBtb2RlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgbW9kZSlcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgaWYgKCFjaG93bkVyT2soZXIpKSB0aHJvdyBlclxuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGNob3duRml4IChvcmlnKSB7XG4gIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHVpZCwgZ2lkLCBjYikge1xuICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgdWlkLCBnaWQsIGZ1bmN0aW9uIChlcikge1xuICAgICAgaWYgKGNob3duRXJPayhlcikpIGVyID0gbnVsbFxuICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaG93bkZpeFN5bmMgKG9yaWcpIHtcbiAgaWYgKCFvcmlnKSByZXR1cm4gb3JpZ1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgdWlkLCBnaWQpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG9yaWcuY2FsbChmcywgdGFyZ2V0LCB1aWQsIGdpZClcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgaWYgKCFjaG93bkVyT2soZXIpKSB0aHJvdyBlclxuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0YXRGaXggKG9yaWcpIHtcbiAgaWYgKCFvcmlnKSByZXR1cm4gb3JpZ1xuICAvLyBPbGRlciB2ZXJzaW9ucyBvZiBOb2RlIGVycm9uZW91c2x5IHJldHVybmVkIHNpZ25lZCBpbnRlZ2VycyBmb3JcbiAgLy8gdWlkICsgZ2lkLlxuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgY2IpIHtcbiAgICByZXR1cm4gb3JpZy5jYWxsKGZzLCB0YXJnZXQsIGZ1bmN0aW9uIChlciwgc3RhdHMpIHtcbiAgICAgIGlmICghc3RhdHMpIHJldHVybiBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICBpZiAoc3RhdHMudWlkIDwgMCkgc3RhdHMudWlkICs9IDB4MTAwMDAwMDAwXG4gICAgICBpZiAoc3RhdHMuZ2lkIDwgMCkgc3RhdHMuZ2lkICs9IDB4MTAwMDAwMDAwXG4gICAgICBpZiAoY2IpIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0YXRGaXhTeW5jIChvcmlnKSB7XG4gIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgLy8gT2xkZXIgdmVyc2lvbnMgb2YgTm9kZSBlcnJvbmVvdXNseSByZXR1cm5lZCBzaWduZWQgaW50ZWdlcnMgZm9yXG4gIC8vIHVpZCArIGdpZC5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB2YXIgc3RhdHMgPSBvcmlnLmNhbGwoZnMsIHRhcmdldClcbiAgICBpZiAoc3RhdHMudWlkIDwgMCkgc3RhdHMudWlkICs9IDB4MTAwMDAwMDAwXG4gICAgaWYgKHN0YXRzLmdpZCA8IDApIHN0YXRzLmdpZCArPSAweDEwMDAwMDAwMFxuICAgIHJldHVybiBzdGF0cztcbiAgfVxufVxuXG4vLyBFTk9TWVMgbWVhbnMgdGhhdCB0aGUgZnMgZG9lc24ndCBzdXBwb3J0IHRoZSBvcC4gSnVzdCBpZ25vcmVcbi8vIHRoYXQsIGJlY2F1c2UgaXQgZG9lc24ndCBtYXR0ZXIuXG4vL1xuLy8gaWYgdGhlcmUncyBubyBnZXR1aWQsIG9yIGlmIGdldHVpZCgpIGlzIHNvbWV0aGluZyBvdGhlclxuLy8gdGhhbiAwLCBhbmQgdGhlIGVycm9yIGlzIEVJTlZBTCBvciBFUEVSTSwgdGhlbiBqdXN0IGlnbm9yZVxuLy8gaXQuXG4vL1xuLy8gVGhpcyBzcGVjaWZpYyBjYXNlIGlzIGEgc2lsZW50IGZhaWx1cmUgaW4gY3AsIGluc3RhbGwsIHRhcixcbi8vIGFuZCBtb3N0IG90aGVyIHVuaXggdG9vbHMgdGhhdCBtYW5hZ2UgcGVybWlzc2lvbnMuXG4vL1xuLy8gV2hlbiBydW5uaW5nIGFzIHJvb3QsIG9yIGlmIG90aGVyIHR5cGVzIG9mIGVycm9ycyBhcmVcbi8vIGVuY291bnRlcmVkLCB0aGVuIGl0J3Mgc3RyaWN0LlxuZnVuY3Rpb24gY2hvd25Fck9rIChlcikge1xuICBpZiAoIWVyKVxuICAgIHJldHVybiB0cnVlXG5cbiAgaWYgKGVyLmNvZGUgPT09IFwiRU5PU1lTXCIpXG4gICAgcmV0dXJuIHRydWVcblxuICB2YXIgbm9ucm9vdCA9ICFwcm9jZXNzLmdldHVpZCB8fCBwcm9jZXNzLmdldHVpZCgpICE9PSAwXG4gIGlmIChub25yb290KSB7XG4gICAgaWYgKGVyLmNvZGUgPT09IFwiRUlOVkFMXCIgfHwgZXIuY29kZSA9PT0gXCJFUEVSTVwiKVxuICAgICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dyYWNlZnVsLWZzL3BvbHlmaWxscy5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIF9mc1xudHJ5IHtcbiAgX2ZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxufSBjYXRjaCAoXykge1xuICBfZnMgPSByZXF1aXJlKCdmcycpXG59XG5cbmZ1bmN0aW9uIHJlYWRGaWxlIChmaWxlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgPT0gbnVsbCkge1xuICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgIG9wdGlvbnMgPSB7ZW5jb2Rpbmc6IG9wdGlvbnN9XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgZnMgPSBvcHRpb25zLmZzIHx8IF9mc1xuXG4gIHZhciBzaG91bGRUaHJvdyA9IHRydWVcbiAgLy8gRE8gTk9UIFVTRSAncGFzc1BhcnNpbmdFcnJvcnMnIFRIRSBOQU1FIFdJTEwgQ0hBTkdFISEhLCB1c2UgJ3Rocm93cycgaW5zdGVhZFxuICBpZiAoJ3Bhc3NQYXJzaW5nRXJyb3JzJyBpbiBvcHRpb25zKSB7XG4gICAgc2hvdWxkVGhyb3cgPSBvcHRpb25zLnBhc3NQYXJzaW5nRXJyb3JzXG4gIH0gZWxzZSBpZiAoJ3Rocm93cycgaW4gb3B0aW9ucykge1xuICAgIHNob3VsZFRocm93ID0gb3B0aW9ucy50aHJvd3NcbiAgfVxuXG4gIGZzLnJlYWRGaWxlKGZpbGUsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuXG4gICAgZGF0YSA9IHN0cmlwQm9tKGRhdGEpXG5cbiAgICB2YXIgb2JqXG4gICAgdHJ5IHtcbiAgICAgIG9iaiA9IEpTT04ucGFyc2UoZGF0YSwgb3B0aW9ucyA/IG9wdGlvbnMucmV2aXZlciA6IG51bGwpXG4gICAgfSBjYXRjaCAoZXJyMikge1xuICAgICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICAgIGVycjIubWVzc2FnZSA9IGZpbGUgKyAnOiAnICsgZXJyMi5tZXNzYWdlXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG51bGwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGJhY2sobnVsbCwgb2JqKVxuICB9KVxufVxuXG5mdW5jdGlvbiByZWFkRmlsZVN5bmMgKGZpbGUsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgIG9wdGlvbnMgPSB7ZW5jb2Rpbmc6IG9wdGlvbnN9XG4gIH1cblxuICB2YXIgZnMgPSBvcHRpb25zLmZzIHx8IF9mc1xuXG4gIHZhciBzaG91bGRUaHJvdyA9IHRydWVcbiAgLy8gRE8gTk9UIFVTRSAncGFzc1BhcnNpbmdFcnJvcnMnIFRIRSBOQU1FIFdJTEwgQ0hBTkdFISEhLCB1c2UgJ3Rocm93cycgaW5zdGVhZFxuICBpZiAoJ3Bhc3NQYXJzaW5nRXJyb3JzJyBpbiBvcHRpb25zKSB7XG4gICAgc2hvdWxkVGhyb3cgPSBvcHRpb25zLnBhc3NQYXJzaW5nRXJyb3JzXG4gIH0gZWxzZSBpZiAoJ3Rocm93cycgaW4gb3B0aW9ucykge1xuICAgIHNob3VsZFRocm93ID0gb3B0aW9ucy50aHJvd3NcbiAgfVxuXG4gIHZhciBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGZpbGUsIG9wdGlvbnMpXG4gIGNvbnRlbnQgPSBzdHJpcEJvbShjb250ZW50KVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCwgb3B0aW9ucy5yZXZpdmVyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgIGVyci5tZXNzYWdlID0gZmlsZSArICc6ICcgKyBlcnIubWVzc2FnZVxuICAgICAgdGhyb3cgZXJyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHdyaXRlRmlsZSAoZmlsZSwgb2JqLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgPT0gbnVsbCkge1xuICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBmcyA9IG9wdGlvbnMuZnMgfHwgX2ZzXG5cbiAgdmFyIHNwYWNlcyA9IHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JyAmJiBvcHRpb25zICE9PSBudWxsXG4gICAgPyAnc3BhY2VzJyBpbiBvcHRpb25zXG4gICAgPyBvcHRpb25zLnNwYWNlcyA6IHRoaXMuc3BhY2VzXG4gICAgOiB0aGlzLnNwYWNlc1xuXG4gIHZhciBzdHIgPSAnJ1xuICB0cnkge1xuICAgIHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iaiwgb3B0aW9ucyA/IG9wdGlvbnMucmVwbGFjZXIgOiBudWxsLCBzcGFjZXMpICsgJ1xcbidcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGNhbGxiYWNrKSByZXR1cm4gY2FsbGJhY2soZXJyLCBudWxsKVxuICB9XG5cbiAgZnMud3JpdGVGaWxlKGZpbGUsIHN0ciwgb3B0aW9ucywgY2FsbGJhY2spXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmlsZVN5bmMgKGZpbGUsIG9iaiwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgZnMgPSBvcHRpb25zLmZzIHx8IF9mc1xuXG4gIHZhciBzcGFjZXMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbFxuICAgID8gJ3NwYWNlcycgaW4gb3B0aW9uc1xuICAgID8gb3B0aW9ucy5zcGFjZXMgOiB0aGlzLnNwYWNlc1xuICAgIDogdGhpcy5zcGFjZXNcblxuICB2YXIgc3RyID0gSlNPTi5zdHJpbmdpZnkob2JqLCBvcHRpb25zLnJlcGxhY2VyLCBzcGFjZXMpICsgJ1xcbidcbiAgLy8gbm90IHN1cmUgaWYgZnMud3JpdGVGaWxlU3luYyByZXR1cm5zIGFueXRoaW5nLCBidXQganVzdCBpbiBjYXNlXG4gIHJldHVybiBmcy53cml0ZUZpbGVTeW5jKGZpbGUsIHN0ciwgb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gc3RyaXBCb20gKGNvbnRlbnQpIHtcbiAgLy8gd2UgZG8gdGhpcyBiZWNhdXNlIEpTT04ucGFyc2Ugd291bGQgY29udmVydCBpdCB0byBhIHV0Zjggc3RyaW5nIGlmIGVuY29kaW5nIHdhc24ndCBzcGVjaWZpZWRcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihjb250ZW50KSkgY29udGVudCA9IGNvbnRlbnQudG9TdHJpbmcoJ3V0ZjgnKVxuICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9eXFx1RkVGRi8sICcnKVxuICByZXR1cm4gY29udGVudFxufVxuXG52YXIganNvbmZpbGUgPSB7XG4gIHNwYWNlczogbnVsbCxcbiAgcmVhZEZpbGU6IHJlYWRGaWxlLFxuICByZWFkRmlsZVN5bmM6IHJlYWRGaWxlU3luYyxcbiAgd3JpdGVGaWxlOiB3cml0ZUZpbGUsXG4gIHdyaXRlRmlsZVN5bmM6IHdyaXRlRmlsZVN5bmNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBqc29uZmlsZVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2pzb25maWxlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25zdGFudHNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjb25zdGFudHNcIlxuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJvc1wiXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJzdHJlYW1cIlxuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInV0aWxcIlxuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==