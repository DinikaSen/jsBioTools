var child_process = require('child_process');
var fs = require('fs');
var downloader = require('../util/downloader');

var resolve = require('path').resolve;


var clustalOmega = {
    execLocation: './bin'             // Default excecutipn path
};

//download Clustal Omega
clustalOmega.getClustalO = function(){
    downloader.getClustalOmega();
}

//set a custom location where Clustal Omega binary is located
clustalOmega.setCustomLocation = function (location){
    var path = location + '/clustalo'

    //TODO Validate path

    if (fs.existsSync(path)) {
        clustalOmega.execLocation = path;
        downloader.makeExecutable(location);
        console.log('Custom execution path is set');
    }else{
        console.log(path + ' does not exist. \nPlease check whether the Clustal Omega binary file is located in the given path with the name \'clustalo\'.');
    }
    clustalOmega.execLocatio = path;
}

//Align an unaligned sequence file
clustalOmega.alignSeqFile = function (inputFile, outputFile,outputFormat, callback){
    alignOneFile(inputFile,outputFile,outputFormat,callback);
}

//Align an unaligned seq file and an HMM
clustalOmega.alignSeqWithHmm = function (inputFile1,inputFile2, outputFile, outputFormat, callback){
    alignTwoFiles('file&hmm',inputFile1,inputFile2,outputFile,outputFormat,callback);
}


function alignOneFile(inputFile, outputFile, outputFormat, callback) {
    var clustalCommand = '-i ' + inputFile + ' -o ' + outputFile + ' --outfmt=' + outputFormat + ' --force';
    run(clustalCommand, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Alignment successful..!");
        }
    });
}

function alignTwoFiles(alignmentType, inputFile1, inputfile2, outputFile, outputFormat, callback) {

    if (alignmentType == 'seqFile') {
        var clustalCommand = '-i ' + inputFile + ' -o ' + outputFile + ' --outfmt=' + outputFormat + ' --force';
    }
    else if (alignmentType == 'file&hmm') {
        var clustalCommand = '-i ' + inputFile1 + ' --hmm-in=' + inputfile2 + '-o' + outputFile + ' --outfmt=' + outputFormat + ' --force';
    }
    else if (alignmentType == 'prof&file') {
        //TODO
    }
    else if (alignmentType == 'twoProfiles') {
        //TODO
    }
    run(clustalCommand, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Alignment successful..!");
        }
    });
}


function run(command, callback) {

    var fullCommand = clustalOmega.execLocation + '/./clustalo ' + command;

    console.log('RUNNING', command);
    child_process.exec(fullCommand, callback);
}

module.exports = clustalOmega;