require('mocha');
expect = require('chai').expect;
should = require('chai').should();
var stdout = require("test-console").stdout;
var stderr = require("test-console").stderr;
var resolve = require('path').resolve;
const assert = require('assert');

var restoreStdout;

var clustalOmega = require('../lib/clustalOmega');


describe('#Set custom blast location',function ()
{

    it('execLocation should be set',function (done) {
        var location = 'ClustalO_Wrapper/lib/bin';
        restoreStdout = stdout.ignore();
        clustalOmega.setCustomLocation(location);
        restoreStdout();
        clustalOmega.execLocation.should.equal(resolve(location));
        done();
    });
    it('execLocation should not be set',function (done) {
        var location = 'ClustalO_Wrapper/lib';
        restoreStdout = stdout.ignore();
        clustalOmega.setCustomLocation(location);
        restoreStdout();
        clustalOmega.execLocation.should.not.equal(resolve(location));
        done();
    });
});


describe('#Align an unaligned sequence file', function ()
{
    it('should execute clustalo command (output format = fasta)', function (done) {
        var inspect = stdout.inspect();
        clustalOmega.alignSeqFile('ClustalO_Wrapper/test/samples/example.fasta','fasta',function(err) {
            if(err){
                console.log(err);
            }
            else{
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1],"Success.!\n")
            done();
        });
    });

    it('should execute clustalo command (output format = clustal)', function (done) {
        var inspect = stdout.inspect();
        clustalOmega.alignSeqFile('ClustalO_Wrapper/test/samples/example.fasta','clustal',function(err) {
            if(err){
                console.log(err);
            }
            else{
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1],"Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = msf)', function (done) {
        var inspect = stdout.inspect();
        clustalOmega.alignSeqFile('ClustalO_Wrapper/test/samples/example.fasta','msf',function(err) {
            if(err){
                console.log(err);
            }
            else{
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1],"Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = phylip)', function (done) {
        var inspect = stdout.inspect();
        clustalOmega.alignSeqFile('ClustalO_Wrapper/test/samples/example.fasta','phylip',function(err) {
            if(err){
                console.log(err);
            }
            else{
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1],"Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = selex)', function (done) {
        var inspect = stdout.inspect();
        clustalOmega.alignSeqFile('ClustalO_Wrapper/test/samples/example.fasta','selex',function(err) {
            if(err){
                console.log(err);
            }
            else{
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1],"Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = stockholm)', function (done) {
        var inspect = stdout.inspect();
        clustalOmega.alignSeqFile('ClustalO_Wrapper/test/samples/example.fasta','stockholm',function(err) {
            if(err){
                console.log(err);
            }
            else{
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1],"Success.!\n");
            done();
        });
    });

    it('should execute clustalo command (output format = vienna)', function (done) {
        var inspect = stdout.inspect();
        clustalOmega.alignSeqFile('ClustalO_Wrapper/test/samples/example.fasta','vienna',function(err) {
            if(err){
                console.log(err);
            }
            else{
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[1],"Success.!\n");
            done();
        });
    });
});

describe('#Align an unaligned seq file and an HMM', function () {
    it('should execute clustalo command with no error', function (done) {
        var inspect = stdout.inspect();
        var input = 'ClustalO_Wrapper/test/samples/example2.fasta';
        var hmm = 'ClustalO_Wrapper/test/samples/example2-hmm.hmm';
        clustalOmega.alignSeqWithHmm(input,hmm, 'fasta', function (err) {
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

describe('#Align an unaligned seq file and a profile', function () {
    it('should execute clustalo command with no error', function (done) {
        var inspect = stdout.inspect();
        var p1 = 'ClustalO_Wrapper/test/samples/prof1.profile';
        var f = 'ClustalO_Wrapper/test/samples/prof1Seq.ali';
        clustalOmega.alignSeqWithProfile(f,p1, 'fasta', function (err) {
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


describe('#Align two profiles', function () {
    it('should execute clustalo command (output format = fasta)', function (done) {
        var inspect = stdout.inspect();
        var p1 = 'ClustalO_Wrapper/test/samples/prof1.profile';
        var p2 = 'ClustalO_Wrapper/test/samples/prof2.profile';
        clustalOmega.alignTwoProfiles(p1,p2, 'fasta', function (err) {
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