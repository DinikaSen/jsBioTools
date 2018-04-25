var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var uuidv4 = require('uuid/v4');

var dialign = {
    //TODO : These are for linux.... check for macOS
    execLocation: path.resolve(path.join(__dirname, '../util/bin/dialign_package/src/')),
    envVariablePath: path.resolve(path.join(__dirname, '../util/bin/dialign_package/dialign2_dir/')),
    customExecLocation: null,
    customEnvVarPath: null
};

/*
set a custom location where dialign2-2 executable binary file is located
 */
dialign.setCustomLocation = function (location) {
    const binPath = location + '/dialign2-2';
    if (fs.existsSync(binPath)) {
        dialign.customExecLocation = path.resolve(location);
        console.log('Custom execution path is set to ' + path.resolve(location));
    } else {
        console.log(binPath + ' does not exist. ' +
            '\nPlease check whether the dialign2-2 executable is located' +
            ' in the given path with the name \'dialign2-2\'.');
    }
};

/*
set environment varible `DIALIGN2_DIR' pointing to the directory `dialign2_dir' in a custom location
The pointed directory should include tp400_dna,tp400_prot, tp400_trans, BLOSUM
 */
dialign.setEnvironmentVar = function (location) {
    const blosum = location + '/BLOSUM';
    const dna = location + '/tp400_dna';
    const prot = location + '/tp400_prot';
    const trans = location + '/tp400_trans';
    if (fs.existsSync(blosum) && fs.existsSync(dna) && fs.existsSync(prot) && fs.existsSync(trans)) {
        dialign.customEnvVarPath = path.resolve(location);
        console.log('Environment variable is set pointing to ' + path.resolve(location));
    } else {
        console.log(location + ' does not contain one or more of the following files -' +
            '\ntp400_dna,tp400_prot, tp400_trans, BLOSUM' +
            '\nPlease check and reset path');
    }
};

/*
Align an unaligned sequence file and get output in FASTA format or ClustalW
 */
dialign.alignSeqFile = function (inputFile, outFormat, callback) {
    if (outFormat === 'fasta' || outFormat === 'Fasta' || outFormat === 'FASTA') {
        alignSequence('file', inputFile, '-fa ', callback);
    } else if (outFormat === 'clustalW' || outFormat === 'clustalw' || outFormat === 'CLUSTALW' || outFormat === 'Clustalw' || outFormat === 'ClustalW') {
        alignSequence('file', inputFile, '-cw ', callback);
    } else {
        console.log('Please specify a correct output format (either \'fasta\' or \'clustalW\'');
    }
};

/*
Align an unaligned input string (in FASTA format) and get output in FASTA format or ClustalW format
 */
dialign.alignSeqString = function (input, outFormat, callback) {
    const tempInputFile = __dirname + '/' + uuidv4() + '.fasta';
    fs.writeFileSync(tempInputFile, input);
    if (outFormat === 'fasta' || outFormat === 'Fasta' || outFormat === 'FASTA') {
        alignSequence('string', tempInputFile, '-fa ', callback);
    } else if (outFormat === 'clustalW' || outFormat === 'clustalw' || outFormat === 'CLUSTALW' || outFormat === 'Clustalw' || outFormat === 'ClustalW') {
        alignSequence('string', tempInputFile, '-cw ', callback);
    } else {
        console.log('Please specify a correct output format (either \'fasta\' or \'clustalW\'');
    }
};

function alignSequence(type, inputFile, outFormat, callback) {
    if (fs.existsSync(inputFile)) {
        const tempOutputFile = __dirname + '/' + uuidv4();
        var dialignCommand = './dialign2-2 ' + outFormat + '-fn ' + tempOutputFile + ' ' + path.resolve(inputFile);
        run(dialignCommand, function (err) {
            if (err) {
                return callback(err);
            } else {
                var data = '';
                if (outFormat === '-fa ') {
                    data = fs.readFileSync(tempOutputFile + '.fa', 'utf8');
                    fs.unlinkSync(tempOutputFile);
                    fs.unlinkSync(tempOutputFile + '.fa');
                    if (type === 'string') {
                        fs.unlinkSync(path.resolve(inputFile));
                    }
                } else if (outFormat === '-cw ') {
                    data = fs.readFileSync(tempOutputFile + '.cw', 'utf8');
                    fs.unlinkSync(tempOutputFile);
                    fs.unlinkSync(tempOutputFile + '.cw');
                    if (type === 'string') {
                        fs.unlinkSync(path.resolve(inputFile));
                    }
                }
                return callback(err, data);
            }
        });
    }
    else {
        var err = 'Input file does not exist';
        return callback(err, null);
    }
}

function run(command, callback) {
    var execPath = dialign.execLocation;
    var envPath = dialign.envVariablePath;
    if (dialign.customExecLocation != null) {
        execPath = dialign.customExecLocation;
    }
    if (dialign.customEnvVarPath != null) {
        envPath = dialign.customEnvVarPath;
    }
    console.log('RUNNING', command);
    child_process.exec(command, {cwd: execPath, env: {'DIALIGN2_DIR': envPath}, maxBuffer: 1024 * 1000}, callback);
}

module.exports = dialign;
