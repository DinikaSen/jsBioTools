//var testUrl = 'https://cdn.pixabay.com/photo/2018/01/23/14/56/the-eleventh-hour-3101625_640.jpg?attachment';


const os = require('os');
const download = require('download-file');
const fs = require('fs');
const child_process = require('child_process');

var address = 'http://www.clustal.org/omega/';
var platform = os.platform();

switch (platform) {
    case ('linux'):
        var architecture = os.arch();
        if (architecture == 'x64') {
            address += 'clustalo-1.2.4-Ubuntu-x86_64';
        } else {
            address += 'clustalo-1.2.4-Ubuntu-32-bit';
        }
        downloadClustalOmega(address);
        break;

    case ('darwin'):
        address += 'clustal-omega-1.2.3-macosx';
        downloadClustalOmega(address);
        break;

    case ('win32') :
        address += 'clustal-omega-1.2.2-win64.zip';
        downloadClustalOmega(address);
        break;

    case ('freebsd') :
        address += 'clustalo-1.2.2-FreeBSD-x86-64';
        downloadClustalOmega(address);
        break;

    default :
        console.log("Clustal Omega is not available for your operating system type");
}


function downloadClustalOmega(url) {
    console.log('Downloading Clustal Omega from ',url);
    download(url,{directory:'./clustalOmega/bin',filename:'clustalo'},function(err) {
            if (err) {
                console.log('Download failed');
                console.log(err);
            }
            else {
                console.log('Download complete');

                if(platform=='linux' || platform=='freebsd'){
                    child_process.exec('chmod u+x clustalo',{cwd:'../bin'},function (err) {
                        if(err){
                            console.log('MAKING EXEC. ERROR: ' + err);
                        }else{
                            console.log('done')
                        }
                    })
                    ;
                }else if(platform=='darwin'){
                    child_process.exec('chmod 755 clustalo',{cwd:'../bin'},function (err) {
                        if(err){
                            console.log(err);
                        }
                    });
                }else if(platform=='windows'){
                    //TODO AFTER FIGURING OUT A WAY TO BUILD EXEC.
                }
            }
        }
    );
}
/*
function downloadClustalOmega(url){
    console.log('Downloading Clustal Omega from ',url);
    download(url,'/Desktop',{filename:'clustalo'});
    console.log('Download complete');
}
*/
/*
var OS = require('os');
var Download = require('download');
var Client = require('ftp');

var tt = 'ftp.ncbi.nlm.nih.gov';
var address = '/blast/executables/blast+/LATEST/';

var platform = OS.platform();
var arch = OS.arch();

if (platform === 'darwin') {
    platform = 'macosx';
    arch = 'universal';
}

var foundIt = false;
var fileName = '';

console.log('looking for', platform, arch, '...');

var c = new Client();
c.on('ready', function () {
    c.list(address, function (err, list) {
        if (err) throw err;
        //console.dir(list);


        list.forEach(function (l) {
            if (l.name.indexOf(platform) > -1) {
                if (l.name.indexOf(arch) > -1) {
                    if (l.name.indexOf('md5') === -1) {
                        foundIt = true;
                        fileName = l.name;
                    }
                }
            }
        });
        if (!foundIt) {
            console.error('we could not find the correct version of blast+ for you, sorry');
        } else {

            var finalURL = tt + address + fileName;
            downloadIt(finalURL);
        }
        c.end();
    });
});
c.connect({host: tt});


function downloadIt(url) {
    console.log('Downloading', url, '...');
    new Download({mode: '755', extract: true})
        .get('http://' + url) //have to add http to url
        .dest('bin')
        .run();
}
*/