var clustalOmega = require('./clustalOmega');


//download clustal omega
//clustalOmega.getClustalO();

//set a custom excecution path
//clustalOmega.setCustomLocation('./bin');



//Align example.fasta and write results to rsult.fasta
///*
clustalOmega.alignSeqFile('samples/example.fasta','samples/result.fasta','fasta',function(err){
    if(err){
        console.log(err);
    }else{
    }
});

//*/