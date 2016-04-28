var files = require('./files');
var fs    = require('fs');
var async = require('async');

/**
 * Summmary
 *
 * Takes a full file list and returns a object of summary data.
 */
module.exports = function bval (fileList, callback) {
    var summary = {
        sessions: [],
        subjects: [],
        tasks:    [],
        modalities: [],
        totalFiles: Object.keys(fileList).length,
        size: 0
    };

    async.each(fileList, function (file, cb) {
        var path = file.relativePath ? file.relativePath : file.webkitRelativePath;

        // collect file stats
        if (typeof window !== 'undefined') {
            if (file.size) {summary.size += file.size;}
        } else {
            if (!file.stats) {file.stats = fs.lstatSync(file.path);}
            summary.size += file.stats.size;
        }

        // collect sessions subjects
        var checks = {
            'ses':  'sessions',
            'sub':  'subjects'
        };

        for (var checkKey in checks) {
            if (path && path.indexOf(checkKey + '-') > -1) {
                var item = path.slice(path.indexOf(checkKey + '-'));
                    item = item.slice(0, item.indexOf('/'));
                    if (item.indexOf('_') > -1) {item = item.slice(0, item.indexOf('_'));}
                    item = item.slice(checkKey.length + 1);
                if (summary[checks[checkKey]].indexOf(item) === -1) {summary[checks[checkKey]].push(item);}
            }
        }

        // collect modalities
        if (path && (path.endsWith('.nii') || path.endsWith('.nii.gz'))) {
            var pathParts = path.split('_');
            var suffix    = pathParts[pathParts.length -1];
                suffix    = suffix.slice(0, suffix.indexOf('.'));
            if (summary.modalities.indexOf(suffix) === -1) {summary.modalities.push(suffix);}
        }

        // collect tasks from json files
        if (path && path.endsWith('.json') && (path.indexOf('task') > -1)) {
            files.readFile(file, function (data) {
                var task = JSON.parse(data).TaskName;
                if (task && summary.tasks.indexOf(task) === -1) {
                    summary.tasks.push(task);
                }
                cb();
            });
        } else {
            cb();
        }

    }, function () {
        callback(summary);
    });
};


