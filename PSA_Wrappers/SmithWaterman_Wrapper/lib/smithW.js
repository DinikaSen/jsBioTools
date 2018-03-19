var child_process = require('child_process');
var fs = require('fs');
var path = require('path');

var smithW = {};

/*
Align 2 sequences.
 */
smithW.alignPair = function (sequence1, sequence2, matchScore,misMatchScore,gapScore,callback ) {
    stringAlignment(sequence1,sequence2,'no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align 2 sequences and output alignment along with score matrix.
 */
smithW.alignPairGetMatrix = function (sequence1, sequence2, matchScore,misMatchScore,gapScore,callback ) {
    stringAlignment(sequence1,sequence2,'yes',matchScore,misMatchScore,gapScore,callback);
}

/*
Align sequence file. Read 2 sequences at a time and align them.
 */
smithW.alignFile = function (inputFile, matchScore,misMatchScore,gapScore,callback ) {
    fileAlignment(inputFile,'no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align sequence file. Read 2 sequences at a time.
Output pairwise alignment along with score matrix.
 */
smithW.alignFileGetMatrix = function (inputFile, matchScore,misMatchScore,gapScore,callback ) {
    fileAlignment(inputFile,'yes',matchScore,misMatchScore,gapScore,callback);
}


function stringAlignment(sequence1, sequence2, matrixFlag, matchScore, misMatchScore, gapScore, callback) {
    var command = './smith_waterman --match ' + matchScore + ' --mismatch ' + misMatchScore + ' --gapopen ' + gapScore + ' --colour ';
    if (matrixFlag === 'yes') {
        command += ('--printmatrices ' + sequence1 + ' ' + sequence2);
    } else {
        command += (sequence1 + ' ' + sequence2);
    }
    run(command, function (err, stdOut, stdError) {
        return callback(err, stdOut, stdError);
    });
}

function fileAlignment(inputFile, matrixFlag, matchScore, misMatchScore, gapScore, callback) {
    if (fs.existsSync(inputFile)){
        var command = './smith_waterman --match ' + matchScore + ' --mismatch ' + misMatchScore + ' --gapopen ' + gapScore + ' --colour ';
        if (matrixFlag === 'yes') {
            command += '--printmatrices ';
        }
        command += ('--file '+path.resolve(inputFile));
        run(command, function (err, stdOut, stdError) {
            return callback(err, stdOut, stdError);
        });
    }else{
        var err = 'Input file does not exist';
        return callback(err,null)
    }

}

function run(command, callback) {
    var execLocation = path.resolve(path.join(__dirname,'../../util/seq-align/bin'));
    var fullCommand = execLocation+'/'+command;
    var cp = child_process.exec(fullCommand, {maxBuffer: 1024 * 1000}, callback);
}

module.exports = smithW;