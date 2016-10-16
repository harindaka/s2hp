#!/usr/bin/env node
(function(){
    
    if(process.argv.length !== 4){
        console.log("Usage: swagger-doc <swagger json file> <output directory>");
        process.exit();
    }   
    
    var swaggerJsonFile = process.argv[2];
    var outputDir = process.argv[3]
    
    var path = require('path');
    outputDir = path.resolve(outputDir);
    swaggerJsonFile = path.resolve(swaggerJsonFile);
    console.log('Swagger to HTML and PDF (s2hp) https://github.com/harindaka/s2hp');
    console.log('Input: ' + swaggerJsonFile);                
    console.log('Output: ' + outputDir);
    console.log('Processing...');
    
    // Load bootprint 
    require('bootprint')
    // Load bootprint-swagger 
    .load(require('bootprint-swagger'))
    // Customize configuration, override any options 
    .merge({ /* Any other configuration */})
    // Specify build source and target 
    .build(swaggerJsonFile, outputDir)
    // Generate swagger-documentation into "target" directory 
    .generate()
    .then(function(){        
        var inliner = require('html-inline');
        var opts = {
            basedir: outputDir            
        };
        var inlineHtml = inliner(opts);
        var infile = path.join(outputDir, 'index.html');
        var outfile = path.join(outputDir, 'index-inline.html');

        var fs = require('fs');
        var input = fs.createReadStream(infile);
        var output = fs.createWriteStream(outfile);
        input.pipe(inlineHtml).pipe(output);

        console.log('Done.');
    })
    .done();

    
})();