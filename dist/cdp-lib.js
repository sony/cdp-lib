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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTA3NWRjOTBlNDlkMGRlZjE1NTIiLCJ3ZWJwYWNrOi8vLy4vfi9ncmFjZWZ1bC1mcy9ncmFjZWZ1bC1mcy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvbWtkaXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL3JlbW92ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2pzb24vanNvbmZpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvbWtkaXJzL21rZGlycy1zeW5jLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL21rZGlycy9ta2RpcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvY29weS1zeW5jL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2NvcHkvbmNwLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2pzb24vb3V0cHV0LWpzb24tc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9qc29uL291dHB1dC1qc29uLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL21rZGlycy93aW4zMi5qcyIsIndlYnBhY2s6Ly8vLi9+L2dyYWNlZnVsLWZzL2ZzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzc2VydFwiIiwid2VicGFjazovLy8uL2xpYi9jZHAtbGliLnRzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2NvcHktc3luYy9jb3B5LWZpbGUtc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9jb3B5LXN5bmMvY29weS1zeW5jLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2NvcHkvY29weS5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2VtcHR5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9maWxlLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay1wYXRocy5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvc3ltbGluay10eXBlLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9zeW1saW5rLmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL2pzb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvbW92ZS1zeW5jL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL21vdmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvb3V0cHV0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZnMtZXh0cmEvbGliL3JlbW92ZS9yaW1yYWYuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvdXRpbC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mcy1leHRyYS9saWIvdXRpbC91dGltZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ncmFjZWZ1bC1mcy9sZWdhY3ktc3RyZWFtcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2dyYWNlZnVsLWZzL3BvbHlmaWxscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2pzb25maWxlL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnN0YW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDclFBLGlDOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUkE7O0FBRUE7O0FBRUE7QUFDQSwyQkFBMkIsa0JBQWtCO0FBQzdDOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CLHdGQUF3RjtBQUN4Rjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQSwrQjs7Ozs7OztBQ0FBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNmQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7QUMxREE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOzs7Ozs7O0FDOURBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRCxrQkFBa0I7O0FBRXRFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3pPQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7OztBQ2pCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7QUN6QkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3hCQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7O0FDcEJBLG1DOzs7Ozs7Ozs7QUNBQSxtQ0FBK0I7QUFFL0I7OztHQUdHO0FBQ0g7SUFDSTs7T0FFRztJQUNJLE9BQU8sQ0FBQyxPQUFZO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztDQUNKO0FBWEQsd0JBV0M7Ozs7Ozs7O0FDakJEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHlCQUF5QixTQUFTO0FBQ2xDLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUN4Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0Q7O0FBRWxEO0FBQ0E7QUFDQSxrR0FBa0c7QUFDbEc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0dBQWtHO0FBQ2xHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7Ozs7Ozs7QUNuREE7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM0RBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDL0RBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7O0FDcENBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDVkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSw4REFBOEQsSUFBSSxpQkFBaUIsS0FBSzs7QUFFeEY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEhBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxRQUFROztBQUVuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoS0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcENBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3ZTQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDZkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFlBQVksSUFBSTtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2RUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsZ0JBQWdCO0FBQzdEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDZDQUE2QyxnQkFBZ0I7QUFDN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JIQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOOztBQUVBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUoseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0gsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDelVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNwSUEsc0M7Ozs7OztBQ0FBLCtCOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoiY2RwLWxpYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDUwNzVkYzkwZTQ5ZDBkZWYxNTUyIiwidmFyIGZzID0gcmVxdWlyZSgnZnMnKVxudmFyIHBvbHlmaWxscyA9IHJlcXVpcmUoJy4vcG9seWZpbGxzLmpzJylcbnZhciBsZWdhY3kgPSByZXF1aXJlKCcuL2xlZ2FjeS1zdHJlYW1zLmpzJylcbnZhciBxdWV1ZSA9IFtdXG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpXG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxudmFyIGRlYnVnID0gbm9vcFxuaWYgKHV0aWwuZGVidWdsb2cpXG4gIGRlYnVnID0gdXRpbC5kZWJ1Z2xvZygnZ2ZzNCcpXG5lbHNlIGlmICgvXFxiZ2ZzNFxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJykpXG4gIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG0gPSB1dGlsLmZvcm1hdC5hcHBseSh1dGlsLCBhcmd1bWVudHMpXG4gICAgbSA9ICdHRlM0OiAnICsgbS5zcGxpdCgvXFxuLykuam9pbignXFxuR0ZTNDogJylcbiAgICBjb25zb2xlLmVycm9yKG0pXG4gIH1cblxuaWYgKC9cXGJnZnM0XFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnKSkge1xuICBwcm9jZXNzLm9uKCdleGl0JywgZnVuY3Rpb24oKSB7XG4gICAgZGVidWcocXVldWUpXG4gICAgcmVxdWlyZSgnYXNzZXJ0JykuZXF1YWwocXVldWUubGVuZ3RoLCAwKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoKHJlcXVpcmUoJy4vZnMuanMnKSlcbmlmIChwcm9jZXNzLmVudi5URVNUX0dSQUNFRlVMX0ZTX0dMT0JBTF9QQVRDSCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHBhdGNoKGZzKVxufVxuXG4vLyBBbHdheXMgcGF0Y2ggZnMuY2xvc2UvY2xvc2VTeW5jLCBiZWNhdXNlIHdlIHdhbnQgdG9cbi8vIHJldHJ5KCkgd2hlbmV2ZXIgYSBjbG9zZSBoYXBwZW5zICphbnl3aGVyZSogaW4gdGhlIHByb2dyYW0uXG4vLyBUaGlzIGlzIGVzc2VudGlhbCB3aGVuIG11bHRpcGxlIGdyYWNlZnVsLWZzIGluc3RhbmNlcyBhcmVcbi8vIGluIHBsYXkgYXQgdGhlIHNhbWUgdGltZS5cbm1vZHVsZS5leHBvcnRzLmNsb3NlID1cbmZzLmNsb3NlID0gKGZ1bmN0aW9uIChmcyRjbG9zZSkgeyByZXR1cm4gZnVuY3Rpb24gKGZkLCBjYikge1xuICByZXR1cm4gZnMkY2xvc2UuY2FsbChmcywgZmQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoIWVycilcbiAgICAgIHJldHJ5KClcblxuICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG4gICAgICBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH0pXG59fSkoZnMuY2xvc2UpXG5cbm1vZHVsZS5leHBvcnRzLmNsb3NlU3luYyA9XG5mcy5jbG9zZVN5bmMgPSAoZnVuY3Rpb24gKGZzJGNsb3NlU3luYykgeyByZXR1cm4gZnVuY3Rpb24gKGZkKSB7XG4gIC8vIE5vdGUgdGhhdCBncmFjZWZ1bC1mcyBhbHNvIHJldHJpZXMgd2hlbiBmcy5jbG9zZVN5bmMoKSBmYWlscy5cbiAgLy8gTG9va3MgbGlrZSBhIGJ1ZyB0byBtZSwgYWx0aG91Z2ggaXQncyBwcm9iYWJseSBhIGhhcm1sZXNzIG9uZS5cbiAgdmFyIHJ2YWwgPSBmcyRjbG9zZVN5bmMuYXBwbHkoZnMsIGFyZ3VtZW50cylcbiAgcmV0cnkoKVxuICByZXR1cm4gcnZhbFxufX0pKGZzLmNsb3NlU3luYylcblxuZnVuY3Rpb24gcGF0Y2ggKGZzKSB7XG4gIC8vIEV2ZXJ5dGhpbmcgdGhhdCByZWZlcmVuY2VzIHRoZSBvcGVuKCkgZnVuY3Rpb24gbmVlZHMgdG8gYmUgaW4gaGVyZVxuICBwb2x5ZmlsbHMoZnMpXG4gIGZzLmdyYWNlZnVsaWZ5ID0gcGF0Y2hcbiAgZnMuRmlsZVJlYWRTdHJlYW0gPSBSZWFkU3RyZWFtOyAgLy8gTGVnYWN5IG5hbWUuXG4gIGZzLkZpbGVXcml0ZVN0cmVhbSA9IFdyaXRlU3RyZWFtOyAgLy8gTGVnYWN5IG5hbWUuXG4gIGZzLmNyZWF0ZVJlYWRTdHJlYW0gPSBjcmVhdGVSZWFkU3RyZWFtXG4gIGZzLmNyZWF0ZVdyaXRlU3RyZWFtID0gY3JlYXRlV3JpdGVTdHJlYW1cbiAgdmFyIGZzJHJlYWRGaWxlID0gZnMucmVhZEZpbGVcbiAgZnMucmVhZEZpbGUgPSByZWFkRmlsZVxuICBmdW5jdGlvbiByZWFkRmlsZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpXG4gICAgICBjYiA9IG9wdGlvbnMsIG9wdGlvbnMgPSBudWxsXG5cbiAgICByZXR1cm4gZ28kcmVhZEZpbGUocGF0aCwgb3B0aW9ucywgY2IpXG5cbiAgICBmdW5jdGlvbiBnbyRyZWFkRmlsZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgICAgIHJldHVybiBmcyRyZWFkRmlsZShwYXRoLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIgJiYgKGVyci5jb2RlID09PSAnRU1GSUxFJyB8fCBlcnIuY29kZSA9PT0gJ0VORklMRScpKVxuICAgICAgICAgIGVucXVldWUoW2dvJHJlYWRGaWxlLCBbcGF0aCwgb3B0aW9ucywgY2JdXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgdmFyIGZzJHdyaXRlRmlsZSA9IGZzLndyaXRlRmlsZVxuICBmcy53cml0ZUZpbGUgPSB3cml0ZUZpbGVcbiAgZnVuY3Rpb24gd3JpdGVGaWxlIChwYXRoLCBkYXRhLCBvcHRpb25zLCBjYikge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIGNiID0gb3B0aW9ucywgb3B0aW9ucyA9IG51bGxcblxuICAgIHJldHVybiBnbyR3cml0ZUZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpXG5cbiAgICBmdW5jdGlvbiBnbyR3cml0ZUZpbGUgKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgICByZXR1cm4gZnMkd3JpdGVGaWxlKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgICAgZW5xdWV1ZShbZ28kd3JpdGVGaWxlLCBbcGF0aCwgZGF0YSwgb3B0aW9ucywgY2JdXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgdmFyIGZzJGFwcGVuZEZpbGUgPSBmcy5hcHBlbmRGaWxlXG4gIGlmIChmcyRhcHBlbmRGaWxlKVxuICAgIGZzLmFwcGVuZEZpbGUgPSBhcHBlbmRGaWxlXG4gIGZ1bmN0aW9uIGFwcGVuZEZpbGUgKHBhdGgsIGRhdGEsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IgPSBvcHRpb25zLCBvcHRpb25zID0gbnVsbFxuXG4gICAgcmV0dXJuIGdvJGFwcGVuZEZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgY2IpXG5cbiAgICBmdW5jdGlvbiBnbyRhcHBlbmRGaWxlIChwYXRoLCBkYXRhLCBvcHRpb25zLCBjYikge1xuICAgICAgcmV0dXJuIGZzJGFwcGVuZEZpbGUocGF0aCwgZGF0YSwgb3B0aW9ucywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyICYmIChlcnIuY29kZSA9PT0gJ0VNRklMRScgfHwgZXJyLmNvZGUgPT09ICdFTkZJTEUnKSlcbiAgICAgICAgICBlbnF1ZXVlKFtnbyRhcHBlbmRGaWxlLCBbcGF0aCwgZGF0YSwgb3B0aW9ucywgY2JdXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgICByZXRyeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgdmFyIGZzJHJlYWRkaXIgPSBmcy5yZWFkZGlyXG4gIGZzLnJlYWRkaXIgPSByZWFkZGlyXG4gIGZ1bmN0aW9uIHJlYWRkaXIgKHBhdGgsIG9wdGlvbnMsIGNiKSB7XG4gICAgdmFyIGFyZ3MgPSBbcGF0aF1cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFyZ3MucHVzaChvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBjYiA9IG9wdGlvbnNcbiAgICB9XG4gICAgYXJncy5wdXNoKGdvJHJlYWRkaXIkY2IpXG5cbiAgICByZXR1cm4gZ28kcmVhZGRpcihhcmdzKVxuXG4gICAgZnVuY3Rpb24gZ28kcmVhZGRpciRjYiAoZXJyLCBmaWxlcykge1xuICAgICAgaWYgKGZpbGVzICYmIGZpbGVzLnNvcnQpXG4gICAgICAgIGZpbGVzLnNvcnQoKVxuXG4gICAgICBpZiAoZXJyICYmIChlcnIuY29kZSA9PT0gJ0VNRklMRScgfHwgZXJyLmNvZGUgPT09ICdFTkZJTEUnKSlcbiAgICAgICAgZW5xdWV1ZShbZ28kcmVhZGRpciwgW2FyZ3NdXSlcbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIGNiLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgcmV0cnkoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdvJHJlYWRkaXIgKGFyZ3MpIHtcbiAgICByZXR1cm4gZnMkcmVhZGRpci5hcHBseShmcywgYXJncylcbiAgfVxuXG4gIGlmIChwcm9jZXNzLnZlcnNpb24uc3Vic3RyKDAsIDQpID09PSAndjAuOCcpIHtcbiAgICB2YXIgbGVnU3RyZWFtcyA9IGxlZ2FjeShmcylcbiAgICBSZWFkU3RyZWFtID0gbGVnU3RyZWFtcy5SZWFkU3RyZWFtXG4gICAgV3JpdGVTdHJlYW0gPSBsZWdTdHJlYW1zLldyaXRlU3RyZWFtXG4gIH1cblxuICB2YXIgZnMkUmVhZFN0cmVhbSA9IGZzLlJlYWRTdHJlYW1cbiAgUmVhZFN0cmVhbS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGZzJFJlYWRTdHJlYW0ucHJvdG90eXBlKVxuICBSZWFkU3RyZWFtLnByb3RvdHlwZS5vcGVuID0gUmVhZFN0cmVhbSRvcGVuXG5cbiAgdmFyIGZzJFdyaXRlU3RyZWFtID0gZnMuV3JpdGVTdHJlYW1cbiAgV3JpdGVTdHJlYW0ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShmcyRXcml0ZVN0cmVhbS5wcm90b3R5cGUpXG4gIFdyaXRlU3RyZWFtLnByb3RvdHlwZS5vcGVuID0gV3JpdGVTdHJlYW0kb3BlblxuXG4gIGZzLlJlYWRTdHJlYW0gPSBSZWFkU3RyZWFtXG4gIGZzLldyaXRlU3RyZWFtID0gV3JpdGVTdHJlYW1cblxuICBmdW5jdGlvbiBSZWFkU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBSZWFkU3RyZWFtKVxuICAgICAgcmV0dXJuIGZzJFJlYWRTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKSwgdGhpc1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBSZWFkU3RyZWFtLmFwcGx5KE9iamVjdC5jcmVhdGUoUmVhZFN0cmVhbS5wcm90b3R5cGUpLCBhcmd1bWVudHMpXG4gIH1cblxuICBmdW5jdGlvbiBSZWFkU3RyZWFtJG9wZW4gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIG9wZW4odGhhdC5wYXRoLCB0aGF0LmZsYWdzLCB0aGF0Lm1vZGUsIGZ1bmN0aW9uIChlcnIsIGZkKSB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGlmICh0aGF0LmF1dG9DbG9zZSlcbiAgICAgICAgICB0aGF0LmRlc3Ryb3koKVxuXG4gICAgICAgIHRoYXQuZW1pdCgnZXJyb3InLCBlcnIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LmZkID0gZmRcbiAgICAgICAgdGhhdC5lbWl0KCdvcGVuJywgZmQpXG4gICAgICAgIHRoYXQucmVhZCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIFdyaXRlU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBXcml0ZVN0cmVhbSlcbiAgICAgIHJldHVybiBmcyRXcml0ZVN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0aGlzXG4gICAgZWxzZVxuICAgICAgcmV0dXJuIFdyaXRlU3RyZWFtLmFwcGx5KE9iamVjdC5jcmVhdGUoV3JpdGVTdHJlYW0ucHJvdG90eXBlKSwgYXJndW1lbnRzKVxuICB9XG5cbiAgZnVuY3Rpb24gV3JpdGVTdHJlYW0kb3BlbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgb3Blbih0aGF0LnBhdGgsIHRoYXQuZmxhZ3MsIHRoYXQubW9kZSwgZnVuY3Rpb24gKGVyciwgZmQpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgdGhhdC5kZXN0cm95KClcbiAgICAgICAgdGhhdC5lbWl0KCdlcnJvcicsIGVycilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuZmQgPSBmZFxuICAgICAgICB0aGF0LmVtaXQoJ29wZW4nLCBmZClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUmVhZFN0cmVhbSAocGF0aCwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgUmVhZFN0cmVhbShwYXRoLCBvcHRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlV3JpdGVTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFdyaXRlU3RyZWFtKHBhdGgsIG9wdGlvbnMpXG4gIH1cblxuICB2YXIgZnMkb3BlbiA9IGZzLm9wZW5cbiAgZnMub3BlbiA9IG9wZW5cbiAgZnVuY3Rpb24gb3BlbiAocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBtb2RlID09PSAnZnVuY3Rpb24nKVxuICAgICAgY2IgPSBtb2RlLCBtb2RlID0gbnVsbFxuXG4gICAgcmV0dXJuIGdvJG9wZW4ocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKVxuXG4gICAgZnVuY3Rpb24gZ28kb3BlbiAocGF0aCwgZmxhZ3MsIG1vZGUsIGNiKSB7XG4gICAgICByZXR1cm4gZnMkb3BlbihwYXRoLCBmbGFncywgbW9kZSwgZnVuY3Rpb24gKGVyciwgZmQpIHtcbiAgICAgICAgaWYgKGVyciAmJiAoZXJyLmNvZGUgPT09ICdFTUZJTEUnIHx8IGVyci5jb2RlID09PSAnRU5GSUxFJykpXG4gICAgICAgICAgZW5xdWV1ZShbZ28kb3BlbiwgW3BhdGgsIGZsYWdzLCBtb2RlLCBjYl1dKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAgIHJldHJ5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnNcbn1cblxuZnVuY3Rpb24gZW5xdWV1ZSAoZWxlbSkge1xuICBkZWJ1ZygnRU5RVUVVRScsIGVsZW1bMF0ubmFtZSwgZWxlbVsxXSlcbiAgcXVldWUucHVzaChlbGVtKVxufVxuXG5mdW5jdGlvbiByZXRyeSAoKSB7XG4gIHZhciBlbGVtID0gcXVldWUuc2hpZnQoKVxuICBpZiAoZWxlbSkge1xuICAgIGRlYnVnKCdSRVRSWScsIGVsZW1bMF0ubmFtZSwgZWxlbVsxXSlcbiAgICBlbGVtWzBdLmFwcGx5KG51bGwsIGVsZW1bMV0pXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ncmFjZWZ1bC1mcy9ncmFjZWZ1bC1mcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBta2RpcnM6IHJlcXVpcmUoJy4vbWtkaXJzJyksXG4gIG1rZGlyc1N5bmM6IHJlcXVpcmUoJy4vbWtkaXJzLXN5bmMnKSxcbiAgLy8gYWxpYXNcbiAgbWtkaXJwOiByZXF1aXJlKCcuL21rZGlycycpLFxuICBta2RpcnBTeW5jOiByZXF1aXJlKCcuL21rZGlycy1zeW5jJyksXG4gIGVuc3VyZURpcjogcmVxdWlyZSgnLi9ta2RpcnMnKSxcbiAgZW5zdXJlRGlyU3luYzogcmVxdWlyZSgnLi9ta2RpcnMtc3luYycpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL21rZGlycy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgcmltcmFmID0gcmVxdWlyZSgnLi9yaW1yYWYnKVxuXG5mdW5jdGlvbiByZW1vdmVTeW5jIChkaXIpIHtcbiAgcmV0dXJuIHJpbXJhZi5zeW5jKGRpciwge2Rpc2FibGVHbG9iOiB0cnVlfSlcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChkaXIsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7ZGlzYWJsZUdsb2I6IHRydWV9XG4gIHJldHVybiBjYWxsYmFjayA/IHJpbXJhZihkaXIsIG9wdGlvbnMsIGNhbGxiYWNrKSA6IHJpbXJhZihkaXIsIG9wdGlvbnMsIGZ1bmN0aW9uICgpIHt9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVtb3ZlLFxuICByZW1vdmVTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL3JlbW92ZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImZzXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGpzb25GaWxlID0gcmVxdWlyZSgnanNvbmZpbGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8ganNvbmZpbGUgZXhwb3J0c1xuICByZWFkSnNvbjoganNvbkZpbGUucmVhZEZpbGUsXG4gIHJlYWRKU09OOiBqc29uRmlsZS5yZWFkRmlsZSxcbiAgcmVhZEpzb25TeW5jOiBqc29uRmlsZS5yZWFkRmlsZVN5bmMsXG4gIHJlYWRKU09OU3luYzoganNvbkZpbGUucmVhZEZpbGVTeW5jLFxuICB3cml0ZUpzb246IGpzb25GaWxlLndyaXRlRmlsZSxcbiAgd3JpdGVKU09OOiBqc29uRmlsZS53cml0ZUZpbGUsXG4gIHdyaXRlSnNvblN5bmM6IGpzb25GaWxlLndyaXRlRmlsZVN5bmMsXG4gIHdyaXRlSlNPTlN5bmM6IGpzb25GaWxlLndyaXRlRmlsZVN5bmMsXG4gIHNwYWNlczogMiAvLyBkZWZhdWx0IGluIGZzLWV4dHJhXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2pzb24vanNvbmZpbGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgaW52YWxpZFdpbjMyUGF0aCA9IHJlcXVpcmUoJy4vd2luMzInKS5pbnZhbGlkV2luMzJQYXRoXG5cbmNvbnN0IG83NzcgPSBwYXJzZUludCgnMDc3NycsIDgpXG5cbmZ1bmN0aW9uIG1rZGlyc1N5bmMgKHAsIG9wdHMsIG1hZGUpIHtcbiAgaWYgKCFvcHRzIHx8IHR5cGVvZiBvcHRzICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSB7IG1vZGU6IG9wdHMgfVxuICB9XG5cbiAgbGV0IG1vZGUgPSBvcHRzLm1vZGVcbiAgY29uc3QgeGZzID0gb3B0cy5mcyB8fCBmc1xuXG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInICYmIGludmFsaWRXaW4zMlBhdGgocCkpIHtcbiAgICBjb25zdCBlcnJJbnZhbCA9IG5ldyBFcnJvcihwICsgJyBjb250YWlucyBpbnZhbGlkIFdJTjMyIHBhdGggY2hhcmFjdGVycy4nKVxuICAgIGVyckludmFsLmNvZGUgPSAnRUlOVkFMJ1xuICAgIHRocm93IGVyckludmFsXG4gIH1cblxuICBpZiAobW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbW9kZSA9IG83NzcgJiAofnByb2Nlc3MudW1hc2soKSlcbiAgfVxuICBpZiAoIW1hZGUpIG1hZGUgPSBudWxsXG5cbiAgcCA9IHBhdGgucmVzb2x2ZShwKVxuXG4gIHRyeSB7XG4gICAgeGZzLm1rZGlyU3luYyhwLCBtb2RlKVxuICAgIG1hZGUgPSBtYWRlIHx8IHBcbiAgfSBjYXRjaCAoZXJyMCkge1xuICAgIHN3aXRjaCAoZXJyMC5jb2RlKSB7XG4gICAgICBjYXNlICdFTk9FTlQnOlxuICAgICAgICBpZiAocGF0aC5kaXJuYW1lKHApID09PSBwKSB0aHJvdyBlcnIwXG4gICAgICAgIG1hZGUgPSBta2RpcnNTeW5jKHBhdGguZGlybmFtZShwKSwgb3B0cywgbWFkZSlcbiAgICAgICAgbWtkaXJzU3luYyhwLCBvcHRzLCBtYWRlKVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBJbiB0aGUgY2FzZSBvZiBhbnkgb3RoZXIgZXJyb3IsIGp1c3Qgc2VlIGlmIHRoZXJlJ3MgYSBkaXJcbiAgICAgIC8vIHRoZXJlIGFscmVhZHkuICBJZiBzbywgdGhlbiBob29yYXkhICBJZiBub3QsIHRoZW4gc29tZXRoaW5nXG4gICAgICAvLyBpcyBib3JrZWQuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZXQgc3RhdFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHN0YXQgPSB4ZnMuc3RhdFN5bmMocClcbiAgICAgICAgfSBjYXRjaCAoZXJyMSkge1xuICAgICAgICAgIHRocm93IGVycjBcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0YXQuaXNEaXJlY3RvcnkoKSkgdGhyb3cgZXJyMFxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYWRlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWtkaXJzU3luY1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9ta2RpcnMvbWtkaXJzLXN5bmMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgaW52YWxpZFdpbjMyUGF0aCA9IHJlcXVpcmUoJy4vd2luMzInKS5pbnZhbGlkV2luMzJQYXRoXG5cbmNvbnN0IG83NzcgPSBwYXJzZUludCgnMDc3NycsIDgpXG5cbmZ1bmN0aW9uIG1rZGlycyAocCwgb3B0cywgY2FsbGJhY2ssIG1hZGUpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRzXG4gICAgb3B0cyA9IHt9XG4gIH0gZWxzZSBpZiAoIW9wdHMgfHwgdHlwZW9mIG9wdHMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0cyA9IHsgbW9kZTogb3B0cyB9XG4gIH1cblxuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyAmJiBpbnZhbGlkV2luMzJQYXRoKHApKSB7XG4gICAgY29uc3QgZXJySW52YWwgPSBuZXcgRXJyb3IocCArICcgY29udGFpbnMgaW52YWxpZCBXSU4zMiBwYXRoIGNoYXJhY3RlcnMuJylcbiAgICBlcnJJbnZhbC5jb2RlID0gJ0VJTlZBTCdcbiAgICByZXR1cm4gY2FsbGJhY2soZXJySW52YWwpXG4gIH1cblxuICBsZXQgbW9kZSA9IG9wdHMubW9kZVxuICBjb25zdCB4ZnMgPSBvcHRzLmZzIHx8IGZzXG5cbiAgaWYgKG1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIG1vZGUgPSBvNzc3ICYgKH5wcm9jZXNzLnVtYXNrKCkpXG4gIH1cbiAgaWYgKCFtYWRlKSBtYWRlID0gbnVsbFxuXG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge31cbiAgcCA9IHBhdGgucmVzb2x2ZShwKVxuXG4gIHhmcy5ta2RpcihwLCBtb2RlLCBlciA9PiB7XG4gICAgaWYgKCFlcikge1xuICAgICAgbWFkZSA9IG1hZGUgfHwgcFxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG1hZGUpXG4gICAgfVxuICAgIHN3aXRjaCAoZXIuY29kZSkge1xuICAgICAgY2FzZSAnRU5PRU5UJzpcbiAgICAgICAgaWYgKHBhdGguZGlybmFtZShwKSA9PT0gcCkgcmV0dXJuIGNhbGxiYWNrKGVyKVxuICAgICAgICBta2RpcnMocGF0aC5kaXJuYW1lKHApLCBvcHRzLCAoZXIsIG1hZGUpID0+IHtcbiAgICAgICAgICBpZiAoZXIpIGNhbGxiYWNrKGVyLCBtYWRlKVxuICAgICAgICAgIGVsc2UgbWtkaXJzKHAsIG9wdHMsIGNhbGxiYWNrLCBtYWRlKVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuXG4gICAgICAvLyBJbiB0aGUgY2FzZSBvZiBhbnkgb3RoZXIgZXJyb3IsIGp1c3Qgc2VlIGlmIHRoZXJlJ3MgYSBkaXJcbiAgICAgIC8vIHRoZXJlIGFscmVhZHkuICBJZiBzbywgdGhlbiBob29yYXkhICBJZiBub3QsIHRoZW4gc29tZXRoaW5nXG4gICAgICAvLyBpcyBib3JrZWQuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB4ZnMuc3RhdChwLCAoZXIyLCBzdGF0KSA9PiB7XG4gICAgICAgICAgLy8gaWYgdGhlIHN0YXQgZmFpbHMsIHRoZW4gdGhhdCdzIHN1cGVyIHdlaXJkLlxuICAgICAgICAgIC8vIGxldCB0aGUgb3JpZ2luYWwgZXJyb3IgYmUgdGhlIGZhaWx1cmUgcmVhc29uLlxuICAgICAgICAgIGlmIChlcjIgfHwgIXN0YXQuaXNEaXJlY3RvcnkoKSkgY2FsbGJhY2soZXIsIG1hZGUpXG4gICAgICAgICAgZWxzZSBjYWxsYmFjayhudWxsLCBtYWRlKVxuICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBta2RpcnNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvbWtkaXJzL21rZGlycy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29weVN5bmM6IHJlcXVpcmUoJy4vY29weS1zeW5jJylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvY29weS1zeW5jL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGltcG9ydGVkIGZyb20gbmNwICh0aGlzIGlzIHRlbXBvcmFyeSwgd2lsbCByZXdyaXRlKVxuXG52YXIgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxudmFyIHV0aW1lcyA9IHJlcXVpcmUoJy4uL3V0aWwvdXRpbWVzJylcblxuZnVuY3Rpb24gbmNwIChzb3VyY2UsIGRlc3QsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICghY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIHZhciBiYXNlUGF0aCA9IHByb2Nlc3MuY3dkKClcbiAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCBzb3VyY2UpXG4gIHZhciB0YXJnZXRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCBkZXN0KVxuXG4gIHZhciBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlclxuICB2YXIgdHJhbnNmb3JtID0gb3B0aW9ucy50cmFuc2Zvcm1cbiAgdmFyIG92ZXJ3cml0ZSA9IG9wdGlvbnMub3ZlcndyaXRlXG4gIC8vIElmIG92ZXJ3cml0ZSBpcyB1bmRlZmluZWQsIHVzZSBjbG9iYmVyLCBvdGhlcndpc2UgZGVmYXVsdCB0byB0cnVlOlxuICBpZiAob3ZlcndyaXRlID09PSB1bmRlZmluZWQpIG92ZXJ3cml0ZSA9IG9wdGlvbnMuY2xvYmJlclxuICBpZiAob3ZlcndyaXRlID09PSB1bmRlZmluZWQpIG92ZXJ3cml0ZSA9IHRydWVcbiAgdmFyIGVycm9yT25FeGlzdCA9IG9wdGlvbnMuZXJyb3JPbkV4aXN0XG4gIHZhciBkZXJlZmVyZW5jZSA9IG9wdGlvbnMuZGVyZWZlcmVuY2VcbiAgdmFyIHByZXNlcnZlVGltZXN0YW1wcyA9IG9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzID09PSB0cnVlXG5cbiAgdmFyIHN0YXJ0ZWQgPSAwXG4gIHZhciBmaW5pc2hlZCA9IDBcbiAgdmFyIHJ1bm5pbmcgPSAwXG5cbiAgdmFyIGVycm9yZWQgPSBmYWxzZVxuXG4gIHN0YXJ0Q29weShjdXJyZW50UGF0aClcblxuICBmdW5jdGlvbiBzdGFydENvcHkgKHNvdXJjZSkge1xuICAgIHN0YXJ0ZWQrK1xuICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgIGlmIChmaWx0ZXIgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdXYXJuaW5nOiBmcy1leHRyYTogUGFzc2luZyBhIFJlZ0V4cCBmaWx0ZXIgaXMgZGVwcmVjYXRlZCwgdXNlIGEgZnVuY3Rpb24nKVxuICAgICAgICBpZiAoIWZpbHRlci50ZXN0KHNvdXJjZSkpIHtcbiAgICAgICAgICByZXR1cm4gZG9uZU9uZSh0cnVlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaWYgKCFmaWx0ZXIoc291cmNlLCBkZXN0KSkge1xuICAgICAgICAgIHJldHVybiBkb25lT25lKHRydWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdldFN0YXRzKHNvdXJjZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN0YXRzIChzb3VyY2UpIHtcbiAgICB2YXIgc3RhdCA9IGRlcmVmZXJlbmNlID8gZnMuc3RhdCA6IGZzLmxzdGF0XG4gICAgcnVubmluZysrXG4gICAgc3RhdChzb3VyY2UsIGZ1bmN0aW9uIChlcnIsIHN0YXRzKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG5cbiAgICAgIC8vIFdlIG5lZWQgdG8gZ2V0IHRoZSBtb2RlIGZyb20gdGhlIHN0YXRzIG9iamVjdCBhbmQgcHJlc2VydmUgaXQuXG4gICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgbmFtZTogc291cmNlLFxuICAgICAgICBtb2RlOiBzdGF0cy5tb2RlLFxuICAgICAgICBtdGltZTogc3RhdHMubXRpbWUsIC8vIG1vZGlmaWVkIHRpbWVcbiAgICAgICAgYXRpbWU6IHN0YXRzLmF0aW1lLCAvLyBhY2Nlc3MgdGltZVxuICAgICAgICBzdGF0czogc3RhdHMgLy8gdGVtcG9yYXJ5XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIHJldHVybiBvbkRpcihpdGVtKVxuICAgICAgfSBlbHNlIGlmIChzdGF0cy5pc0ZpbGUoKSB8fCBzdGF0cy5pc0NoYXJhY3RlckRldmljZSgpIHx8IHN0YXRzLmlzQmxvY2tEZXZpY2UoKSkge1xuICAgICAgICByZXR1cm4gb25GaWxlKGl0ZW0pXG4gICAgICB9IGVsc2UgaWYgKHN0YXRzLmlzU3ltYm9saWNMaW5rKCkpIHtcbiAgICAgICAgLy8gU3ltbGlua3MgZG9uJ3QgcmVhbGx5IG5lZWQgdG8ga25vdyBhYm91dCB0aGUgbW9kZS5cbiAgICAgICAgcmV0dXJuIG9uTGluayhzb3VyY2UpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRmlsZSAoZmlsZSkge1xuICAgIHZhciB0YXJnZXQgPSBmaWxlLm5hbWUucmVwbGFjZShjdXJyZW50UGF0aCwgdGFyZ2V0UGF0aC5yZXBsYWNlKCckJywgJyQkJCQnKSkgLy8gZXNjYXBlcyAnJCcgd2l0aCAnJCQnXG4gICAgaXNXcml0YWJsZSh0YXJnZXQsIGZ1bmN0aW9uICh3cml0YWJsZSkge1xuICAgICAgaWYgKHdyaXRhYmxlKSB7XG4gICAgICAgIGNvcHlGaWxlKGZpbGUsIHRhcmdldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgICAgICBybUZpbGUodGFyZ2V0LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb3B5RmlsZShmaWxlLCB0YXJnZXQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChlcnJvck9uRXhpc3QpIHtcbiAgICAgICAgICBvbkVycm9yKG5ldyBFcnJvcih0YXJnZXQgKyAnIGFscmVhZHkgZXhpc3RzJykpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9uZU9uZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY29weUZpbGUgKGZpbGUsIHRhcmdldCkge1xuICAgIHZhciByZWFkU3RyZWFtID0gZnMuY3JlYXRlUmVhZFN0cmVhbShmaWxlLm5hbWUpXG4gICAgdmFyIHdyaXRlU3RyZWFtID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0odGFyZ2V0LCB7IG1vZGU6IGZpbGUubW9kZSB9KVxuXG4gICAgcmVhZFN0cmVhbS5vbignZXJyb3InLCBvbkVycm9yKVxuICAgIHdyaXRlU3RyZWFtLm9uKCdlcnJvcicsIG9uRXJyb3IpXG5cbiAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICB0cmFuc2Zvcm0ocmVhZFN0cmVhbSwgd3JpdGVTdHJlYW0sIGZpbGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdyaXRlU3RyZWFtLm9uKCdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZWFkU3RyZWFtLnBpcGUod3JpdGVTdHJlYW0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHdyaXRlU3RyZWFtLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgZnMuY2htb2QodGFyZ2V0LCBmaWxlLm1vZGUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIG9uRXJyb3IoZXJyKVxuICAgICAgICBpZiAocHJlc2VydmVUaW1lc3RhbXBzKSB7XG4gICAgICAgICAgdXRpbWVzLnV0aW1lc01pbGxpcyh0YXJnZXQsIGZpbGUuYXRpbWUsIGZpbGUubXRpbWUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgICAgICAgIHJldHVybiBkb25lT25lKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvbmVPbmUoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBybUZpbGUgKGZpbGUsIGRvbmUpIHtcbiAgICBmcy51bmxpbmsoZmlsZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikgcmV0dXJuIG9uRXJyb3IoZXJyKVxuICAgICAgcmV0dXJuIGRvbmUoKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBvbkRpciAoZGlyKSB7XG4gICAgdmFyIHRhcmdldCA9IGRpci5uYW1lLnJlcGxhY2UoY3VycmVudFBhdGgsIHRhcmdldFBhdGgucmVwbGFjZSgnJCcsICckJCQkJykpIC8vIGVzY2FwZXMgJyQnIHdpdGggJyQkJ1xuICAgIGlzV3JpdGFibGUodGFyZ2V0LCBmdW5jdGlvbiAod3JpdGFibGUpIHtcbiAgICAgIGlmICh3cml0YWJsZSkge1xuICAgICAgICByZXR1cm4gbWtEaXIoZGlyLCB0YXJnZXQpXG4gICAgICB9XG4gICAgICBjb3B5RGlyKGRpci5uYW1lKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBta0RpciAoZGlyLCB0YXJnZXQpIHtcbiAgICBmcy5ta2Rpcih0YXJnZXQsIGRpci5tb2RlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICAvLyBkZXNwaXRlIHNldHRpbmcgbW9kZSBpbiBmcy5ta2RpciwgZG9lc24ndCBzZWVtIHRvIHdvcmtcbiAgICAgIC8vIHNvIHdlIHNldCBpdCBoZXJlLlxuICAgICAgZnMuY2htb2QodGFyZ2V0LCBkaXIubW9kZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gb25FcnJvcihlcnIpXG4gICAgICAgIGNvcHlEaXIoZGlyLm5hbWUpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjb3B5RGlyIChkaXIpIHtcbiAgICBmcy5yZWFkZGlyKGRpciwgZnVuY3Rpb24gKGVyciwgaXRlbXMpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgc3RhcnRDb3B5KHBhdGguam9pbihkaXIsIGl0ZW0pKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBkb25lT25lKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gb25MaW5rIChsaW5rKSB7XG4gICAgdmFyIHRhcmdldCA9IGxpbmsucmVwbGFjZShjdXJyZW50UGF0aCwgdGFyZ2V0UGF0aClcbiAgICBmcy5yZWFkbGluayhsaW5rLCBmdW5jdGlvbiAoZXJyLCByZXNvbHZlZFBhdGgpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgIGNoZWNrTGluayhyZXNvbHZlZFBhdGgsIHRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tMaW5rIChyZXNvbHZlZFBhdGgsIHRhcmdldCkge1xuICAgIGlmIChkZXJlZmVyZW5jZSkge1xuICAgICAgcmVzb2x2ZWRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCByZXNvbHZlZFBhdGgpXG4gICAgfVxuICAgIGlzV3JpdGFibGUodGFyZ2V0LCBmdW5jdGlvbiAod3JpdGFibGUpIHtcbiAgICAgIGlmICh3cml0YWJsZSkge1xuICAgICAgICByZXR1cm4gbWFrZUxpbmsocmVzb2x2ZWRQYXRoLCB0YXJnZXQpXG4gICAgICB9XG4gICAgICBmcy5yZWFkbGluayh0YXJnZXQsIGZ1bmN0aW9uIChlcnIsIHRhcmdldERlc3QpIHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIG9uRXJyb3IoZXJyKVxuXG4gICAgICAgIGlmIChkZXJlZmVyZW5jZSkge1xuICAgICAgICAgIHRhcmdldERlc3QgPSBwYXRoLnJlc29sdmUoYmFzZVBhdGgsIHRhcmdldERlc3QpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldERlc3QgPT09IHJlc29sdmVkUGF0aCkge1xuICAgICAgICAgIHJldHVybiBkb25lT25lKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm1GaWxlKHRhcmdldCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG1ha2VMaW5rKHJlc29sdmVkUGF0aCwgdGFyZ2V0KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gbWFrZUxpbmsgKGxpbmtQYXRoLCB0YXJnZXQpIHtcbiAgICBmcy5zeW1saW5rKGxpbmtQYXRoLCB0YXJnZXQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBvbkVycm9yKGVycilcbiAgICAgIHJldHVybiBkb25lT25lKClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gaXNXcml0YWJsZSAocGF0aCwgZG9uZSkge1xuICAgIGZzLmxzdGF0KHBhdGgsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRU5PRU5UJykgcmV0dXJuIGRvbmUodHJ1ZSlcbiAgICAgICAgcmV0dXJuIGRvbmUoZmFsc2UpXG4gICAgICB9XG4gICAgICByZXR1cm4gZG9uZShmYWxzZSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gb25FcnJvciAoZXJyKSB7XG4gICAgLy8gZW5zdXJlIGNhbGxiYWNrIGlzIGRlZmluZWQgJiBjYWxsZWQgb25seSBvbmNlOlxuICAgIGlmICghZXJyb3JlZCAmJiBjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvcmVkID0gdHJ1ZVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkb25lT25lIChza2lwcGVkKSB7XG4gICAgaWYgKCFza2lwcGVkKSBydW5uaW5nLS1cbiAgICBmaW5pc2hlZCsrXG4gICAgaWYgKChzdGFydGVkID09PSBmaW5pc2hlZCkgJiYgKHJ1bm5pbmcgPT09IDApKSB7XG4gICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuY3BcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvY29weS9uY3AuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgbWtkaXIgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuY29uc3QganNvbkZpbGUgPSByZXF1aXJlKCcuL2pzb25maWxlJylcblxuZnVuY3Rpb24gb3V0cHV0SnNvblN5bmMgKGZpbGUsIGRhdGEsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG5cbiAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICBta2Rpci5ta2RpcnNTeW5jKGRpcilcbiAgfVxuXG4gIGpzb25GaWxlLndyaXRlSnNvblN5bmMoZmlsZSwgZGF0YSwgb3B0aW9ucylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdXRwdXRKc29uU3luY1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9qc29uL291dHB1dC1qc29uLXN5bmMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcbmNvbnN0IGpzb25GaWxlID0gcmVxdWlyZSgnLi9qc29uZmlsZScpXG5cbmZ1bmN0aW9uIG91dHB1dEpzb24gKGZpbGUsIGRhdGEsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG5cbiAgZnMuZXhpc3RzKGRpciwgaXREb2VzID0+IHtcbiAgICBpZiAoaXREb2VzKSByZXR1cm4ganNvbkZpbGUud3JpdGVKc29uKGZpbGUsIGRhdGEsIG9wdGlvbnMsIGNhbGxiYWNrKVxuXG4gICAgbWtkaXIubWtkaXJzKGRpciwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBqc29uRmlsZS53cml0ZUpzb24oZmlsZSwgZGF0YSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgfSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdXRwdXRKc29uXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2pzb24vb3V0cHV0LWpzb24uanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbi8vIGdldCBkcml2ZSBvbiB3aW5kb3dzXG5mdW5jdGlvbiBnZXRSb290UGF0aCAocCkge1xuICBwID0gcGF0aC5ub3JtYWxpemUocGF0aC5yZXNvbHZlKHApKS5zcGxpdChwYXRoLnNlcClcbiAgaWYgKHAubGVuZ3RoID4gMCkgcmV0dXJuIHBbMF1cbiAgcmV0dXJuIG51bGxcbn1cblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI4ODgvMTAzMzMgY29udGFpbnMgbW9yZSBhY2N1cmF0ZVxuLy8gVE9ETzogZXhwYW5kIHRvIGluY2x1ZGUgdGhlIHJlc3RcbmNvbnN0IElOVkFMSURfUEFUSF9DSEFSUyA9IC9bPD46XCJ8PypdL1xuXG5mdW5jdGlvbiBpbnZhbGlkV2luMzJQYXRoIChwKSB7XG4gIGNvbnN0IHJwID0gZ2V0Um9vdFBhdGgocClcbiAgcCA9IHAucmVwbGFjZShycCwgJycpXG4gIHJldHVybiBJTlZBTElEX1BBVEhfQ0hBUlMudGVzdChwKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Um9vdFBhdGgsXG4gIGludmFsaWRXaW4zMlBhdGhcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvbWtkaXJzL3dpbjMyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lKGZzKVxuXG5mdW5jdGlvbiBjbG9uZSAob2JqKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpXG4gICAgcmV0dXJuIG9ialxuXG4gIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgdmFyIGNvcHkgPSB7IF9fcHJvdG9fXzogb2JqLl9fcHJvdG9fXyB9XG4gIGVsc2VcbiAgICB2YXIgY29weSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb3B5LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKVxuICB9KVxuXG4gIHJldHVybiBjb3B5XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ3JhY2VmdWwtZnMvZnMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImFzc2VydFwiXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCLvu79pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnMtZXh0cmFcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ0RQTGliXHJcbiAqIEBicmllZiBDRFAgYm9pbGVycGxhdGUg55Sf5oiQ5qmf6IO944KS5o+Q5L6b44GZ44KL44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ0RQTGliIHtcclxuICAgIC8qKlxyXG4gICAgICogbWFpbiBjb21tYW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBleGVjdXRlKG9wdGlvbnM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKFwicGFja2FnZS5qc29uXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2tcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NkcC1saWIudHMiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5cbmNvbnN0IEJVRl9MRU5HVEggPSA2NCAqIDEwMjRcbmNvbnN0IF9idWZmID0gbmV3IEJ1ZmZlcihCVUZfTEVOR1RIKVxuXG5mdW5jdGlvbiBjb3B5RmlsZVN5bmMgKHNyY0ZpbGUsIGRlc3RGaWxlLCBvcHRpb25zKSB7XG4gIGNvbnN0IG92ZXJ3cml0ZSA9IG9wdGlvbnMub3ZlcndyaXRlXG4gIGNvbnN0IGVycm9yT25FeGlzdCA9IG9wdGlvbnMuZXJyb3JPbkV4aXN0XG4gIGNvbnN0IHByZXNlcnZlVGltZXN0YW1wcyA9IG9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzXG5cbiAgaWYgKGZzLmV4aXN0c1N5bmMoZGVzdEZpbGUpKSB7XG4gICAgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgZnMudW5saW5rU3luYyhkZXN0RmlsZSlcbiAgICB9IGVsc2UgaWYgKGVycm9yT25FeGlzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2Rlc3RGaWxlfSBhbHJlYWR5IGV4aXN0c2ApXG4gICAgfSBlbHNlIHJldHVyblxuICB9XG5cbiAgY29uc3QgZmRyID0gZnMub3BlblN5bmMoc3JjRmlsZSwgJ3InKVxuICBjb25zdCBzdGF0ID0gZnMuZnN0YXRTeW5jKGZkcilcbiAgY29uc3QgZmR3ID0gZnMub3BlblN5bmMoZGVzdEZpbGUsICd3Jywgc3RhdC5tb2RlKVxuICBsZXQgYnl0ZXNSZWFkID0gMVxuICBsZXQgcG9zID0gMFxuXG4gIHdoaWxlIChieXRlc1JlYWQgPiAwKSB7XG4gICAgYnl0ZXNSZWFkID0gZnMucmVhZFN5bmMoZmRyLCBfYnVmZiwgMCwgQlVGX0xFTkdUSCwgcG9zKVxuICAgIGZzLndyaXRlU3luYyhmZHcsIF9idWZmLCAwLCBieXRlc1JlYWQpXG4gICAgcG9zICs9IGJ5dGVzUmVhZFxuICB9XG5cbiAgaWYgKHByZXNlcnZlVGltZXN0YW1wcykge1xuICAgIGZzLmZ1dGltZXNTeW5jKGZkdywgc3RhdC5hdGltZSwgc3RhdC5tdGltZSlcbiAgfVxuXG4gIGZzLmNsb3NlU3luYyhmZHIpXG4gIGZzLmNsb3NlU3luYyhmZHcpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weUZpbGVTeW5jXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2NvcHktc3luYy9jb3B5LWZpbGUtc3luYy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgY29weUZpbGVTeW5jID0gcmVxdWlyZSgnLi9jb3B5LWZpbGUtc3luYycpXG5jb25zdCBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5cbmZ1bmN0aW9uIGNvcHlTeW5jIChzcmMsIGRlc3QsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nIHx8IG9wdGlvbnMgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICBvcHRpb25zID0ge2ZpbHRlcjogb3B0aW9uc31cbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIG9wdGlvbnMucmVjdXJzaXZlID0gISFvcHRpb25zLnJlY3Vyc2l2ZVxuXG4gIC8vIGRlZmF1bHQgdG8gdHJ1ZSBmb3Igbm93XG4gIG9wdGlvbnMuY2xvYmJlciA9ICdjbG9iYmVyJyBpbiBvcHRpb25zID8gISFvcHRpb25zLmNsb2JiZXIgOiB0cnVlXG4gIC8vIG92ZXJ3cml0ZSBmYWxscyBiYWNrIHRvIGNsb2JiZXJcbiAgb3B0aW9ucy5vdmVyd3JpdGUgPSAnb3ZlcndyaXRlJyBpbiBvcHRpb25zID8gISFvcHRpb25zLm92ZXJ3cml0ZSA6IG9wdGlvbnMuY2xvYmJlclxuICBvcHRpb25zLmRlcmVmZXJlbmNlID0gJ2RlcmVmZXJlbmNlJyBpbiBvcHRpb25zID8gISFvcHRpb25zLmRlcmVmZXJlbmNlIDogZmFsc2VcbiAgb3B0aW9ucy5wcmVzZXJ2ZVRpbWVzdGFtcHMgPSAncHJlc2VydmVUaW1lc3RhbXBzJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnByZXNlcnZlVGltZXN0YW1wcyA6IGZhbHNlXG5cbiAgb3B0aW9ucy5maWx0ZXIgPSBvcHRpb25zLmZpbHRlciB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlIH1cblxuICAvLyBXYXJuIGFib3V0IHVzaW5nIHByZXNlcnZlVGltZXN0YW1wcyBvbiAzMi1iaXQgbm9kZTpcbiAgaWYgKG9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzICYmIHByb2Nlc3MuYXJjaCA9PT0gJ2lhMzInKSB7XG4gICAgY29uc29sZS53YXJuKGBmcy1leHRyYTogVXNpbmcgdGhlIHByZXNlcnZlVGltZXN0YW1wcyBvcHRpb24gaW4gMzItYml0IG5vZGUgaXMgbm90IHJlY29tbWVuZGVkO1xcblxuICAgIHNlZSBodHRwczovL2dpdGh1Yi5jb20vanByaWNoYXJkc29uL25vZGUtZnMtZXh0cmEvaXNzdWVzLzI2OWApXG4gIH1cblxuICBjb25zdCBzdGF0cyA9IChvcHRpb25zLnJlY3Vyc2l2ZSAmJiAhb3B0aW9ucy5kZXJlZmVyZW5jZSkgPyBmcy5sc3RhdFN5bmMoc3JjKSA6IGZzLnN0YXRTeW5jKHNyYylcbiAgY29uc3QgZGVzdEZvbGRlciA9IHBhdGguZGlybmFtZShkZXN0KVxuICBjb25zdCBkZXN0Rm9sZGVyRXhpc3RzID0gZnMuZXhpc3RzU3luYyhkZXN0Rm9sZGVyKVxuICBsZXQgcGVyZm9ybUNvcHkgPSBmYWxzZVxuXG4gIGlmIChvcHRpb25zLmZpbHRlciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIGNvbnNvbGUud2FybignV2FybmluZzogZnMtZXh0cmE6IFBhc3NpbmcgYSBSZWdFeHAgZmlsdGVyIGlzIGRlcHJlY2F0ZWQsIHVzZSBhIGZ1bmN0aW9uJylcbiAgICBwZXJmb3JtQ29weSA9IG9wdGlvbnMuZmlsdGVyLnRlc3Qoc3JjKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykgcGVyZm9ybUNvcHkgPSBvcHRpb25zLmZpbHRlcihzcmMsIGRlc3QpXG5cbiAgaWYgKHN0YXRzLmlzRmlsZSgpICYmIHBlcmZvcm1Db3B5KSB7XG4gICAgaWYgKCFkZXN0Rm9sZGVyRXhpc3RzKSBta2Rpci5ta2RpcnNTeW5jKGRlc3RGb2xkZXIpXG4gICAgY29weUZpbGVTeW5jKHNyYywgZGVzdCwge1xuICAgICAgb3ZlcndyaXRlOiBvcHRpb25zLm92ZXJ3cml0ZSxcbiAgICAgIGVycm9yT25FeGlzdDogb3B0aW9ucy5lcnJvck9uRXhpc3QsXG4gICAgICBwcmVzZXJ2ZVRpbWVzdGFtcHM6IG9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzXG4gICAgfSlcbiAgfSBlbHNlIGlmIChzdGF0cy5pc0RpcmVjdG9yeSgpICYmIHBlcmZvcm1Db3B5KSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGRlc3QpKSBta2Rpci5ta2RpcnNTeW5jKGRlc3QpXG4gICAgY29uc3QgY29udGVudHMgPSBmcy5yZWFkZGlyU3luYyhzcmMpXG4gICAgY29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IG9wdHMgPSBvcHRpb25zXG4gICAgICBvcHRzLnJlY3Vyc2l2ZSA9IHRydWVcbiAgICAgIGNvcHlTeW5jKHBhdGguam9pbihzcmMsIGNvbnRlbnQpLCBwYXRoLmpvaW4oZGVzdCwgY29udGVudCksIG9wdHMpXG4gICAgfSlcbiAgfSBlbHNlIGlmIChvcHRpb25zLnJlY3Vyc2l2ZSAmJiBzdGF0cy5pc1N5bWJvbGljTGluaygpICYmIHBlcmZvcm1Db3B5KSB7XG4gICAgY29uc3Qgc3JjUGF0aCA9IGZzLnJlYWRsaW5rU3luYyhzcmMpXG4gICAgZnMuc3ltbGlua1N5bmMoc3JjUGF0aCwgZGVzdClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlTeW5jXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2NvcHktc3luYy9jb3B5LXN5bmMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG5jcCA9IHJlcXVpcmUoJy4vbmNwJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcblxuZnVuY3Rpb24gY29weSAoc3JjLCBkZXN0LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgJiYgIWNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgfHwgb3B0aW9ucyBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIG9wdGlvbnMgPSB7ZmlsdGVyOiBvcHRpb25zfVxuICB9XG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge31cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAvLyBXYXJuIGFib3V0IHVzaW5nIHByZXNlcnZlVGltZXN0YW1wcyBvbiAzMi1iaXQgbm9kZTpcbiAgaWYgKG9wdGlvbnMucHJlc2VydmVUaW1lc3RhbXBzICYmIHByb2Nlc3MuYXJjaCA9PT0gJ2lhMzInKSB7XG4gICAgY29uc29sZS53YXJuKGBmcy1leHRyYTogVXNpbmcgdGhlIHByZXNlcnZlVGltZXN0YW1wcyBvcHRpb24gaW4gMzItYml0IG5vZGUgaXMgbm90IHJlY29tbWVuZGVkO1xcblxuICAgIHNlZSBodHRwczovL2dpdGh1Yi5jb20vanByaWNoYXJkc29uL25vZGUtZnMtZXh0cmEvaXNzdWVzLzI2OWApXG4gIH1cblxuICAvLyBkb24ndCBhbGxvdyBzcmMgYW5kIGRlc3QgdG8gYmUgdGhlIHNhbWVcbiAgY29uc3QgYmFzZVBhdGggPSBwcm9jZXNzLmN3ZCgpXG4gIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aC5yZXNvbHZlKGJhc2VQYXRoLCBzcmMpXG4gIGNvbnN0IHRhcmdldFBhdGggPSBwYXRoLnJlc29sdmUoYmFzZVBhdGgsIGRlc3QpXG4gIGlmIChjdXJyZW50UGF0aCA9PT0gdGFyZ2V0UGF0aCkgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcignU291cmNlIGFuZCBkZXN0aW5hdGlvbiBtdXN0IG5vdCBiZSB0aGUgc2FtZS4nKSlcblxuICBmcy5sc3RhdChzcmMsIChlcnIsIHN0YXRzKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcblxuICAgIGxldCBkaXIgPSBudWxsXG4gICAgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIGNvbnN0IHBhcnRzID0gZGVzdC5zcGxpdChwYXRoLnNlcClcbiAgICAgIHBhcnRzLnBvcCgpXG4gICAgICBkaXIgPSBwYXJ0cy5qb2luKHBhdGguc2VwKVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXIgPSBwYXRoLmRpcm5hbWUoZGVzdClcbiAgICB9XG5cbiAgICBmcy5leGlzdHMoZGlyLCBkaXJFeGlzdHMgPT4ge1xuICAgICAgaWYgKGRpckV4aXN0cykgcmV0dXJuIG5jcChzcmMsIGRlc3QsIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgbWtkaXIubWtkaXJzKGRpciwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgbmNwKHNyYywgZGVzdCwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L2NvcHkuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjb3B5OiByZXF1aXJlKCcuL2NvcHknKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9jb3B5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5jb25zdCByZW1vdmUgPSByZXF1aXJlKCcuLi9yZW1vdmUnKVxuXG5mdW5jdGlvbiBlbXB0eURpciAoZGlyLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9XG4gIGZzLnJlYWRkaXIoZGlyLCAoZXJyLCBpdGVtcykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBta2Rpci5ta2RpcnMoZGlyLCBjYWxsYmFjaylcblxuICAgIGl0ZW1zID0gaXRlbXMubWFwKGl0ZW0gPT4gcGF0aC5qb2luKGRpciwgaXRlbSkpXG5cbiAgICBkZWxldGVJdGVtKClcblxuICAgIGZ1bmN0aW9uIGRlbGV0ZUl0ZW0gKCkge1xuICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zLnBvcCgpXG4gICAgICBpZiAoIWl0ZW0pIHJldHVybiBjYWxsYmFjaygpXG4gICAgICByZW1vdmUucmVtb3ZlKGl0ZW0sIGVyciA9PiB7XG4gICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgIGRlbGV0ZUl0ZW0oKVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGVtcHR5RGlyU3luYyAoZGlyKSB7XG4gIGxldCBpdGVtc1xuICB0cnkge1xuICAgIGl0ZW1zID0gZnMucmVhZGRpclN5bmMoZGlyKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gbWtkaXIubWtkaXJzU3luYyhkaXIpXG4gIH1cblxuICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGl0ZW0gPSBwYXRoLmpvaW4oZGlyLCBpdGVtKVxuICAgIHJlbW92ZS5yZW1vdmVTeW5jKGl0ZW0pXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBlbXB0eURpclN5bmMsXG4gIGVtcHR5ZGlyU3luYzogZW1wdHlEaXJTeW5jLFxuICBlbXB0eURpcixcbiAgZW1wdHlkaXI6IGVtcHR5RGlyXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2VtcHR5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBta2RpciA9IHJlcXVpcmUoJy4uL21rZGlycycpXG5cbmZ1bmN0aW9uIGNyZWF0ZUZpbGUgKGZpbGUsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIG1ha2VGaWxlICgpIHtcbiAgICBmcy53cml0ZUZpbGUoZmlsZSwgJycsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH0pXG4gIH1cblxuICBmcy5leGlzdHMoZmlsZSwgZmlsZUV4aXN0cyA9PiB7XG4gICAgaWYgKGZpbGVFeGlzdHMpIHJldHVybiBjYWxsYmFjaygpXG4gICAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGZpbGUpXG4gICAgZnMuZXhpc3RzKGRpciwgZGlyRXhpc3RzID0+IHtcbiAgICAgIGlmIChkaXJFeGlzdHMpIHJldHVybiBtYWtlRmlsZSgpXG4gICAgICBta2Rpci5ta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBtYWtlRmlsZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZpbGVTeW5jIChmaWxlKSB7XG4gIGlmIChmcy5leGlzdHNTeW5jKGZpbGUpKSByZXR1cm5cblxuICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZSlcbiAgaWYgKCFmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICBta2Rpci5ta2RpcnNTeW5jKGRpcilcbiAgfVxuXG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZSwgJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVGaWxlLFxuICBjcmVhdGVGaWxlU3luYyxcbiAgLy8gYWxpYXNcbiAgZW5zdXJlRmlsZTogY3JlYXRlRmlsZSxcbiAgZW5zdXJlRmlsZVN5bmM6IGNyZWF0ZUZpbGVTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9maWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZmlsZSA9IHJlcXVpcmUoJy4vZmlsZScpXG5jb25zdCBsaW5rID0gcmVxdWlyZSgnLi9saW5rJylcbmNvbnN0IHN5bWxpbmsgPSByZXF1aXJlKCcuL3N5bWxpbmsnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gZmlsZVxuICBjcmVhdGVGaWxlOiBmaWxlLmNyZWF0ZUZpbGUsXG4gIGNyZWF0ZUZpbGVTeW5jOiBmaWxlLmNyZWF0ZUZpbGVTeW5jLFxuICBlbnN1cmVGaWxlOiBmaWxlLmNyZWF0ZUZpbGUsXG4gIGVuc3VyZUZpbGVTeW5jOiBmaWxlLmNyZWF0ZUZpbGVTeW5jLFxuICAvLyBsaW5rXG4gIGNyZWF0ZUxpbms6IGxpbmsuY3JlYXRlTGluayxcbiAgY3JlYXRlTGlua1N5bmM6IGxpbmsuY3JlYXRlTGlua1N5bmMsXG4gIGVuc3VyZUxpbms6IGxpbmsuY3JlYXRlTGluayxcbiAgZW5zdXJlTGlua1N5bmM6IGxpbmsuY3JlYXRlTGlua1N5bmMsXG4gIC8vIHN5bWxpbmtcbiAgY3JlYXRlU3ltbGluazogc3ltbGluay5jcmVhdGVTeW1saW5rLFxuICBjcmVhdGVTeW1saW5rU3luYzogc3ltbGluay5jcmVhdGVTeW1saW5rU3luYyxcbiAgZW5zdXJlU3ltbGluazogc3ltbGluay5jcmVhdGVTeW1saW5rLFxuICBlbnN1cmVTeW1saW5rU3luYzogc3ltbGluay5jcmVhdGVTeW1saW5rU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcblxuZnVuY3Rpb24gY3JlYXRlTGluayAoc3JjcGF0aCwgZHN0cGF0aCwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gbWFrZUxpbmsgKHNyY3BhdGgsIGRzdHBhdGgpIHtcbiAgICBmcy5saW5rKHNyY3BhdGgsIGRzdHBhdGgsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgY2FsbGJhY2sobnVsbClcbiAgICB9KVxuICB9XG5cbiAgZnMuZXhpc3RzKGRzdHBhdGgsIGRlc3RpbmF0aW9uRXhpc3RzID0+IHtcbiAgICBpZiAoZGVzdGluYXRpb25FeGlzdHMpIHJldHVybiBjYWxsYmFjayhudWxsKVxuICAgIGZzLmxzdGF0KHNyY3BhdGgsIChlcnIsIHN0YXQpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVMaW5rJylcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyID0gcGF0aC5kaXJuYW1lKGRzdHBhdGgpXG4gICAgICBmcy5leGlzdHMoZGlyLCBkaXJFeGlzdHMgPT4ge1xuICAgICAgICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gbWFrZUxpbmsoc3JjcGF0aCwgZHN0cGF0aClcbiAgICAgICAgbWtkaXIubWtkaXJzKGRpciwgZXJyID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgIG1ha2VMaW5rKHNyY3BhdGgsIGRzdHBhdGgpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtTeW5jIChzcmNwYXRoLCBkc3RwYXRoLCBjYWxsYmFjaykge1xuICBjb25zdCBkZXN0aW5hdGlvbkV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZHN0cGF0aClcbiAgaWYgKGRlc3RpbmF0aW9uRXhpc3RzKSByZXR1cm4gdW5kZWZpbmVkXG5cbiAgdHJ5IHtcbiAgICBmcy5sc3RhdFN5bmMoc3JjcGF0aClcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVMaW5rJylcbiAgICB0aHJvdyBlcnJcbiAgfVxuXG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICBjb25zdCBkaXJFeGlzdHMgPSBmcy5leGlzdHNTeW5jKGRpcilcbiAgaWYgKGRpckV4aXN0cykgcmV0dXJuIGZzLmxpbmtTeW5jKHNyY3BhdGgsIGRzdHBhdGgpXG4gIG1rZGlyLm1rZGlyc1N5bmMoZGlyKVxuXG4gIHJldHVybiBmcy5saW5rU3luYyhzcmNwYXRoLCBkc3RwYXRoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlTGluayxcbiAgY3JlYXRlTGlua1N5bmMsXG4gIC8vIGFsaWFzXG4gIGVuc3VyZUxpbms6IGNyZWF0ZUxpbmssXG4gIGVuc3VyZUxpbmtTeW5jOiBjcmVhdGVMaW5rU3luY1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9lbnN1cmUvbGluay5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0d28gdHlwZXMgb2YgcGF0aHMsIG9uZSByZWxhdGl2ZSB0byBzeW1saW5rLCBhbmQgb25lXG4gKiByZWxhdGl2ZSB0byB0aGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS4gQ2hlY2tzIGlmIHBhdGggaXMgYWJzb2x1dGUgb3JcbiAqIHJlbGF0aXZlLiBJZiB0aGUgcGF0aCBpcyByZWxhdGl2ZSwgdGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgdGhlIHBhdGggaXNcbiAqIHJlbGF0aXZlIHRvIHN5bWxpbmsgb3IgcmVsYXRpdmUgdG8gY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeS4gVGhpcyBpcyBhblxuICogaW5pdGlhdGl2ZSB0byBmaW5kIGEgc21hcnRlciBgc3JjcGF0aGAgdG8gc3VwcGx5IHdoZW4gYnVpbGRpbmcgc3ltbGlua3MuXG4gKiBUaGlzIGFsbG93cyB5b3UgdG8gZGV0ZXJtaW5lIHdoaWNoIHBhdGggdG8gdXNlIG91dCBvZiBvbmUgb2YgdGhyZWUgcG9zc2libGVcbiAqIHR5cGVzIG9mIHNvdXJjZSBwYXRocy4gVGhlIGZpcnN0IGlzIGFuIGFic29sdXRlIHBhdGguIFRoaXMgaXMgZGV0ZWN0ZWQgYnlcbiAqIGBwYXRoLmlzQWJzb2x1dGUoKWAuIFdoZW4gYW4gYWJzb2x1dGUgcGF0aCBpcyBwcm92aWRlZCwgaXQgaXMgY2hlY2tlZCB0b1xuICogc2VlIGlmIGl0IGV4aXN0cy4gSWYgaXQgZG9lcyBpdCdzIHVzZWQsIGlmIG5vdCBhbiBlcnJvciBpcyByZXR1cm5lZFxuICogKGNhbGxiYWNrKS8gdGhyb3duIChzeW5jKS4gVGhlIG90aGVyIHR3byBvcHRpb25zIGZvciBgc3JjcGF0aGAgYXJlIGFcbiAqIHJlbGF0aXZlIHVybC4gQnkgZGVmYXVsdCBOb2RlJ3MgYGZzLnN5bWxpbmtgIHdvcmtzIGJ5IGNyZWF0aW5nIGEgc3ltbGlua1xuICogdXNpbmcgYGRzdHBhdGhgIGFuZCBleHBlY3RzIHRoZSBgc3JjcGF0aGAgdG8gYmUgcmVsYXRpdmUgdG8gdGhlIG5ld2x5XG4gKiBjcmVhdGVkIHN5bWxpbmsuIElmIHlvdSBwcm92aWRlIGEgYHNyY3BhdGhgIHRoYXQgZG9lcyBub3QgZXhpc3Qgb24gdGhlIGZpbGVcbiAqIHN5c3RlbSBpdCByZXN1bHRzIGluIGEgYnJva2VuIHN5bWxpbmsuIFRvIG1pbmltaXplIHRoaXMsIHRoZSBmdW5jdGlvblxuICogY2hlY2tzIHRvIHNlZSBpZiB0aGUgJ3JlbGF0aXZlIHRvIHN5bWxpbmsnIHNvdXJjZSBmaWxlIGV4aXN0cywgYW5kIGlmIGl0XG4gKiBkb2VzIGl0IHdpbGwgdXNlIGl0LiBJZiBpdCBkb2VzIG5vdCwgaXQgY2hlY2tzIGlmIHRoZXJlJ3MgYSBmaWxlIHRoYXRcbiAqIGV4aXN0cyB0aGF0IGlzIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LCBpZiBkb2VzIGl0cyB1c2VkLlxuICogVGhpcyBwcmVzZXJ2ZXMgdGhlIGV4cGVjdGF0aW9ucyBvZiB0aGUgb3JpZ2luYWwgZnMuc3ltbGluayBzcGVjIGFuZCBhZGRzXG4gKiB0aGUgYWJpbGl0eSB0byBwYXNzIGluIGByZWxhdGl2ZSB0byBjdXJyZW50IHdvcmtpbmcgZGlyZWNvdHJ5YCBwYXRocy5cbiAqL1xuXG5mdW5jdGlvbiBzeW1saW5rUGF0aHMgKHNyY3BhdGgsIGRzdHBhdGgsIGNhbGxiYWNrKSB7XG4gIGlmIChwYXRoLmlzQWJzb2x1dGUoc3JjcGF0aCkpIHtcbiAgICByZXR1cm4gZnMubHN0YXQoc3JjcGF0aCwgKGVyciwgc3RhdCkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBlcnIubWVzc2FnZSA9IGVyci5tZXNzYWdlLnJlcGxhY2UoJ2xzdGF0JywgJ2Vuc3VyZVN5bWxpbmsnKVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgJ3RvQ3dkJzogc3JjcGF0aCxcbiAgICAgICAgJ3RvRHN0Jzogc3JjcGF0aFxuICAgICAgfSlcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRzdGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICAgIGNvbnN0IHJlbGF0aXZlVG9Ec3QgPSBwYXRoLmpvaW4oZHN0ZGlyLCBzcmNwYXRoKVxuICAgIHJldHVybiBmcy5leGlzdHMocmVsYXRpdmVUb0RzdCwgZXhpc3RzID0+IHtcbiAgICAgIGlmIChleGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgICAndG9Dd2QnOiByZWxhdGl2ZVRvRHN0LFxuICAgICAgICAgICd0b0RzdCc6IHNyY3BhdGhcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmcy5sc3RhdChzcmNwYXRoLCAoZXJyLCBzdGF0KSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgZXJyLm1lc3NhZ2UgPSBlcnIubWVzc2FnZS5yZXBsYWNlKCdsc3RhdCcsICdlbnN1cmVTeW1saW5rJylcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7XG4gICAgICAgICAgICAndG9Dd2QnOiBzcmNwYXRoLFxuICAgICAgICAgICAgJ3RvRHN0JzogcGF0aC5yZWxhdGl2ZShkc3RkaXIsIHNyY3BhdGgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHN5bWxpbmtQYXRoc1N5bmMgKHNyY3BhdGgsIGRzdHBhdGgpIHtcbiAgbGV0IGV4aXN0c1xuICBpZiAocGF0aC5pc0Fic29sdXRlKHNyY3BhdGgpKSB7XG4gICAgZXhpc3RzID0gZnMuZXhpc3RzU3luYyhzcmNwYXRoKVxuICAgIGlmICghZXhpc3RzKSB0aHJvdyBuZXcgRXJyb3IoJ2Fic29sdXRlIHNyY3BhdGggZG9lcyBub3QgZXhpc3QnKVxuICAgIHJldHVybiB7XG4gICAgICAndG9Dd2QnOiBzcmNwYXRoLFxuICAgICAgJ3RvRHN0Jzogc3JjcGF0aFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkc3RkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgICBjb25zdCByZWxhdGl2ZVRvRHN0ID0gcGF0aC5qb2luKGRzdGRpciwgc3JjcGF0aClcbiAgICBleGlzdHMgPSBmcy5leGlzdHNTeW5jKHJlbGF0aXZlVG9Ec3QpXG4gICAgaWYgKGV4aXN0cykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3RvQ3dkJzogcmVsYXRpdmVUb0RzdCxcbiAgICAgICAgJ3RvRHN0Jzogc3JjcGF0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdHMgPSBmcy5leGlzdHNTeW5jKHNyY3BhdGgpXG4gICAgICBpZiAoIWV4aXN0cykgdGhyb3cgbmV3IEVycm9yKCdyZWxhdGl2ZSBzcmNwYXRoIGRvZXMgbm90IGV4aXN0JylcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd0b0N3ZCc6IHNyY3BhdGgsXG4gICAgICAgICd0b0RzdCc6IHBhdGgucmVsYXRpdmUoZHN0ZGlyLCBzcmNwYXRoKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3ltbGlua1BhdGhzLFxuICBzeW1saW5rUGF0aHNTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9zeW1saW5rLXBhdGhzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5cbmZ1bmN0aW9uIHN5bWxpbmtUeXBlIChzcmNwYXRoLCB0eXBlLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyB0eXBlIDogY2FsbGJhY2tcbiAgdHlwZSA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyBmYWxzZSA6IHR5cGVcbiAgaWYgKHR5cGUpIHJldHVybiBjYWxsYmFjayhudWxsLCB0eXBlKVxuICBmcy5sc3RhdChzcmNwYXRoLCAoZXJyLCBzdGF0cykgPT4ge1xuICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhudWxsLCAnZmlsZScpXG4gICAgdHlwZSA9IChzdGF0cyAmJiBzdGF0cy5pc0RpcmVjdG9yeSgpKSA/ICdkaXInIDogJ2ZpbGUnXG4gICAgY2FsbGJhY2sobnVsbCwgdHlwZSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3ltbGlua1R5cGVTeW5jIChzcmNwYXRoLCB0eXBlKSB7XG4gIGxldCBzdGF0c1xuXG4gIGlmICh0eXBlKSByZXR1cm4gdHlwZVxuICB0cnkge1xuICAgIHN0YXRzID0gZnMubHN0YXRTeW5jKHNyY3BhdGgpXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gJ2ZpbGUnXG4gIH1cbiAgcmV0dXJuIChzdGF0cyAmJiBzdGF0cy5pc0RpcmVjdG9yeSgpKSA/ICdkaXInIDogJ2ZpbGUnXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzeW1saW5rVHlwZSxcbiAgc3ltbGlua1R5cGVTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL2Vuc3VyZS9zeW1saW5rLXR5cGUuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IF9ta2RpcnMgPSByZXF1aXJlKCcuLi9ta2RpcnMnKVxuY29uc3QgbWtkaXJzID0gX21rZGlycy5ta2RpcnNcbmNvbnN0IG1rZGlyc1N5bmMgPSBfbWtkaXJzLm1rZGlyc1N5bmNcblxuY29uc3QgX3N5bWxpbmtQYXRocyA9IHJlcXVpcmUoJy4vc3ltbGluay1wYXRocycpXG5jb25zdCBzeW1saW5rUGF0aHMgPSBfc3ltbGlua1BhdGhzLnN5bWxpbmtQYXRoc1xuY29uc3Qgc3ltbGlua1BhdGhzU3luYyA9IF9zeW1saW5rUGF0aHMuc3ltbGlua1BhdGhzU3luY1xuXG5jb25zdCBfc3ltbGlua1R5cGUgPSByZXF1aXJlKCcuL3N5bWxpbmstdHlwZScpXG5jb25zdCBzeW1saW5rVHlwZSA9IF9zeW1saW5rVHlwZS5zeW1saW5rVHlwZVxuY29uc3Qgc3ltbGlua1R5cGVTeW5jID0gX3N5bWxpbmtUeXBlLnN5bWxpbmtUeXBlU3luY1xuXG5mdW5jdGlvbiBjcmVhdGVTeW1saW5rIChzcmNwYXRoLCBkc3RwYXRoLCB0eXBlLCBjYWxsYmFjaykge1xuICBjYWxsYmFjayA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyB0eXBlIDogY2FsbGJhY2tcbiAgdHlwZSA9ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykgPyBmYWxzZSA6IHR5cGVcblxuICBmcy5leGlzdHMoZHN0cGF0aCwgZGVzdGluYXRpb25FeGlzdHMgPT4ge1xuICAgIGlmIChkZXN0aW5hdGlvbkV4aXN0cykgcmV0dXJuIGNhbGxiYWNrKG51bGwpXG4gICAgc3ltbGlua1BhdGhzKHNyY3BhdGgsIGRzdHBhdGgsIChlcnIsIHJlbGF0aXZlKSA9PiB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgc3JjcGF0aCA9IHJlbGF0aXZlLnRvRHN0XG4gICAgICBzeW1saW5rVHlwZShyZWxhdGl2ZS50b0N3ZCwgdHlwZSwgKGVyciwgdHlwZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoZHN0cGF0aClcbiAgICAgICAgZnMuZXhpc3RzKGRpciwgZGlyRXhpc3RzID0+IHtcbiAgICAgICAgICBpZiAoZGlyRXhpc3RzKSByZXR1cm4gZnMuc3ltbGluayhzcmNwYXRoLCBkc3RwYXRoLCB0eXBlLCBjYWxsYmFjaylcbiAgICAgICAgICBta2RpcnMoZGlyLCBlcnIgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIGZzLnN5bWxpbmsoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSwgY2FsbGJhY2spXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3ltbGlua1N5bmMgKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrID0gKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSA/IHR5cGUgOiBjYWxsYmFja1xuICB0eXBlID0gKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSA/IGZhbHNlIDogdHlwZVxuXG4gIGNvbnN0IGRlc3RpbmF0aW9uRXhpc3RzID0gZnMuZXhpc3RzU3luYyhkc3RwYXRoKVxuICBpZiAoZGVzdGluYXRpb25FeGlzdHMpIHJldHVybiB1bmRlZmluZWRcblxuICBjb25zdCByZWxhdGl2ZSA9IHN5bWxpbmtQYXRoc1N5bmMoc3JjcGF0aCwgZHN0cGF0aClcbiAgc3JjcGF0aCA9IHJlbGF0aXZlLnRvRHN0XG4gIHR5cGUgPSBzeW1saW5rVHlwZVN5bmMocmVsYXRpdmUudG9Dd2QsIHR5cGUpXG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShkc3RwYXRoKVxuICBjb25zdCBleGlzdHMgPSBmcy5leGlzdHNTeW5jKGRpcilcbiAgaWYgKGV4aXN0cykgcmV0dXJuIGZzLnN5bWxpbmtTeW5jKHNyY3BhdGgsIGRzdHBhdGgsIHR5cGUpXG4gIG1rZGlyc1N5bmMoZGlyKVxuICByZXR1cm4gZnMuc3ltbGlua1N5bmMoc3JjcGF0aCwgZHN0cGF0aCwgdHlwZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZVN5bWxpbmssXG4gIGNyZWF0ZVN5bWxpbmtTeW5jLFxuICAvLyBhbGlhc1xuICBlbnN1cmVTeW1saW5rOiBjcmVhdGVTeW1saW5rLFxuICBlbnN1cmVTeW1saW5rU3luYzogY3JlYXRlU3ltbGlua1N5bmNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvZW5zdXJlL3N5bWxpbmsuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuL3V0aWwvYXNzaWduJylcblxuY29uc3QgZnNlID0ge31cbmNvbnN0IGdmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcblxuLy8gYXR0YWNoIGZzIG1ldGhvZHMgdG8gZnNlXG5PYmplY3Qua2V5cyhnZnMpLmZvckVhY2goa2V5ID0+IHtcbiAgZnNlW2tleV0gPSBnZnNba2V5XVxufSlcblxuY29uc3QgZnMgPSBmc2VcblxuYXNzaWduKGZzLCByZXF1aXJlKCcuL2NvcHknKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9jb3B5LXN5bmMnKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9ta2RpcnMnKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9yZW1vdmUnKSlcbmFzc2lnbihmcywgcmVxdWlyZSgnLi9qc29uJykpXG5hc3NpZ24oZnMsIHJlcXVpcmUoJy4vbW92ZScpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL21vdmUtc3luYycpKVxuYXNzaWduKGZzLCByZXF1aXJlKCcuL2VtcHR5JykpXG5hc3NpZ24oZnMsIHJlcXVpcmUoJy4vZW5zdXJlJykpXG5hc3NpZ24oZnMsIHJlcXVpcmUoJy4vb3V0cHV0JykpXG5cbm1vZHVsZS5leHBvcnRzID0gZnNcblxuLy8gbWFpbnRhaW4gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgZm9yIGF3aGlsZVxuY29uc3QganNvbmZpbGUgPSB7fVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGpzb25maWxlLCAnc3BhY2VzJywge1xuICBnZXQ6ICgpID0+IGZzLnNwYWNlcywgLy8gZm91bmQgaW4gLi9qc29uXG4gIHNldDogdmFsID0+IHtcbiAgICBmcy5zcGFjZXMgPSB2YWxcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMuanNvbmZpbGUgPSBqc29uZmlsZSAvLyBzbyB1c2VycyBvZiBmcy1leHRyYSBjYW4gbW9kaWZ5IGpzb25GaWxlLnNwYWNlc1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGpzb25GaWxlID0gcmVxdWlyZSgnLi9qc29uZmlsZScpXG5cbmpzb25GaWxlLm91dHB1dEpzb25TeW5jID0gcmVxdWlyZSgnLi9vdXRwdXQtanNvbi1zeW5jJylcbmpzb25GaWxlLm91dHB1dEpzb24gPSByZXF1aXJlKCcuL291dHB1dC1qc29uJylcbi8vIGFsaWFzZXNcbmpzb25GaWxlLm91dHB1dEpTT05TeW5jID0gcmVxdWlyZSgnLi9vdXRwdXQtanNvbi1zeW5jJylcbmpzb25GaWxlLm91dHB1dEpTT04gPSByZXF1aXJlKCcuL291dHB1dC1qc29uJylcblxubW9kdWxlLmV4cG9ydHMgPSBqc29uRmlsZVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi9qc29uL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBjb3B5U3luYyA9IHJlcXVpcmUoJy4uL2NvcHktc3luYycpLmNvcHlTeW5jXG5jb25zdCByZW1vdmVTeW5jID0gcmVxdWlyZSgnLi4vcmVtb3ZlJykucmVtb3ZlU3luY1xuY29uc3QgbWtkaXJwU3luYyA9IHJlcXVpcmUoJy4uL21rZGlycycpLm1rZGlyc1N5bmNcblxuZnVuY3Rpb24gbW92ZVN5bmMgKHNyYywgZGVzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICBjb25zdCBvdmVyd3JpdGUgPSBvcHRpb25zLm92ZXJ3cml0ZSB8fCBvcHRpb25zLmNsb2JiZXIgfHwgZmFsc2VcblxuICBzcmMgPSBwYXRoLnJlc29sdmUoc3JjKVxuICBkZXN0ID0gcGF0aC5yZXNvbHZlKGRlc3QpXG5cbiAgaWYgKHNyYyA9PT0gZGVzdCkgcmV0dXJuXG5cbiAgaWYgKGlzU3JjU3ViZGlyKHNyYywgZGVzdCkpIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IG1vdmUgJyR7c3JjfScgaW50byBpdHNlbGYgJyR7ZGVzdH0nLmApXG5cbiAgbWtkaXJwU3luYyhwYXRoLmRpcm5hbWUoZGVzdCkpXG4gIHRyeVJlbmFtZVN5bmMoKVxuXG4gIGZ1bmN0aW9uIHRyeVJlbmFtZVN5bmMgKCkge1xuICAgIGlmIChvdmVyd3JpdGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmcy5yZW5hbWVTeW5jKHNyYywgZGVzdClcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFTk9URU1QVFknIHx8IGVyci5jb2RlID09PSAnRUVYSVNUJyB8fCBlcnIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgICAgIHJlbW92ZVN5bmMoZGVzdClcbiAgICAgICAgICBvcHRpb25zLm92ZXJ3cml0ZSA9IGZhbHNlIC8vIGp1c3Qgb3ZlcndyaXRlZWQgaXQsIG5vIG5lZWQgdG8gZG8gaXQgYWdhaW5cbiAgICAgICAgICByZXR1cm4gbW92ZVN5bmMoc3JjLCBkZXN0LCBvcHRpb25zKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVyci5jb2RlICE9PSAnRVhERVYnKSB0aHJvdyBlcnJcbiAgICAgICAgcmV0dXJuIG1vdmVTeW5jQWNyb3NzRGV2aWNlKHNyYywgZGVzdCwgb3ZlcndyaXRlKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICBmcy5saW5rU3luYyhzcmMsIGRlc3QpXG4gICAgICAgIHJldHVybiBmcy51bmxpbmtTeW5jKHNyYylcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFWERFVicgfHwgZXJyLmNvZGUgPT09ICdFSVNESVInIHx8IGVyci5jb2RlID09PSAnRVBFUk0nIHx8IGVyci5jb2RlID09PSAnRU5PVFNVUCcpIHtcbiAgICAgICAgICByZXR1cm4gbW92ZVN5bmNBY3Jvc3NEZXZpY2Uoc3JjLCBkZXN0LCBvdmVyd3JpdGUpXG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVTeW5jQWNyb3NzRGV2aWNlIChzcmMsIGRlc3QsIG92ZXJ3cml0ZSkge1xuICBjb25zdCBzdGF0ID0gZnMuc3RhdFN5bmMoc3JjKVxuXG4gIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICByZXR1cm4gbW92ZURpclN5bmNBY3Jvc3NEZXZpY2Uoc3JjLCBkZXN0LCBvdmVyd3JpdGUpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG1vdmVGaWxlU3luY0Fjcm9zc0RldmljZShzcmMsIGRlc3QsIG92ZXJ3cml0ZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlRmlsZVN5bmNBY3Jvc3NEZXZpY2UgKHNyYywgZGVzdCwgb3ZlcndyaXRlKSB7XG4gIGNvbnN0IEJVRl9MRU5HVEggPSA2NCAqIDEwMjRcbiAgY29uc3QgX2J1ZmYgPSBuZXcgQnVmZmVyKEJVRl9MRU5HVEgpXG5cbiAgY29uc3QgZmxhZ3MgPSBvdmVyd3JpdGUgPyAndycgOiAnd3gnXG5cbiAgY29uc3QgZmRyID0gZnMub3BlblN5bmMoc3JjLCAncicpXG4gIGNvbnN0IHN0YXQgPSBmcy5mc3RhdFN5bmMoZmRyKVxuICBjb25zdCBmZHcgPSBmcy5vcGVuU3luYyhkZXN0LCBmbGFncywgc3RhdC5tb2RlKVxuICBsZXQgYnl0ZXNSZWFkID0gMVxuICBsZXQgcG9zID0gMFxuXG4gIHdoaWxlIChieXRlc1JlYWQgPiAwKSB7XG4gICAgYnl0ZXNSZWFkID0gZnMucmVhZFN5bmMoZmRyLCBfYnVmZiwgMCwgQlVGX0xFTkdUSCwgcG9zKVxuICAgIGZzLndyaXRlU3luYyhmZHcsIF9idWZmLCAwLCBieXRlc1JlYWQpXG4gICAgcG9zICs9IGJ5dGVzUmVhZFxuICB9XG5cbiAgZnMuY2xvc2VTeW5jKGZkcilcbiAgZnMuY2xvc2VTeW5jKGZkdylcbiAgcmV0dXJuIGZzLnVubGlua1N5bmMoc3JjKVxufVxuXG5mdW5jdGlvbiBtb3ZlRGlyU3luY0Fjcm9zc0RldmljZSAoc3JjLCBkZXN0LCBvdmVyd3JpdGUpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBvdmVyd3JpdGU6IGZhbHNlXG4gIH1cblxuICBpZiAob3ZlcndyaXRlKSB7XG4gICAgcmVtb3ZlU3luYyhkZXN0KVxuICAgIHRyeUNvcHlTeW5jKClcbiAgfSBlbHNlIHtcbiAgICB0cnlDb3B5U3luYygpXG4gIH1cblxuICBmdW5jdGlvbiB0cnlDb3B5U3luYyAoKSB7XG4gICAgY29weVN5bmMoc3JjLCBkZXN0LCBvcHRpb25zKVxuICAgIHJldHVybiByZW1vdmVTeW5jKHNyYylcbiAgfVxufVxuXG4vLyByZXR1cm4gdHJ1ZSBpZiBkZXN0IGlzIGEgc3ViZGlyIG9mIHNyYywgb3RoZXJ3aXNlIGZhbHNlLlxuLy8gZXh0cmFjdCBkZXN0IGJhc2UgZGlyIGFuZCBjaGVjayBpZiB0aGF0IGlzIHRoZSBzYW1lIGFzIHNyYyBiYXNlbmFtZVxuZnVuY3Rpb24gaXNTcmNTdWJkaXIgKHNyYywgZGVzdCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcy5zdGF0U3luYyhzcmMpLmlzRGlyZWN0b3J5KCkgJiZcbiAgICAgICAgICAgc3JjICE9PSBkZXN0ICYmXG4gICAgICAgICAgIGRlc3QuaW5kZXhPZihzcmMpID4gLTEgJiZcbiAgICAgICAgICAgZGVzdC5zcGxpdChwYXRoLmRpcm5hbWUoc3JjKSArIHBhdGguc2VwKVsxXS5zcGxpdChwYXRoLnNlcClbMF0gPT09IHBhdGguYmFzZW5hbWUoc3JjKVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1vdmVTeW5jXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL21vdmUtc3luYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbi8vIG1vc3Qgb2YgdGhpcyBjb2RlIHdhcyB3cml0dGVuIGJ5IEFuZHJldyBLZWxsZXlcbi8vIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0QgbGljZW5zZTogc2VlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYW5kcmV3cmsvbm9kZS1tdi9ibG9iL21hc3Rlci9wYWNrYWdlLmpzb25cblxuLy8gdGhpcyBuZWVkcyBhIGNsZWFudXBcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBuY3AgPSByZXF1aXJlKCcuLi9jb3B5L25jcCcpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCByZW1vdmUgPSByZXF1aXJlKCcuLi9yZW1vdmUnKS5yZW1vdmVcbmNvbnN0IG1rZGlycCA9IHJlcXVpcmUoJy4uL21rZGlycycpLm1rZGlyc1xuXG5mdW5jdGlvbiBtb3ZlIChzb3VyY2UsIGRlc3QsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgIG9wdGlvbnMgPSB7fVxuICB9XG5cbiAgY29uc3Qgc2hvdWxkTWtkaXJwID0gKCdta2RpcnAnIGluIG9wdGlvbnMpID8gb3B0aW9ucy5ta2RpcnAgOiB0cnVlXG4gIGNvbnN0IG92ZXJ3cml0ZSA9IG9wdGlvbnMub3ZlcndyaXRlIHx8IG9wdGlvbnMuY2xvYmJlciB8fCBmYWxzZVxuXG4gIGlmIChzaG91bGRNa2RpcnApIHtcbiAgICBta2RpcnMoKVxuICB9IGVsc2Uge1xuICAgIGRvUmVuYW1lKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG1rZGlycyAoKSB7XG4gICAgbWtkaXJwKHBhdGguZGlybmFtZShkZXN0KSwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBkb1JlbmFtZSgpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvUmVuYW1lICgpIHtcbiAgICBpZiAocGF0aC5yZXNvbHZlKHNvdXJjZSkgPT09IHBhdGgucmVzb2x2ZShkZXN0KSkge1xuICAgICAgc2V0SW1tZWRpYXRlKGNhbGxiYWNrKVxuICAgIH0gZWxzZSBpZiAob3ZlcndyaXRlKSB7XG4gICAgICBmcy5yZW5hbWUoc291cmNlLCBkZXN0LCBlcnIgPT4ge1xuICAgICAgICBpZiAoIWVycikgcmV0dXJuIGNhbGxiYWNrKClcblxuICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFTk9URU1QVFknIHx8IGVyci5jb2RlID09PSAnRUVYSVNUJykge1xuICAgICAgICAgIHJlbW92ZShkZXN0LCBlcnIgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIG9wdGlvbnMub3ZlcndyaXRlID0gZmFsc2UgLy8ganVzdCBvdmVyd3JpdGVlZCBpdCwgbm8gbmVlZCB0byBkbyBpdCBhZ2FpblxuICAgICAgICAgICAgbW92ZShzb3VyY2UsIGRlc3QsIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyB3ZWlyZCBXaW5kb3dzIHNoaXRcbiAgICAgICAgaWYgKGVyci5jb2RlID09PSAnRVBFUk0nKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmUoZGVzdCwgZXJyID0+IHtcbiAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgICAgb3B0aW9ucy5vdmVyd3JpdGUgPSBmYWxzZVxuICAgICAgICAgICAgICBtb3ZlKHNvdXJjZSwgZGVzdCwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sIDIwMClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VYREVWJykgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICAgICAgbW92ZUFjcm9zc0RldmljZShzb3VyY2UsIGRlc3QsIG92ZXJ3cml0ZSwgY2FsbGJhY2spXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBmcy5saW5rKHNvdXJjZSwgZGVzdCwgZXJyID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VYREVWJyB8fCBlcnIuY29kZSA9PT0gJ0VJU0RJUicgfHwgZXJyLmNvZGUgPT09ICdFUEVSTScgfHwgZXJyLmNvZGUgPT09ICdFTk9UU1VQJykge1xuICAgICAgICAgICAgbW92ZUFjcm9zc0RldmljZShzb3VyY2UsIGRlc3QsIG92ZXJ3cml0ZSwgY2FsbGJhY2spXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgICAgY2FsbGJhY2soZXJyKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGZzLnVubGluayhzb3VyY2UsIGNhbGxiYWNrKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZUFjcm9zc0RldmljZSAoc291cmNlLCBkZXN0LCBvdmVyd3JpdGUsIGNhbGxiYWNrKSB7XG4gIGZzLnN0YXQoc291cmNlLCAoZXJyLCBzdGF0KSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgY2FsbGJhY2soZXJyKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgbW92ZURpckFjcm9zc0RldmljZShzb3VyY2UsIGRlc3QsIG92ZXJ3cml0ZSwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdmVGaWxlQWNyb3NzRGV2aWNlKHNvdXJjZSwgZGVzdCwgb3ZlcndyaXRlLCBjYWxsYmFjaylcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIG1vdmVGaWxlQWNyb3NzRGV2aWNlIChzb3VyY2UsIGRlc3QsIG92ZXJ3cml0ZSwgY2FsbGJhY2spIHtcbiAgY29uc3QgZmxhZ3MgPSBvdmVyd3JpdGUgPyAndycgOiAnd3gnXG4gIGNvbnN0IGlucyA9IGZzLmNyZWF0ZVJlYWRTdHJlYW0oc291cmNlKVxuICBjb25zdCBvdXRzID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdCwgeyBmbGFncyB9KVxuXG4gIGlucy5vbignZXJyb3InLCBlcnIgPT4ge1xuICAgIGlucy5kZXN0cm95KClcbiAgICBvdXRzLmRlc3Ryb3koKVxuICAgIG91dHMucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25DbG9zZSlcblxuICAgIC8vIG1heSB3YW50IHRvIGNyZWF0ZSBhIGRpcmVjdG9yeSBidXQgYG91dGAgbGluZSBhYm92ZVxuICAgIC8vIGNyZWF0ZXMgYW4gZW1wdHkgZmlsZSBmb3IgdXM6IFNlZSAjMTA4XG4gICAgLy8gZG9uJ3QgY2FyZSBhYm91dCBlcnJvciBoZXJlXG4gICAgZnMudW5saW5rKGRlc3QsICgpID0+IHtcbiAgICAgIC8vIG5vdGU6IGBlcnJgIGhlcmUgaXMgZnJvbSB0aGUgaW5wdXQgc3RyZWFtIGVycnJvclxuICAgICAgaWYgKGVyci5jb2RlID09PSAnRUlTRElSJyB8fCBlcnIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgICBtb3ZlRGlyQWNyb3NzRGV2aWNlKHNvdXJjZSwgZGVzdCwgb3ZlcndyaXRlLCBjYWxsYmFjaylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrKGVycilcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIG91dHMub24oJ2Vycm9yJywgZXJyID0+IHtcbiAgICBpbnMuZGVzdHJveSgpXG4gICAgb3V0cy5kZXN0cm95KClcbiAgICBvdXRzLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uQ2xvc2UpXG4gICAgY2FsbGJhY2soZXJyKVxuICB9KVxuXG4gIG91dHMub25jZSgnY2xvc2UnLCBvbkNsb3NlKVxuICBpbnMucGlwZShvdXRzKVxuXG4gIGZ1bmN0aW9uIG9uQ2xvc2UgKCkge1xuICAgIGZzLnVubGluayhzb3VyY2UsIGNhbGxiYWNrKVxuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVEaXJBY3Jvc3NEZXZpY2UgKHNvdXJjZSwgZGVzdCwgb3ZlcndyaXRlLCBjYWxsYmFjaykge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIG92ZXJ3cml0ZTogZmFsc2VcbiAgfVxuXG4gIGlmIChvdmVyd3JpdGUpIHtcbiAgICByZW1vdmUoZGVzdCwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBzdGFydE5jcCgpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBzdGFydE5jcCgpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydE5jcCAoKSB7XG4gICAgbmNwKHNvdXJjZSwgZGVzdCwgb3B0aW9ucywgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICByZW1vdmUoc291cmNlLCBjYWxsYmFjaylcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtb3ZlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL21vdmUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IG1rZGlyID0gcmVxdWlyZSgnLi4vbWtkaXJzJylcblxuZnVuY3Rpb24gb3V0cHV0RmlsZSAoZmlsZSwgZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuICBmcy5leGlzdHMoZGlyLCBpdERvZXMgPT4ge1xuICAgIGlmIChpdERvZXMpIHJldHVybiBmcy53cml0ZUZpbGUoZmlsZSwgZGF0YSwgZW5jb2RpbmcsIGNhbGxiYWNrKVxuXG4gICAgbWtkaXIubWtkaXJzKGRpciwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG5cbiAgICAgIGZzLndyaXRlRmlsZShmaWxlLCBkYXRhLCBlbmNvZGluZywgY2FsbGJhY2spXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gb3V0cHV0RmlsZVN5bmMgKGZpbGUsIGRhdGEsIGVuY29kaW5nKSB7XG4gIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKVxuICBpZiAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgcmV0dXJuIGZzLndyaXRlRmlsZVN5bmMuYXBwbHkoZnMsIGFyZ3VtZW50cylcbiAgfVxuICBta2Rpci5ta2RpcnNTeW5jKGRpcilcbiAgZnMud3JpdGVGaWxlU3luYy5hcHBseShmcywgYXJndW1lbnRzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb3V0cHV0RmlsZSxcbiAgb3V0cHV0RmlsZVN5bmNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvb3V0cHV0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgZnMgPSByZXF1aXJlKCdncmFjZWZ1bC1mcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5jb25zdCBpc1dpbmRvd3MgPSAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJylcblxuZnVuY3Rpb24gZGVmYXVsdHMgKG9wdGlvbnMpIHtcbiAgY29uc3QgbWV0aG9kcyA9IFtcbiAgICAndW5saW5rJyxcbiAgICAnY2htb2QnLFxuICAgICdzdGF0JyxcbiAgICAnbHN0YXQnLFxuICAgICdybWRpcicsXG4gICAgJ3JlYWRkaXInXG4gIF1cbiAgbWV0aG9kcy5mb3JFYWNoKG0gPT4ge1xuICAgIG9wdGlvbnNbbV0gPSBvcHRpb25zW21dIHx8IGZzW21dXG4gICAgbSA9IG0gKyAnU3luYydcbiAgICBvcHRpb25zW21dID0gb3B0aW9uc1ttXSB8fCBmc1ttXVxuICB9KVxuXG4gIG9wdGlvbnMubWF4QnVzeVRyaWVzID0gb3B0aW9ucy5tYXhCdXN5VHJpZXMgfHwgM1xufVxuXG5mdW5jdGlvbiByaW1yYWYgKHAsIG9wdGlvbnMsIGNiKSB7XG4gIGxldCBidXN5VHJpZXMgPSAwXG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICBhc3NlcnQocCwgJ3JpbXJhZjogbWlzc2luZyBwYXRoJylcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBwLCAnc3RyaW5nJywgJ3JpbXJhZjogcGF0aCBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAncmltcmFmOiBjYWxsYmFjayBmdW5jdGlvbiByZXF1aXJlZCcpXG4gIGFzc2VydChvcHRpb25zLCAncmltcmFmOiBpbnZhbGlkIG9wdGlvbnMgYXJndW1lbnQgcHJvdmlkZWQnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIG9wdGlvbnMsICdvYmplY3QnLCAncmltcmFmOiBvcHRpb25zIHNob3VsZCBiZSBvYmplY3QnKVxuXG4gIGRlZmF1bHRzKG9wdGlvbnMpXG5cbiAgcmltcmFmXyhwLCBvcHRpb25zLCBmdW5jdGlvbiBDQiAoZXIpIHtcbiAgICBpZiAoZXIpIHtcbiAgICAgIGlmIChpc1dpbmRvd3MgJiYgKGVyLmNvZGUgPT09ICdFQlVTWScgfHwgZXIuY29kZSA9PT0gJ0VOT1RFTVBUWScgfHwgZXIuY29kZSA9PT0gJ0VQRVJNJykgJiZcbiAgICAgICAgICBidXN5VHJpZXMgPCBvcHRpb25zLm1heEJ1c3lUcmllcykge1xuICAgICAgICBidXN5VHJpZXMrK1xuICAgICAgICBsZXQgdGltZSA9IGJ1c3lUcmllcyAqIDEwMFxuICAgICAgICAvLyB0cnkgYWdhaW4sIHdpdGggdGhlIHNhbWUgZXhhY3QgY2FsbGJhY2sgYXMgdGhpcyBvbmUuXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IHJpbXJhZl8ocCwgb3B0aW9ucywgQ0IpLCB0aW1lKVxuICAgICAgfVxuXG4gICAgICAvLyBhbHJlYWR5IGdvbmVcbiAgICAgIGlmIChlci5jb2RlID09PSAnRU5PRU5UJykgZXIgPSBudWxsXG4gICAgfVxuXG4gICAgY2IoZXIpXG4gIH0pXG59XG5cbi8vIFR3byBwb3NzaWJsZSBzdHJhdGVnaWVzLlxuLy8gMS4gQXNzdW1lIGl0J3MgYSBmaWxlLiAgdW5saW5rIGl0LCB0aGVuIGRvIHRoZSBkaXIgc3R1ZmYgb24gRVBFUk0gb3IgRUlTRElSXG4vLyAyLiBBc3N1bWUgaXQncyBhIGRpcmVjdG9yeS4gIHJlYWRkaXIsIHRoZW4gZG8gdGhlIGZpbGUgc3R1ZmYgb24gRU5PVERJUlxuLy9cbi8vIEJvdGggcmVzdWx0IGluIGFuIGV4dHJhIHN5c2NhbGwgd2hlbiB5b3UgZ3Vlc3Mgd3JvbmcuICBIb3dldmVyLCB0aGVyZVxuLy8gYXJlIGxpa2VseSBmYXIgbW9yZSBub3JtYWwgZmlsZXMgaW4gdGhlIHdvcmxkIHRoYW4gZGlyZWN0b3JpZXMuICBUaGlzXG4vLyBpcyBiYXNlZCBvbiB0aGUgYXNzdW1wdGlvbiB0aGF0IGEgdGhlIGF2ZXJhZ2UgbnVtYmVyIG9mIGZpbGVzIHBlclxuLy8gZGlyZWN0b3J5IGlzID49IDEuXG4vL1xuLy8gSWYgYW55b25lIGV2ZXIgY29tcGxhaW5zIGFib3V0IHRoaXMsIHRoZW4gSSBndWVzcyB0aGUgc3RyYXRlZ3kgY291bGRcbi8vIGJlIG1hZGUgY29uZmlndXJhYmxlIHNvbWVob3cuICBCdXQgdW50aWwgdGhlbiwgWUFHTkkuXG5mdW5jdGlvbiByaW1yYWZfIChwLCBvcHRpb25zLCBjYikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgLy8gc3Vub3MgbGV0cyB0aGUgcm9vdCB1c2VyIHVubGluayBkaXJlY3Rvcmllcywgd2hpY2ggaXMuLi4gd2VpcmQuXG4gIC8vIHNvIHdlIGhhdmUgdG8gbHN0YXQgaGVyZSBhbmQgbWFrZSBzdXJlIGl0J3Mgbm90IGEgZGlyLlxuICBvcHRpb25zLmxzdGF0KHAsIChlciwgc3QpID0+IHtcbiAgICBpZiAoZXIgJiYgZXIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcbiAgICAgIHJldHVybiBjYihudWxsKVxuICAgIH1cblxuICAgIC8vIFdpbmRvd3MgY2FuIEVQRVJNIG9uIHN0YXQuICBMaWZlIGlzIHN1ZmZlcmluZy5cbiAgICBpZiAoZXIgJiYgZXIuY29kZSA9PT0gJ0VQRVJNJyAmJiBpc1dpbmRvd3MpIHtcbiAgICAgIHJldHVybiBmaXhXaW5FUEVSTShwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgfVxuXG4gICAgaWYgKHN0ICYmIHN0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIHJldHVybiBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgfVxuXG4gICAgb3B0aW9ucy51bmxpbmsocCwgZXIgPT4ge1xuICAgICAgaWYgKGVyKSB7XG4gICAgICAgIGlmIChlci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgICAgIHJldHVybiBjYihudWxsKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlci5jb2RlID09PSAnRVBFUk0nKSB7XG4gICAgICAgICAgcmV0dXJuIChpc1dpbmRvd3MpXG4gICAgICAgICAgICA/IGZpeFdpbkVQRVJNKHAsIG9wdGlvbnMsIGVyLCBjYilcbiAgICAgICAgICAgIDogcm1kaXIocCwgb3B0aW9ucywgZXIsIGNiKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlci5jb2RlID09PSAnRUlTRElSJykge1xuICAgICAgICAgIHJldHVybiBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjYihlcilcbiAgICB9KVxuICB9KVxufVxuXG5mdW5jdGlvbiBmaXhXaW5FUEVSTSAocCwgb3B0aW9ucywgZXIsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgYXNzZXJ0KHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJylcbiAgaWYgKGVyKSB7XG4gICAgYXNzZXJ0KGVyIGluc3RhbmNlb2YgRXJyb3IpXG4gIH1cblxuICBvcHRpb25zLmNobW9kKHAsIDY2NiwgZXIyID0+IHtcbiAgICBpZiAoZXIyKSB7XG4gICAgICBjYihlcjIuY29kZSA9PT0gJ0VOT0VOVCcgPyBudWxsIDogZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMuc3RhdChwLCAoZXIzLCBzdGF0cykgPT4ge1xuICAgICAgICBpZiAoZXIzKSB7XG4gICAgICAgICAgY2IoZXIzLmNvZGUgPT09ICdFTk9FTlQnID8gbnVsbCA6IGVyKVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICBybWRpcihwLCBvcHRpb25zLCBlciwgY2IpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy51bmxpbmsocCwgY2IpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBmaXhXaW5FUEVSTVN5bmMgKHAsIG9wdGlvbnMsIGVyKSB7XG4gIGxldCBzdGF0c1xuXG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgaWYgKGVyKSB7XG4gICAgYXNzZXJ0KGVyIGluc3RhbmNlb2YgRXJyb3IpXG4gIH1cblxuICB0cnkge1xuICAgIG9wdGlvbnMuY2htb2RTeW5jKHAsIDY2NilcbiAgfSBjYXRjaCAoZXIyKSB7XG4gICAgaWYgKGVyMi5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBzdGF0cyA9IG9wdGlvbnMuc3RhdFN5bmMocClcbiAgfSBjYXRjaCAoZXIzKSB7XG4gICAgaWYgKGVyMy5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICBybWRpclN5bmMocCwgb3B0aW9ucywgZXIpXG4gIH0gZWxzZSB7XG4gICAgb3B0aW9ucy51bmxpbmtTeW5jKHApXG4gIH1cbn1cblxuZnVuY3Rpb24gcm1kaXIgKHAsIG9wdGlvbnMsIG9yaWdpbmFsRXIsIGNiKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgaWYgKG9yaWdpbmFsRXIpIHtcbiAgICBhc3NlcnQob3JpZ2luYWxFciBpbnN0YW5jZW9mIEVycm9yKVxuICB9XG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgLy8gdHJ5IHRvIHJtZGlyIGZpcnN0LCBhbmQgb25seSByZWFkZGlyIG9uIEVOT1RFTVBUWSBvciBFRVhJU1QgKFN1bk9TKVxuICAvLyBpZiB3ZSBndWVzc2VkIHdyb25nLCBhbmQgaXQncyBub3QgYSBkaXJlY3RvcnksIHRoZW5cbiAgLy8gcmFpc2UgdGhlIG9yaWdpbmFsIGVycm9yLlxuICBvcHRpb25zLnJtZGlyKHAsIGVyID0+IHtcbiAgICBpZiAoZXIgJiYgKGVyLmNvZGUgPT09ICdFTk9URU1QVFknIHx8IGVyLmNvZGUgPT09ICdFRVhJU1QnIHx8IGVyLmNvZGUgPT09ICdFUEVSTScpKSB7XG4gICAgICBybWtpZHMocCwgb3B0aW9ucywgY2IpXG4gICAgfSBlbHNlIGlmIChlciAmJiBlci5jb2RlID09PSAnRU5PVERJUicpIHtcbiAgICAgIGNiKG9yaWdpbmFsRXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKGVyKVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gcm1raWRzIChwLCBvcHRpb25zLCBjYikge1xuICBhc3NlcnQocClcbiAgYXNzZXJ0KG9wdGlvbnMpXG4gIGFzc2VydCh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpXG5cbiAgb3B0aW9ucy5yZWFkZGlyKHAsIChlciwgZmlsZXMpID0+IHtcbiAgICBpZiAoZXIpIHJldHVybiBjYihlcilcblxuICAgIGxldCBuID0gZmlsZXMubGVuZ3RoXG4gICAgbGV0IGVyclN0YXRlXG5cbiAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG9wdGlvbnMucm1kaXIocCwgY2IpXG5cbiAgICBmaWxlcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgcmltcmFmKHBhdGguam9pbihwLCBmKSwgb3B0aW9ucywgZXIgPT4ge1xuICAgICAgICBpZiAoZXJyU3RhdGUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXIpIHJldHVybiBjYihlcnJTdGF0ZSA9IGVyKVxuICAgICAgICBpZiAoLS1uID09PSAwKSB7XG4gICAgICAgICAgb3B0aW9ucy5ybWRpcihwLCBjYilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG4vLyB0aGlzIGxvb2tzIHNpbXBsZXIsIGFuZCBpcyBzdHJpY3RseSAqZmFzdGVyKiwgYnV0IHdpbGxcbi8vIHRpZSB1cCB0aGUgSmF2YVNjcmlwdCB0aHJlYWQgYW5kIGZhaWwgb24gZXhjZXNzaXZlbHlcbi8vIGRlZXAgZGlyZWN0b3J5IHRyZWVzLlxuZnVuY3Rpb24gcmltcmFmU3luYyAocCwgb3B0aW9ucykge1xuICBsZXQgc3RcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICBkZWZhdWx0cyhvcHRpb25zKVxuXG4gIGFzc2VydChwLCAncmltcmFmOiBtaXNzaW5nIHBhdGgnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHAsICdzdHJpbmcnLCAncmltcmFmOiBwYXRoIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydChvcHRpb25zLCAncmltcmFmOiBtaXNzaW5nIG9wdGlvbnMnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIG9wdGlvbnMsICdvYmplY3QnLCAncmltcmFmOiBvcHRpb25zIHNob3VsZCBiZSBvYmplY3QnKVxuXG4gIHRyeSB7XG4gICAgc3QgPSBvcHRpb25zLmxzdGF0U3luYyhwKVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmIChlci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gV2luZG93cyBjYW4gRVBFUk0gb24gc3RhdC4gIExpZmUgaXMgc3VmZmVyaW5nLlxuICAgIGlmIChlci5jb2RlID09PSAnRVBFUk0nICYmIGlzV2luZG93cykge1xuICAgICAgZml4V2luRVBFUk1TeW5jKHAsIG9wdGlvbnMsIGVyKVxuICAgIH1cbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gc3Vub3MgbGV0cyB0aGUgcm9vdCB1c2VyIHVubGluayBkaXJlY3Rvcmllcywgd2hpY2ggaXMuLi4gd2VpcmQuXG4gICAgaWYgKHN0ICYmIHN0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBudWxsKVxuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLnVubGlua1N5bmMocClcbiAgICB9XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKGVyLmNvZGUgPT09ICdFUEVSTScpIHtcbiAgICAgIHJldHVybiBpc1dpbmRvd3MgPyBmaXhXaW5FUEVSTVN5bmMocCwgb3B0aW9ucywgZXIpIDogcm1kaXJTeW5jKHAsIG9wdGlvbnMsIGVyKVxuICAgIH0gZWxzZSBpZiAoZXIuY29kZSAhPT0gJ0VJU0RJUicpIHtcbiAgICAgIHRocm93IGVyXG4gICAgfVxuICAgIHJtZGlyU3luYyhwLCBvcHRpb25zLCBlcilcbiAgfVxufVxuXG5mdW5jdGlvbiBybWRpclN5bmMgKHAsIG9wdGlvbnMsIG9yaWdpbmFsRXIpIHtcbiAgYXNzZXJ0KHApXG4gIGFzc2VydChvcHRpb25zKVxuICBpZiAob3JpZ2luYWxFcikge1xuICAgIGFzc2VydChvcmlnaW5hbEVyIGluc3RhbmNlb2YgRXJyb3IpXG4gIH1cblxuICB0cnkge1xuICAgIG9wdGlvbnMucm1kaXJTeW5jKHApXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKGVyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKGVyLmNvZGUgPT09ICdFTk9URElSJykge1xuICAgICAgdGhyb3cgb3JpZ2luYWxFclxuICAgIH0gZWxzZSBpZiAoZXIuY29kZSA9PT0gJ0VOT1RFTVBUWScgfHwgZXIuY29kZSA9PT0gJ0VFWElTVCcgfHwgZXIuY29kZSA9PT0gJ0VQRVJNJykge1xuICAgICAgcm1raWRzU3luYyhwLCBvcHRpb25zKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBybWtpZHNTeW5jIChwLCBvcHRpb25zKSB7XG4gIGFzc2VydChwKVxuICBhc3NlcnQob3B0aW9ucylcbiAgb3B0aW9ucy5yZWFkZGlyU3luYyhwKS5mb3JFYWNoKGYgPT4gcmltcmFmU3luYyhwYXRoLmpvaW4ocCwgZiksIG9wdGlvbnMpKVxuICBvcHRpb25zLnJtZGlyU3luYyhwLCBvcHRpb25zKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJpbXJhZlxucmltcmFmLnN5bmMgPSByaW1yYWZTeW5jXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZnMtZXh0cmEvbGliL3JlbW92ZS9yaW1yYWYuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG4vLyBzaW1wbGUgbXV0YWJsZSBhc3NpZ25cbmZ1bmN0aW9uIGFzc2lnbiAoKSB7XG4gIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykuZmlsdGVyKGkgPT4gaSlcbiAgY29uc3QgZGVzdCA9IGFyZ3Muc2hpZnQoKVxuICBhcmdzLmZvckVhY2goc3JjID0+IHtcbiAgICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGRlc3Rba2V5XSA9IHNyY1trZXldXG4gICAgfSlcbiAgfSlcblxuICByZXR1cm4gZGVzdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2ZzLWV4dHJhL2xpYi91dGlsL2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZ3JhY2VmdWwtZnMnKVxuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbi8vIEhGUywgZXh0ezIsM30sIEZBVCBkbyBub3QsIE5vZGUuanMgdjAuMTAgZG9lcyBub3RcbmZ1bmN0aW9uIGhhc01pbGxpc1Jlc1N5bmMgKCkge1xuICBsZXQgdG1wZmlsZSA9IHBhdGguam9pbignbWlsbGlzLXRlc3Qtc3luYycgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMikpXG4gIHRtcGZpbGUgPSBwYXRoLmpvaW4ob3MudG1wZGlyKCksIHRtcGZpbGUpXG5cbiAgLy8gNTUwIG1pbGxpcyBwYXN0IFVOSVggZXBvY2hcbiAgY29uc3QgZCA9IG5ldyBEYXRlKDE0MzU0MTAyNDM4NjIpXG4gIGZzLndyaXRlRmlsZVN5bmModG1wZmlsZSwgJ2h0dHBzOi8vZ2l0aHViLmNvbS9qcHJpY2hhcmRzb24vbm9kZS1mcy1leHRyYS9wdWxsLzE0MScpXG4gIGNvbnN0IGZkID0gZnMub3BlblN5bmModG1wZmlsZSwgJ3IrJylcbiAgZnMuZnV0aW1lc1N5bmMoZmQsIGQsIGQpXG4gIGZzLmNsb3NlU3luYyhmZClcbiAgcmV0dXJuIGZzLnN0YXRTeW5jKHRtcGZpbGUpLm10aW1lID4gMTQzNTQxMDI0MzAwMFxufVxuXG5mdW5jdGlvbiBoYXNNaWxsaXNSZXMgKGNhbGxiYWNrKSB7XG4gIGxldCB0bXBmaWxlID0gcGF0aC5qb2luKCdtaWxsaXMtdGVzdCcgKyBEYXRlLm5vdygpLnRvU3RyaW5nKCkgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMikpXG4gIHRtcGZpbGUgPSBwYXRoLmpvaW4ob3MudG1wZGlyKCksIHRtcGZpbGUpXG5cbiAgLy8gNTUwIG1pbGxpcyBwYXN0IFVOSVggZXBvY2hcbiAgY29uc3QgZCA9IG5ldyBEYXRlKDE0MzU0MTAyNDM4NjIpXG4gIGZzLndyaXRlRmlsZSh0bXBmaWxlLCAnaHR0cHM6Ly9naXRodWIuY29tL2pwcmljaGFyZHNvbi9ub2RlLWZzLWV4dHJhL3B1bGwvMTQxJywgZXJyID0+IHtcbiAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgIGZzLm9wZW4odG1wZmlsZSwgJ3IrJywgKGVyciwgZmQpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICBmcy5mdXRpbWVzKGZkLCBkLCBkLCBlcnIgPT4ge1xuICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICBmcy5jbG9zZShmZCwgZXJyID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gY2FsbGJhY2soZXJyKVxuICAgICAgICAgIGZzLnN0YXQodG1wZmlsZSwgKGVyciwgc3RhdHMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCBzdGF0cy5tdGltZSA+IDE0MzU0MTAyNDMwMDApXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gdGltZVJlbW92ZU1pbGxpcyAodGltZXN0YW1wKSB7XG4gIGlmICh0eXBlb2YgdGltZXN0YW1wID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRpbWVzdGFtcCAvIDEwMDApICogMTAwMFxuICB9IGVsc2UgaWYgKHRpbWVzdGFtcCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTWF0aC5mbG9vcih0aW1lc3RhbXAuZ2V0VGltZSgpIC8gMTAwMCkgKiAxMDAwKVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignZnMtZXh0cmE6IHRpbWVSZW1vdmVNaWxsaXMoKSB1bmtub3duIHBhcmFtZXRlciB0eXBlJylcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGltZXNNaWxsaXMgKHBhdGgsIGF0aW1lLCBtdGltZSwgY2FsbGJhY2spIHtcbiAgLy8gaWYgKCFIQVNfTUlMTElTX1JFUykgcmV0dXJuIGZzLnV0aW1lcyhwYXRoLCBhdGltZSwgbXRpbWUsIGNhbGxiYWNrKVxuICBmcy5vcGVuKHBhdGgsICdyKycsIChlcnIsIGZkKSA9PiB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcbiAgICBmcy5mdXRpbWVzKGZkLCBhdGltZSwgbXRpbWUsIGZ1dGltZXNFcnIgPT4ge1xuICAgICAgZnMuY2xvc2UoZmQsIGNsb3NlRXJyID0+IHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhmdXRpbWVzRXJyIHx8IGNsb3NlRXJyKVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFzTWlsbGlzUmVzLFxuICBoYXNNaWxsaXNSZXNTeW5jLFxuICB0aW1lUmVtb3ZlTWlsbGlzLFxuICB1dGltZXNNaWxsaXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9mcy1leHRyYS9saWIvdXRpbC91dGltZXMuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBTdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKS5TdHJlYW1cblxubW9kdWxlLmV4cG9ydHMgPSBsZWdhY3lcblxuZnVuY3Rpb24gbGVnYWN5IChmcykge1xuICByZXR1cm4ge1xuICAgIFJlYWRTdHJlYW06IFJlYWRTdHJlYW0sXG4gICAgV3JpdGVTdHJlYW06IFdyaXRlU3RyZWFtXG4gIH1cblxuICBmdW5jdGlvbiBSZWFkU3RyZWFtIChwYXRoLCBvcHRpb25zKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlYWRTdHJlYW0pKSByZXR1cm4gbmV3IFJlYWRTdHJlYW0ocGF0aCwgb3B0aW9ucyk7XG5cbiAgICBTdHJlYW0uY2FsbCh0aGlzKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgdGhpcy5mZCA9IG51bGw7XG4gICAgdGhpcy5yZWFkYWJsZSA9IHRydWU7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuZmxhZ3MgPSAncic7XG4gICAgdGhpcy5tb2RlID0gNDM4OyAvKj0wNjY2Ki9cbiAgICB0aGlzLmJ1ZmZlclNpemUgPSA2NCAqIDEwMjQ7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIE1peGluIG9wdGlvbnMgaW50byB0aGlzXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVuY29kaW5nKSB0aGlzLnNldEVuY29kaW5nKHRoaXMuZW5jb2RpbmcpO1xuXG4gICAgaWYgKHRoaXMuc3RhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5zdGFydCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3N0YXJ0IG11c3QgYmUgYSBOdW1iZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZW5kID0gSW5maW5pdHk7XG4gICAgICB9IGVsc2UgaWYgKCdudW1iZXInICE9PSB0eXBlb2YgdGhpcy5lbmQpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdlbmQgbXVzdCBiZSBhIE51bWJlcicpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zdGFydCA+IHRoaXMuZW5kKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc3RhcnQgbXVzdCBiZSA8PSBlbmQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3MgPSB0aGlzLnN0YXJ0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZkICE9PSBudWxsKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLl9yZWFkKCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmcy5vcGVuKHRoaXMucGF0aCwgdGhpcy5mbGFncywgdGhpcy5tb2RlLCBmdW5jdGlvbiAoZXJyLCBmZCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgc2VsZi5yZWFkYWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuZmQgPSBmZDtcbiAgICAgIHNlbGYuZW1pdCgnb3BlbicsIGZkKTtcbiAgICAgIHNlbGYuX3JlYWQoKTtcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gV3JpdGVTdHJlYW0gKHBhdGgsIG9wdGlvbnMpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgV3JpdGVTdHJlYW0pKSByZXR1cm4gbmV3IFdyaXRlU3RyZWFtKHBhdGgsIG9wdGlvbnMpO1xuXG4gICAgU3RyZWFtLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIHRoaXMuZmQgPSBudWxsO1xuICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuXG4gICAgdGhpcy5mbGFncyA9ICd3JztcbiAgICB0aGlzLmVuY29kaW5nID0gJ2JpbmFyeSc7XG4gICAgdGhpcy5tb2RlID0gNDM4OyAvKj0wNjY2Ki9cbiAgICB0aGlzLmJ5dGVzV3JpdHRlbiA9IDA7XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIE1peGluIG9wdGlvbnMgaW50byB0aGlzXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICgnbnVtYmVyJyAhPT0gdHlwZW9mIHRoaXMuc3RhcnQpIHtcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdzdGFydCBtdXN0IGJlIGEgTnVtYmVyJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdGFydCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdGFydCBtdXN0IGJlID49IHplcm8nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3MgPSB0aGlzLnN0YXJ0O1xuICAgIH1cblxuICAgIHRoaXMuYnVzeSA9IGZhbHNlO1xuICAgIHRoaXMuX3F1ZXVlID0gW107XG5cbiAgICBpZiAodGhpcy5mZCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fb3BlbiA9IGZzLm9wZW47XG4gICAgICB0aGlzLl9xdWV1ZS5wdXNoKFt0aGlzLl9vcGVuLCB0aGlzLnBhdGgsIHRoaXMuZmxhZ3MsIHRoaXMubW9kZSwgdW5kZWZpbmVkXSk7XG4gICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZ3JhY2VmdWwtZnMvbGVnYWN5LXN0cmVhbXMuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBmcyA9IHJlcXVpcmUoJy4vZnMuanMnKVxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJ2NvbnN0YW50cycpXG5cbnZhciBvcmlnQ3dkID0gcHJvY2Vzcy5jd2RcbnZhciBjd2QgPSBudWxsXG5cbnZhciBwbGF0Zm9ybSA9IHByb2Nlc3MuZW52LkdSQUNFRlVMX0ZTX1BMQVRGT1JNIHx8IHByb2Nlc3MucGxhdGZvcm1cblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCFjd2QpXG4gICAgY3dkID0gb3JpZ0N3ZC5jYWxsKHByb2Nlc3MpXG4gIHJldHVybiBjd2Rcbn1cbnRyeSB7XG4gIHByb2Nlc3MuY3dkKClcbn0gY2F0Y2ggKGVyKSB7fVxuXG52YXIgY2hkaXIgPSBwcm9jZXNzLmNoZGlyXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24oZCkge1xuICBjd2QgPSBudWxsXG4gIGNoZGlyLmNhbGwocHJvY2VzcywgZClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaFxuXG5mdW5jdGlvbiBwYXRjaCAoZnMpIHtcbiAgLy8gKHJlLSlpbXBsZW1lbnQgc29tZSB0aGluZ3MgdGhhdCBhcmUga25vd24gYnVzdGVkIG9yIG1pc3NpbmcuXG5cbiAgLy8gbGNobW9kLCBicm9rZW4gcHJpb3IgdG8gMC42LjJcbiAgLy8gYmFjay1wb3J0IHRoZSBmaXggaGVyZS5cbiAgaWYgKGNvbnN0YW50cy5oYXNPd25Qcm9wZXJ0eSgnT19TWU1MSU5LJykgJiZcbiAgICAgIHByb2Nlc3MudmVyc2lvbi5tYXRjaCgvXnYwXFwuNlxcLlswLTJdfF52MFxcLjVcXC4vKSkge1xuICAgIHBhdGNoTGNobW9kKGZzKVxuICB9XG5cbiAgLy8gbHV0aW1lcyBpbXBsZW1lbnRhdGlvbiwgb3Igbm8tb3BcbiAgaWYgKCFmcy5sdXRpbWVzKSB7XG4gICAgcGF0Y2hMdXRpbWVzKGZzKVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2lzYWFjcy9ub2RlLWdyYWNlZnVsLWZzL2lzc3Vlcy80XG4gIC8vIENob3duIHNob3VsZCBub3QgZmFpbCBvbiBlaW52YWwgb3IgZXBlcm0gaWYgbm9uLXJvb3QuXG4gIC8vIEl0IHNob3VsZCBub3QgZmFpbCBvbiBlbm9zeXMgZXZlciwgYXMgdGhpcyBqdXN0IGluZGljYXRlc1xuICAvLyB0aGF0IGEgZnMgZG9lc24ndCBzdXBwb3J0IHRoZSBpbnRlbmRlZCBvcGVyYXRpb24uXG5cbiAgZnMuY2hvd24gPSBjaG93bkZpeChmcy5jaG93bilcbiAgZnMuZmNob3duID0gY2hvd25GaXgoZnMuZmNob3duKVxuICBmcy5sY2hvd24gPSBjaG93bkZpeChmcy5sY2hvd24pXG5cbiAgZnMuY2htb2QgPSBjaG1vZEZpeChmcy5jaG1vZClcbiAgZnMuZmNobW9kID0gY2htb2RGaXgoZnMuZmNobW9kKVxuICBmcy5sY2htb2QgPSBjaG1vZEZpeChmcy5sY2htb2QpXG5cbiAgZnMuY2hvd25TeW5jID0gY2hvd25GaXhTeW5jKGZzLmNob3duU3luYylcbiAgZnMuZmNob3duU3luYyA9IGNob3duRml4U3luYyhmcy5mY2hvd25TeW5jKVxuICBmcy5sY2hvd25TeW5jID0gY2hvd25GaXhTeW5jKGZzLmxjaG93blN5bmMpXG5cbiAgZnMuY2htb2RTeW5jID0gY2htb2RGaXhTeW5jKGZzLmNobW9kU3luYylcbiAgZnMuZmNobW9kU3luYyA9IGNobW9kRml4U3luYyhmcy5mY2htb2RTeW5jKVxuICBmcy5sY2htb2RTeW5jID0gY2htb2RGaXhTeW5jKGZzLmxjaG1vZFN5bmMpXG5cbiAgZnMuc3RhdCA9IHN0YXRGaXgoZnMuc3RhdClcbiAgZnMuZnN0YXQgPSBzdGF0Rml4KGZzLmZzdGF0KVxuICBmcy5sc3RhdCA9IHN0YXRGaXgoZnMubHN0YXQpXG5cbiAgZnMuc3RhdFN5bmMgPSBzdGF0Rml4U3luYyhmcy5zdGF0U3luYylcbiAgZnMuZnN0YXRTeW5jID0gc3RhdEZpeFN5bmMoZnMuZnN0YXRTeW5jKVxuICBmcy5sc3RhdFN5bmMgPSBzdGF0Rml4U3luYyhmcy5sc3RhdFN5bmMpXG5cbiAgLy8gaWYgbGNobW9kL2xjaG93biBkbyBub3QgZXhpc3QsIHRoZW4gbWFrZSB0aGVtIG5vLW9wc1xuICBpZiAoIWZzLmxjaG1vZCkge1xuICAgIGZzLmxjaG1vZCA9IGZ1bmN0aW9uIChwYXRoLCBtb2RlLCBjYikge1xuICAgICAgaWYgKGNiKSBwcm9jZXNzLm5leHRUaWNrKGNiKVxuICAgIH1cbiAgICBmcy5sY2htb2RTeW5jID0gZnVuY3Rpb24gKCkge31cbiAgfVxuICBpZiAoIWZzLmxjaG93bikge1xuICAgIGZzLmxjaG93biA9IGZ1bmN0aW9uIChwYXRoLCB1aWQsIGdpZCwgY2IpIHtcbiAgICAgIGlmIChjYikgcHJvY2Vzcy5uZXh0VGljayhjYilcbiAgICB9XG4gICAgZnMubGNob3duU3luYyA9IGZ1bmN0aW9uICgpIHt9XG4gIH1cblxuICAvLyBvbiBXaW5kb3dzLCBBL1Ygc29mdHdhcmUgY2FuIGxvY2sgdGhlIGRpcmVjdG9yeSwgY2F1c2luZyB0aGlzXG4gIC8vIHRvIGZhaWwgd2l0aCBhbiBFQUNDRVMgb3IgRVBFUk0gaWYgdGhlIGRpcmVjdG9yeSBjb250YWlucyBuZXdseVxuICAvLyBjcmVhdGVkIGZpbGVzLiAgVHJ5IGFnYWluIG9uIGZhaWx1cmUsIGZvciB1cCB0byA2MCBzZWNvbmRzLlxuXG4gIC8vIFNldCB0aGUgdGltZW91dCB0aGlzIGxvbmcgYmVjYXVzZSBzb21lIFdpbmRvd3MgQW50aS1WaXJ1cywgc3VjaCBhcyBQYXJpdHlcbiAgLy8gYml0OSwgbWF5IGxvY2sgZmlsZXMgZm9yIHVwIHRvIGEgbWludXRlLCBjYXVzaW5nIG5wbSBwYWNrYWdlIGluc3RhbGxcbiAgLy8gZmFpbHVyZXMuIEFsc28sIHRha2UgY2FyZSB0byB5aWVsZCB0aGUgc2NoZWR1bGVyLiBXaW5kb3dzIHNjaGVkdWxpbmcgZ2l2ZXNcbiAgLy8gQ1BVIHRvIGEgYnVzeSBsb29waW5nIHByb2Nlc3MsIHdoaWNoIGNhbiBjYXVzZSB0aGUgcHJvZ3JhbSBjYXVzaW5nIHRoZSBsb2NrXG4gIC8vIGNvbnRlbnRpb24gdG8gYmUgc3RhcnZlZCBvZiBDUFUgYnkgbm9kZSwgc28gdGhlIGNvbnRlbnRpb24gZG9lc24ndCByZXNvbHZlLlxuICBpZiAocGxhdGZvcm0gPT09IFwid2luMzJcIikge1xuICAgIGZzLnJlbmFtZSA9IChmdW5jdGlvbiAoZnMkcmVuYW1lKSB7IHJldHVybiBmdW5jdGlvbiAoZnJvbSwgdG8sIGNiKSB7XG4gICAgICB2YXIgc3RhcnQgPSBEYXRlLm5vdygpXG4gICAgICB2YXIgYmFja29mZiA9IDA7XG4gICAgICBmcyRyZW5hbWUoZnJvbSwgdG8sIGZ1bmN0aW9uIENCIChlcikge1xuICAgICAgICBpZiAoZXJcbiAgICAgICAgICAgICYmIChlci5jb2RlID09PSBcIkVBQ0NFU1wiIHx8IGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgICAgICAgICYmIERhdGUubm93KCkgLSBzdGFydCA8IDYwMDAwKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZzLnN0YXQodG8sIGZ1bmN0aW9uIChzdGF0ZXIsIHN0KSB7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZXIgJiYgc3RhdGVyLmNvZGUgPT09IFwiRU5PRU5UXCIpXG4gICAgICAgICAgICAgICAgZnMkcmVuYW1lKGZyb20sIHRvLCBDQik7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYihlcilcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSwgYmFja29mZilcbiAgICAgICAgICBpZiAoYmFja29mZiA8IDEwMClcbiAgICAgICAgICAgIGJhY2tvZmYgKz0gMTA7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYikgY2IoZXIpXG4gICAgICB9KVxuICAgIH19KShmcy5yZW5hbWUpXG4gIH1cblxuICAvLyBpZiByZWFkKCkgcmV0dXJucyBFQUdBSU4sIHRoZW4ganVzdCB0cnkgaXQgYWdhaW4uXG4gIGZzLnJlYWQgPSAoZnVuY3Rpb24gKGZzJHJlYWQpIHsgcmV0dXJuIGZ1bmN0aW9uIChmZCwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24sIGNhbGxiYWNrXykge1xuICAgIHZhciBjYWxsYmFja1xuICAgIGlmIChjYWxsYmFja18gJiYgdHlwZW9mIGNhbGxiYWNrXyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIGVhZ0NvdW50ZXIgPSAwXG4gICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIChlciwgXywgX18pIHtcbiAgICAgICAgaWYgKGVyICYmIGVyLmNvZGUgPT09ICdFQUdBSU4nICYmIGVhZ0NvdW50ZXIgPCAxMCkge1xuICAgICAgICAgIGVhZ0NvdW50ZXIgKytcbiAgICAgICAgICByZXR1cm4gZnMkcmVhZC5jYWxsKGZzLCBmZCwgYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCwgcG9zaXRpb24sIGNhbGxiYWNrKVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrXy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmcyRyZWFkLmNhbGwoZnMsIGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbiwgY2FsbGJhY2spXG4gIH19KShmcy5yZWFkKVxuXG4gIGZzLnJlYWRTeW5jID0gKGZ1bmN0aW9uIChmcyRyZWFkU3luYykgeyByZXR1cm4gZnVuY3Rpb24gKGZkLCBidWZmZXIsIG9mZnNldCwgbGVuZ3RoLCBwb3NpdGlvbikge1xuICAgIHZhciBlYWdDb3VudGVyID0gMFxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gZnMkcmVhZFN5bmMuY2FsbChmcywgZmQsIGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgsIHBvc2l0aW9uKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgaWYgKGVyLmNvZGUgPT09ICdFQUdBSU4nICYmIGVhZ0NvdW50ZXIgPCAxMCkge1xuICAgICAgICAgIGVhZ0NvdW50ZXIgKytcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHRocm93IGVyXG4gICAgICB9XG4gICAgfVxuICB9fSkoZnMucmVhZFN5bmMpXG59XG5cbmZ1bmN0aW9uIHBhdGNoTGNobW9kIChmcykge1xuICBmcy5sY2htb2QgPSBmdW5jdGlvbiAocGF0aCwgbW9kZSwgY2FsbGJhY2spIHtcbiAgICBmcy5vcGVuKCBwYXRoXG4gICAgICAgICAgICwgY29uc3RhbnRzLk9fV1JPTkxZIHwgY29uc3RhbnRzLk9fU1lNTElOS1xuICAgICAgICAgICAsIG1vZGVcbiAgICAgICAgICAgLCBmdW5jdGlvbiAoZXJyLCBmZCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVycilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICAvLyBwcmVmZXIgdG8gcmV0dXJuIHRoZSBjaG1vZCBlcnJvciwgaWYgb25lIG9jY3VycyxcbiAgICAgIC8vIGJ1dCBzdGlsbCB0cnkgdG8gY2xvc2UsIGFuZCByZXBvcnQgY2xvc2luZyBlcnJvcnMgaWYgdGhleSBvY2N1ci5cbiAgICAgIGZzLmZjaG1vZChmZCwgbW9kZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICBmcy5jbG9zZShmZCwgZnVuY3Rpb24oZXJyMikge1xuICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyIHx8IGVycjIpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBmcy5sY2htb2RTeW5jID0gZnVuY3Rpb24gKHBhdGgsIG1vZGUpIHtcbiAgICB2YXIgZmQgPSBmcy5vcGVuU3luYyhwYXRoLCBjb25zdGFudHMuT19XUk9OTFkgfCBjb25zdGFudHMuT19TWU1MSU5LLCBtb2RlKVxuXG4gICAgLy8gcHJlZmVyIHRvIHJldHVybiB0aGUgY2htb2QgZXJyb3IsIGlmIG9uZSBvY2N1cnMsXG4gICAgLy8gYnV0IHN0aWxsIHRyeSB0byBjbG9zZSwgYW5kIHJlcG9ydCBjbG9zaW5nIGVycm9ycyBpZiB0aGV5IG9jY3VyLlxuICAgIHZhciB0aHJldyA9IHRydWVcbiAgICB2YXIgcmV0XG4gICAgdHJ5IHtcbiAgICAgIHJldCA9IGZzLmZjaG1vZFN5bmMoZmQsIG1vZGUpXG4gICAgICB0aHJldyA9IGZhbHNlXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICh0aHJldykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZzLmNsb3NlU3luYyhmZClcbiAgICAgICAgfSBjYXRjaCAoZXIpIHt9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcy5jbG9zZVN5bmMoZmQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXRjaEx1dGltZXMgKGZzKSB7XG4gIGlmIChjb25zdGFudHMuaGFzT3duUHJvcGVydHkoXCJPX1NZTUxJTktcIikpIHtcbiAgICBmcy5sdXRpbWVzID0gZnVuY3Rpb24gKHBhdGgsIGF0LCBtdCwgY2IpIHtcbiAgICAgIGZzLm9wZW4ocGF0aCwgY29uc3RhbnRzLk9fU1lNTElOSywgZnVuY3Rpb24gKGVyLCBmZCkge1xuICAgICAgICBpZiAoZXIpIHtcbiAgICAgICAgICBpZiAoY2IpIGNiKGVyKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGZzLmZ1dGltZXMoZmQsIGF0LCBtdCwgZnVuY3Rpb24gKGVyKSB7XG4gICAgICAgICAgZnMuY2xvc2UoZmQsIGZ1bmN0aW9uIChlcjIpIHtcbiAgICAgICAgICAgIGlmIChjYikgY2IoZXIgfHwgZXIyKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZzLmx1dGltZXNTeW5jID0gZnVuY3Rpb24gKHBhdGgsIGF0LCBtdCkge1xuICAgICAgdmFyIGZkID0gZnMub3BlblN5bmMocGF0aCwgY29uc3RhbnRzLk9fU1lNTElOSylcbiAgICAgIHZhciByZXRcbiAgICAgIHZhciB0aHJldyA9IHRydWVcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldCA9IGZzLmZ1dGltZXNTeW5jKGZkLCBhdCwgbXQpXG4gICAgICAgIHRocmV3ID0gZmFsc2VcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICh0aHJldykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy5jbG9zZVN5bmMoZmQpXG4gICAgICAgICAgfSBjYXRjaCAoZXIpIHt9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgZnMubHV0aW1lcyA9IGZ1bmN0aW9uIChfYSwgX2IsIF9jLCBjYikgeyBpZiAoY2IpIHByb2Nlc3MubmV4dFRpY2soY2IpIH1cbiAgICBmcy5sdXRpbWVzU3luYyA9IGZ1bmN0aW9uICgpIHt9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2htb2RGaXggKG9yaWcpIHtcbiAgaWYgKCFvcmlnKSByZXR1cm4gb3JpZ1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgbW9kZSwgY2IpIHtcbiAgICByZXR1cm4gb3JpZy5jYWxsKGZzLCB0YXJnZXQsIG1vZGUsIGZ1bmN0aW9uIChlcikge1xuICAgICAgaWYgKGNob3duRXJPayhlcikpIGVyID0gbnVsbFxuICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaG1vZEZpeFN5bmMgKG9yaWcpIHtcbiAgaWYgKCFvcmlnKSByZXR1cm4gb3JpZ1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgbW9kZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gb3JpZy5jYWxsKGZzLCB0YXJnZXQsIG1vZGUpXG4gICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgIGlmICghY2hvd25Fck9rKGVyKSkgdGhyb3cgZXJcbiAgICB9XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBjaG93bkZpeCAob3JpZykge1xuICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCB1aWQsIGdpZCwgY2IpIHtcbiAgICByZXR1cm4gb3JpZy5jYWxsKGZzLCB0YXJnZXQsIHVpZCwgZ2lkLCBmdW5jdGlvbiAoZXIpIHtcbiAgICAgIGlmIChjaG93bkVyT2soZXIpKSBlciA9IG51bGxcbiAgICAgIGlmIChjYikgY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hvd25GaXhTeW5jIChvcmlnKSB7XG4gIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHVpZCwgZ2lkKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBvcmlnLmNhbGwoZnMsIHRhcmdldCwgdWlkLCBnaWQpXG4gICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgIGlmICghY2hvd25Fck9rKGVyKSkgdGhyb3cgZXJcbiAgICB9XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdGF0Rml4IChvcmlnKSB7XG4gIGlmICghb3JpZykgcmV0dXJuIG9yaWdcbiAgLy8gT2xkZXIgdmVyc2lvbnMgb2YgTm9kZSBlcnJvbmVvdXNseSByZXR1cm5lZCBzaWduZWQgaW50ZWdlcnMgZm9yXG4gIC8vIHVpZCArIGdpZC5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGNiKSB7XG4gICAgcmV0dXJuIG9yaWcuY2FsbChmcywgdGFyZ2V0LCBmdW5jdGlvbiAoZXIsIHN0YXRzKSB7XG4gICAgICBpZiAoIXN0YXRzKSByZXR1cm4gY2IuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgaWYgKHN0YXRzLnVpZCA8IDApIHN0YXRzLnVpZCArPSAweDEwMDAwMDAwMFxuICAgICAgaWYgKHN0YXRzLmdpZCA8IDApIHN0YXRzLmdpZCArPSAweDEwMDAwMDAwMFxuICAgICAgaWYgKGNiKSBjYi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBzdGF0Rml4U3luYyAob3JpZykge1xuICBpZiAoIW9yaWcpIHJldHVybiBvcmlnXG4gIC8vIE9sZGVyIHZlcnNpb25zIG9mIE5vZGUgZXJyb25lb3VzbHkgcmV0dXJuZWQgc2lnbmVkIGludGVnZXJzIGZvclxuICAvLyB1aWQgKyBnaWQuXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdmFyIHN0YXRzID0gb3JpZy5jYWxsKGZzLCB0YXJnZXQpXG4gICAgaWYgKHN0YXRzLnVpZCA8IDApIHN0YXRzLnVpZCArPSAweDEwMDAwMDAwMFxuICAgIGlmIChzdGF0cy5naWQgPCAwKSBzdGF0cy5naWQgKz0gMHgxMDAwMDAwMDBcbiAgICByZXR1cm4gc3RhdHM7XG4gIH1cbn1cblxuLy8gRU5PU1lTIG1lYW5zIHRoYXQgdGhlIGZzIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgb3AuIEp1c3QgaWdub3JlXG4vLyB0aGF0LCBiZWNhdXNlIGl0IGRvZXNuJ3QgbWF0dGVyLlxuLy9cbi8vIGlmIHRoZXJlJ3Mgbm8gZ2V0dWlkLCBvciBpZiBnZXR1aWQoKSBpcyBzb21ldGhpbmcgb3RoZXJcbi8vIHRoYW4gMCwgYW5kIHRoZSBlcnJvciBpcyBFSU5WQUwgb3IgRVBFUk0sIHRoZW4ganVzdCBpZ25vcmVcbi8vIGl0LlxuLy9cbi8vIFRoaXMgc3BlY2lmaWMgY2FzZSBpcyBhIHNpbGVudCBmYWlsdXJlIGluIGNwLCBpbnN0YWxsLCB0YXIsXG4vLyBhbmQgbW9zdCBvdGhlciB1bml4IHRvb2xzIHRoYXQgbWFuYWdlIHBlcm1pc3Npb25zLlxuLy9cbi8vIFdoZW4gcnVubmluZyBhcyByb290LCBvciBpZiBvdGhlciB0eXBlcyBvZiBlcnJvcnMgYXJlXG4vLyBlbmNvdW50ZXJlZCwgdGhlbiBpdCdzIHN0cmljdC5cbmZ1bmN0aW9uIGNob3duRXJPayAoZXIpIHtcbiAgaWYgKCFlcilcbiAgICByZXR1cm4gdHJ1ZVxuXG4gIGlmIChlci5jb2RlID09PSBcIkVOT1NZU1wiKVxuICAgIHJldHVybiB0cnVlXG5cbiAgdmFyIG5vbnJvb3QgPSAhcHJvY2Vzcy5nZXR1aWQgfHwgcHJvY2Vzcy5nZXR1aWQoKSAhPT0gMFxuICBpZiAobm9ucm9vdCkge1xuICAgIGlmIChlci5jb2RlID09PSBcIkVJTlZBTFwiIHx8IGVyLmNvZGUgPT09IFwiRVBFUk1cIilcbiAgICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ncmFjZWZ1bC1mcy9wb2x5ZmlsbHMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBfZnNcbnRyeSB7XG4gIF9mcyA9IHJlcXVpcmUoJ2dyYWNlZnVsLWZzJylcbn0gY2F0Y2ggKF8pIHtcbiAgX2ZzID0gcmVxdWlyZSgnZnMnKVxufVxuXG5mdW5jdGlvbiByZWFkRmlsZSAoZmlsZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrID09IG51bGwpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0ge2VuY29kaW5nOiBvcHRpb25zfVxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGZzID0gb3B0aW9ucy5mcyB8fCBfZnNcblxuICB2YXIgc2hvdWxkVGhyb3cgPSB0cnVlXG4gIC8vIERPIE5PVCBVU0UgJ3Bhc3NQYXJzaW5nRXJyb3JzJyBUSEUgTkFNRSBXSUxMIENIQU5HRSEhISwgdXNlICd0aHJvd3MnIGluc3RlYWRcbiAgaWYgKCdwYXNzUGFyc2luZ0Vycm9ycycgaW4gb3B0aW9ucykge1xuICAgIHNob3VsZFRocm93ID0gb3B0aW9ucy5wYXNzUGFyc2luZ0Vycm9yc1xuICB9IGVsc2UgaWYgKCd0aHJvd3MnIGluIG9wdGlvbnMpIHtcbiAgICBzaG91bGRUaHJvdyA9IG9wdGlvbnMudGhyb3dzXG4gIH1cblxuICBmcy5yZWFkRmlsZShmaWxlLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgaWYgKGVycikgcmV0dXJuIGNhbGxiYWNrKGVycilcblxuICAgIGRhdGEgPSBzdHJpcEJvbShkYXRhKVxuXG4gICAgdmFyIG9ialxuICAgIHRyeSB7XG4gICAgICBvYmogPSBKU09OLnBhcnNlKGRhdGEsIG9wdGlvbnMgPyBvcHRpb25zLnJldml2ZXIgOiBudWxsKVxuICAgIH0gY2F0Y2ggKGVycjIpIHtcbiAgICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgICBlcnIyLm1lc3NhZ2UgPSBmaWxlICsgJzogJyArIGVycjIubWVzc2FnZVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyMilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBudWxsKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNhbGxiYWNrKG51bGwsIG9iailcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVhZEZpbGVTeW5jIChmaWxlLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0ge2VuY29kaW5nOiBvcHRpb25zfVxuICB9XG5cbiAgdmFyIGZzID0gb3B0aW9ucy5mcyB8fCBfZnNcblxuICB2YXIgc2hvdWxkVGhyb3cgPSB0cnVlXG4gIC8vIERPIE5PVCBVU0UgJ3Bhc3NQYXJzaW5nRXJyb3JzJyBUSEUgTkFNRSBXSUxMIENIQU5HRSEhISwgdXNlICd0aHJvd3MnIGluc3RlYWRcbiAgaWYgKCdwYXNzUGFyc2luZ0Vycm9ycycgaW4gb3B0aW9ucykge1xuICAgIHNob3VsZFRocm93ID0gb3B0aW9ucy5wYXNzUGFyc2luZ0Vycm9yc1xuICB9IGVsc2UgaWYgKCd0aHJvd3MnIGluIG9wdGlvbnMpIHtcbiAgICBzaG91bGRUaHJvdyA9IG9wdGlvbnMudGhyb3dzXG4gIH1cblxuICB2YXIgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlLCBvcHRpb25zKVxuICBjb250ZW50ID0gc3RyaXBCb20oY29udGVudClcblxuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGNvbnRlbnQsIG9wdGlvbnMucmV2aXZlcilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICBlcnIubWVzc2FnZSA9IGZpbGUgKyAnOiAnICsgZXJyLm1lc3NhZ2VcbiAgICAgIHRocm93IGVyclxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGUgKGZpbGUsIG9iaiwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrID09IG51bGwpIHtcbiAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0ge31cbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgZnMgPSBvcHRpb25zLmZzIHx8IF9mc1xuXG4gIHZhciBzcGFjZXMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbFxuICAgID8gJ3NwYWNlcycgaW4gb3B0aW9uc1xuICAgID8gb3B0aW9ucy5zcGFjZXMgOiB0aGlzLnNwYWNlc1xuICAgIDogdGhpcy5zcGFjZXNcblxuICB2YXIgc3RyID0gJydcbiAgdHJ5IHtcbiAgICBzdHIgPSBKU09OLnN0cmluZ2lmeShvYmosIG9wdGlvbnMgPyBvcHRpb25zLnJlcGxhY2VyIDogbnVsbCwgc3BhY2VzKSArICdcXG4nXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChjYWxsYmFjaykgcmV0dXJuIGNhbGxiYWNrKGVyciwgbnVsbClcbiAgfVxuXG4gIGZzLndyaXRlRmlsZShmaWxlLCBzdHIsIG9wdGlvbnMsIGNhbGxiYWNrKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGVTeW5jIChmaWxlLCBvYmosIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIGZzID0gb3B0aW9ucy5mcyB8fCBfZnNcblxuICB2YXIgc3BhY2VzID0gdHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnICYmIG9wdGlvbnMgIT09IG51bGxcbiAgICA/ICdzcGFjZXMnIGluIG9wdGlvbnNcbiAgICA/IG9wdGlvbnMuc3BhY2VzIDogdGhpcy5zcGFjZXNcbiAgICA6IHRoaXMuc3BhY2VzXG5cbiAgdmFyIHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iaiwgb3B0aW9ucy5yZXBsYWNlciwgc3BhY2VzKSArICdcXG4nXG4gIC8vIG5vdCBzdXJlIGlmIGZzLndyaXRlRmlsZVN5bmMgcmV0dXJucyBhbnl0aGluZywgYnV0IGp1c3QgaW4gY2FzZVxuICByZXR1cm4gZnMud3JpdGVGaWxlU3luYyhmaWxlLCBzdHIsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIHN0cmlwQm9tIChjb250ZW50KSB7XG4gIC8vIHdlIGRvIHRoaXMgYmVjYXVzZSBKU09OLnBhcnNlIHdvdWxkIGNvbnZlcnQgaXQgdG8gYSB1dGY4IHN0cmluZyBpZiBlbmNvZGluZyB3YXNuJ3Qgc3BlY2lmaWVkXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoY29udGVudCkpIGNvbnRlbnQgPSBjb250ZW50LnRvU3RyaW5nKCd1dGY4JylcbiAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvXlxcdUZFRkYvLCAnJylcbiAgcmV0dXJuIGNvbnRlbnRcbn1cblxudmFyIGpzb25maWxlID0ge1xuICBzcGFjZXM6IG51bGwsXG4gIHJlYWRGaWxlOiByZWFkRmlsZSxcbiAgcmVhZEZpbGVTeW5jOiByZWFkRmlsZVN5bmMsXG4gIHdyaXRlRmlsZTogd3JpdGVGaWxlLFxuICB3cml0ZUZpbGVTeW5jOiB3cml0ZUZpbGVTeW5jXG59XG5cbm1vZHVsZS5leHBvcnRzID0ganNvbmZpbGVcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9qc29uZmlsZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29uc3RhbnRzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY29uc3RhbnRzXCJcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwib3NcIlxuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RyZWFtXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic3RyZWFtXCJcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ1dGlsXCJcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=