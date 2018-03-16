const os = require('os');
const download = require('download-file');
const fs = require('fs');
const path = require('path');
var child_process = require('child_process');
var targz = require('targz');

var address = 'https://bibiserv.cebitec.uni-bielefeld.de/';
var platform = os.platform();

var downloader = {};

downloader.getDialign = function () {
    if (platform == 'darwin') {
        address += 'resources/download/dialign/dialign-2.2.1-universal-osx.dmg.zip';
    } else if (platform == 'windows') {
        address += 'resources/download/dialign/dialign-2.2.1-win7-x86.tar.gz';
    } else if (platform === 'linux') {
        address += 'applications/dialign/resources/downloads/dialign-2.2.1-src.tar.gz';
    }
    downloadDaln(address,platform);
}


downloadDaln = function (url, platform) {
    var src = './bin/';
    if (platform === 'linux'){
        src += 'dialign-2.2.1-src.tar.gz';
    }else if (platform === 'windows'){
        src += 'dialign-2.2.1-win7-x86.tar.gz';
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
            targz.decompress({
                src: src,
                dest: './bin/'
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Archive unzipped");
                    if(platform === 'linux'){
                        makeExecutable();
                    }
                }
            });
        }
    });
}

makeExecutable = function () {
    var execPath = path.resolve('./bin/dialign_package/src/');
    child_process.exec('make', {cwd: execPath}, function (err) {
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            child_process.exec('rm *.o', {cwd: execPath}, function (err) {
                if (err) {
                    console.log('ERROR: ' + err);
                } else {
                    console.log('binary executable created');
                }
            });
        }
    });
}

testing = function(){
    var execPath = path.resolve('./bin/dialign_package/src/');
    var envPath = path.resolve('./bin/dialign_package/dialign2_dir/');
    child_process.exec('./dialign2-2 example.fasta', {cwd: execPath, env: {'DIALIGN2_DIR': envPath}}, function (error, stdout, stderr){
        console.log(stdout, stderr, error);
    });
}

//testing();
downloader.getDialign();

module.exports = downloader;