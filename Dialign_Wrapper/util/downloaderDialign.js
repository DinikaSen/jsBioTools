const os = require('os');
const download = require('download-file');
const fs = require('fs');
const path = require('path');
var child_process = require('child_process');
var targz = require('targz');

var address = 'https://bibiserv.cebitec.uni-bielefeld.de/';
var platform = os.platform();


getDialignTool = function () {
    if (platform == 'darwin') {
        address += 'resources/download/dialign/dialign-2.2.1-universal-osx.dmg.zip';
        downloadDaln(address,platform);
    } else if (platform === 'linux') {
        address += 'applications/dialign/resources/downloads/dialign-2.2.1-src.tar.gz';
        downloadDaln(address,platform);
    } else{
        console.log('Sorry, jsBioTools cannot download Dialign for your operating system');
    }
}


downloadDaln = function (url, platform) {
    var src = './bin/';
    if (platform === 'linux'){
        src += 'dialign-2.2.1-src.tar.gz';
    }else if (platform === 'darwin'){
        src += 'dialign-2.2.1-universal-osx.dmg.zip';
    }
    console.log('Downloading Dialign from ', url);
    download(url, {directory: './bin'}, function (err) {
        if (err) {
            console.log('Download failed');
            console.log(err);
        }
        else {
            console.log('Download complete');
            targz.decompress({src: src, dest: './bin/'}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Archive unzipped");
                    if(platform === 'linux'){
                        var execPath = path.resolve('./bin/dialign_package/src/');
                        makeExecutable(execPath);
                    } else{
                        // TODO : install dmg
                    }
                }
            });
        }
    });
}

makeExecutable = function (location) {
    child_process.exec('make', {cwd: location}, function (err) {
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            child_process.exec('rm *.o', {cwd: location}, function (err) {
                if (err) {
                    console.log('ERROR: ' + err);
                } else {
                    console.log('binary executable created');
                }
            });
        }
    });
}


getDialignTool();