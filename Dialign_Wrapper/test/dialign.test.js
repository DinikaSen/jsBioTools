/*
This tests require dialign2-2 binary executable to be installed in Dialign_Wrapper/util/bin/dialign_package/src
and DIALIGN2_DIR environment variable to be set pointing to Dialign_Wrapper/util/bin/dialign_package/dialign2_dir

To download dialign2-2 binary executable and build in the target location run following file :
                    Dialign_Wrapper/util/downloaderDialign.js

NOTE : The environment variable paths are set by default unless user has changed them manually
*/

require('mocha');
expect = require('chai').expect;
should = require('chai').should();
var stdout = require("test-console").stdout;
var stderr = require("test-console").stderr;
var resolve = require('path').resolve;
const assert = require('assert');

var restoreStdout;

var dialign = require('../lib/dialign');


describe('#Set custom execution path', function () {

    it('customExecLocation should be set', function (done) {
        var location = 'Dialign_Wrapper/util/bin/dialign_package/src';
        restoreStdout = stdout.ignore();
        dialign.setCustomLocation(location);
        restoreStdout();
        dialign.customExecLocation.should.equal(resolve(location));
        done();
    });
    it('CustomExecLocation should not be set', function (done) {
        var location = 'Dialign_Wrapper/lib';
        restoreStdout = stdout.ignore();
        dialign.setCustomLocation(location);
        restoreStdout();
        dialign.customExecLocation.should.not.equal(resolve(location));
        done();
    });
});

describe('#Set custom environment variable path', function () {

    it('customEnvVarPath should be set', function (done) {
        var location = 'Dialign_Wrapper/util/bin/dialign_package/dialign2_dir';
        restoreStdout = stdout.ignore();
        dialign.setEnvironmentVar(location);
        restoreStdout();
        dialign.customEnvVarPath.should.equal(resolve(location));
        done();
    });
    it('customEnvVarPath should not be set', function (done) {
        var location = 'Dialign_Wrapper/util';
        restoreStdout = stdout.ignore();
        dialign.setEnvironmentVar(location);
        restoreStdout();
        dialign.customEnvVarPath.should.not.equal(resolve(location));
        done();
    });
});

describe('#Align an unaligned sequence file', function () {
    it('should execute dialign command (output format = fasta)', function (done) {
        var inspect = stdout.inspect();
        dialign.alignSeqFile('Dialign_Wrapper/test/samples/example.fasta', 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });

    it('should execute dialign command (output format = clustalW)', function (done) {
        var inspect = stdout.inspect();
        dialign.alignSeqFile('Dialign_Wrapper/test/samples/example.fasta', 'clustalW', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});

describe('#Align a string input of sequences', function () {
    it('should execute dialign command (output format = fasta)', function (done) {
        var inspect = stdout.inspect();
        var input = '>test1\n' +
            'ACDEFGHIKLMNPQRSTVWY\n' +
            '>test2\n' +
            'XXXXACDEFGHIMNXXXPQRSTVWY\n' +
            '>test3\n' +
            'ACDEFGHILMNXXXXXPQRSTVWYXXXX\n' +
            '>test4\n' +
            'XXXACDEFGHIKLMNPQRSTVWYXXX';
        dialign.alignSeqString(input, 'fasta', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
    it('should execute dialign command (output format = clustalW)', function (done) {
        var inspect = stdout.inspect();
        var input = '>test1\n' +
            'ACDEFGHIKLMNPQRSTVWY\n' +
            '>test2\n' +
            'XXXXACDEFGHIMNXXXPQRSTVWY\n' +
            '>test3\n' +
            'ACDEFGHILMNXXXXXPQRSTVWYXXXX\n' +
            '>test4\n' +
            'XXXACDEFGHIKLMNPQRSTVWYXXX';
        dialign.alignSeqString(input, 'clustalW', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1], "Success.!\n");
            done();
        });
    });
});

