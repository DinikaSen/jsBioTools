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
    if(fs.existsSync(inputFile)){
        var tcoffeeCommand = 't_coffee ' + path.resolve(inputFile);
        if (mode === 'default') {
            tcoffeeCommand += ' -type=' + seqType;

        }
        else {
            tcoffeeCommand += ' -mode=' + mode;

        }
        run(tcoffeeCommand, function (err) {
            if(err){
                return callback(err);
            }
            else{
                var data = '';
                var filename = path.basename(inputFile, path.extname(inputFile));
                data = fs.readFileSync(__dirname+'/'+filename + '.aln', 'utf8');
                deleteGeneratedFiles(inputFile, mode);
                return callback(err, data);
            }
        });
    }
    else{
        var err = 'Input file does not exist';
        return callback(err, null);
    }

}

function run(command, callback) {
    console.log('RUNNING', command);
    child_process.exec(command, {cwd: __dirname, maxBuffer: 1024 * 1000}, callback);
}

function deleteGeneratedFiles(inputFile, mode) {
    var filename = path.basename(inputFile, path.extname(inputFile));
    fs.unlinkSync(__dirname+'/'+filename + '.aln');
    fs.unlinkSync(__dirname+'/'+filename + '.dnd');
    fs.unlinkSync(__dirname+'/'+filename + '.html');
    if (mode === 'rcoffee') {
        var matches = glob.GlobSync(__dirname+"/*.rfold").matches;
        for (var file in matches[0]) {
            fs.unlinkSync(file);
        }
        var matches = glob.GlobSync(__dirname+"/*.template_list").matches;
        for (var file in matches[0]) {
            fs.unlinkSync(file);
        }
    }
}


module.exports = tcoffee;