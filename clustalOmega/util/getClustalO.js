var testUrl = 'https://cdn.pixabay.com/photo/2018/01/23/14/56/the-eleventh-hour-3101625_640.jpg?attachment';


const os = require('os');
const download = require('download-file');
const child_process = require('child_process');

var address = 'http://www.clustal.org/omega/';
var platform = os.platform();

if (platform == 'linux'){
    var architecture = os.arch();
    if( architecture == 'x64'){
        address += 'clustalo-1.2.4-Ubuntu-x86_64';
    }else{
        address += 'clustalo-1.2.4-Ubuntu-32-bit';
    }
    downloadClustalOmega(address);
}else if (platform == 'win32'){
    address += 'clustal-omega-1.2.2-win64.zip';
    downloadClustalOmega(address);
}else if (platform == 'darwin'){
    address += 'clustal-omega-1.2.3-macosx';
    downloadClustalOmega(address);
}else if(platform == 'freebsd'){
    address += 'clustalo-1.2.2-FreeBSD-x86-64';
    downloadClustalOmega(address);
}else{
    console.log("Clustal Omega is not available for your operating system type");
}



function downloadClustalOmega(url) {
    console.log('Downloading Clustal Omega from ',url);
    download(url,{directory:'./clustalOmega/bin'},function(err) {
            if (err) {
                console.log('Download failed');
            } else {
                console.log('Download complete');
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