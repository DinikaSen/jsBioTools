var child_process = require('child_process');
var fs = require('fs');
var path = require('path');

var needlemanW = {};

/*
Align 2 sequences.
 */
needlemanW.alignPair = function (sequence1, sequence2, matchScore,misMatchScore,gapScore,callback ) {
    stringAlignment(sequence1,sequence2,'no','no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align 2 sequences and output alignment along with score.
 */
needlemanW.alignPairGetScore = function (sequence1, sequence2, matchScore,misMatchScore,gapScore,callback ) {
    stringAlignment(sequence1,sequence2,'yes','no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align 2 sequences and output alignment along with score matrix.
 */
needlemanW.alignPairGetMatrix = function (sequence1, sequence2, matchScore,misMatchScore,gapScore,callback ) {
    stringAlignment(sequence1,sequence2,'no','yes',matchScore,misMatchScore,gapScore,callback);
}

/*
Align sequence file. Read 2 sequences at a time and align them.
 */
needlemanW.alignFile = function (inputFile, matchScore,misMatchScore,gapScore,callback ) {
    fileAlignment(inputFile,'no','no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align sequence file. Read 2 sequences at a time.
Output pairwise alignment along with score.
 */
needlemanW.alignFileGetScore = function (inputFile, matchScore,misMatchScore,gapScore,callback ) {
    fileAlignment(inputFile,'yes','no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align sequence file. Read 2 sequences at a time.
Output pairwise alignment along with score matrix.
 */
needlemanW.alignFileGetMatrix = function (inputFile, matchScore,misMatchScore,gapScore,callback ) {
    fileAlignment(inputFile,'no','yes',matchScore,misMatchScore,gapScore,callback);
}


function stringAlignment(sequence1, sequence2, scoreFlag, matrixFlag, matchScore, misMatchScore, gapScore, callback) {
    var command = './needleman_wunsch --match ' + matchScore + ' --mismatch ' + misMatchScore + ' --gapopen ' + gapScore + ' --colour ';
    if (scoreFlag === 'yes') {
        command += ('--printscores ' + sequence1 + ' ' + sequence2);
    }
    else if (matrixFlag === 'yes') {
        command += ('--printmatrices ' + sequence1 + ' ' + sequence2);
    } else {
        command += (sequence1 + ' ' + sequence2);
    }
    run(command, function (err, stdOut, stdError) {
        return callback(err, stdOut, stdError);
    });
}

function fileAlignment(inputFile, scoreFlag, matrixFlag, matchScore, misMatchScore, gapScore, callback) {
    if (fs.existsSync(inputFile)){
        var command = './needleman_wunsch --match ' + matchScore + ' --mismatch ' + misMatchScore + ' --gapopen ' + gapScore + ' --colour ';
        if (scoreFlag === 'yes') {
            command += '--printscores ';
        }
        else if (matrixFlag === 'yes') {
            command += '--printmatrices ';
        }
        command += ('--file '+path.resolve(inputFile));
        run(command, function (err, stdOut, stdError) {
            return callback(err, stdOut, stdError);
        });
    }else{
        var err = 'Input file does not exist';
        return callback(err,null);
    }

}

function run(command, callback) {
    var execLocation = path.resolve(path.join(__dirname,'../../util/seq-align/bin'));
    var fullCommand = execLocation+'/'+command;
    child_process.exec(fullCommand, {maxBuffer: 1024 * 1000}, callback);
}

module.exports = needlemanW;