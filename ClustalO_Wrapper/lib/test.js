var clustalOmega = require('./clustalOmega');

var outputFormat = 'fasta'
//download clustal omega
//clustalOmega.getClustalO();

//set a custom excecution path
//clustalOmega.setCustomLocation('../../../../Downloads');
//clustalOmega.setCustomLocation('bin/');


//Align example.fasta
/*
var inputFile = 'samples/example2.fasta'

clustalOmega.alignSeqFile(inputFile,outputFormat,function(err,stdout,stderr){
    if(err){
        console.log(stderr);
    }else{
        console.log(stdout);
        console.log('Success..!!');
    }
});


var fileIn = 'samples/example3.fasta'
var hmmInput = 'samples/example3-hmm.hmm'
clustalOmega.alignSeqWithHmm(fileIn,hmmInput,outputFormat,function (err,stdout,stderr) {
    if(err){
        console.log(stderr);
    }else{
        console.log(stdout);
    }
});

var p1 = 'samples/1bdmA.profile'
var p2 = 'samples/TvLDH.profile'
clustalOmega.alignTwoProfiles(p1,p2,outputFormat,function (err,data,stderr) {
    console.log('In');
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

*/

var f = 'samples/prof1Seq.ali'
var p = 'samples/TvLDH.profile'
clustalOmega.alignSeqWithProfile(f,p,outputFormat,function (err,data,stderr) {
    console.log('In');
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});




