//var testUrl = 'https://cdn.pixabay.com/photo/2018/01/23/14/56/the-eleventh-hour-3101625_640.jpg?attachment';


const os = require('os');
const download = require('download-file');
const fs = require('fs');
var child_process = require('child_process');

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
    download(url,{directory:'./clustalOmega/util',filename:'clustalo'},function(err) {
        if (err) {
            console.log('Download failed');
            console.log(err);
        }
        else {
            console.log('Download complete');
            makeExcecutable();
            }
    });
}

//Debug
function makeExcecutable(){
    if(platform=='linux' || platform=='freebsd'){
        child_process.exec('chmod u+x clustalo',{cwd:__dirname},function (err) {
            if(err){
                console.log('ERROR: ' + err);
            }else{
                console.log('Excecutable is made')
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