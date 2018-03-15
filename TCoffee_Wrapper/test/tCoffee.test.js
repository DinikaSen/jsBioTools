//This tests require T-Coffee executable to be installed locally
//T-Coffee can be downloaded by running tCoffee_Wrapper/util/downloaderTCoffee.js

require('mocha');
const assert = require('assert');
expect = require('chai').expect;
should = require('chai').should();
var stdout = require("test-console").stdout;
var stderr = require("test-console").stderr;
var resolve = require('path').resolve;

var restoreStdout;

var tcoffee = require('../lib/tCoffee');

describe('#Align an unaligned sequence file', function () {
    it('should execute t_coffee command (sequence type = Protein)', function (done) {
        var inspect = stdout.inspect();
        tcoffee.alignProtein('TCoffee_Wrapper/test/samples/sample_seq1.fasta',function (err) {
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

    it('should execute t_coffee command (sequence type = DNA)', function (done) {
        var inspect = stdout.inspect();
        tcoffee.alignDNA('TCoffee_Wrapper/test/samples/sample_dnaseq1.fasta',function (err) {
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

    it('should execute t_coffee command (sequence type = RNA)', function (done) {
        var inspect = stdout.inspect();
        tcoffee.alignProtein('TCoffee_Wrapper/test/samples/sample_rnaseq1.fasta',function (err) {
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

describe('#Align protein sequences using mcoffee mode', function () {
    it('should execute t_coffee command with no error', function (done) {
        var inspect = stdout.inspect();
        var inputFile =
        tcoffee.alignMcoffee('TCoffee_Wrapper/test/samples/sample_seq1.fasta',function (err) {
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

describe('#Align protein sequences using quickaln mode', function () {
    it('should execute t_coffee command with no error', function (done) {
        var inspect = stdout.inspect();
        var inputFile =
            tcoffee.alignProteinFast('TCoffee_Wrapper/test/samples/sample_seq1.fasta',function (err) {
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

describe('#Align protein sequences using express mode', function () {
    this.timeout(20000);
    it('should execute t_coffee command with no error', function (done) {
        var inspect = stdout.inspect();
        var inputFile =
            tcoffee.alignExpresso('TCoffee_Wrapper/test/samples/sample_seq1.fasta',function (err) {
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

describe('#Align DNA sequences using procoffee mode', function () {
    it('should execute t_coffee command with no error', function (done) {
        var inspect = stdout.inspect();
        var inputFile =
            tcoffee.alignProCoffee('TCoffee_Wrapper/test/samples/sample_dnaseq1.fasta',function (err) {
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

describe('#Align RNA sequences using rcoffee mode', function () {
    it('should execute t_coffee command with no error', function (done) {
        var inspect = stdout.inspect();
        var inputFile =
            tcoffee.alignRcoffee('TCoffee_Wrapper/test/samples/sample_rnaseq1.fasta',function (err) {
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