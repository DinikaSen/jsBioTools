var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var glob = require("glob");

var tcoffee = {};

/*
MSA of Protein Sequences using T-Coffee Default
 */
tcoffee.alignProtein = function (inputFile, callback) {
    alignSequence('protein', 'default', inputFile, callback);
};

/*
MSA of DNA Sequences using T-Coffee Default
 */
tcoffee.alignDNA = function (inputFile, callback) {
    alignSequence('dna', 'default', inputFile, callback);
};

/*
MSA of RNA Sequences using T-Coffee Default
 */
tcoffee.alignRNA = function (inputFile, callback) {
    alignSequence('rna', 'default', inputFile, callback);
};

/*
MSA of Protein Sequences using T-Coffee fast
 */
tcoffee.alignProteinFast = function (inputFile, callback) {
    alignSequence('protein', 'quickaln', inputFile, callback);
};

/*
MSA of Protein Sequences using mcoffee
 */
tcoffee.alignMcoffee = function (inputFile, callback) {
    alignSequence('protein', 'mcoffee', inputFile, callback);
};

/*
MSA of Protein Sequences using expresso
 */
tcoffee.alignExpresso = function (inputFile, callback) {
    alignSequence('protein', 'expresso', inputFile, callback);
};

/*
MSA of DNA Sequences using procoffee
 */
tcoffee.alignProCoffee = function (inputFile, callback) {
    alignSequence('dna', 'procoffee', inputFile, callback);
};

/*
MSA of RNA Sequences using rcoffee
 */
tcoffee.alignRcoffee = function (inputFile, callback) {
    alignSequence('rna', 'rcoffee', inputFile, callback);
};


function alignSequence(seqType, mode, inputFile, callback) {
    var tcoffeeCommand = 't_coffee ' + path.resolve(inputFile);
    if (mode === 'default') {
        tcoffeeCommand += ' -type=' + seqType;

    }
    else {
        tcoffeeCommand += ' -mode=' + mode;

    }
    run(tcoffeeCommand, function (err, stdOut, stdError) {
        deleteGeneratedFiles(inputFile, mode);
        return callback(err, stdOut, stdError);
    });
}

function run(command, callback) {
    console.log('RUNNING', command);
    child_process.exec(command, {maxBuffer: 1024 * 1000}, callback);
}

function deleteGeneratedFiles(inputFile, mode) {
    var filename = path.basename(inputFile, path.extname(inputFile));
    var directory = path.resolve(path.dirname(inputFile));
    fs.unlinkSync(filename + '.aln');
    fs.unlinkSync(filename + '.dnd');
    fs.unlinkSync(filename + '.html');
    if (mode === 'rcoffee') {
        var matches = glob.GlobSync("**/*.rfold").matches;
        for (var file in matches[0]) {
            fs.unlinkSync(file);
        }
        var matches = glob.GlobSync("**/*.template_list").matches;
        for (var file in matches[0]) {
            fs.unlinkSync(file);
        }
    }
    else if (mode === 'expresso') {
        fs.unlinkSync(filename + '_pdb1.template_list');
    }
}


module.exports = tcoffee;