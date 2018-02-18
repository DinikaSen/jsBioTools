var clustalOmega = require('./clustalOmega');


//download clustal omega
//clustalOmega.getClustalO();

//set a custom excecution path
//clustalOmega.setCustomLocation('../../../../Downloads');
clustalOmega.setCustomLocation('bin/');



//Align example.fasta and write results to rsult.fasta
/*
clustalOmega.alignSeqFile('samples/example2.fasta','fasta',function(err,stdout,stderr){
    if(err){
        console.log(stderr);
    }else{
        console.log(stdout);
        console.log('Success..!!');
    }
});
*/

