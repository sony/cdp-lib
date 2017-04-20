'use strict';
const fs = require('fs-extra');
const path = require('path');
const convert = require('convert-source-map');
const SourceMapConsumer = require('source-map').SourceMapConsumer;
const SourceNode = require('source-map').SourceNode;

///////////////////////////////////////////////////////////////////////
// exports methods:

// get sourceNode from inline-source-map file
function getSourceNodeFromInlineSourceMapFile(src) {
    if (fs.existsSync(src)) {
        return SourceNode.fromStringWithSourceMap(
            getSourceCodeFromFile(src),
            new SourceMapConsumer(getSourceMapFromScript(src))
        );
    } else {
        return new SourceNode();
    }
}

// get sourceNode from script and map files
function getSourceNodeFromFiles(script, map) {
    if (fs.existsSync(script) && fs.existsSync(map)) {
        return SourceNode.fromStringWithSourceMap(
            getSourceCodeFromFile(script),
            new SourceMapConsumer(getSourceMapFromFile(map))
        );
    } else {
        return new SourceNode();
    }
}

// get sourceNode from code
function getSourceNodeFromCode(code) {
    if (/^\/\/[@#]\s+sourceMappingURL=(.+)/gm.test(code)) {
        return SourceNode.fromStringWithSourceMap(
            cleanCodeComment(code),
            new SourceMapConsumer(convert.fromComment(code).toObject())
        );
    } else {
        let node = new SourceNode();
        node.add(cleanCodeComment(code));
        return node;
    }
}

// get source script from file SourceNode
function getScriptFromSourceNode(node, renameSources) {
    let code_map = getCodeMap(node);
    let rename = renameSources;
    let i, n;

    let objMap = code_map.map.toJSON();
    if (rename) {
        if ('string' === typeof rename) {
            for (i = 0, n = objMap.sources.length; i < n; i++) {
                objMap.sources[i] = rename + objMap.sources[i];
            }
        } else if ('function' === typeof rename) {
            for (i = 0, n = objMap.sources.length; i < n; i++) {
                objMap.sources[i] = rename(objMap.sources[i]);
            }
        } else {
            console.warn('unexpected type of rename: ' + typeof rename);
        }
    }

    return node.toString().replace(/\r\n/gm, '\n') +
        convert.fromObject(objMap)
            .toComment()
            .replace(/charset=utf\-8;/gm, '')
            .replace('data:application/json;', 'data:application/json;charset=utf-8;');
}

// separate source script and map from file
function separateScriptAndMapFromFile(src, mapPath) {
    let node = getSourceNodeFromInlineSourceMapFile(src);
    mapPath = mapPath || path.basename(src, '.js') + '.map';
    return {
        script: node.toString().replace(/\r\n/gm, '\n') + '//# sourceMappingURL=' + mapPath,
        map: JSON.stringify(getCodeMap(node).map.toJSON()),
    };
}

///////////////////////////////////////////////////////////////////////
// private methods:

// get sourceMap object from script file
function getSourceMapFromScript(src) {
    let code = fs.readFileSync(src).toString();
    return convert.fromComment(code).toObject();
}

function getSourceMapFromFile(src) {
    let json = fs.readFileSync(src).toString();
    return JSON.parse(json);
}

// get sourceMap json from file
function getSourceCodeFromFile(src) {
    let code = fs.readFileSync(src).toString();
    return cleanCodeComment(code);
}

// clean source code comment
function cleanCodeComment(code) {
    return code
        .replace(/\/\/\/ <reference path="[\s\S]*?>/gm, '')
        .replace(/^\/\/[@#]\s+sourceMappingURL=(.+)/gm, '');
}

// get code map with path from node
function getCodeMap(node) {
    let code_map = node.toStringWithSourceMap();

    // patch
    node.walkSourceContents(function (sourceFile, sourceContent) {
        if (!code_map.map._sources.has(sourceFile)) {
            code_map.map._sources.add(sourceFile);
        }
    });

    return code_map;
}

module.exports = {
    getSourceNodeFromInlineSourceMapFile: getSourceNodeFromInlineSourceMapFile,
    getSourceNodeFromFiles: getSourceNodeFromFiles,
    getSourceNodeFromCode: getSourceNodeFromCode,
    getScriptFromSourceNode: getScriptFromSourceNode,
    separateScriptAndMapFromFile: separateScriptAndMapFromFile,
};
