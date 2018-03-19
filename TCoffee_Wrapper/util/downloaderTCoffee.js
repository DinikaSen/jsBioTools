const os = require('os');
const download = require('download-file');
const fs = require('fs');
var child_process = require('child_process');

var address = 'http://www.tcoffee.org/Packages/Stable/Latest/';
var platform = os.platform();

var downloader = {};


downloader.getTCoffee = function () {
    switch (platform) {
        case ('linux'):
            address += 'linux/T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin';
            downloadTC(address);
            break;

        case ('darwin'):
            address += 'macosx/T-COFFEE_installer_Version_11.00.8cbe486_macosx_x64.dmg';
            downloadTC(address);
            break;

        default :
            console.log("T-Coffee is not available for your operating system type");
    }
};

downloader.makeExecutable = function (location) {
    if (platform === 'linux') {
        child_process.exec('chmod +x T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin', {cwd: location}, function (err) {
            if (err) {
                console.log('ERROR: ' + err);
            } else {
                child_process.exec('./T-COFFEE_installer_Version_11.00.8cbe486_linux_x64.bin', {cwd: location}, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('T-Coffee installer launched successfully.');
                    }
                });
            }
        });
    } else if (platform === 'darwin') {
        console.log('Files saved to ./bin.\nDouble Click on installer icon in DMG folder to start installation');
    }
};

downloadTC = function (url) {
    console.log('Downloading T-Coffee from ', url);
    download(url, {directory: './bin'}, function (err) {
        if (err) {
            console.log('Download failed');
            console.log(err);
        }
        else {
            console.log('Download complete');
            downloader.makeExecutable('./bin');
        }
    });
};

downloader.getTCoffee();

module.exports = downloader;