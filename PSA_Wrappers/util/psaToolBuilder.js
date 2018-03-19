const child_process = require('child_process');

buildPSATool = function () {
    child_process.exec('make', {cwd: './seq-align'}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Build successful..!');
        }
    });
};

buildPSATool();