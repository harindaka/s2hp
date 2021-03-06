#!/usr/bin/env node
(function(){
    
    var pjson = require('./package.json');
    console.log('Swagger to HTML and PDF (s2hp) v' + pjson.version);
    console.log('https://github.com/harindaka/s2hp');

    if(process.argv.length !== 4){
        console.log("Usage: swagger-doc <swagger json file> <output directory>");
        process.exit();
    }   
        
    var swaggerJsonFile = process.argv[2];
    var outputDir = process.argv[3]
    
    var path = require('path');
    outputDir = path.resolve(outputDir);
    swaggerJsonFile = path.resolve(swaggerJsonFile);    
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
        var inline = inliner(opts);
        var infile = path.join(outputDir, 'index.html');
        var inlineHtmlFile = path.join(outputDir, 'index-inline.html');

        var fs = require('fs');
        var input = fs.createReadStream(infile);
        var output = fs.createWriteStream(inlineHtmlFile);
        var writeableStream = input.pipe(inline).pipe(output);

        writeableStream.on('finish', function(){
            var pdf = require('html-pdf');
            var html = fs.readFileSync(inlineHtmlFile).toString('utf-8');
            
            var options = { format: 'Letter' };
            var pdfFile = path.join(outputDir, 'index-inline.pdf');
         
            pdf.create(html, options).toFile(pdfFile, function(err, res) {
                if (err) return console.log(err);
                console.log('Done.');
            });  
        });   
    })
    .catch(function(err){
        console.log(err);
    })
    .done();

    
})();
