var child_process = require('child_process');
var fs = require('fs');
var resolve = require('path').resolve;

var downloader = require('../util/downloader');

var clustalOmega = {
    execLocation: './bin'
};

/*
download Clustal Omega
 */
clustalOmega.getClustalO = function(){
    downloader.getClustalOmega();
}

/*
set a custom location where Clustal Omega binary is located
 */
clustalOmega.setCustomLocation = function (location){
    var path = location + '/clustalo'
    if (fs.existsSync(path)) {
        downloader.makeExecutable(resolve(location));
        clustalOmega.execLocation = resolve(location);
        console.log('Custom execution path is set to '+resolve(location));
    }else{
        console.log(resolve(path) + ' does not exist. ' +
            '\nPlease check whether the Clustal Omega binary file is located' +
            ' in the given path with the name \'clustalo\'.');
    }

}

/*
Align an unaligned sequence file
 */
clustalOmega.alignSeqFile = function (inputFile, outputFormat,callback){
    alignOneFile(inputFile,outputFormat,callback);
}

/*
Align an unaligned seq file and an HMM
 */
clustalOmega.alignSeqWithHmm = function (inputFile1,inputFile2,outputFormat,callback){
    alignTwoFiles('file&hmm',inputFile1,inputFile2,outputFormat,callback);
}

/*
Align an unaligned seq file and an HMM
 */
clustalOmega.alignSeqWithProfile = function (inputFile1,inputFile2,outputFormat,callback){
    alignTwoFiles('prof&file',inputFile1,inputFile2,outputFormat,callback);
}

/*
Align an unaligned seq file and an HMM
 */
clustalOmega.alignTwoProfiles = function (inputFile1,inputFile2,outputFormat,callback){
    alignTwoFiles('twoProfiles',inputFile1,inputFile2,outputFormat,callback);
}


function alignOneFile(inputFile, outputFormat, callback) {
    var clustalCommand = '-i ' + resolve(inputFile) + ' --outfmt=' + outputFormat;
    run(clustalCommand,callback);
}

function alignTwoFiles(alignmentType,inputFile1,inputfile2,outputFormat,callback) {
    if (alignmentType == 'file&hmm') {
        var clustalCommand = '-i ' + inputFile1 + ' --hmm-in=' + inputfile2 + ' --outfmt=' + outputFormat;
    }
    else if (alignmentType == 'prof&file') {
        var clustalCommand = '-i ' + inputFile1 + ' --p1=' + inputfile2 + ' --outfmt=' + outputFormat;
    }
    else if (alignmentType == 'twoProfiles') {
        var clustalCommand = '--p1=' + inputFile1 + ' --p2=' + inputfile2 + ' --outfmt=' + outputFormat;
    }
    run(clustalCommand,callback);
}


function run(command, callback) {

    var fullCommand = clustalOmega.execLocation + '/./clustalo ' + command;

    console.log('RUNNING', command);
    child_process.exec(fullCommand, {maxBuffer: 1024 * 1000}, callback);
}


module.exports = clustalOmega;