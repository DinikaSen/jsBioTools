
const os = require('os');
const download = require('download-file');
const fs = require('fs');
var child_process = require('child_process');

var address = 'http://www.clustal.org/omega/';
var platform = os.platform();

var downloader = {};


downloader.getClustalOmega = function () {
    switch (platform) {
        case ('linux'):
            var architecture = os.arch();
            if (architecture == 'x64') {
                address += 'clustalo-1.2.4-Ubuntu-x86_64';
            } else {
                address += 'clustalo-1.2.4-Ubuntu-32-bit';
            }
            downloadCO(address);
            break;
        case ('darwin'):
            address += 'clustal-omega-1.2.3-macosx';
            downloader.downloadClustalOmega(address);
            break;

        case ('win32') :
            address += 'clustal-omega-1.2.2-win64.zip';
            downloader.downloadCO(address);
            break;

        case ('freebsd') :
            address += 'clustalo-1.2.2-FreeBSD-x86-64';
            downloader.downloadCO(address);
            break;

        default :
            console.log("Clustal Omega is not available for your operating system type");
    }
}

downloader.makeExecutable = function (location) {
    if (platform == 'linux' || platform == 'freebsd') {
        child_process.exec('chmod u+x clustalo', {cwd: location}, function (err) {
            if (err) {
                console.log('ERROR: ' + err);
            } else {
                console.log('Executable is made')
            }
        });
    } else if (platform == 'darwin') {
        child_process.exec('chmod 755 clustalo', {cwd: location}, function (err) {
            if (err) {
                console.log(err);
            }
        });
    } else if (platform == 'windows') {
        //TODO AFTER FIGURING OUT A WAY TO BUILD EXEC.
    }
}

downloadCO = function (url) {
    console.log('Downloading Clustal Omega from ', url);
    download(url, {directory: './bin', filename: 'clustalo'}, function (err) {
        if (err) {
            console.log('Download failed');
            console.log(err);
        }
        else {
            console.log('Download complete');
            downloader.makeExecutable('./bin');
        }
    });
}

module.exports = downloader;